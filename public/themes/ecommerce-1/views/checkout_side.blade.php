<div class="hold-container">
	<div class="hold-header">CART SUMMARY</div>
	<div class="hold-content">
		@if (session('fail'))
		    <div class="alert alert-danger" style="margin-top: -25px; margin-left: -25px; margin-right: -25px;">
		    	@if(is_array(session('fail')))
		    		<ul>
			        @foreach(session('fail') as $fail)
		        		<li>{{ $fail }}</li>
			        @endforeach
			        </ul>
			    @else
			    	<ul style="padding: 0; margin: 0;">
			    		<li>{{ session('fail') }}</li>
			    	</ul>
		        @endif
		    </div>
		@endif
		<div class="cart-summary">
			<table class="table">
				<thead>
					<tr>
						<th>PRODUCT</th>
						<th>QTY</th>
						<th>PRICE</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					@if(isset($get_cart['cart']))
						@foreach($get_cart["cart"] as $cart)
						<tr>
							<td>{{ $cart["cart_product_information"]["product_name"] }}</td>
							<td>{{ $cart["quantity"] }}</td>
							<td style="padding-left: 0; padding-right: 0;">P {{ number_format($cart['quantity'] * $cart["cart_product_information"]["product_price"], 2) }}</td>
							<td style="padding-left: 0px; padding-right: 0px; width: 10px;"><a style="color: red;" href="/cart/remove?redirect=1&variation_id={{ $cart["product_id"] }}"><i class="fa fa-close"></i></a></td>
						</tr>
						@endforeach
					@endif
				</tbody>
				<tbody>
					<tr><td></td></tr>
					<tr><td></td></tr>
					@if($get_cart["tbl_ec_order"]["shipping_fee"] != 0 || $get_cart["tbl_ec_order"]["service_fee"] != 0)
					<tr>
						<td></td>
						<td class="text-right"><b>Subtotal</b></td>
						<td colspan="2" style="word-break: break-all;">&#8369; {{ number_format($get_cart["tbl_ec_order"]["subtotal"], 2) }}</td>
					</tr>
					@endif
					@if($get_cart["tbl_ec_order"]["shipping_fee"] != 0)
					<tr>
						<td></td>
						<td class="text-right"><b>Shipping Fee</b></td>
						<td>&#8369; {{ number_format($get_cart["tbl_ec_order"]["shipping_fee"], 2) }}</td>
					</tr>
					@endif
					@if($get_cart["tbl_ec_order"]["service_fee"] != 0)
					<tr>
						<td></td>
						<td class="text-right"><b>Shipping Fee</b></td>
						<td>&#8369; {{ number_format($get_cart["tbl_ec_order"]["service_fee"], 2) }}</td>
					</tr>
					@endif
					<tr>
						<td></td>
						<td class="text-right"><b>Total</b></td>
						<td colspan="2" class="total" style="word-break: break-all;">P {{ number_format($get_cart["tbl_ec_order"]["total"], 2) }}</td>
					</tr>
				</tbody>
			</table>
			<!-- <div style="margin-top: 15px; font-size: 16px; font-weight: 700; text-align: center;">Free shipping for orders above ₱ {{ number_format($get_cart['sale_information']['minimum_purchase'], 2) }}</div> -->
		</div>
	</div>
</div>