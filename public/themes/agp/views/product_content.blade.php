@extends('layout')
@section('content')
<div class="top_wrapper   no-transparent">
    <!-- BREADCRUMB -->
    <div class="container">
        <div class="bredcrumb">
            <a href="/product">PRODUCTS</a> 
            @foreach($breadcrumbs as $breadcrumb)
            > 
            <a href="/product?type={{ $breadcrumb["type_id"] }}">{{ $breadcrumb["type_name"] }}</a> 
            @endforeach
            > 
            <span>{{ $product["eprod_name"] }}</span>
        </div>
    </div>
    <!-- Main Content -->
    <section id="content" class="content-product">
        <div class="row-fluid">
            <div class="span12 portfolio_single" data-id="3388">
                <div class="container">
                    <div class="row-fluid single_content side_single">
                        <div class="row-fluid" style="margin-top:0px;">
                            
                            <div class="span8 slider_full with_thumbnails_container">
                                <div class="slideshow_container slide_layout_" >
                                    <ul class="slides slide_flexslider_thumb">
                                        <li data-thumb='{{ get_product_first_image($product) }}' class=' slide_element slide3 frame3' style="text-align: center;"><img class="img-responsive" style="margin: auto;" src='{{ get_product_first_image($product) }}' alt='' /> </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="span4">
                                <div class="details_side">
                                    <h1 class="dact-name">{{ get_product_first_name($product) }}</h1>
                                </div>
                                <div class="details_content">
                                    <p style="white-space: pre-wrap;">{{ get_product_first_description($product) }}</p>
                                </div>
                                <div class="details_side" style="margin-top: 20px;">
                                    <h1>Date</h1>
                                </div>
                                <div class="details_content">
                                    <p>{{ date("F d, Y", strtotime($product["date_created"])) }}</p>
                                </div>
                                <div class="details_side" style="margin-top: 20px;">
                                    <h1>Price</h1>
                                </div>
                                <div class="details_content">
                                    <p style="white-space: pre-wrap; word-break: keep-all !important;"> {{ get_product_first_price($product) }}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="resources/assets/front/css/product.css">
@endsection
