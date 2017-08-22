
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title tablet-item-name">{{$item_details->item_name}}</h4>
    </div>
    <div class="modal-body add_new_package_modal_body clearfix">
        <div class="form-group clearfix row">
            <div class="col-xs-4">
            <input type="hidden" name="item_id" class="tablet-item-id" value="{{$item_details->item_id}}">
                <h4> U/M </h4>
            </div>
            <div class="col-xs-8">
                <select class="1111 tablet-droplist-um form-control tablet-item-um">
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
                <input type="text" class="form-control input-sm text-right number-input tablet-item-qty tablet-compute" value="1" name="invline_qty">
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Rate </h4>
            </div>        
            <div class="col-xs-8">
                <input type="hidden" name="" class="tablet-price-per-item" value="{{$item_details->item_price}}">
                <input type="text" style="text-align: right; border: 0;border-bottom: 1px solid #000;outline: 0;" class="form-control input-sm tablet-item-rate tablet-compute number-input" name="invline_rate" value="{{number_format($item_details->item_price,2)}}">
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Discount </h4>
            </div>        
            <div class="col-xs-8">
                <input type="text" class="form-control text-right input-sm tablet-item-disc tablet-compute" name="">
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Remark </h4>
            </div>        
            <div class="col-xs-8">
                <input type="text" class="form-control input-sm tablet-item-remark">
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-4">
                <h4> Amount </h4>
            </div>        
            <div class="col-xs-8 text-right">
                <input type="hidden" class="form-control input-sm input-item-amount">
                <h3 class="tablet-item-amount"></h3>
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-12">
                <h4> Description </h4>
            </div>        
            <div class="col-xs-12">
                <textarea class="form-control input-sm tablet-item-desc">{{$item_details->item_description}}</textarea>
            </div>
        </div>
        <div class="form-group clearfix row">
            <div class="col-xs-12">
                <label><input type="checkbox" name="taxable" class="tablet-item-taxable"> <span>Taxable</span></label>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <div class="col-md-6 col-xs-6">
            <button data-dismiss="modal" class="btn btn-custom-white form-control">Cancel</button>
        </div>
        <div class="col-md-6 col-xs-6">
            <button class="btn btn-custom-blue form-control tablet-add-item">Done</button>
        </div>
    </div>
<script type="text/javascript">
    tablet_customer_invoice.iniatilize_select();
    tablet_customer_invoice.event_tablet_compute_class_change();
    tablet_customer_invoice.action_compute_tablet();
    tablet_customer_invoice.action_add_item_submit();
    tablet_customer_invoice.action_add_cm_item_submit();
</script>