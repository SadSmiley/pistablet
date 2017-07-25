$(document).ready(function(){
	// Using the core $.ajax() method

	$('i.product-type-active').click(function(e){

		//alert(123);
		  $product_type_id = $(e.currentTarget).closest("tr").attr("product_type_id");

		  //alert($product_type_id);
		  if($(e.currentTarget).hasClass('active'))
		  {
		  	$(e.currentTarget).removeClass('active');
		  	 set_active($product_type_id, 1);
		  }
		  else
		  {
		  	$(e.currentTarget).addClass('active');
		  	set_active($product_type_id, 0);
		  } // true

	});



	function set_active($product_type_id, $value)
    {
        $.ajax(
        {
            url:"admin/product/product_type/set_active",
            dataType:"json",
            data:{ "product_type_id":$product_type_id, "value": $value, "_token": $(".token").val() },
            type:"post",
            success: function(data)
            {

            }
        })
    }
});