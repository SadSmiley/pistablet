@extends("layout")
@section("content")
<!-- CONTENT -->
	<div class="container title-container">
		<div class="row clearfix">
			<div class="title">
				<div class="col-md-7"><div class="content-title">Get Intouch With Us</div></div>
				<div class="col-md-5"><div class="content-title">Location</div></div>
			</div>
		</div>
	</div>

	<div class="container content">
		<div class="row clearfix">
			<div class="col-md-7">
				<div class="left-content">
					<div class="row clearfix">
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="First Name*">
							<input type="text" class="form-control" placeholder="Phone Number*">
							<input type="text" class="form-control" placeholder="Subject">
						</div>
						<div class="col-md-6">
							<input type="text" class="form-control" placeholder="Last Name*">
							<input type="text" class="form-control" placeholder="Email Address*">
						</div>
						<div class="col-md-12">
							<textarea class="form-control" placeholder="Message" style="height: 180px;"></textarea>
							<!-- SEND BUTTON -->
							<button>SEND</button>
						</div>
					</div>
				</div>
			</div>
		
			<div class="col-md-5">
				<div class="right-content">
					<div class="location-details">
						<table>
							<tr>
								<td class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i></td>
								<td class="par">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
											Aenean commodo ligula eget dolor. Aenean massa.</td>
							</tr>
							<tr>
								<td class="icon"><i class="fa fa-mobile" aria-hidden="true"></i></td>
								<td class="par">+44 870 888 88 88</td>
							</tr>
							<tr>
								<td class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></td>
								<td class="par">youremailhere@company.com</td>
							</tr>
						</table>
					</div>
							
					<div class="business-hours-details">
						
						<div class="content-title business-hours">Business Hours</div>

						<div class="business-hours-content">
							<table>
								<tr>
									<td class="icon"><i class="fa fa-clock-o" aria-hidden="true"></i></td>
									<td class="par">Monday - Friday at 9:00am - 6:00pm</td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
		
	<div class="container find-us">
		<div class="title">FIND US ON MAP</div>
	</div>
	
				
	<div class="google-map">
		<div class="container">
			<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.705779275078!2d121.00566831496255!3d14.558810389829077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9730adc49fd%3A0xb721aedbb51dd260!2sThe+Linear+Makati+Tower+I!5e0!3m2!1sen!2sph!4v1485887036000" allowfullscreen></iframe>
		</div>
	</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/contactus.css">
@endsection

