function closeNavMobile(e,i=!0){$(".nav-mobile .hamburger").removeClass("is-active"),i&&0===$(window).scrollTop()&&$(".nav-desktop, .nav-mobile").css("position","fixed").animate({top:e+10+"px",left:0}),$(".nav-mobile-expanded").slideUp("slow",(function(){$(".nav-desktop, .nav-mobile").css({position:"",top:"",left:""}),checkSticky($(window),e)}))}$(document).ready((function(){$(".hamburger").on("click",(function(){const e=$(".bandeau-covid").height(),i=$(this).hasClass("is-active");$(this).toggleClass("is-active"),i?closeNavMobile(e):($(".header-mobile").css("padding-top","90px"),$(".nav-desktop, .nav-mobile").css("position","fixed").animate({top:0,left:0}),$(".nav-mobile-expanded").slideDown("slow",(function(){$(".nav-desktop, .nav-mobile").addClass("sticky"),$(".header-desktop, .header-mobile").addClass("navSticky"),isNavSticky=!0})))}))}));