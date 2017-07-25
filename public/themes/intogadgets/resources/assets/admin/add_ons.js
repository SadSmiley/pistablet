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
        initialize_fancy_box();
        add_event_active_product();
    }
    function add_event_active_product()
    {
        $(".product-active").unbind("click");
        $(".product-active").bind("click", function(e)
        {
            $product_id = $(e.currentTarget).closest("tr").attr("product_id");
            if($(e.currentTarget).hasClass("active"))
            {
                $(e.currentTarget).removeClass("active");
                set_active($product_id, 0);
            }
            else
            {
                $(e.currentTarget).addClass("active");    
                set_active($product_id, 1);
            }
        });
    }
    function set_active($product_id, $value)
    {
        $.ajax(
        {
            url:"admin/utilities/ads/set_active",
            dataType:"json",
            data:{ "ads_id":$product_id, "value": $value, "_token": $(".token").val() },
            type:"post",
            success: function(data)
            {
            }
        })
    }   
    function initialize_fancy_box()
    {
        $('.fancybox').fancybox();   
    }




