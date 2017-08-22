var chart_account = new chart_account();

function chart_account()
{
	init()
	function init()
	{
		document_ready();
	}
	
	function document_ready()
	{
		event_click_edit_account();
		event_checkbox_sub_account_change();
		event_combobox_account_type_change();
		
		trigger_put_account_desciption();
	}
	
	function event_click_edit_account()
	{
		$(".btn-edit-account").click( function()
		{
			trigger_check_account_type($("#account_type"));
		})
	}
	
	function event_checkbox_sub_account_change()
	{
		console.log("111");
		$(document).on("change",'#is_sub_account', function()
		{
			trigger_check_sub_account();
		})
	}
	
	function event_combobox_account_type_change()
	{
		$(document).on("change","#account_type", function()
		{
			trigger_check_account_type();
			trigger_filter_sub_account();
			trigger_put_account_desciption();
			
		})
	}
}

function trigger_filter_sub_account()
{
	$(".sub-account").removeClass("hide");
	$account_type = $("#account_type option:selected").val();
	
	$.each($(".sub-account"), function(key, data)
	{
		if($(data).attr("sub-type-id") != $account_type)
		{
			$(data).addClass("hide");
		}
	});
}

function trigger_check_account_type()
{
	if($("#account_type").find('option:selected').attr("has-balance") == 1)
	{
		$(".balance-container").fadeIn();
		$("#account_open_balance").removeAttr("disabled");
		$("#account_open_balance_date").removeAttr("disabled");
	}
	else
	{
		$(".balance-container").fadeOut();
		$("#account_open_balance").attr("disabled","disabled");
		$("#account_open_balance_date").attr("disabled","disabled");
	}
}

function trigger_check_sub_account()
{
	if($('#is_sub_account').is(':checked'))
	{
		$("#account_parent_id").removeAttr('disabled');
	}
	else
	{
		$("#account_parent_id").attr("disabled","disabled");
	}
}

function trigger_put_account_desciption()
{
	$("#account_type_description").html($("#account_type option:selected").attr("data-desc"));
}

function loading_done()
{
	trigger_check_account_type();
	trigger_check_sub_account();
	trigger_filter_sub_account();
	trigger_load_datepicker();
}

function trigger_load_datepicker()
{
	$("#account_open_balance_date").datepicker();
}

