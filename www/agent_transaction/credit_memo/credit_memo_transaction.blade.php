@extends('tablet.layout')
@section('content')
<form class="global-submit form-to-submit-transfer" id="invoice_form" role="form" action="{{$action}}" method="POST" >
    <input type="hidden" class="token" name="_token" value="{{csrf_token()}}" >
    <input type="hidden" class="token" name="sir_id" value="{{$sir_id}}" >
    <input type="hidden" name="credit_memo_id" value="{{Request::input('id')}}" >
    <div class="form-group">
        <div class="col-md-12">
            <div class="panel panel-default panel-block panel-title-block" id="top">
                <div class="panel-heading">
                    <div class="col-md-8 col-xs-6">
                        <i class="fa fa-tablet"></i>
                        <h1>
                        <span class="page-title">Tablet &raquo; Credit Memo</span>
                        <small>
                        </small>
                        </h1>
                    </div>
                    <div class="col-md-4 col-xs-6 text-right">
                        <a href="/tablet" class="btn btn-custom-white">Cancel</a>
                        <button data-action="save-and-edit" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
            <div class="panel panel-default panel-block panel-title-block" id="top">
               <div class="tab-content panel-body form-horizontal tablet-container">
                    <div id="invoice" class="tab-pane fade in active">
                       <div class="form-group">
                            <div class="col-md-12">
                                <input type="hidden" class="form-control input-sm customer-email" name="cm_customer_email" placeholder="E-Mail (Separate E-Mails with comma)"  value="{{$cm->cm_customer_email or ''}}""/>
                                <select class="form-control droplist-customer input-sm pull-left" name="cm_customer_id" data-placeholder="Select a Customer" required>
                                    @include('member.load_ajax_data.load_customer', ['customer_id' => isset($cm->cm_customer_id) ? $cm->cm_customer_id : '']);
                                </select>
                            </div>
                       </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <label> Date</label>
                                <input type="text" class="datepicker form-control input-sm" name="cm_date" value="{{isset($cm->cm_date) ? $cm->cm_date : date('m/d/y')}}"/>
                            </div>
                        </div>
                        <div class="div-item-list">
                             @include('tablet.load_ajax_tablet.tablet_cm_item')
                        </div>

                        <div class="form-group">
                            <div class="col-md-12">
                             <h3>Add Item</h3>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                            <!-- select-item droplist-item -->
                                <select class="form-control tablet-droplist-item input-sm pull-left" name="select_item_id">
                                    @include("member.load_ajax_data.load_item_category", ['add_search' => ""])
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                             <div class="col-xs-6">
                                <label>Message</label>
                                 <textarea class="form-control input-sm textarea-expand" name="cm_message" placeholder="">{{$cm->cm_message or ''}}</textarea>
                            </div>
                            <div class="col-xs-6">
                                <label>Statement Memo</label>
                                <textarea class="form-control input-sm textarea-expand" name="cm_memo" placeholder="">{{$cm->cm_memo or ''}}</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-xs-6 digima-table-label">
                                    Total
                                </div>
                                <div class="col-xs-5 text-right digima-table-value">
                                    <input type="hidden" name="subtotal_price" class="subtotal-amount-input" />
                                    PHP&nbsp;<span class="sub-total">0.00</span>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="col-xs-6 digima-table-label">
                                  Remaining Total
                                </div>
                                <div class="col-xs-5 text-right digima-table-value total">
                                    <input type="hidden" name="overall_price" class="total-amount-input" />
                                    PHP&nbsp;<span class="total-amount">0.00</span>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    </div>
</form>
<div class="tablet-div-script hide">
    <div class="item-table">
        <div style="border: 1px solid #999999; padding: 10px;margin: 5px" class="popup" size="md" link="">
            <a class="btn-remove col-xs-12 text-right" style="margin-top: -10px;margin-bottom: -10px">
                Remove
            </a>
            <div class="form-group row clearfix">
                <div class="col-xs-6">
                    <input type="hidden" name="cmline_item_id[]" class="input-item-id">
                    <h3 class="item-name"></h3>
                </div>
                <div class="col-xs-6 text-right">
                    <input type="hidden" name="cmline_amount[]" class="input-item-amount">
                    <h3 class="item-amount"></h3>
                </div>
            </div>
            <div class="row clearfix">
                <div class="col-xs-6">
                    <input type="hidden" name="cmline_qty[]" class="input-item-qty">  
                    <input type="hidden" name="cmline_rate[]" class="input-item-rate"> 
                    <input type="hidden" name="cmline_um[]" class="input-item-um">            
                    <h4><span class="item-qty"></span> x <span class="item-rate"></span> <span class="item-um"></span></h4>
                </div>
                <div class="col-xs-12">
                    <input type="hidden" name="cmline_description[]" class="input-item-desc">    
                    <span style="color:#999999" class="item-desc"></span>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('script')
<script type="text/javascript">
    @if(Session::has('success'))
        toastr.success('{{Session::get('success')}}');
    @endif
</script>
<script type="text/javascript" src="/assets/member/js/textExpand.js"></script>
<script type="text/javascript" src="/assets/member/js/draggable_row.js"></script>
<script type="text/javascript" src="/assets/member/bootstrap_drawer/cooker.drawer.js"></script>
<script type="text/javascript" src="/assets/member/js/tablet_credit_memo.js"></script>
@endsection