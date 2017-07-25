var customer_list = new customer_list();
var db = openDatabase("my168shop", "1.0", "Address Book", 200000); 
var query = "";
var dataset_from_browser = null; 
function customer_list()
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
        	var query_check = 'SELECT * from tbl_sir where sales_agent_id = "'+agent_id+'" AND lof_status IN ("1","2") AND sir_status IN ("0","1")';
        	var sir_id = "";       
            tx.executeSql(query_check, [], function(txs, results)
            {
            	data_result = results.rows;
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

                get_receive_payment_list(sir_id);           
            });        	
        });
	}
    function get_receive_payment_list(sir_id)
    {
        db.transaction(function (tx)
        {
            var query_check_sir = 'SELECT shop_id FROM tbl_sir where sir_id = "'+sir_id+'"';
            tx.executeSql(query_check_sir, [], function(txs, results_sir)
            {
                var shop_id = results_sir.rows[0]['shop_id'];
                var query_count_customer = 'SELECT * FROM tbl_customer where archived = 0 and shop_id = "'+shop_id+'"';
                tx.executeSql(query_count_customer, [], function(txst, results_customer)
                {
                    data_result = results_customer.rows;
                    var tr = "";
                    $(data_result).each(function(key, datarow)
                    {   
                        tr += '<tr><td>'+datarow['customer_id']+'</td>';
                        company = datarow['company'] == "" ? datarow['first_name'] +" "+ datarow['last_name'] : "" ;
                        tr += '<td>'+company+'</td>';
                        tr += '<td class="text-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-custom-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Action <span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-custom"><li><a href="/tablet/create_invoices/add?sir_id=&customer_id={{$customer->customer_id}}">Create Invoice</a></li><li><a href="/tablet/receive_payment/add?customer_id={{$customer->customer_id}}">Receive Payment</a></li> </ul></div></td>';
                        tr += '</tr>';
                    });
                    
                    $(".tbody-customer-list").append(tr);
                });

                
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
