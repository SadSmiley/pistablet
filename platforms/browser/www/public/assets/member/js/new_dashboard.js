var dashboard = new dashboard();

function dashboard()
{
	init();
	function init()
	{
		$(document).ready(function()
		{
			document_ready();
			action_change_to_insights();
			action_change_to_home();
		});
	}
	function document_ready()
	{
		event_connected_arrow();
	}
	function event_connected_arrow()
	{
			
	}
	
	function action_connected_arrow()
	{
		
	}

	function action_change_to_insights()
	{
		$(".dashboard-insights").click(function () {
			
			$(".home-content").hide('slide',{direction:'left'}, 1000, function()
			{
				$(".insights-content").show('slide',{direction:'right'}, 1000);
				$(".dashboard-home").fadeIn();
			});
			$(this).fadeOut();
	    });
	}

	function action_change_to_home()
	{
		$(".dashboard-home").click(function () {
			$(".insights-content").hide('slide',{direction:'right'}, 1000, function()
			{
				$(".home-content").show('slide',{direction:'left'}, 1000);
				$(".dashboard-insights").fadeIn();
			});
        	$(this).fadeOut();
	    });
	}
}