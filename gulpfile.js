const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rimraf = require('gulp-rimraf');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const terser = require('gulp-terser');
const browser = require('browser-sync');
const useref = require('gulp-useref');
const babel = require('gulp-babel');

const BUILD_FOLDER = './dist';

// Delete the "dist" folder
// This happens every time a build starts
function clean(cb) {
    return src(BUILD_FOLDER, {read: false, allowEmpty: true})
        .pipe(rimraf());
}

//Move index.html to build folder
function index(cb) {
    return src('./index.html')
        //.pipe(useref())
        .pipe(dest(BUILD_FOLDER));
}

// Compile Sass into CSS
function compileSass(cb) {
    return src('./assets/scss/**/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('styles.css'))
        .pipe(rename({
            basename: "styles",
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(dest(`${BUILD_FOLDER}/assets/css`));
}

// Copy and compress images
function images(cb) {
    return src(['assets/img/**/*'])
      .pipe(imagemin())
      .pipe(dest(`${BUILD_FOLDER}/assets/img`));
}

// Copy docs
function docs(cb) {
    return src(['assets/docs/**/*'])
      .pipe(dest(`${BUILD_FOLDER}/assets/docs`));
}

// Inline CSS
function inlineCss(cb) {
    return src(`${BUILD_FOLDER}/**/*.css`)
        //.pipe(sourcemaps.init())
        .pipe(cleanCSS({
            debug: true,
            compatibility: 'ie8'
        }))
        .pipe(dest(`${BUILD_FOLDER}`))
        //.pipe(sourcemaps.write())
}

// Inline JS
function inlineJs(cb) {
    return src(`./assets/js/**/*.js`)
        //.pipe(sourcemaps.init())
        .pipe(babel({presets: ['@babel/preset-env']}))
        
        // .pipe(terser({
        //     parse: {ecma: 2015},
        //     compress: {ecma: 2015},
        //     ie8: true
        //   }))
        .pipe(dest(`${BUILD_FOLDER}/assets/js`));
        //.pipe(sourcemaps.write())
}

// Start a server with LiveReload to preview the site in
function server(cb) {
    browser.init({
      server: 'dist'
    });
    cb();
}

// Watch for file changes
function mywatch() {
    watch('./*.html').on('all', series(index, browser.reload))
    watch('assets/scss/**/*.scss').on('all', series(compileSass, inlineCss, browser.reload));
    watch('assets/js/**/*.js').on('all', series(inlineJs, browser.reload));
    watch('assets/img/**/*').on('all', series(images, browser.reload));
    watch('assets/docs/**/*').on('all', series(docs, browser.reload));
}

exports.clean = clean;
exports.index = index;
exports.compileSass = compileSass;
exports.images = images;
exports.docs = docs;
exports.inlineCss = inlineCss;
exports.inlineJs = inlineJs;

exports.default = series(clean, index, compileSass, inlineCss, inlineJs, images, docs, server, mywatch);