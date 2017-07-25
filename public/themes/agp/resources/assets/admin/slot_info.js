

$(document).ready(function()
{
	$('.remodal-confirm').prop('disabled',false);
	var AddWallet = $('[data-remodal-id=add]').remodal();
	$('.show-add-form').on('click', function(event)
	{
		event.preventDefault();
		AddWallet.open();
	});

	var DeductWallet = $('[data-remodal-id=deduct]').remodal();
	$('.show-deduct-form').on('click', function(event)
	{
		event.preventDefault();
		DeductWallet.open();
	});

	var change_info = $('[data-remodal-id=change_info]').remodal();
	$('.change_info').on('click', function(event)
	{
           slot_id =$(this).attr('slot_id');

            $(".update-slot-form").load('admin/maintenance/slots/info_edit_form?&slot_id=' + slot_id, function()
            {
				event.preventDefault();
				change_info.open();
            });
	});

	var AddBinary = $('[data-remodal-id=add_b]').remodal();
	$('.show-add-b-form').on('click', function(event)
	{
		if($('.send_log_add').val() == 'No')
		{
			$('.reason').hide();
			$('.send_reason_add').prop('disabled',true);
		}
		else if($('.send_log_add').val() == 'Yes')
		{
			$('.reason').show();
			$('.send_reason_add').prop('disabled',false);
		}
		event.preventDefault();
		AddBinary.open();
	});

	var DeductBinary = $('[data-remodal-id=deduct_b]').remodal();
	$('.show-deduct-b-form').on('click', function(event)
	{
		if($('.send_log_deduct').val() == 'No')
		{
			$('.reason').hide();
			$('.send_reason_deduct').prop('disabled',true);
		}
		else if($('.send_log_deduct').val() == 'Yes')
		{
			$('.reason').show();
			$('.send_reason_deduct').prop('disabled',false);
		}
		event.preventDefault();
		DeductBinary.open();
	});

	$('.submit-amount').on('click', function(event) {
		event.preventDefault();
		$(this).closest('form').submit();
	
	});

	$('.remodal-confirm').click(function(){
		$('.remodal-confirm').prop('disabled',true);
	});

	$('.send_log_add').change(function(){
		if($('.send_log_add').val() == 'No')
		{
			$('.reason').hide();
			$('.send_reason_add').prop('disabled',true);
		}
		else if($('.send_log_add').val() == 'Yes')
		{
			$('.reason').show();
			$('.send_reason_add').prop('disabled',false);
		}
	});

	$('.send_log_deduct').change(function(){
		if($('.send_log_deduct').val() == 'No')
		{
			$('.reason').hide();
			$('.send_reason_deduct').prop('disabled',true);
		}
		else if($('.send_log_deduct').val() == 'Yes')
		{
			$('.reason').show();
			$('.send_reason_deduct').prop('disabled',false);
		}
	});

	$('[data-remodal-id=modal] input[name=slot_wallet]' ).on('keypress' , function(event){
		if (event.which == 13)
		{
			$('.submit-amount').trigger('click');
		}
	})



});