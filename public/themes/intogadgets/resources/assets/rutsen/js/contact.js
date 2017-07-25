$(document).ready(function(){

	$('#cu-submit').on('click', function()
	{	
		var $this = $(this);
		sending_mode($this);

	    $.ajax(
	    {
	        url:"contact/send_email",
	        dataType:"json",
	        data: $('#cu-form').serialize(),
	        success: function(data){
	        	if(data==true)
	        	{
	        		
	        		$('[data-remodal-id=contact-us-message-box]').remodal().open();
	     		}
	     		else
	     		{ 
	     			alert('ON SUCCESS ERROR: Ooops! Something went wrong')
	     		}
	     		clear_input($this);
	        },
	        complete: function(jqXHR,textStatus){

	        },
	        error: function(jqXHR,textStatus,errorThrown ){
	        	alert('ERROR : Ooops! Something went wrong')
	        	console.log('error-textStatus : ' + textStatus);
	        	console.log('error-errorThrown : ' + errorThrown);
	        	clear_input($this);
	        }

	    })

	    return false;
	})

	function sending_mode($this)
	{
		$this.attr('disabled','disabled');
		$this.find('span.send-email').hide();
		$this.find('span.sending-email').show();
		$this.siblings('img.loading').show();
	}

	function clear_input($this)
	{
		$('#cu-form input.form-control, #cu-form textarea.form-control').val("");
		$this.removeAttr('disabled');
		$this.find('span.send-email').show();
		$this.find('span.sending-email').hide();
		$this.siblings('img.loading').hide();
	}

});