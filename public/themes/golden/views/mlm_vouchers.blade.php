@extends('mlm_layout')
@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default panel-block panel-title-block" id="top">
            <div class="panel-heading">
                <div>
                    <i class="icon-barcode"></i>
                    <h1>
                        <span class="page-title">Vouchers</span>
                    </h1>
                </div>
            </div>
        </div>
        <div class="panel panel-default panel-block">
            <div class="list-group">
                @if(isset($_voucher))
	                @if($_voucher)
	                <div class="list-group-item" id="responsive-bordered-table">
	                    <!-- UNUSED CODE -->
	                    @if($_voucher)
	                    <div class="form-group">
	                        <!--<h4 class="section-title">Unused Codes</h4>-->
	                        <div class="table-responsive">
	                            <table class="table table-bordered table-striped">
	                                <thead class="">
	                                    <tr>
						                    <th>Voucher Reference No.</th>
						                    <th data-hide="phone">Voucher Code.</th>
						                    <th data-hide="phone,phonie">Claimed</th>
						                    <th data-hide="phone">Total Amount</th>
						                    <th data-hide="phone,phonie"></th>
						                </tr>
	                                </thead>
	                                <tbody>                 
	                                    @if($_voucher)
						                    @foreach ($_voucher as $voucher)  
						                        <tr class="tibolru">
						                            <td>{{$voucher->voucher_id}}</td>
						                            <td>{{$voucher->voucher_code}}</td>
						                            <td><div class="check"><input disabled type="checkbox" style="width:20px;height:20px; margin-left:40%;" {{$voucher->voucher_claim_status == 1  ? 'checked' : '' }}><div class="bgs"></div></div></td>
						                            <td>{{$voucher->total_amount}}</td>
						                            <td><a href="#voucher" class="view-voucher" voucher-id="{{$voucher->voucher_id}}">View Voucher</a></td>
						                        </tr>
						                    @endforeach
						                @endif
	                                </tbody>
	                            </table>
	                        </div>
	                    </div>
	                    @endif
	                </div>
	                @endif
                @endif
            </div>   
        </div>
    </div>
</div>
<div id="section-to-print" class="remodal" data-remodal-id="view-voucher-product" data-remodal-options="hashTracking: false, closeOnOutsideClick: false">
    <img class="voucher_preloader" src="/resources/assets/img/preloader_cart.png" style="display:none;">
    <div id="view-voucher-product-container" class="">

    </div>
</div>
<style type="text/css">
    @media print {
      body * {
        visibility: hidden;
      }
      #section-to-print, #section-to-print * {
        visibility: visible;
      }
      #section-to-print {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .voucher_preloader
    {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 99;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    div[data-remodal-id="view-voucher-product"]
    {
        min-height:  491px;
        position: relative;
    }
</style>

@endsection