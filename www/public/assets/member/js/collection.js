var collection = new collection();

function collection(){
    init();
    function init(){
        visibility();
    }
    function visibility(){
        $(".visibility-toggle").unbind("change");
        $(".visibility-toggle").bind("change",function(){
            var id = $(this).data("content");
            var check = $(this).is(':checked');
           
            $.ajax({
                url     :   "/member/product/collection/collectionvisibility",
                type    :   "POST",
                data    :   {
                    id:id,
                    check:check,
                    _token:misc('_token')
                },
                success :   function(result){
                    toastr.success("Visibility changed.");
                },
                error   :   function(err){
                    toastr.error("Error, something went wrong.");
                }
            });
        });
    }
    function misc(str){
        switch(str){
            case '_token':
                return $("#_token").val();
                break;
        }
    }
}