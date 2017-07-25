
var accountJs = new accountJs();


function accountJs()
{
	$(document).ready(function()
	{
		
		
	    $accountTable.on( 'draw.dt', function () {
			init_archive_account();
			init_restore_account();
		})

	    			add_event_active_product();
	});

	function init_archive_account()
	{
		$('.archive-account').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('account-id');

			// console.log(token + ' =  '+ id );
			var selected_account = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/accounts/archive",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
	
			    		$accountTable.draw();
			    	}
			    	// console.log(data['query']);
			    },

			    error: function( xhr, status, errorThrown ) {
			         alert( "Sorry, there was a problem!"+errorThrown );
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


	function init_restore_account()
	{
		$('.restore-account').on('click', function(e)
		{
			e.preventDefault();
			var token = $('input[name="_token"]').val();
			var id = $(this).attr('account-id');
			var selected_account = $(this);

			// console.log(token, id);
			$.ajax(
			{
			    url: "admin/maintenance/accounts/restore",
			 
			    data: {
			        id: id,
			        _token: token
			    },
		
			    type: "post",
			 
			    dataType : "json",

			    success: function( data ) {
			    	if( data['query']==1 )
			    	{
			    		$accountTable.draw();
			    	}
			    	// console.log(data['query']);
			    },

			    error: function( xhr, status, errorThrown ) {
			        alert( "Sorry, there was a problem!"+errorThrown );
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

	function add_event_active_product()
    {
       $('#table').on('click', '.disable_top', function(e)
       {
        	$product_id = $(e.currentTarget).closest("i").attr("acc_id");
            if($(e.currentTarget).hasClass("active"))
            {
                $(e.currentTarget).removeClass("active");
                disable_top($product_id, 0);
            }
            else
            {
                $(e.currentTarget).addClass("active");    
                disable_top($product_id, 1);
            }
       });
    }

    function disable_top($acc, $value)
    {
        $.ajax(
        {
            url:"admin/maintenance/accounts/disable_top",
            dataType:"json",
            data:{ "id":$acc, "value": $value, "_token": $(".token").val() },
            type:"post",
            success: function(data)
            {

            }
        })
    }
}