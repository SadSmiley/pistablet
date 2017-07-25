var addpackage = new addpackage();

function addpackage() {
    init();
    function init(){
        _ready();
    }
    function _ready() {
        select_all();
        add_to_product();
    }
    function select_all(){
        $("#selectAll").unbind("click");
        $("#selectAll").bind("click", function (e) {
            var table= $(e.target).closest('table');
            $('td input:checkbox',table).prop('checked',this.checked);
        })
        $(".btn-add-to-product-set").unbind("click");
    }
    function add_to_product() 
    {
        $(".btn-add-to-product-set").unbind("click");
        $(".btn-add-to-product-set").bind("click", function () 
        {
            $('.add_new_product_to_package_body').html('<div class="col-md-12"><center><img src="/assets/member/images/spinners/22.gif"/></center></div><br>');
            var checked =  $('#table_product_list').find('input[type="checkbox"]:checked');
            checked.each(function () {
                var product_id = $(this).attr('product_id');
                var product_name = $(this).attr('product_name');
                var variant_id = $(this).attr('variant_id');
               console.log(this);
               
            });
            $("#add_new_product_to_package").modal('show');
        })
    }
    
}