var customer_invoice = new customer_invoice();
var global_tr_html = $(".div-script tbody").html();
var check_if_view = $(".check_if_view").val();
var item_selected = '';

function customer_invoice(){
	init();

	function init()
	{
		iniatilize_select();
		if($(".check_if_view").val() != 1)
		{
			draggable_row.dragtable();
		}

		event_remove_tr();
		event_accept_number_only();
		event_compute_class_change();
		event_taxable_check_change();
		
		action_lastclick_row();
		action_compute();
		action_date_picker();
		action_reassign_number();
		submit_coupon();
		initial_submit_coupon();
		remove_coupon();

		payment_upload_configuration();
	}

	function event_remove_tr()
	{
		$(document).on("click", ".remove-tr", function(e){
			if($(".tbody-item .remove-tr").length > 1){
				$(this).parent().remove();
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
		if(check_if_view != 1)
		{
			$("tbody.draggable").append(global_tr_html);
			action_reassign_number();
			action_trigger_select_plugin();
			action_date_picker();
		}
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

	function submit_coupon()
	{
		$(".check_coupon").click(function()
		{
				$(".load_coupon").show();
				$(".check_coupon").hide();
				$(".check_coupon_remove").hide();
				$('.input_coupon').prop('readonly', true);
				$.ajax(
				{
					url: '/member/ecommerce/product_order/create_order/submit_coupon?invoice_id'+$(".invoice_id_container").val()+'&sent_code='+$(".input_coupon").val(),
					method: 'get',
					success: function(data)
					{
						data = jQuery.parseJSON(data);
						if(data.message == "Success")
						{
							$(".input_coupon_amount").val(data.amount);
							$(".input_coupon_type").val(data.type);
							toastr.success("Coupon applied");
							$(".load_coupon").hide();
							$(".check_coupon").hide();
							$(".check_coupon_remove").show();
							action_compute();
						}
						else
						{
							$(".load_coupon").hide();
							$(".check_coupon").show();
							$(".check_coupon_remove").hide();
							toastr.warning(data.message);
							$('.input_coupon').prop('readonly', false);

						}
					},
					error: function(e)
					{
						$(".load_coupon").hide();
						$(".check_coupon").show();
						$(".check_coupon_remove").hide();
						console.log(e.error());
						$('.input_coupon').prop('readonly', false);
					}
				})
		});
	}


	function initial_submit_coupon()
	{
		$(".load_coupon").show();
		$(".check_coupon").hide();
		$(".check_coupon_remove").hide();
		$('.input_coupon').prop('readonly', true);
		$.ajax(
		{
			url: '/member/ecommerce/product_order/create_order/submit_coupon?sent_code='+$(".input_coupon").val(),
			method: 'get',
			success: function(data)
			{
				data = jQuery.parseJSON(data);
				if(data.message == "Success")
				{
					$(".input_coupon_amount").val(data.amount);
					$(".input_coupon_type").val(data.type);
					$(".load_coupon").hide();
					$(".check_coupon").hide();
					$(".check_coupon_remove").show();
					action_compute();
				}
				else
				{
					$(".load_coupon").hide();
					$(".check_coupon").show();
					$(".check_coupon_remove").hide();
					$('.input_coupon').prop('readonly', false);

				}
			},
			error: function(e)
			{
				$(".load_coupon").hide();
				$(".check_coupon").show();
				$(".check_coupon_remove").hide();
				console.log(e.error());
				$('.input_coupon').prop('readonly', false);
			}
		});
	}


	function remove_coupon()
	{	
		$(".check_coupon_remove").click(function()
		{
				$(".load_coupon").hide();
				$(".check_coupon").show();
				$(".check_coupon_remove").hide();

				$('.input_coupon').prop('readonly', false);
				$(".input_coupon").val("");
				$(".input_coupon_amount").val("");
				$(".input_coupon_type").val("");
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
			var discount= $(this).find(".txt-discount").val();
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
		var coupon              = $(".input_coupon_amount").val();
		var coupon_type         = $(".input_coupon_type").val();
		var coupon_amount       = 0;

		if(coupon == null || coupon == "")
		{
			coupon_amount = 0;
		}
		else
		{
			coupon_amount = coupon;
		}

		if(coupon_type == "percent" || coupon_type == "percentage")
		{
			coupon_amount = subtotal * (coupon_amount / 100);
		}

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
		total     = subtotal - discount_total - ewt_value - coupon_amount;

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
		$(".total-amount").html(action_add_comma(total.toFixed(2)));
		$(".total-amount-input").val(total.toFixed(2));
		if(coupon_type == "fixed" || coupon_type == "percent")
		{
			$(".coupon-total").text(parseFloat(coupon_amount).toFixed(2)+"("+coupon_type+")");
		}
		else
		{
			$(".coupon-total").text(parseFloat(coupon_amount).toFixed(2));
		}

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

	function action_trigger_select_plugin()
	{
		$(".draggable .tr-draggable:last td select.select-item").globalDropList(
        {
            hasPopup : "false",
            width 	: "100%",
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });
	}

	/* Make select input into a drop down list plugin */

	function iniatilize_select()
	{
		$('.droplist-customer').globalDropList(
		{ 
			link : "/member/customer/modalcreatecustomer",
			onChangeValue: function()
			{
				$(".customer-email").val($(this).find("option:selected").attr("email"));
			}
		});
		
	    $('.droplist-item').globalDropList(
        {
        	hasPopup: "false",
            width : "100%",
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });

        $(".drop-down-payment").globalDropList(
		{
		    link 		: '/member/maintenance/payment_method/add',
		    link_size 	: 'sm',
		    hasPopup 	: 'false',
		    width 		: "100%",
		    placeholder : 'Payment Method'
		});
	}


	function action_load_item_info($this)
	{
		$parent = $this.closest(".tr-draggable");
		$parent.find(".txt-desc").val($this.find("option:selected").attr("sales-info")).change();
		$parent.find(".txt-rate").val($this.find("option:selected").attr("price")).change();
		$parent.find(".txt-qty").val(1).change();
	}

	function action_load_unit_measurement($this)
	{
		$parent = $this.closest(".tr-draggable");
		$item   = $this.closest(".tr-draggable").find(".select-item");

		$um_qty = parseFloat($this.find("option:selected").attr("qty"));
		$sales  = parseFloat($item.find("option:selected").attr("price"));
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

	function payment_upload_configuration()
    {
        Dropzone.options.myDropZoneImport = 
        {
            maxFilesize: 2,
            thumbnailWidth: 148,
            thumbnailHeight: 148,
            acceptedFiles: "image/*",
            init: function() 
            {

                this.on("uploadprogress", function(file, progress) 
                {
                })

                this.on("error", function(file, response)
                {
                    console.log(response);
                })

                this.on("addedfile", function(file)
                {
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);
                    }
                    // $("#ImportContainer .dz-message").slideUp();
                    target_file = this.files;
                    $("#files").change();
                })

                this.on("complete", function(file)
                {
                	/* IF ORDER ID IS NOT NULL / IF UPDATE ORDER */
                	if(order_id)
                    {
                    	console.log("hello");
                    	$(".load-data").load("/member/ecommerce/product_order/create_order?id="+order_id +" .content-data", function()
                    		{
                    			toastr.success("Successfully changed attachment");
                    		});
                	}
                })

                this.on("dragover", function()
                {
                    // $("#ModalGallery .dropzone").addClass("dropzone-drag");
                })

                this.on("dragleave", function()
                {
                    // $("#ModalGallery .dropzone").removeClass("dropzone-drag");
                })

                this.on("drop", function()
                {
                    // $("#ModalGallery .dropzone").removeClass("dropzone-drag");
                })
            }
        };
    }
}	


/* AFTER DRAGGING A TABLE ROW */
function dragging_done()
{
	customer_invoice.action_reassign_number();
}

/* AFTER ADDING A CUSTOMER */
function submit_done_customer(result)
{
	customer_invoice.action_reload_customer(result['customer_info']['customer_id']);
}

function submit_done(data)
{
	if(data.status == "success-invoice")
	{
        toastr.success("Success");
       	location.href = data.redirect_to;
	}
	else if(data.status == "success-update-invoice")
	{
        toastr.success("Successfully updated");
       	location.href = data.redirect_to;
	}
	else if(data.type == "payment_method")
	{
		$(".drop-down-payment").load("/member/maintenance/load_payment_method", function()
		{
			$(this).globalDropList("reload");
			$(this).val(data.payment_method_id).change();
		});
		data.element.modal("toggle");
	}
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
        $(data.target).html(data.view);
    }
}