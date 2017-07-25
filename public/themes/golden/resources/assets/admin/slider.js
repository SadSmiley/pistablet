$(document).ready(function(){

	$('.slider-thumb button').click(function(e){
		
	    var r = confirm("Are you sure to delete selected image?");
	    if (r == true) {
	        $(this).siblings("input[name='slider_image_id']").attr('checked','checked');
	        $('#slider-image-form').submit();


	    }
	

	});

	initialize_fancy_box();

	function initialize_fancy_box()
    {
        $('.fancybox').fancybox();   
    }

})