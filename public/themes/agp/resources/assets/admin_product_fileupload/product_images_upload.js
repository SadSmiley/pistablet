 

var productImg = function()
{

   var opt = {hashTracking: false, closeOnOutsideClick: true};
   this.selectImgRemodal = $('[data-remodal-id="modal-product-select-image"]').remodal(opt); 
}

productImg.prototype.docReady = function()
{
    var productImgThis = this;

    jQuery(document).ready(function($)
    {

        productImgThis.addEventSelectImg();
        productImgThis.addEventUploadFiles();
        productImgThis.addEventDeleteImage();

    });
}

productImg.prototype.getProdImg = function()
{

    $('[data-remodal-id="modal-product-select-image"]').toggleClass('loading-opacity');
    $('.pre-loader-img').toggleClass('hidden');
    $('.prod-img-loading-container').html("");
    // var token = $('meta[name="csrf-token"]').attr('content');
    // console.log(token);

    // $('.prod-img-loading-container').load('/admin/maintenance/product/images');

        // ,{_token : token},function(event)
    // {

    //     $('[data-remodal-id="modal-product-select-image"]').toggleClass('loading-opacity');
    //     $('.pre-loader-img').toggleClass('hidden');

    // });
     $.ajax({
         url: '/admin/maintenance/product/images',
         type: 'post',
         dataType: 'json',
         data: {'_token' : $('meta[name="csrf-token"]').attr('content')},
     })
     .done(function(json) {
        $('.prod-img-loading-container').html(json.html);
        $('[data-remodal-id="modal-product-select-image"]').toggleClass('loading-opacity');
        $('.pre-loader-img').toggleClass('hidden');

         // console.log(json);

     })
     .fail(function() {
         console.log("error");
     })
     .always(function() {
         console.log("complete");
     });
 





}

productImg.prototype.addEventSelectImg = function()
{
    var productImgThis = this;
    $('.img-popup-select-btn').on('click', function(event){
        productImgThis.getProdImg();
        productImgThis.selectImgRemodal.open();
    });

    $('.prod-img-loading-container').on('click', 'input.select-prod-img-checbox:checkbox', function(event) {

        var group = $(this).closest('div').siblings('.col-md-3').find('.select-prod-img-checbox').prop('checked', false);           
        $(this).prop("checked",true);
    });

    $('.select-product-img-btn').on('click', function(event)
    {
        event.preventDefault();
        var imgFileName = $('.prod-img-loading-container input[type="checkbox"][name="image_file"]:checked').val();
        var imgSrc = $('.prod-img-loading-container input[type="checkbox"][name="image_file"]:checked').siblings('img').attr('src');

        $('input#img-file-input').attr('value',imgFileName);
        $('input#img-file-input').siblings('img').attr('src',imgSrc);

        productImgThis.selectImgRemodal.close();

    });



}

productImg.prototype.uploadFiles = function()
{

    var productImgThis = this;
    var fileSelect = document.getElementById('file-select');
    var files = fileSelect.files;
    var formData = new FormData();

    $('.upload-msg').html("");
    $('#progressBar').attr('value','0');
    $('#progressBar').toggleClass('hidden');
    // $('#progressBar').show();


    //set form 
    if(files.length > 0)
    {

        for (var i = 0; i < files.length; i++)
        {
          var file = files[i];

          // Check the file type.
          if (!file.type.match('image.*')) {
            continue;
          }

          formData.append('photos[]', file, file.name);
             
        }
    }

    formData.append('_token', $('meta[name="csrf-token"]').attr('content')); 

    // set ajax
    var ajax = new XMLHttpRequest();

    // on progress
    ajax.upload.addEventListener("progress", function(event){
        var percent = (event.loaded / event.total) * 100;
        $("#progressBar").val(Math.round(percent));
    }, false);

    // on success
    ajax.addEventListener("load", function(event)
    {
        var data =  JSON.parse(event.target.responseText);
        var append = "";
        if(data.errors.length > 0 )
        {
            $.each(data.errors, function(index, val)
            {
                append += "<li>"+val+"</li>";

            });

            append = '<ul class="text-danger">' + append + '</ul>';

            $('.upload-msg').html(append);        
                    
        }
        else
        {
            $('#file-select').val("");
            productImgThis.getProdImg();
            productImgThis.selectImgRemodal.open();


            // $('.img-popup-select-btn').trigger('click');
        }

        // $('.upload-msg').html("");
        // $('#progressBar').attr('value','0');
        $('#progressBar').attr('value','0');
        $('#progressBar').toggleClass('hidden');


    }, false);

    ajax.addEventListener("error", function(event)
    {
        alert('Error while uploading files!');

    }, false);

    ajax.addEventListener("abort", function(event)
    {
        alert('Request aborted!');
    }, false);

    ajax.open("POST",'admin/maintenance/product/images/upload');
    ajax.send(formData);

}

productImg.prototype.addEventUploadFiles = function()
{
    var productImgThis = this;
    $('.upload-file-btn').on('click', function(event)
    {
        event.preventDefault();
        productImgThis.uploadFiles();
    });





}

productImg.prototype.addEventDeleteImage = function()
{
    var productImgThis = this;
    $('.delete-product-img-btn').on('click', function(event)
    {

        var imgFileName = $('.prod-img-loading-container input[type="checkbox"][name="image_file"]:checked').val();
         $.ajax({
             url: 'admin/maintenance/product/images/delete',
             type: 'post',
             dataType: 'json',
             data: {image_file:imgFileName
                    // _token: $('meta[name="_token"]').attr('content')
                    },
         })
         .done(function(data)
         {
             // console.log("success");
         })
         .fail(function() {
             // console.log("error");
         })
         .always(function() {
             // console.log("complete");
             productImgThis.getProdImg();

         });



    });

}

var productImg = new productImg();
productImg.docReady();
