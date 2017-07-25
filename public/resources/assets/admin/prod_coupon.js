$(document).ready(function($) {



	if($('#prod_coupon_error').length)
	{

		$('.after-loading-message-details').empty();
		$('.after-loading-message-title').empty();
		$('.modal-header').addClass('alert alert-danger');

		var appendProductCouponError = $('#prod_coupon_error').html();
		$('.after-loading-message-title').text('Product Coupon');
		$('.after-loading-message-details').append(appendProductCouponError);
		$('.after-loading-message').modal('show');

	}

});