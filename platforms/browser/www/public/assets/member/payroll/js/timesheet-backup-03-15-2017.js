var timesheet = new timesheet();

function timesheet()
{
	init();

	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		})
	}
	function document_ready()
	{
		action_convert_default_time_to_24_hour();
		event_focus_edit();
		event_time_entry();
		event_change_time_in_out();
		event_create_sub_time();
		event_delete_sub_time();
		action_compute_work_hours();
	}
	function action_convert_default_time_to_24_hour()
	{
		default_time_in = convert_to_24h(default_time_in);
		default_time_out = convert_to_24h(default_time_out);
	}
	function event_create_sub_time()
	{
		$("body").on("click", ".create-sub-time", function(e)
		{
			$date = $(e.currentTarget).closest("tr").attr("date");
			action_create_sub_time($date);
			action_compute_work_hours();
		});
	}
	function event_delete_sub_time()
	{
		$("body").on("click", ".delete-sub-time", function(e)
		{
			if(confirm("Are you sure you want to delete this time-entry?"))
			{
				$date = $(e.currentTarget).closest("tr").remove();
				action_compute_work_hours();
			}
		});
	}
	function event_change_time_in_out()
	{
		$("body").on("focusout", ".time-in", function(e)
		{
			$(e.currentTarget).closest("tr").find(".ot-approved").val("00:00");

			/* EMPTY BOTH IF ONE IS EMPTY */
			if($(e.currentTarget).val() == "")
			{
				$(e.currentTarget).closest("tr").find(".time-out").val("");
			}

			action_compute_work_hours();
		});

		$("body").on("focusout", ".time-out", function(e)
		{
			$(e.currentTarget).closest("tr").find(".ot-approved").val("00:00");

			/* EMPTY BOTH IF ONE IS EMPTY */
			if($(e.currentTarget).val() == "")
			{
				$(e.currentTarget).closest("tr").find(".time-in").val("");
			}

			action_compute_work_hours();
		});

		$("body").on("focusout", ".break-time", function(e)
		{
			action_compute_work_hours();
		});

		$("body").on("focusout", ".ot-approved", function(e)
		{
			action_compute_work_hours();
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
		$(".time-entry").timeEntry();
		$(".time-entry-24").timeEntry({show24Hours: true});
	}
	function action_create_sub_time(date)
	{
		$append = $(".sub-time-container").html();
		$(".time-record[date='" + date + "']:last").after($append);
		
		$last_time_out = $(".time-record[date='" + date + "']:last").find(".time-out").val();
		$time_in = $last_time_out;
		$time_out = add_two_time(convert_to_24h($last_time_out), "01:00");

		/* UPDATE DATA FOR NEW SUB */
		$("tbody").find(".time-record.new-sub").attr("date", date);
		$("tbody").find(".time-record.new-sub").find(".time-in").val($time_in);
		$("tbody").find(".time-record.new-sub").find(".time-out").val($time_out);

		/* ADD EVENT TO NEW SUB */
		event_time_entry();

		/* REMOVE NEW SUB REFERENCE */
		$("tbody").find(".time-record.new-sub").removeClass("new-sub");
	}
	function action_compute_work_hours()
	{
		/* COMPUTE TOTAL HOURS PER LINE */
		$(".time-record").each(function(key, val)
		{		
			var time_in = convert_to_24h($(this).find(".time-in").val());
			var time_out = convert_to_24h($(this).find(".time-out").val());

			/* IF BLANK TIME-IN */
			if(time_in == "" || time_out == "")
			{
				var total_hours = "00:00";
			}
			else
			{
				var total_hours = deduct_two_time(time_in, time_out);
			}

			var total_normal_hours = total_hours;
			var total_early_overtime = "00:00";
			var total_late_overtime = "00:00";


			if(time_in == "0:0:00")
			{
				total_early_overtime = "00:00";
			}
			else
			{
				if(check_greater(default_time_in, time_in)) //CHECK FOR EARLY OVERTIME
				{
					var total_early_overtime = deduct_two_time(time_in, default_time_in);
				}
			}


			if(check_greater(time_out, default_time_out))
			{
				var total_late_overtime = deduct_two_time(default_time_out, time_out);
			}

			total_normal_hours = deduct_two_time(total_early_overtime, total_normal_hours);
			total_normal_hours = deduct_two_time(total_late_overtime, total_normal_hours);

			$(this).attr("total_hours", total_hours);
			$(this).attr("total_normal_hours", total_normal_hours);
			$(this).attr("total_early_overtime", total_early_overtime);
			$(this).attr("total_late_overtime", total_late_overtime);
		});

		/* COMPUTE TOTAL HOURS PER DATE */
		$(".time-record.main").each(function(key, val)
		{
			count_entry_per_date = $(".time-record[date='" + $(this).attr("date") + "']").length;
			
			if(count_entry_per_date > 1)
			{
				var total_hours = "00:00";
				var total_normal_hours = "00:00";
				var total_early_overtime = "00:00";
				var total_late_overtime = "00:00";

				$(".time-record[date='" + $(this).attr("date") + "']").each(function(key, val)
				{
					total_hours = add_two_time(total_hours, $(this).attr("total_hours"));
					total_normal_hours = add_two_time(total_normal_hours, $(this).attr("total_normal_hours"));
					total_early_overtime = add_two_time(total_early_overtime, $(this).attr("total_early_overtime"));
					total_late_overtime = add_two_time(total_late_overtime, $(this).attr("total_late_overtime"));
					$(this).attr("total_hours", "00:00");
					$(this).attr("total_normal_hours", "00:00");
					$(this).attr("total_early_overtime", "00:00");
					$(this).attr("total_late_overtime", "00:00");
				});

				$(".time-record.main[date='" + $(this).attr("date") + "']").attr("total_hours", total_hours);
				$(".time-record.main[date='" + $(this).attr("date") + "']").attr("total_normal_hours", total_normal_hours);
				$(".time-record.main[date='" + $(this).attr("date") + "']").attr("total_early_overtime", total_early_overtime);
				$(".time-record.main[date='" + $(this).attr("date") + "']").attr("total_late_overtime", total_late_overtime);
			}
		});

		switch(time_rule)
		{
			case "flexistrict": action_compute_work_hours_flexistrict(); break;
			case "timestrict": action_compute_work_hours_timestrict(); break;
			default: alert("Time Rule Error: Contact Administrator for Support");
		}

		action_check_validation();

	}
	function action_check_validation()
	{
		$(".time-record.main").each(function(key, val)
		{
			action_check_overtime($(this));
		});
	}
	function action_check_overtime($this)
	{
		/* OVERTIME VALIDATION */
		var approved_overtime = $this.find(".ot-approved").val();
		var total_early_overtime = $this.attr("total_early_overtime");
		var total_late_overtime = $this.attr("total_late_overtime");
		var total_overtime = add_two_time(total_early_overtime, total_late_overtime);

		if(check_greater(approved_overtime, total_overtime))
		{
			$this.find(".ot-approved").val(total_overtime);
			action_compute_work_hours();
		}

		if($this.find(".ot-approved").val() == total_overtime)
		{
			$this.find(".overtime-hours").removeClass("red");
			$this.find(".overtime-hours").addClass("green");
		}
	}
	function action_compute_work_hours_timestrict()
	{
		/* COMPUTE PER DATE*/
		$(".time-record.main").each(function(key, val)
		{
			var current_date = $(this).attr("date");
			var total_break = $(this).find(".break-time").val();
			var total_normal_hours = $(this).attr("total_normal_hours");
			var total_early_overtime = $(this).attr("total_early_overtime");
			var total_late_overtime = $(this).attr("total_late_overtime");
			
			total_normal_hours = deduct_two_time(total_break, total_normal_hours);

			var total_overtime_hours = "00:00";
 			$(this).find(".normal-hours").text(total_normal_hours);
 			$(this).find(".overtime-hours.early").text(total_early_overtime);
 			$(this).find(".overtime-hours.late").text(total_late_overtime);

 			total_overtime_hours = total_early_overtime + total_late_overtime;

 			if(check_greater(total_overtime_hours, '00:00'))
 			{
 				$(this).find(".overtime-hours").addClass("red");
 			}
 			else
 			{
 				$(this).find(".overtime-hours").removeClass("red");
 			}

		});
	}
	function action_compute_work_hours_flexistrict()
	{
		/* COMPUTE PER DATE*/
		$(".time-record.main").each(function(key, val)
		{
			var current_date = $(this).attr("date");
			var total_hours = $(this).attr("total_hours");
			var total_break = $(this).find(".break-time").val();
			var total_hours_less_break = deduct_two_time(total_break, total_hours);
			var total_early_overtime = "00:00";
			var total_late_overtime = "00:00";

			if(check_greater(total_hours_less_break, '08:00'))
			{
				total_normal_hours = "08:00";
				total_overtime_hours = deduct_two_time('08:00', total_hours_less_break);
				total_late_overtime = total_overtime_hours;
				if(check_greater(default_time_in, convert_to_24h($(this).find(".time-in").val())))
				{
					total_early_overtime = deduct_two_time(convert_to_24h($(this).find(".time-in").val()), default_time_in);
					total_late_overtime = deduct_two_time(total_early_overtime, total_late_overtime);
				}
			}
			else
			{
				total_normal_hours = total_hours_less_break;
				total_overtime_hours = "00:00";
			}

 			$(this).find(".normal-hours").text(total_normal_hours);
 			$(this).find(".overtime-hours.early").text(total_early_overtime);
 			$(this).find(".overtime-hours.late").text(total_late_overtime);
 			if(check_greater(total_overtime_hours, '00:00'))
 			{
 				$(this).find(".overtime-hours").addClass("red");
 			}
 			else
 			{
 				$(this).find(".overtime-hours").removeClass("red");
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


	  if (MM % 60 === 0) {
	    res = MM / 60;
	    HH += res;
	    MM = MM - (60 * res);
	  }
		var formatted = ((HH < 10)?("0" + HH):HH) + ":" + ((MM < 10)?("0" + MM):MM)
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