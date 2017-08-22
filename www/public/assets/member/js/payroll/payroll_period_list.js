var payroll_period_list = new payroll_period_list();

function payroll_period_list()
{
	init();

	function init()
	{

	}

	this.reload_list = function(id = 0)
	{
		console.log(id);
		toastr.success("Period list has been updated");
		$(".period-list").load("/member/payroll/payroll_period_list .tab-pane-div", function()
		{
			
		});

		$(".modal-content-global").html('<br><br>'+misc('loader')+'<br><br>');
		$(".modal-dialog").addClass('modal-lg');
		// $(".modal-content").load('/member/payroll/payroll_period_list/modal_schedule_employee_shift/' + id + ' .modal-content', function()
		// {

		// });

		$.ajax({
			url 	: '/member/payroll/payroll_period_list/modal_schedule_employee_shift',
			type 	: "POST",
			data 	: {
				id:id,
				_token:misc('_token')
			},
			success : function(data)
			{
				$(".modal-content-global").html(data);
			},
			error 	: 	function(err)
			{
				toastr.error("Error, please contact the administrator.");
			}
		});

	}	

	function misc(str){
		var spinner = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
		var plus = '<i class="fa fa-plus" aria-hidden="true"></i>';
		var times = '<i class="fa fa-times" aria-hidden="true"></i>';
		var pencil = '<i class="fa fa-pencil" aria-hidden="true"></i>';
		var loader = '<div class="loader-16-gray"></div>'
		var _token = $("#_token").val();

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
	// data.element.modal("toggle");
	// console.log(data.function_name);
	if(data.function_name == 'payroll_period_list.reload_list')
	{
		// console.log(data.function_name);
		payroll_period_list.reload_list(data.id);

	}
	else
	{
		executeFunctionByName(data.function_name, window);
	}
	
}