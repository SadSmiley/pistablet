$(document).ready(function()
{
	lightbox.option(
	{
      'resizeDuration': 200,
      'wrapAround': true
    })

	/*REJECT*/
    var rejectModal = $('[data-remodal-id=reject-modal]').remodal();
    var verifyModal = $('[data-remodal-id=verify-modal]').remodal();
    var unverifyModal = $('[data-remodal-id=unverify-modal]').remodal();

    $( "#datatable tbody" ).on( "click", "tr .reject-btn", function()
    {

    	rejectModal.open();
    	var id = $(this).attr('account-id');
    	$('.submit-reject-btn').attr('account-id', id);
    	$('.confirm-msg').show();
    	$('[data-remodal-action=cancel]').show();
		$('.msgs').empty();
		$('.errs').empty();
    	
	});


	$('.submit-reject-btn').on('click', function()
	{

		if($('.confirm-msg').css('display') == 'none')
		{
			rejectModal.close();
			return true;
		}

		$('.modal-btn').attr('disabled', true);
		$('.loader-container').addClass('load_opacity');
		$('.loader').fadeIn();
		$('.confirm-msg').show();
		$('.msgs').empty();
		$('.errs').empty();
		var id = $(this).attr('account-id');
		$.ajax({
			url: 'admin/utilities/verification/reject',
			type: 'POST',
			dataType: 'json',
			data: {id: id},
		})
		.done(function(data) {
			if(data.errors)
			{
				$('.errs').html("*" + data.errors);
			}
			else
			{
				$('.msgs').html("*Account ID #" + data.account.account_id + " was successfully rejected.");
				$('[data-remodal-action=cancel]').fadeOut();
			}
			$Table.draw();
			$('.confirm-msg').hide();
			$('.modal-btn').attr('disabled', false);
			$('.loader-container').removeClass('load_opacity');
			$('.loader').fadeOut();
		})
		.fail(function() {
			// console.log("error");
			alert("Unknown error has occur while rejecting the verification.");
		})
		.always(function() {
			console.log("complete");
		});
	
	});
	/*REJECT END*/

	/*VERIFY*/
	$( "#datatable tbody" ).on( "click", "tr .verify-btn", function()
    {

    	verifyModal.open();
    	var id = $(this).attr('account-id');
    	$('.submit-verify-btn').attr('account-id', id);
    	$('.confirm-msg').show();
		$('.msgs').empty();
		$('.errs').empty();
		$('[data-remodal-action=cancel]').show();
    	
	});



	$('.submit-verify-btn').on('click', function()
	{

		if($('.confirm-msg').css('display') == 'none')
		{
			verifyModal.close();
			return true;
		}

		$('.modal-btn').attr('disabled', true);
		$('.loader-container').addClass('load_opacity');
		$('.loader').fadeIn();
		$('.confirm-msg').show();
		$('.msgs').empty();
		$('.errs').empty();
		var id = $(this).attr('account-id');
		$.ajax({
			url: 'admin/utilities/verification/verify',
			type: 'POST',
			dataType: 'json',
			data: {id: id},
		})
		.done(function(data) {
			if(data.errors)
			{
				$('.errs').html("*" + data.errors);
			}
			else
			{
				$('.msgs').html("*Account ID #" + data.account.account_id + " was successfully verified.");
				$('[data-remodal-action=cancel]').fadeOut();
			}
			$Table.draw();
			$('.confirm-msg').hide();
			$('.modal-btn').attr('disabled', false);
			$('.loader-container').removeClass('load_opacity');
			$('.loader').fadeOut();
		})
		.fail(function() {
			// console.log("error");
			alert("Unknown error has occur while verifying the verification.");
		})
		.always(function() {
			console.log("complete");
		});
	
	});
	/*VERIFY END*/

	$( "#datatable tbody" ).on( "click", "tr .unverify-btn", function()
    {

    	unverifyModal.open();
    	var id = $(this).attr('account-id');
    	$('.submit-unverify-btn').attr('account-id', id);
    	$('.confirm-msg').show();
    	$('[data-remodal-action=cancel]').show();
		$('.msgs').empty();
		$('.errs').empty();
    	
	});


	$('.submit-unverify-btn').on('click', function()
	{

		if($('.confirm-msg').css('display') == 'none')
		{
			unverifyModal.close();
			return true;
		}

		$('.modal-btn').attr('disabled', true);
		$('.loader-container').addClass('load_opacity');
		$('.loader').fadeIn();
		$('.confirm-msg').show();
		$('.msgs').empty();
		$('.errs').empty();
		var id = $(this).attr('account-id');
		$.ajax({
			url: 'admin/utilities/verification/unverify',
			type: 'POST',
			dataType: 'json',
			data: {id: id},
		})
		.done(function(data) {
			if(data.errors)
			{
				$('.errs').html("*" + data.errors);
			}
			else
			{
				$('.msgs').html("*Account ID #" + data.account.account_id + " was successfully unverified.");
				$('[data-remodal-action=cancel]').fadeOut();
			}
			$Table.draw();
			$('.confirm-msg').hide();
			$('.modal-btn').attr('disabled', false);
			$('.loader-container').removeClass('load_opacity');
			$('.loader').fadeOut();
		})
		.fail(function() {
			// console.log("error");
			alert("Unknown error has occur while unverifying the verification.");
		})
		.always(function() {
			console.log("complete");
		});
	
	});




	

});