<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>{{ ucfirst($shop_info->shop_key) }} | {{ $page }}</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- GOOGLE FONT -->
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Fjalla+One" rel="stylesheet"> 
        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/assets/initializr/css/bootstrap.min.css">
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/assets/initializr/css/bootstrap-theme.min.css">
        <!-- FONT AWESOME -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/font-awesome/css/font-awesome.min.css">
        <!-- SLICK CSS -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/slick/slick.css">
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/slick/slick-theme.css">
        <!-- GLOBAL CSS -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/global.css">
        <link rel="stylesheet" type="text/css" href="/assets/front/css/loader.css">
        <!-- THEME COLOR -->
        <link href="/themes/{{ $shop_theme }}/css/{{ $shop_theme_color }}.css" rel="stylesheet" type="text/css">
        <!-- OTHER CSS -->
        @yield("css")
        <style type="text/css">
        body
        {
            background-image: url('/themes/{{ $shop_theme  }}/img/final.jpg'); 
            background-size: cover; 
            background-position: center; 
            background-attachment: fixed;
        }
        .content
        {
            background-color: transparent;
        }
        .navbar.sticky
        {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
        }
        </style>
        <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>
    <div class="loader hide">
      <span><img src="/resources/assets/frontend/img/loader.gif"></span>
    </div>

    <!-- HEADER -->
    <div class="header-container">
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-md-2">
                    <div class="image-logo-holder">
                        <a class="clearfix" href="/"><img src="/themes/{{ $shop_theme }}/img/company-logo.png"></a>    
                        <div class="menu-nav">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>                   
                    </div>
                </div>
                <div class="col-md-10">
                <!-- NAVIGATION -->
                    <nav class="navirino">
                        <a href="/" class="head-button link-nav {{ Request::segment(1) == '' ? 'active' : '' }}" id="home">HOME</a>
                        <a href="/about" class="head-button link-nav {{ Request::segment(1) == 'about' ? 'active' : '' }}" id="company-profile">COMPANY PROFILE</a>
                        <a href="/runruno" class="head-button link-nav {{ Request::segment(1) == 'runruno' ? 'active' : '' }}" id="runruno">RUNRUNO</a>
                        <a href="javascript:" class="head-button link-nav {{ Request::segment(1) == 'news' ? 'active' : '' }}" id="news">NEWS</a>
                        <a href="/contact" class="head-button link-nav {{ Request::segment(1) == 'contact' ? 'active' : '' }}" id="contact-us">CONTACT US</a>
                    </nav>
                </div>
                
            </div>
        </div>
        <!-- LIGHTBOX -->
        <div class="lightbox-target" id="goofy">
           <img src="/themes/{{ $shop_theme }}/img/img1.png">
           <a class="lightbox-close" href="#work"></a>
        </div>

        <!-- NEWS DROPDOWN3 -->
        <div class="slider3-wrapper" style="display: none;">
            <div class="slider3-button-container">
                <button id="gotoleft">&laquo;</button> 
                <button id="gotoright">&raquo;</button>
            </div>
            <div class="slider3-title">
                Our News
            </div>
            <div class="slider3">
                <div style="position: absolute; top: 18px; left: 0px; width: 2000px;">
                @if(count(get_front_news($shop_id)) > 0)
                    @foreach(get_front_news($shop_id) as $news)
                    <div class="slider3-per-container">
                        <a href="/news?id={{ $news->post_id }}">
                            <div class="per-container-wrapper">
                                <img class="4-3-ratio" src="{{ $news->post_image }}">
                                <div class="slider3-title-container">{{ $news->post_title }}</div>
                            </div>
                        </a>                       
                    </div>
                    @endforeach 
                @else
                    <div class="slider3-per-container">
                        <a href="/news">
                            <div class="per-container-wrapper">
                                <img src="/themes/{{ $shop_theme }}/img/d1.png">
                                <div class="slider3-title-container">Lorem ipsum dolor sit amet</div>
                            </div>
                        </a>                        
                    </div>
                    <div class="slider3-per-container">
                        <a href="/news">
                            <div class="per-container-wrapper">
                                <img src="/themes/{{ $shop_theme }}/img/d2.png">
                                <div class="slider3-title-container">Lorem ipsum dolor sit amet consectetuer</div>
                            </div>
                        </a>
                    </div>
                    <div class="slider3-per-container">
                        <a href="/news">
                            <div class="per-container-wrapper">
                                <img src="/themes/{{ $shop_theme }}/img/d3.png">
                                <div class="slider3-title-container">Lorem ipsum dolor</div>
                            </div>
                        </a>
                    </div>
                    <div class="slider3-per-container">
                        <a href="/news">
                            <div class="per-container-wrapper">
                                <img src="/themes/{{ $shop_theme }}/img/d4.png">
                                <div class="slider3-title-container">Lorem ipsum dolor</div>
                            </div>
                        </a>
                    </div>
                    <div class="slider3-per-container">
                        <a href="/news">
                            <div class="per-container-wrapper">
                                <img src="/themes/{{ $shop_theme }}/img/d1.png">
                                <div class="slider3-title-container">Lorem ipsum dolor sit amet consectetuer</div>
                            </div>
                        </a>
                    </div>
                    <div class="slider3-per-container">
                        <a href="/news">
                            <div class="per-container-wrapper">
                                <img src="/themes/{{ $shop_theme }}/img/d2.png">
                                <div class="slider3-title-container">Lorem ipsum dolor</div>
                            </div>
                        </a>
                    </div>
                @endif
                </div>
            </div>
        </div>
    </div>
    
    <!-- CONTENT -->
    <div id="scroll-to" class="clearfix">
	   @yield("content")
    </div>

    <!-- FOOTER -->
  	<footer>
        <div class="container-fluid">
            <div class="row clearfix">
                <div class="col-md-6">
                    <div class="footer-img-container">
                        <img src="/themes/{{ $shop_theme }}/img/footer-img.png">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="navigation-container">
                        <div class="navigation-title-container">
                            NAVIGATION
                        </div>
                        <div class="navigation-btn-container">
                            <a href="/"><p><span>HOME</span></p></a>
                            <a href="/about"><p><span>COMPANY PROFILE</span></p></a>
                            <a href="/runruno"><p><span>RUNRUNO</span></p></a>
                            <a href="javascript:" class="head-button link-nav {{ Request::segment(1) == 'news' ? 'active' : '' }}" id="news"><p><span>NEWS</span></p></a>
                            <a href="/contact"><p><span>CONTACT US</span></p></a>
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="navigation-container">
                        <div class="navigation-title-container">
                            CONTACT INFORMATION
                        </div>
                        <div class="ftr-contact-container">
                            <p>Address: 22nd Floor, Salcedo Towers, 169 H.V. Dela Costa Street, Salcedo Village, Makati City, Metro Manila, Philippines<br><br>
    
                            Phone: +63 (0) 2 659 5662<br> 
                            Fax: +63 (0) 2 846 8507
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 	</footer>

    <footer id="bottom-footer">
        <div class="container bottom">
            <div class="row clearfix">
                <div class="col-md-12">                            
                    <div class="ftr-title">Copyright 2017 FCF Minerals | Powered By : DIGIMA Web Solutions, Inc.</div>
                </div>
            </div>
        </div>
    </footer>


    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/bootstrap.min.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/match-height.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/fit-text.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/assets/slick/slick.min.js"></script>
    <script type="text/javascript" src="/assets/front/js/jquery.keep-ratio.min.js"></script>
    <script type="text/javascript" src="/assets/front/js/global.js"></script>
    <script src="/themes/{{ $shop_theme }}/js/global.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/figuesslider.js"></script>
    <script type="text/javascript">
        var news_dropdown = new news_dropdown();

        function news_dropdown()
        {
            init();

            function init()
            {
                event_news_click();
                event_news_click_outside();
                event_toggle_nav();
            }

            function event_toggle_nav()
            {
                $(".menu-nav").bind("click", function()
                {
                    action_toggle_nav();
                });
            }

            function action_toggle_nav()
            {
                $(".menu-nav").unbind("click");
                $(".navirino").slideToggle(400, function()
                {
                    event_toggle_nav();
                });
            }

            function event_news_click()
            {
                $(document).on("click", "#news", function(e)
                {
                    e.preventDefault();
                    if(!$(this).hasClass("active"))
                    {
                        $(this).addClass("active");
                        $(".slider3-wrapper").fadeIn(200);
                        e.stopPropagation();
                    }
                    else
                    {
                        $(this).removeClass("active");
                        $(".slider3-wrapper").fadeOut(200);
                    }
                })
            }

            function event_news_click_outside()
            {
                $(document).on("click", "body", function(e)
                {
                    $(".slider3-wrapper").fadeOut(200);
                    $("#news").removeClass("active");
                });

                $(document).on("click", ".slider3-wrapper", function(e)
                {
                    e.stopPropagation();
                });
            }
        }
    </script>

    <script type="text/javascript">
        $window = $(window);
        $window.scroll(function() {
          $scroll_position = $window.scrollTop();
            if ($scroll_position > 100) { 
                $('.header-container').addClass('header-fixed');


                header_height = $('.your-header').innerHeight();
                $('body').css('padding-top' , header_height);
            } else {
                $('body').css('padding-top' , '0');
                $('.header-container').removeClass('header-fixed');
            }
         });

    </script>

    <script type="text/javascript">
            
            $('.slider3').diyslider({
                width: "463px", // width of the slider
                height: "120px", // height of the slider
                display: 4, // number of slides you want it to display at once
                loop: false // disable looping on slides
                }); // this is all you need!

        // use buttons to change slide
        $('#gotoleft').bind("click", function(){
            // Go to the previous slide
            $('.slider3').diyslider("move", "back");
        });
        $('#gotoright').unbind("click")
        $('#gotoright').bind("click", function(){
            // Go to the previous slide
            $('.slider3').diyslider("move", "forth");
        });

    </script>

    @yield("js")
    </body>
</html>
