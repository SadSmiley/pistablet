@extends("layout")
@section("content")
<div class="content">
	<div class="container">
	<!-- TOP CONTENT -->
		<div class="row clearfix">
			<div class="col-md-3">
				<div class="left-bar-categories">
					<div class="left-bar-title">
						<img src="/themes/{{ $shop_theme }}/img/menu.png">
						<span>CATEGORIES</span>
					</div>
					@if(isset($_categories))
						@foreach($_categories as $category)
						<div class="button-shop">
							<div class="text">
								<!-- <img src="/themes/{{ $shop_theme }}/img/electronics.png"> -->
								{{ $category['type_name'] }}
							</div>
							@if($category['subcategory'])
							<div class="hover">
								<div class="hover-holder">
									<div class="row clearfix">
										<ul class="col-md-12">
											@foreach($category['subcategory'] as $subcategory)
											<li><a href="/product?type={{ $subcategory['type_id'] }}">{{ $subcategory['type_name'] }}</a></li>
												@foreach($subcategory['subcategory'] as $subcategory1)
												<li><a href="/product?type={{ $subcategory1['type_id'] }}">{{ $subcategory1['type_name'] }}></a></li>
													@foreach($subcategory1['subcategory'] as $subcategory2)
													<li><a href="/product?type={{ $subcategory2['type_id'] }}">{{ $subcategory2['type_name'] }}></a></li>
													@endforeach
												@endforeach
											@endforeach
										</ul>
									</div>
									<div class="banner-holder">
										<img src="/themes/{{ $shop_theme }}/img/big-discount.jpg">
									</div>
								</div>
							</div>
							@endif
						</div>
						@endforeach
					@endif
				</div>
			</div>
			<div class="col-md-9">
				<div class="add-slider">
					<div class="add-top">
						@if(is_serialized(get_content($shop_theme_info, "home", "home_slider")))
							@foreach(unserialize(get_content($shop_theme_info, "home", "home_slider")) as $slider)
							<div>
								<div class="slider-holder">
									<img class="home_adds1" src="{{ $slider }}">
								</div>
							</div>
							@endforeach
						@else
							<div>
								<div>
									<img class="home_adds1" data-lazy="/themes/{{ $shop_theme }}/img/home_adds1.jpg">
								</div>
							</div>
						@endif
					</div>
					<div class="adds-bottom">
					<div class="clearfix row">
						<div class="col-md-4">
							<div class="top-text">{{ get_content($shop_theme_info, "home", "home_intro_title_1", "MONEY BACK") }}</div>
							<div class="bottom-text">{{ get_content($shop_theme_info, "home", "home_intro_sub_1", "15 Days Money Back Guarantee") }}</div>
						</div>
						<div class="col-md-4">
							<div class="top-text">{{ get_content($shop_theme_info, "home", "home_intro_title_2", "FREE SHIPPING") }}</div>
							<div class="bottom-text">{{ get_content($shop_theme_info, "home", "home_intro_sub_2", "Shipping on orders over PHP 1000.00") }}</div>
						</div>
						<div class="col-md-4">
							<div class="top-text">{{ get_content($shop_theme_info, "home", "home_intro_title_3", "SPECIAL DISCOUNT") }}</div>
							<div class="bottom-text">{{ get_content($shop_theme_info, "home", "home_intro_sub_3", "Extra 5% off on all items") }}</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
		<!-- BOTTOM CONTENT -->
		<div class="row clearfix">
			<div class="col-md-3">
				<div class="hot-deals-container">
					<div class="left-container-title">
						<span>DAILY HOT DEALS</span>
						<span class="scroll-button"><a class="left" href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a class="right" href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span>
					</div>
					<div class="daily-container">
						@foreach(get_collection(get_content($shop_theme_info, "home", "daily_hot_deals"), $shop_id) as $collection)
							<div class="holder">
								<div class="hot-deals-item-container">
									<img class="4-3-ratio" src="{{ get_collection_first_image($collection) }}">
									<div class="item-details">
										<a href="/product/view/{{ $collection['product']['eprod_id'] }}"><div class="item-title">{{ get_collection_first_name($collection) }}</div></a>
										<div class="item-price">{{ get_collection_first_price($collection) }}</div>
									</div>
									<button type="button" onCLick="location.href='/product/view/{{ $collection['product']['eprod_id'] }}'" class="new-add-to-cart-button btn" style="margin-top: 25px;">
										<table>
											<tbody>
												<tr>
													<td class="icon"><i class="fa fa-shopping-cart" aria-hidden="true"></i></td>
													<td class="text">View More</td>
												</tr>
											</tbody>
										</table>
									</button>
								</div>
							</div>
						@endforeach
					</div>
				</div>
				<div class="hot-deals-container">
					<center>
						<ins class="bookingaff" data-aid="1292959" data-target_aid="1292802" data-prod="banner" data-width="200" data-height="200" data-banner_id="48509">
						    <!-- Anything inside will go away once widget is loaded. -->
						    <a href="//www.booking.com?aid=1292802">Booking.com</a>
						</ins>
					</center>
					<script type="text/javascript">
					    (function(d, sc, u) {
					      var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0];
					      s.type = 'text/javascript';
					      s.async = true;
					      s.src = u + '?v=' + (+new Date());
					      p.parentNode.insertBefore(s,p);
					      })(document, 'script', '//aff.bstatic.com/static/affiliate_base/js/flexiproduct.js');
					</script>

				</div>
				<div class="special-offers-container">
					<div class="left-container-title">
						<span>SPECIAL OFFERS</span>
					</div>
					<div class="item-container">
						@foreach(get_collection(get_content($shop_theme_info, "home", "special_offers"), $shop_id) as $collection)
						<div class="row-no-padding clearfix per-item">
							<div class="col-xs-4"><img class="item-img 4-3-ratio" src="{{ get_collection_first_image($collection) }}"></div>
							<div class="col-xs-8">
								<div class=" item-details-container">
									<a href="/product/view/{{ $collection['product']['eprod_id'] }}"><div class="item-title">{{ $collection['product']['eprod_name'] }}</div></a>
									<div class="item-price">{{ get_collection_first_price($collection) }}</div>
								</div>
							</div>
						</div>
						@endforeach
					</div>
				</div>
			</div>
			
			<div class="col-md-9">
			<!-- FEATURED TODAY -->
				<div class="featured-container">
					<div class="left-container-title">FEATURED TODAY</div>
					<div class="featured-item-container row clearfix">	
						@foreach(get_collection(get_content($shop_theme_info, "home", "featured_today"), $shop_id) as $collection)
						<div class="col-md-3">
							<div class="per-item-container">
								<div class="image-content-1">
									<img class="item-image-large 4-3-ratio" src="{{ get_collection_first_image($collection) }}">
									<button type="button" onCLick="location.href='/product/view/{{ $collection['product']['eprod_id'] }}'" class="new-add-to-cart-button btn">
										<table>
											<tbody>
												<tr>
													<td class="icon"><i class="fa fa-shopping-cart" aria-hidden="true"></i></td>
													<td class="text">View More</td>
												</tr>
											</tbody>
										</table>
									</button>
								</div>
								<div class="item-details">
									<a href="/product/view/{{ $collection['product']['eprod_id'] }}"><div class="item-title">{{ $collection['product']['eprod_name'] }}</div></a>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
									</div>
									<div class="item-price">{{ get_collection_first_price($collection) }}</div>
								</div>
								@if(count($collection['product']['variant'][0]['mlm_discount']) > 0)
	                            <div style="margin-top: 15px;">
	                                <table class="table table-bordered table-striped table-hover table-condensed" style="font-size: 10px;">
	                                    <thead>
	                                        <tr>
	                                            <th>Membership</th>
	                                            <th>Price</th>
	                                        </tr>
	                                    </thead>
	                                    <tbody>
	                                        @foreach($collection['product']['variant'][0]['mlm_discount'] as $key => $mlm_discount)
	                                        <tr>
	                                            <td>{{ $mlm_discount['discount_name'] }}</td>   
	                                            <td>PHP. {{ number_format($mlm_discount['discounted_amount'], 2) }}</td>
	                                        </tr>
	                                        @endforeach
	                                    </tbody>
	                                </table>
	                            </div>
	                            @endif
							</div>
						</div>
						@endforeach
					</div>
				</div>
				<div class="best-seller-container">
					<div class="left-container-title">BEST SELLER</div>
					<div class="best-item-container row clearfix">	
						@foreach(get_collection(get_content($shop_theme_info, "home", "best_seller"), $shop_id) as $collection)
						<div class="col-md-4">
							<div class="per-item-container">
								<div class="row clearfix">
									<div class="col-md-6 col-sm-12">
										<a href="#"><img class="item-image-small 4-3-ratio" style="width: 100%;" src="{{ get_collection_first_image($collection) }}"></a>
									</div>
									<div class="col-md-6 col-sm-12">
										<div class="item-details" style="padding-top: 0;">
											<a href="/product/view/{{ $collection['product']['eprod_id'] }}"><div class="item-title">{{ $collection['product']['eprod_name'] }}</div></a>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
											</div>
											<div class="item-price">{{ get_collection_first_price($collection) }}</div>
										</div>
									</div>
									<div class="col-md-12">
										@if(count($collection['product']['variant'][0]['mlm_discount']) > 0)
			                            <div style="margin-top: 15px;">
			                                <table class="table table-bordered table-striped table-hover table-condensed" style="font-size: 12px;">
			                                    <thead>
			                                        <tr>
			                                            <th>Membership</th>
			                                            <th>Price</th>
			                                        </tr>
			                                    </thead>
			                                    <tbody>
			                                        @foreach($collection['product']['variant'][0]['mlm_discount'] as $key => $mlm_discount)
			                                        <tr>
			                                            <td>{{ $mlm_discount['discount_name'] }}</td>   
			                                            <td>PHP. {{ number_format($mlm_discount['discounted_amount'], 2) }}</td>
			                                        </tr>
			                                        @endforeach
			                                    </tbody>
			                                </table>
			                            </div>
			                            @endif
									</div>
								</div>
							</div>
						</div>
						@endforeach
					</div>
				</div>
				<div class="row clearfix">
					<div class="col-md-6">
						<div class="home-big-image">
							@if($shop_theme_info->home->home_ads_1->default)
							<img class="match-height" style="object-fit: cover;" src="{{ $shop_theme_info->home->home_ads_1->default }}">
							@else
							<img src="/themes/{{ $shop_theme }}/img/layer1.jpg">
							@endif
						</div>
					</div>
					<div class="col-md-6">
						<div class="home-big-image">
							@if($shop_theme_info->home->home_ads_2->default)
							<img class="match-height" style="object-fit: cover;" src="{{ $shop_theme_info->home->home_ads_2->default }}">
							@else
							<img src="/themes/{{ $shop_theme }}/img/layer2.jpg">
							@endif
						</div>
					</div>
				</div>
				<div class="featured-container">
					<div class="left-container-title new-arrivals">NEW ARRIVALS</div>
					<div class="featured-item-container row clearfix">	
						@foreach(get_collection(get_content($shop_theme_info, "home", "new_arrivals"), $shop_id) as $collection)
						<div class="col-md-3 col-sm-6">
							<div class="per-item-container">
								<img class="item-image-large 4-3-ratio" src="{{ get_collection_first_image($collection) }}">
								<div class="item-details">
									<a href="/product/view/{{ $collection['product']['eprod_id'] }}"><div class="item-title">{{ $collection['product']['eprod_name'] }}</div></a>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
									</div>
									<div class="item-price">{{ get_collection_first_price($collection) }}</div>
								</div>
							</div>
						</div>
						@endforeach
					</div>
				</div>
				<div class="brand-container">
					<div>
						<div id="brand-title">OUR BRANDS :</div>
						<div id="brand-logo" class="multiple-item">
						@if(is_serialized(get_content($shop_theme_info, "home", "home_brand")))
							@foreach(unserialize(get_content($shop_theme_info, "home", "home_brand")) as $brand)
							<div>
								<img class="item-image-small brand-image" src="{{ $brand }}">
							</div>
							@endforeach
						@else
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand1.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand2.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand3.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand4.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand1.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand2.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand3.png">
						</div>
						<div>
							<img class="item-image-small brand-image" src="/themes/{{ $shop_theme }}/img/brand4.png">
						</div>
						@endif
						</div>
					</div>
				</div>
			</div>
			

			<div class="col-md-9">
			<!-- BEST SELLER -->
				
			</div>
		</div>
	</div>	
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/home.css">
<style type="text/css">
.slick-initialized .slick-slide {
    float: none;
    display: inline-block;
    vertical-align: middle;
}
</style>
@endsection

@section("js")
<script type="text/javascript">
$(document).ready(function()
{
	$('.multiple-item').slick({
	  infinite: true,
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  autoplay: true,
  	  autoplaySpeed: 2000,
	});

	$('.add-slider .add-top').slick({
	  lazyLoad: 'ondemand',
	  prevArrow:"<img class='a-left control-c prev slick-prev' src='/themes/{{ $shop_theme }}/img/arrow-left.png'>",
      nextArrow:"<img class='a-right control-c next slick-next' src='/themes/{{ $shop_theme }}/img/arrow-right.png'>",
      autoplay: true,
  	  autoplaySpeed: 2000,
	});
});
</script>
@endsection