$(document).ready(function()
{	

    
	add_to_cart_init();
	load_cart();
	remove_to_cart_init();
	show_checkout();

	// var options = {...};

    // var inst = $('[data-remodal-id=modal]').remodal();

    // inst.open();

    function show_checkout()
    {

    	var $checkout_remodal = $('[data-remodal-id=check-out-modal]').remodal();
    	$('#checkout-cart').on('click', function(event)
    	{
    		event.preventDefault();
    		// var options = {"closeOnConfirm":false,"closeOnEscape":false,"closeOnOutsideClick":false};
		    // cart/checkout
			$checkout_remodal.open();
    	});



    	$(document).on('closing', $checkout_remodal, function ()
    	{

    		load_cart();
    		$('#checkout-form-container').empty();
    	});

    	$(document).on('opened', $checkout_remodal, function ()
    	{


    		var $current_slot = $(".tokens").val();
    		console.log('current_slot : ' + $current_slot);
    		$('.checkout_preloader').fadeIn();
    		$('#checkout-form-container').empty("");
    		$.ajax({
    			url: 'cart/checkout',
    			type: 'GET',
    			dataType: 'html',
    			data: {slot_id: $current_slot},
    		})


    		.done(function($data) {
    			setTimeout(function(){
    			$('.checkout_preloader').fadeOut();
    			$('#checkout-form-container').append($data);
    			console.log("GET");
    			}, 100);
    		})
    		.fail(function() {
    			// console.log("error");
    			alert("Error on showing checkout form.");
    			$checkout_remodal.close();
    		})
    		.always(function() {
    			console.log("complete");
    		});
		});



			$('#checkout-form-container').on('click', '#submit-checkout', function(event)
    		{
				event.preventDefault();

				var $current_slot = $(".tokens").val();

	    		console.log('current_slot : ' + $current_slot);
	    		$('.checkout_preloader').fadeIn();
	    		$('#checkout-form-container').empty("");
	    		$.ajax({
	    			url: 'cart/checkout',
	    			type: 'POST',
	    			dataType: 'html',
	    			data: {slot_id: $current_slot},
	    		})


	    		.done(function($data) {
	    			setTimeout(function(){
	    			$('.checkout_preloader').fadeOut();
	    			$('#checkout-form-container').append($data);
	    			console.log("post");
	    			// console.log($data);
	    			}, 100);
	    		})
	    		.fail(function() {
	    			// console.log("error");
	    			alert("Error on showing checkout form.");
	    			$checkout_remodal.close();
	    		})
	    		.always(function() {
	    			// console.log("complete");
	    		});

			});

			$('#checkout-form-container').on('click', '#submit-checkout-gc', function(event)
    		{
				event.preventDefault();

				var $current_slot = $(".tokens").val();

	    		console.log('current_slot : ' + $current_slot);
	    		$('.checkout_preloader').fadeIn();
	    		$('#checkout-form-container').empty("");
	    		$.ajax({
	    			url: 'cart/checkout',
	    			type: 'POST',
	    			dataType: 'html',
	    			data: {slot_id: $current_slot,gc:"true"},
	    		})


	    		.done(function($data) {
	    			setTimeout(function(){
	    			$('.checkout_preloader').fadeOut();
	    			$('#checkout-form-container').append($data);
	    			console.log("post");
	    			// console.log($data);
	    			}, 100);
	    		})
	    		.fail(function() {
	    			// console.log("error");
	    			alert("Error on showing checkout form.");
	    			$checkout_remodal.close();
	    		})
	    		.always(function() {
	    			// console.log("complete");
	    		});

			});


			$('#checkout-form-container').on('click', '#cancel-checkout', function(event) {
				event.preventDefault();
				$checkout_remodal.close();
			});



			$('#checkout-form-container').on('click', '#back-to-product', function(event) {
				event.preventDefault();
				$checkout_remodal.close();
				
			});	
    }



	function remove_to_cart_init()
	{
		$('table').delegate('.remove-to-cart', 'click', function(event)
		{	
			event.preventDefault();
			var $prod_id = $(this).attr('product-id');

			$.ajax({
				url: 'cart/remove',
				type: 'post',
				dataType: 'json',
				data: {
					product_id: $prod_id,
				},
			})
			.done(function() {
				// console.log("success");
				load_cart();
			})
			.fail(function() {
				// console.log("error");
				alert("Error on removing item/s on cart");				

			})
			.always(function() {
				// console.log("complete");
			});
			
			/* Act on the event */
		});
	}


	function add_to_cart_init()
	{
		$('.add-to-cart').on('click',function(event)
		{
			event.preventDefault();
			var $prod_id = $(this).attr('product-id');
			var $current_slot = $('select[name="slotnow"]').val();



			$.ajax({
				url: 'cart/add',
				type: 'post',
				dataType: 'json',
				data: {
					product_id: $prod_id,
					slot_id: $current_slot
				},
			})
			.done(function() {
				// console.log("success");
				load_cart();
			})
			.fail(function() {
				// console.log("error");
				alert("Error on adding to cart");				
			})
			.always(function() {
				// console.log("complete");
			});
			
			/* Act on the event */
		});
	}



	function load_cart()
	{	
		$('.cart_preloader').fadeIn();
		$( ".cart_container" ).addClass('cart_opacity')
		setTimeout(function(){
			$('.cart_preloader').fadeOut();
			$( ".cart_container" ).removeClass('cart_opacity');
			$( ".cart_container" ).load( "/cart" );
		}, 1000);

	}	
});