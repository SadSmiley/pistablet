

function stockistType($id, $table)
{
	this.stockist_user_id = $id;
	this.table = $table;
}


stockistType.prototype.archive = function(){
	var datatable = this.table
	$.ajax({
		url: 'admin/admin_stockist_user/archive',
		type: 'post',
		dataType: 'json',
		data: {stockist_user_id : this.stockist_user_id},
	})
	.done(function(data)
	{
		datatable.draw();
	})
	.fail(function() {
		alert("Error on archiving selected stockist user");
	})
	.always(function() {

	});
	
}

stockistType.prototype.restore = function(){
	var datatable = this.table
	$.ajax({
		url: 'admin/admin_stockist_user/restore',
		type: 'post',
		dataType: 'json',
		data: {stockist_user_id : this.stockist_user_id},
	})
	.done(function(data)
	{
		datatable.draw();
	})
	.fail(function() {
		alert("Error on restoring selected stockist user");
	})
	.always(function() {

	});
}





$(document).ready(function()
{


	$( "#datatable tbody" ).on( "click", "tr .archive-stockist-user" , function(event) {
	 	event.preventDefault();
	 	var id = $(this).attr('stockist-user-id');

	 	var $stockist_type = new stockistType(id, $Table);
	 	$stockist_type.archive();

	});


	$( "#datatable tbody" ).on( "click", "tr .restore-stockist-user" , function(event) {
	 	event.preventDefault();
	 	var id = $(this).attr('stockist-user-id');

	 	var $stockist_type = new stockistType(id, $Table);
	 	$stockist_type.restore();
	});

});




