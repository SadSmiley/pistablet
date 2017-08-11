
var global_tablet_html = $(".tablet-div-script").html();
$(document).ready(function()
{
    check_if_edit_rp();
});
function check_if_edit_rp()
{
	get_shop_id(function(shop_id)
    {
        get_session('rp_id', function (rp_id)
        {
        	get_rp_data(rp_id, function(rp, _rpline)
        	{

        	});
        });
    });
}