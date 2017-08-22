var modal_biometrics = new modal_biometrics();
var loader = '<div class="text-center"><div class="loader-16-gray"></div><br><span>Importing data...</span></div>';

function modal_biometrics()
{
	init();

	function init()
	{
		file_change_event();
		import_file_event();
	}

	function file_change_event()
	{
		$("#bio-file").unbind("change");
		$("#bio-file").bind("change", function()
		{
			var file_name = $(this)[0].files[0].name;
			$(".file-name").html(file_name);
		});
	}

	function import_file_event()
	{
		$(".btn-import").unbind("click");
		$(".btn-import").bind("click", function()
		{
			var file = $("#bio-file")[0].files[0];
			if(file != undefined)
			{
				var formdata 	= new FormData();
				var ajax 		= new XMLHttpRequest();

				formdata.append("_token", $("._token").val());
				formdata.append("file",file);
				formdata.append("biometric", $("#biometric_name").val())

				ajax.upload.addEventListener("progress",function(event)
				{
					$(".import-status").html(loader);
				},false);

				ajax.addEventListener("load",function(event)
				{
					$(".import-status").html(event.target.responseText);
				},false);

				ajax.open("POST","/member/payroll/import_bio/import_global");
				ajax.send(formdata);
			}
			else
			{
				toastr.error("Please Choose a file first");
			}
		});
	}
}