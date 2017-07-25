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
      add_change_option_event();
      add_event_popup();
      cancel_status();
      update_payment();
      disable_cancel();
      initialize_data_table();
      add_data_table_search();
   }

    function add_data_table_search()
    {
        $(".input-sm").attr("placeholder", "Search");
    }
    function initialize_data_table()
    {
        oTable = $('#data-table').DataTable(
        {
            "lengthMenu": [[8, 10, 25, 50, -1], [10, 25, 50, "All"]],
            "oLanguage": { "sSearch": "" },
            stateSave: true
        });
        
        $(".data-table").on( 'draw.dt', function ()
        {
            setTimeout(function()
            {
                add_feature_click_event();
                add_event_active_product();
            });
        });   
    }
   function update_payment()
   {
      var order_id;
      var this_current;
      $('.update-payment').on('click', function(e)
      {  
         this_current = $(this);
         order_id = $(this).attr('order-id')
         e.preventDefault();
         $('#td-order-id').val(order_id);
         $('#update-payment-popup').modal(
         {
            show: true,
            backdrop:'static',
            keyboard: false
         });




      })


      $('#update-payment-popup').on('show.bs.modal', function()
      {
         // console.log(order_id);
         $('#show-payment-loading').fadeIn();
         $.ajax(
         {
            url: 'admin/order/get_payment_details',
            type: 'GET',
            dataType: 'json',
            data: {order_id: order_id},
            success: function( data )
            {
               // console.log(data['order_total'],data['order_balance']);
               $('#td-amount-due').text(formatted_digit(data['order_total']));
               $('#td-balance').text(formatted_digit(data['order_balance']));
               $('#td-payment').val(formatted_digit(data['order_balance']));
               $('#td-payment').focus();
               $('#show-payment-loading').fadeOut();


            },
            error: function( xhr, status, errorThrown )
            {
            alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
            },
            complete: function( xhr, status )
            {
            }
         })
      })

      $('#submit-update-payment').on('click', function()
      {

         var form_input =  $('#update-payment-popup form').serialize();
         // console.log(form_input);
         $('#submit-payment-loading').fadeIn();
         $('#update-payment-popup button').attr('disabled', 'disabled');
         $.ajax(
         {
            url: 'admin/order/update_payment',
            type: 'POST',
            dataType: 'json',
            data: form_input,
            success: function( data )
            {

               if(data['success']==1)
               {
                  $('#update-payment-popup button').removeAttr('disabled');
                  $('#submit-payment-loading').fadeOut();
                  $('#update-payment-popup').modal('hide');
               }
               else
               {
                  $('#update-payment-popup').modal('hide');
               }

               if(data['balance']==0)
               {
                  
                  this_current.fadeOut('slow/fast', function()
                  {
                     $('<p>Paid</p>').insertBefore(this_current);
                     this_current.remove();
                  });
                  
                 
                  
               }

            },
            error: function( xhr, status, errorThrown )
            {
            alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
            },
            complete: function( xhr, status )
            {
            }
         })
      })

      $('#update-payment-popup').on('hide.bs.modal', function()
      {
         $('#td-order-id').val('');
         $('#td-amount-due').text('00.00');
         $('#td-balance').text('00.00');
         $('#td-payment').val('');

      });

      
   }

   function cancel_status()
   {
      $(".forcancel").unbind("click");
      $(".forcancel").bind("click", function(e)
      {
         e.preventDefault();
         var $this = $(this);
         
      
         var id = $(e.currentTarget).attr("order-id");
         var token = $(".token").val();
         $.ajax(
         {
            url: 'admin/order/cancel',
            type: "POST",
            dataType: "json",
            data: {'id': id,'_token':token},
            success:function(data)
            {
               console.log(data);
               if(data['update_order']==1 && data['insert_order_logs']==true )
               {
                  $this.fadeOut('slow', function()
                  {
                     $(this).closest('tr').remove();
                  });
                  
               }
               // else
               // {
               //    alert('An error has occured on cancelling order');
               // }
               
               
               // console.log(data);\
            },

            error:function(xhr, status, errorThrown)
            {
               alert( "Sorry, there was a problem!" );
              console.log( "Error: " + errorThrown );
              console.log( "Status: " + status );
              console.dir( xhr );
            }


         })
           
            




      });
   }
   function add_event_popup()
   {
      if($(".alert-order").length > 0)
      {
         $popup_title = "Update Log";
         $successMessage = $(".alert-order").html();
         message_popup($popup_title,$successMessage);
      }
   }
   function disable_cancel()
   {

   }
   function show_modal_on_click()
   {
      $(".forview").bind("click", function(e)
      {
         default_settings_on_click();

         /* GET ORDER ID */
         order_id = $(e.currentTarget).attr("value");
         $("#id").val(order_id);
         $("#updateno").empty();
         $("#updateno").append("Order No. "+$("#id").attr("value"));
         current_info = $(e.currentTarget).attr("currentinfo");
         /* SHOW POPUP */
         var url = window.location.href.split('#')[0];
         window.location.href = url + "#orderupdate";

         load_order_logs();
         set_default_order_step();
         show_hide_depend_selected_order_step();
         return false;
      });
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
          case "1":
               $(".other").hide();
               $(".current").hide();
               $(".current2").val("");
               $(".days").hide();
               $(".days2").val("");
               $(".other2").val("");
              break;
          case "2":
               $(".other").hide();
               $(".current").hide();
               $(".days").show();
               $(".current2").val("");
               $(".other2").val("");
              break;
          case "3":
               $(".current").show();
               $(".other").hide();
               $(".days").hide();
               $(".other2").val("");
               $(".days2").val("");
              break;
          case "4":
               $(".other").hide();
               $(".current").hide();
               $(".days").hide();
               $(".current2").val("");
               $(".other2").val("");
               $(".days2").val("");
              break;
          case "5":
               $(".other").show();
               $(".current").hide();
               $(".days").hide();
               $(".current2").val("");
               $(".days2").val("");
              break;
          default:   
      } 
   }
   function set_default_order_step()
   {
      $(".stats option").each(function(key)
      {
         $option_text = $(this).text();
         
         if($option_text == current_info)
         {
            $(this).attr('selected', 'selected');
            $(".stats").val($(this).attr("value"))
         }
      });
   }
   function default_settings_on_click()
   {
      $(".loading2").hide();
   }
   function load_order_logs()
   {
      $("#contained").empty();
      $.ajax(
      {
         url:"admin/order/getlogs",
         dataType:"json",
         data:{'id':order_id, '_token' : $('.token').val()},
         type:"POST",
         success: function(data)
         {

            $.each(data.result,function()
            {
               $("#contained").append("<tr><td>"+this['logs_date']+"</td>"+"<td>"+this['logs_description']+"</td></tr>");
            });

            if($(".log_container").is(':empty'))
            {
               $("#ifnologs").empty();
               $("#ifnologs").append("No logs");
            }

            $(".loading").hide();
         }
      });
   }


   function formatted_digit(num)
   {
      return parseFloat(Math.round(num * 100) / 100).toFixed(2);
   }
}