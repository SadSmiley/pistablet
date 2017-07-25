<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="icon" href="../../favicon.ico">
		<title>{{ ucfirst($shop_info->shop_key) }} | {{ $page }}</title>
		<!-- Bootstrap core CSS -->
		<link href="/assets/themes/css/bootstrap.min.css" rel="stylesheet" type="text/css">
		<link href="/themes/{{ $shop_theme }}/css/main.css" rel="stylesheet" type="text/css">
		<!-- THEME COLOR -->
		<link href="/themes/{{ $shop_theme }}/css/{{ $shop_theme_color }}.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<nav class="navbar">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">Project name</a>
				</div>
				<!-- NAVIGATION -->
				<div id="navbar" class="navbar-collapse collapse navbar-right">
					<ul class="nav navbar-nav">
						<li class="active"><a href="#">Home</a></li>
						<li><a href="#">Products</a></li>
						<li><a href="#">About</a></li>
						<li><a href="#">Blogs</a></li>
						<li><a href="#">Contact Us</a></li>
					</ul>
				</div>
				<!-- END NAVIGATION -->
			</div>
		</nav>
		<!-- START OF CONTENT -->
		@yield('content');
		<!-- END OF CONTENT -->
		<footer class="text-center">
			<p>&copy; 2016 Company, Inc.</p>
		</footer>
		<script src="/assets/themes/js/jquery.min.js"></script>
		<script src="/assets/themes/js/bootstrap.min.js"></script>
	</body>
</html>