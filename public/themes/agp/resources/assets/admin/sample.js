var id3 = 0;
var URL;
$(".other").hide();
$(".current").hide();
$(".loading2").hide();

$(document).ready(function()
{
  var url = window.location.href.split('#')[0];
  URL = url;
  $( ".forview" ).click(function(e)
  {
    var id = [$(this).attr("value")];
    var currentinfo = [$(this).attr("currentinfo")];
    for(id3=id;id3==id;id3++)
    {

    }
    id3 = id3-1;
    $(".other").hide();
    $(".current").hide();

    $(".currentinfo").empty();
    if(currentinfo=="Under Confirmation")
    {
      $('#stas').val("Under Confirmation");
      $(".currentinfo").append('<select class="stats" id="currentinfo">'
        +'<option value="1" name="Under Confirmation" selected>Under Confirmation</option>'
        +'<option value="2" name="Confirmed & Processing Order">Confirmed & Processing Order</option>'
        +'<option value="3"name="">Currently Shipping</option>'
        +'<option value="4"name="Delivered">Delivered</option>'
        +'<option value="5"name="">Others</option></select>');
    }
    else if(currentinfo=="Delivered")
    {
      $('#stas').val("Delivered");
      $(".currentinfo").append('<select class="stats" id="currentinfo">'
        +'<option value="1" name="Under Confirmation">Under Confirmation</option>'
        +'<option value="2" name="Confirmed & Processing Order">Confirmed & Processing Order</option>'
        +'<option value="3" name="">Currently Shipping</option>'
        +'<option value="4" name="Delivered" selected>Delivered</option>'
        +'<option value="5" name="">Others</option></select>');
    }
    else if(currentinfo=="Confirmed & Processing Order")
    {
      $('#stas').val("Confirmed & Processing Order");
      $('#stas').attr("value")
      $(".currentinfo").append('<select class="stats" id="currentinfo">'
        +'<option value="1" name="Under Confirmation">Under Confirmation</option>'
        +'<option value="2" name="Confirmed & Processing Order" selected>Confirmed & Processing Order</option>'
        +'<option value="3" name="">Currently Shipping</option>'
        +'<option value="4" name="Delivered">Delivered</option>'
        +'<option value="5" name="">Others</option></select>');
    }
    else if(currentinfo=="Currently Shipping")
    {
      $(".current").show();
      $(".other").hide();
      $(".other2").val("");
      $(".hidebox").hide();
      $(".currentinfo").append('<select class="stats" id="currentinfo">'
        +'<option value="1" name="Under Confirmation">Under Confirmation</option>'
        +'<option value="2" name="Confirmed & Processing Order" selected>Confirmed & Processing Order</option>'
        +'<option value="3" name="" selected>Currently Shipping</option>'
        +'<option value="4" name="Delivered">Delivered</option>'
        +'<option value="5" name="">Others</option></select>');
    }
    else
    {
      $(".other").show();
      $(".current").hide();
      $(".current2").val("");
      $(".hidebox").hide();
      $(".currentinfo").append('<select class="stats" id="currentinfo">'
        +'<option value="1" name="Under Confirmation">Under Confirmation</option>'
        +'<option value="2" name="Confirmed & Processing Order" selected>Confirmed & Processing Order</option>'
        +'<option value="3"name="" selected>Currently Shipping</option>'
        +'<option value="4"name="Delivered">Delivered</option>'
        +'<option value="5"name="" selected>Others</option></select>');
    }




  });


$( ".forcancel" ).click(function(e) {
  var id = [$(this).attr("value")];
  $('.forcancel').unbind("click");
  for(id3=id;id3==id;id3++)
  {

  }
  id3 = id3-1;
  $.ajax(
  {
    url:"admin/order/update",
    dataType:"json",
    data:{'stas':"Canceled",'forcancel':"forcancel",'id':id3, '_token' : $('.token').val()},
    type:"POST",
    success: function(data)
    {
      window.location.href = URL;
    }
  });
});
$( ".forview" ).click(function() {
  $(".loading").show();
  $("#updateno").text("Order #"+id3);
  $("#contained").empty();
  $("#ifnologs").empty();

  var url = window.location.href.split('#')[0];
  window.location.href = url+"#orderupdate";
  URL = url;
  $.ajax(
  {
    url:"admin/order/getlogs",
    dataType:"json",
    data:{'id':id3, '_token' : $('.token').val()},
    type:"POST",
    success: function(data)
    {
      $.each(data.result,function()
      {
        $("#contained").append("<tr><td>"+this['logs_date']+"</td>"+"<td>"+this['logs_description']+"</td></tr>");
      })
      if($(".log_container").is(':empty'))
      {
        $("#ifnologs").append("No logs");
      }
      $(".loading").hide();
    }
  });



  $(".stats").change(function()
  {
    var option = $('option:selected', this).attr('name');
    var forhide = $('option:selected', this).attr('value');
    if (forhide == '5'){
      $(".other").show();
      $(".current").hide();
      $(".current2").val("");
      $(".hidebox").hide();
    }
    else if (forhide == '3'){
      $(".current").show();
      $(".other").hide();
      $(".other2").val("");
      $(".hidebox").hide();
    }
    else if (forhide != '3' && forhide !='5'){
      $(".other").hide();
      $(".current").hide();
      $(".current2").val("");
      $(".other2").val("");
      $(".hidebox").show();
    }
    $('#stas').val(option);
  });
});
$(".selecmenu").submit(function()
{
  $('#poster1').prop("disabled", true);
  $('#poster2').prop("disabled", true);
          $('#poster3').prop("disabled", true); //
          $('#poster4').prop("disabled", true); //others
          $('#poster5').prop("disabled", true); //shipping
          $(".loading2").show();
          if($(".other2").is(':visible'))
          {
            $.ajax(
            {
              url:"admin/order/update",
              dataType:"json",
              data:{'stas':$(".other2").val(), 'id':id3,'_token' : $('.token').val()},
              type:"POST",
              success: function(data)
              {
                $(".loading2").hide();
                window.location.href = URL;
              }
            });
          }
          else if ($(".current2").is(':visible'))
          {


            $.ajax(
            {
              url:"admin/order/update",
              dataType:"json",
              data:{'stas':"Currently Shipping("+$(".current2").val()+")",'id':id3, '_token' : $('.token').val()},
              type:"POST",
              success: function(data)
              {
                $(".loading2").hide();
                window.location.href = URL;
              }
            });
          }
          else
          {
            $.ajax(
            {
              url:"admin/order/update",
              dataType:"json",
              data:{'stas':$('#stas').attr("value"),'id':id3, '_token' : $('.token').val()},
              type:"POST",
              success: function(data)
              {
                $(".loading2").hide();
                window.location.href = URL;
              }
            });
          }
          
        });
});