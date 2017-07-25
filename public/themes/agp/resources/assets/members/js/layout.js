
var layout = new layout();


function layout()
{
	$(document).ready(function()
	{
		initialize();

	});

	function initialize()
	{
	   var mode = getUrlParameter('mode');
       $('.forslotchanging').click(function()
       {
       		    $.ajax(
                {
                            url:"member/slot/changeslot",
                            dataType:"json",
                            data: {'changeslot':$(this).attr('slotid')},
                            type:"post",
                            success: function(data)
                            {
                            	if(mode != null)
                            	{
                            		window.location.href = window.location.pathname+"?mode="+mode;
                            	}
	                            else
	                            {
	                            	window.location.href = window.location.pathname;	
	                            }	
                            }
                });      
       });
	}

		var getUrlParameter = function getUrlParameter(sParam)
		{
	    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	        sURLVariables = sPageURL.split('&'),
	        sParameterName,
	        i;

	    for (i = 0; i < sURLVariables.length; i++) {
	        sParameterName = sURLVariables[i].split('=');

	        if (sParameterName[0] === sParam) {
	            return sParameterName[1] === undefined ? true : sParameterName[1];
	        }
	    }
		};




}