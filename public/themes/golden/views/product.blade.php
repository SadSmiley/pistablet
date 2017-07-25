@extends('layout')
@section('content')
<div class="intro" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-bg.jpg');">
	<div class="banner">
		<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/healthy-text.png">
	</div>
	<div class="text">{{ $shop_theme_info->product->product_desc->default }}</div>
</div>
<div class="product">
	<div class="title">{{ $shop_theme_info->product->product_title->default }}</div>
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-1.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-2.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-3.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-4.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-5.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-6.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-7.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
			<div class="col-md-3 col-sm-6">
				<div class="product-holder">
					<div class="img"><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-8.jpg"></div>
					<a href="/product/view" class="btn btn-default">VIEW DETAILS</a>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
@section('css')
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/product.css">
@endsection