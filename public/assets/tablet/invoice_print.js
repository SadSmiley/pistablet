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
	function load_data(inv_id)
	{
		get_invoice_data(inv_id, function(inv, _invline, _cmline)
	    {
	    	console.log(inv);
	    	console.log(_invline);
	    	console.log(_cmline);

	        $('.inv-id-print').html(inv['inv_id']);
	        $('.inv-customer-name').html(inv['company'] == "" ? inv['first_name'] + " " + inv['middle_name']+ " " + inv['last_name'] : inv['company']);
	        $('.inv-date').html(inv['inv_date']);
	        $('.inv-due-date').html(inv['inv_due_date']);
	        $('.inv-terms').html(inv['terms_name']);

	        var tr = "";
	        var tr_total = "";
	        var taxable_amount = 0;
	        var ctr_inv = 0;
	        $.each(_invline, function(key, val)
	        {
	        	ctr_inv++;
	        	var total_qty = val['unit_qty'] * val['invline_qty'];
	        	unit_measurement_view(total_qty, val['invline_item_id'], val['invline_um'], function(um_view)
	        	{
		        	tr += '<tr>' +
						  '<td>'+val['item_name']+'</td>'+
						  '<td class="text-center">'+um_view+'</td>' +
						  '<td style="text-align: center;">'+(val['invline_rate']).toFixed(2)+'</td>' +
						  '<td style="text-align: center;">'+(val['invline_amount']).toFixed(2)+'</td>' +
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
				  '<td colspan="2"></td>' +
				  '<td  style="text-align: left;font-weight: bold">SUBTOTAL</td>' + 
			 	  '<td style="text-align: right; font-weight: bold">'+(inv['inv_subtotal_price']).toFixed(2)+'</td>' +
				  '</tr>';

			if(inv['ewt'] != 0)
			{
				tr_total += '<tr>' + 
							'<td colspan="2"></td>' + 
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
							'<td colspan="2"></td>' +
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
						'<td colspan="2"></td>' + 
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
				var ctr = 0;
				$.each(_cmline, function(key, val)
				{
					ctr++;
					cm_amount += val['cmline_amount']; 
					var qty = (val['cmline_qty'] * val['unit_qty']);
					unit_measurement_view(qty, val['cmline_item_id'], val['cmline_um'], function(um_view)
					{
						cm_item_row += '<tr>' + 
								       '<td>'+ val['item_name'] +'</td>'+
								       '<td style="text-align: center;">'+um_view+'</td>' +
								       '<td style="text-align: center;">'+ (val['cmline_rate']).toFixed(2)+'</td>' +
								       '<td style="text-align: center;">'+ (val['cmline_amount']).toFixed(2)+'</td>' +
									   '</tr>';

						if(ctr == _cmline.length)
						{
							cm_item_row += '<tr>' +
										   '<td colspan="2"></td>' +
										   '<td style="text-align: left;font-weight: bold">RETURNS SUBTOTAL</td>' +
									       '<td style="text-align: right; font-weight: bold">'+(cm_amount).toFixed(2)+'</td>'+
										   '</tr>';							
						}
		        		$('.inv-itemline').append(cm_item_row);
					});
				});
			}
			$('.inv-overall-total').html("<strong>TOTAL</strong>  PHP" +(inv['inv_overall_price'] - cm_amount).toFixed(2));
	    });
	}
}

function print_function()
{
    // $('.print-btn').addClass('hidden');

    var type = "text/html";
    var title = "test.html";
    var fileContent = "<html>Phonegap Print Plugin</html>";
    window.plugins.PrintPlugin.print(fileContent,function(){console.log('success')},function(){console.log('fail')},"",type,title);
}