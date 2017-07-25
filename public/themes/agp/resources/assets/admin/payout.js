
var payout = new payout();
var breakdown = null;
var allSlotBal = 0;
var allProcessedEncashment = 0;

function payout()
{
	$(document).ready(function()
	{
		

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
          	allSlotBal = currency_format(parseFloat($(this).attr('all-slot-total-balanace')));
          	allProcessedEncashment = currency_format(parseFloat($(this).attr('all-processed-encashment-amount')));
          	console.log(allSlotBal);
          	showbreakdown();
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
			var t_amount = 0;
			var t_deduction = 0;
			var t_recievalble = 0;
			$.each(breakdown, function( key, value ) 
            {
            	var slot_bal =  parseFloat(value.balance) <= 0 ? "" : currency_format(value.balance);
	            var slot = value.slot_id;
                var amount = parseFloat(value.amount);
                var deduction = parseFloat(value.deduction);
                var total = parseFloat(amount) - parseFloat(deduction);
                overall  = (parseFloat(overall) + parseFloat(amount)) - parseFloat(deduction);
                t_amount = t_amount + amount;
                t_deduction = t_deduction + deduction;
                t_recievalble = t_recievalble + total;
                 str =  str + 
                 			'<tr class="text-center">'+
                            '<td>'+slot+'</td>'+
                            '<td>'+currency_format(amount)+'</td>'+
                            '<td>'+currency_format(deduction)+'</td>'+
                            '<td>'+currency_format(total)+'</td>'+
                            '<td>'+slot_bal+'</td>'+

                        '</tr>';     
            }); 

				$("#totalcontainer").text(currency_format(overall));
                $(".break").append(str);
                $('.t_amount').text(currency_format(t_amount));
                $('.t_deduction').text(currency_format(t_deduction));
                $('.t_recievalble').text(currency_format(t_recievalble));
               	$('.all-slot-bal').text(allSlotBal);
               	$('.all-processed-encashment').text(allProcessedEncashment);



	}

	function currency_format($price)
	{
		Amount = $price;
		var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1);

		var AmountWithCommas = Amount.toLocaleString();
		var arParts = String(AmountWithCommas).split(DecimalSeparator);
		var intPart = arParts[0];
		var decPart = (arParts.length > 1 ? arParts[1] : '');
		decPart = (decPart + '00').substr(0,2);

		return  intPart + DecimalSeparator + decPart;
	}

}