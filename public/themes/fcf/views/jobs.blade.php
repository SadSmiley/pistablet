@extends("layout")
@section("content")
<!-- OUR VALUES -->
<div class="content">
	<div class="container-fluid">
		<div class="top-bg-container">
			<img src="/themes/{{ $shop_theme }}/img/jobs-bg.png">
			<div class="top-bg-detail-container">
				<img src="/themes/{{ $shop_theme }}/img/jobs-logo.png">
			</div>
			<div class="top-banner-caption-bg">
			<div class="top-banner-caption"><span>WE ARE A</span><span>RESPONSIBLE</span><span>MINING COMPANY.&nbsp;</span><span>This drives innovative solutions for our clients and improves our understanding of the world in which we work.</span></div>
			</div>
		</div>
		<div class="row clearfix content">

		</div>
	</div>
	<!-- SCROLL TO TOP -->
	<div class="scroll-up"><img src="/themes/{{ $shop_theme }}/img/scroll-up.png"></div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/jobs.css">
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

    $(".per-img-container").click(function()
	{
		var source = $(this).find("img").attr("src");
		$(".lightbox-target").find("img").attr("src", source);
	})


});	

</script>
@endsection
