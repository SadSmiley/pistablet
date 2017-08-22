var sir = new sir();
var global_tr_html = '<tr class="tr-draggable">' + $(".div-script .div-item-row-script .tr-draggable").html() + '</tr>';
var item_selected = ''; 
var unit_selected = '';
function sir(){
	init();

	function init(){
		// $(".droplist-customer").val(12).trigger("change");
		// console.log($(".droplist-customer").val());
		// $(".droplist-customer").html("<option value='2'>Hello</option>");
		// $(".droplist-customer").globalDropList("reload");
		action_lastclick_row();
		event_remove_tr();
		event_accept_number_only();
		sub_action_compute();
		check_change_input_value();
		event_taxable_check_change();
		iniatilize_select();

		setTimeout(function()
		{
			date_picker();
		});	
	}


	function event_remove_tr()
	{
		$(".remove-tr").unbind("click");
		$(".remove-tr").bind("click", function(){
			if($(".remove-tr").length > 2){
				$(this).parent().parent().remove();
				action_lastclick_row();
				action_reassign_number();
			}			
		});
	}
	function action_lastclick_row()
	{
		$("tbody.draggable tr").unbind("click");
		$("tbody.draggable tr:last").bind("click", function(){
			$("tbody.draggable tr:last").unbind("click");
			action_lastclick_row_op();
		});
		$("tbody.draggable tr").unbind("focus");
		$("tbody.draggable tr:last").bind("focus", function(){
			$("tbody.draggable tr:last").unbind("focus");
			action_lastclick_row_op();
		});
	}

	function event_accept_number_only()
	{
		$(".number-input").unbind("keypress");
		$(".number-input").bind("keypress", function(event){
			if(event.which < 46 || event.which > 59) {
		        event.preventDefault();
		    } // prevent if not number/dot

		    if(event.which == 46 && $(this).val().indexOf('.') != -1) {
		        event.preventDefault();
		    } // prevent if already dot

		});
		$(".number-input").unbind("change");
		$(".number-input").bind("change", function(){
			$(this).val(function(index, value) {		 
			    var ret = '';
			    value = action_return_to_number(value);
			    if(!$(this).hasClass("txt-qty")){
			    	value = parseFloat(value);
			    	value = value.toFixed(2);
			    }
			    if(value != '' && !isNaN(value)){
			    	// console.log(value);
			    	value = parseFloat(value);
			    	// console.log(value);
			    	ret = action_add_comma(value).toLocaleString();
			    	// console.log(ret);
			    }
			    
			    var space = ''
			   	
			    if(ret == 0){
			    	ret = '';
			    }

				return ret;
			  });
			action_compute();
		});
	}


	/* CHECK BOX FOR TAXABLE */
	function event_taxable_check_change()
	{
		$(".taxable-check").unbind("change");
		$(".taxable-check").bind("change", function()
		{
			action_compute();
			action_change_input_value($(this));
		});
	}

	function action_compute()
	{
		var subtotal = 0;
		var total_taxable = 0;

		$(".tr-draggable").each(function()
		{
			/* GET ALL DATA */
			var qty 	= $(this).find(".txt-qty").val();
			var rate 	= $(this).find(".txt-rate").val();
			var discount= $(this).find(".txt-discount").val();
			var amount 	= $(this).find(".txt-amount");
			var taxable = $(this).find(".taxable-check");
			

			/* CHECK IF QUANTITY IS EMPTY */
			if(qty == "" || qty == null)
			{
				qty = 1;
			}


			/* RETURN TO NUMBER IF THERE IS COMMA */
			qty = action_return_to_number(qty);
			rate = action_return_to_number(rate);
			discount = action_return_to_number(discount);
			var total_per_tr = ((qty * rate) - discount).toFixed(2);


			/* action_compute SUB TOTAL PER LINE */
			subtotal += parseFloat(total_per_tr);

			/* AVOID ZEROES */
			if(total_per_tr <= 0)
			{
				total_per_tr = '';
			}

			/* CONVERT TO INTEGER */
			var amount_val = amount.val();
			
			if(amount_val != '' && amount_val != null && total_per_tr == '') //IF QUANTITY, RATE IS [NOT EMPTY]
			{
				var sub = parseFloat(action_return_to_number(amount_val));
				if(isNaN(sub))
				{
					sub = 0;
				}
				subtotal += sub;
				total_per_tr = sub;
				amount.val(action_add_comma(sub));
			}
			else //IF QUANTITY, RATE IS [EMPTY]
			{
				amount.val(action_add_comma(total_per_tr));
			}



			/*CHECK IF TAXABLE*/	
			if(taxable.is(':checked'))
			{
				total_taxable += parseFloat(total_per_tr);
			}

		});
		
		/* action_compute EWT */
		var ewt_value 			= $(".ewt-value").val();
		console.log(ewt_value);


		/* action_compute DISCOUNT */
		var discount_selection 	= $(".discount_selection").val();
		var discount_txt 		= $(".discount_txt").val();
		var tax_selection 		= $(".tax_selection").val();
		var taxable_discount 	= 0;

		if(discount_txt == "" || discount_txt == null)
		{
			discount_txt = 0;
		}

		discount_txt = parseFloat(discount_txt);
		discount_total = discount_txt;

		if(discount_selection == 'percent')
		{
			discount_total = subtotal * (discount_txt / 100);
			taxable_discount = total_taxable * (discount_txt / 100);
		}

		/* action_compute TOTAL */
		var total = 0;
		total     = subtotal - discount_total;

		/* action_compute TAX */
		var tax   = 0;
		if(tax_selection == 1){
			tax = total_taxable * (12 / 100);
		}
		total += tax;

		$(".sub-total").html(action_add_comma(subtotal.toFixed(2)));
		// $(".ewt-total").html(action_add_comma(ewt_value.toFixed(2)));
		$(".discount-total").html(action_add_comma(discount_total.toFixed(2)));
		$(".tax-total").html(action_add_comma(tax.toFixed(2)));
		$(".total-amount").html(action_add_comma(total.toFixed(2)));
		$(".total-amount-input").val(total.toFixed(2));

	}

	function action_change_input_value($this)
	{
		if($this.is(":checked"))
		{
			$this.prev().val(1);
			console.log($this.prev());
		}
		else
		{
			$this.prev().val(0);
		}
	}

	function check_change_input_value()
	{
		$(".taxable-check").each( function()
		{
			action_change_input_value($(this));
		})
	}

	function action_return_to_number(number = ''){

		number += '';
		number = number.replace(/,/g, "");
		if(number == "" || number == null || isNaN(number)){
			number = 0;
		}
		
		return parseFloat(number);
	
	}

	function action_add_comma(number)
	{
		// console.log(number);
		number += '';
		if(number == '0' || number == ''){
			return '';
		}

		else{
			return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}

	function sub_action_compute()
	{
		$(".sub-compute").unbind("change");
		$(".sub-compute").bind("change", function()
		{
			action_compute();
		});
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
	function date_picker()
	{
		// console.log(global_tr_html);
		$(".for-datepicker").each(function()
		{
			
			$(this).removeClass("datepicker");
			$(this).removeClass("for-datepicker");
			$(this).removeClass("hasDatepicker");
			$(this).removeAttr("id");
			$(this).addClass("datepicker");

		});

		// if(!$(".for-datepicker").hasClass("datepicker"))
		// {
		// 	$(".for-datepicker").addClass("datepicker");
		// }
		$(".datepicker").datepicker();
	}

	this.action_lastclick_row = function()
	{
		action_lastclick_row();
	}


	function action_lastclick_row_op()
	{
		$("tbody.draggable").append(global_tr_html);
		date_picker();
		action_lastclick_row();

		draggable_row.dragtable();
		textExpand();
		event_remove_tr();
		action_reassign_number();
		action_trigger_chosen_plugin();
		
		event_accept_number_only();
		sub_action_compute();
		
	}


	function action_trigger_chosen_plugin()
	{
		$(".draggable .tr-draggable:last td select.item-class").globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            onCreateNew : function()
            {
            	item_selected = $(this);
            	console.log(item_selected);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });
        $(".draggable .tr-draggable:last td select.unit-class").globalDropList(
        {
            link : "/member/item/unit_of_measurement/add",
            width : "100%",
            onCreateNew : function()
            {
            	item_selected = $(this);
            	console.log(item_selected);
            },
            onChangeValue : function()
            {
            	console.log("function here");
            	action_compute_per_unit($(this));
            }
        });
	}

	/* ADDING EXTRA ROW FIELD UPON CLICK IN THE LAST ROW */

	function action_add_row_html()
	{
        return  '<tr class="tr-draggable">' + $(".tr-draggable").html() + '</tr>';
	}

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
            width : "100%",
            onCreateNew : function()
            {
            	item_selected = $(this);
            	console.log(item_selected);
            },
            onChangeValue : function()
            {
            	action_load_item_info($(this));
            }
        });

	    $('.droplist-unit').globalDropList(
        {
        	hasPopup : "false",
            width : "100%",
            onCreateNew : function()
            {
            	unit_selected = $(this);
            	console.log(unit_selected);
            },
            onChangeValue : function()
            {
            	console.log("function here");
            	action_compute_per_unit($(this));
            }
        });
	}
	function action_compute_per_unit($this)
	{
		$parent = $this.closest(".tr-draggable");
		$parent.find(".um-qty").val($this.find("option:selected").attr("unit-qty")).change();
		$parent.find(".txt-rate").val($this.attr("price") * $this.find("option:selected").attr("unit-qty")).change();
	}
	function action_load_item_info($this)
	{
		$parent = $this.closest(".tr-draggable");
		$parent.find(".txt-desc").val($this.find("option:selected").attr("sales-info")).change();
		$parent.find(".txt-rate").val($this.find("option:selected").attr("price")).change();
		$parent.find(".txt-qty").val(1).change();
		var unit = $this.find("option:selected").attr("has-um");
		action_load_unit($this, unit, $this.find("option:selected").attr("price"));
	}
	function action_load_unit($this, $unit_id, $price)
	{
		var option = "";
		console.log($unit_id);
		if($unit_id != "")
		{
			console.log("unit_id "+$unit_id);

			$.ajax({
				url : "/member/item/select_um",
				type : "get",
				data : {unit_id: $unit_id},
				success : function(data)
				{
           			var um_list = $.parseJSON(data);
	            	var ctr = 0;
           			$(um_list).each(function (a, b)
		            {
		            	if(b.multi_id != null)
		            	{
			                option += '<option value='+b.multi_id+' unit-qty='+b.unit_qty+'>'+b.multi_name +" ("+b.multi_abbrev+")"+'</option>';
		            	}
		            });
					$parent = $this.closest(".tr-draggable");
					$parent.find(".um-list").attr("price", $price);
					$parent.find(".um-list").html(option).change();
					$parent.find(".um-list").globalDropList("reload");
					$parent.find(".um-list").val($parent.find(".um-list option:first").val()).change();

				}
			});
		}
		else
		{
			option = "<option value='' selected unit-qty='1'>No U/M</option>";

			$parent = $this.closest(".tr-draggable");
			$parent.find(".um-list").attr("price", $price);
			$parent.find(".um-list").html(option).change();
			$parent.find(".um-list").globalDropList("reload");
			$parent.find(".um-list").val($parent.find(".um-list option:first").val()).change();
		}
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
				
				/* SET LAST INSERTED VALUE TO SELECT */
				//$last_inserted_value = find_max_value($element);
				//set_selected_select_value($element, $last_inserted_value);
			},
			error: function()
			{
				console.log("error");
			}

		})
	}

	this.action_reload_item = function($id)
	{
		action_reload_customer($id);
	}

	function action_reload_item($id)
	{
		$.ajax(
		{
			url: '/member/item/load_item',
			method: 'GET',
			success: function(data)
			{
				$element = $(".droplist-item");

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

	function find_max_value(element) {
	    var maxValue = undefined;
	    $('option', element).each(function() 
	    {
	        var val = $(this).attr('value');
	        val = parseInt(val, 10);
	        if (find_max_value === undefined || maxValue < val) 
	        {
	            maxValue = val;
	        }
	    });

	    return maxValue;
	}

}	


/*AFTER DRAGGING A TABLE ROW*/
function dragging_done()
{
	sir.action_reassign_number();
	sir.action_lastclick_row();
}
function submit_done_for_page(data)
{
	if(data.status == "success")
    {
        toastr.success("Success");
    	location.href = "/member/pis/sir/";
    }
    else if(data.status == "success-serial")
    {    
        toastr.success("Success");
        $(data.target).html(data.view);
        
        prompt_confirm();
    }
    else if(data.status == "success-adding-serial")
    {    	
        toastr.success("Success");
        $('#global_modal').modal('toggle');
        $('.multiple_global_modal').modal('hide');
    }
    else if(data.status == "confirmed-serial")
    {
        prompt_serial_number();
    }
    else if(data.status == "success-ilr")
    {    	
        toastr.success("Success");
        $(".ilr-container").load("/member/pis/ilr/"+data.id+" .ilr-container");
        $('#global_modal').modal('toggle');
    }
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
    }

}
function submit_done(data)
{
    if(data.type == "truck")
    {        
        toastr.success("Success");
        $(".select-truck").load("/member/pis/sir/create .select-truck option", function()
        {                
             $(".select-truck").globalDropList("reload"); 
             $(".select-truck").val(data.id).change();              
        });
        $('#global_modal').modal('toggle');
        $('.multiple_global_modal').modal('hide');  
    }
    else if(data.status == "success-lof")
    {
        toastr.success("Success");
        var url = '/member/pis/sir/view_pdf/'+data.sir_id+'/lof';
        console.log(url);
        location.href = url;	
		// action_load_link_to_modal('/member/pis/sir/view/'+data.sir_id+'/lof','lg');
    	// location.href = "/member/pis/lof";
    }
    else if(data.status == "success-reload-sir")
    {
        toastr.success("Success");
        location.href = "/member/pis/sir";    	
    }
    else if(data.status == "success")
    {
        toastr.success("Success");
        location.reload();
    }
    else if(data.status == "success-serial")
    {    
        toastr.success("Success");
        $(data.target).html(data.view);
        
        prompt_confirm();
    }
    else if(data.status == "success-adding-serial")
    {    	
        toastr.success("Success");
        $('#global_modal').modal('toggle');
        $('.multiple_global_modal').modal('hide');
    }
    else if(data.status == "confirmed-serial")
    {
        prompt_serial_number();
    }
    else if(data.status == "success-ilr")
    {    	
        toastr.success("Success");
        $(".ilr-container").load("/member/pis/ilr/"+data.id+" .ilr-container");
        $('#global_modal').modal('toggle');
    }
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
    }
}
function submit_done_customer(result)
{
	sir.action_reload_customer(result['customer_info']['customer_id']);
}

function submit_done_item(result)
{

}