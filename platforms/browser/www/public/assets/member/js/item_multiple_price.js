var item_multiple_price = new item_multiple_price();
var global_tr_price_html = $(".div-script table.div-script-row-price tbody").html();
var last_price_change = null;

function item_multiple_price()
{
	init();

	function init()
    {
        event_remove_tr();
        event_add_tr();
        event_item_qty_change();
        event_item_price_change();
        event_item_price_total_change();

        $(".tbody-item-price .item-price-value").change();
    }

    function event_remove_tr()
    {
        $(document).on("click", ".remove-tr-price", function(e){
            if($(".tbody-item-price .remove-tr-price").length > 1){
                $(this).parent().remove();
            }           
        });
    }

    function event_add_tr()
    {
        $(document).on("click", ".add-tr-price ", function(e){
            $("tbody.tbody-item-price").append(global_tr_price_html);
        });
    }

    function event_item_qty_change()
    {
        $(document).on("change", ".tbody-item-price .item-price-qty", function()
        {
            $tr_container = $(this).closest(".tr-item-price");
            if(last_price_change == ".item-price-value")      action_item_price($tr_container.find(last_price_change));
            else if(last_price_change == ".item-price-total")  action_item_price_total($tr_container.find(last_price_change));
        })
    }

    function event_item_price_change()
    {
        $(document).on("change", ".tbody-item-price .item-price-value", function()
        {
            action_item_price($(this));
        })

        $(document).on("keyup", ".tbody-item-price .item-price-value", function()
        {
            last_price_change = ".item-price-value";
        })
    }

    function action_item_price($this)
    {
        val = $this.val();
        $this.val(formatMoney(val));

        $tr_container = $this.closest(".tr-item-price");

        qty_val     = $tr_container.find(".item-price-qty").val();
        price_total = $tr_container.find(".item-price-total");
        if(qty_val > 0)  price_total.val(formatMoney( val * qty_val));
        else             price_total.val("0.00");
    }

    function event_item_price_total_change()
    {
        $(document).on("change", ".tbody-item-price .item-price-total", function()
        {
            action_item_price_total($(this));
        })

        $(document).on("keyup", ".tbody-item-price .item-price-total", function()
        {
            last_price_change = ".item-price-total";
        })
    }

    function action_item_price_total($this)
    {
        val = $this.val();
        $this.val(formatMoney(val));

        $tr_container = $this.closest(".tr-item-price");

        qty_val     = $tr_container.find(".item-price-qty").val();
        price_value = $tr_container.find(".item-price-value");
        if(qty_val > 0)  price_value.val(formatMoney( val / qty_val));
        else             price_total.val("0.00");
    }

    function formatFloat($this)
    {
        return Number($this.toString().replace(/[^0-9\.]+/g,""));
    }

    function formatMoney($this)
    {
        var n = formatFloat($this), 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    }
}