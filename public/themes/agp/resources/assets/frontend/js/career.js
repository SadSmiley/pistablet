var home = new home();

function home()
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

		show_modal();

	}
	function show_modal()
	{		
		if($(".reservemessage").length)
			{
			location.hash="reserve";	
			}
	
	}
}