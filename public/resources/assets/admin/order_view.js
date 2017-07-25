$(document).ready(function()
{

   		

    $( ".forname" ).click(function()
    {
        var x = $(this).attr("href");      
        var url = window.location.href.split('#')[0];

        	 		$(".order").empty();
        	 		$(".order").append("<div class='order'><img class='loading' src='/resources/assets/img/small-loading.GIF'></div>");
                window.location.href = url+"#order";   

        	 		// $(".order").append("<div class="+"order""><img class="+"loading" "src="+"/resources/assets/img/small-loading.GIF"+"></div>")      
                $(".order").load(x); 
        return false;
    });



     
});
