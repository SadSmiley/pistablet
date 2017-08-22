@extends('tablet.layout')
@section('content')
<form class="global-submit form-to-submit-transfer" id="invoice_form" role="form" action="{{$action}}" method="POST" >
    <input type="hidden" class="token" name="_token" value="{{csrf_token()}}" >
    <input type="hidden" class="token" name="sir_id" value="{{$sir_id}}" >
    <input type="hidden" name="invoice_id" value="{{Request::input('id')}}" >
    <div class="form-group">
        <div class="col-md-12">
            <div class="panel panel-default panel-block panel-title-block" id="top">
                <div class="panel-heading">
                    <div class="col-md-8 col-xs-6">
                        <i class="fa fa-tablet"></i>
                        <h1>
                        <span class="page-title">Tablet &raquo; Credit Sales</span>
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
                            <div class="col-xs-3">
                                <label >Invoice No.</label>
                            </div>
                            <div class="col-xs-4">
                                <input type="text" class="form-control input-sm" name="new_invoice_id" value="{{$inv->new_inv_id or $new_inv_id}}">
                            </div>
                       </div>

                       <div class="form-group">
                            <div class="col-md-12">
                                <input type="hidden" class="form-control input-sm customer-email" name="inv_customer_email" placeholder="E-Mail (Separate E-Mails with comma)" value="{{$inv->inv_customer_email or ''}}"/>
                                <select class="form-control droplist-customer input-sm pull-left" name="inv_customer_id" data-placeholder="Select a Customer" required>
                                    @include('member.load_ajax_data.load_customer', ['customer_id' => isset($inv) ? $inv->inv_customer_id : (isset($c_id) ? $c_id : '') ]);
                                </select>
                            </div>
                       </div>
                       <div class="form-group">
                           <div class="col-xs-12">                           
                                <textarea class="form-control input-sm textarea-expand" name="inv_customer_billing_address" placeholder="Billing Address">{{$inv->inv_customer_billing_address or ''}}</textarea>                               
                           </div>
                       </div>
                       <div class="form-group">
                            <div class="col-md-12">
                                <label>Terms</label>
                            </div>
                            <div class="col-md-12">
                                <select class="form-control input-sm droplist-terms" name="inv_terms_id">
                                    @include("member.load_ajax_data.load_terms", ['terms_id' => isset($inv) ? $inv->inv_terms_id : ''])
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-6">
                                <label>Invoice Date</label>
                                <input type="text" class="datepicker form-control input-sm" name="inv_date" value="{{isset($inv) ? dateFormat($inv->inv_date) : date('m/d/y')}}"/>
                            </div>
                            <div class="col-xs-6">
                                <label>Due Date</label>
                                <input type="text" class="datepicker form-control input-sm" name="inv_due_date" value="{{isset($inv) ? dateFormat($inv->inv_due_date) : date('m/d/y')}}" />
                            </div>
                        </div>
                        <div class="div-item-list">
                             @include('tablet.load_ajax_tablet.tablet_item')
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
                                <textarea class="form-control input-sm textarea-expand" name="inv_message" placeholder="">{{$inv->inv_message or ''}}</textarea>
                            </div>
                            <div class="col-xs-6">
                                <label>Statement Memo</label>
                                <textarea class="form-control input-sm textarea-expand" name="inv_memo" placeholder="">{{$inv->inv_memo or ''}}</textarea>  
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-12">
                                <div class="col-xs-6 digima-table-label">
                                    Sub Total
                                </div>
                                <div class="col-xs-5 text-right digima-table-value">
                                    <input type="hidden" name="subtotal_price" class="subtotal-amount-input" />
                                    PHP&nbsp;<span class="sub-total">0.00</span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="col-xs-6 text-right digima-table-label">
                                    <div class="row">
                                        <div class="col-xs-6 col-xs-offset-3  padding-lr-1">
                                            <label>EWT</label>
                                        </div>
                                        <div class="col-xs-3  padding-lr-1">
                                            <!-- <input class="form-control input-sm text-right ewt_value number-input" type="text" name="ewt"> -->
                                            <select class="form-control input-sm ewt-value compute" name="ewt">  
                                                <option value="0" {{isset($inv) ? $inv->ewt == 0 ? 'selected' : '' : ''}}></option>
                                                <option value="0.01" {{isset($inv) ? $inv->ewt == 0.01 ? 'selected' : '' : ''}}>1%</option>
                                                <option value="0.02" {{isset($inv) ? $inv->ewt == 0.02 ? 'selected' : '' : ''}}>2%</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-5 text-right digima-table-value">
                                    PHP&nbsp;<span class="ewt-total">0.00</span>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="col-xs-6 text-right digima-table-label">
                                    <div class="row">
                                        <div class="col-xs-6 col-xs-offset-3  padding-lr-1">
                                            <select class="form-control input-sm compute discount_selection" name="inv_discount_type">  
                                                <option value="percent" {{isset($inv) ? $inv->inv_discount_type == 'percent' ? 'selected' : '' : ''}}>Disc. %</option>
                                                <option value="value" {{isset($inv) ? $inv->inv_discount_type == 'value' ? 'selected' : '' : ''}}>Disc. value</option>
                                            </select>
                                        </div>
                                        <div class="col-xs-3  padding-lr-1">
                                            <input class="form-control input-sm text-right number-input discount_txt compute" type="text" name="inv_discount_value" value="{{$inv->inv_discount_value or ''}}">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-5 text-right digima-table-value">
                                    PHP&nbsp;<span class="discount-total">0.00</span>
                                </div>
                            </div> 
                            <div class="col-md-12">
                                <div class="col-xs-6 text-right digima-table-label">
                                    <div class="row">
                                        <div class="col-xs-6 col-xs-offset-6  padding-lr-1">
                                            <select class="form-control input-sm tax_selection compute" name="taxable">  
                                                <option value="0" {{isset($inv) ? $inv->taxable == 0 ? 'selected' : '' : ''}}>No Tax</option>
                                                <option value="1" {{isset($inv) ? $inv->taxable == 1 ? 'selected' : '' : ''}}>Vat (12%)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-5 text-right digima-table-value">
                                    PHP&nbsp;<span class="tax-total">0.00</span>
                                </div>
                            </div> 
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="col-xs-6 digima-table-label">
                                 @if(isset($pis) && $pis != 0)
                                 Invoice
                                 @endif
                                  Total
                                </div>
                                <div class="col-xs-5 text-right digima-table-value total">
                                    <input type="hidden" name="overall_price" class="total-amount-input" />
                                    PHP&nbsp;<span class="total-amount">0.00</span>
                                </div>
                            </div>
                        </div>
                        <!-- returns here -->

                        @if(isset($pis) && $pis != 0)
                        <div class="form-group">
                            <div class="col-xs-12">
                                <label style="font-size: 15px">
                                     <input  type="checkbox" onclick="toggle_returns('.returns-class', this)" value="returns" class="returns-check"  value="returns" name="returns" > Returns 
                                </label>
                            </div>
                        </div> 
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="cm-div-item-list">
                                    @include("tablet.load_ajax_tablet.tablet_cm_item")
                                </div>
                            </div>                            
                        </div>
                        <div class="returns-class"  style="display:none" >
                            <div class="form-group" >
                                <div class="col-xs-12">
                                 <h4>Add Return Item</h4>
                                </div>
                            </div>
                            <div class="form-group" >
                                <div class="col-xs-12">
                                <!-- select-item droplist-item -->
                                    <select class="form-control tablet-droplist-item-return input-sm pull-left" name="cm_select_item_id">
                                        @include("member.load_ajax_data.load_item", ['add_search' => "",'_item' => $_cm_item])
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <div class="col-xs-6 digima-table-label">
                                        Returns Sub Total
                                    </div>
                                    <div class="col-xs-5 text-right digima-table-value">
                                        <input type="hidden" name="subtotal_price_returns" class="subtotal-amount-input-returns" />
                                        PHP&nbsp;<span class="sub-total-returns">0.00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <div class="col-xs-6 digima-table-label">
                                    <h3>Total<h3>
                                </div>
                                <div class="col-xs-5 text-right digima-table-value total">
                                    <h3>
                                        <input type="hidden" name="overall_price_with_return" class="total-amount-input-with-returns" />
                                        PHP&nbsp;<span class="total-amount-with-returns">0.00</span>
                                    </h3>
                                </div>
                            </h3>
                        </div>

                        @endif
                        @if(isset($inv))
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <div class="col-xs-6">
                                        Payment Appplied
                                    </div>
                                    <div class="col-xs-5 text-right digima-table-value">
                                        <input type="hidden" name="payment-receive" class="payment-receive-input" />
                                        PHP&nbsp;<span class="payment-applied">{{$inv->inv_payment_applied}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <div class="col-xs-6 digima-table-label total">
                                        Balance Due
                                    </div>
                                    <div class="col-xs-5 text-right digima-table-value total">
                                        <input type="hidden" name="balance-due" class="balance-due-input" />
                                        PHP&nbsp;<span class="balance-due">0.00</span>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>
               </div>
            </div>
        </div>
    </div>
</form>
<div class="tablet-div-script hide">
    <div class="inv item-table">
        <div style="border: 1px solid #999999; padding: 10px;margin: 5px" class="popup" size="md" link="">
            <a class="btn-remove col-xs-12 text-right" style="margin-top: -10px;margin-bottom: -10px">
                Remove
            </a>
            <div class="form-group row clearfix">
                <div class="col-xs-6">
                    <input type="hidden" name="invline_item_id[]" class="input-item-id">
                    <h3 class="item-name"></h3>
                </div>
                <div class="col-xs-6 text-right">
                    <input type="hidden" name="invline_amount[]" class="input-item-amount">
                    <h3 class="item-amount"></h3>
                </div>
            </div>
            <div class="row clearfix">
                <div class="col-xs-6">
                    <input type="hidden" name="invline_qty[]" class="input-item-qty">  
                    <input type="hidden" name="invline_rate[]" class="input-item-rate"> 
                    <input type="hidden" name="invline_um[]" class="input-item-um">            
                    <h4><span class="item-qty"></span> x <span class="item-rate"></span> <span class="item-um"></span></h4>
                </div>
                <div class="col-xs-6 text-right">
                    <input type="hidden" name="invline_discount[]" class="input-item-disc">   
                    <input type="hidden" name="invline_discount_remark[]" class="input-item-remarks">    
                    <h4 class="disc-content hidden">Disc. <span class="item-disc"> </span></h4>
                </div>
                <div class="col-xs-12">
                    <input type="hidden" name="invline_taxable[]" class="input-item-taxable">  
                    <span style="color:#999999" class="item-taxable"></span>
                </div>
                <div class="col-xs-12">
                    <input type="hidden" name="invline_description[]" class="input-item-desc">    
                    <span style="color:#999999" class="item-desc"></span>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="cm-tablet-div-script hide">
    <div class="cm item-table">
        <div style="border: 1px solid #999999; padding: 10px;margin: 5px" class="popup" size="md" link="">
            <a class="btn-cm-remove col-xs-12 text-right" style="margin-top: -10px;margin-bottom: -10px">
                Remove
            </a>
            <div class="form-group row clearfix">
                <div class="col-xs-6">
                    <input type="hidden" name="cmline_item_id[]" class="cm input-item-id">
                    <h3 class="item-cm-name"></h3>
                </div>
                <div class="col-xs-6 text-right">
                    <input type="hidden" name="cmline_amount[]" class="cm input-item-amount">
                    <h3 class="item-cm-amount"></h3>
                </div>
            </div>
            <div class="row clearfix">
                <div class="col-xs-6">
                    <input type="hidden" name="cmline_qty[]" class="cm input-item-qty">  
                    <input type="hidden" name="cmline_rate[]" class="cm input-item-rate"> 
                    <input type="hidden" name="cmline_um[]" class="cm input-item-um">            
                    <h4><span class="item-cm-qty"></span> x <span class="item-cm-rate"></span> <span class="item-cm-um"></span></h4>
                </div>
                <div class="col-xs-12">
                    <input type="hidden" name="cmline_description[]" class="cm input-item-desc">    
                    <span style="color:#999999" class="item-cm-desc"></span>
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
<script type="text/javascript" src="/assets/member/js/tablet_customer_invoice.js"></script>
@endsection