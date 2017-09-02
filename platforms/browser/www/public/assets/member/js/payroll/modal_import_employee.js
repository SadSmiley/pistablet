var modal_import_employee = new modal_import_employee();
var loader = '<div class="text-center"><div class="loader-16-gray"></div><br><span>Importing data...</span></div>';

function modal_import_employee()
{
	init();

	function init()
	{
		upload_file_change_event();
		import_file_event();
	}

	function upload_file_change_event()
	{
		$("#file-201").unbind("change");
		$("#file-201").bind("change", function()
		{
			var file_name = $(this)[0].files[0].name;
			$(".file_name").html(file_name);
		});
	}

	function import_file_event()
	{
		$(".btn-import").unbind("click");
		$(".btn-import").bind("click", function()
		{
			var file = $("#file-201")[0].files[0];
			if(file != undefined)
			{
				var url = "/member/payroll/employee_list/modal_import_employee/import_201_template";
				var formdata 	= new FormData();
				var ajax 		= new XMLHttpRequest();

				formdata.append("_token", $("#_token").val());
				formdata.append("file", file);
				ajax.upload.addEventListener("progress", function(event)
				{
					$(".import-status").html(loader);
				}, false);
				ajax.addEventListener("load", function(event)
				{
					console.log(event.target.responseText);
					var data = JSON.parse(event.target.responseText);

					$(".import-status").html(data.message);
					if(data.status == 'success')
					{
						employeelist.reload_employee_list();
					}
					
				},false);

				ajax.addEventListener("error", function(event){

					toastr.error("Error, something went wrong.");
					$(".import-status").html("");
				}, false);

				ajax.open("POST", url);
				ajax.send(formdata);
			}
			else
			{
				toastr.error("Please choose a file first.");
			}
		});
	}


}