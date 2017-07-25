$(document).ready(function()
{
	var $view_prod = $('[data-remodal-id="view_prod_modal"]').remodal();
	// $view_prod.open();


	// $('voucher-prod-container').
	// view-voucher
	$('#table').on('click', '.view-voucher', function(event) {
		event.preventDefault();
		$('#voucher-prod-container').empty();
		$voucher_id = $(this).attr('voucher-id');

		console.log($voucher_id);


		$.ajax({
			url: 'stockist/voucher/show_product',
			type: 'get',
			dataType: 'html',
			data: {voucher_id: $voucher_id},
		})
		.done(function(data) {
			// console.log("success");
			$('#voucher-prod-container').append(data);
			$view_prod.open();
		})
		.fail(function() {
			// console.log("error");
			alert("Error on showing voucher products.");

		})
		.always(function() {
			// console.log("complete");
		});
		
		/* Act on the event */
	});




});