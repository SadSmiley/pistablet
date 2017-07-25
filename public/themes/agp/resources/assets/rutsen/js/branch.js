var checkout = new checkout();

function checkout()
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


    

		add_change_option_event();
		get_value();
		if($(".payment").val() == '1')
		{
		     $("#creditmethod").attr('class','hide');	
		     $("#additionalfee").attr('class','hide');
		     $('#totalcredit').text($('#totalcredit').attr('value'));
		}
		else
		{
			 $("#creditmethod").attr('class','');
			 $("#additionalfee").attr('class','');	

			
		}
			 if($('.crediter').val() == 1)
	      	 {
	      		$val = 6;
	       	 }
	      	 else if($('.crediter').val() == 2)
	       	 {
	      		$val = 9;
	      	 }
	      	 else
	      	 {
	      		$val = 14;
	      	 }
	      	 get_value($val);

	}

	 function add_change_option_event()
   {
    $('.value_form').unbind("change");
    $('.value_form').bind("change",function(){
      var element = $(this).find('option:selected'); 
      var myTag = element.attr("ifvalue"); 

        if(myTag == 0)
        {
          $('.containerr').hide();  
          $("#creditmethod").attr('class','hide');
          $("#additionalfee").attr('class','hide');
          $('#totalcredit').text($('#totalcredit').attr('value'));
          $('.payment').val(1);
        }
        else
        {
          $('.containerr').show();
        }
    });


      $(".payment").unbind("change");
      $(".payment").bind("change", function()
      {
         show_hide_depend_selected_order_step();
          

      });
      // <option value='1'>3months = +6%</option>
						// 		<option value='2'>6months = +9%</option>
						// 		<option value='3'>12months = +14%</option>

	  $(".crediter").unbind("change");
      $(".crediter").bind("change", function()
      {	
      	if($('.crediter').val() == 1)
      	{
      		$val = 6;
      	}
      	else if($('.crediter').val() == 2)
      	{
      		$val = 9;
      	}
      	else
      	{
      		$val = 14;
      	}

 			get_value($val);
      });
   }
   function show_hide_depend_selected_order_step()
   {
      $step_id = $(".payment").val();
 
      switch($step_id)
      {
          case "1":
               $("#creditmethod").attr('class','hide');
               $("#additionalfee").attr('class','hide');
               $('#totalcredit').text($('#totalcredit').attr('value'));
              break;
          case "2":
          	 	if($('.crediter').val() == 1)
		      	{
		      		$val = 6;
		      	}
		      	else if($('.crediter').val() == 2)
		      	{
		      		$val = 9;
		      	}
		      	else
		      	{
		      		$val = 14;
		      	}

               $("#creditmethod").attr('class','');
               $("#additionalfee").attr('class','');
               get_value($val);
              break;
          default:   
      } 
   }
   function get_percent()
   {
   	   $step_id = $(".crediter").val();
 
      switch($step_id)
      {
          case "1":
          		$value = 6;
              break;
          case "2":
          		$value = 9;
              break;
          case "3":
          		$value = 14;
          break;
          default:   
      } 
   }
   function get_value($percent)
   {	
		  $total = 0;
		  $t_val = 0;
   		  $('.totality').each(function()
   		  {	
   		  	$sum = $(this).attr('value').replace(/[^\d.-]/g, '');
   		  	$sum = parseInt($sum);
   		  	$sum = $sum * ($percent / 100);
			$total += $sum;		
		  });
		  $total = $total.toFixed(2);
		  $old_total = $total;
		  $total = '₱ '+ currency_format($total);

		  $t_val = $("#totalcredit").attr('value').replace(/[^\d.-]/g, '');
		  $t_val = parseInt($t_val) +  parseInt($old_total);
		  $t_val = '₱ '+ currency_format($t_val);
		  $('.additional').text($total);
		  $('.credname').text('Credit'+'('+$percent+'%)');
		    if($(".payment").val() != '1')
	     	{
		  		$('#totalcredit').text($t_val);
		  	}
   }
   function currency_format($price)
   {
   		Amount = $price;
		var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);

		var AmountWithCommas = Amount.toLocaleString();
		var arParts = String(AmountWithCommas).split(DecimalSeparator);
		var intPart = arParts[0];
		var decPart = (arParts.length > 1 ? arParts[1] : '');
		decPart = (decPart + '00').substr(0,2);

		return   intPart + DecimalSeparator + decPart;
   }
   function show_modal()
   {
   	 $("#reserve_button").click(function(){   
        var url = window.location.href.split('#')[0];
                window.location.href = url+"#reserve";   
        return false;
   	 });
   }



}