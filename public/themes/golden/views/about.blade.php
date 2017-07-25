@extends('layout')
@section('content')
<div class="intro" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/about-bg.jpg');">
	<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/white-logo.png">
	<div class="title">{{ $shop_theme_info->about->about_title->default }}</div>
	<div class="sub">{{ $shop_theme_info->about->about_sub->default }}</div>
	<div class="desc">{{ $shop_theme_info->about->about_desc->default }}</div>
</div>
<div class="container-body">
	<div class="container">
		<div class="row clearfix">
			<div class="holder clearfix" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/map-draw.png');">
				<div class="col-md-4 img">
					<img src="{{ $shop_theme_info->about->about_feature_1_first_image->default ? $shop_theme_info->about->about_feature_1_first_image->default : '/themes/' . $shop_theme . '/resources/assets/frontend/img/about-1.png' }}">
				</div>
				<div class="col-md-8 text">
					<div class="title"><span>{{ $shop_theme_info->about->about_feature_1_title->default }}</span></div>
					<div class="desc">{{ $shop_theme_info->about->about_feature_1_first_desc->default }}</div>
				</div>
			</div>
			<div class="holder clearfix right" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/map-draw.png');">
				<div class="col-md-8 text">
					<div class="desc">{{ $shop_theme_info->about->about_feature_1_second_desc->default }}</div>
				</div>
				<div class="col-md-4 img">
					<img src="{{ $shop_theme_info->about->about_feature_1_second_image->default ? $shop_theme_info->about->about_feature_1_second_image->default : '/themes/' . $shop_theme . '/resources/assets/frontend/img/about-2.png' }}">
				</div>
			</div>
			<div class="holder clearfix" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/map-draw.png');">
				<div class="col-md-4 img">
					<img src="{{ $shop_theme_info->about->about_feature_2_image->default ? $shop_theme_info->about->about_feature_2_image->default : '/themes/' . $shop_theme . '/resources/assets/frontend/img/about-3.png' }}">
				</div>
				<div class="col-md-8 text">
					<div class="title"><span>{{ $shop_theme_info->about->about_feature_2_title->default }}</span></div>
					<div class="desc">{{ $shop_theme_info->about->about_feature_2_desc->default }}</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/about.css">
@endsection