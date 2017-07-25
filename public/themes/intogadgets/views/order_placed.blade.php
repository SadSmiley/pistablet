@extends("layout")
@section("content")
<div class="clearfix">
	<div class="container" style="background-color: #fff; margin-bottom: 50px; margin-top: 50px;">
		<div class="text-center">
			<img src="/themes/{{ $shop_theme }}/img/check.png">
			<span style="font-size: 20px;">&nbsp;&nbsp;<strong>CHECK</strong> OUT</span>
		</div>
		<div class="sub" style="text-align: center;font-size: 16px;margin: 25px 0;">Your <strong>order</strong> # {{ isset($order_id) ? $order_id : 0 }} is being processed.</div>
		<div style="max-width: 500px; margin: auto;">
			<div style="font-size: 18px; margin-bottom: 15px; font-weight: 700;">Order Summary</div>
			@if(isset($_order) && count($_order) > 0)
				<div>
					<table class="table table-bordered table-striped table-hovered">
						<thead>
							<tr>
								<th>Product</th>
								<th>Quantity</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							@foreach($_order as $key => $order)
							<tr>
								<td>{{ $order->evariant_item_label }}</td>
								<td>{{ $order->quantity }}</td>
								<td>&#8369; {{ number_format($order->total, 2) }}</td>
							</tr>
							@endforeach
							<tr>
								<td></td>
								<td>Total</td>
								<td>&#8369; {{ number_format($summary['subtotal'], 2) }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			@endif
		</div>
		<div class="text-center">
			<button class="btn btn-primary" onClick="location.href='/'">BACK TO SHOP</button>
		</div>
		<div style="margin-bottom: 100px;"></div>
	</div>
</div>
@endsection

@section("css")

@endsection

