function points(_form)
{
	this._form = _form;
}

points.prototype.reload = function()
{
	var $points = this;


	$points.reload_show_loading();

	$.ajax({
		url: 'admin/transaction/points/reload',
		type: 'post',
		dataType: 'json',
		data: this._form,
	})
	.done(function(data) {

		var $append = "";


		if(data['errors']===null)
		{

			$append = '<p class="alert alert-success col-sm-offset-3">' + data['message'] + '<p>';
			$points.reload_clear_field();
			$accountTable.draw();
		}
		else
		{
			data['errors'].forEach(function(element, index)
			{
				$append +=  '<li>' + element + '</li>';
			});

			$append = '<ul class="alert alert-danger col-sm-offset-3">' + $append + '</div>';
			
		}

		$points.reload_show_message($append);
		$points.reload_stop_loading();

	})
	.fail(function() {

		alert('Error on loading.');

	})
	.always(function() {

	});
};

points.prototype.reload_show_loading = function()
{
	$('.loader').fadeIn();
	$('[data-remodal-id=reload-pts] button').attr('disabled', true);
	$('#reload-pts-container').addClass('load_opacity');
}


points.prototype.reload_stop_loading = function()
{
	$('.loader').fadeOut();
	$('[data-remodal-id=reload-pts] button').attr('disabled', false);
	$('#reload-pts-container').removeClass('load_opacity');

}


points.prototype.reload_clear_field = function()
{
	$('[data-remodal-id=reload-pts] input[name=account_id]').val("");
	$('[data-remodal-id=reload-pts] input[name=amount]').val("");
}

points.prototype.reload_show_message = function($message)
{
	$('#reload-message').hide();
	$('#reload-message').html('');
	$('#reload-message').html($message);
	$('#reload-message').fadeIn();

}

points.prototype.reload_reset_form = function()
{
	$points = this;
	$points.reload_clear_field();
	$('#reload-message').hide();
	$('#reload-message').html('');

}

points.prototype.adjust = function()
{
	var $points = this;
	$points.adjust_show_loading();

	$.ajax({
		url: 'admin/transaction/points/adjust',
		type: 'post',
		dataType: 'json',
		data: this._form
	})
	.done(function(data) {
		var $append = "";

		if(data['errors']===null)
		{

			$append = '<p class="alert alert-success col-sm-offset-3">' + data['message'] + '<p>';
			$points.adjust_clear_field();
			$accountTable.draw();
		}
		else
		{
			data['errors'].forEach(function(element, index)
			{
				$append +=  '<li>' + element + '</li>';
			});

			$append = '<ul class="alert alert-danger col-sm-offset-3">' + $append + '</div>';
			
		}

		$points.adjust_show_message($append);
		$points.adjust_stop_loading();

	})
	.fail(function() {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");
	});
	
}


points.prototype.adjust_show_loading = function()
{
	$('.loader').fadeIn();
	$('[data-remodal-id=adjust-pts] button').attr('disabled', true);
	$('#adjust-pts-container').addClass('load_opacity');
}

points.prototype.adjust_clear_field = function()
{
	$('[data-remodal-id=adjust-pts] input[name=account_id]').val("");
	$('[data-remodal-id=adjust-pts] input[name=amount]').val("");
}

points.prototype.adjust_show_message = function($message)
{
	$('#adjust-message').hide();
	$('#adjust-message').html('');
	$('#adjust-message').html($message);
	$('#adjust-message').fadeIn();

}

points.prototype.adjust_stop_loading = function()
{
	$('.loader').fadeOut();
	$('[data-remodal-id=adjust-pts] button').attr('disabled', false);
	$('#adjust-pts-container').removeClass('load_opacity');

}


points.prototype.adjust_reset_form = function()
{
	$points = this;
	$points.adjust_clear_field();
	$('#adjust-message').hide();
	$('#adjust-message').html('');

}






$(document).ready(function()
{
	var reloadRemodal = $('[data-remodal-id=reload-pts]').remodal();
	var adjustRemodal = $('[data-remodal-id=adjust-pts]').remodal();


	//adjust
	$( "#table tbody" ).on( "click", "tr .adjust-e-wallet", function(event)
	{


		event.preventDefault();

		var pt = new points();
		pt.adjust_reset_form();
		var account_id = $(this).attr('account-id');
		var e_wallet = $(this).attr('e-wallet');
		var e_pts_earning = $(this).attr('e-pts-earning');
		$('[data-remodal-id=adjust-pts] select option:eq(0)').attr('pts', e_wallet);
		$('[data-remodal-id=adjust-pts] select option:eq(1)').attr('pts', e_pts_earning);
		$('[data-remodal-id=adjust-pts] select').trigger('change');
		$('[data-remodal-id=adjust-pts] input[name=account_id]').val(account_id);

		adjustRemodal.open();
	});

	$('[data-remodal-id=adjust-pts] select').on('change', function()
	{
		var pts = $("[data-remodal-id=adjust-pts] select option:selected").attr('pts');
		$('[data-remodal-id=adjust-pts] input[name=amount]').val(pts);
	});


	$('#submit-adjust').on('click', function(event)
	{
		event.preventDefault();
		var form = $(this).closest('form').serialize();
		var pt = new points(form);
		pt.adjust();
	});


	//reload
	$( "#table tbody" ).on( "click", "tr .reload-e-wallet", function(event)
	{
		var pt = new points();
		pt.reload_reset_form();
		event.preventDefault();
		var account_id = $(this).attr('account-id');
		$('[data-remodal-id=reload-pts] input[name=account_id]').val(account_id);
		reloadRemodal.open();
	});


	$('#submit-reload').on('click', function(event)
	{
		event.preventDefault();
		var form = $(this).closest('form').serialize();
		var pt = new points(form);
		pt.reload();
		
	});





});