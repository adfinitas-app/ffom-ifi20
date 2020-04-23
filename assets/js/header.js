$(document).ready(function() {
    const data = {
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
    }

    function showHeaderPanel(country) {
        isChangingPanel = true;
        const linkElem = $('.link[data-country="' + country +'"]');

        $('.link').removeClass('active');
        linkElem.addClass('active');

        const oldElem = $('.header-active');
        const elem = country === 'default' ? $('.header-container') : $('.header-container-' + country);

        oldElem.removeClass('header-active');
        elem.addClass('header-active');

        oldElem.fadeOut('slow', function() {
            $('header.header-desktop').css('background-image', 'url(' + data[country].headerImg + ')')
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

        $('.link-croix').fadeOut(600);
        if ($(this).hasClass('active') || isChangingPanel === true)
            return ;
        showHeaderPanel($(this).data('country'));
    });

    $('.nav-mobile .link, .nav-mobile-expanded .link').on('click', function(e) {
        e.preventDefault();

        closeNavMobile();
        if ($(this).hasClass('active') || isChangingPanel === true)
            return;
    
        showHeaderPanel($(this).data('country'));
    });

    function startHeaderAnimation() {
        $('.donnez').addClass('effect-typing');
        const effectTypingTime = 2000;
        const effectBattementTime = 1000;
        setTimeout(() => {
            $('.donnez').css('border-right', 'none');
            $('.battement').addClass('effect-battement');
            setTimeout(() => {
                $('.header-container .plus').fadeIn(600);
                setTimeout(() => {
                    $('.pour-prendre-container').fadeIn(600);
                    setTimeout(() => {
                        $('.link-croix').fadeIn(600, 'swing', function() {
                            $('.link-croix').addClass('effect-blinking');
                            setTimeout(() => {
                                $('.battement').removeClass('effect-battement');
                            }, 10000);
                        });
                    }, 1500);
                }, 1500);
            }, effectBattementTime);
        }, effectTypingTime);
    }

    let hasChangedPanel = false;
    let isChangingPanel = false;
    
    startHeaderAnimation();
});