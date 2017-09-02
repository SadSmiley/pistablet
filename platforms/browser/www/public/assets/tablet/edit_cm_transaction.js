
var global_tablet_html = $(".tablet-div-script").html();
$(document).ready(function()
{
    check_if_edit_cm();
});
function check_if_edit_cm()
{
    get_shop_id(function(shop_id)
    {
        get_session('cm_id', function (cm_id)
        {
            if(cm_id)
            {                
                get_cm_data(cm_id, function(cm, _cmline)
                {
                    get_all_customers(function(customer_list)
                    {
                        get_all_item(function(item_list)
                        {
                            var option = "";
                            $.each(customer_list, function(key, datarow)
                            {
                                var customer_name = datarow['company'] != "" ? datarow['company'] : datarow['first_name'] +" "+datarow['middle_name']+" "+datarow['last_name']; 
                                option += '<option value="'+datarow['customer_id']+'" email="'+datarow['customer_id']+'">'+customer_name+'</option>';
                            });
                            var option2 = "";
                            $.each(item_list, function(key, datarow)
                            {
                                option2 += '<option value="'+datarow['item_id']+'" item-sku="'+datarow['item_sku']+'" item-type="'+datarow['item_type_id']+
                                        '" has-um="'+datarow['item_measurement_id']+'" item-price="'+datarow['item_price']+'" sales-info="'+datarow['item_price']
                                        +'" purchase-info="'+datarow['item_purchasing_information']+'" cost="'+datarow['item_cost']+'">'+
                                        datarow['item_name']+'</option>';
                            });
                            

                            $(".customer-select-list").html(option).globalDropList("reload");
                            $(".tablet-droplist-item").html(option2).globalDropList("reload");

                            $(".customer-select-list").val(cm['cm_customer_id']).change();
                            $('.cm-date').val(cm['cm_date']);
                            $('.cm-message').val(cm['cm_message']);
                            $('.cm-memo').val(cm['cm_memo']);
                            $('.cm-id').val(cm['cm_id']);

                            get_sir_id(function(sir_id)
                            {
                                if(_cmline.length > 0)
                                {
                                    $.each(_cmline, function(key_cm, value_cm)
                                    {
                                        if(value_cm['cmline_item_id'])
                                        {
                                            $(".div-item-list").append(global_tablet_html);
                                            $item_table = $(".div-item-list .item-table:last");
                                            
                                            $(".div-item-list .item-table:last").addClass("item-list-"+value_cm['cmline_item_id']);
                                            $(".div-item-list .item-table:last .cm-item").attr("item_id",value_cm['cmline_item_id']);
                                            $(".div-item-list .item-table:last .cm-item").attr("sir_id",sir_id);
                                            
                                            //PUT VALUE TO LABEL
                                            $item_table.find(".item-name").html(value_cm['item_name']);
                                            $item_table.find(".item-rate").html((value_cm['cmline_rate']).toFixed(2));
                                            $item_table.find(".item-um").html(value_cm['multi_abbrev']);
                                            $item_table.find(".item-amount").html((value_cm['cmline_amount']).toFixed(2));
                                            $item_table.find(".item-qty").html(value_cm['cmline_qty']);

                                            $item_table.find(".item-desc").html(value_cm['cmline_description']);

                                            //PUT VALUE TO INPUT
                                            $item_table.find(".input-item-id").val(value_cm['cmline_item_id']);
                                            $item_table.find(".input-item-amount").val(value_cm['cmline_amount']);
                                            $item_table.find(".input-item-rate").val(value_cm['cmline_rate']);
                                            $item_table.find(".input-item-qty").val(value_cm['cmline_qty']);
                                            $item_table.find(".input-item-um").val(value_cm['cmline_um']);
                                            $item_table.find(".input-item-desc").val(value_cm['cmline_description']);
                                            
                                        }
                                    });
                                }
                                
                                tablet_credit_memo.action_general_compute();
                                $(".cm-edit-btn").attr("onClick","cm_edit_submit();");
                            });
                        });   
                    });
                });
            }
        });
    });
}