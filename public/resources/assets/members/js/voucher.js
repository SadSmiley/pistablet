var voucher = new voucher();

function voucher()
{	

	init();
	function init()
	{
		documentReady();
	}


	function documentReady()
	{
		$(document).ready(function() 
		{
			showVoucherProduct();
			printVoucherProduct();
		});
	}

	var voucherProductRemodal = $('[data-remodal-id=view-voucher-product]').remodal();
	function showVoucherProduct()
	{
		$('.view-voucher').on('click', function(event)
		{	
			var $voucher_id = $(this).attr('voucher-id');
			event.preventDefault();
			getVoucherProduct($voucher_id);
			voucherProductRemodal.open();
		});



		$(document).on('opening', voucherProductRemodal, function (e)
		{
			$('#view-voucher-product-container').empty();
		})
	}


	function getVoucherProduct($voucher_id)
	{
		$('.voucher_preloader').fadeIn();
		$.ajax({
			url: 'member/voucher/product',
			type: 'get',
			dataType: 'html',
			data: {voucher_id: $voucher_id},
		})
		.done(function($html)
		{	
			setTimeout(function()
			{
				$('#view-voucher-product-container').empty();
				$('#view-voucher-product-container').append($html);
				$('.voucher_preloader').fadeOut();
			}, 1000);

			// console.log("success");
		})


		.fail(function() {
			// console.log("error");
			alert("Erro on showing Voucher Products.");
		})
		.always(function() {
			// console.log("complete");
		});
		
	}


	function printVoucherProduct()
	{	


		$('#view-voucher-product-container').on('click', '.print-voucher-btn', function(event)
		{
			event.preventDefault();
			// alert(213214);
			/* Act on the event */
			window.print();
		});

	}



}