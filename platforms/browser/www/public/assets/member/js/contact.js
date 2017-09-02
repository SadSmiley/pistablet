var contact = new contact();
function contact() {
    init();
    function init() {
        _ready();
    }
    function _ready() {
        contactCreate();
        contactOperation();
        setPrimary();
    }
    function contactCreate() {
        $(".btn-create").unbind("click");
        $(".btn-create").bind("click", function(){
            var category = $("#category").val();
            var new_contact = $("#new_contact").val();
            if(new_contact != '' && category != ''){
                $(".btn-create").html(misc('spinner'));
                $.ajax({
                    url     :   "/member/contact/createContact",
                    type    :   "POST",
                    data    :   {
                        _token:misc('_token'),
                        category:category,
                        new_contact:new_contact
                    },
                    success :   function (result) {
                        toastr.success('Contact has been added.');
                        $(".btn-create").html('Create');
                        $("#new_contact").val('');
                        $(".tbl-contact").append(result);
                        contactOperation();
                    },
                    error   :   function (err) {
                        $(".btn-create").html('Create');
                        toastr.error('Error, something went wrong.');
                    }
                });
            }
            else{
                toastr.error("Please fill the missing field/s.");
            }
        });
        $(".set-location").unbind("click");
        $(".set-location").bind("click", function () {
            var locations = $("#new_location").val();
            if(locations != ''){
                $(".set-location").html(misc('spinner'));
                $.ajax({
                    url      :  "/member/contact/createLocation",
                    type     :  "POST",
                    data     :  {
                       locations:locations,
                       _token:misc('_token')
                    },
                    success  :  function (result) {
                        $("#new_location").val("");
                        $(".tbl-location").append(result);
                        toastr.success('Location has been added.');
                        $(".set-location").html('Create');
                        contactOperation();
                        setPrimary();
                    },
                    error    :  function (err) {
                        toastr.error('Error, something went wrong.');
                        $(".set-location").html('Create');
                    }
                });
            }
            else{
                toastr.error('Please fill the missing field.');
            }
        });
    }
    function contactOperation(argument) {
        $(".edit-contact").unbind("click");
        $(".edit-contact").bind("click", function () {
            var content = $(this).data("content");
            $(".modal-update").html(misc('loader-16-gray'));
            $.ajax({
                url     :   "/member/contact/loadContact",
                type    :   "POST",
                data    : {
                    content:content,
                    _token:misc('_token')
                },
                success :   function (result) {
                    $(".modal-update").html(result);
                    $(".btn-del-modal").attr("data-content",content);
                    $(".btn-update-modal").attr("data-content",content);
                    $(".btn-update-modal").attr("data-trigger","contact");
                    $(".btn-del-modal").attr("data-url","/member/contact/remContact/");
                    $(".btn-del-modal").attr("data-trigger","contact");
                    contactCRUD();
                },
                error :   function (err) {
                   toastr.error('Error, something went wrong.');
                }
            });
        });
        $(".checkboxDisplay").unbind("click");
        $(".checkboxDisplay").bind("click", function () {
            var content = $(this).data("content");
            var num = 0;
            if(this.checked){
                num = 1;
            }
            else{
                num = 0;
            }
            $.ajax({
                url     :   "/member/contact/displaycontact",
                type    :   "POST",
                data    :   {
                    content:content,
                    num:num,
                    _token:misc('_token')
                },
                success :   function(result){
                    toastr.success(result);
                },
                error   :   function(err){
                    toastr.error('Error, something went wrong.');
                }
            });
        });
        $(".edit-location").unbind("click");
        $(".edit-location").bind("click", function() {
            var content = $(this).data("content");
            $(".modal-update").html(misc('loader-16-gray'));
            $.ajax({
                url      :   "/member/contact/loadlocation",
                type     :   "POST",
                data     :  {
                    content:content,
                    _token:misc('_token')
                },
                success  :  function(result){
                    $(".modal-update").html(result);
                    $(".btn-del-modal").attr("data-content",content);
                    $(".btn-update-modal").attr("data-content",content);
                    $(".btn-update-modal").attr("data-trigger","location");
                    $(".btn-del-modal").attr("data-url","/member/contact/removeLocation/");
                    $(".btn-del-modal").attr("data-trigger","location");
                    contactCRUD();
                },
                error    :  function (err) {
                    toastr.error("Error, something went wrong.");
                }
            });
        });
    }
    function contactCRUD(argument) {
        $(".btn-del-modal").unbind("click");
        $(".btn-del-modal").bind("click", function () {
            var content = $(this).data("content");
            var url = $(this).data("url");
            var trigger = $(this).data("trigger");
            var con = confirm('Are you sure you want to delete this '+trigger+'?');
            if(con){
                window.location  = url+ content;
            }
        });
        $(".btn-update-modal").unbind("click");
        $(".btn-update-modal").bind("click", function () {
            var trigger = $(this).data("trigger");
            var content = $(this).data("content");
            if(trigger == "contact"){
                var update_category = $("#update_category").val();
                var update_contact = $("#update_contact").val();
                
                if(update_category != '' && update_contact != '' && content != undefined && content != '0' && content != ''){
                    $(".btn-update-modal").html('Updating...');
                    $.ajax({
                        url     :   "/member/contact/updateContact",
                        type    :   "POST",
                        data    :   {
                            update_category:update_category,
                            update_contact:update_contact,
                            content:content,
                            _token:misc('_token')
                        },
                        success :   function (result) {
                            if(result == 'success'){
                                location.reload();
                            }
                            else if(result == 'exist'){
                                toastr.error('Contact already exist.');
                            }
                            else{
                                toastr.error(result);
                            }
                            $(".btn-update-modal").html('Update');
                        },
                        error   :   function(err) {
                            $(".btn-update-modal").html('Update');
                            toastr.error('Error, something went wrong.');
                        }
                    });
                }
            }
            else{
                var locations = $("#update_location").val();
                if(locations != ''){
                    $(".btn-update-modal").html('Updating...');
                    $.ajax({
                        url      :  "/member/contact/updateLocation",
                        type     :  "POST",
                        data     :  {
                            locations:locations,
                            content:content,
                            _token:misc('_token')
                        },
                        success  : function (result) {
                            location.reload();
                            $(".btn-update-modal").html('Update');
                        },
                        error    :  function (err) {
                            toastr.error('Error, something went wrong.');
                            $(".btn-update-modal").html('Update');
                        }
                    });
                }
                
            }
            
        });
    }
    function setPrimary() {
        $(".radio_location").unbind("change");
        $(".radio_location").bind("change", function(){
            var val = $(this).val();
            $.ajax({
                url      :  "/member/contact/setPrimary",
                type     :  "POST",
                data     :  {
                    val:val,
                    _token:misc('_token')
                },
                success  :  function (result) {
                    toastr.success("Primary set.");
                },
                error    :  function (err) {
                    toastr.error("Error, something went wrong.");
                }
            });
        });
    }
    function  misc(str) {
        switch (str) {
            case '_token':
                return $("#_token").val();
                break;
            case 'spinner':
                return '<i class="fa fa-spinner fa-pulse fa-fw"></i><span class="sr-only">Loading...</span>';
                break;
            case 'loader-16-gray':
                return '<div class="loader-16-gray"></div>';
                break;
        }
    }
}
