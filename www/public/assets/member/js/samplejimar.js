



function add_event_compute()
{
	/* EVENT FOR .amount */
	$(".amount").unbind("change");
	$(".amount").bind("change", function(e)
	{
		action_compute()
	});

	$(".amount").unbind("keyup");
	$(".amount").bind("keyup", function(e)
	{
		action_compute()
	});

	/* EVENT FOR .quantity */
	$(".quantity").keyup(function(e)
	{
		if(action_check_if_number($(e.currentTarget)))
		{
			return false;
		}
		else
		{
			action_compute_total();
		}
	});
	$(".amount").keyup(function(e)
	{
		action_compute()
	})
}
function action_compute()
{
	action_compute_total();
	action_compute_subtotal();
}
function action_compute_total()
{
}
function action_compute_subtotal()
{

}

function action_check_if_number($target)
{
}