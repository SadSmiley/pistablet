$(document).ready(function()
{

  $("#subform").submit(function(e)
  {

    $email = $('#email').val();

    
    $.ajax(
    {
      url:"subscribe",
      dataType:"json",
      data:{'email':$email, '_token' : $('.token').val()},
      type:"POST",
      success: function(data)
      {
        $('#email').prop("disabled", true);
        $('.send-logo-holder').prop("disabled", true);
        $(".newsletter-text").text(data);
       
        location.hash="nl";
        
      },
      error: function (error) 
    {
       
          if(location.hash=="")
          {
                 
                  $(".newsletter-text").text("This email is already subscribed.");
                  location.hash="nl";
                    
                       
          }                  
     }
    });

   
    




  });



});
