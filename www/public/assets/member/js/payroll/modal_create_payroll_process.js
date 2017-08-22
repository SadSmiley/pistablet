var modal_create_payroll_process = modal_create_payroll_process();

function modal_create_payroll_process()
{
	init();

	function init()
	{
		tax_perio_change_event();
	}

	function  tax_perio_change_event()
	{
		$(".tax-period-change").unbind("change");
		$(".tax-period-change").bind("change", function()
		{
			var tax = $(this).val();
			var formdata = {
				_token:$("#_token").val(),
				tax:tax
			};
			var action = "/member/payroll/payroll_process/ajax_load_payroll_period";
			var method = "POST";

			var html = '<option value="">...loading</option>';
			$(".payroll-period").html(html);
			function_ajax(action, method, formdata, "tax-period-change");
		});
	}

	function period_change_event()
	{
		$(".payroll-period").unbind("change");
		$(".payroll-period").bind("change", function()
		{
			var period = $(this).val();
			var loader = '<center><div class="loader-16-gray"></div></center>';
			var action = "/member/payroll/payroll_process/ajax_payroll_company_period";
			var method = "POST";
			var formdata = {
				_token:$("#_token").val(),
				period:period
			};
			$(".company-list").html(loader);
			function_ajax(action, method, formdata, "payroll-period");
		});
	}

	function check_all_change_event()
	{
		$(".check-all").unbind("change");
		$(".check-all").bind("change", function()
		{
			if($(this).is(":checked"))
			{
				$(".check-all-child").prop("checked", true);
			}
			else
			{
				$(".check-all-child").prop("checked", false);
			}
		});
	}

	function function_ajax(action = "", method = "", formdata = [], function_name = "")
	{
		var html = '';
		$.ajax({
			url 	: 	action,
			type 	: 	method,
			data 	: 	formdata,
			success : 	function(data)
			{
				try
				{
					data = JSON.parse(data);
				}
				catch(err)
				{

				}
				if(function_name == "tax-period-change")
				{
					html = '<option value="">Select Period</option>';
					$(data).each(function(index, value)
					{
						html += '<option value="'+value.payroll_period_id+'">'+value.start+' to '+value.end+'</option>';
					});
					$(".payroll-period").html(html);
					period_change_event();	
				}
				else if(function_name == "payroll-period")
				{
					html = '<ul class="list-group">';
					html += '<li class="list-group-item padding-tb-2"><div class="checkbox"><label><input type="checkbox" class="check-all">Check All</label></div></li>';
					$(data).each(function (index, value){
						html += '<li class="list-group-item padding-tb-2"><div class="checkbox"><label><input type="checkbox" name="company_period[]" class="check-all-child" value="'+value.payroll_period_company_id+'">'+value.payroll_company_name+'</label></div></li>';
					});	
					html += '</ul>';
					$(".company-list").html(html);
					check_all_change_event();
				}
							
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
}