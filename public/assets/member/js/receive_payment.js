var receive_payment = new receive_payment();
var maximum_payment = 0;
var is_amount_receive_modified = false;

function receive_payment()
{
	init();

	function init()
	{
		document_ready();
	}

	function document_ready()
	{
		event_line_check_change();
		event_payment_amount_change();
		event_received_amount_change();
		event_button_action_click();
		action_initialize_load();
		action_put_customers();
		action_put_accounting();
	}

	function action_put_accounting()
	{
		get_all_coa(function(coa)
		{
			alert(coa);
		});
		$('.drop-down-coa');
	}

	function action_put_customers()
	{
		get_all_customers(function(customer)
		{
			$.each(customer, function(index, val) 
			{
				var append = '<option value="'+val.customer_id+'" email="'+val.email+'">'+
							 val.first_name+' '+val.middle_name+' '+val.last_name+
							 '</option>';

				$('.drop-down-customer').append(append);

				if (customer.length == (index + 1)) 
				{
					initialize_dropdown_customer();
				}
			});
		});
	}

	function initialize_dropdown_customer()
	{
		$(".drop-down-customer").globalDropList(
		{
		    hasPopup    : "false",
		    width 		: "100%",
		    placeholder : 'Customer',
		    onChangeValue: function()
		    {
		    	var customer_id = $(this).val();
		    	var check = $(".for-tablet-only").html();
		    	// if(check == null || check == "")
		    	// {
			    // 	$(".tbody-item").load("/member/customer/load_rp/"+ (customer_id != '' ? customer_id : 0), function()
			    // 	{
			    // 		action_compute_maximum_amount();
			    // 	})		    		
		    	// }
		    	// else
	    		// {
			    // 	$(".tbody-item").load("/tablet/customer/load_rp/"+ (customer_id != '' ? customer_id : 0), function()
			    // 	{
			    // 		action_compute_maximum_amount();
			    // 	})		    		
	    		// }
	    		get_shop_id(function(shop_id)
	    		{
	    			db.transaction(function (tx)
			        {
			        	// $query->leftJoin(DB::raw("(select sum(rpline_amount) as amount_applied, rpline_reference_id from tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = ".$shop_id." and rpline_reference_name = 'invoice' group by concat(rpline_reference_name,'-',rpline_reference_id)) pymnt"), "pymnt.rpline_reference_id", "=", "inv_id");
			        	// $query->where("inv_shop_id", $shop_id)->where("inv_customer_id", $customer_id);
			        	// ->where("inv_is_paid", 0)->where("is_sales_receipt",0)
			            var query_check = 'SELECT * FROM tbl_customer_invoice '+
			            				  'LEFT JOIN (SELECT sum(rpline_amount) as amount_applied, rpline_reference_id from tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = '+shop_id+' and rpline_reference_name = "invoice" GROUP BY rpline_reference_id) ON rpline_reference_id = inv_id '+
			            				  // 'LEFT JOIN "pymnt.rpline_reference_id", "=", "inv_id" '+
			                              'WHERE inv_shop_id = '+shop_id+' AND inv_customer_id = '+customer_id+' AND inv_is_paid = 0 AND is_sales_receipt = 0';

			            var check    = 'SELECT * FROM tbl_customer_invoice LEFT JOIN';
			            tx.executeSql(query_check, [], function(tx, results)
			            {
			                console.log(results.rows);
			                var append_default = '<tr>'+
		                                             '<input type="hidden" value="invoice" name="rpline_txn_type[]">'+
		                                             '<input type="hidden" value="" name="rpline_txn_id[]">'+
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
			                }
			                else
			                {
			                	$('.tbody-item').html('');

			                	$.each(results.rows, function(index, val) 
				                {
<<<<<<< HEAD
				                	var append = '<tr>'+
		                                             '<input type="hidden" value="invoice" name="rpline_txn_type[]">'+
		                                             '<input type="hidden" value="" name="rpline_txn_id[]">'+
		                                              '<td class="text-center">'+
		                                                '<input type="hidden" class="line-is-checked" name="line_is_checked[]" value="" >'+
		                                                '<input type="checkbox" class="line-checked">'+
		                                              '</td>'+
		                                              '<td>Invoice #'+val.new_inv_id+' ( '+val.inv_date+' )</td>'+
		                                              '<td class="text-right">'+val.inv_date+'</td>'+
		                                              '<td><input type="text" class="text-right original-amount" value="'+(val.inv_overall_price).toFixed(2)+'" disabled /></td>'+
		                                              '<td><input type="text" class="text-right balance-due" value="'+((val.inv_overall_price) - val.amount_applied + (val.rpline_amount ? val.rpline_amount : 0)).toFixed(2)+'" disabled /></td>'+
		                                              '<td><input type="text" class="text-right amount-payment" name="rpline_amount[]" value=""/>'+val.rpline_amount+'</td>'+
		                                          '</tr>';
=======
				                	get_cm_amount(val.credit_memo_id, function(cm_amount)
			                		{
			                			var append = '<tr>'+
			                                             '<input type="hidden" value="invoice" name="rpline_txn_type[]">'+
			                                             '<input type="hidden" value="" name="rpline_txn_id[]">'+
			                                              '<td class="text-center">'+
			                                                '<input type="hidden" class="line-is-checked" name="line_is_checked[]" value="" >'+
			                                                '<input type="checkbox" class="line-checked">'+
			                                              '</td>'+
			                                              '<td>Invoice #'+val.new_inv_id+' ( '+val.inv_date+' )</td>'+
			                                              '<td class="text-right">'+val.inv_date+'</td>'+
			                                              '<td><input type="text" class="text-right original-amount" value="'+(val.inv_overall_price).toFixed(2)+'" disabled /></td>'+
			                                              '<td><input type="text" class="text-right balance-due" value="'+(((val.inv_overall_price) - val.amount_applied) + ((val.rpline_amount ? val.rpline_amount : 0 ) - cm_amount)).toFixed(2)+'" disabled /></td>'+
			                                              '<td><input type="text" class="text-right amount-payment" name="rpline_amount[]" value=""/></td>'+
			                                          '</tr>';
>>>>>>> dcfe9307026e81cafe1f2e5aed24975c390b155d

					                	$('.tbody-item').append(append);
			                		});
				                	
				                });
			                }
			                
			            },
			            onError);
			        });
	    		})
		    }
		});
	}

	this.action_initialize_load = function()
	{
		action_initialize_load();
	}

	function action_initialize_load()
	{
		initialize_select_plugin();
		$(".datepicker").datepicker();
		$(".amount-payment").change();
	}

	function initialize_select_plugin()
	{
		$(".drop-down-payment").globalDropList(
		{
		    hasPopup    : "false",
		    width 		: "100%",
		    placeholder : 'Payment Method'
		});

		$(".drop-down-coa").globalDropList(
		{
		    hasPopup    : "false",
		    width 		: "100%",
		    placeholder : 'Account'
		});
	}

	/* CHECK BOX FOR LINE ITEM */
	function event_line_check_change()
	{
		$(document).on("change", ".line-checked", function()
		{
			action_change_input_value($(this));
		});
	}
	function action_change_input_value($this)
	{
		if($this.is(":checked"))
		{
			$this.prev().val(1);
			var balance = $this.parents("tr").find(".balance-due").val();
			if(!formatFloat($this.parents("tr").find(".amount-payment").val()) > 0)
			{
				$this.parents("tr").find(".amount-payment").val(balance).change();
			}
		}
		else
		{
			$this.prev().val(0);
			if(formatFloat($this.parents("tr").find(".amount-payment").val()) > 0)
			$this.parents("tr").find(".amount-payment").val('').change();
		}
	}

	function action_compute_maximum_amount()
	{
		$(".balance-due").each(function()
		{
			maximum_payment += formatFloat($(this).val());
		})
	}

	function event_received_amount_change()
	{
		$(document).on("change", ".amount-received", function()
		{
			$(this).val(formatMoney($(this).val()));

			var amount_receive = formatFloat($(this).val());
			var amount_applied = formatFloat(action_total_amount_apply());

			if( amount_receive > amount_applied)
			{
				console.log("true");
				action_update_credit_amount(amount_receive - amount_applied);
			}
			else
			{
				action_update_credit_amount(0)
			}
		})

		$(document).on("keydown", ".amount-received", function()
		{
			is_amount_receive_modified = true;
		})
	}

	function action_update_apply_amount($amount)
	{
		$(".amount-to-apply").val($amount);
		$(".amount-apply").html("PHP "+formatMoney($amount))
	}

	function action_update_credit_amount($amount)
	{
		$(".amount-to-credit").val($amount);
		$(".amount-credit").html("PHP "+formatMoney($amount))
	}

	function event_payment_amount_change()
	{
		$(document).on("change",".amount-payment", function(e)
		{
			$(this).val(formatFloat($(this).val()) == 0 ? '' : formatMoney($(this).val()));

			!is_amount_receive_modified ? $(".amount-received").val(action_total_amount_apply()).change() : $(".amount-received").change();
			action_update_apply_amount(action_total_amount_apply());

			// check - uncheck checkbox
			if(formatFloat($(this).val()) > 0)
			{
				$(this).parents("tr").find(".line-checked").prop("checked", true).change();
			}
			else
			{
				$(this).parents("tr").find(".line-checked").prop("checked", false).change();
			}

			// validation for exceeding balace
			if(formatFloat($(this).val()) > formatFloat($(this).parents("tr").find(".balance-due").val()) )
			{
				this.setCustomValidity("You may not pay more than the balance due");
    			return false;
			}
			else
			{
				this.setCustomValidity("");
    			return true;
			}
		})
	}

	function action_total_amount_apply()
	{
		var line_payment_amount = 0;
		$(".amount-payment").each(function()
		{
			line_payment_amount += formatFloat($(this).val());
		})
		return formatMoney(line_payment_amount);
	}

	function formatFloat($this)
	{
		return Number($this.toString().replace(/[^0-9\.]+/g,""));
	}

	function formatMoney($this)
	{
		var n = formatFloat($this), 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	    j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	}

	function event_button_action_click()
	{
		$(document).on("click","button[type='submit']", function()
		{
			$(".button-action").val($(this).attr("data-action"));
		})
	}

}

function submit_done(data)
{
	if(data.status == "success" || data.response_status == "success")
	{
		if(data.type == "payment_method")
		{
			$(".drop-down-payment").load("/member/maintenance/load_payment_method", function()
			{
				$(this).globalDropList("reload");
				$(this).val(data.payment_method_id).change();
			});
			data.element.modal("toggle");
		}
		else if(data.type == "account")
		{
			$(".drop-down-coa").load("/member/accounting/load_coa?filter[]=Bank", function()
			{
				$(this).globalDropList("reload");
				$(this).val(data.id).change();
			});
			data.element.modal("toggle");
		}
		else if(data.redirect)
        {
        	toastr.success(data.message);
        	location.href = data.redirect;
    	}
    	else
    	{
    		$(".rcvpymnt-container").load(data.url+" .rcvpymnt-container .rcvpymnt-load-data", function()
			{
				receive_payment.action_initialize_load();
				toastr.success(data.message);
			});
    	}
	}
}