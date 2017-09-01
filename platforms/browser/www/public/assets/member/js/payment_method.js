function submit_done(data)
{
	if(data.status == "success")
    {
        toastr.success("Success");
        $(".payment-method-container").load("/member/maintenance/payment_method .payment-method-container"); 
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
function selectDefault(id)
{
    $(".modal-loader").removeClass("hidden");
    $.ajax({
        url : "/member/maintenance/payment_method/update",
        type : "get",
        data : {id : id},
        success : function(data)
        {
            toastr.success("Success");
            $(".payment-method-container").load("/member/maintenance/payment_method .payment-method-container", function()
            {
               $(".modal-loader").addClass("hidden");
            });     
        }
    })
}