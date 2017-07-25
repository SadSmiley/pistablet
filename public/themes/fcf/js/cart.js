var cart = new cart();
var ajax_quantity = {abort: function () {}};

function cart()
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
		event_qty_control();
		event_remove_cart();
	}
	function event_qty_control()
	{
		$('.qty-control-add').unbind("click");
		$('.qty-control-add').bind("click", function(event) 
		{
			event.preventDefault();
			var key = $(event.currentTarget).attr("key");
			
			action_qty_control("+", $(event.currentTarget).attr("variation-id"), key);
			action_qty_control_points("+", $(event.currentTarget).attr("variation-id"), key);
		})

		$('.qty-control-minus').unbind("click");
		$('.qty-control-minus').bind("click", function(event) 
		{
			event.preventDefault();
			var key = $(event.currentTarget).attr("key");
			
			action_qty_control("-", $(event.currentTarget).attr("variation-id"), key);
			action_qty_control_points("-", $(event.currentTarget).attr("variation-id"), key);
		})
	}
	function action_qty_control_points(sign, id, susi)
	{
		var class_susi = '.points_membership_' + susi;
		$(class_susi).each(function(){
			var points = parseFloat($(this).attr('current_points'));
			var base_points = parseFloat($(this).attr('base_points'));
			// console.log(sign);
			if(sign == "+")
			{
				points = points + base_points;
				var p = points.toFixed(2);
				$(this).attr('current_points', p);
				$(this).html(p);
			}
			else
			{
				var new_points = points - base_points;
				if(points > base_points)
				{
					points = points - base_points;
					var p = points.toFixed(2);;
					$(this).attr('current_points', p);
					$(this).html(p);
				}
				
			}
		});
	}
	function action_qty_control(sign, id, key)
	{
		action_disable_checkout_button();

		var current = parseFloat($('.qty-control[variation-id="'+id+'"]').val());
		var price = parseFloat($('.upc span[key="'+key+'"]').attr('raw-price'));

		if (sign == "+") 
		{
			$('.qty-control[variation-id="'+id+'"]').val(current + 1);
		}
		else
		{
			if (current > 1) 
			{
				$('.qty-control[variation-id="'+id+'"]').val(current - 1);
			}
		}	

		var quantity = parseFloat($('.qty-control[variation-id="'+id+'"]').val());

		$('.ttl span[key="'+key+'"]').html((price * quantity).toFixed(2));

		total_price = 0;

		$('.upc span').each(function(index, el) 
		{
			total_price += parseFloat($(el).attr("raw-price")) * parseFloat($('.qty-control[variation-id="'+$(el).attr('key')+'"]').val());
		});

		$('.subtotal-value span').html(parseFloat(total_price).toFixed(2));

		ajax_quantity.abort();

		ajax_quantity = $.ajax({
			url: '/cart/update',
			type: 'get',
			dataType: 'json',
			data: {
				variation_id: id,
				quantity: quantity
			},
		})
		.done(function() {
			ready_load_mini_ecom_cart();
			action_enable_checkout_button();
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}
	function event_remove_cart()
	{
		$('.remove-cart').unbind('click');
		$('.remove-cart').bind('click', function(event) 
		{
			event.preventDefault();
			$(event.currentTarget).closest("tr").remove();
			
			var variation_id = $(event.currentTarget).attr("variation-id");

			action_disable_checkout_button();

			$.ajax({
				url: '/cart/remove',
				type: 'GET',
				dataType: 'json',
				data: {variation_id: variation_id},
			})
			.done(function() {
				ready_load_mini_ecom_cart();
				action_enable_checkout_button();
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		});
	}
	function action_disable_checkout_button()
	{
		$('.checkout-modal-button').prop("disabled", true);
		$('.checkout-modal-button').addClass("disabled");
		$('.cart-loader').removeClass("hide");
	}
	function action_enable_checkout_button()
	{
		$('.checkout-modal-button').prop("disabled", false);
		$('.checkout-modal-button').removeClass("disabled");
		$('.cart-loader').addClass("hide");
	}
}