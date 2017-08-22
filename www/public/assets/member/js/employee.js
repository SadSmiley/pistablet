$(".drop-down-position").globalDropList(
{
    hasPopup : "false",
    width: '100%',
    link_size: 'md',
    placeholder: 'Position'
});
function submit_done(data)
{
    if(data.type == "position")
    {        
        toastr.success("Success");
        $(".drop-down-position").load("/member/pis/agent/add .drop-down-position option", function()
        {                
             $(".drop-down-position").globalDropList("reload"); 
             $(".drop-down-position").val(data.id).change();              
        });
        data.element.modal("hide");
    }
	else if(data.status == "success")
    {
        toastr.success("Success");
        $(".employee-container").load("/member/cashier/agent_list .employee-container"); 
        $(data.target).html(data.view);
        $('#global_modal').modal('toggle');
        $("#all-list").addClass("active");
        $("#archived-list").removeClass("active");
    }
    else if(data.status == "error")
    {
        toastr.warning(data.status_message);
        $(data.target).html(data.view);
    }
    else
    {
        $(data.error).each(function( index )
        {
          toastr.warning(data.error[index]);
        });
    }
}