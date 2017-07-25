@extends("layout")
@section("content")

<form method="post">
<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<div class="container" style="background-color: #fff; margin-bottom: 50px;">
		<div class="header">
			<img src="/themes/{{ $shop_theme }}/img/cart-icon.png">
			<span>CHECK OUT</span>
		</div>
		<div class="wizard">
			<div class="holder">
				<div class="circle">1</div>
				<div class="name">Shopping</div>
			</div>
			<div class="line"></div>
			<div class="holder active">
				<div class="circle">2</div>
				<div class="name">Payment</div>
			</div>
			<div class="line"></div>
			<div class="holder">
				<div class="circle">3</div>
				<div class="name">Shipping</div>
			</div>
		</div>
		<div class="row clearfix">
			<div class="col-md-7">
				<div class="hold-container">
					<div class="hold-header">HOW DO YOU WANT TO PAY?</div>
					<div class="hold-content match-height">
						<div class="pay">
							<div class="pay-holder">
								<table>
									<tbody>
										@if(count($_payment_method) > 0)
											@foreach($_payment_method as $payment_method)
												@if($payment_method->method_name == "Credit Card")
													<tr>
														<td class="ray"><input name="payment_method_id" value="{{ $payment_method->method_id }}" type="radio" {{ Request::old('payment_method_id') == $payment_method->payment_method_id ? "checked" : "" }}></td>
														<td>
															<div class="name">CREDIT CARD</div>
															<div class="input-holder">
																<input type="text" class="form-control input-sm ccn" placeholder="Credit Card Number">
																<input type="text" class="form-control input-sm date" placeholder="Month">
																<input type="text" class="form-control input-sm date" placeholder="Year">
																<input type="text" class="form-control input-sm date" placeholder="CVV">
															</div>
															<div class="card-holder">
																<img class="img-responsive" src="/themes/{{ $shop_theme }}/img/card.png">
															</div>
														</td>
													</tr>
												@elseif($payment_method->method_name == "Paypal")
													<tr>
														<td class="ray"><input name="payment_method_id" value="{{ $payment_method->method_id }}" type="radio"></td>
														<td>
															<img class="img-responsive" src="/themes/{{ $shop_theme }}/img/paypal.png">
														</td>
													</tr>
												@elseif($payment_method->method_name == "E-Wallet")
													@if($slot_now != null)
													<tr>
														<td class="ray"><input name="payment_method_id" value="{{ $payment_method->method_id }}" type="radio"></td>
														<td>
															<div class="name">{{ $payment_method->method_name }}</div>
														</td>
													</tr>
													@endif
												@else
													<tr>
														<td class="ray"><input name="payment_method_id" value="{{ $payment_method->method_id }}" type="radio"></td>
														<td>
															<div class="name">{{ $payment_method->method_name }}</div>
														</td>
													</tr>
												@endif
											@endforeach
										@endif
									</tbody>
								</table>
							</div>
						</div>

						<div class="upload-container">
							<div class="row clearfix">
								<div class="col-md-8">
									<div id="upload-proof">UPLOAD PROOF OF PAYMENT</div>
								</div>
								<div class="col-md-4">
								<div><button id="upload-button">UPLOAD</button></div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<div class="col-md-5">
				<div class="hold-container">
					<div class="hold-header">CART SUMMARY</div>
					<div class="hold-content match-height">
						@if (session('fail'))
						    <div class="alert alert-danger" style="margin-top: -25px; margin-left: -25px; margin-right: -25px;">
							    <ul>
							        @foreach(session('fail') as $fail)
						        		<li>{{ $fail }}</li>
							        @endforeach
							    </ul>
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
											<td>P {{ number_format($cart['cart_product_information']['product_current_price'] * $cart['quantity'], 2) }}</td>
											<td style="padding-left: 10px;"><a style="color: red;" href="/cart/remove?redirect=1&variation_id={{ $cart["product_id"] }}"><i class="fa fa-close"></i></a></td>
										</tr>
										@endforeach
									@endif
								</tbody>
								<tbody>
									<tr><td></td></tr>
									<tr><td></td></tr>
									<tr>
										<td></td>
										<td class="text-right"><b>Subtotal</b></td>
										<td>P {{ number_format($get_cart["sale_information"]["total_product_price"], 2) }}</td>
										<td></td>
									</tr>
									@if($get_cart["sale_information"]["total_overall_price"] > $get_cart["sale_information"]["minimum_purchase"])
									<!-- <tr>
										<td></td>
										<td class="text-right"><b>Shipping Fee</b></td>
										<td>FREE</td>
									</tr> -->
									@else
									<!-- <tr>
										<td></td>
										<td class="text-right"><b>Shipping Fee</b></td>
										<td>P {{ number_format($get_cart["sale_information"]["total_shipping"], 2) }}</td>
									</tr> -->
									@endif
									<tr>
										<td></td>
										<td class="text-right"><b>Total</b></td>
										<td class="total">P {{ number_format($get_cart["sale_information"]["total_overall_price"], 2) }}</td>
									</tr>
								</tbody>
							</table>
							<!-- <div style="margin-top: 15px; font-size: 16px; font-weight: 700; text-align: center;">Free shipping for orders above ₱ {{ number_format($get_cart['sale_information']['minimum_purchase'], 2) }}</div> -->
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-12">
				<div class="hold-container">
					<div class="hold-header">DELIVERY INFORMATION</div>
					<div class="hold-content match-height">
						<div class="info">
							@if (count($errors) > 0)
							    <div class="alert alert-danger">
							        <ul>
							            @foreach ($errors->all() as $error)
							                <li>{{ $error }}</li>
							            @endforeach
							        </ul>
							    </div>
							@endif
							<div class="row clearfix">
								<div class="col-md-7">
									<div class="form-group">
										<label>FIRST NAME</label>
										<input value="{{ $customer_first_name != null ? $customer_first_name : Request::old('customer_first_name') }}" type="text" name="customer_first_name" class="form-control">
									</div>
									<div class="form-group">
										<label>MIDDLE NAME</label>
										<input value="{{ $customer_middle_name != null ? $customer_middle_name : Request::old('customer_middle_name') }}" type="text" name="customer_middle_name" class="form-control">
									</div>
									<div class="form-group">
										<label>LAST NAME</label>
										<input value="{{ $customer_last_name != null ? $customer_last_name : Request::old('customer_last_name') }}" type="text" name="customer_last_name" class="form-control">
									</div>
									<div class="form-group">
										<label>EMAIL ADDRESS</label>
										<input value="{{ $customer_email != null ? $customer_email : Request::old('customer_email') }}" type="email" name="customer_email" class="form-control">
									</div>
									<div class="form-group">
										<label>BIRTHDAY</label>
										<div class="row clearfix">
											<div class="col-md-4">
												<select name="customer_birthdate[]" class="form-control">
													<option >January</option>
													<option >February</option>
													<option >March</option>
													<option >April</option>
													<option >May</option>
													<option >June</option>
													<option >July</option>
													<option >August</option>
													<option >September</option>
													<option >October</option>
													<option >November</option>
													<option >December</option>
												</select>
											</div>
											<div class="col-md-4">
												<select name="customer_birthdate[]" class="form-control">
													@for($ctr=1;$ctr<=31;$ctr++)
														<option>
															{{ $ctr }}
														</option>
													@endfor		
												</select>
											</div>
											<div class="col-md-4">
												<select name="customer_birthdate[]" class="form-control">
													@for($ctr=(date("Y")-120);$ctr<=date("Y");$ctr++)
														<option {{ (date("Y")-18) == $ctr ? 'selected' : '' }}>
															{{ $ctr }}
														</option>
													@endfor
												</select>
											</div>
										</div>
									</div>
									<div class="form-group">
										<label>CONTACT NUMBER</label>
										<input value="{{ $customer_mobile != null ? $customer_mobile : Request::old('customer_mobile') }}" name="customer_mobile" type="text" class="form-control">
									</div>
									<input type="hidden" name="ec_order_load" value="{{$ec_order_load}}">
									@if($ec_order_load == 1)
									<div class="form-group">
										<label>LOAD TO: (Number)</label>
										<input value="{{ Request::old('ec_order_load_number') }}" name="ec_order_load_number" type="text" class="form-control">
									</div>
									@endif
								</div>
								<div class="col-md-5">
									<div class="form-group">
										<label>TAX</label>
										<select name="taxable" class="form-control">
											<option value="1" {{ Request::old('taxable') == "1" ? "selected" : "" }}>With Tax</option>
											<option value="0" {{ Request::old('taxable') == "0" ? "selected" : "" }}>Without Tax</option>
										</select>
									</div>
									<div class="form-group">
										<label>PROVINCE</label>
										<input value="{{ $customer_state_province != null ? $customer_state_province : Request::old('customer_state_province') }}" name="customer_state_province" type="text" class="form-control">
									</div>
									<div class="form-group">
										<label>CITY / MUNICIPALITY</label>
										<input value="{{ $customer_city != null ? $customer_city : Request::old('customer_city') }}" name="customer_city" type="text" class="form-control">
									</div>
									<div class="form-group">
										<label>COMPLETE SHIPPING ADDRESS</label>
										<textarea name="customer_address" class="form-control" style="height: 180px;">{{ $customer_address != null ? $customer_address : Request::old('customer_address') }}</textarea>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="text-right">
					<button id="placeorder-button" type="submit">PLACE ORDER</button>
				</div>
			</div>
		</div>
		<div style="margin-bottom: 50px;"></div>
	</div>
</form>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/checkout.css">
@endsection

