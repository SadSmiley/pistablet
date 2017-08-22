var variant 	= new variant();
var product_id 	= product_id;

function variant()
{
	init();

	function init()
	{
		$(document).ready( function()
		{
			document_ready();
		})
	}

	function document_ready()
	{
		category_select_plugin();
		
		event_variant_item_click();
		event_check_option_name_uniqueness();
		event_click_remove_option_value();

		event_button_action_click();

		if(global_variant_id != '') //EDIT VARIANT
		{
			if($(".variant-item#"+global_variant_id) != undefined)
			{
				$(".variant-item#"+global_variant_id).click();
			}
		}
	}

	this.initialize_select_plugin = function()
	{
		initialize_select_plugin();
	}

	function initialize_select_plugin()
	{
		$(".select-item").globalDropList(
		{
			link: '/member/item/add',
		    link_size: 'lg',
		    width: '100%',
		    maxHeight: "309px",
		    placeholder: 'Item',
            onCreateNew : function()
            {
            	item_selected = $(this);
            }
		});

		category_select_plugin();
	}

	function category_select_plugin()
	{
		$(".select-category").globalDropList(
		{
			link 		: '/member/item/category/modal_create_category',
		    link_size	: 'md',
		    width		: '100%',
		    placeholder	: 'Category'
		});
	}

	function event_variant_item_click()
	{
		$(document).on("click",".variant-item:not(.active)", function()
		{
			var variant_id 	= $(this).attr("id");
			var default_tab = $(".tab.active").attr("data-id");

			$(".variant-info-container").css("opacity", "0.5");
			
			$(".variant-item").find(".variant-nav-list").removeClass("active");
			$(".variant-item").removeClass("active");
			$(this).find(".variant-nav-list").addClass("active");
			$(this).addClass("active");

			$("#delete_variant").removeClass("hidden");

			$.ajax(
			{
				url: '/member/ecommerce/product/product-variant-info/' +variant_id+"/"+default_tab,
				method: 'get',
				success: function(data)
				{
					$(".variant-info-container").html(data);
					$(".variant-info-container").css("opacity", "1");
				},
				error: function(e)
				{
					console.log(e.error());
				}
			})
			
		})
	}

	function event_click_remove_option_value()
	{
		$(document).on("click", ".remove-option-value", function()
		{

			var total_variants 	= 0;
			var option_name 	= $(this).find("text").attr("option-name");
			var option_value 	= $(this).find("text").text();

			$("tbody tr").each(function (i)
			{
				if($(this).text().indexOf(option_value) > -1)
				{
					total_variants += 1;
				}
			})

			$(".modal-loader").removeClass("hidden");
			$(".btn-save").addClass("hidden");
			$(".btn-delete").removeClass("hidden");

			$(".option_value_selected").val(option_value);
			$("#my-modal-save .modal-title").text('Are you sure you want to delete this option value?');
			$(".modal-body").html("You are about to delete <b>all "+total_variants+"</b> variant with a <b>"+option_name+"</b> of <b>"+option_value+"</b>. Deleted variants cannot be recovered.");
			$('#my-modal-save').modal('show');

			$('.action_type').val("delete");
			$(".modal-loader").addClass("hidden");
		})
	}
	
	function event_check_option_name_uniqueness()
	{
		$(document).on("keyup", ".option-name", function(e)
		{
			e.preventDefault();
			var id	= $(this).attr("id"); 
			$this	= $(this);
			
			$(".option-name").not($this).each( function(key, data)
			{
				if($this.val().toLowerCase() == $(data).val().toLowerCase())
				{
					document.getElementById(id).setCustomValidity("Option Name must be unique");
        			return false;
				}
				else
				{
					document.getElementById(id).setCustomValidity("");
        			return true;
				}
			})
			
		})
	}

	function event_button_action_click()
	{
		$(document).on("click",".save-and-edit", function()
		{
			$(".button-action").val("save-and-edit");
		})
		$(document).on("click",".save-and-new", function()
		{
			$(".button-action").val("save-and-new");
		})
		$(document).on("click",".save-and-close", function()
		{
			$(".button-action").val("save-and-close");
		})
	}
}

function submit_done(data)
{
	if(data.status == 'success')
	{
		if(data.redirect)
		{
			window.location.href = data.redirect;
		}
		else // If save only (load content)
		{
			$(".load-container").load("/member/ecommerce/product/edit/"+data.product_id +"? .data-container", function()
			{

				variant.initialize_select_plugin();

				if($(".tinymce").length)
				{
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

				toastr.success("Successfully updated the product");
			});
		}
	}
	else
	{
		toastr.error(data.message);
	}
}