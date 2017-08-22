function generateReport(argument) {
    $(".btn-generate-report").unbind("click");
    $(".btn-generate-report").bind("click", function(){
        var start = $(".start-date").val();
        var end = $(".end-date").val();
        var urls = $(this).data("url");
        $(".btn-generate-report").html("Generating...");
        if(start != "" && end != ""){
            $.ajax({
                url     :   urls,
                type    :   "POST",
                data    :   {
                    start:start,
                    end:end,
                    _token:misc('_token')
                },
                success : function (result) {
                    $(".tbl-monthly").html(result);
                    $(".btn-generate-report").html("Generate");
                    toastr.success("Report has been generated.");
                    var startd = new Date(start);
                    var endd = new Date(end);
                    
                    var splitStart = (startd + '').split(" ");
                    var splitEnd = (endd + '').split(" ");
                    var strDate = splitStart[1]+' '+splitStart[2] + ' ' + splitStart[3] + ' - ' + splitEnd[1] + ' ' + splitEnd[2] + ' ' + splitEnd[3];
                    $(".date-str").html(strDate);
                    $(".btn-pdf").attr("data-start",start);
                    $(".btn-pdf").attr("data-end",end);
                    var pdfurl = $(".btn-pdf").attr("data-url");
                    $(".btn-pdf").attr("href", pdfurl + datestring(start) + '/' + datestring(end));
                },
                error   :   function (err) {
                    toastr.error("Error, something went wrong.");
                    $(".btn-generate-report").html("Generate");
                }
            });
           
        }
        else{
            toastr.error("Please fill the missing field.");
        }
    });
    $(".close-popover").unbind("click");
    $(".close-popover").bind("click", function(){
         $("#btn-date-range").popover("hide");
    });
    
}
function datestring(date = '00/00/0000'){
    var date2 = date.split("/");
    return date2[2] + '-'+date2[0] + '-'+date2[1];
}

function misc(str) {
    switch (str) {
        case '_token':
            return $("#_token").val();
            break;
    }
}