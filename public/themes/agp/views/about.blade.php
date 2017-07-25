@extends('layout')
@section('content')
<div class="top_wrapper   no-transparent">
    <div class="intro">
        <img src="resources/assets/front/img/company-bg.jpg">
    </div>
    <div class="about" style="background-image: url('resources/assets/front/img/lol-bg.png')">
        <div class="container">
            <div class="lol-row clearfix">
                <div class="vc_col-sm-4 wpb_column column_container">
                    <img class="tower" src="resources/assets/front/img/about-tower.jpg">
                </div>
                <div class="vc_col-sm-8 wpb_column column_container bg-here">
                    <div class="title">{{ get_content($shop_theme_info, "company", "about_title") }}</div>
                    <div class="desc">{{ get_Content($shop_theme_info, "company", "about_description") }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="resources/assets/front/css/about.css">
@endsection