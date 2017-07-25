@extends('layout')
@section('content')
<div class="intro">
	<div class="pattern-bg" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/pattern-bg.png');"></div>
	<div class="slider">
		@if(is_serialized($shop_theme_info->home->home_slideshow->default))
			@foreach(unserialize($shop_theme_info->home->home_slideshow->default) as $slider)
			<div><img src="{{ $slider }}"></div>
			@endforeach
		@else
		<div><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/intro-bg-1.jpg"></div>
		<div><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/intro-bg-2.jpg"></div>
		<div><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/intro-bg-3.jpg"></div>
		@endif
	</div>
	<div class="text">
		<div class="ichi">{{ $shop_theme_info->home->home_intro1->default }}</div>
		<div class="ni">{{ $shop_theme_info->home->home_intro2->default }}</div>
		<div class="san">{{ $shop_theme_info->home->home_intro3->default }}</div>
		<div class="sub">{{ $shop_theme_info->home->home_intro4->default }}</div>
		<button class="btn btn-default hide" type="button" onClick="location.href='/member/register'">JOIN US NOW!</button>
	</div>
	<div class="feature">
		<div class="container">
			<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/feature-1.jpg')" onClick="location.href='/about'">
				<div class="feature-text">
					<div class="name">{{ $shop_theme_info->home->home_thumb1->default }}</div>
					<div class="arrow"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
				</div>
			</div>
			<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/feature-2.jpg')" onClick="location.href='/testimonial'">
				<div class="feature-text">
					<div class="name">{{ $shop_theme_info->home->home_thumb2->default }}</div>
					<div class="arrow"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
				</div>
			</div>
			<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/feature-3.jpg')" onClick="location.href='/product'">
				<div class="feature-text">
					<div class="name">{{ $shop_theme_info->home->home_thumb3->default }}</div>
					<div class="arrow"><i class="fa fa-chevron-up" aria-hidden="true"></i></div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="about">{{ $shop_theme_info->home->home_about->default }}</div>
<div class="objective">
	<div class="fkin-bg"></div>
	<div class="slider-feature">
		<div><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/mission.jpg"></div>
		<div><img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/vision.jpg"></div>
	</div>
	<div class="objective-holder">
		<div class="container">
			<div class="row clearfix">
				<div class="col-sm-6 holder-switch">
					<img class="objective-img" src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/objective.png" alt="">
				</div>
				<div class="col-sm-6 holder-switch">
					<div class="switcher">
						<div class="holder active" switch="0">MISSION</div>
						<div class="divider">|</div>
						<div class="holder" switch="1">VISION</div>
					</div>
					<div class="switcher-content">
						<div switch="0">
							{{ $shop_theme_info->home->home_mission->default }}
						</div>					
						<div switch="1" class="hide">
							{{ $shop_theme_info->home->home_about->default }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="product">
	<div class="title">{{ $shop_theme_info->home->home_product_title->default }}</div>
	<div class="intro-img">
		<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/be-healthy.png">
	</div>
	<div class="sub">{{ $shop_theme_info->home->home_product_sub->default }}</div>
	<div class="row-no-padding clearfix">
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-1.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-2.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-3.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-4.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-5.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-6.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-7.jpg">
			</div>
		</div>
		<div class="col-sm-3">
			<div class="product-holder">
				<div class="product-overlay">
					<div class="text-holder">
						<div class="name">Get <span>Slim</span></div>
						<button class="btn btn-default">Read More</button>
					</div>
				</div>
				<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-8.jpg">
			</div>
		</div>
	</div>
	<div class="mini-sub">{{ $shop_theme_info->home->home_product_sub_desc->default }}</div>
	<button class="join-button btn hide" type="button" onClick="location.href='/member/register'">JOIN US NOW!</button>
</div>
@endsection
@section('script')
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/slick/slick.min.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/home.js"></script>
@endsection
@section('css')
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/slick/slick.css">
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/slick/slick-theme.css">
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/home.css">
@endsection
