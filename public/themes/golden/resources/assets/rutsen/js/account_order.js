
var account_order = new account_order();

function account_order()
{
	init();
	function init()
	{
		$(document).ready(function()
		{
			add_proof_upload_event();
			error();
		});	
	}

	function add_proof_upload_event()
	{
		$('a.add-proof').on('click',function(event)
		{
			event.preventDefault();

			var $id = $(this).attr('order-id');	
			$('#add-proof-popup form #order-id').val($id);

			$('#add-proof-popup').modal('show');
			
		});

		$('#add-proof-popup-submit').on('click', function(event)
		{
			event.preventDefault();
			$('#add-proof-popup form .err').hide();
			var file = document.getElementById('filefield').files.length;

			if(file <= 0 )
			{
				$('#add-proof-popup form .err').fadeIn('slow');
			}
			else
			{
				$('#add-proof-popup form').submit();
			}
		});
		$('#add-proof-popup').on('show.bs.modal',function()
		{
			$('#file-link').remove();
		})
		
		$('#add-proof-popup').on('show.bs.modal',function()
		{
			var id = $('#add-proof-popup form #order-id').val();
			$.ajax(
			{
				url: 'account/order/get_uploaded_path',
				type: 'GET',
				dataType: 'json',
				data: {order_id: id },
			    success: function( data )
			    {
			    	if(data['filename'])
			    	{

				    	var $append = '<div id="file-link" class="form-group alert alert-success">'+
									  	'<label>Uploaded File Link</label>'+
									  	'<p><a target="_blank" href="'+data['path']+'">'+data['filename']+'</a></p>'+
									  '</div>';
									  
						$('#add-proof-popup form').prepend($append);	
			    	}

			    },
			    error: function( xhr, status, errorThrown )
			    {
			        // alert( "Sorry, there was a problem!" );
			        // console.log( "Error: " + errorThrown );
			        // console.log( "Status: " + status );
			        // console.dir( xhr );
			    },
			    complete: function( xhr, status )
			    {
		
			    }
			})

									
		});
					
	}




	function error()
	{
		if($('#errors').length > 0 )
		{
			frontend.show_message_box('alert alert-danger', 'File Upload Error' ,$('#errors').html())
		}
	}

}


