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
		action_says_carousel();
		action_product_image_carousel();
	}
	function action_says_carousel()
	{
		$('.says-container').slick({
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			prevArrow:"<img class='a-left control-c prev slick-prev' src='/themes/sovereign/img/carousel-left.png'>",
      		nextArrow:"<img class='a-right control-c next slick-next' src='/themes/sovereign/img/carousel-right.png'>",
      		autoplay: true,
			autoplaySpeed: 4000,
		})
	}
	function action_product_image_carousel()
	{
		$('.product-image-carousel').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			prevArrow:"<img class='a-left control-c prev slick-prev' src='/themes/sovereign/img/carousel-left.png'>",
      		nextArrow:"<img class='a-right control-c next slick-next' src='/themes/sovereign/img/carousel-right.png'>",
      		autoplay: true,
			autoplaySpeed: 4000,
		})
	}
}