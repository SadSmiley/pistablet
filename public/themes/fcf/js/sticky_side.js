var sticky_side = new sticky_side();

function sticky_side()
{
	init();
	function init()
	{
		document_ready();
	}
	function document_ready()
	{
		event_sticky_nav();
	}
	function event_sticky_nav()
	{
		var element_position = $('.content').offset().top;
	    var y_scroll_pos = window.pageYOffset;
	    var get_height = $('.navbar').height();
	    
	    $(window).on('scroll', function() 
	    {
	        action_sticky_nav(element_position, y_scroll_pos);
	    });
	}
	function action_sticky_nav(x, y)
	{
        if(y > x) 
        {
            $('.header-nav').css("margin-bottom", get_height+"px");
        	$('.navbar').addClass("sticky");
        }
        else
        {
            $('.header-nav').css("margin-bottom", "0px");
	    	$('.navbar').removeClass("sticky");
        }
	}
}