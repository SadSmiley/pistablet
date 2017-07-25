<!DOCTYPE html>
<html lang="en-US" class="css3transitions">
<head>
    <meta charset="UTF-8" />
    <base href="{{ URL::to('/themes/'.$shop_theme.'') }}/">
    <!-- Title -->
    <title>Alpha Global Prestige - {{ $page }}</title>
    <link rel="icon"  type="image/png" href="http://alpha-globalprestige.com/assets/front/img/agp.png">
    <!-- Responsive Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <!-- Pingback URL -->
    <link rel="pingback" href="xmlrpc.html" />
    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>

    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>

    <![endif]-->
    <link rel='stylesheet' href='resources/assets/ausart/assets/plugins/LayerSlider/static/css/layerslider.css' type='text/css' media='all' />
    <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Lato:100,300,regular,700,900%7COpen+Sans:300%7CIndie+Flower:regular%7COswald:300,regular,700&amp;subset=latin%2Clatin-ext' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/plugins/revslider/rs-plugin/css/settings.css' type='text/css' media='all' />
    <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Open+Sans%3A100%2C400%2C300%2C500%2C600%2C700%2C300italic' type='text/css' media='all' />
    <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Satisfy' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/style.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/bootstrap.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/bootstrap-responsive.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/odometer-theme-minimal.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/fancybox/source/jquery.fancybox.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/hoverex-all.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/vector-icons.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/font-awesome.min.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/linecon.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/steadysets.css' type='text/css' media='all' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/jquery.easy-pie-chart.css' type='text/css' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/idangerous.swiper.css' type='text/css' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/eldo.css' type='text/css' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/css/custom.css' type='text/css' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/plugins/js_composer/assets/css/js_composer.css' type='text/css' />
    <link rel='stylesheet' href='resources/assets/ausart/assets/uploads/js_composer/custom.css' type='text/css' />
    <!-- EXTERNAL CSS -->
    <link rel="stylesheet" type="text/css" href="resources/assets/slick/slick.css">
    <link rel="stylesheet" type="text/css" href="resources/assets/slick/slick-theme.css">
    <!-- GLOBAL -->
    <link rel="stylesheet" type="text/css" href="resources/assets/front/css/global.css">
    <!-- OTHER -->
    @yield('css')

    <script type='text/javascript' src='resources/assets/ausart/assets/plugins/LayerSlider/static/js/greensock.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/includes/js/jquery/jquery.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/includes/js/jquery/jquery-migrate.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/plugins/LayerSlider/static/js/layerslider.kreaturamedia.jquery.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/plugins/LayerSlider/static/js/layerslider.transitions.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/plugins/revslider/rs-plugin/js/jquery.themepunch.tools.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/plugins/revslider/rs-plugin/js/jquery.themepunch.revolution.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.easy-pie-chart.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.appear.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/modernizr.custom.66803.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/odometer.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/animations.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/bootstrap.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.easing.1.1.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.easing.1.3.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.mobilemenu.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/isotope.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.mixitup.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/layout-mode.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/masonry.pkgd.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.cycle.all.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/customSelect.jquery.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.flexslider-min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/fancybox/source/jquery.fancybox.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/fancybox/source/helpers/jquery.fancybox-media.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.carouFredSel-6.1.0-packed.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/tooltip.js'></script>
    <!--[if IE 8]><link rel="stylesheet" type="text/css" href="http://newthemes.themeple.co/ausart/resources/assets/ausart/assets/plugins/js_composer/resources/assets/ausart/assets/css/vc-ie8.css" media="screen"><![endif]-->
</head>
<!-- End of Header -->

<body class="home page page-template-default header_1_body fullwidth_slider_page with_slider_page wpb-js-composer vc_responsive">
    <!-- Used for boxed layout -->
    <!-- Start Top Navigation -->
    <div class="top_nav">
        <div class="container">
            <div class="row-fluid">
                <div class="span9" id="ewan">
                    <div class="pull-left">
                        <div id="widget_topinfo-2" class="widget widget_topinfo">
                            <div class="topinfo">{{ get_content($shop_theme_info, "header", "header_call_label") }}: {{ get_content($shop_theme_info, "header", "header_call_number") }}</span><span class="email">{{ get_content($shop_theme_info, "header", "header_email_label") }}: {{ get_content($shop_theme_info, "header", "header_email_address") }}</span></div>
                        </div>
                    </div>
                </div>
                <div class="span3">
                    <div class="pull-right">
                        <div class="widget social_widget">
                            <div class="row-fluid social_row">
                                <div class="span12 account-button">
                                    <ul class="text-center" style="margin-top: 0;">
                                        <li><a href="/mlm/login">LOG IN</a></li>
                                        <!-- <li><div class="divider">|</div></li> -->
                                        <!-- <li><a href="/mlm/register">SIGN UP</a></li> -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End of Top Navigation -->
    <!-- Page Background used for background images -->
    <div id="page-bg"></div>
    <!-- Header BEGIN -->
    <div class="header_wrapper header_1 no-transparent  ">
        <header id="header" class="sticky_header ">
            <div class="container">
                <div class="row-fluid">
                    <div class="span12">
                        <!-- Logo -->
                        <div id="logo" class="">
                            <a href='/'><img style="max-height: 100%; max-width: 100%; object-fit: contain;" src='{{ $company_info["company_logo"]->value ? $company_info["company_logo"]->value : 'assets/front/img/small-logo.png' }}' alt='' /></a>
                        </div>
                        <!-- #logo END -->
                        <div class="after_logo">
                            <!-- Search -->
                            <div class="header_search">
                                <div class="right_search_container">
                                    <form action="#" id="search-form">
                                        <div class="input-append">
                                            <input type="text" size="16" placeholder="Search&hellip;" name="s" id="s">
                                            <button type="submit" class="more">Search</button>
                                            <a href="#" class="close_"><i class="moon-close"></i></a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- End Search-->
                        </div>
                        <!-- Show for all header expect header 4 -->
                        <div id="navigation" class="nav_top pull-right  ">
                            <nav>
                                <ul id="menu-menu-1" class="menu themeple_megemenu">
                                    <li class="{{ Request::segment(1) == '' ? 'current-menu-ancestor' : '' }} menu-item-has-children"><a href="/">Home</a></li>
                                    <li class="{{ Request::segment(1) == 'product' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/product">Products</a></li>
                                    <li class="{{ Request::segment(1) == 'about' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/about">Company</a></li>
                                    <li class="{{ Request::segment(1) == 'testimony' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/testimony">Testimonials</a></li>
                                    <li class="{{ Request::segment(1) == 'policy' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/policy">Policies</a></li>
                                    <li class="{{ Request::segment(1) == 'contact' ? 'current-menu-ancestor' : '' }}  menu-item-has-children"><a href="/contact">Contact Us</a></li>
                                </ul>
                            </nav>
                        </div>
                        <!-- #navigation -->
                        <!-- End custom menu here -->
                        <a href="javascript:" class="mobile_small_menu open"></a>
                    </div>
                </div>
            </div>
            <div class="header_shadow"><span class=""></span></div>
        </header>
        <div class="padding-holder"></div>
        <div class="header_shadow"><span class=""></span></div>
        <!-- Responsive Menu -->
        <div class="menu-small">
            <ul class="menu">
                <li class="{{ Request::segment(1) == '' ? 'current-menu-ancestor' : '' }} menu-item-has-children"><a href="/">Home</a></li>
                <li class="{{ Request::segment(1) == 'product' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/product">Products</a></li>
                <li class="{{ Request::segment(1) == 'about' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/about">Company</a></li>
                <li class="{{ Request::segment(1) == 'testimony' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/testimony">Testimonials</a></li>
                <li class="{{ Request::segment(1) == 'policy' ? 'current-menu-ancestor' : '' }} menu-item   menu-item-has-children"><a href="/policy">Policies</a></li>
                <li class="{{ Request::segment(1) == 'contact' ? 'current-menu-ancestor' : '' }}  menu-item-has-children"><a href="/contact">Contact Us</a></li>
            </ul>
        </div>
        <!-- End Responsive Menu -->
    </div>

    @yield('content')
 
    <div class="clearfix"></div>
    <footer>
        <div class="container">
            <div class="clearfix">
                <div class="vc_col-sm-4 wpb_column column_container">
                    <div class="title">INFORMATION</div>
                    <ul class="list">
                        <li><a href="/">HOME</a></li>
                        <li><a href="/product">PRODUCT</a></li>
                        <li><a href="/about">ABOUT US</a></li>
                        <li><a href="/contact">CONTACT</a></li>
                    </ul>
                </div>
                <div class="vc_col-sm-4 wpb_column column_container">
                    <div class="title">CONTACT US</div>
                    <ul class="list">
                        <li><a href="javascript:">{{ get_content($shop_theme_info, "footer", "footer_contact_number") }}</a></li>
                        <li><a href="mailto:{{ get_content($shop_theme_info, "footer", "footer_contact_email") }}">{{ get_content($shop_theme_info, "footer", "footer_contact_email") }}</a></li>
                    </ul>
                </div>
                <div class="vc_col-sm-4 wpb_column column_container">
                    <div class="title">FOLLOW US ON</div>
                    <div class="social-holder">
                        <div class="holder" onClick="location.href='{{ get_content($shop_theme_info, "footer", "footer_facebook_link") }}'"><img src="resources/assets/front/img/fb.png"></div>
                        <div class="holder" onClick="location.href='{{ get_content($shop_theme_info, "footer", "footer_twitter_link") }}'"><img src="resources/assets/front/img/tt.png"></div>
                        <div class="holder" onClick="location.href='{{ get_content($shop_theme_info, "footer", "footer_pinterest_link") }}'"><img src="resources/assets/front/img/pp.png"></div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    
    
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.hoverex.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/imagesloaded.pkgd.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.parallax.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.cookie.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/main.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/includes/js/comment-reply.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.placeholder.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.livequery.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.countdown.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/waypoints.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/background-check.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/idangerous.swiper.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/js/jquery.infinitescroll.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/plugins/js_composer/assets/js/js_composer_front.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/includes/js/jquery/ui/core.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/includes/js/jquery/ui/widget.min.js'></script>
    <script type='text/javascript' src='resources/assets/ausart/assets/includes/js/jquery/ui/accordion.min.js'></script>
    <!-- EXTERNAL JS -->
    <script type="text/javascript" src="resources/assets/external/matchheight.js"></script>
    <script type="text/javascript" src="resources/assets/slick/slick.min.js"></script>
    <!-- EXECUTE JS -->
    <script type="text/javascript">
    ;(function($){
        $(".match-height").matchHeight();
    })(jQuery);
    </script>
    @yield("script")
</body>
</html>
