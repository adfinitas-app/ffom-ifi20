$(document).ready(function() {
    $('.click-to-expand').on('click', function() {
        const target = $($(this).data('target'));

        $(this).toggleClass("active");

        const maxHeight = target.css("max-height");

        if (maxHeight && maxHeight !== "0px" && maxHeight !== "none") {
            target.css("max-height", "0px")
        } else {
            target.css("max-height", "3000px");
            target.css("height", "auto")
        }
    })
});