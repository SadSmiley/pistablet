var customer = new customer();

function customer() {
    init();
    
    function init(){
        _ready();
    }
    function _ready() {
        tabnavigation();
        popModal();
        // CreateCustomer();
        columnhide();
        outsideclick();
        popover();
        
    }
    function tabnavigation(){
        $(".nav-option").unbind("click");
        $(".nav-option").bind("click", function () {
            var content = $(this).data("content");
            
        });
    }
    
    function popModal(){
        $(".btn-create-modal").unbind("click");
        $(".btn-create-modal").bind("click", function(){
            $(".btn-save-modallarge").html("Save customer");
            $(".error-modal").css("display","none");
            var urls = '/member/customer/insertcustomer';
            $(".btn-save-modallarge").attr("data-urls",urls);
            $(".btn-del-modallarge").css("display","none");
            $(".btn-save-modallarge").attr("data-target",'.customer-table');
            // $(".btn-save-modal").attr("disabled",true);
            $(".layout-modallarge-title").html("Create new customer");
            var datas = {
                _token:misc('_token')
            };
            var target = '.modallarge-body-layout';
            var urls = '/member/customer/modalcreatecustomer';
            formajax(urls, datas, target);
        });
        
        $(".a-customer").unbind("click");
        $(".a-customer").bind("click", function(){
            $(".btn-save-modallarge").html("Update customer");
            $(".error-modal").css("display","none");
            $(".btn-del-modallarge").css("display","initial");
            $(".btn-save-modallarge").attr("data-urls","/member/customer/updatecustomer");
            var html = $(this).html();
            $(".layout-modallarge-title").html("Update customer");
            var customer_id = $(this).data("content");
            $(".btn-save-modallarge").attr("data-target",'#customer_tr_' + customer_id);
            var urls = '/member/customer/editcustomer';
            var target = '.modallarge-body-layout';
            var datas = {
                _token:misc('_token'),
                customer_id:customer_id
            };
            formajax(urls, datas, target);
        });
    }
    
    function formajax(urls = '', datas = [], target = ''){
        $(target).html(misc('loader-16-gray'));
        $.ajax({
            url     :   urls,
            type    :   "POST",
            data    :   datas,
            success :   function (result) {
                $(target).html(result);
            },
            error   :   function (err) {
                $(target).html(errorajax(urls, datas, target));
                btnajaxerror();
            }
        });
    }
    
    function errorajax(urls = '', datas = [], target = ''){
        datas = JSON.stringify(datas);
        // console.log(urls);
        var button = "<button class='btn btm-custom-green btn-reload-ajax' data-target=\'"+target+"\' data-urls=\'"+urls+"\' data-datas=\'"+datas+"\'>reload</button>";
        var div_alert = "<div class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Error something went wrong</div>";
        return "<div class='text-center padding-5'>"+div_alert + button +"</div>";
    }
    
    function btnajaxerror(){
        $(".btn-reload-ajax").unbind("click");
        $(".btn-reload-ajax").bind("click", function () {
            var datas = $(this).data("datas");
            var urls = $(this).data("urls");
            var target = $(this).data("target");
            console.log(datas);
            formajax(urls, datas, target);
        });
    }
    
    function  misc(str) {
        switch (str) {
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
    
    
    
    function ajaxsendData(urls = '', datas = [], target = '', html = '', btn = ''){
        $(btn).html(misc('spinner'));
        $(".error-modal").css("display","none");
        $.ajax({
            url     :   urls,
            data    :   datas,
            type    :   "POST",
            success :   function (result) {
                $(btn).html(html);
                if(result == 'email already exist'){
                    $(".error-modal").css("display","block");
                    $(".error-modal").html(result);
                }
                else{
                    $(target).html(result);
                    $("#layoutModal-large").modal("hide");
                }
                
            },
            error   :   function (err) {
                $(btn).html(html);
            }
        });
    }
    
    function columnhide(){
       
        try{
            for(var j = 2; j <= 7; j++){
                $(".table-customer tr th:nth-child("+j+")").hide();
            }
        }
        catch(errr){
            
        }

    }
    
    function reload_js(src = '') {
        $('script[src="' + src + '"]').remove();
        $('<script>').attr('src', src + '?cachebuster='+ new Date().getTime()).appendTo('head');
    }
    function outsideclick() {
		$(document).on('click', function (e) {

		    $('[data-toggle="popover"],[data-original-title]').each(function () {
		        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
		            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
		        }

		    });
		    $(".custom-drop-down").fadeOut("fast");
		    e.stopPropagation();
		});
	}
	
	function popover(){
	    $("#table-columns").popover({
	        html : true,
		    content: function() {
		      return $("#pop-columns").html();
		    }
	    });
	    
	    var table_columns = $("#table-columns").popover();
	    table_columns.on("show.bs.popover", function(e){
	        
		    $(".popover").css("left","1094px");
		})
		table_columns.on("shown.bs.popover", function(e){
		    popoverOperation();
		});
	}
	
	function popoverOperation(){
	    $(".arrow").css("margin-left","28px");
	    $(".check-column").unbind("change");
	    $(".check-column").bind("change", function(){
	        var index = $(this).val();
	        if($(this).is(':checked')){
	            $(".table-customer tr th:nth-child("+index+")").show();
	        }
	        else{
	            $(".table-customer tr th:nth-child("+index+")").hide();
	        }
	    });
	}
	this.customerform = function customerform(){
	    removeupload();
	    $( ".datepicker" ).datepicker();
	    $(".checkbox-toggle").each(function(){
	        var target = $(this).attr("data-target");
	        if($(this).is(':checked')){
	            $(target).attr("readonly", false);
	        }
	        else{
	            $(target).attr("readonly", true);
	        }
	        
	    });
	    
	    $(".checkbox-toggle-rev").each(function(){
	        var target = $(this).attr("data-target");
	        // console.log(target);
	        if($(this).is(':checked')){
	            $(target).attr("readonly", true);
	        }
	        else{
	            $(target).attr("readonly", false);
	        }
	        
	    });
	    
	    
	    
	   
	    $(".checkbox-toggle").unbind("change");
	    $(".checkbox-toggle").bind("change", function() {
	        var target = $(this).attr("data-target");
	        console.log(target);
	        if($(this).is(":checked")){
	            $(target).attr("readonly", false);
	        }
	        else{
	            $(target).attr("readonly", true);
	        }
	    });
	    
	    

	    $(".checkbox-toggle-rev").unbind("change");
	    $(".checkbox-toggle-rev").bind("change", function() {
	        var target = $(this).attr("data-target");
	        console.log(target);
	        if($(this).is(":checked")){
	            $(target).attr("readonly", true);
	        }
	        else{
	            $(target).attr("readonly", false);
	        }
	    });

	    $(".ismlm").unbind("change");
	    $(".ismlm").bind("change", function() {
	        if($(this).is(":checked")){
	            $('.mlm_username').attr("readonly", false);
	            $('.mlm_password').attr("readonly", false);
	        }
	        else{
	            $('.mlm_username').attr("readonly", true);
	            $('.mlm_password').attr("readonly", true);
	        }
	    });

	    $(".check-print-name-as").unbind("change");
	    $(".check-print-name-as").bind("change", function(){
	    	var combo = comboname();
	    	var target = $(this).attr("data-target");
	    	
	    	if($(this).is(':checked')){
	    		$(target).attr("readonly", true);
	    		// console.log(combo['combo'][0]);
	    		$(target).val(combo['combo'][0]);
	    	}
	    	else{
	    		$(target).attr("readonly", false);
	    	}
	    });


	    $(".btn-toggle-custom").unbind("click");
	    $(".btn-toggle-custom").bind("click", function (e) {
	        $(".new-custom-drop-down").css("display","none");
	        $(".new-drop-down-term").css("display","none");
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
	        setTimeout(function(){ 
	        	$(container).scrollTop($(container)[0].scrollHeight);
	        }, 175);
	        
	    });
	    
	    $(".div-file-input").unbind("click");
	    $(".div-file-input").bind("click", function(){
	        document.getElementById('attachment_file').click();
	        
	    });
	    var filecount = 0;
	    $("#attachment_file").unbind("change");
	    $("#attachment_file").bind("change", function(){
	        var file = document.getElementById("attachment_file").files[0];
	        var filename = file['name'];
	        var formdata = new FormData();
	        var ajax = new XMLHttpRequest();
	        formdata.append("file", file);
	        formdata.append("_token",misc('_token'));
	        ajax.upload.addEventListener("progress", UploadProgress, false);
	        ajax.addEventListener("load", LoadUpload, false);
	        ajax.open("POST","/member/customer/uploadcustomerfile");
	        ajax.send(formdata);
	        filecount++;
	        var htlm = '<div class="form-group file-'+filecount+'">';
                htlm += '<div class="col-md-8">';
                htlm += '<span>'+filename+'</span>';
                htlm += '</div>'
                htlm += '<div class="col-md-4 file-operation-'+filecount+'">';
                htlm += '<div class="custom-progress-container container-'+filecount+'">';
                htlm += '<div class="custom-progress progress-'+filecount+'"></div>';
                htlm += '</div></div></div>';
             $(".div-attachment").append(htlm);
	        
	    });
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
	    
	    $(".list-drop-display-payment-method").unbind("click");
	    $(".list-drop-display-payment-method").bind("click", function(){
	        var value = $(this).attr("data-value");
	        var html = $(this).attr("data-html");
	        $(".drop-down-payment-method").slideToggle("fast");
	        if(value == 0){
	           $(".new-payment-method").slideToggle("fast");
	           createpaymentmethod();
	        }
	        else{
	            $(".hidden_payment_method").val(value);
	            $(".payment_method").val(html);
	        }
	    });

	    $(".billing-address").unbind("change");
	    $(".billing-address").bind("change", function(){
	        var ischecked = $(".chk_same_shipping_address").is(":checked");
	        
	 
	        if(ischecked)
	        {
	            var value = $(this).val();
	            var target = $(this).attr("data-target");
	            $(target).val(value);
	            
	        }
	       
	    });
	    
	    $(".list-drop-display-parent").unbind("click");
	    $(".list-drop-display-parent").bind("click", function(){
	        
	    });
	    
	    $(".list-drop-display-terms").unbind("click");
	    $(".list-drop-display-terms").bind("click", function(){
	        var value = $(this).attr("data-value");
	        var html = $(this).attr("data-html");
	        $(".drop-down-terms").slideToggle("fast");
	        if(value == 0){
	            $(".new-drop-down-term").slideToggle("fast");
	            createterms();
	        }
	        else{
	            $(".hidden_terms").val(value);
	            $(".txt_terms").val(html);
	        }
	    });
	    
	    $(".close-custom-drop").unbind("click");
	    $(".close-custom-drop").bind("click", function(){
	        var target = $(this).attr("data-target");
	        $(target).slideToggle("fast");
	    });
	    $(".radio-new-terms").unbind("change");
	    $(".radio-new-terms").bind("change", function(){
	        var val = $(this).val();
	        console.log(val);
	        if(val == "fixed day"){
	            $(".txt-certain-day-month").attr("disabled", true);
	            $(".txt-certain-day-month").val("");
	            $(".txt-certain-days-due").attr("disabled", true);
	            $(".txt-fixed-day").attr("disabled", false);
	        }
	        else if(val == "certain day"){
	            $(".txt-certain-day-month").attr("disabled", false);
	            $(".txt-certain-days-due").attr("disabled", false);
	            $(".txt-certain-days-due").val("");
	            $(".txt-fixed-day").attr("disabled", true);
	            $(".txt-fixed-day").val("");
	        }
	    });
	    
	    
        
        
        $(".auto-name").unbind("change");
        $(".auto-name").bind("change", function(){
        	var  combonames = comboname();
			$(".drop-down-display-name").html(combonames['html']);
			$(".display-name-check").val(combonames['combo'][0]);
			listdropdownname();
        });
    	function comboname(){
			var title = $(".title").val();
			var first_name = $(".first_name").val();
			var middle_name = $(".middle_name").val();
			var last_name = $(".last_name").val();
			var last_name2 = last_name;
			var suffix = $(".suffix").val();
			if(suffix != null && suffix != '')
			{
				suffix = ' '+suffix;
			}
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
	}
	
	

	function listdropdownname(){
		$(".list-drop-display-name").unbind("click");
	    $(".list-drop-display-name").bind("click", function(){
	        var html = $(this).attr("data-html");
	       // console.log(html);
	        $(".txt-display-name").val(html);
	        $(".drop-down-display-name").slideToggle("fast");
	    });
	}
	
	function createpaymentmethod(){
	    $(".btn-save-new-method").unbind("click");
	    $(".btn-save-new-method").bind("click", function(){
	        var name = $(".new-payment-name").val();
	        $(".btn-save-new-method").html(misc('spinner'));
	        $.ajax({
	            url     :   "/member/customer/createpaymentmethod",
	            type    :   "POST",
	            data    :   {
	                name:name,
	                _token:misc('_token')
	            },
	            success : function (result) {
	                $(".btn-save-new-method").html('Save');
	                var res = JSON.parse(result);
	                if(res['message'] == 'success'){
	                    $(".payment_method").val(res['name']);
    	                $(".hidden_payment_method").val(res['id']);
    	                var html = '<a href="#" class="list-group-item list-drop-display-payment-method" data-value="'+res['id']+'" data-html="'+res['name']+'">'+res['name']+'</a>';
    	                $(".drop-down-payment-method").append(html);
    	                $(".new-payment-method").css("display","none");
    	                customer.customerform();
	                }
	                else{
	                    toastr.error(res['error']);
	                }
	                
	            },
	            error   : function(err){
	                $(".btn-save-new-method").html('Save');
	                toastr.error("Error, something went wrong.");
	            }
	        });
	    });
	}
	
	
	function createterms(){
	    $(".btn-save-new-terms").unbind("click");
	    $(".btn-save-new-terms").bind("click", function(){
	        var category = $('input[name="new_terms_radio"]:checked').val();
	        var name = $(".txt-new-term-name").val();
            var day_month = $(".txt-certain-day-month").val();
            var day_due = $(".txt-certain-days-due").val();
            var fixed = $(".txt-fixed-day").val();
            if(name != ""){
                $(".btn-save-new-terms").html(misc('spinner'));
                $.ajax({
                    url     :   "/member/customer/createterms",
                    type    :   "POST",
                    data    :   {
                        category:category,
                        name:name,
                        day_month:day_month,
                        day_due:day_due,
                        fixed:fixed,
                        _token:misc('_token')
                    },
                    success :   function(result){
                        $(".btn-save-new-terms").html('Save');
                        var res = JSON.parse(result);
                        if(res['message'] == 'success'){
                            $(".hidden_terms").val(res['id']);
                            $(".txt_terms").val(res['name']);
                            var html = '<a href="#" class="list-group-item list-drop-display-terms" data-value="'+res['id']+'" data-html="'+res['name']+'">'+res['name']+'</a>';
                            $(".drop-down-terms").append(html);
                            $(".new-drop-down-term").css("display","none");
                            customer.customerform();
                        }
                        else{
                            toastr.error(res['error']);
                        }
                        
                    },
                    error   :   function(err){
                        $(".btn-save-new-terms").html('Save');
                        toastr.error("Error, something went wrong.");
                    }
                });
            }
            else{
                toastr.error("Please fill the missing field.");
            }
            
	    });
	}
}
function submit_modal(){
	$("#modal_form_large").on("submit",function(e){
	    e.preventDefault();
	    $(".btn-save-modallarge").html(misc('spinner'));
	    var form = $("#modal_form_large").serialize();
	    $.ajax({
	        url     :   "/member/customer/createcustomer",
	        type    :   "POST",
	        data    :   form,
	        success :   function(result){
	            var res = JSON.parse(result);
	            if(res['message'] == 'success'){
	                $(".btn-save-modallarge").html('Save');
	                $("#global_modal").modal("hide");
	                if (typeof submit_done_customer == 'function')
		            {
		            	// console.log("meron");
		                submit_done_customer(res);
		            }
	                // toastr.success("New customer inserted");
	                // location.reload();
	            }
	            else{
	                toastr.error(res['error']);
	            }
	            
	        },
	        error   :   function(err){
	            $(".btn-save-modallarge").html('Save');
	            toastr.error("Error, something went wrong.");
	        }
	    });
	});
}

function loading_done(url){
	
	if(url != ''){
		customer.customerform();
		submit_modal();
	}
}

function submit_done(data)
{
	if(data.message == 'error')
	{
		toastr.error(data.error);
	}
	else
	{
		$(data.target).html(data.view);
		$("#global_modal").modal("hide");
	}
}
function  misc(str) {
    switch (str) {
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