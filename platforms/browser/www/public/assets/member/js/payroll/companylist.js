var companylist = new companylist();

function companylist()
{
	init();

	function init()
	{
		btn_operation_event();
	}

	function btn_operation_event()
	{
		$(".btn-archived").unbind("click");
		$(".btn-archived").bind("click", function()
		{
			var content 	= $(this).data("content");
			var archived 	= $(this).data("archived");
			var statement 	= "remove";
			
			var element 	= $(this).parents(".dropdown");
			var tr 			= $(this).parents("tr");
			var html		= element.html();
			if(archived == 0)
			{
				statement = "restore";
				
			}
			var con = confirm("Do you really want to " + statement + " this company?");
			if(con)
			{
				element.html(misc('spinner'));
				$.ajax({
					url 	: 	"/member/payroll/company_list/archived_company",
					type 	: 	"POST",
					data 	: 	{
						content:content,
						archived:archived,
						_token:misc('_token')
					},
					success : 	function(result)
					{	
						tr.remove();
						reload_company();
						// reload_company(1);
					},
					error 	: 	function()
					{
						error_function();
						element.html(html);
						btn_operation_event();
					}
				});
			}
		});
	}

	function reload_company()
	{
		// var target 		= "#active-company";
		// if(archived == 1)
		// {
		// 	target	  = "#archived-company";
		// }
		// $.ajax({
		// 	url 	: 	"/member/payroll/company_list/reload_company",
		// 	type 	: 	"POST",
		// 	data 	: 	{
		// 		archived:archived,
		// 		_token:misc('_token')
		// 	},
		// 	success : 	function(result)
		// 	{	
		// 		$(target).html(result);
		// 		btn_operation_event();
		// 	},
		// 	error 	: 	function()
		// 	{
		// 		error_function();
		// 	}
		// });
		$(".company-list").unbind("load");
		$(".company-list").load("/member/payroll/company_list .company-list", function()
		{
			toastr.success("Company list has been updated");
		});
	}

	function error_function()
	{
		toastr.error("Error, something went wrong.");
	}

	function misc(str){
		var spinner = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
		var plus = '<i class="fa fa-plus" aria-hidden="true"></i>';
		var times = '<i class="fa fa-times" aria-hidden="true"></i>';
		var pencil = '<i class="fa fa-pencil" aria-hidden="true"></i>';
		var loader = '<div class="loader"></div>'
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

	this.save_company = function()
	{
		btn_operation_event();
		reload_company();
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
	executeFunctionByName(data.function_name, window);
	$("#global_modal").modal("hide");
}