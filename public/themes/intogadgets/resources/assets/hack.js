var a = 0;
var b = 0;
var limiter = 300000;

while(!regions[a])
{
	a++;

	if(a > limiter)
	{
		break;
		alert("breaked");
	}
}

save_location();

function save_location()
{
	location_id = a;
	location_name = regions[a][0];
	location_parent = 0;
	level_type = 'province';

	$.ajax(
	{
		url: "http://rutsen.local/location",
		dataType: "json",
		data: { "location_id":location_id, "location_name": location_name, "location_parent": location_parent, "level_type": level_type },
		type:"get",
		complete: function(data)
		{
			save_sub_location(location_id, 0);
		}
	});
}

function save_sub_location(parent_id, current_count)
{
	if(regions[parent_id][1][current_count]["name"])
	{
		location_id = regions[parent_id][1][current_count]["id"];
		location_name = regions[parent_id][1][current_count]["name"];
		location_parent = parent_id;
		level_type = "municipality";

		current_count++;

		while(!regions[parent_id][1][current_count])
		{
			current_count++;

			if(current_count > limiter)
			{
				a++;

				while(!regions[a])
				{
					a++;

					if(a > limiter)
					{
						alert("breaked");
						break;
					}
				}

				save_location();
				break;
			}
		}

		$.ajax(
		{
			url: "http://rutsen.local/location",
			dataType: "json",
			data: { "location_id":location_id, "location_name": location_name, "location_parent": location_parent, "level_type": level_type },
			type:"get",
			complete: function(data)
			{
				save_sub_sub_location(parent_id, current_count, location_id);
			}
		});
	}
	else
	{
		a++;

		while(!regions[a])
		{
			a++;

			if(a > limiter)
			{
				alert("breaked");
				break;
			}
		}

		save_location();
	}
}


function save_sub_sub_location(sub_parent_id, sub_current_count, sub_location_id)
{
	$.ajax(
	{
		url: "https://www.lazada.com.ph/checkout/finishajax/getlocations/?locationId=" + sub_location_id,
		dataType: "json",
		type:"get",
		success: function(data)
		{
			start_saving_sub_sub_location(sub_parent_id, sub_current_count, sub_location_id, 0, data["children"]);
		}
	});
}

function start_saving_sub_sub_location(sub_parent_id, sub_current_count, sub_location_id, ctr, locate)
{
	if(locate[ctr])
	{
		location_id = locate[ctr]["id"];
		location_name = locate[ctr]["name"];
		location_parent = sub_location_id;
		level_type = "barangay";

		$.ajax(
		{
			url: "http://rutsen.local/location",
			dataType: "json",
			data: { "location_id":location_id, "location_name": location_name, "location_parent": location_parent, "level_type": level_type },
			type:"get",
			complete: function(data)
			{
				start_saving_sub_sub_location(sub_parent_id, sub_current_count, sub_location_id, ctr+1, locate)
			}
		});
	}
	else
	{
		setTimeout(function()
		{
			save_sub_location(sub_parent_id, sub_current_count);
		}, 5000);
	}
}


/* BOT */
