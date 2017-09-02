var send_message_timesheet = new send_message_timesheet();

function send_message_timesheet()
{
	init();

	function init()
	{
		sumbit_message();
	}


	function sumbit_message()
	{
		// $(".form-message").unbind("submit");
		// $(".form-message").bind("submit", function(e)
		// {
		// 	e.preventDefault();
		// 	var target = $(this).data("btn");

		// 	var html = $(target).html();
		// 	$(target).html(misc('spinner'));
		// 	$.ajax({
		// 		url 	: 	$(this).attr("action"),
		// 		type 	: 	$(this).attr("method"),
		// 		data 	: 	$(this).serialize(),
		// 		success : 	function(data)
		// 		{
		// 			reload_message();
		// 			$(target).html(html);
		// 		},
		// 		error 	: 	function(err)
		// 		{
		// 			$(target).html(html);
		// 		}
		// 	});
		// });

		$(".btn-send-message").unbind("click");
		$(".btn-send-message").bind("click", function(){
			var form = $(".form-message");
			var target = form.data("btn");

			var html = $(target).html();
			$(target).html(misc('spinner'));
			$.ajax({
				url 	: 	form.attr("action"),
				type 	: 	form.attr("method"),
				data 	: 	$(".form-message :input").serialize(),
				success : 	function(data)
				{
					reload_message();
					$(target).html(html);
				},
				error 	: 	function(err)
				{
					$(target).html(html);
				}
			});
		});
	}

	function reload_message()
	{

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