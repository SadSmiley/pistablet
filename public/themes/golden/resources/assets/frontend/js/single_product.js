$(document).ready(function()
{

	init_quatity_button();
	//prod_variation();
	init_comment();
	init_rating();
	add_to_cart_init();
	var social = new social_share();
	variation();
	check_disable_button_for_variation();
	show_imagebox();
	// social.initialize_social();
	// var number = new numbers_only();
	//disable_alphabet();
	add_event_availability();

	

});


function add_event_availability()
{
	
	// $('select.attribute-variation').on('change', function()
	// {
		
	// 	// console.log($( "select.attribute-variation" ).serialize());

	// });

}

function show_imagebox()
{
  $("#picturecontainer").click(function(){
  	 var url = window.location.href.split('#')[0];
     window.location.href = url + "#full";
  });
}

function variation()
{
	$variation_string = $(".variation").val();
	$variation_json = $.parseJSON($variation_string);

	if($variation_json.length == 1)
	{
		$(".order-button").removeClass("disabled");
	}
	else
	{
		$(".order-button").addClass("disabled");
		$(".single-order-availability").text("");
	}

	check_variation();
}

function load_variation_info($variation_combination)
{

	$variation_string = $(".variation").val();
	$variation_json = $.parseJSON($variation_string);

	$.each($variation_json, function(key, val)
	{
		if(val.variation_attribute == $variation_combination)
		{
			update_product_info_based_on_variation(val);	
		}
		
	});
}
function update_product_info_based_on_variation(variation)
{
	// console.log(variation);
	$('.single-order-availability').text(display_stock_availability(variation['variation_stock_qty']));
	$(".single-order-price").html(variation.show_price);
	$(".variation_id").val(variation.variation_id);
	if(variation.variation_image != "default.jpg")
	{
		$(".single-product-img").attr("src", variation.single_image);	
		$(".zoomWindow").css("background-image", "url('" + variation.big_image + "')");
	}
	
}

function display_stock_availability(qty)
{
	if(qty <= 0 )
	{
		$(".order-button").addClass("disabled");
		return "Out of Stock";
		

	}
	else
	{
		$(".order-button").removeClass("disabled");
		return "In Stock";
		
	}
}

function check_variation()
{
	$variation_string = $(".variation").val();
	$variation_json = $.parseJSON($variation_string);

	if($variation_json.length > 1)
	{
		$(".attribute-variation").change(function()
		{
			check_disable_button_for_variation();
		});
	}


}

function check_disable_button_for_variation()
{
	$check_for_zero = 0;
	$(".attribute-variation").each(function()
	{
		if($(this).val() == 0)
		{
			$check_for_zero++;
		}
	});

	if($check_for_zero == 0)
	{
		$(".order-button").removeClass("disabled");

		$variation_combination = "";

		$(".attribute-variation").each(function()
		{
			$variation_combination += " " + $(this).val();
		});


		$variation_combination = $variation_combination.trim().toLowerCase().replace(/\s+/g, "-");
		$variation_combiantion = 
		load_variation_info($variation_combination);
	}
	else
	{
		$(".order-button").addClass("disabled");
		$(".single-order-availability").text("");
	}
}

function init_flexslider()
{
	$('#carousel').flexslider(
	{
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		itemWidth: 210,
		itemMargin: 5,
		asNavFor: '#slider'
	});
	
	$('#slider').flexslider(
	{
		animation: "slide",
		controlNav: false,
		animationLoop: false,
		slideshow: false,
		sync: "#carousel"
	});
}


function init_quatity_button()
{
	var qty = parseInt($('.quantity input.qty').val());
	$('.quantity button.up-down-button[effect="-1"]').on('click', function()
	{
		if(qty===1)
		{
			return false;
		}

		qty = qty - 1;
		// console.log(qty);
		$(this).siblings('input.qty').val('');
		$(this).siblings('input.qty').val(qty);

	});

	$('.quantity button.up-down-button[effect="1"]').on('click', function()
	{
		qty = qty + 1;
		
		// console.log(qty);
		$(this).siblings('input.qty').val('');
		$(this).siblings('input.qty').val(qty);
	});
}
function disable_alphabet()
{
	

  	    $('.qty').keypress(function(e) 
  	    {
                var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];

                 if (!($.inArray(e.which, key_codes) >= 0))
                 {
                   e.preventDefault();
                   return false;
                 }
    
		 });
}

function prod_variation()
{


	$('div.product-selection select').on('change', function()
	{	
		var $div = $('div.single-order-content');
		disabled($div);
		$.ajax(
		{
		 
		    url: "product/single_product/get_variation",
		    data: $('form#prod-attr-form').serialize(),
		    type: "POST",
		    dataType : "json",
		    success: function( data )
		    {
		    	setTimeout(function() {
		    		enabled($div);
		    		change_prod_price(data['variation_price']);
		    	}, 500);

		    	// console.log(data);
		    },
		    error: function( xhr, status, errorThrown )
		    {
		        // console.log( "Error: " + errorThrown );
		        // console.log( "Status: " + status );
		        // console.dir( xhr );
		    },
		    complete: function( xhr, status )
		    {

		    }
		});
	});



}


function change_prod_price($price)
{
	$('.single-order-content .single-order-price').html('');
	$('.single-order-content .single-order-price').html(convert_to_html($price));
	// document.getElementById('single-order-price').innerHTML = '<span>' + $price + '</span>';


}


function convert_to_html($html)
{
	    var theString = $html;
        var varTitle = $('<textarea />').html(theString).text();
        return varTitle;        
}





function init_comment()
{

	$('#product-comment-list').delegate('.review-comment-xbutton','click', function(e)
	{
	

		var $comment_id = $(this).attr('comment_id');
		var $user_id = $(this).attr('user_id');
		var $token = $(this).siblings('input[name="_token"]').val();

		$.ajax(
		{
		 
		    url: "product/single_product/delete_comment",
		    data: {

		    	user_id: $user_id, 
		    	comment_id:$comment_id, 
		    	_token:$token 
		    },
		    type: "POST",
		    dataType : "json",
		    success: function( data )
		    {
		    	$(e.currentTarget).closest('.single-detail-review-comment').fadeOut('slow',function(){
		    		$(this).remove();
		    	});	
		    	// console.log(data);
		    },
		    error: function( xhr, status, errorThrown )
		    {
		        // console.log( "Error: " + errorThrown );
		        // console.log( "Status: " + status );
		        // console.dir( xhr );
		    },
		    complete: function( xhr, status )
		    {

		    }
		});
	});

	$('.review-comment-button').on('click', function()
	{

		var comment_textarea = $(this).closest('#comment_button_container').siblings('.review-comment-input').find('textarea');
		var $comment = comment_textarea.val().trim();
		console.log($comment);
		if($comment.length <= 0) 
		{
			alert('The Comment textarea is empty');
			return false;
		}
		var $comment_button = this;
		var $add_comment_loading = $('#add_comment_loading');
		var $user_id = $(this).attr('user-id');
		var $prod_id = $(this).attr('product-id');
		var $token = $('input.token[name="_token"]').val();

		
		
		comment_disabled();

		$.ajax(
		{	 
		    url: "product/single_product/add_comment",
		    data: {
		    	user_id : $user_id,
		    	prod_id : $prod_id,
		    	comment : $comment,
		    	_token: $token

		    },
		    type: "POST",
		    dataType : "json",
		    success: function( data )
		    {
		    	// console.log(data);

		    	if(data==null)
		    	{
		    		alert('You need to be Log-in.');
		    		comment_enabled();
		    		// window.location.href = "/#login";
		    	}
		    	else
		    	{
		    		console.log(data);
		    		if(data['new_comment'])
		    		{


			    		var append = 	'<div class="single-detail-review-comment comment clear">'+
											'<div class="review-comment-img">'+
												'<img src="'+data['new_comment']['user_image']+'">'+
											'</div>'+
											'<div class="review-comment-text">'+
											'	<div class="review-comment-name">'+
													data['new_comment']['customer_name'] +
											'	</div>'+
											'	<div class="review-comment-time">'+
													data['new_comment']['time_ago']+
											'	</div>'+
											'	<div class="review-comment-comment">'+
													data['new_comment']['product_comment']+
												'</div>'+
											'</div>'+
												'<div class="comment_button_panel">'+
													'<input type="hidden" class="token" name="_token" value="'+data['new_comment']['csrf_token']+'" />'+
													'<div class="review-comment-xbutton" style="right: 100px;">'+
														// '<i class="fa fa-pencil"></i>Edit'+
													'</div>'+
													'<div class="review-comment-xbutton" user_id="'+data['new_comment']['customer_id']+'" comment_id="'+data['new_comment']['product_comment_id']+'">'+
														'<i class="fa fa-trash-o"></i>Delete'+
													'</div>'+
												'</div>'+
											// '<div class="divider clear"></div>'+
										'</div>';


						$('#product-comment-list').prepend(append);
						
					}
					else
					{
						alert(data['error']);
					}
		    	}

		    	comment_enabled();

		    	

		    },
		    error: function( xhr, status, errorThrown )
		    {

		        console.log( "Error: " + errorThrown );
		        console.log( "Status: " + status );
		        console.dir( xhr );
		        comment_enabled();
		       
		    },
		    complete: function( xhr, status )
		    {
		    	// comment_enabled();
		    }
		});


		function comment_disabled()
		{
			$($comment_button).attr('disabled','disabled');
			$($add_comment_loading).fadeIn();
		}
		function comment_enabled()
		{
			$($comment_button).removeAttr('disabled','true');
			$($add_comment_loading).fadeOut();
			comment_textarea.val("");
		}



	});
}

function init_rating()
{
	$('#user-single-prod-rate .single-order-star').on('click', function()
	{

		var $stars = $('#user-single-prod-rate .single-order-star');
		var $current_index = $('#user-single-prod-rate .single-order-star').index(this);

		$.each($stars, function(index,element)
		{	


			if(index <= $current_index)
			{
				$(element).addClass('single-order-star active');
				$(element).removeClass('nonactive');
			}
			else
			{
				$(element).addClass('single-order-star nonactive');
				$(element).removeClass('active');
			}
		});

		var $prod_rating = $('#user-single-prod-rate .single-order-star.active').length;
		var $prod_id = $(this).closest('#user-single-prod-rate').attr('prod-id');
		var $_token = $(this).siblings('input.token').val();



		$.ajax({
		 

		    url: "product/single_product/rate_product",
		 

		    data: {
		    	prod_id : $prod_id,
		        prod_rating : $prod_rating, 
		        _token : $_token
		    },
		 

		    type: "POST",
		 

		    dataType : "json",
		 

		    success: function( data ) {

		    	update_single_rate(data['total_votes'], data['rating_avg'], data['rate_rounded']);
		    	
		    },
		 

		    error: function( xhr, status, errorThrown ) {
		        // alert( "Sorry, there was a problem!" );
		        console.log( "Error: " + errorThrown );
		        console.log( "Status: " + status );
		        console.dir( xhr );
		    },

		    complete: function( xhr, status ) {
		        // alert( "The request is complete!" );
		    }
		});
	});

	function update_single_rate($votes, $rating, $rounded_rate)
	{	

		var continer = $('#single-product-rate')

		var $html="";
		continer.html('');
		for ($i = 1; $i <= 5; $i++)
		{
			$state = $rounded_rate >= $i ? 'active' : 'nonactive';

			$html +='<div class="single-order-star ' + $state +'">'+
 					 '</div>';	
		}

		$html += 	'<div id="single-order-rate-details">'+
							'<p>'+ $votes+ ' votes recorded('+$rating+' rating)</p>'+
						'</div>';

		continer.append($html) ;
	}
}

function add_to_cart_init()
{
	$('.add-cart').on('click', function(e)
	{
		if(!$(e.currentTarget).hasClass("disabled"))
		{
			e.preventDefault();
			$product_id = $(e.currentTarget).attr("pid");
			$variation_id = $(".variation_id").val();

			$qty = $(".variation-qty").val(); 

			 if($qty == "")
			 {
			 	$qty = 0;
			 }

			$.ajax(
			{
				url:"cart/insert_product",
				dataType:"json",
				data: { 
						variation_id: $variation_id, 
						qty: $qty
					},
				type: "get",
				success: function(data)
				{
					if($(e.currentTarget).attr("mode") == "reservation")
					{
						location.href='/branch';
					}
					else
					{
						$(".cart-remodal").load("cart", function()
						{
							$('[data-remodal-id=cart]').remodal().open();
							frontend.call_event_cart();
							update_cart_price();
						});
					}
				},
				error: function()
				{
					alert("An error occurred while trying to add data to your cart");
					window.location.href='#';
				}
			});
		}
	});

	$(".branch-pickup-button").bind("click", function()
	{
		alert(123);
	});
}

function update_cart_price()
{
	$super_total = 0;
	$ctr = 0;
	$(".cart .product-qty").each(function(key)
	{
		
		$rawprice = $(this).closest(".cart-content-item").attr("rawprice");
		$qty = $(this).val();
		$ctr = $ctr + parseInt($qty);
		$new_sum = $rawprice * parseInt($qty);
		$super_total += $new_sum;
		$new_total = currency_format($new_sum);
		$(this).closest(".cart-content-item").find(".total-price").html($new_total);
	});

	$(".super-total").html(currency_format($super_total));
	$(".cart-qt-text").text($ctr);
	// console.log('$ctr = ' + $ctr);
}

function currency_format($price)
{
	Amount = $price;
	var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);

	var AmountWithCommas = Amount.toLocaleString();
	var arParts = String(AmountWithCommas).split(DecimalSeparator);
	var intPart = arParts[0];
	var decPart = (arParts.length > 1 ? arParts[1] : '');
	decPart = (decPart + '00').substr(0,2);

	return currency + ' ' + intPart + DecimalSeparator + decPart;
}

function social_share()
{

	// this.initialize_social = function()
	// {
	// 	twitter();
	// }
	
	twitter();
	fb();
	googleplus();
	var h = window.innerHeight/2;
	var w = window.innerWidth/2;
	function twitter()
	{
		$('.twitter-share-btn').on('click', function(event) {
			event.preventDefault();
			
			var hasht = $(this).attr('hashtag');
			var via = $(this).attr('via');
			var text = $(this).attr('text');
			var count = $(this).attr('count');
			var url = 'https://twitter.com/share?url='+window.location.href+'&via='+via+'&text='+text+'&count='+count+'&hashtags='+hasht;
			var title = "Twitter Share";
			PopupCenter(url, title, w, h);

		});
	}


	function fb()
	{
		$('.fb-share-btn').on('click', function(event) {
			event.preventDefault();
			FB.ui(
			{
			  method: 'share',
			  href: window.location.href,
			}, function(response)
			{

			});
		});
	}

	function googleplus()
	{
		$('.google-share-button').on('click', function(event) {
			event.preventDefault();
			url = $(this).attr('href');
			title = 'Googleplus Share';
			PopupCenter(url, title, w, h);
		});
	}

	function PopupCenter(url, title, w, h)
	{
	    // Fixes dual-screen position                         Most browsers      Firefox
	    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	    width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	    height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	    var top = ((height / 2) - (h / 2)) + dualScreenTop;
	    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	    // Puts focus on the newWindow
	    if (window.focus) {
	        newWindow.focus();
	    }
	}


   	






}


