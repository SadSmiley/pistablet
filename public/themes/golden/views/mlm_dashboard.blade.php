@extends('mlm_layout')
@section('content')
<style type="text/css">
    .newsimage{
        width: 100%;
        height: 250px;
        min-height: 250px;
        max-height: 250px;
    }
</style>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/themes/{{ $shop_theme }}//resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>


<div class="row">
    <div class="col-md-6 col-lg-8">
        <div class="panel panel-default panel-block panel-title-block">
            <div class="panel-heading clearfix">
                <div class="avatar">
                    @if(isset($member->image))
                    @if($member->image != "")
                    <img src="{{$member->image}}">
                    @else
                    <img src="/themes/{{ $shop_theme }}/resources/assets/img/default-image.jpg">
                    @endif
                    @endif
                    <div class="overlay">
                        <div class="controls clearfix">
                            <a href="javascript:;"><i class="icon-search"></i></a>
                            <a href="javascript:;"><i class="icon-undo"></i></a>
                            <a class="edit-item" href="javascript:;"><i class="icon-pencil"></i></a>
                            <a class="trash-item" href="javascript:;"><i class="icon-trash"></i></a>
                        </div>
                        <div class="controls confirm-removal clearfix">
                            <a class="remove-item" href="javascript:;">YES</a>
                            <a class="remove-cancel" href="javascript:;">NO</a>
                        </div>
                    </div>
                </div>
                <span class="title">Account Name</span>
                <small>
                    Your date of registration is <b>Joined Date</b>
                </small>
                <small style="color: #76B6EC">
                    Email Address
                </small>
            </div>
        </div>

        <!-- TABS -->
        <ul class="nav nav-tabs panel panel-default panel-block">
            <li class="<?php echo (!isset($_GET["tab"]) && !isset($_GET["tabpw"])  && !Request::input('gc') && !Request::input('wallet')  ? "active" : ""); ?>"><a href="#user-overview" data-toggle="tab">OVERVIEW</a></li>
            <li class="<?php echo (isset($_GET["tab"]) && !isset($_GET["tabpw"])   && !Request::input('gc') && !Request::input('wallet') ? "active" : ""); ?>"><a href="#user-settings" data-toggle="tab">EDIT PROFILE</a></li>  
            <li class="<?php echo (!isset($_GET["tab"]) && isset($_GET["tabpw"])   && !Request::input('gc') && !Request::input('wallet') ? "active" : ""); ?>"><a href="#change-password" data-toggle="tab">CHANGE PASSWORD</a></li>      
        </ul>

        <div class="tab-content panel panel-default panel-block">
        	@if(isset($slotnow))
            <!-- OVERVIEW -->
            <?php if($slotnow): ?>
            <div style="" class="tab-pane <?php echo (!isset($_GET["tab"]) && !isset($_GET["tabpw"]) && !Request::input('gc')  && !Request::input('wallet') ? "active" : ""); ?>" id="user-overview">   
                <ul class="list-group">  
                    <li class="list-group-item form-horizontal">
                        <h4>              
                            Account Information
                        </h4> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Account Username</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ $member->account_username }}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Slot Number</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ $slotnow->slot_id }}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Membership</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{$slotnow->membership_name}}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group hide">
                            <label for="first-name" class="col-md-2 control-label">Total Profit (+)</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($total_income,2)}}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group hide">
                            <label for="first-name" class="col-md-2 control-label">Account Wallet</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($total_wallet, 2)}}" disabled="disabled">
                            </div>
                        </div>  
 

                    </li>
                    <li class="list-group-item form-horizontal">
                        <h4>
                            Pay Cheque
                        </h4> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Ready</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{currency($total_ready,2)}}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Requested</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{currency($total_request,2)}}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Released</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{currency($total_released,2)}}" disabled="disabled">
                            </div>
                        </div> 
                    </li>
                    <li class="list-group-item form-horizontal">
                        <h4>
                            Income Summary
                        </h4> 
                        @if (Session::has('message'))
                           <div class="alert alert-info">{{ Session::get('message') }}</div>
                        @endif
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Total Direct</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($total_direct) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Total Indirect</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($total_indirect) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group hide">
                            <label for="first-name" class="col-md-2 control-label">Total Pipeline</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($total_pipeline) }}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group hide">
                            <label for="first-name" class="col-md-2 control-label">Total Binary</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($total_binary) }}" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group hide">
                            <label for="first-name" class="col-md-2 control-label">Total Income</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($total_income) }}" disabled="disabled">
                            </div>
                        </div>
                    </li>



                    <li class="list-group-item form-horizontal hide">
                        <h4>
                            Unilevel
                        </h4> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Personal PV</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($slotnow->slot_personal_points, 2) }} PPV" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Group PV</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($slotnow->slot_group_points, 2) }} GPV" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Required Personal PV</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($slotnow->membership_required_pv, 2) }} PPV" disabled="disabled">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Unilevel Status</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ $slotnow->slot_personal_points >= $slotnow->membership_required_pv ? 'Qualified for Unilevel' : 'Not Yet Qualified' }}" disabled="disabled">
                            </div>
                        </div>
                    </li>

                    <li class="list-group-item form-horizontal hide">
                        <h4>
                            Binary Today
                        </h4>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">START LEFT</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($slotnow->slot_binary_left, 2) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">START RIGHT</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($slotnow->slot_binary_right, 2) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">REMAIN LEFT</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($remain_left, 2) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">REMAIN RIGHT</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ number_format($remain_right, 2) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">EARNED TODAY</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($today_pairing) }}" disabled="disabled">
                            </div>
                        </div> 
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">FLUSHOUT TODAY</label>
                            <div class="col-md-10">
                                <input id="first-name" class="form-control" value="{{ currency($today_flushout) }}" disabled="disabled">
                            </div>
                        </div> 
                    </li>
                </ul>

            </div>
        <?php else: ?>
            <div style="" class="tab-pane <?php echo (!isset($_GET["tab"]) && !isset($_GET["tabpw"]) && !Request::input('gc')  && !Request::input('wallet') ? "active" : ""); ?>" id="user-overview">
            <!--<h2 class=""> <center class="label label-danger col-md-12">You have no access.</center></h2>-->
            <div style="" class="tab-pane <?php echo (!isset($_GET["tab"]) && !isset($_GET["tabpw"]) && !Request::input('gc')  && !Request::input('wallet') ? "active" : ""); ?>" id="user-overview">
            @if($errors->any())
            <h4></h4>
            <div class="alert alert-danger">
                <ul>
                    
                    <li>{{$errors->first()}}</li>
                   
                </ul>
            </div>
            @endif
            @endif
            </div>
            
             <form class="form-horizontal" method="POST">
                 <input type="hidden" name="_token" value="{{ csrf_token() }}">
                 <table class="table table-striped">
                     <thead>
                         <tr>
                             <th colspan="2"><div class="alert alert-danger">
                                  <strong>Danger!</strong> You have no access. Claim Code to have access.
                                </div>
                             </th>
                         </tr>
                         <tr>
                             
                             <th>Pin Number</th>
                             <th><input class="form-control col-md-12" type="number" name="pin" id"1111"></th>
                         </tr>
                         <tr>
                            <th>
                               Code 
                            </th>
                            <th>
                                <input class="form-control col-md-12" type="text" name="activation" id"2222">
                            </th>
                         </tr>
                         <tr>
                             <th colspan="2"><button class="btn btn-primary col-md-12" type="submit" name="sbmtclaim" >Claim Code</button></th>
                         </tr>
                     </thead>
                 </table>
             </form>
             <table class="table table-condensed table-responsive" width="100%">
            @if($code)
            <thead>
                <tr>
                    <th>Pin</th>
                    <th data-hide="phone">Code</th>
                    <th data-hide="phone">Type</th>
                    <th data-hide="phone">Obtained From</th>
                    <th data-hide="phone,phonie">Membership</th>
                    <th data-hide="phone,phonie">Locked</th>
                    <th data-hide="phone,phonie">Product Set</th>
                    <th data-hide="phone,phonie">Status</th>
                    <th data-hide="phone,phonie,tablet"></th>
                    <th data-hide="phone,phonie,tablet"></th>
                </tr>
            </thead>
            <tbody>
                @foreach($code as $c)
                <tr class="tibolru" loading="{{$c->code_pin}}">
                    <td>{{$c->code_pin}}</td>
                    <td>{{$c->code_activation}}</td>
                    <td>{{$c->code_type_name}}</td>
                    @if(isset($c->transferer))
                    <td>{{$c->transferer}}</td>
                    @else
                    <td>{{$c->description}}</td>
                    @endif
                    <td>{{$c->membership_name}}</td>
                    <td>
                        <div class="check">
                            <input type="checkbox" class="checklock"  disabled="disabled" {{$c->lock == 1 ? "checked" : ""}}>
                            <div class="bgs">
                            </div>
                        </div>
                    </td>
                    <td>{{$c->product_package_name}}</td>
                    <td>{{$c->used == 0 ? "Available" : "Used"}}</td>
                    @if($c->used == 0)
                    <td><a style="cursor: pointer;" class="createslot" value="{{$c->code_pin}}" >Create Slot</a></td>
                    @else
                    <td><a style="cursor: pointer;" class="alertused">Already Used</a></td>
                    @endif

                    <td class="hide"><a style="cursor: pointer;" class="transferer" value="{{$c->code_pin}} @ {{$c->code_activation}}" val="{{$c->code_pin}}">Transfer Code</a></td>
                </tr>
                @endforeach
                @endif
            </tbody>
        </table>
        </div>
            <div class="remodal" data-remodal-id="create_slot" data-remodal-options="hashTracking: false">
   <button data-remodal-action="close" class="remodal-close pull-right"></button>
    <div class="header">
        Create Slot
    </div>
    <!--<img src="/resources/assets/frontend/img/sobranglupet.png" style="max-width: 100%; margin: 20px auto">-->
    <div class="sponsornot"></div>
    <div class="col-md-10 col-md-offset-1 para">
        <form class="form-horizontal" method="POST" id="createslot" action="/distributor">
            <input type="hidden" class="token" name="_token" value="{{ csrf_token() }}">
            <div class="form-group para">
                <label for="1" class="col-sm-3 control-label">Sponsor</label>
                <div class="col-sm-9">
                    @if($exist_lead->first())
                    <input type="hidden" value="1" id="checkclass">
                    <select class="sponser form-control" id="1" name="sponsor">
                        @foreach($exist_lead as $exist)
                        <option value="{{$exist->slot_id}}">Slot #{{$exist->slot_id}}</option>
                        @endforeach
                    </select>
                    @else
                        <input type="hidden" value="0" id="checkclass">
                        <input class="sponse form-control" id="1" name="sponsor" value="">
                    @endif
                </div>
            </div>
            <div class="form-group para hide">
                    <label for="2" class="col-sm-3 control-label">Placement</label>
                    <div class="treecon col-sm-9">
                        <select class="tree form-control hidden" id="2" name="placement" required disabled>
                            <option value="">Input a slot sponsor</option>
                        </select>
                        <input type="number" class="form-control placement-input" name="placement" value="{{$placement_lastt->slot_id}}">
                    </div>
                    <input type="hidden" id="code_number" value"" name="code_number">
                </div>
                <div class="form-group para hide">
                    <label for="3" class="col-sm-3 control-label">Position</label>
                    <div class="col-sm-9">
                        <select class="form-control" id="3" name="slot_position">
                            <option value="left" selected>Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                </div>
            </div>
            <br>
            <div class="col-md-12" style="padding: 5px;">
            <button class="cancel button btn btn-danger col-md-6" type="button" data-remodal-action="cancel">Cancel</button>
            <button class="c_slot button btn btn-primary col-md-6"  type="button" name="c_slot">Create Slot</button>
            </div>
            <span class='loadingicon' style="margin-left: 50px; display:none"><img class='loadingicon' src='/themes/{{ $shop_theme }}//resources/assets/img/small-loading.GIF'></span>
            </form>
            </div>
            <!-- POPUP FOR CONFIRMATION / USE CODE -->
            <div class="remodal confirm_slot-slot" data-remodal-id="confirm_slot" data-remodal-options="hashTracking: false">
                <button data-remodal-action="close" class="remodal-close"></button>
                <div class="header">
                <img src="/themes/{{ $shop_theme }}//resources/assets/frontend/img/icon-plis.png">
                Confirm Slot
                </div>
                <img src="/themes/{{ $shop_theme }}//resources/assets/frontend/img/sobranglupet.png" style="max-width: 100%; margin: 20px auto">
                <div class="sponsornot"></div>
                <div class="col-md-10 col-md-offset-1 para">
                <div class="form-group para hide">
                    <label for="2" class="col-sm-3 control-label">Placement Owner</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="placement_owner" disabled>
                    </div>
                </div>
                <div class="form-group para">
                    <label for="2" class="col-sm-3 control-label">Sponsor Owner</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="sponsor_owner" disabled>
                    </div>
                </div>
                <button class="canceler button" type="button">Back</button>
                <button class="confirmer button" type="button" name="c_slot">Create Slot</button>
                <span class='loadingiconer' style="margin-left: 50px;"><img class='loadingiconer' src='/themes/{{ $shop_theme }}//resources/assets/img/small-loading.GIF'></span>
                </div>    
                
                <br>
            </div>
            
            <?php endif; ?>
            <!-- EDIT PROFILE -->
            <div class="tab-pane scrollable list-group <?php echo (isset($_GET["tab"]) && !isset($_GET["tabpw"])  && !Request::input('wallet') && !Request::input('gc')? "active" : ""); ?>" id="user-settings">
                <form method="POST" action="/distributor/updateprofile">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="list-group-item form-horizontal">
                        <h4>
                            Basic Information
                        </h4>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Full Name</label>
                            <div class="col-md-10">
                                <input id="first-name" name="first-name" class="form-control" disabled="disabled" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-group-addon">
                          
                            </div>
                            <label for="first-name" class="col-md-2 control-label">Gender</label>
                            <div class="col-md-10">
                                <select name="account-gender" id="account-gender" class="form-control" style="font-family: 'Titillium Web',sans-serif !important;">
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-group-addon">
                    
                            </div>
                            <label for="first-name" class="col-md-2 control-label">Birth Month</label>
                            <div class="col-md-10">
                                <input type="date" id="datepicker" name="datepicker" class="form-control" style="font-family: 'Titillium Web',sans-serif !important;" value="" placeholder="mm/dd/yyyy">
                            </div>
                        </div>                 
                        <div class="form-group">
                            <div class="form-group-addon">
                    
                            </div>
                            <label for="location" class="col-md-2 control-label">Country</label>
                            <div class="col-md-10">
                                <select name="account-location" id="account-location" class="form-control" style="font-family: 'Titillium Web',sans-serif !important;">
                            
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="occupation" class="col-md-2 control-label">Addresss</label>
                            <div class="col-md-10">
                                <textarea id="address" name="address" class="form-control"></textarea>
                            </div>
                        </div>

                        <h4>
                            Contact Information
                        </h4>
                        <div class="form-group">
                            <label for="email" class="col-md-2 control-label">Username</label>
                            <div class="col-md-10">
                                <input name="username" id="username" class="form-control" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-md-2 control-label">Email</label>
                            <div class="col-md-10">
                                <input name="email" id="email" class="form-control" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="col-md-2 control-label">Contact Number</label>
                            <div class="col-md-10">
                                <input name="contact-number" id="contact-number" class="form-control" value="">
                            </div>
                        </div>
                        <h4>
                            Payment Portal for Encashment
                        </h4>
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
                                <button class="btn btn-success" id="updateprofile">APPLY CHANGES</button>
                            </div>
                        </div>

                        <script type="text/javascript">
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
                    </div>
                </form>
            </div>
            <!-- CHANGE PASSWORD -->
            <div class="tab-pane scrollable list-group <?php echo (!isset($_GET["tab"]) && isset($_GET["tabpw"]) && !Request::input('wallet') &&  !Request::input('gc') ? "active" : ""); ?>" id="change-password">
                <form action="distributor/change_password" method="POST">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="list-group-item form-horizontal">
                        <h4>
                            CHANGE PASSWORD
                        </h4>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Old Password</label>
                            <div class="col-md-10">
                                <input type="password" name="opw" id="opw" class="form-control" value="">     
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">New Password</label>
                            <div class="col-md-10">
                                <input type="password" name="npw" id="npw" class="form-control" value="">     
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="first-name" class="col-md-2 control-label">Confirm New Password</label>
                            <div class="col-md-10">
                                <input type="password" name="cpw" id="cpw" class="form-control" value="">     
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12 pull-right text-right">
                                <input type="submit" class="btn btn-success" value="CHANGE PASSWORD">
                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div> 

    </div>

    <div class="col-md-6 col-lg-4">
        <div class="panel panel-default panel-block">
            <div class="list-group">
                <div class="list-group-item">
                    <h4 class="section-title">NEWS & ANNOUNCEMENTS</h4>
                    <div class="form-group">
                        <div id="hero-bar" class="graph" style="height: auto; text-align: center;">
                        <div id="myCarousel" class="carousel slide" data-ride="carousel" width="100%" height="">
                          <!-- Indicators -->
                          <ol class="carousel-indicators">
             
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              
                        
                            <li data-target="#myCarousel" data-slide-to=""></li>
               
                          </ol>

                          <!-- Wrapper for slides -->
                          <div class="carousel-inner" role="listbox">
                      
                            <div class="item active">
                              <img src=""class="newsimage" alt="">
                              
                                <h3></h3>
                                <p></p>
                              
                            </div>
            
             
                            <div class="item">
                              <img src="" class="newsimage" alt="">
                              <h3></h3>
                                <p></p>
                            </div>

                           

                          <!-- Left and right controls -->
                          
                        </div>
                        <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"><i class="icon-angle-left"></i></span>
                            <span class="sr-only">Previous</span>
                          </a>
                          <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"><i class="icon-angle-right"></i></span>
                            <span class="sr-only">Next</span>
                          </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-6 col-lg-4">
    <div class="panel panel-default panel-block">
        <div class="list-group">
            <div class="list-group-item">
           <h4 class="section-title">Words of wisdom</h4>

           <p>
     
           </p>
           <br>
            <span class="pull-right"></span>
            <hr>
  
           </div>
        </div>
    </div>            
</div>
@endsection
@section('js')
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/frontend/js/code_vault.js"></script>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/toaster/toastr.min.js"></script>
<script type="text/javascript" src="">
    
</script>
@endsection