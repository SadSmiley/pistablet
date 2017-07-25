@extends('mlm_layout')
@section('content')
<style type="text/css">

</style>
<div id="loadingMessage" class="col-md-12"><center>Loading ...</center></div>
<iframe src="" frameborder="0" style="overflow:hidden;height:100%;width:100%" height="100%" width="100%" id="foo"></iframe>

@endsection
@section('js')
<script type="text/javascript">
$(document).ready(function() {
	var src1 = '/distributor/genealogys?mode=placement';
	$("#foo").attr("src", src1);
 });
$('#foo').ready(function () {
    $('#loadingMessage').css('display', 'block');
});
$('#foo').load(function () {
    $('#loadingMessage').css('display', 'none');
});</script>
@endsection