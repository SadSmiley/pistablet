    var x = null;

$(document).ready(function()
{

   		

    $( ".forname" ).click(function()
    {
        x = $(this).attr("href");      
        var url = window.location.href.split('#')[0];

        	 		$(".order").empty();
        	 		$(".order").append("<div class='order'><img class='loading' src='/resources/assets/img/small-loading.GIF'></div>");
                window.location.href = url+"#order";   

        	 		// $(".order").append("<div class="+"order""><img class="+"loading" "src="+"/resources/assets/img/small-loading.GIF"+"></div>")      
                $(".order").load(x); 
                $(".printf").attr('src',x); 
      
        return false;
    });

      $('.btnprint').click(function(){
       window.frames["printf"].focus();
        window.frames["printf"].print();
      });

});
