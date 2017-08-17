var cm_print = new cm_print();
function cm_print()
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
		get_session('cm_id_print', function(cm_id)
		{
			if(cm_id)
			{
				load_data(cm_id);
			}
			else
			{
				alert("Something wen't wrong, Please try again!");
			}
		});
	}
	function load_data(cm_id)
	{
		get_cm_data(cm_id, function(cm, _cmline)
		{
	    	console.log(cm);
	    	console.log(_cmline);

	        $('.cm-customer-name').html(cm['company'] == "" ? cm['first_name'] + " " + cm['middle_name']+ " " + cm['last_name'] : cm['company']);
	        $('.cm-id-print').html(cm['cm_id']);
	        $('.cm-date').html(cm['created_date']);
	        var cm_item_row = "";
	        $.each(_cmline, function(key, val)
			{
				var qty = (val['cmline_qty'] * val['unit_qty']);
				unit_measurement_view(qty, val['cmline_item_id'], val['cmline_um'], function(um_view)
				{
					cm_item_row += '<tr>' + 
							       '<td>'+ val['item_name'] +'</td>'+
							       '<td style="text-align: center;">'+um_view+'</td>' +
							       '<td style="text-align: center;">'+ (val['cmline_rate']).toFixed(2)+'</td>' +
							       '<td style="text-align: center;">'+ (val['cmline_amount']).toFixed(2)+'</td>' +
								   '</tr>';

	        		$('.cm-itemline').prepend(cm_item_row);
				});
			});
	        var total_cm = "";
			total_cm += '<tr>' +
						   '<td colspan="2"></td>' +
						   '<td style="text-align: left;font-weight: bold">RETURNS SUBTOTAL</td>' +
					       '<td style="text-align: right; font-weight: bold">'+((cm['cm_amount']).toFixed(2))+'</td>'+
						   '</tr>';

	        $('.cm-itemline').append(total_cm);

			get_sales_person(function(agent_name)
			{
				$('.sales-person').html(agent_name);
			});
		});
	}
}