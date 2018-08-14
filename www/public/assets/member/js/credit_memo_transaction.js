var credit_memo_transaction = new credit_memo_transaction();

var dataset_from_browser = null; 
var sir_id = "";  
function credit_memo_transaction()
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
		check_if_have_login();
        edit_inv_item();
        edit_cm_item();
        initialize_select_plugin();
	}
	function check_if_have_login()
	{
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * from tbl_agent_logon LIMIT 1';            
            tx.executeSql(query_check, [], function(tx, results)
            {
                if(results.rows.length <= 0)
                {
                    location.href = "login.html";
                }
                else
                {
                	action_get_agent(results.rows);
                }
            });
        });
	}
	function action_get_agent(data)
	{
		db.transaction(function (tx)
        {
        	var query_check = 'SELECT * from tbl_employee LEFT JOIN tbl_position ON tbl_employee.position_id = tbl_position.position_id where employee_id = "'+data[0]['agent_id']+'" ';            
            tx.executeSql(query_check, [], function(tx, results)
            {
            	data_result = results.rows;
				$(".employee-name").html(data_result[0]['first_name']+" "+data_result[0]['middle_name']+" "+data_result[0]['last_name']);
				$(".employee-position").html(data_result[0]['position_name']);
                action_get_sir(data[0]['agent_id']);
            });
        });
	}
	function action_get_sir(agent_id)
	{
		db.transaction(function (tx)
        {
        	var query_check = 'SELECT * from tbl_sir where sales_agent_id = "'+agent_id+'" AND lof_status IN ("1","2") AND sir_status IN ("0","1")';     
            tx.executeSql(query_check, [], function(txs, results)
            {
            	data_result = results.rows;

				$(".sir-no").html(data_result[0]['sir_id']);
				sir_id = data_result[0]['sir_id'];

                var query_check_shop = 'SELECT shop_id FROM tbl_sir where sir_id = "'+sir_id+'"';
                tx.executeSql(query_check_shop, [], function(txs, results_sir)
                {
                    var shop_id = results_sir.rows[0]['shop_id'];
                    get_session('cm_id',function(cm_id)
                    {
                        if(cm_id == null || cm_id == 0)
                        {  
                            // FUNCTION HERE
                            get_data_for_invoice_transaction(sir_id, shop_id);
                        }
                    });
                });
            });        	
        });
	}  

    this.get_adding_item_modal = function(item_id, sir_id)
    {
        get_adding_item_modal(item_id, sir_id);
    }
    this.get_adding_cm_item_modal = function(item_id, sir_id)
    {
        get_adding_cm_item_modal(item_id, sir_id);        
    }
    function get_adding_cm_item_modal(item_id, sir_id)
    {
         db.transaction(function (tx)
        {
            var query_cm_item = 'SELECT * FROM tbl_item LEFT JOIN tbl_unit_measurement_multi ON tbl_unit_measurement_multi.multi_um_id = tbl_item.item_measurement_id  WHERE tbl_item.item_id = "'+item_id+'"';
            tx.executeSql(query_cm_item, [], function(txs, results_item_cm)
            {
                console.log(results_item_cm);
                var datarow = results_item_cm.rows;
                var item_row = results_item_cm.rows[0];

                var modal_content = "";

                modal_content += '<div class="modal-header">';
                modal_content += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                modal_content += '<h4 class="modal-title cm tablet-item-name">'+item_row['item_name']+'</h4>';
                modal_content += '</div>';
                modal_content += '<div class="modal-body add_new_package_modal_body clearfix">';
                modal_content += '<div class="form-group clearfix row">';
                modal_content += '<div class="col-xs-4">';
                modal_content += '<input type="hidden" name="cm_sir_id" class="cm tablet-sir-id" value="'+sir_id+'">';
                modal_content += '<input type="hidden" name="item_id" class="cm tablet-item-id" value="'+item_row['item_id']+'">';
                modal_content += '<h4> U/M </h4>';
                modal_content += '</div>';
                modal_content += '<div class="col-xs-8">';

                /* UNIT OF MEASUREMENT HERE (SELECT) */
                modal_content += '<select class="1111 cm tablet-droplist-um tablet-item-um form-control">';

                var option = "";
                $(datarow).each(function(a,b)
                {
                    option += '<option value="'+datarow[a]['multi_id']+'"  abbrev="'+datarow[a]['multi_abbrev']+'" qty="'+datarow[a]['unit_qty']+'">'+datarow[a]['multi_name']+'</option>';
                });
                modal_content += option;
                modal_content += '</select>';

                modal_content += '</div>';
                modal_content += ' </div>';
                modal_content += '<div class="form-group clearfix row">';
                modal_content += '<div class="col-xs-4">';
                modal_content += '<h4> Quantity </h4>';
                modal_content += '</div>';
                modal_content += '<div class="col-xs-8">';
                modal_content += '<input type="text" class="form-control input-sm text-right number-input cm tablet-item-qty tablet-compute" value="1" name="invline_qty">';
                modal_content += '</div>';
                modal_content += '</div>';
                modal_content += '<div class="form-group clearfix row">';
                modal_content += '<div class="col-xs-4">';
                modal_content += '<h4> Rate </h4>';
                modal_content += ' </div>';
                modal_content += '<div class="col-xs-8">';
                modal_content += '<input type="hidden" name="" class="cm tablet-price-per-item" value="'+item_row['item_price']+'">';
                modal_content += '<input type="text" style="text-align: right; border: 0;border-bottom: 1px solid #000;outline: 0;" class="form-control input-sm cm tablet-item-rate tablet-compute number-input" name="invline_rate" value="'+(item_row['item_price']).toFixed(2)+'">';
                modal_content += '</div>';
                modal_content += '</div>';
                modal_content += '<div class="form-group clearfix row">';
                modal_content += '<div class="col-xs-4">';
                modal_content += '<h4> Amount </h4>';
                modal_content += '</div>        ';
                modal_content += '<div class="col-xs-8 text-right">';
                modal_content += '<input type="hidden" class="cm tablet-item-amount">';
                modal_content += '<h3 class="cm tablet-item-amount"></h3>';
                modal_content += '</div>';
                modal_content += '</div>';
                modal_content += '<div class="form-group clearfix row">';
                modal_content += '<div class="col-xs-12">';
                modal_content += '<h4> Description </h4>';
                modal_content += '</div>        ';
                modal_content += '<div class="col-xs-12">';
                modal_content += '<textarea class="form-control input-sm cm tablet-item-desc">'+item_row['item_sales_information']+'</textarea>';
                modal_content += '</div>';
                modal_content += '</div>';
                modal_content += '</div>';
                modal_content += '<div class="modal-footer">';
                modal_content += '<div class="col-md-6 col-xs-6">';
                modal_content += '<button data-dismiss="modal" class="btn btn-custom-white form-control">Cancel</button>';
                modal_content += '</div>';
                modal_content += '<div class="col-md-6 col-xs-6">';
                modal_content += '<button class="btn btn-custom-blue form-control  cm tablet-add-item">Done</button>';
                modal_content += '</div>';
                modal_content += '</div>';


                $("#global_modal").modal('show');
                $("#global_modal").find(".modal-dialog").addClass("modal-md");
                $("#global_modal").find(".modal-content").html(modal_content);

                tablet_credit_memo.iniatilize_select();
                tablet_credit_memo.event_tablet_compute_class_change();
                tablet_credit_memo.action_add_item_submit();
                tablet_credit_memo.action_compute_tablet();


                $(".cm.tablet-droplist-um").val($(".cm.tablet-droplist-um").find("option:first").val()).change();

            });
        });
    }
    function get_adding_item_modal(item_id, sir_id)
    {
        db.transaction(function (tx)
        {
            var query_item = 'SELECT * FROM tbl_sir_item LEFT JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id  WHERE tbl_sir_item.item_id = "'+item_id+'" and tbl_sir_item.sir_id = "'+sir_id+'"';
            tx.executeSql(query_item, [], function(txs, results_item)
            {
                var datarow = results_item.rows[0];

                // related_um_type
                var query_um = 'SELECT * FROM tbl_unit_measurement_multi where multi_id = "'+datarow['related_um_type']+'"';
                tx.executeSql(query_um, [], function(txs, results_um)
                {
                    var datarow_um = results_um.rows[0];

                    var query_um_multi = 'SELECT * FROM tbl_unit_measurement_multi where multi_um_id = "'+datarow_um['multi_um_id']+'"';
                    tx.executeSql(query_um_multi, [], function(txs, results_um_multi)
                    {

                        var datarow_um_multi = results_um_multi.rows;

                        var modal_content = "";

                        modal_content += '<div class="modal-header">';
                        modal_content += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                        modal_content += '<h4 class="modal-title tablet-item-name">'+datarow['item_name']+'</h4>';
                        modal_content += '</div>';
                        modal_content += '<div class="modal-body add_new_package_modal_body clearfix">';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<input type="hidden" name="inv_sir_id" class="inv tablet-sir-id" value="'+sir_id+'">';
                        modal_content += '<input type="hidden" name="item_id" class="tablet-item-id" value="'+datarow['item_id']+'">';
                        modal_content += '<h4> U/M </h4>';
                        modal_content += '</div>';
                        modal_content += '<div class="col-xs-8">';

                        /* UNIT OF MEASUREMENT HERE (SELECT) */
                        modal_content += '<select class="1111 inv tablet-droplist-um form-control tablet-item-um">';

                        var option = "";
                        $(datarow_um_multi).each(function(a,b)
                        {
                            option += '<option value="'+datarow_um_multi[a]['multi_id']+'"  abbrev="'+datarow_um_multi[a]['multi_abbrev']+'" qty="'+datarow_um_multi[a]['unit_qty']+'">'+datarow_um_multi[a]['multi_name']+'</option>';
                        });
                        modal_content += option;
                        modal_content += '</select>';


                        modal_content += '</div>';
                        modal_content += ' </div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Quantity </h4>';
                        modal_content += '</div>';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="text" class="form-control input-sm text-right number-input tablet-item-qty tablet-compute" value="1" name="invline_qty">';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Rate </h4>';
                        modal_content += ' </div>';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="hidden" name="" class="tablet-price-per-item" value="'+datarow['sir_item_price']+'">';
                        modal_content += '<input type="text" style="text-align: right; border: 0;border-bottom: 1px solid #000;outline: 0;" class="form-control input-sm tablet-item-rate tablet-compute number-input" name="invline_rate" value="'+(datarow['sir_item_price']).toFixed(2)+'">';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Discount </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="text" class="form-control text-right input-sm tablet-item-disc tablet-compute" name="">';
                        modal_content += '</div>';
                        modal_content += '</div>';


                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Remark </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="text" class="form-control input-sm tablet-item-remark">';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Amount </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-8 text-right">';
                        modal_content += '<input type="hidden" class="form-control input-sm input-item-amount">';
                        modal_content += '<h3 class="tablet-item-amount"></h3>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-12">';
                        modal_content += '<h4> Description </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-12">';
                        modal_content += '<textarea class="form-control input-sm tablet-item-desc">'+datarow['item_sales_information']+'</textarea>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-12">';
                        modal_content += '<label><input type="checkbox" name="taxable" class="tablet-item-taxable"> <span>Taxable</span></label>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="modal-footer">';
                        modal_content += '<div class="col-md-6 col-xs-6">';
                        modal_content += '<button data-dismiss="modal" class="btn btn-custom-white form-control">Cancel</button>';
                        modal_content += '</div>';
                        modal_content += '<div class="col-md-6 col-xs-6">';
                        modal_content += '<button class="btn btn-custom-blue form-control tablet-add-item">Done</button>';
                        modal_content += '</div>';
                        modal_content += '</div>';


                        $("#global_modal").modal('show');
                        $("#global_modal").find(".modal-dialog").addClass("modal-md");
                        $("#global_modal").find(".modal-content").html(modal_content);


                        tablet_credit_memo.iniatilize_select();
                        tablet_credit_memo.action_compute_tablet();
                        tablet_credit_memo.action_add_item_submit();
                        tablet_credit_memo.action_add_cm_item_submit();

                        $(".inv.tablet-droplist-um").val($(".inv.tablet-droplist-um").find("option:first").val()).change();

                    });
                });
            }); 
        });
    }
    function get_data_for_invoice_transaction(sir_id,shop_id)
    {
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * FROM tbl_customer_invoice where inv_shop_id = "'+shop_id+'" ORDER BY new_inv_id DESC LIMIT 1';
            tx.executeSql(query_check, [], function(txs, results_id)
            {
                $(".new-invoice-id").val(results_id.rows[0]['new_inv_id'] + 1);
            });

            var query_select_customer = 'SELECT * FROM tbl_customer WHERE archived = "0" and shop_id = "'+shop_id+'"';
            tx.executeSql(query_select_customer, [], function(txs, results_customer)
            {
                var data_result = results_customer.rows;
                var option = "";
                $(data_result).each(function(key, datarow)
                {
                    var customer_name = datarow['company'] != "" ? datarow['company'] : datarow['first_name'] +" "+datarow['middle_name']+" "+datarow['last_name']; 
                    option += '<option value="'+datarow['customer_id']+'" email="'+datarow['customer_id']+'">'+customer_name+'</option>';
                });
                $(".customer-select-list").html(option).globalDropList("reload");
            });
            var query_terms = 'SELECT * FROM tbl_terms WHERE archived = "0" and terms_shop_id = "'+shop_id+'"';
            tx.executeSql(query_terms, [], function(txs, results_terms)
            {
                var data_result_terms = results_terms.rows;
                var option = "";
                $(data_result_terms).each(function(key, datarow)
                {
                    option += '<option value="'+datarow['terms_id']+'" days="'+datarow['terms_no_of_days']+'">'+datarow['terms_name']+'</option>';
                });

                var today = new Date();
                $(".droplist-terms").html(option).globalDropList("reload");
                $(".inv-date-input").val((today.getMonth()+1) + "/" + today.getDate() + "/" +today.getFullYear());
                $(".inv-due-date-input").val((today.getMonth()+1) + "/" + today.getDate() + "/" +today.getFullYear());
            });

            var query_sir_item = 'SELECT * FROM tbl_item where archived = 0 AND shop_id = '+shop_id;
            tx.executeSql(query_sir_item, [], function(txs, results_sir_item)
            {
                var data_result_sir_item = results_sir_item.rows;
                var option = "";
                $(data_result_sir_item).each(function(key, datarow)
                {
                    option += '<option sir_id="'+sir_id+'" value="'+datarow['item_id']+'" item-sku="'+datarow['item_sku']+'" item-type="" sales-info="'+datarow['item_sales_information']+'" purchase-info="'+datarow['item_purchasing_information']+'" price="'+datarow['sir_item_price']+'" has-um="'+datarow['item_measurement_id']+'" >'+datarow['item_name']+'</option>';
                });
                $(".tablet-droplist-item").html(option).globalDropList("reload");
            });

            // CM ITEM
            var query_sir_cm_item = 'SELECT * FROM tbl_item LEFT JOIN tbl_category ON type_id = item_category_id WHERE is_mts = 1 AND tbl_item.archived = 0 AND shop_id = "'+shop_id+'" GROUP BY tbl_item.item_id';
            tx.executeSql(query_sir_cm_item, [], function(txs, results_cm_item)
            {
                var data_result_cm_item = results_cm_item.rows;
                var option = "";
                $(data_result_cm_item).each(function(key, datarow_cm)
                {
                    option += '<option sir_id="'+sir_id+'" value="'+datarow_cm['item_id']+'" item-sku="'+datarow_cm['item_sku']+'" item-type="" sales-info="'+datarow_cm['item_sales_information']+'" purchase-info="'+datarow_cm['item_purchasing_information']+'" price="'+datarow_cm['sir_item_price']+'" has-um="'+datarow_cm['item_measurement_id']+'" >'+datarow_cm['item_name']+'</option>';
                });
                $(".tablet-droplist-item-return").html(option).globalDropList("reload");
            });
        });

    }
    function edit_inv_item()
    {
        $("body").on("click", ".edit-inv-item.inv-item", function()
        {
            var item_id = $(this).attr("item_id");
            var sir_id = $(this).attr("sir_id");

            get_adding_item_modal(item_id, sir_id);
        });
    }
    function edit_cm_item()
    {
        $("body").on("click", ".edit-item-cm.cmline", function()
        {
            var item_id = $(this).attr("item_id");
            var sir_id = $(this).attr("sir_id");

            get_adding_cm_item_modal(item_id, sir_id);
        });
    }
}
function disabled_save_btn()
{
    $.each($(".cm-edit-btn"), function()
    {
        $(this).html("Saving...");
        $(this).attr("disabled", "true");
    });
}
function enabled_save_btn()
{
    $.each($(".cm-edit-btn"), function()
    {
        $(this).html("Save");
        $(this).removeAttr("disabled");
    });
}
function cm_edit_submit()
{

    var ctr = 0;
    var status = null;
    var status_message = null;
    var data = {};
    var values = {};

    disabled_save_btn();
    $.each($('.form-to-submit-transfer').serializeArray(), function(i, field) 
    {
        if (field.name == "cmline_amount[]") 
        {
            values["cmline_amount"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_amount"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_description[]") 
        {
            values["cmline_description"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_description"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_item_id[]") 
        {
            values["cmline_item_id"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_item_id"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_qty[]") 
        {
            values["cmline_qty"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_qty"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_rate[]") 
        {
            values["cmline_rate"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_rate"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_um[]") 
        {
            values["cmline_um"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_um"][index] = $(el).val();
            });
        }
        else
        {
            values[field.name] = field.value;
        }
    });
    var cm_id = values['credit_memo_id'];
    // console.log("Request::input()");
    // console.log(values);
    var customer_info = {};
    customer_info["cm_customer_id"] = values["cm_customer_id"];
    customer_info["cm_customer_email"] = values["cm_customer_email"];
    customer_info["cm_date"] = values["cm_date"];
    customer_info["cm_message"] = values["cm_message"];
    customer_info["cm_memo"] = values["cm_memo"];
    customer_info["cm_amount"] = values["overall_price"];
    customer_info["cm_type"] = 1;
    customer_info["cm_used_ref_name"] = value['credit_type'];
    customer_info["cm_status"] = 0;
    // console.log("Customer Info");
    // console.log(customer_info);
    var item_info = {};
    var _items = values["cmline_item_id"];
    if(_items)
    {
        $.each(_items, function(index, val) 
        {
            if(val != null)
            {  
                ctr++;
                item_info[index]                       = {};              
                item_info[index]['item_service_date']  = "";
                item_info[index]['item_id']            = values['cmline_item_id'][index];
                item_info[index]['item_description']   = values['cmline_description'][index];
                item_info[index]['um']                 = values['cmline_um'][index];
                item_info[index]['quantity']           = values['cmline_qty'][index].replace(',',"");
                item_info[index]['rate']               = values['cmline_rate'][index].replace(',',"");
                item_info[index]['amount']             = values['cmline_amount'][index].replace(',',"");
            }
        });       
    }
    // console.log("Item Info");
    // console.log(item_info);

    if(count(_items) > 0)
    { 
        get_item_returns(_items, values,function(item_returns)
        {
            update_cm_submit(cm_id, customer_info, item_info, item_returns, 0, function(returns_cm, cm_id)
            {
               
                toastr.success("Success");
                setInterval(function()
                {
                    location.reload();
                },2000)
            });
        });
    }
    else
    {
        toastr.warning("Please Select Item");
        enabled_save_btn();
    }

}
function credit_memo_submit()
{
    var ctr = 0;
    var status = null;
    var status_message = null;
    var data = {};
    var values = {};

    disabled_save_btn();
    $.each($('.form-to-submit-transfer').serializeArray(), function(i, field) 
    {
        if (field.name == "cmline_amount[]") 
        {
            values["cmline_amount"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_amount"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_description[]") 
        {
            values["cmline_description"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_description"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_item_id[]") 
        {
            values["cmline_item_id"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_item_id"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_qty[]") 
        {
            values["cmline_qty"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_qty"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_rate[]") 
        {
            values["cmline_rate"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_rate"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_um[]") 
        {
            values["cmline_um"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_um"][index] = $(el).val();
            });
        }
        else
        {
            values[field.name] = field.value;
        }
    });
    // console.log("Request::input()");
    // console.log(values);
    var customer_info = {};
    customer_info["cm_customer_id"] = values["cm_customer_id"];
    customer_info["cm_customer_email"] = values["cm_customer_email"];
    customer_info["cm_date"] = values["cm_date"];
    customer_info["cm_message"] = values["cm_message"];
    customer_info["cm_memo"] = values["cm_memo"];
    customer_info["cm_amount"] = values["overall_price"];
    customer_info["cm_type"] = 1;
    customer_info["cm_used_ref_name"] = values['credit_type'];
    customer_info["cm_status"] = 0;
    // console.log("Customer Info");
    console.log(customer_info["cm_used_ref_name"]);
    var item_info = {};
    var _items = values["cmline_item_id"];
    if(_items)
    {
        $.each(_items, function(index, val) 
        {
            if(val != null)
            {  
                ctr++;
                item_info[index]                       = {};              
                item_info[index]['item_service_date']  = "";
                item_info[index]['item_id']            = values['cmline_item_id'][index];
                item_info[index]['item_description']   = values['cmline_description'][index];
                item_info[index]['um']                 = values['cmline_um'][index];
                item_info[index]['quantity']           = values['cmline_qty'][index].replace(',',"");
                item_info[index]['rate']               = values['cmline_rate'][index].replace(',',"");
                item_info[index]['amount']             = values['cmline_amount'][index].replace(',',"");
            }
        });       
    }
    // console.log("Item Info");
    // console.log(item_info);

    if(count(_items) > 0)
    {  
        var ctr = 0;
        get_item_returns(_items, values,function(item_returns)
        {
            insert_cm_submit(customer_info, item_info, item_returns, 0, function(returns_cm, cm_id)
            {
                if(returns_cm == 'success')
                {
                    insert_manual_cm(cm_id, function(result_update)
                    {
                        toastr.success("Success");
                        if(customer_info["cm_used_ref_name"] == 'apply')
                        {
                          apply_to_invoice("invoice_tablet", cm_id);
                        }
                        else
                        {
                            setInterval(function()
                            {
                                location.reload();
                            },2000);
                        }
                    })
                }
            });
        });
    }
    else
    {
        toastr.warning("Please Select Item");
        enabled_save_btn();
    }


    // if(ctr == 0)
    // {
    //     data["status"] = "error";
    //     data["status_message"] = "Please Insert Item";
    // }
    // if(data["status"] == null)
    // {            
    //     get_shop_id(function(shop_id)
    //     {
    //         var insert_cm = {};
    //         insert_cm["cm_shop_id"] = shop_id;
    //         insert_cm["cm_customer_id"] = customer_info["cm_customer_id"];
    //         insert_cm["cm_customer_email"] = customer_info["cm_customer_email"];
    //         insert_cm["cm_date"] = customer_info["cm_date"];
    //         insert_cm["cm_message"] = customer_info["cm_message"];
    //         insert_cm["cm_memo"] = customer_info["cm_memo"];
    //         insert_cm["cm_amount"] = customer_info["cm_amount"];
    //         insert_cm["cm_type"] = 0;
    //         insert_cm["cm_used_ref_id"] = 0;
    //         insert_cm["cm_used_ref_name"] = "returns";
    //         insert_cm["date_created"] = get_date_now();
    //         // console.log(insert_cm);
    //         // $cm_id = Tbl_credit_memo::insertGetId($insert_cm);
    //         var insert_row = 'INSERT INTO tbl_credit_memo (cm_shop_id, cm_customer_id, cm_customer_email, cm_date, cm_message, cm_memo, cm_amount, cm_type, date_created, cm_ar_acccount, cm_used_ref_id, cm_used_ref_name) VALUES '+
    //         '("'+insert_cm["cm_shop_id"]+'", "'+insert_cm["cm_customer_id"]+'", "'+insert_cm["cm_customer_email"]+'", "'+insert_cm["cm_date"]+'", "'+insert_cm["cm_date"]+'", "'+insert_cm["cm_message"]+'", "'+insert_cm["cm_memo"]+'", "'+insert_cm["cm_type"]+'", "'+insert_cm["date_created"]+'", '+insert_cm["cm_type"]+', '+insert_cm["cm_used_ref_id"]+', "'+insert_cm["cm_used_ref_name"]+'")';
    //         db.transaction(function (tx) 
    //         {  
    //             tx.executeSql(
    //                 insert_row, [],
    //                 function(tx, results)
    //                 {
    //                     var cm_id = results.insertId;
    //                     alert(cm_id);
    //                     /* Transaction Journal */
    //                     var entry                   = {}
    //                     entry["reference_module"]  = "credit-memo";
    //                     entry["reference_id"]      = cm_id;
    //                     entry["name_id"]           = customer_info['cm_customer_id'];
    //                     entry["total"]             = customer_info["cm_amount"];
    //                     entry["vatable"]           = '';
    //                     entry["discount"]          = '';
    //                     entry["ewt"]               = '';

    //                     // CreditMemo::insert_cmline($cm_id, $item_info, $entry);
    //                     /* Insert CM Line */
    //                     var insert_cmline = {};
    //                     var item_type = {};
    //                     var entry_data = {};
    //                     var item_bundle = {};
    //                     var item_data = {};
    //                     $.each(item_info, function(index, val) 
    //                     {
    //                         insert_cmline["cmline_cm_id"] = cm_id;
    //                         // $insert_cmline["cmline_service_date"] = $value["item_service_date"];
    //                         insert_cmline["cmline_um"] = val["um"];
    //                         insert_cmline["cmline_item_id"] = val["item_id"];
    //                         insert_cmline["cmline_description"] = val["item_description"];
    //                         insert_cmline["cmline_qty"] = val["quantity"];
    //                         insert_cmline["cmline_rate"] = val["rate"];
    //                         insert_cmline["cmline_amount"] = val["amount"];
    //                         insert_cmline["cmline_service_date"] = "0000-00-00 00:00:00";

    //                         // Tbl_credit_memo_line::insert($insert_cmline);
    //                         db.transaction(function (tx) 
    //                         {  
    //                             tx.executeSql(
    //                                 'INSERT INTO tbl_credit_memo_line (cmline_cm_id, cmline_um, cmline_item_id, cmline_description, cmline_qty, cmline_rate, cmline_amount, cmline_service_date) '+
    //                                 'VALUES ("'+insert_cmline["cmline_cm_id"]+'", "'+insert_cmline["cmline_um"]+'", "'+insert_cmline["cmline_item_id"]+'", "'+insert_cmline["cmline_description"]+'", "'+insert_cmline["cmline_qty"]+'", "'+insert_cmline["cmline_rate"]+'", "'+insert_cmline["cmline_amount"]+'", "'+insert_cmline["cmline_service_date"]+'")',
    //                                 [],
    //                                 function(tx, results)
    //                                 {
    //                                     // $item_type = Item::get_item_type($value['item_id']);
    //                                     // var item_type = Tbl_item::where("item_id",$item_id)->pluck("item_type_id");
    //                                     db.transaction(function (tx) 
    //                                     {  
    //                                         var item_query = 'SELECT * from tbl_item WHERE "item_id" = "'+val.item_id+'"';

    //                                         tx.executeSql(
    //                                             item_query,
    //                                             [],
    //                                             function(tx, results)
    //                                             {
    //                                                 if (results.rows.length <= 0) 
    //                                                 {
    //                                                     alert("Some error occurred. Item not found.");
    //                                                 }     
    //                                                 else
    //                                                 {
    //                                                     var item_type = results.rows[0].item_type_id;

    //                                                     /* TRANSACTION JOURNAL */  
    //                                                     if(item_type != 4)
    //                                                     { 
    //                                                         entry_data[index]                       = {};

    //                                                         entry_data[index]['item_id']            = val.item_id;
    //                                                         entry_data[index]['entry_qty']          = val.quantity;
    //                                                         entry_data[index]['vatable']            = 0;
    //                                                         entry_data[index]['discount']           = 0;
    //                                                         entry_data[index]['entry_amount']       = val.amount;
    //                                                         entry_data[index]['entry_description']  = val.item_description;

    //                                                         post_journal_entries(entry, entry_data);
    //                                                     }
    //                                                     else
    //                                                     {
    //                                                         // $item_bundle = Item::get_item_in_bundle($value['item_id']);
    //                                                         // var item_bundle = bl_item_bundle::where("bundle_bundle_id",$item_id)->get();
    //                                                         db.transaction(function (tx) 
    //                                                         {  
    //                                                             tx.executeSql(
    //                                                                 'SELECT * from tbl_item_bundle WHERE bundle_bundle_id = '+val.item_id, [],
    //                                                                 function(tx, results)
    //                                                                 {
    //                                                                     var item_bundle = results.rows;

    //                                                                     $.each(item_bundle, function(key_bundle, value_bundle) 
    //                                                                     {
    //                                                                         // item_data = Item::get_item_details($value_bundle->bundle_item_id);
    //                                                                         db.transaction(function (tx) 
    //                                                                         {  
    //                                                                             tx.executeSql(
    //                                                                                 'SELECT * from tbl_item '+
    //                                                                                 'LEFT JOIN tbl_unit_measurement_multi on multi_um_id = item_measurement_id '+
    //                                                                                 'LEFT JOIN tb_category on type_id = item_category_id '+
    //                                                                                 'WHERE item_id = '+val.item_id,
    //                                                                                 [],
    //                                                                                 function(tx, results)
    //                                                                                 {
    //                                                                                     if (results.rows.length <= 0) 
    //                                                                                     {
    //                                                                                         alert("Some error occurred. Item not found.");
    //                                                                                     }     
    //                                                                                     else
    //                                                                                     {
    //                                                                                         var item_data = results.rows[0];

    //                                                                                         /*-------------------------------*/
    //                                                                                         // $um_info = UnitMeasurement::um_info($um_id);
    //                                                                                         // Tbl_unit_measurement_multi::where("multi_id",$multi_id)->first()
    //                                                                                         db.transaction(function (tx) 
    //                                                                                         {  
    //                                                                                             tx.executeSql(
    //                                                                                                 'SELECT * from tbl_unit_measurement_multi WHERE multi_id = '+value_bundle.bundle_um_id,
    //                                                                                                 [],
    //                                                                                                 function(tx, results)
    //                                                                                                 {
    //                                                                                                     var return_qty = 1;

    //                                                                                                     if(results.rows.length > 0)
    //                                                                                                     {
    //                                                                                                         var um_info = results.rows[0];
    //                                                                                                         return_qty = um_info.unit_qty;
    //                                                                                                     }

    //                                                                                                     entry_data['b'+index+key_bundle]['item_id']            = value_bundle.bundle_item_id;
    //                                                                                                     entry_data['b'+index+key_bundle]['entry_qty']          = val.quantity * (return_qty * value_bundle.bundle_qty);
    //                                                                                                     entry_data['b'+index+key_bundle]['vatable']            = 0;
    //                                                                                                     entry_data['b'+index+key_bundle]['discount']           = 0;
    //                                                                                                     entry_data['b'+index+key_bundle]['entry_amount']       = item_data.item_price * entry_data['b'+index+key_bundle]['entry_qty'];
    //                                                                                                     entry_data['b'+index+key_bundle]['entry_description']  = item_data.item_sales_information; 

    //                                                                                                     post_journal_entries(entry, entry_data);
    //                                                                                                 },
    //                                                                                                 onError
    //                                                                                             );
    //                                                                                         });
    //                                                                                         /*-----------------------------*/
    //                                                                                     }
    //                                                                                 },
    //                                                                                 onError
    //                                                                             ); 
    //                                                                         });
    //                                                                     }); 
    //                                                                 },
    //                                                                 onError
    //                                                             );
    //                                                         });
    //                                                     }
    //                                                 }
    //                                             },
    //                                             onError
    //                                         );
    //                                     });
    //                                 },
    //                                 onError
    //                             );
    //                         });
    //                     });
    //                 },
    //                 onError
    //             );
    //         });
    //     })
        
    //     // if($inv_id != 0)
    //  //    {
    //  //        $up["credit_memo_id"] = $cm_id;
    //  //        Tbl_customer_invoice::where("inv_id",$inv_id)->update($up);
    //  //    }

    //  //    $cm_data = AuditTrail::get_table_data("tbl_credit_memo","cm_id",$cm_id);
    //  //    AuditTrail::record_logs("Added","credit_memo",$cm_id,"",serialize($cm_data));
        
    //     // $cm_id = CreditMemo::postCM($customer_info, $item_info,0, true);

    //     // $ins_manual_cm["sir_id"] = Request::input("sir_id");
    //     // $ins_manual_cm["cm_id"] = $cm_id;
    //     // $ins_manual_cm["manual_cm_date"] = Carbon::now();

    //     // Tbl_manual_credit_memo::insert($ins_manual_cm);

    //     // $data["status"] = "success-credit-memo-tablet";
    //     // $data["id"] = $cm_id;
    //     // $data["redirect_to"] = "/tablet/credit_memo/add?id=".$cm_id."&sir_id=".Request::input("sir_id");
    // }

    // return json_encode($data);
}

function cm_type_modal(cm_id)
{
    var modal_content = "";

    modal_content += '<div class="modal-header">' +
                     '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                     '<h4 class="modal-title">Confirm</h4>'+
                     '</div>'+
                     '<div class="modal-body add_new_package_modal_body clearfix">'+
                     '<div class="col-md-12 text-center">' +
                     '<div class="form-group">' +
                     '<div class="col-md-12 col-xs-12">' +
                     '<a class="btn btn-def-white btn-custom-blue form-control" href="../../agent/credit_memo.html">Returns</a>'+
                     '</div>'+
                     '</div>'+
                     '<br>'+
                     '<br>'+
                     '<div class="form-group">'+
                     '<div class="col-md-12 col-xs-12">' +
                     '<a class="btn btn-def-white btn-custom-white form-control" onClick="cm_update(`others_tablet`, '+cm_id+')">Others</a>' +
                     '</div>' +
                     '</div>' +
                     '<br>' +
                     '<br>' +
                     '<div class="form-group">' +
                     '<div class="col-md-12 col-xs-12">'+
                     '<a class="btn btn-def-white btn-custom-white form-control" onClick="apply_to_invoice(`invoice_tablet`, '+cm_id+')">Apply to an Invoice</a>'+
                     '</div>'+
                     '</div>';

    $("#global_modal").modal('show');
    $("#global_modal").find(".modal-dialog").addClass("modal-md");
    $("#global_modal").find(".modal-content").html(modal_content);
}

function cm_update(type, cm_id)
{
    update_cm(type, cm_id, function(res)
    {
        if(res == 'success')
        {
            toastr.success("Success");
            setInterval(function()
            {
                location.reload();
            },2000)            
        }
    });
}
function action_put_payment()
    {
        get_payment_method(function(_payment_method)
        {
            $('.drop-down-payment').html('');
            var ctr = 0;
            $.each(_payment_method, function(key, value)
            {
                ctr++;
                $('.drop-down-payment').globalDropList("reload");
                var append = '<option value="'+value['payment_method_id']+'">'+value['payment_name']+'</option>';
                $('.drop-down-payment').append(append);
                if(_payment_method.length == ctr)
                {
                    $('.drop-down-payment').globalDropList("reload");
                }
            });
        });
    }

    function action_put_accounting()
    {
        get_all_coa(function(coa)
        {
            $('.drop-down-coa').html('');
            var ctr = 0;
            $.each(coa, function(index, val) 
            {
                ctr++;
                var append = '<option value="'+val.account_id+'" indent="'+val.account_sublevel+'" add-search="" reference="">'+
                             val.account_number+' • '+val.account_name+
                             '</option>';
                $('.drop-down-coa').append(append);
                // console.log(append);
                if (coa.length == ctr) 
                {
                    $('.drop-down-coa').globalDropList("reload");
                }
            });
        });
    }
    function initialize_select_plugin()
    {
        $(".drop-down-payment").globalDropList(
        {
            hasPopup    : "false",
            width       : "100%",
            placeholder : 'Payment Method'
        });

        $(".drop-down-coa").globalDropList(
        {
            hasPopup    : "false",
            width       : "100%",
            placeholder : 'Account'
        });
    }

function apply_to_invoice(type, cm_id)
{
    if(type == 'invoice_tablet')
    {
        get_cm_data(cm_id, function(cm, _cmline)
        {
            var customer_id = cm['cm_customer_id'];
            get_shop_id(function(shop_id)
            {
                db.transaction(function (tx)
                {
                    var query_check = 'SELECT * FROM tbl_customer_invoice '+
                                      'LEFT JOIN (SELECT sum(rpline_amount) as amount_applied, rpline_reference_id from tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = '+shop_id+' and rpline_reference_name = "invoice" GROUP BY rpline_reference_id) ON rpline_reference_id = inv_id '+
                                      'WHERE inv_shop_id = '+shop_id+' AND inv_customer_id = '+customer_id+' AND inv_is_paid = 0 AND is_sales_receipt = 0';

                    tx.executeSql(query_check, [], function(tx, results)
                    {
                        var append_default = '<tr class="inv-rp-id">'+
                                                 '<input type="hidden" value="invoice" name="rpline_txn_type[]">'+
                                                 '<input type="hidden" value="" name="rpline_txn_id[]" class="inv-rp-id">'+
                                                  '<td class="text-center">'+
                                                    '<input type="hidden" class="line-is-checked" name="line_is_checked[]" value="" >'+
                                                    '<input type="checkbox" class="line-checked">'+
                                                  '</td>'+
                                                  '<td></td>'+
                                                  '<td class="text-right"></td>'+
                                                  '<td><input type="text" class="text-right original-amount" value="" disabled /></td>'+
                                                  '<td><input type="text" class="text-right balance-due" value="" disabled /></td>'+
                                                  '<td><input type="text" class="text-right amount-payment" name="rpline_amount[]" value=""/></td>'+
                                              '</tr>';
                        if (results.rows.length <= 0) 
                        {
                            $('.tbody-item').html(append_default);
                            update_cm_refname(cm_id, "retain_credit", function(res)
                            {
                                location.reload();                           
                            });
                        }
                        else
                        {
                            $("#modal_cm_apply_invoice").modal('show');
                            $("#modal_cm_apply_invoice").find(".modal-dialog").addClass("modal-md");
                            action_put_payment();
                            action_put_accounting();

                            $('.amount-received').val(cm['cm_amount']);
                            $('.cm-rp-customer-name').val(cm['company'] != "" ? cm['company'] : cm['first_name'] +" "+cm['middle_name']+" "+cm['last_name']);
                            $('.cm-rp-customer-id').val(customer_id);
                            $('.cm-id').val(cm_id);
                            
                            $('.tbody-item').html('');
                            $('.load-applied-credits').html('');
                            $html = '<li class="payment-li" style="list-style: none;">'+
                              '<div class="form-group row clearfix">'+
                                  '<div class="col-sm-1">' +
                                     '<a href="javascript:" class="remove-credit" credit-id="'+cm_id+'"> <i class="fa fa-times-circle" style="color:red"></i></a> ' +
                                     '<input type="hidden" name="rp_cm_id[]" value="'+cm_id+'">'+
                                  '</div>'+
                                  '<div class="col-sm-4">'+
                                      cm_id +
                                  '</div>'+
                                  '<div class="col-sm-5 text-right">PHP '+
                                      cm['cm_amount'] +
                                   '</div>' +
                                     '<input type="hidden" name="rp_cm_amount[]" class="compute-applied-credit" value="'+cm['cm_amount']+'">'+
                              '</div>' +
                              '</li>';
                            $('.load-applied-credits').html($html);
                            var ctr = 0;
                            var total_amount = 0;
                            $.each(results.rows, function(index, val) 
                            {
                                get_cm_amount(val.credit_memo_id, function(cm_amount)
                                {
                                    ctr++;
                                    var $total_balance = (((val.inv_overall_price) - val.amount_applied) + ((val.rpline_amount ? val.rpline_amount : 0 ) - cm_amount)).toFixed(2);
                                    var price_to_pay = 0;
                                    var sign = '';
                                    var value = 0;
                                    if($total_balance >= cm['cm_amount'] && ctr == 1)
                                    {
                                        price_to_pay = cm['cm_amount'];
                                        sign = 'checked';
                                        value = 1;
                                        total_amount += cm['cm_amount'];
                                    }

                                    var append = '<tr class="inv-rp-id" inv_rp_id="'+val.inv_id+'">'+
                                                     '<input type="hidden" value="invoice" class="rp-type" name="rpline_txn_type[]">'+
                                                     '<input type="hidden" value="'+val.inv_id+'" class="rp-inv-id" name="rpline_txn_id[]">'+
                                                      '<td class="text-center">'+
                                                        '<input type="hidden" class="line-is-checked inv-is-paid"  name="line_is_checked[]" value="'+value+'" >'+
                                                        '<input type="checkbox" '+sign+' class="rp line-checked">'+
                                                      '</td>'+
                                                      '<td>Invoice #'+val.new_inv_id+' ( '+val.inv_date+' )</td>'+
                                                      '<td class="text-right">'+val.inv_date+'</td>'+
                                                      '<td><input type="text" class="text-right original-amount" value="'+(val.inv_overall_price).toFixed(2)+'" disabled /></td>'+
                                                      '<td><input type="text" class="text-right balance-due" value="'+(((val.inv_overall_price) - val.amount_applied) + ((val.rpline_amount ? val.rpline_amount : 0 ) - cm_amount)).toFixed(2)+'" disabled /></td>'+
                                                      '<td><input type="text" class="text-right amount-payment" name="rpline_amount[]" value="'+price_to_pay+'"/></td>'+
                                                  '</tr>';

                                    $('.tbody-item').append(append);
                                    $('.amount-to-apply').val(total_amount);
                                    $(".credit-amount-to-apply").val(cm['cm_amount']);
                                    $(".credit-amount").val(cm['cm_amount']);
                                    $('.amount-apply').html(total_amount);
                                    $(".btn-cancel-rp-submit").attr("onClick","cancel_rp_submit("+cm_id+")")
                                });                                
                            });
                        }                           
                    },
                    onError);
                });
            });
        });
    }    
}
function ReplaceNumberWithCommas(yourNumber)
{
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}

function getDateNow()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}