
var vendor_tag = new vendor_tag();
var global_tr_html = $(".div-script tbody").html();
var item_selected = ''; 

function vendor_tag(){
    init();

    function init()
    {
        iniatilize_select();

        event_remove_tr();
        // event_accept_number_only();
        // event_compute_class_change();
        // event_taxable_check_change();
        // event_item_qty_change();
        
        action_lastclick_row();
        // action_compute();
        // action_convert_number();
        // action_date_picker();
        action_reassign_number();
        // event_button_action_click();
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

    function action_lastclick_row()
    {
        $(document).on("click", "tbody.draggable tr:last td:not(.remove-tr)", function(){
            action_lastclick_row_op();
        });
    }

    
    function action_lastclick_row_op()
    {
        console.log(1);
        $("tbody.draggable").append(global_tr_html);
        action_reassign_number();
        action_trigger_select_plugin();
    }
    function action_reassign_number()
    {
        var num = 1;
        $(".invoice-number-td").each(function(){
            $(this).html(num);
            num++;
        });
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
    }

    /* Make select input into a drop down list plugin */
    function iniatilize_select()
    {
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
    }


    function action_load_item_info($this)
    {
        $parent = $this.closest(".tr-draggable");
        $parent.find(".txt-desc").html($this.find("option:selected").attr("sales-info")).change();
        $parent.find(".txt-sku").html($this.find("option:selected").attr("item-sku")).change();
    }


}   

/* AFTER ADDING AN  ITEM */
function submit_done_item(data)
{
    toastr.success("Success");
    $(".tbody-item .select-item").load("/member/item/load_item_category", function()
    {                
         $(".tbody-item .select-item").globalDropList("reload");
         item_selected.val(data.id).change();          
    });
    data.element.modal("hide");
}
