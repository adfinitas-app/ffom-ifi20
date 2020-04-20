$(document).ready(function () {
	$("a.anchor").click(function (event) {
		event.preventDefault();
		$("html, body").animate(
			{ scrollTop: $($(this).attr("href")).offset().top - 90 },
			500
		);
    });
});
