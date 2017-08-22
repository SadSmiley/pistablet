function filter_function(statuss, payment_stat, fulfillment_status) 
{
	// alert(statuss);
	// alert('/member/ecommerce/order/filter/'+ statuss + '/' + payment_stat + '/' + fulfillment_status);
	// alert(statuss);
	$('#orders-data-get').html('<div class="col-md-12"><center><img src="/assets/member/images/spinners/22.gif"/></center></div><br>');
	$('#orders-data-get').load('/member/ecommerce/order/filter/'+ statuss + '/' + payment_stat + '/' + fulfillment_status);
	// $.ajax({
	// 	url 	: 	'/member/ecommerce/order/filter/'+ statuss + '/' + payment_stat + '/' + fulfillment_status,
	// 	type 	: 	'GET',
	// 	success : 	function(result){
	// 		$('#orders-data-get').html(result);
	// 	},
	// 	error 	: 	function(err){
	// 		toastr.error("Error, something went wrong.");
	// 	}
	// });
}
var global_view = new global_view();

function  global_view() {
	init();
	function init(){
		document_ready();
	}
	function document_ready(){
		outsideclick();
		popover();
		filter_operation();
	}
	function filter_operation(){
		
		$("#select-filter").unbind("change");
		$("#select-filter").bind("change", function (){
			var content = $(this).val();
			alert(content);
			var html = '';
			var status = '<select class="form-control"><option value="">Select a value...</option><option value="open">open</option><option value="closed">archived</option><option value="cancelled">cancelled</option><option value="any">any</option></select>';
			switch(content){
				case 'reset':
					html = ''
					break;
				case 'status_status':
					html = status
					break;
			}
			$(".filter-tag-div").html();
		});
	}
	function popover(){

		$('#popover').popover({ 
		    html : true,
		    title: function() {
		      return $("#popover-head").html();
		    },
		    content: function() {
		      return $("#popover-content").html();
		      
		    }

		});
	}
	function outsideclick() {
		$(document).on('click', function (e) {

		    $('[data-toggle="popover"],[data-original-title]').each(function () {
		        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
		            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
		        }

		    });
		});
	}
}