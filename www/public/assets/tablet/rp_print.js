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
	    	console.log(rp);
	    	console.log(_rpline);

	        $('.rp-customer-name').html(rp['company'] == "" ? rp['first_name'] + " " + rp['middle_name']+ " " + rp['last_name'] : rp['company']);
	        $('.rp-id-print').html(rp['rp_id']);
	        $('.rp-date').html(rp['rp_date']);

	        var tr_row = "";
	        $.each(_rpline, function(key, val)
	        {
	        	tr_row += '<tr>'+
	        			  '<td>Credit Sales # '+val['new_inv_id']+' ('+val['inv_date']+')</td>' +
	        			  '<td class="text-center">'+ (number_format(val['rpline_amount'])) +'</td>' +
	        			  '</tr>';
	        });

	        $('.rp-itemline').prepend(tr_row);
	        $('.rp-overall-total').html('<strong>TOTAL : </stron>'+ (number_format(rp['rp_total_amount'])));

			get_sales_person(function(agent_name)
			{
				$('.sales-person').html(agent_name);
			});
		});
	}
}