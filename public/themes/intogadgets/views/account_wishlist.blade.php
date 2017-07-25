@extends('account_layout')
@section('account_content')
<div class="wishlist">
    <div class="container-fluid">
        @if(count($_wishlist) > 0)
        <div class="title-main"><span>My</span> Wishlist</div>
            @foreach($_wishlist as $wishlist)
                <div class="holder">
                    <div class="row clearfix">
                        <div class="col-md-3">
                            <div class="image">
                                <img src="/assets/front/img/placeholder.png">
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="text">
                                <div class="name">{{ get_product_first_name($wishlist->product) }}</div>
                                <div class="desc">{{ limit_char(get_product_first_description($wishlist->product), 483) }}</div>
                                <div class="clearfix">
                                    <div class="price">Price: <strong>{{ get_product_first_price($wishlist->product) }}</strong></div>
                                    <div class="action">
                                        <button class="btn btn-default" type="button" onClick="location.href='/wishlist/remove/{{ $wishlist->id }}'">Remove from wishlist</button>
                                        <button class="btn btn-primary" type="button" onClick="location.href='/product/view/{{ $wishlist->product["eprod_id"] }}'">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        @else
            <h2 class="text-center" style="margin-top: 0;">Your wishlist is empty</h2>
            <div class="text-center">
                <button class="btn btn-primary" onClick="location.href='/'">CONTINUE SHOPPING</button>
            </div>
        @endif
    </div>
</div>
@endsection
@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/profile.css">
@endsection
@section('script')
<script type="text/javascript">
var wishlist = new wishlist();
function wishlist()
{
    init();
    function init()
    {
        $(document).ready(function()
        {
            event_quick_add_cart(); 
        });
    }
    function event_quick_add_cart()
    {
        $(".quick-add-cart").unbind("click");
        $(".quick-add-cart").bind("click", function(e)
        {
            $('.loader').fadeIn();

            action_quick_add_cart(e.currentTarget);
        });
    }
    function action_quick_add_cart(x)
    {
        var product_id = $(x).attr('product-id');

        $(".quick-cart-content").load('/cart/quick?product_id='+product_id,
        function()
        {
            $('.loader').hide();
            $("#quick-add-cart").modal();
        });
    }
}
</script>
@endsection

