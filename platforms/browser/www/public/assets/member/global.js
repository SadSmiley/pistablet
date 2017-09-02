var global = new global();
var modal_count = 0;

function global()
{
    init();
    //var a = add_event_global_popup();
    function init()
    {
        $(document).ready(function()
        {
            document_ready();
        });
    }
    
    function document_ready()
    {
        add_event_global_popup();
        add_event_global_submit();
        add_event_global_onclose_popup();
        add_event_overlay_fix();
        select_current_warehouse();
        add_event_global_submit_for_page();

        action_global_search();
        action_money_format();
        action_int_format();
        action_float_format();

        $('[data-toggle="tooltip"]').tooltip({container: 'body'}); 
    }
    function add_event_global_popup()
    {
        $(document).on("click",".popup", function(e)
        {
            var load_link = $(e.currentTarget).attr("link");
            
            if($(e.currentTarget).attr("size"))
            {
                var size = $(e.currentTarget).attr("size");
            }
            else
            {
                var size = "";
            }
            action_load_link_to_modal(load_link, size);
        });
    }
    function add_event_global_submit()
    {
        $(document).on("submit", ".global-submit", function(e)
        {
            var data = $(e.currentTarget).serialize();
            var link = $(e.currentTarget).attr("action");
            var modal = $(e.currentTarget).closest('.modal');
            
            action_global_submit(link, data, modal);
            e.preventDefault();
        })
    }
    function action_global_submit(link, data, modal)
    {
        $(".modal-loader").removeClass("hidden");
        $.ajax({
            url:link,
            dataType:"json",
            data:data,
            type:"post",
            success: function(data)
            {

                data.element = modal;

				if(data.response_status == "error")
				{
					$(".modal-loader").addClass("hidden");
				// 	$(".modal-title").text(data.title);
				// 	$(".modal-body").html(data.message);
				// 	$('#myModal').modal('show');
				    toastr.error(data.message);
				}
				else
				{
                    console.log("global js");
				    $(".modal-loader").addClass("hidden");
                    
                    if(data.type == 'item')
                    {
                        if(typeof submit_done_item == 'function')
                        {
                            submit_done_item(data);
                        }
                    }
                    else
                    {
                        if(typeof submit_done == 'function')
                        {
                            submit_done(data);
                        }
                    }
				}
            },
            error: function(x,t,m)
            {
                // console.log(x + ' ' + t +' ' + m); 
                if(t==="timeout") {
                    toastr.warning(m);
                    setTimeout(function()
                    {
                        action_global_submit(link, data, modal);
                    }, 2000);
                } 
                else {
                    $(".modal-loader").addClass("hidden");
                    toastr.error(m + '. Please Contact The Administrator.');
                }
                
            }
        })
    }

    //start arcy
    function add_event_global_submit_for_page()
    {
        $(document).on("submit", ".global-submit-page", function(e)
        {
            var data = $(e.currentTarget).serialize();
            var link = $(e.currentTarget).attr("action");
            
            action_global_submit_for_page(link, data);
            e.preventDefault();
        })
    }
    function action_global_submit_for_page(link, data)
    {
        $(".modal-loader").removeClass("hidden");
        
        $.ajax({
            url:link,
            dataType:"json",
            data:data,
            type:"post",
            success: function(data)
            {
                if(data.response_status == "error")
                {
                    $(".modal-loader").addClass("hidden");
                //  $(".modal-title").text(data.title);
                //  $(".modal-body").html(data.message);
                //  $('#myModal').modal('show');
                    toastr.error(data.message);
                }
                else
                {
                    $(".modal-loader").addClass("hidden");
                    if (typeof submit_done_for_page == 'function')
                    {
                        submit_done_for_page(data);
                    }
                }
            },
            error: function()
            {
                // setTimeout(function()
                // {
                //     submit_done_for_page(link, data);
                // }, 2000);
            }
        })
    }
    //end arcy


    function action_global_search() // Bryan Kier
    {
        $(document).on("change", ".global-search", function(e)
        {
            e.preventDefault();
            var url     = $(this).attr("url");
            var value   = $(this).val().replace(/ /g, "%20");
            $load_content =  $(".tab-pane.active").find(".load-data").attr("target");

            $(".tab-pane.active .load-data").load(url+"?search="+value+" #"+$load_content);
        })
    }

    function action_money_format() // Bryan Kier
    {
        $(document).on("change",".money-format", function()
        {
            $(this).val(formatMoney($(this).val()));
        });
    }

    function action_float_format() // Bryan Kier
    {
        $(document).on("change",".float-format", function()
        {
            $(this).val(formatFloat($(this).val()));
        });
    }


    function action_int_format() // Bryan Kier
    {
        $(document).on("change",".int-format", function()
        {
            $(this).val(formatInt($(this).val()));
        });
    }

    function formatFloat($this) // Bryan Kier
    {
        return Number($this.toString().replace(/[^0-9\.]+/g,""));
    }

    function formatInt($this)
    {
        if (/^\d+$/.test($this)) 
        {
            return $this;
        } 
        else 
        {
            return '';
        }
    }

    function formatMoney($this) // Bryan Kier
    {
        if($this != '')
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
}

function error_popup(title, message)
{
    $(".modal-title").text(title);
	$(".modal-body").html(message);
	$('#myModal').modal('show');
}

function action_load_main_modal(url, size)
{
    $("#global_modal").modal('show');
    $("#global_modal").find(".modal-content").html('');
    $("#global_modal").find(".modal-dialog").removeClass("modal-lg");
    $("#global_modal").find(".modal-dialog").removeClass("modal-sm");
    $("#global_modal").find(".modal-dialog").addClass("modal-" + size);
    $("#global_modal").find(".modal-content").append('<div style="margin: 100px auto;" class="loader-16-gray"></div>')
    $("#global_modal").find(".modal-content").load(url, function(response, status, xhr)
    {
        if(status == "error")
        {
            setTimeout(function()
            {
               // action_load_link_to_modal(url, size);
               action_load_main_modal(url, size);
            }, 2000)
        }
        else
        {
            if (typeof loading_done == 'function')
            {
                loading_done(url);
            }
        }
    });
}

function action_load_multiple_modal(url, size)
{
    modal_count += 1;

    var append = '<div count="'+modal_count+'" class="modal fade multiple_global_modal" role="dialog">'+
                    '<div class="modal-dialog">'+
                        '<div class="modal-content">'+
                        '</div>'+
                    '</div>'+
                 '</div>';

    $('.multiple_global_modal_container').append(append);

    add_event_global_onclose_popup();

    action_load_after_multiple_modal(url, size);
}

function action_load_after_multiple_modal(url, size)
{
    $('.multiple_global_modal[count="'+modal_count+'"]').modal('show');
    $('.multiple_global_modal[count="'+modal_count+'"]').find(".modal-content").html('');
    $('.multiple_global_modal[count="'+modal_count+'"]').find(".modal-dialog").removeClass("modal-lg");
    $('.multiple_global_modal[count="'+modal_count+'"]').find(".modal-dialog").removeClass("modal-sm");
    $('.multiple_global_modal[count="'+modal_count+'"]').find(".modal-dialog").addClass("modal-" + size);
    $('.multiple_global_modal[count="'+modal_count+'"]').find(".modal-content").append('<div style="margin: 100px auto;" class="loader-16-gray"></div>')
    $('.multiple_global_modal[count="'+modal_count+'"]').find(".modal-content").load(url, function(response, status, xhr)
    {
        if(status == "error")
        {
            setTimeout(function()
            {
                 // action_load_link_to_modal(url, size);
                 action_load_after_multiple_modal(url, size);
            }, 2000)
        }
        else
        {
            if (typeof loading_done == 'function')
            {
                loading_done(url);
            }
        }
    });
}

function action_load_link_to_modal(url, size)
{
    if (isEmpty($('#global_modal').find(".modal-content")))
    {
        action_load_main_modal(url, size);
    }
    else
    {
        action_load_multiple_modal(url, size);
    }
}

function add_event_global_onclose_popup()
{
    $('#global_modal').on('hidden.bs.modal', function (e) 
    {
        action_global_onclose_popup(e.currentTarget);
    });

    $('.multiple_global_modal').on('hidden.bs.modal', function (e) 
    {
        $(e.currentTarget).remove();
    });
}

function action_global_onclose_popup(modal)
{
    $(modal).find(".modal-content").html('');
}

function add_event_overlay_fix()
{
    $(document).on('show.bs.modal', '.modal', function () 
    {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
}

function select_current_warehouse()
{
    $(".warehouse_loader_container").on("change",".select_current_warehouse",function()
    {
        $.ajax({
            url:"/member/change_warehouse",
            dataType:"json",
            data: {_token: $(".token").val(), change_warehouse: $(this).val()},
            type:"post",
            success: function(data)
            {
                if(data.response == "success")
                {
                    // $('.select_current_warehouse').load(document.URL +  ' .select_current_warehouse');
                    $('.warehouse-access-name').load(document.URL +  ' .warehouse-access-name');
                }
            },
            error: function()
            {

            }
        })
    });
}

// Other Functions
function isEmpty( el )
{
    return !$.trim(el.html())
}