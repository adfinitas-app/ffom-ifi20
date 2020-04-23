function closeNavMobile() {
	$(".nav-mobile .hamburger").removeClass("is-active");
    $("body").css({"overflow": "auto", "padding-right": "0px"});
    $(".sticky").css({"padding-right": "0px"});

	$(".nav-mobile-expanded").slideUp("slow", function () {});
}

$(document).ready(function () {
	$(".hamburger").on("click", function () {
		const isActive = $(this).hasClass("is-active");
		$(this).toggleClass("is-active");

		if (isActive) {
			//$('.header-mobile').css('padding-top', '0px');
			closeNavMobile();
		} else {
            $("body").css({"overflow": "hidden", "padding-right": "16px"});
            $(".sticky").css({"padding-right": "16px"});
			$(".nav-mobile-expanded").slideDown("slow", function () {
				$(".nav-desktop, .nav-mobile").addClass("sticky");
				$(".header-desktop, .header-mobile").addClass("navSticky");
			});
		}
	});
});
