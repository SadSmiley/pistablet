 var lead = new lead();
function lead()
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
		initialize();
	}

	function initialize()
	{
		$(".genlead").click(function()
		{
			var inst = $('[data-remodal-id=cpass]').remodal();
          	inst.open(); 
		});
	}
}

