
var ctr = 0;
$val = 0;
$vals = 0;

   function init()
   {
      $(document).ready(function()
      {
         document_ready();
      });
   }
   function document_ready()
   {
     add_ingredient();
     remove_ing();
     show_modal();
   }






   function add_ingredient()
   {
         $('#ingbtnadd').click(function()
          {



               $amount = $('#amountvalue').val();
               $measure = $('#measure').val();
               $convert = parseInt($measure-1);
               $unit = $('#measure option:eq('+$convert+')').attr('values');
              
                   var str =  '<tr>'+ 
                              '<td class="text-center">'+$val+'<input type="hidden" value="'+$vals+'" name="fooded[]">'+'</a></td>'+
                              '<td class="text-center">'+$amount+'<input type="hidden" value="'+$amount+'" name="amounted[]">'+'</td>'+
                              '<td class="text-center">'+$unit+'<input type="hidden" value="'+$measure+'" name="measured[]">'+'</td>'+
                              '<td class="text-center"><span id="xbutton"><a href="javascript:" onclick="return false">Remove</a></span></td>'+
                              '</tr>';
                  


                   $('.ingcontainer').append(str);
             
                   $("#amountvalue").val('');
        
           var url = window.location.href.split('#')[0];
           window.location.href = url + "#";
                
          });
   }

   function remove_ing()
   {

      $(document).on('click', '#xbutton', function(e){
          $id = $(e.currentTarget).closest("tr").remove();

      });

   }

   function show_modal()
   {
      $( ".addlink" ).click(function()
      {
          $val =  $(this).attr('value');
          $vals =  $(this).attr('values');
          var x = $(this).attr("href");      
          var url = window.location.href.split('#')[0];
          window.location.href = url+"#amount";
          return false;
      });
   }



