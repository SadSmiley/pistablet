var warehouse = new warehouse();
var global_tr_html = '<tr class="tr-draggable">' + $(".div-script .div-item-row-script .tr-draggable").html() + '</tr>';

var trasnfer_option = "";
var id = "";
var cat_id = "";
var item_selected = "";
function warehouse() 
{
    init();
    
    function init()
    {
        // select_item();
        action_lastclick_row();
        // chosen_select();
        ajax_load_item();
        event_remove_tr();
        event_accept_number_only();
        // select_transfer();
        select_filter_item();
        refill_on_change();
        on_search_warehouse();
        load_mydropdown_list_warehouse();
        load_mydropdown_list_item();
        load_warehouse_list(id);
    }
    function load_mydropdown_list_item()
    {
        $(".select-item").globalDropList(
        { 
          addNewName              : "Add New",
          addNewChange            : "Add",
          addNewIcon              : "fa fa-plus",
          hasPopup                : "true",
          width                   : "100%",
          link                    : "/member/item/add",
          link_size               : "lg",
          placeholder             : "Search....",
          no_result_message       : "No result found!",
          onChangeValue : function()
            {
              var sku = $(this).attr("select_id");
              var item_id = $(this).val();
              select_item(sku, item_id);     
            }
        });
    }
    function action_trigger_chosen_plugin()
    {
        $(".draggable .tr-draggable:last td select").globalDropList(
        {
            link : "/member/item/add",
            width : "100%",
            onChangeValue : function()
            {
              var sku = $(this).attr("select_id");
              var item_id = $(this).val();
              select_item(sku, item_id);     
            }
        });
    }
    function select_item(sku, item_id)
    {
            console.log(sku+" "+item_id);

            $.ajax({
                url: "/member/item/warehouse/select_item",
                type: "get",
                data: {item_id:item_id},
                success: function(data)
                {
                    var item = $.parseJSON(data);
                    $(".sku-txt"+sku).html(item.item_sku);
                    $(".render-point-txt"+sku).attr("name","reoder_point["+item.item_id+"]");
                    $(".qty-txt"+sku).attr("name","quantity["+item.item_id+"]");
                    // alert(item.has_serial_number);
                    if(item.has_serial_number == 1)
                    {
                        $(".serial-chk"+sku).prop("checked",true);
                    }
                    // prompt_serial_number(item_id);
                }
            });
        // $("body").on("change", ".select-item", function(event)
        // {
            
        // });
    }
    function load_mydropdown_list_warehouse()
    {
        // $("#transfer_from").globalDropList("destroy");
        $("#transfer_from").globalDropList(
        { 
          addNewName              : "Add New",
          addNewChange            : "Add",
          addNewIcon              : "fa fa-plus",
          hasPopup                : "true",
          width                   : "100%",
          link                    : "/member/item/warehouse/add",
          link_size               : "lg",
          placeholder             : "Select warehouse...",
          no_result_message       : "No result found!",
              onChangeValue : function()
                {
                    id = $(this).val();
                    load_warehouse_list(id);
                    // $("#transfer_to").html(trasnfer_option);                
                }
        });
        $("#transfer_to").globalDropList(
            {
                width     :  "100%",
                placeholder : "Select warehouse...",
            });
    }
    function select_filter_item()
    {
        $(".filter-item").change(function()
        {
            cat_id = $(this).val();
        });
    }
    function load_warehouse_item()
    { 
        $.ajax({
            url: "/member/item/warehouse/load_item",
            type: "get",
            data: {cat_id:cat_id},
            success: function(data)
            {

            }
        });
    }
    function refill_on_change()
    {
        $(".filter-item").change(function()
        {
           var warehouse_id = $('.warehouse-id').val();
           var cat_id = $('.filter-item').val();
           var search_name = $('.search-item').val();
           $(".warehouse-refill-container").load("/member/item/warehouse/refill?warehouse_id="+warehouse_id+"&search_txt="+search_name+"&cat_id="+cat_id+" .warehouse-refill-container");
        }); 
    }
    function select_transfer()
    {
        // $("#transfer_from").globalDropList(
        // { 
        //     onChange : function()
        //     {
        //         id = $("#transfer_from").val();
        //         load_warehouse_list(id);
        //         $("#transfer_to").html(trasnfer_option);                
        //     }

        // });
        // $("#transfer_to").change(function(e_to)
        // {
        //     id = $(this).val();
        //     load_warehouse_list(id);  
        //     $("#transfer_from").html(trasnfer_option);          
        // });
    }
    function load_warehouse_list(id)
    {
        var option = "";
        $.ajax({
            url: "/member/item/warehouse/load_warehouse",
            type: "get",
            data: {id:id},
            success: function(data)
            {
                var warehouse_list = $.parseJSON(data);
                var option = "";
                // console.log(warehouse_list);
                 $(warehouse_list).each(function (a, b)
                 {
                    var v = [];
                    var n = 0;
                    $.each(b, function (c, d)
                    {
                        v[n] = d;
                        n++;
                    });
                    option += "<option value='"+b.warehouse_id+"'>"+b.warehouse_name+"</option>";
                });
                trasnfer_option = option;
                // console.log(option);
                $(".transfer_to").html(option);
                $(".transfer_to").globalDropList("reload");
                // $(".transfer_to").trigger("chosen:updated"); 
                // console.log(trasnfer_option);
            }
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
    function ajax_load_item()
    {
        $.ajax({
            url: "/member/warehouse/load_item",
            type: "get",
            data: {},
            success: function(data)
            {
                // console.log(data);
                var list_item = $.parseJSON(data);
                var option = "<option>Select Item</option>";
                 $(list_item).each(function (a, b){
                    var v = [];
                    var n = 0;
                    $.each(b, function (c, d){
                        v[n] = d;
                        n++;
                    });
                    option += "<option value='"+v[0]+"'>"+v[1]+"</option>";
                });
                 load_mydropdown_list_warehouse();
                $(".select-item").html(option);
                // $(".select-item").trigger("chosen:updated"); 
            }
        });
    }

    function on_search_warehouse()
    {
        $(".srch-warehouse-txt").keyup(function()
        {
            var srch_txt = $(this).val();
            $(".warehouse-container").load("/member/item/warehouse?search_txt="+srch_txt+" .warehouse-container"); 
        });
    }
    function action_reassign_number()
    {
        var num = 1;
        $(".invoice-number-td").each(function(){
            $(this).html(num);
            // $("select").attr("id",num);
            num++;
        });

        var num2 = 1;
        $(".count-select").each(function(){
            // $(this).html(num2);
            $(this).attr("select_id",num2);
            num2++;
        });

        var num3 = 1;
        $(".sku-txt").each(function(){
            // $(this).html(num2);
            $(this).addClass("sku-txt" + num3);
            num3++;
        });

        var num4 = 1;
        $(".render-point-txt").each(function(){
            // $(this).html(num2);
            $(this).addClass("render-point-txt" + num4);
            num4++;
        });

        var num5 = 1;
        $(".qty-txt").each(function(){
            // $(this).html(num2);
            $(this).addClass("qty-txt" + num5);
            num5++;
        });

        var num6 = 1;
        $(".count_row").each(function(){
            // $(this).html(num2);
            // $(this).addClass("qty-txt" + num5);
            num6++;
        });

        var num7 = 1;
        $(".serial-chk").each(function(){
            // $(this).html(num2);
            $(this).addClass("serial-chk" + num7);
            num7++;
        });
        // console.log(num6);
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
    function action_lastclick_row_op()
    {
        $("tbody.draggable").append(global_tr_html);
        // date_picker();
        
        action_lastclick_row();

        // draggable_row.dragtable();
        // textExpand();
        event_remove_tr();
        action_reassign_number();
        action_trigger_chosen_plugin();
        // chosen_select();
        ajax_load_item();
        event_accept_number_only();
        // event_taxable_check_change();
        // sub_action_compute();
        // $(".chosen-select.chosen-customer").val(13).change().trigger("chosen:updated");
        // ajax_load_item();
        // select_item();
        
    }
    function chosen_select()
    {
        $(".chosen-select").chosen({no_results_text: "The customer doesn't exist."});
    }
    // function action_trigger_chosen_plugin()
    // {
    //     $(".draggable .tr-draggable:last td select").chosen({no_results_text: "The customer doesn't exist."});
    // }

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

    function action_return_to_number(number = '')
    {
        number += '';
        number = number.replace(/,/g, "");
        if(number == "" || number == null || isNaN(number)){
            number = 0;
        }
        
        return parseFloat(number);
    
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
            // action_compute();
        });
    }
}
function submit_done(data)
{
    if(data.status == "success")
    {
        toastr.success("Success");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $('#global_modal').modal('toggle');
        data.element.modal("hide");
    }
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
    }
    else if(data.status == "success-serial")
    {
        toastr.success("Success");
        
        prompt_confirm();
    }
    else if(data.status == "success-adding-serial")
    {
        toastr.success("Success");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $(".inventory-log-container").load("/member/item/inventory_log .inventory-log-container"); 
        $('#global_modal').modal('toggle');
        $('.multiple_global_modal').modal('hide');
        data.element.modal("hide");
    }
    else if(data.status == "confirmed-serial")
    {
        prompt_serial_number();
    }
    else if(data.status == "Sucess-archived")
    {
        toastr.success("Successfully archived");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $(data.target).html(data.view);
        $('#global_modal').modal('toggle');        
    }
    else if(data.status == "Sucess-restore")
    {
        toastr.success("Successfully Restore");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container");
        $("#all-list").addClass("active");
        $("#archived-list").removeClass("active");
        $(data.target).html(data.view);
        $('#global_modal').modal('toggle');        
    }
    else
    {
        $(data.error).each(function( index )
        {
          toastr.warning(data.error[index]);
        });
    }
}
function submit_done_item(data)
{
    if(data.status == "success")
    {
        toastr.success("Success");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $('#global_modal').modal('toggle');
        data.element.modal("hide");
    }
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
    }
    else if(data.status == "success-serial")
    {
        toastr.success("Success");
        
        prompt_confirm();
    }
    else if(data.status == "success-adding-serial")
    {
        toastr.success("Success");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $(".inventory-log-container").load("/member/item/inventory_log .inventory-log-container"); 
        $('#global_modal').modal('toggle');
        $('.multiple_global_modal').modal('hide');
        data.element.modal("hide");
    }
    else if(data.status == "confirmed-serial")
    {
        prompt_serial_number();
    }
    else if(data.status == "Sucess-archived")
    {
        toastr.success("Successfully archived");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container"); 
        $(data.target).html(data.view);
        $('#global_modal').modal('toggle');        
    }
    else if(data.status == "Sucess-restore")
    {
        toastr.success("Successfully Restore");
        $(".warehouse-container").load("/member/item/warehouse .warehouse-container");
        $("#all-list").addClass("active");
        $("#archived-list").removeClass("active");
        $(data.target).html(data.view);
        $('#global_modal').modal('toggle');        
    }
    else
    {
        $(data.error).each(function( index )
        {
          toastr.warning(data.error[index]);
        });
    }
}