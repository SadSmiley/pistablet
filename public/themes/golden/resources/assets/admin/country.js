
var countryJs = new countryJs();


function countryJs()
{
	$(document).ready(function()
	{
		
		
	    $coutryTable.on( 'draw.dt', function () {
			init_archive_coutnry();
			init_restore_coutnry();
		})


	});







	function show_coutry()
	{
		$.ajax(
			{
			    url: "admin/maintenance/country/get_country",
			 
			    data: {
			    },
		
			    type: "get",
			 
			    dataType : "json",

			    success: function( data ) {

			    	var $data = data
			    	console.log(data);
			    	//   $('#country-table').dataTable( {
				    //     "ajax": $data				    
				    // } );

			    	
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
	}

	function init_archive_coutnry()
	{
		$('.archive-country').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('country-id');
			var selected_country = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/country/archive",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$coutryTable.draw();
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


	function init_restore_coutnry()
	{
		$('.restore-country').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('country-id');
			var selected_country = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/country/restore",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$coutryTable.draw();
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