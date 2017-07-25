jQuery(function($) {
    "use strict";
    $('[rel=tooltip]').tooltip();
    $('input, textarea').placeholder();
    $('#mc_mv_EMAIL').attr('placeholder', 'Type your email address');
    if ($('#testimonials').length) {
        $('#testimonials').cycle();
    }
   


    var sectionFunction = function() {

        $('.section-style').each(function() {
            if ($(this).next().hasClass('section-style')) {
                $(this).css('marginBottom', '0px');
            }

            if ($(this).hasClass('transparency_section')) {
                var height = $(this).outerHeight();
                $(this).css({
                    'marginTop': '-' + height + 'px'
                });
            }

            if ($(this).is(':last-child') && $(this).parent().hasClass('composer_content')) {
                $(this).parent().css('padding-bottom', '0px');
            }
            if ($(this).is(':first-child') && $(this).parent().hasClass('composer_content')) {
                var style = $(this).parent().attr('style');
                if (typeof style == "undefined")
                    style = '';
                $(this).parent().attr('style', style + 'padding-top:0px !important;');
            }
        });


        $('.transparency_section').not('.section-style').each(function() {
            var height = $(this).outerHeight();
            $(this).css('margin-top', '-' + height + 'px');
        });

        if ($(window).width() < 767) {
            transparentResp();
            horizontalSections();
        }

    }
    $.fn.swiperInit = function(nr) {
        return this.each(function() {
            var slide = $(this);

            var slidenr = typeof nr !== 'undefined' ? nr : slide.data('nr');

            var mySwiper = $(this).swiper({
                slidesPerView: slidenr,
                mode: 'horizontal',
                onFirstInit: function(swiper) {

                }
            });

        });
    };

    var window_width = $(document).width();
    if (window_width > 767 && window_width < 1100)
        $('.swiper-container').swiperInit(3);
    else if (window_width <= 767)
        $('.swiper-container').swiperInit(1);
    else
        $('.swiper-container').swiperInit();

    var transparentResp = function() {

        $('.transparency_section.section-style').each(function() {
            var currentColor = $(this).css('background-color');
            var lastComma = currentColor.lastIndexOf(',');
            var newColor = "rgb(" + currentColor.slice(5, lastComma) + ")";
            $(this).css('background-color', newColor);

            var $prev = $(this).prev();

            if ($prev.length > 0 && $prev.hasClass('section-style')) {
                var prev_p_t = $prev.css('padding-top');
                var prev_p_b = $prev.css('padding-bottom');

                if (prev_p_t != prev_p_b) {
                    $prev.css({
                        paddingBottom: ''
                    });
                    var style = $prev.attr('style');
                    if (typeof style == "undefined")
                        style = '';
                    $prev.attr('style', style + 'padding-bottom:' + prev_p_t + ' !important;');
                }
                //alert(prev_p_t + ' ' + prev_p_b);

            }

        });
    };

    var horizontalSections = function() {
        $('.first_section_over').each(function() {
            var $parent = $(this).parents('.section-style');
            var first_height = $parent.find('.wpb_column').first().height();
            var second_height = $parent.find('.wpb_column').last().height();

            if (second_height > first_height)
                $parent.find('.wpb_column').first().css('height', second_height + 'px');

            if (second_height < first_height)
                $parent.find('.wpb_column').first().css('height', first_height + 'px');

        });
    };

    $(window).bind('load', function() {
        sectionFunction();
        setTimeout(function() {
            sectionFunction();
        }, 400);
        navigationScript();
        //boxedLayout();
    });


    // initialize Masonry after all images have loaded 
    var $container_blog = $('#blogmasonry .row.filterable');
    $container_blog.imagesLoaded(function() {
        $container_blog.masonry({
            itemSelector: '.grid',
            columnWidth: 0
        });
    });

    // trigger Masonry as a callback



    $("#tweet_footer").each(function() {
        var $self = $(this);
        $self.carouFredSel({
            circular: true,
            infinite: true,
            auto: false,
            scroll: {
                items: 1,
                fx: "fade"
            },
            prev: {
                button: $self.parent().parent().find('.back')
            },

            next: {
                button: $self.parent().parent().find('.next')
            }




        });


    });










    $('.header_1 nav .menu li .sub-menu').each(function() {
        $(this).parent().first().addClass('hasSubMenu');
    });

    $('header#header a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('.sect_' + this.hash.slice(1));
            if (target.length) {
                var scrollto = target.offset().top;
                if ($('.sticky_header').length > 0)
                    scrollto = scrollto - $('.sticky_header').height();
                $('html,body').animate({
                    scrollTop: scrollto
                }, 1000);

                return false;
            }

        }
    });




    var onePageNav = function() {
        $('.section-style').waypoint(function(direction) {
            //var activeSection = $(this).next();
            var activeSection = $(this);
            if (direction === 'down') {
                activeSection = $(this).next();
            }
            //activeSection = $(this);
            var sectionClass = activeSection.attr('class');
            sectionClass = sectionClass.split(" ");
            sectionClass = sectionClass[0];
            sectionClass = sectionClass.split("_");
            sectionClass = sectionClass[1];

            $('header#header #navigation nav ul li').removeClass('current-menu-item');
            $('header#header nav ul li a[href="#' + sectionClass + '"]').parent().addClass('current-menu-item');
        });
    };

    if ($('body').hasClass('one_page'))
        onePageNav();

    var navigationScript = function() {
        $('nav .menu').live('mouseleave', function(event) {


            $(this).find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').css('display', 'none');

            $(this).find('.themeple_custom_menu_mega_menu').css('display', 'none');
        });

        $('nav .menu > li').live('mouseenter', function() {
            $(this).parent().find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').stop(true, true).css('display', 'none');
            $(this).find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').first().stop(true, true).css('display', 'block');

            $(this).parent().find('.themeple_custom_menu_mega_menu').stop(true, true).css('display', 'none');
            $(this).find('.themeple_custom_menu_mega_menu').first().stop(true, true).css('display', 'block');
        });

        $('nav .menu > li ul > li').live('mouseenter', function() {
            $(this).parent().find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').stop(true, true).css('display', 'none');
            $(this).find('.sub-menu').not('.themeple_custom_menu_mega_menu .sub-menu').stop(true, true).first().css('display', 'block');

            $(this).parent().find('.themeple_custom_menu_mega_menu').stop(true, true).css('display', 'none');
            $(this).find('.themeple_custom_menu_mega_menu').stop(true, true).first().css('display', 'block');
        });
    };


    var stickyNavTop = $('.top_wrapper').offset().top;

    var stickyNav = function() {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop && !$('header#header').hasClass('fixed_header')) {
            $('header#header').addClass('fixed_header');
            navigationScript();
        } else if (scrollTop < stickyNavTop) {
            $('header#header').removeClass('fixed_header');
        }
    };

    if ($('.sticky_header').length > 0) {
        $(window).scroll(function() {
            stickyNav();
        });
    }

    $('.googlemap.fullwidth_map').each(function() {
        var $parent = $(this).parents('.row-dynamic-el').first();
        if ($parent.next().hasClass('section-style'))
            $parent.css('margin-bottom', '0px');
    });

    /*	$('.blog-article.grid .media img').first().imagesLoaded(function(){
			var first_height = $('.blog-article.grid .media img').first().height();
			
			$('.blog-article.grid iframe').each(function(){
				$(this).css('height', first_height+'px');
				$(this).parent('.media').css('height', first_height+'px');
			});
		});*/


    $(".section-style.parallax_section .parallax_bg").each(function(i, el) {
        if (i + 1 == $(".section-style.parallax_section .parallax_bg").length)
            $(el).parallax("50%", 0.04);
        else
            $(el).parallax("50%", 0.2);
    });

    $('.row-google-map').each(function() {
        if ($('.fullwidth_map', $(this)).length > 0) {
            var $parent = $(this).parents('.row-dynamic-el').first();
            $parent.css('margin-top', '0px');
        }

    });


    if ($('.header_page.centered').length > 0) {
        var $bread = $('.header_page.centered .breadcrumbss');
        var margin = ($bread.width() / 2) - 5;

        $bread.css('marginLeft', '-' + margin + 'px');
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.dynamic_page_header .btns').each(function() {
        var width = $(this).width();
        $(this).css('width', (width + 10) + 'px');
        $(this).css('float', 'none');
    });


    $('.arrow_down').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    $(function() {

        if ($("#float_side").length > 0 && $(".slider_full").length > 0) {
            var $sidebar = $("#float_side"),
                $slider_full = $(".slider_full"),
                $window = $(window),
                offset = $sidebar.offset(),
                topPadding = 15,
                margin = 0

            $window.scroll(function() {



                if ($window.scrollTop() > offset.top && $window.scrollTop() <= $slider_full.height()) {



                    $sidebar.stop().animate({
                        marginTop: $window.scrollTop() - offset.top + topPadding
                    });

                } else {

                    $sidebar.stop().animate({
                        marginTop: 0
                    });

                }
            });
        }

    });

    $(".accordion-group .accordion-toggle").live('click', function() {
        var $self = $(this).parent().parent();
        if ($self.find('.accordion-heading').hasClass('in_head')) {
            $self.parent().find('.accordion-heading').removeClass('in_head');
        } else {
            $self.parent().find('.accordion-heading').removeClass('in_head');
            $self.find('.accordion-heading').addClass('in_head');
        }
    });

    if ($('.recent_sc_portfolio').length) {
        $('.recent_sc_portfolio').imagesLoaded(function() {

            $(this).carouFredSel({

                items: 6,
                responsive: true,
                scroll: {
                    items: 6
                },
                prev: {
                    button: $(this).parent().parent().find('.prev')
                },

                next: {
                    button: $(this).parent().parent().find('.next')
                }


            });

        });
    }

    $('.small_widget a').not('.aaaa a').toggle(function(e) {

        $('.small_widget').removeClass('active');
        e.preventDefault();
        var box = $(this).data('box');
        $('.top_nav_sub').hide();
        $('.top_nav_sub.' + box).fadeIn("400");
        $(this).parent().addClass('active');

    }, function(e) {
        e.preventDefault();
        var box = $(this).data('box');
        $('.small_widget').removeClass('active');
        $('.top_nav_sub').fadeOut('400');
        $('.top_nav_sub.' + box).fadeOut('slow');


    });



    $(document).mouseup(function(e) {
        var container = $(".small_widget");

        if (!container.is(e.target) // if the target of the click isn't the container...
            && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $('.top_nav_sub').fadeOut('400');
        }
    });


    /*$("audio,video").mediaelementplayer();  */
    $(".lightbox-gallery").fancybox();
    $('.show_review_form').fancybox();
    $('.lightbox-media').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        helpers: {
            media: {}
        }
    });




    var circleTestimonial = function() {
        $(".carousel_testimonial").each(function() {
            var width = $(this).parents('.wpb_content_element').width();
            $('.circle_testimonial', $(this)).width(width + 'px');
            var $self = $(this);
            $self.imagesLoaded(function() {
                $self.carouFredSel({
                    circular: true,
                    infinite: true,
                    auto: true,

                    scroll: {
                        items: 1,
                        fx: 'fade'
                    }


                });
            });
        });
    };

    circleTestimonial();

    var singleTestimonialInit = function() {
        $(".carousel_single_testimonial").each(function() {
            var width = $(this).parents('.wpb_content_element').width();
            $('.single_testimonial', $(this)).width(width + 'px');

            var $self = $(this);
            $self.imagesLoaded(function() {
                var img_height = $('.single_testimonial .content', $(this)).height();
                $('.single_testimonial .content', $(this)).css('min-height', (img_height - 62) + 'px');
                $self.carouFredSel({
                    circular: true,
                    infinite: true,
                    auto: true,

                    scroll: {
                        items: 1,
                        fx: 'fade'
                    },

                    pagination: $self.parents('.wpb_content_element').find('.pagination'),



                    prev: {

                        button: $self.parents('.wpb_content_element').find('.prev')

                    },

                    next: {

                        button: $self.parents('.wpb_content_element').find('.next')

                    }

                });
            });
        });
    };

    singleTestimonialInit();

    $('#logo a').live('click', function(e) {
        var link = $(this).attr("href");
        document.cookie = 'themeple_skin=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setTimeout(function() {

            window.location.href = link;

        }, 1000);
    });

    $(".menu a").live('click', function(e) {
        var button = $(this);
        document.cookie = 'themeple_skin=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'themeple_header=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        if (typeof $(button).attr('title') != 'undefined' && $(button).attr('title').length > 0) {
            e.preventDefault();
            var title = button.attr('title').split("-");
            var blog = title[0].split("_");
            var third = [0];
            var fourth = [0];
            if (title[1])
                var sidebar = title[1].split("_");
            if (title[2])
                third = title[2].split("_");
            if (title[3])
                fourth = title[3].split("_");
            var sidebar_pos = '';
            var blog_type = '';
            if (blog[0] === 'blog') {
                sidebar_pos = sidebar[1];
                blog_type = blog[1];
                document.cookie = 'themeple_blog=' + blog_type;
                document.cookie = 'themeple_sidebar=' + sidebar_pos;
                setTimeout(function() {
                    window.location.hash = "#wpwrap";
                    window.location.href = $(button).attr("href");

                }, 1000);
            }


            if (blog[0] === 'skin') {

                var skin = title[1];
                document.cookie = 'themeple_skin=' + skin;
                setTimeout(function() {
                    window.location.hash = "#wpwrap";
                    window.location.href = $(button).attr("href");

                }, 1000);
            }


            if (blog[0] === 'header') {

                blog_type = blog[1];
                if (blog_type == 'header_10') {
                    blog_type = 'header_5';
                    $('.top_nav .widget.icl_languages_selector').css({
                        display: 'none'
                    });
                    $('.top_nav #nav_menu-4').css({
                        display: 'block'
                    });
                }
                document.cookie = 'themeple_header=' + blog_type;

                setTimeout(function() {
                    window.location.hash = "#wpwrap";
                    window.location.reload(true);

                }, 1000);
            }

            if (third[0].length > 0) {
                if (third[0] == 'columns' || third[0] == 'authimg') {
                    if (third[0] == 'columns')
                        document.cookie = 'masonry_cols=' + third[1];
                    if (third[0] == 'authimg')
                        document.cookie = 'authimg=' + third[1];
                    setTimeout(function() {

                        window.location.href = $(button).attr("href");

                    }, 1000);
                }
            }


            if (fourth[0].length) {
                if (fourth[0] == 'columns' || fourth[0] == 'authimg') {
                    if (fourth[0] == 'columns')
                        document.cookie = 'masonry_cols=' + fourth[1];
                    if (fourth[0] == 'authimg')
                        document.cookie = 'authimg=' + fourth[1];
                    setTimeout(function() {

                        window.location.href = $(button).attr("href");

                    }, 1000);
                }
            }


            if (title[0] === 'portfolio_single') {



                document.cookie = 'portfolio_single=' + title[1];
                setTimeout(function() {

                    window.location.href = $(button).attr("href");

                }, 1000);


            }
        } else {
            document.cookie = 'themeple_skin=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            setTimeout(function() {

                window.location.href = $(button).attr("href");

            }, 1000);

        }
    });

    $(".carousel_blog").each(function() {
        var $self = $(this);


        if ($('li img', $self).size()) {
            $('li img', $self).one("load", function() {
                $self.carouFredSel({

                    circular: true,
                    infinite: true,
                    auto: false,

                    scroll: {

                        items: 1
                    },

                    pagination: $self.parents('.wpb_content_element').find('.pagination')



                }, {
                    debug: true
                });
            }).each(function() {
                if (this.complete) $(this).trigger("load");
            });
        } else {
            $self.carouFredSel({

                circular: true,
                infinite: true,
                auto: false,

                scroll: {

                    items: 1
                },

                pagination: $self.parents('.wpb_content_element').find('.pagination')




            });
        }






    });



    if ($('.clients.clients_caro').length) {
        $('.clients.clients_caro').imagesLoaded(function() {
            var $self = $('.clients.clients_caro');

            $('.clients.clients_caro').carouFredSel({
                items: 6,
                auto: false,
                scroll: {
                    items: 1
                },
                prev: {

                    button: $self.parent('.clients_el').find('.prev')
                },

                next: {

                    button: $self.parent('.clients_el').find('.next')

                }


            });
        });
    }

    function carousel_port_init() {
        $(".carousel.carousel_portfolio").each(function() {
            var $self = $(this);

            $self.imagesLoaded(function() {
                $self.carouFredSel({

                    circular: false,
                    infinite: false,
                    auto: false,

                    scroll: {
                        items: 1
                    },

                    prev: {

                        button: $('.recent_portfolio.pagination').find('.prev')

                    },

                    next: {

                        button: $('.recent_portfolio.pagination').find('.next')

                    }
                });
                var height = $self.height();

                $self.css('height', height + 5 + 'px');
                $self.parent().css('height', height + 5 + 'px');
            });


        });
    }

    carousel_port_init();


    function carousel_news_init() {
        $(".news-carousel").each(function() {
            var $self = $(this);

            $self.imagesLoaded(function() {
                $self.carouFredSel({

                    circular: false,
                    infinite: false,
                    auto: false,
                    width: "auto",


                    scroll: {
                        items: 2,
                        fx: "fade"

                    },

                    items: {

                        height: 330,

                    },

                    prev: {

                        button: $('.recent_news .pagination').find('.prev')

                    },

                    next: {

                        button: $('.recent_news .pagination').find('.next')

                    }
                });



            });


        });
    }

    carousel_news_init();



    function carousel_news_s2_init() {
        $(".news-carousel.style_2").each(function() {
            var $self = $(this);

            $self.imagesLoaded(function() {
                $self.carouFredSel({

                    circular: false,
                    infinite: false,
                    auto: false,
                    width: "auto",


                    scroll: {
                        items: 2,
                        fx: "fade"

                    },

                    items: {

                        height: 370,

                    },

                    prev: {

                        button: $('.recent_news .pagination').find('.prev')

                    },

                    next: {

                        button: $('.recent_news .pagination').find('.next')

                    }
                });



            });


        });
    }

    carousel_news_s2_init();



    if ($('.carousel_shortcode ul').length) {
        $('.carousel_shortcode ul').each(function() {
            var $self = $(this);
            var prev_b = $self.parents('.row-dynamic-el').first().prev().find('.prev');
            if (prev_b.length == 0)
                prev_b = $self.parents('.carousel_shortcode').first().prev().find('.prev');

            var next_b = $self.parents('.row-dynamic-el').first().prev().find('.next');
            if (next_b.length == 0)
                next_b = $self.parents('.carousel_shortcode').first().prev().find('.next');

            $self.imagesLoaded(function() {


                $self.carouFredSel({
                    items: 4,
                    auto: false,
                    scroll: {
                        items: 1
                    },
                    prev: {

                        button: prev_b
                    },

                    next: {

                        button: next_b

                    }


                });
            });

        });
    }



    if ($().mobileMenu) {
        $('#navigation nav').each(function() {
            $(this).mobileMenu();
            $('.select-menu').customSelect();
        });

    }


    $('.flexslider').not('.with_text_thumbnail, .with_thumbnails, .with_thumbnails_carousel, .vertical_slider').each(function() {
        var $s = $(this);
        $s.flexslider({
            slideshowSpeed: 6000,
            animationSpeed: 800,

            controlNav: '',
            pauseOnAction: true,
            pauseOnHover: false,
            start: function(slider) {

                $s.find(" .slides > li .flex-caption").each(function() {
                    var effect_in = $(this).attr("data-effect-in");
                    var effect_out = $(this).attr("data-effect-out");
                    $(this).addClass("animated " + effect_in);


                });

            },
            before: function(slider) {
                var current_slide = $s.find(".slides > li").eq(slider.currentSlide);
                $s.find(".slides > li .flex-caption").removeClass('animated');
                $(".flex-caption", current_slide).each(function() {
                    var effect_in = $(this).attr("data-effect-in");
                    var effect_out = $(this).attr("data-effect-out");

                    $(this).removeClass("animated " + effect_in).addClass("animated " + effect_out);
                });
            },
            after: function(slider) {
                var current_slide = $s.find(".slides > li").eq(slider.currentSlide);
                $s.find(".slides > li .flex-caption").removeClass('animated');
                $(".flex-caption", current_slide).each(function() {
                    var effect_in = $(this).attr("data-effect-in");
                    var effect_out = $(this).attr("data-effect-out");

                    $(this).removeClass("animated " + effect_out).addClass("animated " + effect_in);
                });

            }
        });
    });

    $(".flexslider.with_thumbnails").flexslider({

        animation: "slide",
        controlNav: "thumbnails",


    });

    var sliderThumb = function() {

        $('.with_thumbnails_container').each(function() {
            var slider = $(this);
            var slider_content = $('.with_thumbnails', slider);
            var slider_carousel = $('.with_thumbnails_carousel', slider);
            var column_width = slider.width();
            var iNr = Math.floor(column_width / 114);
            var iWidth = (column_width - ((iNr - 1) * 10)) / iNr;
            slider_carousel.flexslider({
                animation: "slide",
                controlNav: "thumbnails",
                directionNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: iWidth,
                itemMargin: 7,
                asNavFor: slider_content,


            });

            slider_content.flexslider({
                animationSpeed: 400,
                animation: "fade",
                pauseOnHover: false,
                controlNav: false,
                sync: slider_carousel,
                start: function(slider) {

                    slider_content.find(" .slides > li .flex-caption").each(function() {
                        var effect_in = $(this).attr("data-effect-in");
                        var effect_out = $(this).attr("data-effect-out");
                        $(this).addClass("animated " + effect_in);


                    });
                },
                before: function(slider) {
                    var current_slide = slider_content.find(".slides > li").eq(slider.currentSlide);
                    slider_content.find(".slides > li .flex-caption").removeClass('animated');
                    $(".flex-caption", current_slide).each(function() {
                        var effect_in = $(this).attr("data-effect-in");
                        var effect_out = $(this).attr("data-effect-out");

                        $(this).removeClass("animated " + effect_in).addClass("animated " + effect_out);
                    });
                },
                after: function(slider) {
                    var current_slide = slider_content.find(".slides > li").eq(slider.currentSlide);
                    slider_content.find(".slides > li .flex-caption").removeClass('animated');
                    $(".flex-caption", current_slide).each(function() {
                        var effect_in = $(this).attr("data-effect-in");
                        var effect_out = $(this).attr("data-effect-out");

                        $(this).removeClass("animated " + effect_out).addClass("animated " + effect_in);
                    });
                }
            });



        });

    };

    sliderThumb();

    $("#attention button.close_button").click(function() {
        $("#attention").height(4);
        $(this).parent().parent().parent().find('.open_button').css('top', 3);
    });
    $("#attention span.open_button").mouseenter(function() {
        $("#attention").height(60);
        $(this).css('top', 59);
    });


    var $container = $('.filterable');

    var portfolioHome = function(nrhome) {

        if ($('.boxed_layout').length > 0)
            window_width = $('.boxed_layout').width();

        var port_size = 100 / nrhome;
        $('.portfolio-item', $home_portfolio).css('width', port_size + '%');
        var width_one = $('.portfolio-item').width();
        $('.items-layout-wide .filterable').width((width_one * nrhome) + 'px');
    };
    var $home_portfolio = $('.home_portfolio');
    if ($('.items-layout-wide').length > 0)
        $home_portfolio = $('.items-layout-wide');
    var nrhome = $home_portfolio.find('section').data('nr');
    if (window_width > 1100)
        portfolioHome(nrhome);
    if (window_width > 981 && window_width <= 1100)
        portfolioHome(3);
    if (window_width > 767 && window_width < 980)
        portfolioHome(2);
    if (window_width < 767)
        portfolioHome(1);


    var portfolioInit = function() {

        if ($('.tpl2 img', $container).size()) {
            $('.tpl2 img', $container).one("load", function() {


                $container.isotope({
                    filter: '*',
                    resizeble: true,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });

            });

            setTimeout(function() {
                $container.isotope({
                    filter: '*',
                    resizeble: true,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
            }, 100);

        }

        $('#filters').on('change', function() {
            // get filter value from option value
            var filterValue = this.value;
            // use filterFn if matches value
            $container.isotope({
                filter: filterValue
            });
        });
    };

    portfolioInit();

    $('.filters_v1 li').each(function() {
        var selector = $(this).find('a').attr('data-filter');

        if ($(selector, $container).length == 0)
            $(this).hide();
    });
    $('.filters_v1 li').click(function() {
        var selector = $(this).find('a').attr('data-filter');
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        $container.isotope({
            filter: selector,

            resizeble: true,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });


    portfolioInit();



    /*var blogMasonry = function(){
		var $contaienr = $('#blogmasonry');
		if( $('.media img', $container).size() ) {
			$('.media img', $container).one("load", function(){
				

					$container.isotope({
						filter: '*',
						resizeble: true,
						animationOptions: {
							duration: 750,
							easing: 'linear',
							queue: false
						}
					});
				
			});

			setTimeout(function(){
				$container.isotope({
					filter: '*',
					resizeble: true,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
			}, 100);
	   
		}
	};
	blogMasonry();*/


    /*$('#blogmasonry').isotope({  
		resizeble: true,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}, 
			itemSelector: '.blog-article'
    });*/


    $('nav#faq-filter li a').click(function(e) {
        e.preventDefault();

        var selector = $(this).attr('data-filter');

        $('.faq .accordion-group').fadeOut();
        $('.faq .accordion-group' + selector).fadeIn();

        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent().addClass('active');
    });

    $("#switcher-head .button").toggle(function() {
        $("#style-switcher").animate({
            left: 0
        }, 500);
    }, function() {
        $("#style-switcher").animate({
            left: -263
        }, 500);
    });





    /* Woocommerce */
    if ($('.add_to_cart_button').length > 0) {

        $('body').on('adding_to_cart', function(event, param1, param2) {
            var $thisbutton = param1;
            var $product = $thisbutton.parents('.product').first();
            var $load = $product.find('.loading_ef');
            $load.css('opacity', 1);
            $('body').on('added_to_cart', function(event, param1, param2) {

                $load.css('opacity', 0);
                $('.widget_activation > span').addClass('cart-items-active');
                setTimeout(function() {
                    $load.html('<i class="moon-checkmark"></i>');
                    $load.css('opacity', 1);
                }, 500);
                setTimeout(function() {
                    $load.css('opacity', 1);
                }, 400);
                setTimeout(function() {
                    $load.css('opacity', 0);
                }, 2000);
                $product.addClass('product_added_to_cart');

            });
        });


    }


    /* End Woocommerce */





    $(".page_item_has_children").each(function() {

        $(this).click(function() {


            $(this).find('.children').toggle(400);
            $(this).toggleClass('open-child');

        });

    });

    $('.right_search').click(function(event) {

        $('#navigation, .right_search_container, #logo, .right_search, .border_before, .logo_desc').fadeToggle();
        event.stopPropagation();

    });


    $('html').click(function(e) {
        if ((e.target.id != 's')) {

            $('.right_search_container').fadeOut();
            $('.header_right_widgetized, .moon-search-3, #navigation, #logo, .right_search, .border_before, .logo_desc').fadeIn();
        }
    });



    $('li.current_page_item').parents('.children').css({
        display: 'block'
    });
    $('.current_page_ancestor').addClass('open-child');


    /* Resize */

    $(window).resize(function() {
        window_width = $(window).width();
        portfolioInit();
        singleTestimonialInit();
        circleTestimonial();
        if (window_width > 767) {
            sectionFunction();
        }
        if (window_width > 767 && window_width < 1100)
            $('.swiper-container').swiperInit(3);
        if (window_width <= 767) {
            transparentResp();
            horizontalSections();
            $('.swiper-container').swiperInit(2);
        }

        if (window_width >= 1100) {
            $('.swiper-container').swiperInit();
        }

        var $home_portfolio = $('.home_portfolio');
        if ($('.items-layout-wide').length > 0)
            $home_portfolio = $('.items-layout-wide');
        var nrhome = $home_portfolio.find('section').data('nr');
        if (window_width > 1100)
            portfolioHome(nrhome);
        if (window_width > 981 && window_width <= 1100)
            portfolioHome(3);
        if (window_width > 767 && window_width < 980)
            portfolioHome(2);
        if (window_width < 767)
            portfolioHome(1);





        sliderThumb();
    }).resize();

    /* End Resize */




    /* End For Online */


    $('.mobile_small_menu').click(function() {
        if ($(this).hasClass('open')) {
            $('.menu-small').slideDown(400);
            $('.tparrows').hide();
            if ($('.one_page_header').length == 0)
                $('.top_wrapper').hide();
            $(this).removeClass('open').addClass('close');
        } else if ($(this).hasClass('close')) {
            $('.menu-small').slideUp(400);
            $('.tparrows').show();
            if ($('.one_page_header').length == 0)
                $('.top_wrapper').show();
            $(this).removeClass('close').addClass('open');
        }
    });


});


var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1100;
    tpopt.startheight = 500;
    tpopt.container = jQuery('#rev_slider_1_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "off";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi1;

tpj(document).ready(function() {

    if (tpj('#rev_slider_1_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_1_1');
    } else {
        revapi1 = tpj('#rev_slider_1_1').show().revolution({
            dottedOverlay: "none",
            delay: 3000,
            startwidth: 1100,
            startheight: 500,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,


            simplifyAll: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 75,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",


            hideTimerBar: "on",
            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/


var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_2_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi2;

tpj(document).ready(function() {

    if (tpj('#rev_slider_2_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_2_1');
    } else {
        revapi2 = tpj('#rev_slider_2_1').show().revolution({
            dottedOverlay: "none",
            delay: 16000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 3,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,

            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],


            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner4",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_6_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi6;

tpj(document).ready(function() {

    if (tpj('#rev_slider_6_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_6_1');
    } else {
        revapi6 = tpj('#rev_slider_6_1').show().revolution({
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "on",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/



var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 500;
    tpopt.container = jQuery('#rev_slider_4_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "off";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi4;

tpj(document).ready(function() {

    if (tpj('#rev_slider_4_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_4_1');
    } else {
        revapi4 = tpj('#rev_slider_4_1').show().revolution({
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 500,
            hideThumbs: 10,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "on",
            hideArrowsOnMobile: "on",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 768,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/


/* LayerSlider settings */
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_1', 'jquery');
    } else {
        lsjQuery("#layerslider_1").layerSlider({
            startInViewport: false,
            pauseOnHover: false,
            forceLoopNum: false,
            autoPlayVideos: false,
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});
/*Layer slider homepage6*/
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_2', 'jquery');
    } else {
        lsjQuery("#layerslider_2").layerSlider({
            responsive: false,
            responsiveUnder: 1280,
            layersContainer: 1280,
            startInViewport: false,
            skin: 'noskin',
            globalBGColor: 'transparent',
            hoverPrevNext: false,
            autoPlayVideos: false,
            yourLogoStyle: 'left: 10px; top: 10px;',
            cbInit: function(element) {},
            cbStart: function(data) {},
            cbStop: function(data) {},
            cbPause: function(data) {},
            cbAnimStart: function(data) {},
            cbAnimStop: function(data) {},
            cbPrev: function(data) {},
            cbNext: function(data) {},
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});


/*Revolutionslider hoempage7*/
var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_7_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi7;

tpj(document).ready(function() {

    if (tpj('#rev_slider_7_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_7_1');
    } else {
        revapi7 = tpj('#rev_slider_7_1').show().revolution({
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "off",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,



            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

/*homepage 9*/

var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_9_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "on";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi9;

tpj(document).ready(function() {

    if (tpj('#rev_slider_9_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_9_1');
    } else {
        revapi9 = tpj('#rev_slider_9_1').show().revolution({
            dottedOverlay: "none",
            delay: 16000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "none",
            navigationArrows: "solo",
            navigationStyle: "round",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,

            parallax: "scroll",
            parallaxBgFreeze: "on",
            parallaxLevels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],


            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner4",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "on",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

/* homepage 11*/

var setREVStartSize = function() {
    var tpopt = new Object();
    tpopt.startwidth = 1170;
    tpopt.startheight = 700;
    tpopt.container = jQuery('#rev_slider_10_1');
    tpopt.fullScreen = "off";
    tpopt.forceFullWidth = "off";

    tpopt.container.closest(".rev_slider_wrapper").css({
        height: tpopt.container.height()
    });
    tpopt.width = parseInt(tpopt.container.width(), 0);
    tpopt.height = parseInt(tpopt.container.height(), 0);
    tpopt.bw = tpopt.width / tpopt.startwidth;
    tpopt.bh = tpopt.height / tpopt.startheight;
    if (tpopt.bh > tpopt.bw) tpopt.bh = tpopt.bw;
    if (tpopt.bh < tpopt.bw) tpopt.bw = tpopt.bh;
    if (tpopt.bw < tpopt.bh) tpopt.bh = tpopt.bw;
    if (tpopt.bh > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    if (tpopt.bw > 1) {
        tpopt.bw = 1;
        tpopt.bh = 1
    }
    tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
    if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") tpopt.height = tpopt.startheight;
    if (tpopt.fullScreen == "on") {
        tpopt.height = tpopt.bw * tpopt.startheight;
        var cow = tpopt.container.parent().width();
        var coh = jQuery(window).height();
        if (tpopt.fullScreenOffsetContainer != undefined) {
            try {
                var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
                jQuery.each(offcontainers, function(e, t) {
                    coh = coh - jQuery(t).outerHeight(true);
                    if (coh < tpopt.minFullScreenHeight) coh = tpopt.minFullScreenHeight
                })
            } catch (e) {}
        }
        tpopt.container.parent().height(coh);
        tpopt.container.height(coh);
        tpopt.container.closest(".rev_slider_wrapper").height(coh);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
        tpopt.container.css({
            height: "100%"
        });
        tpopt.height = coh;
    } else {
        tpopt.container.height(tpopt.height);
        tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
        tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
    }
};

/* CALL PLACEHOLDER */
setREVStartSize();


var tpj = jQuery;
tpj.noConflict();
var revapi10;

tpj(document).ready(function() {

    if (tpj('#rev_slider_10_1').revolution == undefined) {
        revslider_showDoubleJqueryError('#rev_slider_10_1');
    } else {
        revapi10 = tpj('#rev_slider_10_1').show().revolution({
            dottedOverlay: "none",
            delay: 16000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,

            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 4,


            simplifyAll: "off",

            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "preview3",

            touchenabled: "on",
            onHoverStop: "on",
            nextSlideOnWindowFocus: "off",

            swipe_threshold: 0.7,
            swipe_min_touches: 1,
            drag_block_vertical: false,

            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],


            keyboardNavigation: "off",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",

            spinner: "spinner4",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            autoHeight: "off",
            forceFullWidth: "off",



            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0
        });



    }
}); /*ready*/

/*homepage 12*/
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_2', 'jquery');
    } else {
        lsjQuery("#layerslider_2").layerSlider({
            responsive: false,
            responsiveUnder: 1280,
            layersContainer: 1280,
            startInViewport: false,
            skin: 'noskin',
            globalBGColor: 'transparent',
            hoverPrevNext: false,
            autoPlayVideos: false,
            yourLogoStyle: 'left: 10px; top: 10px;',
            cbInit: function(element) {},
            cbStart: function(data) {},
            cbStop: function(data) {},
            cbPause: function(data) {},
            cbAnimStart: function(data) {},
            cbAnimStop: function(data) {},
            cbPrev: function(data) {},
            cbNext: function(data) {},
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});

/*homepage14*/
var lsjQuery = jQuery;
lsjQuery(document).ready(function() {
    if (typeof lsjQuery.fn.layerSlider == "undefined") {
        lsShowNotice('layerslider_1', 'jquery');
    } else {
        lsjQuery("#layerslider_1").layerSlider({
            startInViewport: false,
            pauseOnHover: false,
            forceLoopNum: false,
            autoPlayVideos: false,
            skinsPath: 'assets/plugins/LayerSlider/static/skins/'
        })
    }
});


     /*******************************************/
                

                var setREVStartSize = function() {
                    var tpopt = new Object();
                        tpopt.startwidth = 1170;
                        tpopt.startheight = 700;
                        tpopt.container = jQuery('#rev_slider_3_1');
                        tpopt.fullScreen = "off";
                        tpopt.forceFullWidth="off";

                    tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
                };

                /* CALL PLACEHOLDER */
                setREVStartSize();


                var tpj=jQuery;
                tpj.noConflict();
                var revapi3;

                tpj(document).ready(function() {

                if(tpj('#rev_slider_3_1').revolution == undefined){
                    revslider_showDoubleJqueryError('#rev_slider_3_1');
                }else{
                   revapi3 = tpj('#rev_slider_3_1').show().revolution(
                    {   
                                                dottedOverlay:"none",
                        delay:9000,
                        startwidth:1170,
                        startheight:700,
                        hideThumbs:200,

                        thumbWidth:100,
                        thumbHeight:50,
                        thumbAmount:4,
                        
                                                
                        simplifyAll:"off",

                        navigationType:"bullet",
                        navigationArrows:"solo",
                        navigationStyle:"round",

                        touchenabled:"on",
                        onHoverStop:"off",
                        nextSlideOnWindowFocus:"off",

                        swipe_threshold: 0.7,
                        swipe_min_touches: 1,
                        drag_block_vertical: false,
                        
                                                
                                                
                        keyboardNavigation:"off",

                        navigationHAlign:"center",
                        navigationVAlign:"bottom",
                        navigationHOffset:0,
                        navigationVOffset:20,

                        soloArrowLeftHalign:"left",
                        soloArrowLeftValign:"center",
                        soloArrowLeftHOffset:20,
                        soloArrowLeftVOffset:0,

                        soloArrowRightHalign:"right",
                        soloArrowRightValign:"center",
                        soloArrowRightHOffset:20,
                        soloArrowRightVOffset:0,

                        shadow:0,
                        fullWidth:"on",
                        fullScreen:"off",

                                                spinner:"spinner0",
                                                
                        stopLoop:"off",
                        stopAfterLoops:-1,
                        stopAtSlide:-1,

                        shuffle:"off",

                        autoHeight:"off",
                        forceFullWidth:"off",
                        
                        
                        
                        hideThumbsOnMobile:"off",
                        hideNavDelayOnMobile:1500,
                        hideBulletsOnMobile:"off",
                        hideArrowsOnMobile:"off",
                        hideThumbsUnderResolution:0,

                                                hideSliderAtLimit:0,
                        hideCaptionAtLimit:0,
                        hideAllCaptionAtLilmit:0,
                        startWithSlide:0                    });



                                    }
                }); /*ready*/

(function($,W,D)
{
    var JQUERY4U = {};
 if ($("form[name='contactForm']").length ) {
    JQUERY4U.UTIL =
    {
        setupFormValidation: function()
        {
            //form validation rules
            $("form[name='contactForm']").validate({
                rules: {
                    themeple_name: "required",
                    themeple_message: "required",
                    themeple_subject: "required",
                    themeple_email: {
                        required: true,
                        email: true
                    }
                },
                messages: {
                    themeple_name: "Please enter your name",
                    themeple_message: "Please enter your Message",
                    themeple_subject: "Please enter the Subject",
                    
                    email: "Please enter a valid email address"
                },
                submitHandler: function(form) {
                     $.ajax({
                        url: 'contact.php',
                        type: 'POST',
                        dataType: "json",
                        data: $(form).serialize(),
                        success: function(response) {
                            $('#ajaxresponse').html(response['info']);
                        }            
                    });
                }
            });
        }
    }
 
    //when the dom has loaded setup form validation rules
    $(D).ready(function($) {
        JQUERY4U.UTIL.setupFormValidation();
    });
 }
})(jQuery, window, document);

//SMOOTH
!function(a){a.extend({browserSelector:function(){!function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))}(navigator.userAgent||navigator.vendor||window.opera);var b=navigator.userAgent,d=b.toLowerCase(),e=function(a){return d.indexOf(a)>-1},f="gecko",g="webkit",h="safari",i="opera",j=document.documentElement,k=[!/opera|webtv/i.test(d)&&/msie\s(\d)/.test(d)?"ie ie"+parseFloat(navigator.appVersion.split("MSIE")[1]):e("firefox/2")?f+" ff2":e("firefox/3.5")?f+" ff3 ff3_5":e("firefox/3")?f+" ff3":e("gecko/")?f:e("opera")?i+(/version\/(\d+)/.test(d)?" "+i+RegExp.jQuery1:/opera(\s|\/)(\d+)/.test(d)?" "+i+RegExp.jQuery2:""):e("konqueror")?"konqueror":e("chrome")?g+" chrome":e("iron")?g+" iron":e("applewebkit/")?g+" "+h+(/version\/(\d+)/.test(d)?" "+h+RegExp.jQuery1:""):e("mozilla/")?f:"",e("j2me")?"mobile":e("iphone")?"iphone":e("ipod")?"ipod":e("mac")?"mac":e("darwin")?"mac":e("webtv")?"webtv":e("win")?"win":e("freebsd")?"freebsd":e("x11")||e("linux")?"linux":"","js"];c=k.join(" "),a.browser.mobile&&(c+=" mobile"),j.className+=" "+c;var l=!window.ActiveXObject&&"ActiveXObject"in window;return l?void a("html").removeClass("gecko").addClass("ie ie11"):(a("body").hasClass("dark")&&a("html").addClass("dark"),void(a("body").hasClass("boxed")&&a("html").addClass("boxed")))}}),a.browserSelector()}(jQuery),function(a){var b="waitForImages";a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"]},a.expr[":"].uncached=function(b){if(!a(b).is('img[src][src!=""]'))return!1;var c=new Image;return c.src=b.src,!c.complete},a.fn.waitForImages=function(c,d,e){var f=0,g=0;if(a.isPlainObject(arguments[0])&&(e=arguments[0].waitForAll,d=arguments[0].each,c=arguments[0].finished),c=c||a.noop,d=d||a.noop,e=!!e,!a.isFunction(c)||!a.isFunction(d))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var h=a(this),i=[],j=a.waitForImages.hasImageProperties||[],k=/url\(\s*(['"]?)(.*?)\1\s*\)/g;e?h.find("*").addBack().each(function(){var b=a(this);b.is("img:uncached")&&i.push({src:b.attr("src"),element:b[0]}),a.each(j,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=k.exec(e);)i.push({src:d[2],element:b[0]})})}):h.find("img:uncached").each(function(){i.push({src:this.src,element:this})}),f=i.length,g=0,0===f&&c.call(h[0]),a.each(i,function(e,i){var j=new Image,k="load."+b+" error."+b;a(j).on(k,function l(b){return g++,d.call(i.element,g,f,"load"==b.type),a(this).off(k,l),g==f?(c.call(h[0]),!1):void 0}),j.src=i.src})})}}(jQuery),function(a){function b(a,b){return a.toFixed(b.decimals)}a.fn.countTo=function(b){return b=b||{},a(this).each(function(){function c(){k+=g,j++,d(k),"function"==typeof e.onUpdate&&e.onUpdate.call(h,k),j>=f&&(i.removeData("countTo"),clearInterval(l.interval),k=e.to,"function"==typeof e.onComplete&&e.onComplete.call(h,k))}function d(a){var b=e.formatter.call(h,a,e);i.html(b)}var e=a.extend({},a.fn.countTo.defaults,{from:a(this).data("from"),to:a(this).data("to"),speed:a(this).data("speed"),refreshInterval:a(this).data("refresh-interval"),decimals:a(this).data("decimals")},b),f=Math.ceil(e.speed/e.refreshInterval),g=(e.to-e.from)/f,h=this,i=a(this),j=0,k=e.from,l=i.data("countTo")||{};i.data("countTo",l),l.interval&&clearInterval(l.interval),l.interval=setInterval(c,e.refreshInterval),d(k)})},a.fn.countTo.defaults={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:b,onUpdate:null,onComplete:null}}(jQuery),function(a){"use strict";var b,c={action:function(){},runOnLoad:!1,duration:500},d=c,e=!1,f={};f.init=function(){for(var b=0;b<=arguments.length;b++){var c=arguments[b];switch(typeof c){case"function":d.action=c;break;case"boolean":d.runOnLoad=c;break;case"number":d.duration=c}}return this.each(function(){d.runOnLoad&&d.action(),a(this).resize(function(){f.timedAction.call(this)})})},f.timedAction=function(a,c){var f=function(){var a=d.duration;if(e){var c=new Date-b;if(a=d.duration-c,0>=a)return clearTimeout(e),e=!1,void d.action()}g(a)},g=function(a){e=setTimeout(f,a)};b=new Date,"number"==typeof c&&(d.duration=c),"function"==typeof a&&(d.action=a),e||f()},a.fn.afterResize=function(a){return f[a]?f[a].apply(this,Array.prototype.slice.call(arguments,1)):f.init.apply(this,arguments)}}(jQuery),function(a){a.extend({smoothScroll:function(){function a(){var a=!1;if(document.URL.indexOf("google.com/reader/view")>-1&&(a=!0),t.excluded){var b=t.excluded.split(/[,\n] ?/);b.push("mail.google.com");for(var c=b.length;c--;)if(document.URL.indexOf(b[c])>-1){r&&r.disconnect(),j("mousewheel",d),a=!0,u=!0;break}}a&&j("keydown",e),t.keyboardSupport&&!a&&i("keydown",e)}function b(){if(document.body){var b=document.body,c=document.documentElement,d=window.innerHeight,e=b.scrollHeight;if(y=document.compatMode.indexOf("CSS")>=0?c:b,q=b,a(),x=!0,top!=self)v=!0;else if(e>d&&(b.offsetHeight<=d||c.offsetHeight<=d)){var f=!1,g=function(){f||c.scrollHeight==document.height||(f=!0,setTimeout(function(){c.style.height=document.height+"px",f=!1},500))};c.style.height="auto",setTimeout(g,10);var h={attributes:!0,childList:!0,characterData:!1};if(r=new I(g),r.observe(b,h),y.offsetHeight<=d){var i=document.createElement("div");i.style.clear="both",b.appendChild(i)}}if(document.URL.indexOf("mail.google.com")>-1){var j=document.createElement("style");j.innerHTML=".iu { visibility: hidden }",(document.getElementsByTagName("head")[0]||c).appendChild(j)}else if(document.URL.indexOf("www.facebook.com")>-1){var k=document.getElementById("home_stream");k&&(k.style.webkitTransform="translateZ(0)")}t.fixedBackground||u||(b.style.backgroundAttachment="scroll",c.style.backgroundAttachment="scroll")}}function c(a,b,c,d){if(d||(d=1e3),l(b,c),1!=t.accelerationMax){var e=+new Date,f=e-D;if(f<t.accelerationDelta){var g=(1+30/f)/2;g>1&&(g=Math.min(g,t.accelerationMax),b*=g,c*=g)}D=+new Date}if(B.push({x:b,y:c,lastX:0>b?.99:-.99,lastY:0>c?.99:-.99,start:+new Date}),!C){var h=a===document.body,i=function(){for(var e=+new Date,f=0,g=0,j=0;j<B.length;j++){var k=B[j],l=e-k.start,m=l>=t.animationTime,n=m?1:l/t.animationTime;t.pulseAlgorithm&&(n=p(n));var o=k.x*n-k.lastX>>0,q=k.y*n-k.lastY>>0;f+=o,g+=q,k.lastX+=o,k.lastY+=q,m&&(B.splice(j,1),j--)}h?window.scrollBy(f,g):(f&&(a.scrollLeft+=f),g&&(a.scrollTop+=g)),b||c||(B=[]),B.length?H(i,a,d/t.frameRate+1):C=!1};H(i,a,0),C=!0}}function d(a){x||b();var d=a.target,e=h(d);if(!e||a.defaultPrevented||k(q,"embed")||k(d,"embed")&&/\.pdf/i.test(d.src))return!0;var f=a.wheelDeltaX||0,g=a.wheelDeltaY||0;return f||g||(g=a.wheelDelta||0),!t.touchpadSupport&&m(g)?!0:(Math.abs(f)>1.2&&(f*=t.stepSize/120),Math.abs(g)>1.2&&(g*=t.stepSize/120),c(e,-f,-g),void a.preventDefault())}function e(a){var b=a.target,d=a.ctrlKey||a.altKey||a.metaKey||a.shiftKey&&a.keyCode!==A.spacebar;if(/input|textarea|select|embed/i.test(b.nodeName)||b.isContentEditable||a.defaultPrevented||d)return!0;if(k(b,"button")&&a.keyCode===A.spacebar)return!0;var e,f=0,g=0,i=h(q),j=i.clientHeight;switch(i==document.body&&(j=window.innerHeight),a.keyCode){case A.up:g=-t.arrowScroll;break;case A.down:g=t.arrowScroll;break;case A.spacebar:e=a.shiftKey?1:-1,g=-e*j*.9;break;case A.pageup:g=.9*-j;break;case A.pagedown:g=.9*j;break;case A.home:g=-i.scrollTop;break;case A.end:var l=i.scrollHeight-i.scrollTop-j;g=l>0?l+10:0;break;case A.left:f=-t.arrowScroll;break;case A.right:f=t.arrowScroll;break;default:return!0}c(i,f,g),a.preventDefault()}function f(a){q=a.target}function g(a,b){for(var c=a.length;c--;)E[G(a[c])]=b;return b}function h(a){var b=[],c=y.scrollHeight;do{var d=E[G(a)];if(d)return g(b,d);if(b.push(a),c===a.scrollHeight){if(!v||y.clientHeight+10<c)return g(b,document.body)}else if(a.clientHeight+10<a.scrollHeight&&(overflow=getComputedStyle(a,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return g(b,a)}while(a=a.parentNode)}function i(a,b,c){window.addEventListener(a,b,c||!1)}function j(a,b,c){window.removeEventListener(a,b,c||!1)}function k(a,b){return(a.nodeName||"").toLowerCase()===b.toLowerCase()}function l(a,b){a=a>0?1:-1,b=b>0?1:-1,(w.x!==a||w.y!==b)&&(w.x=a,w.y=b,B=[],D=0)}function m(a){if(a){a=Math.abs(a),z.push(a),z.shift(),clearTimeout(F);var b=z[0]==z[1]&&z[1]==z[2],c=n(z[0],120)&&n(z[1],120)&&n(z[2],120);return!(b||c)}}function n(a,b){return Math.floor(a/b)==a/b}function o(a){var b,c,d;return a*=t.pulseScale,1>a?b=a-(1-Math.exp(-a)):(c=Math.exp(-1),a-=1,d=1-Math.exp(-a),b=c+d*(1-c)),b*t.pulseNormalize}function p(a){return a>=1?1:0>=a?0:(1==t.pulseNormalize&&(t.pulseNormalize/=o(1)),o(a))}var q,r,s={frameRate:60,animationTime:700,stepSize:120,pulseAlgorithm:!0,pulseScale:10,pulseNormalize:1,accelerationDelta:20,accelerationMax:1,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!0,fixedBackground:!0,excluded:""},t=s,u=!1,v=!1,w={x:0,y:0},x=!1,y=document.documentElement,z=[120,120,120],A={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36},B=[],C=!1,D=+new Date,E={};setInterval(function(){E={}},1e4);var F,G=function(){var a=0;return function(b){return b.uniqueID||(b.uniqueID=a++)}}(),H=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(a,b,c){window.setTimeout(a,c||1e3/60)}}(),I=window.MutationObserver||window.WebKitMutationObserver;i("mousedown",f),i("mousewheel",d),i("load",b)}}),navigator.userAgent.toLowerCase().indexOf("chrome")>-1&&a.smoothScroll()}(jQuery);
