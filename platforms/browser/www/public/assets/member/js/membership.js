var membership = new membership();

function membership() {
    init();
    function init(){
        _ready();
    }
    function _ready() {
        save_membership();
        update_membership();
        add_new_package();
    }
    function save_membership(){
        $(".save_membership").unbind("click");
        $(".save_membership").bind("click", function () {
            $('#save_membership_form').submit();
        });
    }
    function update_membership() 
    {
        $(".update_membership_btn").unbind("click");
        $(".update_membership_btn").bind("click", function () {
            $('#update_membership').submit();
        });
    }
    function add_new_package() 
    {
        $(".add_new_package_s").unbind("click");
        $(".add_new_package_s").bind("click", function () {
            // $('.add_new_package_modal_body').html('<div class="col-md-12"><center><img src="/assets/member/images/spinners/22.gif"/></center></div><br>');
            $("#global_modal").modal('show');
            $(".add_new_package_modal_body").load("/member/mlm/membership/popup", function()
            {
                
            });
            // var link = $(".add_new_package_s").attr('link_of_new_package');
            // var mebership_id = $(".add_new_package_s").attr('membership_id');
            //   $.ajax({
            // 		url	 	: 	link,
            // 		type 	: 	'get',
            // 		success : 	function(result){
            //         $('.add_new_package_modal_body').html(result);
            //         show_product_list(mebership_id);
            // 		},
            // 		error	: 	function(err){
            // 			// toastr.alert();
            // 			toastr.clear();
            // 			toastr.warning("Something Went Wrong, Please Contact The Administrator");
            // 		}
            // 	});
        });
    }
    function show_product_list(membership_id) 
    {
        $('.product_list_ajax').html('<div class="col-md-12"><center><img src="/assets/member/images/spinners/22.gif"/></center></div><br>');
        var link = "/member/mlm/membership/edit/" + membership_id + "/package/view/product";
        $.ajax({
    		url	 	: 	link,
    		type 	: 	'get',
    		success : 	function(result){
                $('.product_list_ajax').html(result);
    		},
    		error	: 	function(err){
    			// toastr.alert();
    			toastr.clear();
    			toastr.warning("Something Went Wrong, Please Contact The Administrator");
    		}
    	});
    }
}