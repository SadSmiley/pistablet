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
										<div class="item-title"><a href="/product/view/{{ $collection['product']['eprod_id'] }}">{{ $collection['product']['eprod_name'] }}</a></div>
										<div class="item-price">{{ get_collection_first_price($collection) }}</div>
									</div>
									<button type="button" onClick="location.href='/product/view/{{ $collection['product']['eprod_id'] }}'" class="new-add-to-cart-button btn" style="margin-top: 25px;">
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
									<div class="item-title"><a href="/product/view/{{ $collection['product']['eprod_id'] }}">{{ $collection['product']['eprod_name'] }}</a></div>
									<div class="item-price">{{ get_collection_first_price($collection) }}</div>
								</div>
							</div>
						</div>
						@endforeach
					</div>
				</div>
			</div>

			<div class="col-md-9 prod-content">
				<!-- FEATURED TODAY -->
				<span class="prod-big-image"><img id="prod-big-image" src="{{ get_content($shop_theme_info, 'product', 'product_banner', '/themes/'. $shop_theme .'/img/2017-banner.jpg') }}"></span>
					<div class="featured-container">
						<div class="left-container-title">
							<div class="sortby">
								Search Result for: 
								<strong>"{{ Request::input('keyword') }}"</strong>
								<div class="text-left">
						            Item/s Found:
						            <strong>{{ $current_count }}</strong>
						        </div>
							</div>
							<form class="sort-by" method="get">
							<input type="hidden" name="keyword" value="{{ Request::input('keyword') }}">
								<div class="sortby">Sort By: 
									<select name="sort" onChange="$('.sort-by').submit();">
										<!-- <option value="" {{ Request::input('sort') == '' ? 'selected' : '' }}>Relevance</option> -->
										<option value="name_asc" {{ Request::input('sort') == 'name_asc' ? 'selected' : '' }}>Brand: A - Z</option>
										<option value="name_desc" {{ Request::input('sort') == 'name_desc' ? 'selected' : '' }}>Brand: Z - A</option>
										<option value="price_desc" {{ Request::input('sort') == 'price_desc' ? 'selected' : '' }}>Price: Low - High</option>
										<option value="price_asc" {{ Request::input('sort') == 'price_asc' ? 'selected' : '' }}>Price: High - Low</option>
										<option value="newest" {{ Request::input('sort') == 'newest' ? 'selected' : '' }}>Newest</option>
									</select>
								</div>
							</form>
							<!-- PAGINATION -->
							<div class="pagination-top">
								{!! $_product->appends(Request::input())->render() !!}
							</div>
						</div>
							<div class="featured-item-container row clearfix">	

								@if($_product->count() <= 0)
									<strong>We were unable to find results for "{{ $_GET['keyword'] }}"</strong>
								@else
									@foreach($_product as $product)
									<div class="col-md-3 match-height">
										<div class="per-item-container">
											<div class="image-content-1">
												<div class="item-image-large" style="background-image: url({{ get_product_first_image($product) }})"></div>
												<button type="button" onClick="location.href='/product/view/{{ $product['eprod_id'] }}'" class="new-add-to-cart-button btn" >
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
												<div class="item-title"><a href="/product/view/{{ $product['eprod_id'] }}">{{ $product['eprod_name'] }}</a></div>
												<!-- <div class="rating">
													<img src="/themes/{{ $shop_theme }}/img/star-active.png">
													<img src="/themes/{{ $shop_theme }}/img/star-active.png">
													<img src="/themes/{{ $shop_theme }}/img/star-active.png">
													<img src="/themes/{{ $shop_theme }}/img/star-active.png">
													<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
												</div> -->
												<div class="item-price">&#8369; {{ $product['min_price'] == $product['max_price'] ? number_format($product['max_price'], 2) : number_format($product['min_price'], 2) . ' - ' . number_format($product['max_price'], 2) }}</div>
											</div>
											@if(count($product['variant'][0]['mlm_discount']) > 0)
				                            <div style="margin-top: 15px;">
				                                <table class="table table-bordered table-striped table-hover table-condensed" style="font-size: 12px;">
				                                    <thead>
				                                        <tr>
				                                            <th>Membership</th>
				                                            <th>Price</th>
				                                        </tr>
				                                    </thead>
				                                    <tbody>
				                                        @foreach($product['variant'][0]['mlm_discount'] as $key => $mlm_discount)
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
								@endif

							</div>

							<div class="pagination-bottom text-right">
								{!! $_product->appends(Request::input())->render() !!}
							</div>
					</div>
				</div>
			</div>


		
			
			

		</div>
	</div>	
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/product.css">
@endsection
