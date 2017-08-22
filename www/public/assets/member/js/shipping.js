var shipping = new shipping();
function  shipping() {
    init();
    function  init() {
        document_ready();  
    }
    function  document_ready() {
        modalOperation();
    }
    function  modalOperation() {
        $(".btn-create-modal").unbind("click");
        $(".btn-create-modal").bind("click", function() {
            $(".modal-update").css("display","none");
            $(".modal-create").css("display","block");
            $(".btn-update-modal").css("display","none");
            $(".btn-del-modal").css("display","none");
            $(".btn-create").css("display","initial");
            modalCreate();
        });
        $(".shipping-click").unbind("click");
        $(".shipping-click").bind("click", function () {
            $(".modal-update").css("display","block");
            $(".modal-create").css("display","none");
            $(".btn-update-modal").css("display","initial");
            $(".btn-del-modal").css("display","initial");
            $(".btn-create").css("display","none");
            
            
            var id = $(this).data("content");
            var data = {
                id:id,
                _token:misc('_token')
            };
            ajaxShipping('/member/ecommerce/shipping/load',data,'.modal-update');
        });
    }
    function  ajaxShipping(urls = '', datas = [], target = '') {
        $(target).html(misc('loader-16-gray'));
        $.ajax({
            url     :   urls,
            type    :   "POST",
            data    :   datas,
            success :   function (result) {
                $(".btn-update-modal").css("display","initial");
                $(".btn-del-modal").css("display","initial");
                $(target).html(result);
                shippingOperation();
            },
            error   :   function (err) {
                $(target).html(errorAjax(urls, datas, target));
                reloadAjax();
                
                $(".btn-update-modal").css("display","none");
                $(".btn-del-modal").css("display","none");
            }
        });
    }
    function errorAjax(urls = '', datas = [], target = '') {
        var alerts = '<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong> Something went wrong.</div>';
        var btn = '<button class="btn btm-custom-green btn-reload" data-url="'+urls+'" data-target="'+target+'" data-datas=\''+JSON.stringify(datas)+'\'"><i class="fa fa-refresh" aria-hidden="true"></i>&nbsp;Reload</button>';
        return alerts + '<br><div class="text-center width-100">' + btn + '</div>';
    }
    function  reloadAjax() {
        $(".btn-reload").unbind('click');
        $(".btn-reload").bind("click", function () {
            var url = $(this).data('url');
            var data = $(this).data('datas');
            var  target = $(this).data('target');
            
            ajaxShipping(url, data, target);
        });
    }
    function  modalCreate() {
        $(".btn-create").unbind("click");
        $(".btn-create").bind("click", function () {
            var shipping_name = $("#shipping_name").val();
            var shipping_contact = $("#shipping_contact").val();
            var measurement = $("#measurement").val();
            var unit = $("#unit").val();
            var currency = $("#currency").val();
            var fee = $("#fee").val();
            
            if(shipping_name != '' && measurement != '' && unit != '' && currency != '' && fee != ''){
                $(".btn-create").html(misc('spinner'));
                $.ajax({
                    url :   "/member/ecommerce/shipping/create",
                    type :  "POST",
                    data : {
                        _token:misc('_token'),
                        shipping_name:shipping_name,
                        shipping_contact:shipping_contact,
                        measurement:measurement,
                        unit:unit,
                        currency:currency,
                        fee:fee
                    },
                    success : function (result) {
                        if(result == 'exist'){
                            toastr.error('Sorry, shipping name already exist.');
                        }
                        else{
                            $("#shipping_name").val('');
                            $("#shipping_contact").val('');
                            $("#unit").val('');
                            $("#fee").val('');
                            toastr.success('New shipping has been added.');
                            $(".tbl-shipping").append(result);
                            modalOperation();
                        }
                        $(".btn-create").html('Create');
                    },
                    error   :  function(err){
                        $(".btn-create").html('Create');
                        toastr.error('Error, something went wrong.');
                    }
                });
            }
            else{
                toastr.error('Please complete the missing field/s.');
            }
        });
    }
    function  shippingOperation(argument) {
        $(".btn-del-modal").unbind("click");
        $(".btn-del-modal").bind("click", function () {
            var con = confirm("Are you sure you want to delete this shipping?");
            if(con){
                window.location = '/member/ecommerce/shipping/remove';
            }
        });
        $(".btn-update-modal").unbind("click");
        $(".btn-update-modal").bind("click", function (argument) {
            var name = $("#shipping_name_update").val();
            var contact = $("#shipping_contact_update").val();
            var measurement = $("#measurement_update").val();
            var unit = $("#unit_update").val();
            var currency = $("#currency_update").val();
            var fee = $("#fee_update").val();
            if(name != '' && measurement != '' && unit != '' && currency != '' && fee != ''){
                $(".btn-update-modal").html(misc('spinner'));
                $.ajax({
                    url     :   "/member/shipping/update",
                    type    :   "POST",
                    data    :   {
                        name:name,
                        contact:contact,
                        measurement:measurement,
                        unit:unit,
                        currency:currency,
                        fee:fee,
                        _token:misc('_token')
                    },
                    success :   function (result) {
                        $(".btn-update-modal").html('Update');
                        if(result == 'exist'){
                            toastr.error('Error, Shipping name already exist.');
                        }
                        else{
                            location.reload();
                        }
                    },
                    error   :   function(err) {
                        $(".btn-update-modal").html('Update');
                        toastr.error('Error, something went wrong.');
                    }
                });
            }
            else{
                toastr.error('Please complete the missing field/s.');
            }
        });
    }
    function misc(str = '') {
        switch(str){
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