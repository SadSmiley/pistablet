@extends("layout")
@section("content")
<div class="container">
	<div class="header">
		<img src="/themes/{{ $shop_theme }}/img/check-out-cart.png">
		<span>CHECK OUT</span>
	</div>
	
	<div class="row clearfix">
		<div class="col-md-7">
			<div class="hold-container">
				<div class="hold-header">Delivery <span>Information</span></div>
				<div class="hold-content match-height">
					<div class="info">
						<div class="row clearfix">
							<div class="col-md-7">
								<div class="form-group">
									<input type="text" placeholder="First Name" class="form-control">
								</div>
								<div class="form-group">
									<input type="text" placeholder="Last Name" class="form-control">
								</div>
								<div class="form-group">
									<input type="text" placeholder="Contact Number" class="form-control">
								</div>
								<div class="form-group">
									<input type="text" placeholder="Other Contact Information" class="form-control">
								</div>
							</div>
							<div class="col-md-5">
								<div class="form-group">
									<input type="text" placeholder="Shipping Method" class="form-control">
								</div>
								<div class="form-group">
									<label>Complete Shipping Address</label>
									<textarea class="form-control with-border" style="height: 108px;"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<div class="col-md-5">
			<div class="hold-container">
				<div class="hold-header">Cart <span>Summary</span></div>
				<div class="hold-content match-height">
					<div class="cart-summary">
						<table class="table">
							<thead>
								<tr>
									<th>PRODUCT</th>
									<th>QTY</th>
									<th>PRICE</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Your Item Name A</td>
									<td>1</td>
									<td>P 200.00</td>
								</tr>
								<tr>
									<td>Your Item Name B</td>
									<td>1</td>
									<td>P 300.00</td>
								</tr>
								<tr>
									<td>Your Item Name C</td>
									<td>1</td>
									<td>P 150.00</td>
								</tr>
							</tbody>
							<tbody>
								<tr><td></td></tr>
								<tr><td></td></tr>
								<tr>
									<td></td>
									<td class="text-right"><b>Subtotal</b></td>
									<td>P 650.00</td>
								</tr>
								<tr>
									<td></td>
									<td class="text-right"><b>Shipping Fee</b></td>
									<td>P 50.00</td>
								</tr>
								<tr>
									<td></td>
									<td class="text-right"><b>Total</b></td>
									<td class="total">P 700.00</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<div class="col-md-12">
			<div class="hold-container">
				<div class="hold-header">How do you <span>want to pay?</span></div>
				<div class="hold-content match-height">
					<div class="pay">
						<div class="pay-holder">
							<div class="col-md-6">
								<table>
									<tbody>
										<tr>
											<td class="ray"><input type="radio"></td>
											<td>
												<div class="input-holder">
													<input type="text" class="form-control input-sm ccn" placeholder="Credit Card Number">
													<input type="text" class="form-control input-sm date" placeholder="Month">
													<input type="text" class="form-control input-sm date" placeholder="Year">
													<input type="text" class="form-control input-sm date" placeholder="CVV">
												</div>
											</td>
										</tr>
										<tr>
											<td></td>
											<td class="card-holder"><img class="img-responsive" src="/themes/{{ $shop_theme }}/img/cards.png"></td>
										</tr>

										<tr>
											<td class="ray"><input type="radio"></td>
											<td>
												<div id="upload-proof"><span id="upload-title">UPLOAD PROOF OF PAYMENT</span><span id="upload-button"><button>UPLOAD</button></span></div>	
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							
								<div class="col-md-6">
									<div class="payment-type">
										<div class="col-md-4">
											<table>
												<tbody>
													<tr>
														<td class="ray"><input type="radio"></td>
														<td><img class="img-responsive" src="/themes/{{ $shop_theme }}/img/paypal.png"></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="col-md-4">
											<table>
												<tbody>
													<tr>
														<td class="ray"><input type="radio"></td>
														<td><div class="name">BANK DEPOSIT</div></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div class="col-md-4">
											<table>
												<tbody>
													<tr>
														<td class="ray"><input type="radio"></td>
														<td><div class="name">REMITTANCE</div></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
						
						</div>
					</div>

					<div class="upload-container">
						<div class="row clearfix">
							<div class="col-md-8">
								
							</div>
							<div class="col-md-4">
							
							</div>
						</div>
					</div>

					<div class="text-right">
					<button id="placeorder-button" type="button" onClick="location.href='/order_placed'">PLACE ORDER</button>
					</div>

				</div>
			</div>
		</div>
	</div>
	<div style="margin-bottom: 50px;"></div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/checkout.css">
@endsection

