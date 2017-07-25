

jQuery(document).ready(function($)
{	

	var adjustWalletModal = $('[data-remodal-id=adjust-wallet]').remodal();
	var adjustWalletMessageModal = $('[data-remodal-id=adjust-wallet-success-modal]').remodal();
	var slotIdInput = $('#ajust-wallet-form input[name=slot_id]');
	var slotWalletAmountInput = $('#ajust-wallet-form input[name=wallet_amount]');
	var slotWalletAdjustmentAmountInput = $('#ajust-wallet-form input[name=wallet_adjustment_amount]');
	var slotWalletAdjustment = $('#ajust-wallet-form [name=wallet_adjustment]');
	var adjustWalletSubmitBtn = $('.ajust-wallet-submit-btn');
	var remodalBtn = $('.remodal-btn');
	var adjustWalletMessage = $('.adjsut-wallet-message');
	var adjustWalletMessageSuccess = $('.adjust-wallet-success-msg-box');
	




	$('#table tbody').on('click', 'tr td a.adjust-slot', function(){
	

		var slot_id = $(this).attr('slot-id');
		var slot_wallet_amount = $(this).text();
		adjustWalletMessage.empty();
		slotIdInput.val(slot_id);
		slotWalletAmountInput.val(slot_wallet_amount);
		adjustWalletModal.open();
		
	});

	var ajaxReq = null;
	slotWalletAdjustmentAmountInput.on('keyup', function(){
		

		if(ajaxReq)
		{
			ajaxReq.abort();
		}
		var formData = $(this).closest('form').serialize();
		
		ajaxReq = $.ajax({
			url: 'admin/maintenance/slots/computeAdjustment',
			type: 'GET',
			dataType: 'json',
			data: formData
		})
		ajaxReq.done(function(data) {
			slotWalletAmountInput.val(data.current_wallet_amount);
		})
		ajaxReq.fail(function() {
			console.log("Error on computing wallet adjustment.");
		})
		ajaxReq.always(function() {
		});
		
	});

	slotWalletAdjustment.on('change', function()
	{
		slotWalletAdjustmentAmountInput.trigger('keyup');
	});
	// 

	var ajaxReqAdjustWallet = null;
	adjustWalletSubmitBtn.on('click', function(event){
		event.preventDefault();
		var formData = $(this).closest('form').serialize();
		if(ajaxReqAdjustWallet)
		{
			ajaxReqAdjustWallet.abort();
		}
		adjustWalletMessage.empty();
		remodalBtn.prop('disabled', true);
		ajaxReqAdjustWallet = $.ajax({
			url: 'admin/maintenance/slots/adjustWallet',
			type: 'POST',
			dataType: 'json',
			data: formData
		})
		ajaxReqAdjustWallet.done(function(data) {
			console.log(data);
			adjustWalletMessage.empty();
			var append = "";
			var arr = ['tasdasd', 'adasdas', 'asdasdasd'];
			if(data.errors.length)
			{


				append = data.errors.join("</br>");
				append = '<p class="text-danger">'+ append + '</p>';
				adjustWalletMessage.append(append);
			}
			else
			{	
				$slot_table.draw();
				var method = data.slot_adjustment == 'add' ? 'added' : 'deducted';
				append = "You have successfully "+ method + " " + data.wallet_adjustment_amount + " to slot # " + data.slot_id + ".";
				append = '<p class="text-success">'+ append + '</p>';
				slotIdInput.val("");
				slotWalletAdjustmentAmountInput.val("");
				slotWalletAmountInput.val("");
				adjustWalletMessageSuccess.empty();
				adjustWalletMessageSuccess.append(append);
				adjustWalletMessageModal.open()
				
			}
			
		})
		ajaxReqAdjustWallet.fail(function() {
			console.log("Error on adjusting wallet.");
		})
		ajaxReqAdjustWallet.always(function() {
			console.log("complete");
			remodalBtn.prop('disabled', false);
		});
		
	});

	
	$(document).on('closed', adjustWalletModal , function (e) {

		slotIdInput.val("");
		slotWalletAdjustmentAmountInput.val("");
		slotWalletAmountInput.val("");
		remodalBtn.prop('disabled', false);

	});


	$(document).on('closed', adjustWalletMessageModal , function (e) {

		adjustWalletMessageSuccess.empty();

	});

});



jQuery(document).ready(function($)
{	

	var adjustWalletModalGC = $('[data-remodal-id=adjust-gc]').remodal();
	var adjustWalletMessageGCModalGC = $('[data-remodal-id=adjust-wallet-success-modal]').remodal();
	var slotIdInputGC = $('#ajust-wallet-form-gc input[name=slot_id]');
	var slotWalletAmountInputGC = $('#ajust-wallet-form-gc input[name=wallet_amount_gc]');
	var slotWalletAdjustmentGCAmountInputGC = $('#ajust-wallet-form-gc input[name=wallet_adjustment_amount_gc]');
	var slotWalletAdjustmentGC = $('#ajust-wallet-form-gc [name=wallet_adjustment_gc]');
	var adjustWalletSubmitBtnGC = $('.ajust-wallet-submit-btn-gc');
	var remodalBtnGC = $('.remodal-btn-gc');
	var adjustWalletMessageGC = $('.adjsut-wallet-message-gc');
	var adjustWalletMessageGCSuccess = $('.adjust-wallet-success-msg-box');
	




	$('#table tbody').on('click', 'tr td a.adjust-slot-gc', function(){
	

		var slot_id = $(this).attr('slot-id');
		var slot_wallet_amount = $(this).text();
		adjustWalletMessageGC.empty();
		slotIdInputGC.val(slot_id);
		slotWalletAmountInputGC.val(slot_wallet_amount);
		adjustWalletModalGC.open();
		slotWalletAdjustmentGCAmountInputGC.val("");
		
	});

	var ajaxReq = null;
	slotWalletAdjustmentGCAmountInputGC.on('keyup', function(){
		

		if(ajaxReq)
		{
			ajaxReq.abort();
		}
		var formData = $(this).closest('form').serialize();
		
		ajaxReq = $.ajax({
			url: 'admin/maintenance/slots/computeAdjustmentGC',
			type: 'GET',
			dataType: 'json',
			data: formData
		})
		ajaxReq.done(function(data) {
			slotWalletAmountInputGC.val(data.current_wallet_amount_gc);
		})
		ajaxReq.fail(function() {
			console.log("Error on computing wallet adjustment.");
		})
		ajaxReq.always(function() {
		});
		
	});

	slotWalletAdjustmentGC.on('change', function()
	{
		slotWalletAdjustmentGCAmountInputGC.trigger('keyup');
	});
	// 

	var ajaxReqAdjustWallet = null;
	adjustWalletSubmitBtnGC.on('click', function(event){
		event.preventDefault();
		var formData = $(this).closest('form').serialize();
		if(ajaxReqAdjustWallet)
		{
			ajaxReqAdjustWallet.abort();
		}
		adjustWalletMessageGC.empty();
		remodalBtnGC.prop('disabled', true);
		ajaxReqAdjustWallet = $.ajax({
			url: 'admin/maintenance/slots/adjustWalletGC',
			type: 'POST',
			dataType: 'json',
			data: formData
		})
		ajaxReqAdjustWallet.done(function(data) {
			console.log(data);
			adjustWalletMessageGC.empty();
			var append = "";
			var arr = ['tasdasd', 'adasdas', 'asdasdasd'];
			if(data.errors.length)
			{


				append = data.errors.join("</br>");
				append = '<p class="text-danger">'+ append + '</p>';
				adjustWalletMessageGC.append(append);
			}
			else
			{	
				$slot_table.draw();
				var method = data.slot_adjustment == 'add' ? 'added' : 'deducted';
				append = "You have successfully "+ method + " " + data.wallet_adjustment_amount + " GC to slot # " + data.slot_id + ".";
				append = '<p class="text-success">'+ append + '</p>';
				slotIdInputGC.val("");
				slotWalletAdjustmentGCAmountInputGC.val("");
				slotWalletAmountInputGC.val("");
				adjustWalletMessageGCSuccess.empty();
				adjustWalletMessageGCSuccess.append(append);
				adjustWalletMessageGCModalGC.open()
				
			}
			
		})
		ajaxReqAdjustWallet.fail(function() {
			console.log("Error on adjusting wallet.");
		})
		ajaxReqAdjustWallet.always(function() {
			console.log("complete");
			remodalBtnGC.prop('disabled', false);
		});
		
	});

	
	$(document).on('closed', adjustWalletModalGC , function (e) {

		slotIdInputGC.val("");
		slotWalletAdjustmentGCAmountInputGC.val("");
		slotWalletAmountInputGC.val("");
		remodalBtnGC.prop('disabled', false);

	});


	$(document).on('closed', adjustWalletMessageGCModalGC , function (e) {

		adjustWalletMessageGCSuccess.empty();

	});

});