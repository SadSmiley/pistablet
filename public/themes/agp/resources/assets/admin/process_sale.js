// function Player(n,s,r) {
// 	this.name = n;
// 	this.score = s;
// 	this.rank = r;
// }

// Player.prototype.logInfo = function() {
// 	console.log("I am:" , this.name);
// }


function process_sale()
{

	// this.test_alert  = function function_name (argument) {
	// 	alert(argument);
	// }

	this.document_ready = function document_ready()
	{
		$(document).ready(function()
		{
			add_product_popo_up_init();
			add_to_cart();
			load_cart();
			edit_qty();
			remove_to_cart();
			select_member();
			select_member_type();
			select_slot();
			final_process_submit();
			ifchecked();
			select_status();
			ifchange();
			if ( $('input[id="charge"]').is(':checked') ) 
			{
				$(".charged").append('Percent(0-100%) <input type="text" name="other_charge" class="form-control" id="other_charge">');
			} 
			else
			{
				$(".charged").empty();
			}

		});
	}



	function select_status()
	{
		// select-status

		var stat = $('#select-status').val();
		if(stat == 'processed')
		{
			$('.or-num').fadeIn();
		}
		else
		{
			$('.or-num').fadeOut();
		}


	}


	$('#select-status').change(function(event)
	{
		select_status();
	});


	function final_process_submit()
	{

		$('.final-process-submit').on('click', function(event)
		{

			// alert(2134214);
			$('#process-sale-add-form').submit() 
			$(this).attr('disabled',true);	
			setTimeout(function()
			{
				$(this).removeaAttr('disabled');
				    	
			}, 5000);
			event.preventDefault();
		});
		
	}


	

	var $add_product_pop_up = $('[data-remodal-id="add-product-modal"]').remodal();
	var $edit_product_pop_up = $('[data-remodal-id="edit-product-modal"]').remodal();
	function add_product_popo_up_init()
	{


		$('#product-table').on('click', '.add-to-package', function(event) {
			var $product_id = $(this).attr('product-id');
			$('#add-product-modal input[name=qty]').val(1);
			event.preventDefault();
			$('#product-id-input').val($product_id);
			$add_product_pop_up.open();
			$('#add-product-modal input[name=qty]').focus();
			$('#add-product-modal input[name=qty]').select();
		});
	}



	function add_to_cart()
	{


		$('#add-product-modal input[name=qty]').keypress(function (e)
		{


		  if (e.which == 13)
		  {

		    e.preventDefault()
		    $('#submit-product').trigger('click');

		  }

		})


		$('#submit-product').on('click', function()
		{
			var $_form_field= $('#add-product-modal').serialize();

			// console.log($_form_field);

			$.ajax(
			{
				url: 'admin/transaction/sales/add_to_cart',
				type: 'post',
				dataType: 'json',
				data: $_form_field,			
			})
			.done(function(data)
			{

				load_cart();
				$add_product_pop_up.close();
				// console.log("success");
			})
			.fail(function()
			{
				// console.log("error");
				alert("Error on adding product to cart.");
			})
			.always(function()
			{
				// console.log("complete");
			});
			

		})
	}


	function edit_qty()
	{


		$('#edit-product-modal input[name=qty]').keypress(function (e)
		{


		  if (e.which == 13)
		  {

		    e.preventDefault()
		    $('#edit-submit-product').trigger('click');

		  }
		});





		$('#product-cart').on('click', '.edit-qty', function(event)
		{
			event.preventDefault();
			var  $qty = $(this).text();
			var $product_id = $(this).attr('product-id');

			// console.log($qty);
			// console.log($product_id);
			$('#edit-product-modal input[name=qty]').val($qty);
			$('#edit-product-id-input').val($product_id);

			$edit_product_pop_up.open();
			$('#edit-product-modal input[name=qty]').focus();
			$('#edit-product-modal input[name=qty]').select();
		







		});



		$('#edit-submit-product').on('click', function(event)
		{
			event.preventDefault();
			var $_form_field= $('#edit-product-modal').serialize();

			console.log($_form_field);


			$.ajax(
			{
				url: 'admin/transaction/sales/edit_cart',
				type: 'post',
				dataType: 'json',
				data: $_form_field,			
			})
			.done(function(data)
			{

				load_cart();
				$edit_product_pop_up.close();
				// console.log("success");
			})
			.fail(function()
			{
				// console.log("error");
				alert("Error on editing product qty to cart.");
			})
			.always(function()
			{
				// console.log("complete");
			});


			
		})





	}

	function remove_to_cart()
	{
		


		$('#product-cart').on('click', '.remove-to-cart', function(event)
		{
			event.preventDefault();
			var $product_id = $(this).attr('product-id');
			$.ajax({
				url: 'admin/transaction/sales/remove_to_cart',
				type: 'post',
				dataType: 'json',
				data: {product_id: $product_id},
			})
			.done(function() {
				// console.log("success");

				load_cart();
			})
			.fail(function() {
				// console.log("error");
				alert("Error on removing product to cart.");
			})
			.always(function() {
				// console.log("complete");
			});
			
		});
	}
	function load_cart()
	{	var $slot_id = "";
		var $credit = "";
		var $other = "";
		var $lead  = "";
		var $member_type = $('#select-member-type').val();
		if($member_type == 0 )
		{
			$slot_id = $('#select-slot').val();
		}

		var $payment_option = $("#payment-option").val();
		if($payment_option == 1)
		{
			$credit = "&credit=3";
		}

		if($('#other_charge').val())
		{
			$other = "&other="+$('#other_charge').val();
		}

		if($('#select-member-type').val() == 2)
		{
			$lead = "&lead=1";
		}


		// alert("slot_id = " + $slot_id)
		
		$('#cart-container').load('admin/transaction/sales/get_cart?slot_id='+$slot_id+$other+$credit+$lead);

	}


	function select_member_type()
	{
		var $member_url = "admin/transaction/sales/process/member"; 
		var $non_member_url = "admin/transaction/sales/process/non-member";
		var $leads = "admin/transaction/sales/process/leads";

		$(document).ready(function()
		{
			$('#select-member-type').trigger('change');
		});


		$('#select-member-type').on('change' , function()
		{
			var $select_value = $('#select-member-type').val();
			if($select_value == 0 )
			{
				$('#process-sale-add-form').attr('action', $member_url);
				$('.for-member-input').fadeIn();
				$('.for-lead-member-input').fadeOut();
			}
			else if($select_value == 1)
			{
				$('#process-sale-add-form').attr('action', $non_member_url);
				$('.for-member-input').fadeOut();
				$('.for-lead-member-input').fadeOut();
				$('#select-member').val("");
				$('#select-slot').val("");
			}
			else
			{
				$('#process-sale-add-form').attr('action', $leads);
				$('.for-lead-member-input').fadeIn();
				$('.for-member-input').fadeOut();
				$('#select-member').val("");
			}

			$('#select-member').trigger('change');
			load_cart();
		})
	}

	function select_member()
	{


		$(document).ready(function()
		{
			$('#select-member').trigger('change');
		});

		$('#select-member').on('change', function()
		{
			var $account_id = $(this).val();

			$slot_id_old_input = $('#select-slot').attr('request-input');

			$.ajax({
				url: 'admin/transaction/sales/process/get_slots',
				type: 'get',
				dataType: 'json',
				data: {account_id: $account_id},
			})
			.done(function(data)
			{	
				$('#select-slot option:not([value=""])').remove();
				$.each(data, function(index, val)
				{
					var $selected = "";
					if($slot_id_old_input == val['slot_id'])
					{
						$selected = "selected";
					}
	
					$('#select-slot').append('<option value="'+val['slot_id']+'"'+$selected+'>Slot # '+val['slot_id']+' ( '+val['discount']+'% discount)</option>');
				});
			})
			.fail(function() {
				alert('Error on getting members.')
				// console.log("error");
			})
			.always(function() {
				// console.log("complete");
			});
			

		});




		
	}


	function select_slot()
	{
		$('#select-slot').on('change', function()
		{
			load_cart();
		})
	}	

	function ifchecked()
	{
		$("#charge").click(function()
		{
			if ( $('input[id="charge"]').is(':checked') ) 
			{
				$(".charged").append('Percent(0-100%) <input type="text" name="other_charge" class="form-control" id="other_charge">');
			} 
			else
			{
				var $slot_id = "";
				var $credit = "";
				var $other = "";

				var $member_type = $('#select-member-type').val();
				if($member_type == 0 )
				{
					$slot_id = $('#select-slot').val();
				}

				var $payment_option = $("#payment-option").val();
				if($payment_option == 1)
				{
					$credit = "&credit=3";
				}

				if($('#other_charge').val())
				{
					$other = "&other=0";
				}

				$(".charged").empty();
				$('#cart-container').load('admin/transaction/sales/get_cart?slot_id='+$slot_id+$other+$credit);
			}
		});


		$('.charged').on('keyup', '#other_charge', function()
	    {
	    	load_cart();
	    });

		$('#payment-option').change(function(){
			load_cart();
		});
	}

	function ifchange()
	{
		$("#select-member-type").change(function(){
			if($("#select-member-type").val() == 0)
			{                  
				$("#payment-option").append("<option value='3' {{Request::old('3') == '3' ? 'selected' : '' }}>E-wallet</option>");
			}
			else
			{
				$("#payment-option option[value='3']").remove();
			}
		});
	}
}


var process_sale = new process_sale();
process_sale.document_ready();
