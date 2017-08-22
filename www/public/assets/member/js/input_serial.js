var global_div = $(".div-input-serial").html();
var text_serial = "";
number_tr_serial();
action_add_serial();
$(document).on("click", ".panel-body .input-serial-list .tr-serial:last", function(){
	add_click_tr_serial();
});
function number_tr_serial()
{
	var num = 1;
	$(".tr-serial .number-tr-serial").each(function(){
		$(this).html(num);
		num++;
	});
}
function add_click_tr_serial()
{
	$(".input-serial-list").append(global_div);	
	number_tr_serial();
}
function action_add_serial()
{
	// $(".btn-save-serial").unbind("click");
	$(".btn-save-serial").click(function()
	{
		$(".input-serial-list .serial-number-txt").each(function()
		{
			if($(this).val())
			{
				text_serial += $(this).val() + ",";
			}
		});
		console.log(text_serial);
		$(".txt-serial-number").val(text_serial);
		$("#global_modal").modal("toggle");
	});
	// console.log("serial - " + text_serial);
}
function consolelog(console_text)
{
	console.log(console_text);
}