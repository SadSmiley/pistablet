var events = new events();

function events()
{
	init();
	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		});	
		
		$(window).load(function()
		{
			window_load();	
		});
	}
	function document_ready()
	{		
		event_slider();
		event_slider_crop();
	}
	function window_load()
	{
		event_isotope();
	}
	function event_slider()
	{
		$('.event-slider').slick({
			prevArrow:"<img class='a-left control-c prev slick-prev' src='resources/assets/frontend/img/arrow-left.png'>",
			nextArrow:"<img class='a-right control-c next slick-next' src='resources/assets/frontend/img/arrow-right.png'>",
			dots: true,
		});
	}
	function event_slider_crop()
	{
		image_crop(".slider-holder img", "16", "9");
	}
	function event_isotope()
	{
		$('.grid').isotope({
		  // options
		  itemSelector: '.grid-item',
		  percentPosition: true,
		  masonry: {
		    // use outer width of grid-sizer for columnWidth
		    columnWidth: '.grid-sizer',
		    gutter: '.gutter-sizer',
		    gutter: 10
		  }
		});
	}
}

// function action_after_load()
// {
	
// }