function Breakdown($amount)
{
	this.$amount = $amount;
}

Breakdown.prototype.compute = function()
{
		$.ajax({
			url: 'member/e-payment/break_down',
			type: 'GET',
			dataType: 'html',
			data: {amount: this.$amount},
		})
		.done(function(html) {

			$('#transaction-b-down').html(html);
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
}


$(document).ready(function() 
{	
	var bd = new Breakdown($('[name="param[amount]"]').val());
	bd.compute();

	$('[name="param[amount]"]').on('keyup', function()
	{

		var amount = $(this).val();
		var bd = new Breakdown(amount);
		bd.compute();
		
	});	


});