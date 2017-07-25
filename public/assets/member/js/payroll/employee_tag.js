var employee_tag = new employee_tag();
function employee_tag()
{
	init();

	function init()
	{
		check_tags_event();
		filter_change_event();
		filter_change_action();
	}

	function check_tags_event()
	{
		$(".check-all-tag").unbind("change");
		$(".check-all-tag").bind("change", function()
		{
			if($(this).is(':checked'))
			{
				$(this).parents(".list-group").find(".check-tag").prop('checked', true);
			}
			else
			{
				$(this).parents(".list-group").find(".check-tag").prop('checked', false);
			}
		});
	}

	function filter_change_event()
	{
		$(".change-filter").unbind("change");
		$(".change-filter").bind("change", function()
		{
			filter_change_action();
		});

		$(".change-filter-department").unbind("change");
		$(".change-filter-department").bind("change", function()
		{
			filter_change_action();
			var formdata = {
				_token:misc('_token'),
				payroll_department_id:$(this).val()
			};
			var action 	= "/member/payroll/jobtitlelist/get_job_title_by_department";
			var method 	= "POST";
			var pre_load = "<option value='0'>...loading</option>";
			$(".change-filter-job-title").html(pre_load);
			$.ajax({
				url 	: 	action,
				type 	: 	method,
				data 	: 	formdata,
				success : 	function(result)
				{
					var html = "<option value='0'>Select Job Title</option>";
					result = JSON.parse(result);
					$(result).each(function(index, data)
					{
						html += "<option value='"+data.payroll_jobtitle_id+"'>"+data.payroll_jobtitle_name+"</option>";
					});
					$(".change-filter-job-title").html(html);
					filter_change_event();
				},
				error 	: 	function(err)
				{
					error_function();
				}
			});
		})
	}

	function filter_change_action()
	{
		var company 	= $(".change-filter-company").val();
		var department 	= $(".change-filter-department").val();
		var jobtitle 	= $(".change-filter-job-title").val();

		var formdata 	= {
			company:company,
			department:department,
			jobtitle:jobtitle,
			_token:misc('_token')
		};

		var action = "/member/payroll/deduction/ajax_deduction_tag_employee";
		var	method = "POST";
		var target = ".employee-tag-list";	
		var function_name = "employee_tag.check_tags_event";
		$(target).html(misc('loader'));	
		$.ajax({

			url 	: 	action,
			type 	: 	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				result = JSON.parse(result);

				var html = '<li class="list-group-item padding-3-10"><div class="checkbox"><label><input type="checkbox" name="" class="check-all-tag">Check All</label></div></li>';

				$(result).each(function (index, data)
				{
					html += str_list(data);
				});
				$(target).html(html);
				check_tags_event();
			},
			error 	: 	function(err)
			{
				error_function();
			}
		});
	}

	function str_list(data)
	{
		var html = '<li class="list-group-item padding-3-10">';
	  	html 	+= '<div class="checkbox">'
	  	html 	+= '<label><input type="checkbox" name="employee_tag[]" class="check-tag" value="'+data.payroll_employee_id+'">'+data.payroll_employee_title_name + ' ' +data.payroll_employee_first_name + ' ' + data.payroll_employee_middle_name + ' ' + data.payroll_employee_last_name  + ' ' + data.payroll_employee_suffix_name +'</label>';
	  	html 	+= '</div></li>';
	  	return html;
	  
	}	

	this.check_tags_event = function()
	{
		check_tags_event();
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