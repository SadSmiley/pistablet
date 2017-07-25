@extends('layout')
@section('content')
<form id="place-order-form" method="post" action="" enctype="multipart/form-data">
		@if(Session::get('err'))
		<div class="no_stock_err hidden">
			<ul>
				@foreach(Session::get('err') as $c_err)
					<li style="list-style: inherit;">{{ $c_err }}</li>
				@endforeach
			</ul>
		</div>
		@endif
		@if(Session::get('coupon_errr'))
		<div class="coupon_err hidden">
			<ul>
				@foreach(Session::get('coupon_errr') as $c_err)
					<li style="list-style: inherit;">{{ $c_err }}</li>
				@endforeach
			</ul>
		</div>
		@endif
	<div class="order-sum">
		<input type="hidden" name="_token" value="{{ csrf_token() }}" />
		<div class="order-header"><span>ORDER</span> SUMMARY</div>
		<div class="divider"></div>

		<div class="header-button text-right">
			<button class="btn btn-default back-button">&laquo; Back</button>
			<button class="btn btn-default coupon-button"><i class="fa fa-qrcode"></i> Use Coupon</button>
			<button class="btn btn-primary submit-button"><i class="fa fa-shopping-cart"></i> Place Order</button>
		</div> 

		<table>
			<thead>
				<tr>
					<td class="biggest">Product</td>
					<td class="text-center">Price</td>
					<td class="text-center">Quantity</td>
					<td class="text-center">Discount</td>
					<td class="text-center">Discounted</td>
					<td class="text-center">Total</td>
				</tr>
			</thead>
			<tbody>
				
				<tr>
					<td></td>
					<td class="text-right"></td>
					<td class="text-center"></td>
					<td class="text-right"></td>
					<td class="text-right"></td>
					<td class="text-right"></td>
				</tr>
				
			</tbody>
		</table>
		<div class="text-right total">
			<div class="total-price"></div>
			<div class="total-label">Subtotal</div>
		</div>
		<div class="text-right total">
			<div class="total-price"></div>
			<div class="total-label">Tax ()</div>
		</div>
		

		<div class="text-right total">
			<div class="total-price"></div>
			<div class="total-label">Shipping Fee</div>
		</div>
		<div class="text-right total ">
			<div class="total-price supertotal"></div>
			<div class="total-label">Total</div>
		</div>
		<div class="ship">
			<div class="title">Ship to </div>
			<div class="holder">
				<div class="name"></div>
				<div class="text"></div>
				<div class="text"></div>
			</div>
		</div>
		<div class="divider2"></div>
		<div class="checkout-payment text-center">
			<div class="holder col-md-4">
				<div class="img"><img src="/resources/assets/frontend/img/payment/metro.png"></div>
				<div class="name">Metrobank: Intogadgets Inc.</div>
				<div class="number">284-7-28481557-9</div>
			</div>
			<div class="holder col-md-4">
				<div class="img"><img src="/resources/assets/frontend/img/payment/bpi.png"></div>
				<div class="name">BPI: Intogadgets Inc.</div>
				<div class="number">284-7-28481557-9</div>
			</div>
			<div class="holder col-md-4">
				<div class="img"><img src="/resources/assets/frontend/img/payment/bdo.png"></div>
				<div class="name">BDO: TNP Hi-Tech Inc.</div>
				<div class="number">284-7-28481557-9</div>
			</div>
		</div>
	</div>
</form>
<div class="remodal coupon-popup" data-remodal-id="coupon">
	<div class="coupon-container row">
		<form method="post" action="checkout/coupon">
			<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />
			<div class="col-md-9"><input name="coupon-code" required="required" placeholder="Enter coupon code here..." class="form-control" type="text"></div>
			<div class="col-md-3"><input value="Apply Coupon" class="btn btn-primary" type="submit"></div>
		</form>
	</div>
</div>
@endsection

@section('script')
<script type="text/javascript" src="resources/assets/rutsen/js/checkout.js"></script>
@endsection

@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/checkout.css">
@endsection