var transfer_wallet = new transfer_wallet();
var country = null;
var deduction = 0;
//setup before functions
var timer;
var timeout = 800;
var amt = $(".slotcurrent").val();
$(".alerted").hide();
function transfer_wallet()
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
		initialize();
		getdata();
		doneTyping();
	}


	function initialize()
	{	
		// $(".forhistory").click(function(){
		// 	var inst = $('[data-remodal-id=encashment_history]').remodal();
  //         	inst.open(); 
		// });
		$(".view_pending").click(function(){
			var inst = $('[data-remodal-id=pending]').remodal();
          	inst.open(); 
		});
		$(".accept").click(function(){
			var inst = $('[data-remodal-id=accept]').remodal();
          	inst.open(); 
		});
	}
	function getdata()
	{
		$('#username').keyup(function(){
		    clearTimeout(timer);
		    if ($('#username').val) {
		        timer = setTimeout(function(){
		        	doneTyping();
		        }, timeout);
		    }
		});

		$('#transfer_wallet').keyup(function(){
		    clearTimeout(timer);
		    if ($('#username').val) {
		        timer = setTimeout(function(){
		        	doneTypingamount();
		        	doneTyping();
		        }, timeout);
		    }
		});

		$(".c_slot").click(function(){
    		$('.c_slot').hide();
		});
	}
	function doneTypingamount()
	{
			if(parseInt(amt) >= parseInt($("#transfer_wallet").val()))
			{
				$(".alerted").hide();
			}
			else
			{
				$(".alerted").show();
			}
	}
	function doneTyping()
	{
					$(".tree").empty();
					$(".tree").append('<option>Loading...</option>');
	 				 $.ajax(
			            {
			                url:"member/transfer_wallet/get",
			                dataType:"json",
			                data: {'owner':$("#username").val()},
			                type:"post",
			                success: function(data)
			                {
    							$(".tree").empty();
			                	if(data != "x" && data != "zero" && data != "owned")
			                	{	
		                		  var str = "";
		                		  $('.c_slot').prop("disabled", false);
			    				  $x = jQuery.parseJSON(data);
					              $.each($x, function( key, value ) 
					              {
					              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
					              }); 
					              $(".tree").append(str);
	                			  if(parseInt(amt) < parseInt($("#transfer_wallet").val()))
			                	  {
			                		 $('.c_slot').prop("disabled", true);
			                	  } 		
			                	}
			                	else if(data == "owned")
			                	{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").append('<option>This username is yours</option>'); 
			                	}
			                	else if(data == "zero")
			                	{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").append('<option>This account does not have any slots</option>');
			                	}
			                	else
			                	{
			                		if($('#username').val() == "")
			                		{
			                			if($('#username').val() == "" || parseInt(amt) < parseInt($("#transfer_wallet").val()))
				                		{
				                			$('.c_slot').prop("disabled", true);
				                		} 	
				                		$(".tree").append('<option value="">Put a recipient first</option>');
			                		} 
			                		else
			                		{
				                		$('.c_slot').prop("disabled", true);
				                		$(".tree").append('<option value="">Username does not exist.</option>');
			                		}
			                	}

			                }
			            }); 
	}
}
