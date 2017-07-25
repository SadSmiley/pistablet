<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
   <head>
      <base href="{{ URL::to('/themes/'.$shop_theme.'') }}/">
      <meta charset="utf-8">
      @yield('meta')
      <title>{{ ucfirst($shop_info->shop_key) }} | {{ $page or 'Page' }}</title>
      <link rel="icon" type="image/png" href="/resources/assets/frontend/img/favicon.png">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'> -->
      <link href='http://fonts.googleapis.com/css?family=Lato:400,700,900,300' rel='stylesheet' type='text/css'>
      <link href='http://fonts.googleapis.com/css?family=Quicksand:400,700' rel='stylesheet' type='text/css'>
      <link rel="stylesheet" href="resources/assets/frontend/css/global.css">
      <link rel="stylesheet" href="resources/assets/font-awesome/css/font-awesome.min.css">
      <link rel="stylesheet" href="resources/assets/remodal/src/remodal.css">
      <link rel="stylesheet" href="resources/assets/remodal/src/remodal-default-theme.css">
      <link rel="stylesheet" href="resources/assets/slider/dist/slippry.css">
      <link rel="stylesheet" href="resources/assets/bootstrap/css/bootstrap.css">
      <link rel="stylesheet" type="text/css" href="/resources/assets/slick/slick.css">
      <link rel="stylesheet" type="text/css" href="/resources/assets/slick/slick-theme.css">
      <link href="resources/assets/footable/css/footable.core.css" rel="stylesheet" type="text/css" />
      <!-- TOASTR CSS -->
      <link rel="stylesheet" type="text/css" href="/assets/member/plugin/toaster/toastr.css">
      @yield('css')
      <style type="text/css">
         /* Hide HTML5 Up and Down arrows. */
         input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
         -webkit-appearance: none;
         margin: 0;
         }
         input[type="number"] {
         -moz-appearance: textfield;
         }
      </style>
   </head>
   <body>
      @yield('social-script')
      <!-- WRAPPER -->
      <div class="wrapper">
         @if(Session::get('err'))
         <div class="no_stock_err hidden">
            <ul>
               @foreach(Session::get('err') as $c_err)
               <li style="list-style: inherit;">{{ $c_err }}</li>
               @endforeach
            </ul>
         </div>
         @endif
         {{-- {{var_dump(Session::get('forgot_pass'))}} --}}
         @if(Session::get('forgot_pass'))
         <div class="forgot_pass hidden">
            {{Session::get('forgot_pass')}}
         </div>
         @endif
         <div class="header">
            <a href="/" class="logo"><img src="/resources/assets/frontend/img/intogadgets-logo.png"></a>
            <div class="mobile-searchie">
               <form method="GET" action="/product">
                  <div class="form-group">
                     <input value="{{ Request::input('search') }}" type="text" name="search" autocomplete="off" id="search-pokus" class="form-control search-input" placeholder="Search...">
                  </div>
                  <button type="submit" class="btn search-button"><i class="fa fa-search"></i></button>
                  <div class="search-popup" style="display:none;">
                     <div class="live-search-loading search-popup-holder">  
                        <img src="/resources/assets/img/small-loading.GIF" alt="laoding.png">
                     </div>
                     <div class="live-search-result-content">
                     </div>
                  </div>
               </form>
            </div>
            <div class="header-nav text-left">
               <a href="/about" class="nabigation">
                  <div class="nabigation-hover"></div>
                  <div class="nabigation-text">ABOUT</div>
               </a>
               <a href="/contact" class="nabigation">
                  <div class="nabigation-hover"></div>
                  <div class="nabigation-text">CONTACT</div>
               </a>
               <a href="/career" class="nabigation">
                  <div class="nabigation-hover"></div>
                  <div class="nabigation-text">CAREERS</div>
               </a>
               <a href="/how" class="nabigation">
                  <div class="nabigation-hover"></div>
                  <div class="nabigation-text">HOW TO ORDER</div>
               </a>
               <a href="/youwin" class="nabigation">
                  <div class="nabigation-hover"></div>
                  <div class="nabigation-text">YOUWIN AFTERSALES</div>
               </a>
               <a href="/events" class="nabigation">
                  <div class="nabigation-hover"></div>
                  <div class="nabigation-text">EVENTS</div>
               </a>
            </div>
            <div class="header-nav account-nav text-right">
               <!-- Account Header -->
               @if($customer_info_a)
                  <a href="/account/order" class="text">MY ORDERS</a>
                  <a href="/account/logout" class="text">LOGOUT</a>
               @else
                  <a data-remodal-target="login" href="#" class="text">LOGIN</a>
                  <a href="/account/register" class="text">REGISTER</a>
               @endif
            </div>
            <div class="col-md-8">
               <!-- HEADER SPACE -->
            </div>
         </div>
         <nav class="navbar navbar-default">
            <div>
               <!-- Brand and toggle get grouped for better mobile display -->
               <div class="navbar-header">
                  <span class="icon-bar navbar-texas">
                     <span class="visible-phone hidden-tablet hidden-desktop pull-right">
                        <!-- Account Header -->
                     </span>
                  </span>
                  <button type="button" class="navbar-toggle collapsed pull-left" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  </button>
               </div>
               <!-- Collect the nav links, forms, and other content for toggling -->
               <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav navbar-left">
                     @foreach($_categories as $categories)
                     <li class="notsub">
                        <a href="javascript:">
                           <div class="nav-text">
                              <div onClick="location.href='/product?type={{ $categories['type_id'] }}'" class="nav-text-holder">{{ $categories['type_name'] }}</div>
                              <div onClick="location.href='/product?type={{ $categories['type_id'] }}'" class="nav-text-hover">{{ $categories['type_name'] }}</div>
                           </div>
                           <div class="nav-text-more">
                              @foreach($categories['subcategory'] as $subcategories)
                              <div onClick="location.href='/product?type={{ $subcategories['type_id'] }}'" class="menu">{{ $subcategories['type_name'] }} ({{ $subcategories['product_count'] }})</div>
                              @endforeach
                           </div>
                        </a>
                     </li>
                     @endforeach
                     @foreach($_categories as $key => $categories)
                     <li class="sub-menu">
                        <a href="{{ count($categories['subcategory']) > 0 ? "#menupos" . $key : "/product?type=" . $categories['type_id'] }}"  style="background-color: #085D9A !important; border: 0 !important; font-size: 12px !important;" {{ count($categories['subcategory']) > 0 ? 'class=list-group-item data-toggle=collapse data-parent=#mainmenu' : "" }}>{{ $categories['type_name'] }} <span class="menu-ico-collapse {{ count($categories['subcategory']) > 0 ? "" : "hide" }}"><i class="glyphicon glyphicon-chevron-down"></i></span></a>
                        <div class="collapse pos-absolute" id="menupos{{ $key }}">
                           @foreach($categories['subcategory'] as $subcategories)
                           <a href="/product?type={{ $subcategories['type_id'] }}" data-toggle="collapse" data-target="#menupos{{ $key }}" class="list-group-item sub-item">{{ $subcategories['type_name'] }} ({{ $subcategories['product_count'] }})</a>
                           @endforeach
                        </div>
                     </li>
                     @endforeach
                     
                     <!--<li class="sub-menu">-->
                     <!--   <a href="#menupos2"  style="background-color: #085D9A !important; border: 0 !important; font-size: 12px !important;" class="list-group-item" data-toggle="collapse" data-parent="#mainmenu">SMART PHONE <span class="menu-ico-collapse"><i class="glyphicon glyphicon-chevron-down"></i></span></a>-->
                     <!--   <div class="collapse pos-absolute" id="menupos2">-->
                     <!--      <a href="/product?type=3&brand=" data-toggle="collapse" data-target="#menupos1" class="list-group-item sub-item">Test</a>-->
                     <!--   </div>-->
                     <!--</li>-->
                     <!--<li class="sub-menu">-->
                     <!--   <a href="#menupos3"  style="background-color: #085D9A !important; border: 0 !important; font-size: 12px !important;" class="list-group-item" data-toggle="collapse" data-parent="#mainmenu">TABLET <span class="menu-ico-collapse"><i class="glyphicon glyphicon-chevron-down"></i></span></a>-->
                     <!--   <div class="collapse pos-absolute" id="menupos3">-->
                     <!--      <a href="/product?type=4&brand=" data-toggle="collapse" data-target="#menupos1" class="list-group-item sub-item">Test</a>-->
                     <!--   </div>-->
                     <!--</li>-->
                     <!--<li class="sub-menu">-->
                     <!--   <a href="#menupos4"  style="background-color: #085D9A !important; border: 0 !important; font-size: 12px !important;" class="list-group-item" data-toggle="collapse" data-parent="#mainmenu">MOBILE PHONE <span class="menu-ico-collapse"><i class="glyphicon glyphicon-chevron-down"></i></span></a>-->
                     <!--   <div class="collapse pos-absolute" id="menupos4">-->
                     <!--      <a href="/product?type=5&brand=" data-toggle="collapse" data-target="#menupos1" class="list-group-item sub-item">Test</a>-->
                     <!--   </div>-->
                     <!--</li>-->
                  </ul>
                  <form method="GET" action="/product" class="navbar-form search-container" role="search">
                     <div class="mobile-nabigayshon">
                        <a href="/about" class="nabigation">
                           <div class="nabigation-text">ABOUT</div>
                        </a>
                        <a href="/contact" class="nabigation">
                           <div class="nabigation-text">CONTACT</div>
                        </a>
                        <a href="/career" class="nabigation">
                           <div class="nabigation-text">CAREERS</div>
                        </a>
                        <a href="/how" class="nabigation">
                           <div class="nabigation-text">HOW TO ORDER</div>
                        </a>
                        <a href="/youwin" class="nabigation">
                           <div class="nabigation-text">YOUWIN AFTERSALES</div>
                        </a>
                        <a href="/events" class="nabigation">
                           <div class="nabigation-text">EVENTS</div>
                        </a>
                     </div>
                     <div class="mobile-account">
                        @if($customer_info_a)
                           <a href="/account/order" class="text">MY ORDERS</a>
                           <a href="/account/logout" class="text">LOGOUT</a>
                        @else
                           <a data-remodal-target="login" href="#" class="text">LOGIN</a>
                           <a href="/account/register" class="text">REGISTER</a>
                        @endif
                     </div>
                     <div class="searchie">
                        <div class="form-group">
                           <input type="text" name="search" autocomplete="off" id="search-pokus" class="form-control search-input" placeholder="Search...">
                        </div>
                        <button type="submit" class="btn search-button"><i class="fa fa-search"></i></button>
                        <div class="search-popup" style="display:none;">
                           <div class="live-search-loading search-popup-holder">  
                              <img src="/resources/assets/img/small-loading.GIF" alt="laoding.png">
                           </div>
                           <div class="live-search-result-content">
                           </div>
                        </div>
                     </div>
                     <div class="cart-icon">
                        <a href='{{ "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]" }}#cart' style="color: white;">
                           <div class="cart-qt">
                              <div class="cart-qt-text">0</div>
                           </div>
                           <img src="/resources/assets/rutsen/img/icon/cart.png"><span>CART</span>
                        </a>
                     </div>
                  </form>
               </div>
               <!-- /.navbar-collapse -->
            </div>
            <!-- /.container-fluid -->
         </nav>
         <div class="loader" style="z-index: 1051; display: none;">
            <span><img src="/resources/assets/frontend/img/loader.gif"></span>
         </div>
         <div class="content clearfix">
            @yield('content')
         </div>
         @if(get_content($shop_theme_info, 'info', 'footer_ads'))
         <div class="footer-add">
            <div class="footer-add-wrapper">
               <a href="{{ get_content($shop_theme_info, 'info', 'footer_ads_link') }}" target="_blank">
               <img src="{{ get_content($shop_theme_info, 'info', 'footer_ads') }}">
               </a>
               <div class="exit"><i class="fa fa-times"></i></div>
            </div>
         </div>
         @endif
         <div class="footer clear">
            <div class="container">
               <div class="footer-holder col-md-3 col-sm-6 first-border text-left match-height">
                  <div class="footer-header">INFORMATION</div>
                  <div class="footer-content">
                     <a href="/" class="footer-text link" data-hover="Home">
                     Home
                     </a>
                     <a href="/about" class="footer-text link">
                     About
                     </a>
                     <a href="career" class="footer-text link">
                     Careers
                     </a>
                     <a href="contact" class="footer-text link">
                     Contact
                     </a>
                     <a href="how" class="footer-text link">
                     How to Orders
                     </a>
                     <a href="product" class="footer-text link">
                     Products
                     </a>
                     <a href="term" class="footer-text link">
                     Terms and Agreement
                     </a>
                  </div>
               </div>
               <div class="footer-holder col-md-3 col-sm-6">
                  <div class="footer-header">CONTACT US</div>
                  <div class="footer-content" style="color: white;">
                     <div class="footer-text">{{ get_content($shop_theme_info, "info", "footer_contact_number_1") }}</div>
                     <div class="footer-text">{{ get_content($shop_theme_info, "info", "footer_contact_number_2") }}</div>
                     <div class="footer-text">{{ get_content($shop_theme_info, "info", "footer_email") }}</div>
                     <div class="footer-text">FOR TECHNICAL SUPPORT</div>
                     <div class="footer-text">{{ get_content($shop_theme_info, "info", "footer_technical_support_number_1") }}</div>
                     <div class="footer-text">{{ get_content($shop_theme_info, "info", "footer_technical_support_number_2") }}</div>
                  </div>
               </div>
               <div class="footer-holder none col-md-3 col-sm-6">
                  <div style="border:  2px solid white; margin-top: 25px;">
                     <div class="footer-header" style="border-bottom: 5px solid #1f76b5; width: 150px; margin: auto;">NEWSLETTER</div>
                     <div class="footer-content">
                        <div class="footer-text width" style="color: white;">{{ get_content($shop_theme_info, "info", "newsletter_text") }}</div>
                        <div class="footer-newsletter">
                           <form method = "POST" id="subform" action="//intogadgets.us10.list-manage.com/subscribe/post?u=cd02508127b42de13d02bb528&id=74973f9e9e">
                              <input type="email" placeholder="Enter your email" name="EMAIL" required id="email">
                              <button class="send-logo-holder">
                              <i class="fa fa-caret-right send-logo"></i>
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="footer-holder none col-md-3 col-sm-6">
                  <div class="footer-header">FOLLOW US</div>
                  <div class="footer-content">
                     <a href="{{ get_content($shop_theme_info, "info", "facebook_link") }}" target="_blank" class="footer-logo fb">
                     <span class="footer-logo-holder">
                     <i class="fa fa-facebook main-icon"></i>
                     <i class="fa fa-facebook hover-icon fb-hover"></i>
                     </span>
                     </a>
                     <a href="{{ get_content($shop_theme_info, "info", "twitter_link") }}" target="_blank" class="footer-logo tt">
                     <span class="footer-logo-holder">
                     <i class="fa fa-twitter main-icon"></i>
                     <i class="fa fa-twitter hover-icon tt-hover"></i>
                     </span>
                     </a>
                     <a href="{{ get_content($shop_theme_info, "info", "instagram_link") }}" target="_blank" class="footer-logo gg">
                     <span class="footer-logo-holder">
                     <i class="fa fa-instagram main-icon"></i>
                     <i class="fa fa-instagram hover-icon gg-hover"></i>
                     </span>
                     </a>
                  </div>
                  <div class="footer-header">GET TO KNOW</div>
                  <div class="footer-content flip-container" ontouchstart="this.classList.toggle('hover');">
                     <div style="display: table; table-layout: fixed; width: 100%;">
                        <a class="footer-plogo" href="{{ get_content($shop_theme_info, "info", "dakasi_link") }}" target="_blank" class="footer-plogo">
                        <img src="{{ get_content($shop_theme_info, "info", "dakasi_image") }}">
                        </a>
                        <a class="footer-plogo" href="{{ get_content($shop_theme_info, "info", "primia_link") }}" target="_blank" class="footer-plogo">
                        <img src="{{ get_content($shop_theme_info, "info", "primia_image") }}">
                        </a>
                     </div>
                  </div>
               </div>
               <div class="col-md-12">
                  <div class="popular-tags">
                     <div class="row clearfix">
                        @foreach($_popular_tags as $popular_tags)
                        <div class="col-md-2 col-sm-4 col-xs-6">
                           <a class="fit-text" href="/product?search={{ $popular_tags->keyword }}"><span>#{{ $popular_tags->keyword }}</span></a>
                        </div>
                        @endforeach
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div class="footer-sub">
            <div><img src="{{ get_content($shop_theme_info, "info", "bank_image") }}"></div>
            <div class="text">{{ get_content($shop_theme_info, "info", "copyright_text") }}</div>
         </div>
      </div>
   </body>

   <!-- LOGIN -->
   <div class="remodal login" data-remodal-id="login">
      <div class="font">
         <div class="">
            <form method="post" action="/account/login" class="global-submit" autocomplete="on">
               <input type="hidden" name="_token" value="{{ csrf_token() }}">
               <input type="hidden" name="global" value="1">
               <div class="login-header-bg"></div>
               <div class="login-header"><img src="/resources/assets/frontend/img/intogadgets-logo.png"></div>
               <div class="message">The account you entered didn't match any of our record</div>
               <div class="login-input">
                  <div class="login-user input"><input name="email" type="email" autocomplete="off"></div>
                  <div class="login-pass input"><input name="password" type="password" autocomplete="off"></div>
               </div>
               <div class="login-register">Need an account?&nbsp;&nbsp;&nbsp;<a href="/account/register">Sign up</a></div>
               <div class="btn-container">
                  <button type="submit" class="login-button btn btn-primary">Log-in</button>
               </div>
            </form>
         </div>
      </div>
   </div>
   
   <!-- LIVE CHAT -->
   <div class="live-chat-holder">
      <div class="live-chat">
         <div class="chat-header"><i class="fa fa-weixin"></i><span>We're Online</span></div>
         <div class="chat-content">
            <div class="chat-holder">
               <div class="chat-img"><img src="/resources/assets/rutsen/img/profile-pic.jpg"></div>
               <div class="chat-text">
                  <div class="chat-name">Customer Service</div>
                  <div class="chat-reply">Hello Rowan! How may I help you?</div>
               </div>
            </div>
            <div class="chat-holder">
               <div class="chat-img"><img src="/resources/assets/rutsen/img/profile-pic.jpg"></div>
               <div class="chat-text">
                  <div class="chat-name">Customer Service</div>
                  <div class="chat-reply">Hello Rowan! How may I help you?</div>
               </div>
            </div>
            <div class="chat-holder">
               <div class="chat-img"><img src="/resources/assets/rutsen/img/profile-pic.jpg"></div>
               <div class="chat-text">
                  <div class="chat-name">Customer Service</div>
                  <div class="chat-reply">Hello Rowan! How may I help you?</div>
               </div>
            </div>
            <div class="chat-holder">
               <div class="chat-img"><img src="/resources/assets/rutsen/img/profile-pic.jpg"></div>
               <div class="chat-text">
                  <div class="chat-name">Customer Service</div>
                  <div class="chat-reply">Hello Rowan! How may I help you?</div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- PRODUCT QUICK VIEW -->
   {{-- <div class="remodal quicky" data-remodal-id="quick">
      <div class="quick-view-container">
         <div class="col-md-6">
            <div class="image-container">
               <img src="http://image.primia-files.com/view?source=rutsen.local&filename=1429501946.jpg&size=318x318&mode=crop">
            </div>
         </div>
         <div class="col-md-6">
            <div class="product-information">
               <div class="product-title">Sample Product Title</div>
               <div class="product-price">PHP. 1,550.00</div>
               <div class="product-description">This t-shirt is fully customizable and you can add additional information by requesting it.</div>
               <div class="product-selection">
                  <div class="s-container">
                     <div class="s-label">Color</div>
                     <div class="select">
                        <select>
                           <option>Blue</option>
                           <option>Red</option>
                           <option>Green</option>
                        </select>
                     </div>
                  </div>
                  <div class="s-container">
                     <div class="s-label">Color</div>
                     <div class="select">
                        <select>
                           <option>Blue</option>
                           <option>Red</option>
                           <option>Green</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div class="product-button">
                  <div class="quantity">
                     <span class="subtractbutton"><button class="up-down-button" effect="-1">-</button></span>
                     <input id="numbersonly" class="qty" type="text" value="1" />
                     <span class="addbutton"><button id="addbutton"class="up-down-button" effect="1">+</button></span>
                  </div>
                  <button class="add-cart">Add to Cart</button>
                  <img class="loading" src="/resources/assets/img/small-loading.GIF">
               </div>
            </div>
         </div>
      </div>
   </div> --}}
   <!-- CART MODAL -->
   <div class="remodal cart-remodal" data-remodal-id="cart">
   </div>
   <!-- LOADING -->
   <div class="remodal loading" data-remodal-id="loading">
      <img src="resources/assets/rutsen/img/preloader.GIF">
   </div>
   <div class="modal fade" id="pop-up-message-box">
      <div class="modal-dialog">
         <div class="modal-content">
            <div class="modal-header">
               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
               <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
         </div>
      </div>
   </div>
   <script type="text/javascript">
      var currency = "{{ Config::get('app.currency') }}";
      var image_server = '{{ Config::get("app.image_server") }}';
      var source = '{{ $_SERVER["SERVER_NAME"] }}';
   </script>
   <script src="resources/assets/external/jquery.min.js"></script> 
   <script src="resources/assets/external/bootstrap.min.js"></script>
   <script src="resources/assets/remodal/src/remodal.js"></script>
   <script src="resources/assets/rutsen/js/lazy.js"></script>
   <script src="resources/assets/rutsen/js/global.js"></script>
   <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script> -->
   <script type="text/javascript" src="http://arrow.scrolltotop.com/arrow33.js"></script>
   <script src="resources/assets/slider/dist/slippry.min.js"></script>
   <script src="resources/assets/footable/js/footable.js" type="text/javascript"></script>
   <script type="text/javascript" src="js/match-height.js"></script>
   <script type="text/javascript" src="/resources/assets/slick/slick.min.js"></script>
   <script type="text/javascript" src="/assets/front/js/jquery.keep-ratio.min.js"></script>
   <script type="text/javascript" src="/assets/front/js/global.js"></script>
   <script type="text/javascript" src="/assets/member/global.js"></script>
    <script type="text/javascript" src="/assets/member/plugin/toaster/toastr.min.js"></script>
    <script type="text/javascript" src="resources/assets/frontend/js/jquery.fittext.js"></script>
    <script type="text/javascript">
    function submit_done(data)
    {
        if (data.from == "global_login") 
        {
            if(data.type == 'error')
            {
                toastr.error(data.message);
            }
            else
            {
                toastr.success(data.message);
                location.href = '/account';
            }
        }
        else if (data.from == "account_login") 
        {
            if(data.type == 'error')
            {
               toastr.error(data.message);
            }
            else
            {
               toastr.success(data.message);
               location.href = '/checkout';
            }
        }
        else
        {
            $('.butonn_register').prop("disabled", false);
            if(data.type == 'error')
            {
                toastr.error(data.message);
                $('.butonn_register').attr("disabled", false);
                $('.butonn_register').removeAttr("disabled");
            }
            else
            {
                $('.butonn_register').attr("disabled", true);
                toastr.success(data.message);
                location.href = '/mlm';
            }
        }
    }
    function click_submit_button(ito)
    {
        $('.global-submit').submit();
        $('.butonn_register').attr("disabled", true);
    }
    function get_sponsor_info_via_membership_code(ito)
    {
        var membership_code = $(ito).val();
        get_customer_view(membership_code);
    }
    function get_customer_view(membership_code)
    {
        $('#sponsor_info_get').load('/mlm/register/get/membership_code/' + membership_code);
    }
    </script>
   <script type="text/javascript">
      $(function () {
      
        $('#branches').footable();
      
      });
      
   </script>
   <script type="text/javascript">
      jQuery(document).ready(function()
      {   
        $(".exit").click(function()
        {
            $(".footer-add").remove();
        });
      });

      jQuery(window).load(function()
      {
         $(".match-height").matchHeight();
      })
      
      jQuery(document).ready( function($) {
      
        // Disable scroll when focused on a number input.
        $('form').on('focus', 'input[type=number]', function(e) {
            $(this).on('wheel', function(e) {
                e.preventDefault();
            });
        });
      
        // Restore scroll on number inputs.
        $('form').on('blur', 'input[type=number]', function(e) {
            $(this).off('wheel');
        });
      
        // Disable up and down keys.
        $('form').on('keydown', 'input[type=number]', function(e) {
            if ( e.which == 38 || e.which == 40 )
                e.preventDefault();
        });  
          
      });
      
      jQuery(".fit-text").fitText(0.8, { minFontSize: '10px', maxFontSize: '16px' });
   </script>
   <!-- // <script src="/resources/assets/rutsen/js/subscribe.js"></script> -->
   <!--Start of Zopim Live Chat Script-->
   <script type="text/javascript">
      window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
      
      d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
      
      _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
      
      $.src="//v2.zopim.com/?37575cLYwhrryByYZbtdMExnVTazYf3Y";z.t=+new Date;$.
      
      type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
      
   </script>
   <!--End of Zopim Live Chat Script-->
   @yield('script')
</html>

