
var customer_invoice = new customer_invoice();
var global_tr_html = $(".div-script tbody").html();
var global_tr_html_cm = $(".div-script-cm tbody").html();
var item_selected = ''; 

function customer_invoice()
{
	init();

	function init()
	{
		iniatilize_select();
		draggable_row.dragtable();

		event_remove_tr();
		event_accept_number_only();
		event_compute_class_change();
		event_taxable_check_change();
		event_item_qty_change();
		event_button_action_click();
		
		action_lastclick_row();
		action_compute();
		action_convert_number();
		action_date_picker();
		action_reassign_number();
	}
	function event_remove_tr()
	{
		$(document).on("click", ".remove-tr", function(e){
			var len = $(".tbody-item .remove-tr").length;
			if($(".tbody-item .remove-tr").length > 1)
			{
				if($(this).attr("tr_id") != 0 && $(this).attr("tr_id") != null)
				{					
					var id = $(this).attr("tr_id");
					console.log($(this).attr("linked_in"));
					if($(this).attr("linked_in") != 'no')
					{						
						$(".tr-id-"+id).remove();
					}
					else
					{
						$(".estimate-tbl").load("/member/customer/estimate_remove/"+id, function()
						{
							// console.log("success-removing");
							iniatilize_select();
							$(".tbody-item .select-um").globalDropList("enabled");
							$(".est-"+id).removeClass("hidden");
							if($(".tbody-item .trcount").length == 0)
							{
								$(".so-count").removeClass("hidden");
								$(".est-count").removeClass("hidden");
							}
							$(".drawer-toggle").trigger("click");
						});

					}
				}
				else
				{
					$(this).parent().remove();
				}
				action_reassign_number();
				action_compute();
			}
			else
			{
				console.log("success");
			}
		});
		$(document).on("click", ".remove-tr", function(e){
			if($(".tbody-item-cm .remove-tr").length > 1){
				$(this).parent().remove();
				action_reassign_number();
				action_compute();
			}			
		});
	}

	this.action_initialized = function()
	{
		action_initialize();
	}

	function action_initialize()
	{
		iniatilize_select();
		action_compute();
		action_convert_number();
		action_date_picker();
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
	this.action_compute = function()
	{
		action_compute();
	}
	this.event_tablet_compute_class_change = function()
	{
		event_tablet_compute_class_change();
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


	this.action_reassign_number = function()
	{
		action_reassign_number();
	}

	function action_reassign_number()
	{
		var num = 1;
		$(".invoice-number-td").each(function(){
			$(this).html(num);
			num++;
		});

		var num2 = 1;
		$(".cm-number-td").each(function(){
			$(this).html(num2);
			num2++;
		});
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

	function event_compute_class_change()
	{
		$(document).on("change",".compute", function()
		{
			action_compute();
		});
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
      	var tablet_item_disc = $(".tablet-item-disc").val();

 		var total = 0.00;

        var qty = tablet_item_qty * tablet_unit_qty;
        /* CHECK THE DISCOUNT */
        if(tablet_item_disc.indexOf('%') >= 0)
        {
            $(".tablet-item-disc").val(tablet_item_disc.substring(0, tablet_item_disc.indexOf("%") + 1));
            tablet_item_disc = (parseFloat(tablet_item_disc.substring(0, tablet_item_disc.indexOf('%'))) / 100) * (action_return_to_number(tablet_item_rate) * action_return_to_number(qty));
        }
        else if(tablet_item_disc == "" || tablet_item_disc == null)
        {
            tablet_item_disc = 0;
        }
        else
        {
            tablet_item_disc = parseFloat(tablet_item_disc);
        }

        /* RETURN TO NUMBER IF THERE IS COMMA */
        var rate        = action_return_to_number(tablet_item_rate);
        var discount    = action_return_to_number(tablet_item_disc);

        // console.log(qty+" * "+ rate + " - " + discount)
        total = ((qty * rate) - discount).toFixed(2);


        $(".tablet-item-amount").html(total);

	}

	function action_compute()
	{
		var subtotal = 0;
		var total_taxable = 0;

		var subtotal_returns = 0;
		var total_returns_with_returns = 0;

		$(".tr-draggable").each(function()
		{
			/* GET ALL DATA */
			var qty 	= $(this).find(".txt-qty").val();
			var rate 	= $(this).find(".txt-rate").val();
			var discount= $(this).find(".txt-discount").val().toString();
			var amount 	= $(this).find(".txt-amount");
			var taxable = $(this).find(".taxable-check");

			/* CHECK IF QUANTITY IS EMPTY */
			if(qty == "" || qty == null)
			{
				qty = 1;
			}

			/* CHECK THE DISCOUNT */
			if(discount.indexOf('%') >= 0)
			{
				$(this).find(".txt-discount").val(discount.substring(0, discount.indexOf("%") + 1));
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
			discount 	= action_return_to_number(discount);

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
			if(taxable.is(':checked'))
			{
				total_taxable += parseFloat(total_per_tr);
			}

		});
		
		/* action_compute EWT */
		var ewt_value 			= $(".ewt-value").val();

		ewt_value = parseFloat(ewt_value) * subtotal;

		/* action_compute DISCOUNT */
		var discount_selection 	= $(".discount_selection").val();
		var discount_txt 		= $(".discount_txt").val();
		var tax_selection 		= $(".tax_selection").val();
		var taxable_discount 	= 0;

		if(discount_txt == "" || discount_txt == null)
		{
			discount_txt = 0;
		}

		discount_total = discount_txt;

		if(discount_selection == 'percent')
		{
			discount_total = subtotal * (discount_txt / 100);
			taxable_discount = total_taxable * (discount_txt / 100);
		}

		discount_total = parseFloat(discount_total);

		/* action_compute TOTAL */
		var total = 0;
		total     = subtotal - discount_total - ewt_value;

		/* action_compute TAX */
		var tax   = 0;
		if(tax_selection == 1){
			tax = total_taxable * (12 / 100);
		}
		total += tax;

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

		$(".tr-cm-draggable").each(function()
		{
			/* GET ALL DATA */
			var cm_qty 	= $(this).find(".txt-qty").val();
			var cm_rate 	= $(this).find(".txt-rate").val();
			var cm_amount 	= $(this).find(".txt-amount");
			
			/* CHECK IF QUANTITY IS EMPTY */
			if(cm_qty == "" || cm_qty == null)
			{
				cm_qty = 1;
			}


			/* RETURN TO NUMBER IF THERE IS COMMA */
			cm_qty 		= action_return_to_number(cm_qty);
			cm_rate 	= action_return_to_number(cm_rate);

			var cm_total_per_tr = (cm_qty * cm_rate).toFixed(2);

			/* action_compute SUB TOTAL PER LINE */
			subtotal_returns += parseFloat(cm_total_per_tr);

			/* CONVERT TO INTEGER */
			var amount_val = cm_amount.val();
			
			if(amount_val != '' && amount_val != null && cm_total_per_tr == '') //IF QUANTITY, RATE IS [NOT EMPTY]
			{
				var sub = parseFloat(action_return_to_number(amount_val));
				if(isNaN(sub))
				{
					sub = 0;
				}
				subtotal_returns += sub;
				cm_total_per_tr = sub;
				cm_amount.val(action_add_comma(sub));
			}
			else //IF QUANTITY, RATE IS [EMPTY]
			{
				cm_amount.val(action_add_comma(cm_total_per_tr));
			}
		});


		$(".sub-total-returns").html(action_add_comma(subtotal_returns.toFixed(2)));
		$(".subtotal-amount-input-returns").val(action_add_comma(subtotal_returns.toFixed(2)));


		$(".total-amount-with-returns").html(action_add_comma((total - subtotal_returns).toFixed(2)));
		$(".total-amount-input-with-returns").val((total - subtotal_returns).toFixed(2));
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

	function action_trigger_select_plugin()
	{
		$(".draggable .tr-draggable:last td select.select-item").globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            maxHeight: "309px",
            onCreateNew : function()
            {
            	item_selected = $(this);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });
        $(".draggable .tr-draggable:last td select.select-um").globalDropList(
        {
        	hasPopup: "false",
    		width : "100%",
    		placeholder : "um..",
    		onChangeValue: function()
    		{  
    			action_load_unit_measurement($(this));
    		}

        }).globalDropList('disabled');

        //cm
        $(".cm-draggable .tr-cm-draggable:last td select.select-item").globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            onChangeValue : function()
            {
            	action_load_item_info_cm($(this));
            }
        });                   
        $(".cm-draggable .tr-cm-draggable:last td select.select-um").globalDropList(
        {
        	hasPopup: "false",
    		width : "100%",
    		placeholder : "um..",
    		onChangeValue: function()
    		{
    			action_load_unit_measurement_cm($(this));
    		}

        }).globalDropList('disabled');
	}
                             
	/* Make select input into a drop down list plugin */
	function load_all_estimate(customer_id)
	{
		$(".estimate-container").load("/member/customer/load_estimate_so/"+customer_id , function()
		{
			if($(".est-count").length > 0 || $(".so-count").length > 0)
			{
				$(".drawer-toggle").trigger("click");				
			}
		});
	}
	function iniatilize_select()
	{
		$('.droplist-customer').globalDropList(
		{ 
            width : "100%",
    		placeholder : "Select Customer...",
			link : "/member/customer/modalcreatecustomer",
			onChangeValue: function()
			{
				$(".customer-email").val($(this).find("option:selected").attr("email"));
				load_all_estimate($(this).val());
			}
		});
	    $('.droplist-item').globalDropList(
        {
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
	            action_compute_tablet();
	        }

	    });
	    $('.droplist-item-cm').globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            onChangeValue : function()
            {
            	action_load_item_info_cm($(this));
            }
        });
        $('.droplist-terms').globalDropList(
        {
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
	           	    action_load_link_to_modal('/tablet/invoice/add_item/'+$(this).val(),'md');
            	}
            	// action_load_item_info();
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
	function action_load_item_info($this)
	{
		$parent = $this.closest(".tr-draggable");
		$parent.find(".txt-desc").val($this.find("option:selected").attr("sales-info")).change();
		$parent.find(".txt-rate").val($this.find("option:selected").attr("price")).change();
		$parent.find(".txt-qty").val(1).change();

		$parent.find(".txt-rate").attr("readonly",false);
		$parent.find(".txt-discount").attr("disabled",false);
		if($this.find("option:selected").attr("item-type") == 4)
		{
			$parent.find(".txt-rate").attr("readonly",true);
			$parent.find(".txt-discount").attr("disabled","disabled");
		}
		if($this.find("option:selected").attr("has-um") != '')
		{			
			$parent.find(".select-um").load('/member/item/load_one_um/' +$this.find("option:selected").attr("has-um"), function()
			{
				$(this).globalDropList("reload").globalDropList("enabled");
				$(this).val($(this).find("option:first").val()).change();
			})
		}
		else
		{
			$parent.find(".select-um").html('<option class="hidden" value=""></option>').globalDropList("reload").globalDropList("disabled").globalDropList("clear");
		}
	}
	function action_load_item_info_cm($this)
	{
		$parent_cm = $this.closest(".tr-cm-draggable");
		$parent_cm.find(".txt-desc").val($this.find("option:selected").attr("sales-info")).change();
		$parent_cm.find(".txt-rate").val($this.find("option:selected").attr("price")).change();
		$parent_cm.find(".txt-qty").val(1).change();

		if($this.find("option:selected").attr("has-um") != '')
		{		
			$parent_cm.find(".select-um").load('/member/item/load_one_um/' +$this.find("option:selected").attr("has-um"), function()
			{
				$(this).globalDropList("reload").globalDropList("enabled");
				$(this).val($(this).find("option:first").val()).change();
			})
		}
		else
		{
			$parent_cm.find(".select-um").html('<option class="hidden" value=""></option>').globalDropList("reload").globalDropList("disabled").globalDropList("clear");
		}
	}
	function event_item_qty_change()
	{
		// $(document).on("change", ".txt-qty", function()
		// {
		// 	$parent 	= $(this).closest(".tr-draggable");
		// 	if($parent.find(".select-item").val() != '')
		// 	{
		// 		$item_id 	= $parent.find(".select-item option:selected").val();
		// 		$item_qty 	= $(this).val();
		// 		// $.get('/member/item/get_new_price/'+$item_id +"/"+$item_qty, function(data)
		// 		// {
		// 		// 	console.log(data);
		// 		// 	if(data > 0) $parent.find(".txt-rate").val(data).change();
		// 		// });
		// 	}
		// })
	}

	function action_load_unit_measurement($this)
	{
		$parent = $this.closest(".tr-draggable");
		$item   = $this.closest(".tr-draggable").find(".select-item");

		$um_qty = parseFloat($this.find("option:selected").attr("qty") || 1);
		$sales  = parseFloat($item.find("option:selected").attr("price"));
		$qty    = parseFloat($parent.find(".txt-qty").val());

		$parent.find(".txt-rate").val( $um_qty * $sales * $qty ).change();
	}
	function action_load_unit_measurement_cm($this)
	{
		$parent = $this.closest(".tr-cm-draggable");
		$item   = $this.closest(".tr-cm-draggable").find(".select-item");

		$cm_um_qty = parseFloat($this.find("option:selected").attr("qty") || 1);
		$cm_sales  = parseFloat($item.find("option:selected").attr("price"));
		$cm_qty    = parseFloat($parent.find(".txt-qty").val());

		$parent.find(".txt-rate").val( $cm_um_qty * $cm_sales * $cm_qty ).change();
	}
	function event_button_action_click()
	{
		$(document).on("click","button[type='submit']", function()
		{
			$(".button-action").val($(this).attr("data-action"));
		})
	}

}	
function add_est_to_inv(est_id, type)
{
	$(".estimate-tbl").load('/member/customer/load_added_item/'+est_id, function()
	{
		console.log("success");
		customer_invoice.action_compute();
		customer_invoice.iniatilize_select();
		$(".tbody-item .select-um").globalDropList("enabled");

		$(".est-"+est_id).addClass("hidden");
		if(type == 'est')
		{
			$(".so-count").addClass("hidden");
		}
		else
		{
			$(".est-count").addClass("hidden");
		}
	});
}

/* AFTER DRAGGING A TABLE ROW */
function dragging_done()
{
	customer_invoice.action_reassign_number();
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
	if(data.status == "success-invoice")
	{
		console.log("succes-invoice");
        if(data.redirect)
        {
        	toastr.success("Success inv");
        	location.href = data.redirect;
    	}
    	else
    	{
    		$(".load-data:last").load(data.link+" .load-data .data-container", function()
    		{
    			customer_invoice.action_initialized();
    			toastr.success("Success");
    		})
    	}
	}
	else if(data.status == 'error-inv-no')
	{
		action_load_link_to_modal('/member/customer/invoice/error/'+data.inv_id,'md');
	}
	else if(data.status == 'success-sir')
	{		
        toastr.success("Success sir");
       	location.href = "/member/pis/manual_invoice";
	}
	else if(data.status == 'success-tablet')
	{		
        toastr.success("Success");
       	location.href = "/tablet/invoice";
	}
	else if(data.status == 'success-tablet-sr')
	{		
        toastr.success("Success");
       	location.href = "/tablet/sales_receipt/list";
	}
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
        $(data.target).html(data.view);
    }

    if(data.status == "success")
    {
    	if(data.type == "terms")
    	{
    		$(".droplist-terms").load("/member/maintenance/terms/load-terms", function()
			{
				$(this).globalDropList("reload");
				$(this).val(data.terms_id).change();
			});
			data.element.modal("toggle");
    	}
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