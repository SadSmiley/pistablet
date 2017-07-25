
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
	var sendToEmailRemodal = $('[data-remodal-id=send-to-email]').remodal();
	$( "#datatable tbody" ).on( "click", "tr .view-details", function() {
		var $agentRefNo = $(this).attr('agentRefNo');
		showDetailRemodal.open();
		var $transaction = new transaction();
		$transaction.show_details($agentRefNo);
	});


	$( "#datatable tbody" ).on( "click", "tr .send-to-email", function()
	{
		var $agentRefNo = $(this).attr('agentRefNo');
		$('[data-remodal-id="send-to-email"] input[name=agentRefNo]').val($agentRefNo);
		$('.email-success').hide();
		$('.email-errors').hide()
		$('.email-success').html('');
		$('.email-errors').html('');
		$('[data-remodal-id="send-to-email"] input[name=email]').val('');
		$('[data-remodal-id="send-to-email"] input[name=email]').focus();
		sendToEmailRemodal.open();

	});


	$('#send-email').on('click',function(event)
	{	
		event.preventDefault();
		$('#form-send-tp-email').addClass('load_opacity');
		$('.loader').fadeIn();
		$('.email-success').hide();
		$('.email-errors').hide()
		$('.email-success').html('');
		$('.email-errors').html('')
		$('[data-remodal-id="send-to-email"] button').attr('disabled', true);

		var form = $('[data-remodal-id="send-to-email"] form').serialize();
		$.ajax({
			url: 'member/e-payment/transaction-log/show_details',
			type: 'get',
			dataType: 'json',
			data: form
		})
		.done(function(data) {
			setTimeout(function(){
				if(data['errors']===null)
				{
					$('.email-success').html("Email sent to " + data['to']);
					$('.email-success').fadeIn();

				}
				else
				{
					
					$('.email-errors').html(data['errors']);
					$('.email-errors').fadeIn();
				}
				$('.loader').fadeOut();
				$('#form-send-tp-email').removeClass('load_opacity');
				$('[data-remodal-id="send-to-email"] button').attr('disabled', false);
			},
			1000);


		})
		.fail(function() {
			// console.log("error");
			alert('Error on sending e-mail.');

		})
		.always(function()
		{
			// console.log("complete");
		});
		

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