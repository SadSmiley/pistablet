var employeelist = new employeelist();

function employeelist()
{
	init()
	function init()
	{
		tbl_btn_event();
		// reload_employee_list();
		// reload_employee_list('separated');
		filter_change_event();
		search_type_ahead();
	}

	function tbl_btn_event()
	{

	}

	function search_type_ahead()
	{
		$(".perdictive").unbind("keyup");
		$(".perdictive").bind("keyup", function(){
			var trigger = $(this).data("trigger");
			var query 	= $(this).val();
			var element = ".perdictive-active";
			// console.log(trigger);
			if(($(this).hasClass('perdictive-separated')))
			{
				element = ".perdictive-separated";
			}
			$.ajax({
				url 		: "/member/payroll/employee_list/search_employee_ahead",
				type 		: "POST",
				data 		: {
					_token:misc('_token'),
					query:query,
					status:trigger
				},
				success 	: 	function(data)
				{	
					data = JSON.parse(data);
					$(element).autocomplete({
						source : data
					});
				},
				error 		: 	function(err)
				{
					console.log(err);
				}	
			});
		});

		$(".search-form").unbind("submit");
		$(".search-form").bind("submit", function(e){
			e.preventDefault();
			var formdata = $(this).serialize();
			var action	 = $(this).attr('action');
			var method   = $(this).attr("method");
			var target   = $(this).data("target");
			var function_name = 'employeelist.tbl_btn_event';
			$(target).html(misc('loader'));
			load_configuration(action, method, formdata, target, function_name);
		});
	}

	function filter_change_event()
	{
		$(".filter-change").unbind("change");
		$(".filter-change").bind("change", function()
		{
			var parent = $(this).parents(".filter-div");
			var company_id = parent.find(".filter-change-company").val();
			var employement_status =  parent.find(".filter-change-status").val();
			var formdata = {
				_token:misc('_token'),
				company_id:company_id,
				employement_status:employement_status
			};
			var action = "/member/payroll/employee_list/reload_employee_list";
			var method = "POST";
			var target = $(this).data("target");
			var function_name = "employeelist.tbl_btn_event";
			$(target).html(misc('loader'));
			load_configuration(action, method, formdata, target, function_name);
		});
	}

	function load_configuration(action = "", method = "POST", formdata = [] , target = "",  function_name = "")
	{
		$(target).html(misc('loader'));
		$.ajax({
			url 	: 	action,
			type 	:  	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				$(target).html(result);
				// load_configuration_event();
				executeFunctionByName(function_name, window);
			},
			error  	: 	function()
			{
				error_function();
			}
		});
	}

	function error_function()
	{
		toastr.error("Error, something went wrong.");
	}

	/* USE THIS FOR FILTERING THE EMPLOYEE LIST */
	function reload_employee_list(employement_status = 0, company_id = 0)
	{
		var formdata = {
			_token:misc('_token'),
			company_id:company_id,
			employement_status:employement_status
		};
		var action = "/member/payroll/employee_list/reload_employee_list";
		var method = "POST";
		var target = "#active-employee";
		if(employement_status == 'separated')
		{
			target = "#separated-employee";
		}
		var function_name = "employeelist.tbl_btn_event";
		$(target).html(misc('loader'));
		load_configuration(action, method, formdata, target, function_name);
	}

	this.reload_employee_list = function()
	{	
		reload_employee_list();
		reload_employee_list('separated');
	}

	this.tbl_btn_event = function()
	{
		tbl_btn_event();
	}

	this.reload_contract_list = function()
	{

		$(".contract-modal-body").load("/member/payroll/employee_list/modal_view_contract_list/" + misc('employee_id') + " .contract-modal-body", function()
		{
			toastr.success("Contract list has been updated");
		});

		reload_modal();
		
	}

	this.reload_salary_list = function()
	{
		$(".modal-salary-list").load("/member/payroll/employee_list/modal_salary_list/" + misc('employee_id') + " .modal-salary-list", function()
		{
			toastr.success("Salary list has been updated");
		});
		reload_modal();
	}
	
	function reload_modal()
	{
		$(".modal-body-employee-details").load("/member/payroll/employee_list/modal_employee_view/" + misc('employee_id') + " .modal-body-employee-details", function()
		{
			modal_create_company_details.init();
		});
	}


	function misc(str){
		var spinner 	= '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
		var plus 		= '<i class="fa fa-plus" aria-hidden="true"></i>';
		var times 		= '<i class="fa fa-times" aria-hidden="true"></i>';
		var pencil 		= '<i class="fa fa-pencil" aria-hidden="true"></i>';
		var loader 		= '<div class="loader-16-gray"></div>'
		var _token 		= $("#_token").val();
		var employee_id = $(".payroll_employee_id").val();

		switch(str){
			case "spinner":
				return spinner
				break;

			case "plus":
				return plus
				break;

			case "loader":
				return loader
				break;

			case "_token":
				return _token
				break;
			case "times":
				return times
				break;
			case "pencil":
				return pencil
				break;
			case "employee_id":
				return employee_id
				break;
		}
	}
}

/* CALL A FUNCTION BY NAME */
function executeFunctionByName(functionName, context /*, args */) {
  var args = [].slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}

function submit_done(data)
{
	// console.log(data);
	try
	{
		data = JSON.parse(data);
	}
	catch(err)
	{

	}
	

	data.element.modal("toggle");
	if(data.function_name == 'payrollconfiguration.reload_tbl_jobtitle')
	{
		modal_create_employee.reload_option(data.view, '.jobtitle-select');
	}
	if(data.function_name == 'payrollconfiguration.relaod_tbl_department')
	{
		modal_create_employee.reload_department(data.selected);
	}	
	if(data.function_name == 'payrollconfiguration.reload_payroll_group')
	{
		modal_create_employee.reload_option(data.view, '.payroll-group-select');
	}

	if(data.function_name == 'payrollconfiguration.reload_jobtitlelist')
	{
		modal_create_employee.reload_jobtitle(data.data, data.department_id);
	}

	else
	{
		executeFunctionByName(data.function_name, window);
	}

}