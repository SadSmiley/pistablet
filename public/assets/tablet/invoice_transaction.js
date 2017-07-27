var invoice_transaction = new invoice_transaction();
var db = openDatabase("my168shop", "1.0", "Address Book", 200000); 
var query = "";
var dataset_from_browser = null; 
var sir_id = "";  
function invoice_transaction()
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
            tx.executeSql(query_check, [], function(txs, results)
            {
            	data_result = results.rows;

				$(".sir-no").html(data_result[0]['sir_id']);
				sir_id = data_result[0]['sir_id'];

                var query_check_shop = 'SELECT shop_id FROM tbl_sir where sir_id = "'+sir_id+'"';
                tx.executeSql(query_check_shop, [], function(txs, results_sir)
                {
                    var shop_id = results_sir.rows[0]['shop_id'];

                    // FUNCTION HERE
                    get_data_for_invoice_transaction(sir_id, shop_id);
                });
            });        	
        });
	}  

    this.get_adding_item_modal = function(item_id, sir_id)
    {
        get_adding_item_modal(item_id, sir_id);
    }
    this.get_adding_cm_item_modal = function(item_id, sir_id)
    {
        get_adding_cm_item_modal(item_id, sir_id);        
    }
    function get_adding_cm_item_modal(item_id, sir_id)
    {
        alert(item_id);
    }
    function get_adding_item_modal(item_id, sir_id)
    {
        db.transaction(function (tx)
        {
            var query_item = 'SELECT * FROM tbl_sir_item LEFT JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id  WHERE tbl_sir_item.item_id = "'+item_id+'" and tbl_sir_item.sir_id = "'+sir_id+'"';
            tx.executeSql(query_item, [], function(txs, results_item)
            {
                var datarow = results_item.rows[0];

                // related_um_type
                var query_um = 'SELECT * FROM tbl_unit_measurement_multi where multi_id = "'+datarow['related_um_type']+'"';
                tx.executeSql(query_um, [], function(txs, results_um)
                {
                    var datarow_um = results_um.rows[0];

                    var query_um_multi = 'SELECT * FROM tbl_unit_measurement_multi where multi_um_id = "'+datarow_um['multi_um_id']+'"';
                    tx.executeSql(query_um_multi, [], function(txs, results_um_multi)
                    {

                        var datarow_um_multi = results_um_multi.rows;

                        var modal_content = "";

                        modal_content += '<div class="modal-header">';
                        modal_content += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
                        modal_content += '<h4 class="modal-title tablet-item-name">'+datarow['item_name']+'</h4>';
                        modal_content += '</div>';
                        modal_content += '<div class="modal-body add_new_package_modal_body clearfix">';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<input type="hidden" name="item_id" class="tablet-item-id" value="'+datarow['item_id']+'">';
                        modal_content += '<h4> U/M </h4>';
                        modal_content += '</div>';
                        modal_content += '<div class="col-xs-8">';

                        /* UNIT OF MEASUREMENT HERE (SELECT) */
                        modal_content += '<select class="1111 tablet-droplist-um form-control tablet-item-um">';

                        var option = "";
                        $(datarow_um_multi).each(function(a,b)
                        {
                            option += '<option value="'+datarow_um_multi[a]['multi_id']+'"  abbrev="'+datarow_um_multi[a]['multi_abbrev']+'" qty="'+datarow_um_multi[a]['unit_qty']+'">'+datarow_um_multi[a]['multi_name']+'</option>';
                        });
                        modal_content += option;
                        modal_content += '</select>';


                        modal_content += '</div>';
                        modal_content += ' </div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Quantity </h4>';
                        modal_content += '</div>';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="text" class="form-control input-sm text-right number-input tablet-item-qty tablet-compute" value="1" name="invline_qty">';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Rate </h4>';
                        modal_content += ' </div>';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="hidden" name="" class="tablet-price-per-item" value="'+datarow['sir_item_price']+'">';
                        modal_content += '<input type="text" style="text-align: right; border: 0;border-bottom: 1px solid #000;outline: 0;" class="form-control input-sm tablet-item-rate tablet-compute number-input" name="invline_rate" value="'+(datarow['sir_item_price']).toFixed(2)+'">';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Discount </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="text" class="form-control text-right input-sm tablet-item-disc tablet-compute" name="">';
                        modal_content += '</div>';
                        modal_content += '</div>';


                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Remark </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-8">';
                        modal_content += '<input type="text" class="form-control input-sm tablet-item-remark">';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-4">';
                        modal_content += '<h4> Amount </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-8 text-right">';
                        modal_content += '<input type="hidden" class="form-control input-sm input-item-amount">';
                        modal_content += '<h3 class="tablet-item-amount"></h3>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-12">';
                        modal_content += '<h4> Description </h4>';
                        modal_content += '</div>        ';
                        modal_content += '<div class="col-xs-12">';
                        modal_content += '<textarea class="form-control input-sm tablet-item-desc">'+datarow['item_sales_information']+'</textarea>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="form-group clearfix row">';
                        modal_content += '<div class="col-xs-12">';
                        modal_content += '<label><input type="checkbox" name="taxable" class="tablet-item-taxable"> <span>Taxable</span></label>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '</div>';
                        modal_content += '<div class="modal-footer">';
                        modal_content += '<div class="col-md-6 col-xs-6">';
                        modal_content += '<button data-dismiss="modal" class="btn btn-custom-white form-control">Cancel</button>';
                        modal_content += '</div>';
                        modal_content += '<div class="col-md-6 col-xs-6">';
                        modal_content += '<button class="btn btn-custom-blue form-control tablet-add-item">Done</button>';
                        modal_content += '</div>';
                        modal_content += '</div>';


                        $("#global_modal").modal('show');
                        $("#global_modal").find(".modal-dialog").addClass("modal-md");
                        $("#global_modal").find(".modal-content").html(modal_content);


                        tablet_customer_invoice.iniatilize_select();
                        tablet_customer_invoice.event_tablet_compute_class_change();
                        tablet_customer_invoice.action_compute_tablet();
                        tablet_customer_invoice.action_add_item_submit();
                        tablet_customer_invoice.action_add_cm_item_submit();

                    });
                });
            }); 
        });
    }
    function get_data_for_invoice_transaction(sir_id,shop_id)
    {
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * FROM tbl_customer_invoice where inv_shop_id = "'+shop_id+'" ORDER BY new_inv_id DESC LIMIT 1';
            tx.executeSql(query_check, [], function(txs, results_id)
            {
                $(".new-invoice-id").val(results_id.rows[0]['new_inv_id'] + 1);
            });

            var query_select_customer = 'SELECT * FROM tbl_customer WHERE archived = "0" and shop_id = "'+shop_id+'"';
            tx.executeSql(query_select_customer, [], function(txs, results_customer)
            {
                var data_result = results_customer.rows;
                var option = "";
                $(data_result).each(function(key, datarow)
                {
                    var customer_name = datarow['company'] != "" ? datarow['company'] : datarow['first_name'] +" "+datarow['middle_name']+" "+datarow['last_name']; 
                    option += '<option value="'+datarow['customer_id']+'" email="'+datarow['customer_id']+'">'+customer_name+'</option>';
                });
                $(".customer-select-list").html(option).globalDropList("reload");
            });
            var query_terms = 'SELECT * FROM tbl_terms WHERE archived = "0" and terms_shop_id = "'+shop_id+'"';
            tx.executeSql(query_terms, [], function(txs, results_terms)
            {
                var data_result_terms = results_terms.rows;
                var option = "";
                $(data_result_terms).each(function(key, datarow)
                {
                    option += '<option value="'+datarow['terms_id']+'" days="'+datarow['terms_no_of_days']+'">'+datarow['terms_name']+'</option>';
                });

                var today = new Date();
                $(".droplist-terms").html(option).globalDropList("reload");
                $(".inv-date-input").val((today.getMonth()+1) + "/" + today.getDate() + "/" +today.getFullYear());
                $(".inv-due-date-input").val((today.getMonth()+1) + "/" + today.getDate() + "/" +today.getFullYear());
            });

            var query_sir_item = 'SELECT * FROM tbl_sir_item LEFT JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id WHERE tbl_sir_item.sir_id = "'+sir_id+'"';
            tx.executeSql(query_sir_item, [], function(txs, results_sir_item)
            {
                var data_result_sir_item = results_sir_item.rows;
                var option = "";
                $(data_result_sir_item).each(function(key, datarow)
                {
                    option += '<option sir_id="'+sir_id+'" value="'+datarow['item_id']+'" item-sku="'+datarow['item_sku']+'" item-type="" sales-info="'+datarow['item_sales_information']+'" purchase-info="'+datarow['item_purchasing_information']+'" price="'+datarow['sir_item_price']+'" has-um="'+datarow['item_measurement_id']+'" >'+datarow['item_name']+'</option>';
                });
                $(".tablet-droplist-item").html(option).globalDropList("reload");
            });

            // CM ITEM
            var query_sir_cm_item = 'SELECT * FROM tbl_item LEFT JOIN tbl_category ON type_id = item_category_id WHERE is_mts = 1 AND tbl_item.archived = 0 AND shop_id = "'+shop_id+'" GROUP BY tbl_item.item_id';
            tx.executeSql(query_sir_cm_item, [], function(txs, results_cm_item)
            {
                var data_result_cm_item = results_cm_item.rows;
                var option = "";
                $(data_result_cm_item).each(function(key, datarow_cm)
                {
                    option += '<option sir_id="'+sir_id+'" value="'+datarow_cm['item_id']+'" item-sku="'+datarow_cm['item_sku']+'" item-type="" sales-info="'+datarow_cm['item_sales_information']+'" purchase-info="'+datarow_cm['item_purchasing_information']+'" price="'+datarow_cm['sir_item_price']+'" has-um="'+datarow_cm['item_measurement_id']+'" >'+datarow_cm['item_name']+'</option>';
                });
                $(".tablet-droplist-item-return").html(option).globalDropList("reload");
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

function getDateNow()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}