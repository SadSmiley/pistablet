
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
      add_change_option_event();
   }

   function add_change_option_event()
   {
      $('#method1').click(function(){
         $('#lbl').text('Deduct by requested price');
      });
      $('#method2').click(function(){
         $('#lbl').text('Discount Percent');
      });
   }
