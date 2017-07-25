function transactionRecipient($id)
{
	this.$id = $id;
}


transactionRecipient.prototype.del = function()
{
	  	$.ajax({
  			url: 'member/e-payment/recipient/delete',
  			type: 'POST',
  			dataType: 'json',
  			data: {id: this.$id},
  		})
  		.done(function(data) {
  			if(data['errors'] != null)
  			{
  				alert(data['errors']);
  			}
  			else
  			{
  				$Table.draw();
  			}
  			
  		})
  		.fail(function() {
  			// console.log("error");
  			alert('Error on deleting selected transaction form.');
  		})
  		.always(function() {
  			// console.log("complete");
  		});
}


$(document).ready(function()
{

	$( "#datatable tbody" ).on( "click", "tr .delete-profile", function() {
  		
  		var $id = $(this).attr('id');
  		var $recipient = new transactionRecipient($id);
  		$recipient.del();


  		

	});
});