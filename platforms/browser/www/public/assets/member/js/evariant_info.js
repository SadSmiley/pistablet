var variant_info = new variant_info()
var item_selected;

function variant_info()
{ 
	init();

	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		});

	}

	function document_ready()
	{
		event_set_default_image_click();
		event_remove_image_click();
		event_required_focus();
		event_onload_container();
		event_edit_item_click();

		item_select_plugin($(".droplist-item"));
        
		tinyMCE.init(
	    { 
	        selector:'.tinymce',
	        menubar:false,
	        height:200, 
	        content_css : "/assets/member/css/tinymce.css",
	        setup: function(val) {
	            val.on('change', function(e) {

	            });
	        }
	    });
	}

	function event_onload_container()
	{
		$(document).on("reload", ".load-container", function ()
		{
			item_select_plugin($(".droplist-item"));
		})
	}

	function event_edit_item_click()
	{
		$(document).on("click", ".edit-item", function(e)
		{
			var item_id = $(this).closest(".row").find("select").val();
			console.log(item_id);
			$(this).attr("link", "/member/item/edit/"+item_id);
		})
	}

	function item_select_plugin($this)
	{
		$this.globalDropList(
		{
			link: '/member/item/add',
		    link_size: 'lg',
		    width: '100%',
		    maxHeight: "309px",
		    placeholder: 'Item',
            onCreateNew : function()
            {
            	item_selected = $(this);
            },
            onChangeValue: function()
            {	
            	if($(this).val() == "")
            	{
            		$(this).closest(".row").find(".edit-item").prop("disabled");
            	}
            	else
            	{
            		$(this).closest(".row").find(".edit-item").prop("disabled", false);
            	}
            }
		});
	}

	function event_required_focus()
	{
		$(document).on("focus, blur", ".option-value", function()
		{
			$(".tab[data-id=2]").click();
		})
	}

	function event_set_default_image_click()
	{
		$(document).on("click",".set-default-image", function(e)
		{
			$('.image').removeClass('glow');
			$('.set-default-image').find('i').attr('class','fa fa-circle-o');
			$('.set-default-image').find('.label').text('Set Default');
			
			$(e.currentTarget).closest('.image').addClass('glow');
			$(e.currentTarget).find('i').attr('class','fa fa-circle');
			$(e.currentTarget).find('.label').text('Your Default');
			
			$("#product-main-image").val($(this).closest('.image').attr("imgid"));
		});
	}

	function event_remove_image_click()
	{
		$(document).on("click",".delete-image", function(e)
		{
			$(this).closest(".image").fadeOut(300, function() 
				{
					$(this).remove();
				})
		});
	}
}



function submit_selected_image_done(data) 
{ 
	var image_url = data.image_data[0].image_path;

    if (data.akey == "product-detail") 
    {
        $('.product-detail-value').val(image_url);
        $('.product-detail-image').css('background-image', 'url(' + image_url + ')');
    }
    else
    {
    	$(".upload-empty").addClass("hidden");

		for($ctr = 0; $ctr < data.image_data.length; $ctr++)
		{
		    var html_for_image = $(".script-image-container").html();
		    $(".new-image-container").append(html_for_image);
		    $(".new-image-container").find(".newly-added").attr("index", $ctr);
		    $(".new-image-container").find(".newly-added").removeClass("newly-added");
		    $(".new-image-container").find("input").prop("disabled", false);
		}

		$.each(data.image_data, function(index, val) 
		{
		    var this_image = val.image_path;
		    $(".new-image-container .image[index=" + index + "] img").attr("src", this_image);
		    $(".new-image-container .image[index=" + index + "] .image-id").val(val.image_id);
		    $(".new-image-container .image[index=" + index + "] .image-value").val(this_image);
		    $(".new-image-container .image[index=" + index + "]").find("img").load(function()
		    {
		        $(".new-image-container .image[index=" + index + "]").find(".progress").css("width", 100 + "%");
		        setTimeout(function()
		        {
		            $(".new-image-container .image[index=" + index + "]").removeClass("loading");
		            $(".new-image-container .image[index=" + index + "]").removeAttr("index");
		        }, 0);
		    });
		});
    }
}

function submit_done(data)
{
	if(data.type == 'product-info')
	{
		data.element.modal("hide");
	}
	else
	{
		if(data.status == 'success')
		{
			window.location.href = data.redirect;
		}
		else
		{
			toastr.error(data.message);
		}
	}
}

function submit_done_item(data)
{
	if(data.type == "item")
	{
		$(".variant-information .select-item").load("/member/item/load_item", function()
	    {                
			$(this).globalDropList("reload");
			item_selected.val(data.item_id).change();          
	    });

	    $('#global_modal').modal('toggle');
		data.element.modal("hide");
	}
}