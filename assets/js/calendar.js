$(document).ready(function() {
    $('.calendar [data-toggle="tooltip"]').tooltip();

    $('.declaration-type-item').hover(function() {
        $(this).addClass('active');
        $(this).siblings('.declaration-type-item').removeClass('active');

        const target = $(this).data('target');

        console.log($(target));

        $(target).siblings('.declaration-type-content').hide();
        $(target).show();
    }, function() {

    });
});