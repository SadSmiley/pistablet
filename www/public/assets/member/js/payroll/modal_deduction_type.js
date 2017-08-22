var deduction_type = new deduction_type();
var spinner = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
var _token = $("#_token").val();
function deduction_type()
{
	init();
	function init()
	{
		form_submit();
		update_type();
	}

	function update_type()
	{
		$(".txt-deduction-type").unbind("keyup");
		$(".txt-deduction-type").bind("keyup", function()
		{
			var formdata 		= {
				_token:_token,
				value:$(this).val(),
				content:$(this).data("content")
			};
			var action	 		= "/member/payroll/deduction/update_deduction_type";
			var method   		= "POST";
			var target 			= "";
			load_configuration(action, method, target, formdata);
		});

		$(".btn-archived").unbind("click");
		$(".btn-archived").bind("click", function()
		{
			var content = $(this).data("content");
			var archived = $(this).data("archived");
			var statement = "remove";
			if(archived == 0)
			{
				statement = "restore";
			}
			var formdata = {
				_token:_token,
				content:content,
				archived:archived
			};
			var action = "/member/payroll/deduction/archive_deduction_type";
			var method = "POST";
			var function_name = "deduction_type.reload_deduction";
			var element = $(this);
			var html = $(this).html(spinner);
			var con = confirm("Do you really want to " + statement +  " this type?");
			if(con)
			{
				load_configuration(action, method, "", formdata, function_name, element, html);
			}
		});
	}

	function form_submit()
	{
		$(".custom-form").unbind("submit");
		$(".custom-form").bind("submit", function(e)
		{
			e.preventDefault();
			var formdata 	= $(this).serialize();
			var action 		= $(this).attr("action");
			var method 		= $(this).attr("method");
			var target 		= ".select-deduction-type";
			var element 	= ".btn-submit-type";
			var clear 		= ".payroll_deduction_type_name";
			var html 		= $(element).html();
			var function_name = "deduction_type.reload_deduction";
			$(element).html(spinner);
			load_configuration(action, method, target, formdata, function_name, element, html, clear);
		});
	}

	this.reload_deduction = function()
	{
		reload_deduction();
		reload_deduction(1);
	}

	this.update_type = function()
	{
		update_type();
	}

	function reload_deduction(archived = 0)
	{
		var action = "/member/payroll/deduction/reload_deduction_type";
		var method = "POST";
		var formdata = {
			payroll_deduction_category:$(".payroll_deduction_category").val(),
			archived:archived,
			_token:_token
		};
		var target = "#active-type";
		if(archived == 1)
		{
			target = "#archive-type";
		}
		var function_name = "deduction_type.update_type";

		load_configuration(action, method, target, formdata, function_name);
	}


	function load_configuration(action = "", method = "POST", target = "", formdata = [], function_name = "", element = "", html = "", clear = "")
	{
		
		$.ajax({
			url 	: 	action,
			type 	:  	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				target = target.split(",");

				$(target).each(function(a,b)
				{
					$(b).html(result);
				});

				$(element).html(html);

				$(clear).val("");

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
}