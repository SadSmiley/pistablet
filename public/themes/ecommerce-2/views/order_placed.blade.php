@extends("layout")
@section("content")
<div class="container" style="background-color: #fff; margin-bottom: 50px;">
	<div class="header">
		<img src="/themes/{{ $shop_theme }}/img/check.png">
		<span>ORDER PLACED!</span>
	</div>
	<div class="wizard">
		<div class="holder">
			<div class="circle">1</div>
			<div class="name">Shopping</div>
		</div>
		<div class="line"></div>
		<div class="holder">
			<div class="circle">2</div>
			<div class="name">Payment</div>
		</div>
		<div class="line"></div>
		<div class="holder active">
			<div class="circle">3</div>
			<div class="name">Shipping</div>
		</div>
	</div>
	<div class="truck">
		<img class="img-responsive" src="/themes/{{ $shop_theme }}/img/truck2.png">
	</div>
	<div class="sub">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean </br> commodo ligula eget dolor. Aenean massa! </div>
	<div class="text-center">
		<button class="btn btn-primary">BACK TO SHOP</button>
	</div>
	<div style="margin-bottom: 100px;"></div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/checkout.css">
@endsection

