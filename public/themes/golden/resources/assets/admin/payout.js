
var payout = new payout();
var breakdown = null;

function payout()
{
	$(document).ready(function()
	{
		
		alert(12344);
		initialize();


	});

	function initialize()
	{
       $('.processor').on('click', '.showmodal-p', function()
       {
			var inst = $('[data-remodal-id=process]').remodal();
			$('.secretid').val($(this).attr('accid'));
			$('#1').val($(this).attr('accnm'));
			$('#2').val($(this).attr('sum'));
			$('#3').val($(this).attr('deduction'));
			$('#4').val($(this).attr('total'));
			$('#5').val($(this).attr('type'));

          	inst.open(); 
       });

       $('.processor').on('click', '.showmodal-b', function()
       {
			var inst = $('[data-remodal-id=breakdown]').remodal();
          	inst.open(); 
          	breakdown = jQuery.parseJSON($(this).attr('json'));
          	console.log(breakdown);
          	// showbreakdown();
       });

       $("#processall").click(function(){
       		var inst = $('[data-remodal-id=processall]').remodal();
          	inst.open(); 
       });

      $("#autoencash").click(function(){
       		var inst = $('[data-remodal-id=autoencash]').remodal();
          	inst.open(); 
       });
	}

	function showbreakdown()
	{
			var overall = 0;
			var str="";
			$(".break").empty();
			$.each(breakdown, function( key, value ) 
            {
	            var slot = value.slot_id;
                var amount = value.amount;
                var deduction = value.deduction;
                var total = parseFloat(amount) - parseFloat(deduction);
                overall  = (parseFloat(overall) + parseFloat(amount)) - parseFloat(deduction);
               	var bal = parseFloat(value.balance) == 0 ? "" : value.balance;

                 str =  str + 
                 			'<tr class="text-center">'+
                            '<td>'+slot+'</td>'+
                            '<td>'+currency_format(amount)+'</td>'+
                            '<td>'+currency_format(deduction)+'</td>'+
                            '<td>'+currency_format(total)+'</td>'+
                            '<td>'+currency_format(bal)+'</td>'+
                        '</tr>';     
            }); 

				$("#totalcontainer").text(currency_format(overall));
                $(".break").append(str); 
	}

	function currency_format($price)
	{
		// Amount = $price;
		// var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);

		// var AmountWithCommas = Amount.toLocaleString();
		// var arParts = String(AmountWithCommas).split(DecimalSeparator);
		// var intPart = arParts[0];
		// var decPart = (arParts.length > 1 ? arParts[1] : '');
		// decPart = (decPart + '00').substr(0,2);

		// return  intPart + DecimalSeparator + decPart;
		return $price;
	}

}