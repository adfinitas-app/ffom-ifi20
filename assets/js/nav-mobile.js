function closeNavMobile(bandeauHeight, animate = true) {
    $('.nav-mobile .hamburger').removeClass("is-active");

    if (animate && $(window).scrollTop() === 0) {
        $(".nav-desktop, .nav-mobile").css("position", "fixed").animate({
            top: bandeauHeight + 10 + 'px',
            left: 0,
        });
    }
    $(".nav-mobile-expanded").slideUp("slow", function () {
        $(".nav-desktop, .nav-mobile").css({ position: "", top: "", left: "" });
        //$('.header-mobile').css('padding-top', '0px');
        checkSticky($(window), bandeauHeight);
    });
}

$(document).ready(function () {

	$(".hamburger").on("click", function () {
        const bandeauHeight = $(".bandeau-covid").height();
		const isActive = $(this).hasClass("is-active");
		$(this).toggleClass("is-active");

		if (isActive) {
            //$('.header-mobile').css('padding-top', '0px');
            closeNavMobile(bandeauHeight);
		} else {
            $('.header-mobile').css('padding-top', '90px');
			$(".nav-desktop, .nav-mobile").css("position", "fixed").animate({
				top: 0,
				left: 0,
			});
			$(".nav-mobile-expanded").slideDown("slow", function () {
				$(".nav-desktop, .nav-mobile").addClass("sticky");
				$(".header-desktop, .header-mobile").addClass("navSticky");
				isNavSticky = true;
			});
		}
	});
});
