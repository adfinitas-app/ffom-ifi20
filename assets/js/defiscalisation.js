function buildDeduction(left, middle, right) {
	return [
		{
			"amount-left-bottom": left["lb"],
			"amount-center": left["c"],
			"amount-right-top": left["rt"],
		},
		{
			"amount-left-bottom": middle["lb"],
			"amount-center": middle["c"],
			"amount-right-top": middle["rt"],
		},
		{
			"amount-left-bottom": right["lb"],
			"amount-center": right["c"],
			"amount-right-top": right["rt"],
		},
	];
}

$(document).ready(function () {
	//ACTIVATE TOOLTIP
	$('.defiscalisation [data-toggle="tooltip"]').tooltip();

	function isElementInViewport(elem) {
		var $elem = $(elem);

		// Get the scroll position of the page.
		var viewportTop = $(window).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		// Get the position of the element on the page.
		var elemTop = Math.round($elem.offset().top);
		var elemBottom = elemTop + $elem.height();

		return elemTop < viewportBottom && elemBottom > viewportTop;
	}

	//init
	//$(".don-type-item").first().tooltip("show");
	$($(".don-type-item").first().data("target")).show();

	// Capture scroll events
	const circles = ".circles";
	let animated = false;

	if (animated == false && isElementInViewport(circles)) {
		// Start the animation
		fadeInCircles();
		animated = true;
	}

	$(window).scroll(function () {
		if (animated == false && isElementInViewport(circles)) {
			// Start the animation
			fadeInCircles();
		}
	});

	//FUNCTION TO MAKE THE CIRCLES APPEAR ONE BY ONE
	function fadeInCircles() {
		$(".circle-left .circle-wrapper").fadeIn(700, function () {
			$(".circle-middle .circle-wrapper").fadeIn(700, function () {
				$(".circle-right .circle-wrapper").fadeIn(700, function () {});
			});
		});
	}

	// c = center
	// lb = left bottom
	// rt = right top
	const deductionValues = {
		"#don-type-ifi": buildDeduction(
			{ c: "1 000€", lb: "750€", rt: "250€" },
			{ c: "5 000€", lb: "750€", rt: "1 000€" },
			{ c: "10 000€", lb: "7 500€", rt: "2 500€" }
		),
		"#don-type-ir": buildDeduction(
			{ c: "150€", lb: "99€", rt: "51€" },
			{ c: "500€", lb: "330€", rt: "170€" },
			{ c: "1 000€", lb: "660€", rt: "340€" }
		),
		"#don-type-is": buildDeduction(
			{ c: "10 000€", lb: "6 000€", rt: "4 000€" },
			{ c: "20 000€", lb: "12 000€", rt: "8 000€" },
			{ c: "30 000€", lb: "18 000€", rt: "12 000€" }
		),
	};

	$(".don-type-item").on("click", function () {
		$(this).siblings(".don-type-item").removeClass("active");
		$(this).addClass("active");

		$(this).tooltip("show");
		$(this).siblings(".don-type-item").tooltip("hide");

		const target = $(this).data("target");

		$(target).siblings(".don-type-content").hide();
		$(target).show();

		//Modify deduction amounts
		// target = #don-type-ifi | #don-type-ir | #don-type-is
		let deductionTypetext = "";

		switch (target) {
			case "#don-type-ifi":
				deductionTypetext = "IFI";
				break;
			case "#don-type-ir":
				deductionTypetext = "IR";
				break;
			case "#don-type-is":
				deductionTypetext = "IS";
				break;
			default:
				break;
		}
		$('#deduction-type-text').text(deductionTypetext);
		if (!deductionValues[target]) {
			return;
		}

		const newAmounts = deductionValues[target];

		modifyCircleValues(newAmounts);
	});

	function isInt(n) {
		return n % 1 === 0;
	}

	$(".free-amount").on("input", function () {
		const val = $(this).val().trim();

		if (!val || val.length > 14) return;
		let amount = null;
		if (val.charAt(val.length - 1) === "€") {
			amount = val.substr(0, val.length - 1).replace(" ", "");
			if (isNaN(amount)) return;
		} else {
			amount = val.replace(" ", "");
			if (isNaN(amount)) return;
		}
		amount = parseInt(amount);
		const topRightAmount = parseFloat((amount * 25) / 100);
		const leftBottomAmount = parseFloat((amount * 75) / 100);

		if (isNaN(topRightAmount) || isNaN(leftBottomAmount)) return;
		isInt(leftBottomAmount)
			? $(".circle-right .amount-left-bottom").text(leftBottomAmount + "€")
			: $(".circle-right .amount-left-bottom").text(leftBottomAmount.toFixed(2) + "€");

		isInt(topRightAmount)
			? $(".circle-right .amount-right-top").text(topRightAmount + "€")
			: $(".circle-right .amount-right-top").text(topRightAmount.toFixed(2) + "€");
	});

	function modifyCircleValue(circle, amounts) {
		$(circle).find(".amount-left-bottom").text(amounts["amount-left-bottom"]);
		$(circle).find(".amount-center").text(amounts["amount-center"]);
		$(circle).find(".amount-right-top").text(amounts["amount-right-top"]);
	}

	function modifyCircleValues(amounts) {
		if (Array.isArray(amounts) === false || amounts.length !== 3) return;

		modifyCircleValue(".circle-left", amounts[0]);
		modifyCircleValue(".circle-middle", amounts[1]);
		//modifyCircleValue('.circle-right', amounts[2]);
	}
});
