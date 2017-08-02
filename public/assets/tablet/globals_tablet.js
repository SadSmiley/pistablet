/** 
 * Open WEBSQL 
 */
var db = openDatabase("my168shop", "1.0", "Address Book", 200000); 
var query = "";
var dataset_from_browser = null;
var global_data = null;

/**
 * Agent Logout
 *
 * @param redirect (string)  Callback URL
 */
function agent_logout(redirect)
{
	db.transaction(function (tx) 
	{  
	   tx.executeSql('DELETE FROM tbl_agent_logon');

	   location.href=''+redirect+'';
	});
}
/**
 * Create All Table
 *
 * @param callback (function)  Function to be called after the process.
 */
function query_create_all_table(callback)
{
    var query = [];

    query[1] = "CREATE TABLE IF NOT EXISTS tbl_audit_trail ( audit_trail_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, remarks TEXT, old_data  NOT NULL, new_data NOT NULL, created_at DATETIME, updated_at DATETIME, source VARCHAR(255),source_id INTEGER, audit_shop_id INTEGER)";
    query[2] = "CREATE TABLE IF NOT EXISTS tbl_shop(shop_id INTEGER PRIMARY KEY AUTOINCREMENT,shop_key VARCHAR(255) NOT NULL, shop_date_created DATETIME NOT NULL default '1000-01-01 00:00:00', shop_date_expiration DATETIME NOT NULL default '1000-01-01 00:00:00',shop_last_active_date DATETIME NOT NULL default '1000-01-01 00:00:00',shop_status VARCHAR(50) NOT NULL default 'trial', shop_country INTEGER NOT NULL,shop_city VARCHAR(255) NOT NULL, shop_zip VARCHAR(255) NOT NULL, shop_street_address VARCHAR(255) NOT NULL,shop_contact VARCHAR(255) NOT NULL,url TEXT ,shop_domain VARCHAR(255) NOT NULL default 'unset_yet',shop_theme VARCHAR(255) NOT NULL default 'default',shop_theme_color VARCHAR(255) NOT NULL default 'gray',member_layout VARCHAR(255) NOT NULL default 'default',shop_wallet_tours INTEGER NOT NULL default '0', shop_wallet_tours_uri VARCHAR(255) default NULL,shop_merchant_school INTEGER NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[3] = "CREATE TABLE IF NOT EXISTS tbl_category (type_id INTEGER PRIMARY KEY AUTOINCREMENT, type_name VARCHAR(255) NOT NULL, type_parent_id INTEGER NOT NULL, type_sub_level TINYINT NOT NULL,type_shop INTEGER NOT NULL, type_category VARCHAR(255) NOT NULL default 'inventory', type_date_created DATETIME NOT NULL,archived TINYINT NOT NULL,is_mts TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[4] = "CREATE TABLE IF NOT EXISTS tbl_chart_account_type (chart_type_id INTEGER PRIMARY KEY AUTOINCREMENT,  chart_type_name VARCHAR(255) NOT NULL, chart_type_description VARCHAR(1000) NOT NULL, has_open_balance TINYINT NOT NULL, chart_type_category TINYINT NOT NULL, normal_balance VARCHAR(255) NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[5] = "CREATE TABLE IF NOT EXISTS tbl_chart_of_account (account_id INTEGER PRIMARY KEY AUTOINCREMENT,  account_shop_id INTEGER, account_type_id INTEGER,account_number VARCHAR(255), account_name VARCHAR(255), account_full_name VARCHAR(255), account_description VARCHAR(255), account_parent_id INTEGER NULl, account_sublevel INTEGER, account_balance REAL, account_open_balance REAL, account_open_balance_date DATE, is_tax_account TINYINT, account_tax_code_id INTEGER, archived TINYINT, account_timecreated DATETIME, account_protected TINYINT, account_code VARCHAR(255), created_at DATETIME, updated_at DATETIME)";
    query[6] = "CREATE TABLE IF NOT EXISTS tbl_country (country_id INTEGER PRIMARY KEY AUTOINCREMENT, country_code VARCHAR(255) NOT NULL, country_name VARCHAR(255) NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[7] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo (cm_id INTEGER PRIMARY KEY AUTOINCREMENT, cm_customer_id INTEGER NOT NULL, cm_shop_id INTEGER NOT NULL, cm_ar_acccount INTEGER NOT NULL,cm_customer_email VARCHAR(255)  NOT NULL, cm_date date NOT NULL, cm_message VARCHAR(255)  NOT NULL, cm_memo VARCHAR(255)  NOT NULL, cm_amount REAL NOT NULL, date_created DATETIME NOT NULL, cm_type TINYINT NOT NULL default '0', cm_used_ref_name VARCHAR(255) NOT NULL default 'returns', cm_used_ref_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[8] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo_line (cmline_id INTEGER PRIMARY KEY AUTOINCREMENT, cmline_cm_id INTEGER  NOT NULL, cmline_service_date datetime NOT NULL, cmline_um INTEGER NOT NULL, cmline_item_id INTEGER NOT NULL, cmline_description VARCHAR(255)  NOT NULL, cmline_qty INTEGER NOT NULL, cmline_rate REAL NOT NULL, cmline_amount REAL NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[9] = "CREATE TABLE IF NOT EXISTS tbl_customer (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER  NOT NULL, country_id INTEGER NOT NULL, title_name VARCHAR(100)  NOT NULL, first_name VARCHAR(255)  NOT NULL, middle_name VARCHAR(255)  NOT NULL, last_name VARCHAR(255)  NOT NULL, suffix_name VARCHAR(100)  NOT NULL, email VARCHAR(255)  NOT NULL, password text  NOT NULL, company VARCHAR(255)  default NULL, b_day date NOT NULL default '0000-00-00', profile VARCHAR(255)  default NULL, IsWalkin TINYINT NOT NULL, created_date date default NULL, archived TINYINT NOT NULL, ismlm INTEGER NOT NULL default '0', mlm_username VARCHAR(255)  default NULL, tin_number VARCHAR(255)  default NULL,  is_corporate TINYINT NOT NULL default '0', approved TINYINT NOT NULL default '1', created_at DATETIME, updated_at DATETIME)";
    query[10] = "CREATE TABLE IF NOT EXISTS tbl_customer_address (customer_address_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER  NOT NULL, country_id INTEGER  NOT NULL, customer_state VARCHAR(255)  NOT NULL, customer_city VARCHAR(255)  NOT NULL,  customer_zipcode VARCHAR(255)  NOT NULL, customer_street text  NOT NULL, purpose VARCHAR(255)  NOT NULL, archived TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[11] = "CREATE TABLE IF NOT EXISTS tbl_customer_attachment (customer_attachment_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER  NOT NULL, customer_attachment_path text  NOT NULL, customer_attachment_name VARCHAR(255)  NOT NULL, customer_attachment_extension VARCHAR(255)  NOT NULL, mime_type VARCHAR(255)  NOT NULL, archived TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[12] = "CREATE TABLE IF NOT EXISTS tbl_customer_invoice (inv_id INTEGER PRIMARY KEY AUTOINCREMENT, new_inv_id INTEGER NOT NULL, inv_shop_id INTEGER NOT NULL, inv_customer_id INTEGER NOT NULL, inv_customer_email VARCHAR(255)  NOT NULL, inv_customer_billing_address VARCHAR(255)  NOT NULL, inv_terms_id TINYINT NOT NULL, inv_date DATE NOT NULL, inv_due_date DATE NOT NULL, inv_message VARCHAR(255)  NOT NULL, inv_memo VARCHAR(255)  NOT NULL, inv_discount_type VARCHAR(255)  NOT NULL, inv_discount_value INTEGER NOT NULL, ewt REAL NOT NULL, taxable TINYINT NOT NULL, inv_subtotal_price REAL NOT NULL,  inv_overall_price REAL NOT NULL, inv_payment_applied REAL NOT NULL, inv_is_paid TINYINT NOT NULL, inv_custom_field_id INTEGER NOT NULL, date_created DATETIME NOT NULL, credit_memo_id INTEGER NOT NULL default '0', is_sales_receipt TINYINT NOT NULL, sale_receipt_cash_account INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[13] = "CREATE TABLE IF NOT EXISTS tbl_customer_invoice_line (invline_id INTEGER PRIMARY KEY AUTOINCREMENT, invline_inv_id INTEGER  NOT NULL, invline_service_date DATE NOT NULL, invline_item_id INTEGER NOT NULL, invline_description VARCHAR(255)  NOT NULL, invline_um INTEGER NOT NULL, invline_qty INTEGER NOT NULL, invline_rate REAL NOT NULL, taxable TINYINT NOT NULL, invline_discount REAL NOT NULL, invline_discount_type VARCHAR(255) NOT NULL, invline_discount_remark VARCHAR(255) NOT NULL, invline_amount REAL NOT NULL, date_created DATETIME NOT NULL, invline_ref_name VARCHAR(255)  NOT NULL, invline_ref_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[14] = "CREATE TABLE IF NOT EXISTS tbl_position (position_id INTEGER PRIMARY KEY AUTOINCREMENT, position_name VARCHAR(255)  NOT NULL, daily_rate decimal(8,2) NOT NULL, position_created DATETIME NOT NULL, archived TINYINT NOT NULL default '0', position_code VARCHAR(255)  NOT NULL, position_shop_id INTEGER  NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[15] = "CREATE TABLE IF NOT EXISTS tbl_truck (truck_id INTEGER PRIMARY KEY AUTOINCREMENT, plate_number VARCHAR(255)  NOT NULL, warehouse_id INTEGER  NOT NULL, date_created DATETIME NOT NULL, archived TINYINT NOT NULL default '0', truck_model VARCHAR(255)  NOT NULL, truck_kilogram decimal(8,2) NOT NULL, truck_shop_id INTEGER  NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[16] = "CREATE TABLE IF NOT EXISTS tbl_employee (employee_id INTEGER PRIMARY KEY AUTOINCREMENT,shop_id INTEGER  NOT NULL,  warehouse_id INTEGER  NOT NULL, first_name VARCHAR(255)  NOT NULL, middle_name VARCHAR(255)  NOT NULL, last_name VARCHAR(255)  NOT NULL, gender VARCHAR(255)  NOT NULL, email VARCHAR(255)  NOT NULL, username VARCHAR(255)  NOT NULL,  password text  NOT NULL, b_day DATE NOT NULL, position_id INTEGER  NOT NULL, date_created DATETIME NOT NULL, archived TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[17] = "CREATE TABLE IF NOT EXISTS tbl_image (image_id INTEGER PRIMARY KEY AUTOINCREMENT, image_path VARCHAR(255)  NOT NULL, image_key VARCHAR(255)  NOT NULL,  image_shop INTEGER  NOT NULL, image_reason VARCHAR(255)  NOT NULL default 'product', image_reason_id INTEGER NOT NULL, image_date_created DATETIME NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[18] = "CREATE TABLE IF NOT EXISTS tbl_item ( item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(255)  NOT NULL, item_sku VARCHAR(255)  NOT NULL, item_sales_information VARCHAR(255) NOT NULL, item_purchasing_information VARCHAR(255)  NOT NULL,  item_img VARCHAR(255)  NOT NULL, item_quantity INTEGER NOT NULL, item_reorder_point INTEGER NOT NULL, item_price REAL NOT NULL, item_cost REAL NOT NULL, item_sale_to_customer TINYINT NOT NULL, item_purchase_from_supplier TINYINT NOT NULL,  item_type_id INTEGER  NOT NULL, item_category_id INTEGER  NOT NULL, item_asset_account_id INTEGER  default NULL,  item_income_account_id INTEGER  default NULL, item_expense_account_id INTEGER  default NULL, item_date_tracked DATETIME default NULL, item_date_created DATETIME NOT NULL, item_date_archived DATETIME default NULL, archived TINYINT NOT NULL,  shop_id INTEGER  NOT NULL, item_barcode VARCHAR(255)  NOT NULL, has_serial_number TINYINT NOT NULL default '0',  item_measurement_id INTEGER  default NULL, item_vendor_id INTEGER NOT NULL default '0', item_manufacturer_id INTEGER  default NULL, packing_size VARCHAR(255)  NOT NULL, item_code VARCHAR(255)  NOT NULL, item_show_in_mlm INTEGER NOT NULL default '0', promo_price REAL NOT NULL, start_promo_date date NOT NULL, end_promo_date date NOT NULL, bundle_group TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[19] = "CREATE TABLE IF NOT EXISTS tbl_inventory_serial_number (serial_id INTEGER PRIMARY KEY AUTOINCREMENT, serial_inventory_id INTEGER  NOT NULL, item_id INTEGER  NOT NULL, serial_number VARCHAR(255)  NOT NULL, serial_created DATETIME NOT NULL,  item_count INTEGER NOT NULL, item_consumed TINYINT NOT NULL, sold TINYINT NOT NULL default '0', consume_source VARCHAR(255)  default NULL, consume_source_id INTEGER NOT NULL default '0', serial_has_been_credit VARCHAR(255)  default NULL,  serial_has_been_debit VARCHAR(255) default NULL, created_at DATETIME, updated_at DATETIME)";
    query[20] = "CREATE TABLE IF NOT EXISTS tbl_inventory_slip (inventory_slip_id INTEGER PRIMARY KEY AUTOINCREMENT,  inventory_slip_id_sibling INTEGER NOT NULL default '0', inventory_reason VARCHAR(255)  NOT NULL, warehouse_id INTEGER NOT NULL, inventory_remarks text  NOT NULL, inventory_slip_date DATETIME NOT NULL, archived TINYINT NOT NULL,  inventory_slip_shop_id INTEGER NOT NULL, slip_user_id INTEGER NOT NULL, inventory_slip_status VARCHAR(255)  NOT NULL,  inventroy_source_reason VARCHAR(255)  NOT NULL, inventory_source_id INTEGER NOT NULL, inventory_source_name VARCHAR(255)  NOT NULL, inventory_slip_consume_refill VARCHAR(255)  NOT NULL, inventory_slip_consume_cause VARCHAR(255)  NOT NULL,  inventory_slip_consumer_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[21] = "CREATE TABLE IF NOT EXISTS tbl_item_bundle (bundle_id INTEGER PRIMARY KEY AUTOINCREMENT, bundle_bundle_id INTEGER  NOT NULL,  bundle_item_id INTEGER  NOT NULL, bundle_um_id INTEGER  NOT NULL, bundle_qty REAL(8,2) NOT NULL, bundle_display_components REAL(8,2) NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[22] = "CREATE TABLE IF NOT EXISTS tbl_item_discount (item_discount_id INTEGER PRIMARY KEY AUTOINCREMENT, discount_item_id INTEGER  NOT NULL, item_discount_value REAL NOT NULL, item_discount_type VARCHAR(255)  NOT NULL default 'fixed',  item_discount_remark VARCHAR(255)  NOT NULL, item_discount_date_start DATETIME NOT NULL, item_discount_date_end DATETIME NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[23] = "CREATE TABLE IF NOT EXISTS tbl_item_multiple_price (multiprice_id INTEGER PRIMARY KEY AUTOINCREMENT,  multiprice_item_id INTEGER  NOT NULL, multiprice_qty INTEGER NOT NULL, multiprice_price REAL NOT NULL, date_created DATETIME NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[24] = "CREATE TABLE IF NOT EXISTS tbl_item_type ( item_type_id INTEGER PRIMARY KEY AUTOINCREMENT, item_type_name VARCHAR(255)  NOT NULL, archived TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[25] = "CREATE TABLE IF NOT EXISTS tbl_journal_entry (je_id INTEGER PRIMARY KEY AUTOINCREMENT, je_shop_id INTEGER  NOT NULL,  je_reference_module VARCHAR(255)  NOT NULL, je_reference_id INTEGER NOT NULL, je_entry_date DATETIME NOT NULL, je_remarks text  NOT NULL, created_at DATETIME NOT NULL default '0000-00-00 00:00:00', updated_at DATETIME NOT NULL default '0000-00-00 00:00:00')";
    query[26] = "CREATE TABLE IF NOT EXISTS tbl_journal_entry_line (jline_id INTEGER PRIMARY KEY AUTOINCREMENT, jline_je_id INTEGER  NOT NULL,  jline_name_id INTEGER NOT NULL, jline_name_reference VARCHAR(255)  NOT NULL, jline_item_id INTEGER  NOT NULL,  jline_account_id INTEGER  NOT NULL, jline_type VARCHAR(255)  NOT NULL, jline_amount REAL NOT NULL, jline_description text  NOT NULL, created_at DATETIME NOT NULL default '0000-00-00 00:00:00', updated_at DATETIME NOT NULL default '0000-00-00 00:00:00', jline_warehouse_id INTEGER NOT NULL default '0')";
    query[27] = "CREATE TABLE IF NOT EXISTS tbl_sir (sir_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_warehouse_id INTEGER NOT NULL,  truck_id INTEGER  NOT NULL, shop_id INTEGER  NOT NULL, sales_agent_id INTEGER  NOT NULL, date_created DATE NOT NULL, archived TINYINT NOT NULL default '0', lof_status TINYINT NOT NULL default '0', sir_status TINYINT NOT NULL, is_sync TINYINT NOT NULL default '0', ilr_status TINYINT NOT NULL default '0', rejection_reason TEXT NOT NULL, agent_collection REAL NOT NULL, agent_collection_remarks TEXT NOT NULL, reload_sir INTEGER NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[28] = "CREATE TABLE IF NOT EXISTS tbl_manual_invoice (manual_invoice_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NOT NULL, inv_id INTEGER  NOT NULL, manual_invoice_date DATETIME NOT NULL, is_sync TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[29] = "CREATE TABLE IF NOT EXISTS tbl_manual_receive_payment ( manual_receive_payment_id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER NOT NULL, rp_id INTEGER NOT NULL, sir_id INTEGER NOT NULL, rp_date DATETIME NOT NULL,  is_sync TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[30] = "CREATE TABLE IF NOT EXISTS tbl_manufacturer (manufacturer_id INTEGER PRIMARY KEY AUTOINCREMENT, manufacturer_name VARCHAR(255)  NOT NULL, manufacturer_address VARCHAR(255)  NOT NULL, phone_number VARCHAR(255)  NOT NULL, email_address VARCHAR(255)  NOT NULL, website text  NOT NULL, date_created DATETIME NOT NULL, date_updated DATETIME NOT NULL, archived TINYINT NOT NULL default '0', manufacturer_shop_id INTEGER  NOT NULL, manufacturer_fname VARCHAR(255)  NOT NULL,  manufacturer_mname VARCHAR(255)  NOT NULL, manufacturer_lname VARCHAR(255)  NOT NULL, manufacturer_image INTEGER default NULL, created_at DATETIME, updated_at DATETIME)";
    query[31] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment (rp_id INTEGER PRIMARY KEY AUTOINCREMENT, rp_shop_id INTEGER NOT NULL, rp_customer_id INTEGER NOT NULL, rp_ar_account INTEGER NOT NULL, rp_date date NOT NULL, rp_total_amount REAL(8,2) NOT NULL, rp_payment_method VARCHAR(255)  NOT NULL, rp_memo text  NOT NULL, date_created DATETIME NOT NULL, rp_ref_name VARCHAR(255)  NOT NULL, rp_ref_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[32] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment_line ( rpline_id INTEGER PRIMARY KEY AUTOINCREMENT, rpline_rp_id INTEGER  NOT NULL, rpline_reference_name VARCHAR(255)  NOT NULL, rpline_reference_id INTEGER NOT NULL, rpline_amount REAL(8,2) NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[33] = "CREATE TABLE IF NOT EXISTS tbl_settings ( settings_id INTEGER PRIMARY KEY AUTOINCREMENT, settings_key VARCHAR(255)  NOT NULL, settings_value longtext , settings_setup_done TINYINT NOT NULL default '0', shop_id INTEGER  NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[34] = "CREATE TABLE IF NOT EXISTS tbl_sir_cm_item (s_cm_item_id INTEGER PRIMARY KEY AUTOINCREMENT, sc_sir_id INTEGER  NOT NULL, sc_item_id INTEGER NOT NULL, sc_item_qty INTEGER NOT NULL, sc_physical_count INTEGER NOT NULL, sc_item_price REAL NOT NULL, sc_status INTEGER NOT NULL, sc_is_updated TINYINT NOT NULL, sc_infos REAL NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[35] = "CREATE TABLE IF NOT EXISTS tbl_sir_inventory ( sir_inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_item_id INTEGER  NOT NULL, inventory_sir_id INTEGER  NOT NULL, sir_inventory_count INTEGER NOT NULL, sir_inventory_ref_name VARCHAR(255)  NOT NULL, sir_inventory_ref_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[36] = "CREATE TABLE IF NOT EXISTS tbl_sir_item ( sir_item_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NOT NULL,  item_id INTEGER  NOT NULL, item_qty INTEGER NOT NULL, archived TINYINT NOT NULL default '0', related_um_type VARCHAR(255)  NOT NULL, total_issued_qty INTEGER NOT NULL default '0', um_qty INTEGER NOT NULL, sold_qty INTEGER NOT NULL, remaining_qty INTEGER NOT NULL, physical_count INTEGER NOT NULL, status VARCHAR(255)  NOT NULL, loss_amount decimal(8,2) NOT NULL, sir_item_price REAL NOT NULL, is_updated TINYINT NOT NULL default '0', infos REAL NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[37] = "CREATE TABLE IF NOT EXISTS tbl_sir_sales_report (sir_sales_report_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER NOT NULL, report_data TEXT NOT NULL, report_created DATETIME NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[38] = "CREATE TABLE IF NOT EXISTS tbl_terms (terms_id INTEGER PRIMARY KEY AUTOINCREMENT, terms_shop_id INTEGER NOT NULL,  terms_name VARCHAR(255)  NOT NULL, terms_no_of_days INTEGER NOT NULL , archived TINYINT NOT NULL, created_at DATETIME NOT NULL default '0000-00-00 00:00:00', updated_at DATETIME NOT NULL default '0000-00-00 00:00:00')";
    query[39] = "CREATE TABLE IF NOT EXISTS tbl_um ( id INTEGER PRIMARY KEY AUTOINCREMENT, um_name VARCHAR(255)  NOT NULL, um_abbrev VARCHAR(255)  NOT NULL, is_based TINYINT NOT NULL, um_shop_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[40] = "CREATE TABLE IF NOT EXISTS tbl_unit_measurement ( um_id INTEGER PRIMARY KEY AUTOINCREMENT, um_shop INTEGER  NOT NULL, um_name VARCHAR(255)  NOT NULL, is_multi TINYINT NOT NULL, um_date_created DATETIME NOT NULL, um_archived TINYINT NOT NULL, um_type INTEGER  NOT NULL, parent_basis_um INTEGER NOT NULL default '0', um_item_id INTEGER NOT NULL default '0',  um_n_base INTEGER NOT NULL, um_base INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[41] = "CREATE TABLE IF NOT EXISTS tbl_unit_measurement_multi (multi_id INTEGER PRIMARY KEY AUTOINCREMENT, multi_um_id INTEGER  NOT NULL, multi_name VARCHAR(255)  NOT NULL, multi_conversion_ratio REAL NOT NULL, multi_sequence TINYINT NOT NULL,  unit_qty INTEGER NOT NULL, multi_abbrev VARCHAR(255)  NOT NULL, is_base TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[42] = "CREATE TABLE IF NOT EXISTS tbl_user ( user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_email VARCHAR(255)  NOT NULL, user_level INTEGER NOT NULL, user_first_name VARCHAR(255)  NOT NULL, user_last_name VARCHAR(255)  NOT NULL, user_contact_number VARCHAR(255)  NOT NULL, user_password text  NOT NULL, user_date_created DATETIME NOT NULL default '1000-01-01 00:00:00', user_last_active_date DATETIME NOT NULL default '1000-01-01 00:00:00', user_shop INTEGER  NOT NULL,  IsWalkin TINYINT NOT NULL, archived TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
    query[43] = "CREATE TABLE IF NOT EXISTS tbl_manual_credit_memo (manual_cm_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NOT NULL, cm_id INTEGER NOT NULL, manual_cm_date DATETIME NOT NULL, is_sync TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[44] = "CREATE TABLE IF NOT EXISTS tbl_default_chart_account (default_id INTEGER PRIMARY KEY AUTOINCREMENT, default_type_id INTEGER, default_number INTEGER, default_name VARCHAR(255), default_description VARCHAR(255) , default_parent_id INTEGER NOT NULL, default_sublevel INTEGER NOT NULL, default_balance REAL NOT NULL, default_open_balance REAL NOT NULL, default_open_balance_date date NOT NULL, is_tax_account TINYINT NOT NULL, account_tax_code_id INTEGER NOT NULL, default_for_code VARCHAR(255) , account_protected TINYINT NOT NULL,created_at DATETIME, updated_at DATETIME)";
    query[45] = "CREATE TABLE IF NOT EXISTS tbl_timestamp (timestamp_id INTEGER PRIMARY KEY AUTOINCREMENT, table_name VARCHAR(255), timestamp DATETIME)";
    query[46] = "CREATE TABLE IF NOT EXISTS tbl_agent_logon (login_id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER, selected_sir INTEGER NULL, date_login DATETIME)";

    var total = query.length;
    var ctr = 1;

    query.forEach(function(single_query) 
    {
        create_tbl_name(single_query, function()
    	{
    		ctr++;

	        /* Done */
	        if (ctr === total) 
	        {
	            callback();
	        }   
    	});
    });
}
/**
 * Create Table
 *
 * @query (array)        Should be only one array without index.
 * @callback (function)  Function to be called after the process.
 */
function create_tbl_name(query, callback)
{
	db.transaction(function (tx)
	{ 
		tx.executeSql(query,[],
		function(txt, result)
		{
			console.log(result);
			callback();
		},
		onError);
	});
}
/**
 * Insert Query
 *
 * @param query (array)        Should be in array with index.
 * @param callback (function)  Function to be called after the process.
 */
function insert_query(query, callback)
{
    var total = query.length;
    var ctr = 1;

    query.forEach(function(single_query) 
    {
        db.transaction(function (tx)
        { 
            tx.executeSql(single_query,[],
            function(txt, result)
            {
                console.log(result);
                
                ctr++;

                if (total === ctr) 
                {
                    callback();
                }
            },
            onError);
        });
    });
}
/**
 * Insert Query
 *
 * @param callback (function)  Function to be called after the process.
 */
function get_shop_id(callback)
{
    db.transaction(function (tx)
    {
        var query_check = 'SELECT * from tbl_agent_logon LIMIT 1';            
        tx.executeSql(query_check, [], function(tx, results)
        {
            if(results.rows.length <= 0)
            {
                alert("Some error occurred. Currently not logged in.")
            }
            else
            {
                var agent_id = results.rows[0].agent_id;
                if (agent_id) 
                {
                    db.transaction(function(tx)
                    {
                        var query_check = 'SELECT * from tbl_employee WHERE employee_id = ' + agent_id + ' LIMIT 1';
                        tx.executeSql(query_check, [], function(tx, results)
                        {
                            if (results.rows.length <= 0) 
                            {
                                alert("Some error occurred. Employee not found.");
                            }     
                            else
                            {
                                callback(results.rows[0].shop_id);
                            }
                        },
                        onError);
                    });
                }
            }
        },
        onError);
    });
}
/**
 * Get All Customers
 *
 * @param query (array)        Should be in array with index.
 * @param callback (function)  Function to be called after the process.
 */
function get_all_customers(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * FROM tbl_customer '+
                              'LEFT JOIN tbl_customer_address ON tbl_customer.customer_id = tbl_customer_address.customer_id '+
                              'WHERE shop_id = '+shop_id+' AND tbl_customer.archived = 0 '+
                              'GROUP BY tbl_customer.customer_id';            
            tx.executeSql(query_check, [], function(tx, results)
            {
                callback(results.rows);
            },
            onError);
        });
    });
}

/**
 * Get All Chart of Accounts
 *
 * @param query (array)        Should be in array with index.
 * @param callback (function)  Function to be called after the process.
 */
function get_all_coa(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function (tx)
        {
            // $query = Tbl_chart_of_account::accountInfo($shop)->balance()->where("account_parent_id", $parent_id)->where("account_sublevel", $sublevel)->orderBy("chart_type_id");
            var query_check = 'SELECT * FROM tbl_chart_of_account '+
                              'INNER JOIN tbl_chart_account_type on account_type_id = chart_type_id '+
                              'WHERE tbl_chart_of_account.account_shop_id = '+shop_id;         
            
            tx.executeSql(query_check, [], function(tx, results)
            {
                callback(results.rows);
            },
            onError);
        });
    });
}

function get_cm_amount(cm_id, callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * FROM tbl_credit_memo'+
                              ' WHERE cm_id = '+ cm_id         
            tx.executeSql(query_check, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    if(results.rows[0]["cm_amount"])
                    {
                        callback(results.rows[0]["cm_amount"]);
                    }
                    else
                    {
                        callback(0);                    
                    }                    
                }
                else
                {
                    callback(0);                    
                }    
            },
            onError);
        });
    });
}
function get_sir_data(sir_id, callback)
{
    db.transaction(function (tx)
    {
        var query_sir = 'SELECT * FROM tbl_sir ' +
                        'LEFT JOIN tbl_truck ON tbl_truck.truck_id = tbl_sir.truck_id ' + 
                        'LEFT JOIN tbl_employee ON tbl_employee.employee_id = tbl_sir.sales_agent_id ' + 
                        'WHERE tbl_sir.sir_id = ' + sir_id + ' ' +
                        'AND tbl_sir.archived = 0 ' +
                        'AND tbl_sir.sir_status = 1';
        tx.executeSql(query_sir, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]);
            }
        },
        onError);
    });
}
function get_sir_inventory_item(sir_id, callback)
{
    db.transaction(function (tx)
    {
        var query_sir_item = 'SELECT * FROM tbl_sir_item ' +
                        'LEFT JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id ' + 
                        'LEFT JOIN tbl_category ON tbl_category.type_id = tbl_item.item_category_id ' + 
                        'WHERE tbl_sir_item.sir_id = ' + sir_id;
        tx.executeSql(query_sir_item, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows);
            }
        },
        onError);
    });
}
function get_rem_qty_count(sir_id, item_id, callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT sum(sir_inventory_count) as remaining_qty FROM tbl_sir_inventory ' +
                        'WHERE inventory_sir_id = ' + sir_id + ' ' + 
                        'AND sir_item_id = ' + item_id + ' ' +
                        'AND sir_inventory_ref_name != "credit_memo"';
        tx.executeSql(query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['remaining_qty']);
            }
            else
            {
                callback(0);
            }
        },
        onError);
    });
}
function get_sold_qty_count(sir_id, item_id, callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT sum(sir_inventory_count) as sold_qty FROM tbl_sir_inventory ' +
                        'WHERE inventory_sir_id = ' + sir_id + ' ' + 
                        'AND sir_item_id = ' + item_id + ' ' +
                        'AND sir_inventory_count <= 0 '
                        'AND sir_inventory_ref_name != "credit_memo"';
        tx.executeSql(query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(Math.abs(results.rows[0]['sold_qty']));
            }
            else
            {
                callback(0);
            }
        },
        onError);
    });
}
function unit_measurement_view(qty, item_id, um_issued_id, callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT item_measurement_id FROM tbl_item WHERE item_id = ' + item_id;
        tx.executeSql(query, [], function(tx, results)
        {
            /* */
        },
        onError);
    });
}
function get_um_qty(um_id)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT unit_qty FROM tbl_unit_measurement_multi WHERE multi_id = ' + um_id;
        tx.executeSql(query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['unit_qty']);
            }
            else
            {
                callback();
            }
        },
        onError);
    });
}
/* On ERROR */
function onError(tx, error)
{
    console.log(error.message);
}