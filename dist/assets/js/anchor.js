"use strict";

$(document).ready(function () {
  $("a.anchor").click(function (event) {
    event.preventDefault();
    var offset = $($(this).attr("href")).offset().top;
    var navBarHeight = 150; //if (offset === 0) {
    //	offset = 150;
    //}

    $("html, body").animate({
      scrollTop: offset - navBarHeight
    }, 500);
  });
});