@extends('layout')
@section("social-script")
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1920870814798104";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
@endsection
@section('content')

@if(get_content($shop_theme_info, 'product', 'product_banner') && get_content($shop_theme_info, 'product', 'product_banner_link'))
<div class="aadd">
    <a href="{{ get_content($shop_theme_info, 'product', 'product_banner') }}" target="_blank">
        <img src="{{ get_content($shop_theme_info, 'product', 'product_banner_link') }}" style="" >
    </a>
</div>
@endif
<div class="product-contents clear">
<!-- LEFT SIDEBAR -->
<div class="sidebar">
    <form class="form-filter" method="get">
        <div class="holder">
            <div class="title">SHOWING {{ $current_count }} OF {{ $total_product }} ITEMS</div>
        </div>

        @if(Input::get("featured") != 0)
            <input name="featured" type="hidden" value="{{ Input::get('featured') }}">
        @endif

        @if(Input::get("type") != 0)
            <input name="type" type="hidden" value="{{ Input::get('type') }}">
        @endif

        @if(Input::get("brand") != 0)
            <input name="brand" type="hidden" value="{{ Input::get('brand') }}">
        @endif

        <input type="hidden" class="min-price" value="" name="min">
        <input type="hidden" class="max-price" value="" name="max">
        
        <div class="holder">
            <div class="title text-left">View Type</div>
            <div class="icon-holder">
                <div class="icon" id="grid">
                    <img class="grid-active" src="/resources/assets/frontend/img/grid-active.png">
                    <img class="grid-non hide" src="/resources/assets/frontend/img/grid-non.png">
                </div>
                <div class="icon" id="list">
                    <img class="list-non" src="/resources/assets/frontend/img/list-non.png">
                    <img class="list-active hide" src="/resources/assets/frontend/img/list-active.png">
                </div>
            </div>
        </div>
        <div class="holder">
            <div class="select">
                <select class="sidebar-order" name="sort">
                    <option value="" {{ Request::input('sort') == '' ? 'selected' : '' }}>Relevance</option>
                    <option value="name_asc" {{ Request::input('sort') == 'name_asc' ? 'selected' : '' }}>Sort by Name: A - Z</option>
                    <option value="name_desc" {{ Request::input('sort') == 'name_desc' ? 'selected' : '' }}>Sort by Name: Z - A</option>
                    <option value="price_desc" {{ Request::input('sort') == 'price_desc' ? 'selected' : '' }}>Sort by Price: High - Low</option>
                    <option value="price_asc" {{ Request::input('sort') == 'price_asc' ? 'selected' : '' }}>Sort by Price: Low - High</option>
                    <option value="newest" {{ Request::input('sort') == 'newest' ? 'selected' : '' }}>Sort by: Newest</option>
                </select>
            </div>
        </div>
        <div class="holder">
            <div class="title text-left">Filter By Price</div>
            <div class="slider-range"></div>
            <div class='filter'>
                <input type="text" id="amount" readonly style="border:0;">
                <button id="test-submit">Filter</button>
            </div>
        </div>
        <div class="holder sshide">
            <div class="title text-left">Top Rated Products</div>
            @foreach(get_collection(get_content($shop_theme_info, "product", "top_rated_products"), $shop_id) as $collection)
                <a href="/product/view/{{ $collection['eprod_id'] }}" class="text">
                    <div class="product-top">
                        <div class="text">
                            <div class="name">{{ get_collection_first_name($collection) }}</div>
                            <div class="price">{{ get_collection_first_price($collection) }}</div>
                        </div>
                        <div class="img"><img class="4-3-ratio" src="{{ get_collection_first_image($collection) }}"></div>
                    </div>
                </a>    
            @endforeach
        </div>
        <div class="holder sshide">
            <div class="title text-left">Most Viewed</div>
            @foreach(get_collection(get_content($shop_theme_info, "product", "most_viewed"), $shop_id) as $collection)
                <a href="/product/view/{{ $collection['eprod_id'] }}" class="text">
                    <div class="product-top">
                        <div class="text">
                            <div class="name">{{ get_collection_first_name($collection) }}</div>
                            <div class="price">{{ get_collection_first_price($collection) }}</div>
                        </div>
                        <div class="img"><img class="4-3-ratio" src="{{ get_collection_first_image($collection) }}"></div>
                    </div>
                </a>    
            @endforeach 
        </div>
        <div class="holder sshide">
            <div class="title text-left">Most Searched Products</div>
            @foreach($_most_searched as $most_searched)
                <a href="/product/view/{{ $most_searched['eprod_id'] }}" class="text">
                    <div class="product-top">
                        <div class="text">
                            <div class="name">{{ get_product_first_name($most_searched) }}</div>
                            <div class="price">{{ get_product_first_price($most_searched) }}</div>
                        </div>
                        <div class="img"><img class="4-3-ratio" src="{{ get_product_first_image($most_searched) }}"></div>
                    </div>
                </a>    
            @endforeach
        </div>
        <div class="holder">
            <div class="facebook-container" style="margin-top: 15px; margin-bottom: 15px;">
                <div class="sticky">
                    <div class="fb-page" data-href="https://www.facebook.com/Intogadgetstore/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote style="display: none;" cite="https://www.facebook.com/Intogadgetstore/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Intogadgetstore/">Intogadgets</a></blockquote></div>
                </div>
            </div>
        </div>
    </form>
</div>

<!-- PRODUCT CONTAINER -->
<div class="product-content">
    <div class="product-title">
        <div class="text" onclick="location.href='/'">Home</div> 
        @foreach($breadcrumbs as $breadcrumb)
          <i class="fa fa-circle aktibo"></i>
          @if(end($breadcrumbs) == $breadcrumb)
            <div class="text aktibo">{{ $breadcrumb['type_name'] }}</div>
          @else
            <div class="text" onclick="location.href='/{{ $breadcrumb['type_id'] }}'">{{ $breadcrumb['type_name'] }}</div> 
          @endif
        @endforeach
    </div>
    <div class="page">
        {!! $_product->appends(Request::input())->render() !!}
    </div>
    <div class="product-sub text-left"></div>
    <div class="product-contentie">
        <div class="row-no-padding clearfix">
            <div class="col-md-12">
                @if(count($_product) > 0)
                    <div class="grid-view">
                        <div class="row-no-padding clearfix">
                            @foreach($_product as $product)
                                @if(count($product['variant']) > 0)
                                    <div class="holder">
                                        <div class="border match-height">
                                            <div class="img">
                                                @if($product["eprod_detail_image"])
                                                    <img class="detail" src="{{ $product["eprod_detail_image"] }}">
                                                @endif
                                                <img class="1-1-ratio" src="{{ get_product_first_image($product) }}">
                                            </div>
                                            <div class="name">{{ get_product_first_name($product) }}</div>
                                            <!-- <div class="price-left">P34,000</div> -->
                                            <div class="price-right">{{ get_product_first_price($product) }}</div>
                                            <div class="hover">
                                                <a product-id="{{ $product['eprod_id'] }}" style="display: block; margin-bottom: 50px;" href="javascript:" class="text quick-add-cart">ADD TO CART</a>
                                                <a style="display: block; margin-top: 50px;" href="/product/view/{{ $product['eprod_id'] }}" class="text">VIEW MORE</a>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                            @endforeach
                        </div>
                    </div>
                    <div class="list-view hide">
                        @foreach($_product as $product)
                            @if(count($product['variant']) > 0)
                                <div class="holder">
                                    <div class="img">
                                        <img class="1-1-ratio" src="{{ get_product_first_image($product) }}">
                                    </div>
                                    <div class="text">
                                        <div class="name">{{ get_product_first_name($product) }}</div>
                                        <!--<div class="sprice">from: <span>P34,990</span></div>-->
                                        <div class="price">{{ get_product_first_price($product) }}</div>
                                        <div class="description">{!! get_product_first_description($product) !!}</div>
                                    </div>
                                    <div class="cart">
                                        <!-- <div class="info"><span>Delivery:</span>&nbsp;1 - 5 Business Days</div> -->
                                        <!-- <div class="info"><span>Shipping Fee:</span>&nbsp;123.00</div> -->
                                        <a class="button text-center" href='/product/view/{{ $product['eprod_id'] }}'">View Info</a>
                                       {{--  <button class="button" onclick="location.href='product/view/{{ $product['eprod_id'] }}'">View Info</button> --}}
                                    </div>
                                </div>
                            @endif
                        @endforeach
                    </div>
                @else
                    <h2 class="text-center" style="margin-top: 50px;">No Results</h2>
                @endif
            </div>
        </div>
    </div>
    <div>
        {!! $_product->appends(Request::input())->render() !!}
    </div>
</div>

<div class="sidebar shide">
    <form class="form-filter">
        <div class="holder">
            <div class="title text-left">Top Rated Products</div>
            @foreach(get_collection(get_content($shop_theme_info, "product", "top_rated_products"), $shop_id) as $collection)
                <a href="/product/view/{{ $collection['eprod_id'] }}" class="text">
                    <div class="product-top">
                        <div class="text">
                            <div class="name">{{ get_collection_first_name($collection) }}</div>
                            <div class="price">{{ get_collection_first_price($collection) }}</div>
                        </div>
                        <div class="img"><img class="4-3-ratio" src="{{ get_collection_first_image($collection) }}"></div>
                    </div>
                </a>    
            @endforeach
        </div>
        <div class="holder">
            <div class="title text-left">Most Viewed</div>
            @foreach(get_collection(get_content($shop_theme_info, "product", "most_viewed"), $shop_id) as $collection)
                <a href="/product/view/{{ $collection['eprod_id'] }}" class="text">
                    <div class="product-top">
                        <div class="text">
                            <div class="name">{{ get_collection_first_name($collection) }}</div>
                            <div class="price">{{ get_collection_first_price($collection) }}</div>
                        </div>
                        <div class="img"><img class="4-3-ratio" src="{{ get_collection_first_image($collection) }}"></div>
                    </div>
                </a>    
            @endforeach
        </div>
        {{-- <div class="holder">
            <div class="facebook-container" style="margin-top: 15px;">
                <div class="sticky">
                    <div class="fb-page" data-href="https://www.facebook.com/Intogadgetstore/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote style="display: none;" cite="https://www.facebook.com/Intogadgetstore/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Intogadgetstore/">Intogadgets</a></blockquote></div>
                </div>
            </div>
        </div> --}}
    </form>
</div>
<div id="quick-add-cart" class="modal fade" role="dialog">
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add to Cart</h4>
      </div>
      <div class="quick-cart-content">
          
      </div>
    </div>

  </div>
</div>

    <script type="text/javascript">
            var $filter_min = {{ $min_price }}; 
            var $filter_max = {{ $max_price }};
            var $filter_val = 0;
     </script>
    @endsection
    
    @section('css')
    <link rel="stylesheet" href="resources/assets/frontend/css/product.css">
    <link rel="stylesheet" href="resources/assets/rutsen/css/jquery-ui.css">
    @endsection

    @section('script')
    <script type="text/javascript">
        var min_range = {{ Request::input("min") ? Request::input("min") : $min_price }};
        var max_range = {{ Request::input("max") ? Request::input("max") : $max_price }};
    </script>
    <script type="text/javascript" src="resources/assets/external/jquery-ui.js"></script>
    <script type="text/javascript" src="resources/assets/frontend/js/product.js"></script>
    @endsection

