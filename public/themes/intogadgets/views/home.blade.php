@extends('layout')
@section('content')
<!-- home product -->
<div class="container-fluid home-product nopadding">
    <div style="display: table; width: 100%; table-layout: fixed;">
        <div class="left nopadding ratio-fix">
            <ul id="slippry">
                @if(is_serialized(get_content($shop_theme_info, "home", "home_slider")))
                    @foreach(unserialize(get_content($shop_theme_info, "home", "home_slider")) as $slider)
                    <li>
                        <a href="javascript:"><img src="{{ $slider }}" alt=""></a>
                    </li>
                    @endforeach
                @endif
            </ul>
        </div>
        <div class="right nopadding category-ratio">
            <div class="container-fluid nopadding clearfix">
                <a href="{{ get_content($shop_theme_info, 'home', 'home_category_sale_link') }}" class="holder nopadding 1 one">
                    <img src="{{ get_content($shop_theme_info, 'home', 'home_category_sale') }}">
                    <div class="text">{{ get_content($shop_theme_info, 'home', 'home_category_sale_label') }}</div>
                    <div class="hover"></div>
                </a>
                <a href="{{ get_content($shop_theme_info, 'home', 'home_category_featured_link') }}" class="holder nopadding 2 two">
                    <img src="{{ get_content($shop_theme_info, 'home', 'home_category_featured') }}">
                    <div class="text" style="left: 15px !important;">{{ get_content($shop_theme_info, 'home', 'home_category_featured_label') }}</div>
                    <div class="hover"></div>
                </a>
            </div>
            <div class="container-fluid nopadding clearfix">
                <a href="{{ get_content($shop_theme_info, 'home', 'home_category_tablet_link') }}" class="holder nopadding 3 three">
                    <img src="{{ get_content($shop_theme_info, 'home', 'home_category_tablet') }}">
                    <div class="text x">{{ get_content($shop_theme_info, 'home', 'home_category_tablet_label') }}</div>
                    <div class="hover"></div>
                </a>
                <a href="{{ get_content($shop_theme_info, 'home', 'home_category_accessories_link') }}" class="holder nopadding 4 four">
                    <img src="{{ get_content($shop_theme_info, 'home', 'home_category_accessories') }}">
                    <div class="text x">{{ get_content($shop_theme_info, 'home', 'home_category_accessories_label') }}</div>
                    <div class="hover"></div>
                </a>
                <a href="{{ get_content($shop_theme_info, 'home', 'home_category_smartphone_link') }}" class="holder nopadding 5 five">
                    <img src="{{ get_content($shop_theme_info, 'home', 'home_category_smartphone') }}">
                    <div class="text x">{{ get_content($shop_theme_info, 'home', 'home_category_smartphone_label') }}</div>
                    <div class="hover"></div>
                </a>
            </div>
        </div>
    </div>
    <!-- service -->
    <div class="service">
        <div class="holder">
            <img src="{{ get_content($shop_theme_info, 'home', 'home_first_service', '/resources/assets/frontend/img/shipping.jpg') }}">
        </div>
        <div class="holder">
            <img src="{{ get_content($shop_theme_info, 'home', 'home_second_service', '/resources/assets/frontend/img/business.jpg') }}">
        </div>
        <div class="holder">
            <img src="{{ get_content($shop_theme_info, 'home', 'home_third_service', '/resources/assets/frontend/img/garentee.jpg') }}">
        </div>
    </div>
</div>
<!-- brand -->
<div class="brand">
    <div class="header-brand">
        <div class="line"></div>
        <div class="text">{{ get_content($shop_theme_info, 'home', 'home_brand_title', 'BRANDS') }}</div>
    </div>
    <!-- Place somewhere in the <body> of your page -->
    <div class="flexslider">
      <ul class="slides">
          @foreach($_brand as $brand)
          <li>
            <a href="/product?brand={{ $brand->manufacturer_id }}"><img src="{{ $brand->image_path }}"></a>
          </li>
          @endforeach
        <!-- items mirrored twice, total of 12 -->
      </ul>
    </div>
</div>
<!-- feature -->
<div class="feature">
    <div class="feature-header">{{ get_content($shop_theme_info, "home", "home_featured_title") }}</div>
    <div class="feature-content container">
        @foreach(get_collection(get_content($shop_theme_info, "home", "home_featured"), $shop_id) as $collection)
        <div class="holder col-md-3 col-sm-6">
           <a href="/product/view/{{ $collection['product']['eprod_id'] }}">
           </a>
           <div class="border">
              <a href="/product/view/{{ $collection['product']['eprod_id'] }}">
                 <div class="img">
                  @if($collection["product"]["eprod_detail_image"])
                      <img class="detail" src="{{ $collection["product"]["eprod_detail_image"] }}">
                  @endif
                  <img src="{{ get_collection_first_image($collection) }}">
                 </div>
                 <div class="name">{{ get_collection_first_name($collection) }}</div>
                 <div class="price-left">P {{ get_collection_first_price($collection) }}</div>
                 <div class="price-right">₱ 13,990.00</div>
              </a>
             <div class="hover">
                  <a product-id="{{ $collection['product']['eprod_id'] }}" style="display: block; margin-bottom: 50px;" href="javascript:" class="text quick-add-cart">ADD TO CART</a>
                  <a style="display: block; margin-top: 50px;" href="/product/view/{{ $collection['product']['eprod_id'] }}" class="text">VIEW MORE</a>
              </div>
           </div>
        </div>
        @endforeach
    </div>
</div>
<!-- arrival -->
<div class="arrival">
    <div class="arrival-header">
        <div class="line"></div>
        <div class="text">{{ get_content($shop_theme_info, 'home', 'home_new_arrival_title') }}</div>
    </div>
    <div class="arrival-content container">
        @foreach(get_collection(get_content($shop_theme_info, "home", "home_new_arrival"), $shop_id) as $collection)
        <div class="holder col-md-3 col-sm-6">
           <a href="/product/view/{{ $collection['product']['eprod_id'] }}">
           </a>
           <div class="border">
              <a href="/product/view/{{ $collection['product']['eprod_id'] }}">
                 <div class="img">
                  @if($collection["product"]["eprod_detail_image"])
                      <img class="detail" src="{{ $collection["product"]["eprod_detail_image"] }}">
                  @endif
                  <img src="{{ get_collection_first_image($collection) }}">
                 </div>
                 <div class="name">{{ get_collection_first_name($collection) }}</div>
                 <div class="price-left">P {{ get_collection_first_price($collection) }}</div>
                 <div class="price-right">₱ 13,990.00</div>
              </a>
             <div class="hover">
                  <a product-id="{{ $collection['product']['eprod_id'] }}" style="display: block; margin-bottom: 50px;" href="javascript:" class="text quick-add-cart">ADD TO CART</a>
                  <a style="display: block; margin-top: 50px;" href="/product/view/{{ $collection['product']['eprod_id'] }}" class="text">VIEW MORE</a>
              </div>
           </div>
        </div>
        @endforeach
    </div>
</div>
<!-- best seller -->
<div class="best">
    <div class="best-header">
        <div class="line"></div>
        <div class="text">{{ get_content($shop_theme_info, 'home', 'home_best_seller_title') }}</div>
    </div>
    <div class="best-content container">
        @foreach(get_collection(get_content($shop_theme_info, "home", "home_best_seller"), $shop_id) as $collection)
        <div class="holder col-md-3 col-sm-6">
           <a href="/product/view/{{ $collection['product']['eprod_id'] }}">
           </a>
           <div class="border">
              <a href="/product/view/{{ $collection['product']['eprod_id'] }}">
                 <div class="img">
                  @if($collection["product"]["eprod_detail_image"])
                      <img class="detail" src="{{ $collection["product"]["eprod_detail_image"] }}">
                  @endif
                  <img src="{{ get_collection_first_image($collection) }}">
                 </div>
                 <div class="name">{{ get_collection_first_name($collection) }}</div>
                 <div class="price-left">P {{ get_collection_first_price($collection) }}</div>
                 <div class="price-right">₱ 13,990.00</div>
              </a>
             <div class="hover">
                  <a product-id="{{ $collection['product']['eprod_id'] }}" style="display: block; margin-bottom: 50px;" href="javascript:" class="text quick-add-cart">ADD TO CART</a>
                  <a style="display: block; margin-top: 50px;" href="/product/view/{{ $collection['product']['eprod_id'] }}" class="text">VIEW MORE</a>
              </div>
           </div>
        </div>
        @endforeach
    </div>
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
@endsection

@section('css')
    <link rel="stylesheet" href="resources/assets/frontend/css/home.css">
    
    <link rel="stylesheet" href="/resources/assets/flexslider/css/flexslider.css">
@endsection

@section('script')
    <script type="text/javascript" src="resources/assets/frontend/js/home.js"></script>
    
    <!-- SUBSCRIBER-MODAL -->
    <div class="remodal subscribe" data-remodal-id="subscribe">
        <div class="holder">
            <form method = "POST" id="subform" action="//intogadgets.us10.list-manage.com/subscribe/post?u=cd02508127b42de13d02bb528&id=74973f9e9e">
                <img src="{{ get_content($shop_theme_info, 'info', 'newsletter_popup_cover_image') }}">
                <div class="waterino clearfix">
                  <div class="mobil">Sign up for exclusive promo and sales</div>
                  <div class="input">
                      <input type="text" placeholder="Name" name="FNAME">
                      <input type="text" name="EMAIL" placeholder="Email">
                      <button type="submit">Sign up Now!</button>
                  </div>
                </div>
            </form>
        </div>
    </div>

 @if(Session::has('message'))
    <div class="reservemessage remodal" data-remodal-id="reserve">
        <div class="reserve">
           <div class="logo"><img style="height: 50px;" src="/resources/assets/frontend/img/intogadgets-logo.png"></div>
           <div class="text">Items in your cart was successfully reserved.</div>
           <div class="sub">This reservation is only valid for 24 hours.</br>wait for the confirmation SMS before you go. Thank you!</div>
        </div>
    </div>
 @endif

    <script type="text/javascript" src="resources/assets/flexslider/js/jquery.flexslider-min.js"></script>
@endsection

