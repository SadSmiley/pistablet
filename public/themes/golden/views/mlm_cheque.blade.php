@extends('mlm_layout')
@section('content')
<div class="row">
	<div class="col-md-12">
		<div class="panel panel-default panel-block panel-title-block" id="top">
			<div class="panel-heading">
				<div>
					<i class="icon-shopping-cart"></i>
					<h1>
					<span class="page-title">Report</span>
					<small>
					Pay Cheque
					</small>
					</h1><br />
				
				</div>
			</div>
		</div>
		<hr>
		<div class="col-md-12">	<div class="alert alert-warning"><h4>Note:</h4>Minimum Cashout: , Proccessing Fee for checkout is -  and Withholding Tax -  % </div></div>
		    @if (Session::has('error'))
		                           <div class="col-md-12 alert alert-danger">{{ Session::get('error') }}</div>
		    @endif
		    <table class="table table-responsive table-condensed">
    		    <th>Current Wallet</th>
    		    <th></th>
    		    <th></th>
    		    <tbody>
                @if(isset($_slot))
    		        @if($_slot->slot_wallet_from_paycheque)
    		        <form method="post" action="/distributor/cheque/converttopaycheque"> 
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<input type="hidden" name="slot" value="{{$_slot->slot_id}}">
    		        <tr>
    		            <td>{{ currency($_slot->slot_wallet_from_paycheque, 2)}}</td>
    		            <td><input type="number" value="0" name="amount" class="form-control" /></td>
    		            <td> <button class="btn btn-success col-md-12" @if($_slot->slot_wallet_from_paycheque == 0) disabled="disabled" @endif >Convert To Paycheque</button></td>
    		        </tr>
    		        </form>
    		        @else
    		        <tr>
    		            <td>{{ currency(0, 2)}}</td>
    		            <td></td>
    		            <td> <button class="btn btn-success" disabled="disabled">Convert To Paycheque</button></td>
    		        </tr>
    		        @endif
    		    </tbody>
                @endif
    		</table>
		
		<form method="POST">
			<div class="panel panel-default panel-block">
				<div class="list-group">
					<div class="list-group-item" id="responsive-bordered-table">
						<div class="form-group">
							<div class="table-responsive">
								@if (Session::has('message'))
		                           <div class="alert alert-success">{{ Session::get('message') }}</div>
		                        @endif
								<table class="table table-bordered table-striped table-condensed table-responsive">
									<thead class="">
										<tr>
											<th class="center">REF NO.</th>
											<th class="center">DATE PROCESSED</th>
											<th class="center">NAME</th>
											<th class="center">REQUESTED</center>
											<th class="center">PAYMENT RELEASED</th>
											<th class="center">AMOUNT</th>
                                            <th class="center">FEE</th>
											<th class="center"></th>
											<th class="center"></th>
											<th class="center"></th>
										</tr>
									</thead>
									<tbody>
										@if(isset($_pay_cheque))
										@foreach($_pay_cheque as $pay_cheque)
										<tr>
											
											<td class="center">{{ formatslot($pay_cheque->pay_cheque_id) }}</td>
                                            @if($pay_cheque->pay_cheque_processed == 0)
											<td class="center">Not yet processed</td>
                                            @else
                                            <td class="center">{{ date("F d, Y", strtotime($pay_cheque->pay_cheque_batch_date)) }}<br>{{ date("h:i A", strtotime($pay_cheque->pay_cheque_batch_date)) }}</td>
											@endif
                                            <td class="center">{{ strtoupper($pay_cheque->pay_cheque_batch_reference) }}</td>
											<td class="center"><input type="checkbox" disabled="disabled" @if($pay_cheque->pay_cheque_requested == 2){{'checked'}}@endif></td>
											<td class="center"><input type="checkbox" disabled="disabled" @if($pay_cheque->pay_cheque_processed == 1){{'checked'}}@endif></td>
											<td class="center" style="color: green">{{ currency($pay_cheque->pay_cheque_amount) }}   </td>
                                            <td class="center" style="color:green">{{currency($pay_cheque->withholding_tax + $pay_cheque->processing_fee)}}</td>
											<td class="center"><a target="_blank" href="/distributor/cheque/{{ $pay_cheque->pay_cheque_id }}">VIEW REPORT</a></td>
											<td class="center">
												<form method="post" action="/distributor/encash"> 
					                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
					                                 <input type="hidden" name="method" value="{{$pay_cheque->pay_cheque_id}}">
					                                <!--<button class="btn btn-primary col-md-12" disabled="disabled" @if($pay_cheque->pay_cheque_requested == 2) disabled="disabled" @endif>Request</button>-->
					                            	<label class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" onClick="changepaymentmethod({{$pay_cheque->pay_cheque_id}})" @if($pay_cheque->pay_cheque_requested == 2) disabled="disabled" @endif >Request</button>
					                            </form>
                            				</td>
                            				<td class="center">
                            				    <form method="post" action="/distributor/cheque/wallet"> 
					                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
					                                <input type="hidden" name="slot_id" value="@if(isset($slotnow->slot_id)){{$slotnow->slot_id}}@endif">
					                                <input type="hidden" name="paycheque_id" value="{{$pay_cheque->pay_cheque_id}}">
					                                <button class="btn btn-primary col-md-12 bind"  @if($pay_cheque->pay_cheque_requested == 2) disabled="disabled"  @endif @if($pay_cheque->pay_cheque_batch_id == 0) disabled="disabled" @endif>Convert To Wallet</button>
					                            </form>
                            				</td>
										</tr>
										@endforeach
										
										@else
										<tr>
											<td colspan="3"><center>No Pay Cheque</center></td>
										</tr>
										@endif
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel"> Payment Option</h4>
      </div>
      <div class="modal-body">
        <div class="tab-pane scrollable list-group <?php echo (isset($_GET["tab"]) && !isset($_GET["tabpw"])  && !Request::input('wallet') && !Request::input('gc')? "active" : ""); ?>" id="user-settings">
                <!--<form method="POST" id="updatebank" action="/distributor/updatebankdeposit">-->
                	 <form method="post" action="/distributor/encash"> 
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="list-group-item form-horizontal">
                        <div class="form-group">
                            <div class="form-group-addon">
                    
                            </div>
                            <label for="email" class="col-md-2 control-label">Bank</label>
                            <div class="col-md-10">
                                <select name="encashmentselect" id="encashmentselect" class="form-control" style="font-family: 'Titillium Web',sans-serif !important;">
                                    <option value="1">Bank Deposit</option>
                                    <option value="2">Cheque</option>
                                </select>
                            </div>
                        </div>
                        @if(isset($cheque_info))
                        <input type="hidden" value="{{ $chequeinfo='1'}}">
                        <input type="hidden" value="{{ $chequename=$cheque_info->cheque_name}}">
                        @else
                        <input type="hidden" value="{{ $chequeinfo='null'}}">
                        <input type="hidden" value="{{ $chequename='null'}}">
                        @endif
                        <input type="hidden" id="cheque" value="{{$chequeinfo}}">
                        <input type="hidden" id="chequename" value="{{$chequename}}">

                        @if(isset($bank_info))
                        <input type="hidden" value="{{ $bankinfo='1'}}">
                        <input type="hidden" value="{{ $bankname=$bank_info->bank_name}}">
                        <input type="hidden" value="{{ $bankbranch=$bank_info->bank_branch}}">
                        <input type="hidden" value="{{ $bankaccountname=$bank_info->bank_account_name}}">
                        <input type="hidden" value="{{ $bankaccountnumber=$bank_info->bank_account_number}}">
                        @else
                        <input type="hidden" value="{{ $bankinfo='null'}}">
                        <input type="hidden" value="{{ $bankname='-'}}">
                        <input type="hidden" value="{{ $bankbranch='-'}}">
                        <input type="hidden" value="{{ $bankaccountname='-'}}">
                        <input type="hidden" value="{{ $bankaccountnumber='-'}}">
                        @endif
                        <input type="hidden" id="bank" value="{{$bankinfo}}">
                        <input type="hidden" id="bankname" value="{{$bankname}}">
                        <input type="hidden" id="bankbranch" value="{{$bankbranch}}">
                        <input type="hidden" id="bankaccountname" value="{{$bankaccountname}}">
                        <input type="hidden" id="bankaccountnumber" value="{{$bankaccountnumber}}">

                        <div class="encashment-holder">
                            @if(isset($member->account_encashment_type))
                            @if($member->account_encashment_type == 1)
                            <div class="form-group">
                                <div class="form-group-addon">
                            @if(isset($bank_info->bank_name))
                                <?php $bankname = $bank_info->bank_name; ?>
                            @else
                                <?php $bankname = 'RCBC'; ?>
                            @endif
                            </div>
                                <label for="email" class="col-md-2 control-label">Bank Name</label>
                                <div class="col-md-10">
                                    <select name="bankselect" class="form-control">
                                        <option value="BDO" <?php if($bankname=="BDO"){ echo "selected";} ?>>BDO</option>
                                        <option value="Metrobank" <?php if($bankname=="Metrobank"){ echo "selected";} ?>>Metrobank</option>
                                        <option value="BPI" <?php if($bankname=="BPI"){ echo "selected";} ?>>BPI</option>
                                        <option value="PNB" <?php if($bankname=="PNB"){ echo "selected";} ?>>PNB</option>
                                        <option value="Security Bank" <?php if($bankname=="Security Bank"){ echo "selected";} ?>>Security Bank</option>
                                        <option value="Chinabank" <?php if($bankname=="Chinabank"){ echo "selected";} ?>>Chinabank</option>
                                        <option value="RCBC" <?php if($bankname=="RCBC"){ echo "selected";} ?>>RCBC</option>
                                        <option value="UCPB" <?php if($bankname=="UCPB"){ echo "selected";} ?>>UCPB</option>
                                        <option value="EastWest Bank" <?php if($bankname=="EastWest Bank"){ echo "selected";} ?>>EastWest Bank</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="website" class="col-md-2 control-label">Bank Branch</label>
                                <div class="col-md-10">
                                    <input name="bank-branch" id="bank-branch" class="form-control" value="{{$bankbranch}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="fb" class="col-md-2 control-label">Bank Account Name</label>
                                <div class="col-md-10">
                                    <input name="bank-account-name" id="bank-account-name" class="form-control" value="{{$bankaccountname}}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="fb" class="col-md-2 control-label">Bank Account Number</label>
                                <div class="col-md-10">
                                    <input name="bank-account-id" id="bank-account-id" class="form-control" value="{{$bankaccountnumber}}">
                                </div>
                            </div>
                            @else
                            <div class="form-group">
                                <label for="email" class="col-md-2 control-label">Name on Cheque</label>
                                <div class="col-md-10">
                                    <input name="cheque-name" id="cheque-name" class="form-control" value="{{$chequename}}">
                                </div>
                            </div><br>
                            @endif
                            @endif 
                        </div>
                       <div class="form-group">
                            <div class="col-md-12 pull-right text-right">
                                <!--<button class="btn btn-success" id="updateprofile">Change Payment Option</button>-->
                            </div>
                        </div>

                      
                    </div>
                <!--</form>-->
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary col-md-6" data-dismiss="modal">Close</button>
       
	        <input type="hidden" name="_token" value="{{ csrf_token() }}">
	         <input type="hidden" name="method" value="" id="enchashid">
	         <input type="hidden" name="payment_type" value="1" id="payment_type"> 
	    	<button class="btn btn-primary col-md-6">Request</button>
	    </form>
        <!--<button type="button" class="btn btn-primary">Confirm</button>-->
      </div>
    </div>
  </div>
</div>
 
@endsection
@section('js')
 <script type="text/javascript">
 $(".bind").click(function(){
   $(".bind").addClass('disabled'); 
});
 function changepaymentmethod(id) {
 	$('#enchashid').val(id);
 	var encashmentvalue = $("#encashmentselect").val();
    $("#payment_type").val(encashmentvalue);
 }
                        $("#encashmentselect").change(function()
                        {
                            var cheque = $("#cheque").val();
                            var chequename = $("#chequename").val();

                            var bank = $("#bank").val();
                            var bankname = $("#bankname").val();
                            var bankbranch = $("#bankbranch").val();
                            var bankaccountname = $("#bankaccountname").val();
                            var bankaccountnumber = $("#bankaccountnumber").val();
                            
                            var encashmentvalue = $("#encashmentselect").val();
                            $("#payment_type").val(encashmentvalue);
                            if(encashmentvalue == 1)
                            {
                                if(bank != null)
                                {
                                var encashmentdata = '<div class="form-group"><div class="form-group"><div class="form-group-addon"></div><label for="email" class="col-md-2 control-label">Bank Name</label><div class="col-md-10"><select name="bankselect" class="form-control"><option value="BDO" <?php if($bankname=="BDO"){ echo "selected";} ?>>BDO</option><option value="Metrobank" <?php if($bankname=="Metrobank"){ echo "selected";} ?>>Metrobank</option>option value="BPI" <?php if($bankname=="BPI"){ echo "selected";} ?>>BPI</option><option value="PNB" <?php if($bankname=="PNB"){ echo "selected";} ?>>PNB</option><option value="Security Bank" <?php if($bankname=="Security Bank"){ echo "selected";} ?>>Security Bank</option><option value="Chinabank" <?php if($bankname=="Chinabank"){ echo "selected";} ?>>Chinabank</option><option value="RCBC" <?php if($bankname=="RCBC"){ echo "selected";} ?>>RCBC</option><option value="UCPB" <?php if($bankname=="UCPB"){ echo "selected";} ?>>UCPB</option><option value="EastWest Bank" <?php if($bankname=="EastWest Bank"){ echo "selected";} ?>>EastWest Bank</option></select></div></div><div class="form-group"><label for="website" class="col-md-2 control-label">Bank Branch</label><div class="col-md-10"><input name="bank-branch" id="bank-branch" class="form-control" value="'+bankbranch+'"></div></div><div class="form-group"><label for="fb" class="col-md-2 control-label">Bank Account Name</label><div class="col-md-10"><input name="bank-account-name" id="bank-account-name" class="form-control" value="'+bankaccountname+'"></div></div><div class="form-group"><label for="fb" class="col-md-2 control-label">Bank Account Number</label><div class="col-md-10"><input name="bank-account-id" id="bank-account-id" class="form-control" value="'+bankaccountnumber+'"></div></div>'
                                }
                                else
                                {
                                    var encashmentdata = '<div class="form-group"><label for="email" class="col-md-2 control-label">Bank Name</label><div class="col-md-10"><input name="bank-name" id="bank-name" class="form-control" value="-"></div></div><div class="form-group"><label for="website" class="col-md-2 control-label">Bank Branch</label><div class="col-md-10"><input name="bank-branch" id="bank-branch" class="form-control" value="-"></div></div><div class="form-group"><label for="fb" class="col-md-2 control-label">Bank Account Name</label><div class="col-md-10"><input name="bank-account-name" id="bank-account-name" class="form-control" value="-"></div></div><div class="form-group"><label for="fb" class="col-md-2 control-label">Bank Account Number</label><div class="col-md-10"><input name="bank-account-id" id="bank-account-id" class="form-control" value="-"></div></div>'
                                }
                            }
                            else
                            {
                                if(cheque != "null")
                                {
                                var encashmentdata = '<div class="form-group"><label for="email" class="col-md-2 control-label">Name on Cheque</label><div class="col-md-10"><input name="cheque-name" id="cheque-name" class="form-control" value="'+chequename+'"></div></div><br>'
                                }
                                else
                                {
                                    var encashmentdata = '<div class="form-group"><label for="email" class="col-md-2 control-label">Name on Cheque</label><div class="col-md-10"><input name="cheque-name" id="cheque-name" class="form-control" value=""></div></div><br>'
                                }
                            }
                            $(".encashment-holder").html("");
                            $(".encashment-holder").html(encashmentdata);
                        });
                        </script>
@endsection