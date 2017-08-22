var calendar   = new calendar();
var start_deto = $(".start-date").val();           
var end_deto   = $(".end-date").val();           
function calendar()
{
    init();
    function init()
    {
        document_ready();
    }
    
    function document_ready()
    {
        popovers();
        calendars();
        pdfclick();
        click_generate();
    }
    
    function popovers() {
        $("#btn-date-range").popover({ 
		    html : true,
		    content: function() {

				return $("#popover-daterange").html();
		    }
		});
		var range = $("#btn-date-range").popover();
		
		range.on("shown.bs.popover", function(e){

            $(".start-date").val(start_deto);
            $(".end-date").val(end_deto);
            calendars();
            generateReport();
            loaddate();
            
		});
    }
    
    function sortingtable() {
        $(".table-sale-month").tablesorter();
    }
    
    function  calendars() {
        $('body').on('focus',".calendar-text", function(){
            $(this).datepicker({
                onSelect: function(dateText, inst) 
                {   
                   if($(this).hasClass("start-date"))
                   {
                        start_deto = $(".start-date").val();
                   }
                   else if($(this).hasClass("end-date"))
                   {
                        end_deto = $(".end-date").val(); 
                   }
                }
            });
            loaddate();
        });
    }
    
    function outsideclick() {
    	$(document).on('click', function (e) {
    	    $('[data-toggle="popover"],[data-original-title]').each(function () {
    	        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
    	            (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
    	        }
    	    });
    	});
    }
    function  loaddate() {
        //  var start = $(".btn-pdf").attr("data-start");
        // var end = $(".btn-pdf").attr("data-end");
        // $(".start-date").val(start);
        // $(".end-date").val(end);
    }
    function pdfclick(){
        $('body').on('click',".btn-pdf", function(){
            
            var start = $(".btn-pdf").attr("data-start");
            var end = $(".btn-pdf").attr("data-end");
           
        });
       
    }

    function click_generate()
    {
        $('body').on('click',".btn-generate-report", function()
        {
            start_deto = $(".start-date").val();
            end_deto = $(".end-date").val(); 
        });
    }
}
