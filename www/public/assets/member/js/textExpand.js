textExpand();
function textExpand(){
    // $('.textarea-expand').attr("rows","1");
    $('.textarea-expand').css("resize","none");

	$.each($('.textarea-expand'), function() {
    var offset = this.offsetHeight - this.clientHeight;
 
    var resizeTextarea = function(el) {
        $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };
    $(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
});
}