 init();
 function init()
 {
     $(document).ready(function()
     {
        document_ready();
        $.ajaxSetup(
        {
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
        });
     });
 }
 
 function document_ready()
 {
     $(document).ready(function()
     {
        $(".switch").bootstrapSwitch({"size":"mini"});
     });

 }


 function loading_popup($popup_title, $popup_loading_details)
{   
        $('.loading-effect-title').empty();
        $('.loading-effect-process').empty();
        $('.loading-effect-title').html($popup_title);
        $('.loading-effect-process').html($popup_loading_details);
        $('.modal.fade.loading-effect').modal(
        {
          show: true,
          keyboard: false,
          backdrop:'static'
        });
}


function message_popup($popup_title,$successMessage,$classes)
{
    setTimeout(function(){

        $('.after-loading-message .modal-header').addClass(function(){
            $(this).removeClass();
            if($classes)
            {
                return $classes.join(" ") + ' modal-header';
            }
            else
            {
                return 'modal-header';
            }
        });
        
        $('.modal.fade.loading-effect').modal('hide');
        $('.after-loading-message-title').empty();
        $('.after-loading-message-details').empty();
        $('.after-loading-message-title').html($popup_title);
        $('.after-loading-message-details').html($successMessage);
        $('.modal.fade.after-loading-message').modal('show');

    },1000);
}


function test()
{
  
}
 