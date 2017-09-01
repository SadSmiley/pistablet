var modal_create_employee = new modal_create_employee();

var department_id = 0;

function modal_create_employee()
{
	init()

	function init()
	{
		file_requirement_change_event();
		remove_requirements();
		select_change_action();
		select_change_event();
		autoname();
		$(".datepicker").datepicker();
		check_deduction_contribution_action();
		check_deduction_contribution();
	}

	function autoname()
	{
		$(".auto-name").unbind("change");
		$(".auto-name").bind("change", function(){
			var  combonames = comboname();
			$(".drop-down-display-name").html(combonames['html']);
			$(".display-name-check").val(combonames['combo'][0]);
			listdropdownname();
		});

		$(".check-print-name-as").unbind("change");
	    $(".check-print-name-as").bind("change", function(){
	    	var combo = comboname();
	    	var target = $(this).attr("data-target");
	    	
	    	if($(this).is(':checked')){
	    		$(target).attr("readonly", true);
	    		// console.log(combo['combo'][0]);
	    		$(target).val(combo['combo'][0]);
	    	}
	    	else{
	    		$(target).attr("readonly", false);
	    	}
	    });

	    $(".checkbox-toggle-rev").each(function(){
	        var target = $(this).attr("data-target");
	        // console.log(target);
	        if($(this).is(':checked')){
	            $(target).attr("readonly", true);
	        }
	        else{
	            $(target).attr("readonly", false);
	        }
	        
	    });
	}

	function listdropdownname(){
		$(".list-drop-display-name").unbind("click");
	    $(".list-drop-display-name").bind("click", function(){
	        var html = $(this).attr("data-html");
	        $(".txt-display-name").val(html);
	        $(".drop-down-display-name").slideToggle("fast");
	    });
	}

	function comboname(){
		var title = $(".title").val();
		var first_name = $(".first_name").val();
		var middle_name = $(".middle_name").val();
		var last_name = $(".last_name").val();
		var last_name2 = last_name;
		var suffix = $(".suffix").val();
		if(suffix != null && suffix != '')
		{
			suffix = ' '+suffix;
		}
		var title_suffix = title + suffix + last_name;;
		
		
		if(title != ""){
			title = title + ' ';
		}
		if(first_name != ""){
			first_name = first_name + ' ';
		}
		if(middle_name != ""){
			middle_name = middle_name + ' ';
		}
		
		var combo = [];
		combo[0] = title + first_name + middle_name + last_name + suffix;
		combo[1] = first_name + last_name2;
		combo[2] = last_name2 + ', ' + first_name;
		var html = '';
		var min = 0;
		var max = 2;
		
		if(first_name != '' && middle_name != "" && title_suffix != ""){
			min = 0;
			max = 2;
		}
		else{
			min = 0;
			max = 0;
		}
		for(var i = min; i <= max; i++){
			html += '<a href="#" class="list-group-item list-drop-display-name" data-html="'+combo[i]+'">'+combo[i]+'</a>';
		}

		var returns = [];
		returns['combo'] = combo;
		returns['html'] = html;
		return returns;
	}

	function file_requirement_change_event()
	{
		$(".file-requirements").unbind("change");
		$(".file-requirements").bind("change", function()
		{
			var file = $(this)[0].files[0];
			var parent = $(this).parents("tr");
			parent.find("label").addClass("display-none");
			var a_href = parent.find(".a-file-name");
			a_href.removeClass("display-none");
			a_href.html(file.name);

			var progress_container	= parent.find(".custom-progress-container-100");
			progress_container.removeClass("display-none");
			var progress_div 		= parent.find(".custom-progress");
			var removefile			= parent.find(".remove-requirements");
			var requirement_input 	= parent.find(".requirement-input");
			var checkbox			= parent.find("input[type=checkbox]");

			var formdata 	= new FormData();
			var ajax 		= new XMLHttpRequest();

			formdata.append("file",file);
			formdata.append("_token",misc('_token'));

			/* uploading with progress */
			ajax.upload.addEventListener("progress", function(event)
			{
				var progress = ( event.loaded / event.total ) * 100;
				progress_div.css("width",progress + "%");
			}, false);

			/* on complete upload */
			ajax.addEventListener("load", function(event)
			{
				var json = JSON.parse(event.target.responseText);
				progress_container.addClass("display-none");
				progress_div.css("width","0%");
				removefile.removeClass("display-none");
				removefile.attr("data-content",json.data.payroll_requirements_id);
				a_href.attr("href",json.data.path);
				requirement_input.val(json.data.payroll_requirements_id);
				checkbox.prop("checked", true);
			}, false);

			/* on error */
			ajax.addEventListener("error", function(event){

				error_function();
				parent.find("label").removeClass("display-none");
				a_href.addClass("display-none");
				progress_container.addClass("display-none");
				progress_div.css("width","0%");

			}, false);

			/* on abort */
			ajax.addEventListener("abort", function()
			{
				toastr.error("File upload aborted");
				parent.find("label").removeClass("display-none");
				a_href.addClass("display-none");
				progress_container.addClass("display-none");
				progress_div.css("width","0%");
			}, false);

			ajax.open("POST","/member/payroll/employee_list/employee_updload_requirements");
			ajax.send(formdata);

		});
	}


	function select_change_event()
	{
		// jobtitle-select
		$(".department-select").unbind("change");
		$(".department-select").bind("change", function()
		{
			// alert("Test");
			select_change_action()
		});
		$(".department-select").globalDropList({
			link 		:  '/member/payroll/departmentlist/department_modal_create',
			link_size 	: 'md',
			placeholder	: 'Department',
			width 		: '100%',
			onChangeValue : function()
			{
				department_id = $(this).val();
				select_change_action(department_id);
				$(".jobtitle-select").globalDropList("reload");
				$(".jobtitle-select").globalDropList({
					link 		: '/member/payroll/jobtitlelist/modal_create_jobtitle?selected='+$(this).val(),
					link_size 	: 'md',
					placeholder : '...loading'
				});

			}
		});
		$(".jobtitle-select").globalDropList({
			link 		: '/member/payroll/jobtitlelist/modal_create_jobtitle',
			link_size 	: 'md',
			placeholder : 'Job Title',
			width 		: '100%'
		});

		$(".payroll-group-select").globalDropList({
			link 		: '/member/payroll/payroll_group/modal_create_payroll_group',
			link_size 	: 'lg',
			placeholder : 'Payroll Group',
			width 		: '100%',
		});
	}

	function select_change_action(payroll_department_id = 0, selected = 0)
	{
		// var payroll_department_id = $(".department-select").val();
		var pre_data = '<option value="">...loading job title</option>';
		$(".jobtitle-select").html(pre_data);
		$.ajax(
			{
				url 	: 	"/member/payroll/jobtitlelist/get_job_title_by_department",
				type 	: 	"POST",
				data 	: 	{
					payroll_department_id:payroll_department_id,
					_token:misc('_token')
				},
				success : 	function(result)
				{
					var json = JSON.parse(result);

					var html = '<option value="">Select Job Title</option>';

					$(json).each(function(index, data)
					{
						html += '<option value="'+data.payroll_jobtitle_id+'">'+data.payroll_jobtitle_name+'</option>';
					});
					$(".jobtitle-select").html(html);
					$(".jobtitle-select").globalDropList("destroy");
					$(".jobtitle-select").globalDropList({
						link 		: '/member/payroll/jobtitlelist/modal_create_jobtitle?selected='+payroll_department_id,
						link_size 	: 'md',
						placeholder : 'Job Title',
						width 		: '100%'
					});
					$(".jobtitle-select").globalDropList("reload");
					$(".jobtitle-select").val(selected).change();
					
				},
				error 	: 	function(err)
				{
					error_function(selected).change();
				}
			});
	}


	function check_deduction_contribution()
	{
		$(".deduction-check-period").unbind("change");
		$(".deduction-check-period").bind("change", function()
		{
			check_deduction_contribution_action();
		});
	}

	function check_deduction_contribution_action()
	{
		$(".deduction-check-period").each(function()
		{

			var target = $(this).data("target");
			if($(this).is(":checked"))
			{	
				$(target).attr("readonly",true);
				$(target).removeAttr("required");
			}
			else
			{
				$(target).removeAttr("readonly");
				$(target).attr("required",true);
			}
		});
	}


	this.reload_option = function(html = '', target ='')
	{
		$(target).html(html);
		$(target).globalDropList("reload");
		parent = $(target).parents(".droplist");
		parent.find("input[type=text]").val($(target).find(":selected").text());
	}

	this.reload_department = function(selected = 0)
	{
		$(".department-select").load("/member/payroll/employee_list/modal_create_employee .department-select", function()
		{
			
			$(".department-select").globalDropList("reload");
			$(".department-select").val(selected).change();

		});
	}

	this.reload_jobtitle = function (selected = 0, department_id = 0)
	{
		select_change_action(department_id, selected);
	}

	function remove_requirements()
	{
		$(".remove-requirements").unbind("click");
		$(".remove-requirements").bind("click", function()
		{
			var content 			= $(this).data("content");
			var parent 				= $(this).parents("tr");
			var checkbox 			= parent.find("input[type=checkbox]");
			var a_href 				= parent.find(".a-file-name");
			var requirement_input 	= parent.find(".requirement-input");
			var label 				= parent.find("label");
			var removefile 			= parent.find(".remove-requirements");
			var con 				= confirm("Do you really want to permanently remove " + a_href.html() + "?");
			var original_html		= $(this).html();

			if(con)
			{
				removefile.html(misc("spinner"));
				$.ajax({
					url 	: 	"/member/payroll/employee_list/remove_employee_requirement",
					type 	: 	"POST",
					data 	: 	{
						_token:misc('_token'),
						content:content
					},
					success : 	function(result)
					{
						a_href.attr("href","#");
						a_href.html("");
						a_href.addClass("display-none");
						requirement_input.val("");
						label.removeClass("display-none");
						removefile.addClass("display-none");
						removefile.html(original_html);
						checkbox.prop("checked", false);
						remove_requirements();

						file_requirement_change_event();
					},
					error 	: 	function(err)
					{
						error_function();
						removefile.html(original_html);
						remove_requirements();
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
}