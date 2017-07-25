@extends('layout')
@section('content')
<div class="product">
    <div class="container">
        <div class="holder row-no-padding clearfix">
            <div class="col-md-6">
                <img class="img" src="">
            </div>
            <div class="col-md-6">
                <div class="info">
                    <div class="title">Title</div>
                    <div class="desc">Description</div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="other">
    <div class="container">
        <div class="row clearfix" style="overflow: initial;">
            <div class="col-md-8">
                <div class="title" style="opacity: 0;">&nbsp;</div>
                <div class="about match-height">
                    <div class="img">
                        <img src="">
                    </div>
                    <div class="desc"></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="title">Related Products</div>
                <div class="match-height">
                    <div class="relate-holder">
                        <img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-1.jpg">
                    </div>
                    <div class="relate-holder">
                        <img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-2.jpg">
                    </div>
                    <div class="relate-holder">
                        <img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/product-3.jpg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('css')
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/single-product.css">
@endsection