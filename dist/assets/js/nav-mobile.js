"use strict";function closeNavMobile(){var e=$(".bandeau-covid").height();console.log("bandeauheight",e),$(".nav-mobile .hamburger").removeClass("is-active"),$("body").css({overflow:"auto"}),$(".nav-mobile-expanded").slideUp("slow",(function(){console.log("checksticky"),checkSticky($(window),e)}))}$(document).ready((function(){$(".hamburger").on("click",(function(){var e=$(this).hasClass("is-active");$(this).toggleClass("is-active"),e?closeNavMobile():($("body").css({overflow:"hidden"}),$(".nav-mobile").addClass("sticky"),$(".nav-mobile-expanded").slideDown("slow",(function(){})))}))}));