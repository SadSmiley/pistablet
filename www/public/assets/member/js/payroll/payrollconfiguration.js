var payrollconfiguration = new payrollconfiguration();
var _data = [];

function payrollconfiguration()
{
	init();

	function init()
	{
		a_navigation_configuration_event();
		var formdata = {_token:misc('_token')};
		// load_configuration('/member/payroll/departmentlist', "POST",".configuration-div", formdata);
		$(".a-navigation-configuration").first().addClass('active');
		load_configuration($(".a-navigation-configuration").first().attr("href"),"POST",".configuration-div", formdata);
		
	}

	function a_navigation_configuration_event()
	{
		$(".a-navigation-configuration").unbind("click");
		$(".a-navigation-configuration").bind("click", function(e)
		{
			e.preventDefault();
			var link 		= $(this).attr("href");
			$(".a-navigation-configuration").removeClass('active');
			$(this).addClass('active');
			reload_configuration(link);
		});
	}

	

	function reload_configuration(link = "")
	{
		var formdata 	= {_token:misc('_token')};
		var target 		= ".configuration-div";
		load_configuration(link, "POST", target, formdata);
	}

	function load_configuration(action = "", method = "POST", target = ".configuration-div", formdata = [], toaster_str = '')
	{
		$(target).html(misc('loader'));
		$.ajax({
			url 	: 	action,
			type 	:  	method,
			data 	: 	formdata,
			success : 	function(result)
			{
				$(target).html(result);
				if(toaster_str != '')
				{
					toastr.success(toaster_str);
				}
			},
			error  	: 	function()
			{
				error_function();
			}
		});
	}

	function load_configuration_event()
	{	
		$(".btn-archived").unbind("click");
		$(".btn-archived").bind("click", function()
		{
			var content 	= $(this).data("content");
			var archived 	= $(this).data("archived");
			var trigger 	= $(this).data("trigger");
			var action 		= "/member/payroll" + $(this).data("action");
			var parent 		= $(this).parents(".dropdown");
			var html 		= parent.html();
			var tr 			= $(this).parents("tr");
			var statement 	= "remove";
			if(archived == 0)
			{
				statement = "restore";
			}
			var con 	 	= confirm("Do you really want to " + statement + " this " + trigger + "?");
			if(con)
			{
				parent.html(misc('spinner'));
				$.ajax(
				{
					url 	: 	action,
					type 	: 	"POST",
					data 	: 	{
						_token:misc('_token'),
						content:content,
						archived:archived
					},
					success : 	function(data)
					{
						tr.remove();
						data = JSON.parse(data);
						executeFunctionByName(data.function_name, window);
					},
					error 	: 	function(err)
					{
						error_function();
						parent.html(html);
						load_configuration_event();
					}
				});
			}
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


	

	function department_archived(archived = 0)
	{
		var action = "/member/payroll/departmentlist/department_reload";
		var formdata = {
			_token:misc('_token'),
			archived:archived
		};
		var target = "#active-department";
		if(archived == 1)
		{
			target = "#archived-department";
		}
		load_configuration(action, "POST",target, formdata);
	}

	function jobtitle_archived(archived = 0)
	{
		var action = "/member/payroll/jobtitlelist/reload_tbl_jobtitle";
		var formdata = {
			_token:misc('_token'),
			archived:archived
		};
		var target = "#active-jobtitle";
		if(archived == 1)
		{
			target = "#archived-jobtitle";
		}
		load_configuration(action, "POST",target, formdata);
	}

	// this.executeFunctionByName = function(functionName)
	// {
	// 	executeFunctionByName(functionName, window);
	// }

	this.load_configuration = function(action = "", method = "POST", target = "", formdata = [])
	{
		load_configuration(action, method, target, formdata);
	}

	this.relaod_tbl_department = function()
	{
		// department_archived();
		// department_archived(1);
		reload_configuration("/member/payroll/departmentlist");
	}

	this.reload_tbl_jobtitle = function()
	{
		// jobtitle_archived();
		// jobtitle_archived(1);
		reload_configuration("/member/payroll/jobtitlelist");
	} 

	this.reload_branch = function()
	{
		reload_configuration("/member/payroll/branch_name");
	} 

	

	this.btn_modal_button_event = function()
	{
		$(".btn-edit").unbind("click");
		$(".btn-edit").bind("click", function()
		{
			$(this).addClass("display-none");
			$(".btn-submit").removeClass("display-none");
			$(".view-form").removeAttr("disabled");
		});
	}

	this.reload_deduction = function()
	{
		reload_configuration("/member/payroll/deduction");
	}

	this.reload_allowance = function()
	{
		reload_configuration("/member/payroll/allowance");
	}

	this.reload_leave_temp = function()
	{
		reload_configuration("/member/payroll/leave");
	}
	
	this.reload_holiday = function()
	{
		reload_configuration("/member/payroll/holiday");
	}

	this.reload_holiday_default = function()
	{
		reload_configuration("/member/payroll/holiday_default");
	}

	this.reload_payroll_group = function()
	{
		reload_configuration("/member/payroll/payroll_group");
	}

	this.reload_jobtitlelist = function()
	{
		reload_configuration("/member/payroll/jobtitlelist");
	}

	this.reload_departmentlist = function()
	{
		reload_configuration("/member/payroll/departmentlist");
	}

	this.reload_journal_tags = function()
	{
		reload_configuration("/member/payroll/payroll_jouarnal");
	}

	this.reload_journal_sel = function(id = 0)
	{
		$.ajax({
			url 	: '/member/payroll/payroll_jouarnal/relaod_payroll_journal_sel',
			type 	: 'POST',
			data 	: 	{
				_token:misc('_token'),
				id:id
			},
			success : 	function(result)
			{
				$(".select-account").html(result);
				$(".select-account").globalDropList("reload");
				$(".select-account").val(id);
			},
			error 	: 	function(Err)
			{
				toastr.error("Error while loading the account name.");
			}
		});
	}

	this.reload_paper_size_d = function()
	{
		$(".drop-down-paper-size").load("/member/payroll/custom_payslip/modal_create_payslip .drop-down-paper-size", function()
		{
			$(".drop-down-paper-size").globalDropList("reload");
	        $(".drop-down-paper-size").val(_data.id).change();  
		});
	}

	this.reload_custom_payslip = function()
	{
		reload_configuration("/member/payroll/custom_payslip");
	}

	this.reload_shift_template = function()
	{
		reload_configuration("/member/payroll/shift_template");
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

	_data = data;

	data.element.modal("toggle");

	if(typeof data.type  !== 'undefined')
	{
		payrollconfiguration.reload_journal_sel(data.id);
	}
	else
	{
		console.log(data.function_name);
		executeFunctionByName(data.function_name, window);
	}
	
}

function loading_done(url)
{
	payrollconfiguration.btn_modal_button_event();
}