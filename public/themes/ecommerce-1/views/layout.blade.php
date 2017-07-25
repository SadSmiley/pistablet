<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>{{ ucfirst($shop_info->shop_key) }} |  {{ isset($page) ? $page : 'Home' }}</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name='B-verify' content='8b63efb2920a681d6f877a59a414659d09831140' />
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- GOOGLE FONT -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
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
        @media screen and (max-width: 991px)
        {
            .navbar.sticky
            {
                position: static;
                top: 0;
                left: 0;
                right: 0;
                z-index: 100;
            }
        }
        .header-nav .header-nav-top .holder .linya
        {
            width: 2px;
        }
        </style>
        <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>
    <div class="loader" style="display: none;">
      <span><img src="/resources/assets/frontend/img/loader.gif"></span>
    </div>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <!-- HEADER -->
    <div class="header-nav">
    	<div class="header-nav-top">
    		<div class="container">
                @if($customer_info_a == null)
                <div class="holder"><a href="/mlm/login"><i class="fa fa-lock" aria-hidden="true"></i> Login</a></div>
                @else
                <div class="holder"><a href="/mlm"><i class="fa fa-user" aria-hidden="true"></i> Member's Area
                    @if($slot_now != null)
                        ( # {{$slot_now->slot_no}})
                    @endif
                    </a>
                </div>    
                @endif
                <!-- <div class="holder"><div class="linya"></div></div> -->
                <!-- <div class="holder"><a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i> My Cart</a></div> -->
                <div class="holder"><div class="linya"></div></div>
    			<div class="holder"><a href="/checkout"><i class="fa fa-check" aria-hidden="true"></i> Checkout</a></div>
	    		<div class="holder"><div class="linya"></div></div>
	    		<div class="holder"><a href="/about">About Us</a></div>
	    		<div class="holder"><div class="linya"></div></div>
	    		<div class="holder"><a href="/contact">Contact Us</a></div>
                <div class="holder"><div class="linya"></div></div>
                <div class="holder"><a href="https://loadcentral.net">eLOADING BUSINESS</a></div>
                <div class="holder"><div class="linya"></div></div>
                <div class="holder"><a href="http://tour.philtechglobalinc.com">Airline Ticketing</a></div>
                <div class="holder"><div class="linya"></div></div>
                <div class="holder"><a href="http://202.54.157.7/PhilTechInc/BKWLTOlogin.aspx">Travel and Tours</a></div>
                <div class="holder"><div class="linya"></div></div>
                <div class="holder"><a href="https://philtechglobalinc.vmoney.com">E-money</a></div>
                <!-- <div class="holder"><div class="linya"></div></div> -->
    		</div>
    	</div>
    	<div class="header-nav-middle">
    		<div class="container">
    			<div class="row clearfix">
	    			<div class="col-md-3">
                        <img class="img-responsive" src="{{ $company_info['company_logo']->value }}">            
                    </div>
	    			<div class="col-md-6">

                        {{-- Search Bar --}}                          
        				<div class="search-bar">
                            <form action="/product_search" method="get" id="form-search">
    	    					<div class="input-group input-group-lg">
    							     <!-- <span class="input-group-addon search-category" id="sizing-addon1">Categories <span class="caret"></span></span> -->
    							     <input type="text" class="form-control" name="keyword" id="keyword" aria-describedby="sizing-addon1">
    							     <span class="input-group-addon search-button" id="sizing-addon1">
                                        <a href="" onclick="onSearch();" id="submit_link">
                                            <i class="fa fa-search" aria-hidden="true" id="submit_link"></i>
                                        </a>                                 
                                     </span>
    							</div>
                            </form>
	    				</div>
                        {{-- End Search Bar --}}

	    			</div>
	    			<div class="col-md-3 woaw">
	    				<div class="shopping-cart-container">
	    					<div class="shopping-cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i> <span class="badge mini-cart-quantity">{{ $global_cart['sale_information']['total_quantity'] }}</span> <span>CART PHP.</span> <span class="mini-cart-total-price">{{ number_format($global_cart['sale_information']['total_product_price'], 2) }}</span></div>
	    				    <div class="container-cart mini-cart">
                                <div class="text-center"><span class="cart-loader text-center"><img style="height: 50px; margin: auto;" src="/assets/front/img/loader.gif"></span></div>
                            </div>
                        </div>
	    			</div>
	    		</div>
    		</div>
    	</div>
        <div class="container">
            <marquee style="color: #fff; font-size: 18px;">Empowering consumers to experience the VIP Life... Convenience. Benefits. Rewards. Unlimited Income.</marquee>
        </div>
    </div>
    <!-- NAVIGATION -->
    <nav class="navbar navbar-default">
	  <div class="container">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li class="nav-border {{ Request::segment(1) == '' ? 'active' : '' }}"><a href="/">HOME <span class="sr-only">(current)</span></a></li>
	        @if(isset($_categories))
                @foreach($_categories as $category)     
                <li class="nav-border {{ Request::input('type') == $category['type_id'] ? 'active' : '' }}"><a href="/product?type={{ $category['type_id'] }}" style="text-transform: uppercase;">{{ $category['type_name'] }}</a></li>
    	        @endforeach
            @endif
          </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>

    <div id="scroll-to" class="clearfix">
	   @yield("content")
    </div>

    <!-- FOOTER -->
  	<footer>
   	    <div class="container ftr">
            <div class="row clearfix">
                <div class="col-md-4 col-sm-6">
                    <div class="btm-title">SHOP</div>
                    <div class="row clearfix btm-link">
                        @if(isset($_categories))
                            @foreach($_categories as $category)     
                            <div class="btm-sub-title col-xs-6"><a href="/product?type={{ $category['type_id'] }}">{{ $category['type_name'] }}</a></div>
                            @endforeach
                        @endif
                    </div>
                </div> 
                <div class="col-md-3 col-sm-6">
                    <div class="btm-title">CONTACT US</div>
                    <table style="table-layout: fixed; width: 100%;">
                        <tr>
                            <td style="width: 35px;"><i class="fa fa-map-marker" aria-hidden="true"></i></td>
                            <td class="contact-title">{{ isset($company_info['company_address']) ? $company_info['company_address']->value : '' }}</td>
                        </tr>
                        <tr>
                            <td style="width: 35px;"><i class="fa fa-mobile" aria-hidden="true"></i></td>
                            <td class="contact-title">{{ isset($company_info['company_mobile']) ? $company_info['company_mobile']->value : '' }}</td>
                        </tr>
                        <tr>
                            <td style="width: 35px;"><i class="fa fa-envelope-o" aria-hidden="true"></i></td>
                            <td class="contact-title">{{ isset($company_info['company_email']) ? $company_info['company_email']->value : '' }}</td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="btm-title">COMPANY</div>
                    <div class="btm-sub-title">{{ substr(get_content($shop_theme_info, "about", "about_content"), 0, 200) }}... &nbsp;<a style="color: #fff;" href="/about">See More</a></div>
                </div>
                <div class="col-md-2 col-sm-6">
                    <div class="btm-title">FOLLOW US ON</div>
                    <div>
                        @if(get_content($shop_theme_info, "info", "facebook_link"))
                        <a href="{{ get_content($shop_theme_info, "info", "facebook_link") }}"><i class="fa fa-facebook site-icon" aria-hidden="true"></i></a>
                        @endif
                        @if(get_content($shop_theme_info, "info", "twitter_link"))
                        <a href="{{ get_content($shop_theme_info, "info", "twitter_link") }}"><i class="fa fa-twitter site-icon" aria-hidden="true"></i></a>
                        @endif
                        @if(get_content($shop_theme_info, "info", "pinterest_link"))
                        <a href="{{ get_content($shop_theme_info, "info", "pinterest_link") }}"><i class="fa fa-pinterest-p site-icon" aria-hidden="true"></i></i></a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
 	</footer>

    <footer id="bottom-footer">
        <div class="container bottom">
            <div class="row clearfix">
                <div class="col-md-12">                            
                    <div class="ftr-title">© {{ isset($company_info['company_name']) ? $company_info['company_name']->value : 'Your Name' }} {{ date('Y') }}</div>
                    <div class="image-logo">
                    <img src="/themes/{{ $shop_theme }}/img/ftr-image1.jpg">
                    <img src="/themes/{{ $shop_theme }}/img/ftr-image2.jpg">
                    <img src="/themes/{{ $shop_theme }}/img/ftr-image3.jpg">
                    <img src="/themes/{{ $shop_theme }}/img/ftr-image4.jpg">
                    <img src="/themes/{{ $shop_theme }}/img/ftr-image5.jpg">
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Modal -->
    <div id="shopping_cart" class="modal fade global-modal shopping-cart-modal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          
        </div>
      </div>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/bootstrap.min.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/match-height.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/fit-text.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/assets/slick/slick.min.js"></script>
    <script type="text/javascript" src="/assets/front/js/jquery.keep-ratio.min.js"></script>
    <script type="text/javascript" src="/assets/front/js/global.js"></script>
    <script src="/themes/{{ $shop_theme }}/js/global.js"></script>
    @yield("js")
    </body>

<script type="text/javascript">
    
    function onSearch()
    {
        var keyword = $('#keyword').val();
        $("#submit_link").attr("href", "/product_search?keyword="+$('#keyword').val());
    }

</script>
    
</html>
