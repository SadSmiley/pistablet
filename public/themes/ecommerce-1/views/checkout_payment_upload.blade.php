@extends('layout')
@section('content')
<div class="container" style="margin: 25px auto; background-color: #fff; padding: 25px;">
	<form method="post" enctype="multipart/form-data">
	<input type="hidden" name="_token" value="{{ csrf_token() }}">
		<div class="row clearfix">
			<div class="col-md-8">
				<div style="font-size: 18px; margin-bottom: 15px; font-weight: 700;">Upload Proof of Payment</div>
				<div class="input-group">
		            <span class="input-group-btn">
		                <span class="btn btn-default btn-file">
		                    Browse… <input type="file" name="payment_upload" id="imgInp">
		                </span>
		            </span>
		            <input type="text" class="form-control" readonly>
		        </div>
		        <img style="max-width: 500px;" id='img-upload'/>
			</div>
			<div class="col-md-4">
				<div style="max-width: 500px; margin: auto;">
					<div style="font-size: 18px; margin-bottom: 15px; font-weight: 700;">Order Summary</div>
					@if (count($errors) > 0)
					    <div class="alert alert-danger">
					        <ul style="padding: 0 20px;">
					            @foreach ($errors->all() as $error)
					                <li>{{ $error }}</li>
					            @endforeach
					        </ul>
					    </div>
					@endif
					@if (session('fail'))
					    <div class="alert alert-danger">
					        <ul style="padding: 0 20px;">
				                <li>{{ session('fail') }}</li>
					        </ul>
					    </div>
					@endif
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
					<button class="btn btn-primary" type="submit">Submit</button>
				</div>
			</div>
		</div>
	</form>
</div>
@endsection
@section('js')
<script type="text/javascript">
$(document).ready( function() {
	$(document).on('change', '.btn-file :file', function() {
	var input = $(this),
		label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	input.trigger('fileselect', [label]);
	});

	$('.btn-file :file').on('fileselect', function(event, label) {
	    
	    var input = $(this).parents('.input-group').find(':text'),
	        log = label;
	    
	    if( input.length ) {
	        input.val(log);
	    } else {
	        if( log ) alert(log);
	    }
    
	});
	function readURL(input) {
	    if (input.files && input.files[0]) {
	        var reader = new FileReader();
	        
	        reader.onload = function (e) {
	            $('#img-upload').attr('src', e.target.result);
	        }
	        
	        reader.readAsDataURL(input.files[0]);
	    }
	}

	$("#imgInp").change(function(){
	    readURL(this);
	}); 	
});
</script>
@endsection
@section("css")
<style type="text/css">
.btn-file 
{
    position: relative;
    overflow: hidden;
}
.btn-file input[type=file] 
{
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
}

#img-upload
{
    width: 100%;
}
</style>
@endsection
