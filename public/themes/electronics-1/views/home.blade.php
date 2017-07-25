@extends("layout")
@section("content")
<div class="banner-image">
	<img src="{{ get_content($shop_theme_info, "home", "home_banner", "/themes/". $shop_theme ."/img/front-banner.png") }}">
	<button id="shop-now-button">SHOP NOW</button>
</div>


<div class="featured">
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-12">
				<div class="featured-content-container">
					<div class="container-title"><i class="fa fa-star-o" aria-hidden="true"></i><span class="title">{{ get_content($shop_theme_info, "home", "home_category_title", "FEATURED") }}</span><span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span></div>
				</div>
				<div class="content-container">
					<div class="row clearfix">
						<div class="col-md-4 left-container">
							<a href="">
								<div class="asus-cellphone">
									<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/asus-cellphone.png">
									<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/asus-cellphone.png">
								</div>
								<div class="item-content">
									<div class="item-title">Lorem ipsum dolor sit amet consectetuer</div>
									<div class="item-rating">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
										<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
									</div>
									<div class="item-price">PHP 5,000.000</div>
								</div>
							</a>
						</div>

						<div class="col-md-8 right-container">
							<div class="col-md-6 product-holder">
								<a href="">
									<div class="per-item-container clearfix">
										<div class="col-md-6 product-image">
											<div class="image-holder">
												<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/featured-content-img1.png">
												<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/featured-content-img1.png">
											</div>
										</div>
										<div class="col-md-6 product-content">
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
									</div>
								</a>
							</div>
							<div class="col-md-6 product-holder">
								<a href="">
									<div class="per-item-container clearfix">
										<div class="col-md-6 product-image">
											<div class="image-holder">
												<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/featured-content-img2.png">
												<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/featured-content-img2.png">
											</div>
										</div>
										<div class="col-md-6 product-content">
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
									</div>
								</a>
							</div>
							<div class="col-md-6 product-holder">
								<a href="">
									<div class="per-item-container clearfix">
										<div class="col-md-6 product-image">
											<div class="image-holder">
												<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/featured-content-img3.png">
												<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/featured-content-img3.png">
											</div>
										</div>
										<div class="col-md-6 product-content">
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
									</div>
								</a>
							</div>
							<div class="col-md-6 product-holder">
								<a href="">
									<div class="per-item-container clearfix">
										<div class="col-md-6 product-image">
											<div class="image-holder">
												<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/featured-content-img4.png">
												<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/featured-content-img4.png">
											</div>
										</div>
										<div class="col-md-6 product-content">
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
									</div>
								</a>
							</div>
							<div class="col-md-6 product-holder">
								<a href="">
									<div class="per-item-container clearfix">
										<div class="col-md-6 product-image">
											<div class="image-holder">
												<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/featured-content-img5.png">
												<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/featured-content-img5.png">
											</div>
										</div>
										<div class="col-md-6 product-content">
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
									</div>
								</a>
							</div>
							<div class="col-md-6 product-holder">
								<a href="">
									<div class="per-item-container clearfix">
										<div class="col-md-6 product-image">
											<div class="image-holder">
												<img class="item-image first-image" src="/themes/{{ $shop_theme }}/img/featured-content-img6.png">
												<img class="item-image second-image" src="/themes/{{ $shop_theme }}/img/featured-content-img6.png">
											</div>
										</div>
										<div class="col-md-6 product-content">
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
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="container">
	<div class="row clearfix">
		<div class="col-md-4">
			<div class="most-viewed">
				<div class="featured-content-container">
					<div class="container-title"><i class="fa fa-star-o" aria-hidden="true"></i><span class="title">{{ get_content($shop_theme_info, "home", "home_mostviewed_title", "MOST VIEWED") }}</span></div>
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
			<div class="news-letter">
				<div class="featured-content-container">
					<div class="container-title"><i class="fa fa-envelope-o" aria-hidden="true"></i><span class="title">NEWSLETTER</span></div>
				</div>
				<div class="news-letter-content">
					<div class="title">Sign Up For our Newsletter!</div>
					<div class="input"><input type="" name=""></div>
					<div><button>Subscribe</button></div>
				</div>
			</div>
		</div>
	

		<div class="col-md-8">
			<div class="new-releases">
				<div class="featured-content-container">
					<div class="container-title"><i class="fa fa-tag" aria-hidden="true"></i><span class="title">{{ get_content($shop_theme_info, "home", "home_newreleases_title", "NEW RELEASES") }}</span>
					<span>
                        <select>
                            <option>All</option>
                        </select>
                     </span>
                     <span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span></div>
				</div>
				
				<div class="new-releases-content">
				<div class="row clearfix">
					<div class="col-md-12 products-container">
						<div class="col-md-3 product-holder">
							<a href="">
								<div class="per-item-container">
									<div class="image-holder">
										<img src="/themes/{{ $shop_theme }}/img/prod-content-image1.png">
									</div>
									<div class="item-details">
										<div class="item-title">Lorem ipsum dolor sit</div>
										<div class="rating">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
										</div>
										<div class="item-price">PHP 5,000.00</div>
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

						<div class="col-md-3 product-holder">
							<a href="">
								<div class="per-item-container">
									<div class="image-holder">
										<img src="/themes/{{ $shop_theme }}/img/prod-content-image2.png">
									</div>
									<div class="item-details">
										<div class="item-title">Lorem ipsum dolor sit</div>
										<div class="rating">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
										</div>
										<div class="item-price">PHP 5,000.00</div>
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

						<div class="col-md-3 product-holder">
							<a href="">
								<div class="per-item-container">
									<div class="image-holder">
										<img src="/themes/{{ $shop_theme }}/img/prod-content-image3.png">
									</div>
									<div class="item-details">
										<div class="item-title">Lorem ipsum dolor sit</div>
										<div class="rating">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
										</div>
										<div class="item-price">PHP 5,000.00</div>
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

						<div class="col-md-3 product-holder">
							<a href="">
								<div class="per-item-container">
									<div class="image-holder">
										<img src="/themes/{{ $shop_theme }}/img/prod-content-image4.png">
									</div>
									<div class="item-details">
										<div class="item-title">Lorem ipsum dolor sit</div>
										<div class="rating">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-colored.png">
											<img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
										</div>
										<div class="item-price">PHP 5,000.00</div>
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

						
					</div>	
				</div>
				
			</div>
			<div class="banner-holder">
				<div class="row clearfix">
					<div class="col-md-6"><img src="{{ get_content($shop_theme_info, "home", "home_small_banner_1", "/themes/". $shop_theme ."/img/content-banner1.png") }}"></div>
					<div class="col-md-6"><img src="{{ get_content($shop_theme_info, "home", "home_small_banner_2", "/themes/". $shop_theme ."/img/content-banner2.png") }}"></div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
				



@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/home.css">
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/slick/slick.css">
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/slick/slick-theme.css">
@endsection

@section("js")
<script type="text/javascript" src="/themes/{{ $shop_theme }}/assets/slick/slick.min.js"></script>
<script type="text/javascript">
$(document).ready(function()
{
	$('.multiple-item').slick({
	  infinite: true,
	  slidesToShow: 4,
	  slidesToScroll: 1
	});

	$('.add-slider .add-top').slick({
	  lazyLoad: 'ondemand',
	  prevArrow:"<img class='a-left control-c prev slick-prev' src='/themes/{{ $shop_theme }}/img/arrow-left.png'>",
      nextArrow:"<img class='a-right control-c next slick-next' src='/themes/{{ $shop_theme }}/img/arrow-right.png'>"
	});

});
</script>
@endsection