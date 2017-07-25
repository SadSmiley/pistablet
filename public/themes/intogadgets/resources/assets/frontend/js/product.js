 var product = new product();

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
		add_range_slider($filter_min, $filter_max, $filter_val);
		add_event_product_filter_button();
		change_view();
		add_sidebar_submit_event();
		event_quick_add_cart();
	}
	function add_sidebar_submit_event()
	{
		$(".sidebar-order").change(function()
		{
			$("#test-submit").click();
		});
	}
	function add_range_slider(min,max,val)
	{
			$( ".slider-range" ).slider(
			{
				range: true,
				min: min,
				max: max,
				values: [min_range, max_range],
				slide: function( event, ui )
				{
					$( "#amount" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
				},
			    change: function(event, ui)
			    {
			    	$(".min-price").val(ui.values[0]);
			    	$(".max-price").val(ui.values[1]);
			    }
			});
			$( "#amount" ).val("" + $( ".slider-range" ).slider( "values", 0 ) +" - " + $( ".slider-range" ).slider( "values", 1 ));

	}

	function add_event_product_filter_button()
	{
		$('.filter-button').on('click', function(){
			$('#product-filter-form').submit();
		});


		$('li.product-category-holder.category-holder a').on('click', function(){
			var prod_id = $(this).closest('li').attr('prodtype_id');
			$('input#prod-type-filter').val(prod_id);
			$('#product-filter-form').submit();
		});
	}
	function change_view()
	{
		$('.grid-non').on('click', function(e){
			$(e.currentTarget).addClass("hide");
			$('.grid-active').removeClass("hide");
			$('.list-active').addClass("hide");
			$('.list-non').removeClass("hide");
			$('.grid-view').removeClass("hide");
			$('.list-view').addClass("hide");
		});
		$('.list-non').on('click', function(e){
			$(e.currentTarget).addClass("hide");
			$('.list-active').removeClass("hide");
			$('.grid-active').addClass("hide");
			$('.grid-non').removeClass("hide");
			$('.list-view').removeClass("hide");
			$('.grid-view').addClass("hide");
		});
	}
	function event_quick_add_cart()
	{
		$(".quick-add-cart").unbind("click");
		$(".quick-add-cart").bind("click", function(e)
		{
			$('.loader').fadeIn();

			action_quick_add_cart(e.currentTarget);
		});
	}
	function action_quick_add_cart(x)
	{
		var product_id = $(x).attr('product-id');

		$(".quick-cart-content").load('/cart/quick?product_id='+product_id,
		function()
		{
			$('.loader').hide();
			$("#quick-add-cart").modal();
		});
	}
}

