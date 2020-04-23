"use strict";

$(document).ready(function () {
  $('.calendar [data-toggle="tooltip"]').tooltip();
  var isChangingDeclaration = false;
  $('.declaration-type-item').on('click', function () {
    if (isChangingDeclaration) return;
    isChangingDeclaration = true;
    $(this).addClass('active');
    $(this).siblings('.declaration-type-item').removeClass('active');
    var target = $(this).data('target');
    var oldElem = $(".declaration-type-content.active");
    oldElem.removeClass("active");
    $(target).addClass("active");
    oldElem.fadeOut(400, 'swing', function () {
      $(target).fadeIn(400, 'swing', function () {
        isChangingDeclaration = false;
      });
    }); //$(target).siblings('.declaration-type-content').hide();
    //$(target).show();
  });
});