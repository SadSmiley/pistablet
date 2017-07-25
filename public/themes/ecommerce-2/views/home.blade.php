@extends("layout")

@section("content")
<div class="content">
	<div class="container">
	<!-- TOP CONTENT -->
		<div class="row clearfix">
			<div class="col-md-12">
				<div class="add-slider">
					<div class="add-top">
						<div class="img-holder">
						<img class="home_ads1" src="/themes/{{ $shop_theme }}/img/big-image.png">
						<button>SHOP NOW</button>
						<div class="bottom-content">
							<div class="col-md-4">
								<table>
									<tr>
										<td><i class="icon-wallet"></i></td>
										<td>
											<div class="title">MONEY BACK</div>
											<div class="sub-title">15 Days Money Back Guarantee</div>
										</td>
									</tr>
								</table>
							</div>
							<div class="col-md-4">
								<table>
									<tr>
										<td><i class="icon-truck"></td>
										<td>
											<div class="title">FREE SHIPPING</div>
											<div class="sub-title">Shipping on orders over PHP 1000.00</div>
										</td>
									</tr>
								</table>
							</div>
							<div class="col-md-4">
								<table>
									<tr>
										<td><i class="icon-tag"></td>
										<td>
											<div class="title">SPECIAL DISCOUNTS</div>
											<div class="sub-title">Extra 5% off on all items</div>
										</td>
									</tr>
								</table>
							</div>
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
						<span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span>
					</div>
					<div class="hot-deals-item-container">
						<div class="per-content-hover">
							<div class="image-content-1">
								<img src="/themes/{{ $shop_theme }}/img/hot-deals1.jpg">
							</div>
							<div class="item-details">
								<div class="item-title">Hot Deals Item Name</div>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
									</div>
								<div class="item-price">PHP 5,000.00</div>
							</div>
						</div>
						<div class="add-to-cart-button-container row clearfix">
							<div class="add-to-cart-button">
								<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
								<button class="col-xs-8 button-icon">Add to cart</button>
							</div>
						</div>
					</div>
				</div>

				<!-- SPECIAL OFFER -->
				<div class="special-offers-container">
					<div class="left-container-title">
						<span>SPECIAL OFFERS</span>
						<span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span>
					</div>
					<div class="item-container">
					<!-- PER ITEM -->
						<div class="row-no-padding clearfix per-item">
							<div class="col-xs-4">
								<div class="image-holder">
									<img class="item-img first-image" src="/themes/{{ $shop_theme }}/img/best-image4.png">
									<img class="item-img second-image" src="/themes/{{ $shop_theme }}/img/best-image4.png">
								</div>
							</div>
							<div class="col-xs-8">
								<div class=" item-details-container">
									<div class="item-title">Item Name 1</div>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</div>
						<div class="row-no-padding clearfix per-item">
							<div class="col-xs-4">
								<div class="image-holder">
									<img class="item-img first-image" src="/themes/{{ $shop_theme }}/img/best-image5.png">
									<img class="item-img second-image" src="/themes/{{ $shop_theme }}/img/best-image5.png">
								</div>
							</div>
							<div class="col-xs-8">
								<div class=" item-details-container">
									<div class="item-title">Item Name 2</div>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</div>
						<div class="row-no-padding clearfix per-item">
							<div class="col-xs-4">
								<div class="image-holder">
									<img class="item-img first-image" src="/themes/{{ $shop_theme }}/img/best-image6.png">
									<img class="item-img second-image" src="/themes/{{ $shop_theme }}/img/best-image6.png">
								</div>
							</div>
							<div class="col-xs-8">
								<div class=" item-details-container">
									<div class="item-title">Item Name 3</div>
									<div class="rating">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-active.png">
										<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
									</div>
									<div class="item-price">PHP 5,000.00</div>
								</div>
							</div>
						</div>

					</div>
				</div>


				<!-- NEWSLETTER -->
				<div class="newsletter-container">
					<div class="left-container-title">
						<span>NEWSLETTERS</span>			
					</div>
					<div class="item-container">Sign Up For Our Newsletter!
					</div>
					<div class="item-container">
						<input class="text-area" type="email" name="" class="form-control">
					</div>
					<div class="item-container">
						<button class="button-a">Subscribe</button>
					</div>

				</div>
			</div>
			
			<div class="col-md-9">
			<!-- FEATURED TODAY -->
				<div class="featured-container">
					<div class="left-container-title"><i class="fa fa-star" aria-hidden="true"></i><span class="title">FEATURED TODAY</span><span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span></div>
					<div class="featured-item-container row clearfix">	
						<!-- ITEMS -->
							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image1.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
											<div class="add-to-cart-button">
												<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
												<button class="col-xs-8 button-icon">Add to cart</button>
											</div>
									</div>
								</div>
							</div>

							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image2.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 2 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
											<div class="add-to-cart-button">
												<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
												<button class="col-xs-8 button-icon">Add to cart</button>
											</div>
									</div>
								</div>
							</div>

							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image3.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 3 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
											<div class="add-to-cart-button">
												<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
												<button class="col-xs-8 button-icon">Add to cart</button>
											</div>
									</div>
								</div>
							</div>

							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image4.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 4 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
											<div class="add-to-cart-button">
												<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
												<button class="col-xs-8 button-icon">Add to cart</button>
											</div>
									</div>
								</div>
							</div>
					</div>
				</div>
			</div>
			

			<div class="col-md-9">
			<!-- BEST SELLER -->
				<div class="best-seller-container">
					<div class="left-container-title"><i class="fa fa-star" aria-hidden="true"></i><span class="title">BEST SELLER</span><span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span>
					</div>
					
					<!-- ITEMS -->
					<div class="best-item-container">
						<div class="best-item-upper row-no-padding clearfix">	
							<div class="col-md-4">
								<div class="per-item-container row-no-padding clearfix">
									<div class="col-xs-4">
										<div class="image-holder">
											<img class="item-image-small first-image" src="/themes/{{ $shop_theme }}/img/best-image1.png">
											<img class="item-image-small second-image" src="/themes/{{ $shop_theme }}/img/best-image1.png">
										</div>
									</div>
									<div class="col-xs-8">
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
								</div>
							</div>
							
							<div class="col-md-4">
								<div class="per-item-container row-no-padding clearfix">
									<div class="col-xs-4">
										<div class="image-holder">
											<img class="item-image-small first-image" src="/themes/{{ $shop_theme }}/img/best-image2.png">
											<img class="item-image-small second-image" src="/themes/{{ $shop_theme }}/img/best-image2.png">
										</div>
									</div>
									<div class="col-xs-8">
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="per-item-container row-no-padding clearfix">
									<div class="col-xs-4">
										<div class="image-holder">
											<img class="item-image-small first-image" src="/themes/{{ $shop_theme }}/img/best-image3.png">
											<img class="item-image-small second-image" src="/themes/{{ $shop_theme }}/img/best-image3.png">
										</div>
									</div>
									<div class="col-xs-8">
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="best-item-lower row-no-padding clearfix">
							<div class="col-md-4">
								<div class="per-item-container row-no-padding clearfix">
									<div class="col-xs-4">
										<div class="image-holder">
											<img class="item-image-small first-image" src="/themes/{{ $shop_theme }}/img/best-image4.png">
											<img class="item-image-small second-image" src="/themes/{{ $shop_theme }}/img/best-image4.png">
										</div>
									</div>
									<div class="col-xs-8">
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="per-item-container row-no-padding clearfix">
									<div class="col-xs-4">
										<div class="image-holder">
											<img class="item-image-small first-image" src="/themes/{{ $shop_theme }}/img/best-image5.png">
											<img class="item-image-small second-image" src="/themes/{{ $shop_theme }}/img/best-image5.png">
										</div>
									</div>
									<div class="col-xs-8">
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-4">
								<div class="per-item-container row-no-padding clearfix">
									<div class="col-xs-4">
										<div class="image-holder">
											<img class="item-image-small first-image" src="/themes/{{ $shop_theme }}/img/best-image6.png">
											<img class="item-image-small second-image" src="/themes/{{ $shop_theme }}/img/best-image6.png">
										</div>
									</div>
									<div class="col-xs-8">
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row clearfix">
					<div class="col-md-6">
						<div class="home-big-image"><img src="/themes/{{ $shop_theme }}/img/layer1.jpg"></div>
					</div>
					<div class="col-md-6">
						<div class="home-big-image"><img src="/themes/{{ $shop_theme }}/img/layer2.jpg"></div>
					</div>
				</div>
				

				<!-- NEW ARRIVALS -->
					
				<div class="featured-container">
					<div class="left-container-title"><i class="fa fa-star" aria-hidden="true"></i><span class="title">NEW ARRIVALS</span><span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span></div>

					<div class="featured-item-container row clearfix">	
						<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image1.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 1 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
										<div class="add-to-cart-button">
											<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
											<button class="col-xs-8 button-icon">Add to cart</button>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image2.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 2 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
										<div class="add-to-cart-button">
											<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
											<button class="col-xs-8 button-icon">Add to cart</button>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image3.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 3 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
										<div class="add-to-cart-button">
											<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
											<button class="col-xs-8 button-icon">Add to cart</button>
										</div>
									</div>
								</div>
							</div>

							<div class="col-md-3">
								<div class="per-item-container">
									<div class="per-content-hover">
										<div class="image-content-1">
											<img src="/themes/{{ $shop_theme }}/img/featured-image4.png">
										</div>
										<div class="item-details">
											<div class="item-title">Item Name 4 Lorem Ipsum</div>
											<div class="rating">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-active.png">
												<img src="/themes/{{ $shop_theme }}/img/star-disable.png">
											</div>
											<div class="item-price">PHP 5,000.00</div>
										</div>
									</div>
									<div class="add-to-cart-button-container row clearfix">
										<div class="add-to-cart-button">
											<div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
											<button class="col-xs-8 button-icon">Add to cart</button>
										</div>
									</div>
								</div>
							</div>
					</div>
				</div>

				<div class="brand-container">
					<div>
						<div id="brand-title">OUR BRANDS :</div>
						<div id="brand-logo" class="multiple-item">
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
						</div>
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
});
</script>
@endsection