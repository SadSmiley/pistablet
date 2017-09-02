var eproduct = new eproduct();
var image_count;
var variant_option_count = 1;
var variant;
var variant_combination;
var variant_combination_ctr = 0;
var item_selected;

function eproduct()
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
		item_select_plugin($(".droplist-item"));
		category_select_plugin();

		event_add_another_option();
		event_remove_option();

		action_integrate_textbox_list($(".body-option-container .selectize"));
		action_check_product_info_button();

		update_variant_list();
		event_variant_check_click();
		event_single_multiple_toggle();

		event_button_action_click();
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
            	action_change_link_value($(this));
            }
		});
	}

	function category_select_plugin()
	{
		$(".select-category").globalDropList(
		{
			link: '/member/item/category/modal_create_category/inventory',
		    link_size: 'md',
		    width: '100%',
		    placeholder: 'Category'
		});
	}

	function action_change_link_value($this)
	{
		var item_id 	= $this.val();
		var code 		= "pcode-" +Math.random().toString(36).substring(2, 5) +"-"+item_id;
		$product_info 	= $this.closest(".product-container").find(".product-info");

		$this.closest(".product-container").find(".item-code").val(code);
    	$product_info.attr("product-id", item_id);
    	$product_info.attr("product-code", code);
		$product_info.attr("link", "/member/ecommerce/product/variant-modal/"+code+"/"+item_id);

		action_check_product_info_button();
	}

	function action_check_product_info_button()
	{
		$.each($(".single-container .product-info, .multiple-container .product-info"), function(key, val)
		{
			if($(this).attr("product-id") != '')
			{
				$(this).fadeIn();
			}
			else
			{
				$(this).hide();
			}
		});
	}

	function event_add_another_option()
	{
		$(".add-another-option").click(function()
		{
			var new_tr = $(".body-option-container").append($(".script-tr-container").html());
			action_integrate_textbox_list(new_tr.find(".selectize:last"));
		});
		
	}

	function event_remove_option()
	{
		$(document).on("click", ".remove-option", function(e)
		{
			if($(".body-option-container tr").length > 1)
			{
				variant_option_count = variant_option_count - 1;
				$(e.currentTarget).closest('tr').remove();
				update_variant_list();
			}
		});
	}

	function event_variant_check_click()
	{
		$(document).on("change", ".variant_check_click", function(e)
		{
			if($(e.currentTarget).is(":checked"))
			{
				$(e.currentTarget).closest("tr").find(".variant_checked").val("true");
			}
			else
			{
				$(e.currentTarget).closest("tr").find(".variant_checked").val("false");
			}
			
		})
	}

	function update_variant_list()
	{
		$(".variant-list-container").removeClass("hidden");

		setTimeout(function()
		{
			variant = new Array();

			current_index = 0;
			/* CREATE ARRAY FOR VARIANT */
			$("input.variant-option").each(function()
			{
				//var current_index = $(this).closest("tr").attr("index") - 1;
				var hidden = $(this).closest("tr").hasClass("hidden");
				$input_value = $(this).val();

				if($input_value != "")
				{
					if(!hidden)
					{
						variant[current_index] = new Array();
						$input_value_arr = $input_value.split(",");
						variant[current_index] = $input_value_arr;
						current_index++;	
					}

					
				}
			});

			action_init_update_variant_combination();
			action_check_product_info_button();
		})
		
	}

	function action_init_update_variant_combination()
	{
			variant_combination_ctr = 0;
			variant_combination = new Array();
			carry_string = new Array();

			if(variant.length != 0)
			{
				update_variant_combination(0, carry_string);
			}

	}

	function update_variant_combination(level, carry_string)
	{
		$.each(variant[level], function(key, val)
		{
			level_next = level+1; //next level
			carry_string[level] = val;

			variant_combination[variant_combination_ctr] = new Array();

			$.each(carry_string, function(x,y)
			{
				variant_combination[variant_combination_ctr][x] = y;
			})

			/* CHECK IF STOP */
			if(variant[level_next])
			{
				if(variant[level_next].length != 0)
				{
					update_variant_combination(level_next, carry_string);
				}
				else
				{
					variant_combination_ctr++;
				}
			}
			else
			{
				variant_combination_ctr++;
			}
		});

		action_update_variant_based_in_combination();
	}

	function action_update_variant_based_in_combination()
	{
		$variant_html = $(".script-variant-container").html();
		$(".variant-main-container").html("");

		$.each(variant_combination, function(key, val)
		{
			$(".variant-main-container").append($variant_html);
			$(".variant-main-container").find(".new .definition").text(val);
			$(".variant-main-container").find(".new .variant_combination").val(val);
			item_select_plugin($(".variant-main-container").find(".new .select-item"));

			$(".variant-main-container").find(".new").removeClass("new");
		});
	}

	function action_add_another_option()
	{
		variant_option_count = variant_option_count + 1;

		if(variant_option_count > 3)
		{
			variant_option_count = 3;
		}

		if(variant_option_count < 1)
		{
			variant_option_count = 1;
		}

		action_update_variant_option_shown();
	}

	function action_integrate_textbox_list($this)
	{
		$this.selectize({
			persist: false,
			createOnBlur: true,
			create: true,
			onItemAdd: function ()
			{
			    update_variant_list();
			},
			onItemRemove: function ()
			{
				update_variant_list();
			}
		});
	}

	function event_single_multiple_toggle()
	{
		$(document).on('click','.btn-toggle' ,function() {
			if(!$(this).hasClass("active"))
			{
	    		$(this).parent().find('.btn-toggle').toggleClass('active');  
			    
			    if ($(this).parent().find('.btn-primary').size()>0) {
			    	$(this).parent().find('.btn-toggle').toggleClass('btn-primary');
			    }
			    $(this).parent().find('.btn-toggle').toggleClass('btn-default');

			    action_single_mulitple_toggle();
			}
		});
	}

	function action_single_mulitple_toggle()
	{
		if($("#single").hasClass("active"))
		{
			$(".single-container").slideDown();
			$(".multiple-container").hide();

			$(".single-container").find("select, input").prop("disabled", false);
			$(".multiple-container").find("select, input").prop("disabled", "disabled");
		}
		else
		{
			$(".multiple-container").slideDown();
			$(".single-container").hide();

			$(".single-container").find("select, input").prop("disabled", "disabled");
			$(".multiple-container").find("select, input").prop("disabled", false);
		}
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
	}
}

function submit_done(data)
{
	if(data.status == "success-category")
	{
		$(".select-category").load("/member/item/load_category/inventory", function()
		{
			$(this).globalDropList("reload");
			$(this).val(data.id).change();
		})
		data.element.modal("hide");
	}
	else if(data.status == 'success')
	{
		window.location.href = data.redirect;
	}
	else
	{
		toastr.error(data.message);
	}
}

function submit_done_item(data)
{
	console.log(data);
	console.log(item_selected);
	$(".select-item").load("/member/item/load_item", function()
    {                
         $(this).globalDropList("reload");
         item_selected.val(data.item_id).change();          
    });
    $('#global_modal').modal('toggle');
	data.element.modal("hide");
}