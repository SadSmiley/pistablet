@extends('layout')
@section('content')
<div class="top_wrapper no-transparent">
    <!-- SHOW CATEGORY BANNER -->
    <div class="intro">
        <img src="resources/assets/front/img/choose-product-bg.jpg">
    </div>
    <div class="category">
        <div class="clearfix container">
            <div class="lol-row">
                @if(!Request::input("type"))
                    @foreach($_category as $category)
                    <div class="vc_col-sm-3 wpb_column column_container">
                        <div class="holder green">
                            <div class="name" style="margin-bottom: 25px;">{{ $category["type_name"] }}</div>
                            <button class="btn" type="button" onClick="location.href='/product?type={{ $category["type_id"] }}'">BROWSE PRODUCTS</button>
                        </div>
                    </div>
                    @endforeach
                @endif
            </div>
        </div>
    </div>
    <div class="product">
        <div class="container">
            <div class="headww clearfix">
                <div class="lebel clearfix">
                    <!-- PLACE CATEGORY -->
                    @if(Request::input("type"))
                        @foreach($_category as $category)
                            <button class="cat-tab {{ $category["type_id"] == Request::input('type') ? 'active' : '' }}" type="button" onClick="location.href='/product?type={{ $category["type_id"] }}'">{{ $category["type_name"] }}</button>
                        @endforeach
                    @else
                        <img src="resources/assets/front/img/random.png"> <span>ALL PRODUCTS</span>
                    @endif
                </div>
                <div class="filter">
                    <span>SORTED BY: </span>
                    <form method="get" class="sort-form">
                        <input type="hidden" name="category" value="{{ Request::input('category') }}">
                        <select class="form-control" name="sort" onchange="jQuery('.sort-form').submit();">
                            <option>Relevance</option>
                            <option value="name_asc" {{ Request::input("sort") == "name_asc" ? "selected" : "" }}>Name: A - Z</option>
                            <option value="name_desc" {{ Request::input("sort") == "name_desc" ? "selected" : "" }}>Name: Z - A</option>
                            <option value="price_asc" {{ Request::input("sort") == "price_asc" ? "selected" : "" }}>Price: Low - High</option>
                            <option value="price_desc" {{ Request::input("sort") == "price_desc" ? "selected" : "" }}>Price: High - Low</option>
                            <option value="newest" {{ Request::input("sort") == "newest" ? "selected" : "" }}>Newest</option>                
                        </select>
                    </form>
                </div>
            </div>
            <div class="lol-row clearfix">
                @foreach($_product as $product)
                <div class="vc_col-sm-4 wpb_column column_container">
                    <div class="product-holder green match-height" onClick="location.href='/product/view/{{ $product["eprod_id"] }}'">
                        <div class="pic"><img src="{{ get_product_first_image($product) }}" alt=""></div>
                        <div class="divider"></div>
                        <div class="name">{{ get_product_first_name($product) }}</div>
                        <div class="desc">{{ substr(get_product_first_description($product), 0, 150) }} ...</div>
                        <div class="price">{{ get_product_first_price($product) }} AED</div>
                    </div>
                </div>
                @endforeach
            </div>
            <div class="clearfix">
                <div class="pull-right">
                    {!! $_product->appends(Request::input())->render() !!}
                </div>
            </div>
        </div>
    </div>
    <div class="quote clearfix">
      <div class="container">
         <div class="clearfix">
            <div class="vc_col-sm-9 wpb_column column_container">
               {{ get_content($shop_theme_info, "product", "product_start_quote") }}
            </div>
            <div class="vc_col-sm-3 wpb_column column_container">
               <button class="btn btn-default" type="button" onClick="location.href='/mlm/register'">{{ get_content($shop_theme_info, "product", "product_start_button_text") }}</button>
            </div>
         </div>
      </div>
   </div>
</div>
@endsection
@section('css')
<link rel="stylesheet" type="text/css" href="resources/assets/front/css/product.css">
@endsection