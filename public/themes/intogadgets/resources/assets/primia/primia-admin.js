var image_domain = (image_server ? image_server : "http://primiaworks.local/") ;
var primia_admin = new primia_admin();
var target_image;
var target_input;

function primia_admin()
{
    init();
    
    this.call_add_event_call_primia_gallery = function()
    {
        add_event_call_primia_gallery();
    }

    function init()
    {
        $(document).ready(function()
        {
            document_ready();    
        });
    }
    

    function document_ready()
    {
        create_file_upload_popup_form();
        add_event_call_primia_gallery();
        add_listener_to_frame();
        close_frame();
    }
    function add_listener_to_frame()
    {
        window.addEventListener("message", function(event)
        {
            $(".file-upload-black-bg").hide();
            // target_image.attr("src", image_domain + "view&filename=" + event.data[0].filename + "&size=250x250&mode=crop").css({"opacity": 0}).load(function()
            target_image.attr("src", "/resources/assets/uploads/" + event.data[0].filename + "/" + event.data[0].filename).css({"opacity": 0}).load(function()
            {
                $(this).stop().animate({"opacity": 1}, 1000);
            });                                   
            target_input.val(event.data[0].filename).trigger("change");
        });
    }
    
    function add_event_call_primia_gallery()
    {
        $(".primia-gallery").unbind("click");
        $(".primia-gallery").bind("click", function(e)
        {
            $(".file-upload-black-bg").show();
            target_image = $($(e.currentTarget).attr("target_image"));
            target_input = $($(e.currentTarget).attr("target_input"));
        });
    }
    function create_file_upload_popup_form()
    {
        if($(".primia-gallery").length > 0)
        {
            $("body").append("<div class='file-upload-black-bg'></div>");
            $(".file-upload-black-bg").css(
            {
                "background-color":"rgba(0,0,0,0.5)",
                "position":"fixed",
                "top":0,
                "left":0,
                "right":0,
                "bottom":0,
                "z-index":5,
                "display": 'none',
            });
            
            $(".file-upload-black-bg").append("<div class='file-upload-popup'></div>");
            $(".file-upload-black-bg .file-upload-popup").css(
            {
                "background-color":"white",
                "position":"fixed",
                "top":30,
                "left":50,
                "right":50,
                "bottom":30,
                "z-index":6,
                "-moz-box-shadow": "0px 0px 5px rgba(0,0,0,0.2)",
                "-webkit-box-shadow": "0px 0px 5px rgba(0,0,0,0.2)",
                "box-shadow": "0px 0px 5px rgba(0,0,0,0.2)",
                "border-radius": "2px",
                "oveflow": "hidden",
            });
            
            // $(".file-upload-black-bg .file-upload-popup").append("<iframe src='" + image_domain + "?source=" + source + "'></iframe>");
            $(".file-upload-black-bg .file-upload-popup").append('<iframe src="/admin/image_upload"></iframe>');
            $(".file-upload-black-bg .file-upload-popup iframe").css(
            {
                "border":"none",
                "width":"100%",
                "height":"100%",
                "z-index":7,
                "position":"relative",
            });

            $(".file-upload-popup").append('<button class="close-frame btn btn-primary" type="button">X</button>');
            $(".file-upload-popup .close-frame").css(
            {
                "position":"absolute",
                "top":"0",
                "right":"0",
                "border-radius":"0",
                "z-index": "10", 
            });
        }
    }
    function close_frame()
    {
        $(".file-upload-popup .close-frame").unbind("click");
        $(".file-upload-popup .close-frame").bind("click", function()
        {
            $(".file-upload-black-bg").hide();
        });
    }
}

