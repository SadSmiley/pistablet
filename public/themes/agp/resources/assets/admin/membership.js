
var membershipJs = new membershipJs();


function membershipJs()
{
	$(document).ready(function()
	{
		
		
	    $membershipTable.on( 'draw.dt', function () {
			init_archive_membership();
			init_restore_membership();
		})


	});

	function init_archive_membership()
	{
		$('.archive-membership').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('membership-id');

			// console.log(token + ' =  '+ id );
			var selected_membership = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/membership/archive",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$membershipTable.draw();
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


	function init_restore_membership()
	{
		$('.restore-membership').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('membership-id');
			var selected_membership = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/membership/restore",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$membershipTable.draw();
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