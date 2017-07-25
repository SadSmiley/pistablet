@extends("layout")
@section("content")
<!-- OUR VALUES -->
<div class="content">
	<div class="container-fluid">
		<div class="top-bg-container">
			<img src="{{ get_content($shop_theme_info, "about", "about_banner_img") }}">
			<div class="top-bg-detail-container"><span class="title-highlight">{{ get_content($shop_theme_info, "about", "about_banner_title_first") }}</span> {{ get_content($shop_theme_info, "about", "about_banner_title_highlight") }}</div>
		</div>
		<div class="row clearfix content">
			<!-- LEFT NAVIGATION -->
			<div class="col-md-3">
				<div class="nav-left-container">
					<div class="nav-left">
						<div class="nav-per-button active" id="company-profile">
							COMPANY PROFILE
						</div>
						<div class="nav-per-button" id="company-responsibility">
							COMPANY RESPONSIBILITY
						</div>
						<div class="nav-per-button" id="environmental-management">
							ENVIRONMENTAL MANAGEMENT
						</div>
						<div class="nav-per-button" id="livelyhood-foundation">
							RUNRUNO LIVELYHOOD FOUNDATION
						</div>
						<div class="nav-per-button" id="awards">
							AWARDS
						</div>
					</div>
				</div>
			</div>
			<!-- CONTENT -->
			<div class="col-md-9 body-content">
			<!-- COMAPANY PROFILE -->
				<div class="content body-height company-profile active">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "about", "about_company_profile_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "about", "about_company_profile_context") !!}
					</p>
					<!-- BOTTOM IMAGES -->
					<div class="content-img-container row clearfix">
						<div class="col-md-9">
							<div class="per-img-container">
								<a class="lightbox2" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_company_profile_context_img1") }}">
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- COMPANY RESPONSIBILITY -->
				<div class="content body-height company-responsibility" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "about", "about_company_responsibility_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "about", "about_company_responsibility_context") !!}
					</p>
					<!-- BOTTOM IMAGES -->
					<div class="content-img-container row clearfix">
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_company_responsibility_context_img1") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_company_responsibility_context_img2") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_company_responsibility_context_img3") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_company_responsibility_context_img4") }}">
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- ENVIRONMENTAL MANAGEMENT -->
				<div class="content body-height environmental-management" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "about", "about_environmental_management_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "about", "about_environmental_management_context") !!}
					</p>
					<!-- BOTTOM IMAGES -->
					<div class="content-img-container row clearfix">
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_environmental_management_context_img1") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_environmental_management_context_img2") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_environmental_management_context_img3") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_environmental_management_context_img4") }}">
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- RUNRUNO LIVELYHOOD FOUNDATION -->
				<div class="content body-height livelyhood-foundation" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "about", "about_livelihood_foundation_context") !!}
					</p>
					<!-- BOTTOM IMAGES -->
					<div class="content-img-container row clearfix">
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img1") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img2") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img3") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img4") }}">
								</a>
							</div>
						</div>
					</div>
					<!-- 2ND ROW -->
					<div class="content-img-container row clearfix">
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img5") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img6") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img7") }}">
								</a>
							</div>
						</div>
						<div class="col-md-3">
							<div class="per-img-container">
								<a class="lightbox" href="#goofy">
									<img src="{{ get_content($shop_theme_info, "about", "about_livelihood_foundation_context_img8") }}">
								</a>
							</div>
						</div>
					</div>
				</div>
				<!-- AWARDS -->
				<div class="content body-height awards" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "about", "about_awards_title") }}
					</div>
					<p>
					{!! get_content($shop_theme_info, "about", "about_awards_context") !!}
					</p>
				</div>

			</div>
		</div>
	</div>
	<!-- SCROLL TO TOP -->
	<div class="scroll-up"><img src="/themes/{{ $shop_theme }}/img/scroll-up.png"></div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/aboutus.css">
@endsection

@section("js")
<script type="text/javascript">
$(document).on("click", '.nav-per-button', function()
{
	var id = $(this).attr("id");

	$(".nav-per-button").removeClass("active");
	$(".body-content .content").removeClass("active");
	$(".body-content .content").fadeOut();

	$(this).addClass("active");
	$(".body-content .content."+id).addClass("active");
	$(".body-content .content."+id).fadeIn();


});
</script>

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

    $(".per-img-container").click(function()
	{
		var source = $(this).find("img").attr("src");
		$(".lightbox-target").find("img").attr("src", source);
	})


});	

</script>
@endsection
