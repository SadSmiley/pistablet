var report_13th_month_pay = new report_13th_month_pay();

function report_13th_month_pay()
{
	init();

	function init()
	{
		document_ready();
	}

	function document_ready()
	{
		on_event();
	}

	function on_event()
	{
		$('body').on('change', '.start-date, .end-date, .emp_id', function(event) {
			action_get_data_table();	
		});
		$('body').on('change', '.department_id, .company_id', function(event) {
			action_get_data_table();
			action_get_data_table('.search_emp');	
		});
		//onclick button export to excel
		$('body').on('click', '.export_excel', function(event) {
			/*console.log('button click');*/
			action_export_excel();
			 //$("#w3s").attr("href", "https://www.w3schools.com/jquery");
		});
	}

		

	function action_get_data_table(target = '.load-data')
	{
		//console.log('pasok');
		event.preventDefault();
		var start 			= $(".start-date").val();
		var end 			= $(".end-date").val();
		var department_id 	= $(".department_id").val();
		var company_id 		= $(".company_id").val();
		var emp_id			= $(".emp_id").val();

		var loader 	= '<div class="loader-16-gray"></div>';
		if(target == '.load-data')
		{
			$(target).html(loader);
		}
		
		$(target).load("/member/payroll/report_13th_month_pay?start_date=" +start +"&&end_date=" +end +"&&department_id="+department_id +"&&company_id="+company_id +"&&emp_id="+emp_id+" "+target, function()
		{
			if(target == '.load-data')
			{
				toastr.success("Generated");	
			}			
		})
		/* Act on the event */	
	}

	function action_export_excel()
	{
		event.preventDefault();
		var start 			= $(".start-date").val();
		var end 			= $(".end-date").val();
		var department_id 	= $(".department_id").val();
		var company_id 		= $(".company_id").val();
		var emp_id			= $(".emp_id").val();
	
		location.href = "/member/payroll/report_13th_month_pay/excel_export?start_date=" +start +"&&end_date=" +end +"&&department_id="+department_id +"&&company_id="+company_id +"&&emp_id="+emp_id;
		
	}
}