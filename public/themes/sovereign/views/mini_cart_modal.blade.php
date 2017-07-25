<input type="hidden" class="quantity-get" value="{{ $get_cart['sale_information']['total_quantity'] }}">
<input type="hidden" class="total-get" value="{{ number_format($get_cart['sale_information']['total_product_price'], 2) }}">
@if(isset($get_cart['cart']) && $get_cart['cart'])
<table>
    <tbody>
        @foreach($get_cart['cart'] as $cart)
        <tr>
            <td class="img"><img src="{{ $cart['cart_product_information']['image_path'] }}"></td>
            <td class="info">
                <div class="name">{{ $cart['cart_product_information']['product_name'] }}</div>
                <div class="quantity">x{{ $cart['quantity'] }}</div>
                <div class="price">&#8369; {{ number_format($cart['cart_product_information']['product_current_price'], 2) }}</div>
            </td>
            <td class="remove">
                <a class="remove-cart" variation-id="{{ $cart['product_id'] }}" href="javascript:"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
            </td>
        </tr>
        @endforeach
        <tr style="border: 0;">
            <td class="sub-title">Subtotal:</td>
            <td class="sub-price">&#8369; {{ number_format($get_cart['sale_information']['total_product_price'], 2) }}</td>
            <td></td>
        </tr>
        <tr>
            <td><span class="cart-loader hide"><img style="height: 39px; margin-right: 7.5px;" src="/assets/front/img/loader.gif"></span></td>
            <td colspan="2"><button type="button" class="btn btn-checkout show-cart checkout-modal-button" type="button">Checkout</button></td>
        </tr>
    </tbody>
</table>
@else
<table>
    <tbody>
        <tr style="border: 0;">
            <td class="sub-title">Subtotal:</td>
            <td class="sub-price">&#8369; 0.00</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td colspan="2"><button class="btn btn-checkout show-cart" type="button">Checkout</button></td>
        </tr>
    </tbody>
</table>
@endif
<script type="text/javascript" src="/themes/{{ $shop_theme }}/js/cart.js"></script>