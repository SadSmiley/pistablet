var modal_create_deduction = new modal_create_deduction();

function modal_create_deduction()
{
	init();

	function init()
	{
		$(".datepicker").datepicker();
		deduction_category_change();
	}

	function deduction_category_change()
	{
		$(".deduction-category-change").unbind("change");
		$(".deduction-category-change").bind("change", function()
		{
			if($(this).val() != "")
			{
				if(!$(".btn-add-type").hasClass("popup"))
				{
					$(".btn-add-type").addClass("popup");
				}
				var link = "/member/payroll/deduction/modal_create_deduction_type/";
				link += $(this).val().replace(/ /g,"_");

				$(".btn-add-type").attr("link", link);
			}
			else
			{
				$(".btn-add-type").removeClass("popup");
				$(".btn-add-type").removeAttr("link");
			}
			var pre_load = "<option value=''>...loading</option>";
			$(".select-deduction-type").html(pre_load);
			$.ajax({
				url 	: 	"/member/payroll/deduction/ajax_deduction_type",
				type 	: 	"POST",
				data 	: 	{
					_token:$("#_token").val(),
					category:$(this).val()
				},
				success : 	function(result)
				{
					result = JSON.parse(result);
					var html = "<option value=''>Select Type</option>";
					$(result).each(function(index, data)
					{	
						html += "<option value='"+data.payroll_deduction_type_id+"'>"+data.payroll_deduction_type_name+"</option>";
					});
					$(".select-deduction-type").html(html);
				},
				error 	: 	function(err)
				{
					toastr.error("Error, something went wrong.");
				}
			});
		});
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
					url 	: 	"/member/payroll/deduction/remove_from_tag_session",
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

	this.load_tagged_employee = function()
	{
		var action = "/member/payroll/deduction/get_employee_deduction_tag";
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
				console.log(result);
				var html = '';
				result = JSON.parse(result);
				$(result.new_record).each(function(index, data){
					console.log(data);
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
		reload_tag_employee();
	}

	this.reload_tag_employee = function()
	{
		reload_tag_employee();
	}

	function reload_tag_employee()
	{
		var target = ".affected-employee";
		var formdata = {
			_token:misc('_token'),
			payroll_deduction_id:$("#payroll_deduction_id").val()
		};
		var action = "/member/payroll/deduction/reload_deduction_employee_tag";
		var method = "POST";
		$(target).html(misc('loader'));
		$.ajax({
			url 	: 	action,
			type 	: 	method,
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


	function tbl_tag(data)
	{
		var html = '<tr>';
		html += '<td>' + data.payroll_employee_title_name + ' ' + data.payroll_employee_first_name + ' ' + data.payroll_employee_middle_name  + ' ' + data.payroll_employee_last_name  + ' ' + data.payroll_employee_suffix_name  + ' <input type="hidden" name="employee_tag[]" value="'+data.payroll_employee_id+'"></td>';
		html += '<td><a href="#" class="btn-remove-tag" data-content="'+data.payroll_employee_id+'"><i class="fa fa-times"></i></a></td>';
		html += '</tr>';
		return html;
	}


	function error_function()
	{
		toastr.error("Error, something went wrong.");
	}

	this.remove_tag = function()
	{
		remove_tag();
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
