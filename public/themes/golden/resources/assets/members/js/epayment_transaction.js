
function transaction()
{

}


transaction.prototype.show_details = function($agentRefNo)
{
	this.$agentRefNo = $agentRefNo;
	$.ajax({
		url: 'member/e-payment/transaction-log/show_details',
		type: 'GET',
		dataType: 'html',
		data: {agentRefNo: $agentRefNo},
	})
	.done(function(html){
		$('#show-details-div').html(html);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	


}

transaction.prototype.compute_e_wallet = function($amount)
{
	this.$amount = $amount;
	$('#point-conversion-table').addClass('load_opacity');
	$('.loader').fadeIn();
	$.ajax({
		url: 'member/e-payment/transaction-log/e-wallet-to-currency',
		type: 'GET',
		dataType: 'html',
		data: {amount: $amount},
	})
	.done(function(html) {


		// setTimeout(function()
		// {
			$('.loader').fadeOut();
			$('#point-conversion-table').html(html);
			$('#point-conversion-table').removeClass('load_opacity');
		// }, 1000);
		
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
	$('#slot-wallet-amount').attr('disabled', false);
	$(this).attr('disabled', false);

	var showDetailRemodal = $('[data-remodal-id=showDetails]').remodal();
	var showReloadRemodal = $('[data-remodal-id=reload-e-wallet-modal]').remodal();
	$( "#datatable tbody" ).on( "click", "tr .view-details", function() {
		var $agentRefNo = $(this).attr('agentRefNo');
		showDetailRemodal.open();
		var $transaction = new transaction();
		$transaction.show_details($agentRefNo);
	});

	$('.reload-wallet-show').on('click', function()
	{
		showReloadRemodal.open();
	});


	$('#slot-wallet-amount').on('keyup', function(event){

		var $amount= $(this).val();
		var $transaction = new transaction();
		$transaction.compute_e_wallet($amount);
	});


	$(document).on('opening', '[data-remodal-id=reload-e-wallet-modal]', function ()
	{
		var $amount = $('#slot-wallet-amount').val();
		var $transaction = new transaction();
		$transaction.compute_e_wallet($amount);
	});


	$(document).on('closed', '[data-remodal-id=reload-e-wallet-modal]', function ()
	{
		var $amount= 0;
		var $transaction = new transaction();
		$transaction.compute_e_wallet($amount);
	});


	$('#submit-reload-form').on('click' , function(event)
	{
		event.preventDefault();
		var r = confirm("Are you sure?");
		var $amount = parseFloat($('#slot-wallet-amount').val());
		if (r == true)
		{	
			
			if(isNaN($amount))
			{
				alert('Invalid amount.');
				$('#slot-wallet-amount').focus();
			}
			else
			{	
				showReloadRemodal.close()
				$('#reload-form').submit();		
		    }

		}
	})


});