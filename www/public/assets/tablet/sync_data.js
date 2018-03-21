
var sync_data = new sync_data();
var sync_key = 0;
var table_sync_key = 0;
var current_table = "";
var all_tbl_name = [];
// FOR LOCAL TEST
var shop_id = 70;  
var $url = "http://pis.digimahouse.test";
// FOR LIVE TEST
// var shop_id = 93;   
// var $url = "http://pis.digimahouse.com";
function sync_data()
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
	   // action_click_sync();
	   action_click_test_update_shop();
	   insert_sample();
       action_web_browser_sync_data();
       login_function();
       logout_action();
       check_if_have_login();
       create_all_table();
       drop_all_table();
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
                    // location.href = "login.html";
                }
                else
                {
                    location.href = "index.html";
                }
            });
        });
    }
    function login_function()
    {
        $(".btn-login").unbind("click");
        $(".btn-login").bind("click", function()
        {
            var username = $(".user-name").val();
            var password = $(".pass-word").val();

            var ins_query_agent = [];
            db.transaction(function (tx)
            {
                var query_check = 'SELECT * from tbl_employee WHERE username = "' + username + '" and password = "'+password+'"';
                
                tx.executeSql(query_check, [], function(tx, results)
                {
                    if(results.rows.length > 0)
                    {
                        var data2 = results.rows;  
                        agent_id = data2[0]['employee_id'];

                        ins_query_agent[1] = 'INSERT INTO tbl_agent_logon (agent_id, date_login) VALUES ("'+agent_id+'", "'+ getDateNow() +'")';
                        // onload_create_table(ins_query_agent);
                        insert_query(ins_query_agent, function()
                        {
                            location.href = "index.html";       
                        });
                    }
                    else
                    {
                        toastr.warning("Password not match");
                    }
                });
            });                
        });
    }
    function logout_action()
    {
        $(".btn-logout").unbind("click");
        $(".btn-logout").bind("click", function()
        {
            var query = "DELETE from tbl_agent_logon";
            createTableName(query);
            location.href = "login.html";   
        });

    }
    function create_all_table()
    {
        $(".create-table").unbind("click");
        $(".create-table").bind("click", function()
        {
            query_create_table();
        });
    }
    function drop_all_table()
    {
        $(".drop-table").unbind("click");
        $(".drop-table").bind("click", function()
        {
            action_drop_table();       
        });
    }
    function action_drop_table()
    {
         var query = [];

        query[1] = "DROP TABLE IF EXISTS tbl_shop";
        query[2] = "DROP TABLE IF EXISTS tbl_category";
        query[3] = "DROP TABLE IF EXISTS tbl_audit_trail";
        query[4] = "DROP TABLE IF EXISTS tbl_chart_account_type";
        query[5] = "DROP TABLE IF EXISTS tbl_chart_of_account";
        query[6] = "DROP TABLE IF EXISTS tbl_country";
        query[7] = "DROP TABLE IF EXISTS tbl_credit_memo";
        query[8] = "DROP TABLE IF EXISTS tbl_credit_memo_line";
        query[9] = "DROP TABLE IF EXISTS tbl_customer";
        query[10] = "DROP TABLE IF EXISTS tbl_customer_address";
        query[11] = "DROP TABLE IF EXISTS tbl_customer_attachment";
        query[12] = "DROP TABLE IF EXISTS tbl_customer_invoice";
        query[13] = "DROP TABLE IF EXISTS tbl_customer_invoice_line";
        query[14] = "DROP TABLE IF EXISTS tbl_default_chart_account";
        query[15] = "DROP TABLE IF EXISTS tbl_employee";
        query[16] = "DROP TABLE IF EXISTS tbl_image";
        query[17] = "DROP TABLE IF EXISTS tbl_inventory_serial_number";
        query[18] = "DROP TABLE IF EXISTS tbl_inventory_slip";
        query[19] = "DROP TABLE IF EXISTS tbl_item";
        query[20] = "DROP TABLE IF EXISTS tbl_item_bundle";
        query[21] = "DROP TABLE IF EXISTS tbl_item_discount";
        query[22] = "DROP TABLE IF EXISTS tbl_item_multiple_price";
        query[23] = "DROP TABLE IF EXISTS tbl_item_type";
        query[24] = "DROP TABLE IF EXISTS tbl_journal_entry";
        query[25] = "DROP TABLE IF EXISTS tbl_journal_entry_line";
        query[26] = "DROP TABLE IF EXISTS tbl_manual_credit_memo";
        query[27] = "DROP TABLE IF EXISTS tbl_manual_invoice";
        query[28] = "DROP TABLE IF EXISTS tbl_manual_receive_payment";
        query[29] = "DROP TABLE IF EXISTS tbl_manufacturer";
        query[30] = "DROP TABLE IF EXISTS tbl_position";
        query[31] = "DROP TABLE IF EXISTS tbl_receive_payment";
        query[32] = "DROP TABLE IF EXISTS tbl_receive_payment_line";
        query[33] = "DROP TABLE IF EXISTS tbl_settings";
        query[0] = "DROP TABLE IF EXISTS tbl_sir";
        query[35] = "DROP TABLE IF EXISTS tbl_sir_cm_item";
        query[36] = "DROP TABLE IF EXISTS tbl_sir_inventory";
        query[37] = "DROP TABLE IF EXISTS tbl_sir_item";
        query[38] = "DROP TABLE IF EXISTS tbl_sir_sales_report";
        query[39] = "DROP TABLE IF EXISTS tbl_truck";
        query[40] = "DROP TABLE IF EXISTS tbl_terms";
        query[41] = "DROP TABLE IF EXISTS tbl_um";
        query[42] = "DROP TABLE IF EXISTS tbl_unit_measurement";
        query[43] = "DROP TABLE IF EXISTS tbl_unit_measurement_multi";
        query[44] = "DROP TABLE IF EXISTS tbl_user";
        query[45] = "DROP TABLE IF EXISTS tbl_timestamp";
        query[46] = "DROP TABLE IF EXISTS tbl_agent_logon";
        query[47] = "DROP TABLE IF EXISTS tbl_payment_method";
        query[48] = "DROP TABLE IF EXISTS tbl_invoice_log";
        query[49] = "DROP TABLE IF EXISTS tbl_credit_memo_applied_payment";
        query[50] = "DROP TABLE IF EXISTS tbl_receive_payment_credit";

        onload_create_table(query);

    }
   
    function action_web_browser_sync_data(done)
    {

        all_tbl_name[1] = "tbl_shop";
        all_tbl_name[2] = "tbl_category";
        all_tbl_name[3] = "tbl_audit_trail";
        all_tbl_name[4] = "tbl_chart_account_type";
        all_tbl_name[5] = "tbl_chart_of_account";
        all_tbl_name[6] = "tbl_country";
        all_tbl_name[7] = "tbl_credit_memo";
        all_tbl_name[8] = "tbl_credit_memo_line";
        all_tbl_name[9] = "tbl_customer";
        all_tbl_name[10] = "tbl_customer_address";
        all_tbl_name[11] = "tbl_customer_attachment";
        all_tbl_name[12] = "tbl_customer_invoice";
        all_tbl_name[13] = "tbl_customer_invoice_line";
        all_tbl_name[14] = "tbl_default_chart_account";
        all_tbl_name[15] = "tbl_employee";
        all_tbl_name[16] = "tbl_image";
        all_tbl_name[17] = "tbl_inventory_serial_number";
        all_tbl_name[18] = "tbl_inventory_slip";
        all_tbl_name[19] = "tbl_item";
        all_tbl_name[20] = "tbl_item_bundle";
        all_tbl_name[21] = "tbl_item_discount";
        all_tbl_name[22] = "tbl_item_multiple_price";
        all_tbl_name[23] = "tbl_item_type";
        all_tbl_name[24] = "tbl_journal_entry";
        all_tbl_name[25] = "tbl_journal_entry_line";
        all_tbl_name[26] = "tbl_manual_credit_memo";
        all_tbl_name[27] = "tbl_manual_invoice";
        all_tbl_name[28] = "tbl_manual_receive_payment";
        all_tbl_name[29] = "tbl_manufacturer";
        all_tbl_name[30] = "tbl_position";
        all_tbl_name[31] = "tbl_receive_payment";
        all_tbl_name[32] = "tbl_receive_payment_line";
        all_tbl_name[33] = "tbl_settings";
        all_tbl_name[34] = "tbl_sir";
        all_tbl_name[35] = "tbl_sir_cm_item";
        all_tbl_name[36] = "tbl_sir_inventory";
        all_tbl_name[37] = "tbl_sir_item";
        all_tbl_name[38] = "tbl_sir_sales_report";
        all_tbl_name[39] = "tbl_terms";
        all_tbl_name[40] = "tbl_truck";
        all_tbl_name[41] = "tbl_um";
        all_tbl_name[42] = "tbl_unit_measurement";
        all_tbl_name[43] = "tbl_unit_measurement_multi";
        all_tbl_name[44] = "tbl_user";
        all_tbl_name[45] = "tbl_payment_method";
        all_tbl_name[46] = "tbl_invoice_log";
        all_tbl_name[47] = "tbl_credit_memo_applied_payment";
        all_tbl_name[48] = "tbl_receive_payment_credit";

        var total = all_tbl_name.length;
        var ctr = 0;
        

        $(".web-to-browser-sync-data").unbind("click");
        $(".web-to-browser-sync-data").bind("click", function()
        {
            sync_key = 1;
            table_name = all_tbl_name[sync_key];
            table_sync(table_name);

        });
    }
    function table_sync(table_name)
    {
        var dateNow = getDateNow();
        current_table = table_name;

        $.ajax(
        {
            url : $url+"/tablet/sync_data/" + table_name + "/"+ dateNow,
            dataType: "json",
            data : {shop_id : shop_id},
            type : "get",
            crossDomain : true,
            success : function(data)
            {
                insert_all_data(data);
            },
            error : function()
            {
                alert('Please make sure you are connected to the internet');
            }
        });
    }
    function next_table()
    {
        // alert(all_tbl_name.length);
        if(sync_key == (all_tbl_name.length - 1))
        {
            var last_updated = getDateNow();
            action_update_timestamp_v2(last_updated, function(data)
            {
                location.reload();
            });
        }   
        else
        {
            table_sync_key = 0;
            sync_key++;
            table_name = all_tbl_name[sync_key];
            console.log("NEXT TABLE! (" + table_name + " - " + sync_key + ")");
            table_sync(table_name);
        }

    }
    function insert_all_data(data)
    {
        /* DELETE DATA FROM TABLE FIRST */
        if(data.length > 0)
        {
            var delete_query = "DELETE FROM " + current_table;
            console.log(delete_query);
            db.transaction(function (tx)
            {
                tx.executeSql(delete_query, [], function (tx, results)
                {
                    table_sync_key = 0;
                    insert_query_sync(data, table_sync_key);
                });
            });
        }
        else
        {
            next_table();
        }


        
        // var ctr_total = data.length;
        // var ctr_len = 0;

        // $.each(data, function(a, b)
        // {
        //     query = data[a];
        //     percentage = ((ctr_len) / data.length) * 100;
        //     $(".progress").removeClass('hide');
        //     $(".progress-bar").css("width", (percentage).toFixed(2) + "%");
        //     $(".progress-bar").html("Synchronizing data " + (percentage).toFixed(2) + "%");
        //     $(".progress-bar").attr("aria-valuenow", (percentage).toFixed(2));

        //     insert_query_sync(query);    
        // });
    }
    function action_update_timestamp_v2(last_updated, callback)
    {
        db.transaction(function (tx)
        {
            query = "INSERT INTO tbl_timestamp (table_name, timestamp) values ('last_updated','"+last_updated+"')";
            tx.executeSql(query,[], function(txt, result)
            {
                console.log(result);
                callback(result);
            },
            onError);
        });
    }
    function insert_query_sync(data, table_sync_key)
    {
        var current_count = table_sync_key+1;
        var final_count = data.length;

        db.transaction(function (tx)
        {
            console.log(data[table_sync_key]);

            tx.executeSql(data[table_sync_key], [], function (tx, results)
            {
                $summary_html = "<div>Overall " + " (" + (sync_key) + " of " + all_tbl_name.length + ")" + "</div>" +
                                "<div>" + current_table + " (" + (current_count) + " of " + final_count + ")" + "</div>";
                $(".data-text").html($summary_html);
                
                if(current_count == final_count)
                {
                    next_table();
                }
                else
                {
                    insert_query_sync(data, table_sync_key+1);
                }

                
            });
        });
    }
	function query_create_table()
	{
        var query = [];

        query[1] = "CREATE TABLE IF NOT EXISTS tbl_audit_trail ( audit_trail_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, remarks TEXT, old_data  NOT NULL, new_data NOT NULL, created_at DATETIME, updated_at DATETIME, source VARCHAR(255),source_id INTEGER, audit_shop_id INTEGER)";
        query[2] = "CREATE TABLE IF NOT EXISTS tbl_shop(shop_id INTEGER PRIMARY KEY AUTOINCREMENT,shop_key VARCHAR(255) NOT NULL, shop_date_created DATETIME NOT NULL default '1000-01-01 00:00:00', shop_date_expiration DATETIME NOT NULL default '1000-01-01 00:00:00',shop_last_active_date DATETIME NOT NULL default '1000-01-01 00:00:00',shop_status VARCHAR(50) NOT NULL default 'trial', shop_country INTEGER NOT NULL,shop_city VARCHAR(255) NOT NULL, shop_zip VARCHAR(255) NOT NULL, shop_street_address VARCHAR(255) NOT NULL,shop_contact VARCHAR(255) NOT NULL,url TEXT ,shop_domain VARCHAR(255) NOT NULL default 'unset_yet',shop_theme VARCHAR(255) NOT NULL default 'default',shop_theme_color VARCHAR(255) NOT NULL default 'gray',member_layout VARCHAR(255) NOT NULL default 'default',shop_wallet_tours INTEGER NOT NULL default '0', shop_wallet_tours_uri VARCHAR(255) default NULL,shop_merchant_school INTEGER NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
        query[3] = "CREATE TABLE IF NOT EXISTS tbl_category (type_id INTEGER PRIMARY KEY AUTOINCREMENT, type_name VARCHAR(255) NOT NULL, type_parent_id INTEGER NOT NULL, type_sub_level TINYINT NOT NULL,type_shop INTEGER NOT NULL, type_category VARCHAR(255) NOT NULL default 'inventory', type_date_created DATETIME NOT NULL,archived TINYINT NOT NULL,is_mts TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
        query[4] = "CREATE TABLE IF NOT EXISTS tbl_chart_account_type (chart_type_id INTEGER PRIMARY KEY AUTOINCREMENT,  chart_type_name VARCHAR(255) NOT NULL, chart_type_description VARCHAR(1000) NOT NULL, has_open_balance TINYINT NOT NULL, chart_type_category TINYINT NOT NULL, normal_balance VARCHAR(255) NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[5] = "CREATE TABLE IF NOT EXISTS tbl_chart_of_account (account_id INTEGER PRIMARY KEY AUTOINCREMENT,  account_shop_id INTEGER, account_type_id INTEGER,account_number VARCHAR(255), account_name VARCHAR(255), account_full_name VARCHAR(255), account_description VARCHAR(255), account_parent_id INTEGER NULl, account_sublevel INTEGER, account_balance REAL, account_open_balance REAL, account_open_balance_date DATE, is_tax_account TINYINT, account_tax_code_id INTEGER, archived TINYINT, account_timecreated DATETIME, account_protected TINYINT, account_code VARCHAR(255), created_at DATETIME, updated_at DATETIME)";
        query[6] = "CREATE TABLE IF NOT EXISTS tbl_country (country_id INTEGER PRIMARY KEY AUTOINCREMENT, country_code VARCHAR(255) NOT NULL, country_name VARCHAR(255) NOT NULL, created_at DATETIME, updated_at DATETIME)";
        /*CREDIT MEMO*/
        query[7] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo (cm_id INTEGER PRIMARY KEY AUTOINCREMENT, cm_customer_id INTEGER NOT NULL, cm_shop_id INTEGER NOT NULL, cm_ar_acccount INTEGER NOT NULL,cm_customer_email VARCHAR(255)  NOT NULL, cm_date date NOT NULL, cm_message VARCHAR(255)  NOT NULL, cm_memo VARCHAR(255)  NOT NULL, cm_amount REAL NOT NULL, date_created DATETIME NOT NULL, cm_type TINYINT NOT NULL default '0', cm_used_ref_name VARCHAR(255) NOT NULL default 'returns', cm_used_ref_id INTEGER NOT NULL, cm_status TINYINT default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
        query[8] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo_line (cmline_id INTEGER PRIMARY KEY AUTOINCREMENT, cmline_cm_id INTEGER  NOT NULL, cmline_service_date datetime NOT NULL, cmline_um INTEGER NOT NULL, cmline_item_id INTEGER NOT NULL, cmline_description VARCHAR(255)  NOT NULL, cmline_qty INTEGER NOT NULL, cmline_rate REAL NOT NULL, cmline_amount REAL NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[9] = "CREATE TABLE IF NOT EXISTS tbl_customer (customer_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER  NOT NULL, country_id INTEGER NOT NULL, title_name VARCHAR(100)  NOT NULL, first_name VARCHAR(255)  NOT NULL, middle_name VARCHAR(255)  NOT NULL, last_name VARCHAR(255)  NOT NULL, suffix_name VARCHAR(100)  NOT NULL, email VARCHAR(255)  NOT NULL, password text NULL, company VARCHAR(255)  default NULL, b_day date NULL default '0000-00-00', profile VARCHAR(255)  default NULL, IsWalkin TINYINT NULL, created_date date default NULL, archived TINYINT default '0', ismlm INTEGER default '0', mlm_username VARCHAR(255)  default NULL, tin_number VARCHAR(255)  default NULL,  is_corporate TINYINT NOT NULL default '0', approved TINYINT NOT NULL default '1', created_at DATETIME, updated_at DATETIME, customer_phone VARCHAR(255) NULL,customer_mobile VARCHAR(255) NULL,customer_fax VARCHAR(255) NULL, get_status VARCHAR(255) DEFAULT 'new' NULL)";
        query[10] = "CREATE TABLE IF NOT EXISTS tbl_customer_address (customer_address_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER  NULL, country_id INTEGER  NULL, customer_state VARCHAR(255)  NULL, customer_city VARCHAR(255)  NULL,  customer_zipcode VARCHAR(255)  NULL, customer_street text  NULL, purpose VARCHAR(255)  NULL, archived TINYINT NULL, created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";   
        query[11] = "CREATE TABLE IF NOT EXISTS tbl_customer_attachment (customer_attachment_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_id INTEGER  NOT NULL, customer_attachment_path text  NOT NULL, customer_attachment_name VARCHAR(255)  NOT NULL, customer_attachment_extension VARCHAR(255)  NOT NULL, mime_type VARCHAR(255)  NOT NULL, archived TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
        /*INVOICE*/
        query[12] = "CREATE TABLE IF NOT EXISTS tbl_customer_invoice (inv_id INTEGER PRIMARY KEY AUTOINCREMENT, new_inv_id INTEGER NOT NULL, inv_shop_id INTEGER NOT NULL, inv_customer_id INTEGER NOT NULL, inv_customer_email VARCHAR(255)  NOT NULL, inv_customer_billing_address VARCHAR(255)  NOT NULL, inv_terms_id TINYINT NOT NULL, inv_date DATE NOT NULL, inv_due_date DATE NOT NULL, inv_message VARCHAR(255)  NOT NULL, inv_memo VARCHAR(255)  NOT NULL, inv_discount_type VARCHAR(255)  NOT NULL, inv_discount_value INTEGER NOT NULL, ewt REAL NOT NULL, taxable TINYINT NOT NULL, inv_subtotal_price REAL NOT NULL,  inv_overall_price REAL NOT NULL, inv_payment_applied REAL NOT NULL, inv_is_paid TINYINT NOT NULL, inv_custom_field_id INTEGER NOT NULL, date_created DATETIME NOT NULL, credit_memo_id INTEGER NOT NULL default '0', is_sales_receipt TINYINT NOT NULL, sale_receipt_cash_account INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255)  DEFAULT 'new' NULL)"; 
        query[13] = "CREATE TABLE IF NOT EXISTS tbl_customer_invoice_line (invline_id INTEGER PRIMARY KEY AUTOINCREMENT, invline_inv_id INTEGER  NOT NULL, invline_service_date DATE NOT NULL, invline_item_id INTEGER NOT NULL, invline_description VARCHAR(255)  NOT NULL, invline_um INTEGER NOT NULL, invline_qty INTEGER NOT NULL, invline_rate REAL NOT NULL, taxable TINYINT NOT NULL, invline_discount REAL NOT NULL, invline_discount_type VARCHAR(255) NOT NULL, invline_discount_remark VARCHAR(255) NOT NULL, invline_amount REAL NOT NULL, date_created DATETIME NOT NULL, invline_ref_name VARCHAR(255)  NOT NULL, invline_ref_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[14] = "CREATE TABLE IF NOT EXISTS tbl_position (position_id INTEGER PRIMARY KEY AUTOINCREMENT, position_name VARCHAR(255)  NOT NULL, daily_rate decimal(8,2) NOT NULL, position_created DATETIME NOT NULL, archived TINYINT NOT NULL default '0', position_code VARCHAR(255)  NOT NULL, position_shop_id INTEGER  NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[15] = "CREATE TABLE IF NOT EXISTS tbl_truck (truck_id INTEGER PRIMARY KEY AUTOINCREMENT, plate_number VARCHAR(255)  NOT NULL, warehouse_id INTEGER  NOT NULL, date_created DATETIME NOT NULL, archived TINYINT NOT NULL default '0', truck_model VARCHAR(255)  NOT NULL, truck_kilogram decimal(8,2) NOT NULL, truck_shop_id INTEGER  NOT NULL, created_at DATETIME, updated_at DATETIME)";
        /*EMPLOYEE INFO*/
        query[16] = "CREATE TABLE IF NOT EXISTS tbl_employee (employee_id INTEGER PRIMARY KEY AUTOINCREMENT,shop_id INTEGER  NOT NULL,  warehouse_id INTEGER  NOT NULL, first_name VARCHAR(255)  NOT NULL, middle_name VARCHAR(255)  NOT NULL, last_name VARCHAR(255)  NOT NULL, gender VARCHAR(255)  NOT NULL, email VARCHAR(255)  NOT NULL, username VARCHAR(255)  NOT NULL,  password text  NOT NULL, b_day DATE NOT NULL, position_id INTEGER  NOT NULL, date_created DATETIME NOT NULL, archived TINYINT NOT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
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
        query[28] = "CREATE TABLE IF NOT EXISTS tbl_manual_invoice (manual_invoice_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NULL, inv_id INTEGER  NULL, manual_invoice_date DATETIME NULL, is_sync TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
        query[29] = "CREATE TABLE IF NOT EXISTS tbl_manual_receive_payment ( manual_receive_payment_id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER NULL, rp_id INTEGER NULL, sir_id INTEGER NULL, rp_date DATETIME NULL,  is_sync TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
        query[30] = "CREATE TABLE IF NOT EXISTS tbl_manufacturer (manufacturer_id INTEGER PRIMARY KEY AUTOINCREMENT, manufacturer_name VARCHAR(255)  NOT NULL, manufacturer_address VARCHAR(255)  NOT NULL, phone_number VARCHAR(255)  NOT NULL, email_address VARCHAR(255)  NOT NULL, website text  NOT NULL, date_created DATETIME NOT NULL, date_updated DATETIME NOT NULL, archived TINYINT NOT NULL default '0', manufacturer_shop_id INTEGER  NOT NULL, manufacturer_fname VARCHAR(255)  NOT NULL,  manufacturer_mname VARCHAR(255)  NOT NULL, manufacturer_lname VARCHAR(255)  NOT NULL, manufacturer_image INTEGER default NULL, created_at DATETIME, updated_at DATETIME)";
        /*RECEIVE PAYMENT*/
        query[31] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment (rp_id INTEGER PRIMARY KEY AUTOINCREMENT, rp_shop_id INTEGER NOT NULL, rp_customer_id INTEGER NOT NULL, rp_ar_account INTEGER NOT NULL, rp_date date NOT NULL, rp_total_amount REAL(8,2) NOT NULL, rp_payment_method VARCHAR(255)  NOT NULL, rp_memo text  NOT NULL, date_created DATETIME NOT NULL, rp_ref_name VARCHAR(255)  NOT NULL, rp_ref_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";
        query[32] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment_line ( rpline_id INTEGER PRIMARY KEY AUTOINCREMENT, rpline_rp_id INTEGER  NOT NULL, rpline_reference_name VARCHAR(255)  NOT NULL, rpline_reference_id INTEGER NOT NULL, rpline_amount REAL(8,2) NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[33] = "CREATE TABLE IF NOT EXISTS tbl_settings ( settings_id INTEGER PRIMARY KEY AUTOINCREMENT, settings_key VARCHAR(255)  NOT NULL, settings_value longtext , settings_setup_done TINYINT NOT NULL default '0', shop_id INTEGER  NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[34] = "CREATE TABLE IF NOT EXISTS tbl_sir_cm_item (s_cm_item_id INTEGER PRIMARY KEY AUTOINCREMENT, sc_sir_id INTEGER  NOT NULL, sc_item_id INTEGER NOT NULL, sc_item_qty INTEGER NOT NULL, sc_physical_count INTEGER NOT NULL, sc_item_price REAL NOT NULL, sc_status INTEGER NOT NULL, sc_is_updated TINYINT NOT NULL, sc_infos REAL NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[35] = "CREATE TABLE IF NOT EXISTS tbl_sir_inventory ( sir_inventory_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_item_id INTEGER  NULL, inventory_sir_id INTEGER  NULL, sir_inventory_count INTEGER NULL, sir_inventory_ref_name VARCHAR(255)  NULL, sir_inventory_ref_id INTEGER NULL, created_at DATETIME, updated_at DATETIME, is_bundled_item TINYINT, get_status VARCHAR(255) DEFAULT 'new' NULL)";
        query[36] = "CREATE TABLE IF NOT EXISTS tbl_sir_item ( sir_item_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NOT NULL,  item_id INTEGER  NOT NULL, item_qty INTEGER NOT NULL, archived TINYINT NOT NULL default '0', related_um_type VARCHAR(255)  NOT NULL, total_issued_qty INTEGER NOT NULL default '0', um_qty INTEGER NOT NULL, sold_qty INTEGER NOT NULL, remaining_qty INTEGER NOT NULL, physical_count INTEGER NOT NULL, status VARCHAR(255)  NOT NULL, loss_amount decimal(8,2) NOT NULL, sir_item_price REAL NOT NULL, is_updated TINYINT NOT NULL default '0', infos REAL NOT NULL default '0', created_at DATETIME, updated_at DATETIME)";
        query[37] = "CREATE TABLE IF NOT EXISTS tbl_sir_sales_report (sir_sales_report_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER NOT NULL, report_data TEXT NOT NULL, report_created DATETIME NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[38] = "CREATE TABLE IF NOT EXISTS tbl_terms (terms_id INTEGER PRIMARY KEY AUTOINCREMENT, terms_shop_id INTEGER NOT NULL,  terms_name VARCHAR(255)  NOT NULL, terms_no_of_days INTEGER NOT NULL , archived TINYINT NOT NULL, created_at DATETIME NOT NULL default '0000-00-00 00:00:00', updated_at DATETIME NOT NULL default '0000-00-00 00:00:00')";
        query[39] = "CREATE TABLE IF NOT EXISTS tbl_um ( id INTEGER PRIMARY KEY AUTOINCREMENT, um_name VARCHAR(255)  NOT NULL, um_abbrev VARCHAR(255)  NOT NULL, is_based TINYINT NOT NULL, um_shop_id INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[40] = "CREATE TABLE IF NOT EXISTS tbl_unit_measurement ( um_id INTEGER PRIMARY KEY AUTOINCREMENT, um_shop INTEGER  NOT NULL, um_name VARCHAR(255)  NOT NULL, is_multi TINYINT NOT NULL, um_date_created DATETIME NOT NULL, um_archived TINYINT NOT NULL, um_type INTEGER  NOT NULL, parent_basis_um INTEGER NOT NULL default '0', um_item_id INTEGER NOT NULL default '0',  um_n_base INTEGER NOT NULL, um_base INTEGER NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[41] = "CREATE TABLE IF NOT EXISTS tbl_unit_measurement_multi (multi_id INTEGER PRIMARY KEY AUTOINCREMENT, multi_um_id INTEGER  NOT NULL, multi_name VARCHAR(255)  NOT NULL, multi_conversion_ratio REAL NOT NULL, multi_sequence TINYINT NOT NULL,  unit_qty INTEGER NOT NULL, multi_abbrev VARCHAR(255)  NOT NULL, is_base TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[42] = "CREATE TABLE IF NOT EXISTS tbl_user ( user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_email VARCHAR(255)  NOT NULL, user_level INTEGER NOT NULL, user_first_name VARCHAR(255)  NOT NULL, user_last_name VARCHAR(255)  NOT NULL, user_contact_number VARCHAR(255)  NOT NULL, user_password text  NOT NULL, user_date_created DATETIME NOT NULL default '1000-01-01 00:00:00', user_last_active_date DATETIME NOT NULL default '1000-01-01 00:00:00', user_shop INTEGER  NOT NULL,  IsWalkin TINYINT NOT NULL, archived TINYINT NOT NULL, created_at DATETIME, updated_at DATETIME)";
        query[43] = "CREATE TABLE IF NOT EXISTS tbl_manual_credit_memo (manual_cm_id INTEGER PRIMARY KEY AUTOINCREMENT, sir_id INTEGER  NULL, cm_id INTEGER NULL, manual_cm_date DATETIME NULL, is_sync TINYINT NULL default '0', created_at DATETIME, updated_at DATETIME, get_status VARCHAR(255) DEFAULT 'new' NULL)";    
        query[44] = "CREATE TABLE IF NOT EXISTS tbl_default_chart_account (default_id INTEGER PRIMARY KEY AUTOINCREMENT, default_type_id INTEGER, default_number INTEGER, default_name VARCHAR(255), default_description VARCHAR(255) , default_parent_id INTEGER NOT NULL, default_sublevel INTEGER NOT NULL, default_balance REAL NOT NULL, default_open_balance REAL NOT NULL, default_open_balance_date date NOT NULL, is_tax_account TINYINT NOT NULL, account_tax_code_id INTEGER NOT NULL, default_for_code VARCHAR(255) , account_protected TINYINT NOT NULL,created_at DATETIME, updated_at DATETIME)";
        query[45] = "CREATE TABLE IF NOT EXISTS tbl_timestamp (timestamp_id INTEGER PRIMARY KEY AUTOINCREMENT, table_name VARCHAR(255), timestamp DATETIME)";
        query[46] = "CREATE TABLE IF NOT EXISTS tbl_agent_logon (login_id INTEGER PRIMARY KEY AUTOINCREMENT, agent_id INTEGER, selected_sir INTEGER NULL, date_login DATETIME)";
        query[47] = "CREATE TABLE IF NOT EXISTS tbl_payment_method (payment_method_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER, payment_name VARCHAR(255), isDefault TINYINT,archived TINYINT)";
        query[48] = "CREATE TABLE IF NOT EXISTS tbl_invoice_log (record_id INTEGER PRIMARY KEY AUTOINCREMENT, shop_id INTEGER, transaction_customer_id INTEGER, transaction_name VARCHAR(255) NULL, transaction_id INTEGER NULL, transaction_amount REAL NULL, date_created DATETIME NULL)";
        query[49] = "CREATE TABLE IF NOT EXISTS tbl_credit_memo_applied_payment (id INTEGER PRIMARY KEY AUTOINCREMENT, cm_id INTEGER, applied_ref_name VARCHAR(255) NULL, applied_ref_id INTEGER NULL, applied_amount REAL NULL, created_at DATETIME NULL, get_status VARCHAR(255) default 'new' NULL)";
        query[50] = "CREATE TABLE IF NOT EXISTS tbl_receive_payment_credit (rp_credit_id INTEGER PRIMARY KEY AUTOINCREMENT, rp_id INTEGER, credit_reference_name VARCHAR(255) NULL, credit_reference_id INTEGER NULL, credit_amount REAL NULL, date_created DATETIME NULL, get_status VARCHAR(255) default 'new' NULL)";

        onload_create_table(query);
	}
	function onload_create_table(query)
	{
        query.forEach(function(single_query) 
        {
            createTableName(single_query);
        });
	}
    function action_click_test_update_shop()
    {
        $(".update-sync-data").unbind("click");
        $(".update-sync-data").bind("click", function()
        {
            var datetime = getDateNow();
            console.log(datetime);
            db.transaction(function (tx)
            {
            	var query = "UPDATE tbl_shop SET shop_key = 'tsdest_arsdsadc', updated_at = '"+datetime+"' where shop_id = '2'";
            	tx.executeSql(query,[],	function(txt, result)
            	{
            		console.log(result);
            		action_update_timestamp(datetime);
            	},
            	onError);
            });
        });
    }	
    function action_update_timestamp(last_updated)
    {
    	db.transaction(function (tx)
    	{
    		query = "INSERT INTO tbl_timestamp (table_name, timestamp) values ('last_updated','"+last_updated+"')";
    		tx.executeSql(query,[],	function(txt, result)
    		{
    			console.log(result);
    		},
    		onError);
    	});
    }
	function action_click_sync()
	{
        $(".sync-data").unbind("click");
        $(".sync-data").bind("click", function()
        {
	    var first_date = "";
	    var last_date = "";
	    //GET DATA FROM TBL_TIMESTAMP FIRST DATE AND LAST;
    	    db.transaction(function (tx)
        	{
        		query = "SELECT timestamp FROM tbl_timestamp LIMIT 1";
        		tx.executeSql(query,[],	function(txt, result)
        		{
        		    var data1 = result.rows;   
    	            first_date = data1[0]['timestamp'];
        		});
        		query = "SELECT timestamp FROM tbl_timestamp ORDER BY timestamp_id DESC LIMIT 1";
        		tx.executeSql(query,[],	function(txt, result)
        		{
        		    var data2 = result.rows;  
    	            last_date = data2[0]['timestamp'];
    	            
        		
            		event_search_for_data_in_browser(first_date, last_date);
        		});
        		
    		});
        });
	}
	function event_search_for_data_in_browser(first_date, last_date)
	{
	    db.transaction(function (tx)
    	{
    	    // IN SHOP
    	    query = "SELECT * FROM tbl_shop where updated_at >= '"+first_date+"' and updated_at <= '"+last_date+"'";
    	    tx.executeSql(query,[],	function(txt, result)
    		{
			    var dataset = result.rows;
    		    $(dataset).each(function(a, b)
    		    {
    		        console.log(dataset[a]);
    		    });
    		    var table = "tbl_shop";
                var new_data = JSON.stringify(dataset);    		    
    		    update_web_server(table, new_data);
    		});
    	});
	}
	function update_web_server(table, dataset)
	{
	    console.log(dataset);
	    $.ajax({
	        url : "/tablet/update_sync_data",
	        type : "get",
	        data : {table : table, dataset : dataset},
	        dataType : "json",
	        success :function()
	        {
	            
	        }
	    })
	    
	}
	function insert_sample()
	{

        $(".sync-data").unbind("click");
        $(".sync-data").bind("click", function()
        {
        	
        });
	}
    function createTableName(query)
    {
    	db.transaction(function (tx){ tx.executeSql(query,[],
    		function(txt, result)
    		{
    			console.log(result);
    		},
    		onError);
    	});
    }
    function getDateNow()
    {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime;
    }
    function onError(tx, error)
    {
    	console.log(error.message);
    }
}
	