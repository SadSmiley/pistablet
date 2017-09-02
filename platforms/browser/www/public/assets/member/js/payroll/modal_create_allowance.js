var modal_create_allowance = new modal_create_allowance();

function modal_create_allowance()
{
	init();

	function init()
	{

	}

	function remove_tag()
	{
		$(".btn-remove-tag").unbind("click");
		$(".btn-remove-tag").bind("click", function()
		{
			var content 	= $(this).data("content");
			var con 		= confirm("Do you really want to remove this employee from tagging?");
			var parent 		= $(this).parents("tr");
			var element 	= $(this);
			var html 		= element.html();

			if(con)
			{	
				element.html(misc('spinner'));
				$.ajax({
					url 	: 	"/member/payroll/allowance/remove_allowance_tabe_employee",
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
						element.html(html);
						remove_tag()
					}
				});
			}
		});
	}

	this.load_employee_tag = function()
	{
		reload_allowance_employee();
		$(".tbl-tag").html('<tr><td colspan="2" class="text-center">'+misc('loader') + '</td></tr>');
		$.ajax({
			url 	: 	"/member/payroll/allowance/get_employee_allowance_tag",
			type 	: 	"POST",
			data 	: 	{
				_token:misc('_token')
			},
			success : 	function(result)
			{
				result = JSON.parse(result);

				var html = "";
				$(result.new_record).each(function(index, data)
				{
					html += tbl_tag(data);
				});
				$(".tbl-tag").html(html);
				remove_tag();
			},
			error 	: 	function(err)
			{
				error_function();
			}
		});
	}

	function reload_allowance_employee()
	{
		var action = "/member/payroll/allowance/reload_allowance_employee";
		var method = "POST";
		var formdata = {
			_token:misc('_token'),
			payroll_allowance_id:$("#payroll_allowance_id").val()
		};
		var target = ".allowance-employee";
		$(target).html(misc('loader'));
		$.ajax({
			url	 	: 	action,
			type	: 	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				$(target).html(result);
			},
			error 	: 	function(err)
			{
				error_function();
			}
		});
	}

	function error_function()
	{
		toastr.error("Error, something went wrong.");
	}

	function tbl_tag(data)
	{
		var html = '<tr>';
		html += '<td>' + data.payroll_employee_title_name + ' ' + data.payroll_employee_first_name + ' ' + data.payroll_employee_middle_name  + ' ' + data.payroll_employee_last_name  + ' ' + data.payroll_employee_suffix_name  + ' <input type="hidden" name="employee_tag[]" value="'+data.payroll_employee_id+'"></td>';
		html += '<td><a href="#" class="btn-remove-tag" data-content="'+data.payroll_employee_id+'"><i class="fa fa-times"></i></a></td>';
		html += '</tr>';
		return html;
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