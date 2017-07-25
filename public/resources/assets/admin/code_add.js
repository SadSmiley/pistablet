
var modalOpt = {hashTracking: false, closeOnOutsideClick: false, closeOnEscape: false};
var codeQtyModal = $('[data-remodal-id="code-modal-qty"]').remodal(modalOpt);

var loaderContainer = $('.loader-container');
var loader = $('.loader');

var selectedMembershipId = $('.selected-membership-id');
var selectedProductPackageId = $('.selected-product_package_id');
var selectedCodeType = $('.select-code-type');
var modalBtn = $('.modal-btn');

function showCart()
{
	// $('.tbl-code-cart tbody').load('/admin/maintenance/codes/show-cart');
	if_code_type_cd();
}

function if_code_type_cd()
{
	if(selectedCodeType.val() == 3)
	{
		$('.for-tendered').hide();	
		$('.tbl-code-cart tbody').load('/admin/maintenance/codes/show-cart?code_type_id=3');
	}
	else
	{
		$('.for-tendered').show();
		$('.tbl-code-cart tbody').load('/admin/maintenance/codes/show-cart');	
	}
}

jQuery(document).ready(function($)
{
	selectedCodeType.change(function()
	{
		if_code_type_cd();
	});

	showCart();
	$(document).on('closed', '.remodal', function (e)
	{	
  		$('.form-code-qty input').val("");
	});

	$('.add-to-cart-btn').on("click", function(event){
		event.preventDefault();
		var productPackageId = selectedProductPackageId.val();
		var membership_to_id = selectedMembershipId.val();
		$('.form-code-qty input[name="product_package_id"]').val(productPackageId);
		$('.form-code-qty input[name="membership_to_id"]').val(membership_to_id);
		$('#membership_to_id').val(membership_to_id);
		$('#product_package_id').val(productPackageId);
		codeQtyModal.open();
		$('.form-code-qty input[name="qty"]').focus();
	});

	$('.add-to-cart-submit').on('click', function(event){
		event.preventDefault();
		loaderContainer.addClass('load_opacity');
		loader.show();
		var productPackageId = selectedProductPackageId.val();
		var membership_to_id = selectedMembershipId.val();
		$('.form-code-qty input[name="product_package_id"]').val(productPackageId);
		$('.form-code-qty input[name="membership_to_id"]').val(membership_to_id);
		$('#membership_to_id').val(membership_to_id);
		$('#product_package_id').val(productPackageId);
		var formData = $('.form-code-qty').serialize();
		$.ajax({
			url: 'admin/maintenance/codes/add-to-cart',
			type: 'post',
			dataType: 'json',
			data: formData
		})
		.done(function(data) {
			// alert(data);
		})
		.fail(function() {
		})
		.always(function() {
			showCart();
			loaderContainer.removeClass('load_opacity');
			loader.hide();
			codeQtyModal.close();
			$('#addordermodal').modal('toggle');
		});
		

	});

	$('.tbl-code-cart tbody').on('click', 'tr td .remove-from-cart', function(){
		var cartIndex = $(this).attr('cart-index');
		$.ajax({
			url: 'admin/maintenance/codes/remove-from-cart',
			type: 'POST',
			dataType: 'json',
			data: {cartIndex: cartIndex},
		})
		.done(function(data) {
		})
		.fail(function() {
		})
		.always(function() {
			showCart();
		});

	});



});


