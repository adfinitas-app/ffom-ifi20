let isNavSticky = false;

function checkSticky(_this, bandeauHeight) {
    if (isNavSticky === false && $(_this).scrollTop() >= bandeauHeight) {
        isNavSticky = true;
        $('.header-mobile').css('padding-top', '90px');
        $('.nav-desktop, .nav-mobile').addClass('sticky');
        $('.header-desktop, .header-mobile').addClass('navSticky');
    } else if (isNavSticky === true && $(_this).scrollTop() < bandeauHeight) {
        isNavSticky = false;
        $('.header-mobile').css('padding-top', '0px');
        $('.nav-desktop, .nav-mobile').removeClass('sticky');
        $('.header-desktop, .header-mobile').removeClass('navSticky');
    }
}

$(document).ready(function() {
    const bandeauHeight = $('.bandeau-covid').height();

    checkSticky($(window), bandeauHeight);

    $(window).scroll(function() {
        checkSticky(this, bandeauHeight);
    })
});