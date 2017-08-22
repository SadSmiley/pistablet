var sales_receipt = new sales_receipt();

function sales_receipt(){
	init();

	function init(){
		action_lastclick_row();
		event_remove_tr();
		event_accept_number_only();
		sub_action_compute();
	}

	function event_remove_tr()
	{
		$(".remove-tr").unbind("click");
		$(".remove-tr").bind("click", function(){
			if($(".remove-tr").length > 2){
				$(this).parent().parent().remove();
				action_lastclick_row();
				action_reassign_number();
				action_compute();
			}			
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
			    	console.log(value);
			    	value = parseFloat(value);
			    	console.log(value);
			    	ret = action_add_comma(value).toLocaleString();
			    	console.log(ret);
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

	function action_compute()
	{
		var subtotal = 0;
		$(".tr-draggable").each(function()
		{
			/* GET ALL DATA */
			var qty = $(this).find(".txt-qty").val();
			var rate = $(this).find(".txt-rate").val();
			var amount = $(this).find(".txt-amount");
			var taxable = $(this).find(".taxable-check");
			var total_taxable = 0;

			/* CHECK IF QUANTITY IS EMPTY */
			if(qty == "" || qty == null)
			{
				qty = 1;
			}


			/* RETURN TO NUMBER IF THERE IS COMMA */
			qty = action_return_to_number(qty);
			rate = action_return_to_number(rate);
			var total_per_tr = (qty * rate).toFixed(2);


			/* action_compute SUB TOTAL PER LINE */
			subtotal += parseFloat(total_per_tr);

			
			/*CHECK IF TAXABLE*/	
			if(taxable.is(':checked'))
			{
				total_taxable += parseFloat(total_per_tr);
			}



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
				amount.val(action_add_comma(sub));
			}
			else //IF QUANTITY, RATE IS [EMPTY]
			{

				amount.val(action_add_comma(total_per_tr));
			}
			
		});
		

		/* action_compute DISCOUNT */
		var discount_selection = $(".discount_selection").val();
		var discount_txt = $(".discount_txt").val();
		var tax_selection = $(".tax_selection").val();
		var taxable_discount = 0;

		if(discount_txt == "" || discount_txt == null)
		{
			discount_txt = 0;
		}

		discount_txt = parseFloat(discount_txt);
		var discount_total = discount_txt;

		if(discount_selection == 0)
		{
			discount_total = subtotal * (discount_txt / 100);
			taxable_discount = total_taxable * (discount_txt / 100);
		}

		var total = 0;
		total = subtotal - discount_total;
		var tax = 0;
		if(tax_selection == 1){
			tax = total * (12 / 100);
		}
		total += tax;

		$(".sub-total").html(action_add_comma(subtotal.toFixed(2)));
		$(".discount-total").html(action_add_comma(discount_total.toFixed(2)));
		$(".tax-total").html(action_add_comma(tax.toFixed(2)));
		$(".total-amount").html(action_add_comma(total.toFixed(2)));

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

	function sub_action_compute(){
		$(".sub-action_compute").unbind("change");
		$(".sub-action_compute").bind("change", function(){
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
	function date_picker(){
		$( ".datepicker" ).datepicker();
	}

	this.action_lastclick_row = function()
	{
		action_lastclick_row();
	}

	function action_lastclick_row()
	{
		$("tbody.draggable tr:last").unbind("click");
		$("tbody.draggable tr:last").bind("click", function(){
			$("tbody.draggable tr:last").unbind("click");
			action_lastclick_row_op();
		});
		$("tbody.draggable tr:last").unbind("focus");
		$("tbody.draggable tr:last").bind("focus", function(){
			$("tbody.draggable tr:last").unbind("focus");
			action_lastclick_row_op();
		});
	}

	function action_lastclick_row_op()
	{
		$("tbody.draggable").append(action_add_row_html());
		action_lastclick_row();
		draggable_row.dragtable();
		textExpand();
		event_remove_tr();
		action_reassign_number();
		date_picker();
		event_accept_number_only();
	}


	/* ADDING EXTRA ROW FIELD UPON CLICK IN THE LAST ROW */

	function action_add_row_html()
	{
		var number = $(".invoice-number-td").last().html();
		number = parseInt(number);
		number++;
		var html = '<tr class="tr-draggable">';
        html += '<td class="text-center cursor-move move" ><i class="fa fa-th-large colo-mid-dark-gray"></i></td>';
        html += '<td class="border-left-none"><input type="text" class="datepicker"  name="date[]"/></td>';
        html += '<td class="invoice-number-td text-right"></td>';
        html += '<td><input type="text" name="product_service[]"/></td>';
        html += '<td><textarea class="textarea-expand" name="description[]"></textarea></td>';
        html += '<td><input class="text-center number-input txt-qty" type="text" name="qty[]"/></td>';
        html += '<td><input class="text-right number-input txt-rate" type="text" name="rate[]"/></td>';
        html += '<td><input class="text-right number-input txt-amount" type="text" name="amount[]"/></td>';
        html += '</tr>';
        return html;

	}

}	
/* AFTER ADDING AN  ITEM */
function submit_done_item(data)
{
	toastr.success("Success");
    $(".tbody-item .select-item").load("/member/item/load_item_category", function()
    {                
         $(".tbody-item .select-item").globalDropList("reload"); 
         item_selected.val(data.item_id).change();  
    });
    data.element.modal("hide");
}

/*AFTER DRAGGING A TABLE ROW*/

function dragging_done()
{
	customer_invoice.action_reassign_number();
	customer_invoice.action_lastclick_row();
}