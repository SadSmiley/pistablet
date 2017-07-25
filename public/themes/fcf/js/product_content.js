var jqxhr = {abort: function () {}};

$(document).ready(function()
{
	event_select_variation();
	event_slick();
	event_change_image();
	event_add_to_cart();
});

function event_change_image()
{
	$(".item-image-large").elevateZoom();
	
	$(document).on('click', '.item-content .thumb .holder', function(event) 
	{
		event.preventDefault();
		
		var variant_id = $(event.currentTarget).attr("variant-id");
		var key = $(event.currentTarget).attr("key");

		$('.item-content[variant-id="'+variant_id+'"] .item-image-large').addClass("hide");
		$('.item-content[variant-id="'+variant_id+'"] .item-image-large[key="'+key+'"]').removeClass("hide");

		image_crop(".4-3-ratio", 4, 3);

		$(".item-image-large").elevateZoom();
	});
}

function event_slick()
{
	$('.thumb').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: false
	});
}

function event_select_variation()
{
	var select_variation = '.select-variation';

	$("body").on('change', select_variation, function(event) 
	{
		event.preventDefault();
		action_select_variation(event);
	});
}

function action_select_variation(e)
{
	var content_holder = '.item-content';

	var selected = $(e.currentTarget).closest(content_holder).attr("variant-id");
	var product_id = $(e.currentTarget).attr("product-id");
	var variant_label = $(e.currentTarget).attr("variant-label");
	var variation = [];
	toload = true;

	var select_variation = '.select-variation[variant-id="'+selected+'"]';
	var select_variation_label = '.select-variation[variant-label="'+variant_label+'"]';

	$(select_variation).each(function(index, el) 
	{
		variation.push($(el).val());

		if ($(el).val() == 0) 
		{
			toload = false;
		}
	});

	if (toload == true) 
	{
		$('.loader').fadeIn(400, function()
		{
			$('.add-to-cart').prop("disabled", false);
			$('.add-to-cart').removeClass("disabled");
		});
	}
	else
	{
		$('.add-to-cart').prop("disabled", true);
		$('.add-to-cart').addClass("disabled");
	}

	jqxhr.abort();

	jqxhr = $.ajax({
		url: '/product/variant/',
		type: 'GET',
		dataType: 'json',
		data: 
		{
			variation: variation,
			product_id: product_id,
		},
	})
	.done(function(data) 
	{
		if(data.result == "success")
		{
			var variant_id = data.variation.evariant_id;
			var content_holder_specific = '.item-content[variant-id="'+variant_id+'"]';
		
			$(content_holder).addClass("hide");
			$(content_holder_specific).removeClass("hide");

			$('.4-3-ratio').keepRatio({ ratio: 4/3, calculate: 'height' });

			$(select_variation_label).val($(e.currentTarget).val());

			if (toload == true) 
			{
				if (data.variation.inventory_status == "out of stock") 
				{
					$('.add-to-cart').prop("disabled", true);
					$('.add-to-cart').addClass("disabled");	
				}
				else
				{
					$('.add-to-cart').prop("disabled", false);
					$('.add-to-cart').removeClass("disabled");
				}
			}

			$(".loader").fadeOut();
		}
		else
		{
			$(select_variation_label).val($(e.currentTarget).val());
			if (toload == true) 
			{
				$(".loader").fadeOut();
			}
		}
	})
	.fail(function() 
	{
		$(select_variation_label).val($(e.currentTarget).val());
	});
}

function event_add_to_cart()
{
	$(document).on('click', '.add-to-cart', function(event) 
	{
		event.preventDefault();
		
		$(event.currentTarget).prop("disabled", true);
		$(event.currentTarget).addClass("disabled");

		var variant_id = $(event.currentTarget).attr("variant-id");
		var quantity = $(".variation-qty[variant-id='"+variant_id+"']").val();

		$.ajax({
			url: '/cart/add',
			type: 'GET',
			dataType: 'json',
			data: {
				variant_id: variant_id,
				quantity: quantity,
			},
		})
		.done(function(data) 
		{
			if (data.status == "error") 
			{
				alert("An error occurred. Please try again later.");

				$(event.currentTarget).prop("disabled", false);
				$(event.currentTarget).removeClass("disabled");
			}
			else
			{
				action_load_cart();
				ready_load_mini_ecom_cart();
			}
		})
		.fail(function() 
		{
			console.log("error");
		})
		.always(function() 
		{
			console.log("complete");
		});	
	});
}