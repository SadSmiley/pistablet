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
			var inst = $('[data-remodal-id=generate_lead]').remodal();
          	inst.open(); 
		});

		$(".a_lead").click(function()
		{
			var inst = $('[data-remodal-id=add_lead]').remodal();
          	inst.open(); 
		});

		$("#sbtcancel").click(function()
		{
			var inst = $('[data-remodal-id=add_lead]').remodal();
          	inst.close(); 
		});

		addLeadsManualInit();

	}

	function addLeadsManualInit()
	{	

		var addLeadModal = $('[data-remodal-id="add-leads-manual-modal"]').remodal();
		$('.manual-add-btn').on('click', function(){
			addLeadModal.open();
			
			
			return false;

		})
	}
}

