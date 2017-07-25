var global = new global();

function global()
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
		limit_char();
		event_match_height();
		event_fit_text();
		event_sticky_nav();
	}
	function limit_char()
	{
		$(".limit-char").removeClass("hide");
		$(".limit-char").text(function(index, currentText) {
		    return currentText.substr(0, 69) + " ...";
		});
	}
	function event_match_height()
	{
		$(".match-height").matchHeight();
	}
	function event_fit_text()
	{
		jQuery(".logo-holder span").fitText(0.8, { minFontSize: '10px', maxFontSize: '20.67px' });
	}
	function event_sticky_nav()
	{
		var element_position = $('.content').offset().top;
	    var y_scroll_pos = window.pageYOffset;
	    var scroll_pos_test = element_position;
	    
	    if(y_scroll_pos > scroll_pos_test) 
        {
            $(".navbar").addClass("sticky");
            $(".header-wrapper .header").css("padding-bottom", "50px");
        }
        else
        {
            $(".navbar").removeClass("sticky");
            $(".header-wrapper .header").css("padding-bottom", "0px");
        }
	    
	    $(window).on('scroll', function() 
	    {
	        var y_scroll_pos = window.pageYOffset;
	        var scroll_pos_test = element_position;
	        
	        if(y_scroll_pos > scroll_pos_test) 
	        {
	            $(".navbar").addClass("sticky");
	            $(".header-wrapper .header").css("padding-bottom", "50px");
	        }
	        else
	        {
	            $(".navbar").removeClass("sticky");
	            $(".header-wrapper .header").css("padding-bottom", "0px");
	        }
	    });
		
	}
}	