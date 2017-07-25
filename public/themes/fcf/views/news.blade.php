@extends("layout")
@section("content")
<!-- OUR VALUES -->
<div class="content">
	<div class="container-fluid">
		<div class="row clearfix">
			<!-- NEWS CONTENT -->
			<div class="col-md-8">
				<div class="news-container">
					<div class="news-img-container">
						<img src="{{ $main_news->post_image }}">
					</div>
					<div class="news-title">
						{{ $main_news->post_title }}
					</div>
					<div class="news-details">
						<span>By: &nbsp;</span><span style="font-weight: 500; color: #333333;">{{ get_content($shop_theme_info, "news", "news_author") }}</span>
					</div>
					<div class="news-content">
						<p>
							{!! $main_news->post_content !!}
						</p>
					</div>
				</div>
			</div>
			<!-- OTHER NEWS -->
			<div class="col-md-4">
				<div class="top-left-container-title">OTHER NEWS</div>
					<div class="latest-news-container">
					<!-- NEWS PER CONTAINER -->
					@if(count(get_front_news($shop_id)) > 0)
						@foreach(limit_foreach(get_front_news($shop_id), 6) as $news)
							<a class="{{ $news->post_id == $main_news->post_id ? 'hide' : '' }}" href="/news?id={{ $news->post_id }}">
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
						<a href="/news">
							<div class="latest-news-per-container row-no-padding clearfix">
								<div class="col-md-4">
									<div class="news-img"><img src="/themes/{{ $shop_theme }}/img/news5.png"></div>
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
									<div class="news-img"><img src="/themes/{{ $shop_theme }}/img/news6.png"></div>
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
					@endif
					</div>
			</div>
		</div>
	</div>
	<!-- SCROLL TO TOP -->
	<div class="scroll-up"><img src="/themes/{{ $shop_theme }}/img/scroll-up.png"></div>
</div>
@endsection

@section("js")
<script type="text/javascript">

$(document).ready(function()
{
	/*scroll up*/
	$(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scroll-up').fadeIn();
        } else {
            $('.scroll-up').fadeOut();
        }
    });

    $('.scroll-up').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


});	

</script>

@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/news.css">
@endsection

