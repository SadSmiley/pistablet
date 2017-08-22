var product = new product();
var image_count;
var image_current;
var _file;
var variant_option_count = 1;
var variant;
var variant_combination;
var variant_combination_ctr = 0;
var per_level_combination;

function product()
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
		event_upload_image_click();
		event_image_uploader_change();
		event_delete_image_click();
		event_set_default_image_click()
		event_change_vendor();
		action_change_vendor();
		event_change_type();
		action_change_type();
		event_inventory_policy_change();
		action_inventory_policy_change();

		event_variation_change(); //enable disable variation depending if checked or not.
		action_variation_change(); 
		action_integrate_textbox_list();

		event_add_another_option();
		event_hide_another_option();
		action_check_variant_button();
		update_variant_list();
		event_submit_form();
		event_variant_check_click();
		
		event_purchase_and_sale_checkboc_change()
		action_check_sales_information();
		action_check_purchase_information();
		event_product_description_click()
		trigger_load_datepicker()
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
	function event_submit_form()
	{
		$(".form-to-submit-add").submit(function()
		{
			$(".modal-loader").removeClass("hidden");
			tinyMCE.triggerSave()
			
			$.ajax(
			{
				url:"",
				dataType:"json",
				data:$(".form-to-submit-add").serialize(),
				type:"post",
				success: function(data)
				{
					if(data.mode == "error")
					{
						$(".modal-loader").addClass("hidden");
						$(".modal-loader").addClass("hidden");
						$(".modal-title").text('Error Adding Product');
						$(".modal-body").html(data.message);
						$('#myModal').modal('show');
					}
					else
					{
						$(".modal-loader").addClass("hidden");
						window.location.href = "/member/product/edit/" + data.product_id;
					}

		            // $.pnotify({
		            //     title: 'Error Adding New Product',
		            //     type: 'error',
		            //     history: false,
		            //     text: data.message
		            // });
				},
				error: function(data)
				{
					$(".modal-loader").addClass("hidden");
					$(".modal-title").text('Error Adding New Product');
					$(".modal-body").html(data.statusText);
					$('#myModal').modal('show');
				}
			});

			return false;
		});

		$(".form-to-submit-update").submit(function()
		{
			$(".modal-loader").removeClass("hidden");
			tinyMCE.triggerSave()
			
			$.ajax(
			{
				url:"",
				dataType:"json",
				data:$(".form-to-submit-update").serialize(),
				type:"post",
				success: function(data)
				{
					if(data.mode == "error")
					{
						$(".modal-loader").addClass("hidden");
						$(".modal-title").text('Error Updating Product');
						$(".modal-body").html(data.message);
						$('#myModal').modal('show');
					}
					else
					{
						$(".modal-loader").addClass("hidden");
						window.location.href = "/member/product/edit/" + data.product_id;
					}
				},
				error: function(data)
				{
					$(".modal-loader").addClass("hidden");
					$(".modal-title").text('Error Updating Product');
					$(".modal-body").html(data.statusText);
					$('#myModal').modal('show');
				}
			});

			return false;
		});
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

			// console.log(variant_combination);
			// alert("VARCOMB = " + variant_combination_ctr + " AND LEVEL = " + level );

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
			$(".variant-main-container").find(".new").find(".definition").text(val);
			$(".variant-main-container").find(".new").find(".variant_combination").val(val);
			purchase_cost	= $(".variant-purchase-cost").val();
			sale_price  	= $(".variant-sale-price").val();
			sku				= $(".variant-sku").val();
			barcode			= $(".variant-barcode").val();
			$(".variant-main-container").find(".new").find(".variant_cost").val(purchase_cost);
			$(".variant-main-container").find(".new").find(".variant_price").val(sale_price);
			$(".variant-main-container").find(".new").find(".variant_sku").val(sku);
			$(".variant-main-container").find(".new").find(".variant_barcode").val(barcode);
			$(".variant-main-container").find(".new").removeClass("new");
		});
	}
	function event_hide_another_option()
	{
		$(".hide-option").click(function(e)
		{
			variant_option_count = variant_option_count - 1;
			$(e.currentTarget).closest('tr').find(".option_enable").val("false");
			$(e.currentTarget).closest('tr').addClass("hidden");
			action_check_variant_button();
			update_variant_list();
		});
	}
	function event_add_another_option()
	{
		$(".add-another-option").click(function()
		{
			action_add_another_option();
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
	function action_update_variant_option_shown()
	{
		$(".option-table-list").find("tbody tr.hidden:first .option_enable").val("true");
		$(".option-table-list").find("tbody tr.hidden:first").removeClass("hidden");
		action_check_variant_button();
	}
	function action_check_variant_button()
	{
		if($(".option-table-list").find("tbody tr.hidden").length == 0)
		{
			$(".add-another-option").addClass("hidden");
		}
		else
		{
			$(".add-another-option").removeClass("hidden");
		}

		if($(".option-table-list").find("tbody tr.hidden").length == 2)
		{
			$(".hide-option").addClass("hidden");
		}
		else
		{
			$(".hide-option").removeClass("hidden");
		}
	}
	function action_integrate_textbox_list()
	{
		$('.selectize').selectize({
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

	function event_variation_change()
	{
		$(".variation-check").change(function()
		{
			action_variation_change();
		});
	}
	function action_variation_change()
	{
		if($(".variation-check:checked").val())
		{
			$(".variation-form").addClass("multiple-variation");
			$(".option-table-list").find("tbody tr").addClass("hidden");
			$(".option-table-list").find("tbody tr.hidden:first").find(".option_enable").val("true");
			$(".option-table-list").find("tbody tr.hidden:first").removeClass("hidden");
		}
		else
		{
			$(".variation-form").removeClass("multiple-variation");
		}
	}
	function event_inventory_policy_change()
	{
		$(".inventory-policy-select").change(function()
		{
			action_inventory_policy_change();
		});
		
	}
	function action_inventory_policy_change()
	{
		if($(".inventory-policy-select").val() == "1")
		{
			$(".track_inventory").fadeIn();
			$(".have-purchase-info, .have-sale-info").prop("checked", true).fadeOut().trigger("change");
			
			// MULTI VARIANTS FIELD
			$(".inventory-c").fadeIn();
		}
		else
		{
			$(".track_inventory").fadeOut();
			$(".have-purchase-info, .have-sale-info").prop("checked", true).fadeIn().trigger("change");
			
			// MULTI VARIANTS FIELD
			$(".inventory-c").fadeOut();
		}
	}
	function event_change_vendor()
	{
		$(".vendor-select").change(function()
		{
			action_change_vendor();
		});
	}
	function action_change_vendor()
	{
		if($(".vendor-select").val() == "new")
		{
			$(".vendor-textbox").removeClass("hidden");
		}
		else
		{
			$(".vendor-textbox").addClass("hidden");
		}
	}
	function event_change_type()
	{
		$(".type-select").change(function()
		{
			action_change_type();
		});
	}
	function action_change_type()
	{
		if($(".type-select").val() == "new")
		{
			$(".type-textbox").removeClass("hidden");
		}
		else
		{
			$(".type-textbox").addClass("hidden");
		}
	}
	function event_delete_image_click()
	{
		$(document).on("click",".delete-image", function(e)
		{
			$(e.currentTarget).closest('.image').addClass("dark-loading");
			$image_id = $(e.currentTarget).closest('.image').attr("imgid");
			$product_id = product_id
			$token = $(".token").val();
			$.ajax(
			{
				url:"/member/product/delete_image",
				dataType:"json",
				data: {image_id:$image_id, _token:$token, product_id:$product_id},
				type:"post",
				success: function(data)
				{
					$(".image[imgid=" + data + "]").fadeOut();
				}
			});
		});
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
			console.log($(this).closest('.image').attr("imgid"));
		});
	}
	function event_upload_image_click()
	{
		$(".upload-image-button").click(function()
		{
			action_upload_image_click();
		});
	}
	function action_upload_image_click()
	{
		$(".image-uploader").trigger("click");
	}
	function event_image_uploader_change()
	{
		$(".image-uploader").change(function()
		{
			_file = document.getElementById('_file');
			image_count = _file.files.length;
			image_current = 0;
			action_create_container_for_image_upload();
			action_upload_image();
		});
	}
	function action_create_container_for_image_upload()
	{
		$(".upload-empty").addClass("hidden");
		for($ctr = 0; $ctr < image_count; $ctr++)
		{
			var html_for_image = $(".script-image-container").html();
			$(".new-image-container").append(html_for_image);
			$(".new-image-container").find(".newly-added").attr("index", $ctr);
			$(".new-image-container").find(".newly-added").removeClass("newly-added");
		}
	}
	function action_upload_image()
	{
		/* STORE IMAGE TO VARIABLES */
		var data = new FormData();
		data.append('SelectedFile', _file.files[image_current]);
		data.append('product_id', product_id);
		

		/* CREATE REQUEST */
		var request = new XMLHttpRequest();
		var token = $(".token").val();
		
		request.onreadystatechange = function()
		{
		    if(request.readyState == 4)
		    {
		        try
		        {
		            var resp = JSON.parse(request.response);
		        }
		        catch (e)
		        {
		            var resp = {
		                status: 'error',
		                data: 'Unknown error occurred: [' + request.responseText + ']'
		            };
		        }

		        action_image_success_upload(request.response);
		        image_current++;

		        if(_file.files[image_current])
		        {
		        	action_upload_image();
		        }


		    }
		};


		/* UPLOAD WITH PROGRESS BAR */
		request.upload.addEventListener('progress', function(e)
		{
			var progress = ((e.loaded/e.total) * 100) - 30;
			var this_image = image_current;
			$(".new-image-container .image[index=" + this_image + "]").find(".progress").css("width", progress + "%");
		}, false);

		/* START UPLOADING */
		request.open('POST', '/member/product/upload');
		request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		request.setRequestHeader('X-CSRF-TOKEN', token);
		request.send(data);
	}
	function action_image_success_upload(response_string)
	{
		response = JSON.parse(response_string);
		if(response.status == "success")
		{
			var this_image = image_current;
			$(".new-image-container .image[index=" + this_image + "]").find("img").attr("src", response.message).load(function()
			{
				$(".new-image-container .image[index=" + this_image + "]").find(".progress").css("width", 100 + "%");
				setTimeout(function()
				{
					$(".new-image-container .image[index=" + this_image + "]").attr("imgid", response.image_id);
					$(".new-image-container .image[index=" + this_image + "]").removeClass("loading");
					$(".new-image-container .image[index=" + this_image + "]").removeAttr("index");
				}, 3000);
			});
		}
		else
		{
			$(".new-image-container .image[index=" + image_current + "]").remove();
			alert(response.message);
		}


	}
	
	function event_purchase_and_sale_checkboc_change()
	{
		$(".have-sale-info").change( function(e)
		{
			if(!$(this).is(":checked"))
			{
				$(".have-purchase-info").prop('checked', true);
			}
			action_check_sales_information();
			action_check_purchase_information();
		});
		
		$(".have-purchase-info").change( function(e)
		{
			if(!$(this).is(":checked"))
			{
				$(".have-sale-info").prop('checked', true);
			}
			action_check_sales_information();
			action_check_purchase_information();
		});
	}
	
	function action_check_sales_information()
	{
		if($(".have-sale-info").is(":checked"))
		{
			$(".sale-information").fadeIn();
		}
		else
		{
			$(".sale-information").slideUp();
		}
	}
	
	function action_check_purchase_information()
	{
		if($(".have-purchase-info").is(":checked"))
		{
			$(".purchase-information").fadeIn();
		}
		else
		{
			$(".purchase-information").slideUp();
		}
	}
	
	function event_product_description_click()
	{
		$(".product-description").click( function()
		{
			if($(this).hasClass("fa-angle-double-down"))
			{
				$(this).removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
				$(".product-desc-content").slideDown();
			}
			else
			{
				$(this).removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
				$(".product-desc-content").slideUp();
			}
		})
	}
	
	function trigger_load_datepicker()
	{
		$(".datepicker").datepicker();
	}
}