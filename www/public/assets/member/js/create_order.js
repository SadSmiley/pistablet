var create_order = new create_order();

function  create_order(argument) 
{
	init();
	function init(){
		document_ready();
	}	
	function document_ready(){
		submitorder();
		popover();
		outsideclick();
		textExpand();
		customer();
		searchcustomer();
		customerinfoclick();
		searchitem();
		create_orders();
		order_operation();
		editajaxoperation();
	}
	function submitorder(){
		$(".btn-save-draft").unbind("click");
		$(".btn-save-draft").bind("click", function(){
			$(".btn-save-draft").html('Saving...');
			var note = $(".note-text").val();
			$.ajax({
				url 	 : 	"/member/ecommerce/order/new_order/savetodraft",
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					note:note
				},
				success  : 	function(result){
					var html = '';
					html += '<strong>' + result['trigger'] + '</strong>&nbsp;';
					// html += '<ul>';
					var msg = result['msg'];
					var n = 1;
					$.each(msg, function(a, b){
						if(n > 1){
							html += ', ';
						}
						html += b;
						n++;
					});
					// html += '</ul>';
					var notice = $(".notice-order");
					if(result['trigger'] == 'Success'){
						if(notice.hasClass('notice-danger')){
							notice.removeClass('notice-danger');
							notice.addClass('notice-success');
						}
					}
					else if(result['trigger'] == 'Error'){
						if(notice.hasClass('notice-success')){
							notice.removeClass('notice-success');
							notice.addClass('notice-danger');
						}
					}
					$(".notice-container").html(html);
					$(".notice-order").fadeIn();
					$(".btn-save-draft").html('Save draft');
					if(result['trigger'] == 'Success'){
						location.reload()
					}
				},
				error 	 : 	function(err){
					$(".btn-save-draft").html('Save draft');
					toastr.error('Erro, something went wrong.');
				}
			});
			
		});
		$(".btn-payment").unbind("click");
		$(".btn-payment").bind("click", function(){
			var trigger = $(this).data('trigger');
			var paidhtml = '';
			var title = '';
			var amount = $("#total_order_amount").html();
			paidhtml += '<strong>Did you receive payment for this order outside of My168shop?</strong>';
			paidhtml += '<p>Once the order has been created, you will not be able to make changes or accept credit card or invoice payments.</p>';
			paidhtml += '<br>';
			if(trigger == 'paid'){
				title = 'Mark as paid';
				paidhtml += '<span>Total received: ₱ <span class="paymentAmount">'+amount+'</span></span>';
			}
			else if(trigger == 'pending'){
				title = 'Mark as pending';
				paidhtml += '<p>Total due: ₱ <span class="paymentAmount">'+amount+'</span></p>';
			}
			var tax = '<div class="notice notice-attention">';
          		// tax += '<a href="#" class="close-notice"">&times;</a>';
          		tax += '<strong>Taxes not included</strong><br>';
				tax += '<span>Do you need to charge taxes? Once you\'ve accepted payment, taxes can no longer be added. Add a customer with an address to calculate taxes automatically. </span>';
				tax += '</div>';
				tax += '<br>';
			var taxvalue = $("#taxpercent").val();
			if(taxvalue != 0 && taxvalue != '' && taxvalue != null){

			}
			else{
				paidhtml = tax + paidhtml;
			}
			$(".payment-title").html(title);
			$(".payment-body").html(paidhtml);
			$(".create-order-modal").attr("data-trigger",trigger);
			$("#PaymentModal").modal('show');

		});
		$(".create-order-modal").unbind("click");
		$(".create-order-modal").bind("click", function (){
			var trigger = $(this).data('trigger');
			$(".create-order-modal").html('Creating...');
			$.ajax({
				url 	 : 	"/member/ecommerce/order/new_order/OrderStatus",
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					trigger:trigger
				},
				success  : 	function(result){
					window.location = '/member/ecommerce/order/'+result;
				},
				error 	 : 	function(err){
					$(".create-order-modal").html('Create order');
					toastr.error('Error, something went wrong.');
				}
			});
		});
		// PaymentModal
	}
	function popover(){	

		$('[data-toggle="popover"]').popover(); 
		$(function(){
			$('[rel="popover"]').unbind("popover");

		    $('[rel="popover"]').popover({
		        container: 'body',
		        html: true,
		        content: function () {
		            var clone = $($(this).data('popover-content')).removeClass('hide');
		            return clone;
		        }
		    }).click(function(e) {
		        e.preventDefault();
		    });
		});
		$('#search-customer').popover({ 
		    html : true,
		    content: function() {
				customerajax();
				return $("#popover-customer").html();
		    }
		});
		$("#popover-reserve").popover({
			html : true,
			content : function(){
				return $("#reserve-popover").html();
			}
		});
		$("#shipping-popover").popover({
			html : true,
		    content: function() {
		      return $("#popover-shipping").html();
		    }
		});

		$("#discount-popover").popover({
			html : true,
			content : function(){
				return $("#discount-content").html();
			}
		});
		$("#tax-popover").popover({
			html : true,
			content : function(){
				return $("#popover-tax").html();
			}
		});

		var p = $("#search-customer").popover();
		var discount = $("#discount-popover").popover();
		var shipping = $("#shipping-popover").popover();
		var tax = $("#tax-popover").popover();
		var reserve = $("#popover-reserve").popover();

		p.on("show.bs.popover", function(e){
		    p.data("bs.popover").tip().css({"width": "500px"});
		});
		
		discount.on("show.bs.popover", function(e){
			discount.data("bs.popover").tip().css({"width": "500px"});
		});
		discount.on("shown.bs.popover", function(e){
			discountload();
		});
		shipping.on("show.bs.popover", function(e){
		    shipping.data("bs.popover").tip().css({"min-width": "400px"});
		});
		shipping.on("shown.bs.popover", function(e){
		    shippingload();
		});

		tax.on("shown.bs.popover", function(e){
		    taxload();
		});

		reserve.on("show.bs.popover", function(e){
		    reserve.data("bs.popover").tip().css({"min-width": "500px"});
		});


	}


	function create_orders(){
		$(".btn-add-order").unbind("click");
		$(".btn-add-order").bind("click", function(){
			$(".btn-add-order").html(fa('fa-loader'));
			var form_data = $(".item-result").serialize();
			$.ajax({
				url 	 : 	"/member/ecommerce/order/new_order/create_order",
				type 	 : 	"POST",
				data 	 : 	form_data,
				success  : 	function(result){
					toastr.success('Order created.');
					$(".order-item").html(result);
					$(".btn-add-order").html('Add to order');
					$(".search-list-option").css("display","block");
					$(".search-item-result").css("display","none");
					$("#ProductModal").modal('hide');
					computemain();
					order_operation();

				},
				error 	 : 	function(err){
					toastr.error('Error, something went wrong.');
					$(".btn-add-order").html('Add to order');
				}
			});
		});
	}

	function order_operation(){
		$(".remove-order-item").unbind("click");
		$(".remove-order-item").bind("click", function(){
			var id = $(this).data("content");
			var con = confirm('Do you really want to remove this order?');
			if(con){
				$.ajax({
					url 	 : 	"/member/ecommerce/order/new_order/removeitemorder",
					type 	 : 	"POST",
					data 	 : 	{
						id:id,
						_token:token()
					},
					success  : 	function(result){
						toastr.success("Item removed.");
						$("#trorder_"+id).remove();
						computemain();
					},
					error 	 : 	function(err){
						toastr.error('Error, something went wrong.');
					}
				});
			}
		});
		$(".btn-plus-inventory").unbind("click");
		$(".btn-plus-inventory").bind("click", function(){
			var id = $(this).data("content");
			var value = $("#oder_quantity_"+id).val();
			var n = parseInt(value) + 1;
			$("#oder_quantity_"+id).val(n);
			multiplyItem(id, n);
		});
		$(".btn-minus-inventory").unbind("click");
		$(".btn-minus-inventory").bind("click", function(){
			var id = $(this).data("content");
			var value = $("#oder_quantity_"+id).val();
			if(value > 1){
				var n = parseInt(value) - 1;
				$("#oder_quantity_"+id).val(n);
				multiplyItem(id, n);

			}
		});
		$(".btn-cat-toggle").unbind("click");
		$(".btn-cat-toggle").bind("click", function(){
			var id = $(this).data("id");
			var content = $(this).data("content");
			var trigger = $(this).data("trigger");
			$("#discount-cat-"+id).html(content);
			$("#indi-discount-"+id).attr("data-trigger",trigger);

		});
		$(".btn-close-popover").unbind("click");
		$(".btn-close-popover").bind("click",function(){
			 $(".discountpopover").popover('hide');
		});

		$(".indi-discount").unbind("click");
		$(".indi-discount").bind("click", function(){
			var content = $(this).data("content");
			var trigger = $(this).data("trigger");
			var discount = $("#number-discount-"+content).val();
			var reason = $("#indi_discount_reason_"+content).val();
			var original = $("#orig_amount_"+content).val();
			var def = $("#def_amount_"+content).val();
			var quantity = $("#oder_quantity_"+content).val();
			var discountamount = 0;

			if(discount != "" && discount != null){
				if(trigger == 'amount'){
					discountamount = discount;
				}
				else{
					discountamount = (parseFloat(discount) / 100) * parseFloat(original);
					// alert(discountamount);
				}
				var new_amount = parseFloat(original) - parseFloat(discountamount);
				var total = parseFloat(quantity) * new_amount;
				$.ajax({
					url 	 : 	'/member/ecommerce/order/new_order/addIndiDiscount',
					type 	 : 	"POST",
					data 	 : 	{
						_token:token(),
						content:content,
						trigger:trigger,
						reason:reason,
						discount:discount
					},
					success  : 	function(result){
						$(".discountpopover").popover('hide');
						toastr.success('Discount added.');
						$("#def_amount_"+content).val(new_amount.toFixed(2));
						$("#a_new_amount_"+content).html(strmoney(new_amount));
						$("#discount_amount_"+content).html(strmoney(original));
						$(".item-amount-"+content).html(strmoney(total));
						$(".float-amount-"+content).val(total.toFixed(2));
						recomputeorder();
					},
					error 	 : 	function(err){
						toastr.error('Error, something went wrong.');
					}
				});
			}
		});

	}
	function ajaxquantity(id = 0, quantity = 0){
		$.ajax({
			url 	 : 	 "/member/ecommerce/order/new_order/chagequantity",
			type 	 : 	 "POST",
			data 	 : 	{
				_token:token(),
				id:id,
				quantity:quantity
			},
			success  : 	function(result){

			},
			error 	 : 	function(err){
				toastr.error("Error, something went wrong.");
			}
		});
	}
	function strmoney(amount = 0){
		amount = parseFloat(amount);
		var str = amount.toFixed(2).replace(/./g, function(c, i, a) {
		    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
		return str;
	}
	function multiplyItem(id = 0, n = 0){

		var value = $("#def_amount_"+id).val();
		var amount = parseFloat(value) * parseInt(n);
		// var stramount = Number(amount.toFixed(2)).toLocaleString();
		var stramount = amount.toFixed(2).replace(/./g, function(c, i, a) {
		    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
		$(".item-amount-"+id).html(stramount);
		$(".float-amount-"+id).val(amount);
		recomputeorder();
		ajaxquantity(id, n);
		computemain();
	}
	function taxload(){
		var taxtrigger = $("#taxpercent").attr("data-trigger");
		if(taxtrigger == 1){
			$("#check-charge").prop('checked',true);
		}
		else{
			$("#check-charge").prop('checked',false);
		}
		
		$(".btn-tax-canel").unbind("click");
		$(".btn-tax-canel").bind("click", function(){
			$("#tax-popover").popover("hide");
		});
		$(".btn-charge-tax").unbind("click");
		$(".btn-charge-tax").bind("click", function(){
			var id = $(this).data("content");
			var chck = $("#check-charge").is(':checked');
			
			var subtotal = parseFloat($(".hidden_subtotal").val());
			var tax = 0;
			var strtax = '';
			var isTax = 0;
			if(chck){
				tax = (20 /100) * subtotal;
				strtax = strmoney(tax);
				isTax = 1;
			}
			else{
				tax = 0;
				isTax = 0;
				strtax	= '--';
			}
			$.ajax({
				url 	 : 	 "/member/ecommerce/order/new_order/applytax",
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					id:id,
					isTax:isTax
				},
				success  : 	function(result){
					$(".tax-content").html(strtax);
					$("#deftax").val(tax);
					
					$("#tax-popover").popover('hide');
					$("#taxpercent").val(20);
					$("#taxpercent").attr("data-trigger",isTax);
					$("#taxpercent").attr("data-trigger",isTax);
					// alert(isTax);
					computemain();
				},
				error 	 : 	function(err){
					toastr.error('Error, something went wrong.');
				}
			});
			
		});
	}
	function shippingload(){
		$(".shipping-name").unbind("focus");
		$(".shipping-name").bind("focus", function(){

			$("#shipping-free").prop("checked",false);
			$("#shipping-custom").prop("checked",true);
			$(".btn-shipping").attr("data-trigger",'custom');
		});
		$(".shipping-price").unbind("focus");
		$(".shipping-price").bind("focus", function(){
			$("#shipping-free").prop("checked",false);
			$("#shipping-custom").prop("checked",true);
			$(".btn-shipping").attr("data-trigger",'custom');
		});
		$(".shipping-radio").unbind("change");
		$(".shipping-radio").bind("change", function(e){
			var val = $(this).val();
			$(".btn-shipping").attr("data-trigger",val);
		});
		$(".shipping-name").unbind("change");
		$(".shipping-name").bind("change", function (){
			var amount = $(this).find(':selected').attr('data-amount');
			$(".shipping-price").val(amount);
		});
		$(".btn-shipping").unbind("click");
		$(".btn-shipping").bind("click", function(){
			var trigger = $(this).data('tirgger');
			var price = $(".shipping-price").val();
			var name = $(".shipping-name").val();
			var shipping_name = $(".shipping-name").find(':selected').html();
			if(price == '' || price == null){
				price = 0;
			}
			$.ajax({
				url 	 : 	"/member/ecommerce/order/new_order/addshipping",
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					trigger:trigger,
					price:price,
					name:name
				},
				success  : 	function(result){
					$("#shipping-popover").popover('hide');
					$(".shipping_amount").html(strmoney(price));
					$(".hidden_shipping_amount").val(price);
					$(".p-shipping").html(shipping_name);
					computemain();
				},
				error 	 : 	function(err){
					toastr.error('Error, something went wrong.');
				}
			});
		});
	}
	function discountload(){
		$(".toggle_discount_main").unbind("click");
		$(".toggle_discount_main").bind("click", function(){
			var content = $(this).data("content");
			var trigger = $(this).data("trigger");
			$(".span-discount-main").html(content);
			$(".approve-main-discount").attr("data-trigger",trigger);
		});
		$(".btn_close_dis_pop").unbind("click");
		$(".btn_close_dis_pop").bind("click", function(){
			$("#discount-popover").popover('hide');
		});
		$(".approve-main-discount").unbind("click");
		$(".approve-main-discount").bind("click", function(){

			var amount = parseFloat($(".main-discount-amount").val());
			
			var reason = $(".main-discount-reason").val();
			var trigger = $(this).data("trigger");
			var deftotal = parseFloat($(".hidden_subtotal").val());
			var shipping = parseFloat($(".hidden_shipping_amount").val());
			var tax = parseFloat($("#deftax").val());
			var discount =  0;
			var total = 0;
			var strdiscount = '';
			var id = $(this).data("content");
			
			if(amount == "" && amount == null){
				amount = 0; 
			}
			if(trigger == 'amount'){
				discount = parseFloat(amount);
			}
			else{
				discount = (parseFloat(amount) / 100) * deftotal;
			}
			total = (deftotal + shipping + tax) - discount;
			
			if(discount == 0){
				strdiscount = '--';
			}
			else{
				strdiscount = '- '+strmoney(discount);
			}
			$.ajax({
				url 	 : 	"/member/ecommerce/order/new_order/addMainDiscount",
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					amount:amount,
					reason:reason,
					trigger:trigger,
					id:id
				},
				success  : 	function(result){

					$(".approve-main-discount").attr("data-content",id);
					$("#total_order_amount").html(strmoney(total));
					$("#def_total_ordering").val(total);
					$(".main-discount").html(strdiscount);
					$("#defdiscount").val(discount);
					$("#discount_num").val(amount);
					$("#discount_num").attr("data-trigger",trigger);
					$("#discount-popover").popover('hide');
					$(".main-discount-amount").val(amount);
					$(".main-discount-reason").val(reason);
					$(".p-discount-reason").html(reason);
					toastr.success("Discount added.");

				},
				error 	 : 	function(err){
					toastr.error("Error, something went wrong.");
				}
			});
		
		});
	}
	function computemain(){
		var subtotal = 0;
		$(".float-amount").each(function(){
			subtotal += parseFloat($(this).val());
		});
		// alert(subtotal);
		$(".hidden_subtotal").val(subtotal);
		var taxpercent = $("#taxpercent").val();
		var taxtrigger = $("#taxpercent").attr("data-trigger");
		var discount_num = $("#discount_num").val();
		var discounttrigger = $("#discount_num").data('trigger');
		var tax = 0;

		// alert(taxtrigger);
		if(taxtrigger == 0){
			tax = 0;
			$(".p-tax-percent").html('');
		}
		else{
			tax = subtotal * (taxpercent / 100);
			var taxstr = '';
			if(taxpercent > 0){
				taxstr = 'VAT '+taxpercent + '%';
			}
			$(".p-tax-percent").html(taxstr);
		}
		var  discount = 0;
		if(discounttrigger == 'amount'){
			discount = discount_num;
		}
		else{
			discount = (discount_num / 100) * subtotal;
		}
		// var subtotal = parseFloat($(".hidden_subtotal").val());
		var shipping = parseFloat($(".hidden_shipping_amount").val());
		// var tax = parseFloat($("#deftax").val());
		var total = 0;
		total = (subtotal + shipping + tax) - discount;
		var strtax = '';
		if(tax == 0){
			strtax = '--';
		}
		else{
			strtax = strmoney(tax);
		}
		var strdiscount = '';
		if(discount == 0){
			strdiscount = '--';
		}
		else{
			strdiscount = ' - '+strmoney(discount)
		}
		$(".subtotal").html(strmoney(subtotal));
		$("#total_order_amount").html(strmoney(total));
		$(".tax-content").html(strtax);
		$(".main-discount").html(strdiscount);
	}
	function recomputeorder(){
		
		var total = 0;
		$(".float-amount").each(function(){
			var value = $(this).val();
			total += parseFloat(value);
		});
		$(".hidden_subtotal").val(total);
		var strtotal = total.toFixed(2).replace(/./g, function(c, i, a) {
		    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
		$(".subtotal").html(strtotal);
	}
	function searchitem(){
		$(".search-custom-list").unbind("click");
		$(".search-custom-list").bind("click", function(){
			var cat = $(this).data("content");
			var content = cat+',category';

			$(".search-list-option").css("display","none");
			$(".search-item-result").css("display","block");
			$(".back-list").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;'+cat);
			globalajax(content, '/member/ecommerce/order/new_order/itemlist','.item-result');

		});
		$(".back-list").unbind("click");
		$(".back-list").bind("click", function(){
			$(".search-list-option").css("display","block");
			$(".search-item-result").css("display","none");
		});

		$(".search-product").unbind("keyup");
		$(".search-product").bind("keyup", function(e){
			var search = $(this).val();

			$(".drop-down-search").css("display","none");
			if(search != "")
			{
				$(".drop-down-search").css("display","block");
			}
			
			$(".search-tray").html("<span style='width:100%;text-align:center'>" +fa('fa-loader')+ "</span>");
			console.log(search);
			$.ajax({
				url 	: 	"/member/ecommerce/search_item",
				type 	: 	"POST",
				data 	: 	{
					search:search,
					_token:token()
				},
				success : 	function(result){
					$(".search-tray").html(result);
				},
				error 	: 	function(err){
					// toastr.error("Error, something went wrong.");
				}
			});
				// globalajax(search, '/member/ecommerce/search_item','.search-tray');
			
			
			
		});
	}

	function searchclick()
	{
		$(".item-list-search").unbind("click");
		$("item-list-search").bind("click", function()
		{
			var value = $(this).data("value");
			$.ajax({
				url 	: 	"",
				ty
			});
		});
	}

	function subcategory(){
		$(".search-sub-custom-list").unbind("click");
		$(".search-sub-custom-list").bind("click", function(){
			var cat = $(this).data("value");
			var name = $(this).data("content");
			var trigger = $(this).data("tirgger");
			var content = cat+','+trigger;
			$(".back-list").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;'+name);
			globalajax(content, '/member/ecommerce/order/new_order/itemlist','.item-result');
		});
	}
	function searchcustomer(){
		$(".search-customer").unbind("keydown");
		$(".search-customer").bind("keydown", function(){
			console.log($(this).val());
			customerajax($(this).val());
		});
	}
	function customerajax(str = ''){
	
		$(".customer-list").html(loader('loader-4-gray'));
		$.ajax({
			url 	: 	"/member/ecommerce/order/new_order/searchscustomer",
			type 	: 	"POST",
			data 	: 	{
				_token:token(),
				str:str
			},
			success : 	function(result){
				$(".customer-list").html(result);
				customerinfoclick();
			},
			error 	: 	function(err){
				toastr.error("Error, something went wrong.");
			}
		});

	}
	function customerinfoclick(){
		$(".customer-click").unbind("click");
		$(".customer-click").bind("click", function(){
			var id = $(this).data("content");
			$(".search-customer-form").css("display","none");
			$(".customer-info-div").css("display","block");
			globalajax(id,'/member/ecommerce/order/new_order/customerinfo','.cutomer-result');
		});
		$(".a-close").unbind("click");
		$(".a-close").bind("click", function(){
			var order = $(this).data("order");
			var customer = $(this).data("customer");
			
			$.ajax({
				url 	 : 	'/member/ecommerce/order/new_order/removecustomer',
				type 	 : 	"POST",
				data 	 : 	{
					_token:token(),
					order:order,
					customer:customer
				},
				success  : 	function(result){
					$(".search-customer-form").css("display","block");
					$(".customer-info-div").css("display","none");
					$(".span-tax-exempt").css("display",'none');
					$("#tax-popover").css('display','block');
					$(".tax-content").html('--');
					$(".p-tax-percent").html('');
					$("#deftax").val('0');
					$("#taxpercent").val('0');
					computemain();
				},
				error 	 : 	function(err){
					toastr.error("Error, something went wrong.");
				}
			});
			
		});
	}
	function customertax(){
		var order_id = $("#hidden_order").val();
		var customer_id = $("#hidden_customer").val();
		var tax = $("#customer_tax").val();
		$(".a-close").attr("data-order",order_id);
		$(".a-close").attr("data-customer", customer_id);
		if(tax == 0){
			$(".span-tax-exempt").css("display",'none');
			$("#tax-popover").css('display','block');
		}
		else{
			$(".span-tax-exempt").css("display",'block');
			$("#tax-popover").css('display','none');
		}
		$(".tax-content").html('--');
		$("#deftax").val(0);

		computemain();
	}
	function globalajax(content = '', urls = '', target = ''){
		// console.log(content);
		$(target).html(loader('loader-16-gray'));
		$.ajax({
			url 	 : 	urls,
			type 	 : 	"POST",
			data 	 : 	{
				_token:token(),
				content:content
			},
			success  : 	function(result){
				$(target).html(result);
				editajaxoperation();
				searchitemOperation();
				subcategory();
				customertax();
			},
			error 	 : 	function(err){
				$(target).html(errorhandlers(content, urls, target));
				errorfunction();
			}
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
	}
	function searchitemOperation(){
		$(".main-check-box").unbind("click");
		$(".main-check-box").bind("click", function(){
			var id = $(this).data("content");
			if($("#main-check-box-"+id).is(':checked')){
				$(".child-check-box-"+id).prop('checked', true);
			}
			else{
				$(".child-check-box-"+id).prop('checked', false);
			}
		});
		$(".child-check-box").unbind("click");
		$(".child-check-box").bind("click", function(){
			var main = $(this).data('main');
			$("#main-check-box-"+main).prop('checked', true);
		});
	}
	function outsideclick() {
		$(document).on('click', function (e) {
		    $('[data-toggle="popover"],[data-original-title]').each(function () {
		        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
		            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
		        }
		    });
		    $(".custom-drop-down").fadeOut('fast');

		});

	}
	
	function textExpand(){

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
		});

	}
	function customer(){
		$(".btn-new-customer").unbind("click");
		$(".btn-new-customer").bind("click", function(){
			var html = $(".btn-new-customer").html();
			var new_first_name = $(".new_first_name").val();
			var new_last_name = $(".new_last_name").val();
			var new_email = $(".new_email").val();
			var new_accepts_marketing = $(".new_accepts_marketing").val();
			var new_tax_exempt = $(".new_tax_exempt").val();
			var new_company = $(".new_company").val();
			var new_phone = $(".new_phone").val();
			var new_address = $(".new_address").val();
			var new_address_cont = $(".new_address_cont").val();
			var new_city = $(".new_city").val();
			var new_country = $(".new_country").val();
			var new_province = $(".new_province").val();
			var new_zip_code = $(".new_zip_code").val();

			if(new_first_name != "" && new_last_name != "" && new_email != "" && new_phone != "" && new_address != "" && new_city != "" && new_country != "" && new_zip_code != ""){
				var forms = $("#new-customer-form").serialize();
				$(".btn-new-customer").html(fa('fa-loader'));
				$.ajax({
					url 	: 	"/member/ecommerce/order/new_order/create_customer",
					type 	: 	"POST",
					data 	: 	forms,
					success : 	function(result){
						if(result == 'success'){
							toastr.success("New customer has been added.");
							$(".new_first_name").val("");
							$(".new_last_name").val("");
							$(".new_email").val("");
							$(".new_accepts_marketing").attr('checked',false);
							 $(".new_tax_exempt").attr('checked',false);
							$(".new_company").val("");
							$(".new_phone").val("");
							$(".new_address").val("");
							$(".new_address_cont").val("");
							$(".new_city").val("");
							$(".new_province").val("");
							$(".new_zip_code").val("");
							
						}
						else{
							toastr.error(result);
						}
						$(".btn-new-customer").html(html);
						
					},
					error 	: 	function(err){
						toastr.error("Error, something went wrong.");
						$(".btn-new-customer").html(html);
					}
				});
			}
			else{

				toastr.error("Please fill the missing field/s.");
			}
		});
	}
	function errorhandlers(content = '', url = '', div = ''){
		var html = '<div class="alert alert-danger text-center">Error, something went wrong</div>';
		html += '<center><button class="btn btn-primary btn-reload" data-content="'+content+'" data-url="'+url+'" data-div="'+div+'"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;Reload</button></center>';
		return html;
	}
	function errorfunction()
	{
		$(".btn-reload").unbind("click");
		$(".btn-reload").bind("click", function (){
			var content = $(this).data("content");
			var url 	= $(this).data("url");
			var div 	= $(this).data("div");
			globalajax(content, url, div);
		});
	}
	function fa(str)
	{
		switch(str){
			case 'fa-loader':
				return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>'
				break;
		}
	}
	
	function token(){
		return $("#_token").val();
	}

	function loader(str){
		return '<div class="'+str+'"></div><center><span class="f-gray">Loading...</span></center>';
	}
	function windows8loader(){
		var html = '<div class="windows8">';
		html = '<div class="wBall" id="wBall_1">';
		html = '<div class="wInnerBall"></div>';
		html = '</div>';
		html = '<div class="wBall" id="wBall_2">';
		html = '<div class="wInnerBall"></div>';
		html = '</div>';
		html = '<div class="wBall" id="wBall_3">';
		html = '<div class="wInnerBall"></div>';
		html = '</div>';
		html = '<div class="wBall" id="wBall_4">';
		html = '<div class="wInnerBall"></div>';
		html = '</div>';
		html = '<div class="wBall" id="wBall_5">';
		html = '<div class="wInnerBall"></div>';
		html = '</div>';
		html = '</div>';
		return html;
	}
}


function submit_done_customer(result){
	result = JSON.parse(result);
	console.log(result);
}