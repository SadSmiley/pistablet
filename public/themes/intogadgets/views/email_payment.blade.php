@extends('layout')
@section('content')
<div class="container">
	<div class="email-payment">
		<h3>Please check your e-mail for further instructions.</h3>
		<h4>
			<img class="email-sent" src="img/email-sent.png"> <a href="mailto:{{ Request::input("email") }}">{{ Request::input("email") }}</a>
		</h4>
		<div class="button-back">
			<button class="btn btn-primary" type="button" onClick="location.href='/'">CONTINUE SHOPPING</button>
		</div>
	</div>
</div>
@endsection
@section('css')
<style type="text/css">
.email-payment
{
	padding: 25px;
}
.email-payment h2
{
	color: #2c3e50;
}
.email-sent
{
	max-width: 50px;
	margin-top: 15px;
	margin-right: 15px;
}
.button-back
{
	margin-top: 15px;
}
</style>
@endsection