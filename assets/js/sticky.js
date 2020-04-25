let isNavSticky = false;

function checkSticky(_this, bandeauHeight) {
    console.log('isNavSticky', isNavSticky);
    console.log('scrolltop: ', $(_this).scrollTop());
    if (isNavSticky === false && $(_this).scrollTop() >= bandeauHeight) {
        isNavSticky = true;
        $('.nav-desktop, .nav-mobile').addClass('sticky');
        console.log(true);
    } else if (isNavSticky === true && $(_this).scrollTop() < bandeauHeight) {
        isNavSticky = false;
        console.log(false);
        $('.nav-desktop, .nav-mobile').removeClass('sticky');
    } else if (isNavSticky === false && $(_this).scrollTop() < bandeauHeight) {
        $('.nav-desktop, .nav-mobile').removeClass('sticky');
    }
}

$(document).ready(function() {
    const bandeauHeight = $('.bandeau-covid').height();

    checkSticky($(window), bandeauHeight);

    $(window).scroll(function() {
        checkSticky(this, bandeauHeight);
    })
}); 