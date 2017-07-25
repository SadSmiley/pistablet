@section('content')
@extends('layout')
<div class="container">
  <img src="{{ get_content($shop_theme_info, 'order', 'how_to_order_image') }}" width="100%">
</div>
@endsection
@section('script')
    <script type="text/javascript" src="resources/assets/frontend/js/how.js"></script>
@endsection

@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/how.css">
@endsection
