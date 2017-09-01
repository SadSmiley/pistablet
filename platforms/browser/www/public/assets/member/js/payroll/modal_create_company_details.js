var modal_create_company_details = modal_create_company_details();

function modal_create_company_details()
{
	init();

	function init()
	{
		$(".datepicker").datepicker();
		department_change_event();
	}

	this.init = function()
	{
		init();
	}

	function department_change_event()
	{
		$(".create-department-list").unbind("change");
		$(".create-department-list").bind("change", function()
		{
			var pre_data = '<option value="">...loading job title</option>';
			$(".create-jobtitle-list").html(pre_data);
			var content = $(this).val();
			$.ajax({
				url 	: 	"/member/payroll/jobtitlelist/get_job_title_by_department",
				type 	: 	"POST",
				data 	: 	{
					_token:$("#_token").val(),
					payroll_department_id:content
				},
				success : 	function(result)
				{
					var json = JSON.parse(result);
					var html = '<option value="">Select Job Title</option>';

					$(json).each(function(index, data)
					{
						html += '<option value="'+data.payroll_jobtitle_id+'">'+data.payroll_jobtitle_name+'</option>';
					});
					$(".create-jobtitle-list").html(html);

				},
				error 	: 	function(err)
				{
					toastr.error("Error, something went wrong.");
				}
			});
		});
	}

	

}


function submit_done(data)
{
	
	// console.log(data.element);
	data.element.modal("toggle");
	executeFunctionByName(data.function_name, window);
	
}