
var global_tablet_html = $(".tablet-div-script").html();
var global_cm_tablet_html = $(".cm-tablet-div-script").html();
$(document).ready(function()
{
    check_if_edit_invoice();
});
function check_if_edit_invoice()
{
    get_shop_id(function(shop_id)
    {
        get_session('inv_id', function (invoice_id)
        {
            if(invoice_id)
            {                
                get_invoice_data(invoice_id, function(inv, _invline, _cmline)
                {
                    get_all_customers(function(customer_list)
                    {
                        get_all_terms(function(terms)
                        {
                            get_all_sir_item(function(sir_item)
                            {
                                get_all_cm_item(function(cm_item)
                                {

                                    var option = "";
                                    $.each(customer_list, function(key, datarow)
                                    {
                                        var customer_name = datarow['company'] != "" ? datarow['company'] : datarow['first_name'] +" "+datarow['middle_name']+" "+datarow['last_name']; 
                                        option += '<option value="'+datarow['customer_id']+'" email="'+datarow['customer_id']+'">'+customer_name+'</option>';
                                    });

                                    var option2 = "";
                                    $.each(terms, function(key, datarow)
                                    {
                                        option2 += '<option value="'+datarow['terms_id']+'" days="'+datarow['terms_no_of_days']+'">'+datarow['terms_name']+'</option>';
                                    });
                                    var option3 = "";
                                    $.each(sir_item, function(key, datarow)
                                    {
                                        option3 += '<option sir_id="'+sir_id+'" value="'+datarow['item_id']+'" item-sku="'+datarow['item_sku']+'" item-type="" sales-info="'+datarow['item_sales_information']+'" purchase-info="'+datarow['item_purchasing_information']+'" price="'+datarow['sir_item_price']+'" has-um="'+datarow['item_measurement_id']+'" >'+datarow['item_name']+'</option>';
                                    });
                                    var option4 = "";
                                    $.each(cm_item, function(key, datarow_cm)
                                    {
                                        option4 += '<option sir_id="'+sir_id+'" value="'+datarow_cm['item_id']+'" item-sku="'+datarow_cm['item_sku']+'" item-type="" sales-info="'+datarow_cm['item_sales_information']+'" purchase-info="'+datarow_cm['item_purchasing_information']+'" price="'+datarow_cm['sir_item_price']+'" has-um="'+datarow_cm['item_measurement_id']+'" >'+datarow_cm['item_name']+'</option>';
                                    });

                                    $(".customer-select-list").html(option).globalDropList("reload");
                                    $(".droplist-terms").html(option2).globalDropList("reload");
                                    $(".tablet-droplist-item").html(option3).globalDropList("reload");
                                    $(".tablet-droplist-item-return").html(option4).globalDropList("reload");

                                    $('.new-invoice-id').val(inv['new_inv_id']);
                                    $(".customer-select-list").val(inv['inv_customer_id']).change();
                                    $('.inv-customer-billing').html(inv['inv_customer_billing_address']);
                                    $(".droplist-terms").val(inv['inv_terms_id']).change();
                                    $(".inv-due-date-input").val(inv['inv_due_date']);
                                    if(inv['is_sales_receipt'] == 1)
                                    {
                                        $(".droplist-terms").addClass("hidden");
                                        $(".inv-due-date-input").addClass("hidden");
                                    }
                                    $(".inv-date-input").val(inv['inv_date']);
                                    $('.inv-message').val(inv['inv_message']);
                                    $('.inv-memo').val(inv['inv_memo']);
                                    $('.sub-total').html(inv['inv_subtotal_price']);
                                    $('.inv-ewt').val(inv['ewt']);
                                    $('.ewt-total').html(inv['ewt']);
                                    $('.inv-disc-type').val(inv['inv_discount_type']);
                                    $('.inv-tax').val(inv['taxable']);
                                    $('.inv-disc-val').val(inv['inv_discount_value']);
                                    $('.inv-id').val(inv['inv_id']);
                                    $('.cm-id').val(inv['credit_memo_id']);
                                    
                                    $('.is-sales-receipt').attr('value',inv['is_sales_receipt']);

                                    if(inv['credit_memo_id'] != 0)
                                    {
                                        $(".cm-returns").attr('checked');
                                    }

                                    get_sir_id(function(sir_id)
                                    {
                                        $.each(_invline, function(key, value)
                                        {
                                            $(".div-item-list").append(global_tablet_html);
                                            $item_table = $(".div-item-list .item-table:last");

                                            $(".div-item-list .item-table:last").addClass("item-list-" + value['invline_item_id']);
                                            $(".div-item-list .item-table:last .inv-item").attr("item_id", value['invline_item_id']);
                                            $(".div-item-list .item-table:last .inv-item").attr("sir_id", sir_id);


                                            //PUT VALUE TO LABEL
                                            $item_table.find(".item-name").html(value['item_name']);
                                            $item_table.find(".item-rate").html((value['invline_rate']).toFixed(2));
                                            $item_table.find(".item-um").html(value['multi_abbrev']);
                                            $item_table.find(".item-amount").html((value['invline_amount']).toFixed(2));
                                            $item_table.find(".item-qty").html(value['invline_qty']);

                                            if(value['invline_discount'])
                                            {
                                                $item_table.find(".disc-content").removeClass("hidden");    
                                                $item_table.find(".item-disc").html(value['invline_discount']);
                                            }
                                            var tax = 0;
                                            $item_table.find(".item-taxable").html("Non-Taxable");
                                            if(value['taxable'] == 1)
                                            {
                                                tax = 1;
                                                $item_table.find(".item-taxable").html("Taxable");
                                            }
                                            $item_table.find(".item-desc").html($(".tablet-item-desc").val());

                                            //PUT VALUE TO INPUT
                                            $item_table.find(".input-item-id").val(value['invline_item_id']);
                                            $item_table.find(".input-item-amount").val(value['invline_amount']);
                                            $item_table.find(".input-item-rate").val(value['invline_rate']);
                                            $item_table.find(".input-item-disc").val(value['invline_discount']);
                                            $item_table.find(".input-item-remarks").val(value['invline_discount_remark']);
                                            $item_table.find(".input-item-qty").val(value['invline_qty']);
                                            $item_table.find(".input-item-um").val(value['multi_id']);
                                            $item_table.find(".input-item-taxable").val(tax);
                                            $item_table.find(".input-item-desc").val(value['invline_description']);
                                        });
                                        if(_cmline.length > 0)
                                        {
                                            $.each(_cmline, function(key_cm, value_cm)
                                            {
                                                if(value_cm['cmline_item_id'])
                                                {
                                                    $(".cm-div-item-list").append(global_cm_tablet_html);
                                                    $item_table = $(".cm-div-item-list .cm.item-table:last");
                                                    
                                                    $(".cm-div-item-list .cm.item-table:last").addClass("item-list-"+value_cm['cmline_item_id']);
                                                    $(".cm-div-item-list .cm.item-table:last .cm-item").attr("item_id",value_cm['cmline_item_id']);
                                                    $(".cm-div-item-list .cm.item-table:last .cm-item").attr("sir_id",sir_id);
                                                    
                                                    //PUT VALUE TO LABEL
                                                    $item_table.find(".item-cm-name").html(value_cm['item_name']);
                                                    $item_table.find(".item-cm-rate").html((value_cm['cmline_rate']).toFixed(2));
                                                    $item_table.find(".item-cm-um").html(value_cm['multi_abbrev']);
                                                    $item_table.find(".item-cm-amount").html((value_cm['cmline_amount']).toFixed(2));
                                                    $item_table.find(".item-cm-qty").html(value_cm['cmline_qty']);

                                                    $item_table.find(".item-cm-desc").html(value_cm['cmline_description']);

                                                    //PUT VALUE TO INPUT
                                                    $item_table.find(".cm.input-item-id").val(value_cm['cmline_item_id']);
                                                    $item_table.find(".cm.input-item-amount").val(value_cm['cmline_amount']);
                                                    $item_table.find(".cm.input-item-rate").val(value_cm['cmline_rate']);
                                                    $item_table.find(".cm.input-item-qty").val(value_cm['cmline_qty']);
                                                    $item_table.find(".cm.input-item-um").val(value_cm['cmline_um']);
                                                    $item_table.find(".cm.input-item-desc").val(value_cm['cmline_description']);
                                                    
                                                }
                                            });
                                        }
                                        
                                        tablet_customer_invoice.action_general_compute();
                                        $(".inv-save-btn").attr("onClick","invoice_edit_submit();");
                                    });
                                });                            
                            });
                        });
                    });
                });
            }
        });
    });
}