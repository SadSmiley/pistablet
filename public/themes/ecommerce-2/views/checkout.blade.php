@extends("layout")
@section("content")
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
									<tr>
										<td class="ray"><input type="radio"></td>
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
									<tr>
										<td class="ray"><input type="radio"></td>
										<td>
											<img class="img-responsive" src="/themes/{{ $shop_theme }}/img/paypal.png">
										</td>
									</tr>
									<tr>
										<td class="ray"><input type="radio"></td>
										<td>
											<div class="name">BANK DEPOSIT</div>
										</td>
									</tr>
									<tr>
										<td class="ray"><input type="radio"></td>
										<td>
											<div class="name">REMITTANCE</div>
										</td>
									</tr>
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
				<div class="hold-header">DELIVERY INFORMATION</div>
				<div class="hold-content match-height">
					<div class="info">
						<div class="row clearfix">
							<div class="col-md-7">
								<div class="form-group">
									<label>FULL NAME</label>
									<input type="text" class="form-control">
								</div>
								<div class="form-group">
									<label>LAST NAME</label>
									<input type="text" class="form-control">
								</div>
								<div class="form-group">
									<label>CONTACT NUMBER</label>
									<input type="text" class="form-control">
								</div>
								<div class="form-group">
									<label>OTHER CONTACT INFORMATION</label>
									<input type="text" class="form-control">
								</div>
							</div>
							<div class="col-md-5">
								<div class="form-group">
									<label>SHIPPING METHOD</label>
									<input type="text" class="form-control">
								</div>
								<div class="form-group">
									<label>COMPLETE SHIPPING ADDRESS</label>
									<textarea class="form-control" style="height: 180px;"></textarea>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="text-right">
				<button id="placeorder-button" type="button" onClick="location.href='/order_placed'">PLACE ORDER</button>
			</div>
		</div>
	</div>
	<div style="margin-bottom: 50px;"></div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/checkout.css">
@endsection

