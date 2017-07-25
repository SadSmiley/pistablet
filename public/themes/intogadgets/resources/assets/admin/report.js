	$(document).ready(function()
	{
		$( ".datepicker" ).datepicker();
	});




	var _analytics = $.parseJSON(analytics);

	_x = new Array();
	_y = new Array();
	
	$.each(_analytics, function(key, val)
	{
		_x[key] = val.date;
		_y[key] = parseInt(val.value);
	});

	$(function ()
	{

	    $('.graph-container').highcharts(
	    {
	        title: { text: '' },

	        xAxis: {
	        	categories: _x,
	        	labels:
				{
				  enabled: false
				}
	         },
	        yAxis:
	        {
	            title: { text: '' },
	            plotLines: [{ value: 0, width: 1, color: '#808080' }]
	        },
	        tooltip: {  },
	        legend:
	        {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{ name: 'Views', data: _y }]
	    });
	});