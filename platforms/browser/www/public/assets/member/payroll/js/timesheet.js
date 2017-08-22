var timesheet = new timesheet();
var timesheet_request = null;
var adjust_form_request = null;
var new_sub_ctr = 1000;


function loading_done(url)
{
	/* ADD TIME ENTRY */
	$(".over-time-entry").each(function(key, val)
	{
		$min = $(this).attr("time_min");
		$max = $(this).attr("time_max");
		$(this).timeEntry({ampmPrefix: ' ',minTime: $min, maxTime: $max});
		timesheet.external_compute_overtime_form();
		
	});
}


function timesheet()
{
	init();

	this.external_compute_overtime_form = function()
	{
		action_compute_overtime_form();
	}

	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		})
	}
	function document_ready()
	{
		action_load_timesheet();
		event_change_employee();
		event_focus_edit();
		event_change_time_in_out();
		event_create_sub_time();
		event_delete_sub_time();
		event_load_overtime_form();
		event_for_overtime_form();
		event_mark_ready();
	}
	function event_load_overtime_form()
	{
		$("body").on("click", ".load-overtime-form", function(e)
		{
			tid = $(e.currentTarget).closest("tr").attr("tid");
			action_load_link_to_modal("/member/payroll/employee_timesheet/adjustment_form?payroll_time_sheet_id=" + tid, "md");
		});

	}

	function event_mark_ready()
	{
		$('.btn-mark-ready').unbind("click");
		$('.btn-mark-ready').bind("click", function(){
			var content = $('.btn-mark-ready').data("content");
			
			var ready 	= '<i class="fa fa-check"></i>&nbsp;Ready';
			var html 	= $('.btn-mark-ready').html();
			var spinner = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';

			$('.btn-mark-ready').html(spinner);
			$.ajax({
				url 	: 	"/member/payroll/timesheet/mark_ready_company",
				type 	: 	"POST",
				data 	: 	{
					_token:$("#_token").val(),
					content:content
				},
				success : 	function(result)
				{
					$('.btn-mark-ready').html(ready);
					$('.btn-mark-ready').attr("disabled",true);
					console.log(result);
				},
				error 	: 	function(err)
				{
					$('.btn-mark-ready').html(html);
					toastr.error("Error, something went wrong.");
				}
			});
		});
	
	}

	function event_for_overtime_form()
	{
		$("body").on("change", ".over-time-entry", function(e)
		{
			action_compute_overtime_form();
		});

		$("body").on("click", ".submit-overtime-form", function()
		{
			action_approve_overtime_form();
		});

		$("body").on("click", ".cancel-approve", function()
		{
			action_approve_overtime_form('.cancel-approve-span',0);
		});
	}
	function action_approve_overtime_form(target = '.approve-span', approve = 1)
	{
		// $(".adjust-form-icon").addClass("hidden");
		// $(".adjust-form-loader").removeClass("hidden");

		var spinner 	= '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
		var html = $(target).html();

		$(target).html(spinner);

		date = $(".over-time-form").find(".field-hidden-date").val();
		employee_id = $(".over-time-form").find(".field-hidden-employee-id").val();
		token = $(".ot-token").val();

		$.ajax(
		{
			url:"/member/payroll/employee_timesheet/adjustment_form_approve",
			dataType:"json",
			data:{"date":date, "employee_id":employee_id,"_token":token, 'approve':approve},
			type:"post",
			success: function(data)
			{
				$(".adjust-form-icon").removeClass("hidden");
				$(".adjust-form-loader").addClass("hidden");
				$("#global_modal").modal("hide");
				action_compute_work_hours();
				action_recompute_loading(date);
			}
		});
	}
	function action_compute_overtime_form()
	{
		date = $(".over-time-form").find(".field-hidden-date").val();
		// alert(date);
		employee_id = $(".over-time-form").find(".field-hidden-employee-id").val();

		if(adjust_form_request !== null)
		{
			adjust_form_request.abort();
		}

		$(".time-summary-adjustment.new").text("__:__").css({"color":"#000", "font-weight":"normal"});

		adjust_form_request = $.ajax(
		{
			url:"/member/payroll/employee_timesheet/json_process_time_single/" + date + "/" + employee_id,
			dataType:"json",
			data:  $(".over-time-form").serialize(),
			type:"post",
			success: function(data)
			{
				
				$(".old_regular_hours").text(data.pending_timesheet.regular_hours);
				$(".old_night_differential").text(data.pending_timesheet.night_differential);
				$(".old_early_overtime").text(data.pending_timesheet.early_overtime);
				$(".old_late_overtime").text(data.pending_timesheet.late_overtime);
				$(".old_extra_day").text(data.pending_timesheet.extra_day_hours);
				$(".old_rest_day").text(data.pending_timesheet.rest_day_hours);

				$(".new_regular_hours").text(data.approved_timesheet.regular_hours);
				$(".new_night_differential").text(data.approved_timesheet.night_differential);
				$(".new_early_overtime").text(data.approved_timesheet.early_overtime);
				$(".new_late_overtime").text(data.approved_timesheet.late_overtime);
				$(".new_extra_day").text(data.approved_timesheet.extra_day_hours);
				$(".new_rest_day").text(data.approved_timesheet.rest_day_hours);


				$(".time-summary-adjustment").each(function()
				{
					if($(this).text() == "00:00")
					{
						$(this).css(
						{
							"color":"gray",
							"font-weight":"normal"
						});
					}
					else
					{
						$(this).css(
						{
							"color":"black",
							"font-weight":"bold"
						});
					}
				});	

				$(".time-summary-adjustment.new").each(function()
				{
					s = $(this).attr("s");
					old = $(".time-summary-adjustment.old[s=" + s + "]");

					if($(this).text() != old.text())
					{
						$(this).css({"color":"green", "font-weight":"bold"});
					};
				});

			}
		});
	}
	function action_load_timesheet()
	{
		$(".load-timesheet").html("<div class='timesheet-table-loading'><div class='spin'><i class='table-loader fa fa-spinner fa-pulse fa-fw'></i></div> <div>LOADING</div> </div>");

		var selected_employee = $(".choose-employee").val();
		var payroll_period_id = $("#payroll_period_id").val();
		var employee_name = $(".choose-employee").find(':selected').text();
		$(".employee-name").html(employee_name);

		if(selected_employee == null || selected_employee == "" || selected_employee == 0 || selected_employee == undefined)
		{ 
			$(".load-timesheet").load('/member/payroll/no_records');
		}
		else
		{
			$(".load-timesheet").load('/member/payroll/employee_timesheet/timesheet/' + selected_employee + '/' + payroll_period_id, function()
			{
				action_compute_work_hours();
				event_time_entry();
			});
		}
		
	}
	function event_change_employee()
	{
		$("body").on("change", ".choose-employee", function(e)
		{
			action_load_timesheet();
		});
	}
	function event_create_sub_time()
	{
		$("body").on("click", ".create-sub-time", function(e)
		{
			var date = $(e.currentTarget).closest("tr").attr("date");
			var icon = $(e.currentTarget);
			var html = icon.html();

			var spinner = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
			
			icon.html(spinner);
			// action_create_sub_time($date);
			var employee_id = $("#employee_id").val();
			$.ajax({
				url 	: 	'/member/payroll/employee_timesheet/new_time_tr',
				type 	: 	'POST',
				data 	: 	{
					date:date,
					employee_id:employee_id,
					_token:$("#_token").val()
				},
				success	: 	function(result)
				{
					try
					{
						result = JSON.parse(result);
					}
					catch(err){}

					icon.html(html);
					$append = $(".sub-time-container").html();
					$(".time-record[date='" + date + "']:last").after($append);
			
					$last_time_out = $(".time-record[date='" + date + "']:last").find(".time-out").val();

					/* UPDATE DATA FOR NEW SUB */
					$("tbody").find(".time-record.new-sub").attr("date", date);
					$("tbody").find(".time-record.new-sub").attr("data-id", result.id);
					$("tbody").find(".time-record.new-sub").attr("id", result.id);
					// $("tbody").find(".time-record.new-sub").find(".date").val(date);
					$("tbody").find(".time-record.new-sub").find(".date").val(result.id);
					$("tbody").find(".time-record.new-sub").find(".time-in").val('');
					$("tbody").find(".time-record.new-sub").find(".time-out").val('');
					$arr_count = new_sub_ctr++;
					$("tbody").find(".time-record.new-sub").find(".date").attr("name", "date[" + date + "][" + $arr_count + "]");
					$("tbody").find(".time-record.new-sub").find(".time-in").attr("name", "time_in[" + date + "][" + $arr_count + "]");
					$("tbody").find(".time-record.new-sub").find(".time-out").attr("name", "time_out[" + date + "][" + $arr_count + "]");
					
					$("tbody").find(".time-record.new-sub").find(".hidden-time-in").attr("name", "time_in2[" + date + "][" + $arr_count + "]");
					$("tbody").find(".time-record.new-sub").find(".hidden-time-out").attr("name", "time_out2[" + date + "][" + $arr_count + "]");

					/* for comment/remarks */
					var remarks = $("tbody").find(".time-record.new-sub").find(".new-comment");
					var remark_link = remarks.attr('link');
					remarks.attr('link', remark_link + result.id);
					remarks.removeClass('new-comment');

					/* for company */
					var company = $("tbody").find(".time-record.new-sub").find(".new-company");
					var company_link = company.attr('link');
					company.attr('link', company_link + result.id);
					company.attr('title', result.company);
					company.removeClass('new-company');

					/* ADD EVENT TO NEW SUB */
					event_time_entry();

					/* REMOVE NEW SUB REFERENCE */
					$("tbody").find(".time-record.new-sub").removeClass("new-sub");
				},
				error 	: 	function(err)
				{
					icon.html(html);
				}
			});
		});
	}
	function event_delete_sub_time()
	{
		$("body").on("click", ".delete-sub-time", function(e)
		{
			if(confirm("Are you sure you want to delete this time-entry?"))
			{
				$date = $(e.currentTarget).closest("tr").attr("date");

				var spinner = '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
				var html 	= $(this).html();

				$(this).html(spinner);
				var id = $(e.currentTarget).closest("tr").attr('data-id');

				$.ajax({
					url 	: 	'/member/payroll/employee_timesheet/remove_time_record',
					type 	: 	'POST',
					data 	: 	{
						_token:$("#_token").val(),
						id:id
					},
					success : 	function(result)
					{
						$(e.currentTarget).closest("tr").remove();
						action_recompute_loading($date);
						action_compute_work_hours();

					},
					error 	: 	function(error)
					{
						$(this).html(html);
						toastr.error('Error, something went wrong.');
					}
 				});
				
			}
		});
	}



	function event_change_time_in_out()
	{
		// $("body").on("change", ".time-in", function(e)
		// {
		// 	$(e.currentTarget).closest("tr").find(".ot-approved").val("00:00");

		// 	var id = $(e.currentTarget).closest("tr").attr('data-id');

		// 	/* EMPTY BOTH IF ONE IS EMPTY */
		// 	if($(e.currentTarget).val() == "")
		// 	{
		// 		$(e.currentTarget).closest("tr").find(".time-out").val("");
		// 	}
		// 	else
		// 	{
		// 		if($(e.currentTarget).closest("tr").find(".time-out").val() == "")
		// 		{
		// 			$(e.currentTarget).closest("tr").find(".time-out").val(default_time_out);
		// 		}
		// 	}

		// 	var time_in = $(this).val();
		// 	var time_out = $(e.currentTarget).closest("tr").find(".time-out").val();



		// 	$date = $(e.currentTarget).closest("tr").attr("date");
		// 	// action_recompute_loading($date);
		// 	// action_compute_work_hours();

		// 	save_time_record();
		// });

		// $("body").on("change", ".time-out", function(e)
		// {
		// 	$(e.currentTarget).closest("tr").find(".ot-approved").val("00:00");

		// 	var id = $(e.currentTarget).closest("tr").attr('data-id');

		// 	/* EMPTY BOTH IF ONE IS EMPTY */
		// 	if($(e.currentTarget).val() == "")
		// 	{
		// 		$(e.currentTarget).closest("tr").find(".time-in").val("");
		// 	}
		// 	else
		// 	{
		// 		if($(e.currentTarget).closest("tr").find(".time-in").val() == "")
		// 		{
		// 			$(e.currentTarget).closest("tr").find(".time-in").val(default_time_in);
		// 		}
		// 	}


		// 	$date = $(e.currentTarget).closest("tr").attr("date");
		// 	action_recompute_loading($date);
		// 	action_compute_work_hours();
		// });

		// $("body").on("change", ".break-time", function(e)
		// {
		// 	$date = $(e.currentTarget).closest("tr").attr("date");
		// 	action_recompute_loading($date);
		// 	action_compute_work_hours();
		// });

		$("body").on("change", ".ot-approved", function(e)
		{
			action_compute_work_hours();
		});

		$("body").on('change', '.time-entry-record', function(e)
		{
			var tr 			= $(this).parents("tr");
			var time_in 	= tr.find('.time-in').val();
			var time_out 	= tr.find('.time-out').val();

			try
			{
				tr.find('.hidden-time-in').val(time_in);
				tr.find('.hidden-time-out').val(time_out);
			}
			catch(err){}
			

			var break_	 	= tr.find('.break-time').val();
			var time_id 			= tr.attr('data-id');
			var employee_id = $("#employee_id").val();
			var date 		= tr.attr('date');

			var check 		= tr.find('.table-check');
			var loader 		= tr.find('.table-loader');

			check.addClass('hidden');
			loader.removeClass('hidden');

			if(break_ == undefined)
			{
				break_ = null;
			}

			$.ajax({
				url 	: 	'/member/payroll/employee_timesheet/save_time_record',
				type 	: 	'POST',
				data 	: 	{
					time_in:time_in,
					time_out:time_out,
					break_:break_,
					time_id:time_id,
					date:date,
					employee_id:employee_id,
					_token:$('#_token').val()
				},
				success : 	function(result)
				{
					check.removeClass('hidden');
					loader.addClass('hidden');
					action_compute_work_hours();
					action_recompute_loading(date);
				},
				error 	: 	function(error)
				{
					toastr.error('Error, please try again.');
					check.removeClass('hidden');
					loader.addClass('hidden');
				}
			});

		});
	}

	function event_focus_edit()
	{
		$("body").on("focusin", ".text-table", function(e)
		{
			$(e.currentTarget).closest("tr").addClass("focus");
		});
		$("body").on("focusout", ".text-table", function(e)
		{
			$(e.currentTarget).closest("tr").removeClass("focus");
		});
		$("body").on("focusout", ".edit-data", function(e)
		{
			$(e.currentTarget).closest("tr").find(".time-in").focus();
		});

	}
	function event_time_entry()
	{
		$(".time-entry").timeEntry('destroy');
		$(".time-entry-24").timeEntry('destroy');
		$(".time-entry.time-in").timeEntry({ampmPrefix: ' ', defaultTime: new Date(0, 0, 0, 0, 0, 0)});
		$(".time-entry.time-out").timeEntry({ampmPrefix: ' ', defaultTime: new Date(0, 0, 0, 12, 0, 0)});
		$(".time-entry-24").timeEntry({show24Hours: true, defaultTime: new Date(0, 0, 0, 0, 0, 0)});
	}
	function action_recompute_loading(date)
	{	
		$(".time-record.main[date='" + date + "']").find(".table-loader").removeClass("hidden");
		$(".time-record.main[date='" + date + "']").find(".table-check").addClass("hidden");
		$(".time-record.main[date='" + date + "']").find(".normal-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".overtime-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".extra-day-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".rest-day-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".total-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".late-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".night-differential").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".special-holiday-hours").text("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".regular-holiday-hours").text("__:__").css("color", "#000");
		// $(".time-record.main[date='" + date + "']").find(".break").val("__:__").css("color", "#000");
		$(".time-record.main[date='" + date + "']").find(".under-time").text("__:__").css("color", "#000");
		$(".time-record[date='" + date + "']").find(".approved-in").text("__:__ __").css("color", "#000");
		$(".time-record[date='" + date + "']").find(".approved-out").text("__:__ __").css("color", "#000");
	}

	function action_create_sub_time(date, $time_in = "", $time_out = "")
	{

		var employee_id = $("#employee_id").val();
		$.ajax({
			url 	: 	'/member/payroll/employee_timesheet/save_time_record',
			type 	: 	'POST',
			data 	: 	{
				date:date,
				employee_id:employee_id,
				_token:$("#_token").val()
			},
			success	: 	function(result)
			{

				$append = $(".sub-time-container").html();
				$(".time-record[date='" + date + "']:last").after($append);
		
				$last_time_out = $(".time-record[date='" + date + "']:last").find(".time-out").val();

				/* UPDATE DATA FOR NEW SUB */
				$("tbody").find(".time-record.new-sub").attr("date", date);
				$("tbody").find(".time-record.new-sub").attr("data-id", result);
				// $("tbody").find(".time-record.new-sub").find(".date").val(date);
				$("tbody").find(".time-record.new-sub").find(".date").val(result);
				$("tbody").find(".time-record.new-sub").find(".time-in").val($time_in);
				$("tbody").find(".time-record.new-sub").find(".time-out").val($time_out);
				$arr_count = new_sub_ctr++;
				$("tbody").find(".time-record.new-sub").find(".date").attr("name", "date[" + date + "][" + $arr_count + "]");
				$("tbody").find(".time-record.new-sub").find(".time-in").attr("name", "time_in[" + date + "][" + $arr_count + "]");
				$("tbody").find(".time-record.new-sub").find(".time-out").attr("name", "time_out[" + date + "][" + $arr_count + "]");
				/* ADD EVENT TO NEW SUB */
				event_time_entry();

				/* REMOVE NEW SUB REFERENCE */
				$("tbody").find(".time-record.new-sub").removeClass("new-sub");
			},
			error 	: 	function(err)
			{

			}
		});

		
	}

	function action_compute_work_hours()
	{
		if(timesheet_request !== null)
		{
			timesheet_request.abort();
		}

		timesheet_request = $.ajax(
		{
			url:"/member/payroll/employee_timesheet/json_process_time",
			dataType:"json",
			data: $(".payroll-form").serialize(),
			type:"post",
			success: function(data)
			{
				$.each(data, function(key, val)
				{
					update_time_record_on_table(val);
				});

				$(".table-loader").addClass("hidden");
				$(".table-check").removeClass("hidden");

				/* TURN ZEROES IN TABLE TO GRAY */
				$(".zerotogray").each(function()
				{
					if($(this).text() == "00:00")
					{
						$(this).css("color", "gray");
					}
					else
					{
						$(this).css("color", "#000");
					}
				});

				action_reload_summary();

			},
			error: function()
			{
			}
		});
	}

	function action_reload_summary()
	{
		var selected_employee = $(".choose-employee").val();
		var payroll_period_id = $("#payroll_period_id").val();
		var url = '/member/payroll/employee_timesheet/timesheet/' + selected_employee + '/' + payroll_period_id;
		$(".div-summary-table").load(url + ' .div-summary-table', function(){});
	}

	function update_time_record_on_table(val)
	{
		$(".time-record[date='" + val.date + "']").attr("tid", val.payroll_time_sheet_id);
		$(".time-record[date='" + val.date + "']").find(".normal-hours").text(val.approved_timesheet.regular_hours);
		$(".time-record[date='" + val.date + "']").find(".overtime-hours.late").text(val.approved_timesheet.late_overtime);
		$(".time-record[date='" + val.date + "']").find(".overtime-hours.early").text(val.approved_timesheet.early_overtime);
		$(".time-record[date='" + val.date + "']").find(".extra-day-hours").text(val.approved_timesheet.extra_day_hours);
		$(".time-record[date='" + val.date + "']").find(".rest-day-hours").text(val.approved_timesheet.rest_day_hours);
		$(".time-record[date='" + val.date + "']").find(".total-hours").text(val.approved_timesheet.total_hours);
		$(".time-record[date='" + val.date + "']").find(".late-hours").text(val.approved_timesheet.late_hours);
		$(".time-record[date='" + val.date + "']").find(".night-differential").text(val.approved_timesheet.night_differential);
		$(".time-record[date='" + val.date + "']").find(".special-holiday-hours").text(val.approved_timesheet.special_holiday_hours);
		$(".time-record[date='" + val.date + "']").find(".regular-holiday-hours").text(val.approved_timesheet.regular_holiday_hours);
		$(".time-record[date='" + val.date + "']").find(".break").val(val.approved_timesheet.break);
		$(".time-record[date='" + val.date + "']").find(".under-time").text(val.approved_timesheet.under_time);
		$(".time-record[date='" + val.date + "']").each(function(key)
		{

			var attr = $(this).find(".time-entry.time-in").attr('disabled');
			
			if (typeof attr !== typeof undefined && attr !== false) {
			  // Element has this attribute
			}
			else
			{
				$(this).find(".time-entry.time-in").timeEntry("enable");
				$(this).find(".time-entry.time-out").timeEntry("enable");
			}
			
			$(this).find(".create-sub-time").show();

			if(val.pending_timesheet.time_record)
			{
				$(this).find(".time-entry.time-in").val(val.pending_timesheet.time_record[key].time_in).css("color", "#000");
				$(this).find(".time-entry.time-out").val(val.pending_timesheet.time_record[key].time_out).css("color", "#000");
				$(this).find(".approved-in").text(val.approved_timesheet.time_record[key].time_in).css("color", "#000");
				$(this).find(".approved-out").text(val.approved_timesheet.time_record[key].time_out).css("color", "#000");

				if(val.approved_timesheet.time_record[key].time_in == "" || val.approved_timesheet.time_record[key].time_out == "")
				{
					$(this).find(".approved-in").text("NO TIME").css("color", "gray");
					$(this).find(".approved-out").text("NO TIME").css("color", "gray");
				}

				/* MARK RED IF APPROVED TIME SHEET IS NOT THE SAME WITH PENDING TIME SHEET */
				if((val.approved_timesheet.time_record[key].time_in != val.pending_timesheet.time_record[key].time_in) || (val.approved_timesheet.time_record[key].time_out != val.pending_timesheet.time_record[key].time_out))
				{
					$(this).find(".approved-in").css("color", "red").addClass("load-overtime-form");
					$(this).find(".approved-out").css("color", "red").addClass("load-overtime-form");
				}
			}

			else
			{
				$(this).find(".time-entry.time-in").val("");
				$(this).find(".time-entry.time-out").val("");
				$(this).find(".approved-in").text("NO TIME").css("color", "gray");
				$(this).find(".approved-out").text("NO TIME").css("color", "gray");
			}

			/* MARK GREEN IF PAYROLL TIMSHEET WAS APPROVED */
			if(val.payroll_time_sheet_approved == 1)
			{
				// $(this).find(".approved-in").css("color", "green").removeClass("load-overtime-form");
				// $(this).find(".approved-out").css("color", "green").removeClass("load-overtime-form");
				$(this).find(".approved-in").css("color", "green").addClass("load-overtime-form");
				$(this).find(".approved-out").css("color", "green").addClass("load-overtime-form");
				$(this).find(".time-entry.time-in").timeEntry("disable");
				$(this).find(".time-entry.time-out").timeEntry("disable");
				$(this).find(".table-check").removeClass("fa-unlock-alt").addClass("fa-lock").css("color", "black");
				$(this).find(".create-sub-time").hide();
			}

			else
			{
				$(this).find(".table-check").removeClass("fa-lock").addClass("fa-unlock-alt").css("color", "gray");
			}

		});

	}
	function action_convert_time_str_to_seconds(time_str)
	{
	    // Extract hours, minutes and seconds
	    var parts = time_str.split(':');
	    // compute  and return total seconds
	    return parts[0] * 3600 + // an hour has 3600 seconds
	           parts[1] * 60 +   // a minute has 60 seconds
	           +parts[2];        // seconds
	}


	/* HELPERS */
	function check_greater($value, $compare)
	{
		var start_actual_time  =  "01/01/2012 " + $value;
		var end_actual_time    =  "01/01/2012 " + $compare;

		start_actual_time = new Date(start_actual_time);
		end_actual_time = new Date(end_actual_time);

		var diff = end_actual_time - start_actual_time;

		if(start_actual_time > end_actual_time)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	function deduct_two_time($from, $to)
	{
		var start_actual_time  =  "01/01/2012 " + $from;
		var end_actual_time    =  "01/01/2012 " + $to;

		start_actual_time = new Date(start_actual_time);
		end_actual_time = new Date(end_actual_time);

		if(end_actual_time < start_actual_time)
		{
			end_actual_time = start_actual_time;
		}

		var diff = end_actual_time - start_actual_time;

		var diffSeconds = diff/1000;
		var HH = Math.floor(diffSeconds/3600);
		var MM = Math.floor(diffSeconds%3600)/60;

		var formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM)
		return formatted;
	}
	function add_two_time(start, end)
	{
	  times = [];
	  times1 = start.split(':');
	  times2 = end.split(':');

	  for (var i = 0; i < 3; i++) {
	    times1[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i])
	    times2[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i])
	    times[i] = times1[i] + times2[i];
	  }

	  var MM = times[1];
	  var HH = times[0];


	  if (MM % 60 === 0)
	  {
			res = MM / 60;
			HH += res;
			MM = MM - (60 * res);
	  }
		var formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM);
	  return formatted;
	}
	function convert_to_24h(time_str)
	{
		if(time_str == "")
		{
			time_str = "12:00AM";
		}
	    // Convert a string like 10:05:23 PM to 24h format, returns like [22,5,23]
	    var time = time_str.match(/(\d+):(\d+)(\w)/);
	    var hours = Number(time[1]);
	    var minutes = Number(time[2]);
	    var meridian = time[3].toLowerCase();

	    if (meridian == 'p' && hours < 12) {
	      hours = hours + 12;
	    }
	    else if (meridian == 'a' && hours == 12) {
	      hours = hours - 12;
	    }

	    return hours + ":" + minutes + ":00";
	 }

}	


function submit_done(data)
{
	try
	{
		data = JSON.parse(data);
	}
	catch(err){}
	
	data.element.modal("toggle");
	if(data.function_name == 'get_company')
	{	
		$("#"+data.id).find('.fa-university').attr('title', data.company);
	}
}	