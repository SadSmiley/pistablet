@extends('account_layout')
@section('account_content')
<div class="ordered">
 	@if(Session::has('errors'))
 		<div class="hide" id="errors">
	 		<ul>
		 		@foreach(Session::get('errors') as $error)
		 			<li style="list-style:disc;">{{$error}}</li>
		 		@endforeach
	 		</ul>
 		</div>
 	@endif
 	<div class="order-header"><span><i class="fa fa-shopping-cart"></i>Order</span> List</div>
	<div class="order-container">            
		<div class="order-list" id="no-more-tables">
			<table>
				<thead>
					<tr>
						<td>No.</td>
						<td>Order Date</td>
						<td>Amount</td>
						<td>Shipping Status</td>
						<td>Payment Status</td>
						<td>Proof Image</td>
                        <td>Tracking Button</td>
						<td style="width: 1%;"></td>
						<td style="width: 1%;"></td>                        
					</tr>
				</thead>
				<tbody>
                    @if(count($_order) > 0)
    					@foreach($_order as $order)
                        <tr>
                            <td data-title="No." class="">ORD{{ $order->ec_order_id }}</td>
                            <td data-title="Order Date">{{ date("m/d/y", strtotime($order->created_date)) }}</td>
                            <td data-title="Amount">P {{ number_format($order->total, 2) }}</td>
                            <td data-title="Shipping Status">{{ $order->order_status }}</td>
                            <td data-title="Payment Status">{{ $order->payment_status == 1 ? "Paid" : "Unpaid" }}</td>
                            <td data-title="Proof Image"><a order-id="1" class="add-proof">Add</a></td>
                            @if($order->tracking_no)
                                <td>
                                    <div class="as-track-button" data-size="small" data-domain="bryanxkier.aftership.com"  data-tracking-number="{{ $order->tracking_no }}"  data-hide-tracking-number="true">
                                    </div>
                                </td>
                            @else
                                <td>None</td>
                            @endif 
                            <td><a href="/account/invoice/{{ $order->ec_order_id }}" target="_blank">Invoice</a></td>
                            <td><a href="/account/order?cancel_id={{ $order->ec_order_id }}">Cancel</a></td>                           
                        </tr>
                        @endforeach
                    @else
                        <tr>
                            <td colspan="8">No Orders</td>
                        </tr>
                    @endif
				</tbody>
			</table>
		</div>
	</div>
</div>
<div id="add-proof-popup" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header alert alert-info">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Add Proof of Payment</h4>
      </div>
      <div class="modal-body">
		<form enctype="multipart/form-data" action="account/order/upload" method="post">
		  <div class="form-group">
		  	<p class="err alert alert-danger" style="display:none">Select file to upload.</p>
		  	<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />
		  	<input type="hidden" name="order-id" value="" id="order-id">
		    <label for="filefield">File input</label>
		    <input type="file" id="filefield" name="filefield">
		  </div>
		</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="add-proof-popup-submit" type="button" class="btn btn-primary">Save</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
@endsection
@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/profile.css">
<style type="text/css">
@media only screen and (max-width: 800px) {
        /* Force table to not be like tables anymore */
        #no-more-tables table,
        #no-more-tables thead,
        #no-more-tables tbody,
        #no-more-tables th,
        #no-more-tables td,
        #no-more-tables tr {
        display: block;
        }
         
        /* Hide table headers (but not display: none;, for accessibility) */
        #no-more-tables thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
        }
         
        #no-more-tables tr { border: 1px solid #ccc; }
          
        #no-more-tables td {
        /* Behave like a "row" */
        border: none;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 50%;
        white-space: normal;
        text-align:left;
        }
         
        #no-more-tables td:before {
        /* Now like a table header */
        position: absolute;
        /* Top/left values mimic padding */
        top: 6px;
        left: 6px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        text-align:left;
        font-weight: bold;
        }
         
        /*
        Label the data
        */
        #no-more-tables td:before { content: attr(data-title); }
        }
</style>
@endsection
@section('script')

<script>
	$('tr:odd').css('background-color', '#f2f4f6');
	$('tr:even').css('background-color', 'white');


(function(e,t,n){var r,i=e.getElementsByTagName(t)[0];if(e.getElementById(n))return;
r=e.createElement(t);r.id=n;r.src="//button.aftership.com/all.js";i.parentNode.insertBefore(r,i)})(document,"script","aftership-jssdk")

</script>
<script type="text/javascript" src="resources/assets/rutsen/js/account_order.js"></script>
@endsection

