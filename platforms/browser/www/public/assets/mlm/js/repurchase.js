var repurchase = new repurchase();

function repurchase()
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
		event_add_to_cart();
		event_remove_item_cart();
		event_clear_cart();
		event_checkout();
		bootstrap_tooltip();
	}
	function isEmpty( el )
	{
		return !$.trim(el.html())
	}
	function show_cart_loader()
	{
		$(".repurchase-cart .loader").removeClass("hide");
	}
	function remove_cart_loader()
	{
		$(".repurchase-cart .loader").addClass("hide");
	}
	function bootstrap_tooltip()
	{
		$('[data-toggle="tooltip"]').tooltip();
	}
	function load_repurchase_cart()
	{
		$(".repurchase-cart").load('/mlm/repurchase/cart', function()
		{
			remove_cart_loader();
			event_remove_item_cart();
		});
	}
	function event_add_to_cart()
	{
		$('.add-to-cart-button').unbind("click");
		$('.add-to-cart-button').bind("click", function(e)
		{
			action_add_to_cart(e.currentTarget);
		});
	}
	function action_add_to_cart(x)
	{
		show_cart_loader();

		var item_id = $(x).attr("item-id");
		var quantity = $('.add-to-cart-quantity[item-id="'+item_id+'"]').val();

		$.ajax({
			url: '/mlm/repurchase/add_cart',
			type: 'GET',
			dataType: 'json',
			data: {
				item_id: item_id,
				quantity: quantity
			},
		})
		.done(function() 
		{
			load_repurchase_cart();
		});
	}
	function event_remove_item_cart()
	{
		$('.remove-item-cart').unbind("click");
		$('.remove-item-cart').bind("click", function(e)
		{
			action_remove_item_cart(e.currentTarget);	
		});
	}
	function action_remove_item_cart(x)
	{
		show_cart_loader();

		var item_id = $(x).attr("item-id");

		$.ajax({
			url: '/mlm/repurchase/remove_item',
			type: 'GET',
			dataType: 'json',
			data: {item_id: item_id},
		})
		.done(function() 
		{
			load_repurchase_cart();
		});
	}
	function event_clear_cart()
	{
		$('.clear-cart').unbind("click");
		$('.clear-cart').bind("click", function()
		{
			action_clear_cart();
		});
	}
	function action_clear_cart()
	{
		show_cart_loader();

		$.ajax({
			url: '/mlm/repurchase/clear_cart',
			type: 'GET',
			dataType: 'json'
		})
		.done(function() 
		{
			load_repurchase_cart();
		});
	}
	function event_checkout()
	{
		$('.checkout-button').unbind("click");
		$('.checkout-button').bind("click", function()
		{
			// alert("Under Development");
		});
	}
}
