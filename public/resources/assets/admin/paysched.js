var paysched = new paysched();

function paysched()
{
	init();
	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		})
	}
	function document_ready()
	{
		event_execute_process();
		event_change_mode();
		check_mode();
	}
	function event_execute_process()
	{
		$(".execute-process").click(function(e)
		{
			if(confirm('Executing this will process the pay cheque of the members?'))
			{
				location.href = $(e.currentTarget).attr("link");
			}
		});
	}
	function event_change_mode()
	{
		$(".check-mode").change(function()
		{
			check_mode();
		});
	}
	function check_mode()
	{
		$(".computation-container").each(function(key, val) 
		{
			$mode = $(this).find(".check-mode").val();

			if($mode == "monthly")
			{
				$(this).find(".monthly-mode").removeClass("hidden");
				$(this).find(".daily-mode").addClass("hidden");
				$(this).find(".weekly-mode").addClass("hidden");
			}
			else if($mode == "weekly")
			{
				$(this).find(".monthly-mode").addClass("hidden");
				$(this).find(".daily-mode").addClass("hidden");
				$(this).find(".weekly-mode").removeClass("hidden");
			}
			else
			{
				$(this).find(".monthly-mode").addClass("hidden");
				$(this).find(".daily-mode").removeClass("hidden");
				$(this).find(".weekly-mode").addClass("hidden");
			}
		});
	}
}