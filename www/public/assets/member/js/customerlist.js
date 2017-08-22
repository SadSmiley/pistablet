
function submit_done_customer(result){
	result = JSON.parse(result);
	var customer_info = result.customer_info;
	customerlist.loadcustomer();
}


var customerlist = new customerlist();

function customerlist()
{
	init();

	function init()
	{
		search();
		tabsearch();
		action();
	}

	function search()
	{
		$(".customer-search").unbind("keyup");
		$(".customer-search").bind("keyup", function () {
			 var str = $(this).val();
			 var value = $(this).attr("data-value");
			 console.log(value);
			 var data = {
			 	str:str,
			 	archive:value,
			 	_token:misc('_token')
			 };
			 var url = "/member/customer/loadcustomer";
			 var target = ".panel-customer";
			 search_ajax(url, data, target);
		});
	}
	function tabsearch()
	{	
		$(".customer-tab").unbind("click");
		$(".customer-tab").bind("click", function (){
			var value = $(this).data("value");
			$(".customer-search").attr("data-value", value);
			var data = {
				archive:value,
				_token:misc('_token')
			};
			var url = "/member/customer/loadcustomer";
			var target = ".panel-customer";
			search_ajax(url, data, target);
		});
	}

	function search_ajax(urls = "", datas = [], target = ""){
		$(target).html(misc('loader-16-gray margin-top-20'));
		$.ajax({
			url 	: 	urls,
			data 	: 	datas,
			type 	: 	"POST",
			success : 	function(result){
				$(target).html(result);
				action();
			},
			error 	: 	function(err){
				toastr.error("Error, something went wrong.");
			}
		});
	}

	this.loadcustomer = function(){
		loadcustomer();
	}

	function loadcustomer(str = ''){
		$(".panel-customer").html('<div class="loader-16-gray margin-top-20"></div>');
		$.ajax({
			url 	: 	"/member/customer/loadcustomer",
			type 	: 	"POST",
			data 	: 	{
				_token:misc('_token'),
				str:str
			},
			success : 	function(result){
				$(".panel-customer").html(result);
				action();
			},
			error 	: 	function(err){
				toastr.error("Error, something went wrong.");
			}
		});
	}

	this.action = function(){
		action();
	}

	function action()
	{
		$(".active-toggle").unbind("click");
		$(".active-toggle").bind("click", function(){
			var id = $(this).data("content");
			var html = $(this).data("html");
			var con = confirm("Are you sure you want to make this client "+html+"?");
			var btn = $(".btn-action-"+id);
			var target = $(this).data("target");
			var btn_html = btn.html();
			var value = $(this).data("value");
			
			if(con){
				btn.html(misc('spinner'));
				$.ajax({
					url 	: 	"/member/customer/inactivecustomer",
					type	: 	"POST",
					data 	: 	{
						id:id,
						archived:value,
						_token:misc('_token')
					},
					success : 	function(result){
						$("#tr-customer-"+id).remove();
						toastr.success("Customer has been inactive.");
					},
					error 	: 	function(err){
						toastr.error("Error, something went wrong.");
						btn.html(btn_html);
					}
				});
			}
		});
	}
	function misc(str = ''){
		switch(str){
			case 'spinner':
				return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
				break;
			case '_token':
				return $("#_token").val();
				break;

			case 'loader-16-gray':
                return '<div class="loader-16-gray"></div>';
                break;

             case 'loader-16-gray margin-top-20':
                return '<div class="loader-16-gray margin-top-20"></div>';
                break;
		}
	}
}

function loading_done_paginate(){
	customerlist.action();	
}