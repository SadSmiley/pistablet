var product = new product();


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
        showmodal();
    }
    function showmodal()
    {
       $("#histoir").click(function(){
            var inst = $('[data-remodal-id=history]').remodal();
            inst.open(); 
       });
    }

}