var store = new store();

function store()
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
		equal_height();
	}
	function equal_height()
	{
		$('.equal-height').matchHeight();
	}
}	