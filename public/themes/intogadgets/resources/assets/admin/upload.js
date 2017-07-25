init();

function init()
{
        $(document).ready(function()
        {
                document_ready();
        });
}

function document_ready()
{
        add_tab_event();
        load_images();
        add_upload_event();
        add_choose_thumb_event();
        add_event_send_to_parent();
}
function add_event_send_to_parent()
{
        $(".sent-to-parent").unbind("click");
        $(".sent-to-parent").bind("click", function(e)
        {
                if(!$(e.currentTarget).hasClass("disabled"))
                {
                        var send = new Array();

                        $(".thumb.selected img").each(function(key)
                        {
                                send[key] = new Array();
                                send[key]["filename"] = $(this).attr("filename");
                                send[key]["path"] = $(this).attr("src");
                        });

                        parent.postMessage(send, "*");
                };

        });
}

function add_choose_thumb_event()
{
        $(".main-container .image-container .thumb").unbind("click");
        $(".main-container .image-container .thumb").bind("click", function(e)
        {
                if($(e.currentTarget).hasClass("selected"))
                {
                        $(e.currentTarget).removeClass("selected");
                }
                else
                {
                        if(multiple_select_mode == "single")
                        {
                                $(".main-container .image-container .thumb").removeClass("selected");
                        }

                        $(e.currentTarget).addClass("selected");
                }

                 check_if_button_should_be_disabled();
        });
}
function check_if_button_should_be_disabled()
{
        if($(".thumb.selected").length > 0)
        {
                $(".sent-to-parent").removeClass("disabled");
        }
        else
        {
                $(".sent-to-parent").addClass("disabled");
        }
}
function load_images()
{
        $.ajax(
        {
                url:"/admin/image_gallery",
                dataType:"json",
                type:"get",
                success: function(data)
                {
                        $.each(data, function(key, val)
                        {
                                crate_elements_for_upload(key, val, true);
                        });

                        add_choose_thumb_event();
                }
        });
}
function add_tab_event()
{
        $(".tab").click(function(e)
        {
                image_container_scroll_top();
                $(".tab").removeClass("active");
                $(e.currentTarget).addClass("active");
                $(".tab-content").addClass("hide");
                $($(e.currentTarget).attr("target")).removeClass("hide");
        });
}
function image_container_scroll_top()
{
        setTimeout(function()
        {
                $(".main-container .images-container .image-container").scrollTop(0);
        });
}
function add_upload_event()
{
        image_container_scroll_top();

        $(".upload-input").change(function(e)
        {
                $(".tab-content").addClass("hide");
                $(".gallery-container").removeClass("hide");
                $(".tab").removeClass("active");
                $(".media-tab").addClass("active");


                image_container_scroll_top();

                $.each(this.files, function(key, file)
                {
                        var random = Math.round(getRandomArbitrary(1, 999999));
                        // crate_elements_for_upload(key, file);
                });

                start_uploading_file(this.files, 0);
                add_choose_thumb_event();
        });
}
function crate_elements_for_upload(key, file, image)
{
        if(image)
        {
                $prepend = '<div class="thumb">' +
                                                '<div><img style="width: 143px; height: 143px; object-fit: cover;" filename="' + file.image_filename + '" src="' + file.image_thumb_path + '"></div>' +
                                                '<div class="check">&#10004;</div>' +
                                        '</div>';
        }
        else
        {
                $prepend = '<div class="thumb" ref="r-' + key + '">' +
                                                '<div class="loading">' +
                                                        '<div class="loading-progress"></div>' +
                                                '</div>' +
                                                '<div class="check">&#10004;</div>' +
                                        '</div>';
        }

        $(".image-container").prepend($prepend);
}
function getRandomArbitrary(min, max)
{
    return Math.random() * (max - min) + min;
}
function start_uploading_file(files, ctr)
{
        if(files[ctr])
        {
                console.log(files[ctr]);
                file = files[ctr];

                var formdata = new FormData();

                formdata.append("file_upload", file);
                        console.log(formdata);

                var ajax = new XMLHttpRequest();
                ajax.upload.addEventListener("progress", function(e)
                {
                        var percentage = Math.round((e.loaded / e.total) * 100);
                        $(".thumb[ref='r-" + ctr + "']").find(".loading-progress").stop().animate({"width": percentage + "%"}, 1000, "linear");
                }, false);

                ajax.addEventListener("load", function(e)
                {
                        var response = $.parseJSON(e.target.responseText);

                        setTimeout(function()
                        {
                                $(".thumb[ref='r-" + ctr + "']").find(".loading").fadeOut(function()
                                {
                                        $(".thumb[ref='r-" + ctr + "']").append('<div><img filename="' + response.image_filename + '" src="' + response.thumb_image_path);
                                        $(".thumb[ref='r-" + ctr + "']").removeAttr("ref");
                                        ctr++;
                                        start_uploading_file(files, ctr);
                                });
                        }, 1000);

                }, false);

                ajax.addEventListener("error", errorHandler, false);
                ajax.addEventListener("abort", abortHandler, false);

                $.ajax({
                        url: '/admin/image_upload/upload',
                        type: 'POST',
                        dataType: 'json',
                        data: formdata,
                        processData: false,
                        contentType: false,
                })
                .done(function(data) 
                {
                        var key = 1;
                        var file = data;

                        crate_elements_for_upload(key, file, true);
                        add_choose_thumb_event();
                })
                .fail(function() 
                {
                        console.log("error");
                })
                .always(function() 
                {
                        console.log("complete");
                });
                
        }
}

function errorHandler(event)
{
}
function abortHandler(event)
{
}
