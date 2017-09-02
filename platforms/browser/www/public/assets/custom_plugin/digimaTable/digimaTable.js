(function ( $ ) 
{
    $.fn.digimaTable = function( settings ) 
    {
    	/* CHECK IF SETTINGS ARE ALREADY PLACED */
    	var check = check_settings(settings);

    	if(check == false)
    	{
    		return false;
    	}
    	else
    	{
    		console.log(settings.column);
    	}
    };
}( jQuery ));

function check_settings(settings)
{
	if(!settings.url)
	{
		alert("There is no given url for the digimaTables Settings.")
		return false;
	}
	else if(!settings.column)
	{
		alert("Please put a column on digimaTables Settings.");
		return false;
	}
	else
	{
		return true;
	}
}