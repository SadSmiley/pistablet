@extends('layout')
@section('content')
<form method="post">
	 {{ csrf_field() }}
	<div class="container">
		<div class="payment-container">
			<h2>Choose Payment Method</h2>
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
				<div class="col-md-8">
					<div class="holder-holder">
						@if(count($_payment_method) != 0)
							@foreach($_payment_method as $payment_method)
								<div class="choose-payment-method holder" method_id="{{ $payment_method->method_id }}" description="{{ $payment_method->link_description }}">
									<div class="match-height" style="line-height: 12.5px;">{{ $payment_method->method_name }}</div>
									<div class="image" style="margin-top: 7.5px;">
										<img src="{{ $payment_method->image_path ? $payment_method->image_path : '/assets/front/img/default.jpg' }}">
									</div>
									<div class="radio" style="margin-bottom: 0;">
										<label >
									  		<input class="radio" type="radio" name="payment_method_id" value="{{ $payment_method->method_id }}">
										</label>
									</div>
								</div>
							@endforeach	
						@else
							<div class="text-center"><h3>No Payment Method Available</h3></div>
						@endif
					</div>
					<div class="details clearfix">
						<div class="detail-holder">
							{{-- <div class="details-title">Upload Proof of Payment</div>
							<button class="btn btn-primary" id="upload-button" type="button" onClick="$('.payment-upload-file').trigger('click');">UPLOAD</button>
							<input onChange="$('.upload-name').text($(this).val().split('\\').pop());" class="hide payment-upload-file" type="file" name="payment_upload">
							<div class="upload-name"></div> --}}
							<div class="details-text">Kindly choose a peyment method which you are most comfortable with paying.</div>
							<div class="details-order">
								<button class="btn btn-primary">PLACE YOUR ORDER</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 order-summary-container"><img style="height: 50px; margin: auto;" src="/assets/front/img/loader.gif"></div>
			</div>
		</div>
	</div>
</form>
@endsection

@section('js')
<script type="text/javascript">


var checkout_form_payment = new checkout_form_payment();

function checkout_form_payment()
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
		event_choose_payment_method();
		action_load_sidecart();
		action_match_height();

	}
	function event_choose_payment_method()
	{
		$(".choose-payment-method").unbind("click");
		$(".choose-payment-method").bind("click", function(e)
		{
			$(".checkout-summary .loader-here").removeClass("hidden");
			$(e.currentTarget).find(".radio").prop("checked", true);

			var description = $(e.currentTarget).attr("description");
			$(".details-text").html(description);

			var method_id = $(e.currentTarget).attr("method_id");
			$.ajax(
			{
				url:"/checkout/method",
				datatype:"json",
				type:"get",
				data:{method_id:method_id},
				success: function(data)
				{
					action_load_sidecart();
				}
			});

		});
	}
	function action_match_height()
	{
		$('.match-height').matchHeight();
	}
	function action_load_sidecart()
	{
		$(".order-summary-container").load("/checkout/side");
	}
}


</script>
@endsection

@section('css')
<link rel="stylesheet" href="/themes/{{ $shop_theme }}/css/checkout_payment.css">
@endsection