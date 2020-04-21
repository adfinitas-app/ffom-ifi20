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
        isChangingPanel = true;
        const linkElem = $(`.link[data-country="${country}"]`);

        linkElem.siblings('.link').removeClass('active');
        linkElem.addClass('active');

        const oldElem = $('.header-active');
        const elem = $(`.header-container-${country}`);

        oldElem.removeClass('header-active');
        elem.addClass('header-active');

        oldElem.fadeOut('slow', function() {
            $('header.header-desktop').css('background-image', `url("${data[country].headerImg}")`)
            elem.fadeIn('slow', function() {
                hasChangedPanel = true;
                isChangingPanel = false;

                //oldElem.css('display', 'none');
                //elem.css('display', 'block');
            });
        });
    }

    $('.nav-desktop .link').on('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass('active') || isChangingPanel === true)
            return ;
        showHeaderPanel($(this).data('country'));
    });

    $('.nav-mobile-expanded .link').on('click', function(e) {
        e.preventDefault();
        const bandeauHeight = $('.bandeau-covid').height();

        closeNavMobile(bandeauHeight, false);
        if ($(this).hasClass('active') || isChangingPanel === true)
            return;
    
        showHeaderPanel($(this).data('country'));
    });

    let hasChangedPanel = false;
    let isChangingPanel = false;

    setTimeout(function() {
        if (hasChangedPanel === false) 
            showHeaderPanel('france');
    }, 12000);
});