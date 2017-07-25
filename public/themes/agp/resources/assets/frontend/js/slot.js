 var slot = new slot();
function slot()
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
		getdata();
		onmembershipchange();	
	}
	function getdata()
	{
		$('.upbtn').bind('click',function(){
			initialize($(this).attr('memship')); 
			$('#tols').val($(this).attr('tols'));
			$('#tu').val($(this).attr('wallet'));
			checkvalue();

			if($('#tuu').data('options') == undefined)
			{
			  $('#tuu').data('options',$('#tuu option').clone());
			}  
			var id = $(this).attr('tols');
			var options = $('#tuu').data('options').filter('[slot=' + id + ']');
			$('#tuu').html(options);

			if($('#tuu option').size() == 0)
			{
			$('#tuu').append('<option value="" class="shouldremove">No included product for this slot.</option>');  
			}

			var inst = $('[data-remodal-id=upgrade_member]').remodal();
          	inst.open(); 
		});

		$('.trans_click').bind('click',function(){
			var transferred = $(this).attr('value');
			$("#hiddenisa").val(transferred);
			$("#isa").val("Slot #"+transferred);
			var inst = $('[data-remodal-id=transfer_slot]').remodal();
          	inst.open(); 
		});

		// $("#wan").change(function() 
		// {
  //             if($('#tuu').data('options') == undefined)
  //             {
  //                 $('#tuu').data('options',$('#tuu option').clone());
  //             }  
  //             var id = $('#wan').val();
  //             var options = $('#tuu').data('options').filter('[member=' + id + ']');
  //             $('#tuu').html(options);

  //             if($('#tuu option').size() == 0)
		//       {
		//         $('#tuu').append('<option value="" class="shouldremove">No product available for this membership</option>');  
		//       }

		// });

	}
	function onmembershipchange()
	{
		$("#wan").bind('change',function()
		{
			$("#tri").val($(this).find(':selected').attr('amount'));
			checkvalue();
		});
	}
	function initialize($price)
	{
        if($("#wan").data('options') == undefined)
        {
          $("#wan").data('options',$('#wan option').clone());
        }
        $(".alerted").hide();
        var options = $('#wan').data('options').filter(function() {
		return $(this).attr("amount") > parseInt($price);
		})

        $('#wan').html(options);

        if(!$('#wan').has('option').length > 0 )
        {
        	$('#subup').prop("disabled", true);
        }
        else
        {
        	$('#subup').prop("disabled", false);
        }
		$("#tri").val($("#wan").find(':selected').attr('amount'));


	}
	function checkvalue()
	{
		$wallet = $("#tu").val();
		$upamount = $("#tri").val();
		if(parseInt($wallet) >= parseInt($upamount))
		{
			$(".alerted").hide();
			$('#subup').prop("disabled", false);
		}
		else
		{
			$('#subup').prop("disabled", true);
			$(".alerted").show();
		}
		if(!$('#wan').has('option').length > 0 )
        {
        	$(".alerted").hide();
        	$('#wan').append('<option value="" class="shouldremove">No available upgrade higher than this.</option>');
        }
	}
}

