var receive_payment_list = new receive_payment_list();
var db = openDatabase("my168shop", "1.0", "Address Book", 200000); 
var query = "";
var dataset_from_browser = null; 
function receive_payment_list()
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
            var query_collection_list = 'SELECT * FROM tbl_manual_receive_payment LEFT JOIN tbl_sir ON tbl_sir.sir_id = tbl_manual_receive_payment.sir_id LEFT JOIN tbl_receive_payment ON tbl_receive_payment.rp_id = tbl_manual_receive_payment.rp_id LEFT JOIN tbl_customer ON tbl_customer.customer_id = tbl_receive_payment.rp_customer_id WHERE tbl_manual_receive_payment.sir_id = "'+sir_id+'" GROUP BY tbl_receive_payment.rp_id';
            tx.executeSql(query_collection_list, [], function(txst, results)
            {
                console.log(results);
                data_result = results.rows;
                var tr = "";
                $(data_result).each(function(key, datarow)
                {   
                    tr += '<tr><td>'+datarow['rp_id']+'</td>';
                    company = datarow['company'] == "" ? datarow['first_name'] +" "+ datarow['last_name'] : datarow['company'] ;
                    tr += '<td>'+company+'</td>';
                    tr += '<td>'+ReplaceNumberWithCommas("Php "+(datarow['rp_total_amount']).toFixed(2))+'</td>';
                    tr += '<td class="text-center">'+
                          '<div class="btn-group">'+
                          '<button type="button" class="btn btn-sm btn-custom-white dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Action <span class="caret"></span></button>'+
                          '<ul class="dropdown-menu dropdown-menu-custom" style="left:auto;right:0">'+
                          '<li><a onClick="edit_rp('+datarow['rp_id']+')">Edit Payment</a></il>'+
                          '<li><a onClick="view_rp('+datarow['rp_id']+')">Payment Receipt</a></il>'+
                          '</ul></div></td>'
                    tr += '</tr>';
                });
                $(".tbody-collection-list").append(tr);
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
