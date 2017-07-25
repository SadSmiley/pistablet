var ajaxReq;
function Breakdown($amount_payable)
{
	this.$amount_payable = $amount_payable;
}

Breakdown.prototype.compute = function()
{
	if(ajaxReq)
	{
		ajaxReq.abort();
	}

	ajaxReq = $.ajax(
	{
		url: 'member/e-payment/break_down?transaction_code=' + transactCode,
		type: 'GET',
		dataType: 'html',
		data: {json : this.$amount_payable},
	})
	ajaxReq.done(function(html) {

		$('#transaction-b-down').html(html);
	})
	ajaxReq.fail(function() {
		console.log("error");
	})
	ajaxReq.always(function() {
		console.log("complete");
	});
}


$(document).ready(function() 
{	
	var bd = new Breakdown($('[name="param[amount]"]').val());
	bd.compute();

	$('[true-type="money"]').on('keyup', function()
	{
		var money_array = [];
		$('[true-type="money"]').each(function(index, el)
		{

			money_array.push('"'+$(el).attr('true-name') + '" : "'+$(el).val()+'"');
		});
		var $money_array_json_string = '{'+ money_array.join() + '}';


		var bd = new Breakdown($money_array_json_string);
		bd.compute();

		



		
	});	


});