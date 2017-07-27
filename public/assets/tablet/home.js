var home = new home();

function home()
{
	init();

	function init()
	{
		$(document).ready(function()
		{
			document_ready();
		});
	}
	function document_ready()
	{
        query_create_all_table(function()
        {
            check_if_have_login();
        });
	}
	function check_if_have_login()
	{
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * from tbl_agent_logon LIMIT 1';            
            tx.executeSql(query_check, [], function(tx, results)
            {
                if(results.rows.length <= 0)
                {
                    location.href = "login.html";
                }
                else
                {
                	action_get_agent(results.rows);
                }
            });
        });
	}
	function action_get_agent(data)
	{
		db.transaction(function (tx)
        {
        	var query_check = 'SELECT * from tbl_employee LEFT OUTER JOIN tbl_position ON tbl_employee.position_id = tbl_position.position_id where employee_id = "'+data[0]['agent_id']+'" ';            
            tx.executeSql(query_check, [], function(tx, results)
            {
            	data_result = results.rows;
				$(".employee-name").html(data_result[0]['first_name']+" "+data_result[0]['middle_name']+" "+data_result[0]['last_name']);
				$(".employee-position").html(data_result[0]['position_name']);
                action_get_sir(data[0]['agent_id']);
            });
        });
	}
	function action_get_sir(agent_id)
	{
		db.transaction(function (tx)
        {
        	var query_check = 'SELECT * from tbl_sir where sales_agent_id = "'+agent_id+'" AND lof_status IN ("1","2") AND sir_status IN ("0","1")';     
        	var sir_id = "";       
            tx.executeSql(query_check, [], function(txs, results)
            {
            	data_result = results.rows;
            	if(data_result[0]['is_sync'] == 1)
            	{
            		location.href = "agent/agent_dashboard.html";
            	}
            	else
            	{
            		$(data_result).each(function(key, datarow)
					{	
						$(".select-tag-sir").append("<option value='"+datarow['sir_id']+"'>SIR#"+datarow['sir_id']+"</option>");
					});

					$(".sir-no").html(data_result[0]['sir_id']);
					sir_id = data_result[0]['sir_id'];

					var query_update = 'UPDATE tbl_agent_logon SET selected_sir = "'+sir_id+'" where agent_id = "'+agent_id+'"';            
		            tx.executeSql(query_update, [], function(tx, results_update)
		            {
		            	console.log("update success");
		            });

		            get_sir_item();
            	}
            });        	
        });
	}
	function get_sir_item()
	{
		db.transaction(function (tx)
        {
        	var query_check = 'SELECT selected_sir FROM tbl_agent_logon LIMIT 1';            
            tx.executeSql(query_check, [], function(txs, results)
            {
            	var sir_id = results.rows[0]['selected_sir'];

	        	var query_sir_item = 'SELECT * FROM tbl_sir_item LEFT OUTER JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id where tbl_sir_item.sir_id = "'+ sir_id +'"';  

	            tx.executeSql(query_sir_item, [], function(tx, results_get)
	            {
	            	console.log(results_get);

	            	data_result = results_get.rows;
					$(data_result).each(function(key, datarow)
					{
						$(".tbody-sir-item").append('<tr class="text-left unchecked all_tr tr_'+datarow['sir_item_id']+'"><td><input type="checkbox" name="" value="'+datarow['sir_item_id']+'" onclick="checked_item('+datarow['sir_item_id']+')"></td><td>'+datarow['item_barcode']+'</td><td>'+datarow['item_name']+'</td><td>'+datarow['item_qty'] * datarow['um_qty']+'</td></tr>');
					});
					$(".tbody-sir-item").append('<tr id="noresults"><span id="qt"></span></tr>');
	            });
            });
        });
	}
}
function click_action(action)
{
	db.transaction(function (tx)
    {
    	var query_check = 'SELECT selected_sir FROM tbl_agent_logon LIMIT 1';            
        tx.executeSql(query_check, [], function(txs, results)
        {
          	var sir_id = results.rows[0]['selected_sir'];

          	var reject_response = "";

          	if(action == 'reject')
          	{
	          	reject_response = ' <div class="col-md-12 text-center"> <textarea class="form-control textarea-expand reject-reason-input" placeholder="State your reason here." required name="reason_txt"></textarea></div>';
          	}
			var modal_content = '<div class="modal-header">	<button type="button" class="close" data-dismiss="modal">&times;</button>	<h4 class="modal-title">Confirm</h4></div><div class="modal-body add_new_package_modal_body clearfix"> <div class="col-md-12">  <h3>Are you sure you want to <span class="action-span">'+action+'</span> this Load Out Form No : <span class="sir-no-action">'+sir_id+'</span> ?</h3> </div> '+reject_response+' </div><div class="modal-footer">    <div class="col-md-6 col-xs-6"><button type="button" onclick="confirm_lof_action('+sir_id+',`'+action+'`)" class="btn btn-custom-blue form-control">Yes</button></div>  <div class="col-md-6 col-xs-6"><button data-dismiss="modal" class="btn btn-def-white btn-custom-white form-control">No</button></div></div>';

		    $("#global_modal").modal('show');
    		$("#global_modal").find(".modal-dialog").addClass("modal-md");
		    $("#global_modal").find(".modal-content").html(modal_content);
        });
    });
}
function confirm_lof_action(sir_id,action)
{
    $(".modal-loader").removeClass("hidden");

	db.transaction(function (tx)
	{
    	var query_update = 'UPDATE tbl_sir SET (lof_status, sir_status, is_sync) = ("2", "1", "1") WHERE sir_id = "'+sir_id+'"';
    	if(action == "reject")
    	{
    		query_update = 'UPDATE tbl_sir SET (lof_status, rejection_reason) = ("3", "'+$(".reject-reason-input").val()+'") WHERE sir_id = "'+sir_id+'"';
    	}
        tx.executeSql(query_update, [], function(txs, results)
        {
 			$(".modal-loader").addClass("hidden");
            toastr.success("Success");

            if(action == "confirm")
            {
            	location.href = "agent/agent_dashboard.html"; 
            }
            else if(action == "reject")
            {
            	//SYNC REJECTED SIR TO SERVER
            	// location.reload = "";
            }
        });
    });

}