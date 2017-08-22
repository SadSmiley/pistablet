var modal_create_journal_tag = new modal_create_journal_tag();

function modal_create_journal_tag()
{
	init()

	function init()
	{
		combo_box();
	}

	function combo_box()
	{
		$(".select-account").globalDropList(
		{  
		  hasPopup                : "true",
		  link                    : "/member/accounting/chart_of_account/popup/add",
		  link_size               : "md",
		  width                   : "100%",
		  maxHeight				  : "129px",
		  placeholder             : "Chart of Accounts",
		  no_result_message       : "No result found!",
		  onChangeValue           : function(){},
		  onCreateNew             : function(){
		  },
		});
	}
}