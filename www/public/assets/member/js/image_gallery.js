var image_gallery = new image_gallery();
var current_modal = '';

function image_gallery()
{
	init()

	function init()
	{
		document_ready();
	}

	function document_ready()
	{
		trigger_image_gallery();
		event_media_library_click();
		event_upload_files_click();
		event_selected_image_change();
		event_clear_click();
		action_upload_image();
		event_selected_image_submit();
		image_upload_configuration();
	}

	function trigger_image_gallery()
	{
		$(document).on("click",".image-gallery", function(e)
		{
			e.preventDefault();
			current_modal = $(this);
			key_modal	  = $(this).attr("key");
			$("#ModalGallery").modal("show");
			$("#ModalGallery #get-selected-image").attr("key", key_modal);
			load_media_gallery();
		})
	}

	function event_media_library_click()
	{
		$(document).on("click",".tab-media-library", function()
		{
			load_media_gallery();
		})
	}

	function load_media_gallery()
	{
		action_remove_all_selected();
		$("#ModalGallery #media-library .modal-body").html('<div style="margin: 40px auto;" class="loader-16-gray"></div>');

		$.ajax(
		{
			url: '/image/load_media_library',
			method: 'GET',
			success: function(data)
			{
				$("#ModalGallery #media-library .modal-body").html(data).hide().fadeIn();
			},
			error: function(e)
			{

			}
		});
	}

	function event_upload_files_click()
	{
		
		$(document).on("click",".tab-upload-files", function()
		{
			action_remove_uploaded_files();
		})
	}

	function action_remove_uploaded_files()
	{
		$("#ModalGallery .dropzone").removeClass("dz-started");
		$("#ModalGallery .dz-message").attr("style","");
		$("#ModalGallery .dz-preview").remove();
	}

	function event_selected_image_change()
	{
		$(document).on("click","#ModalGallery .modal-body .image-container", function(e)
		{
			if($(this).hasClass("active"))
			{
				action_remove_selected_image($(this));
			}
			else
			{
				action_add_selected_image($(this));
			}
		})
	}

	function action_add_selected_image($this)
	{
		
		// $cloned_image = $("#ModalGallery .modal-footer .image-wrapper").append($this.clone().children(".check-logo").remove());
		if(check_if_single_image())
		{
			action_remove_all_selected();
		}
		$this.clone().appendTo($("#ModalGallery .modal-footer .image-wrapper")).children(".check-logo").remove();
		action_add_deduc_selected_text("add");
		$this.addClass("active");
	}

	function action_remove_selected_image($this)
	{
		$src = $this.children("img").attr("src");
		$("#ModalGallery .modal-footer .image-container").has("img[src='" +$src +"']").remove();
		action_add_deduc_selected_text("minus");
		$this.removeClass("active");
	}

	function action_add_deduc_selected_text($action)
	{
		if($action == "add")
		{
			$("#ModalGallery .selected").html(parseInt($("#ModalGallery .selected").text()) + 1);
		}
		else
		{
			$("#ModalGallery .selected").html(parseInt($("#ModalGallery .selected").text()) - 1);
		}
	}

	function event_clear_click()
	{
		$(document).on("click","#ModalGallery .clear-all", function()
		{
			action_remove_all_selected();
		})
	}

	function action_remove_all_selected()
	{
		$("#ModalGallery .selected").html(0);
		$("#ModalGallery .modal-footer .image-wrapper .image-container").remove();
		$("#ModalGallery .modal-body .image-container").removeClass("active");
	}

	function check_if_single_image()
	{
		if(current_modal.hasClass("image-gallery-single"))
		{
			return true;
		}

		return false;
	}

	function action_upload_image()
	{
		
	}

	function event_selected_image_submit()
	{
		$(document).on("click","#ModalGallery #get-selected-image", function()
		{
			$("#ModalGallery").modal("toggle");
			
            if (typeof submit_selected_image_done == 'function')
            {
                submit_selected_image_done(action_load_selected_image($(this).attr("key")));
            }
		});
	}

	function action_load_selected_image(key)
	{
		// $("#ModalGallery .modal-body .image-container.active").each( function(index, value)
		// {
		// 	var img_src  	= $(this).find("img").attr("src");
		// 	var img_id		= $(this).attr("img-id");
		// 	var html_image 	= '<image src="' +img_src +'" img-id="' +img_id +'" style="height: 50px;">'
		// 	$(".selected-image-container").append(html_image);
		// })
		var info = {};
		var image_data = [];
		var obj;

		$("#ModalGallery .modal-footer .image-wrapper .image-container").each( function(index, value)
		{
			console.log($(this).attr("img-id")+"|"+$(this).find("img").attr("src"));
			obj = {};
			obj['image_id'] 	= $(this).attr("img-id");
			obj['image_path']	= $(this).find("img").attr("src");
			image_data.push(obj);
		})	

		info['akey']		= key;
		info['image_data']  = image_data;	

		console.log(info);

		return info;
	}

	function image_upload_configuration()
	{
		Dropzone.options.myDropZone= 
		{
			maxFilesize: 2,
            thumbnailWidth: 148,
            thumbnailHeight: 148,
            acceptedFiles: "image/*",
            init: function() 
            {
		        this.on("uploadprogress", function(file, progress) 
		        {
		            console.log("File progress", progress);
		        })

		        this.on("error", function(file, response)
		        {
		        	console.log(response);
		        })

		        this.on("addedfile", function(file)
		        {
		        	$("#ModalGallery .dz-message").fadeOut();
		        })

		        this.on("dragover", function()
		        {
		        	$("#ModalGallery .dropzone").addClass("dropzone-drag");
		        })

		        this.on("dragleave", function()
		        {
		        	$("#ModalGallery .dropzone").removeClass("dropzone-drag");
		        })

		        this.on("drop", function()
		        {
		        	$("#ModalGallery .dropzone").removeClass("dropzone-drag");
		        })
		    }
		};
	}
}