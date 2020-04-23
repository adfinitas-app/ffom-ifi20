"use strict";

$(document).ready(function () {
  var data = {
    'default': {
      headerImg: '../assets/img/header-bg.png'
    },
    'france': {
      headerImg: '../assets/img/header-bg-france.png'
    },
    'syrie': {
      headerImg: '../assets/img/header-bg-syrie.png'
    },
    'palestine': {
      headerImg: '../assets/img/header-bg-palestine.png'
    }
  };

  function showHeaderPanel(country) {
    isChangingPanel = true;
    var linkElem = $(".link[data-country=\"".concat(country, "\"]"));
    $('.link').removeClass('active');
    linkElem.addClass('active');
    var oldElem = $('.header-active');
    var elem = country === 'default' ? $('.header-container') : $(".header-container-".concat(country));
    oldElem.removeClass('header-active');
    elem.addClass('header-active');
    oldElem.fadeOut('slow', function () {
      $('header.header-desktop').css('background-image', "url(\"".concat(data[country].headerImg, "\")"));
      elem.fadeIn('slow', function () {
        hasChangedPanel = true;
        isChangingPanel = false; //oldElem.css('display', 'none');
        //elem.css('display', 'block');
      });
    });
  }

  $('.nav-desktop .link').on('click', function (e) {
    e.preventDefault();
    $('.link-croix').fadeOut(600);
    if ($(this).hasClass('active') || isChangingPanel === true) return;
    showHeaderPanel($(this).data('country'));
  });
  $('.nav-mobile .link, .nav-mobile-expanded .link').on('click', function (e) {
    e.preventDefault();
    closeNavMobile();
    if ($(this).hasClass('active') || isChangingPanel === true) return;
    showHeaderPanel($(this).data('country'));
  });

  function startHeaderAnimation() {
    $('.donnez').addClass('effect-typing');
    var effectTypingTime = 2000;
    var effectBattementTime = 1000;
    setTimeout(function () {
      $('.donnez').css('border-right', 'none');
      $('.battement').addClass('effect-battement');
      setTimeout(function () {
        $('.header-container .plus').fadeIn(600);
        setTimeout(function () {
          $('.pour-prendre-container').fadeIn(600);
          setTimeout(function () {
            $('.link-croix').fadeIn(600, 'swing', function () {
              $('.link-croix').addClass('effect-blinking');
              setTimeout(function () {
                $('.battement').removeClass('effect-battement');
              }, 10000);
            });
          }, 1500);
        }, 1500);
      }, effectBattementTime);
    }, effectTypingTime);
  }

  var hasChangedPanel = false;
  var isChangingPanel = false;
  startHeaderAnimation();
});