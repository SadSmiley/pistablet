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
         $(".ifno").remove();
      });
   }
   function document_ready()
   {

      add_change_option_event();


   }


   function add_change_option_event()
   {
      $(".stats").unbind("change");
      $(".stats").bind("change", function()
      {
         show_hide_depend_selected_order_step();

      });
   }
   function show_hide_depend_selected_order_step()
   {
      $step_id = $(".stats").val();
 
      switch($step_id)
      {
          case "Choose":
                $('.ingcontainer').empty();
                $('.ingcontainer').append('<input type="text" name="categ" placeholder="Category"  required="required">');
              break;
      } 
   }





}