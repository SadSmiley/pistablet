@extends('layout')
@section('content')
<div class="container checkout">
	<div class="row clearfix">
		<div class="col-md-12 text-center">
			<img src="/resources/assets/img/checkout.jpg">
		</div>
		<div class="col-md-8">
			<div class="checkout-form">
				<form id="check-out" method="post">
					<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />
					<div class="fieldset">
						<div class="title col-md-12">Shipping Details</div>
					</div>

					@if(session("error"))
					    <div class="alert alert-danger">
					        <ul>
					        	<li>{{ session("error") }}</li>
					        </ul>
					    </div>
					@endif

					@if(!$customer_info_a)
					<div class="fieldset">
						<label class="col-md-4">First and Last Name</label>
						<div class="field col-md-8">
							<input  class="form-control" type="text" name="full_name" value="{{ old('full_name') }}">
						</div>
					</div>
					@endif

					<div class="fieldset">
						<label class="col-md-4">Province</label>
						<div class="field col-md-8">
							<select firstload="true" default="{{ old('customer_state') }}" class="form-control load-location" name="customer_state" level="1"></select>
						</div>
					</div>
					<div class="fieldset">
						<label class="col-md-4">City / Municipality</label>
						<div class="field col-md-8">
							<select firstload="true" default="{{ old('customer_city') }}" class="form-control load-location" name="customer_city" level="2">
								<option></option>
							</select>
						</div>
					</div>
					<div class="fieldset">
						<label class="col-md-4">Barangay</label>
						<div class="field col-md-8">
							<select firstload="true" default="{{ old('customer_zip') }}" class="form-control load-location" name="customer_zip" level="3">
								<option></option>
							</select>
						</div>
					</div>
					<div class="fieldset">
						<label class="col-md-4">Street</label>
						<div class="field col-md-8">
							<textarea spellcheck="false" class="form-control" name="customer_street">{{ Request::old('customer_street') }}</textarea>
						</div>
					</div>

					<div class="fieldset">
						<label class="col-md-4">Contact Number</label>
						<div class="field col-md-8">
							<input  maxlength="11" class="form-control" type="text" name="contact_number" value="{{ Request::input('customer_mobile') }}">
						</div>
					</div>

					<div class="fieldset text-right btn-container">
						<div class="col-md-12">
							<button class="btn btn-primary">NEXT <i class="fa fa-angle-double-right"></i></button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<!-- CART HERE -->
		<div class="col-md-4 order-summary-container">
		</div>
	</div>
</div>

@endsection

@section('script')
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

@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/checkout.css">
@endsection