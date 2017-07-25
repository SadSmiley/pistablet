$(document).ready(function(){

	// $('#test').click(function(){
	// 	var popup_title = 'test';
	// 	var popup_loading_details = 'test';
	// 	loading_popup(popup_title, popup_loading_details);
	// });

	get_message();
	show_delete_dialog();
	show_reply_form();
	send_reply_email();



})

function show_delete_dialog()
{
	$('.messages-main-container').delegate('#messages-main-container .message-container button.archive-message-btn','click',function(e){
		var inquiryId = ($(e.currentTarget).closest('.message-container').attr('inquiry-id'));
		$('#delete-message-btn').attr('inquiry-id',inquiryId);
	});

	$('#delete-message-btn').on('click', function()
	{

		var $this = $(this);
		var $popup_title = "Archive Message";
		var $popup_loading_details = "Archive";
		
		$('.delete-message-popup').modal('hide');
		
		loading_popup($popup_title, $popup_loading_details);


		var inquiryId = ($(this).attr('inquiry-id'));

		$.ajax({
		 
		    // The URL for the request
		    url: "admin/dashboard/inbox/delete",
		 
		    // The data to send (will be converted to a query string)
		    data:
		    {
		        inquiry_id: inquiryId, _token : $('.token').val()
		    },
		 
		    // Whether this is a POST or GET request
		    type: "POST",
		 
		    // The type of data we expect back
		    dataType : "json",
		 
		    // Code to run if the request succeeds;
		    // the response is passed to the function
		    success: function( data )
		    {

		    	$successMessage = 'Message successfully Archive';
		    	if(data == true) {
					
					message_popup($popup_title,$successMessage,['alert', 'alert-success']);
					//remove the message from the list
					var $selected_message = $('.message-container[inquiry-id="'+ inquiryId + '"]');

					$selected_message.fadeOut('slow', function()
					{
						$(this).remove();	
					});
					
					get_messages_count();

		    	}
		    	else
		    	{

					message_popup($popup_title,'.SUCCESS: ERROR',['alert', 'alert-danger']);
		    	}

		    },
		 
		    // Code to run if the request fails; the raw request and
		    // status codes are passed to the function
		    error: function( xhr, status, errorThrown )
		    {

		    	var $errormsg = 'Sorry, there was a problem!';
		        console.log( "Error: " + errorThrown );
		        console.log( "Status: " + status );
		        console.dir( xhr );
		        message_popup($popup_title,$errormsg,['alert', 'alert-success']);

		    },
		 
		    // Code to run regardless of success or failure
		    complete: function( xhr, status )
		    {
		        console.log( "The request is complete!" );
		    }
		});

	});
	
}

function get_message()
{ 

	var loadingEffect = $('.messages-main-container .loading-indicator');
	var messageContainer = $( ".messages-main-container");
	loadingEffect.fadeIn('slow');
	load_message(messageContainer,loadingEffect);


	function load_message(messageContainer,loadingEffect)
	{
		setTimeout(function()
		{
		messageContainer.fadeOut('slow', function()
		{	

				messageContainer.load( "admin/customer/inbox", function()
				{	
					
			
						loadingEffect.fadeOut('slow');
						messageContainer.fadeIn('slow');
						get_messages_count();
					

				});
			


		});
		},1000);
	}


	
}


function get_messages_count()
{
	var inboxBadge = $('#inbox-badge');
	$.getJSON( "admin/dashboard/inbox/count", function( data )
	{
		var count = data;
		if(!count)
		{
			var $append = '<div class="well">' +
							'No messages' +
						 '</div>';

			$('.messages-main-container').append($append);
			update_inbox_badge(inboxBadge,count="0");
		}
		else
		{

			update_inbox_badge(inboxBadge,count);
		}
		

	});



}

function update_inbox_badge(inboxBadge,count)
{

	inboxBadge.fadeOut('slow',function(data)
	{
		inboxBadge.empty();
		inboxBadge.text(count);
		inboxBadge.fadeOut('slow', function()
		{
			$(this).fadeIn('slow');
		});

		
	});

}

function show_reply_form()
{	
	$('.messages-main-container').delegate('#messages-main-container .message-container button.relpy-message-btn','click',function(e){
        var $this = $(this);
        var recipientName = $this.closest('.btn-group').siblings('.message-sender-name').text();
        var recipientEmail =  $this.closest('.btn-group').siblings('.message-sender-email').text();
        var subject =  $this.closest('.panel-heading').siblings('.message-sender-details').find('.message-sender-details-subject').text();
        $('#reply-message-recipientname').val('');
        $('#reply-message-recipient').val('');
        $('#reply-message-subject').val('');

        $('#reply-message-recipientname').val(recipientName);
        $('#reply-message-recipient').val(recipientEmail);
        $('#reply-message-subject').val('Re: ' + subject);
    });
}

function send_reply_email()
{
	$('#reply-message-send-btn').on('click', function (){
		$this = $(this);
		$popup_title = 'Reply';
		$popup_loading_details = 'Sending Message...';
		$this.closest('.reply-message-popup').modal('hide');
		loading_popup($popup_title, $popup_loading_details);

		$.ajax({

		    url: "admin/dashboard/inbox/reply",
		    data: $('#reply-message-form').serialize(),
		    type: "POST",
		    dataType : "json",
		    success: function( data ) {
		    	var $successMessage = "Message successfully sent."
		    	console.log(data);
				
				if(data==true)
				{
					message_popup($popup_title, $successMessage,['alert','alert-success']);
				}
				else
				{
					message_popup($popup_title,'Message was not send',['alert','alert-failed']);
				}
				
		    },
		    // Code to run if the request fails; the raw request and
		    // status codes are passed to the function
		    error: function( xhr, status, errorThrown ) {
		        // alert( "Sorry, there was a problem!" );
		        // console.log( "Error: " + errorThrown );
		        // console.log( "Status: " + status );
		        // console.dir( xhr );
		        var $addedclasses = ['alert','alert-danger'];
		        var $Sendingfailed = 'Oops something went wong. Message was not send.';
				message_popup($popup_title, $Sendingfailed,$addedclasses)


		    },
		 
		    // Code to run regardless of success or failure
		    complete: function( xhr, status ) {
		        // alert( "The request is complete!" );
		    }
		});
		
	});
}