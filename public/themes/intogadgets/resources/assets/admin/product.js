var product = new product();
var combinations = new Array();
var attributes = new Array();
var options_index = new Array();
var cur_level = 0;
var cur_level_negate = 1;
var loop_limit = 1;
var option_ctr = 0;
var combinations_ctr = 0;

function product()
{
    init();
    
    function init()
    {
        $(document).ready(function()
        {  
            document_ready();
        });
    }
    

    function document_ready()
    {   

        save_to_product_images();
        reset_to_simple_prod();
        attribute_add_event();
        add_remove_attribute_event();
        add_modify_variation_click_event();
        add_brand_selection_event();
        check_brand_selection();
        set_tinymce();
        init_fancybox();
        get_product_images();
        delete_product_images()
    }
    function init_fancybox()
    {
        $(".fancybox").fancybox();
    }

    function set_tinymce()
    {
        tinymce.init({
            selector: ".detail",
            menubar: true,
            statusbar: false,
            height: 300,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste"
            ],
            toolbar: " undo redo | bullist",
            paste_remove_styles: true
        });
    }
    function add_brand_selection_event()
    {
        $(".brand-selection").unbind("change");
        $(".brand-selection").bind("change", function(e)
        {
            check_brand_selection();
        });
    }
    function check_brand_selection()
    {
        if($(".brand-selection").val() == "0")
        {
            $(".brand-selection").remove();
            $(".p-brand-text").removeClass("hide").removeAttr("disabled").focus();
        }
    }
    function add_modify_variation_click_event()
    {
        $(".modify-variations").unbind("click");
        $(".modify-variations").bind("click", function()
        {
            $(".variations-container").addClass("hide");
            $(".attributes-main-container").removeClass("hide");
            return false;
        });
        
        $(".generate-variations").unbind("click");
        $(".generate-variations").bind("click", function(e)
        {   
            e.preventDefault();
            $(".variations-container").removeClass("hide");
            $(".attributes-main-container").addClass("hide");
            generation_variations();
            var varcount = $('tbody.attributes-container tr').length;

            if(varcount > 1)
            {  
                $("button.reset-to-simple-prod").removeClass('hide');
            }
            else
            {
                $("button.reset-to-simple-prod").addClass('hide');
            }

            return false;

        });
    }
    function possible_combination(base_str)
    {
        return base_str;
    }
    function create_combinations()
    {
        if(loop_limit > combinations_ctr)
        {
            if(!combinations[combinations_ctr]) { combinations[combinations_ctr] = ""; }
            combinations[ combinations_ctr ] += " " + attributes[ cur_level ]["options"][ options_index[cur_level] ];
            //alert(combinations[combinations_ctr]);
            cur_level++;
            
            if(!attributes[ cur_level ])
            {
                options_index[cur_level-1]++;   
                
                for($ctr = 1; $ctr <= attributes.length; $ctr++)
                {
                    if(! attributes[ cur_level-$ctr ]["options"][options_index[cur_level-$ctr]])
                    {
                        options_index[cur_level-$ctr] = 0;
                        options_index[cur_level-($ctr+1)]++;
                    }
                }
                
                cur_level = 0;
                combinations_ctr++; 
            }  
            create_combinations();
        }
    }
    function initialize_combinations()
    {
        combinations = new Array();
        attributes = new Array();
        cur_level = 0;
        cur_level_negate = 1;
        loop_limit = 1;
        option_ctr = 0;
        combinations_ctr = 0;
    }
    function generation_variations()
    {
        initialize_combinations();
        /* STORE ATTRIBUTES */
        $(".attributes-container").html('');
        $(".attribute").each(function(key)
        {

            $(".attributes-container").html('');

            attributes[key] = new Array();
            attributes[key]["attribute"] = $(this).find('.attribute-value').val();
            attributes[key]["options"] = $(this).find('.attribute-value').val().split(',');
            
            options_index[key] = 0;
            
            loop_limit = loop_limit * attributes[key]["options"].length;
        });
        
        
        create_combinations();
        
        $.each(combinations, function(key, val)
        {
            combi =  val.trim();
            
            if(combi == "")
            {
                combi = "Simple";
            }
            
            combi_small = combi.replace(/\s+/g, '-').toLowerCase();
            
            $append =   '<tr>' +
                            '<td class="text-center">'+
                                    '<div class="primia-gallery feature-img-thumb-prod-variant-container" target_input=".feature-img-prod-variant-'+combi_small+'" target_image=".feature-img-thumb-prod-variant-'+combi_small+'">' +
                                        '<img class="feature-img-thumb-prod-variant-'+combi_small+'" src="resources/assets/img/1428733091.jpg">' +
                                        '<input type="text" class="feature-img-prod-variant-'+combi_small+' hidden" name="variant['+ combi_small +'][v-img]" value="default.jpg">' +
                                    '</div>' +
                            '</td>' +
                            '<td><div class="top-space-small text-center">' + combi + '</div></td>' +
                            '<td><input name="variant[' + combi_small + '][v-price]" value="" type="text" class="form-control" value=""></td>' +
                            // '<td><input name="variant[' + combi_small + '][v-compare-price]" type="text" class="form-control" value=""></td>' +
                            '<td><input name="variant[' + combi_small + '][v-sku]" type="text" class="form-control" value=""></td>' +                                         
                            '<td><input name="variant[' + combi_small + '][v-barcode]" type="text" class="form-control" value=""></td>' +
                            '<td><input name="variant[' + combi_small + '][v-stock-qty]" type="text" class="form-control" value=""></td>' +
                            '<td><input name="variant[' + combi_small + '][v-weight]" type="text" class="form-control" value=""></td>' +
                        '</tr>';
            
            $(".attributes-container").append($append);
           
            //primia_admin.call_add_event_call_primia_gallery();
            primia_admin.call_add_event_call_primia_gallery();
        });

            


    }
    function attribute_add_event()
    {

        $(".add-attribute").unbind("click");
        $(".add-attribute").bind("click", function()
        {
            $append =   '<div class="attribute">' +
                        	'<div class="form-group col-md-4">' +
                        		'<label for="exampleInputEmail1">Attributes</label>' +
                        		'<input type="text" name="attribute[]" class="form-control attribute-label" id="" placeholder="">' +
                        	'</div>' +
                        	'<div class="form-group col-md-7">' +
                        		'<label for="exampleInputEmail1">Options <span class="gray"> (Enter Options Separated by Comma)</span></label>' +
                        		'<input type="text" name="attribute_option[]" class="form-control attribute-value" id="" placeholder="">' +
                        	'</div>' +
                        	'<div class="form-group col-md-1">' +
                        	    '<label class="text-center" for="exampleInputEmail1">Remove</label>' +
                                '<button class="form-control remove-attribute">X</button>' +
                        	'</div>' +
                    	'</div>';
                    	
            $(".attribute-container").append($append);
            
            add_remove_attribute_event();
            return false;
        });
    }
    function add_remove_attribute_event()
    {
        $(".remove-attribute").unbind("click");
        $(".remove-attribute").bind("click", function(e)
        {
            if($(".attribute").length != 1)
            {
                $(e.currentTarget).closest(".attribute").remove();
            }
            
            return false;
        });
    }


    function reset_to_simple_prod()
    {
        $("button.reset-to-simple-prod").unbind("click");
        $("button.reset-to-simple-prod").bind("click", function(e){
            e.preventDefault();
            // $('tbody.attributes-container').contents().fadeOut(function(){
            //     $('tbody.attributes-container').empty();
            //     $('.attributes-main-container .attribute-container').contents().empty();
            //     $(".add-attribute").trigger('click');
            //     $('.attributes-main-container').addClass("hide");
            //     $('.variations-container').removeClass("hide");
            //     var append = '<tr>'+
            //         '<td class="text-center"><a href=""><i class="fa fa-image icon-big"></i></a></td>'+
            //         '<td><div class="top-space-small text-center">simple</div></td>'+
            //         '<td><input name="variant[simple][v-price]" value="" type="text" class="form-control"></td>'+
            //         '<td><input name="variant[simple][v-sku]" type="text" class="form-control" value=""></td>'+
            //         '<td><input name="variant[simple][v-barcode]" type="text" class="form-control" value=""></td>'+
            //         '<td><input name="variant[simple][v-stock-qty]" type="text" class="form-control" value=""></td>'+
            //         '<td><input name="variant[simple][v-weight]" type="text" class="form-control" value=""></td>'+
            //     '</tr>';
            //     $('tbody.attributes-container').append(append);
            //     // $("button.reset-to-simple-prod").fadeOut();
            // })
        });
    }

    //for edit product(ajax);
    function save_to_product_images()
    {   

        $('#add-image').unbind();
        $('#add-image').bind('click', function(){
            $(this).closest('.header-container').siblings('div.primia-gallery').trigger('click');
        });

        $('input.add_product_images_img_input').unbind();
        $('input.add_product_images_img_input').bind("change", function(){
            var img_name = $('input.add_product_images_img_input').val();
            var prod_id = $('input#prod_id[name="prod_id"]').val();

            $.ajax({
                url:"admin/product/add_image_to_prod_gallery",
                dataType:"json",
                data:{ "prod_id":prod_id, "img_name": img_name, "_token": $(".token").val() },
                type:"post",
                success: function(data){
                    // console.log(data + "SAVE");
                },
                complete: function(jqXHR, textStatus ){
                    // console.log(textStatus );
                    get_product_images();
                }


            })

           
            
        });
    }

    //for edit product(ajax);\

    function add_bind_on_input_prod_images()
    {   $('input.product_images_select').unbind();
        $('input.product_images_select').bind('click', function(){
            if($(this).attr('checked'))
            {
              $(this).removeAttr('checked');
            }
            else
            {
              $(this).attr('checked','checked');
            }
        });
    }
    function get_product_images()
    {   

        


        var prod_id = $('input#prod_id[name="prod_id"]').val();
        $.ajax({
            url:"admin/product/get_product_images",
            dataType:"json",
            data:{ "prod_id": prod_id },
            type:"GET",
            success: function(data)
            {   

                var image_container = $('.product-images-container');
                var html = '';
                if(data)
                {
                    
                    $(data).each(function(index, element){
                    html += '<div class="col-md-3">'+
                                '<input class="product_images_select" type="checkbox" name="product_images" value="' + data[index].product_image + '">'+ 
                                '<a class="thumbnail fancybox" href="' + data[index].full_image_src + '">' +

                                    '<img class="img-responsive" src="' + data[index].image_src + '" alt="'+ data[index].product_image +'">' +
                                '</a>' +
                            '</div>';
                    })
     
                    image_container.empty();
                    image_container.append(html);
                    // add_bind_on_input_prod_images();
                }
                else
                {
                    html = '<div class="col-md-12 alert alert-info">' +
                                '<p>No image/s</p>'
                            '</div>';
                    
                    image_container.empty();
                    image_container.append(html);
                }



            },

            error: function( xhr, status, errorThrown ){

                // var image_container = $('.product-images-container');
                // // var html
                // image_container.empty();
                // image_container.append(html);
                alert( "Sorry, there was a problem!" );
                // console.log( "Error: " + errorThrown );
                // console.log( "Status: " + status );
            }
        })

    }


    function delete_product_images()
    {


        $('#delete-image').unbind();
        $('#delete-image').bind('click', function(){
            var product_images = [];
            $('input.product_images_select').each(function(index, element){
                if ($(this).is(":checked")) {
                    product_images.push($(this).val());
                }
            });

            // console.log(product_images);

            if(product_images)
            {
                var prod_id = $('input#prod_id[name="prod_id"]').val();
                $.ajax({
                    url:"admin/product/delete_prod_images",
                    dataType:"json",
                    data:{ "prod_id":prod_id, "product_images": product_images, "_token": $(".token").val() },
                    type:"post",
                    success: function(data){
                        // console.log(data);
                    },
                    complete:function(jqXHR, textStatus ){
                        // console.log(textStatus);
                        get_product_images();
                    }
                    
                })

                
            }


            

        });
    }





}