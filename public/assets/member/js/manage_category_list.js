var manage_category_list = new manage_category_list();

function manage_category_list()
{
	init();
	function init()
	{
		document_ready();
	}
	function document_ready()
	{
		caret_toggle_event();
	}

	function caret_toggle_event()
	{
		$(".toggle-category").unbind("click");

		$(".toggle-category").bind("click",function ()
		{
			var tr_category = $(this);
			// "fa-caret-down fa-caret-right"
			tr_category.toggleClass("fa-caret-down fa-caret-right");
			// tr_category.toggleClass(
			// 	function(e)
			// 	{
			// 		$(this).removeClass("fa-caret-right");
			// 		$(this).addClass("fa-caret-down");
			// 		$(".tr-parent-"+content).css("display","table-row");
			// 		// alert("fa-caret-right");
			// 	},
			// 	function(e)
			// 	{
			// 		$(this).addClass("fa-caret-right");
			// 		$(this).removeClass("fa-caret-down");
			// 		$(".tr-parent-"+content).css("display","none");
			// 		var find = $(".tr-parent-"+content).find("toggle-category");
			// 		console.log(find);
			// 		// alert("fa-caret-right");
			// 	}
			// );
			var content = $(this).data("content");
			console.log(content);
			$(".tr-parent-"+content).toggle();
			// check_display_action();
		});
		
	}


	function check_display_action()
	{
		$(".table-category tr").each(function()
		{
			var category = $(this).find("toggle-category");
			var content = category.attr("data-content");
			// console.log(category);
			$(this).find("toggle-category").toggleClass(
				function(e)
				{
					$(this).removeClass("fa-caret-right");
					$(this).addClass("fa-caret-down");
					$(".tr-parent-"+content).css("display","table-row");
					alert("fa-caret-right");
				},
				function(e)
				{
					$(this).addClass("fa-caret-right");
					$(this).removeClass("fa-caret-down");
					$(".tr-parent-"+content).css("display","none");
					var find = $(".tr-parent-"+content).find("toggle-category");
					console.log(find);
					alert("fa-caret-right");
				}
			);

		});
	}

	function toggle_tr_row_action(content = 0)
	{

	}
}