@extends("layout")
@section("content")
<!-- CONTENT -->
<div class="container">
    <div class="row clearfix">
        <div class="featured-container addtocart">
            <div class="success">item was successfully added to your cart</div>
        </div>
    </div>
</div>
    
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/addtocart.css">
@endsection

