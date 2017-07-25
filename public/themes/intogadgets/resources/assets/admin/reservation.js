var x = null;

$(document).ready(function(){
    // Using the core $.ajax() method

    $('.updated').click(function(e){


          $reservation_id = $(e.currentTarget).closest("tr").attr("reservation_id");

        x = $(e.currentTarget).closest("tr").attr("link");    
        var url = window.location.href.split('#')[0];

                    $(".viewed").empty();
                    $(".viewed").append("<div class='reserve'><img class='loading' src='/resources/assets/img/small-loading.GIF'></div>");
                window.location.href = url+"#view";   

                    // $(".order").append("<div class="+"order""><img class="+"loading" "src="+"/resources/assets/img/small-loading.GIF"+"></div>")      
                $(".viewed").load(x); 
                 $(".printf").attr('src',x); 
        return false;
    });

       $('.btnprint').click(function(){
       window.frames["printf"].focus();
        window.frames["printf"].print();
      });


});

var order = new order();
var order_id;
var current_info;

function order()
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
    
    show_modal_on_click();
   }
    function show_modal_on_click()
   {
      $(".update").unbind("click");
      $(".update").bind("click", function(e)
      {


         /* GET ORDER ID */
         order_id = $(e.currentTarget).closest("tr").attr("reservation_id");
         $("#id").val(order_id);
         $("#updateno").empty();
         $("#updateno").append("Order No. "+$("#id").attr("value"));
         /* SHOW POPUP */
         var url = window.location.href.split('#')[0];
         window.location.href = url + "#update";
         return false;
      });
   }
 
}