var receive_payment_transaction = new receive_payment_transaction();
var query = "";
var dataset_from_browser = null; 
var sir_id = "";  
function receive_payment_transaction()
{
    init();

    function init()
    {
        $(document).ready(function()
        {
            document_ready();
        });
    }
    function document_ready()
    {

    }
}

function disabled_save_btn()
{
    $.each($(".rp-save-btn"), function()
    {
        $(this).html("Saving...");
        $(this).attr("disabled", "true");
    });
}
function enabled_save_btn()
{
    $.each($(".rp-save-btn"), function()
    {
        $(this).html("Save");
        $(this).removeAttr("disabled");
    });
}
function rp_edit_submit()
{
    var values = {};
    disabled_save_btn();
    $.each($('.form-receive-payment').serializeArray(), function(i, field) 
    {       
        if(field.name == "line_is_checked[]") 
        {
            values["line_is_checked"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["line_is_checked"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_rp_id[]") 
        {
            values["rpline_rp_id"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_rp_id"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_txn_id[]")
        {
            values["rpline_txn_id"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_txn_id"][index] = $(el).val();
            });         
        }
        else if(field.name == "rpline_reference_name[]") 
        {
            values["rpline_reference_name"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_reference_name"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_reference_id[]") 
        {
            values["rpline_reference_id"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_reference_id"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_amount[]") 
        {
            values["rpline_amount"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_amount"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_reference_name[]") 
        {
            values["rpline_reference_name"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_reference_name"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_txn_type[]") 
        {
            values["rpline_txn_type"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_txn_type"][index] = $(el).val();
            });
        }
        else if(field.name == "rp_cm_id[]") 
        {
            values["rp_cm_id"] = {};
            $('input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rp_cm_id"][index] = $(el).val();
            });
        }
        else if(field.name == "rp_cm_amount[]") 
        {
            values["rp_cm_amount"] = {};
            $('input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rp_cm_amount"][index] = $(el).val();
            });
        }
        else
        {
            values[field.name] = field.value;
        }
    });

    var customer_info = {};

    customer_info['rp_customer_id'] = values['rp_customer_id'];
    customer_info['rp_ar_account'] = values['rp_ar_account'];
    customer_info['rp_date'] = values['rp_date'];
    customer_info['rp_total_amount'] = values['rp_total_amount'].replace(',',"");
    customer_info['rp_payment_method'] = values['rp_payment_method'];
    customer_info['rp_memo'] = values['rp_memo'];
    customer_info['date_created'] = get_date_now();

    customer_info['rp_ref_name'] = "";
    customer_info['rp_ref_id'] = 0;
    
    customer_info['rp_credit_id'] = values['rp_cm_id'];
    customer_info['rp_credit_amount'] = values['rp_cm_amount'];
    

    var rp_id =values['rp_id'];
    var payment_line = values['line_is_checked'];

    var insert_line = {};
    if(customer_info['rp_ar_account'])
    {
        if(count(payment_line) > 0)
        {
            $.each(payment_line, function(key, val)
            {   
                if(val == 1)
                {   
                    insert_line[key]                 = {};
                    insert_line[key]['rpline_reference_name'] = values['rpline_txn_type'][key];
                    insert_line[key]['rpline_reference_id'] = values['rpline_txn_id'][key];
                    insert_line[key]['rpline_amount'] = values['rpline_amount'][key];
                }
            });
        }
        
        update_rp_submit(rp_id, customer_info, insert_line, function(rp_id)
        {
            if(rp_id != 0)
            {
                toastr.success("Success");
                setInterval(function()
                {
                    location.reload();
                },2000)            
            }
            else
            {
                alert("Something wen't wrong!");
                enabled_save_btn()
            }
        });
    }
    else
    {
        toastr.warning("Please Account to deposit payment");
        enabled_save_btn();
    }

}
function cancel_rp_submit(cm_id)
{
    update_cm_refname(cm_id, "retain_credit", function(res)
    {
        location.reload();                           
    });
}
function receive_payment_submit()
{
    var values = {};

    disabled_save_btn();
    $.each($('.form-receive-payment').serializeArray(), function(i, field) 
    {       
        if(field.name == "line_is_checked[]") 
        {
            values["line_is_checked"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["line_is_checked"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_rp_id[]") 
        {
            values["rpline_rp_id"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_rp_id"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_txn_id[]")
        {
            values["rpline_txn_id"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_txn_id"][index] = $(el).val();
            });         
        }
        else if(field.name == "rpline_reference_name[]") 
        {
            values["rpline_reference_name"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_reference_name"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_reference_id[]") 
        {
            values["rpline_reference_id"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_reference_id"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_amount[]") 
        {
            values["rpline_amount"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_amount"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_reference_name[]") 
        {
            values["rpline_reference_name"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_reference_name"][index] = $(el).val();
            });
        }
        else if(field.name == "rpline_txn_type[]") 
        {
            values["rpline_txn_type"] = {};
            $('.tbody-item input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rpline_txn_type"][index] = $(el).val();
            });
        }
        else if(field.name == "rp_cm_id[]") 
        {
            values["rp_cm_id"] = {};
            $('input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rp_cm_id"][index] = $(el).val();
            });
        }
        else if(field.name == "rp_cm_amount[]") 
        {
            values["rp_cm_amount"] = {};
            $('input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["rp_cm_amount"][index] = $(el).val();
            });
        }
        else
        {
            values[field.name] = field.value;
        }
    });

    var customer_info = {};

    customer_info['rp_customer_id'] = values['rp_customer_id'];
    customer_info['rp_ar_account'] = values['rp_ar_account'];
    customer_info['rp_date'] = values['rp_date'];
    customer_info['rp_total_amount'] = values['rp_total_amount'].replace(',',"");
    customer_info['rp_payment_method'] = values['rp_payment_method'];
    customer_info['rp_memo'] = values['rp_memo'];
    customer_info['date_created'] = get_date_now();

    customer_info['rp_ref_name'] = values['cm_id'] ? 'credit_memo' : '';
    customer_info['rp_ref_id'] = values['cm_id'] ? values['cm_id'] : 0;

    customer_info['rp_credit_id'] = values['rp_cm_id'];
    customer_info['rp_credit_amount'] = values['rp_cm_amount'];
    // console.log(customer_info);

    var payment_line = values['line_is_checked'];

    console.log(payment_line);
    console.log(count(payment_line));
    var insert_line = {};
    if(customer_info['rp_ar_account'])
    {
        if(count(payment_line) > 0)
        {
            $.each(payment_line, function(key, val)
            {   
                if(val == 1)
                {   
                    insert_line[key]                 = {};
                    insert_line[key]['rpline_reference_name'] = values['rpline_txn_type'][key];
                    insert_line[key]['rpline_reference_id'] = values['rpline_txn_id'][key];
                    insert_line[key]['rpline_amount'] = values['rpline_amount'][key];
                }
            });
            if(count(insert_line) > 0)
            {
                insert_rp_submit(customer_info, insert_line, function(rp_id)
                {
                    insert_manual_rp(rp_id, function(res)
                    {
                        if(res == "success")
                        {
                            toastr.success("Success");
                            setInterval(function()
                            {
                                location.reload();
                            },2000)
                        }
                    });
                });
            }
            else
            {
                toastr.warning("Please select customer & then select the invoice");
                enabled_save_btn();
            }
        }
        else
        {
            toastr.warning("Please select customer");
            enabled_save_btn();
        }
    }
    else
    {
        toastr.warning("Please select Account to deposit payment");
        enabled_save_btn();
    }

}