@extends("layout")

@section("content")

<div class="container">
	<div class="row clearfix">
		<div class="col-md-4 left-content">
			<div class="categories">
				<div class="categories-title"><i class="fa fa-bars" aria-hidden="true"></i><span class="title">{{ get_content($shop_theme_info, "shop", "shop_menu_tab_title", "CATEGORIES") }}</span></div>
				<div class="categories-content">
					<div class="list"><a href="">{{ get_content($shop_theme_info, "shop", "shop_menu_list_1", "DESKTOP & PC PARTS") }}</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
					<div class="list"><a href="">{{ get_content($shop_theme_info, "shop", "shop_menu_list_2", "LAPTOP & TABLET") }}</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
					<div class="list"><a href="">{{ get_content($shop_theme_info, "shop", "shop_menu_list_3", "SMART PHONE") }}</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
					<div class="list"><a href="">{{ get_content($shop_theme_info, "shop", "shop_menu_list_4", "CAMERA") }}</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
					<div class="list"><a href="">{{ get_content($shop_theme_info, "shop", "shop_menu_list_5", "HEADPHONE & SPEAKER") }}</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
					<div class="list"><a href="">{{ get_content($shop_theme_info, "shop", "shop_menu_list_6", "TV & COMPONENTS") }}</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
				</div>
			</div>

			<div class="filter-by-price">
				<div class="filter-title"><img src="/themes/{{ $shop_theme }}/img/filter-icon.png"><span class="title">FILTER BY PRICE</span></div>
				<div class="filter-content">
					<div class="bottom"><button>Filter</button><span id="price-word">price:</span><span id="amount"> P0.00 - P1000.00</span></div>
				</div>
			</div>

			<div class="most-viewed">
				<div class="featured-content-container">
					<div class="container-title"><i class="fa fa-star-o" aria-hidden="true"></i><span class="title">{{ get_content($shop_theme_info, "shop", "shop_mostviewed_title", "MOST VIEWED") }}</span></div>
				</div>
				<div class="most-viewed-content">
					<div class="product-holder row clearfix">
						<a href="">
							<div class="col-md-5 product-image">
								<div class="image-holder">
									<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img1.png">
									<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img1.png">
								</div>
							</div>
							<div class="col-md-7 product-content">
								<div class="product-details">
									<div class="item-name">Lorem ipsum dolor sit</div>
									<div class="item-rating">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</a>
					</div>
					<div class="product-holder row clearfix">
						<a href="">
							<div class="col-md-5 product-image">
								<div class="image-holder">
									<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img2.png">
									<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img2.png">
								</div>
							</div>
							<div class="col-md-7 product-content">
								<div class="product-details">
									<div class="item-name">Lorem ipsum dolor sit</div>
									<div class="item-rating">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</a>
					</div>
					<div class="product-holder row clearfix">
						<a href="">
							<div class="col-md-5 product-image">
								<div class="image-holder">
									<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img3.png">
									<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img3.png">
								</div>
							</div>
							<div class="col-md-7 product-content">
								<div class="product-details">
									<div class="item-name">Lorem ipsum dolor sit</div>
									<div class="item-rating">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</a>
					</div>
					<div class="product-holder row clearfix">
						<a href="">
							<div class="col-md-5 product-image">
								<div class="image-holder">
									<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img4.png">
									<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/most-viewed-img4.png">
								</div>
							</div>
							<div class="col-md-7 product-content">
								<div class="product-details">
									<div class="item-name">Lorem ipsum dolor sit</div>
									<div class="item-rating">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-8 right-content">
			<div class="banner-holder">
				<img src="{{ get_content($shop_theme_info, "shop", "shop_banner", "/themes/". $shop_theme ."/img/productpage-banner.png") }}">
				<button>SHOP NOW</button>
			</div>

			<div class="prod-content">
				<div class="top-title">
					<div class="sortby">Sort By: 
						<select>
							<option></option>
							<option>Low-High</option>
							<option>High-Low</option>
						</select>
					</div>
					<span class="pagination-top">
						<ul class="pagination">
							<li><a class="pagination-link" href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a></li>
							<li><a class="pagination-link pagination-link-number" href="#">1</a></li>
							<li><a class="pagination-link pagination-link-number" href="#">2</a></li>
							<li><a class="pagination-link pagination-link-number" href="#">3</a></li>
							<li><a class="pagination-link pagination-link-number" href="#">4</a></li>
							<li><a class="pagination-link" href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></li>
						</ul>
					</span>	
				</div>

				<div class="row clearfix">
				<div class="col-md-12 products-container">
					@foreach($_product as $product)
					<div class="col-md-3 product-holder">
						<a href="">
							<div class="per-item-container">
								<div class="image-holder">
									<img class="item-image-large first-image" src="{{ get_product_first_image($product) }}">
								</div>
								<div class="item-details">
									<div class="item-title">{{ get_product_first_name($product) }}</div>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
									</div>
									<div class="item-price">{{ get_product_first_price($product) }}</div>
								</div>
								<div class="icons">
									<a class="tooltips" href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i><span>Add to cart</span></a>
									<a class="tooltips" href=""><i class="fa fa-heart" aria-hidden="true"></i><span>Add to Favorite</span></a>
									<a class="tooltips" href=""><i class="fa fa-search" aria-hidden="true"></i><span>Search</span></a>
									<a class="tooltips" href=""><i class="fa fa-camera" aria-hidden="true"></i><span>See Pictures</span></a>
								</div>
							</div>
						</a>
					</div>
					@endforeach
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
