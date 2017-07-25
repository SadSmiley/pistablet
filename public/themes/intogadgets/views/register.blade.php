@extends('layout')
@section('content')
<div class="container main-container">
	<div class="row clearfix">
		<div class="col-md-12">
			<div>
				<div>
					@if (session('warning'))
					    <div class="alert alert-warning">
					    	<ul style="padding: 0; margin: 0;">
					    		<li style="display: block;">{{ session('warning') }}</li>
					    	</ul>
					    </div>
					@endif

					<form class="form-login" method="post" action="/account/register">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<input type="hidden" name="IsEcomm" value="1">

						<div class="row clearfix">
							{{-- Basic Information --}}
							<fieldset class="col-md-6">
	     						<legend class="col-form-legend col-sm-12">Basic Information</legend>	
								<div class="form-group">
									<label for="first_name">First Name</label>
									<input value="{{ Request::old("first_name") }}" type="text" class="the-first_name form-control" placeholder="" name="first_name">
								</div>
								<div class="form-group">
									<label for="last_name">Last Name</label>
									<input value="{{ Request::old("last_name") }}" type="text" class="the-last_name form-control" placeholder="" name="last_name">
								</div>
								<div class="form-group">
									<label for="email">Email</label>
									<input value="{{ Request::old("email") }}" type="email" class="the-email form-control" placeholder="" name="email">
								</div>
								<div class="form-group">
									<label for="pass">Password</label>
									<input type="password" class="the-pass form-control" placeholder="Enter password" name="pass">
								</div>
								<div class="form-group">
									<label for="pass2">Confirm Password</label>
									<input type="password" class="the-pass2 form-control" placeholder="Re-enter password" name="pass2">
								</div>
							</fieldset>
							{{-- End Basic Information --}}	
							
							{{-- Billing Information --}}	
							<fieldset class="col-md-6">
		     					<legend class="col-form-legend col-sm-12">Billing Information</legend>					
								<div class="form-group">
									<label for="customer_state">Province</label>
									<input value="{{ Request::old("customer_state") }}" type="text" class="the-customer_state form-control" placeholder="" name="customer_state">
								</div>
								<div class="form-group">
									<label for="customer_city">City/Municipality</label>
									<input value="{{ Request::old("customer_city") }}" type="text" class="the-customer_city form-control" placeholder="" name="customer_city">
								</div>
								<div class="form-group">
									<label for="customer_street">Complete Address</label>
									{{-- <input value="{{ Request::input("customer_street") }}" type="text" class="the-customer_street form-control" placeholder="" name="customer_street"> --}}
									<textarea class="form-control" rows="5" class="the-customer_street form-control" name="customer_street">{{ Request::old("customer_street") }}</textarea>
								</div>
								<div class="form-group">
									<label for="customer_mobile">Contact Number</label>
									<input value="{{ Request::old("customer_mobile") }}" type="text" class="the-customer_mobile form-control" placeholder="" name="customer_mobile">
								</div>
							</fieldset>
							{{-- End Billing Information --}}
						</div>
						<div class="form-group text-right">
							<button class="btn btn-primary">CONTINUE</button>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="resources/assets/frontend/css/checkout_login.css">
@endsection

@section('script')
{{-- <script type="text/javascript" src="resources/assets/frontend/js/checkout_login.js"></script> --}}
@endsection