var receive_payment = new receive_payment();
var maximum_payment = 0;
var is_amount_receive_modified = false;

var amount_due = 0;
var amount_credit = 0;
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
		action_put_payment();
		test_function();
		event_button_apply_credit();
	}
	function test_function()
	{
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
					initialize_select_plugin();
				}
			});
		});
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
		    	// alert(customer_id);
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
	    		get_session('rp_id', function(rp_id)
	    		{
	    			console.log(rp_id);
	    			if(!rp_id)
	    			{
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

					            // var check    = 'SELECT * FROM tbl_customer_invoice LEFT JOIN';
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
					                }
					                else
					                {
					                	$('.tbody-item').html('');

					                	$.each(results.rows, function(index, val) 
						                {
						                	get_cm_amount(val.credit_memo_id, function(cm_amount)
					                		{
					                			// console.log(cm_amount);
					                			var append = '<tr class="inv-rp-id" inv_rp_id="'+val.inv_id+'">'+
					                                             '<input type="hidden" value="invoice" class="rp-type" name="rpline_txn_type[]">'+
					                                             '<input type="hidden" value="'+val.inv_id+'" class="rp-inv-id" name="rpline_txn_id[]">'+
					                                              '<td class="text-center">'+
					                                                '<input type="hidden" class="line-is-checked inv-is-paid" name="line_is_checked[]" value="" >'+
					                                                '<input type="checkbox" class="rp line-checked">'+
					                                              '</td>'+
					                                              '<td>Invoice #'+val.new_inv_id+' ( '+val.inv_date+' )</td>'+
					                                              '<td class="text-right">'+val.inv_date+'</td>'+
					                                              '<td><input type="text" class="text-right original-amount" value="'+(val.inv_overall_price).toFixed(2)+'" disabled /></td>'+
					                                              '<td><input type="text" class="text-right balance-due" value="'+(((val.inv_overall_price) - val.amount_applied) + ((val.rpline_amount ? val.rpline_amount : 0 ) - cm_amount)).toFixed(2)+'" disabled /></td>'+
					                                              '<td><input type="text" class="text-right amount-payment" name="rpline_amount[]" value=""/></td>'+
					                                          '</tr>';

							                	$('.tbody-item').append(append);
					                		});
						                	
						                });
					                }			                
					            },
					            onError);
					        });
			    		});
						count_credit(customer_id, function(ctr)
						{
							$(".open-transaction").slideDown();
							$(".count-open-transaction").html(ctr);
							$(".click-open-transaction").attr("onClick","click_open_transaction("+customer_id+")");
						});
	    			}
	    		});
		    }
		});
	}

	this.action_initialize_load = function()
	{
		action_initialize_load();
	}
	this.formatMoney = function()
	{
		formatMoney();
	}

	function action_initialize_load()
	{
		// initialize_select_plugin();
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
		amount_due = parseFloat($amount.replace(",",""));
		$(".amount-apply").html("PHP "+formatMoney($amount));
		compute_total();
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

	function event_compute_apply_credit()
	{
		var total_amount_to_credit = 0;
		$('.compute-applied-credit').each(function(a, b)
		{
			total_amount_to_credit += parseFloat($(this).val());
		});
		$('.credit-amount-to-apply').val(total_amount_to_credit);
		$('.credit-amount').html('PHP ' + formatMoney(total_amount_to_credit));

		amount_credit = total_amount_to_credit;
		compute_total();
	}
	function compute_total()
	{		
		$(".applied-total-amount").val(roundNumber(parseFloat(amount_due) - parseFloat(amount_credit)));
		$('.applied-amount').html('PHP ' + roundNumber(parseFloat(parseFloat(amount_due) - parseFloat(amount_credit))));
		console.log(parseFloat(amount_due) - parseFloat(amount_credit));
	}
	this.event_compute_apply_credit = function()
	{
		event_compute_apply_credit();
	}
	this.compute_total = function()
	{
		compute_total();
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
	function event_button_apply_credit()
	{
		$("body").on("click", ".remove-credit", function()
		{
			$(this).parent().parent().remove();
			event_compute_apply_credit();
		});
		$("body").on("click", ".btn-apply-credit", function()
		{
			$credit = $(".tr-credit");
			$return_data = [];
			$html = "";
			$.each($credit, function(key, value)
			{
				$parent = $(this);
				$chk = $parent.find(".checkbox-credit");
				$amount = $parent.find(".input-credit-cm").val();
				$(".load-applied-credits").html();
				if($chk.prop("checked"))
				{
					$return_data[key] = [];
					$return_data[key]['cm_id'] = $chk.val();
					$return_data[key]['cm_applied_amount'] = $amount;

					$html += '<li class="payment-li" style="list-style: none;">'+
                      '<div class="form-group row clearfix">'+
                          '<div class="col-sm-1">' +
                             '<a href="javascript:" class="remove-credit" credit-id="'+$chk.val()+'"> <i class="fa fa-times-circle" style="color:red"></i></a> ' +
                             '<input type="hidden" name="rp_cm_id[]" value="'+$chk.val()+'">'+
                          '</div>'+
                          '<div class="col-sm-4">'+
                              $chk.val() +
                          '</div>'+
                          '<div class="col-sm-7 text-right">PHP '+
                              formatMoney($amount) +
                           '</div>' +
                             '<input type="hidden" name="rp_cm_amount[]" class="compute-applied-credit" value="'+$amount+'">'+
                      '</div>' +
	                '</li>';
				}
			});
			$(".load-applied-credits").html($html);
			$("#modal_credit").modal("hide");
			event_compute_apply_credit();
		});
	}

}


function count_credit(customer_id, callback)
{
    db.transaction(function (tx)
    {
        var query_check = 'SELECT * FROM tbl_credit_memo'+
                          ' WHERE cm_customer_id = '+ customer_id +
                          ' and cm_type = 1 and cm_used_ref_name = "retain_credit" and cm_status = 0';

        tx.executeSql(query_check, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
            	callback(results.rows.length);
            }
            else
            {
            	callback(0);
            }
        });
    });
}
function get_all_credit(customer_id, callback)
{
    db.transaction(function (tx)
    {
        var query_check = 'SELECT *, sum(applied_amount) as applied_cm_amount, tbl_credit_memo.cm_id as creditmemo_id FROM tbl_credit_memo'+
        				  ' LEFT JOIN tbl_credit_memo_applied_payment ON tbl_credit_memo_applied_payment.cm_id = tbl_credit_memo.cm_id '+
                          ' WHERE cm_customer_id = '+ customer_id +
                          ' and cm_type = 1 and cm_used_ref_name = "retain_credit" and cm_status = 0 GROUP BY tbl_credit_memo.cm_id';

        tx.executeSql(query_check, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
            	callback(results.rows);
            }
            else
            {
            	callback([]);
            }
        });
    });
}
function click_open_transaction(customer_id)
{
	get_all_credit(customer_id, function(_credit)
	{
		$ctr = count(_credit);
		$html = "";
		$(".credit-for-payment").html("");
		if($ctr > 0)
		{
			$total_credit = 0;
			$total_applied_credit = 0;
			$.each(_credit, function(key, value)
			{
				$total_credit += value['cm_amount'];
				$total_applied_credit += value['applied_cm_amount'];
				$applied_cm_amount = value['applied_cm_amount'] ? value['applied_cm_amount'] : 0;
				$remaining = roundNumber((parseFloat(value['cm_amount'])-parseFloat($applied_cm_amount)));
				$html +='<tr class="tr-credit">' +
					   '<td class="text-center">'+
	                   '<input type="checkbox" class="td-credit new-checkbox checkbox-credit" value='+value['creditmemo_id']+ ' name="apply_credit['+value['creditmemo_id']+']" data-content="50">'+
	                   '</td>'+
	                   '<td>'+value['creditmemo_id']+'</td>'+
	                   '<td class="text-center">'+roundNumber(value['cm_amount'])+'</td>'+
	                   '<td class="text-center">'+ roundNumber($applied_cm_amount) +'</td>' +
	                   '<td class="text-center" >'+
	                   '<input type="text" class="form-control compute input-credit-cm text-right" value="'+$remaining+'" name="apply_credit_amount['+value['creditmemo_id']+']">' +
	                   '</td>' +
	                   '</tr>';
			});
			$(".cm-total-amount").html("PHP "+ roundNumber($total_credit));
			$(".cm-total-applied").html("PHP "+ roundNumber($total_applied_credit));
			$(".amount-input-cm").html("PHP "+roundNumber($total_credit - $total_applied_credit));
		}
		else
		{
			$html = "<tr><td class='text-center' colspan='5'>NO AVAILABLE CREDIT</td></tr>";

		}
		$(".credit-for-payment").prepend($html);
		$("#modal_credit").modal("show");
	});
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