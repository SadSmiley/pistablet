var customer_detail = new customer_detail();

function customer_detail()
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
	}
}

function submit_done_customer($data)
{
	console.log(data);
	var customer_id = $(".customer-id").val();
	$(".load-customer-detail").load("/member/customer/details/"+customer_id+" .customer-detail-container")
	toastr.success("Sucessfully updated the customer");
}