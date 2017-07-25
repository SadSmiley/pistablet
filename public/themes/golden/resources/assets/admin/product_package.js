
var product_packageJs = new product_packageJs();


function product_packageJs()
{
	$(document).ready(function()
	{
		
		
	    $product_packageTable.on( 'draw.dt', function () {
			init_archive_product_package();
			init_restore_product_package();
		})


	});

	function init_archive_product_package()
	{
		$('.archive-product-package').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('product-package-id');

			// cons
			// console.log(token + ' =  '+ id );
			var selected_product_package = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/product_package/archive",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$product_packageTable.draw();
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


	function init_restore_product_package()
	{
		$('.restore-product-package').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('product-package-id');
			var selected_product_package = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/product_package/restore",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$product_packageTable.draw();
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