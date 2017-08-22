
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title cm tablet-item-name">{{$item_details->item_name}}</h4>
    </div>
    <div class="modal-body add_new_package_modal_body clearfix">
        <div class="form-group clearfix row">
            <div class="col-xs-4">
            <input type="hidden" name="item_id" class="cm tablet-item-id" value="{{$item_details->item_id}}">
                <h4> U/M </h4>
            </div>
            <div class="col-xs-8">
                <select class="1111 cm tablet-droplist-um tablet-item-um form-control">
                    @if($item_details)
                        @include("member.load_ajax_data.load_one_unit_measure", ['item_um_id' => $item_details->multi_um_id, 'selected_um_id' => $item_details->multi_id])
                    @else
                        <option class="hidden" value="" />
                    @endif
                </select>
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Quantity </h4>
            </div>        
            <div class="col-xs-8">
                <input type="text" class="form-control input-sm text-right number-input cm tablet-item-qty tablet-compute" value="1" name="invline_qty">
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Rate </h4>
            </div>        
            <div class="col-xs-8">
                <input type="hidden" name="" class="cm tablet-price-per-item" value="{{$item_details->item_price}}">
                <input type="text" style="text-align: right; border: 0;border-bottom: 1px solid #000;outline: 0;" class="form-control input-sm cm tablet-item-rate tablet-compute number-input" name="invline_rate" value="{{number_format($item_details->item_price,2)}}">
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Amount </h4>
            </div>        
            <div class="col-xs-8 text-right">
                <input type="hidden" class="form-control input-sm cm input-item-amount">
                <h3 class="cm tablet-item-amount"></h3>
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-12">
                <h4> Description </h4>
            </div>        
            <div class="col-xs-12">
                <textarea class="form-control input-sm cm tablet-item-desc">{{$item_details->item_description}}</textarea>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="col-md-6 col-xs-6"><button data-dismiss="modal" class="btn btn-custom-white form-control">Cancel</button></div>
        <div class="col-md-6 col-xs-6"><button class="btn btn-custom-blue form-control cm tablet-add-item">Done</button></div>
    </div>
@if($is_return == 'false')
<script type="text/javascript">
    tablet_credit_memo.iniatilize_select();
    tablet_credit_memo.event_tablet_compute_class_change();
    tablet_credit_memo.action_compute_tablet();
    tablet_credit_memo.action_add_item_submit();
</script>
@else
<script type="text/javascript">
    tablet_customer_invoice.iniatilize_select();
    tablet_customer_invoice.event_tablet_cm_compute_class_change();
    tablet_customer_invoice.action_cm_compute_tablet();
    tablet_customer_invoice.action_add_cm_item_submit();
</script>
@endif