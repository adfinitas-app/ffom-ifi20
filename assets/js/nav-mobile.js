function closeNavMobile() {
	const bandeauHeight = $('.bandeau-covid').height();
	console.log('bandeauheight', bandeauHeight)
	$(".nav-mobile .hamburger").removeClass("is-active");
    $("body").css({"overflow": "auto"});
    //$(".sticky").css({"padding-right": "0px"});
	
	$(".nav-mobile-expanded").slideUp("slow", function () {
		console.log(('checksticky'));
		checkSticky($(window), bandeauHeight);
	});
}

$(document).ready(function () {
	$(".hamburger").on("click", function () {
		const isActive = $(this).hasClass("is-active");
		$(this).toggleClass("is-active");

		if (isActive) {
			//$('.header-mobile').css('padding-top', '0px');
			closeNavMobile();
		} else {
            $("body").css({"overflow": "hidden"});
			//$(".sticky").css({"padding-right": "16px"});
			$('.nav-mobile').addClass('sticky');
			$(".nav-mobile-expanded").slideDown("slow", function () {
				//$(".nav-desktop, .nav-mobile").addClass("sticky");
				//$(".header-desktop, .header-mobile").addClass("navSticky");
			});
		}
	});
});
