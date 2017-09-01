var inventory = new inventory();

function inventory() {
    init();
    function init() {
        _ready();
    }
    function _ready() {
        popovers();
        outsideclick();
        quantityset();
        filters();
    }
    function popovers(){
        $(".btn-filter").popover({
            html : true,
		    content: function() {
		      return $("#popover-filter").html();
		    }
        });
        var filter = $(".btn-filter").popover();
        filter.on("show.bs.popover", function(e){
            filter.data("bs.popover").tip().css({"min-width": "175px", 'left':'0px !important'});
        });
        filter.on("shown.bs.popover", function(e){
           filters();
            //your function here
        });
    }
    function outsideclick() {
		$(document).on('click', function (e) {

		    $('[data-toggle="popover"],[data-original-title]').each(function () {
		        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
		            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
		        }

		    });
		});
	}
	
	function quantityset(){
	    $(".btn-add").unbind("click");
	    $(".btn-add").bind("click", function(){
	        var content = $(this).data("content");
	        $("#add-"+content).attr("disabled",true);
	        $("#set-"+content).attr("disabled",false);
	        $("#save-"+content).attr("data-trigger","add");
	    });
	    $(".btn-set").unbind("click");
	    $(".btn-set").bind("click", function(){
	        var content = $(this).data("content");
	        $("#add-"+content).attr("disabled",false);
	        $("#set-"+content).attr("disabled",true);
	        $("#save-"+content).attr("data-trigger","set");
	    });
	    $(".btn-save").unbind("click");
	    $(".btn-save").bind("click", function() {
	        var content = $(this).attr("data-content");
	        var trigger = $(this).attr("data-trigger");
	        var save = $("#save-"+content);
	        var quantity = $("#quantity-"+content).html();
	        var newquantity = $("#txt-quantity-"+content).val();
	        var amount = 0;
	        if(trigger == "set"){
	            amount = newquantity;
	        }
	        else if(trigger == "add"){
	            amount = parseInt(newquantity) + parseInt(quantity);
	        }
	        $("#save-"+content).html(misc('spinner'));
	        $.ajax({
	            url      :  "/member/product/inventory/updatquantity",
	            type     :  "POST",
	            data     :  {
	                _token:misc('_token'),
	                amount:amount,
	                content:content
	            },
	            success  : function(result){
	                $("#save-"+content).html('Save');
	                $("#quantity-"+content).html(amount);
	                $("#txt-quantity-"+content).val(0);
	                toastr.success("Inventory updated.");
	            },
	            error    : function(err){
	                $("#save-"+content).html('Save');
	                errorTaostr();
	            }
	        });
	    });
	}
	function filters(){
		$(".filter-select").unbind("change");
		$(".filter-select").bind("change", function(){
			var filter = $(this).val();
			$(".btn-filter-sub").attr("data-trigger",filter);
			if(filter == ""){
				$(".filter-type").css("display","none");
				$(".filter-vendor").css("display","none");
				$(".filter-quantity").css("display","none");
				$(".filter-quantity-div").css("display","none");
				$(".filter-button").css("display","none");
			}

			if(filter == "type"){
				$(".filter-type").css("display","block");
				$(".filter-vendor").css("display","none");
				$(".filter-quantity").css("display","none");
				$(".filter-quantity-div").css("display","none");
				$(".filter-button").css("display","none");
			}
			if(filter == "vendor"){
				$(".filter-type").css("display","none");
				$(".filter-vendor").css("display","block");
				$(".filter-quantity").css("display","none");
				$(".filter-quantity-div").css("display","none");
				$(".filter-button").css("display","none");
			}
			if(filter == "quantity"){
				$(".filter-type").css("display","none");
				$(".filter-vendor").css("display","none");
				$(".filter-quantity").css("display","block");
				$(".filter-quantity-div").css("display","none");
				$(".filter-button").css("display","none");
			}
		});
		$(".filter-type-sel").unbind("change");
		$(".filter-type-sel").bind("change", function(){
			var filter = $(this).val();
			if(filter != ''){
				$(".filter-button").css("display","block");
			}
			else{
				$(".filter-button").css("display","none");
			}
		});
		$(".filter-vendor-sel").unbind("change");
		$(".filter-vendor-sel").bind("change", function() {
		    var filter = $(this).val();
		    if(filter != ''){
				$(".filter-button").css("display","block");
			}
			else{
				$(".filter-button").css("display","none");
			}
		});
		$(".filter-quantity-sel").unbind("change");
		$(".filter-quantity-sel").bind("change", function() {
		    var filter = $(this).val();
		    if(filter != ''){
				$(".filter-button").css("display","block");
				$(".filter-quantity-div").css("display","block");
			}
			else{
				$(".filter-button").css("display","none");
				$(".filter-quantity-div").css("display","none");
			}
		});
		$(".btn-filter-sub").unbind("click");
		$(".btn-filter-sub").bind("click", function() {
			$(".btn-filter-sub").html(misc('spinner'));
		    var trigger = $(this).attr("data-trigger");
		    var quantity = 0;
		    var filter = '';
			var quantity_sel = '';
		    if(trigger == "type"){
		    	filter = $(".filter-type-sel").val();
		    }
		    if(trigger == "vendor"){
		    	filter = $(".filter-vendor-sel").val();
		    }
		    if(trigger == "quantity"){
		    	filter = $(".filter-quantity-sel").val();
		    	quantity = $(".filter-quantity-number").val();	
		    	quantity_sel = $(".filter-quantity-sel").val();
		    }
		    $.ajax({
		    	url 	 :	"/member/product/inventory/filter",
		    	type	 :	"POST",
		    	data	 :	{
		    		trigger:trigger,
					quantity:quantity,
					filter:filter,
					_token:misc('_token'),
					quantity_sel:quantity_sel
		    	},
		    	success  :	function (result) {
		    		$(".tbl-filter").html(result);
		    		toastr.success("Data loaded.");
		    		$(".btn-filter-sub").html('Filter');
		    		quantityset();
		    	},
		    	error	 :	function (err) {
		    		errorTaostr();
		    		$(".btn-filter-sub").html('Filter');
		    	}
		    });
		});
	}
	function misc(str = ''){
	    switch(str){
	        case '_token':
	            return $("#_token").val();
	            break;
	       case 'spinner':
                return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
                break;
            case 'loader-16-gray':
                return '<div class="loader-16-gray"></div>';
                break;
	    }
	}
	function errorTaostr() {
		toastr.error("Error, something went wrong.");
	}
}