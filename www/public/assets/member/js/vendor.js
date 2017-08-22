var vendor = new vendor();

function vendor() 
{
    init();
    
    function init()
    {
        document_ready();
    }

    function document_ready() 
    {
    	initialize_select_plugin();

    	action_date_picker();
    	action_shipping_readonly();
    	action_display_name_as();

    	event_same_as_billing();
    	event_button_toggle();
    	event_listdropdownname_click();
    }
    
    function  misc(str) 
    {
        switch (str)
        {
            case '_token':
                return $("#_token").val();
                break;
            case 'spinner':
                return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
                break;
            case 'loader-16-gray':
                return '<div class="loader-16-gray"></div>';
                break;
             
            case 'times':
            	return '<i class="fa fa-times" aria-hidden="true"></i>';
            	break;
        }
    }

    function action_date_picker()
    {
    	$( ".datepicker" ).datepicker();
    }

    function event_same_as_billing()
    {
	    $(document).on("change", ".billing-address", function(){
	        action_copy_billing_to_shipping($(this));
	    });

	    $(document).on("change", ".same_as_billing", function(){
	        action_shipping_readonly();
	    });	
	}

	function action_copy_billing_to_shipping($this)
	{
		if($(".same_as_billing").is(":checked"))
	    {
			var value 	= $this.val();
	        var target 	= $this.attr("data-target");
	        $(target).val(value).change();
    	}
	}

	function action_shipping_readonly()
	{
		if($(".same_as_billing").is(":checked"))
        {
            $(".shipping-container").find(".ship").attr("readonly", true);
            // $(".shipping-container .select-country").globalDropList("disabled");
        }
        else
        {
        	$(".shipping-container").find(".ship").attr("readonly", false);
        	// $(".shipping-container .select-country").globalDropList("enabled");
        }
	}

	function event_button_toggle()
	{
	    $(document).on("click", ".btn-toggle-custom", function (e) {
	        var target = $(this).attr("data-target");
	        var container = $(this).attr("container");
	        $(".btn-toggle-custom").each(function(){
	            var target2 = $(this).attr("data-target");
	            if(target != target2){
	                $(target2).css("display","none");
	            }
	        });
	        e.stopPropagation();
	        $(target).slideToggle("fast");
	    })
	}
            	
    function action_display_name_as()
    {
	    $(document).on("change", ".auto-name", function(){
	    	var  combonames = comboname();
			$(".drop-down-display-name").html(combonames['html']);
			$(".display-name-check").val(combonames['combo'][0]);
	    });
	}

	function comboname(){
		var title = $(".title").val();
		var first_name = $(".first_name").val();
		var middle_name = $(".middle_name").val();
		var last_name = $(".last_name").val();
		var last_name2 = last_name;
		var suffix = $(".suffix").val();
		
		var title_suffix = title + suffix + last_name;;
		
		
		if(title != ""){
			title = title + ' ';
		}
		if(first_name != ""){
			first_name = first_name + ' ';
		}
		if(middle_name != ""){
			middle_name = middle_name + ' ';
		}
		
		var combo = [];
		combo[0] = title + first_name + middle_name + last_name + suffix;
		combo[1] = first_name + last_name2;
		combo[2] = last_name2 + ', ' + first_name;
		var html = '';
		var min = 0;
		var max = 2;
		
		if(first_name != '' && middle_name != "" && title_suffix != ""){
			min = 0;
			max = 2;
		}
		else{
			min = 0;
			max = 0;
		}
		for(var i = min; i <= max; i++){
			html += '<a href="#" class="list-group-item list-drop-display-name" data-html="'+combo[i]+'">'+combo[i]+'</a>';
		}

		var returns = [];
		returns['combo'] = combo;
		returns['html'] = html;
		return returns;
	}

	function event_listdropdownname_click()
	{
	    $(document).on("click", ".list-drop-display-name", function(){
	        var html = $(this).attr("data-html");
	        $(".txt-display-name").val(html);
	        $(".drop-down-display-name").slideToggle("fast");
	    });
	}

	function initialize_select_plugin()
	{
		$(".select-country").globalDropList(
		{
			hasPopup: "false",
			width: "100%",
			onChangeValue: function()
			{
				action_copy_billing_to_shipping($(this));
			},
		});

		$(".select-terms").globalDropList(
		{
			hasPopup: "false",
			width: "100%",
		});
	}

	function UploadProgress(Event)
    {
    	var progress = (Event.loaded  / Event.total) * 100;
    	$(".progress-"+filecount).css("width",progress + "%");
    	console.log(".progress-"+filecount);
    }

    function LoadUpload(Event)
    {
    	var result = Event.target.responseText;
    	$(".file-operation-"+filecount).html(cancelupload(filecount, result));
    	removeupload();
    }
	    
    function cancelupload(num = 0, result = []){
    	console.log(result);
    	result = JSON.parse(result);
    	var html = '<a href="javascript:" class="pull-right remove-upload" data-value="0" data-path="'+result.url+'" data-target=".file-'+num+'"><i class="fa fa-times" aria-hidden="true"></i></a>';
    	html += '<input type="hidden" value="'+result.url+'" name="fileurl[]">';
    	html += '<input type="hidden" value="'+result.original+'" name="filename[]">';
    	html += '<input type="hidden" value="'+result.mimetype+'" name="mimetype[]">';
    	return html;
    }
	    
    function removeupload()
    {
    	$(".remove-upload").unbind("click");
    	$(".remove-upload").bind("click", function(){
    		var target = $(this).attr("data-target");
    		var value = $(this).attr("data-value");
    		if(value == undefined){
    			value = 0;
    		}
    		var path = $(this).attr("data-path");
    		var con = confirm("Are you sure you want to remove this file?");
	    	if(con){
	    		$(this).html(misc('spinner'));
	    		$.ajax({
	    			url 	:	"/member/customer/removefilecustomer",
	    			type	:	"POST",
	    			data	:	{
	    				path:path,
	    				value:value,
	    				_token:misc('_token')
	    			},
	    			success :	function(result)
	    			{
	    				result = JSON.parse(result);
	    				if(result.result == 'error'){
	    					toastr.error(result.message);
	    					$(this).html(misc('times'));
	    				}
	    				else{
	    					
	    					$(target).remove();
	    				}
	    			},
	    			error	:	function(error){
	    				toastr.error("Error, please try again.");
	    				$(this).html(misc('times'));
	    			}
	    		});
	    		
	    	}
    	});
    	
    }
}


