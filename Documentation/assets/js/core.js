/* -----------------------------------------------------------------------------

Sukces - Neat Personal Resume CV vCard Template

File:           JS Core
Version:        1.0
Last change:    15/07/16 
Author:         Suelo 

-------------------------------------------------------------------------------- */

"use strict";

var $body = $('body'),
    $html = $('html'),
    $pageLoader = $('#page-loader');

var $header = $('#header'),
    scrolledBarrier = $(window).height()/2,
    scrolled = 0;

var setHeader = function() {
    scrolled = $(window).scrollTop();

    if(scrolled >= scrolledBarrier) {
        $header.addClass('scrolled');
    } else {
        $header.removeClass('scrolled');
    }
}

var Sukces = {
    init: function() {

        this.Basic.init();
        this.Component.init(); 
        
    },
    Basic: {
        init: function() {

            this.mobileDetector();
            this.backgrounds();
            this.masonry();
            this.map();
            this.scroller();
            this.filter();
            this.imagesList();

        },
        mobileDetector: function () {

            var isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i);
                },
                any: function() {
                    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
                }
            };

            window.trueMobile = isMobile.any();

        },
        backgrounds: function() {

            // Image
            $('.bg-image, .post-image').each(function(){
                var src = $(this).children('img').attr('src');
                $(this).css('background-image','url('+src+')').children('img').hide();
            });

            // Slideshow 
            $('.bg-slideshow').owlCarousel({
                singleItem: true,
                autoPlay: 4000,
                pagination: false,
                navigation: false,
                navigationText: false,
                slideSpeed: 1500,
                transitionStyle: 'fade',
                mouseDrag: false,
                touchDrag: false
            });

            // Video 
            var $bgVideo = $('.bg-video');
            if($bgVideo) {
                $bgVideo.YTPlayer();
            }
            if(trueMobile && $bgVideo) {
                $bgVideo.prev('.bg-video-placeholder').show();
                $bgVideo.remove()
            }

        },
        imagesList: function() {
            $('.images-list .image-box').on('mouseover', function(){
                var $container = $(this).parents('.images-list'),
                    $hover = $container.next('.images-list-hover'),
                    $content = $hover.children('.content'),
                    $self = $(this),
                    x = $self.offset().left - $container.offset().left - 10,
                    y = $self.offset().top - $container.offset().top - 10,
                    width = $self.width() + 20,
                    height = $self.height() + 20;

                    $hover.css({
                        'left': x + 'px',
                        'top': y + 'px',
                        'width': width + 'px',
                        'height': height + 'px'
                    });

                    $content.html($(this).find('.hover').html());
            });
        },
        animations: function() {
            // Animation - appear 
            $('.animated').appear(function() {
                $(this).each(function(){ 
                        var $target =  $(this);
                        var delay = $(this).data('animation-delay');
                        setTimeout(function() {
                            $target.addClass($target.data('animation')).addClass('visible')
                        }, delay);
                });
            });
        },
        masonry: function() {

            var $grid = $('.masonry','#content');

            $grid.masonry({
                columnWidth: '.masonry-sizer',
                itemSelector: '.masonry-item',
                percentPosition: true
            });

            $grid.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });

            $grid.on('layoutComplete', Waypoint.refreshAll());

        },
        scroller: function() {

            var $header = $('#header');
            var headerHeight = $('#header').height();
            var $mobileNav = $('#mobile-nav');
            var $section = $('.section','#content');
            var $body = $('body');
            var scrollOffset = 0;
            if ($header.hasClass('header-horizontal')) scrollOffset = -headerHeight;

            var $scrollers = $('#header, #mobile-nav, [data-local-scroll]');
            $scrollers.find('a').on('click', function(){
                $(this).blur();
            });
            $scrollers.localScroll({
                offset: scrollOffset,
                duration: 700,
                easing: 'easeInCubic'
            });

            var $mainMenu = $('#main-menu'),
                $menuItem = $('#main-menu li > a'),
                mainMenuOffset = null,
                $selector = $mainMenu.children('.selector');

            window.setMenuSelector = function() {
                var $activeItem = $mainMenu.find('a.active');
                if($activeItem.length != 0) {
                    if($header.hasClass('header-horizontal')) {
                        mainMenuOffset = $mainMenu.offset().left;
                        $selector.css({
                            'width': $activeItem.outerWidth(),
                            'left': $activeItem.offset().left - mainMenuOffset + 'px'
                        });
                    } else {
                        mainMenuOffset = $mainMenu.offset().top;
                        $selector.css({
                            'height': $activeItem.outerHeight(),
                            'top': $activeItem.offset().top - mainMenuOffset + 'px'
                        });
                    }
                }
            }

            $menuItem.on('click', function(){
                if($(this).attr('href').indexOf('.html') == -1) {
                    $body.removeClass('mobile-nav-open');
                    $('.nav-toggle').removeClass('active');
                    return false;
                }
            });

            var checkMenuItem = function(id) {
                $menuItem.each(function(){
                    var link = $(this).attr('href');
                    if(id==link) {
                        $(this).addClass('active');
                        setMenuSelector();
                    }
                    else $(this).removeClass('active');
                });
            }

            $section.waypoint({
                handler: function(direction) {
                    if(direction=='up') {
                        var id = '#'+this.element.id;
                        checkMenuItem(id);
                    }
                },
                offset: function() {
                    if ($header.hasClass('header-horizontal')) return -this.element.clientHeight+headerHeight;
                    else return -this.element.clientHeight+2;
                }
            });
            $section.waypoint({
                handler: function(direction) {
                    if(direction=='down') {
                        var id = '#'+this.element.id;
                        checkMenuItem(id);
                    }
                },
                offset: function() {
                    if ($header.hasClass('header-horizontal')) return headerHeight+1;
                    else return 1;
                }
            });
            $(window).resize(function(){
                setTimeout(function(){
                    Waypoint.refreshAll()
                },600);
            });

            /* Scroll Positioning */

            var currentLocation = window.location.href;
            currentLocation = currentLocation.split('/');
            currentLocation = currentLocation[currentLocation.length-1];

            if (currentLocation.indexOf('#') != -1 && $header.hasClass('header-horizontal')) {
                var currentSection = currentLocation.split('#');
                currentSection = currentSection[currentSection.length-1];
                if($('#'+currentSection).length > 0) {
                    var sectionOffset = $('#'+currentSection).offset().top;
                    $('html, body').animate({ scrollTop: sectionOffset - $header.height() });
                }
            }
        },
        filter: function() {

            var $filter = $('.filter'),
                $list,
                filterValue;

            $filter.on('click', 'a', function(){

                $list = $($(this).parents('.filter').data('filter-list'));
                filterValue = $(this).attr('data-filter');

                $list.children().filter('.not-matched').removeClass('not-matched');
                if(filterValue!="*") $list.children().not(filterValue).addClass('not-matched');

                $(this).parents('ul').find('.active').removeClass('active');
                $(this).parent('li').addClass('active');

                return false;
            });

        },
        map: function() {

            var $googleMap = $('#google-map');

            if($googleMap.length>0) {
                var yourLatitude = $googleMap.data('latitude');   
                var yourLongitude = $googleMap.data('longitude');  
                var pickedStyle = $googleMap.data('style');     
                var dark = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
                var light = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
                var dream = [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}];
                var paper = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#0066ff"},{"saturation":74},{"lightness":100}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"},{"weight":0.6},{"saturation":-85},{"lightness":61}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#5f94ff"},{"lightness":26},{"gamma":5.86}]}];

                var pickedStyle = $googleMap.data('style');   

                var myOptions = {
                    zoom: 14,
                    center: new google.maps.LatLng(yourLatitude,yourLongitude),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: true,
                    scaleControl: false,
                    streetViewControl: false,
                    scrollwheel: false,
                    styles: eval(pickedStyle)
                };

                var map = new google.maps.Map(document.getElementById('google-map'), myOptions);
                var image = pickedStyle == 'dark' ? 'assets/img/location-pin-light.png' : 'assets/img/location-pin.png';
                var myLatLng = new google.maps.LatLng(yourLatitude,yourLongitude);
                var myLocation = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image
                });
            }
                
                

        }
    },
    Component: {
        init: function() {  

            this.ajaxModal(); 
            this.carousel(); 
            this.forms();
            this.modal();
            this.progressBar();
            this.tabs(); 

            $('.contact-toggle').on('click', function(){
                var $self = $(this);
                $self.parent('.contact-box').toggleClass('not-visible');
                $self.siblings('.contact-box-content').stop().fadeToggle(500);
                return false;
            });

            $('*[data-toggle="mobile-nav"]').on('click', function(){
                $(this).toggleClass('active');
                $body.toggleClass('mobile-nav-open');
                return false;
            });

            $('#header-toggle').on('click', function(){
                $header.toggleClass('uncollapsed');
                $(this).toggleClass('active');
                setTimeout(function(){
                    Sukces.Component.tabs(); 
                    $('.masonry','#content').masonry('layout');
                    Waypoint.refreshAll(); 
                },500);
                return false; 
            });

        },
        ajaxModal: function() {

            $body.append('<div id="ajax-tmp"></div>');

            var toLoad;
            var offsetTop;

            var $ajaxLoader = $('#ajax-loader');
            var $ajaxModal = $('#ajax-modal');
            var $ajaxTmp = $('#ajax-tmp');
            
            function loadContent() {　

               $ajaxTmp.load(toLoad + ' #content', function() {

                    $ajaxModal.show(0).addClass('loading-started');
                    $ajaxLoader.fadeIn(200).css('display','inline-block');

                    var $self = $(this);

                    $self.waitForImages({
                        finished: function() {
                            $ajaxModal.html($ajaxTmp.html());

                            setTimeout(function(){
                                $('html').addClass('locked-scrolling');
                                $ajaxModal.addClass('loading-finished').children('#content').fadeIn(500);
                                $body.addClass('ajax-modal-loaded');
                                $ajaxLoader.fadeOut(400);
                                $ajaxTmp.html('');
                            },1200);
                        },
                        waitForAll: true
                    });
               });

        　  }

            function closeDetails() {
                $('html').removeClass('locked-scrolling');
                $(document).scrollTop(offsetTop);
                $ajaxModal.fadeOut(200, function() {
                    $(this).removeClass('loading-started loading-finished');
                });
                $body.removeClass('ajax-modal-loaded');
            }

            $body.delegate('*[data-toggle="ajax-modal"]','click', function() {
                offsetTop = $(document).scrollTop();
                toLoad = $(this).attr('href');　
                loadContent();
                return false; 
            });

            $body.delegate('*[data-dismiss="ajax-modal"]','click', function(){
                closeDetails();
                return false;
            });

        },
        carousel: function() {

            $('.carousel').each(function(){

                var items, singleItem, autoPlay, transition, drag, stopOnHover, navigation, pagination;

                items = $(this).data('items');
                singleItem = $(this).data('single-item');
                autoPlay =  $(this).data('autoplay');
                transition = !$(this).data('transition') ? false : $(this).data('transition');
                pagination = !$(this).data('pagination') ? false : true;
                navigation = !$(this).data('navigation') ? false : true;
                drag = transition=="fade" ? false : true;
                stopOnHover = transition=="fade" || pagination==false || navigation==false ? false : true;

                $(this).owlCarousel({
                    items: items,
                    itemsDesktop: [1199,Math.ceil(items*0.6)], 
                    itemsDesktopSmall: [991,Math.ceil(items*0.5)],
                    itemsTablet: [768,Math.ceil(items*0.4)],
                    itemsMobile: [479,Math.ceil(items*0.2)],
                    singleItem: singleItem,
                    autoPlay: autoPlay,
                    pagination: pagination,
                    navigation: navigation,
                    navigationText: false,
                    slideSpeed: 800,
                    stopOnHover: stopOnHover,
                    transitionStyle: transition,
                    mouseDrag: drag,
                    touchDrag: drag,
                    addClassActive: true
                });

            });
        },
        forms: function(){

            /* Notification Bar */
            var $notificationBar = $('#notification-bar'),
                $notificationClose = $('#notification-bar').find('.close-it');

            var showNotification = function(type,msg) {
                $notificationBar.html('<div class='+type+'>'+msg+'<a href="#" class="close-it"><i class="ti-close"></i></a></div>');
                setTimeout(function(){
                    $notificationBar.addClass('visible');
                }, 400);
                setTimeout(function(){
                    $notificationBar.removeClass('visible');
                }, 10000);
            };

            $body.delegate('#notification-bar .close-it','click', function(){
                closeNotification();
                return false;
            });

            var closeNotification = function() {
                $notificationBar.removeClass('visible');
            }

            /* Validate Form */
            $('.validate-form').each(function(){
                $(this).validate({
                    validClass: 'valid',
                    errorClass: 'error',
                    onfocusout: function(element,event) {
                        $(element).valid();
                    },
                    errorPlacement: function(error,element) {
                        return true;
                    },
                    rules: {
                        email: {
                            required    : true,
                            email       : true
                        }
                    }
                });
            });


            // Contact Form
            var $contactForm  = $('#contact-form'),
                $contactPopup = $('#contact-popup'),
                offsetTop = 0,
                contactTimer = null;

            $('[data-toggle="contact-popup"]').on('click', function(){
                if($body.hasClass('contact-popup-open')) {
                    clearTimeout(contactTimer);
                    $html.removeClass('locked-scrolling');
                    $(document).scrollTop(offsetTop);
                    $body.toggleClass('contact-popup-open');
                    contactTimer = setTimeout(function(){
                        $contactPopup.hide();
                    },900);
                } else {
                    clearTimeout(contactTimer);
                    $contactPopup.show(function(){
                        $body.toggleClass('contact-popup-open');
                    });
                    offsetTop = $(window).scrollTop();
                    contactTimer = setTimeout(function(){
                        $html.addClass('locked-scrolling');
                    },900);
                }
                return false;
            }); 

            if($contactForm.length>0) {
            
                var $contactFormActiveStep = $contactForm.find('.step.active'),
                    $contactFormNextStep = $contactFormActiveStep.next(),
                    $contactFormPrevStep = null,
                    $contactFormStatus = $contactForm.find('.form-status'),
                    $contactFormSender = $contactForm.find('#sender');

                $contactFormActiveStep.show();
                $contactFormNextStep.addClass('next');

                $('[data-target="form-next-step"]').on('click', function(){

                    if($contactForm.valid()) {

                        $contactFormSender.html($('#name').val() + ' (' +  $('#email').val() + ')&#x200E;');
                        $contactFormActiveStep.removeClass('active');
                        setTimeout(function(){
                            $contactFormActiveStep.hide(0,function(){
                                $contactFormPrevStep = $contactFormActiveStep;
                                $contactFormActiveStep = $contactFormNextStep;
                                $contactFormNextStep.show(0).addClass('active');
                            });
                        },500);
                        $contactFormStatus.text('2/2');

                    }
                    
                    return false;

                });

                $('[data-target="form-prev-step"]').on('click', function(){

                    $contactFormActiveStep.removeClass('active');
                    setTimeout(function(){
                        $contactFormActiveStep.hide(0,function(){
                            $contactFormNextStep = $contactFormActiveStep;
                            $contactFormActiveStep = $contactFormPrevStep;
                            $contactFormPrevStep.show(0).addClass('active');
                        });
                    },500);
                    $contactFormStatus.text('1/2');
                    
                    return false;

                });

                $contactForm.submit(function() {
                    var $btn = $(this).find('.btn-submit');
                    var $form = $(this);
                    var response;
                    if ($form.valid()){
                        $btn.addClass('loading');
                        $.ajax({
                            type: 'POST',
                            url:  'assets/php/contact-form.php',
                            data: $form.serialize(),
                            error       : function(err) { setTimeout(function(){ $btn.addClass('error'); }, 1200); },
                            success     : function(data) {
                                if (data != "success") {
                                    response = 'error';
                                } else {
                                    response = 'success';
                                }
                                setTimeout(function(){
                                    $btn.addClass(response);
                                }, 400);
                            },
                            complete: function(data) {
                                setTimeout(function(){
                                    $btn.removeClass('loading error success');
                                }, 10000);
                            }
                        });
                        return false;
                    }
                    return false;
                });

            }

        },
        modal: function() {

            $('[data-toggle="video-modal"]').on('click', function() {
                var modal = $(this).data('target'),
                    video = $(this).data('video')

                $(modal + ' iframe').attr('src', video + '?autoplay=1');
                $(modal).modal('show');

                $(modal).on('hidden.bs.modal', function () {
                    $(modal + ' iframe').removeAttr('src');
                })

                return false;
            });

        },
        progressBar: function() {
            $('.progress-bar').appear(function() {
                $(this).each(function() {
                    var value;
                    value = $(this).attr('aria-valuenow');
                    $(this).html(value + '%').css('width', value + '%');
                });
            });
        },
        tabs: function() {
            window.setTabs = function() {
                $('.tabs-wrapper').each(function(){

                    var $selector = $(this).children('.selector'),
                        $elActive = $(this).find('.active'),
                        navOffset = $(this).offset().left,
                        thisOffset = $elActive.offset().left,
                        offset = thisOffset - navOffset,
                        width = $elActive .outerWidth();

                    $selector.css({
                        'width': width+'px',
                        'left': offset+'px'
                    });
                });
            }

            $('.tabs-wrapper > .nav-tabs > li > a').on('click', function(){
                var $selector = $(this).parents('.tabs-wrapper').children('.selector'),
                    navOffset = $(this).parents('.tabs-wrapper').offset().left,
                    thisOffset = $(this).offset().left,
                    offset = thisOffset - navOffset,
                    width = $(this).outerWidth();

                    $selector.css({
                        'width': width+'px',
                        'left': offset+'px'
                    });
            });
        },
        typing: function() {
            $('.typing').appear(function(){
                $(this).each(function(){
                    var text = $(this).data('text');
                    var height = $(this).height();
                    $(this).html('').parent('.typing-wrapper').css('min-height',height+'px');
                    $(this).typed({
                        strings: text,
                        startDelay: 1000,
                        typeSpeed: 50,
                        backDelay: 1500,
                        contentType: 'html'
                    });
                });
            });
        },
        tooltip: function() {
            $("[data-toggle='tooltip']").tooltip();
        }
    }
};

$(document).ready(function (){
    Sukces.init();
});

$(window).scroll(function(){
    setHeader();
});

$(window).resize(function(){
    $header.removeClass('uncollapsed');
    $body.removeClass('mobile-nav-open');
    $('.nav-toggle').each(function(){
        $(this).removeClass('active');
    });
    setTabs();
    setMenuSelector();
});

$(window).load(function(){
    $body.addClass('loaded');
    Sukces.Component.typing();
    setTabs();
    setMenuSelector();
    if($pageLoader.length != 0) {
        $('#page-loader').fadeOut(600, function(){
            Sukces.Basic.animations();
        });
    } else {
        Sukces.Basic.animations();
    }
});


