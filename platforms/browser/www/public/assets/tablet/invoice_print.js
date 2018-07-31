var invoice_print = new invoice_print();
function invoice_print()
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
		check_session();
	}
	function check_session()
	{
		get_session('inv_id_print', function(inv_id)
		{
			if(inv_id)
			{
				load_data(inv_id);
			}
			else
			{
				alert("Something wen't wrong, Please try again!");
			}
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
	function load_data(inv_id)
	{
		get_invoice_data(inv_id, function(inv, _invline, _cmline)
	    {
	    	console.log(inv);
	    	console.log(_invline);
	    	console.log(_cmline);

	        $('.inv-id-print').html(inv['new_inv_id']);
	        $('.inv-customer-name').html(inv['company'] == "" ? inv['first_name'] + " " + inv['middle_name']+ " " + inv['last_name'] : inv['company']);
	        $('.inv-date').html(inv['inv_date']);
	        $('.inv-due-date').html(inv['inv_due_date']);
	        $('.inv-terms').html(inv['terms_name']);

	        if(inv['is_sales_receipt'] == 1)
	        {
	        	$('.cancel-btn').attr('href','../../agent/sales_receipt.html');
	        	$('.transaction-type').html('Cash Sales');
	        }
	        else
	        {
	        	$('.cancel-btn').attr('href','../../agent/invoice.html');
	        	$('.transaction-type').html('Credit Sales');
	        }

	        var tr = "";
	        var tr_total = "";
	        var taxable_amount = 0;
	        var ctr_inv = 0;
	        var inv_line_disc = '';

	        
	        $.each(_invline, function(key, val)
	        {
	        	ctr_inv++;
	        	var total_qty = val['unit_qty'] * val['invline_qty'];
	        	unit_measurement_view(total_qty, val['invline_item_id'], val['invline_um'], function(um_view)
	        	{
	        		var inv_line_disc_val = val['invline_discount'];
	   				var inv_line_disc = inv_line_disc_val;

	        		if(val['invline_discount_type'] == 'percent')
	        		{
		        		if (inv_line_disc_val.indexOf('/') >= 0)
						{
							var split_inv_line_disc_val = inv_line_disc_val.split('/');
							var main_rate      = val['invline_rate'] * val['invline_qty'];

							$.each(split_inv_line_disc_val, function(index, val) 
							{
								console.log(val + " - inv_line_disc_val");

								if(val.indexOf('%') >= 0)
								{
									console.log(parseFloat(main_rate) + " - " + ((100-parseFloat(val.replace("%", ""))) / 100));
									main_rate = parseFloat(main_rate) * ((100-parseFloat(val.replace("%", ""))) / 100);
									console.log(main_rate);
								}
								else if(val == "" || val == null)	
								{
									main_rate -= 0;
								}
								else
								{
									main_rate -= parseFloat(val);
								}
							});

							inv_line_disc_val = action_return_to_number((val['invline_rate'] * val['invline_qty']) - main_rate).toFixed(2);
						}
	        		}
	        		else
	        		{
	        			inv_line_disc = action_return_to_number(val['invline_discount']).toFixed(2);
	        			inv_line_disc_val = inv_line_disc;
	        		}

		        	tr = '<tr>' +
						  '<td>'+val['item_name']+'</td>'+
						  '<td class="text-center">'+um_view+'</td>' +
						  '<td style="text-align: right;">'+(val['invline_rate']).toFixed(2)+'</td>' +
						  '<td style="text-align: right;">'+inv_line_disc +'</td>' +
						  '<td style="text-align: right;">'+inv_line_disc_val +'</td>' +
						  '<td style="text-align: right;">'+(val['invline_amount']).toFixed(2)+'</td>' +
						'</tr>';
					if(inv['inv_is_paid'] == 1 && ctr_inv == _invline.length)
					{
						tr += '<div class="watermark">PAID</div>';
					}

					$('.inv-itemline').prepend(tr);
	        	});
	        	if(val['taxable'] == 1)
	        	{
	        		taxable_amount += roundNumber(val['invline_amount']);
	        	}
	        });

			tr_total += '<tr>' +
				  '<td colspan="4"></td>' +
				  '<td  style="text-align: left;font-weight: bold">SUBTOTAL</td>' + 
			 	  '<td style="text-align: right; font-weight: bold">'+(inv['inv_subtotal_price']).toFixed(2)+'</td>' +
				  '</tr>';

			if(inv['ewt'] != 0)
			{
				tr_total += '<tr>' + 
							'<td colspan="4"></td>' + 
							'<td style="text-align: left;font-weight: bold">EWT ('+ (inv['ewt'] * 100) +' %)</td>'+
							'<td style="text-align: right; font-weight: bold">'+ (inv['ewt'] * inv['inv_subtotal_price'])+'</td>'+
							'</tr>';
			}
			var sign_disc = '';
			var disc_val = inv['inv_discount_value'];
			if(inv['inv_discount_value'] != 0)
			{
				if(inv['inv_discount_type'] == 'percent')
				{
					sign_disc = '%'; 
					disc_val = inv['inv_discount_value']/100 * inv['inv_subtotal_price'];
				}

				tr_total += '<tr>' + 
							'<td colspan="4"></td>' +
							'<td  style="text-align: left;font-weight: bold">Discount '+ sign_disc+'</td>'+
							'<td style="text-align: right; font-weight: bold">'+(disc_val).toFixed(2)+'</td>'+
							'</tr>';
			}
			if(inv['taxable'] != 0)
			{
				tr_total += '<tr>' + 
							'<td colspan="2" ></td>' +
							'<td style="text-align: left;font-weight: bold">Vat (12%)</td>'+
							'<td style="text-align: right; font-weight: bold">'+(taxable_amount * (12/100)).toFixed(2)+'</td>' +
							'</tr>';
			}
			tr_total += '<tr class="">'+
						'<td colspan="4"></td>' + 
						'<td style="text-align: left;font-weight: bold">INVOICE TOTAL</td>'+
						'<td style="text-align: right; font-weight: bold">'+(inv['inv_overall_price']).toFixed(2)+'</td>'+
						'</tr>';

	        $('.inv-itemline').append(tr_total);

	        var cm_item_row = "";
	        var cm_amount = 0;
			if(_cmline.length > 0)
			{
				cm_item_row += '<tr>' + 
							'<td colspan="4">' + 
							'<strong>RETURNS</strong>' +
							'</td>' +
							'</tr>';

		        $('.inv-itemline').append(cm_item_row);		
				var ctr = 0;
				$.each(_cmline, function(key, val)
				{
					cm_amount += val['cmline_amount']; 
					var qty = (val['cmline_qty'] * val['unit_qty']);
					unit_measurement_view(qty, val['cmline_item_id'], val['cmline_um'], function(um_view)
					{
						ctr++;
						var cm_item_row_line = '<tr>' + 
										       '<td>'+ val['item_name'] +'</td>'+
										       '<td style="text-align: center;">'+um_view+'</td>' +
										       '<td style="text-align: center;">'+ (val['cmline_rate']).toFixed(2)+'</td>' +
										       '<td></td>'+
										       '<td></td>'+
										       '<td style="text-align: right;">'+ (val['cmline_amount']).toFixed(2)+'</td>' +
											   '</tr>';

						$('.inv-itemline').append(cm_item_row_line);
						if(ctr == _cmline.length)
						{
							var cm_item_row_2 = '<tr>' +
										   '<td colspan="4"></td>' +
										   '<td style="text-align: left;font-weight: bold">RETURNS SUBTOTAL</td>' +
									       '<td style="text-align: right; font-weight: bold">'+(cm_amount).toFixed(2)+'</td>'+
										   '</tr>';					
		        			$('.inv-itemline').append(cm_item_row_2);		
						}
					});
				});
			}
			get_sales_person(function(agent_name)
			{
				$('.sales-person').html(agent_name);
			});
			$('.inv-overall-total').html("<strong>TOTAL</strong>  PHP" + number_format(inv['inv_overall_price'] - cm_amount));
	    });
	}
}