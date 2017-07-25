var samplewebdb = new samplewebdb();
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

function samplewebdb()
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
		action_create_initial_data();
		add_event_search();
	}

	function action_create_initial_data()
	{
		db.transaction(function (tx)
		{ 
				//tx.executeSql('DROP TABLE LOGS');
			   tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (log_id INTEGER PRIMARY KEY, log VARCHAR)');
			   tx.executeSql('INSERT INTO LOGS (log) VALUES ("' + makeid() + '")');
			   tx.executeSql('INSERT INTO LOGS (log) VALUES ("' + makeid() + '")');
			   tx.executeSql('INSERT INTO LOGS (log) VALUES ("' + makeid() + '")');
			   tx.executeSql('INSERT INTO LOGS (log) VALUES ("' + makeid() + '")');
		});
	}

	function makeid()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}

	function add_event_search()
	{
		$(".search").keyup(function(e)
		{
			var keyword = $(e.currentTarget).val();
			action_search_keyword(keyword);
		});
	}
	function action_search_keyword(keyword)
	{
		$(".search-result").html("");
		db.transaction(function (tx)
		{
			tx.executeSql('SELECT * FROM LOGS WHERE log LIKE "%' + keyword  + '%"', [], function (tx, results)
			{
			      var len = results.rows.length, i;
			      for (i = 0; i < len; i++)
			      {
			      	$(".search-result").append("<li>" + results.rows.item(i).log + "</li>")
			      }
			}, null);
		});
	}
}