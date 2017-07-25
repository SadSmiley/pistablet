

function stockist($id, $Table)
{
	this.stockist_id = $id;
	this.table = $Table;

}


stockist.prototype.archive = function(){

	var datatable = this.table;
	$.ajax({
		url: 'admin/admin_stockist/archive',
		type: 'post',
		dataType: 'json',
		data: {stockist_id : this.stockist_id},
	})
	.done(function(data)
	{
		datatable.draw();
	})
	.fail(function() {
		alert("Error on archiving selected stockist");
	})
	.always(function() {

	});
	
}

stockist.prototype.restore = function(){
	var datatable = this.table;
	$.ajax({
		url: 'admin/admin_stockist/restore',
		type: 'post',
		dataType: 'json',
		data: {stockist_id : this.stockist_id},
	})
	.done(function(data)
	{
		datatable.draw();
	})
	.fail(function() {
		alert("Error on restoring selected stockist");
	})
	.always(function() {

	});
}





$(document).ready(function()
{

	$( "#datatable tbody" ).on( "click", "tr .archive-stockist" , function(event) {
	 	event.preventDefault();
	 	var id = $(this).attr('stockist-id');
	 	// alert(id)
	 	var $stockist = new stockist(id, $Table);
	 	$stockist.archive();

	});


	$( "#datatable tbody" ).on( "click", "tr .restore-stockist" , function(event) {
	 	event.preventDefault();
	 	var id = $(this).attr('stockist-id');
	 	var $stockist = new stockist(id, $Table);
	 	$stockist.restore();

	});

});





