
<div class="checkout-summary">
	<div class="title">Order Summary</div>
	<div class="loader-here hidden" style="padding-top: 50px; position: absolute; text-align: center; width: 100%; top: 0; bottom: 0; background-color: rgba(255,255,255,0.7)">
		<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
		<span class="sr-only">Loading...</span>
	</div>
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
		@if($get_cart["tbl_ec_order"]["shipping_fee"] != 0 || $get_cart["tbl_ec_order"]["service_fee"] != 0)
		<div class="text-right total">
			<div class="total-price">&#8369; {{ number_format($get_cart["tbl_ec_order"]["subtotal"], 2) }}</div>
			<div class="total-label">Subtotal</div>
		</div>	
		@endif
		<!-- <div class="text-right total">
			<div class="total-price"></div>
			<div class="total-label">tax()</div>
		</div> -->
		@if($get_cart["tbl_ec_order"]["shipping_fee"] != 0)
		<div class="text-right total">
			<div class="total-price">&#8369; {{ number_format($get_cart["tbl_ec_order"]["shipping_fee"], 2) }}</div>
			<div class="total-label">Shipping Fee</div>
		</div>
		@endif

		@if($get_cart["tbl_ec_order"]["service_fee"] != 0)
		<div class="text-right total">
			<div class="total-price">&#8369; {{ number_format($get_cart["tbl_ec_order"]["service_fee"], 2) }}</div>
			<div class="total-label">Transaction Fee</div>
		</div>
		@endif

		<div class="text-right total ">
			<div class="total-price supertotal">&#8369; {{ number_format($get_cart["tbl_ec_order"]["total"], 2) }}</div>
			<div class="total-label">Total</div>
		</div>
	</div>
</div>