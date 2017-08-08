/** 
 * Open WEBSQL 
 */
var db = openDatabase("my168shop", "1.0", "Address Book", 200000); 
var query = "";
var dataset_from_browser = null;
var global_data = null;


function get_session(label, callback)
{
    var return_value = sessionStorage.getItem(label);
    callback(return_value);
}
function set_session(label, value)
{
    sessionStorage.setItem(label, value);
}
function forget_session(label)
{
    sessionStorage.setItem(label, '');
}

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
    query[47] = "CREATE TABLE IF NOT EXISTS tbl_payment_method (payment_method_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER, payment_name VARCHAR(255),isDefault TINYINT,archived TINYINT)";

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

function get_sir_id(callback)
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
                selected_sir = results.rows[0].selected_sir;
                callback(selected_sir);
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
function get_all_terms(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function (tx)
        {
            var query_terms = 'SELECT * FROM tbl_terms WHERE archived = "0" and terms_shop_id = "'+shop_id+'"';
            tx.executeSql(query_terms, [], function(txs, results_terms)
            {
                callback(results_terms.rows);                
            });
        });
    });
}
function get_all_sir_item(callback)
{
    get_shop_id(function(shop_id)
    {
        get_sir_id(function(sir_id)
        {
            db.transaction(function (tx)
            {
                var query_sir_item = 'SELECT * FROM tbl_sir_item LEFT JOIN tbl_item ON tbl_item.item_id = tbl_sir_item.item_id WHERE tbl_sir_item.sir_id = "'+sir_id+'"';
                tx.executeSql(query_sir_item, [], function(txs, results_sir_item)
                {
                    callback(results_sir_item.rows);
                });
            });

        });
    });
}
function get_all_cm_item(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var query_sir_cm_item = 'SELECT * FROM tbl_item LEFT JOIN tbl_category ON type_id = item_category_id WHERE is_mts = 1 AND tbl_item.archived = 0 AND shop_id = "'+shop_id+'" GROUP BY tbl_item.item_id';
            tx.executeSql(query_sir_cm_item, [], function(txs, results_cm_item)
            {
                callback(results_cm_item.rows);
            });
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
                              ' WHERE cm_id = '+ cm_id;

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
function get_date_now()
{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
}

function post_one_journal_entries(callback)
{
    get_shop_id(function(shop_id)
    {
        /* Account Receivables */
        db.transaction(function (tx)
        {
            var account_receivable_query = 'SELECT * FROM tbl_chart_of_account '+
                              'INNER JOIN tbl_chart_account_type on account_type_id = chart_type_id '+
                              'INNER JOIN tbl_shop on shop_id = account_shop_id '+
                              'WHERE shop_id = '+shop_id+' '+
                              'and account_code = "accounting-receivable"';

            tx.executeSql(account_receivable_query, [], function(tx, results)
            {
                var account_receivable = [];

                $.each(results.rows, function(index, val) 
                {
                    account_receivable.push(val.account_id);
                });

                console.log("Account Receivables");
                console.log(account_receivable);
                
                // $account_payable    = Tbl_chart_of_account::accountInfo($shop_id)->where("account_code","accounting-payable")->pluck("account_id");
                
                /* Account Payable */
                db.transaction(function (tx)
                {
                    var account_payable_query = 'SELECT * FROM tbl_chart_of_account '+
                              'INNER JOIN tbl_chart_account_type on account_type_id = chart_type_id '+
                              'INNER JOIN tbl_shop on shop_id = account_shop_id '+
                              'WHERE shop_id = '+shop_id+' '+
                              'and account_code = "accounting-payable"';

                    tx.executeSql(account_payable_query, [], function(tx, results)
                    {
                        var account_payable = [];

                        $.each(results.rows, function(index, val) 
                        {
                            account_payable.push(val.account_id);
                        });

                        console.log("Account Receivables");
                        console.log(account_payable);

                        // $account_cash       = Accounting::getCashInBank();
                        // $exist_account = Tbl_chart_of_account::where("account_shop_id", Accounting::getShopId())->where("account_code", "accounting-cash-in-bank")->first();
                        
                        db.transaction(function (tx)
                        {
                            var account_cash_query = 'SELECT * FROM tbl_chart_of_account '+
                                              'WHERE account_shop_id = '+shop_id+
                                              ' and account_code = "accounting-cash-in-bank"';

                            tx.executeSql(account_cash_query, [], function(tx, results)
                            {
                                if(results.rows.length > 0)
                                {
                                    var account_cash = results.rows[0].account_id;
                                    callback(account_receivable, account_payable, account_cash);
                                }
                                else
                                {
                                    var insert_account_cash = {};

                                    insert_account_cash["account_shop_id"]          = shop_id;
                                    insert_account_cash["account_type_id"]          = 1;
                                    insert_account_cash["account_number"]           = "00000";
                                    insert_account_cash["account_name"]             = "Cash In Bank";
                                    insert_account_cash["account_description"]      = "Default Bank";
                                    insert_account_cash["account_protected"]        = 1;
                                    insert_account_cash["account_code"]             = "accounting-cash-in-bank";
                                    
                                    db.transaction(function (tx)
                                    {
                                        tx.executeSql(
                                            'INSERT INTO tbl_chart_of_account (account_shop_id, account_type_id, account_number, account_name, account_description, account_protected, account_code) VALUES '+
                                            '("'+insert_account_cash["account_shop_id"]+'", "'+insert_account_cash["account_type_id"]+'", "'+insert_account_cash["account_number"]+'", "'+insert_account_cash["account_name"]+'", "'+insert_account_cash["account_description"]+'", "'+insert_account_cash["account_protected"]+'", "'+insert_account_cash["account_code"]+'")',
                                            [],
                                            function(tx, results)
                                            {
                                                // alert('Returned ID: ' + results.insertId);
                                                var account_cash = results.insertId;
                                                callback(account_receivable, account_payable, account_cash);
                                            },
                                            onError
                                        );
                                    });
                                }
                            },
                            onError);
                        });

                        

                        // return $exist_account->account_id;
                    },
                    onError);
                });
            },
            onError);
        });
    });
}

function post_two_journal_entries(account_receivable, account_payable, account_cash)
{
    alert(account_receivable + " " + account_payable + " " + account_cash);
    // /* FOR OLD DATABASE - CHECKING IF THERE IS ALREADY AN ACCOUNT CODE*/
    // if(!$account_receivable)
    // {
    //     Tbl_chart_of_account::where("account_shop_id", $shop_id)->where("account_name", "Accounts Receivable")->update(['account_code'=>"accounting-receivable"]);
    //     $account_receivable = Tbl_chart_of_account::accountInfo($shop_id)->where("account_code","accounting-receivable")->pluck("account_id");
    // }
    // if(!$account_payable)
    // {
    //     Tbl_chart_of_account::where("account_shop_id", $shop_id)->where("account_name", "Accounts Payable")->update(['account_code'=>"accounting-payable"]);
    //     $account_payable    = Tbl_chart_of_account::accountInfo($shop_id)->where("account_code","accounting-payable")->pluck("account_id");
    // }
    // /* END */
    get_shop_id(function(shop_id)
    {
        if(!account_receivable)
        {
            // Tbl_chart_of_account::where("account_shop_id", $shop_id)->where("account_name", "Accounts Receivable")->update(['account_code'=>"accounting-receivable"]);
            db.transaction(function (tx)
            {
                var query1 = 'UPDATE tbl_chart_of_account '+
                             'SET account_code = "accounting-receivable" '+
                             'WHERE account_shop_id = '+shop_id+' '+
                             'and account_name = "Accounts Receivable"';

                tx.executeSql(query1, [], function(tx, results)
                {
                    // $query->join('tbl_chart_account_type','account_type_id','=','chart_type_id')
                    //   ->join('tbl_shop','shop_id','=','account_shop_id')
                    //   ->where( function ($where) use($shop)
                    //   {
                    //         $where->where("shop_id", $shop)
                    //               ->orWhere("shop_key", $shop);
                    //   });
                    // $account_receivable = Tbl_chart_of_account::accountInfo($shop_id)->where("account_code","accounting-receivable")->pluck("account_id");
                    
                    db.transaction(function (tx)
                    {
                        var query2 = 'SELECT * FROM tbl_chart_of_account '+
                                     'INNER JOIN tbl_chart_account_type on account_type_id = chart_type_id '+
                                     'INNER JOIN tbl_shop on shop_id = account_shop_id '+
                                     'WHERE shop_id = "'+shop_id+'" '+
                                     'and account_code = "accounting-receivable"';

                        tx.executeSql(query2, [], function(tx, results)
                        {
                            var account_receivable = results.rows[0].account_id; 

                            if(!$account_payable)
                            {
                                // Tbl_chart_of_account::where("account_shop_id", $shop_id)->where("account_name", "Accounts Payable")->update(['account_code'=>"accounting-payable"]);
                                // $account_payable    = Tbl_chart_of_account::accountInfo($shop_id)->where("account_code","accounting-payable")->pluck("account_id");
                            }
                        },
                        onError);
                    });
                },
                onError);
            });
        }
    });
}

function post_journal_entries($entry, $entry_data, $remarks = '')
{
    // $cm_journal = Accounting::postJournalEntry($entry, $entry_data);
    post_one_journal_entries(post_two_journal_entries);

        // /* IF THERE IS A SPECIFIED ACCOUNT ID FOR THE MAIN ACCOUNT (ACCOUNT THAT IS SELECTED IN THE TRANSACTION | OVERWRITE THE DEFAULT VALUE OF ACCOUNTS RECEIVABLE OR PAYABLE) */ /* !!!! FOR NOW IT IS FOR CASH ONLY */ 
        // if(isset($entry["account_id"]))
        // {
        //     $account_cash = $entry["account_id"];
        // }

        // /* INSERT JOURNAL ENTRY */
        // $journal_entry['je_shop_id']            = $shop_id;
        // $journal_entry['je_reference_module']   = $entry["reference_module"];
        // $journal_entry['je_reference_id']       = $entry["reference_id"];
        // $journal_entry['je_entry_date']         = carbon::now();
        // $journal_entry['je_remarks']            = $remarks;

        // /* CHECK IF THE TRANSACTION JOURNAL IS ALREADY EXIST - USE IF NEW OR UPDATE TRANSACTION */
        // $exist_journal = Tbl_journal_entry::where("je_reference_module", $journal_entry['je_reference_module'])->where("je_reference_id", $journal_entry['je_reference_id'])->first();

        // if(!$exist_journal)
        // {
        //     $journal_entry['created_at']    = carbon::now();
        //     $line_data["je_id"]             = Tbl_journal_entry::insertGetId($journal_entry);
        // }
        // else
        // {
        //     unset($journal_entry['je_entry_date']);
        //     $journal_entry['updated_at']    = carbon::now();
        //     Tbl_journal_entry_line::where("jline_je_id", $exist_journal->je_id)->delete();
        //     Tbl_journal_entry::where("je_id", $exist_journal->je_id)->update($journal_entry);
        //     $line_data["je_id"] = $exist_journal->je_id;
        // }

        // $line_data["item_id"]               = '';
        // if(isset($entry["name_reference"])) $line_data["jline_name_reference"] = $entry["name_reference"];
        // else   $line_data["jline_name_reference"]   = Accounting::checkTransaction($entry["reference_module"])['name'];
        // $line_data["jline_name_id"]         = $entry["name_id"];

        // /* RECIVABLE OR PAYABLE OR CASH */
        // $main_account       = Accounting::checkTransaction($entry["reference_module"])['main_account'];
        // $newNormalBalance   = Accounting::checkTransaction($entry["reference_module"])['newNormalJournal'];
        // $newContraBalance   = Accounting::checkTransaction($entry["reference_module"])['newContraJournal'];

        // if($main_account == 'receivable' || $main_account == 'cash-r')
        // {
        //     if($main_account == 'receivable') $main_account_id = $account_receivable;
        //     elseif($main_account == 'cash-r') $main_account_id = $account_cash;

        //     $line_data["entry_amount"]  = $entry["total"];
        //     $line_data["entry_type"]    = Accounting::$newNormalBalance($main_account_id);
        //     $line_data["account_id"]    = $main_account_id;
        //     Accounting::insertJournalLine($line_data);

        //     /* DISCOUNT AS WHOLE */
        //     if(isset($entry["discount"]))
        //     {
        //         if($entry["discount"] > 0)
        //         {
        //             $line_data["entry_amount"]  = $entry["discount"];
        //             $line_data["entry_type"]    = Accounting::$newContraBalance(Accounting::getDiscountSale());
        //             $line_data["account_id"]    = Accounting::getDiscountSale();
        //             Accounting::insertJournalLine($line_data);
        //         }
        //     }

        //     /* VATABLE AS WHOLE */
        //     if(isset($entry["vatable"]))
        //     {
        //         if($entry["vatable"] > 0)
        //         {
        //             $line_data["entry_amount"]  = $entry["vatable"];
        //             $line_data["entry_type"]    = Accounting::$newNormalBalance(Accounting::getOutputVatPayable());
        //             $line_data["account_id"]    = Accounting::getOutputVatPayable();
        //             Accounting::insertJournalLine($line_data);
        //         }
        //     }

        //     /* EWT AS WHOLE */
        //     if(isset($entry["ewt"]))
        //     {
        //         if($entry["ewt"] > 0)
        //         {
        //             $line_data["entry_amount"]  = $entry["ewt"];
        //             $line_data["entry_type"]    = Accounting::$newNormalBalance(Accounting::getWitholdingTax());
        //             $line_data["account_id"]    = Accounting::getWitholdingTax();
        //             Accounting::insertJournalLine($line_data);
        //         }
        //     }
        // }
        // elseif($main_account == 'payable' || $main_account == 'cash-p')
        // {
        //     if($main_account == 'payable') $main_account_id = $account_payable;
        //     elseif($main_account == 'cash-p') $main_account_id = $account_cash;

        //     $line_data["entry_amount"]  = $entry["total"];
        //     $line_data["entry_type"]    = Accounting::$newNormalBalance($main_account_id);
        //     $line_data["account_id"]    = $main_account_id;
        //     Accounting::insertJournalLine($line_data);

        //     /* DISCOUNT AS WHOLE */
        //     if(isset($entry["discount"]))
        //     {
        //         if($entry["discount"] > 0)
        //         {
        //             $line_data["entry_amount"]  = $entry["discount"];
        //             $line_data["entry_type"]    = Accounting::$newContraBalance(Accounting::getDiscountPurchase());
        //             $line_data["account_id"]    = Accounting::getDiscountPurchase();
        //             Accounting::insertJournalLine($line_data);
        //         }
        //     }

        //     /* VATABLE AS WHOLE */
        //     if(isset($entry["vatable"]))
        //     {
        //         if($entry["vatable"] > 0)
        //         {
        //             $line_data["entry_amount"]  = $entry["vatable"];
        //             $line_data["entry_type"]    = Accounting::$newNormalBalance(Accounting::getOutputVatPayable());
        //             $line_data["account_id"]    = Accounting::getOutputVatPayable();
        //             Accounting::insertJournalLine($line_data);
        //         }
        //     }

        //     /* EWT AS WHOLE */
        //     if(isset($entry["ewt"]))
        //     {
        //         if($entry["ewt"] > 0)
        //         {
        //             $line_data["entry_amount"]  = $entry["ewt"];
        //             $line_data["entry_type"]    = Accounting::$newNormalBalance(Accounting::getWitholdingTax());
        //             $line_data["account_id"]    = Accounting::getWitholdingTax();
        //             Accounting::insertJournalLine($line_data);
        //         }
        //     }
        // }

        // foreach($entry_data as $entry_line)
        // {
        //     /* IF ITEM ID OR ACCOUNT ID */
        //     if(isset($entry_line["item_id"]))
        //     {
        //         $item = Tbl_item::where("item_id", $entry_line["item_id"])->first();
        //         $line_data["item_id"] = $entry_line["item_id"];

        //         /* GETTING CHART OF ACCOUNTS THAT TAGGED ON THE ITEM */
        //         $account_asset      = Tbl_item::where("item_id", $entry_line["item_id"])->pluck("item_asset_account_id");   //Inventory 
        //         $account_income     = Tbl_item::where("item_id", $entry_line["item_id"])->pluck("item_income_account_id");  //Sales
        //         $account_expense    = Tbl_item::where("item_id", $entry_line["item_id"])->pluck("item_expense_account_id"); //Cost of Good Sold
        //     }
        //     elseif(isset($entry_line["account_id"]))
        //     {
        //         $account = Tbl_chart_of_account::type()->where("account_id", $entry_line["account_id"])->first();
        //     }

        //     /* ENTRY DESCRIPTION */ 
        //     $line_data["entry_description"] = isset($entry_line["entry_description"]) ? $entry_line["entry_description"] : '';
            
        //     // if($item->item_type_id != 4) // ITEM IS NOT A BUNDLE
        //     // {
        //         switch($entry["reference_module"])
        //         {
        //             case "estimate": // NON-POSTING
        //                 break;
        //             case "sales-order": // NON-POSTING
        //                 break;
        //             case "mlm-product-repurchase":
        //             case "product-order":
        //             case "sales-receipt":
        //             case "invoice":
        //                 /* INCOME ACCOUNT */
        //                 $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                 $line_data["entry_type"]    = Accounting::normalBalance($account_income);
        //                 $line_data["account_id"]    = $account_income;
        //                 Accounting::insertJournalLine($line_data);

        //                 if($item->item_type_id == 1) // INVENTORY TYPE
        //                 {
        //                     /* EXPENSE ACCOUNT */
        //                     $line_data["entry_amount"]  = $item->item_cost;
        //                     $line_data["entry_type"]    = Accounting::normalBalance($account_expense);
        //                     $line_data["account_id"]    = $account_expense;
        //                     Accounting::insertJournalLine($line_data);

        //                     /* ASSET ACCOUNT */
        //                     $line_data["entry_amount"]  = $item->item_cost;
        //                     $line_data["entry_type"]    = Accounting::contraAccount($account_asset);
        //                     $line_data["account_id"]    = $account_asset;
        //                     Accounting::insertJournalLine($line_data);
        //                 }

        //                 if($entry_line["discount"] > 0)
        //                 {
        //                     $line_data["entry_amount"]  = $entry_line["discount"];
        //                     $line_data["entry_type"]    = Accounting::contraAccount(Accounting::getDiscountSale());
        //                     $line_data["account_id"]    = Accounting::getDiscountSale();
        //                     Accounting::insertJournalLine($line_data);
        //                 }

        //                 break;
        //             case "receive-payment":
        //                 /* CASH ACCOUNT - BANK */
        //                 $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                 $line_data["entry_type"]    = Accounting::normalBalance($account->account_id);
        //                 $line_data["account_id"]    = $account->account_id;
        //                 Accounting::insertJournalLine($line_data);
        //                 break;
        //             case "bill-payment":
        //                 /* CASH ACCOUNT - BANK */
        //                 $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                 $line_data["entry_type"]    = Accounting::contraAccount($account->account_id);
        //                 $line_data["account_id"]    = $account->account_id;
        //                 Accounting::insertJournalLine($line_data);
        //                 break;
        //             case "purchase-order": // NON-POSTING
        //                 break;
        //             case "write-check":
        //             case "bill":
        //                 if($item->item_type_id == 1) // INVENTORY TYPE
        //                 {
        //                     /* ASSET ACCOUNT */
        //                     $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                     $line_data["entry_type"]    = Accounting::normalBalance($account_asset);
        //                     $line_data["account_id"]    = $account_asset;
        //                     Accounting::insertJournalLine($line_data);
        //                 }
        //                 else
        //                 {
        //                     /* EXPENSE ACCOUNT */
        //                     $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                     $line_data["entry_type"]    = Accounting::normalBalance($account_expense);
        //                     $line_data["account_id"]    = $account_expense;
        //                     Accounting::insertJournalLine($line_data);
        //                 }
        //                 break;
        //             case "debit-memo":
        //                 if($item->item_type_id == 1) // INVENTORY TYPE
        //                 {
        //                     /* ASSET ACCOUNT */
        //                     $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                     $line_data["entry_type"]    = Accounting::contraAccount($account_asset);
        //                     $line_data["account_id"]    = $account_asset;
        //                     Accounting::insertJournalLine($line_data);
        //                 }
        //                 else
        //                 {
        //                     /* EXPENSE ACCOUNT */
        //                     $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                     $line_data["entry_type"]    = Accounting::contraAccount($account_expense);
        //                     $line_data["account_id"]    = $account_expense;
        //                     Accounting::insertJournalLine($line_data);
        //                 }
        //                 break;
        //                 break;
        //             case "credit-memo":
        //                 /* INCOME ACCOUNT */
        //                 $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                 $line_data["entry_type"]    = Accounting::contraAccount($account_income);
        //                 $line_data["account_id"]    = $account_income;
        //                 Accounting::insertJournalLine($line_data);

        //                 if($item->item_type_id == 1)
        //                 {
        //                     /* EXPENSE ACCOUNT */
        //                     $line_data["entry_amount"]  = $item->item_cost;
        //                     $line_data["entry_type"]    = Accounting::contraAccount($account_expense);
        //                     $line_data["account_id"]    = $account_expense;
        //                     Accounting::insertJournalLine($line_data);

        //                     /* ASSET ACCOUNT */
        //                     $line_data["entry_amount"]  = $item->item_cost;
        //                     $line_data["entry_type"]    = Accounting::normalBalance($account_asset);
        //                     $line_data["account_id"]    = $account_asset;
        //                     Accounting::insertJournalLine($line_data);
        //                 }
        //                 break;
        //             case "deposit":
        //                 /* OPENING BALANCE EQUITY */
        //                 $account ? $account : $account = Accounting::getOpenBalanceEquity();

        //                 $line_data["entry_amount"]  = $entry_line["entry_amount"];
        //                 $line_data["entry_type"]    = Accounting::normalBalance($account);
        //                 $line_data["account_id"]    = $account;
        //                 Accounting::insertJournalLine($line_data);
        //                 break;  
        //             // SO ON
        //         }
        //     // }
        // }

        // return $line_data["je_id"];
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
            var um_based_id = results.rows[0]['item_measurement_id'];

            get_um(um_based_id, um_issued_id, function(data_um_base, data_um_issued)
            {
                var return_value = "";
                if(data_um_base && data_um_issued == null)
                {
                    return_value = qty + " " +data_um_base['multi_abbrev'];
                }
                else if(um_based_id == um_issued_id)
                {
                    if(data_um_base && data_um_issued)
                    {
                        return_value = qty + " " +data_um_base['multi_abbrev'];
                    }
                    else
                    {
                        return_value = qty + " PC";
                    }
                }
                else if (data_um_base && data_um_issued)
                {
                    var issued_qty = 1;
                    var based_qty = 1;
                    if(data_um_issued)
                    {
                        issued_qty = data_um_issued["unit_qty"];
                    }
                    if(data_um_base)
                    {
                        based_qty = data_um_base["unit_qty"];
                    }

                    var issued_um = Math.floor(qty/issued_qty);
                    var each = Math.round(((qty/issued_qty) - Math.floor(qty/issued_qty)) * issued_qty)
                    return_value = issued_um +" " + data_um_issued["multi_abbrev"] + " & " + each + " " + data_um_base["multi_abbrev"];
                }
                else
                {
                    return_value = qty + " PC";
                }

                if(data_um_issued)
                {     
                    if(data_um_issued['is_base'] == 1)
                    {
                        return_value = qty+" "+data_um_issued['multi_abbrev'];
                    }
                }

                callback(return_value);
            });
        },
        onError);
    });
}
function get_um(um_based_id, um_issued_id, callback)
{
    db.transaction(function (tx)
    {
        var query_issued = 'SELECT * FROM tbl_unit_measurement_multi WHERE multi_id = ' + um_issued_id;
        tx.executeSql(query_issued, [], function(tx, results_um_issued)
        {
            var data_um_issued = results_um_issued.rows[0];
            var query_based = 'SELECT * FROM tbl_unit_measurement_multi WHERE multi_um_id = ' + um_based_id + ' AND is_base = 1';
            tx.executeSql(query_based, [], function(tx, results_um_based)
            {
                var data_um_based = results_um_based.rows[0];

                callback(data_um_based, data_um_issued);
            });
        },
        onError);
    });
}
function get_um_qty(um_id, callback)
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
                callback(0);
            }
        },
        onError);
    });
}
function check_sir_qty(sir_id, _item_id, _values, invoice_id, invoice_table, callback)
{
    var return_data = 0;
    var count_item = count(_item_id);
    var ctr = 0;
    $.each( _item_id,function(key, values)
    {
        ctr++;
        get_item_bundle(_values['invline_item_id'][key], function(bundle_item)
        {
            if(bundle_item.length > 0)
            {
                $.each(bundle_item, function(a,b)
                {
                    var count = bundle_item.length;
                    check_sir_qty(sir_id, b['bundle_item_id'], b['bundle_um_id'], qty * b['bundle_qty'],0,"", function(return_value)
                    {
                        return_data += return_value;
                        if((a + 1) == count)
                        {
                            callback(return_data)
                        }
                    });
                });
            }
            else
            {
                get_sir_inventory(sir_id,_values['invline_item_id'][key], _values['invline_um'][key], _values['invline_qty'][key].replace(',',""), invoice_id, function(return_value)
                {
                    return_data += return_value;
                    if(ctr == count_item)
                    {     
                       callback(return_data)
                    }
                });
            }
        });
    });

}
function get_sir_inventory(sir_id, item_id, um, qty, invoice_id, callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT sum(sir_inventory_count) as current_qty FROM tbl_sir_inventory WHERE inventory_sir_id = ' + sir_id + ' ' + 
                    'AND sir_item_id = ' + item_id;
        tx.executeSql(query, [], function(tx, dtrow_sir_inventory)
        {
            var sir_inventory = dtrow_sir_inventory.rows[0]['current_qty'];
            get_inv_qty(item_id, invoice_id, function(inv_qty)
            {
                var item_count = sir_inventory + inv_qty;

                get_um_qty(um, function(unit_qty)
                {
                    var new_invoice_qty = unit_qty * qty;

                    if(new_invoice_qty > item_count)
                    {
                        callback(1);
                    }
                    else
                    {
                        callback(0)
                    }
                });
            });
        },
        onError);
    });
}
function get_inv_qty(item_id,invoice_id,  callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT sum(sir_inventory_count) as inv_qty FROM tbl_sir_inventory WHERE sir_inventory_ref_name = "invoice" ' + 
                    ' AND sir_item_id = ' + item_id +
                    ' AND sir_inventory_ref_id = ' + invoice_id;
        tx.executeSql(query, [], function(tx, dtrow_inv_inventory)
        {
            if(dtrow_inv_inventory.rows[0]['inv_qty'])
            {   
                callback(Math.abs(dtrow_inv_inventory.rows[0]['inv_qty']));
            }
            else
            {
                callback(0);
            }
        },
        onError);
    });
}
function get_item_bundle(item_id, callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT *, (tbl_unit_measurement_multi.unit_qty * bundle_qty) as bundle_um_qty FROM tbl_item_bundle ' +
                    'LEFT JOIN tbl_unit_measurement_multi ON tbl_item_bundle.bundle_um_id = tbl_unit_measurement_multi.multi_um_id '+
                    'WHERE bundle_bundle_id = ' + item_id;
        tx.executeSql(query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows);
            }
            else
            {
                var return_value = {};
                callback(return_value);
            }
        },
        onError);
    });
}
function update_submit_reload(sir_id)
{
    db.transaction(function (tx)
    {
        var query = 'UPDATE tbl_sir SET reload_sir = 0 WHERE sir_id = ' + sir_id;
        tx.executeSql(query, [], function(tx, results)
        {
            toastr.success("Success");
            $("#global_modal").toggle("hide");
            location.reload();
        },
        onError);
    });
}
function get_item_returns(_cm_items_id, value_data, callback)
{
    var ctr = count(value_data['cmline_item_id']);
    var item_returns = {};
    var ctr_loop = 0;
    if(count(_cm_items_id) > 0)
    {     
        $.each(_cm_items_id, function(key, val)
        {        
            get_item_bundle(val, function(bundle_item)
            {
                get_um_qty(value_data['cmline_um'][key], function(um_qty)
                {
                    if(bundle_item.length > 0)
                    {
                        $.each(bundle_item, function(key_bundle,value_bundle)
                        {
                            item_returns["b"+key+value_bundle['bundle_item_id']]               = {};  
                            item_returns["b"+key+value_bundle['bundle_item_id']]['qty']        = (um_qty * value_data['cmline_qty'][key] * um_qty) * (value_bundle['bundle_um_qty'] * value_bundle['bundle_qty']);
                            item_returns["b"+key+value_bundle['bundle_item_id']]['item_id']    = value_bundle['bundle_item_id'];
                        });
                    }
                    else
                    {
                        if(value_data['cmline_item_id'][key])
                        {
                            item_returns[key]               = {};  
                            item_returns[key]['qty']        = um_qty * value_data['cmline_qty'][key];
                            item_returns[key]['item_id']    = value_data['cmline_item_id'][key];
                        }
                    }
                    ctr_loop++;
                    if(ctr_loop == ctr)
                    {
                        remove_parent_bundle(item_returns, _cm_items_id, function(item_returns_deleted)
                        {
                            callback(item_returns_deleted);
                        });
                    }
                });        
            });
        }); 
    }
    else
    {
        callback(item_returns);
    }
}
function remove_parent_bundle(item_returns, _cm_items_id, callback)
{
    var ctr_item_returns = count(item_returns);
    var ctr = 0;
    if(ctr_item_returns > 0)
    {
        $.each(item_returns, function(key,val)
        {
            var i = null;
            $.each(_cm_items_id, function(key_cm, val_cm)
            {
                get_item_bundle(val_cm, function(bundle_item)
                {
                    ctr++;
                    if(bundle_item.length > 0)
                    {
                        if(val['item_id'] == val_cm)
                        {
                            delete item_returns[key];
                        }
                    }
                    if(ctr == ctr_item_returns)
                    {
                        callback(item_returns);
                    }
                });
            });
        });
    }
    else
    {
        var return_value = {};
        callback(return_value);
    }
}
/* FUNCTION INVOICE */
function insert_invoice_submit(customer_info, item_info, callback)
{
    get_sir_id(function(sir_id)
    {
        get_subtotal(item_info, function(subtotal)
        {  
            get_discount_amount(customer_info, subtotal, function(discount)
            {
                get_tax(item_info, function(tax)
                {
                    var ewt = subtotal * roundNumber(customer_info['ewt']);

                    var overall_price = roundNumber(((subtotal - ewt) - discount) + tax);

                    get_shop_id(function(shop_id)
                    {
                        var insert_inv = {};
                        insert_inv['inv_shop_id']                   = shop_id;
                        insert_inv['inv_customer_id']               = customer_info['inv_customer_id'];
                        insert_inv['inv_customer_email']            = customer_info['inv_customer_email'];
                        insert_inv['new_inv_id']                    = customer_info['new_invoice_id'];
                        insert_inv['inv_customer_billing_address']  = customer_info['inv_customer_billing_address'];
                        insert_inv['inv_terms_id']                  = customer_info['inv_terms_id'];
                        insert_inv['inv_date']                      = customer_info['inv_date'];
                        insert_inv['inv_due_date']                  = customer_info['inv_due_date'];
                        insert_inv['inv_subtotal_price']            = subtotal;
                        insert_inv['ewt']                           = customer_info['ewt'];
                        insert_inv['inv_discount_type']             = customer_info['inv_discount_type'];
                        insert_inv['inv_discount_value']            = customer_info['inv_discount_value'];
                        insert_inv['taxable']                       = customer_info['taxable'];
                        insert_inv['inv_overall_price']             = customer_info['overall_price'];
                        insert_inv['inv_message']                   = customer_info['inv_message'];
                        insert_inv['inv_memo']                      = customer_info['inv_memo'];
                        insert_inv['date_created']                  = get_date_now();
                        insert_inv['created_at']                    = get_date_now();
                        insert_inv['is_sales_receipt']              = customer_info['is_sales_receipt'];
                        insert_inv['inv_payment_applied']           = 0;
                        insert_inv['sale_receipt_cash_account']     = 0;
                        insert_inv['credit_memo_id']                = 0;
                        insert_inv['inv_is_paid']                   = customer_info['inv_is_paid'];
                        insert_inv['inv_custom_field_id']           = 0;
                       
                       db.transaction(function (tx) 
                       {  
                            var insert_row = 'INSERT INTO tbl_customer_invoice (new_inv_id, inv_shop_id, inv_customer_id, inv_customer_email, inv_customer_billing_address, inv_terms_id, inv_date, inv_due_date, inv_message, inv_memo, inv_discount_type, inv_discount_value, ewt, taxable, inv_subtotal_price,  inv_overall_price, date_created, is_sales_receipt,credit_memo_id, sale_receipt_cash_account, inv_custom_field_id, inv_payment_applied, inv_is_paid, created_at)' + 
                                'VALUES ('+insert_inv['new_inv_id']+', '+insert_inv['inv_shop_id']+', '+insert_inv['inv_customer_id']+', "'+insert_inv['inv_customer_email']+'", "'+insert_inv['inv_customer_billing_address']+'", '+insert_inv['inv_terms_id']+', "'+insert_inv['inv_date']+'", "'+insert_inv['inv_due_date']+'", "'+insert_inv['inv_message']+'", "'+insert_inv['inv_memo']+'", "'+insert_inv['inv_discount_type']+'", '+insert_inv['inv_discount_value']+', '+insert_inv['ewt']+', '+insert_inv['taxable']+', '+insert_inv['inv_subtotal_price']+', '+insert_inv['inv_overall_price']+', "'+insert_inv['date_created']+'", '+insert_inv['is_sales_receipt']+', '+insert_inv['credit_memo_id']+', '+insert_inv['sale_receipt_cash_account']+', '+insert_inv['inv_custom_field_id']+', '+insert_inv['inv_payment_applied']+', '+insert_inv['inv_is_paid']+', "'+insert_inv['created_at']+'")';
                            tx.executeSql(insert_row, [], function(tx, results)
                            {
                               var invoice_id = results.insertId;
                               insert_inv_line(invoice_id, item_info, function(data)
                               {
                                    callback(invoice_id);
                               });
                            },
                            onError);
                        });
                    });
                });
            });
        });
    });
}
function insert_inv_line(invoice_id, item_info, callback)
{
    var ctr_item_info = count(item_info);
    var ctr = 0;
    $.each(item_info, function(key, value)
    {
        ctr++;
        /* DISCOUNT PER LINE */
        var discount = value['discount'];
        var discount_type = 'fixed';
        if(discount.indexOf('%') >= 0)
        {
            discount_type = 'percent';
            discount      = (parseFloat(discount.substring(0, discount.indexOf('%'))) / 100) * (roundNumber(value['rate']) * roundNumber(value['quantity']));
        }

        /* Amount Per Line */
        var amount = (roundNumber(value['rate']) * roundNumber(value['quantity'])) - discount;

        var insert_line = {};
        insert_line['invline_inv_id']             = invoice_id; 
        insert_line['invline_service_date']       = "0000-00-00 00:00:00"; 
        insert_line['invline_item_id']            = value['item_id'];
        insert_line['invline_description']        = value['item_description'];
        insert_line['invline_um']                 = value['um'];
        insert_line['invline_qty']                = value['quantity'];
        insert_line['invline_rate']               = value['rate'];
        insert_line['invline_discount']           = value['discount'];
        insert_line['invline_discount_type']      = discount_type;
        insert_line['invline_discount_remark']    = value['discount_remark'];
        insert_line['taxable']                    = value['taxable'];
        insert_line['invline_ref_name']           = value['ref_name'] == "" ? 'none' : value['ref_name'];
        insert_line['invline_ref_id']             = value['ref_id'] == "" ? 0 : value['ref_id'];
        insert_line['invline_amount']             = amount;
        insert_line['date_created']               = get_date_now();
        insert_line['created_at']                 = get_date_now();

        db.transaction(function (tx) 
        {
            var insertline_row = 'INSERT INTO tbl_customer_invoice_line ( '+
                                 ' invline_inv_id, '+
                                 ' invline_item_id, '+
                                 ' invline_service_date, '+
                                 ' invline_description, '+
                                 ' invline_um, '+
                                 ' invline_qty, '+
                                 ' invline_rate, '+
                                 ' taxable, '+
                                 ' invline_discount, '+
                                 ' invline_discount_type, '+
                                 ' invline_discount_remark, '+
                                 ' invline_amount, '+
                                 ' date_created, '+
                                 ' invline_ref_name, '+
                                 ' invline_ref_id, '+
                                 ' created_at)' + 
                                 ' VALUES ('+
                                 insert_line['invline_inv_id'] + ', ' +
                                 insert_line['invline_item_id'] + ', "' +
                                 insert_line['invline_service_date'] + '", "' +
                                 insert_line['invline_description'] + '", ' +
                                 insert_line['invline_um'] + ', ' +
                                 insert_line['invline_qty'] + ', ' +
                                 insert_line['invline_rate'] + ', ' +
                                 insert_line['taxable'] + ', "' +
                                 insert_line['invline_discount'] + '", "' +
                                 insert_line['invline_discount_type'] + '", "' +
                                 insert_line['invline_discount_remark'] + '", ' +
                                 insert_line['invline_amount'] + ', "' +
                                 insert_line['date_created'] + '", "' +
                                 insert_line['invline_ref_name'] + '", ' +
                                 insert_line['invline_ref_id'] + ', "' +
                                 insert_line['created_at'] + '"' +
                                 ')';
            tx.executeSql(insertline_row, [], function(tx, results)
            {
                if(ctr == ctr_item_info)
                {
                    callback("success");
                }
            },onError);
        });
    });

}
function insert_manual_invoice(invoice_id, callback)
{
    get_sir_id(function(sir_id)
    {
        db.transaction(function (tx) 
        {
            var insert_row = {};
            insert_row['sir_id'] = sir_id;
            insert_row['inv_id'] = invoice_id;
            insert_row['manual_invoice_date'] = get_date_now();
            insert_row['created_at'] = get_date_now();
            var insert_row_query = 'INSERT INTO tbl_manual_invoice (sir_id, inv_id, manual_invoice_date, created_at) ' +
                             ' VALUES ('+insert_row['sir_id']+', '+insert_row['inv_id']+',"'+insert_row['manual_invoice_date']+'", "'+insert_row['created_at']+'")';
            tx.executeSql(insert_row_query, [], function(tx, results)
            {
                if(results.insertId > 0)
                {
                    callback("success");
                }
            },
            onError);

        });

    });
}
function insert_manual_cm(cm_id, callback)
{
    get_sir_id(function(sir_id)
    {
        db.transaction(function(tx)
        {
            var insert_row = {};
            insert_row['sir_id'] = sir_id;
            insert_row['cm_id'] = cm_id;
            insert_row['manual_cm_date'] = get_date_now();
            insert_row['created_at'] = get_date_now();
            var insert_row_query = 'INSERT INTO tbl_manual_credit_memo (sir_id, cm_id, manual_cm_date, created_at) ' +
                             ' VALUES ('+insert_row['sir_id']+', '+insert_row['cm_id']+',"'+insert_row['manual_cm_date']+'", "'+insert_row['created_at']+'")';
            tx.executeSql(insert_row_query, [], function(tx, results)
            {
                if(results.insertId > 0)
                {
                    callback("success");
                }
            },
            onError);

        });
    });
}
function insert_sir_inventory(item_info, ref_name, ref_id, callback)
{
    get_sir_id(function(sir_id)
    {
        convert_array_item_info(item_info, function(new_item)
        {
            var insert_row = {};
            var ctr_item_info = count(item_info);
            var ctr = 0;
            var sign = 1;
            if(ref_name == 'invoice')
            {
                sign = -1;
            }
            $.each(new_item, function(key, value)
            {
                get_item_bundle(value['item_id'], function(bundle_item)
                {
                    if(bundle_item.length > 0)
                    {
                        ctr++;
                        $.each(bundle_item, function(key_bundle, value_bundle)
                        {
                            db.transaction(function(tx)
                            {                                
                                insert_row = {};
                                insert_row['inventory_sir_id'] = sir_id;
                                insert_row['sir_item_id'] = value_bundle['bundle_item_id'];
                                insert_row['sir_inventory_count'] = (value['qty'] * (value_bundle['bundle_um_qty'] * value_bundle['bundle_qty'])) * sign;
                                insert_row['sir_inventory_ref_name'] = ref_name;
                                insert_row['sir_inventory_ref_id'] = ref_id;

                                var insert_row = 'INSERT INTO tbl_sir_inventory (inventory_sir_id, sir_item_id, sir_inventory_count, sir_inventory_ref_name,sir_inventory_ref_id,created_at)' +
                                             'VALUES ('+
                                             insert_row['inventory_sir_id']+','+
                                             insert_row['sir_item_id']+','+
                                             insert_row['sir_inventory_count'] +',"'+
                                             insert_row['sir_inventory_ref_name']+'",'+
                                             insert_row['sir_inventory_ref_id']+',"'+value_row['created_at']+
                                             '")';
                                tx.executeSql(insert_row, [], function(tx, results)
                                {
                                },
                                onError);
                            });
                        });
                    }
                    else
                    {     
                        ctr++;                   
                        db.transaction(function(tx)
                        {
                            insert_row = {};
                            insert_row['inventory_sir_id'] = sir_id;
                            insert_row['sir_item_id'] = value['item_id'];
                            insert_row['sir_inventory_count'] = value['qty'] * sign;
                            insert_row['sir_inventory_ref_name'] = ref_name;
                            insert_row['sir_inventory_ref_id'] = ref_id;
                            insert_row['created_at'] = get_date_now();

                            var insert_row = 'INSERT INTO tbl_sir_inventory (inventory_sir_id, sir_item_id, sir_inventory_count, sir_inventory_ref_name,sir_inventory_ref_id,created_at)' +
                                         'VALUES ('+insert_row['inventory_sir_id']+','+insert_row['sir_item_id']+','+insert_row['sir_inventory_count']+',"'+insert_row['sir_inventory_ref_name']+'",'+insert_row['sir_inventory_ref_id']+',"'+insert_row['created_at']+'")';
                            tx.executeSql(insert_row, [], function(tx, results)
                            {
                            },
                            onError);
                        });
                    }

                    if(ctr == ctr_item_info)
                    {
                        callback("success");
                    }
                });
            });
        });
    });
}
function convert_array_item_info(item_info, callback)
{
    var ctr_item_info = count(item_info);
    var ctr = 0;
    var new_item = {};
    $.each(item_info, function(key, value)
    {
        ctr++;
        /* Function here */
        get_um_qty(value['um'], function(um_qty)
        {
            new_item[key] = {};
            new_item[key]['item_id'] = value['item_id'];
            new_item[key]['qty'] = um_qty * value['quantity'];

            if(ctr == ctr_item_info)
            {
                /* Callback here*/
                callback(new_item);
            }

        });
    });
}
function get_tax(item_info, callback)
{
    var sub = roundNumber(0);
    $.each(item_info, function(key, val)
    {
        if(val['taxable'] == 1)
        {
            sub += roundNumber(val['amount']);
        }
    });
    callback(roundNumber(sub * 0.12));
}
function get_discount_amount(customer_info, subtotal, callback)
{
    var discount = roundNumber(customer_info['inv_discount_value']);
    if(customer_info['inv_discount_type'] == 'percent')
    {
        discount = roundNumber((customer_info['inv_discount_value'] / 100) * subtotal);
    }
    callback(discount);
}
function get_subtotal(item_info, callback)
{
    var subtotal = roundNumber(0);
    $.each(item_info, function(key, val)
    {
        subtotal += roundNumber(val['amount']);
    });
    callback(subtotal);
}
function edit_invoice(inv_id)
{
    set_session('inv_id',inv_id);
    location.href = '../agent_transaction/invoice/invoice_transaction.html';
}
function get_invoice_data(inv_id, callback)
{
    get_shop_id(function (shop_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_customer_invoice '+
                               'LEFT JOIN (SELECT sum(rpline_amount) as amount_applied, rpline_reference_id FROM tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = '+shop_id+' and rpline_reference_name = "invoice" GROUP BY rpline_reference_id) ON rpline_reference_id = inv_id ' +
                               'WHERE tbl_customer_invoice.inv_id = ' + inv_id;
            tx.executeSql(select_query,[],function(tx2, results)
            {
                var inv = results.rows[0];

                var select_query_line = 'SELECT * FROM tbl_customer_invoice_line '+
                                        'LEFT JOIN tbl_item ON tbl_item.item_id = invline_item_id ' +
                                        'LEFT JOIN tbl_unit_measurement_multi ON multi_id = invline_um ' +
                                        'WHERE invline_inv_id = ' + inv_id;
                tx.executeSql(select_query_line,[],function(tx3, results_line)
                {
                    var _invline = results_line.rows;

                    var select_query_cmline = 'SELECT * FROM tbl_customer_invoice '+
                                              'LEFT JOIN tbl_credit_memo_line ON tbl_credit_memo_line.cmline_cm_id = tbl_customer_invoice.credit_memo_id ' +
                                              'LEFT JOIN tbl_item ON cmline_item_id = item_id ' +
                                              'LEFT JOIN tbl_unit_measurement_multi ON multi_id = cmline_um ' +
                                              'WHERE tbl_customer_invoice.inv_id = ' + inv_id;
                    tx.executeSql(select_query_cmline,[],function(tx4, results_cmline)
                    {
                        var _cmline = results_cmline.rows;

                        callback(inv, _invline, _cmline);
                    },
                    onError);
                },
                onError);
            },
            onError);
        });
    });
}
function update_invoice_submit(invoice_id, customer_info, item_info, callback)
{
    get_sir_id(function(sir_id)
    {
        get_subtotal(item_info, function(subtotal)
        {  
            get_discount_amount(customer_info, subtotal, function(discount)
            {
                get_tax(item_info, function(tax)
                {
                    var ewt = subtotal * roundNumber(customer_info['ewt']);

                    var overall_price = roundNumber(((subtotal - ewt) - discount) + tax);

                    get_shop_id(function(shop_id)
                    {
                        var update_inv = {};
                        update_inv['inv_shop_id']                   = shop_id;
                        update_inv['inv_customer_id']               = customer_info['inv_customer_id'];
                        update_inv['inv_customer_email']            = customer_info['inv_customer_email'];
                        update_inv['new_inv_id']                    = customer_info['new_invoice_id'];
                        update_inv['inv_customer_billing_address']  = customer_info['inv_customer_billing_address'];
                        update_inv['inv_terms_id']                  = customer_info['inv_terms_id'];
                        update_inv['inv_date']                      = customer_info['inv_date'];
                        update_inv['inv_due_date']                  = customer_info['inv_due_date'];
                        update_inv['inv_subtotal_price']            = subtotal;
                        update_inv['ewt']                           = customer_info['ewt'];
                        update_inv['inv_discount_type']             = customer_info['inv_discount_type'];
                        update_inv['inv_discount_value']            = customer_info['inv_discount_value'];
                        update_inv['taxable']                       = customer_info['taxable'];
                        update_inv['inv_overall_price']             = customer_info['overall_price'];
                        update_inv['inv_message']                   = customer_info['inv_message'];
                        update_inv['inv_memo']                      = customer_info['inv_memo'];
                        update_inv['date_created']                  = get_date_now();
                        update_inv['created_at']                    = get_date_now();
                        update_inv['is_sales_receipt']              = customer_info['is_sales_receipt'];
                        update_inv['inv_is_paid']                   = customer_info['inv_is_paid'];
                        update_inv['inv_custom_field_id']           = 0;
                       
                       db.transaction(function (tx) 
                       {  
                            var update_row = 'UPDATE tbl_customer_invoice SET (new_inv_id, inv_shop_id, inv_customer_id, inv_customer_email, inv_customer_billing_address, inv_terms_id, inv_date, inv_due_date, inv_message, inv_memo, inv_discount_type, inv_discount_value, ewt, taxable, inv_subtotal_price,  inv_overall_price, date_created, is_sales_receipt, inv_custom_field_id, inv_is_paid, created_at) ' + 
                                '= ('+update_inv['new_inv_id']+', '+update_inv['inv_shop_id']+', '+update_inv['inv_customer_id']+', "'+update_inv['inv_customer_email']+'", "'+update_inv['inv_customer_billing_address']+'", '+update_inv['inv_terms_id']+', "'+update_inv['inv_date']+'", "'+update_inv['inv_due_date']+'", "'+update_inv['inv_message']+'", "'+update_inv['inv_memo']+'", "'+update_inv['inv_discount_type']+'", '+update_inv['inv_discount_value']+', '+update_inv['ewt']+', '+update_inv['taxable']+', '+update_inv['inv_subtotal_price']+', '+update_inv['inv_overall_price']+', "'+update_inv['date_created']+'", '+update_inv['is_sales_receipt']+', '+update_inv['inv_custom_field_id']+', '+update_inv['inv_is_paid']+', "'+update_inv['created_at']+'") '+
                                'WHERE inv_id = ' + invoice_id ;
                            tx.executeSql(update_row, [], function(txt, results)
                            {
                                var delete_query = 'DELETE FROM tbl_customer_invoice_line where invline_inv_id = ' + invoice_id;
                                tx.executeSql(delete_query, [], function(txt2,res)
                                {
                                    delete_sir_inventory("invoice", invoice_id, function(res)
                                    {
                                       insert_inv_line(invoice_id, item_info, function(data)
                                       {
                                            callback(invoice_id);
                                       });
                                    });
                                },
                                onError);
                            },
                            onError);
                        });
                    });
                });
            });
        });
    });

}
/* END INVOICE*/
/* CM INSERT */
function insert_cm_submit(cm_customer_info, cm_item_info, item_returns, invoice_id, callback)
{
    get_shop_id(function(shop_id)
    {
        var insert_row = {};
        insert_row['cm_shop_id'] = shop_id;
        insert_row['cm_customer_id'] = cm_customer_info['cm_customer_id'];
        insert_row['cm_customer_email'] = cm_customer_info['cm_customer_email'];
        insert_row['cm_date'] = cm_customer_info['cm_date'];
        insert_row['cm_message'] = cm_customer_info['cm_message'];
        insert_row['cm_memo'] = cm_customer_info['cm_memo'];
        insert_row['cm_amount'] = cm_customer_info['cm_amount'];
        insert_row['cm_type'] = cm_customer_info['cm_type'] == 'returns' ? 0 : cm_customer_info['cm_type'];
        insert_row['date_created'] = get_date_now();
        insert_row['created_at'] = get_date_now();
        insert_row['cm_ar_acccount'] = 0;
        insert_row['cm_used_ref_name'] = cm_customer_info['cm_type'];
        insert_row['cm_used_ref_id'] = 0;

        db.transaction(function(tx)
        {
            var insert_query = 'INSERT INTO tbl_credit_memo (cm_shop_id, cm_customer_id, cm_customer_email, cm_date, cm_message, cm_memo, cm_amount, cm_type, date_created, created_at, cm_ar_acccount, cm_used_ref_name, cm_used_ref_id) ' +
                               ' VALUES ('
                               + insert_row['cm_shop_id'] + ',' 
                               + insert_row['cm_customer_id'] + ',"'
                               + insert_row['cm_customer_email'] + '","'
                               + insert_row['cm_date'] + '","'
                               + insert_row['cm_message'] + '","'
                               + insert_row['cm_memo'] + '",'
                               + insert_row['cm_amount'] + ','
                               + insert_row['cm_type'] + ',"'
                               + insert_row['date_created'] + '","'
                               + insert_row['created_at'] + '",'
                               + insert_row['cm_ar_acccount'] + ',"'
                               + insert_row['cm_used_ref_name'] + '",'
                               + insert_row['cm_used_ref_id'] 
                               +')';
            tx.executeSql(insert_query, [], function(tx, results)
            {
                var cm_id = results.insertId;

                insert_cm_line(cm_id, cm_item_info, function(cmline_data)
                {
                    /* REFILL CM ITEMS TO SIR INVENTORY */
                    insert_sir_inventory(cm_item_info,"credit_memo",cm_id, function(returndata)
                    {
                        /* UPDATE INVOICE */
                        if(invoice_id != 0)
                        {
                            update_invoice(invoice_id, cm_id, function(results_inv)
                            {
                                callback(results_inv, cm_id);
                            });
                        }
                        else
                        {
                            callback(returndata, cm_id)
                        }
                    });
                });
            },
            onError);
        });

    });
}
function update_cm_submit(cm_id, cm_customer_info, cm_item_info, item_returns, invoice_id, callback)
{
    get_shop_id(function(shop_id)
    {
        var insert_row = {};
        insert_row['cm_shop_id'] = shop_id;
        insert_row['cm_customer_id'] = cm_customer_info['cm_customer_id'];
        insert_row['cm_customer_email'] = cm_customer_info['cm_customer_email'];
        insert_row['cm_date'] = cm_customer_info['cm_date'];
        insert_row['cm_message'] = cm_customer_info['cm_message'];
        insert_row['cm_memo'] = cm_customer_info['cm_memo'];
        insert_row['cm_amount'] = cm_customer_info['cm_amount'];
        insert_row['cm_type'] = cm_customer_info['cm_type'] == 'returns' ? 0 : cm_customer_info['cm_type'];
        insert_row['date_created'] = get_date_now();
        insert_row['created_at'] = get_date_now();
        insert_row['cm_ar_acccount'] = 0;
        insert_row['cm_used_ref_name'] = cm_customer_info['cm_type'];
        insert_row['cm_used_ref_id'] = 0;

        db.transaction(function(tx)
        {
            var insert_query = 'UPDATE tbl_credit_memo SET (cm_shop_id, cm_customer_id, cm_customer_email, cm_date, cm_message, cm_memo, cm_amount, cm_type, date_created, created_at, cm_ar_acccount, cm_used_ref_name, cm_used_ref_id) ' +
                               ' = ('
                               + insert_row['cm_shop_id'] + ',' 
                               + insert_row['cm_customer_id'] + ',"'
                               + insert_row['cm_customer_email'] + '","'
                               + insert_row['cm_date'] + '","'
                               + insert_row['cm_message'] + '","'
                               + insert_row['cm_memo'] + '",'
                               + insert_row['cm_amount'] + ','
                               + insert_row['cm_type'] + ',"'
                               + insert_row['date_created'] + '","'
                               + insert_row['created_at'] + '",'
                               + insert_row['cm_ar_acccount'] + ',"'
                               + insert_row['cm_used_ref_name'] + '",'
                               + insert_row['cm_used_ref_id'] 
                               +') ' + 'WHERE cm_id = ' + cm_id;
            tx.executeSql(insert_query, [], function(tx, results)
            {
                var cm_id = results.insertId;
                var delete_query = 'DELETE FROM tbl_credit_memo_line where cmline_cm_id = ' + cm_id;
                tx.executeSql(delete_query, [], function(txt2,res)
                {
                    delete_sir_inventory("credit_memo", cm_id, function(res)
                    {
                        insert_cm_line(cm_id, cm_item_info, function(cmline_data)
                        {
                            /* REFILL CM ITEMS TO SIR INVENTORY */
                            insert_sir_inventory(cm_item_info,"credit_memo",cm_id, function(returndata)
                            {
                                /* UPDATE INVOICE */
                                if(invoice_id != 0)
                                {
                                    update_invoice(invoice_id, cm_id, function(results_inv)
                                    {
                                        callback(results_inv, cm_id);
                                    });
                                }
                                else
                                {
                                    callback(returndata, cm_id)
                                }
                            });
                        });   
                    });           
                },
                onError);
            },
            onError);
        });

    });
}
function delete_sir_inventory(ref_name, ref_id, callback)
{
    db.transaction(function(tx)
    {
        var delete_query2 = 'DELETE FROM tbl_sir_inventory where sir_inventory_ref_name = '+ref_name+' AND sir_inventory_ref_id = ' + ref_id;
        tx.executeSql(delete_query2, [], function(tx,res)
        {
            callback(true);
        },
        onError);
    });
}
function update_invoice(invoice_id, cm_id, callback)
{
    db.transaction(function(tx)
    {
        var update_query = 'UPDATE tbl_customer_invoice SET credit_memo_id = ' + cm_id +
                           ' WHERE inv_id = ' + invoice_id;
        tx.executeSql(update_query, [], function(tx, results)
        {
            callback("success");
        });
    });
}
function insert_cm_line(cm_id, cm_item_info, callback)
{
    var ctr_item_info = count(cm_item_info);
    var ctr = 0;

    var insertline_cm = {};
    $.each(cm_item_info, function(key, value)
    {
        insertline_cm[key] = {};
        insertline_cm[key]['cmline_cm_id'] = cm_id;
        insertline_cm[key]['cmline_service_date'] = "0000-00-00 00:00:00";
        insertline_cm[key]['cmline_um'] = value['um'];
        insertline_cm[key]['cmline_item_id'] = value['item_id'];
        insertline_cm[key]['cmline_description'] = value['item_description'];
        insertline_cm[key]['cmline_qty'] = value['quantity'];
        insertline_cm[key]['cmline_rate'] = value['rate'];
        insertline_cm[key]['cmline_amount'] = value['amount'];
        insertline_cm[key]['created_at'] = get_date_now();
        db.transaction(function(tx)
        {
            var insert_query = 'INSERT INTO tbl_credit_memo_line (cmline_cm_id, cmline_service_date, cmline_um, cmline_item_id, cmline_description, cmline_qty, cmline_rate, cmline_amount, created_at)' +
                               'VALUES ('
                               + insertline_cm[key]['cmline_cm_id']+ ', "'
                               + insertline_cm[key]['cmline_service_date']+ '", '
                               + insertline_cm[key]['cmline_um']+ ', '
                               + insertline_cm[key]['cmline_item_id']+ ', "'
                               + insertline_cm[key]['cmline_description']+ '", '
                               + insertline_cm[key]['cmline_qty']+ ', '
                               + insertline_cm[key]['cmline_rate']+ ', '
                               + insertline_cm[key]['cmline_amount']+ ', "'
                               + insertline_cm[key]['created_at'] + '"'+
                               ')';
            tx.executeSql(insert_query, [], function(tx, results)
            {
                ctr++;
                if(ctr == ctr_item_info)
                {
                    callback("success-insertline");
                }
            },
            onError);
        });
    });
}
/* END CM INSERT */
/* RECEIVE PAYMENT INSERT */
function insert_rp_submit(customer_info, insertline, callback)
{
    get_shop_id(function(shop_id)
    {
        get_sir_id(function(sir_id)
        {
            db.transaction(function(tx)
            {
                var insert_query = 'INSERT INTO tbl_receive_payment (rp_shop_id, '+
                                   ' rp_customer_id, '+
                                   ' rp_ar_account, '+
                                   ' rp_date, '+
                                   ' rp_total_amount, '+
                                   ' rp_payment_method, ' + 
                                   ' rp_memo, ' + 
                                   ' date_created, ' + 
                                   ' rp_ref_name, ' + 
                                   ' rp_ref_id, ' + 
                                   ' created_at )' + 
                                   'VALUES ('+
                                   shop_id+','+
                                   customer_info['rp_customer_id'] +','+
                                   customer_info['rp_ar_account'] +',"'+
                                   customer_info['rp_date'] + '",' +
                                   customer_info['rp_total_amount'] + ',' +
                                   customer_info['rp_payment_method'] + ',"' +
                                   customer_info['rp_memo'] + '","' +
                                   customer_info['date_created'] + '","' +
                                   customer_info['rp_ref_name'] + '",' +
                                   customer_info['rp_ref_id'] + ',"' +
                                   customer_info['date_created'] + '")';

                tx.executeSql(insert_query, [], function(tx, results)
                {
                    var rp_id = results.insertId;
                    insert_rpline(rp_id, insertline, function(result_line)
                    {
                        callback(rp_id);
                    });
                },
                onError);
            });
        });
    });
}
function insert_rpline(rp_id, insertline, callback)
{
    var ctr = 0;
    var ctr_row = count(insertline);
    $.each(insertline, function(key, val)
    {
        db.transaction(function(tx)
        {
            var insert_row_query = 'INSERT INTO tbl_receive_payment_line (rpline_rp_id, rpline_reference_name, rpline_reference_id, rpline_amount, created_at)' +
                                     'VALUES ('+rp_id+ ', "'+
                                     val['rpline_reference_name'] +'",'+
                                     val['rpline_reference_id'] +','+
                                     val['rpline_amount'] +',"'+
                                     get_date_now() +
                                     '")';
            tx.executeSql(insert_row_query, [], function(tx, results)
            {
                update_payment_applied(val['rpline_reference_id'], function(res)
                {
                    ctr++;
                    if(ctr == ctr_row)
                    {
                        callback(rp_id);
                    }
                });
            },
            onError);
        });
    });
}
function insert_manual_rp(rp_id, callback)
{
    get_shop_id(function(shop_id)
    {
        get_sir_id(function(sir_id)
        {
            get_agent_id(function(agent_id)
            {
                var insert_row = {};
                insert_row['agent_id'] = agent_id;
                insert_row['rp_id'] = rp_id;
                insert_row['sir_id'] = sir_id;
                insert_row['rp_date'] = get_date_now();
                insert_row['is_sync'] = 0;
                insert_row['created_at'] = get_date_now();
                db.transaction(function(tx)
                {
                    var insert_query = 'INSERT INTO tbl_manual_receive_payment (agent_id, rp_id, sir_id, rp_date, is_sync, created_at)' + 
                                       ' VALUES ('+
                                       insert_row['agent_id']+','+
                                       insert_row['rp_id']+','+
                                       insert_row['sir_id']+',"'+
                                       insert_row['rp_date']+'",'+
                                       insert_row['is_sync']+',"'+
                                       insert_row['created_at']
                                       +'")';
                    tx.executeSql(insert_query, [], function(tx, results)
                    {
                        callback("success");
                    },
                    onError);
                });
            });
        });
    });
}
function update_payment_applied(inv_id, callback)
{
    get_amount_applied(inv_id, function(amount_applied)
    {
        var update = {};
        update['inv_payment_applied'] = amount_applied;
        db.transaction(function(tx)
        {
            var update_query = 'UPDATE tbl_customer_invoice SET inv_payment_applied = ' + update['inv_payment_applied'] 
                               ' WHERE inv_id = '+ inv_id;
            tx.executeSql(update_query, [], function(tx, results)
            {
                update_inv_is_paid(inv_id, function(res)
                {
                    callback(res);
                });
            });
        });
    });
}
function update_inv_is_paid(inv_id, callback)
{
    get_over_all_price_inv(inv_id, function(overall_price)
    {
        get_payment_applied_inv(inv_id, function(payment_applied)
        {
            var update = {};
            update['inv_is_paid'] = 0;
            if(overall_price == payment_applied)
            {
                update['inv_is_paid'] = 1;
            }
            db.transaction(function(tx)
            {
                var update_query = 'UPDATE tbl_customer_invoice SET inv_is_paid = '+ update['inv_is_paid'] +' WHERE inv_id =' + inv_id;
                tx.executeSql(update_query, [], function(tx, results)
                {
                    callback("success");
                });
            });

        });
    });
}
function get_over_all_price_inv(inv_id, callback)
{
    db.transaction(function(tx)
    {
        var select_query = 'SELECT inv_overall_price FROM tbl_customer_invoice WHERE inv_id =' + inv_id;
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['inv_overall_price']);
            }
            else
            {
                callback(0);
            }
        });
    });
}
function get_payment_applied_inv(inv_id, callback)
{
    db.transaction(function(tx)
    {
        var select_query = 'SELECT inv_payment_applied FROM tbl_customer_invoice WHERE inv_id =' + inv_id;
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['inv_payment_applied']);
            }
            else
            {
                callback(0);
            }
        });
    });
}
function get_amount_applied(inv_id, callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var query = 'SELECT amount_applied FROM tbl_customer_invoice' + 
                        ' LEFT JOIN (SELECT sum(rpline_amount) as amount_applied, rpline_reference_id FROM tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = '+shop_id+' and rpline_reference_name = "invoice" GROUP BY rpline_reference_id) ON rpline_reference_id = inv_id ' + 
                        ' WHERE inv_id = ' + inv_id;
            tx.executeSql(query, [], function(tx, results)
            {
               if(results.rows.length > 0 && results.rows[0]['amount_applied'] != null)
               {
                    callback(results.rows[0]['amount_applied']);
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
/* END RECEIVE PAYMENT INSERT */
function get_agent_id(callback)
    {
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * from tbl_agent_logon LIMIT 1';            
            tx.executeSql(query_check, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows[0]['agent_id']);
                }
                else
                {
                    alert('Something went wrong. Please Login again');
                }
            });
        });
    }
function get_payment_method(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_payment_method where shop_id = ' + shop_id + 
                               ' AND archived = 0'; 
                               
            tx.executeSql(select_query, [], function(tx, results)
            {
                callback(results.rows);
            },
            onError);
        });

    });
}
function roundNumber(number) 
{
    var newnumber = new Number(number+'').toFixed(2);
    return parseFloat(newnumber); 
}

function count(val_this) 
{
    var count = 0;
    for(var prop in val_this) 
    {
        if(val_this.hasOwnProperty(prop))
            count = count + 1;
    }
    return count;
}

/* On ERROR */
function onError(tx, error)
{
    console.log(error.message);
}