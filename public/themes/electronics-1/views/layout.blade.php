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
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/assets/initializr/css/bootstrap.min.css">
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/assets/initializr/css/bootstrap-theme.min.css">
        <!-- FONT AWESOME -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/font-awesome/css/font-awesome.min.css">
        <!-- GLOBAL CSS -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/global.css">
        <!-- THEME COLOR -->
        <link href="/themes/{{ $shop_theme }}/css/{{ $shop_theme_color }}.css" rel="stylesheet" type="text/css">
        <!-- OTHER CSS -->
        @yield("css")

        <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
    </head>
    <body>

        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

    <!-- HEADER -->
    <div class="header-nav">
    	<div class="header-nav-top">
    		<div class="container">
                <div class="holder"><a href="/mlm/login"><i class="fa fa-lock" aria-hidden="true"></i> Login</a></div>
    			<div class="holder"><a href="/checkout"><i class="fa fa-check" aria-hidden="true"></i> Checkout</a></div>
	    		<div class="holder"><a href="/about">About Us</a></div>
	    		<div class="holder"><a href="/contact">Contact Us</a></div>
    		</div>
    	</div>
    	<div class="header-nav-middle">
    		<div class="container">
    			<div class="row clearfix">
	    			<div class="col-md-2">
                        <img src="/themes/{{ $shop_theme }}/img/header-logo.png">            
                    </div>
	    			<div class="col-md-6">
	    				<div class="search-bar">
	    					<div class="input-group input-group-lg">
							  <span class="input-group-addon search-category" id="sizing-addon1">Categories <span class="caret"></span></span>
							  <input type="text" class="form-control search-input" aria-describedby="sizing-addon1">
							  <span class="input-group-addon search-button" id="sizing-addon1"><i class="fa fa-search" aria-hidden="true"></i></span>
							</div>
	    				</div>
	    			</div>
                    <div class="col-md-4">
                        <nav class="navbar navbar-default">
                            <div class="">
                                <!-- Collect the nav links, forms, and other content for toggling -->
                                <div class="navbar-default"">
                                  <ul class="nav navbar-nav">
                                    <li class="{{ Request::segment(1) == '' ? 'active' : '' }}"><a href="/">HOME <span class="sr-only">(current)</span></a></li>
                                    <li class="{{ Request::input('cat') == 'electronics' ? 'active' : '' }}"><a href="/product?cat=electronics">SHOP</a></li>
                                    <li class="{{ Request::input('cat') == 'fashion' ? 'active' : '' }}"><a href="/about">COMPANY</a></li>
                                    <li class="{{ Request::input('cat') == 'kids' ? 'active' : '' }}"><a href="/contact">CONTACT US</a></li>
                                  </ul>
                                </div><!-- /.navbar-collapse -->
                            </div><!-- /.container-fluid -->
                        </nav>

                        <div class="shopping-cart-container">
                            <div class="shopping-cart"><img src="/themes/{{ $shop_theme }}/img/basket.png"></div>
                            <div class="container-cart">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="img"><img src="/themes/{{ $shop_theme }}/img/basket-image2.png"></td>
                                            <td class="info">
                                                <div class="name">Item Name 1</div>
                                                <div class="quantity">x2</div>
                                                <div class="price">P 600.00</div>
                                            </td>
                                            <td class="remove">
                                                <a href="javascript:"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="img"><img src="/themes/{{ $shop_theme }}/img/basket-image1.png"></td>
                                            <td class="info">
                                                <div class="name">Item Name 1</div>
                                                <div class="quantity">x2</div>
                                                <div class="price">P 600.00</div>
                                            </td>
                                            <td class="remove">
                                                <a href="javascript:"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="img"><img src="/themes/{{ $shop_theme }}/img/basket-image3.png"></td>
                                            <td class="info">
                                                <div class="name">Item Name 1</div>
                                                <div class="quantity">x2</div>
                                                <div class="price">P 600.00</div>
                                            </td>
                                            <td class="remove">
                                                <a href="javascript:"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr style="border: 0;">
                                            <td class="sub-title">Subtotal:</td>
                                            <td class="sub-price">P 000.00</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><button class="btn btn-viewcart" type="button" onClick="location.href='/viewcart'">VIEW CART</button></td>
                                            <td><button class="btn btn-checkout" type="button" onClick="location.href='/checkout'">CHECKOUT</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

	    				
	    			
	    		</div>
    		</div>
    	</div>
    </div>
	@yield("content")
   
    <!-- FOOTER -->
        <div class="top-footer">
            <div class="container">
                <div class="row clearfix">
                    <div class="col-md-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/top-footer-img1.png"></td>
                                    <td>
                                    <div class="top-footer-title">WORLD-WIDE SHIPPING</div>
                                    <div class="top-footer-sub-title">On order over $100</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/top-footer-img2.png"></td>
                                    <td>
                                    <div class="top-footer-title">30 DAYS RETURN</div>
                                    <div class="top-footer-sub-title">Moneyback guarantee</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/top-footer-img3.png"></td>
                                    <td>
                                    <div class="top-footer-title">CUSTOMER SUPPORT</div>
                                    <div class="top-footer-sub-title">Call us: (+123) 456 789</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-md-3">
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/top-footer-img4.png"></td>
                                    <td>
                                    <div class="top-footer-title">MEMBER DISCOUNT</div>
                                    <div class="top-footer-sub-title">10% on order over $200</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  	<footer>
   	    <div class="container ftr">
            <div class="contact-ftr">
                <div class="col-md-3 col-sm-6">
                    <div class="footer-logo"><img src="/themes/{{ $shop_theme }}/img/footer-logo.png"></div>
                    <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</div>
                </div> 
                <div class="col-md-4 col-sm-6 contact-footer">
                    <div class="btm-title">CONTACT US</div>
                    <div class="row clearfix">
                        <div  class="col-md-6 contact-details">
                            <table>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/map-marker.png"></td>
                                    <td class="contact-title">168 Lorem ipsum dolor</td>
                                </tr>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/landline.png"></td>
                                    <td class="contact-title">044 000 0001</td>
                                </tr>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/mobile.png"></td>
                                    <td class="contact-title">0990 000 0000</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-md-6 contact-details">
                            <table>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/fax.png"></td>
                                    <td class="contact-title">01.234 56789 - 10.987 65432</td>
                                </tr>
                                <tr>
                                    <td><img src="/themes/{{ $shop_theme }}/img/globe.png"></td>
                                    <td class="contact-title">youremail.here@email.com</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                    
                <div class="col-md-3 col-sm-6 shop-footer">
                    <div class="btm-title">SHOP</div>
                    <div class="col-md-6 btm-link">
                        <div class="btm-sub-title"><a href="#">Desktops</a></div>
                        <div class="btm-sub-title"><a href="#">Laptops</a></div>
                        <div class="btm-sub-title"><a href="#">Smart Phones</a></div>
                        <div class="btm-sub-title"><a href="#">Cameras</a></div>
                        <div class="btm-sub-title"><a href="#">Headphones</a></div>
                    </div>
                    <div class="col-md-6 col-sm-6 btm-link">
                        <div class="btm-sub-title"><a href="#">TV & Components</a></div>
                        <div class="btm-sub-title"><a href="#">Games</a></div>
                    </div>
                </div>
                <div class="col-md-2 col-sm-6">
                    <div class="btm-title">FOLLOW US ON</div>
                    <div>
                        <a href="#"><img src="/themes/{{ $shop_theme }}/img/facebook-logo.png"></a>
                        <a href="#"><img src="/themes/{{ $shop_theme }}/img/twitter-logo.png"></a>
                        <a href="#"><img src="/themes/{{ $shop_theme }}/img/pinterest-logo.png"></a>
                    </div>
                </div>
            </div>
        </div>
 	</footer>

    

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/bootstrap.min.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/match-height.js"></script>
    <script type="text/javascript" src="/themes/{{ $shop_theme }}/js/fit-text.js"></script>
    <script src="/themes/{{ $shop_theme }}/js/global.js"></script>
    @yield("js")
    </body>
</html>
