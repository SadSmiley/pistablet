var payroll_timekeeping = new payroll_timekeeping();

function payroll_timekeeping()
{
	init();

	function init()
	{

	}

	this.reload_timekeeping = function()
	{
		$(".panel-timekeeping-list").load("/member/payroll/time_keeping .panel-timekeeping-list", function()
		{
			toastr.success("Time keeping list updated.");
		});
	}

	this.reload_period = function()
	{
		$(".period-list").load("/member/payroll/time_keeping/modal_generate_period .period-list", function()
		{
			toastr.success("New period has been created");
		});
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
	try
	{
		data = JSON.parse(data);
	}
	catch(err)
	{

	}
	data.element.modal("toggle");
	if(data.function_name == "payroll_period_list.reload_list")
	{
		payroll_timekeeping.reload_period();
	}
	else
	{
		executeFunctionByName(data.function_name, window);
	}
	
}

