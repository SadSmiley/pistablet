var global = new global()

function global()
{
	init();
	function init()
	{
		document_ready();
	}
	function document_ready()
	{
		$(document).ready(function()
		{
			action_match_height();
			event_show_cart();
			action_fit_text();
			action_slick();
			ready_load_ecom_cart();
			ready_load_mini_ecom_cart();
			event_sticky_nav();
		});
	}
	function event_show_cart()
	{
		$('html').click(function() 
		{
			action_hide_cart();
		});

		$("body").on("click", ".shopping-cart-container", function(event)
		{
			event.stopPropagation();
			action_show_cart();
		});
	}
	function action_show_cart()
	{
		$(".shopping-cart-container .container-cart").addClass("show");
	}
	function action_hide_cart()
	{
		$(".shopping-cart-container .container-cart").removeClass("show");
	}
	function action_match_height()
	{
		$(".match-height").matchHeight();

		$(window).resize(function()
		{
			$(".match-height").matchHeight();
		});
	}
	function action_fit_text()
	{
		jQuery(".item-price").fitText(0.8, {
			maxFontSize: '16px',
			minFontSize: '8px',
		});
	}
	function action_slick()
	{
		$('.daily-container').slick({
			arrows: false,
			autoplay: true,
  			autoplaySpeed: 2000,
		})

		$(document).on('click', '.hot-deals-container .left-container-title .scroll-button a', function(event) 
		{
			event.preventDefault();
			var direction = $(event.currentTarget).attr("class");
			
			if (direction == "left") 
			{
				$(".daily-container").slick("slickPrev");
			}
			else
			{
				$(".daily-container").slick("slickNext");
			}
		});
	}
	function event_sticky_nav()
	{
		if($('.content').length) 
		{
			var element_position = $('.content').offset().top;
		    var y_scroll_pos = window.pageYOffset;
		    var scroll_pos_test = element_position;
		    var get_height = $('.navbar').height();

		    if(y_scroll_pos > scroll_pos_test) 
	        {
	            $('.header-nav').css("margin-bottom", get_height+"px");
		        $('.navbar').addClass("sticky");
	        }
	        else
	        {
	            $('.header-nav').css("margin-bottom", "0px");
			    $('.navbar').removeClass("sticky");
	        }
		    
		    $(window).on('scroll', function() 
		    {
		        var y_scroll_pos = window.pageYOffset;
		        var scroll_pos_test = element_position;
		        
		        if(y_scroll_pos > scroll_pos_test) 
		        {
		            $('.header-nav').css("margin-bottom", get_height+"px");
		        	$('.navbar').addClass("sticky");
		        }
		        else
		        {
		            $('.header-nav').css("margin-bottom", "0px");
			    	$('.navbar').removeClass("sticky");
		        }
		    });
	    }
	}
}

// CART GLOBAL
function ready_load_ecom_cart()
{
	$('#shopping_cart .modal-content').load('/cart',
	function()
	{
		event_load_cart();
	});
}

function event_load_cart()
{
	$('body').on('click', '.show-cart', function(event) 
	{
		event.preventDefault();
		
		$('#shopping_cart').modal();
	});
}

function action_load_cart()
{
	$('#shopping_cart .modal-content').load('/cart',
	function()
	{
		$('#shopping_cart').modal();
	});
}

function ready_load_mini_ecom_cart()
{
	$('.mini-cart').load('/mini_cart', function()
	{
		var quantity = $('.mini-cart .quantity-get').val();
		var total_price = $('.mini-cart .total-get').val();
		
		$('.mini-cart-quantity').html(quantity);
		$('.mini-cart-total-price').html(total_price);
	});
}
function action_after_load()
{
	
}