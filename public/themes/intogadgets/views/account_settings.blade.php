@extends('account_layout')
@section('account_content')
<form class="settings-container" action="/account/settings" method="post">
<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<div class="setting-line"></div>
	<div class="setting-header"><i class="fa fa-cog"></i><span>Account</span> Setting</div>
	@if (count($errors) > 0)
	    <div class="message alert-danger" style="padding-bottom: 30px; margin-top: 10px;">
	        <ul>
	            @foreach ($errors->all() as $error)
	                <li>{{ $error }}</li>
	            @endforeach
	        </ul>
	    </div>
	@endif
	@if(Session::get('fail'))
		<div class="message alert-danger" style="padding-bottom: 30px; margin-top: 10px;">{{ Session::get('fail') }}</div>
	@elseif(Session::get('success'))
		<div class="message alert-success" style="padding-bottom: 30px; margin-top: 10px;">{{ Session::get('success') }}</div>
	@endif
	<div class="setting-content">
		<div class="field">
			<div class="col-md-12 primia-gallery main-image" target_input=".profile-image-input" target_image=".profile-image-img">
			    <img class="pull-right profile-image-img" src="">
			    <input class="hidden profile-image-input text-center top-space-small borderless" name="profile-pix" value="" type="text">
	        </div>
		</div>
		<div class="field">
			<div class="col-md-3">
				<div class="labels">Full Name</div>
			</div>
			<div class="col-md-9">
				<div class="row clearfix">
					<div class="col-md-4">
						<input placeholder="First Name *" required type="text" name="first_name" class="form-control" value="{{ $customer->first_name }}">
					</div>
					<div class="col-md-4">
						<input placeholder="Middle Name" required type="text" name="middle_name" class="form-control" value="{{ $customer->middle_name }}">
					</div>
					<div class="col-md-4">
						<input placeholder="Last Name *" required type="text" name="last_name" class="form-control" value="{{ $customer->last_name }}">
					</div>
				</div>
			</div>
		</div>
		{{-- <div class="field">
			<div class="col-md-3">
				<div class="labels">Birthday</div>
			</div>
			<div class="col-md-3">
				<select name="birthday[]" class="form-control">
					<option value="1">January</option>
					<option value="2">February</option>
					<option value="3">March</option>
					<option value="4">April</option>
					<option value="5">May</option>
					<option value="6">June</option>
					<option value="7">July</option>
					<option value="8">August</option>
					<option value="9">September</option>
					<option value="10">October</option>
					<option value="11">November</option>
					<option value="12">December</option>
				</select>
			</div>
			<div class="col-md-3">
				<select name="birthday[]" class="form-control">
					@for($birthday = 1; $birthday <= 31; $birthday++)
						<option> 
							{{ $birthday }}
						</option>
					@endfor	
				</select>
			</div>
			<div class="col-md-3">
				<select name="birthday[]" class="form-control">
					@for($birthday=(date("Y")-120);$birthday<=date("Y");$birthday++)
						<option>
							{{ $birthday }}
						</option>
					@endfor
				</select>
			</div>
		</div> --}}
		<div class="field">
			<div class="col-md-3">
				<div class="labels">Email</div>
			</div>
			<div class="col-md-9"><input type="email" name="email" class="form-control" value="{{ $customer->email }}"></div>
		</div>
		<div class="field">
			<div class="col-md-3">
				<div class="labels">Address</div>
			</div>
			<div class="col-md-9"><input type="text" name="customer_street" class="form-control" value="{{ $customer->customer_street }}"></div>
		</div>
		<div class="field">
			<div class="col-md-3">
				<div class="labels">Province</div>
			</div>
			<div class="col-md-9"><input type="text" name="customer_state" class="form-control" value="{{ $customer->customer_state }}"></div>
		</div>
		<div class="field">
			<div class="col-md-3">
				<div class="labels">City/Municipality</div>
			</div>
			<div class="col-md-9"><input type="text" name="customer_city" class="form-control" value="{{ $customer->customer_city }}"></div>
		</div>
		<button class="setting-button">Update Data</button>
	</div>
</form>
@endsection
@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/profile.css">
@endsection

@section('script')
<script type = "text/javascript" src="resources/assets/rutsen/js/birthday.js"></script>
<script type="text/javascript" src="resources/assets/rutsen/js/checkout.js"></script>
<script type="text/javascript" src="/resources/assets/primia/primia-admin.js"></script>
@endsection	