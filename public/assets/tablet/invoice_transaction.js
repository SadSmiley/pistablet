var invoice_transaction = new invoice_transaction();
var query = "";
var dataset_from_browser = null; 
var sir_id = "";  
function invoice_transaction()
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
                $(".sir-id-input").val(sir_id);

                var query_check_shop = 'SELECT shop_id FROM tbl_sir where sir_id = "'+sir_id+'"';
                tx.executeSql(query_check_shop, [], function(txs, results_sir)
                {
                    var shop_id = results_sir.rows[0]['shop_id'];


                    get_session('inv_id',function(inv_id)
                    {
                        if(inv_id == null || inv_id == 0)
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

                tablet_customer_invoice.iniatilize_select();
                tablet_customer_invoice.event_tablet_cm_compute_class_change();
                tablet_customer_invoice.action_cm_compute_tablet();
                tablet_customer_invoice.action_add_cm_item_submit();
                tablet_customer_invoice.action_compute_tablet();


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


                        tablet_customer_invoice.iniatilize_select();
                        tablet_customer_invoice.event_tablet_compute_class_change();
                        tablet_customer_invoice.action_compute_tablet();
                        tablet_customer_invoice.action_add_item_submit();
                        tablet_customer_invoice.action_add_cm_item_submit();

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

            var query_sir_item = 'SELECT * FROM tbl_sir_item LEFT JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id WHERE tbl_sir_item.sir_id = "'+sir_id+'"';
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
        $("body").on("click", ".edit-cm-item.cm-item", function()
        {
            var item_id = $(this).attr("item_id");
            var sir_id = $(this).attr("sir_id");

            get_adding_cm_item_modal(item_id, sir_id);
        });
    }
}
function invoice_edit_submit()
{
     var ctr = 0;
    var status = null;
    var status_message = null;
    var data = {};
    var values = {};

    $.each($('.form-invoice').serializeArray(), function(i, field) 
    {
       if (field.name == "invline_item_id[]") 
        {
            values["invline_item_id"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_item_id"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_amount[]") 
        {
            values["invline_amount"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_amount"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_qty[]") 
        {
            values["invline_qty"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_qty"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_rate[]") 
        {
            values["invline_rate"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_rate"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_um[]") 
        {
            values["invline_um"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_um"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_discount[]") 
        {
            values["invline_discount"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_discount"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_discount_remark[]") 
        {
            values["invline_discount_remark"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_discount_remark"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_taxable[]") 
        {
            values["invline_taxable"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_taxable"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_description[]") 
        {
            values["invline_description"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_description"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_amount[]") 
        {
            values["cmline_amount"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_amount"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_description[]") 
        {
            values["cmline_description"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_description"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_item_id[]") 
        {
            values["cmline_item_id"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_item_id"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_qty[]") 
        {
            values["cmline_qty"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_qty"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_rate[]") 
        {
            values["cmline_rate"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_rate"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_um[]") 
        {
            values["cmline_um"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_um"][index] = $(el).val();
            });
        }
        else
        {
            values[field.name] = field.value;
        }
    });

    var customer_info = {};
    var cm_customer_info = {};

    cm_customer_info['cm_customer_id'] = customer_info["inv_customer_id"] = values["inv_customer_id"];
    cm_customer_info['cm_customer_email'] = customer_info["inv_customer_email"] = values["inv_customer_email"];
    cm_customer_info['cm_date'] = customer_info["inv_date"] = values["inv_date"];
    cm_customer_info['cm_memo'] = customer_info["inv_memo"] = values["inv_memo"];
    cm_customer_info['cm_amount'] = customer_info["subtotal_price_returns"] = values["subtotal_price_returns"];
    cm_customer_info['cm_message'] = customer_info["inv_message"] = values["inv_message"];
    cm_customer_info['cm_type'] = customer_info["returns"] = values["returns"];
    cm_customer_info['credit_memo_id'] = customer_info["credit_memo_id"] = values["cm_id"];

    customer_info["inv_customer_billing_address"] = values["inv_customer_billing_address"];
    customer_info["new_invoice_id"] = values["new_invoice_id"];
    customer_info["inv_terms_id"] = values["inv_terms_id"];
    customer_info["inv_due_date"] = values["inv_due_date"];
    customer_info["subtotal_price"] = values["subtotal_price"];
    customer_info["overall_price"] = values["overall_price"];
    customer_info["overall_price_with_return"] = values["overall_price_with_return"];
    customer_info["returns"] = values["returns"];
    customer_info["taxable"] = values["taxable"];
    customer_info["ewt"] = values["ewt"];
    customer_info["inv_discount_type"] = values['inv_discount_type'];
    customer_info["inv_discount_value"] = values['inv_discount_value'];
    customer_info["is_sales_receipt"] = values['is_sales_receipt'];
    customer_info["inv_is_paid"] = values["inv_is_paid"];

    invoice_id = values['invoice_id'];
    var _items = values["invline_item_id"];

    var _cm_items = values["cmline_item_id"];

    var item_info = {};
    var cm_item_info = {};

    var ctr_item = count(values["invline_item_id"]);

    if(ctr_item > 0)
    {
        check_sir_qty(values['sir_id'],_items,values,invoice_id,'', function(return_value)
        {
            get_item_returns(_cm_items, values, function(item_returns)
            {
                /* CHECK IF QUANTITY IS MORE THAN THE STOCKS (1 >= 1) = true; 0 = false */
                if(return_value >= 1)
                {
                    toastr.warning("Check item quantity. The item order is greater than to our stocks");     
                }
                else
                {
                    if(_items)
                    {
                        $.each(_items, function(index, val) 
                        {
                            if(val != null)
                            {  
                                ctr++;
                                item_info[index]                       = {};              
                                item_info[index]['item_service_date']  = "";
                                item_info[index]['item_id']            = values['invline_item_id'][index];
                                item_info[index]['um']                 = values['invline_um'][index];
                                item_info[index]['taxable']            = values['invline_taxable'][index];
                                item_info[index]['rate']               = values['invline_rate'][index].replace(',',"");
                                item_info[index]['quantity']           = values['invline_qty'][index].replace(',',"");
                                item_info[index]['discount_remark']    = values['invline_discount_remark'][index];
                                item_info[index]['discount']           = values['invline_discount'][index];
                                item_info[index]['item_description']   = values['invline_description'][index];
                                item_info[index]['amount']             = values['invline_amount'][index].replace(',',"");
                                item_info[index]['ref_name']           = "";
                                item_info[index]['ref_id']             = "";
                            }
                        });
                    }

                    if(values['returns'] == 'returns')
                    {
                        if(_cm_items)
                        {
                            $.each(_cm_items, function(key, val_cm) 
                            {
                                if(val_cm != null)
                                {  
                                    ctr++;
                                    cm_item_info[key]                       = {};              
                                    cm_item_info[key]['item_service_date']  = "";
                                    cm_item_info[key]['item_id']            = values['cmline_item_id'][key];
                                    cm_item_info[key]['item_description']   = values['cmline_description'][key];
                                    cm_item_info[key]['um']                 = values['cmline_um'][key];
                                    cm_item_info[key]['quantity']           = values['cmline_qty'][key].replace(',',"");
                                    cm_item_info[key]['rate']               = values['cmline_rate'][key].replace(',',"");
                                    cm_item_info[key]['amount']             = values['cmline_amount'][key];
                                }
                            });
                        }
                    }
                   
                    update_invoice_submit(invoice_id ,customer_info, item_info, function(res)
                    {
                        insert_sir_inventory(item_info,"invoice",invoice_id, function(result_inventory)
                        {
                            update_cm_submit(values["cm_id"], cm_customer_info, cm_item_info, item_returns, invoice_id, function(returns_cm)
                            {
                                if(returns_cm == 'success')
                                {
                                    toastr.success("Success");
                                    setInterval(function()
                                    {
                                        location.reload();
                                    },2000)
                                }
                            });
                        });
                    });
                }
            });        
        });

    }
    else
    {
        toastr.warning("Please Select Item"); 
    }
}
function invoice_submit()
{
    var ctr = 0;
    var status = null;
    var status_message = null;
    var data = {};
    var values = {};

    $.each($('.form-invoice').serializeArray(), function(i, field) 
    {
       if (field.name == "invline_item_id[]") 
        {
            values["invline_item_id"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_item_id"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_amount[]") 
        {
            values["invline_amount"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_amount"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_qty[]") 
        {
            values["invline_qty"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_qty"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_rate[]") 
        {
            values["invline_rate"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_rate"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_um[]") 
        {
            values["invline_um"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_um"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_discount[]") 
        {
            values["invline_discount"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_discount"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_discount_remark[]") 
        {
            values["invline_discount_remark"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_discount_remark"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_taxable[]") 
        {
            values["invline_taxable"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_taxable"][index] = $(el).val();
            });
        }
        else if (field.name == "invline_description[]") 
        {
            values["invline_description"] = {};
            $('.div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["invline_description"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_amount[]") 
        {
            values["cmline_amount"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_amount"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_description[]") 
        {
            values["cmline_description"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_description"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_item_id[]") 
        {
            values["cmline_item_id"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_item_id"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_qty[]") 
        {
            values["cmline_qty"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_qty"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_rate[]") 
        {
            values["cmline_rate"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_rate"][index] = $(el).val();
            });
        }
        else if (field.name == "cmline_um[]") 
        {
            values["cmline_um"] = {};
            $('.cm-div-item-list input[name="'+field.name+'"]').each(function(index, el) 
            {
                values["cmline_um"][index] = $(el).val();
            });
        }
        else
        {
            values[field.name] = field.value;
        }
    });

    // console.log(values);
    var customer_info = {};
    var cm_customer_info = {};

    customer_info["sir_id"] = values["sir_id"];
    cm_customer_info['cm_customer_id'] = customer_info["inv_customer_id"] = values["inv_customer_id"];
    cm_customer_info['cm_customer_email'] = customer_info["inv_customer_email"] = values["inv_customer_email"];
    cm_customer_info['cm_date'] = customer_info["inv_date"] = values["inv_date"];
    cm_customer_info['cm_memo'] = customer_info["inv_memo"] = values["inv_memo"];
    cm_customer_info['cm_amount'] = customer_info["subtotal_price_returns"] = values["subtotal_price_returns"];
    cm_customer_info['cm_message'] = customer_info["inv_message"] = values["inv_message"];
    cm_customer_info['cm_type'] = customer_info["returns"] = values["returns"];

    customer_info["inv_customer_billing_address"] = values["inv_customer_billing_address"];
    customer_info["new_invoice_id"] = values["new_invoice_id"];
    customer_info["inv_terms_id"] = values["inv_terms_id"];
    customer_info["inv_due_date"] = values["inv_due_date"];
    customer_info["subtotal_price"] = values["subtotal_price"];
    customer_info["overall_price"] = values["overall_price"];
    customer_info["overall_price_with_return"] = values["overall_price_with_return"];
    customer_info["returns"] = values["returns"];
    customer_info["taxable"] = values["taxable"];
    customer_info["ewt"] = values["ewt"];
    customer_info["inv_discount_type"] = values['inv_discount_type'];
    customer_info["inv_discount_value"] = values['inv_discount_value'];
    customer_info["is_sales_receipt"] = values['is_sales_receipt'];
    customer_info["inv_is_paid"] = values["inv_is_paid"];

    var _items = values["invline_item_id"];

    var _cm_items = values["cmline_item_id"];

    var item_info = {};
    var cm_item_info = {};

    var ctr_item = count(values["invline_item_id"]);

    if(ctr_item > 0)
    {
        check_sir_qty(values['sir_id'],_items,values,0,'', function(return_value)
        {
            get_item_returns(_cm_items, values, function(item_returns)
            {
                /* CHECK IF QUANTITY IS MORE THAN THE STOCKS (1 >= 1) = true; 0 = false */
                if(return_value >= 1)
                {
                    toastr.warning("Check item quantity. The item order is greater than to our stocks");     
                }
                else
                {
                    if(_items)
                    {
                        $.each(_items, function(index, val) 
                        {
                            if(val != null)
                            {  
                                ctr++;
                                item_info[index]                       = {};              
                                item_info[index]['item_service_date']  = "";
                                item_info[index]['item_id']            = values['invline_item_id'][index];
                                item_info[index]['um']                 = values['invline_um'][index];
                                item_info[index]['taxable']            = values['invline_taxable'][index];
                                item_info[index]['rate']               = values['invline_rate'][index].replace(',',"");
                                item_info[index]['quantity']           = values['invline_qty'][index].replace(',',"");
                                item_info[index]['discount_remark']    = values['invline_discount_remark'][index];
                                item_info[index]['discount']           = values['invline_discount'][index];
                                item_info[index]['item_description']   = values['invline_description'][index];
                                item_info[index]['amount']             = values['invline_amount'][index].replace(',',"");
                                item_info[index]['ref_name']           = "";
                                item_info[index]['ref_id']             = "";
                            }
                        });
                    }

                    if(values['returns'] == 'returns')
                    {
                        if(_cm_items)
                        {
                            $.each(_cm_items, function(key, val_cm) 
                            {
                                if(val_cm != null)
                                {  
                                    ctr++;
                                    cm_item_info[key]                       = {};              
                                    cm_item_info[key]['item_service_date']  = "";
                                    cm_item_info[key]['item_id']            = values['cmline_item_id'][key];
                                    cm_item_info[key]['item_description']   = values['cmline_description'][key];
                                    cm_item_info[key]['um']                 = values['cmline_um'][key];
                                    cm_item_info[key]['quantity']           = values['cmline_qty'][key].replace(',',"");
                                    cm_item_info[key]['rate']               = values['cmline_rate'][key].replace(',',"");
                                    cm_item_info[key]['amount']             = values['cmline_amount'][key];
                                }
                            });
                        }
                    }
                   
                    insert_invoice_submit(customer_info, item_info, function(invoice_id)
                    {
                        insert_manual_invoice(invoice_id, function(return_value)
                        {
                            if(return_value == "success")
                            {
                                insert_sir_inventory(item_info,"invoice",invoice_id, function(result_inventory)
                                {
                                    insert_cm_submit(cm_customer_info, cm_item_info, item_returns, invoice_id, function(returns_cm)
                                    {
                                        if(returns_cm == 'success')
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
                        });
                    });
                }
            });        
        });

    }
    else
    {
        toastr.warning("Please Select Item"); 
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