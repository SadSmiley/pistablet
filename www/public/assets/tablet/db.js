db.transaction( function (tx){
		tx.executeSql("SELECT * FROM " +temp_saleItem + " WHERE sale_id = "+id,[], 
		function (tx, result){
			var dataset = result.rows;
			var items;
			var totalPusrchased = 0;
			var totalamount = 0;
			// alert(id);
			for(var i = 0, items = null; i<= (dataset.length - 1); i++){
				items = dataset.item(i);

				totalPusrchased = totalPusrchased + parseFloat(items["quantity_purchased"]);
				totalamount = totalamount + (parseFloat(items["quantity_purchased"]) * parseFloat(items["item_unit_price"]));
				$(".itemPurchased").html(totalPusrchased.toFixed(2));
				$(".Total").html(totalamount.toFixed(2));
				console.log(totalamount.toFixed(2));

			}
		}, function (tx, error){
			// console.log(error);
		});