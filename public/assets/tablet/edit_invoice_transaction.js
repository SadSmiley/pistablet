
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
            get_invoice_data(invoice_id, function(inv, _invline, _cmline)
            {
                console.log("inv");
                console.log(inv);
                console.log("_invline");
                console.log(_invline);
                console.log("_cmline");
                console.log(_cmline);

                get_all_customers(function(customer_list)
                {
                    get_all_terms(function(terms)
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

                        $(".customer-select-list").html(option).globalDropList("reload");
                        $(".droplist-terms").html(option2).globalDropList("reload");

                        $('.new-invoice-id').val(inv['new_inv_id']);
                        $(".customer-select-list").val(inv['inv_customer_id']).change();
                        $('.inv-customer-billing').html(inv['inv_customer_billing_address']);
                        $(".droplist-terms").val(inv['inv_terms_id']).change();
                        $(".inv-date-input").val(inv['inv_date']);
                        $(".inv-due-date-input").val(inv['inv_due_date']);
                        $('.inv-message').val(inv['inv_message']);
                        $('.inv-memo').val(inv['inv_memo']);
                        $('.inv-ewt').val(inv['ewt']);
                        $('.ewt-total').html(inv['ewt']);
                        $('.inv-disc-type').val(inv['inv_discount_type']);
                        $('.inv-tax').val(inv['taxable']);

                    });
                });
            });
        });
    });
}