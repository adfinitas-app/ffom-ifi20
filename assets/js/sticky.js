$(document).ready(function() {
    const bandeauHeight = $('.bandeau-covid').height();
    let isNavSticky = false;

    $(window).scroll(function() {
        if (isNavSticky === false && $(this).scrollTop() >= bandeauHeight) {
            isNavSticky = true;
            $('nav').addClass('sticky');
            $('header').addClass('navSticky');
        } else if (isNavSticky === true && $(this).scrollTop() < bandeauHeight) {
            isNavSticky = false;
            $('nav').removeClass('sticky');
            $('header').removeClass('navSticky');
        }
    })
});