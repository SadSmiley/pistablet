@extends("layout")
@section("content")

<form method="post" enctype="multipart/form-data">
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
			{{-- <div class="col-md-7">
				<div class="hold-container">
					<div class="hold-header">HOW DO YOU WANT TO PAY?</div>
					<div class="hold-content match-height">
						<div class="pay">
							<div class="pay-holder">
								<table>
									<tbody>
										@if(isset($_payment_method) && count($_payment_method) > 0)
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
												@elseif($payment_method->link_reference_name == "other")
													<tr>
														<td class="ray"><input name="payment_method_id" value="{{ $payment_method->method_id }}" type="radio"></td>
														<td>
															<div class="name">{{ $payment_method->other_name }}</div>
															<div class="description" style="white-space: pre-wrap;">{{ $payment_method->other_description }}</div>
														</td>
													</tr>
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

						<div class="upload-container hide">
							<div class="row clearfix">
								<div class="col-md-8">
									<div id="upload-proof">UPLOAD PROOF OF PAYMENT</div>
								</div>
								<div class="col-md-4">
								<div>
									<button id="upload-button" type="button" onClick="$('.payment-upload-file').trigger('click');">UPLOAD</button>
									<input onChange="$('.upload-name').text($(this).val().split('\\').pop());" class="hide payment-upload-file" type="file" name="payment_upload">
									<div class="upload-name"></div>
								</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div> --}}
			<div class="col-md-7">
				<div class="hold-container">
					<div class="hold-header">DELIVERY INFORMATION</div>
					<div class="hold-content">
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
								<div class="col-md-12">
									@if(!$customer_info_a)
									<div class="form-group">
										<label>First and Last Name</label>
										<input value="{{ old('full_name') }}" type="text" name="full_name" class="form-control">
									</div>
									@endif
									<div class="form-group">
										<label>Province</label>
										<select firstload="true" default="{{ old('customer_state') }}" class="form-control load-location" name="customer_state" level="1"></select>
									</div>
									<div class="form-group">
										<label>City / Municipality</label>		
										<select firstload="true" default="{{ old('customer_city') }}" class="form-control load-location" name="customer_city" level="2">
											<option></option>
										</select>
									</div>
									<div class="form-group">
										<label>Barangay</label>
										<select firstload="true" default="{{ old('customer_zip') }}" class="form-control load-location" name="customer_zip" level="3">
											<option></option>
										</select>
									</div>
									<div class="form-group">
										<label>Street</label>
										<textarea spellcheck="false" class="form-control" name="customer_street">{{ Request::old('customer_street') }}</textarea>
									</div>
									<div class="form-group">
										<label>Contact Number</label>
										<input  maxlength="11" class="form-control" type="text" name="contact_number" value="{{ Request::input('customer_mobile') }}">
									</div>
									<input type="hidden" name="ec_order_load" value="{{$ec_order_load}}">
									@if($ec_order_load == 1)
									<div class="form-group">
										<label>LOAD TO: (Number)</label>
										<input value="{{ Request::old('ec_order_load_number') }}" name="ec_order_load_number" type="text" class="form-control">
									</div>
									@else
									<div class="form-group">
										<input value="{{ Request::old('ec_order_load_number') }}" name="ec_order_load_number" type="text" class="form-control hide">
									</div>
									@endif
									{{-- <input type="hidden" name="ec_order_merchant_school" value="{{$ec_order_merchant_school}}">
									@if($ec_order_merchant_school >= 1)
										@for($i = 0; $i < $ec_order_merchant_school; $i++ )	
											@if(isset($ec_order_merchant_school_item[$i]))
												<input type="hidden" name="merchant_school_i_id[]" value="{{$ec_order_merchant_school_item[$i]}}">
											@endif
											<!-- <div class="form-group">
												<label>Student id:</label>
												<input type="text" class="form-control" name="merchant_school_s_id[]">
											</div>

											<div class="form-group">
												<label>Student Name:</label>
												<input type="text" class="form-control" name="merchant_school_s_name[]">
											</div> -->
										@endfor
									@endif --}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="text-right">
					<button id="placeorder-button" type="submit">BUY NOW</button>
				</div>
			</div>
			<div class="col-md-5 order-summary-container"><img style="height: 50px; margin: auto;" src="/assets/front/img/loader.gif"></div>
		</div>
		<div style="margin-bottom: 50px;"></div>
	</div>
</form>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/checkout.css">
@endsection

@section("js")
<script type="text/javascript">
var checkout_form = new checkout_form();
var ajax_load_location = null;
function checkout_form()
{
	init();
	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		});
	}
	function document_ready()
	{
		action_load_location(1, 0);
		action_load_sidecart();
		action_load_location();
		event_load_location_change();
	}

	function action_load_sidecart()
	{
		$(".order-summary-container").load("/checkout/side");
	}
	function action_load_location(level, parent)
	{
		if(level < 4)
		{
			$(".load-location[level=" + level + "]").html("<option>LOADING LOCATION</option>");

			var deflt;
			var firstload = false;

			/* GET DEFAULT ON FIRST LOAD */
			if($(".load-location[level=" + level + "]").attr("firstload") == "true")
			{
				$(".load-location[level=" + level + "]").attr("firstload", "false");
				firstload = true;
				deflt = $(".load-location[level=" + level + "]").attr("default");
			}

			if(ajax_load_location)
			{
				ajax_load_location.abort();
			}

			ajax_load_location = 	$.ajax(
									{
						            	url: '/checkout/locale?parent=' + parent,
						            	success: function(data)
						            	{
						            		$(".load-location[level=" + level + "]").html(data);

						            		if(deflt != "" && firstload == true)
						            		{
						            			$(".load-location[level=" + level + "]").val(deflt);
						            		}


						            		
						              		action_load_location(level+1, $(".load-location[level=" + (level) + "]").val());
						            	}
						          	});
		}
	}
	function event_load_location_change()
	{
		$(".load-location").change(function(e)
		{
			parent = $(e.currentTarget).val();
			level = parseInt($(e.currentTarget).attr("level")) + 1;
			action_load_location(level, parent);

			if($(e.currentTarget).attr("level") == 3)
			{
				$(".checkout-summary .loader-here").removeClass("hidden");
				action_load_sidecart();
			}

		});
	}
}
</script>
@endsection