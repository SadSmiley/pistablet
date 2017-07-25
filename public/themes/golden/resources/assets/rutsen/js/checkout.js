var checkout = new checkout();

function checkout()
{
	init();

	function init()
	{
		$(document).ready(function()
		{
			document_ready();

			
		});
	}



	function document_ready()
	{
		add_event_location_change();
		add_coupon_event();
		init_coupon_err();
		init_upload_err();
		init_no_stock_err();
	}
	function init_coupon_err()
	{
			if($('div.coupon_err').length > 0)
			{
				var err_content = $('div.coupon_err').html();
				frontend.show_message_box('alert alert-warning','Coupon Error' , err_content);
			}
	}

	function init_upload_err()
	{
		if($('div.upload_err').length>0)
		{
				var err_content = $('div.upload_err').html();
				frontend.show_message_box('alert alert-danger','File Upload Error' , err_content);
		}
	}

	function init_no_stock_err()
	{
		if($('div.no_stock_err').length>0)
		{
				var err_content = $('div.no_stock_err').html();
				frontend.show_message_box('alert alert-danger','Out of Stock' , err_content);
		}
	}

	function add_coupon_event()
	{
		$(".coupon-button").click(function()
		{
			var url = window.location.href.split('#')[0];
			window.location.href = url + "#coupon";
			return false;
		});

		$(".back-button").click(function()
		{
			window.location.href = 'checkout';
			return false;
		});
	}
	function add_event_location_change()
	{
		$(".load-child-location").change(function(e)
		{
			location_parent = $(e.currentTarget).val();
			valtarget = $(e.currentTarget).attr("target");
			$target = $(valtarget);

			if(valtarget == ".municipality")
			{
				$(".barangay").html('<option value="0">Select</option>')
			}

			$target.html('<option value="0">Loading</option>');

			load_location(location_parent, $target)
		});
	}
	function load_location(location_parent, target)
	{
		$.ajax(
		{
			url: "location?location_parent=" + location_parent,
			dataType: "json",
			type:"get",
			success: function(data)
			{
				target.html('');
				$.each(data._location, function(key, location)
				{
					target.append('<option value="' + location.location_id + '">' + location.location_name + '</option>');
				});

				if(target.hasClass("municipality"))
				{
					load_location(target.val(), $(target.attr("target")));
				}
			}
		});
	}
}