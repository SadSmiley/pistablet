
var productJs = new productJs();


function productJs()
{
	$(document).ready(function()
	{
		
		
	    $productTable.on( 'draw.dt', function () {
			init_archive_product();
			init_restore_product();
		})


	});

	function init_archive_product()
	{
		$('.archive-product').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('product-id');

			// console.log(token + ' =  '+ id );
			var selected_product = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/product/archive",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$productTable.draw();
			    	}
			    	// console.log(data['query']);
			    },

			    error: function( xhr, status, errorThrown ) {
			        // alert( "Sorry, there was a problem!" );
			        // console.log( "Error: " + errorThrown );
			        // console.log( "Status: " + status );
			        // console.dir( xhr );
			    },
	
			    complete: function( xhr, status ) {
			        // alert( "The request is complete!" );
			    }
			});
		});
	}


	function init_restore_product()
	{
		$('.restore-product').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('product-id');
			var selected_product = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/product/restore",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$productTable.draw();
			    	}
			    	// console.log(data['query']);
			    },

			    error: function( xhr, status, errorThrown ) {
			        // alert( "Sorry, there was a problem!" );
			        // console.log( "Error: " + errorThrown );
			        // console.log( "Status: " + status );
			        // console.dir( xhr );
			    },
	
			    complete: function( xhr, status ) {
			        // alert( "The request is complete!" );
			    }
			});
		});
	}
}