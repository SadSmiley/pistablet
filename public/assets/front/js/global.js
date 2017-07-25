var global = new global();

function global()
{
    this.call_event_cart = function() 
    {
        cart_event();
    }

    init();
    function init()
    {
        $(document).ready(function()
        {
            document_ready();
        });

        $(window).load(function() 
        {
            window_load();
        });
    }
    function document_ready()
    {
        add_event_quick_view_click();
        add_lazy_loader_effect();
        add_search_events();
        add_sticky_header();
        add_event_login_form();
        load_cart(1);
        quickview_numbers_only();
        init_no_stock_err();
        init_forgot_pass();
        if_no_value_quickview();
    }
    function window_load()
    {
        if (typeof action_after_load == 'function') 
        {
            action_after_load();    
        }
        
        image_crop(".1-1-ratio", 1, 1);
        image_crop(".4-3-ratio", 4, 3);
        image_crop(".ratio-fix img", 396, 241);
        image_crop(".category-ratio .1", 100, 51.5);
        image_crop(".category-ratio .2", 100, 77.5);
        image_crop(".category-ratio .3", 100, 89.5);
        image_crop(".category-ratio .4", 100, 89.5);
        image_crop(".category-ratio .5", 100, 89.5);
        image_crop(".brand img", 200, 125);
    }
}

function image_crop(selector, width, height)
{
    $(selector).css("object-fit", "cover");
    $(selector).keepRatio({ ratio: width/height, calculate: 'height' });
}
function add_event_login_form()
{
    $(".remodal-login-form").submit(function(e)
    {
        $(".remodal-login-form .loading").show();
        $(".remodal-login-form .message").removeClass('show');

        $.ajax(
        {
            url:"login",
            dataType:"json",
            data: $(".remodal-login-form").serialize(),
            type: "post",
            success: function(data)
            {
                $(".remodal-login-form .message").html(data.message);
                $(".remodal-login-form .message").addClass('show');

                if(data.auth == "1")
                {
                    var url = window.location.href.split('#')[0];
                    window.location.href = url;
                }
            },
            complete: function()
            {
                $(".remodal-login-form .loading").hide();
            }
        });

        return false;
    });
}
function add_sticky_header()
{
    $(".navbar").removeClass("sticky");
    $(window).scroll(function (event)
    {
        var scroll = $(window).scrollTop();
        
        if(scroll > 110)
        {
            $(".navbar").addClass("sticky");
        }
        else
        {
            $(".navbar").removeClass("sticky");
        }
    });
}
function add_search_events()
{

    $(".search-input").on('blur',function(e){
        setTimeout(function(){

            $(".search-popup").fadeOut('slow');

        },1000);

    })


    $(".search-input").on('keyup',function()
    {
        
        request.abort();
        
        $('.live-search-result-content').empty();
        $('.live-search-loading').fadeIn();
        if($(this).val())
        {
            $(".search-popup").fadeIn("slow");
        }
        else
        {
            $(".search-popup").fadeOut('slow');
        }

        var $search_input = $('.navbar-form.search-container').serialize();
 
        request = $.ajax(
        {
     
            url: "/product/search",
            data:  $search_input,           
            type: "GET",
            dataType : "json",
         

            success: function( data ) {
                var $append = "";
                $('.live-search-result-content').empty();
                if(data)
                {
                    var ctr = 0;
                    $.each(data,function(index, element)
                    {
                        if (data[index]['min_price'] == data[index]['max_price']) 
                        {
                            var price = data[index]['max_price'];
                        }
                        else
                        {
                            var price = data[index]['min_price'] + ' - ' + data[index]['max_price'];
                        }

                        $append += 
                                    '<div class="search-popup-holder">' +
                                        '<a href="/product/view/'+data[index]['eprod_id']+'">'+
                                            '<div class="search-popup-img">'+
                                                '<img style="width: 100%; object-fit: cover; height: 80px;" src="'+data[index]['variant'][0]['item_img']+'">' +
                                            '</div>'+
                                            '<div class="search-popup-text">' +
                                                '<div class="search-popup-name">' +
                                                    data[index]['eprod_name'] +
                                                '</div>'+
                                                '<div class="search-popup-description">'+
                                                    '<div class="price">'+
                                                       '&#8369 ' + parseFloat(price).toFixed(2) +
                                                    '</div>' +
                                                    '<div class="search-popup-rate">' +
                                                        '' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</a>'+
                                    '</div>';

                        if(ctr==3)
                        {
                            $append += '<div class="search-popup-holder">' +
                                        '<div class="see-all-results">'+
                                            '<a href="/product?search='+$(".search-input").val()+'">View more results</a>'+
                                        '</div>'+
                                   '</div>';
                            
                            return false;
                        }

                        ctr++;
                        


                                 
                    })
                }
                else
                {
                    $append += '<div class="search-popup-holder">' +
                                    '<div class="no-results">'+
                                        'No Matches found'
                                    '</div>'+
                               '</div>';
                }


                
                $('.live-search-loading').fadeOut();
                $('.live-search-result-content').append($append);
            },
         
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            error: function( xhr, status, errorThrown ) {
                // alert( "Sorry, there was a problem!" );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                // console.dir( xhr );
            },
         
            // Code to run regardless of success or failure
            complete: function( xhr, status ) {
                // alert( "The request is complete!" );
            }
        });


    });
}
function add_lazy_loader_effect()
{
    $("img.lazy").each(function()
    {
        $link = $(this).attr("data-original");
        $(this).css("opacity", 0);

        if (!this.complete)
        {
            $(this).load(function()
            {
                $(this).attr("src", $link);
                $(this).css("opacity", 1);
            });
        }
        else
        {
            $(this).attr("src", $link);
            $(this).css("opacity", 1);
        }

    });
}
function add_event_quick_view_click()
{
    $(".quick-view").click(function(e)
    {


        //$("body").addClass("remodal-is-active");
        var product_info = new Array();
        product_info["product_id"] = $(e.currentTarget).attr("pid");
        product_info["product_title"] = $(e.currentTarget).attr("title");
        product_info["product_price"] = $(e.currentTarget).attr("price");
        product_info["product_description"] = $(e.currentTarget).attr("description");
        product_info["product_preview"] = $(e.currentTarget).attr("preview");
        product_info["product_attribute"] = $(e.currentTarget).attr("attributes");
        product_info["product_variation"] = $(e.currentTarget).attr("variations");

        $(".quick-view-container").find(".image-container img").attr("src", product_info["product_preview"]).load();
        $(".quick-view-container").find(".product-title").text(product_info["product_title"]);
        $(".quick-view-container").find(".product-price").text(product_info["product_price"]);
        $(".quick-view-container").find(".product-description").text(product_info["product_description"]);
        $(".quick-view-container").find(".add-cart").attr("pid", product_info["product_id"]);
        $(".quick-view-container").find(".add-cart").attr("vid", 0);



        $product_attribute = $.parseJSON(product_info["product_attribute"]);
        $variations = $.parseJSON(product_info["product_variation"]);

        $(".quick-view-container").find(".add-cart").attr("vid", $variations[0]["variation_id"]);

        /* CREATE VARIATION STRING */
        if($product_attribute[0].options.length > 1)
        {
            $(".quick-view-container .product-selection").html('');
            $(".quick-view-container .product-selection").show();

            $append = "";
            $.each($product_attribute, function(key, val)
            {
                $append += create_variations_string(val.attribute_name, val.options);
            });

            $(".quick-view-container .product-selection").html($append);
        }
        else
        {
            $(".quick-view-container .product-selection").hide();
        }

        add_event_to_quick_view($variations);
    });
}
function add_event_to_quick_view($variations)
{
    var variant_combo;
    var variation;
    $(".attributes-for-variation").unbind("change");
    $(".attributes-for-variation").bind("change", function()
    {
        variant_combo = "";
        $(".attributes-for-variation").each(function(key)
        {
            if(key > 0)
            {
                variant_combo += "-";
            }

            variant_combo += $(this).val().toLowerCase();
        });

        /* CHECK EACH VARIATION CONTENT */
        $.each($variations, function(key, val)
        {
            if(val.variation_attribute == variant_combo)
            {
                variation = val;
            }
        });

        $price = variation.show_price;
        $variation_id = variation.variation_id;
        $(".quick-view-container .product-price").html($price);
        $(".quick-view-container .add-cart").attr("vid", $variation_id);
    });

    $(".quick-view-container .qty").val(1);
    $(".quick-view-container .loading").hide();
    $(".quick-view-container button").removeClass('active');
    $(".quick-view-container .up-down-button").unbind("click");
    $(".quick-view-container .up-down-button").bind("click", function(e)
    {
        var add = $(e.currentTarget).attr("effect");
        $new_val = parseInt($(".quick-view-container .qty").val()) + parseInt(add);

        if($new_val < 1)
        {
            $(".quick-view-container .qty").val(1);
        }
        else
        {
            $(".quick-view-container .qty").val($new_val);  
        }
    });

    $(".add-cart").unbind("click")
    $(".add-cart").bind("click", function(e)
    {
        $product_id = $(e.currentTarget).attr("pid");
        $variation_id = $(e.currentTarget).attr("vid");

        $(".quick-view-container .loading").fadeIn('fast');
        $(".quick-view-container button").addClass('active');

        $.ajax(
        {
            url:"/cart/insert_product",
            dataType:"json",
            data: { variation_id: $variation_id, qty: $(".quick-view-container:last .qty").val() },
            type: "get",
            success: function(data)
            {
                load_cart();
                update_cart_price();

            },
            error: function()
            {
                alert("An error occurred while trying to add data to your cart");
                window.location.href='#';
            }
        });
    });
}
function load_cart(hide)
{
    $(".cart-remodal").load("/cart", function()
    {
        if(!hide)
        {
            var url = window.location.href.split('#')[0];
            window.location.href = url + "#cart";
        }

        cart_event();   
        update_cart_price();

        if(!hide)
        {
            $('.add-to-cart').prop("disabled", false);
            $('.add-to-cart').removeClass("disabled");
        }
    }); 
}
function cart_event()
{
    $(".remove-item-from-cart").unbind("click");
    $(".remove-item-from-cart").bind("click", function(e)
    {
        $variation_id = $(e.currentTarget).attr("vid");
        $(e.currentTarget).closest(".cart-content-item").remove();
        update_cart_price();

        $.ajax(
        {
            url:"/cart/remove",
            dataType:"json",
            data: { variation_id:$variation_id },
            type: "get",
            success: function(data)
            {

            }
        });
    });

    /* CART CHANGE QTY */
    $(".cart .product-qty").on("input", function(e)
    {
        $variation_id = $(e.currentTarget).closest(".cart-content-item").attr("vid");
        $newqty = $(e.currentTarget).val();
        update_session_cart($variation_id, $newqty);
        update_cart_price();
    });

    $(".compute-cart").unbind("click");
    $(".compute-cart").bind("click", function(e)
    {
        $variation_id = $(e.currentTarget).closest(".cart-content-item").attr("vid");
        $qty = $(e.currentTarget).closest(".cart-content-item").find(".product-qty").val();
        $sumation = $(e.currentTarget).attr("compute");
        $newqty = parseInt($qty) + parseInt($sumation);

        if($newqty > 0)
        {
            $(e.currentTarget).closest(".cart-content-item").find(".product-qty").val($newqty); 
        }
        else
        {
            $(e.currentTarget).closest(".cart-content-item").find(".product-qty").val(1);
        }
        
        update_session_cart($variation_id, $newqty)
        update_cart_price();
        return false;
    });
}
function update_session_cart($variation_id, $newqty)
{
    $.ajax(
    {
        url:"/cart/update",
        dataType:"json",
        data: {'variation_id':$variation_id,'quantity':$newqty},
        type: "get",
        success: function(data)
        {

        }
    });
}
function update_cart_price()
{
    $super_total = 0;
    $ctr = 0;
    $(".cart .product-qty").each(function(key)
    {
        
        $rawprice = $(this).closest(".cart-content-item").attr("rawprice");
        $qty = ($(this).val()==""? 0:$(this).val());
        $ctr = $ctr + parseInt($qty);
        $new_sum = $rawprice * parseInt($qty);
        $super_total += $new_sum;
        $new_total = currency_format($new_sum);
        $(this).closest(".cart-content-item").find(".total-price").html($new_total);
    });

    $(".super-total").html(currency_format($super_total));
    $(".cart-qt-text").text($ctr);
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
function create_variations_string($label, $_options)
{
    $options = "";
    $.each($_options, function(key, val)
    {
        $options += '<option>' + capitalizeFirstLetter(val.option_name) + '</option>';  
    });

    $append = '<div class="s-container">' +
                '<div class="s-label">' + $label + '</div>' +
                '<div class="select">' +
                  '<select class="attributes-for-variation">' + $options + '</select>' +
                '</div>' +
              '</div>';

    return $append;
}
function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
this.show_message_box = function($alert_theme, $title, $body)
{

    $('#pop-up-message-box .modal-header').addClass($alert_theme);
    $('#pop-up-message-box h4.modal-title').html($title);
    $('#pop-up-message-box .modal-body').html($body);
    $('#pop-up-message-box').modal('show');

    $('#pop-up-message-box').on('hidden.bs.modal', function()
    {
        $('#pop-up-message-box .modal-header').addClass(function()
        {
            $(this).removeClass();
            return 'modal-header';
        });
        $('#pop-up-message-box h4.modal-title').html('');
        $('#pop-up-message-box .modal-body').html('');
    })
}
function quickview_numbers_only()
{
    $('#numbersonly').keypress(function(e) 
    {
            var key_codes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];

             if (!($.inArray(e.which, key_codes) >= 0))
             {
               e.preventDefault();
               return false;
             }

     });
}   
function if_no_value_quickview()
{
    $(".addbutton").unbind("click");
    $(".addbutton").bind("click", function(e)
        {
             if(isNaN($('#numbersonly').val()))
             {
                $('#numbersonly').val(1);
             }    
    });

    $(".subtractbutton").unbind("click");
    $(".subtractbutton").bind("click", function(e)
        {
             if(isNaN($('#numbersonly').val()))
             {
                $('#numbersonly').val(0);
             }
    });
}
function init_no_stock_err()
{
    if($('div.no_stock_err').length>0)
    {
        
            var err_content = $('div.no_stock_err').html();
            frontend.show_message_box('alert alert-danger','Out of Stock' , err_content);
    }
}
function init_forgot_pass()
{
    if($('div.forgot_pass').length>0)
    {
        
            var err_content = $('div.forgot_pass').html();
            frontend.show_message_box('alert alert-success','New password' , err_content);
    }
}