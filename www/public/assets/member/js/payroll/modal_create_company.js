var modal_create_company = new modal_create_company();

function modal_create_company()
{
	init();

	function init()
	{
		event_function()
	}

	function event_function()
	{
		$(".datepicker").datepicker();
		$("#files").unbind("change");
		$("#files").bind("change", function()
		{
			var file = $(this)[0].files[0];
			logo_upload(file);
		});

		$("#files-update").unbind("change");
		$("#files-update").bind("change", function()
		{
			var file = $(this)[0].files[0];
			logo_upload(file, "update");
			console.log("changed");
		});

		$(".btn-edit").unbind("click");
		$(".btn-edit").bind("click", function()
		{
			$(this).addClass("display-none");
			$(".btn-submit").removeClass("display-none");
			$(".view-form").removeAttr("disabled");
			event_function();
		});
	}

	function logo_upload(file = [], action = "new")
	{
		var _token = $("#_token").val();

		var formdata = new FormData();
		var ajax = new XMLHttpRequest();
		formdata.append("file", file);
		formdata.append("_token",_token);
		formdata.append("action",action);
		ajax.upload.addEventListener("progress", progressUpload, false);
		ajax.addEventListener("load", loadFinish, false);
		ajax.open("POST", "/member/payroll/company_list/upload_company_logo");
		ajax.send(formdata);
		$(".custom-progress-container").removeClass("display-none");
	}

	function progressUpload(event)
	{
		var total = ( event.loaded / event.total ) * 100;
		$(".custom-progress").css("width",total + "%");
		event_function();
	}
	function loadFinish(event)
	{
		$(".custom-progress").css("width","0%");
		$(".custom-progress-container").addClass("display-none");
		var img = event.target.responseText;
		$(".company_logo").attr("src", img);
		event_function();
	}

}