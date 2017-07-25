var code_vault = new code_vault();
var list = null;
var timer;
var timeout = 400;
var owned_slot = $('.yourcurrentslot').val();
// var owner_slot = $('.owner_slot').val();
function code_vault()
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
		$('.ifgiveslots').hide();
		// getdata();
		initialize();
		onmembershipchange();	
		add_event_active_product();
		add_event_active_product2();
		product_included();
		checkifavailable();
		init_showdownline();
		showdownline();
		onchange_giveslot();
		add_event_use_product_code();
		$(".loadingicon").hide();
		$(".loadingprodicon").hide();
		
    	$(".c_slot").unbind("click");
        $(".c_slot").bind("click", function(e)
        {
    	    e.preventDefault();
    	    $(".loadingicon").show();
    	    $(".c_slot").hide();
			var form = this;
			// alert($(".placement-input").val());
            $('.c_slot').prop("disabled", true);	
            $.ajax(
            {
                url:"member/code_vault/check",
                dataType:"json",
                data: {'placement':$(".placement-input").val(),'slot_position':$("#3").val(),'code_number' : $("#code_number").val(),'giveslot':$(".giveslot").val(),'sponsor':$("#1").val()}, 
                type:"post",
                success: function(data)
                {
                    if(data.message == "")
                    {
                    	$("#createslot").submit();
                    }
                    else
                    {
                    	$(".loadingicon").hide();
                    	$(".c_slot").show();
                    	$('.c_slot').prop("disabled", false);
                    	$(e.currentTarget).find("button").removeAttr("disabled");
                        alert(data.message);
                        return false;
                    }
                }
            });
            
        });

    	$(".usingprodcode").unbind("click");
        $(".usingprodcode").bind("click", function(e)
	    {
	        	 $(".loadingprodicon").show();	
	        	 $(".usingprodcode").hide();
        });
	}

	// function getdata()
	// {
	// 	$('.upbtn').bind('click',function(){
	// 		initialize($(this).attr('memship')); 
	// 		$('#tols').val($(this).attr('tols'));
	// 		$('#tu').val($(this).attr('wallet'));
	// 		checkvalue();

	// 	});
	// }
	function onchange_giveslot()
	{
    	$(".giveslot").unbind("change");
        $(".giveslot").bind("change", function()
	    {

	    		if(parseInt($(this).val()) != parseInt(owned_slot))
	    		{
	    			$('.sponser').hide();
	    			$('.ifgiveslots').show();
	    			$('.ifgiveslots').val("");
	    			$('.ifgiveslots').prop("disabled", false);
	    			$('.sponse').hide();
	    			$('.c_slot').prop("disabled", true);
	    		}
	    		else
	    		{
	    			$('.ifgiveslots').prop("disabled", true);
	    			$('.sponser').show();
	    			$('.ifgiveslots').hide();
	    			$('.sponse').show();
	    			init_showdownline();
	    		}
        });
	}

	function add_event_use_product_code()
	{
		$(".use-p").click(function(e)
		{
			$code_id = $(e.currentTarget).attr("code_id");
			$unilevel_pts = $(e.currentTarget).attr("unilevel_pts");
			$binary_pts = $(e.currentTarget).attr("binary_pts");
			$(".product-code-id-reference").val($code_id);
			$(".unilevel_pts_container").val($unilevel_pts);
			$(".binary_pts_container").val($binary_pts);
		});
	}
	function onmembershipchange()
	{
		$("#11111").bind('change',function()
		{
			$("#33333").val($(this).find(':selected').attr('amount'));
			checkvalue();
		});
	}
	function initialize($price)
	{

    	if(owned_slot != null)
    	{
    		if(parseInt($(".giveslot").val()) != parseInt(owned_slot))
    		{
    			$('.sponser').hide();
    			$('.ifgiveslots').val("");
    			$('.ifgiveslots').show();
    			$('.ifgiveslots').prop("disabled", false);
    			$('.sponse').hide();
    		}
    		else
    		{
    			$('.sponser').show();
    			$('.ifgiveslots').hide();
    			$('.sponse').show();
    			$('.ifgiveslots').prop("disabled", true);
    			init_showdownline();
    		}
    	}		


		$(".sponse").keyup(function()
		{
		    clearTimeout(timer);
		    if ($('.sponse').val) {
		        timer = setTimeout(function(){
		        	onkeysponsor();
		        }, timeout);
		    }
		});

		$(".ifgiveslots").keyup(function()
		{
		    clearTimeout(timer);
		    if ($('.ifgiveslots').val()) {
		        timer = setTimeout(function(){
		        	onkeysponsor_give();
		        }, timeout);
		    }
		});

		$(".sponse").keydown(function()
		{
			$('.c_slot').prop("disabled", true);
		});

		$(".ifgiveslots").keydown(function()
		{
			$('.c_slot').prop("disabled", true);
		});

		$("#buymember").click(function()
		{
			$("#33333").val($("#11111").find(':selected').attr('amount'));
			checkvalue();
			var inst = $('[data-remodal-id=buy_code]').remodal();
          	inst.open(); 
		});

		$(".createslot").click(function()
		{
			$val = $(this).attr('value');
			$("#code_number").val($val);
			var inst = $('[data-remodal-id=create_slot]').remodal();
          	inst.open(); 
		});

		$(".claim_code").click(function()
		{
			var inst = $('[data-remodal-id=claim_code]').remodal();
          	inst.open(); 
		});

		$(".transferer").click(function()
		{
			$("#11").val($(this).attr('value'));
			$("#11s").val($(this).attr('val'));
			var inst = $('[data-remodal-id=transfer_code]').remodal();
          	inst.open(); 
		});

		$(".use-p").click(function()
		{
			var inst = $('[data-remodal-id=use_code]').remodal();
          	inst.open(); 
		});

		$(".transferer-p").click(function()
		{
			$("#11z").val($(this).attr('value'));
			$("#11sz").val($(this).attr('val'));
			$("#11szz").val($(this).attr('vals'));
			var inst = $('[data-remodal-id=transfer_product]').remodal();
          	inst.open(); 
		});


		$(".alertused").click(function()
		{
			alert("Already used.");
		});

	      if($('#11111').data('options') == undefined)
	      {
	          $('#11111').data('options',$('#packageincluded option').clone());
	      } 
	      else
	      {
		      var id = $('option:selected', '#11111').attr('included');

		      var options = $('#11111').data('options').filter('[included=' + id + ']');
		      $('#packageincluded').html(options);	      	
	      }


	      if($('#packageincluded option').size() == 0)
	      {
	        $('#packageincluded').append('<option value="" class="shouldremove">No package available for this membership</option>');  
	     	$('#ifbuttoncode').prop("disabled", true);
	     	$(".includer").hide();
	      }
	      else
	      {
	      	$(".includer").show();
	      	$('#ifbuttoncode').prop("disabled", false);
	      	list = jQuery.parseJSON($('option:selected', "#packageincluded").attr('json'));
		    $(".productinclude").empty();
			showlist();
	      }
		$("#ifbuttoncode").click(function()
		{
			$('#ifbuttoncode').hide();
		});

	}
	function checkvalue()
	{
		$wallet = parseInt($("#22222").val());
		$upamount = parseInt($("#33333").val());
		$total = $wallet - $upamount;
		$("#44444").val($total);

		if($('#packageincluded').val() == 0 || $total < 0)
		{
			$('#ifbuttoncode').prop("disabled", true);	
		}
		else
		{
			$('#ifbuttoncode').prop("disabled", false);
		}
	}
	function add_event_active_product()
    {
        $(".checklock").unbind("click");
        $(".checklock").bind("click", function(e)
        {
            $lock = $(e.currentTarget).closest("tr").attr("loading");
            if($(this).prop('checked')==false)
            {
            	var inst = $('[data-remodal-id=required_pass]').remodal();
            	$("#yuan").val($lock);
          		inst.open();
          		return false;
            }
            else
            {
                $(this).prop('checked',true);    
                set_active($lock, 1);
            }
        });
    }
    function set_active($lock, $value)
    {
        $.ajax(
        {
            url:"/member/code_vault/lock",
            dataType:"json",
            data:{ "pin":$lock, "value": $value, "_token": $(".token").val() },
            type:"post",
            success: function(data)
            {
            }
        })
    } 


	function add_event_active_product2()
    {
        $(".checklock2").unbind("click");
        $(".checklock2").bind("click", function(e)
        {
            $lock = $(e.currentTarget).closest("tr").attr("loading");
            if($(this).prop('checked')==false)
            {
            	var inst = $('[data-remodal-id=required_pass2]').remodal();
            	$("#yuan2").val($lock);
          		inst.open();
          		return false;
            }
            else
            {
                $(this).prop('checked',true);    
                set_active2($lock, 1);
            }
        });
    }
    function set_active2($lock, $value)
    {
        $.ajax(
        {
            url:"/member/code_vault/lock2",
            dataType:"json",
            data:{ "pin":$lock, "value": $value, "_token": $(".token").val() },
            type:"post",
            success: function(data)
            {
            }
        })
    } 
    function product_included()
    {
		$("#11111").change(function() 
		{

		              if($(this).data('options') == undefined)
		              {
		                  $(this).data('options',$('#packageincluded option').clone());
		              } 
		              var id = $('option:selected', this).attr('included');

		              var options = $(this).data('options').filter('[included=' + id + ']');
		              $('#packageincluded').html(options);

		              if($('#packageincluded option').size() == 0)
		              {
		                $('#packageincluded').append('<option value="" class="shouldremove">No package available for this membership</option>');  
		             	$('#ifbuttoncode').prop("disabled", true);
		             	$(".includer").hide();	
		              }
		              else
		              {
		              	$(".includer").show();
		              	$('#ifbuttoncode').prop("disabled", false);
		              	list = jQuery.parseJSON($('option:selected', "#packageincluded").attr('json'));
		              	checkvalue();
		              	showlist();
		              }
		});

		$("#packageincluded").change(function()
		{
	    	list = jQuery.parseJSON($('option:selected', this).attr('json'));
			$(".productinclude").empty();
    		showlist();
		});
    }
    function showlist()
    {
    	  $(".productinclude").empty();
           $.each(list, function( key, value ) 
            {
	            var id = value.product_id;
                var name = value.product_name;
                var price = value.price;
                var quantity = value.quantity;
                var total = parseInt(price) * parseInt(quantity);
                var str="";

                 str =  '<tr class="text-center">'+
                            '<td>'+id+'</td>'+
                            '<td>'+name+'</td>'+
                            '<td>'+price+'</td>'+
                            '<td>'+total+'</td>'+
                            '<td>'+quantity+'</td>'+
                        '</tr>';
                $(".productinclude").append(str);      
            }); 
    }
    function checkifavailable()
    {

    }
    function showdownline()
    {
    	if($("#checkclass").val() != 0)
    	{
			$(".sponser").bind("change", function(e)
	        {
		            $.ajax(
		            {
		                url:"member/code_vault/get",
		                dataType:"json",
		                data: {'slot':$(".sponser").val()},
		                type:"post",
		                success: function(data)
		                {
		                	if(data != "x")
		                	{
		                	  // $(".treecon").show();		                		
		    				  $(".tree").empty(); 
		    				  $x = jQuery.parseJSON(data);

		    				  var str ="<option value='"+$(".sponser").val()+"'>Slot #"+$(".sponser").val()+"</option>";
				              $.each($x[0], function( key, value ) 
				              {
				              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
				              }); 	
				              $(".tree").append(str);
				              $(".sponsornot").empty(); 
				              $('.c_slot').prop("disabled", false);		                		
		                	}
		                	else
		                	{
		                		if($('.sponser').val() == "")
		                		{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").empty();
			                		$(".tree").append('<option value="">Input a slot sponsor</option>');
		                		} 
		                		else
		                		{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").empty();
			                		$(".sponsornot").empty();
			                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
		                		}

		                	}
		                }
		            }); 
			});
		}
    }

    function onkeysponsor()
    {
		if($("#checkclass").val() == 0)
    	{

			            $.ajax(
			            {
			                url:"member/code_vault/get",
			                dataType:"json",
			                data: {'slot':$(".sponse").val(),'token':$('.token').val()},
			                type:"post",
			                success: function(data)
			                {
			                	if(data != "x")
			                	{
			                	  // $(".treecon").show();		                		
			    				  $(".tree").empty(); 
			    				  $x = jQuery.parseJSON(data);
			    				  // var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+" ("+$x[1]+")</option>";
			    				  var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+"</option>";
					              $.each($x[0], function( key, value ) 
					              {
					              		// str = str + '<option value="'+value+'">Slot #'+value+' ('+key+')</option>';  
					              		str = str + '<option value="'+value+'">Slot #'+value+'</option>'; 
					              }); 	
					              $(".sponsornot").empty();
					              $(".tree").append(str); 
					              $('.c_slot').prop("disabled", false);		                		
			                	}
			                	else
			                	{
			                		if($('.sponse').val() == "")
			                		{
				                		$('.c_slot').prop("disabled", true);
				                		$(".tree").empty();
				                		$(".tree").append('<option value="">Input a slot sponsor</option>');
				                		$(".sponsornot").empty();
			                		} 
			                		else
			                		{
				                		$('.c_slot').prop("disabled", true);
				                		$(".tree").empty();
				                		$(".sponsornot").empty();
				                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
				                		$(".sponsornot").append('<div class="alert alert-danger unsponsor"><ul class="notsponsor">Slot Sponsor does not exist</ul></div>');
			                		}
	 
			                	}
			                }
			            }); 
    		
    	}
    }

     function onkeysponsor_give()
    {
			            $.ajax(
			            {
			                url:"member/code_vault/get",
			                dataType:"json",
			                data: {'slot':$(".ifgiveslots").val(),'token':$('.token').val()},
			                type:"post",
			                success: function(data)
			                {
			                	if(data != "x")
			                	{
			                	  // $(".treecon").show();		                		
			    				  $(".tree").empty(); 
			    				  $x = jQuery.parseJSON(data);
			    				  // var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+" ("+$x[1]+")</option>";
			    				  var str ="<option value='"+$(".ifgiveslots").val()+"'>Slot #"+$(".ifgiveslots").val()+"</option>";
					              $.each($x[0], function( key, value ) 
					              {
					              		// str = str + '<option value="'+value+'">Slot #'+value+' ('+key+')</option>';  
					              		str = str + '<option value="'+value+'">Slot #'+value+'</option>'; 
					              }); 	
					              $(".sponsornot").empty();
					              $(".tree").append(str); 
					              $('.c_slot').prop("disabled", false);		                		
			                	}
			                	else
			                	{
			                		if($('.ifgiveslots').val() == "")
			                		{
				                		$('.c_slot').prop("disabled", true);
				                		$(".tree").empty();
				                		$(".tree").append('<option value="">Input a slot sponsor</option>');
				                		$(".sponsornot").empty();
			                		} 
			                		else
			                		{
				                		$('.c_slot').prop("disabled", true);
				                		$(".tree").empty();
				                		$(".sponsornot").empty();
				                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
				                		$(".sponsornot").append('<div class="alert alert-danger unsponsor"><ul class="notsponsor">Slot Sponsor does not exist</ul></div>');
			                		}
	 
			                	}
			                }
			            }); 
    }

    function init_showdownline()
    {
    	    if($("#checkclass").val() == 0)
    		{
		            $.ajax(
		            {
		                url:"member/code_vault/get",
		                dataType:"json",
		                data: {'slot':$(".sponse").val()},
		                type:"post",
		                success: function(data)
		                {
		                	if(data != "x")
		                	{
		                	  // $(".treecon").show();
		    				  $(".tree").empty(); 
		    				  $x = jQuery.parseJSON(data);
		    				  var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+"</option>";
				              $.each($x[0], function( key, value ) 
				              {
				              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
				              }); 	
				              $(".tree").append(str); 
				       		  $(".sponsornot").empty();
				              $('.c_slot').prop("disabled", false);		                		
		                	}
		                	else
		                	{
		                		if($('.sponse').val() == "")
		                		{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").empty();
		                			$(".sponsornot").empty();
			                		$(".tree").append('<option value="">Input a slot sponsor</option>');
		                		} 
		                		else
		                		{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").empty();
			                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
			                		$(".sponsornot").append('<div class="alert alert-danger unsponsor"><ul class="notsponsor">Slot Sponsor does not exist</ul></div>');
		                		}
 
		                	}
 
		                }
		            }); 
			}
	 		else
	 		{
		            $.ajax(
		            {
		                url:"member/code_vault/get",
		                dataType:"json",
		                data: {'slot':$(".sponser").val()},
		                type:"post",
		                success: function(data)
		                {
		                	if(data != "x")
		                	{
		                	  // $(".treecon").show();
		    				  $(".tree").empty(); 
		    				  $x = jQuery.parseJSON(data);
		    				  var str ="<option value='"+$(".sponser").val()+"'>Slot #"+$(".sponser").val()+"</option>";
				              $.each($x[0], function( key, value ) 
				              {
				              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
				              }); 	
				              $(".tree").append(str); 
				              $('.c_slot').prop("disabled", false);		                		
		                	}
		                	else
		                	{
		                		if($('.sponser').val() == "")
		                		{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").empty();
			                		// $(".tree").append('<option value="">Input a slot sponsor</option>');
			                		$(".sponsornot").empty();
		                		} 
		                		else
		                		{
			                		$('.c_slot').prop("disabled", true);
			                		$(".tree").empty();
			                		// $(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
		                			$(".sponsornot").append('<div class="alert alert-danger unsponsor"><ul class="notsponsor">Slot Sponsor does not exist</ul></div>');
		                		}
 
		                	}
 
		                }
		            }); 	 			
	 		}
    }


    function checkifavailable()
    {
        $(".c_slot").bind("click", function(e)
        {	

            
        });
    }   
}



// var code_vault = new code_vault();
// var list = null;
// var timer;
// var timeout = 400;
// var owned_slot = $('.yourcurrentslot').val();

// function code_vault()
// {
// 	init();
// 	function init()
// 	{
// 		$(document).ready(function()
// 		{
// 			document_ready();
// 		});
// 	}
// 	function document_ready()
// 	{	
// 		$('.ifgiveslots').hide();
// 		// getdata();
// 		initialize();
// 		onmembershipchange();	
// 		add_event_active_product();
// 		add_event_active_product2();
// 		product_included();
// 		checkifavailable();
// 		init_showdownline();
// 		showdownline();
// 		onchange_giveslot();
// 		add_event_use_product_code();
// 		$(".loadingicon").hide();
// 		$(".loadingprodicon").hide();
// 	}

// 	// function getdata()
// 	// {
// 	// 	$('.upbtn').bind('click',function(){
// 	// 		initialize($(this).attr('memship')); 
// 	// 		$('#tols').val($(this).attr('tols'));
// 	// 		$('#tu').val($(this).attr('wallet'));
// 	// 		checkvalue();

// 	// 	});
// 	// }
// 	function add_event_use_product_code()
// 	{
// 		$(".use-p").click(function(e)
// 		{
// 			$code_id = $(e.currentTarget).attr("code_id");
// 			$unilevel_pts = $(e.currentTarget).attr("unilevel_pts");
// 			$binary_pts = $(e.currentTarget).attr("binary_pts");
// 			$(".product-code-id-reference").val($code_id);
// 			$(".unilevel_pts_container").val($unilevel_pts);
// 			$(".binary_pts_container").val($binary_pts);
// 		});
// 	}

// 	function onchange_giveslot()
// 	{
//     	$(".giveslot").unbind("change");
//         $(".giveslot").bind("change", function()
// 	    {
// 	    		if(parseInt($(this).val()) != parseInt(owned_slot))
// 	    		{
// 	    			$('.sponser').hide();
// 	    			$('.ifgiveslots').show();
// 	    			$('.ifgiveslots').val("");
// 	    			$('.ifgiveslots').prop("disabled", false);
// 	    			$('.sponse').hide();
// 	    			$('.c_slot').prop("disabled", true);
// 	    		}
// 	    		else
// 	    		{
// 	    			$('.ifgiveslots').prop("disabled", true);
// 	    			$('.sponser').show();
// 	    			$('.ifgiveslots').hide();
// 	    			$('.sponse').show();
// 	    			init_showdownline();
// 	    		}
//         });
// 	}
// 	function onmembershipchange()
// 	{
// 		$("#11111").bind('change',function()
// 		{
// 			$("#33333").val($(this).find(':selected').attr('amount'));
// 			checkvalue();
// 		});
// 	}
// 	function initialize($price)
// 	{


//     	if(owned_slot != null)
//     	{
//     		if(parseInt($(".giveslot").val()) != parseInt(owned_slot))
//     		{
//     			$('.sponser').hide();
//     			$('.ifgiveslots').val("");
//     			$('.ifgiveslots').show();
//     			$('.ifgiveslots').prop("disabled", false);
//     			$('.sponse').hide();
//     		}
//     		else
//     		{
//     			$('.sponser').show();
//     			$('.ifgiveslots').hide();
//     			$('.sponse').show();
//     			$('.ifgiveslots').prop("disabled", true);
//     			init_showdownline();
//     		}
//     	}

// 		$(".ifgiveslots").keyup(function()
// 		{
// 		    clearTimeout(timer);
// 		    if ($('.ifgiveslots').val()) {
// 		        timer = setTimeout(function(){
// 		        	onkeysponsor_give();
// 		        }, timeout);
// 		    }
// 		});

// 		$(".ifgiveslots").keydown(function()
// 		{
// 			$('.c_slot').prop("disabled", true);
// 		});

// 		$("#buymember").click(function()
// 		{
// 			$("#33333").val($("#11111").find(':selected').attr('amount'));
// 			checkvalue();
// 			var inst = $('[data-remodal-id=buy_code]').remodal();
//           	inst.open(); 
// 		});

// 		$(".createslot").click(function()
// 		{
// 			$val = $(this).attr('value');
// 			$("#code_number").val($val);
// 			var inst = $('[data-remodal-id=create_slot]').remodal();
//           	inst.open(); 
// 		});

// 		$(".claim_code").click(function()
// 		{
// 			var inst = $('[data-remodal-id=claim_code]').remodal();
//           	inst.open(); 
// 		});

// 		$(".transferer").click(function()
// 		{
// 			$("#11").val($(this).attr('value'));
// 			$("#11s").val($(this).attr('val'));
// 			var inst = $('[data-remodal-id=transfer_code]').remodal();
//           	inst.open(); 
// 		});

// 		$(".use-p").click(function()
// 		{
// 			var inst = $('[data-remodal-id=use_code]').remodal();
//           	inst.open(); 
// 		});

// 		$(".transferer-p").click(function()
// 		{
// 			$("#11z").val($(this).attr('value'));
// 			$("#11sz").val($(this).attr('val'));
// 			$("#11szz").val($(this).attr('vals'));
// 			var inst = $('[data-remodal-id=transfer_product]').remodal();
//           	inst.open(); 
// 		});


// 		$(".alertused").click(function()
// 		{
// 			alert("Already used.");
// 		});

// 	      if($('#11111').data('options') == undefined)
// 	      {
// 	          $('#11111').data('options',$('#packageincluded option').clone());
// 	      } 
// 	      var id = $('option:selected', '#11111').attr('included');

// 	      var options = $('#11111').data('options').filter('[included=' + id + ']');
// 	      $('#packageincluded').html(options);

// 	      if($('#packageincluded option').size() == 0)
// 	      {
// 	        $('#packageincluded').append('<option value="" class="shouldremove">No package available for this membership</option>');  
// 	     	// $('#ifbuttoncode').prop("disabled", true);
// 	     	$(".includer").hide();
// 	      }
// 	      else
// 	      {
// 	      	$(".includer").show();
// 	      	// $('#ifbuttoncode').prop("disabled", false);
// 	      	list = jQuery.parseJSON($('option:selected', "#packageincluded").attr('json'));
// 		    $(".productinclude").empty();
// 			showlist();
// 	      }
// 		$("#ifbuttoncode").click(function()
// 		{
// 			$('#ifbuttoncode').hide();
// 		});

// 	}

//     function onkeysponsor_give()
//     {
// 			            $.ajax(
// 			            {
// 			                url:"member/code_vault/get",
// 			                dataType:"json",
// 			                data: {'slot':$(".ifgiveslots").val(),'token':$('.token').val()},
// 			                type:"post",
// 			                success: function(data)
// 			                {
// 			                	if(data != "x")
// 			                	{
// 			                	  // $(".treecon").show();		                		
// 			    				  $(".tree").empty(); 
// 			    				  $x = jQuery.parseJSON(data);
// 			    				  // var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+" ("+$x[1]+")</option>";
// 			    				  var str ="<option value='"+$(".ifgiveslots").val()+"'>Slot #"+$(".ifgiveslots").val()+"</option>";
// 					              $.each($x[0], function( key, value ) 
// 					              {
// 					              		// str = str + '<option value="'+value+'">Slot #'+value+' ('+key+')</option>';  
// 					              		str = str + '<option value="'+value+'">Slot #'+value+'</option>'; 
// 					              }); 	
// 					              $(".sponsornot").empty();
// 					              $(".tree").append(str); 
// 					              $('.c_slot').prop("disabled", false);		                		
// 			                	}
// 			                	else
// 			                	{
// 			                		if($('.ifgiveslots').val() == "")
// 			                		{
// 				                		$('.c_slot').prop("disabled", true);
// 				                		$(".tree").empty();
// 				                		$(".tree").append('<option value="">Input a slot sponsor</option>');
// 				                		$(".sponsornot").empty();
// 			                		} 
// 			                		else
// 			                		{
// 				                		$('.c_slot').prop("disabled", true);
// 				                		$(".tree").empty();
// 				                		$(".sponsornot").empty();
// 				                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
// 				                		$(".sponsornot").append('<div class="alert alert-danger unsponsor"><ul class="notsponsor">Slot Sponsor does not exist</ul></div>');
// 			                		}
	 
// 			                	}
// 			                }
// 			            }); 
//     }

// 	function checkvalue()
// 	{
// 		$wallet = parseInt($("#22222").val());
// 		$upamount = parseInt($("#33333").val());
// 		$total = $wallet - $upamount;
// 		$("#44444").val($total);

// 		if($total < 0)
// 		{
// 			$('#ifbuttoncode').prop("disabled", true);	
// 		}
// 		else
// 		{
// 			$('#ifbuttoncode').prop("disabled", false);
// 		}
// 	}
// 	function add_event_active_product()
//     {
//         $(".checklock").unbind("click");
//         $(".checklock").bind("click", function(e)
//         {
//             $lock = $(e.currentTarget).closest("tr").attr("loading");
//             if($(this).prop('checked')==false)
//             {
//             	var inst = $('[data-remodal-id=required_pass]').remodal();
//             	$("#yuan").val($lock);
//           		inst.open();
//           		return false;
//             }
//             else
//             {
//                 $(this).prop('checked',true);    
//                 set_active($lock, 1);
//             }
//         });
//     }
//     function set_active($lock, $value)
//     {
//         $.ajax(
//         {
//             url:"/member/code_vault/lock",
//             dataType:"json",
//             data:{ "pin":$lock, "value": $value, "_token": $(".token").val() },
//             type:"post",
//             success: function(data)
//             {
//             }
//         })
//     } 


// 	function add_event_active_product2()
//     {
//         $(".checklock2").unbind("click");
//         $(".checklock2").bind("click", function(e)
//         {
//             $lock = $(e.currentTarget).closest("tr").attr("loading");
//             if($(this).prop('checked')==false)
//             {
//             	var inst = $('[data-remodal-id=required_pass2]').remodal();
//             	$("#yuan2").val($lock);
//           		inst.open();
//           		return false;
//             }
//             else
//             {
//                 $(this).prop('checked',true);    
//                 set_active2($lock, 1);
//             }
//         });
//     }
//     function set_active2($lock, $value)
//     {
//         $.ajax(
//         {
//             url:"/member/code_vault/lock2",
//             dataType:"json",
//             data:{ "pin":$lock, "value": $value, "_token": $(".token").val() },
//             type:"post",
//             success: function(data)
//             {
//             }
//         })
//     } 
//     function product_included()
//     {
// 		$("#11111").change(function() 
// 		{

// 		              if($(this).data('options') == undefined)
// 		              {
// 		                  $(this).data('options',$('#packageincluded option').clone());
// 		              } 
// 		              var id = $('option:selected', this).attr('included');

// 		              var options = $(this).data('options').filter('[included=' + id + ']');
// 		              $('#packageincluded').html(options);

// 		              if($('#packageincluded option').size() == 0)
// 		              {
// 		                $('#packageincluded').append('<option value="" class="shouldremove">No package available for this membership</option>');  
// 		             	// $('#ifbuttoncode').prop("disabled", true);
// 		             	$(".includer").hide();	
// 		              }
// 		              else
// 		              {
// 		              	$(".includer").show();
// 		              	// $('#ifbuttoncode').prop("disabled", false);
// 		              	list = jQuery.parseJSON($('option:selected', "#packageincluded").attr('json'));
// 		              	checkvalue();
// 		              	showlist();
// 		              }
// 		});

// 		$("#packageincluded").change(function()
// 		{
// 	    	list = jQuery.parseJSON($('option:selected', this).attr('json'));
// 			$(".productinclude").empty();
//     		showlist();
// 		});
//     }
//     function showlist()
//     {
//     	  $(".productinclude").empty();
//            $.each(list, function( key, value ) 
//             {
// 	            var id = value.product_id;
//                 var name = value.product_name;
//                 var price = value.price;
//                 var quantity = value.quantity;
//                 var total = parseInt(price) * parseInt(quantity);
//                 var str="";

//                  str =  '<tr class="text-center">'+
//                             '<td>'+id+'</td>'+
//                             '<td>'+name+'</td>'+
//                             '<td>'+price+'</td>'+
//                             '<td>'+total+'</td>'+
//                             '<td>'+quantity+'</td>'+
//                         '</tr>';
//                 $(".productinclude").append(str);      
//             }); 
//     }
//     function checkifavailable()
//     {
//     	$(".c_slot").unbind("click");
//         $(".c_slot").bind("click", function(e)
//         {
//     	    e.preventDefault();
//     	    $(".loadingicon").show();
//     	    $(".c_slot").hide();
// 			var form = this;
//             $('.c_slot').prop("disabled", true);	
//             $.ajax(
//             {
//                 url:"member/code_vault/check",
//                 dataType:"json",
//                 data: {'placement':$("#2").val(),'giveslot':$(".giveslot").val(),'slot_position':$("#3").val(),'code_number' : $("#code_number").val()},
//                 type:"post",
//                 success: function(data)
//                 {
//                     if(data.message == "")
//                     {
//                     	$("#createslot").submit();
//                     }
//                     else
//                     {
//                     	$(".loadingicon").hide();
//                     	$(".c_slot").show();
//                     	$('.c_slot').prop("disabled", false);
//                     	$(e.currentTarget).find("button").removeAttr("disabled");
//                         alert(data.message);
//                         return false;
//                     }
//                 }
//             });
            
//         });

//     	$(".usingprodcode").unbind("click");
//         $(".usingprodcode").bind("click", function(e)
// 	    {
// 	        	 $(".loadingprodicon").show();	
// 	        	 $(".usingprodcode").hide();
//         });
//     }
//     function showdownline()
//     {
//     	if($("#checkclass").val() == 0)
//     	{
// 			$(".sponse").keyup(function()
// 			{
// 			            $.ajax(
// 			            {
// 			                url:"member/code_vault/get",
// 			                dataType:"json",
// 			                data: {'slot':$(".sponse").val()},
// 			                type:"post",
// 			                success: function(data)
// 			                {
// 			                	if(data != "x")
// 			                	{
// 			                	  $(".treecon").show();		                		
// 			    				  $(".tree").empty(); 
// 			    				  $x = jQuery.parseJSON(data);
// 			    				  var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+"</option>";
// 					              $.each($x[0], function( key, value ) 
// 					              {
// 					              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
// 					              }); 	
// 					              $(".tree").append(str); 
// 					              $('.c_slot').prop("disabled", false);		                		
// 			                	}
// 			                	else
// 			                	{
// 			                		if($('.sponse').val() == "")
// 			                		{
// 				                		$('.c_slot').prop("disabled", true);
// 				                		$(".tree").empty();
// 				                		$(".tree").append('<option value="">Input a slot sponsor</option>');
// 			                		} 
// 			                		else
// 			                		{
// 				                		$('.c_slot').prop("disabled", true);
// 				                		$(".tree").empty();
// 				                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
// 			                		}
	 
// 			                	}
// 			                }
// 			            }); 
// 			});    		
//     	}
//     	else
//     	{
// 			$(".sponser").bind("change", function(e)
// 	        {
// 		            $.ajax(
// 		            {
// 		                url:"member/code_vault/get",
// 		                dataType:"json",
// 		                data: {'slot':$(".sponser").val()},
// 		                type:"post",
// 		                success: function(data)
// 		                {
// 		                	if(data != "x")
// 		                	{
// 		                	  $(".treecon").show();		                		
// 		    				  $(".tree").empty(); 
// 		    				  $x = jQuery.parseJSON(data);

// 		    				  var str ="<option value='"+$(".sponser").val()+"'>Slot #"+$(".sponser").val()+"</option>";
// 				              $.each($x[0], function( key, value ) 
// 				              {
// 				              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
// 				              }); 	
// 				              $(".tree").append(str); 
// 				              $('.c_slot').prop("disabled", false);		                		
// 		                	}
// 		                	else
// 		                	{
// 		                		if($('.sponser').val() == "")
// 		                		{
// 			                		$('.c_slot').prop("disabled", true);
// 			                		$(".tree").empty();
// 			                		$(".tree").append('<option value="">Input a slot sponsor</option>');
// 		                		} 
// 		                		else
// 		                		{
// 			                		$('.c_slot').prop("disabled", true);
// 			                		$(".tree").empty();
// 			                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
// 		                		}

// 		                	}
// 		                }
// 		            }); 
// 			});
// 		}
//     }
//     function init_showdownline()
//     {
//     	    if($("#checkclass").val() == 0)
//     		{
// 		            $.ajax(
// 		            {
// 		                url:"member/code_vault/get",
// 		                dataType:"json",
// 		                data: {'slot':$(".sponse").val()},
// 		                type:"post",
// 		                success: function(data)
// 		                {
// 		                	if(data != "x")
// 		                	{
// 		                	  $(".treecon").show();
// 		    				  $(".tree").empty(); 
// 		    				  $x = jQuery.parseJSON(data);
// 		    				  var str ="<option value='"+$(".sponse").val()+"'>Slot #"+$(".sponse").val()+"</option>";
// 				              $.each($x[0], function( key, value ) 
// 				              {
// 				              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
// 				              }); 	
// 				              $(".tree").append(str); 
// 				              $('.c_slot').prop("disabled", false);		                		
// 		                	}
// 		                	else
// 		                	{
// 		                		if($('.sponse').val() == "")
// 		                		{
// 			                		$('.c_slot').prop("disabled", true);
// 			                		$(".tree").empty();
// 			                		$(".tree").append('<option value="">Input a slot sponsor</option>');
// 		                		} 
// 		                		else
// 		                		{
// 			                		$('.c_slot').prop("disabled", true);
// 			                		$(".tree").empty();
// 			                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
// 		                		}
 
// 		                	}
 
// 		                }
// 		            }); 
// 			}
// 	 		else
// 	 		{
// 		            $.ajax(
// 		            {
// 		                url:"member/code_vault/get",
// 		                dataType:"json",
// 		                data: {'slot':$(".sponser").val()},
// 		                type:"post",
// 		                success: function(data)
// 		                {
// 		                	if(data != "x")
// 		                	{
// 		                	  $(".treecon").show();
// 		    				  $(".tree").empty(); 
// 		    				  $x = jQuery.parseJSON(data);
// 		    				  var str ="<option value='"+$(".sponser").val()+"'>Slot #"+$(".sponser").val()+"</option>";
// 				              $.each($x[0], function( key, value ) 
// 				              {
// 				              		str = str + '<option value="'+value+'">Slot #'+value+'</option>';  
// 				              }); 	
// 				              $(".tree").append(str); 
// 				              $('.c_slot').prop("disabled", false);		                		
// 		                	}
// 		                	else
// 		                	{
// 		                		if($('.sponser').val() == "")
// 		                		{
// 			                		$('.c_slot').prop("disabled", true);
// 			                		$(".tree").empty();
// 			                		$(".tree").append('<option value="">Input a slot sponsor</option>');
// 		                		} 
// 		                		else
// 		                		{
// 			                		$('.c_slot').prop("disabled", true);
// 			                		$(".tree").empty();
// 			                		$(".tree").append('<option value="">Sponsor slot number does not exist.</option>');
// 		                		}
 
// 		                	}
 
// 		                }
// 		            }); 	 			
// 	 		}
//     }


//     // function checkifavailable()
//     // {
//     //     $(".c_slot").bind("click", function(e)
//     //     {	

            
//     //     });
//     // }   
// }

