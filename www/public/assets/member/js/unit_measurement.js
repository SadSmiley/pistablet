  var set_name = "";
  var name = "";
  var base = "";
  $("#base_abbreviation").keyup(function()
  {
    $(".abb").html($(this).val());
  });
function chooseType(type_id)
{
    $(".base-child-types").addClass("hidden");
    
    $(".type_id").val(type_id);
    $("#um_set_name").val("");
    $("#base_name").val("");
    $("#base_abbreviation").val(""); 
    $(".abb").html('');

    $("#base_name").attr("readonly","true");
    $("#base_abbreviation").attr("readonly","true"); 

    name = $(".type"+type_id).attr("data-content");
    console.log(name);

    $(".loading-sub").removeClass("hidden");
    $(".child-div").removeClass("hidden");
    $(".base-lbl").addClass("hidden");
    $(".child-types").addClass("hidden");
    $.ajax({
        url : '/member/item/um/select_type',
        type : "get",
        data : {type_id:type_id},
        success : function(data)
        {
            var types = $.parseJSON(data);
            var content = "";
            $(types).each(function (a, b)
            {
                content += '<label class="radio-inline base'+b.um_type_id+'" other-data="'+b.um_type_abbrev+'" data-content="'+b.um_type_name+'" onclick="chooseBase('+b.um_type_id+')"><input type="radio" value="child_selected" name="um_child_type">'+ b.um_type_name +' ('+b.um_type_abbrev+')</label>';
            });
                content += '<label class="radio-inline" onclick="baseOther()"><input type="radio" value="child_selected" name="um_child_type"> Other</label>';
            $(".child-types").html(content);
            $(".base-lbl").removeClass("hidden");
            $(".child-types").removeClass("hidden");
            $(".loading-sub").addClass("hidden");
        }
    });
}
function chooseBase(base_id)
{
    base = $(".base"+base_id).attr("data-content");
    var base_abbrev = $(".base"+base_id).attr("other-data");
    set_name = name + " by the "+ base;
    $("#um_set_name").val(set_name);
    $(".abb").html(base_abbrev);
    $("#base_name").val(base);
    $("#base_abbreviation").val(base_abbrev);
    $(".type_id").val(base_id);
}
function chooseOther()
{
    $(".type_id").val("0");
    $("#other").val("type_other");
    $(".child-div").addClass("hidden");
    $("#um_set_name").val("");
    $("#base_name").val("");
    $("#base_abbreviation").val(""); 

    $("#base_name").removeAttr("readonly");
    $("#base_abbreviation").removeAttr("readonly"); 

    $(".abb").html('');
}
function baseOther()
{
    $("#other").val("base_other");
    $("#um_set_name").val("");
    $("#base_name").val("");
    $("#base_abbreviation").val(""); 

    $("#base_name").removeAttr("readonly");
    $("#base_abbreviation").removeAttr("readonly"); 

    $(".abb").html('');
}