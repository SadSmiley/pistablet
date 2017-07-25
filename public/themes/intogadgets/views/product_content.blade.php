@extends('layout')

@section('content')

<div class="product-title container">
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

<div class="remodal" data-remodal-id="full">

<img class="single-product-img" src="" data-zoom-image="" alt = "" id="picturecontainer"/>

</div>
<?php $ctr = 0; ?>
@foreach($product["variant"] as $product_variant)
<div class="single-product-content container {{ $ctr != 0 ? 'hide' : '' }}" variant-id="{{ $product_variant['evariant_id'] }}">
   <div class="single-product-container row">
      <input class="variation" type="hidden" name="variation" value=''>
      <input type="hidden" class="variation_id" name="variation_id" value=''>
      <div class="single-product-holder" style="padding: 0;">
         @foreach($product_variant['image'] as $key => $image)
         <img class="single-product-img 1-1-ratio {{ $key == 0 ? '' : 'hide' }}" key="{{ $key }}" style="width: 100%;" src="{{ $image['image_path'] }}" data-zoom-image="{{ $image['image_path'] }}" alt = "" id="picturecontainer"/>
         @endforeach
         <div class="thumb">
             @foreach($product_variant['image'] as $key => $image)
             <div class="holder" variant-id="{{ $product_variant['evariant_id'] }}" key="{{ $key }}" style="cursor: pointer;"><img class="1-1-ratio" src="{{ $image['image_path'] }}"></div>
             @endforeach
         </div>
      </div>
      <div class="single-product-holder border">
         <div class="single-order-header">{{ $product["eprod_name"] }}</div>
         <div class="single-order-sub">
            Categories: <a href="/product?type={{ $product['eprod_category_id'] }}">{{ $category['type_name'] }}</a>
         </div>
         <div class="divider"></div>
         <div class="single-order-content">
            <div class="single-order-description">
               <div class="title">DESCRIPTION</div>
               <div>{!! $product_variant['evariant_description'] !!}</div>
            </div>
            <div class="divider"></div>
            <div class="single-order-description">
               <div class="title">PACKAGE INCLUSION</div>
            </div>
            <div class="price-container">
              @if($product_variant['discounted'] == "true")
              <div id="single-order-price" class="single-order-price">PHP {{ number_format($product_variant['discounted_price'], 2) }}</div>
              <div id="single-order-price" class="single-order-price" style="text-decoration: line-through;">PHP {{ number_format($product_variant['evariant_price'], 2) }}</div>
              @else
              <div id="single-order-price" class="single-order-price">PHP {{ number_format($product_variant['evariant_price'], 2) }}</div>
              @endif
               <!-- <div id="single-order-price" class="single-order-price">&#8369;&nbsp;{{ number_format($product_variant['evariant_price'], 2) }}</div> -->
               @if($product_variant['item_type_id'] != 2)
                <div class="single-order-availability" style="text-transform: capitalize;">{{ $product_variant['inventory_status'] }}</div>
               @endif
            </div>
            <div class="product-selection">
               <form id="prod-attr-form" method="GET">
                  <input type="text" class="hidden" name="prod_id" value="">
                  <div id="select-variation">
                     @foreach($_variant as $variant)
                     <div class="s-container">
                        <div class="s-label">{{ $variant['option_name'] }}</div>
                        <div class="select">
                           <select class="attribute-variation" variant-label="{{ $variant['option_name'] }}" product-id="{{ $product['eprod_id'] }}" variant-id="{{ $product_variant['evariant_id'] }}" name="attr[{{ $variant['option_name_id'] }}]">
                              <option value="0">Select {{ $variant['option_name'] }}</option>
                              @foreach(explode(",", $variant['variant_value']) as $option)
                              <option value="{{ $option }}">{{ $option }}</option>
                              @endforeach
                           </select>
                        </div>
                     </div>
                     @endforeach
                  </div>
               </form>
            </div>
            <div class="product-selection">
               <input type="text" class="hidden" name="prod_id" value="">
               <div id="select-variation">
                  <div class="s-container">
                     <div class="s-label">
                        Quantity
                     </div>
                     <div class="select">
                        <select class="variation-qty" variant-id="{{ $product_variant['evariant_id'] }}" name="qty">
                           <option>1</option>
                           <option>2</option>
                           <option>3</option>
                           <option>4</option>
                           <option>5</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>
            <!-- <button class="single-order-button " pid="" vid="" mode="cart" onclick="window.open('','_blank')">BUY NOW</button> 
            <button href="product/#order" class="single-order-button order-button add-cart" mode="reservation">STORE PICK-UP</button> -->
            <button type="button" class="single-order-button add-to-cart {{ isset($product['variant'][1]) ? 'disabled' : ($product_variant['item_type_id'] != 2 ? ($product_variant['inventory_status'] == 'out of stock' ? 'disabled' : '') : '') }}" variant-id="{{ $product_variant['evariant_id'] }}" {{ isset($product['variant'][1]) ? 'disabled' : ($product_variant['item_type_id'] != 2 ? ($product_variant['inventory_status'] == 'out of stock' ? 'disabled' : '') : '') }}>ADD TO CART</button>
            @if($wishlist)
              <button type="button" class="single-order-button" onClick="location.href='/wishlist/add/{{ $product["eprod_id"] }}'">ADD TO WISHLIST</button>
            @endif
            <div class="divider" style="margin: 35px 0; opacity: 0;"></div>
            <!-- <div class="single-order-rate" id="single-product-rate">
               @for ($i = 1; $i <= 5; $i++)
               <div class="single-order-star active">
               </div>
               @endfor
            </div>
            <g:plus action="share" annotation="bubble"></g:plus>
            <div style="display: inline-block; vertical-align: middle; margin-left: 5px;">
               <div class="single-order-logo ">
                  <a class="google-share-button" href="https://plus.google.com/share?url={{'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']}}">
                  <i class="fa fa-google-plus"></i>
                  </a>
               </div>
               <div class="single-order-logo">
                  <a href="" class="fb-share-btn" title="facebook share">
                  <i class="fa fa-facebook"></i>
                  </a>
               </div>
               <div class="single-order-logo" >
                  <a class="twitter-share-btn" via="{{Config::get('app.twiiter_acct_name')}}" text="" count="horizontal" hashtag="{{Config::get('app.app_name')}},">
                  <i class="fa fa-twitter"></i>
                  </a>
               </div>
            </div> -->
         </div>
      </div>
      <div class="single-detail clear">
         <div class="single-detail-header">
            <div class="single-detail-tab single-tab active" data-id="single-detail-description">DETAILS</div>
            <div class="single-detail-tab single-tab" data-id="single-detail-review">REVIEWS</div>
         </div>
         <div class="single-detail-content">
            <div class="single-detail-review min-300 hide">
                <?PHP    
                $url = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
                echo "<div class='fb-comments' data-href='$url' data-num-posts='10' data-width='100%'></div>";
                ?>
               <div id="prod-comments-header" style="display: none;">
                  <div class="single-detail-review-comment"></div>
                  <div class="single-detail-review-rate">
                     <div class="single-detail-review-rate-text">Rate this Product</div>
                     <div class="single-order-rate" id="user-single-prod-rate" prod-id = "">
                        <input type="hidden" class="token" name="_token" value="{{{ csrf_token() }}}" />
                        @for ($i = 1; $i <= 5; $i++)
                        <div class="single-order-star active">
                        </div>
                        @endfor
                     </div>
                     <!-- <p><a href="/product//#login">Log-in</a> to rate this product.</p> -->
                  </div>
                  <div class="single-detail-review-comment clear">
                     <div class="review-comment-img"><img src=""></div>
                     <div class="review-comment-input">
                        <textarea placeholder="Enter your message here..."></textarea>
                     </div>
                     <div class="text-right" id="comment_button_container">
                        <button style="display: inline-block;" class="review-comment-button" user-id="" product-id="" >
                        Insert Comment
                        </button>
                        <img id="add_comment_loading" class="loading" src="/resources/assets/img/small-loading.GIF" style="display:none ;">
                        <!-- <div>
                           <p class="text-center" style="margin: 10px 0;"><a href="/product/#login">Log-in</a> to add comment to this product.</p>
                           
                           </div> -->
                     </div>
                  </div>
               </div>
               <div id="product-comment-list" style="display: none;">
                  <div class="single-detail-review-comment comment clear">
                     <div class="review-comment-img" style="display: inline-block;">
                        <img src="">
                     </div>
                     <div class="review-comment-text">
                        <div class="review-comment-name">
                           Username
                        </div>
                        <div class="review-comment-time">
                           Time Ago
                        </div>
                        <div class="review-comment-comment">
                           Comment
                        </div>
                     </div>
                     <div class="comment_button_panel">
                        <input type="hidden" class="token" name="_token" value="{{{ csrf_token() }}}" />
                        <div class="review-comment-xbutton" style="right: 100px;">
                        </div>
                        <div class="review-comment-xbutton" user_id="" comment_id="">
                           <i class="fa fa-trash-o"></i>Delete
                        </div>
                     </div>
                  </div>
                  <!-- <p class="no-comment">
                     no comment
                     
                     </p> -->
               </div>
            </div>
            <div class="single-detail-description min-300">
               <p>  </p>
            </div>
         </div>
      </div>
      <div class="col-md-12 clear">
         <div class="feature-content related-content">
            <div class="related-content-header"><span>RELATED</span> PRODUCTS</div>
            <div class="related-content-sub">You might want to check out other products.</div>
            <div class="container">
               @foreach(limit_foreach($_related, 4) as $related)
               <div class="feature-holder col-md-3 col-sm-6 col-xs-12">
                  <a href="product/">
                     <div class="feature-img">
                        <img class="lazy 4-3-ratio" data-original="{{ get_product_first_image($related) }}" height="222px" width="222px">
                        <div class="feature-hover"></div>
                        <div class="feature-hoverimg">
                  <a href="javascript:"><i class="fa fa-link"></i></a></div>
                  </div>
                  </a>
                  <a href="product/" class="feature-name">{{ get_product_first_name($related) }}</a>
                  <div class="feature-rate"></div>
                  <div class="feature-price">{{ get_product_first_price($related) }}</div>
                  <a class="feature-button quick-view" style="display: none;">QUICK VIEW</a>
               </div>
               @endforeach
            </div>
         </div>
      </div>
   </div>
</div>
<?php $ctr++; ?>
@endforeach

<!-- POPUP -->

<div class="remodal order" data-remodal-id="order">

<a href="#" class="remodal-close"></a>

<div class="col-md-6 left">

    <div class="left-header">We Guarantee Our Service</div>

    <div class="left-sub">24 hours reservation during businesses days</div>

</div>

<div class="col-md-6 right">

    <div class="right-header">TEXT US THE FOLLOWING</div>

    <div class="right-sub">FULL NAME:</div>

    <div class="right-sub">SPECIFIC ITEM:</div>

    <div class="right-sub">(Unit,Item,Color,Quantity,etc.)</div>

    <div class="right-sub">FULL NAME:</div>

    <div class="right-header">SEND TO ANY NUMBER OF THIS</div>

    <div class="right-sub">sun  (0912-345-6789 )</div>

    <div class="right-sub">globe ( 0912-345-6789 )</div>

    <div class="right-sub">smart ( 0912-345-6789 )</div>

    <div class="right-message">

        Wait for the next confirmation before you go to store

    </div>

    <div class="right-header">INFORMATION INCLUDES</div>

    <div class="right-sub">Contact Person,Store Name and Location</div>

</div>

</div>
@endsection

@section('script')

<script>

    $(".single-detail-tab").click(function(e)

    {

        var a = $(this).attr("data-id")

        $(".single-detail-tab").removeClass("active");

    $(e.currentTarget).addClass("active");

    $(".single-detail-description").addClass("hide");

    $(".single-detail-information").addClass("hide");

    $(".single-detail-review").addClass("hide");

    $("." + a).removeClass("hide");

    });

</script>

<script type="text/javascript" src="resources/assets/flexslider/js/shCore.js"></script>

<script type="text/javascript" src="resources/assets/flexslider/js/shBrushXml.js"></script>

<script type="text/javascript" src="resources/assets/flexslider/js/shBrushJScript.js"></script>

<!-- Optional FlexSlider Additions -->

<script src="resources/assets/flexslider/js/jquery.easing.js"></script>

<script src="resources/assets/flexslider/js/jquery.mousewheel.js"></script>

<script type="text/javascript" src="resources/assets/flexslider/js/jquery.flexslider.js"></script>

<script type="text/javascript" src="resources/assets/frontend/js/single_product.js"></script>

<script type="text/javascript" src="resources/assets/frontend/js/zoom.js"></script>

<script type="text/javascript">

    

</script>

@endsection

@section('css')

<link rel="stylesheet" href="resources/assets/frontend/css/single-product.css">

<link rel="stylesheet" type="text/css" href="resources/assets/flexslider/css/flexslider.css">

@endsection

@section('meta')

<meta property="og:url" content="{{'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']}}" />

<meta property="og:type" content="og:product" />

<meta property="og:title" content="" />

<meta property="og:image" content = ""/>

<meta property="og:description" content=""/>

<meta property="product:price:currency"    content="PHP"/>

<meta property="product:price:amount" content="" />

<meta property="fb:app_id" content="1920870814798104" />

@endsection

@section('social-script')

<div id="fb-root"></div>

<script type="text/javascript">



      window.fbAsyncInit = function() {

        FB.init({

          appId      : '995401150483992',

          xfbml      : true,

          version    : 'v2.3'

        });

      };



      (function(d, s, id){

         var js, fjs = d.getElementsByTagName(s)[0];

         if (d.getElementById(id)) {return;}

         js = d.createElement(s); js.id = id;

         js.src = "//connect.facebook.net/en_US/sdk.js";

         fjs.parentNode.insertBefore(js, fjs);

       }(document, 'script', 'facebook-jssdk'));

</script>

@endsection