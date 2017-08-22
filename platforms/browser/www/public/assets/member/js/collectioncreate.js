var collectioncreate = new collectioncreate();

function collectioncreate() {
    init();
    function init(){
        browse();
        addItemCollection();
        collectionOperation();
    }
    function browse() {
        $(".search-custom-list").unbind("click");
		$(".search-custom-list").bind("click", function(){
			var cat = $(this).data("content");
			var content = cat+',category';

			$(".search-list-option").css("display","none");
			$(".search-item-result").css("display","block");
			$(".back-list").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;'+cat);
			globalajax(content, '/member/order/new_order/itemlist','.item-result');

		});
		$(".back-list").unbind("click");
		$(".back-list").bind("click", function(){
			$(".search-list-option").css("display","block");
			$(".search-item-result").css("display","none");
		});
    }
    function subcategory(){
		$(".search-sub-custom-list").unbind("click");
		$(".search-sub-custom-list").bind("click", function(){
			var cat = $(this).data("value");
			var name = $(this).data("content");
			var trigger = $(this).data("tirgger");
			var content = cat+','+trigger;
			$(".back-list").html('<i class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;'+name);
			globalajax(content, '/member/order/new_order/itemlist','.item-result');
		});
	}
	function globalajax(content = '', urls = '', target = ''){
		// console.log(content);
		$(target).html(loader('loader-16-gray'));
		$.ajax({
			url 	 : 	urls,
			type 	 : 	"POST",
			data 	 : 	{
				_token:token(),
				content:content
			},
			success  : 	function(result){
				$(target).html(result);
				searchitemOperation();
				subcategory();
				checkifCheck();
				checkmain();
			},
			error 	 : 	function(err){
				$(target).html(errorhandlers(content, urls, target));
				errorfunction();
			}
		});
	}
	function errorhandlers(content = '', url = '', div = ''){
		var html = '<div class="alert alert-danger text-center">Error, something went wrong</div>';
		html += '<center><button class="btn btn-primary btn-reload" data-content="'+content+'" data-url="'+url+'" data-div="'+div+'"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;Reload</button></center>';
		return html;
	}
	function errorfunction(){
		$(".btn-reload").unbind("click");
		$(".btn-reload").bind("click", function (){
			var content = $(this).data("content");
			var url 	= $(this).data("url");
			var div 	= $(this).data("div");
			globalajax(content, url, div);
		});
	}
	function fa(str){
		switch(str){
			case 'fa-loader':
				return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>'
				break;
		}
	}

	function token(){
		return $("#_token").val();
	}

	function loader(str){
		return '<div class="'+str+'"></div><center><span class="f-gray">Loading...</span></center>';
	}
	function searchitemOperation(){
		$(".main-check-box").unbind("click");
		$(".main-check-box").bind("click", function(){
			var id = $(this).data("content");
			if($("#main-check-box-"+id).is(':checked')){
				$(".child-check-box-"+id).prop('checked', true);
			}
			else{
				$(".child-check-box-"+id).prop('checked', false);
			}
		});
		$(".child-check-box").unbind("click");
		$(".child-check-box").bind("click", function(){
			var main = $(this).data('main');
			$("#main-check-box-"+main).prop('checked', true);
		});
	}
	function checkmain(){
	    $(".main-check-box").unbind("change");
	    $(".main-check-box").bind("change", function () {
	        checkmainCheck();
	    });
	}
    function checkmainCheck(argument) {
        var bools = false;
        if($(".main-check-box:checked").length == 0){
            bools = true;
        }
        $(".btn-add-collection").attr("disabled",bools);
    }
	function checkifCheck(){
	    $(".child-check-box").unbind("change");
	    $(".child-check-box").bind("change", function () {
	        var main = [];
	        $(".child-check-box").each(function () {
	            var dmain = $(this).data("main");
	            if($.inArray(dmain,main) == -1){
	                main.push(dmain);
	            }
	        });
	        $.each(main,function (a, b) {
	            
	            if ($('.child-check-box-'+b+':checked').length == 0) {
                  $("#main-check-box-"+b).attr("checked",false);
                  
                }
                
	        });
	        checkmainCheck();
	    });
	}
	function addItemCollection(){
	    $(".btn-add-collection").unbind("click");
	    $(".btn-add-collection").bind("click", function(){
	    	var html = 	$(".btn-add-collection").html();
	    	$(".btn-add-collection").html(fa('fa-loader'));
	        var dataform = $("#item-result").serialize();
	        $.ajax({
	            url      :      "/member/product/additemcollection",
	            type     :      "POST",
	            data     :      dataform,
	            success  :      function (result) {
	            	toastr.success("Item added.");
	            	$(".btn-add-collection").html(html);
	                $(".item-list").html(result);
	                $('#item-result').find('input[type=checkbox]:checked').removeAttr('checked');
	                checkmainCheck();
	            },
	            error    :      function (err) {
	                toastr.error("Error, something went wrong.");
	                $(".btn-add-collection").html(html);
	            }
	        });
	    });
	    $(".btn-update-collection").unbind("click");
	    $(".btn-update-collection").bind("click", function(){
	    	var html = 	$(".btn-add-collection").html();
	    	$(".btn-update-collection").html(fa('fa-loader'));
	        var dataform = $("#item-result").serialize();
	        $.ajax({
	            url      :      "/member/product/collection/updateitemCOllection",
	            type     :      "POST",
	            data     :      dataform,
	            success  :      function (result) {
	            	toastr.success("Item added.");
	            	$(".btn-add-collection").html(html);
	                $(".item-list").html(result);
	                $('#item-result').find('input[type=checkbox]:checked').removeAttr('checked');
	                checkmainCheck();
	            },
	            error    :      function (err) {
	                toastr.error("Error, something went wrong.");
	                $(".btn-update-collection").html(html);
	            }
	        });
	    });
	}
	function collectionOperation() {
		$(".visibility-toggle").unbind("change");
		$(".visibility-toggle").bind("change", function () {
			var id = $(this).data("content");
			var check = $(this).is(':checked');
			// alert(check);
			$.ajax({
				url 	:	"/member/product/collectionitemvisibility",
				type	:	"POST",
				data	:	{
					id:id,
					_token:token(),
					check:check
				},
				success :	function (result) {
					toastr.success("Visibility changed.");
				},
				error	:	function (err) {
					toastr.error("Error, something went wrong.");
				}
			});
		});
		$(".remove-collection").unbind("click");
		$(".remove-collection").bind("click", function(){
			var id = $(this).data("content");
			var con = confirm("Do you really want to remove this item?");
			if(con){
				$.ajax({
					url 	:	"/member/product/removeitemcollection",
					type	:	"POST",
					data	:	{
						id:id,
						_token:token()
					},
					success :	function (result){
						toastr.success("Item has been removed.");
						$("#tr-collection-"+id).remove();
					},
					error	:	function (err) {
						toastr.error("Error, something went wrong.");
					}
				});	
			}
		});
	}
}