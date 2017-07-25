@extends('account_layout')
@section('account_content')
<form class="security" action="/account/security" method="post">
<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<div class="security-line"></div>
	<div class="security-header">
		<i class="fa fa-unlock-alt"></i><div class="security-header-text"><span>Change</span> Password</div>
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
	</div>
	<div class="security-content">
		<div class="field col-md-12">
			<div class="col-md-12">
				<div class="labels">New Password</div>
			</div>
			<div class="col-md-12"><input value="{{ Request::old('npass') }}" required type="password" name="npass" class="form-control"></div>
		</div>
		<div class="field col-md-12">
			<div class="col-md-12">
				<div class="labels">Confirm Password</div>
			</div>
			<div class="col-md-12"><input value="{{ Request::old('cpass') }}" required type="password" name="cpass" class="form-control"></div>
		</div>
		<div class="field col-md-12">
			<div class="col-md-12">
				<div class="labels">Old Password</div>
			</div>
			<div class="col-md-12"><input value="{{ Request::old('opass') }}" required type="password" name="opass" class="form-control"></div>
		</div>
		<button class="security-button" type="submit">Change Password</button>
	</div>
</form>
@endsection

@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/profile.css">
@endsection