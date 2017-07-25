var import_csv  = new import_csv();
var target_file = '';
var main_file   = '';
var ctr         = 0;
var data_value  = '';
var data_length = '';
var error_data  = [];
var ctr_success = 0;    
var token       = $(".token").val();

function import_csv()
{
    init();
    function init()
    {
        document_ready();
    }
    
    function document_ready()
    {
        event_bind_files();
        event_submit_button();
        csv_upload_configuration();
    }

    function event_bind_files()
    {
        if(isAPIAvailable()) 
        {
            $(document).on('change', '#files', handleFileSelect);
        }
    }

    function isAPIAvailable() 
    {
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            return true;
        } else {
            // source: File API availability - http://caniuse.com/#feat=fileapi
            // source: <output> availability - http://html5doctor.com/the-output-element/
            document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
            // 6.0 File API & 13.0 <output>
            document.writeln(' - Google Chrome: 13.0 or later<br />');
            // 3.6 File API & 6.0 <output>
            document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
            // 10.0 File API & 10.0 <output>
            document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
            // ? File API & 5.1 <output>
            document.writeln(' - Safari: Not supported<br />');
            // ? File API & 9.2 <output>
            document.writeln(' - Opera: Not supported');
            return false;   
        }
    }

    function handleFileSelect(evt) 
    {
        var files = target_file; // Dropzone File object
        var file  = files[0];
        main_file = file;

        // read the file metadata
        var output = ''
        output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
        output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
        output += ' - FileSize: ' + file.size + ' bytes<br />\n';
        output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';

        // post the results
        $('#list').html(output);
        // enable button
        $(".btn-submit").removeAttr("disabled");
    }

    function event_submit_button(evt)
    {
        $(".btn-submit").click( function()
        {
            $(this).attr("disabled","disabled");

            Load_array(main_file);
        });
    }

    function Load_array(file) 
    {
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(event){
            var csv     = event.target.result;
            data_value  = $.csv.toObjects(csv);
            data_length = data_value.length;

            submit_data(data_value[ctr]);
        };
        reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    }

    function submit_data(value)
    {
        if(ctr <= data_length)
        {
            $.ajax(
            {
                url: url_link,
                dataType:'json',
                type:'post',
                data:{
                    _token      : token,
                    value       : value,
                    ctr         : ctr,
                    data_length : data_length,
                    error_data  : ctr == data_length ? error_data : '',
                    input       : objectifyForm($(".import-validation").serializeArray())
                },
                success: function(data)
                {
                    console.log(ctr > data_length ? error_data : '');
                    if(data.status != 'end')
                    {
                        // counter and percentage loading
                        ctr++;
                        var percent     = parseInt((ctr*100)/data_length);

                        if(data.status == "success") ctr_success++;
                        else                         error_data.push(data.value_data);

                        $(".progress-bar").css("width", percent+"%");
                        $(".progress-bar").html(percent+"%");
                        $(".counter").html(ctr_success+"/"+data_length);

                        $(".table-import-container tbody").append(data.tr_data);

                        submit_data(data_value[ctr]);
                    }
                    else
                    {
                        $('.import-error').trigger("click");
                        var href = $('.import-error').attr('href');
                        window.location.href = href;
                    }
                },
                error: function(e)
                {
                    console.log(e.error());
                    toastr.error(e.error() + '. Please Contact The Administrator.');
                }
            });
        }
    }

    function objectifyForm(formArray)
    {
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++){
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }

    function csv_upload_configuration()
    {
        Dropzone.options.myDropZoneImport = 
        {
            maxFilesize: 2,
            thumbnailWidth: 148,
            thumbnailHeight: 148,
            acceptedFiles: ".csv",
            init: function() 
            {
                this.on("uploadprogress", function(file, progress) 
                {
                })

                this.on("error", function(file, response)
                {
                    console.log(response);
                })

                this.on("addedfile", function(file)
                {
                    if (this.files[1]!=null){
                        this.removeFile(this.files[0]);
                    }
                    $("#ImportContainer .dz-message").slideUp();
                    target_file = this.files;
                    $("#files").change();
                })

                this.on("dragover", function()
                {
                    // $("#ModalGallery .dropzone").addClass("dropzone-drag");
                })

                this.on("dragleave", function()
                {
                    // $("#ModalGallery .dropzone").removeClass("dropzone-drag");
                })

                this.on("drop", function()
                {
                    // $("#ModalGallery .dropzone").removeClass("dropzone-drag");
                })
            }
        };
    }
}