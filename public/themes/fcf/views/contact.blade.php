@extends("layout")
@section("content")
<!-- OUR VALUES -->
<div class="content">
	<div class="container-fluid">
		<div class="top-bg-container">
			<img src="{{ get_content($shop_theme_info, "contactus", "contactus_banner_img") }}">
			<div class="top-bg-detail-container"><span style="color: #ffc10e;">{{ get_content($shop_theme_info, "contactus", "contactus_banner_title_first_word") }}</span>&nbsp;{{ get_content($shop_theme_info, "contactus", "contactus_banner_title_highlight") }}</div>
		</div>
		<div class="row clearfix content">
		<!-- CONTENT -->
			<div class="content">
				<div class="col-md-6">
					<div class="title-container">
						{{ get_content($shop_theme_info, "contactus", "contactus_send_msg_title") }}
					</div>
					<!-- TEXT FIELD -->
					<div class="textfield-container row clearfix">
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="First Name*">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="Last Name*">
						</div>
					</div>
					<div class="textfield-container row clearfix">
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="Phone Number*">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="Email Address*">
						</div>
					</div>
					<div class="textfield-container row clearfix">
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="Subject">
						</div>
					</div>
					<div class="textfield-container">
						<textarea style="max-width: 635px; min-height: 175px; max-height: 300px;" class="form-control" placeholder="Message" style="height: 180px;"></textarea>
					</div>
					<div class="textfield-container">
						<button>SEND</button>
					</div>
				</div>
				<div class="col-md-6">
					<div class="title-container">
						{{ get_content($shop_theme_info, "contactus", "contactus_location_title") }}
					</div>
					<table>
						<tr>
							<td class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></td>
							<td class="par">{{ get_content($shop_theme_info, "contactus", "contactus_location") }}</td>
						</tr>
						<tr>
							<td class="icon"><i class="fa fa-phone" aria-hidden="true"></i></td>
							<td class="par">{{ get_content($shop_theme_info, "contactus", "contactus_phone_number") }}</td>
						</tr>
						<tr>
							<td class="icon"><i class="fa fa-envelope" aria-hidden="true"></td>
							<td class="par">{{ get_content($shop_theme_info, "contactus", "contactus_email") }}</td>
						</tr>
						<tr>
							<td class="icon"><i class="fa fa-fax" aria-hidden="true"></td>
							<td class="par">{{ get_content($shop_theme_info, "contactus", "contactus_fax") }}</td>
						</tr>
					</table>
					<div>
						<div class="content-title business-hours">{{ get_content($shop_theme_info, "contactus", "contactus_business_hours_title") }}</div>
						<table>
							<tr>
								<td class="icon"><i class="fa fa-clock-o" aria-hidden="true"></i></td>
								<td class="par">{{ get_content($shop_theme_info, "contactus", "contactus_business_hours") }}</td>
							</tr>
						</table>
					</div>
					<div class="title-container project-site">Project Site Address</div>
					<div>Brgy. Runruno, Municipality of Quezon, Nueva Vizcaya, Philippines</div>
				</div>
			</div>
		</div>
	</div>

	<!-- SCROLL TO TOP -->
	<div class="scroll-up"><img src="/themes/{{ $shop_theme }}/img/scroll-up.png"></div>
</div>
<!-- GOOGLE MAP -->
<div class="map-title-container">
	<div class="container-fluid">
		Find Us on Map
	</div>	
</div>
<div class="google-map">
	<iframe src="{{ get_content($shop_theme_info, "contactus", "contactus_location_map") }}" allowfullscreen></iframe>
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
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/contactus.css">
@endsection

