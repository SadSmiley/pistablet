@extends('layout')
@section('content')
<div class="banner" style="background-image: url('/themes/{{ $shop_theme }}/img/banner-bg.jpg')">
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-6">
                <div class="text">A Real Product Need</div>
            </div>
            <div class="col-md-6">
                <div class="breadcrumbz">Product > <strong>{{ get_product_first_name($product) }}</strong></div>
            </div> 
        </div>
    </div>
</div>
<div class="product">
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-6">
                <div class="img-holder">
                    <img class="img-responsive" style="margin: auto;" src="{{ get_product_first_image($product) }}">
                </div> 
            </div>
            <div class="col-md-6">
                <div class="text-holder">
                    <div class="name">{{ get_product_first_name($product) }}</div>
                    <div class="desc">{!! get_product_first_description($product) !!}</div>
                </div>
                <div class="text-holder">
                    <div class="name">Price</div>
                    <div class="price">{{ get_product_first_price($product) }}</div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section("js")
<script type="text/javascript" src="/resources/assets/frontend/js/zoom.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/js/product_content.js"></script>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/product_content.css">
@endsection
