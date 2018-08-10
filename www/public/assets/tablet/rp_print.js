var rp_print = new rp_print();
function rp_print()
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
		get_session('rp_id_print', function(rp_id)
		{
			if(rp_id)
			{
				load_data(rp_id);
			}
			else
			{
				alert("Something wen't wrong, Please try again!");
			}
		});
	}
	function load_data(rp_id)
	{
		get_paid_rp_data(rp_id, function(rp, _rpline)
		{
			get_applied_credits(rp_id, function(rp_applied)
			{
		        $('.rp-customer-name').html(rp['company'] == "" ? rp['first_name'] + " " + rp['middle_name']+ " " + rp['last_name'] : rp['company']);
		        $('.rp-id-print').html(rp['rp_id']);
		        $('.rp-date').html(rp['rp_date']);
		        // $refno = rp['payment_name'] == 'Cheque' ? "("+rp['rp_payment_ref_no']+")";
		        $('.payment-type').html(rp['payment_name']);

		        $total_cash = 0;
		        $total_applied = 0;

		        var tr_row = "";
		        $.each(_rpline, function(key, val)
		        {
		        	tr_row += '<tr>'+
		        			  '<td>Credit Sales # '+val['new_inv_id']+' ('+val['inv_date']+')</td>' +
		        			  '<td class="text-right">'+ (number_format(val['inv_overall_price'])) +'</td>' +
		        			  '<td class="text-right">'+ (number_format(val['rpline_amount'] - val['cm_amount'] )) +'</td>' +
		        			  '<td class="text-right">'+ (number_format(val['cm_amount'] != null ? val['cm_amount'] : 0)) +'</td>' +
		        			  '<td class="text-right">'+ (number_format(val['rpline_amount'] )) +'</td>' +
		        			  '</tr>';
		        	$total_cash += val['rpline_amount'];
		        });
		        var tr_rowapplied = "";
		        if(count(rp_applied) > 0)
		        {
			        $.each(rp_applied, function(keya, valapp)
			        {
			        	tr_rowapplied += '<tr>'+
			        			  '<td>Credit Memo # '+valapp['credit_reference_id']+'</td>' +
			        			  '<td class="text-right">'+ (number_format(valapp['credit_amount'])) +'</td>' +
			        			  '</tr>';
			        	$total_applied += valapp['credit_amount'];
			        });
		        }
		        else
		        {
		        	tr_rowapplied += '<tr>'+
			        			  '<td colspan="2" class="text-center">No Credit applied</td>' +
			        			  '</tr>';
		        }

		        $('.rp-itemline').prepend(tr_row);
		        $('.rp-applied').prepend(tr_rowapplied);

		        $('.rp-cash-total').html('<strong>CASH PAYMENT TOTAL : </strong>'+ (number_format($total_cash)));
		        $('.rp-applied-total').html('<strong>APPLIED CREDIT TOTAL : </strong>'+ (number_format($total_applied)));
		        $('.rp-overall-total').html('<strong style="color:green">TOTAL : </strong>'+ (number_format($total_cash - $total_applied)));

				get_sales_person(function(agent_name)
				{
					$('.sales-person').html(agent_name);
				});
			});
		});
	}
}