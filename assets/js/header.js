$(document).ready(function() {
    const data = {
        'france': {
            headerImg: '../assets/img/header-bg-france.png'           
        },
        'syrie': {
            headerImg: '../assets/img/header-bg-syrie.png'            
        },
        'palestine': {
            headerImg: '../assets/img/header-bg-palestine.png'
        }
    }

    function showHeaderPanel(country) {
        const linkElem = $(`.link[data-country="${country}"]`);

        linkElem.siblings('.link').removeClass('active');
        linkElem.addClass('active');

        const oldElem = $('.header-active');
        const elem = $(`.header-container-${country}`);

        elem.css({left: '200%', top: 'unset'});

        oldElem.css('position', 'absolute');
        oldElem.animate({left: `-3000px`}, function() {
            oldElem.css('top', '-3000px');
            oldElem.removeClass('header-active');
        });
        elem.animate({left: '0'}, function() {
            elem.css('position', 'unset');
            $('header.header-desktop').css('background-image', `url("${data[country].headerImg}")`)
            elem.addClass('header-active');

        });
        hasChangedPanel = true;
    }

    $('.nav-desktop .link').on('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass('active'))
            return ;
        showHeaderPanel($(this).data('country'));
    });

    $('.nav-mobile-expanded .link').on('click', function(e) {
        e.preventDefault();
        const bandeauHeight = $('.bandeau-covid').height();

        closeNavMobile(bandeauHeight, false);
        if ($(this).hasClass('active'))
            return;
    
        showHeaderPanel($(this).data('country'));
    });

    let hasChangedPanel = false;

    setTimeout(function() {
        if (hasChangedPanel === false) 
            showHeaderPanel('france');
    }, 7000);
});