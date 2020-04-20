$(document).ready(function() {
    $('.calendar [data-toggle="tooltip"]').tooltip();

    $('.declaration-type-item').on('click', function() {
        $(this).addClass('active');
        $(this).siblings('.declaration-type-item').removeClass('active');

        const target = $(this).data('target');

        $(target).siblings('.declaration-type-content').hide();
        $(target).show();
    });
});