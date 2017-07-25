<html>
<head>
	<title>Golden Falcon Marketing</title>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
	<link href='https://fonts.googleapis.com/css?family=Raleway:300,400,700' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/global.css">
	<link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/font-awesome/css/font-awesome.min.css" type="text/css" />
	@yield("css")

	<!-- THEME COLOR -->
	<link href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/{{ $shop_theme_color }}.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="wrapper">
	<div class="header-bar clearfix">
		<div class="container">
			<div class="pull-left"><i class="fa fa-envelope" aria-hidden="true"></i> customercare@goldenfalconmarketing.com</div>
			<div class="pull-right"><i class="fa fa-phone" aria-hidden="true"></i> +44 870 888 88 88</div>
		</div>
	</div>
	<header class="header-wrapper">
		<div class="header">
			<div class="container">
				<div class="header-nav row clearfix">
					<div class="col-md-8 logo-holder">
						<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/logo-bg.png" style="opacity: 0;">
						<span>GOLDEN FALCON MARKETING</span>
					</div>
					<div class="col-md-4 button-holder">
						<button class="btn btn-default sign-in" type="button" onClick="location.href='/mlm/login'">SIGN IN</button>
						<button class="btn btn-default order-now">ORDER NOW!</button>
					</div>
				</div>
			</div>
		</div>
		<nav class="navbar">
		  <div class="container">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="/" style="color: #34495e !important; font-weight: bold; font-family: 'Raleway', sans-serif;"></a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		        <!-- <li class="{{ Request::segment(1) == '' ? 'active' : '' }}"><a class="ts" href="/">Home</a></li> -->
		        <!-- <li class="{{ Request::segment(1) == 'store' ? 'active' : '' }}"><a class="ts" href="/store">Store</a></li> -->
		        <!-- <li class="{{ Request::segment(1) == 'gallery' ? 'active' : '' }}"><a class="ts" href="/gallery">Gallery</a></li> -->
		      </ul>
			<ul class="nav navbar-nav navbar-right">
		        <li class="{{ Request::segment(1) == '' ? 'active' : '' }}"><a href="/">HOME</a></li>
		        <li class="{{ Request::segment(1) == 'product' ? 'active' : '' }}"><a href="/product">PRODUCTS</a></li>
		        <!-- <li class="{{ Request::segment(1) == 'testimonial' ? 'active' : '' }}"><a href="/testimonial">TESTIMONIALS</a></li> -->
		        <li class="{{ Request::segment(1) == 'about' ? 'active' : '' }}"><a href="/about">ABOUT US</a></li>
		        <li class="{{ Request::segment(1) == 'contact' ? 'active' : '' }}"><a href="/contact">CONTACT US</a></li>
		        <li class="{{ Request::segment(1) == 'blog' ? 'active' : '' }}"><a href="/blog">BLOG</a></li>
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
	</header>
	<div class="content">
	@yield("content")
	</div>
	<footer>
		<div class="container">
			<div class="row clearfix">
				<div class="col-sm-4">
					<div class="footer-title">INFORMATION</div>
					<div class="footer-content">
						<ul>
							<li><a href="javascript:">HOME</a></li>
							<li><a href="javascript:">PRODUCT</a></li>
							<li><a href="javascript:">ABOUT US</a></li>
							<li><a href="javascript:">CONTACT</a></li>
						</ul>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="footer-title">CONTACT US</div>
					<div class="footer-content">
						<ul>
							<li><a href="javascript:">0999-000-0000</a></li>
							<li><a href="javascript:">0999-000-0000</a></li>
							<li><a href="mailto:adminsupport@goldenfalcon.com">adminsupport@goldenfalcon.com</a></li>
						</ul>
					</div>
				</div>
				<div class="col-sm-4">
					<div class="footer-title">FOLLOW US ON</div>
					<div class="footer-content">
						<div class="social-holder">
							<a href="javascript:"><i class="fa fa-facebook" aria-hidden="true"></i></a>
						</div>
						<div class="social-holder">
							<a href="javascript:"><i class="fa fa-twitter" aria-hidden="true"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/jquery.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="http://arrow.scrolltotop.com/arrow13.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/match-height.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/fittext.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/global.js"></script>
@yield("script")
</body>
</html>
