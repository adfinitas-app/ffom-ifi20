$(document).ready((function(){const e={france:{headerImg:"../assets/img/header-bg-france.png"},syrie:{headerImg:"../assets/img/header-bg-syrie.png"},palestine:{headerImg:"../assets/img/header-bg-palestine.png"}};function a(a){const s=$(`.link[data-country="${a}"]`);s.siblings(".link").removeClass("active"),s.addClass("active");const n=$(".header-active"),i=$(".header-container-"+a);i.css({left:"200%",top:"unset"}),n.css("position","absolute"),n.animate({left:"-3000px"},(function(){n.css("top","-3000px"),n.removeClass("header-active")})),i.animate({left:"0"},(function(){i.css("position","unset"),$("header.header-desktop").css("background-image",`url("${e[a].headerImg}")`),i.addClass("header-active")})),t=!0}$(".nav-desktop .link").on("click",(function(e){e.preventDefault(),$(this).hasClass("active")||a($(this).data("country"))})),$(".nav-mobile-expanded .link").on("click",(function(e){e.preventDefault();const t=$(".bandeau-covid").height();closeNavMobile(t,!1),$(this).hasClass("active")||a($(this).data("country"))}));let t=!1;setTimeout((function(){!1===t&&a("france")}),7e3)}));