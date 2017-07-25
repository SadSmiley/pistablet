@extends('layout')
@section('content')
<div class="contact">
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-6">
				<div class="title">Get Intouch With Us</div>
				<form method="post">
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<div class="row clearfix">
						<div class="col-sm-6">
							<div class="form-group">
								<label>First Name</label>
								<input type="text" class="form-control" name="first_name">
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Last Name</label>
								<input type="text" class="form-control" name="last_name">
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Phone Number</label>
								<input type="text" class="form-control" name="phone_number">
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Email Address</label>
								<input type="text" class="form-control" name="email_address">
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label>Subject</label>
								<input type="text" class="form-control" name="subject">
							</div>
						</div>
						<div class="col-sm-12">
							<label>Message</label>
							<textarea class="form-control" name="message"></textarea>
						</div>
						<div class="col-sm-12 text-right">
							<button class="btn btn-default">Send</button>
						</div>
					</div>
				</form>
			</div>
			<div class="col-md-6">
				<div class="title">Location</div>
				<div class="info">
					<table>
						<tbody>	
							<tr>
								<td><i class="fa fa-map-marker" aria-hidden="true"></i></td>
								<td class="text">{{ isset($company_info["company_address"]) ? $company_info["company_address"]->value : '' }}</td>
							</tr>
							<tr>
								<td><i class="fa fa-mobile" aria-hidden="true"></i></td>
								<td class="text">{{ isset($company_info["company_address"]) ? $company_info["company_address"]->value : '' }}</td>
							</tr>
							<tr>
								<td><i class="fa fa-envelope" aria-hidden="true"></i></td>
								<td class="text">{{ isset($company_info["company_email"]) ? $company_info["company_email"]->value : '' }}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="title">Business Hours</div>
				<div class="info">
					<table>
						<tbody>	
							<tr>
								<td><i class="fa fa-clock-o" aria-hidden="true"></i></td>
								<td class="text">{{ $company_info["company_hour"] ? $company_info["company_hour"]->value : 'Monday - Friday at 9:00am - 6:00pm' }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="map">
	<div class="container">
		<div class="title">FIND US ON MAP</div>
		<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3310095.7667195336!2d120.72026540845529!3d15.531143545937647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1477350965356" frameborder="0" style="border:0" allowfullscreen></iframe>
	</div>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/contact.css">
@endsection
