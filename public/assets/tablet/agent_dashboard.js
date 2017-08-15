var agent_dashboard = new agent_dashboard();

function agent_dashboard()
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
		check_if_have_login();
        forget_session('inv_id');
        forget_session('cm_id');
        forget_session('rp_id');
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
        	var query_check = 'SELECT * from tbl_employee LEFT JOIN tbl_position ON tbl_employee.position_id = tbl_position.position_id where employee_id = "'+data[0]['agent_id']+'" ';            
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
        	var query_check = 'SELECT * from tbl_sir where sales_agent_id = '+agent_id+' AND lof_status IN ("1","2") AND sir_status IN ("0","1") AND reload_sir = 0';
        	var sir_id = "";       
            tx.executeSql(query_check, [], function(txs, results)
            {
            	data_result = results.rows;
            	// if(data_result[0]['is_sync'] == 1)
            	// {
            	// 	location.href = "agent/agent_dashboard.html";
            	// }
            	// else
            	// {
            		$(data_result).each(function(key, datarow)
					{	
						$(".select-tag-sir").append("<option value='"+datarow['sir_id']+"'>SIR#"+datarow['sir_id']+"</option>");
					});

					$(".sir-no").html(data_result[0]['sir_id']);
					sir_id = data_result[0]['sir_id'];

					var query_update = 'UPDATE tbl_agent_logon SET selected_sir = "'+sir_id+'" where agent_id = "'+agent_id+'"';            
		            tx.executeSql(query_update, [], function(tx, results_update)
		            {
		            });
            	// }
                get_amount_diff_transaction(sir_id);
            });        	
        });
	}
    function get_amount_diff_transaction(sir_id)
    {
        db.transaction(function (tx)
        {
            var query_check_sir = 'SELECT shop_id FROM tbl_sir where sir_id = "'+sir_id+'"';
            tx.executeSql(query_check_sir, [], function(txs, results_sir)
            {
                var shop_id = results_sir.rows[0]['shop_id'];
                var query_count_customer = 'SELECT count(customer_id) as ctr_customer FROM tbl_customer where archived = 0 and shop_id = "'+shop_id+'"';
                tx.executeSql(query_count_customer, [], function(txst, results_customer)
                {
                    $(".count-customer").html(results_customer.rows[0]['ctr_customer']);
                });
            });     

            //cycyjoin
            var query_count_credit_sales = 'SELECT sum(tbl_customer_invoice.inv_overall_price) as inv_total_amount, tbl_customer_invoice.inv_id, credit_memo_id '+
                                           ' FROM tbl_manual_invoice LEFT JOIN tbl_sir ON tbl_sir.sir_id = tbl_manual_invoice.sir_id '+
                                           ' LEFT JOIN tbl_customer_invoice ON tbl_customer_invoice.inv_id = tbl_manual_invoice.inv_id '+
                                           ' WHERE tbl_customer_invoice.is_sales_receipt = 0 '+
                                           ' AND tbl_customer_invoice.inv_is_paid = 0 '+
                                           ' AND tbl_manual_invoice.sir_id = '+sir_id+
                                           ' GROUP BY tbl_customer_invoice.inv_id';
            tx.executeSql(query_count_credit_sales, [], function(txst, results)
            {
                var total = 0;
                $.each(results.rows, function(key, val)
                {
                    get_cm_amount(val['credit_memo_id'],function(cm_amount)
                    {
                        total += roundNumber(val['inv_total_amount'] - cm_amount);
                        $(".credit-sales").html("Php "+ReplaceNumberWithCommas(total));
                    });
                });
            },
            onError); 

            var query_count_cash_sales = 'SELECT *, sum(tbl_customer_invoice.inv_overall_price) as cash_sales_total_amount FROM tbl_manual_invoice LEFT JOIN tbl_sir ON tbl_sir.sir_id = tbl_manual_invoice.sir_id LEFT JOIN tbl_customer_invoice ON tbl_customer_invoice.inv_id = tbl_manual_invoice.inv_id LEFT JOIN tbl_credit_memo ON tbl_credit_memo.cm_id = tbl_customer_invoice.credit_memo_id WHERE tbl_customer_invoice.is_sales_receipt = "1" and tbl_manual_invoice.sir_id = "'+sir_id+'" GROUP BY tbl_customer_invoice.inv_id';
            tx.executeSql(query_count_cash_sales, [], function(txsts, results_cash_sales)
            {           
                var data_result = results_cash_sales.rows;
                var total_amount = 0;
                $(data_result).each(function(key, datarow)
                {
                    var cm_amount = datarow['cm_amount'] != null ? datarow['cm_amount'] : 0;
                    total_amount += datarow['cash_sales_total_amount'] - cm_amount;
                });

                $(".cash-sales").html("Php "+ReplaceNumberWithCommas((total_amount).toFixed(2)));
            });

            var query_count_collection_sales = 'SELECT * FROM tbl_manual_receive_payment LEFT JOIN tbl_receive_payment ON tbl_receive_payment.rp_id = tbl_manual_receive_payment.rp_id WHERE tbl_manual_receive_payment.sir_id = "'+sir_id+'" GROUP BY tbl_receive_payment.rp_id';
            tx.executeSql(query_count_collection_sales, [], function(txst, results_collection)
            {       
                var data_result = results_collection.rows;
                var total_amount_collection = 0;
                $(data_result).each(function(key, datarow)
                {
                    total_amount_collection += datarow['rp_total_amount'];
                });
                $(".collection-sales").html("Php "+ReplaceNumberWithCommas((total_amount_collection).toFixed(2)));
            });

            var query_count_credit_memo = 'SELECT * FROM tbl_manual_credit_memo LEFT JOIN tbl_credit_memo ON tbl_credit_memo.cm_id = tbl_manual_credit_memo.cm_id WHERE tbl_manual_credit_memo.sir_id = "'+sir_id+'" GROUP BY tbl_credit_memo.cm_id';
            tx.executeSql(query_count_credit_memo, [], function(txst, results_cm)
            {
                var data_result = results_cm.rows;
                var total_amount_cm = 0;
                $(data_result).each(function(key, datarow)
                {
                    total_amount_cm += datarow['cm_amount'];
                });
                $(".credit-memo").html("Php "+ReplaceNumberWithCommas((total_amount_cm).toFixed(2)));
            });
        });
    }
}
function ReplaceNumberWithCommas(yourNumber)
{
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}
function click_action(action)
{
	db.transaction(function (tx)
    {
    	var query_check = 'SELECT selected_sir FROM tbl_agent_logon LIMIT 1';            
        tx.executeSql(query_check, [], function(txs, results)
        {
          	var sir_id = results.rows[0]['selected_sir'];
            var modal_content = "";
            if(action == "inventory")
            {
                get_sir_data(sir_id, function(sir_data)
                {
                    get_sir_inventory_item(sir_id, function(sir_item_row)
                    {

                        // GLOBALS FOR INVENTORY 
                        modal_content = '<div class="modal-header"> '+
                                        ' <button type="button" class="close" data-dismiss="modal">&times;</button> '+
                                        ' <h4 class="modal-title">SIR Inventory</h4> '+
                                        '</div>'+ 
                                        '<div class="modal-body add_new_package_modal_body clearfix"> '+ 
                                        '<div class="panel-body form-horizontal"> '+
                                        '<div class="form-group"> '+
                                        '<div class="col-md-6">  '+
                                        '<h3> SIR#'+sir_id+'</h3> '+ 
                                        '</div> '+
                                        '<div class="col-md-6">  '+
                                        '<h3>Plate Number: '+sir_data['plate_number']+'</h3> '+ 
                                        '</div> '+
                                        '</div> '+
                                        /* SIR INVENTORY TABLE */
                                        '<div class="form-group">' +
                                        '<div class="row clearfix draggable-container">'+
                                        '<div class="">'+
                                        '<div class="col-md-12">' +
                                            '<div class="row clearfix draggable-container ilr-container">' +
                                                '<div class="table-responsive">' +
                                                    '<div class="col-sm-12">' +
                                                        '<table class="digima-table">' +
                                                            '<thead >' +
                                                                '<tr>' +
                                                                    '<th style="width: 15px;" class="text-right">#</th>' +
                                                                    '<th style="width: 200px;">Product Name</th>' +
                                                                    '<th style="width: 200px;">Issued QTY</th>' +
                                                                    '<th style="width: 200px;">Sold QTY</th>' +
                                                                    '<th style="width: 200px;">Remaining QTY</th>' +
                                                                '</tr>' +
                                                            '</thead>' +
                                                            '<tbody class="item-list-inventory">'+
                                                            '</tbody >'+
                                                        '</table >'+
                                                    '</div> '+
                                                '</div> '+
                                            '</div> '+
                                        '</div> '+
                                        /* END INVENTORY TABLE */

                                        '</div> '+
                                        '</div>'+
                                        '<div class="modal-footer"></div>';


                        var trow = "";
                        $(sir_item_row).each(function(a,b)
                        {
                            get_rem_qty_count(sir_id, sir_item_row[a]['item_id'], function(remaining_qty)
                            {
                                get_sold_qty_count(sir_id, sir_item_row[a]['item_id'], function(sold_qty)
                                {
                                    unit_measurement_view(remaining_qty, sir_item_row[a]['item_id'],sir_item_row[a]['related_um_type'], function(um_remaining_qty)
                                    {
                                        unit_measurement_view(sold_qty, sir_item_row[a]['item_id'],sir_item_row[a]['related_um_type'], function(um_sold_qty)
                                        {
                                            var issued_qty = sir_item_row[a]['item_qty'] * sir_item_row[a]['um_qty'];
                                            unit_measurement_view(issued_qty, sir_item_row[a]['item_id'],sir_item_row[a]['related_um_type'], function(um_issued_qty)
                                            {
                                                trow = '<tr>' +                         
                                                '<td>'+(a+1)+'</td>' +
                                                '<td>'+sir_item_row[a]['item_name']+'</td>' +
                                                '<td>'+um_issued_qty +'</td>' +
                                                '<td>'+um_sold_qty+'</td>' +
                                                '<td>'+um_remaining_qty+'</td>';
                                                trow += '</tr>';

                                                $(".item-list-inventory").append(trow);
                                            });
                                        });
                                    });
                                });

                            });
                        });

                        $("#global_modal").modal('show');
                        $("#global_modal").find(".modal-dialog").addClass("modal-md");
                        $("#global_modal").find(".modal-content").html(modal_content);
                    });
                });
            }
			
        });
    });
}
function click_action_update(action)
{
    db.transaction(function (tx)
    {
        var query_check = 'SELECT selected_sir FROM tbl_agent_logon LIMIT 1';            
        tx.executeSql(query_check, [], function(txs, results)
        {
            var sir_id = results.rows[0]['selected_sir'];
            var modal_content = "";
            
            if(action == "reload")
            {
                modal_content = '<div class="modal-header"> '+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button> '+
                                '<h4 class="modal-title">Reload</h4>'+
                                '</div> '+
                                '<div class="modal-body add_new_package_modal_body clearfix">'+
                                '<div class="col-md-12"> '+
                                '<h3>Are you sure you want to <span class="action-span">'+action+'</span> SIR# <span class="sir-no-action">'+sir_id+'</span> ?</h3> '+
                                '</div>'+
                                '</div>'+
                                '<div class="modal-footer">'+
                                '<div class="col-md-6 col-xs-6">'+
                                '<button type="button" onclick="update_submit_reload('+sir_id+')" class="btn btn-custom-blue form-control">Yes</button>'+
                                '</div> '+
                                '<div class="col-md-6 col-xs-6">'+
                                '<button data-dismiss="modal" class="btn btn-def-white btn-custom-white form-control">No</button></div></div>';
            }
            if(action == "close_sir")
            {
                modal_content = '<div class="modal-header"> ' +
                        ' <button type="button" class="close" data-dismiss="modal">&times;</button> ' +
                        ' <h4 class="modal-title">Close SIR</h4></div> ' +
                        ' <div class="modal-body add_new_package_modal_body clearfix"> ' +
                        ' <div class="col-md-12"> ' +
                        ' <h3>Are you sure you want to <span class="action-span">Close </span> SIR# <span class="sir-no-action">'+sir_id+'</span> ?</h3> ' +
                        ' </div>'+
                        ' </div> ' +
                        ' <div class="modal-footer"> '+ 
                        '<div class="col-md-6 col-xs-6"> ' +
                        '<button type="button" onclick="reload_sir('+sir_id+')" class="btn btn-custom-blue form-control">Yes</button>'+
                        '</div>  <div class="col-md-6 col-xs-6"><button data-dismiss="modal" class="btn btn-def-white btn-custom-white form-control">No</button></div></div>';
            }

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
function account_settings()
{
    db.transaction(function (tx)
    {
        var query_check = 'SELECT * from tbl_agent_logon LIMIT 1';            
        tx.executeSql(query_check, [], function(tx, results_agent)
        {
            agent_id = results_agent.rows[0]['agent_id'];

            var query_check = 'SELECT * from tbl_employee LEFT JOIN tbl_position ON tbl_employee.position_id = tbl_position.position_id where employee_id = "'+agent_id+'" ';   

            var modal_content = '';         
            tx.executeSql(query_check, [], function(tx, results)
            {
                data_result = results.rows[0];

                modal_content += '<div class="modal-header">';
                modal_content += '<button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title layout-modallarge-title item_title">Edit Agent</h4>';
                modal_content += '</div>';
                modal_content += '<div class="modal-body modallarge-body-layout background-white form-horizontal menu_container">';
                modal_content += '<div class="panel-body form-horizontal">';
                modal_content += '<div class="form-group">';
                modal_content += '<div class="col-md-4">';
                modal_content += '<label>Last Name *</label>';
                modal_content += '<input type="text" class="form-control" value="'+data_result['last_name']+'" placeholder="Last Name..." name="last_name">';
                modal_content += '</div>';
                modal_content += '<div class="col-md-4">';
                modal_content += '<label>First Name *</label>';
                modal_content += '<input type="text" class="form-control" value="'+data_result['first_name']+'" name="first_name" placeholder="First Name..." id="warehouse_name">';
                modal_content += '</div>';

                modal_content += '<div class="col-md-4">';
                modal_content += '<label>Middle Name *</label>';
                modal_content += '<input type="text" class="form-control" value="'+data_result['middle_name']+'" placeholder="Middle Name..." name="middle_name" id="warehouse_name">';
                modal_content += '</div>';
                modal_content += '</div>';

                modal_content += '<div class="form-group">';
                modal_content += '<div class="col-md-12">';
                modal_content += '<label>Email Address</label>';
                modal_content += '<input type="text" class="form-control" name="email_address" value="'+data_result['email']+'">';
                modal_content += '</div>';

                modal_content += '<div class="col-md-6">';
                modal_content += '<label>Username</label>';
                modal_content += '<input type="text" class="form-control" name="username" value="'+data_result['username']+'">';
                modal_content += '</div>';

                modal_content += '<div class="col-md-6">';
                modal_content += '<label>Password</label>';
                modal_content += '<input type="password" class="form-control" name="password" value="'+data_result['password']+'">';
                modal_content += '</div>';
                modal_content += '</div>';

                modal_content += '</div>';
                modal_content += '</div>';
                modal_content += '<div class="modal-footer" >';
                modal_content += '<button type="button" class="btn btn-custom-white" data-dismiss="modal">Cancel</button>';
                modal_content += '<button class="btn btn-custom-primary btn-save-modallarge" type="button" onclick="update_agent('+agent_id+')" data-url="">Update Agent</button>';
                modal_content += '</div>';

                $("#global_modal").modal('show');
                $("#global_modal").find(".modal-dialog").addClass("modal-md");
                $("#global_modal").find(".modal-content").html(modal_content);
            });
        });
    });
}
function update_agent(agent_id)
{
    alert(agent_id);
}