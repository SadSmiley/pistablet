var global_global_slot = new global_slot();
function global_slot()
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
        add_event_slot_create();
    }
    function add_event_slot_create()
    {
        
    }
}

