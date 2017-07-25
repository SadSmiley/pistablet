@extends("layout")
@section("content")
<!-- OUR VALUES -->
<div class="content">
	<div class="container-fluid">
		<div class="top-bg-container">
			<img src="{{ get_content($shop_theme_info, "runruno", "runruno_banner_img") }}">
			<div class="top-bg-detail-container">{{ get_content($shop_theme_info, "runruno", "runruno_banner_title") }}</div>
		</div>
		<div class="row clearfix content scroll-to">
			<!-- LEFT NAVIGATION -->
			<div class="col-md-3">
				<div class="nav-left-container">
					<div class="nav-left">
						<div class="nav-per-button active" id="runruno">
							RUNRUNO
						</div>
						<div class="nav-per-button" id="gold-molybdenum">
							RUNRUNO GOLD-MOLYBDENUM PROJECT
						</div>
						<div class="nav-per-button" id="keypoints">
							KEYPOINTS
						</div>
						<div class="nav-per-button" id="geology">
							GEOLOGY
						</div>
						<div class="nav-per-button" id="feasibility-study">
							FEASIBILITY STUDY
						</div>
					</div>
				</div>
			</div>
			<!-- CONTENT -->
			<div class="col-md-9 body-content">
			<!-- RUNRUNO -->
				<div class="content body-height runruno active">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "runruno", "runruno_runruno_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "runruno", "runruno_context") !!}
					</p>
				</div>
				<!-- Molybdenum-Project -->
				<div class="content body-height gold-molybdenum" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "runruno", "runruno_gold_molybdenum_title") }}
					</div>
					<!-- BOTTOM IMAGES -->
					<div class="content-img-container row clearfix">
						<div class="image-holder">
							<div class="col-md-6">
								<div class="per-img-container">
									<a class="lightbox" href="#goofy">
										<img src="{{ get_content($shop_theme_info, "runruno", "runruno_gold_molybdenum_context_img1") }}">
									</a>
								</div>
							</div>
							<div class="col-md-6">
								<div class="per-img-container">
									<a class="lightbox" href="#goofy">
										<img src="{{ get_content($shop_theme_info, "runruno", "runruno_gold_molybdenum_context_img2") }}">
									</a>
								</div>
							</div>
						</div>
					</div>
					<p>
						{!! get_content($shop_theme_info, "runruno", "runruno_gold_molybdenum_context") !!}
					</p>
				</div>
				<!-- KEYPOINTS -->
				<div class="content body-height keypoints" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "runruno", "runruno_keypoints_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "runruno", "runruno_keypoints_context") !!}
					</p>
				</div>
				<!-- GEOLOGY -->
				<div class="content body-height geology" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "runruno", "runruno_geology_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "runruno", "runruno_geology_context") !!}
					</p>
					<!-- BOTTOM IMAGES -->
					<div class="content-img-container row clearfix">
						<div class="image-holder">
							<div class="col-md-6">
								<div class="per-img-container">
									<a class="lightbox" href="#goofy">
										<img src="{{ get_content($shop_theme_info, "runruno", "runruno_geology_context_img1") }}">
									</a>
								</div>
							</div>
							<div class="col-md-6">
								<div class="per-img-container">
									<a class="lightbox" href="#goofy">
										<img src="{{ get_content($shop_theme_info, "runruno", "runruno_geology_context_img2") }}">
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- FEASIBILITY STUDY -->
				<div class="content body-height feasibility-study" style="display: none">
					<!-- CONTENT TITLE -->
					<div class="content-title">
						{{ get_content($shop_theme_info, "runruno", "runruno_feasibility_study_title") }}
					</div>
					<p>
						{!! get_content($shop_theme_info, "runruno", "runruno_feasibility_study_context") !!}
					</p>
					<!-- TABLE -->
					<table>
						<thead>
							<tr>
								<td>
									<span>Description</span>
								</td>
								<td>
									<span>Item</span>
								</td>
							</tr>
						</thead>
						<tbody>
							@if(loop_content_condition($shop_theme_info, "runruno", "runruno_feasibility_study_table_maintenance"))
								@foreach( loop_content_get($shop_theme_info, "runruno", "runruno_feasibility_study_table_maintenance") as $table_row )
								<tr>
									<td>
										<span>{{ $table_row["description"] }}</span>
									</td>
									<td>
										<span>{{ $table_row["item"] }}</span>
									</td>
								</tr>
								@endforeach
							@endif
							<!-- <tr>
								<td>
									<span>Average Mining Rate</span>
								</td>
								<td>
									<span>12.2 Mtpa</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Average Operational Strip Ratio</span>
								</td>
								<td>
									<span>5.9:1</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Design Milling Rate</span>
								</td>
								<td>
									<span>1.75 Mtpa</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Average Gold Grade</span>
								</td>
								<td>
									<span>1.89 g/t</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Gold Recovery</span>
								</td>
								<td>
									<span>91.9%</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Average Gold Production</span>
								</td>
								<td>
									<span>96,700 ozs/yr</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>LOM Gold Production</span>
								</td>
								<td>
									<span>1,006,000 ozs</span>
								</td>
							</tr>
							<tr>
								<td>
									<span>Average Operating Cost</span>
								</td>
								<td>
									<span>US$46.2m/yr</span>
								</td>
							</tr> -->
						</tbody>
					</table>
				</div>

			</div>
		</div>
	</div>
	<!-- SCROLL TO TOP -->
	<div class="scroll-up"><img src="/themes/{{ $shop_theme }}/img/scroll-up.png"></div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/runruno.css">
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
<script type="text/javascript" src="/themes/{{ $shop_theme }}/js/sticky_side.js"></script>

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

