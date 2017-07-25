var home = new home();

function home()
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
		event_slick();
		event_switcher();
		event_feature_change();
	}
	function event_slick()
	{
		$('.slider').slick({
		  	autoplay: true,
			autoplaySpeed: 2000,
			arrows: false,
			adaptiveHeight: true,
		});
		
		$('.slider-feature').slick({
			arrows: true,
		});

		$('.slide-earner').slick({
		  dots: false,
		  infinite: true,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 1,
		  arrows: false,
		  autoplay: true,
		  autoplaySpeed: 2000,
		  pauseOnHover: false,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
		    // You can unslick at a given breakpoint now by adding:
		    // settings: "unslick"
		    // instead of a settings object
		  ]
		});
	}
	function event_switcher()
	{
		$("body").on("click", ".switcher .holder", function()
		{
			var x = $(this).attr("switch");
			$(".slider-feature").slick('slickGoTo', parseInt(x));
			action_feature_change(x);
		});
	}
	function event_feature_change()
	{
		// On before slide change
		$('.slider-feature').on('beforeChange', function(event, slick, currentSlide, nextSlide)
		{
			action_feature_change(nextSlide);
		});   
	}
	function action_feature_change(x)
	{
		$('.switcher .holder').removeClass("active");
		$('.switcher .holder[switch="'+x+'"]').addClass("active");
		$('.switcher-content div').addClass('hide');
		$('.switcher-content div[switch="'+x+'"]').removeClass("hide");
	}
}	