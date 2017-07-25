@extends('layout')
@section('content')
<div class="container main-container">
	<div class="row clearfix">
		<div class="col-md-8">
			<div class="form-holder">
				<div class="form-header">Login or Checkout as guest</div>
				<div class="form-content">
					@if (session('warning'))
					    <div class="alert alert-warning text-center">
					    	<ul style="padding: 0; margin: 0;">
					    		<li style="display: block;">{!! session('warning') !!}</li>
					    	</ul>
					    </div>
					@endif
					<form method="post">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">
						<div class="form-group">
							<input value="{{ old('email') }}" type="email" class="the-email form-control" placeholder="Enter your email address" name="email">
						</div>
						<div class="form-group">
							<div class="radio">
							  <label><input name="continue" class="radio-continue" type="radio" value="on" {{ session('warning') ? '' : 'checked' }} yes="1"> Continue without password</label>
							</div>
							<div class="radio">
							  <label><input name="continue" class="radio-continue" type="radio" value="off" {{ session('warning') ? 'checked' : '' }} yes="0"> I already have an account</label>
							</div>
						</div>
						<div class="form-group">
							<input disabled type="password" class="the-password form-control" placeholder="Enter your password" name="password">
						</div>
						<div class="form-group">
							<button class="btn btn-primary">CONTINUE</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="checkout-summary">
				<div class="title">Order Summary</div>
				<div class="order-summary">
					@if (session('fail'))
					    <div class="alert alert-danger">
					    	@if(is_array(session('fail')))
					    		<ul>
						        @foreach(session('fail') as $fail)
					        		<li style="display: block;">{{ $fail }}</li>
						        @endforeach
						        </ul>
						    @else
						    	<ul style="padding: 0; margin: 0;">
						    		<li style="display: block;">{{ session('fail') }}</li>
						    	</ul>
					        @endif
					    </div>
					@endif
					<div class="number-in-cart">You have {{ count($get_cart["cart"]) }} in your cart.</div>
					<table>
						<thead>
							<tr>
								<th>Product</th>
								<th class="text-center">Qty.</th>
								<th class="text-right">Price</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							@foreach($get_cart["cart"] as $cart)
							<tr>
								<td>{{ $cart["cart_product_information"]["product_name"] }}</td>
								<td class="text-center">{{ $cart["quantity"] }}</td>
								<td class="text-right">&#8369; {{ number_format($cart['quantity'] * $cart["cart_product_information"]["product_price"], 2) }}</td>
								<td style="padding-left: 10px;"><a style="color: red;" href="/cart/remove?redirect=1&variation_id={{ $cart["product_id"] }}"><i class="fa fa-close"></i></a></td>
							</tr>
							@endforeach
						</tbody>
					</table>
					<div class="text-right total">
						<div class="total-price">&#8369; {{ number_format($get_cart["sale_information"]["total_product_price"], 2) }}</div>
						<div class="total-label">Subtotal</div>
					</div>	
					<!-- <div class="text-right total">
						<div class="total-price"></div>
						<div class="total-label">tax()</div>
					</div> -->
					<div class="text-right total">
						<div class="total-price">&#8369; {{ number_format($get_cart["sale_information"]["total_shipping"], 2) }}</div>
						<div class="total-label">Shipping Fee</div>
					</div>
					<div class="text-right total ">
						<div class="total-price supertotal">&#8369; {{ number_format($get_cart["sale_information"]["total_overall_price"], 2) }}</div>
						<div class="total-label">Total</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/checkout_login.css">
@endsection

@section('js')
<script type="text/javascript" src="/themes/{{ $shop_theme }}/js/checkout_login.js"></script>
@endsection