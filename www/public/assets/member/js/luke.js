function showmodal(title, body){
	var html =  '	<div class="modal fade" id="luke_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
		html +=	' 	  <div class="modal-dialog" role="document">';
		html +=	'	    <div class="modal-content" style="border-radius: 0px;">';
		html +=	'	      <div class="modal-header">';
		html +=	'	        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >';
		html +=	'	          <span aria-hidden="true" class="danger">&times;</span>';
		html +=	'	        </button>';
		html +=	'	        <h4 class="modal-title" id="myModalLabel">'+ title +'</h4>';
		html +=	'	      </div>';
		html +=	'	      <div id="result" class="modal-body table-responsive">';
		html +=	'	       ' + body;
		html +=	'	      </div>';
		html +=	'	      <div class="modal-footer">';
		html +=	'	        <button type="button" class="btn btn-secondary" data-dismiss="modal" style="border: 1px solid black; border-radius: 0px;">Close</button> ';       
		html +=	'	      </div>';
		html +=	'	    </div>';
		html +=	'	  </div>';
		html +=	'	</div>';
	$('#luke').html(html);
	$('#luke_modal').modal('toggle');
}
function getajaxtomodal(link, title){
	$.ajax({
		url	 	: 	link,
		type 	: 	'get',
		success : 	function(result){
			showmodal(title, result);
		},
		error	: 	function(err){
			// toastr.alert();
			toastr.clear();
			toastr.warning("Something Went Wrong, Please Contact The Administrator");
		}
	});
}

