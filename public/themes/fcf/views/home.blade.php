@extends("layout")
@section("content")
<div class="content">
	<!-- TOP CONTENT -->
	<div class="top-container">
		<div class="container-fluid">
			<div class="row clearfix">
				<!-- HOME SLIDESHOW -->
				<div class="col-md-8">
					<div class="slider-container">
						@if( loop_content_condition( $shop_theme_info, "home", "home_slider" ) )
						<!-- DYNAMIC CMS -->
							@foreach( unserialize( get_content($shop_theme_info, "home", "home_slider") ) as $slider )
							<div>
								<div class="slider">
									<img class="image" src="{{ $slider['image'] }}">
									<div class="slider-details-bg"></div>
									<div class="slider-title-container" style="background-image: url('/themes/{{ $shop_theme }}/img/slider-details-bg.png');">
										<div class="row clearfix">
											<div class="col-md-9">
												<div class="slider-details">
													<div class="slider-title">{{ $slider['title'] }}</div>
													<div class="slider-title-details">{{ $slider['subtitle'] }}
													</div>
												</div>
											</div>
											<div class="col-md-3">
												<div class="btn-container"><a href="/runruno"><button class="read-more-btn">READ MORE</button></a></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							@endforeach
						@else
						<!-- STATIC -->
							<div>
								<div class="slider">
									<img class="image" src="/themes/{{ $shop_theme }}/img/slider1.png">
									<div class="slider-details-bg"></div>
									<div class="slider-title-container" style="background-image: url('/themes/{{ $shop_theme }}/img/slider-details-bg.png');">
										<div class="row clearfix">
											<div class="col-md-9">
												<div class="slider-details">
													<div class="slider-title">THE PROJECT</div>
													<div class="slider-title-details">FCF will develop a project as a surface mine with a processing plant to produce gold (dore)...
													</div>
												</div>
											</div>
											<div class="col-md-3">
												<div class="btn-container"><button class="read-more-btn">READ MORE</button></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<div class="slider">
									<img class="image" src="/themes/{{ $shop_theme }}/img/slider2.png">
									<div class="slider-details-bg"></div>
									<div class="slider-title-container" style="background-image: url('/themes/{{ $shop_theme }}/img/slider-details-bg.png');">
										<div class="row clearfix">
											<div class="col-md-9">
												<div class="slider-details">
													<div class="slider-title">THE FEASIBILITY STUDY</div>
													<div class="slider-title-details">FCF Minerals Corporation (FCF) was incorporated in the Philippines and was duly registered with the Philippines...
													</div>
												</div>
											</div>
											<div class="col-md-3">
												<div class="btn-container"><button class="read-more-btn">READ MORE</button></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						@endif
					</div>
				</div>
				<!-- LATEST NEWS -->
				<div class="col-md-4">
					<div class="top-left-container-title">{{ get_content($shop_theme_info, "home", "home_news_title") }}</div>
					<div class="latest-news-container">
					<!-- NEWS PER CONTAINER -->
						@if(count(get_front_news($shop_id)) > 0)
							@foreach(limit_foreach(get_front_news($shop_id), 5) as $news)
							<a href="/news?id={{ $news->post_id }}">
								<div class="latest-news-per-container row-no-padding clearfix">
									<div class="col-md-4">
										<div class="news-img"><img class="4-3-ratio" src="{{ $news->post_image }}"></div>
									</div>
									<div class="col-md-8">
										<div class="news-details">
											<div class="news-title">{{ $news->post_title }}</div>
											<div class="news-content">{{ $news->post_excerpt }}</div>
											<div class="read-more">READ MORE</div>
										</div>
									</div>
								</div>
							</a>
							@endforeach
						@else
							<a href="/news">
								<div class="latest-news-per-container row-no-padding clearfix">
									<div class="col-md-4">
										<div class="news-img"><img src="/themes/{{ $shop_theme }}/img/news1.png"></div>
									</div>
									<div class="col-md-8">
										<div class="news-details">
											<div class="news-title">FCF Scholars Graduate With Honors</div>
											<div class="news-content">FCF Minerals’ first baccalaureate scholars finally marched to receive their respective diplomas and medals last March 2013. Both finished their geo-sciences courses from Adamson University in Manila. </div>
											<div class="read-more">READ MORE</div>
										</div>
									</div>
								</div>
							</a>
							<a href="/news">
								<div class="latest-news-per-container row-no-padding clearfix">
									<div class="col-md-4">
										<div class="news-img"><img src="/themes/{{ $shop_theme }}/img/news2.png"></div>
									</div>
									<div class="col-md-8">
										<div class="news-details">
											<div class="news-title">Modernized Water System To Bring
											Potable Water To Runruno Community</div>
											<div class="news-content">Amid company’s need for potable water supply, the Runruno residents stand to benefit from the water supply system project that FCF Minerals has begun constructing in September. </div>
											<div class="read-more">READ MORE</div>
										</div>
									</div>
								</div>
							</a>
							<a href="/news">
								<div class="latest-news-per-container row-no-padding clearfix">
									<div class="col-md-4">
										<div class="news-img"><img src="/themes/{{ $shop_theme }}/img/news3.png"></div>
									</div>
									<div class="col-md-8">
										<div class="news-details">
											<div class="news-title">Lorem ipsum dolor sit amet consect
											etuer adipiscing elit. </div>
											<div class="news-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. </div>
											<div class="read-more">READ MORE</div>
										</div>
									</div>
								</div>
							</a>
							<a href="/news">
								<div class="latest-news-per-container row-no-padding clearfix">
									<div class="col-md-4">
										<div class="news-img"><img src="/themes/{{ $shop_theme }}/img/news4.png"></div>
									</div>
									<div class="col-md-8">
										<div class="news-details">
											<div class="news-title">Etiam ultricies nisi vel augue</div>
											<div class="news-content">Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. </div>
											<div class="read-more">READ MORE</div>
										</div>
									</div>
								</div>
							</a>
						@endif
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- GALLERY -->
	<div class="gallery-container">
		<div class="container-fluid">
			<div class="container-title">
				{{ get_content($shop_theme_info, "home", "home_gallery_title") }}
			</div>
			<div class="gallery-slide-holder">
				<div id="myCarousel" class="carousel slide">
					<div class="carousel-inner">
						{{-- <div class="item active">
							<div class="row clearfix">
								<div class="col-sm-2">
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img1.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full1.jpg"></div>
										</a>
									</div>
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img7.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full7.jpg"></div>
										</a>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img2.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full2.jpg"></div>
										</a>
									</div>
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img8.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full8.jpg"></div>
										</a>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img3.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full3.jpg"></div>
										</a>
									</div>
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img9.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full9.jpg"></div>
										</a>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img4.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full4.jpg"></div>
										</a>
									</div>
									<div class="gallery-img-holder">
									<a class="lightbox" href="#goofy">
										<img src="/themes/{{ $shop_theme }}/img/img10.png">
										<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full10.jpg"></div>
									</a>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img5.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full5.jpg"></div>
										</a>
									</div>
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img11.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full11.jpg"></div>
										</a>
									</div>
								</div>
								<div class="col-sm-2">
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img6.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full6.jpg"></div>
										</a>
									</div>
									<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img12.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full12.jpg"></div>
										</a>
									</div>
								</div>
							</div>
						</div> --}}
						@if(loop_content_condition($shop_theme_info, "home", "home_gallery_images"))
							@foreach(loop_content_divide(loop_content_get($shop_theme_info, "home", "home_gallery_images"), 12) as $key => $gallery)
								<div class="item {{ $key == 1 ? "active" : "" }}">
									<div class="row-no-padding clearfix">
										@foreach(loop_content_divide($gallery, 2) as $key0 => $image_holder)
											<div class="col-sm-2 col-xs-4">
												@foreach($image_holder as $key1 => $image)
												<div class="gallery-img-holder">
													<a class="lightbox" href="#goofy">
														<img src="{{ $image }}">
														<div class="full-image hidden" path="{{ $image }}"></div>
													</a>
												</div>
												@endforeach
											</div>
										@endforeach
									</div>
								</div>
							@endforeach
						@else
							<div class="item active">
								<div class="row clearfix">
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img1.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full1.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img7.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full7.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img2.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full2.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img8.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full8.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img3.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full3.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img9.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full9.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img4.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full4.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img10.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full10.jpg"></div>
										</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img5.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full5.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img11.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full11.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img6.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full6.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img12.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full12.jpg"></div>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div class="item">
								<div class="row clearfix">
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img1.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full1.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img7.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full7.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img2.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full2.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img8.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full8.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img3.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full3.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img9.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full9.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img4.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full4.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
										<a class="lightbox" href="#goofy">
											<img src="/themes/{{ $shop_theme }}/img/img10.png">
											<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full10.jpg"></div>
										</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img5.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full5.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img11.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full11.jpg"></div>
											</a>
										</div>
									</div>
									<div class="col-sm-2">
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img6.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full6.jpg"></div>
											</a>
										</div>
										<div class="gallery-img-holder">
											<a class="lightbox" href="#goofy">
												<img src="/themes/{{ $shop_theme }}/img/img12.png">
												<div class="full-image hidden" path="/themes/{{ $shop_theme }}/img/full12.jpg"></div>
											</a>
										</div>
									</div>
								</div>
							</div>
						@endif
					</div>
					<a class="left carousel-control" href="#myCarousel" data-slide="prev"><img src="/themes/{{ $shop_theme }}/img/arrow-left1.png"></a>
					<a class="right carousel-control" href="#myCarousel" data-slide="next"><img src="/themes/{{ $shop_theme }}/img/arrow-right1.png"></a>
				</div>
			</div>


		</div>
	</div>
	<!-- KEY COMPONENTS -->
	<div class="key-components-container">
		<div class="container-fluid">
		<div class="container-title">KEY COMPONENTS</div>
			<div class="row clearfix element-container">
				<div class="col-md-3">
					<div class="image-holder"><img src="{{ get_content($shop_theme_info, "home", "home_division2_img1") }}"></div>
					<div class="element-title">{{ get_content($shop_theme_info, "home", "home_division2_img1_title") }}</div>
					<div class="element-description">A surface mine and Run of Mine (ROM) pad.</div>
				</div>
				<div class="col-md-3">
					<div class="image-holder"><img src="{{ get_content($shop_theme_info, "home", "home_division2_img2") }}"></div>
					<div class="element-title">{{ get_content($shop_theme_info, "home", "home_division2_img2_title") }}</div>
					<div class="element-description">Process plant facility of grinding, flotation, BIOX ®, Carbon-in-Leach (CIL) and recovery.</div>
				</div>
				<div class="col-md-3">
					<div class="image-holder"><img src="{{ get_content($shop_theme_info, "home", "home_division2_img3") }}"></div>
					<div class="element-title">{{ get_content($shop_theme_info, "home", "home_division2_img3_title") }}</div>
					<div class="element-description">Residual Storage Impoundment (RSI) to ensure waste materials are properly managed and to maximize reclaim of water for the operation.</div>
				</div>
				<div class="col-md-3">
					<div class="image-holder"><img src="{{ get_content($shop_theme_info, "home", "home_division2_img4") }}"></div>
					<div class="element-title">{{ get_content($shop_theme_info, "home", "home_division2_img4_title") }}</div>
					<div class="element-description">Associated infrastructure including upgrade of the access road, power line, accomodation camp and 
					ancilliary buildings.</div>
				</div>
			</div>
		</div>
	</div>
<!-- SCROLL TO TOP -->
	<div class="scroll-up"><img src="/themes/{{ $shop_theme }}/img/scroll-up.png"></div>

</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/home.css">
@endsection

@section("js")
<script type="text/javascript">
$(document).ready(function()
{
	$('.slider-container').slick({
		prevArrow:"<img class='a-left control-c prev slick-prev' src='/themes/{{ $shop_theme }}/img/arrow-left.png'>",
      	nextArrow:"<img class='a-right control-c next slick-next' src='/themes/{{ $shop_theme }}/img/arrow-right.png'>",
      	dots: false,
      	autoplay: true,
  		autoplaySpeed: 3000,
	});

	$('#myCarousel').carousel({
	interval: 5000
	})
    
    $('#myCarousel').on('slid.bs.carousel', function() {
    	//alert("slid");
	});

	$(".gallery-img-holder").click(function()
	{
		var source = $(this).find(".full-image").attr("path");
		$(".lightbox-target").find("img").attr("src", source);
	})

	/*scroll up*/
	$(window).scroll(function () {
        if ($(this).scrollTop() > 700) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });

    $('.scroll-up').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 700);
        return false;
    });
});
</script>
@endsection