var draggable_row = new draggable_row();

function draggable_row(){
	init();
	function init(){
		dragtable();
	}

    this.dragtable = function(){
        dragtable();
    }

	function dragtable(){
        $tabs = $(".draggable-container");
        $("tbody.draggable")
            .sortable({
                connectWith: ".draggable",
                appendTo: $tabs,
                helper:"clone",
                zIndex: 999990,
        });
        // .disableSelection();
        $($tabs).droppable({
           
            accept: ".draggable tr",
            hoverClass: "ui-state-hover",
            over: function( event, ui ) {
                
            },
            drop: function( event, ui ) {
                setTimeout(function()
                {
                    get_row_index();
                });
                
                // alert("123");
            }
        });
    }

    function get_row_index(){
        $("tbody.draggable tr").each(function(){
            var row = $(this).index();
            var content = $(this).data("content");
        });

        if (typeof dragging_done == 'function')
        {
            dragging_done($(this));
        }
    }


}