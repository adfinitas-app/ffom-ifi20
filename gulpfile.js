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
        .pipe(terser())
        .pipe(dest(`${BUILD_FOLDER}/assets/js`))
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
}

exports.clean = clean;
exports.index = index;
exports.compileSass = compileSass;
exports.images = images;
exports.inlineCss = inlineCss;
exports.inlineJs = inlineJs;

exports.default = series(clean, index, compileSass, inlineCss, inlineJs, images, server, mywatch);