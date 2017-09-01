
var transfer_warehouse = new transfer_warehouse();
var global_tr_html = $(".div-script tbody").html();
var item_selected = ''; 

function transfer_warehouse(){
    init();

    function init()
    {
        iniatilize_select();
        draggable_row.dragtable();

        event_remove_tr();
        // event_accept_number_only();
        event_compute_class_change();
        // event_taxable_check_change();
        
        action_lastclick_row();
        // action_compute();
        action_convert_number();
        action_date_picker();
        action_reassign_number();
        event_button_action_click();
    }

    function event_remove_tr()
    {
        $(document).on("click", ".remove-tr", function(e){
            if($(".tbody-item .remove-tr").length > 1){
                $(this).parent().remove();
                action_reassign_number();
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
    function action_date_picker()
    {
        $(".draggable .for-datepicker").datepicker({ dateFormat: 'mm-dd-yy', });
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
        var subtotal = 0;
        var total_taxable = 0;

        $(".tr-draggable").each(function()
        {
            /* GET ALL DATA */
            var qty     = $(this).find(".txt-qty").val();
            var rate    = $(this).find(".txt-rate").val();
            var discount= $(this).find(".txt-discount").val();
            var amount  = $(this).find(".txt-amount");
            var taxable = $(this).find(".taxable-check");
            
            /* CHECK IF QUANTITY IS EMPTY */
            if(qty == "" || qty == null)
            {
                qty = 1;
            }

            /* CHECK THE DISCOUNT */
            if(discount.indexOf('%') >= 0)
            {
                $(this).find(".txt-discount").val(discount.substring(0, discount.indexOf("%") + 1));
                discount = (parseFloat(discount.substring(0, discount.indexOf('%'))) / 100) * (action_return_to_number(rate) * action_return_to_number(qty));
            }
            else if(discount == "" || discount == null)
            {
                discount = 0;
            }
            else
            {
                discount = parseFloat(discount);
            }

            /* RETURN TO NUMBER IF THERE IS COMMA */
            qty         = action_return_to_number(qty);
            rate        = action_return_to_number(rate);
            discount    = action_return_to_number(discount);

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
        var ewt_value           = $(".ewt-value").val();

        ewt_value = parseFloat(ewt_value) * subtotal;

        /* action_compute DISCOUNT */
        var discount_selection  = $(".discount_selection").val();
        var discount_txt        = $(".discount_txt").val();
        var tax_selection       = $(".tax_selection").val();
        var taxable_discount    = 0;

        if(discount_txt == "" || discount_txt == null)
        {
            discount_txt = 0;
        }

        discount_total = discount_txt;

        if(discount_selection == 'percent')
        {
            discount_total = subtotal * (discount_txt / 100);
            taxable_discount = total_taxable * (discount_txt / 100);
        }

        discount_total = parseFloat(discount_total);

        /* action_compute TOTAL */
        var total = 0;
        total     = subtotal - discount_total - ewt_value;

        /* action_compute TAX */
        var tax   = 0;
        if(tax_selection == 1){
            tax = total_taxable * (12 / 100);
        }
        total += tax;

        /* action payment applied */
        var payment_applied     = parseFloat($(".payment-applied").html());
        console.log(total + "|" + payment_applied);
        var balance_due         = total - payment_applied;

        $(".sub-total").html(action_add_comma(subtotal.toFixed(2)));
        $(".subtotal-amount-input").val(action_add_comma(subtotal.toFixed(2)));

        $(".ewt-total").html(action_add_comma(ewt_value.toFixed(2)));
        $(".discount-total").html(action_add_comma(discount_total.toFixed(2)));
        $(".tax-total").html(action_add_comma(tax.toFixed(2)));

        $(".total-amount").html(action_add_comma(total.toFixed(2)));
        $(".total-amount-input").val(total.toFixed(2));

        $(".balance-due").html(action_add_comma(balance_due.toFixed(2)));

    }

    function action_convert_number()
    {
        $(".payment-applied").html(action_add_comma(parseFloat($(".payment-applied").html()).toFixed(2)));
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
            width : "100%",
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
            width : "100%",
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
        $parent.find(".product_sku").html($this.find("option:selected").attr("product-sku")).change();
        $parent.find(".product_source_qty").html($this.find("option:selected").attr("source-qty")).change();
        $parent.find(".product_current_qty").html($this.find("option:selected").attr("show-current-qty")).change();
        // $parent.find(".input-qty").attr("name","quantity["+$this.find("option:selected").attr("product-id")+"]");

        if($this.find("option:selected").attr("current-qty") <= $this.find("option:selected").attr("reorder-point"))
        {
            $parent.find(".product_current_qty").addClass("red-color");            
        }
    }

    function action_load_unit_measurement($this)
    {
        $parent = $this.closest(".tr-draggable");
        $item   = $this.closest(".tr-draggable").find(".select-item");

        $um_qty = parseFloat($this.find("option:selected").attr("qty") || 1);
        $sales  = parseFloat($item.find("option:selected").attr("price"));
        $qty    = parseFloat($parent.find(".txt-qty").val());

        $parent.find(".txt-rate").val( $um_qty * $sales * $qty ).change();
    }

    function event_button_action_click()
    {
        $(document).on("click","button[type='submit']", function()
        {
            $(".button-action").val($(this).attr("data-action"));
        })
    }

}   


/* AFTER DRAGGING A TABLE ROW */
function dragging_done()
{
    transfer_warehouse.action_reassign_number();
}

// function submit_done(data)
// {
//     if(data.status == "success")
//     {
//         toastr.success("Success");
//         $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
//         $(data.target).html(data.view);
//         data.element.modal("hide");
//     }
//     else if(data.status == "error")
//     {
//         toastr.warning(data.status_message);
//         $(data.target).html(data.view);
//     }
//     else if(data.status == "success-serial")
//     {
//         toastr.success("Success");
//         $(data.target).html(data.view);
        
//         prompt_confirm();
//     }
//     else if(data.status == "success-adding-serial")
//     {
//         toastr.success("Success");
//         $(data.target).html(data.view);
//         $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
//         data.element.modal("hide");
//     }
//     else if(data.status == "confirmed-serial")
//     {
//         prompt_serial_number();
//     }
//     else if(data.status == "Sucess-archived")
//     {
//         toastr.success("Successfully archived");
//         $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
//         $(data.target).html(data.view);
//         data.element.modal("hide");       
//     }
//     else if(data.status == "Sucess-restore")
//     {
//         toastr.success("Successfully Restore");
//         $(".warehouse-container").load("/member/item/warehouse .warehouse-container");
//         $("#all-list").addClass("active");
//         $("#archived-list").removeClass("active");
//         $(data.target).html(data.view);
//         data.element.modal("hide");     
//     }
//     else
//     {
//         $(data.error).each(function( index )
//         {
//           toastr.warning(data.error[index]);
//         });
//     }
// }
function submit_done_for_page(data)
{
    if(data.status == "transfer_success")
    {
        location.href = "/member/item/warehouse"; 
        toastr.success("Successfully transfer");
        $(data.target).html(data.view);    
    }
    else if(data.status == "success")
    {
        toastr.success("Success");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $(data.target).html(data.view);
        data.element.modal("hide");
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
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        // $('#global_modal').modal('toggle');
        // $('.multiple_global_modal').modal('hide');

        data.element.modal("hide");
    }
    else if(data.status == "confirmed-serial")
    {
        prompt_serial_number();
    }
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
        $(data.target).html(data.view);
    }
    else
    {
        $(data.error).each(function( index )
        {
          toastr.warning(data.error[index]);
        });
    }
}