var setting = new setting();

function setting(){
    init();
    function init(){
        
    }
    
}
function submit_done(result){
    // console.log(result);
    if(result.trigger == 'bank'){
        $(".table-bank-active").append(result.result);
    }
    if(result.trigger == 'bank update'){
        $("#banking-"+result.id).html(result.result);
    }
    if(result.trigger == 'archive'){
        $(result.id).remove();
        $(result.table).append(result.result);
    }
    if(result.trigger == 'remittance'){
        $(".table-remittance-active").append(result.result);
    }
    if(result.trigger == 'remittance update'){
        $("#remittance-"+result.id).html(result.result);
    }
    
    if(result.trigger == 'setting')
    {
        
        toastr.success("Updated successfully.");
        window.location = '/member/ecommerce/settings';
    }
    $("#global_modal").modal("hide");
}