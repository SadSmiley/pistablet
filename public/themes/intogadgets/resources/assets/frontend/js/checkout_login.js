var checkout_login = new checkout_login();

function checkout_login()
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
		event_radio_continue();
	}
	function event_radio_continue()
	{
		$('.radio-continue').unbind("change");
		$('.radio-continue').bind("change", function(e)
		{
			action_radio_continue(e.currentTarget);
		});

		action_radio_continue($('.radio-continue:checked'));
	}
	function action_radio_continue(x)
	{
		var yes 	 = $(x).attr("yes");
		var email    = $('.the-email');
		var password = $('.the-password');
		var form     = $('.form-login');

		if (yes == 1) 
		{
			action_continue_yes(yes, email, password, form);
		}
		else
		{
			action_continue_no(yes, email, password, form);
		}
	}
	function action_continue_yes(yes, email, password, form)
	{
		form.attr('action', '/checkout');
		form.attr('method', 'get');
		form.removeClass('global-submit');

		email.removeProp("disabled");
		email.removeAttr("disabled");

		password.prop("disabled", true);
		password.attr("disabled", "disabled");
	}
	function action_continue_no(yes, email, password, form)
	{
		form.attr('action', '/account/login');
		form.attr('method', 'post');
		form.addClass('global-submit');

		email.removeProp("disabled");
		email.removeAttr("disabled");
		
		password.removeProp("disabled");
		password.removeAttr("disabled");
	}
}