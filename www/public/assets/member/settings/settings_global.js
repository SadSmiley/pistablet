var settings = new settings();
function settings()
{
    init();
    //var a = add_event_global_popup();
    function init()
    {
        $(document).ready(function()
        {
            document_ready();
        });
    }
    
    function document_ready()
    {
        add_event_settings_get();
    }
    function add_event_settings_get()
    {
        $(document).on("click",".show_settings", function(e)
        {
            var key = $(this).attr('settings_key');
            action_load_link_to_modal('/member/settings/' + key, 'md');
            initialize_settings();
        });
    }
    function initialize_settings()
    {
        $('.settings').each(function(i){
            console.log(this);
        });
    }
}
function get_settings(key)
{
    var url = "/member/settings/get/" + key;
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}
var load= 0;
// check_if_new_settings();
function check_if_new_settings()
{
    $('.settings_checking').load('/member/settings/all', function(){
        load_settings();
    });
    
}
function check_if_settingis_active_silent(settings_key, settings_value, update)
{
    $('#settings_key_form').val(settings_key);
    $('#settings_value_form').val(settings_value);
    $('#update_type').val(update);
    var data_form = $( '#submit_form_settings' ).serialize();

    $.ajax({
      type: "POST",
      url: '/member/settings/verify/add',
      data: data_form,

      success: function(data){
        var objData = jQuery.parseJSON(data);
        if(objData.response_status == 'success_viery')
        {
            if(load == 0)
            {
                action_load_link_to_modal('/member/settings/setup/initial', 'md');
                $('.settings_checking').html("");
            }
            load++;
            
        }
      }
    });
}
function load_settings()
{
    $('.settings').each(function(){

        var settings_key = $(this).find("[name='settings_key']").val();
        var settings_value = $(this).find("[name='settings_value']").val();
        check_if_settingis_active_silent(settings_key, settings_value, 'add');
    });
}