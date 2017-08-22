var employee_tag_schedule_leave = new employee_tag_schedule_leave();

function employee_tag_schedule_leave()
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
		var leave_id 	= $(".leave_id").val();

		var formdata 	= {
			company:company,
			department:department,
			jobtitle:jobtitle,
			leave_id:leave_id,
			_token:misc('_token')
		};

		var action = "/member/payroll/leave_schedule/ajax_shecdule_leave_tag_employee";
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

				var html = '<li class="list-group-item padding-3-10"><div class="checkbox"><label><input type="checkbox" name="" class="check-all-tag">Check All<span class="pull-right">Available Leave</span></label></div></li>';

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
	  	html 	+= '<label><input type="checkbox" name="employee_tag[]" class="check-tag" value="'+data.payroll_leave_employee_id_2+'">'+data.payroll_employee_title_name + ' ' +data.payroll_employee_first_name + ' ' + data.payroll_employee_middle_name + ' ' + data.payroll_employee_last_name  + ' ' + data.payroll_employee_suffix_name +'<span class="pull-right">'+data.available_count+'</span></label>';
	  	html 	+= '</div></li>';
	  	return html;
	  
	}	

	this.check_tags_event = function()
	{
		check_tags_event();
	}


	this.load_tagged_employee = function()
	{
		var action = "/member/payroll/leave_schedule/get_session_leave_tag";
		var method = "POST";
		var target = ".table-employee-tag";
		var formdata = {
			_token:misc('_token')
		};
		var function_name = "modal_create_deduction.remove_tag";
		$(target).html('<tr><td colspan="2">'+misc('loader') + '</td></tr>');
		$.ajax({
			url 	: 	action,
			type 	: 	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				var html = '';
				result = JSON.parse(result);
				$(result.new_record).each(function(index, data){

					html += tbl_tag(data);
				});
				$(target).html(html);
				remove_tag();
			},
			error 	: 	function(err)
			{
				error_function();
			}
		});
		// reload_tag_employee();
	}

	function remove_tag()
	{
		$(".btn-remove-tag").unbind("click");
		$(".btn-remove-tag").bind("click", function()
		{
			var content = $(this).data("content");
			var parent = $(this).parents("tr");
			var element = $(this);
			var html = element.html();
			
			var con = confirm("Do you realy want to remove this employee?");
			if(con)
			{
				element.html(misc('spinner'));
				$.ajax({
					url 	: 	"/member/payroll/leave_schedule/unset_session_leave_tag",
					type 	: 	"POST",
					data 	: 	{
						_token:misc('_token'),
						content:content
					},
					success : 	function(result)
					{
						parent.remove();
					},
					error 	: 	function(err)
					{
						error_function();
					}
				});
			}
		});
	}

	function tbl_tag(data)
	{
		var html = '<tr>';
		html += '<td>' + data.payroll_employee_title_name + ' ' + data.payroll_employee_first_name + ' ' + data.payroll_employee_middle_name  + ' ' + data.payroll_employee_last_name  + ' ' + data.payroll_employee_suffix_name  + ' <input type="hidden" name="employee_tag[]" value="'+data.payroll_leave_employee_id+'"></td>';
		html += '<td class="text-center"><a href="#" class="btn-remove-tag" data-content="'+data.payroll_employee_id+'"><i class="fa fa-times"></i></a></td>';
		html += '</tr>';
		return html;
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


