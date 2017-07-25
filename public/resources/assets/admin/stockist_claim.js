
var process_claim = new process_claim();
function process_claim()
{	


	document_ready();

	function document_ready()
	{
		$(document).ready(function()
		{	
			process_claim_init();
			process_void_init();
		});
	}


	function process_claim_init()
	{
		$('.submit-claim').on('click', function(event)
		{
			$('#ajax-message').empty();
			event.preventDefault();
			var $voucher_id = $(this).attr('voucher-id');
			var $account_password = $('input[name="account_password"]').val();
			var $_token = $('meta[name="_token"]').attr('content');
			// console.log($account_password);
			// console.log($voucher_id);
			$.ajax({
				url: 'stockist/voucher/claim',
				type: 'POST',
				dataType: 'json',
				data: {voucher_id: $voucher_id,
						account_password:$account_password,
						_token : $_token
						},
			})
			.done(function($data) {
				if($data['_error'])
				{
					var $errors = ""; 
					$.each($data['_error'], function(index, val)
					{
						$errors += "<li>"+val+"</li>";
					});
					$errors = '<div class="col-md-12 alert alert-danger"><ul>'+$errors+'</ul></div>';
					
					$('#ajax-message').append($errors);


				}else
				{
					var $append = '<div class="col-md-12 alert alert-success"><ul>Voucher successfully claimed.</ul></div>';
					$('#ajax-message').append($append);
					$('.voucher-stat').fadeOut('slow', function()
					{
						$(this).remove();
					});
				}
				// if($data['error'])
			})
			.fail(function() {
				// console.log("error");
				$('#ajax-message').empty();
				alert("Something went wrong while claiming voucher.");
			})
			.always(function() {
				// console.log("complete");
			});
			
		});
	}



	function process_void_init()
	{
		$('.void-voucher').on('click', function(event)
		{

			$('#ajax-message').empty();
			event.preventDefault();
			var $voucher_id = $(this).attr('voucher-id');
			var $account_password = $('input[name="account_password"]').val();
			var $_token = $('meta[name="_token"]').attr('content');

			$.ajax({
				url: 'stockist/voucher/void',
				type: 'post',
				dataType: 'json',
				data: {voucher_id: $voucher_id,
						account_password:$account_password,
						_token : $_token
						},
			})
			.done(function($data) {
				if($data['_error'])
				{
					var $errors = ""; 
					$.each($data['_error'], function(index, val)
					{
						$errors += "<li>"+val+"</li>";
					});
					$errors = '<div class="col-md-12 alert alert-danger"><ul>'+$errors+'</ul></div>';
					
					$('#ajax-message').append($errors);


				}else
				{
					var $append = '<div class="col-md-12 alert alert-warning"><ul>Voucher successfully void.</ul></div>';
					$('#ajax-message').append($append);
					$('.voucher-stat').fadeOut('slow', function()
					{
						$(this).remove();
					});
				}
				// if($data['error'])
			})
			.fail(function() {
				// console.log("error");
				$('#ajax-message').empty();
				alert("Something went wrong while claiming voucher.");
			})
			.always(function() {
				// console.log("complete");
			});
			
		});
	}
}