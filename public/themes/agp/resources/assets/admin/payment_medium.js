var payment_medium = new payment_medium();
function payment_medium()
{

	init();

	function init()
	{	
		$(document).ready(function() {

			add_new_medium_type_event();
			delete_medium_event();
		});

	}

	function add_new_medium_type_event()
	{
		$('#show-add-pm-type').on('click', function(event)
		{
			event.preventDefault();
			$('#add-pm-type').modal({
				show: true,
				 keyboard: false,
			  backdrop: 'static'
			});
		});


		$('#add-pm-type-submit').on('click', function(event) {
			event.preventDefault();
			var $loading = $('#loading-add-medium-type');
			var $post = $('#add-pm-type form').serialize();
			var $input = $('#add-pm-type form input');
			$loading.fadeIn('slow');
			$.ajax(
			{
				url: 'admin/order/payment-medium-type/add/',
				type: 'post',
				data: $post,
				success: function (data)
				{
					var $append = '<option value="'+data['new_type']['medium_type_id']+'">'+data['new_type']['medium_type_name']+'</option>';
					$('select[name="pm-type"]').append($append);
					setTimeout(function()
					{
						$input.val('');
						$loading.fadeOut('slow');
						$('#add-pm-type').modal('hide');
					}, 1000);
				}
			});

			
			
		});
	}





	function delete_medium_event()
	{
		$('.delete-pm').on('click',function(event)
		{
			event.preventDefault();
			$this = $(this); 
			$token = $('.token').val();
			$id = $(this).attr('pm-id');

			console.log($token);
			console.log($id);

			$.ajax(
			{
				url: 'admin/order/payment-medium/'+$id+'/delete',
				type: 'post',
				data: {
					id: $id,
					_token: $token
				},
				success: function (data) {
					console.log(data);
					$this.fadeOut('slow', function() {
						$(this).closest('tr').remove();
					});

				}
			});
			
		});
	}
}


