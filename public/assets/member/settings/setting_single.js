var selected_settings = $('.selected_settings').val();
$(document).ready(function()
{
    $('.settings').each(function(){

        var settings_key = $(this).find("[name='settings_key']").val();
        var settings_value = $(this).find("[name='settings_value']").val();

        if(selected_settings != 'all')
        {
            
            if(selected_settings != settings_key)
            {
                $('#' + settings_key).html('');
            }
            else
            {
                check_if_settingis_active(settings_key, settings_value, 'add');
            }
        }
        else
        {
            // check_if_settingis_active_silent(settings_key, settings_value, 'add');
        }
    });
});
var success_s = 0;
function edit_settings()
{
    $('.settings').each(function(){

        var settings_key = $(this).find("[name='settings_key']").val();
        var settings_value = $(this).find("[name='settings_value']").val();
        if(selected_settings != 'all')
        {
            if(selected_settings == settings_key)
            {
                check_if_settingis_active(settings_key, settings_value, 'update');
            }
        }
        else
        {
            check_if_settingis_active(settings_key, settings_value, 'update');
        }
    });
    if(success_s = 1)
    {
        toastr.clear();
        toastr.success("Success!");
    }
}
function check_if_settingis_active(settings_key, settings_value, update)
{
    $('#settings_key_form').val(settings_key);
    $('#settings_value_form').val(settings_value);
    $('#update_type').val(update);
    $('#submit_form_settings').submit();
}

function submit_done_2(data)
{
    console.log(1);
    if(data.response_status == "success_viery")
    {
        
    }
    else if(data.response_status == "success_update")
    {
        success_s = 1;
    }
    if(data.response_status == "error")
    {
        toastr.error(data.message);
    }
}