var notice = new notice();

function notice() {
	init();
	function init(){
		$(".close-notice").unbind("click");
		$(".close-notice").bind("click", function (){
			
			$(".close-notice").parent().fadeOut();
		});
	}
}