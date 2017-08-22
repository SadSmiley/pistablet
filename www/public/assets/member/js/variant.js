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
		//EDIT PRODUCT VARIANT PAGE
		event_variant_item_click();
		event_submit_form();


		if(global_variant_id != '') //EDIT VARIANT
		{
			$(".variant-item#"+global_variant_id)[0].click();
		}
		else
		{
			create_new_variant_field(); //ADD NEW VARIANT
		}

		// EDIT PRODUCT PAGE
		event_click_edit_options();
		event_check_option_name_uniqueness();
		event_click_remove_option_value();

		event_change_image();
		event_select_image();
		event_click_save_image();
	}

	function event_variant_item_click()
	{
		$(document).on("click",".variant-item", function()
		{
			var variant_id 	= $(this).attr("id");

			$("#delete_variant").attr("href","/member/product/edit/variant/delete/"+variant_id);
			$(".variant-item").find(".variant-nav-list").removeClass("active");
			$(this).find(".variant-nav-list").addClass("active");
			
			$("#variant-options-details ").empty();
			$("#variant-options-details ").append('<div style="margin: 50px auto;" class="loader-16-gray"></div>');
			
			//show remove button
			$("#delete_variant").removeClass("hide");
			
			$.ajax(
			{
				url:'/member/product/variant_item',
				type:'GET',
				data:{
					variant_id : variant_id
				}
			})
			.done(function(data)
			{
				data = jQuery.parseJSON(data);
				$("#variant-options-details ").empty();
				
				var name_split				= data.variant['option_name'].split(",");
				var value_split				= data.variant['option_value'].split(",");

				$("#variant_name").html(data.variant['option_value_dot']);

				$.each(name_split, function(i)
				{
					$(".script-variant-details").find("label").html(name_split[i]);
					$(".script-variant-details").find(".option-name").attr("value", name_split[i]);
					$(".script-variant-details").find(".option-value").attr("value", value_split[i]);
					var variant_details_html 	= $(".script-variant-details").html();
					$("#variant-options-details ").append(variant_details_html);

					$("#variant_id").val(data.variant['variant_id']);
					$(".image-variant-id").val(data.variant['variant_id']);

					$("#variant_main_image").attr("src",data.variant['image_path']);
					$("#variant_price").val(data.variant['variant_price']);
					$("#variant_compare_price").val(data.variant['variant_compare_price']);

					if(data.variant['variant_charge_taxes'] == 1)
					{
						$("#variant_charge_taxes").attr("checked", true);
					}
					else
					{
						$("#variant_charge_taxes").attr("checked", false);
					}

					$("#variant_sku").val(data.variant['variant_sku']);
					$("#variant_barcode").val(data.variant['variant_barcode']);
					$("#variant_track_inventory option[value='" +data.variant['variant_track_inventory'] +"']").attr("selected","selected");

					if(data.variant['variant_allow_oos_purchase'] == 1)
					{
						$("#variant_allow_oos_purchase").attr("checked", true);
					}
					else
					{
						$("#variant_allow_oos_purchase").attr("checked", false);
					}

					$("#variant_inventory_count").val(data.variant['variant_inventory_count']);

					$("#variant_weight").val(data.variant['variant_weight']);
					$("#variant_weight_lbl option[value='" +data.variant['variant_weight_lbl'] +"']").attr("selected","selected");

					if(data.variant['variant_require_shipping'] == 1)
					{
						$("#variant_require_shipping").attr("checked", true);
					}
					else
					{
						$("#variant_require_shipping").attr("checked", false);
					}
					// $("#variant_fulfillment_service").val(data.variant['variant_']);
					trigger_selected_image(data.variant['variant_main_image']);
				})
			});
			
		})
	}
	
	function create_new_variant_field()
	{
		$("#variant-options-details").append('<div style="margin: 50px auto;" class="loader-16-gray"></div>');
		
		$.ajax(
		{
			url:'/member/product/variant_item',
			datatype:'json',
			type:'GET',
			data:{
				product_id : product_id
			},

			success: function(data)
			{
				$("#variant-options-details").empty();
				data = jQuery.parseJSON(data);
				
				$.each(data.variant_column, function(i)
				{
					$(".script-variant-details").find("label").html(data.variant_column[i]['option_name']);
					$(".script-variant-details").find(".option-name").attr("value", data.variant_column[i]['option_name']);
					var variant_details_html 	= $(".script-variant-details").html();
					$("#variant-options-details").append(variant_details_html);
				})
			},
			error: function(data)
			{
				console.log(data.statusTex);
			}
		});
	}

	function event_submit_form()
	{
		$(".form-to-submit").submit(function()
		{
			$(".modal-loader").removeClass("hidden");
			
			$.ajax(
			{
				url:"",
				dataType:"json",
				data:$(".form-to-submit").serialize(),
				type:"post",
				success: function(data)
				{
					if(data.mode == "error")
					{
						$(".modal-loader").addClass("hidden");
						$("#myModal .modal-title").text('Error Updating Varianter');
						$("#myModal .modal-body").html(data.message);
						$('#myModal').modal('show');
					}
					else
					{
						$(".modal-loader").addClass("hidden");
						window.location.href = "/member/product/edit/variant/" + data.product_id +"?variant_id=" +data.variant_id;
					}
				},
				error: function(data)
				{
					$(".modal-loader").addClass("hidden");
					$(".modal-title").text('Error Updating Variant');
					$(".modal-body").html(data.statusText);
					$('#myModal').modal('show');
				}
			});

			return false;
		});
	}

	function event_click_edit_options()
	{
		$(".modal-edit-options").on("click", function()
		{
			$(".modal-loader").removeClass("hidden");
			$(".btn-save").removeClass("hidden");
			$(".btn-delete").addClass("hidden");
			
			$("#my-modal-save .modal-body").empty();
			
			$.ajax(
			{
				url:'/member/product/variant_options',
				type:'GET',
				datatype:'JSON',
				data:{
					product_id : product_id
				},

				success: function(data)
				{
					data = jQuery.parseJSON(data);

					$.each(data.variant_column, function(i)
					{
						$(".script-option-container").find(".option-name").attr('value',data.variant_column[i]['option_name']).attr('id', 'on'+data.variant_column[i]['option_name_id']);
						$(".script-option-container").find(".option-name-id").attr('value',data.variant_column[i]['option_name_id']);
						var script_option_container = $(".script-option-container").html();
						$("#my-modal-save .modal-body").append(script_option_container);
						$("#my-modal-save .modal-body .option-container").attr("id","option-container-"+i).removeClass("option-container");

						$.each(data.variant_value, function(u)
						{
							if(data.variant_value[u]['option_name'] == data.variant_column[i]['option_name'])
							{
								$(".script-option-item-container").find(".option-value").html(data.variant_value[u]['option_value']).attr("value",data.variant_value[u]['option_value_id']);
								var script_option_item_container = $(".script-option-item-container").html();
								$("#my-modal-save .modal-body #option-container-"+i).find(".option-value-container").append(script_option_item_container);
							}
						})
					})
					
					$("#my-modal-save .modal-body").find(".option-name").addClass("option-name-unique");
					$(".script-option-container").find(".option-name").removeAttr('id');
					
					$(".modal-loader").addClass("hidden");
					$("#my-modal-save .modal-title").text('Edit Options');
					$('#my-modal-save').modal('show');
				},
				error: function(data)
				{
					$(".modal-loader").addClass("hidden");
				}
			});
		})
	}

	function event_click_remove_option_value()
	{
		$(document).on("click", ".remove-option-value", function()
		{

			var total_variants 	= 0;
			var option_name 	= $(this).closest("[id^=option-container-]").find(".option-name").val();
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

			$(".option-value").attr("value", option_value);
			$("#my-modal-save .modal-title").text('Are you sure you want to delete this option value?');
			$(".modal-body").html("You are about to delete <b>all "+total_variants+"</b> variant with a <b>"+option_name+"</b> of <b>"+option_value+"</b>. Delete variants cannot be recovered.");
			$('#my-modal-save').modal('show');

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
			
			$(".option-name-unique").not(this).each( function(key, data)
			{
				console.log($this.val() +" - " +$(data).val());
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

	function event_change_image()
	{
		$(".change-image").click( function()
		{
			$('#my-modal-image').modal('show');
		})
	}

	function event_select_image()
	{
		$(".image-modal-item").click( function()
		{
			trigger_change_select_image($(this));
		});
	}

	function trigger_selected_image(image_id)
	{
		$.each($(".image-modal-item"), function()
		{
			if($(this).attr("id") == image_id)
			{
				trigger_change_select_image($(this));
			}
		})
	}

	function trigger_change_select_image($this)
	{
		$(".image-modal-item").removeClass("selected");
		$this.addClass("selected");
		$(".image-id").val($this.attr("id"));
	}
	
	/* FOR SELECTING IMAGE WHEN ADDING NEW VARIANT IN A PRODUCT */
	function event_click_save_image()
	{
		$(document).on("click", ".btn-save-img", function(e)
		{
			if(global_variant_id == '')
			{
				e.preventDefault();
				$(".image-main-id").val($(".image-modal-item.selected").attr("id"));
				$("#variant_main_image").attr("src", $(".image-modal-item.selected").attr("src"));
			}	
		})
	}
}