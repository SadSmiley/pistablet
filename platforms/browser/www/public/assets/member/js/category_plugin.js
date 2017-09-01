var category_plugin = new category_plugin();

function category_plugin()
{
	init();
	function init()
	{
		document_ready()
	}
	function document_ready()
	{
		is_sub_category_check_event();
		select_parent_event();
		outside_click_event();
		search_keypress_event();

		iniatilize_select();
	}
	function iniatilize_select()
	{
		$('.type_category').globalDropList(
		{ 
    		placeholder : "Select category type..",
			width : '100%',
    		hasPopup: "false",
		});
	}
	/* TOGGLE ENABLE OF PARENT CATEGORY */
	function is_sub_category_check_event()
	{

		$(".is_sub_category").unbind("change");
		$(".is_sub_category").bind("change", function()
		{
			
			if($(this).is(':checked'))
			{
				$(".parent_category").removeAttr("disabled");
				$(".parent_category").attr("required",true);
				// $(".parent_category").attr("readonly",true);
			}
			else
			{
				// $(".parent_category").removeAttr("readonly");
				$('.type_category').globalDropList("enabled");
				$(".parent_category").attr("disabled",true);
				$(".parent_category").val("");
				$(".parent_category").removeAttr("required");
			}
		});
	}

	function select_parent_event()
	{
		$(".parent_category").unbind("click");
		$(".parent_category").bind("click", function(e)
		{
			if($(".is_sub_category").is(':checked'))
			{
				e.preventDefault();
				// $(".parent_category-list").slideDown("fast");
				$(".parent_category-list").css("display","block");
				return false;
			}
		});
		$(".category-list").unbind("click");
		$(".category-list").bind("click", function()
		{
			$(".parent_category-list").slideUp("fast");
			var html = $(this).html();
			var content = $(this).data("content");
			var category_type = $(this).attr("category_type");
			console.log(category_type);
			event_change_category_type(category_type);

			$(".parent_category").val(html);
			$(".hidden_parent_category").val(content);
		});
	}
	function event_change_category_type(category_type)
	{
		$('.type_category').val(category_type).change().globalDropList("disabled");
	}
	function search_keypress_event()
	{
		$(".parent_category").unbind("keyup");
		$(".parent_category").bind("keyup", function()
		{
			var search = $(this).val();
			var type_category = $(".type_category").val();
			search_action(search, type_category);
		});

		$(".type_category").unbind("change");
		$(".type_category").bind("change", function()
		{
			// search_action($(".parent_category").val(), $(this).val());
		});
	}



	function outside_click_event()
	{
		$(document).on("click", function(e)
		{
			// $(".parent_category-list").slideUp();
			$(".parent_category-list").css("display","none");
			// e.preventDefault();
		});
	}

	// function submit_event()
	// {
	// 	$("#modal-category-form").one("submit", function(e)
	// 	{
	// 		e.preventDefault();
	// 		var action = $(this).attr("action");
	// 		var method = $(this).attr("method");
	// 		var btn_html = $(".btn-save-submit").html();
	// 		$(".btn-save-submit").html(misc('spinner'));

	// 		$.ajax({
	// 			url 	: 	action,
	// 			type 	: 	method,
	// 			data 	: 	$(this).serialize(),
	// 			success : 	function(result)
	// 			{
 //        			// $("#global_modal").modal("hide");
 //        			// $('.multiple_global_modal').modal('hide');
	// 				$(".btn-save-submit").html(btn_html);
	// 				if (typeof category_submit_done == 'function')
	// 	            {
	// 	                category_submit_done(result);
	// 	            }
	// 			},
	// 			error 	: 	function(error)
	// 			{	
	// 				$(".btn-save-submit").html(btn_html);
	// 				toastr.error("Error, something went wrong.");
	// 			}
	// 		});
	// 	});
	// }


	function search_action(search = '', type_category = '')
	{
		$.ajax({
				url 	: 	"/member/item/category/search_category",
				type 	: 	"POST",
				data 	: 	{
					search:search,
					type_category:type_category,
					_token:misc('_token')
				},
				success : 	function(result){
					result = JSON.parse(result);
					$(".list-group-category").html(result.html);
					select_parent_event();
				},
				error 	: 	function(err){
					toastr.error("Error, something went wrong.");
				}
  			});
	}


	function misc(str = '')
	{
	    switch(str){
	        case '_token':
	            return $("#_token").val();
	            break;
	       case 'spinner':
                return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
                break;
            case 'loader-16-gray':
                return '<div class="loader-16-gray"></div>';
                break;
	    }
	}

}