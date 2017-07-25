var item = new item();

function  item() {
	init();
	function init(){
		_ready();
	}
	function _ready(){
		editajaxoperation();
		textExpand();
		mark_paid();
	}
	function mark_paid() {
		$(".btn-mark-paid").unbind("click");
		$(".btn-mark-paid").bind("click", function(){
			var id = $(this).val();
			// alert(id);
			$.ajax({
					url 	: 	'/member/ecommerce/order/updatepaystatus',
					type 	: 	'POST',
					data 	: 	{
						_token:token(),
						id:id,
						status:"Paid"
					},
					success : 	function(result){
						if(result == "success")
						{
							toastr.success("Order Paid");
							location.reload();
						}
						else
						{
							toastr.error(result);
						}
					},
					error 	: 	function(err){
						toastr.error("Error, something went wrong.");
					}
				});
		});
	}
	function editajaxoperation(){
		$(".a-edit-email").unbind("click");
		$(".a-edit-email").bind("click", function(){
			var email = $(this).data("content");
			var id = $(this).data("id");
			$(".edit-email").val(email);
			$(".btn-update-email").attr("data-id",id);
		});
		$(".btn-update-email").unbind("click");
		$(".btn-update-email").bind("click", function(){
			var id = $(this).data("id");
			var email = $(".edit-email").val();
			if(email != ""){
				$.ajax({
					url 	: 	'/member/ecommerce/order/new_order/updateEmail',
					type 	: 	'POST',
					data 	: 	{
						_token:token(),
						id:id,
						email:email
					},
					success : 	function(result){
						$(".a-email").html(email);
						$(".a-email").attr('href','mailto:'+email);
						toastr.success("Email has been updated.");
						$("#ModalEmailUpdate").modal('hide');
					},
					error 	: 	function(err){
						toastr.error("Error, something went wrong.");
					}
				});
			}
			else{
				toastr.error("Please complete the missing field.");
			}

		});
		$(".a-edit-shipping").unbind("click");
		$(".a-edit-shipping").bind("click", function(){
			var first = $(this).data('first');
			var last = $(this).data('last');
			var company = $(this).data('company');
			var address = $(this).data('address');
			var cont = $(this).data("cont");
			var city = $(this).data('city');
			var zip = $(this).data('zip');
			var province = $(this).data('province');
			var phone = $(this).data('phone');
			var country = $(this).data('country');
			var countryname = $(this).data("cname");
			var id = $(this).data('id');
			document.getElementById('edit_country').value = country;
			$('.edit-fname').val(first);
			$('.edit-lname').val(last);
			$('.edit-company').val(company);
			$('.edit-phone').val(phone);
			$('.edit-address').val(address);
			$('.edit-addresscont').val(cont);
			$('.edit-city').val(city);
			$('.edit-province').val(province);
			$('.edit-zip').val(zip);
			$(".update-shipping").attr("data-id",id);
		});
		$(".update-shipping").unbind("click");
		$(".update-shipping").bind("click", function(){
			var id = $(this).data("id");
			var country = $("#edit_country").val();
			var first = $('.edit-fname').val();
			var last = $('.edit-lname').val();
			var company = $('.edit-company').val();
			var phone = $('.edit-phone').val();
			var address = $('.edit-address').val();
			var cont = $('.edit-addresscont').val();
			var city = $('.edit-city').val();
			var province = $('.edit-province').val();
			var zip = $('.edit-zip').val();
			if(country != "" && first != "" && last != "" && company != "" && phone != ""  && address != "" && city != "" && province != "" && zip != ""){
				$(".update-shipping").html(fa('fa-loader'));
				$.ajax({
					url 	 : 	 "/member/ecommerce/order/new_order/updateShipping",
					type 	 : 	"POST",
					data 	 : 	{
						_token:token(),
						id:id,
						country:country,
						first:first,
						last:last,
						company:company,
						phone:phone,
						address:address,
						cont:cont,
						city:city,
						province:province,
						zip:zip
					},
					success  : 	function(result){
						$(".cutomer-result").html(result);
						$(".update-shipping").html('Apply changes');
						toastr.success("Shipping address has been updated.");
						editajaxoperation();
					},
					error 	 : 	function(err){
						$(".update-shipping").html('Apply changes');
						toastr.error("Error, something went wrong.");
					}
				});
			}
			else{
				toastr.error("Please fill the missing field/s.");
			}
		});

		$(".btn-save-note").unbind("click");
		$(".btn-save-note").bind("click", function(){
			var id = $(this).data("content");
			var note = $(".textarea-notes").val();
			$(".btn-save-note").html('Saving...');
			$.ajax({
				url 	 : 	 "/member/ecommerce/order/addnote",
				type 	 : 	 "POST",
				data 	 : 	 {
					_token:token(),
					id:id,
					note:note
				},
				success  : 	function(result){
					toastr.success("Your note has been added.");
					$(".btn-save-note").html('Saved');
				},
				error 	 : 	function(err){
					errortoastr();
					$(".btn-save-note").html('Save');
				}
			});
		});
		$(".btn-refund-modal").unbind("click");
		$(".btn-refund-modal").bind("click", function(){
			var id = $(this).data("content");
			$(".refund-body").html(loader);
			$.ajax({
				url 	 : 	 "/member/ecommerce/order/refunditem",
				type 	 : 	 "POST",
				data 	 : 	{
					_token:token(),
					id:id
				},
				success  : 	function(result){
					$(".refund-body").html(result);
					var subototal = $("#subtotal").val();
					$(".available-refund").html(strmoney(subototal));
					var discount = $("#discount_refund").val();
					
					if(discount > 0){
						$(".discount-table").css("display","grid");
					}
					else{
						$(".discount-table").css("display","none");
					}
					var tax = $("#tax_refund");
					if(tax.data('trigger') == 1){
						$(".tax-table").css("display","grid");
					}
					else{
						$(".tax-table").css("display","none");
					}
					$("#subtotal_span").html("0.00");
					$("#discount_span").html("0.00");
					$("#tax_span").html("0.00");
					$("#restock").html('Restock 0 item');
					$(".span-refund").html('0.00');
					$("#manual_refund").val(0);
					refundoperation();
					
				},
				error 	 : 	function(err){

				}
			});
		});
	}
	function textExpand(){
		var text = $('.textarea-notes').val();
		var lines = text.split("\n").length;  
		if(lines == 0){
			lines = 1;
		}
		$('.textarea-notes').attr('rows',lines);
		$('.textarea-notes').keydown(function(e) {
		   var $this = $(this),
		       rows = parseInt($this.attr('rows')),
		       lines;
		    if (e.which === 13)
		        $this.attr('rows', rows + 1);
		    
		    if (e.which === 8 && rows !== 1) {
		        lines = $(this).val().split('\n')
		        console.log(lines);
		        if(!lines[lines.length - 1]) {
		            $this.attr('rows', rows - 1);
		        }
		    }
		    if($(this).val() != ''){
		    	$(".btn-save-note").attr("disabled",false);
		    }
		    if($(this).val() == ''){
		    	$(".btn-save-note").attr("disabled",true);
		    }
		});

	}
	function refundoperation(){
		$(".btn-plus-refund").unbind("click");
		$(".btn-plus-refund").bind("click", function(){
			var max = $(this).data("max");
			var content = $(this).data("content");
			var current = $("#refund_quantity_"+content).val();

			var n = parseFloat(current) + 1;
			if(n <= max){
				multiply(content, n);
			}
		});
		$(".btn-minus-refund").unbind("click");
		$(".btn-minus-refund").bind("click", function(){
			var max = $(this).data("max");
			var content = $(this).data("content");
			var current = $("#refund_quantity_"+content).val();
			var n = parseFloat(current) - 1;
			if(n >= 0){
				multiply(content, n);
			}
		});
		$(".btn-refund").unbind("click");
		$(".btn-refund").bind("click", function(){
			var item = [];
			var n = 0;
			var html = $(this).html();
			$(this).html("Sending...");
			var id = $(this).attr("data-content");
			// console.log(id);
			var reason = $(".reason-refund").val();
			$(".refund-quanitity").each(function (){
				var value = $(this).val();
				var content = $(this).data("content");
				var temp = {value:value,content:content};
				if(value > 0){
					item.push(temp);
				}
				
			});
			var chck = $("#restockChck").is(':checked');
			var chckval = 0;
			if(chck){
				chckval = 1;
			}

			$.ajax({
				url 	 : 	"/member/ecommerce/order/recordrefund",
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					item:item,
					chckval:chckval,
					id:id,
					reason:reason

				},
				success  : 	function(result){
					$(".btn-refund").html('Refunded');
					toastr.success('Refunded.');
					location.reload();

				},
				error  	 : 	function(err){
					$(".btn-refund").html(html);
					toastr.error("Error, something went wrong.");
				}
			});
		});
	}
	function multiply(id = 0, value = 0){

		$("#refund_quantity_"+id).val(value);
		var amount = $("#def_amount_"+id).val();
		amount = parseFloat(amount);
		value = parseFloat(value);
		$(".item-amount-"+id).html(strmoney((amount * value)));
		compute();
	}
	function compute(){
		var total = 0;
		var totalq = 0;
		var subtotal = parseFloat($("#subtotal").val());
		$(".refund-quanitity").each(function(){
			var quantity = $(this).val();
			totalq += parseFloat(quantity);
			var content = $(this).data("content");
			var amount = $("#def_amount_"+content).val();
			total += parseFloat(amount) * parseFloat(quantity);
		});
		var restock = 'Restock ' + totalq;
		var item = ' item.';
		if(totalq > 1){
			item = ' items.';
		}
		restock += item;
		var discount_val = 0;
		var discount = parseFloat($("#discount_refund").val());
		var discount_trigger = $("#discount_refund").data("trigger");
		
		if(discount_trigger == 'percent'){
			discount_val = (discount / 100) * total;
		}
		else if(discount_trigger == 'amount'){
			var tempdiscount = discount / subtotal;
			discount_val = tempdiscount * total;
		}
		else{
			discount = 0;
		}
		discount_val = discount_val.toFixed(2);
		var tax_val = 0;
		var tax = parseFloat($("#tax_refund").val());
		var tax_trigger = $("#tax_refund").data("trigger");

		if(tax_trigger == 1){
			tax_val = (tax / 100) * total;
		}
		else{
			tax_val = 0;
		}

		tax_val  = tax_val.toFixed(2);
		var total_refund = (parseFloat(total) + parseFloat(tax_val)) - parseFloat(discount_val);
		// alert(tax_val);
		$("#restock").html(restock);
		$(".span-refund").html(strmoney(total_refund));
		$("#subtotal_span").html(strmoney(total));
		$("#manual_refund").val(total_refund);
		$("#tax_span").html(strmoney(tax_val));
		$("#discount_span").html(strmoney(discount_val));
		if(total > 0){
			$(".btn-refund").attr("disabled",false);
		}
		else{
			$(".btn-refund").attr("disabled",true);
		}
	}
	function fa(str){
		switch(str){
			case 'fa-loader':
				return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>'
				break;
		}
	}
	function token(){
		return $("#_token").val();
	}
	function errortoastr(){
		toastr.error('Error, something went wrong.');
	}
	function loader(str){
		return '<div class="'+str+'"></div><center><span class="f-gray">Loading...</span></center>';
	}
	function strmoney(amount = 0){
		amount = parseFloat(amount);
		var str = amount.toFixed(2).replace(/./g, function(c, i, a) {
		    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
		return str;
	}

}