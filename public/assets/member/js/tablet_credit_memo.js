
var tablet_credit_memo = new tablet_credit_memo();
var global_tr_html = "";
var global_tablet_html = $(".tablet-div-script").html();
var item_selected = ''; 

function tablet_credit_memo()
{
	init();

	function init()
	{
		iniatilize_select();
		draggable_row.dragtable();

		event_accept_number_only();
		event_taxable_check_change();
		event_compute_class_change();
		event_button_action_click();
		
		action_lastclick_row();
		action_convert_number();
		action_general_compute();
		action_date_picker();
		action_click_remove();
	}
	this.action_initialized = function()
	{
		action_initialize();
	}
	function action_click_remove()
	{
		$(document).on("click", ".btn-remove", function(e){
			
				$(this).parent().parent().remove();

				action_general_compute();
		});
	}
	function action_initialize()
	{
		iniatilize_select();
		action_convert_number();
		action_date_picker();
		action_general_compute();
		draggable_row.dragtable();
	}

	this.action_lastclick_row = function()
	{
		action_lastclick_row();
	}
	this.iniatilize_select = function()
	{
		iniatilize_select();
	}
	this.action_compute_tablet = function()
	{
		action_compute_tablet();
	}
	this.event_tablet_compute_class_change = function()
	{
		event_tablet_compute_class_change();
	}
	this.action_add_item_submit = function()
	{
		action_add_item_submit();
	}

	this.action_general_compute = function()
	{
		action_general_compute();
	}
	function action_add_item_submit()
	{
		$(".tablet-add-item").unbind("click");
		$(".tablet-add-item").bind("click",function()
		{
			$(".item-list-"+$(".tablet-item-id").val()).remove();

			$("#global_modal").modal("toggle");
			$(".div-item-list").append(global_tablet_html);
			$item_table = $(".div-item-list .item-table:last");

			$(".div-item-list .item-table:last").addClass("item-list-"+$(".tablet-item-id").val());
			$(".div-item-list .item-table:last .cm-item").attr("item_id",$(".tablet-item-id").val());
			$(".div-item-list .item-table:last .cm-item").attr("sir_id",$(".tablet-sir-id").val());

			//PUT VALUE TO LABEL
			$item_table.find(".item-name").html($(".tablet-item-name").html());
			$item_table.find(".item-rate").html($(".tablet-item-rate").val());
			$item_table.find(".item-um").html($(".tablet-item-um").find("option:selected").attr("abbrev"));
			$item_table.find(".item-amount").html($(".tablet-item-amount").html());
			$item_table.find(".item-qty").html($(".tablet-item-qty").val());

			if($(".tablet-item-disc").val())
			{
				$item_table.find(".disc-content").removeClass("hidden");	
				$item_table.find(".item-disc").html($(".tablet-item-disc").val());
			}
			var tax = 0;
			$item_table.find(".item-taxable").html("Non-Taxable");
			if($(".tablet-item-taxable").is(":checked"))
			{
				tax = 1;
				$item_table.find(".item-taxable").html("Taxable");
			}
			$item_table.find(".item-desc").html($(".tablet-item-desc").val());

			//PUT VALUE TO INPUT
			$item_table.find(".input-item-id").val($(".tablet-item-id").val());
			$item_table.find(".input-item-amount").val($(".tablet-item-amount").html());
			$item_table.find(".input-item-rate").val($(".tablet-item-rate").val());
			$item_table.find(".input-item-disc").val($(".tablet-item-disc").val());
			$item_table.find(".input-item-remarks").val($(".tablet-item-remark").val());
			$item_table.find(".input-item-qty").val($(".tablet-item-qty").val());
			$item_table.find(".input-item-um").val($(".tablet-item-um").val());
			$item_table.find(".input-item-taxable").val(tax);
			$item_table.find(".input-item-desc").val($(".tablet-item-desc").val());

			action_general_compute();

		});
	}
	function action_lastclick_row()
	{
		$(document).on("click", "tbody.draggable tr:last td:not(.remove-tr)", function(){
			action_lastclick_row_op();
		});
		$(document).on("click", "tbody.cm-draggable tr:last td:not(.remove-tr)", function(){
			action_lastclick_row_op_cm();
		});
	}

	function event_compute_class_change()
	{
		$(document).on("change",".compute", function()
		{
			action_general_compute();
		});
	}
	function action_lastclick_row_op_cm()
	{
		$("tbody.cm-draggable").append(global_tr_html_cm);
		action_reassign_number();
		action_trigger_select_plugin();
		action_date_picker();
	}

	function action_lastclick_row_op()
	{
		$("tbody.draggable").append(global_tr_html);
		action_reassign_number();
		action_trigger_select_plugin();
		action_date_picker();
	}
	function action_date_picker()
	{
		$(".draggable .for-datepicker").datepicker({ dateFormat: 'mm-dd-yy', });
	}

	function event_accept_number_only()
	{
		$(document).on("keypress",".number-input", function(event){
			if(event.which < 46 || event.which > 59) {
		        event.preventDefault();
		    } // prevent if not number/dot

		    if(event.which == 46 && $(this).val().indexOf('.') != -1) {
		        event.preventDefault();
		    } // prevent if already dot

		});

		$(document).on("change",".number-input", function(){
			$(this).val(function(index, value) {		 
			    var ret = '';
			    value = action_return_to_number(value);
			    if(!$(this).hasClass("txt-qty")){
			    	value = parseFloat(value);
			    	value = value.toFixed(2);
			    }
			    if(value != '' && !isNaN(value)){
			    	value = parseFloat(value);
			    	ret = action_add_comma(value).toLocaleString();
			    }

				return ret;
			  });
		});
	}
	function action_add_comma(number)
	{
		number += '';
		if(number == ''){
			return '';
		}

		else{
			return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
	function action_return_to_number(number = '')
	{
		number += '';
		number = number.replace(/,/g, "");
		if(number == "" || number == null || isNaN(number)){
			number = 0;
		}
		
		return parseFloat(number);
	}
	function event_tablet_compute_class_change()
	{
		$(document).on("change",".tablet-compute", function()
		{
			action_compute_tablet();
		});
	}
	function action_compute_tablet()
	{
      	var tablet_unit_qty = $(".tablet-droplist-um").find("option:selected").attr("qty");
      	var tablet_item_qty = $(".tablet-item-qty").val();
      	var tablet_item_rate = $(".tablet-item-rate").val();
      	var tablet_item_disc = 0;

 		var total = 0.00;

        var qty = tablet_item_qty;

        /* RETURN TO NUMBER IF THERE IS COMMA */
        var rate        = action_return_to_number(tablet_item_rate);

        // console.log(qty+" * "+ rate + " - " + discount)
        total = ((qty * rate)).toFixed(2);


        $(".tablet-item-amount").html(action_add_comma(total));

	}

    function action_general_compute()
	{
		var subtotal = 0;
		var total_taxable = 0;

		if($(".div-item-list .item-table").length > 0)
		{
			$(".item-table").each(function() 
			{			
				var qty 	= $(this).find(".input-item-qty").val();
				var rate 	= $(this).find(".input-item-rate").val();
				var discount= "";
				var amount 	= $(this).find(".input-item-amount");
				var taxable = $(this).find(".item-taxable");

				if(qty == "" || qty == null)
				{
					qty = 1;
				}

				/* CHECK THE DISCOUNT */
				if(discount.indexOf('%') >= 0)
				{
					$(this).find(".input-item-disc").val(discount.substring(0, discount.indexOf("%") + 1));
					discount = (parseFloat(discount.substring(0, discount.indexOf('%'))) / 100) * (action_return_to_number(rate) * action_return_to_number(qty));
				}
				else if(discount == "" || discount == null)
				{
					discount = 0;
				}
				else
				{
					discount = parseFloat(discount);
				}

				/* RETURN TO NUMBER IF THERE IS COMMA */
				qty 		= action_return_to_number(qty);
				rate 		= action_return_to_number(rate);
				discount 	= 0;

				var total_per_tr = ((qty * rate) - discount).toFixed(2);

				/* action_compute SUB TOTAL PER LINE */
				subtotal += parseFloat(total_per_tr);

				/* AVOID ZEROES */
				// if(total_per_tr <= 0)
				// {
				// 	total_per_tr = '';
				// }

				/* CONVERT TO INTEGER */
				var amount_val = amount.val();
				
				if(amount_val != '' && amount_val != null && total_per_tr == '') //IF QUANTITY, RATE IS [NOT EMPTY]
				{
					var sub = parseFloat(action_return_to_number(amount_val));
					if(isNaN(sub))
					{
						sub = 0;
					}
					subtotal += sub;
					total_per_tr = sub;
					amount.val(action_add_comma(sub));
				}
				else //IF QUANTITY, RATE IS [EMPTY]
				{
					amount.val(action_add_comma(total_per_tr));
				}

				/*CHECK IF TAXABLE*/	
				// if(taxable.html() == "Taxable")
				// {
				// 	total_taxable += parseFloat(total_per_tr);
				// }

			});

		}

		/* action_compute EWT */
		var ewt_value 			= 0;

		ewt_value = parseFloat(ewt_value) * subtotal;

		/* action_compute DISCOUNT */
		var discount_selection 	= $(".discount_selection").val();
		var discount_txt 		= 0;
		var tax_selection 		= $(".tax_selection").val();
		var taxable_discount 	= 0;

		if(discount_txt == "" || discount_txt == null)
		{
			discount_txt = 0;
		}

		discount_total = discount_txt;
		discount_total = 0;

		/* action_compute TOTAL */
		var total = 0;
		total     = subtotal - discount_total - ewt_value;

		/* action_compute TAX */
		var tax   = 0;
		// if(tax_selection == 1){
		// 	tax = total_taxable * (12 / 100);
		// }
		// total += tax;
		console.log(total);
		/* action payment applied */
		var payment_applied   	= parseFloat($(".payment-applied").html());
		var balance_due 		= total - payment_applied;

		$(".sub-total").html(action_add_comma(subtotal.toFixed(2)));
		$(".subtotal-amount-input").val(action_add_comma(subtotal.toFixed(2)));

		$(".ewt-total").html(action_add_comma(ewt_value.toFixed(2)));
		$(".discount-total").html(action_add_comma(discount_total.toFixed(2)));
		$(".tax-total").html(action_add_comma(tax.toFixed(2)));

		$(".total-amount").html(action_add_comma(total.toFixed(2)));
		$(".total-amount-input").val(total.toFixed(2));

		$(".balance-due").html(action_add_comma(balance_due.toFixed(2)));
	}     
	function action_convert_number()
	{
		$(".payment-applied").html(action_add_comma(parseFloat($(".payment-applied").html()).toFixed(2)));
	}


	/* CHECK BOX FOR TAXABLE */
	function event_taxable_check_change()
	{
		$(".taxable-check").unbind("change");
		$(".taxable-check").bind("change", function()
		{
			action_change_input_value($(this));
		});
	}

	function check_change_input_value()
	{
		$(".taxable-check").each( function()
		{
			action_change_input_value($(this));
		})
	}
	
	function action_change_input_value($this)
	{
		if($this.is(":checked"))
		{
			$this.prev().val(1);
		}
		else
		{
			$this.prev().val(0);
		}
	}
      

	function iniatilize_select()
	{
		$('.droplist-customer').globalDropList(
		{ 
			hasPopup : 'false',
            width : "100%",
    		placeholder : "Select Customer...",
			link : "/member/customer/modalcreatecustomer",
			onChangeValue: function()
			{
				$(".customer-email").val($(this).find("option:selected").attr("email"));
				// load_all_estimate($(this).val());
			}
		});
	    $('.droplist-item').globalDropList(
        {
			hasPopup : 'false',
            link : "/member/item/add",
            width : "100%",
            maxHeight: "309px",
            onCreateNew : function()
            {
            	item_selected = $(this);
            	console.log($(this));
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });

        $('.tablet-droplist-um').globalDropList(
	    {
	        hasPopup: "false",
	        width : "100%",
	        placeholder : "U/M..",
	        onChangeValue: function()
	        {
	        	$(".tablet-item-rate").val(($(this).find("option:selected").attr("qty") * $(".tablet-price-per-item").val()).toFixed(2));
	            action_compute_tablet();
	        }

	    });
	    $('.droplist-item-cm').globalDropList(
        {
			hasPopup : 'false',
            link : "/member/item/add",
            width : "100%",
            onChangeValue : function()
            {
            	action_load_item_info_cm($(this));
            }
        });
        $('.droplist-terms').globalDropList(
        {
			hasPopup : 'false',
            link : "/member/maintenance/terms/terms",
            link_size : "sm",
            width : "100%",
    		placeholder : "Terms...",
            onChangeValue: function()
            {
            	var start_date 		= $(".datepicker[name='inv_date']").val();
            	var days 			= $(this).find("option:selected").attr("days");
            	var new_due_date 	= AddDaysToDate(start_date, days, "/");
            	$(".datepicker[name='inv_due_date']").val(new_due_date);
            }
        });
        $('.tablet-droplist-item').globalDropList({

            hasPopup : 'false',
            width : "100%",
            maxHeight: "309px",
    		placeholder : "Select Item...",
            onCreateNew : function()
            {
            	item_selected = $(this);
            	console.log($(this));
            },
            onChangeValue : function()
            {
            	if($(this).val() != '')
            	{
            		var sir_id = $(this).find("option:selected").attr("sir_id");
	           	    credit_memo_transaction.get_adding_cm_item_modal($(this).val(), sir_id);
            	}
            }
        });
        $('.droplist-um').globalDropList(
    	{
    		hasPopup: "false",
    		width : "100%",
    		placeholder : "um..",
    		onChangeValue: function()
    		{
    			action_load_unit_measurement($(this));
    		}

    	});
        $('.droplist-um:not(.has-value)').globalDropList("disabled");
        $('.droplist-um-cm').globalDropList(
    	{
    		hasPopup: "false",
    		width : "100%",
    		placeholder : "um..",
    		onChangeValue: function()
    		{
    			action_load_unit_measurement_cm($(this));
    		}
    	});
        $('.droplist-um-cm:not(.has-value)').globalDropList("disabled");
	}

	function AddDaysToDate(sDate, iAddDays, sSeperator) {
    //Purpose: Add the specified number of dates to a given date.
	    var date = new Date(sDate);
	    date.setDate(date.getDate() + parseInt(iAddDays));
	    var sEndDate = LPad(date.getMonth() + 1, 2) + sSeperator + LPad(date.getDate(), 2) + sSeperator + date.getFullYear();
	    return sEndDate;
	}
	function LPad(sValue, iPadBy) {
	    sValue = sValue.toString();
	    return sValue.length < iPadBy ? LPad("0" + sValue, iPadBy) : sValue;
	}
	
	

	
	function event_button_action_click()
	{
		$(document).on("click","button[type='submit']", function()
		{
			$(".button-action").val($(this).attr("data-action"));
		})
	}

}	

/* AFTER ADDING A CUSTOMER */
function submit_done_customer(result)
{
    $(".droplist-customer").load("/member/customer/load_customer", function()
    {                
         $(".droplist-customer").globalDropList("reload");
         $(".droplist-customer").val(result.id).change();
         toastr.success("Success");
    });
}

/* AFTER ADDING AN  ITEM */
function submit_done_item(data)
{
    item_selected.load("/member/item/load_item_category", function()
    {
        $(this).globalDropList("reload");
		$(this).val(data.item_id).change();
		toastr.success("Success");
    });
    data.element.modal("hide");
}


function submit_done(data)
{
	if(data.status == "success-credit-memo")
	{
        toastr.success("Success");
        location.href = data.redirect_to;
	}
	else if(data.status == "success-credit-memo-action")
	{
        toastr.success("Success");
  		action_load_link_to_modal('/member/customer/credit_memo/choose_type?cm_id='+data.id, 'sm');
	}
	else if(data.status == "success-credit-memo-tablet")
	{
        toastr.success("Success");
  		action_load_link_to_modal('/tablet/credit_memo/choose_type?cm_id='+data.id, 'sm');
	}
	else if(data.status == 'success-sir')
	{		
        toastr.success("Success");
       	location.href = "/member/pis/manual_invoice";
	}
	else if(data.status == 'success-tablet')
	{		
        toastr.success("Success");
       	location.href = "/tablet";
	}
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
        $(data.target).html(data.view);
    }
}
function submit_this_form()
{
	$("#keep_val").val("keep");
    $("#invoice_form").submit();
}

function toggle_returns(className, obj) {
var $input = $(obj);
if ($input.prop('checked')) $(className).slideDown();
else $(className).slideUp();
}

function credit_memo_submit()
{
    var ctr = 0;
    var status = null;
    var status_message = null;
    var data = {};
    var values = {};

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
	console.log("Request::input()");
	console.log(values);
    var customer_info = {};
    customer_info["cm_customer_id"] = values["cm_customer_id"];
    customer_info["cm_customer_email"] = values["cm_customer_email"];
    customer_info["cm_date"] = values["cm_date"];
    customer_info["cm_message"] = values["cm_message"];
    customer_info["cm_memo"] = values["cm_memo"];
    customer_info["cm_amount"] = values["overall_price"];
    console.log("Customer Info");
    console.log(customer_info);
    var item_info = {};
    var _items = values["cmline_item_id"];
    if(_items)
    {
    	$.each(_items, function(index, val) 
    	{
    		if(val != null)
            {  
                ctr++;
                item_info[index] 					   = {};              
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
    console.log("Item Info");
    console.log(item_info);
    if(ctr == 0)
    {
        data["status"] = "error";
        data["status_message"] = "Please Insert Item";
    }
    if(data["status"] == null)
    {            
    	get_shop_id(function(shop_id)
    	{
    		var insert_cm = {};
			insert_cm["cm_shop_id"] = shop_id;
			insert_cm["cm_customer_id"] = customer_info["cm_customer_id"];
			insert_cm["cm_customer_email"] = customer_info["cm_customer_email"];
			insert_cm["cm_date"] = customer_info["cm_date"];
			insert_cm["cm_message"] = customer_info["cm_message"];
			insert_cm["cm_memo"] = customer_info["cm_memo"];
			insert_cm["cm_amount"] = customer_info["cm_amount"];
			insert_cm["cm_type"] = 0;
			insert_cm["cm_used_ref_id"] = 0;
			insert_cm["cm_used_ref_name"] = "returns";
			insert_cm["date_created"] = get_date_now();
			// console.log(insert_cm);
			// $cm_id = Tbl_credit_memo::insertGetId($insert_cm);
			var insert_row = 'INSERT INTO tbl_credit_memo (cm_shop_id, cm_customer_id, cm_customer_email, cm_date, cm_message, cm_memo, cm_amount, cm_type, date_created, cm_ar_acccount, cm_used_ref_id, cm_used_ref_name) VALUES '+
		    '("'+insert_cm["cm_shop_id"]+'", "'+insert_cm["cm_customer_id"]+'", "'+insert_cm["cm_customer_email"]+'", "'+insert_cm["cm_date"]+'", "'+insert_cm["cm_date"]+'", "'+insert_cm["cm_message"]+'", "'+insert_cm["cm_memo"]+'", "'+insert_cm["cm_type"]+'", "'+insert_cm["date_created"]+'", '+insert_cm["cm_type"]+', '+insert_cm["cm_used_ref_id"]+', "'+insert_cm["cm_used_ref_name"]+'")';
			db.transaction(function (tx) 
			{  
				tx.executeSql(
		            insert_row, [],
		            function(tx, results)
		            {
		                var cm_id = results.insertId;
		                alert(cm_id);
		                /* Transaction Journal */
				        var entry 				    = {}
				        entry["reference_module"]  = "credit-memo";
				        entry["reference_id"]      = cm_id;
				        entry["name_id"]           = customer_info['cm_customer_id'];
				        entry["total"]             = customer_info["cm_amount"];
				        entry["vatable"]           = '';
				        entry["discount"]          = '';
				        entry["ewt"]               = '';

						// CreditMemo::insert_cmline($cm_id, $item_info, $entry);
						/* Insert CM Line */
						var insert_cmline = {};
						var item_type = {};
						var entry_data = {};
						var item_bundle = {};
						var item_data = {};
						$.each(item_info, function(index, val) 
						{
							insert_cmline["cmline_cm_id"] = cm_id;
							// $insert_cmline["cmline_service_date"] = $value["item_service_date"];
							insert_cmline["cmline_um"] = val["um"];
							insert_cmline["cmline_item_id"] = val["item_id"];
							insert_cmline["cmline_description"] = val["item_description"];
							insert_cmline["cmline_qty"] = val["quantity"];
							insert_cmline["cmline_rate"] = val["rate"];
							insert_cmline["cmline_amount"] = val["amount"];
							insert_cmline["cmline_service_date"] = "0000-00-00 00:00:00";

							// Tbl_credit_memo_line::insert($insert_cmline);
							db.transaction(function (tx) 
							{  
								tx.executeSql(
						            'INSERT INTO tbl_credit_memo_line (cmline_cm_id, cmline_um, cmline_item_id, cmline_description, cmline_qty, cmline_rate, cmline_amount, cmline_service_date) '+
						            'VALUES ("'+insert_cmline["cmline_cm_id"]+'", "'+insert_cmline["cmline_um"]+'", "'+insert_cmline["cmline_item_id"]+'", "'+insert_cmline["cmline_description"]+'", "'+insert_cmline["cmline_qty"]+'", "'+insert_cmline["cmline_rate"]+'", "'+insert_cmline["cmline_amount"]+'", "'+insert_cmline["cmline_service_date"]+'")',
						            [],
						            function(tx, results)
						            {
						                // $item_type = Item::get_item_type($value['item_id']);
							            // var item_type = Tbl_item::where("item_id",$item_id)->pluck("item_type_id");
							            db.transaction(function (tx) 
										{  
											var item_query = 'SELECT * from tbl_item WHERE "item_id" = "'+val.item_id+'"';

								            tx.executeSql(
									            item_query,
									            [],
									            function(tx, results)
									            {
									                if (results.rows.length <= 0) 
						                            {
						                                alert("Some error occurred. Item not found.");
						                            }     
						                            else
						                            {
						                                var item_type = results.rows[0].item_type_id;

						                                /* TRANSACTION JOURNAL */  
											            if(item_type != 4)
											            { 
											            	entry_data[index]					    = {};

												            entry_data[index]['item_id']            = val.item_id;
												            entry_data[index]['entry_qty']          = val.quantity;
												            entry_data[index]['vatable']            = 0;
												            entry_data[index]['discount']           = 0;
												            entry_data[index]['entry_amount']       = val.amount;
												            entry_data[index]['entry_description']  = val.item_description;

												            post_journal_entries(entry, entry_data);
											            }
												        else
												        {
												        	// $item_bundle = Item::get_item_in_bundle($value['item_id']);
												        	// var item_bundle = bl_item_bundle::where("bundle_bundle_id",$item_id)->get();
												        	db.transaction(function (tx) 
															{  
													        	tx.executeSql(
														            'SELECT * from tbl_item_bundle WHERE bundle_bundle_id = '+val.item_id, [],
														            function(tx, results)
														            {
										                            	var item_bundle = results.rows;

									                            		$.each(item_bundle, function(key_bundle, value_bundle) 
									                            		{
													                        // item_data = Item::get_item_details($value_bundle->bundle_item_id);
													                        db.transaction(function (tx) 
																			{  
														                        tx.executeSql(
																		            'SELECT * from tbl_item '+
																		            'LEFT JOIN tbl_unit_measurement_multi on multi_um_id = item_measurement_id '+
																		            'LEFT JOIN tb_category on type_id = item_category_id '+
																		            'WHERE item_id = '+val.item_id,
																		            [],
																		            function(tx, results)
																		            {
																		            	if (results.rows.length <= 0) 
															                            {
															                                alert("Some error occurred. Item not found.");
															                            }     
															                            else
															                            {
															                            	var item_data = results.rows[0];

															                            	/*-------------------------------*/
																						    // $um_info = UnitMeasurement::um_info($um_id);
																						    // Tbl_unit_measurement_multi::where("multi_id",$multi_id)->first()
																						    db.transaction(function (tx) 
																							{  
																							    tx.executeSql(
																						            'SELECT * from tbl_unit_measurement_multi WHERE multi_id = '+value_bundle.bundle_um_id,
																						            [],
																						            function(tx, results)
																						            {
																						            	var return_qty = 1;

																						            	if(results.rows.length > 0)
																								        {
																						            		var um_info = results.rows[0];
																								            return_qty = um_info.unit_qty;
																								        }

																								        entry_data['b'+index+key_bundle]['item_id']            = value_bundle.bundle_item_id;
																				                        entry_data['b'+index+key_bundle]['entry_qty']          = val.quantity * (return_qty * value_bundle.bundle_qty);
																				                        entry_data['b'+index+key_bundle]['vatable']            = 0;
																				                        entry_data['b'+index+key_bundle]['discount']           = 0;
																				                        entry_data['b'+index+key_bundle]['entry_amount']       = item_data.item_price * entry_data['b'+index+key_bundle]['entry_qty'];
																				                        entry_data['b'+index+key_bundle]['entry_description']  = item_data.item_sales_information; 

																				                        post_journal_entries(entry, entry_data);
																						            },
																						            onError
																						        );
																							});
																					        /*-----------------------------*/
															                            }
																		            },
																		            onError
																		        ); 
													                    	});
									                            		}); 
														            },
														            onError
														        );
												        	});
												        }
						                            }
									            },
									            onError
									        );
										});
						            },
						            onError
						        );
							});
						});
		            },
		            onError
		        );
			});
    	})
		
		// if($inv_id != 0)
	 //    {
	 //        $up["credit_memo_id"] = $cm_id;
	 //        Tbl_customer_invoice::where("inv_id",$inv_id)->update($up);
	 //    }

	 //    $cm_data = AuditTrail::get_table_data("tbl_credit_memo","cm_id",$cm_id);
	 //    AuditTrail::record_logs("Added","credit_memo",$cm_id,"",serialize($cm_data));
	    
        // $cm_id = CreditMemo::postCM($customer_info, $item_info,0, true);

        // $ins_manual_cm["sir_id"] = Request::input("sir_id");
        // $ins_manual_cm["cm_id"] = $cm_id;
        // $ins_manual_cm["manual_cm_date"] = Carbon::now();

        // Tbl_manual_credit_memo::insert($ins_manual_cm);

        // $data["status"] = "success-credit-memo-tablet";
        // $data["id"] = $cm_id;
        // $data["redirect_to"] = "/tablet/credit_memo/add?id=".$cm_id."&sir_id=".Request::input("sir_id");
    }

    // return json_encode($data);
}