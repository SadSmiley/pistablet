var prod_coupon = new prod_coupon();

function prod_coupon()
{

	init();

	function init()
	{
		$(document).ready(function()
		{
			init_coupon_table();
			add_event_coupon_active();
		});
	}



	function init_coupon_table()
	{
		$('#data-table').DataTable(
		{
		    "lengthMenu": [[8, 10, 25, 50, -1], [10, 25, 50, "All"]],
	        "oLanguage": { "sSearch": "" },
	        stateSave: true
		});

		$(".data-table").on( 'draw.dt', function ()
	    {
		    setTimeout(function()
		    {
		        add_event_coupon_active();
		        add_event_coupon_active_toggle();

		    });
	    });   
	}


	function add_event_coupon_active()
	{
		$('.prod-coupon-toggle-active').on('click' , function()
		{
			var c_id = $(this).attr('coupon-id');
			var $this = $(this);
			if($(this).hasClass('active'))
			{
				$(this).removeClass("active");
				
				add_event_coupon_active_toggle(c_id,0, $this);
			}
			else
			{
				$(this).addClass("active");
				add_event_coupon_active_toggle(c_id,1, $this);
			}
		})
	}


	function add_event_coupon_active_toggle($c_id,$active, $this)
	{
		var $token = $('.token').val();
		$.ajax(
		{
		    url: "admin/product/coupon/toggle_active",
		    data:{
			        coupon_id:$c_id,
			        active:$active,
			        _token:$token
		    	},
		    type: "POST",
		    dataType : "json",
		    success: function( data ) {
		        if(data['success'])
		        {
		        	$this.fadeOut('slow', function()
		        	{
		        		$(this).closest('tr').remove();
		        	});
		        	
		        }
		        else
		        {
		        	alert('Error: Coupon active not updated');
		        }
		        
		    },
		 
		    // Code to run if the request fails; the raw request and
		    // status codes are passed to the function
		    error: function( xhr, status, errorThrown ) {
		        // alert( "Sorry, there was a problem!" );
		        // console.log( "Error: " + errorThrown );
		        // console.log( "Status: " + status );
		        // console.dir( xhr );
		    },
		 
		    // Code to run regardless of success or failure
		    complete: function( xhr, status ) {
		        // alert( "The request is complete!" );
		    }
		});
	}
}