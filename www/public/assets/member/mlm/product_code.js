var credit_memo = new credit_memo();
var global_tr_html = $(".div-script tbody").html();
var item_selected = ''; 

function credit_memo(){
	init();

	function init()
	{
		iniatilize_select();
		draggable_row.dragtable();

		event_remove_tr();
		event_accept_number_only();
		event_compute_class_change();
		event_taxable_check_change();
		
		action_lastclick_row();
		action_compute();
		action_date_picker();
		action_reassign_number();
	}

	function event_remove_tr()
	{
		$(document).on("click", ".remove-tr", function(e){
			if($(".tbody-item .remove-tr").length > 1){
				$(this).parent().remove();
				action_reassign_number();
				action_compute();
			}			
		});
	}

	this.action_lastclick_row = function()
	{
		action_lastclick_row();
	}

	function action_lastclick_row()
	{
		$(document).on("click", "tbody.draggable tr:last td:not(.remove-tr)", function(){
			action_lastclick_row_op();
		});
	}

	function action_return_to_number(number = '')
	{

		number += '';
		number = number.replace(/,/g, "");
		if(number == "" || number == null || isNaN(number)){
			number = 0;
		}
		
		return parseFloat(number);
	
	}

	function action_lastclick_row_op()
	{
		$("tbody.draggable").append(global_tr_html);
		action_reassign_number();
		action_trigger_select_plugin();
		action_date_picker();
	}

	function action_date_picker()
	{
		$(".draggable .for-datepicker").datepicker();
	}

	this.action_reassign_number = function()
	{
		action_reassign_number();
	}

	function action_reassign_number()
	{
		var num = 1;
		$(".invoice-number-td").each(function(){
			$(this).html(num);
			num++;
		});
	}

	function event_accept_number_only()
	{
		$(document).on("keypress",".number-input", function(event){
			if(event.which < 46 || event.which > 59) {
		        event.preventDefault();
		    } // prevent if not number/dot

		    if(event.which == 46 && $(this).val().indexOf('.') != -1) {
		        event.preventDefault();
		    } // prevent if already dot

		});

		$(document).on("change",".number-input", function(){
			$(this).val(function(index, value) {		 
			    var ret = '';
			    value = action_return_to_number(value);
			    if(!$(this).hasClass("txt-qty")){
			    	value = parseFloat(value);
			    	value = value.toFixed(2);
			    }
			    if(value != '' && !isNaN(value)){
			    	value = parseFloat(value);
			    	ret = action_add_comma(value).toLocaleString();
			    }
			   	
			    if(ret == 0){
			    	ret = '';
			    }

				return ret;
			  });
		});
	}

	function event_compute_class_change()
	{
		$(document).on("change",".compute", function()
		{
			action_compute();
		});
	}

	function action_compute()
	{
		

	}

	function action_add_comma(number)
	{
		number += '';
		if(number == '0' || number == ''){
			return '';
		}

		else{
			return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	/* CHECK BOX FOR TAXABLE */
	function event_taxable_check_change()
	{
		$(".taxable-check").unbind("change");
		$(".taxable-check").bind("change", function()
		{
			action_change_input_value($(this));
		});
	}

	function check_change_input_value()
	{
		$(".taxable-check").each( function()
		{
			action_change_input_value($(this));
		})
	}
	
	function action_change_input_value($this)
	{
		if($this.is(":checked"))
		{
			$this.prev().val(1);
		}
		else
		{
			$this.prev().val(0);
		}
	}

	function action_trigger_select_plugin()
	{
		$(".draggable .tr-draggable:last td select.select-item").globalDropList(
        {
            link : "/member/item/add",
            width : "150px",
            onCreateNew : function()
            {
            	item_selected = $(this);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });
        $(".draggable .tr-draggable:last td select.select-um").globalDropList(
        {
        	hasPopup: "false",
    		width : "110px",
    		placeholder : "um.."
        }).globalDropList('disabled');
	}

	/* Make select input into a drop down list plugin */
	function iniatilize_select()
	{
		$('.droplist-customer').globalDropList(
		{ 
			link : "/member/customer/modalcreatecustomer",
			onChangeValue: function()
			{
				$(".customer-email").val($(this).find("option:selected").attr("email"));
			}
		});
	    $('.droplist-item').globalDropList(
        {
            link : "/member/item/add",
            width : "150px",
            onCreateNew : function()
            {
            	item_selected = $(this);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });
        $('.droplist-um').globalDropList(
    	{
    		hasPopup: "false",
    		width : "110px",
    		placeholder : "um..",
    		onChangeValue: function()
    		{
    			action_load_unit_measurement($(this));
    		}

    	});
        $('.droplist-um:not(.has-value)').globalDropList("disabled");
	}


	function action_load_item_info($this)
	{
		$parent = $this.closest(".tr-draggable");
		$parent.find(".txt-desc").val($this.find("option:selected").attr("sales-info")).change();
		$parent.find(".txt-rate").val($this.find("option:selected").attr("price")).change();
		$parent.find(".txt-qty").val(1).change();

		if($this.find("option:selected").attr("has-um") != '')
		{
			$.ajax(
			{
				url: '/member/item/load_one_um/' +$this.find("option:selected").attr("has-um"),
				method: 'get',
				success: function(data)
				{
					$parent.find(".select-um").html(data).globalDropList("reload").globalDropList("enabled");
				},
				error: function(e)
				{
					console.log(e.error());
				}
			})
		}
		else
		{
			$parent.find(".select-um").html('<option class="hidden" value=""></option>').globalDropList("reload").globalDropList("disabled").globalDropList("clear");
		}
	}

	function action_load_unit_measurement($this)
	{
		$parent = $this.closest(".tr-draggable");
		$item   = $this.closest(".tr-draggable").find(".select-item");

		$um_qty = parseFloat($this.find("option:selected").attr("qty"));
		$sales  = parseFloat($item.find("option:selected").attr("price"));
		$qty    = parseFloat($parent.find(".txt-qty").val());
		console.log($um_qty +"|" + $sales +"|" +$qty);
		$parent.find(".txt-rate").val( $um_qty * $sales * $qty ).change();
	}

	this.action_reload_customer = function($id)
	{
		action_reload_customer($id);
	}

	function action_reload_customer($id)
	{
		$.ajax(
		{
			url: '/member/customer/load_customer',
			method: 'GET',
			success: function(data)
			{
				$element = $(".droplist-customer");

				$element.html(data);
				$element.globalDropList("reload");
				$element.val($id).change();
				
			},
			error: function()
			{
				console.log("error");
			}

		})
	}

	this.action_reload_item = function($id)
	{
		action_reload_item($id);
	}

	function action_reload_item($id)
	{
		$(".tbody-item .select-item").load('/member/customer/invoice option');
		$.ajax(
		{
			url: '/member/item/load_item_category',
			method: 'GET',
			success: function(data)
			{
				$element = $(".tbody-item .select-item");

				$element.html(data);
				$element.globalDropList("reload");

				// Filter selected combobox only
				item_selected.val($id).change();
			},
			error: function()
			{
				console.log("error");
			}

		})
	}

}	


/* AFTER DRAGGING A TABLE ROW */
function dragging_done()
{
	credit_memo.action_reassign_number();
}

/* AFTER ADDING A CUSTOMER */
function submit_done_customer(result)
{
	credit_memo.action_reload_customer(result['customer_info']['customer_id']);
}

/* AFTER ADDING AN  ITEM */
function submit_done_item(data)
{
	credit_memo.action_reload_item(data.item_id);
	$("#global_modal").modal("toggle");
}

function submit_done(data) 
{
    if(data.response_status == "warning")
    {
        var htmls 		  = "<div class='alert alert-danger'>";
        var warning_vali  = data.warning_validator;
        if (warning_vali != undefined) {
             // do something 
            var item_id   = warning_vali.item_id;
            var quantity  = warning_vali.quantity;
            
            
            $(item_id).each(function(a, b){
               htmls += b + "<br/>";
            });

            $(quantity).each(function(a, b){
               htmls += b + "<br/>";
            });
        }
        else
        {
            var other = data.other_warning;
            htmls    += other + "<br/>"; 
        }
        
        htmls += "</div>";
        $('#add-new-line-warning').html(htmls);
    }
    else if(data.response_status == "success")
    {
        $('#add-new-line-warning').html(" ");
        toastr.success('Line Successfully Added!');
        load_session();
        $('#global_modal').modal('toggle');
    }
}
function submit_done(data)
{
	$('.close').click();
	if(data.response_status == 'warning')
	{
		var validtor = data.warning_validator;
		validtor.forEach(function (item) {
		  toastr.warning(item);
		})
	}
	else if(data.response_status == 'success')
	{
		toastr.success('Success');
		load_session();
	}

	else if(data.response_status == 'success_process')
	{
		toastr.success('Success');
		window.location = "/member/mlm/product_code/receipt?invoice_id=" + data.invoice_id;
	}
}