var write_check = new write_check();
var global_tr_html = $(".div-script tbody").html();
var po_id_list = $(".div-script-po").html();
var item_selected = ''; 

function write_check()
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
		
		action_lastclick_row();
		action_compute();
		action_date_picker();
		action_reassign_number();
		event_button_action_click();
	}

	function event_remove_tr()
	{
		//cycy
		$(document).on("click", ".remove-tr", function(e){
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
						$(".po-tbl").load("/member/vendor/po_remove/"+id, function()
						{
							// console.log("success-removing");
							iniatilize_select();
							$(".tbody-item .select-um").globalDropList("enabled");
							$(".po-"+id).removeClass("hidden");
							$(".drawer-toggle").trigger("click");
							action_reassign_number();
							action_compute();
							var count = $(".tbody-item .trcount").length;
							console.log(count);
							if(count == 0)
							{
								$(".bill-data").removeClass("hidden");
							}
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
		});
	}

	this.action_lastclick_row = function()
	{
		action_lastclick_row();
	}

	function action_lastclick_row()
	{
		$(document).on("click", "tbody.draggable tr:last td:not(.remove-tr)", function(){
			action_lastclick_row_op();
		});
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

	function action_lastclick_row_op()
	{
		$("tbody.draggable").append(global_tr_html);
		action_reassign_number();
		action_trigger_select_plugin();
		action_date_picker();
	}

	function action_date_picker()
	{
		$(".draggable .for-datepicker").datepicker();
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
			   	
			    if(ret == 0){
			    	ret = '';
			    }

				return ret;
			  });
		});
	}

	function event_compute_class_change()
	{
		$(document).on("change",".compute", function()
		{
			action_compute();
		});
	}

	function action_compute()
	{
		var subtotal = 0;
		var total_taxable = 0;

		$(".tr-draggable").each(function()
		{
			/* GET ALL DATA */
			var qty 	= $(this).find(".txt-qty").val();
			var rate 	= $(this).find(".txt-rate").val();
			var discount= 0;
			var amount 	= $(this).find(".txt-amount");
			var taxable = $(this).find(".taxable-check");
			
			/* CHECK IF QUANTITY IS EMPTY */
			if(qty == "" || qty == null)
			{
				qty = 1;
			}

			/* CHECK THE DISCOUNT */
			// if(discount.indexOf('%') >= 0)
			// {
			// 	$(this).find(".txt-discount").val(discount.substring(0, discount.indexOf("%") + 1));
			// 	discount = (parseFloat(discount.substring(0, discount.indexOf('%'))) / 100) * action_return_to_number(rate);
			// }
			// else if(discount == "" || discount == null)
			// {
			// 	discount = 0;
			// }
			// else
			// {
			// 	discount = parseFloat(discount);
			// }

			/* RETURN TO NUMBER IF THERE IS COMMA */
			qty = action_return_to_number(qty);
			rate = action_return_to_number(rate);
			discount = action_return_to_number(discount);

			var total_per_tr = ((qty * rate) - discount).toFixed(2);

			/* action_compute SUB TOTAL PER LINE */
			subtotal += parseFloat(total_per_tr);

			/* AVOID ZEROES */
			if(total_per_tr <= 0)
			{
				total_per_tr = '';
			}

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

		discount_total = 0;

		if(discount_selection == 'percent')
		{
			discount_total = subtotal * (discount_txt / 100);
			taxable_discount = total_taxable * (discount_txt / 100);
		}

		discount_total = 0;

		/* action_compute TOTAL */
		var total = 0;
		total     = subtotal - discount_total - ewt_value;

		/* action_compute TAX */
		var tax   = 0;
		if(tax_selection == 1){
			tax = total_taxable * (12 / 100);
		}
		total += tax;

		$(".sub-total").html(action_add_comma(subtotal.toFixed(2)));
		$(".subtotal-amount-input").val(action_add_comma(subtotal.toFixed(2)));
		$(".ewt-total").html(action_add_comma(ewt_value.toFixed(2)));
		$(".discount-total").html(action_add_comma(discount_total.toFixed(2)));
		$(".tax-total").html(action_add_comma(tax.toFixed(2)));
		$(".total-amount").html(action_add_comma(subtotal.toFixed(2)));
		$(".total-amount-input").val(subtotal.toFixed(2));

	}

	function action_add_comma(number)
	{
		number += '';
		if(number == '0' || number == ''){
			return '';
		}

		else{
			return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
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


	function action_trigger_select_plugin_not_last()
	{
		$(".draggable .tr-draggable:first td select.select-item").globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            onCreateNew : function()
            {
            	item_selected = $(this);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });
        $(".draggable .tr-draggable:first td select.select-um").globalDropList(
        {
        	hasPopup: "false",
    		width : "100%",
    		placeholder : "um.."
        });
	}	
	function action_trigger_select_plugin()
	{
		$(".draggable .tr-draggable:last td select.select-item").globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
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
    		placeholder : "um.."
        });
	}
	function event_button_action_click()
	{
		$(document).on("click","button[type='submit']", function()
		{
			$(".button-action").val($(this).attr("data-action"));
		})
	}
	/* Make select input into a drop down list plugin */

	
	function iniatilize_select()
	{
		$('.droplist-vendor').globalDropList(
		{ 
			width : "100%",
			link : "/member/vendor/add",
			onChangeValue: function()
			{
				$(".customer-email").val($(this).find("option:selected").attr("email"));
				load_purchase_order_vendor($(this).find("option:selected").attr("value"));

			}
		});
		$('.drop-down-name').globalDropList(
		{ 
			width : "100%",
			hasPopup : "false",
		    placeholder : 'Customer or Vendor',
			onChangeValue: function()
			{
				$(".customer-email").val($(this).find("option:selected").attr("email"));
				$(".wc-ref-name").val($(this).find("option:selected").attr("reference"));
				if($(this).find("option:selected").attr("reference") == "vendor")
				{
					load_purchase_order_vendor($(this).find("option:selected").attr("value"));
				}
			}
		});


		
		$(".drop-down-customer").globalDropList(
		{
		    link 		: '/member/customer/modalcreatecustomer',
		    link_size 	: 'lg',
		    width 		: "100%",
		    placeholder : 'Customer',
		    onChangeValue: function()
		    {
		    	var customer_id = $(this).val();
		    	$(".tbody-item").load("/member/customer/load_rp/"+ (customer_id != '' ? customer_id : 0), function()
		    	{
		    		action_compute_maximum_amount();
		    	})
		    }
		});
	    $('.droplist-item').globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            onCreateNew : function()
            {
            	item_selected = $(this);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
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
        // $('.droplist-um:not(.has-value)').globalDropList("disabled");
		$(".drop-down-payment").globalDropList(
		{
		    link 		: '/member/maintenance/payment_method/add',
		    link_size 	: 'lg',
		    width 		: "100%",
		    placeholder : 'Payment Method'
		});

		$(".drop-down-coa").globalDropList(
		{
		    link 		: '/member/accounting/chart_of_account/popup/add',
		    link_size 	: 'md',
		    width 		: "100%",
		    placeholder : 'Account'
		});
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

	function load_purchase_order_vendor(vendor_id)
	{
		$(".purchase-order-and-bill-container").load("/member/vendor/load_po_bill/"+vendor_id , function()
			{
				if($(".po-bill-count").length > 0 || $(".po-bill-count-bill").length > 0)
				{
					$(".purchase-order").removeClass("hidden");
					// $(".drawer").drawer({openClass: "drawer-open"});
					$(".drawer-toggle").trigger("click");					
				}
			});
	}
	function action_load_item_info($this)
	{
		$parent = $this.closest(".tr-draggable");
		$parent.find(".txt-desc").val($this.find("option:selected").attr("sales-info")).change();
		$parent.find(".txt-rate").val($this.find("option:selected").attr("cost")).change();
		$parent.find(".txt-qty").val(1).change();
		$parent.find(".txt-rate").attr("disabled",false);
		$parent.find(".txt-discount").attr("disabled",false);
		if($this.find("option:selected").attr("item-type") == 4)
		{
			$parent.find(".txt-rate").attr("disabled","disabled");
			$parent.find(".txt-discount").attr("disabled","disabled");
		}
		if($this.find("option:selected").attr("has-um") != '')
		{
			$.ajax(
			{
				url: '/member/item/load_one_um/' +$this.find("option:selected").attr("has-um"),
				method: 'get',
				success: function(data)
				{						
					$parent.find(".select-um").load('/member/item/load_one_um/' +$this.find("option:selected").attr("has-um"), function()
					{
						$(this).globalDropList("reload").globalDropList("enabled");
						console.log($(this).find("option:first").val());
						$(this).val($(this).find("option:first").val()).change();
					})
				},
				error: function(e)
				{
					console.log(e.error());
				}
			})
		}
		else
		{
			$parent.find(".select-um").html('<option class="hidden" value=""></option>').globalDropList("reload").globalDropList("clear");
		}
	}

	function action_load_unit_measurement($this)
	{
		$parent = $this.closest(".tr-draggable");
		$item   = $this.closest(".tr-draggable").find(".select-item");

		$um_qty = parseFloat($this.find("option:selected").attr("qty") || 1);
		$sales  = parseFloat($item.find("option:selected").attr("cost"));
		$qty    = parseFloat($parent.find(".txt-qty").val());
		console.log($um_qty +"|" + $sales +"|" +$qty);
		$parent.find(".txt-rate").val( $um_qty * $sales * $qty ).change();
	}

	this.action_reload_customer = function($id)
	{
		action_reload_customer($id);
	}

	function action_reload_customer($id)
	{
		$.ajax(
		{
			url: '/member/customer/load_customer',
			method: 'GET',
			success: function(data)
			{
				$element = $(".droplist-customer");

				$element.html(data);
				$element.globalDropList("reload");
				$element.val($id).change();
				
			},
			error: function()
			{
				console.log("error");
			}

		})
	}

	this.action_reload_item = function($id)
	{
		action_reload_item($id);
	}

	function action_reload_item($id)
	{
		$.ajax(
		{
			url: '/member/item/load_item_category',
			method: 'GET',
			success: function(data)
			{
				$element = $(".tbody-item .select-item");

				$element.html(data);
				
				$element.globalDropList("reload");

				// Filter selected combobox only
				item_selected.val($id).change();
			},
			error: function()
			{
				console.log("error");
			}

		})
	}
	this.action_compute = function()
	{
		action_compute();
	}
	this.iniatilize_select = function()
	{
		iniatilize_select();
	}
	this.action_trigger_select_plugin = function()
	{
		action_trigger_select_plugin();
	}
	this.action_trigger_select_plugin_not_last = function()
	{
		action_trigger_select_plugin_not_last();
	}

}	


/* AFTER DRAGGING A TABLE ROW */
function dragging_done()
{
	write_check.action_reassign_number();
    write_check.action_compute();
}

/* AFTER ADDING A CUSTOMER */
function submit_done_customer(result)
{
	toastr.success("Success");
    $(".droplist-customer").load("/member/customer/load_customer", function()
    {                
         $(".droplist-customer").globalDropList("reload");
         $(".droplist-customer").val(result.id).change();          
    });
}

/* AFTER ADDING AN  ITEM */
function submit_done_item(data)
{
	toastr.success("Success");
    item_selected.load("/member/item/load_item_category", function()
    {                
         $(this).globalDropList("reload"); 
         $(this).val(data.item_id).change();  
    });
    data.element.modal("hide");
}
function add_po_to_bill(po_id)
{
	$(".po-tbl").load('/member/vendor/load_added_item/'+po_id, function()
	{
		console.log("success");
		write_check.action_compute();
		write_check.iniatilize_select();
		$(".tbody-item .select-um").globalDropList("enabled");
		$(".bill-data").addClass("hidden");
		$(".po-"+po_id).addClass("hidden");
	});
}
function iniatilize(id)
{
   $('.select-poline-item-'+id).globalDropList(
    {
        link : "/member/item/add",
        width : "100%"
    });
}
function submit_done(data)
{
	if(data.type == 'vendor')
	{		
       toastr.success("Success");
	    $(".droplist-vendor").load("/member/vendor/load_vendor", function()
	    {                
	         $(this).globalDropList("reload");
	         $(this).val(data.vendor_id).change();          
	    });
    	data.element.modal("hide");
    	console.log(data);
	}
	else if(data.status == 'success-write-check')
	{		
        toastr.success("Success");
       	location.href = data.redirect;
	}
	else if(data.status == 'success-receive-inventory')
	{
        toastr.success("Success");
       	location.href = data.redirect;		
	}
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
        $(data.target).html(data.view);
    }
}