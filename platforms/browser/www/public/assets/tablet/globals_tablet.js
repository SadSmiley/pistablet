/** 
 * Open WEBSQL 
 */
var db = openDatabase("my168shop", "1.0", "Address Book", 200000); 
var query = "";
var dataset_from_browser = null;
var global_data = null;
// FOR LOCAL TEST
// var $url = "http://pis.digimahouse.test";
// FOR LIVE TEST
var $url = "http://pis.digimahouse.com";
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
function get_sales_person(callback)
{
    get_agent_id(function(agent_id)
    {
        db.transaction(function (tx)
        {
            var query_check = 'SELECT * from tbl_employee LEFT JOIN tbl_position ON tbl_employee.position_id = tbl_position.position_id where employee_id = "'+agent_id+'" ';            
            tx.executeSql(query_check, [], function(tx, results)
            {
                data_result = results.rows[0];
                callback(data_result['first_name']+" "+data_result['middle_name']+" "+data_result['last_name']);
            });
        });
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

    query[1] = "CREATE TABLE IF NOT EXISTS tbl_audit_trail ( audit_trail_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, remarks TEXT, old_data  NULL, new_data NULL, created_at DATETIME, updated_at DATETIME, source VARCHAR(255),source_id INTEGER, audit_shop_id INTEGER)";
    query[2] = "CREATE TABLE IF NOT EXISTS tbl_shop(shop_id INTEGER PRIMARY KEY AUTOINCREMENT,shop_key VARCHAR(255) NULL, shop_date_created DATETIME NULL default '1000-01-01 00:00:00', shop_date_expiration DATETIME NULL default '1000-01-01 00:00:00',shop_last_active_date DATETIME NULL default '1000-01-01 00:00:00',shop_status VARCHAR(50) NULL default 'trial', shop_country INTEGER NULL,shop_city VARCHAR(255) NULL, shop_zip VARCHAR(255) NULL, shop_street_address VARCHAR(255) NULL,shop_contact VARCHAR(255) NULL,url TEXT ,shop_domain VARCHAR(255) NULL default 'unset_yet',shop_theme VARCHAR(255) NULL default 'default',shop_theme_color VARCHAR(255) NULL default 'gray',member_layout VARCHAR(255) NULL default 'default',shop_wallet_tours INTEGER NULL default '0', shop_wallet_tours_uri VARCHAR(255) default NULL,shop_merchant_school INTEGER NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[3] = "CREATE TABLE IF NOT EXISTS tbl_category (type_id INTEGER PRIMARY KEY AUTOINCREMENT, type_name VARCHAR(255) NULL, type_parent_id INTEGER NULL, type_sub_level TINYINT NULL,type_shop INTEGER NULL, type_category VARCHAR(255) NULL default 'inventory', type_date_created DATETIME NULL,archived TINYINT NULL,is_mts TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[4] = "CREATE TABLE IF NOT EXISTS tbl_chart_account_type (chart_type_id INTEGER PRIMARY KEY AUTOINCREMENT,  chart_type_name VARCHAR(255) NULL, chart_type_description VARCHAR(1000) NULL, has_open_balance TINYINT NULL, chart_type_category TINYINT NULL, normal_balance VARCHAR(255) NULL, created_at DATETIME, updated_at DATETIME)";
    query[5] = "CREATE TABLE IF NOT EXISTS tbl_chart_of_account (account_id INTEGER PRIMARY KEY AUTOINCREMENT,  account_shop_id INTEGER, account_type_id INTEGER,account_number VARCHAR(255), account_name VARCHAR(255), account_full_name VARCHAR(255), account_description VARCHAR(255), account_parent_id INTEGER NULl, account_sublevel INTEGER, account_balance REAL, account_open_balance REAL, account_open_balance_date DATE, is_tax_account TINYINT, account_tax_code_id INTEGER, archived TINYINT, account_timecreated DATETIME, account_protected TINYINT, account_code VARCHAR(255), created_at DATETIME, updated_at DATETIME)";
    query[6] = "CREATE TABLE IF NOT EXISTS tbl_country (country_id INTEGER PRIMARY KEY AUTOINCREMENT, country_code VARCHAR(255) NULL, country_name VARCHAR(255) NULL, created_at DATETIME, updated_at DATETIME)";
    /*CREDIT MEMO*/
    query[7] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo (cm_id INTEGER PRIMARY KEY AUTOINCREMENT, cm_customer_id INTEGER NOT NULL, cm_shop_id INTEGER NOT NULL, cm_ar_acccount INTEGER NOT NULL,cm_customer_email VARCHAR(255)  NOT NULL, cm_date date NOT NULL, cm_message VARCHAR(255)  NOT NULL, cm_memo VARCHAR(255)  NOT NULL, cm_amount REAL NOT NULL, date_created DATETIME NOT NULL, cm_type TINYINT NOT NULL default '0', cm_used_ref_name VARCHAR(255) NOT NULL default 'returns', cm_used_ref_id INTEGER NOT NULL, cm_status TINYINT default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
    query[8] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo_line (cmline_id INTEGER PRIMARY KEY AUTOINCREMENT, cmline_cm_id INTEGER  NULL, cmline_service_date datetime NULL, cmline_um INTEGER NULL, cmline_item_id INTEGER NULL, cmline_description VARCHAR(255)  NULL, cmline_qty INTEGER NULL, cmline_rate REAL NULL, cmline_amount REAL NULL, created_at DATETIME, updated_at DATETIME)";
    query[9] = "CREATE TABLE IF NOT EXISTS tbl_customer (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER  NOT NULL, country_id INTEGER NOT NULL, title_name VARCHAR(100)  NOT NULL, first_name VARCHAR(255)  NOT NULL, middle_name VARCHAR(255)  NOT NULL, last_name VARCHAR(255)  NOT NULL, suffix_name VARCHAR(100)  NOT NULL, email VARCHAR(255)  NOT NULL, password text NULL, company VARCHAR(255)  default NULL, b_day date NULL default '0000-00-00', profile VARCHAR(255)  default NULL, IsWalkin TINYINT NULL, created_date date default NULL, archived TINYINT default '0', ismlm INTEGER default '0', mlm_username VARCHAR(255)  default NULL, tin_number VARCHAR(255)  default NULL,  is_corporate TINYINT NOT NULL default '0', approved TINYINT NOT NULL default '1', created_at DATETIME, updated_at DATETIME, customer_phone VARCHAR(255) NULL,customer_mobile VARCHAR(255) NULL,customer_fax VARCHAR(255) NULL, get_status VARCHAR(255) DEFAULT 'new' NULL)";
    query[10] = "CREATE TABLE IF NOT EXISTS tbl_customer_address (customer_address_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER  NULL, country_id INTEGER  NULL, customer_state VARCHAR(255)  NULL, customer_city VARCHAR(255)  NULL,  customer_zipcode VARCHAR(255)  NULL, customer_street text  NULL, purpose VARCHAR(255)  NULL, archived TINYINT NULL, created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";    query[11] = "CREATE TABLE IF NOT EXISTS tbl_customer_attachment (customer_attachment_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER  NULL, customer_attachment_path text  NULL, customer_attachment_name VARCHAR(255)  NULL, customer_attachment_extension VARCHAR(255)  NULL, mime_type VARCHAR(255)  NULL, archived TINYINT NULL, created_at DATETIME, updated_at DATETIME)";
    /*INVOICE*/
    query[12] = "CREATE TABLE IF NOT EXISTS tbl_customer_invoice (inv_id INTEGER PRIMARY KEY AUTOINCREMENT, new_inv_id INTEGER NULL, inv_shop_id INTEGER NULL, inv_customer_id INTEGER NULL, inv_customer_email VARCHAR(255)  NULL, inv_customer_billing_address VARCHAR(255)  NULL, inv_terms_id TINYINT NULL, inv_date DATE NULL, inv_due_date DATE NULL, inv_message VARCHAR(255)  NULL, inv_memo VARCHAR(255)  NULL, inv_discount_type VARCHAR(255)  NULL, inv_discount_value INTEGER NULL, ewt REAL NULL, taxable TINYINT NULL, inv_subtotal_price REAL NULL,  inv_overall_price REAL NULL, inv_payment_applied REAL NULL, inv_is_paid TINYINT NULL, inv_custom_field_id INTEGER NULL, date_created DATETIME NULL, credit_memo_id INTEGER NULL default '0', is_sales_receipt TINYINT NULL, sale_receipt_cash_account INTEGER NULL, created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255)  DEFAULT 'new' NULL)"; 
    query[13] = "CREATE TABLE IF NOT EXISTS tbl_customer_invoice_line (invline_id INTEGER PRIMARY KEY AUTOINCREMENT, invline_inv_id INTEGER  NULL, invline_service_date DATE NULL, invline_item_id INTEGER NULL, invline_description VARCHAR(255)  NULL, invline_um INTEGER NULL, invline_qty INTEGER NULL, invline_rate REAL NULL, taxable TINYINT NULL, invline_discount VARCHAR(255) NULL, invline_discount_type VARCHAR(255) NULL, invline_discount_remark VARCHAR(255) NULL, invline_amount REAL NULL, date_created DATETIME NULL, invline_ref_name VARCHAR(255)  NULL, invline_ref_id INTEGER NULL, created_at DATETIME, updated_at DATETIME)";
    query[14] = "CREATE TABLE IF NOT EXISTS tbl_position (position_id INTEGER PRIMARY KEY AUTOINCREMENT, position_name VARCHAR(255)  NULL, daily_rate decimal(8,2) NULL, position_created DATETIME NULL, archived TINYINT NULL default '0', position_code VARCHAR(255)  NULL, position_shop_id INTEGER  NULL, created_at DATETIME, updated_at DATETIME)";
    query[15] = "CREATE TABLE IF NOT EXISTS tbl_truck (truck_id INTEGER PRIMARY KEY AUTOINCREMENT, plate_number VARCHAR(255)  NULL, warehouse_id INTEGER  NULL, date_created DATETIME NULL, archived TINYINT NULL default '0', truck_model VARCHAR(255)  NULL, truck_kilogram decimal(8,2) NULL, truck_shop_id INTEGER  NULL, created_at DATETIME, updated_at DATETIME)";
    /*EMPLOYEE INFO*/
    query[16] = "CREATE TABLE IF NOT EXISTS tbl_employee (employee_id INTEGER PRIMARY KEY AUTOINCREMENT,shop_id INTEGER  NULL,  warehouse_id INTEGER  NULL, first_name VARCHAR(255)  NULL, middle_name VARCHAR(255)  NULL, last_name VARCHAR(255)  NULL, gender VARCHAR(255)  NULL, email VARCHAR(255)  NULL, username VARCHAR(255)  NULL,  password text  NULL, b_day DATE NULL, position_id INTEGER  NULL, date_created DATETIME NULL, archived TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
    query[17] = "CREATE TABLE IF NOT EXISTS tbl_image (image_id INTEGER PRIMARY KEY AUTOINCREMENT, image_path VARCHAR(255)  NULL, image_key VARCHAR(255)  NULL,  image_shop INTEGER  NULL, image_reason VARCHAR(255)  NULL default 'product', image_reason_id INTEGER NULL, image_date_created DATETIME NULL, created_at DATETIME, updated_at DATETIME)";
    query[18] = "CREATE TABLE IF NOT EXISTS tbl_item ( item_id INTEGER PRIMARY KEY AUTOINCREMENT, item_name VARCHAR(255)  NULL, item_sku VARCHAR(255)  NULL, item_sales_information VARCHAR(255) NULL, item_purchasing_information VARCHAR(255)  NULL,  item_img VARCHAR(255)  NULL, item_quantity INTEGER NULL, item_reorder_point INTEGER NULL, item_price REAL NULL, item_cost REAL NULL, item_sale_to_customer TINYINT NULL, item_purchase_from_supplier TINYINT NULL,  item_type_id INTEGER  NULL, item_category_id INTEGER  NULL, item_asset_account_id INTEGER  default NULL,  item_income_account_id INTEGER  default NULL, item_expense_account_id INTEGER  default NULL, item_date_tracked DATETIME default NULL, item_date_created DATETIME NULL, item_date_archived DATETIME default NULL, archived TINYINT NULL,  shop_id INTEGER  NULL, item_barcode VARCHAR(255)  NULL, has_serial_number TINYINT NULL default '0',  item_measurement_id INTEGER  default NULL, item_vendor_id INTEGER NULL default '0', item_manufacturer_id INTEGER  default NULL, packing_size VARCHAR(255)  NULL, item_code VARCHAR(255)  NULL, item_show_in_mlm INTEGER NULL default '0', promo_price REAL NULL, start_promo_date date NULL, end_promo_date date NULL, bundle_group TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[19] = "CREATE TABLE IF NOT EXISTS tbl_inventory_serial_number (serial_id INTEGER PRIMARY KEY AUTOINCREMENT, serial_inventory_id INTEGER  NULL, item_id INTEGER  NULL, serial_number VARCHAR(255)  NULL, serial_created DATETIME NULL,  item_count INTEGER NULL, item_consumed TINYINT NULL, sold TINYINT NULL default '0', consume_source VARCHAR(255)  default NULL, consume_source_id INTEGER NULL default '0', serial_has_been_credit VARCHAR(255)  default NULL,  serial_has_been_debit VARCHAR(255) default NULL, created_at DATETIME, updated_at DATETIME)";
    query[20] = "CREATE TABLE IF NOT EXISTS tbl_inventory_slip (inventory_slip_id INTEGER PRIMARY KEY AUTOINCREMENT,  inventory_slip_id_sibling INTEGER NULL default '0', inventory_reason VARCHAR(255)  NULL, warehouse_id INTEGER NULL, inventory_remarks text  NULL, inventory_slip_date DATETIME NULL, archived TINYINT NULL,  inventory_slip_shop_id INTEGER NULL, slip_user_id INTEGER NULL, inventory_slip_status VARCHAR(255)  NULL,  inventroy_source_reason VARCHAR(255)  NULL, inventory_source_id INTEGER NULL, inventory_source_name VARCHAR(255)  NULL, inventory_slip_consume_refill VARCHAR(255)  NULL, inventory_slip_consume_cause VARCHAR(255)  NULL,  inventory_slip_consumer_id INTEGER NULL, created_at DATETIME, updated_at DATETIME)";
    query[21] = "CREATE TABLE IF NOT EXISTS tbl_item_bundle (bundle_id INTEGER PRIMARY KEY AUTOINCREMENT, bundle_bundle_id INTEGER  NULL,  bundle_item_id INTEGER  NULL, bundle_um_id INTEGER  NULL, bundle_qty REAL(8,2) NULL, bundle_display_components REAL(8,2) NULL, created_at DATETIME, updated_at DATETIME)";
    query[22] = "CREATE TABLE IF NOT EXISTS tbl_item_discount (item_discount_id INTEGER PRIMARY KEY AUTOINCREMENT, discount_item_id INTEGER  NULL, item_discount_value REAL NULL, item_discount_type VARCHAR(255)  NULL default 'fixed',  item_discount_remark VARCHAR(255)  NULL, item_discount_date_start DATETIME NULL, item_discount_date_end DATETIME NULL, created_at DATETIME, updated_at DATETIME)";
    query[23] = "CREATE TABLE IF NOT EXISTS tbl_item_multiple_price (multiprice_id INTEGER PRIMARY KEY AUTOINCREMENT,  multiprice_item_id INTEGER  NULL, multiprice_qty INTEGER NULL, multiprice_price REAL NULL, date_created DATETIME NULL, created_at DATETIME, updated_at DATETIME)";
    query[24] = "CREATE TABLE IF NOT EXISTS tbl_item_type ( item_type_id INTEGER PRIMARY KEY AUTOINCREMENT, item_type_name VARCHAR(255)  NULL, archived TINYINT NULL, created_at DATETIME, updated_at DATETIME)";
    query[25] = "CREATE TABLE IF NOT EXISTS tbl_journal_entry (je_id INTEGER PRIMARY KEY AUTOINCREMENT, je_shop_id INTEGER  NULL,  je_reference_module VARCHAR(255)  NULL, je_reference_id INTEGER NULL, je_entry_date DATETIME NULL, je_remarks text  NULL, created_at DATETIME NULL default '0000-00-00 00:00:00', updated_at DATETIME NULL default '0000-00-00 00:00:00')";
    query[26] = "CREATE TABLE IF NOT EXISTS tbl_journal_entry_line (jline_id INTEGER PRIMARY KEY AUTOINCREMENT, jline_je_id INTEGER  NULL,  jline_name_id INTEGER NULL, jline_name_reference VARCHAR(255)  NULL, jline_item_id INTEGER  NULL,  jline_account_id INTEGER  NULL, jline_type VARCHAR(255)  NULL, jline_amount REAL NULL, jline_description text  NULL, created_at DATETIME NULL default '0000-00-00 00:00:00', updated_at DATETIME NULL default '0000-00-00 00:00:00', jline_warehouse_id INTEGER NULL default '0')";
    query[27] = "CREATE TABLE IF NOT EXISTS tbl_sir (sir_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_warehouse_id INTEGER NULL,  truck_id INTEGER  NULL, shop_id INTEGER  NULL, sales_agent_id INTEGER  NULL, date_created DATE NULL, archived TINYINT NULL default '0', lof_status TINYINT NULL default '0', sir_status TINYINT NULL, is_sync TINYINT NULL default '0', ilr_status TINYINT NULL default '0', rejection_reason TEXT NULL, agent_collection REAL NULL, agent_collection_remarks TEXT NULL, reload_sir INTEGER NULL default '0', created_at DATETIME, updated_at DATETIME)";
    /*TABLET TRANSACTION*/
    query[28] = "CREATE TABLE IF NOT EXISTS tbl_manual_invoice (manual_invoice_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NULL, inv_id INTEGER  NULL, manual_invoice_date DATETIME NULL, is_sync TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
    query[29] = "CREATE TABLE IF NOT EXISTS tbl_manual_receive_payment ( manual_receive_payment_id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER NULL, rp_id INTEGER NULL, sir_id INTEGER NULL, rp_date DATETIME NULL,  is_sync TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";

    query[30] = "CREATE TABLE IF NOT EXISTS tbl_manufacturer (manufacturer_id INTEGER PRIMARY KEY AUTOINCREMENT, manufacturer_name VARCHAR(255)  NULL, manufacturer_address VARCHAR(255)  NULL, phone_number VARCHAR(255)  NULL, email_address VARCHAR(255)  NULL, website text  NULL, date_created DATETIME NULL, date_updated DATETIME NULL, archived TINYINT NULL default '0', manufacturer_shop_id INTEGER  NULL, manufacturer_fname VARCHAR(255)  NULL,  manufacturer_mname VARCHAR(255)  NULL, manufacturer_lname VARCHAR(255)  NULL, manufacturer_image INTEGER default NULL, created_at DATETIME, updated_at DATETIME)";
    /*RECEIVE PAYMENT*/
    query[31] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment (rp_id INTEGER PRIMARY KEY AUTOINCREMENT, rp_shop_id INTEGER NULL, rp_customer_id INTEGER NULL, rp_ar_account INTEGER NULL, rp_date date NULL, rp_total_amount REAL(8,2) NULL, rp_payment_method VARCHAR(255)  NULL, rp_payment_ref_no VARCHAR(255)  NULL, rp_memo text  NULL, date_created DATETIME NULL, rp_ref_name VARCHAR(255)  NULL, rp_ref_id INTEGER NULL, created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
    query[32] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment_line ( rpline_id INTEGER PRIMARY KEY AUTOINCREMENT, rpline_rp_id INTEGER  NULL, rpline_reference_name VARCHAR(255)  NULL, rpline_reference_id INTEGER NULL, rpline_amount REAL(8,2) NULL, created_at DATETIME, updated_at DATETIME)";
    query[33] = "CREATE TABLE IF NOT EXISTS tbl_settings ( settings_id INTEGER PRIMARY KEY AUTOINCREMENT, settings_key VARCHAR(255)  NULL, settings_value longtext , settings_setup_done TINYINT NULL default '0', shop_id INTEGER  NULL, created_at DATETIME, updated_at DATETIME)";
    query[34] = "CREATE TABLE IF NOT EXISTS tbl_sir_cm_item (s_cm_item_id INTEGER PRIMARY KEY AUTOINCREMENT, sc_sir_id INTEGER  NULL, sc_item_id INTEGER NULL, sc_item_qty INTEGER NULL, sc_physical_count INTEGER NULL, sc_item_price REAL NULL, sc_status INTEGER NULL, sc_is_updated TINYINT NULL, sc_infos REAL NULL, created_at DATETIME, updated_at DATETIME)";
    /*SIR INVENTORY*/
    query[35] = "CREATE TABLE IF NOT EXISTS tbl_sir_inventory ( sir_inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_item_id INTEGER  NULL, inventory_sir_id INTEGER  NULL, sir_inventory_count INTEGER NULL, sir_inventory_ref_name VARCHAR(255)  NULL, sir_inventory_ref_id INTEGER NULL, created_at DATETIME, updated_at DATETIME, is_bundled_item TINYINT, get_status VARCHAR(255) DEFAULT 'new' NULL)";
    query[36] = "CREATE TABLE IF NOT EXISTS tbl_sir_item ( sir_item_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NULL,  item_id INTEGER  NULL, item_qty INTEGER NULL, archived TINYINT NULL default '0', related_um_type VARCHAR(255)  NULL, total_issued_qty INTEGER NULL default '0', um_qty INTEGER NULL, sold_qty INTEGER NULL, remaining_qty INTEGER NULL, physical_count INTEGER NULL, status VARCHAR(255)  NULL, loss_amount decimal(8,2) NULL, sir_item_price REAL NULL, is_updated TINYINT NULL default '0', infos REAL NULL default '0', created_at DATETIME, updated_at DATETIME)";
    query[37] = "CREATE TABLE IF NOT EXISTS tbl_sir_sales_report (sir_sales_report_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER NULL, report_data TEXT NULL, report_created DATETIME NULL, created_at DATETIME, updated_at DATETIME)";
    query[38] = "CREATE TABLE IF NOT EXISTS tbl_terms (terms_id INTEGER PRIMARY KEY AUTOINCREMENT, terms_shop_id INTEGER NULL,  terms_name VARCHAR(255)  NULL, terms_no_of_days INTEGER NULL , archived TINYINT NULL, created_at DATETIME NULL default '0000-00-00 00:00:00', updated_at DATETIME NULL default '0000-00-00 00:00:00')";
    query[39] = "CREATE TABLE IF NOT EXISTS tbl_um ( id INTEGER PRIMARY KEY AUTOINCREMENT, um_name VARCHAR(255)  NULL, um_abbrev VARCHAR(255)  NULL, is_based TINYINT NULL, um_shop_id INTEGER NULL, created_at DATETIME, updated_at DATETIME)";
    query[40] = "CREATE TABLE IF NOT EXISTS tbl_unit_measurement ( um_id INTEGER PRIMARY KEY AUTOINCREMENT, um_shop INTEGER  NULL, um_name VARCHAR(255)  NULL, is_multi TINYINT NULL, um_date_created DATETIME NULL, um_archived TINYINT NULL, um_type INTEGER  NULL, parent_basis_um INTEGER NULL default '0', um_item_id INTEGER NULL default '0',  um_n_base INTEGER NULL, um_base INTEGER NULL, created_at DATETIME, updated_at DATETIME)";
    query[41] = "CREATE TABLE IF NOT EXISTS tbl_unit_measurement_multi (multi_id INTEGER PRIMARY KEY AUTOINCREMENT, multi_um_id INTEGER  NULL, multi_name VARCHAR(255)  NULL, multi_conversion_ratio REAL NULL, multi_sequence TINYINT NULL,  unit_qty INTEGER NULL, multi_abbrev VARCHAR(255)  NULL, is_base TINYINT NULL, created_at DATETIME, updated_at DATETIME)";
    query[42] = "CREATE TABLE IF NOT EXISTS tbl_user ( user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_email VARCHAR(255)  NULL, user_level INTEGER NULL, user_first_name VARCHAR(255)  NULL, user_last_name VARCHAR(255)  NULL, user_contact_number VARCHAR(255)  NULL, user_password text  NULL, user_date_created DATETIME NULL default '1000-01-01 00:00:00', user_last_active_date DATETIME NULL default '1000-01-01 00:00:00', user_shop INTEGER  NULL,  IsWalkin TINYINT NULL, archived TINYINT NULL, created_at DATETIME, updated_at DATETIME)";
    /*TABLET TRANSACTION-cm*/
    query[43] = "CREATE TABLE IF NOT EXISTS tbl_manual_credit_memo (manual_cm_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NULL, cm_id INTEGER NULL, manual_cm_date DATETIME NULL, is_sync TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";    
    query[44] = "CREATE TABLE IF NOT EXISTS tbl_default_chart_account (default_id INTEGER PRIMARY KEY AUTOINCREMENT, default_type_id INTEGER, default_number INTEGER, default_name VARCHAR(255), default_description VARCHAR(255) , default_parent_id INTEGER NULL, default_sublevel INTEGER NULL, default_balance REAL NULL, default_open_balance REAL NULL, default_open_balance_date date NULL, is_tax_account TINYINT NULL, account_tax_code_id INTEGER NULL, default_for_code VARCHAR(255) , account_protected TINYINT NULL,created_at DATETIME, updated_at DATETIME)";
    query[45] = "CREATE TABLE IF NOT EXISTS tbl_timestamp (timestamp_id INTEGER PRIMARY KEY AUTOINCREMENT, table_name VARCHAR(255), timestamp DATETIME)";
    query[46] = "CREATE TABLE IF NOT EXISTS tbl_agent_logon (login_id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER, selected_sir INTEGER NULL, date_login DATETIME)";
    query[47] = "CREATE TABLE IF NOT EXISTS tbl_payment_method (payment_method_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER, payment_name VARCHAR(255), isDefault TINYINT,archived TINYINT)";
    query[48] = "CREATE TABLE IF NOT EXISTS tbl_invoice_log (record_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER, transaction_customer_id INTEGER, transaction_name VARCHAR(255) NULL, transaction_id INTEGER NULL, transaction_amount REAL NULL, date_created DATETIME NULL)";
    query[49] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo_applied_payment (id INTEGER PRIMARY KEY AUTOINCREMENT, cm_id INTEGER, applied_ref_name VARCHAR(255) NULL, applied_ref_id INTEGER NULL, applied_amount REAL NULL, created_at DATETIME NULL, get_status VARCHAR(255) default 'new' NULL)";
    query[50] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment_credit (rp_credit_id INTEGER PRIMARY KEY AUTOINCREMENT, rp_id INTEGER, credit_reference_name VARCHAR(255) NULL, credit_reference_id INTEGER NULL, credit_amount REAL NULL, date_created DATETIME NULL, get_status VARCHAR(255) default 'new' NULL)";

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
                console.log("Some error occurred. Currently not logged in.")
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
                console.log("Some error occurred. Currently not logged in.")
                callback(0);
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
function post_journal_entries(entry, entry_data, remarks = '')
{
    get_shop_id(function(shop_id)
    {
        get_default_accounts(shop_id, "accounting-receivable", function(account_receivable)
        {
            get_default_accounts(shop_id, "accounting-payable", function(account_payable)
            {
                var account_cash = 0;
                if(entry["account_id"])
                {
                    account_cash = entry["account_id"];
                }
                /* INSERT JOURNAL ENTRY */
                journal_entry['je_shop_id']            = shop_id;
                journal_entry['je_reference_module']   = entry["reference_module"];
                journal_entry['je_reference_id']       = entry["reference_id"];
                journal_entry['je_remarks']            = remarks;

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

                var line_data = {};
                /* CHECK IF THE TRANSACTION JOURNAL IS ALREADY EXIST - USE IF NEW OR UPDATE TRANSACTION */
                check_if_transaction_exist(journal_entry, function(je_id)
                {
                   line_data['je_id'] = je_id;
                   line_data['item_id'] = '';

                    if(entry["name_reference"] != null)
                    {
                        line_data['jline_name_reference'] = entry["name_reference"];
                    }
                    else
                    {
                        line_data['jline_name_reference']  = check_transaction(entry["reference_module"])['name'];
                        line_data['jline_name_id'] = entry["name_id"];
                    }                    
                });
            });
        });
    });
}
function check_transaction(type)
{
    var data = {};
    switch(type)
    {
        case 'estimate':
        case 'sales-order':
        case 'invoice':
            data["main_account"]       = 'receivable';
            data["name"]               = 'customer';
            data["newNormalJournal"]   = 'normalBalance';
            data["newContraJournal"]   = 'contraAccount';
            return data;
            break;
        case 'receive-payment':
        case 'credit-memo':
            data["main_account"]       = 'receivable';
            data["name"]               = 'customer';
            data["newNormalJournal"]   = 'contraAccount';
            data["newContraJournal"]   = 'normalBalance';
            return data;
            break;
        case 'mlm-product-repurchase':
        case 'sales-receipt':
        case 'product-order':
            data["main_account"]       = 'cash-r';
            data["name"]               = 'customer';
            data["newNormalJournal"]   = 'normalBalance';
            data["newContraJournal"]   = 'contraAccount';
            return data;
            break;
        case 'purchase-order':
        case 'bill':
        case 'write-check':
            data["main_account"]       = 'payable';
            data["name"]               = 'vendor';
            data["newNormalJournal"]   = 'normalBalance';
            data["newContraJournal"]   = 'contraAccount';
            return data;
            break;
        case 'debit-memo':
        case 'bill-payment':
            data["main_account"]       = 'payable';
            data["name"]               = 'vendor';
            data["newNormalJournal"]   = 'contraAccount';
            data["newContraJournal"]   = 'normalBalance';
            return data;
            break;
        case 'deposit':
            data["main_account"]       = 'cash-r'; //CASH - RECEIVABLE
            data["name"]               = '';
            data["newNormalJournal"]   = 'normalBalance';
            data["newContraJournal"]   = 'contraAccount';
            return data;
            break;
        default:
            data = null;
    }
}
function check_if_transaction_exist(journal_entry, callback)
{
    db.transaction(function (tx)
    {

                journal_entry['je_shop_id']            = shop_id;
                journal_entry['je_reference_module']   = entry["reference_module"];
                journal_entry['je_reference_id']       = entry["reference_id"];
                journal_entry['je_remarks']            = remarks;
        var select = 'SELECT * FROM tbl_journal_entry '+
                     'WHERE je_reference_module = ' +journal_entry['je_reference_module'] +
                     'AND je_reference_id =' + journal_entry['je_reference_id'];
        tx.executeSql(select, [], function(tx, results)
        {
            var res = results.rows.length; 
            if(res == 0)
            {
                /* INSERT HERE */
                journal_entry['created_at']       = get_date_now();
                journal_entry['je_entry_date']    = get_date_now();

                db.transaction(function (tx)
                {
                    var insert_query = 'INSERT INTO tbl_journal_entry ('+
                                        'je_shop_id,' +
                                        'je_reference_module,' +
                                        'je_reference_id,' +
                                        'je_remarks,'+
                                        'je_entry_date,' +
                                        'created_at)'+
                                        ' VALUES ('+
                                        journal_entry['je_shop_id'] + ',"'+         
                                        journal_entry['je_reference_module'] + '",'+
                                        journal_entry['je_reference_id'] + ',"'+
                                        journal_entry['je_remarks'] + '","'+
                                        journal_entry['je_entry_date'] + '","'+   
                                        journal_entry['created_at'] + '")';
                    tx.executeSql(insert_query, [], function(tx, results)
                    {
                        callback(results.insertId);
                    });
                });
            }
            else
            {

                // Tbl_journal_entry_line::where("jline_je_id", $exist_journal->je_id)->delete();

                db.transaction(function (tx)
                {
                    var delete_query = 'DELETE * FROM tbl_journal_entry_line WHERE jline_je_id = ' + results.rows[0].je_id;
                    tx.executeSql(delete_query, [], function(tx, results_del)
                    {

                    });
                });
                /* UPDATE HERE */       
                journal_entry['updated_at']    = get_date_now();
                db.transaction(function (tx)
                {
                    var insert_query = 'UPDATE tbl_journal_entry SET ('+
                                        'je_shop_id,' +
                                        'je_reference_module,' +
                                        'je_reference_id,' +
                                        'je_remarks,'+
                                        'updated_at)'+
                                        ' = ('+
                                        journal_entry['je_shop_id'] + ',"'+         
                                        journal_entry['je_reference_module'] + '",'+
                                        journal_entry['je_reference_id'] + ',"'+
                                        journal_entry['je_remarks'] + '","'+  
                                        journal_entry['updated_at'] + '") '+
                                        'WHERE je_id = ' + results.rows[0].je_id ;
                    tx.executeSql(insert_query, [], function(tx, results)
                    {
                        callback(results.rows[0].je_id );
                    });
                });
            }
        });
    });
}
function get_default_accounts(shop_id, account_code, callback)
{
    db.transaction(function (tx)
    {
        var select = 'SELECT account_id FROM tbl_chart_of_account '+
                     'WHERE account_shop_id = ' +shop_id +
                     'AND account_code =' + account_code;
        tx.executeSql(select, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['account_id']);
            }
            else if (account_code == 'accounting-cash-in-bank' && results.rows.length < 0) 
            {
                insert_default_cash_in_bank(function(account_id)
                {
                    if(account_id != 0)
                    {
                        callback(account_id);
                    }
                    else
                    {
                        alert("Something wen't wrong. Please contact your administrator.");
                    }
                });
            }
            else
            {
                alert("Something wen't wrong. Please contact your administrator.");
            }
        });
    });
}
function insert_default_cash_in_bank(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function (tx)
        {

            var insert = {};
            insert["account_shop_id"]          = shop_id;
            insert["account_type_id"]          = 1;
            insert["account_number"]           = "00000";
            insert["account_name"]             = "Cash In Bank";
            insert["account_description"]      = "Default Bank";
            insert["account_protected"]        = 1;
            insert["account_code"]             = "accounting-cash-in-bank";

            var insert_query = 'INSERT INTO tbl_chart_of_account (account_shop_id, '+
                                                                 'account_type_id, '+
                                                                 'account_number, '+
                                                                 'account_name, '+
                                                                 'account_description,'+
                                                                 'account_protected, '+
                                                                 'account_code) ' +
                                                                 'VALUES ('+
                                                                 insert['account_shop_id']+','+
                                                                 insert['account_type_id']+',"'+
                                                                 insert['account_number']+'","'+
                                                                 insert['account_name']+'","'+
                                                                 insert['account_description']+'",'+
                                                                 insert['account_protected']+',"'+
                                                                 insert['account_code']+'")';
            tx.executeSql(insert_query, [], function(tx, results)
            {
                callback(results.insertId);
            });
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
                    'AND is_bundled_item = 0 ' +
                    'AND sir_inventory_ref_name != "credit_memo"';
        tx.executeSql(query, [], function(tx, results)
        {
            console.log(results.rows[0]['remaining_qty'])
            if(results.rows[0]['remaining_qty'])
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
                    'AND sir_inventory_count <= 0 ' + 
                    'AND is_bundled_item = 0 ' +
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
function get_sold_qty_for_bundle(sir_id, item_id, callback)
{
    db.transaction(function (tx)
    {
        var query = 'SELECT sum(sir_inventory_count) as sold_qty FROM tbl_sir_inventory ' +
                    'WHERE inventory_sir_id = ' + sir_id + ' ' + 
                    'AND sir_item_id = ' + item_id + ' ' +
                    'AND sir_inventory_count < 0 ' + 
                    'AND is_bundled_item = 1 ' +
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
    $.each(_item_id, function(key, values)
    {
        get_item_bundle(_values['invline_item_id'][key], function(bundle_item)
        {
            if(bundle_item.length > 0)
            {
                check_bundle_qty(bundle_item, function(return_data)
                {
                    ctr++;
                    if(ctr == count_item)
                    {
                       callback(return_data);
                    }
                });               
            }
            else
            {
                get_sir_inventory(sir_id,_values['invline_item_id'][key], _values['invline_um'][key], _values['invline_qty'][key].replace(',',""), invoice_id, function(return_value)
                {
                    ctr++;
                    return_data += return_value;
                    if(ctr == count_item)
                    {     
                       callback(return_data);
                    }
                });
            }
        });
    });

}
function check_bundle_qty(bundle_item, callback)
{
    var return_data = 0;
    $.each(bundle_item, function(a,b)
    {
        var count = bundle_item.length;
        get_sir_inventory(sir_id, b['bundle_item_id'], b['bundle_um_id'], b['bundle_qty'],0, function(return_value)
        {
            return_data += return_value;
            if(parseFloat(a+1) == count)
            {
                callback(return_data);
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
            console.log(dtrow_sir_inventory);
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
                        callback(0);
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
                    console.log(query);
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
                    'LEFT JOIN tbl_unit_measurement_multi ON tbl_item_bundle.bundle_um_id = tbl_unit_measurement_multi.multi_id '+
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
function insert_log(customer_id, transaction_name, transaction_id, transaction_amount = 0, callback)
{
    get_shop_id(function(shop_id)
    {       
        check_invoice_log(customer_id, transaction_name, transaction_id, function(record_id)
        {            
            var data = {};
            data['customer_id'] = customer_id;
            data['transaction_name'] = transaction_name;
            data['transaction_id'] = transaction_id;
            data['transaction_amount'] = transaction_amount;

            db.transaction(function (tx) 
            {  
                var query = 'UPDATE tbl_invoice_log SET (shop_id, transaction_customer_id, transaction_name, transaction_id, transaction_amount, date_created)' +
                                       '= ('+shop_id+', '+data['customer_id']+',"'+
                                        data['transaction_name']+'",'+
                                        data['transaction_id']+','+
                                        data['transaction_amount']+',"'+
                                        get_date_now()+'") ' +
                                        'WHERE record_id = ' + record_id;

                if(record_id == 0)
                {
                    query = 'INSERT INTO tbl_invoice_log (shop_id, transaction_customer_id, transaction_name, transaction_id, transaction_amount, date_created)' +
                                   'VALUES ('+shop_id+', '+data['customer_id']+',"'+
                                    data['transaction_name']+'",'+
                                    data['transaction_id']+','+
                                    data['transaction_amount']+',"'+
                                    get_date_now()+'")';
                }
                tx.executeSql(query, [], function(tx, results)
                {
                    if(record_id == 0)
                    {
                        callback(results.insertId);
                    }
                    else
                    {
                        callback(record_id);
                    }
                }, 
                onError);

            });        
        });
    });
}
function check_invoice_log(customer_id, transaction_name, transaction_id, callback)
{
    db.transaction(function (tx) 
    {  
        var select_query = 'SELECT * FROM tbl_invoice_log ' +
                           'WHERE transaction_customer_id = ' + customer_id +
                           ' AND transaction_name = "' + transaction_name +
                           '" AND transaction_id = ' + transaction_id;
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['record_id']);
            }
            else
            {
                callback(0);
            }
        },
        onError);
    });
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
                        insert_inv['inv_payment_applied']           = customer_info['is_sales_receipt'] == 1 ? customer_info['overall_price'] : 0  ;
                        insert_inv['sale_receipt_cash_account']     = 0;
                        insert_inv['credit_memo_id']                = 0;
                        insert_inv['inv_is_paid']                   = customer_info['inv_is_paid'];
                        insert_inv['inv_custom_field_id']           = 0;

                        var transaction_type = customer_info['is_sales_receipt'] == 1 ? 'sales_receipt' : 'invoice';
                       
                       db.transaction(function (tx) 
                       {  
                            var insert_row = 'INSERT INTO tbl_customer_invoice (new_inv_id, inv_shop_id, inv_customer_id, inv_customer_email, inv_customer_billing_address, inv_terms_id, inv_date, inv_due_date, inv_message, inv_memo, inv_discount_type, inv_discount_value, ewt, taxable, inv_subtotal_price,  inv_overall_price, date_created, is_sales_receipt,credit_memo_id, sale_receipt_cash_account, inv_custom_field_id, inv_payment_applied, inv_is_paid, created_at)' + 
                                'VALUES ('+insert_inv['new_inv_id']+', '+
                                           insert_inv['inv_shop_id']+', '+
                                           insert_inv['inv_customer_id']+', "'+
                                           insert_inv['inv_customer_email']+'", "'+
                                           insert_inv['inv_customer_billing_address']+'", '+
                                           insert_inv['inv_terms_id']+', "'+
                                           insert_inv['inv_date']+'", "'+
                                           insert_inv['inv_due_date']+'", "'+
                                           insert_inv['inv_message']+'", "'+
                                           insert_inv['inv_memo']+'", "'+
                                           insert_inv['inv_discount_type']+'", '+
                                           insert_inv['inv_discount_value']+', '+
                                           insert_inv['ewt']+', '+
                                           insert_inv['taxable']+', '+
                                           insert_inv['inv_subtotal_price']+', '+
                                           insert_inv['inv_overall_price']+', "'+
                                           insert_inv['date_created']+'", '+
                                           insert_inv['is_sales_receipt']+', '+
                                           insert_inv['credit_memo_id']+', '+
                                           insert_inv['sale_receipt_cash_account']+', '+
                                           insert_inv['inv_custom_field_id']+', '+
                                           insert_inv['inv_payment_applied']+', '+
                                           insert_inv['inv_is_paid']+', "'+
                                           insert_inv['created_at']+'")';
                            
                            tx.executeSql(insert_row, [], function(tx, results)
                            {
                               var invoice_id = results.insertId;
                               insert_inv_line(invoice_id, item_info, function(data)
                               {
                                    if(invoice_id != 0)
                                    {
                                        insert_log(insert_inv['inv_customer_id'], transaction_type, invoice_id, overall_price, function(record_id)
                                        {
                                            if(record_id != 0)
                                            {
                                                callback(invoice_id);
                                            }
                                            else
                                            {
                                                alert("Something wen't wrong. Please contact your administrator!");
                                            }
                                        });
                                    }
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
    // console.log(item_info);
    var ctr_item_info = count(item_info);
    console.log("ctr_item_info "+ctr_item_info);
    var ctr = 0;
    $.each(item_info, function(key, value)
    {
        /* DISCOUNT PER LINE */
        var discount = value['discount'];
        var discount_type = 'fixed';
        /*if(discount.indexOf('%') >= 0)
        {
            discount_type = 'percent';
            discount      = (parseFloat(discount.substring(0, discount.indexOf('%'))) / 100) * (roundNumber(value['rate']) * roundNumber(value['quantity']));
        }
*/

            if (discount.indexOf('/') >= 0)
            {
                var discount_type = 'percent';
                var split_discount = discount.split('/');
                var main_rate      = value['rate'] * value['quantity'];

                $.each(split_discount, function(index, val) 
                {
                    console.log(val + " - Discount");

                    if(val.indexOf('%') >= 0)
                    {
                        console.log(parseFloat(main_rate) + " - " + ((100-parseFloat(val.replace("%", ""))) / 100));
                        main_rate = parseFloat(main_rate) * ((100-parseFloat(val.replace("%", ""))) / 100);
                        console.log(main_rate);
                    }
                    else if(val == "" || val == null)   
                    {
                        main_rate -= 0;
                    }
                    else
                    {
                        main_rate -= parseFloat(val);
                    }
                });

                discount = (value['rate'] * value['quantity']) - main_rate;
            }
            else
            {
                var discount_type = 'percent';
                if(discount.indexOf('%') >= 0)
                {
                    $(this).find(".txt-discount").val(discount.substring(0, discount.indexOf("%") + 1));
                    discount = (parseFloat(discount.substring(0, discount.indexOf('%'))) / 100) * (action_return_to_number(value['rate']) * action_return_to_number(value['quantity']));
                }
                else if(discount == "" || discount == null) 
                {
                    discount = 0;
                }
                else
                {
                    discount = parseFloat(discount);
                }
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
                ctr++;
                console.log("ctr_item :" + ctr + " " + ctr_item_info);
                if(ctr == ctr_item_info)
                {
                    callback("success");
                }
            },onError);
        });
    });

}
function action_return_to_number(number = '')
{
    number += '';
    number = number.replace(/,/g, "");
    if(number == "" || number == null || isNaN(number)){
        number = 0;
    }
    
    return parseFloat(number);
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
            console.log("item_info");
            console.log(item_info);
            var insert_row = {};
            var ctr_item_info = count(item_info);
            var ctr = 0;
            var sign = 1;
            if(ref_name == 'invoice')
            {
                sign = -1;
            }
            console.log("new_item");
            console.log(new_item);
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
                                insert_row['sir_inventory_count'] = (value['qty'] * value_bundle['bundle_um_qty']) * sign;
                                insert_row['sir_inventory_ref_name'] = ref_name;
                                insert_row['sir_inventory_ref_id'] = ref_id;
                                insert_row['created_at'] = get_date_now();
                                insert_row['is_bundled_item'] = 1;

                                var insert_row = 'INSERT INTO tbl_sir_inventory (inventory_sir_id, sir_item_id, sir_inventory_count, sir_inventory_ref_name,sir_inventory_ref_id,created_at,is_bundled_item)' +
                                             'VALUES ('+
                                             insert_row['inventory_sir_id']+','+
                                             insert_row['sir_item_id']+','+
                                             insert_row['sir_inventory_count'] +',"'+
                                             insert_row['sir_inventory_ref_name']+'",'+
                                             insert_row['sir_inventory_ref_id']+',"'+
                                             insert_row['created_at']+'",'+
                                             insert_row['is_bundled_item']+
                                             ')';
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

                        check_if_inserted(value['item_id'], ref_name, ref_id, sir_id, function(ctr_inserted)
                        {
                            if(ctr_inserted <= 0)
                            {
                                db.transaction(function(tx)
                                {
                                    insert_row = {};
                                    insert_row['inventory_sir_id'] = sir_id;
                                    insert_row['sir_item_id'] = value['item_id'];
                                    insert_row['sir_inventory_count'] = value['qty'] * sign;
                                    insert_row['sir_inventory_ref_name'] = ref_name;
                                    insert_row['sir_inventory_ref_id'] = ref_id;
                                    insert_row['created_at'] = get_date_now();
                                    insert_row['is_bundled_item'] = 0;

                                    var insert_row = 'INSERT INTO tbl_sir_inventory (inventory_sir_id, sir_item_id, sir_inventory_count, sir_inventory_ref_name,sir_inventory_ref_id,created_at,is_bundled_item) ' +
                                                 ' VALUES ('+insert_row['inventory_sir_id']+','+insert_row['sir_item_id']+','+insert_row['sir_inventory_count']+',"'+insert_row['sir_inventory_ref_name']+'",'+insert_row['sir_inventory_ref_id']+',"'+insert_row['created_at']+'",'+insert_row['is_bundled_item']+')';
                                    tx.executeSql(insert_row, [], function(tx, results)
                                    {
                                    },
                                    onError);
                                });
                            }
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
function check_if_inserted(item_id, refname, ref_id, sir_id, callback)
{         
    db.transaction(function(tx)
    {
        var select_query = "SELECT * FROM tbl_sir_inventory WHERE inventory_sir_id = "+ sir_id + " and sir_item_id = "+item_id 
                            + " and sir_inventory_ref_name = '"+refname +"'"
                            + " and sir_inventory_ref_id = "+ref_id 
        tx.executeSql(select_query, [], function(tx, results)
        {
            callback(results.rows.length);
        },
        onError);
    });
}
function convert_array_item_info(item_info, callback)
{
    var ctr_item_info = count(item_info);
    var ctr = 0;
    var new_item = {};
    $.each(item_info, function(key, value)
    {
        /* Function here */
        get_um_qty(value['um'], function(um_qty)
        {
            ctr++;
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
function edit_sales_receipt(inv_id)
{
    set_session('inv_id',inv_id);
    location.href = '../agent_transaction/sales_receipt/sales_receipt_transaction.html';
}
function view_invoice(inv_id)
{
    set_session('inv_id_print',inv_id);
    location.href = '../agent_transaction/invoice/invoice_print.html';
}
function view_credit_memo(cm_id)
{
    set_session('cm_id_print',cm_id);
    location.href = '../agent_transaction/credit_memo/cm_print.html';    
}
function view_rp(rp_id)
{
    set_session('rp_id_print',rp_id);
    location.href = '../agent_transaction/receive_payment/rp_print.html';
}
function edit_credit_memo(cm_id)
{
    set_session('cm_id',cm_id);
    location.href = '../agent_transaction/credit_memo/credit_memo_transaction.html';    
}
function edit_rp(rp_id)
{
    set_session('rp_id',rp_id);
    location.href = '../agent_transaction/receive_payment/receive_payment_transaction.html';
}
function get_invoice_data(inv_id, callback)
{
    get_shop_id(function (shop_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_customer_invoice '+
                               'LEFT JOIN tbl_customer ON tbl_customer_invoice.inv_customer_id = tbl_customer.customer_id ' +
                               'LEFT JOIN tbl_terms ON tbl_terms.terms_id = tbl_customer_invoice.inv_terms_id ' +
                               'LEFT JOIN (SELECT sum(rpline_amount) as amount_applied, rpline_reference_id FROM tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = '+shop_id+' and rpline_reference_name = "invoice" GROUP BY rpline_reference_id) ON rpline_reference_id = inv_id ' +
                               'WHERE tbl_customer_invoice.inv_id = ' + inv_id;
            tx.executeSql(select_query,[],function(tx2, results)
            {
                if(results.rows.length > 0)
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
                }
                else
                {
                    var inv = {};
                    var invline = {};
                    var cmline = {};
                    callback(inv, invline, cmline);
                }
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
                        update_inv['inv_due_date']                  = customer_info['is_sales_receipt'] == 1 ? customer_info['inv_date'] : customer_info['inv_due_date'] ;
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
                        // update_inv['is_sales_receipt']              = customer_info['is_sales_receipt'];
                        // update_inv['inv_is_paid']                   = customer_info['inv_is_paid'];
                        update_inv['inv_custom_field_id']           = 0;
                       
                       var transaction_type = customer_info['is_sales_receipt'] == 1 ? 'sales_receipt' : 'invoice';

                       db.transaction(function (tx) 
                       {  
                            var update_row = 'UPDATE tbl_customer_invoice SET (new_inv_id, inv_shop_id, inv_customer_id, inv_customer_email, inv_customer_billing_address, inv_terms_id, inv_date, inv_due_date, inv_message, inv_memo, inv_discount_type, inv_discount_value, ewt, taxable, inv_subtotal_price,  inv_overall_price, date_created, inv_custom_field_id, created_at) ' + 
                                '= ('+update_inv['new_inv_id']+', '+update_inv['inv_shop_id']+', '+update_inv['inv_customer_id']+', "'+update_inv['inv_customer_email']+'", "'+update_inv['inv_customer_billing_address']+'", '+update_inv['inv_terms_id']+', "'+update_inv['inv_date']+'", "'+update_inv['inv_due_date']+'", "'+update_inv['inv_message']+'", "'+update_inv['inv_memo']+'", "'+update_inv['inv_discount_type']+'", '+update_inv['inv_discount_value']+', '+update_inv['ewt']+', '+update_inv['taxable']+', '+update_inv['inv_subtotal_price']+', '+update_inv['inv_overall_price']+', "'+update_inv['date_created']+'", '+update_inv['inv_custom_field_id']+', "'+update_inv['created_at']+'") '+
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
                                            insert_log(update_inv['inv_customer_id'], transaction_type, invoice_id, overall_price, function(record_id)
                                            {
                                                if(record_id != 0)
                                                {
                                                    callback(invoice_id);
                                                }
                                                else
                                                {
                                                    alert("Something wen't wrong. Please contact your administrator!");
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
                });
            });
        });
    });

}
/* END INVOICE*/
function get_all_item(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var select_query_item = 'SELECT * FROM tbl_item '+
                                  'WHERE shop_id = ' + shop_id +
                                  ' AND archived = 0';

            tx.executeSql(select_query_item,[],function(tx4, results)
            {
                callback(results.rows);
            },
            onError);
        });
    });
}
/* CM INSERT */
function update_cm(type, cm_id, callback)
{
    if(type == 'others_tablet')
    {
        update_cm_type(cm_id, function(res)
        {
            callback(res);
        });
    }
}
function update_cm_type(cm_id, callback)
{
    db.transaction(function(tx)
    {
        var update = {};
        update['cm_type'] = 1;
        update['cm_used_ref_name'] = 'others';

        var update_cm = 'UPDATE tbl_credit_memo SET (cm_type, cm_used_ref_name) = (' + update['cm_type'] +
                        ',"'+ update['cm_used_ref_name'] + '")'+
                        ' WHERE cm_id = ' + cm_id;
        tx.executeSql(update_cm,[],function(tx4, results_cm)
        {
           callback('success');
        },
        onError);
    });
}
function get_cm_data(cm_id, callback)
{
    db.transaction(function(tx)
    {
        var select_query_cm = 'SELECT * FROM tbl_credit_memo '+
                              'LEFT JOIN tbl_customer ON tbl_customer.customer_id = tbl_credit_memo.cm_customer_id ' +
                              'WHERE cm_id = ' + cm_id;

        tx.executeSql(select_query_cm,[],function(tx4, results_cm)
        {
            if(results_cm.rows.length > 0) 
            {
                var cm = results_cm.rows[0];
                var select_query_cmline = 'SELECT * FROM tbl_credit_memo_line '+
                                          'LEFT JOIN tbl_item ON cmline_item_id = item_id ' +
                                          'LEFT JOIN tbl_unit_measurement_multi ON multi_id = cmline_um ' +
                                          'WHERE cmline_cm_id = ' + cm_id;
                tx.executeSql(select_query_cmline,[],function(tx4, results_cmline)
                {
                    var _cmline = results_cmline.rows;

                    callback(cm, _cmline);
                },
                onError);
            }
            else
            {
                var cm = {};
                var cmline = {};
                callback(cm, cmline);
            }
        },
        onError);
    });
}
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
        insert_row['cm_type'] = cm_customer_info['cm_type'] == "returns" ? 1 : 1;
        insert_row['date_created'] = get_date_now();
        insert_row['created_at'] = get_date_now();
        insert_row['cm_ar_acccount'] = 0;
        insert_row['cm_status'] = 0;
        insert_row['cm_used_ref_name'] = cm_customer_info['cm_used_ref_name'];
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
                    insert_log(insert_row['cm_customer_id'], 'credit_memo', cm_id, insert_row['cm_amount'], function(record_id)
                    {
                        if(record_id != 0)
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
                        }
                        else
                        {
                            alert("Something wen't wrong. Please contact your administrator!");
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
        insert_row['cm_type'] = cm_customer_info['cm_type'];
        insert_row['date_created'] = get_date_now();
        insert_row['created_at'] = get_date_now();
        insert_row['cm_ar_acccount'] = 0;
        insert_row['cm_status'] = 0;
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
                               + insert_row['cm_amount'] + ',"'
                               + insert_row['cm_type'] + '","'
                               + insert_row['date_created'] + '","'
                               + insert_row['created_at'] + '",'
                               + insert_row['cm_ar_acccount'] + ',"'
                               + insert_row['cm_used_ref_name'] + '",'
                               + insert_row['cm_used_ref_id'] 
                               +') ' + 'WHERE cm_id = ' + cm_id;

            console.log(insert_query);
            tx.executeSql(insert_query, [], function(tx, results)
            {
                var delete_query = 'DELETE FROM tbl_credit_memo_line where cmline_cm_id = ' + cm_id;
                tx.executeSql(delete_query, [], function(txt2,res)
                {
                    delete_sir_inventory("credit_memo", cm_id, function(res)
                    {
                        insert_cm_line(cm_id, cm_item_info, function(cmline_data)
                        {
                            insert_log(insert_row['cm_customer_id'], 'credit_memo', cm_id, insert_row['cm_amount'], function(record_id)
                            {
                                if(record_id != 0)
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
                                }
                                else
                                {
                                    alert("Something wen't wrong. Please contact your administrator!");
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
        var delete_query2 = 'DELETE FROM tbl_sir_inventory where sir_inventory_ref_name = "'+ref_name+'" AND sir_inventory_ref_id = ' + ref_id;
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
function get_paid_rp_data(rp_id, callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            /* SELECT DATA IN RP */
            var select_rp = 'SELECT * FROM tbl_receive_payment '+
                            'LEFT JOIN tbl_payment_method ON payment_method_id = rp_payment_method ' +
                            'LEFT JOIN tbl_customer ON customer_id = rp_customer_id ' +
                            'WHERE rp_id = ' + rp_id;
            tx.executeSql(select_rp, [], function(txs, results)
            {
                if(results.rows.length > 0)
                {
                    var rp = results.rows[0];

                    var select_rpline = 'SELECT * FROM tbl_receive_payment_line ' +
                                        'LEFT JOIN tbl_customer_invoice ON inv_id = rpline_reference_id ' +
                                        'LEFT JOIN tbl_credit_memo ON credit_memo_id = cm_id ' +
                                        'WHERE rpline_reference_name = "invoice" '+
                                        'AND rpline_rp_id = ' + rp_id +
                                        ' GROUP BY inv_id';
                    tx.executeSql(select_rpline, [], function(txs, results_rpline)
                    {
                        var rpline = results_rpline.rows;

                        callback(rp, rpline);                                                                                              
                    },
                    onError);
                }
                else
                {
                    var rp = {};
                    var rpline = {};
                    callback(rp, rpline);  
                }
            },
            onError);
        });
    });
}
function get_rp_data(rp_id, callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            /* SELECT DATA IN RP */
            var select_rp = 'SELECT * FROM tbl_receive_payment '+
                            'LEFT JOIN tbl_customer ON customer_id = rp_customer_id ' +
                            'WHERE rp_id = ' + rp_id;
            tx.executeSql(select_rp, [], function(txs, results)
            {
                if(results.rows.length > 0) 
                {
                    var rp = results.rows[0];

                    var select_rpline = 'SELECT * FROM tbl_customer_invoice ' +
                                        'LEFT JOIN tbl_receive_payment_line ON tbl_receive_payment_line.rpline_reference_id = tbl_customer_invoice.inv_id ' +
                                        'WHERE inv_customer_id = ' + rp['rp_customer_id'] + 
                                        ' AND inv_is_paid = 0 OR rpline_rp_id = ' + rp_id + 
                                        ' GROUP BY tbl_customer_invoice.inv_id';
                    tx.executeSql(select_rpline, [], function(txs, results_rpline)
                    {
                        var rpline = results_rpline.rows;

                        callback(rp, rpline);                                                                                              
                    },
                    onError);                     
                }
                else
                {
                    var rp = {};
                    var rpline = {};
                    callback(rp, rpline);
                }
            },
            onError);
        });
    });
}
function update_rp_submit(rp_id, customer_info, insertline, callback)
{
    get_shop_id(function(shop_id)
    {
        get_sir_id(function(sir_id)
        {
            db.transaction(function(tx)
            {
                var update_query = 'UPDATE tbl_receive_payment SET (rp_shop_id, '+
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
                                   '= ('+
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
                                   customer_info['date_created'] + '") '+
                                   'WHERE rp_id = ' + rp_id;

                tx.executeSql(update_query, [], function(tx, results)
                {
                    var delete_query = 'DELETE FROM tbl_receive_payment_line where rpline_rp_id = ' + rp_id;
                    delete_applied_credits(rp_id);
                    insert_credits(customer_info['rp_credit_id'], customer_info['rp_credit_amount'], rp_id);
                    insert_applied_credits(customer_info['rp_credit_id'], customer_info['rp_credit_amount'], rp_id);
                    tx.executeSql(delete_query, [], function(txt2,res)
                    {
                        insert_rpline(rp_id, insertline, function(result_line)
                        {
                            insert_log(customer_info['rp_customer_id'], 'receive_payment', rp_id, -(customer_info['rp_total_amount']), function(record_id)
                            {
                                if(record_id != 0)
                                {
                                    callback(rp_id);
                                }
                                else
                                {
                                    alert("Something wen't wrong. Please contact your administrator!");
                                }
                            });
                        });
                    },
                    onError);
                },
                onError);
            });
        });
    });
}

function delete_applied_credits(rp_id)
{
    db.transaction(function(tx)
    {
        var delete_query = "DELETE FROM tbl_receive_payment_credit WHERE rp_id = "+rp_id;
        tx.executeSql(delete_query, [], function(tx, results)
        {
            var delete_querycm = "DELETE FROM tbl_credit_memo_applied_payment WHERE applied_ref_id = "+rp_id;
            tx.executeSql(delete_querycm, [], function(tx, results)
            {   
                console.log("delete");
            });
        });
    });
}
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
                    insert_credits(customer_info['rp_credit_id'], customer_info['rp_credit_amount'], rp_id);
                    insert_applied_credits(customer_info['rp_credit_id'], customer_info['rp_credit_amount'], rp_id);
                    insert_rpline(rp_id, insertline, function(result_line)
                    {
                        insert_payment_reference(customer_info['rp_ref_name'],customer_info['rp_ref_id'], rp_id);
                        if(rp_id != 0)
                        {
                            insert_log(customer_info['rp_customer_id'], 'receive_payment', rp_id, -(customer_info['rp_total_amount']), function(record_id)
                            {
                                if(record_id != 0)
                                {
                                    callback(rp_id);
                                }
                                else
                                {
                                    alert("Something wen't wrong. Please contact your administrator!");
                                }
                            });
                        }
                    });
                },
                onError);
            });
        });
    });
}
function insert_credits(_rp_credit_id, _rp_credit_amount, rp_id)
{
    var ctr = count(_rp_credit_amount);
    if(ctr > 0)
    {
        db.transaction(function(tx)
        {
            $.each(_rp_credit_amount, function(key, value)
            {
                $ins = [];
                $ins['rp_id'] = rp_id;
                $ins['credit_reference_name'] = "credit_memo";
                $ins['credit_reference_id'] = _rp_credit_id[key];
                $ins['credit_amount'] = value;
                $ins['date_created'] = get_date_now();
                var ins_query = "INSERT INTO tbl_receive_payment_credit (rp_id, credit_reference_name, credit_reference_id, credit_amount, date_created)" +
                    " VALUES ("+$ins['rp_id']+",'"+$ins['credit_reference_name']+"',"+$ins['credit_reference_id']+","+$ins['credit_amount']+",'"+$ins['date_created']+"')";
                console.log(ins_query);
                tx.executeSql(ins_query, [], function(tx, results)
                {
                    console.log('success_test');
                },
                onError);
            });
        });
    }
}
function insert_applied_credits(_rp_credit_id, _rp_credit_amount, rp_id)
{
    var ctr = count(_rp_credit_amount);
    if(ctr > 0)
    {
        db.transaction(function(tx)
        {
            $.each(_rp_credit_amount, function(key, value)
            {
                $ins = [];
                $ins['cm_id'] = _rp_credit_id[key];
                $ins['applied_ref_name'] = "receive_payment";
                $ins['applied_ref_id'] = rp_id;
                $ins['applied_amount'] = value;
                $ins['created_at'] = get_date_now();
                var ins_query = "INSERT INTO tbl_credit_memo_applied_payment (cm_id, applied_ref_name, applied_ref_id, applied_amount, created_at)" +
                    " VALUES ("+$ins['cm_id']+",'"+$ins['applied_ref_name']+"',"+$ins['applied_ref_id']+","+$ins['applied_amount']+",'"+$ins['created_at']+"')";
                tx.executeSql(ins_query, [], function(tx, results)
                {
                    console.log('success_test');
                    update_credit_memo(_rp_credit_id[key]);
                },
                onError);
            });
        });
    }
}
function update_cm_refname(cm_id, refname = '', callback)
{
    if(refname)
    {
        db.transaction(function(tx)
        {
            var update_query = "UPDATE tbl_credit_memo SET cm_used_ref_name = '"+refname+"' WHERE cm_id = "+cm_id;
            tx.executeSql(update_query, [], function(tx, results)
            {
                callback("success");
            });
        });
    }
}
function update_credit_memo(key)
{
    if(key)
    {
        get_amount_credit_applied(key, function(applied_amount)
        {
            get_amount_credit(key, function(cm_amount)
            {
                db.transaction(function(tx)
                {
                    console.log("applied "+applied_amount);
                    console.log("cm "+cm_amount);
                    if(applied_amount == cm_amount)
                    {
                        var update_query = "UPDATE tbl_credit_memo SET cm_status = 1 WHERE cm_id = "+key;
                        tx.executeSql(update_query, [], function(tx, results)
                        {
                            console.log("success");
                        });
                    }
                });
            });
        });
    }
}
function get_amount_credit_applied(key, callback)
{
    if(key)
    {
        db.transaction(function(tx)
        {
            var select_query = "SELECT sum(applied_amount) as applied_cm_amount FROM tbl_credit_memo_applied_payment "+
                                " WHERE cm_id = "+key;
            tx.executeSql(select_query, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows[0]['applied_cm_amount']);
                }
                else
                {
                    callback(0);
                }
            });
        });        
    }
}
function get_amount_credit(key, callback)
{
    if(key)
    {
        db.transaction(function(tx)
        {
            var select_query = "SELECT cm_amount FROM tbl_credit_memo "+
                                " WHERE cm_id = "+key;
            tx.executeSql(select_query, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows[0]['cm_amount']);
                }
                else
                {
                    callback(0);
                }
            });
        });        
    }
}
function get_applied_credit(rp_id, callback)
{
    db.transaction(function(tx)
    {
        var select_query = "SELECT * FROM tbl_receive_payment_credit "+
                                " WHERE rp_id = "+rp_id;
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows);
            }
            else
            {
                callback([]);
            }
        });
    });
}
function insert_payment_reference(ref_name, ref_id, rp_id)
{
    if(ref_name == 'credit_memo')
    {
        db.transaction(function(tx)
        {
            var update_row_query = 'UPDATE tbl_credit_memo SET (cm_type, cm_used_ref_name, cm_used_ref_id)'+
                                   '= (1,"receive_payment", '+ rp_id+') WHERE cm_id = ' + ref_id;
            tx.executeSql(update_row_query, [], function(tx, results)
            {
                console.log('success_test');
            },
            onError);
        });
    }
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
                                     val['rpline_amount'].replace(',',"") +',"'+
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
            var update_query = 'UPDATE tbl_customer_invoice SET inv_payment_applied = ' + update['inv_payment_applied'] +
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
            var query = 'SELECT credit_memo_id, amount_applied FROM tbl_customer_invoice' + 
                        ' LEFT JOIN (SELECT sum(rpline_amount) as amount_applied, rpline_reference_id FROM tbl_receive_payment_line as rpline inner join tbl_receive_payment rp on rp_id = rpline_rp_id where rp_shop_id = '+shop_id+' and rpline_reference_name = "invoice" GROUP BY rpline_reference_id) ON rpline_reference_id = inv_id ' + 
                        ' WHERE inv_id = ' + inv_id;
            tx.executeSql(query, [], function(tx, results)
            {
               if(results.rows.length > 0 && results.rows[0]['amount_applied'] != null)
               {
                    get_cm_amount(results.rows[0]['credit_memo_id'], function(cm_amount)
                    {
                        callback(results.rows[0]['amount_applied'] + cm_amount);
                    });
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
function update_submit_reload(sir_id)
{
    db.transaction(function(tx)
    {
        var update = {};
        update['reload_sir'] = 1;

        var update_sir = 'UPDATE tbl_sir SET reload_sir = ' + update['reload_sir'] +
                         ' WHERE sir_id = ' + sir_id;

        tx.executeSql(update_sir,[],function(tx4, results_cm)
        {
            toastr.success("Success");
            setInterval(function()
            {
                location.reload();
            },2000)
        },
        onError);
    });    
}
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

function createFile(dirEntry, fileName, isAppend, content) 
{
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) 
    {

        writeFile(fileEntry, content, isAppend);

    }, function(e)
    {
        alert(e);
    });

}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            readFile(fileEntry);
            // cordova.InAppBrowser.open(fileEntry.fullPath, '_system', 'location=yes');
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function() {
            console.log("Successful file read: " + this.result);
            // displayFileData(fileEntry.fullPath + ": " + this.result);
        };

        reader.readAsText(file);

    }, function(e)
    {
        alert(e);
    });
}

function print_function()
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function (dirEntry) 
        {
            console.log('file system open: ' + dirEntry.name);
            var isAppend = true;
            createFile(dirEntry, "fileToAppend.html", isAppend, $("#print_html").html());
            $("#print_html").css("transform", "scale(2,2)");
            cordova.InAppBrowser.open(dirEntry.nativeURL+"fileToAppend.html", '_system', 'location=yes');
        }, function(e)
        {
            alert(e);
        });
    }
    catch(err)
    {
        alert(err.message);
    }
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
    alert(error.message);
}

function number_format(number)
{
    var yourNumber = parseFloat(number).toFixed(2);
    //Seperates the components of the number
    var n= yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return (n.join("."));
}

function global_sync(type = '')
{
    $(".btn-reload-action").css("color","#00000");
    $(".btn-reload-action").html("Submitting data. Please wait...");
    $(".btn-reload-action").attr("disabled","true");
    get_sir_id(function(sir_id)
    {
        //tbl_manual_invoice
        //tbl_manual_credit_memo
        //tbl_manual_rp
        //tbl_sir
        //tbl_sir_item <x>
        //tbl_sir_inventory
        //tbl_sir_cm_item <x>
        //tbl_sir_sales_report <x>

        //tbl_customer_invoice
        //tbl_customer_invoice_line

        //tbl_credit_memo
        //tbl_credit_memo_line

        //tbl_receive_payment
        //tbl_receive_payment_line

        select_all_logs(function(logs)
        {
            var data = {};
            data['invoice'] = {};
            data['credit_memo'] = {};
            data['receive_payment'] = {};
            data['sir_inventory'] = {};
            data['manual_inv'] = {};
            data['manual_rp'] = {};
            data['manual_cm'] = {};
            data['sir_data'] = {};
            var ctr_length = count(logs);
            var ctr = 0;
            get_other_transaction(function(sir_inventory, manual_inv, manual_rp, manual_cm, sir_data, agent_data, customer, customer_address, cm_applied, rp_applied)
            {
                data['sir_inventory'] = sir_inventory;
                data['manual_inv'] = manual_inv;
                data['manual_rp'] = manual_rp;
                data['manual_cm'] = manual_cm;
                data['sir_data'] = sir_data;
                data['agent_data'] = agent_data;
                data['customer'] = customer;
                data['cm_applied'] = cm_applied;
                data['rp_applied'] = rp_applied;
                data['customer_address'] = customer_address;
                if(ctr_length != 0)
                {
                    $.each(logs, function(key, value)
                    {
                        get_invoice_data(value['transaction_id'], function(inv, invline, cmline)
                        {
                            get_cm_data(value['transaction_id'], function(cm, cmline)
                            {
                                get_paid_rp_data(value['transaction_id'], function(rp, rpline)
                                {
                                    ctr++;
                                    if(value['transaction_name'] == 'invoice')
                                    {
                                        data['invoice'][value['transaction_id']] = {};
                                        data['invoice'][value['transaction_id']]['inv'] = inv;
                                        data['invoice'][value['transaction_id']]['invline'] = invline;
                                    }
                                    if(value['transaction_name'] == 'sales_receipt')
                                    {
                                        data['invoice'][value['transaction_id']] = {};
                                        data['invoice'][value['transaction_id']]['inv'] = inv;
                                        data['invoice'][value['transaction_id']]['invline'] = invline;                                
                                    }
                                    if(value['transaction_name'] == 'credit_memo')
                                    {
                                        data['credit_memo'][value['transaction_id']] = {};
                                        data['credit_memo'][value['transaction_id']]['cm'] = cm;
                                        data['credit_memo'][value['transaction_id']]['cmline'] = cmline;                                
                                    }
                                    if(value['transaction_name'] == 'receive_payment')
                                    {
                                        data['receive_payment'][value['transaction_id']] = {};
                                        data['receive_payment'][value['transaction_id']]['rp'] = rp;
                                        data['receive_payment'][value['transaction_id']]['rpline'] = rpline;                                
                                    }

                                    if(ctr == ctr_length)
                                    {
                                        get_sir_id(function(sir_id)
                                        {
                                            var all_data = JSON.stringify(data);
                                            // location.href = "http://digimahouse.dev/tablet/get_data/" + JSON.stringify(all_data) + '/'+sir_id;
                                            // $('.sync-out').unbind('click');
                                            // $('.sync-out').bind('click', function()
                                            // {
                                                $.ajax(
                                                {
                                                    url: $url+'/tablet/get_data',
                                                    type : "POST",
                                                    crossDomain : true,
                                                    dataType: "json",
                                                    data : { getdata : all_data, sir_id : sir_id, sync_type : type},
                                                    success : function(res)
                                                    {
                                                        if(res)
                                                        {
                                                            db.transaction(function(tx)
                                                            {
                                                                if(type == 'confirm')
                                                                {
                                                                    location.href = "agent/agent_dashboard.html"; 
                                                                }
                                                                else
                                                                {
                                                                    var delete_query = 'DELETE FROM tbl_timestamp';
                                                                    tx.executeSql(delete_query, [], function(txt2,res)
                                                                    {
                                                                        var delete_query_agent = 'DELETE FROM tbl_agent_logon';
                                                                        tx.executeSql(delete_query_agent, [], function(txt22,res2)
                                                                        {
                                                                            toastr.success('Successfully Sync');
                                                                            setInterval(function()
                                                                            {
                                                                                location.href = '../login.html';
                                                                            },2000);
                                                                        });
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    },
                                                    error : function()
                                                    {
                                                        alert('Please make sure you are connected to the internet');
                                                    }
                                                });
                                            // });                                    
                                        });
                                    }
                                    else
                                    {
                                        // alert("You have no any transaction to sync");
                                    }
                                });
                            });
                        });
                    });                        
                }
                else
                {
                    console.log(data);
                    console.log(JSON.stringify(data));
                    $.ajax(
                    {
                        url: $url+'/tablet/get_data',
                        type : "POST",
                        crossDomain : true,
                        dataType: "json",
                        data : { getdata : JSON.stringify(data), sir_id : sir_id, sync_type : type},
                        success : function(res)
                        {
                            if(res)
                            {
                                db.transaction(function(tx)
                                {
                                    if(type == 'confirm')
                                    {
                                        location.href = "agent/agent_dashboard.html"; 
                                    }
                                    else
                                    {
                                        var delete_query = 'DELETE FROM tbl_timestamp';
                                        tx.executeSql(delete_query, [], function(txt2,res)
                                        {
                                            var delete_query_agent = 'DELETE FROM tbl_agent_logon';
                                            tx.executeSql(delete_query_agent, [], function(txt22,res2)
                                            {
                                                toastr.success('Successfully Sync');
                                                setInterval(function()
                                                {
                                                    location.href = '../login.html';
                                                },2000);
                                            });
                                        });
                                    }
                                });
                            }
                        },
                        error : function()
                        {
                            alert('Please make sure you are connected to the internet');
                        }
                    });
                }
            });
        });
    });
}
function get_other_transaction(callback)
{
    get_data_manual_transaction('tbl_manual_receive_payment', function(manual_rp)
    {
        get_data_manual_transaction('tbl_manual_credit_memo', function(manual_cm)
        {
            get_data_manual_transaction('tbl_manual_invoice', function(manual_inv)
            {
                get_data_sir_inventory(function(sir_inventory)
                {
                    get_data_sir(function(sir_data)
                    {
                        get_data_agent(function(agent_data)
                        {
                            get_data_customer(function (customer, customer_address)
                            {
                                get_cm_applied(function(cm_applied)
                                {
                                    get_rp_applied(function(rp_applied)
                                    {
                                        callback(sir_inventory, manual_inv, manual_rp, manual_cm, sir_data, agent_data, customer, customer_address, cm_applied, rp_applied);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}
function get_cm_applied(callback)
{ 
    db.transaction(function(tx)
    {
        var select_query = 'SELECT * FROM tbl_credit_memo_applied_payment ' +
                           'WHERE get_status = "new"'; 
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows);
            }
            else
            {
                var res = null;
                callback(res);
            }
        });
    });
}
function get_applied_credits(rp_id , callback)
{
    db.transaction(function(tx)
    {
        var select_query = 'SELECT * FROM tbl_receive_payment_credit ' +
                           'WHERE rp_id = '+rp_id; 
        tx.executeSql(select_query, [], function(tx, results)
        {
            console.log(123);
            console.log(results);
            if(results.rows.length > 0)
            {

                callback(results.rows);
            }
            else
            {
                var res = null;
                callback(res);
            }
        });
    });
}
function get_rp_applied(callback)
{
    db.transaction(function(tx)
    {
        var select_query = 'SELECT * FROM tbl_receive_payment_credit ' +
                           'WHERE get_status = "new"'; 
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows);
            }
            else
            {
                var res = null;
                callback(res);
            }
        });
    });
}
function get_data_agent(callback)
{ 
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_invoice_log ' +
                               'WHERE shop_id = ' + shop_id +
                               ' AND transaction_name = "agent_update"'; 
            tx.executeSql(select_query, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows[0]);
                }
                else
                {
                    var res = null;
                    callback(res);
                }
            },
            onError);
        });
    });
}
function get_data_customer(callback)
{ 
    get_customer(function(customer)
    {
        get_customer_address(customer, function(customer_address)
        {
            callback(customer, customer_address);
        });        
    });
}
function get_customer_address(customer, callback)
{    
    db.transaction(function(tx)
    {
        var ctr_customer = count(customer);
        var customer_address = [];
        var ctr = 0;
        if(ctr_customer > 0)
        {
            $.each(customer, function(key, value)
            {
                    var select_query = 'SELECT * FROM tbl_customer_address ' +
                                       'WHERE customer_id = ' + value['customer_id'] +
                                       ' AND get_status = "new"'; 
                tx.executeSql(select_query, [], function(tx1, results)
                {
                    ctr++;
                    customer_address[key] = {};
                    if(results.rows.length > 0)
                    {
                        customer_address[key]['address'] = {};
                        $.each(results.rows, function(a, b)
                        {
                            customer_address[key]['address'][a] = {};
                            customer_address[key]['address'][a] = b;
                        });
                    }
                    if(ctr == ctr_customer)
                    {
                        if(count(customer_address) > 0)
                        {
                            callback(customer_address);
                        }
                        else
                        {
                            callback(null);
                        }
                    }
                });
            });
        }
        else
        {
            callback(customer_address);
        }
    });
}
function get_customer(callback)
{
    get_shop_id(function(shop_id)
    {                   
        db.transaction(function(tx)
        {     
            var select_query_customer = 'SELECT * FROM tbl_customer ' +
                               'WHERE shop_id = ' + shop_id +
                               ' AND get_status = "new"';
            tx.executeSql(select_query_customer, [], function(tx12, results_customer)
            {
                if(results_customer.rows.length > 0)
                {
                    callback(results_customer.rows);
                }
                else
                {
                    var res = null;
                    callback(res);
                }
            },
            onError);
        });
    });
}
function get_data_sir_inventory(callback)
{
    get_sir_id(function(sir_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_sir_inventory ' +
                               'WHERE inventory_sir_id = '+sir_id +
                               ' AND get_status = "new"';
            tx.executeSql(select_query, [], function(tx, results)
            {
                callback(results.rows);
            });
        });
    });
}
function get_data_sir(callback)
{
    get_sir_id(function(sir_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_sir ' +
                               'WHERE sir_id = '+sir_id ;
            tx.executeSql(select_query, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows[0]);
                }
                else
                {
                    var res = null;
                    callback(res);
                }
            });
        });
    });

}
function get_data_manual_transaction(tbl_name, callback)
{
    get_sir_id(function(sir_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM ' + tbl_name +
                               ' WHERE sir_id = '+sir_id + 
                               ' AND get_status = "new"';
            tx.executeSql(select_query, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows);
                }
                else
                {
                    var res = null;
                    callback([]);
                }
            });
        });
    });
}
function select_all_logs(callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var select_query = 'SELECT * FROM tbl_invoice_log ' +
                               'WHERE shop_id = ' + shop_id +
                               ' AND transaction_name != "customer_beginning_balance"'; 
            tx.executeSql(select_query, [], function(tx, results)
            {
                if(results.rows.length > 0)
                {
                    callback(results.rows);
                }
                else
                {
                    var res = null;
                    callback(res);
                }
            },
            onError);
        });
    });
}
get_timestamp();
function get_timestamp()
{
    get_last_timestamp(function(ctr)
    {
        if(ctr == 0)
        {
           $('.loading-page').removeClass('hidden');
           $('.login-page').addClass('hidden');
        }
    });
}
function get_last_timestamp(callback)
{
    db.transaction(function(tx)
    {
        var select_query = 'SELECT count(timestamp_id) as ctr FROM tbl_timestamp'; 
        tx.executeSql(select_query, [], function(tx, results)
        {
            if(results.rows.length > 0)
            {
                callback(results.rows[0]['ctr']);
            }
            else
            {
                callback(0)
            }
        });
    });
}
function create_customer_submit(customer_info , callback)
{
    get_shop_id(function(shop_id)
    {
        db.transaction(function(tx)
        {
            var insert_query = 'INSERT INTO tbl_customer (shop_id, country_id, title_name, first_name, '+
                               'middle_name, last_name, suffix_name, email, password, IsWalkin, archived, ismlm, company, created_date, created_at, approved, customer_phone, customer_mobile ,customer_fax) VALUES ' +
                               '('+shop_id+', "420", "'+
                               customer_info['title']+'","'+
                               customer_info['first_name']+'","'+
                               customer_info['middle_name']+'","'+
                               customer_info['last_name']+'","'+
                               customer_info['suffix']+'","'+
                               customer_info['email']+'","'+
                               'none",0,0,0,"'+
                               customer_info['company']+'","'+
                               get_date_now()+'","'+
                               get_date_now()+'", 0,"'+
                               customer_info['phone']+'","'+
                               customer_info['mobile']+'","'+
                               customer_info['fax']+'")'; 
            console.log(insert_query);
            tx.executeSql(insert_query, [], function(txs, results)
            {
                var customer_id = results.insertId;
                
                var insert_query_billing = 'INSERT INTO tbl_customer_address (customer_id, country_id, customer_state, customer_city, '+
                               'customer_zipcode, customer_street, purpose, created_at) VALUES ' +
                               '('+customer_id+', 420,"'+
                               customer_info['billing_state']+'","'+
                               customer_info['billing_city']+'","'+
                               customer_info['billing_zipcode']+'","'+
                               customer_info['billing_street']+'","billing","'+
                               get_date_now()+'")'; 

                tx.executeSql(insert_query_billing, [], function(txs1, results_billing)
                {  
                    var insert_query_shipping = 'INSERT INTO tbl_customer_address (customer_id, country_id, customer_state, customer_city, '+
                               'customer_zipcode, customer_street, purpose, created_at) VALUES ' +
                               '('+customer_id+', 420,"'+
                               customer_info['shipping_state']+'","'+
                               customer_info['shipping_city']+'","'+
                               customer_info['shipping_zipcode']+'","'+
                               customer_info['shipping_street']+'","shipping","'+
                               get_date_now()+'")'; 

                    tx.executeSql(insert_query_shipping, [], function(txs1, results_shipping)
                    {
                        insert_log(customer_id, 'insert_customer', 0 , 0, function(res)
                        {
                            callback('success');
                        });
                    },
                    onError); 
                },
                onError);

            },
            onError);
        });
    });
}