<form method="post" action="checkout" id="cart-form">
   <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal">&times;</button>
      <!-- <div class="success">
         <img src="/themes/{{ $shop_theme }}/img/mini-check.png">
         <span>Item was successfully added to your cart.</span>
         </div> -->
      <h4 class="modal-title">
         <img src="/themes/{{ $shop_theme }}/img/shopping-cart-icon.png">
         <span>SHOPPING <span>CART</span></span>
      </h4>
   </div>
   @if(isset($get_cart['cart']) && $get_cart['cart'])
   <div class="modal-body">
      <table class="table table-scroll">
         <thead>
            <tr>
               <th class="text-left">ITEM</th>
               <th>QTY</th>
               <th>UNIT PRICE</th>
               <th>TOTAL</th>
               <th></th>
            </tr>
         </thead>
         <tbody>
            @foreach($get_cart['cart'] as $cart)
            <tr variation-id="{{ $cart['product_id'] }}">
               <td class="text-left">
                  <div class="img">
                     <img src="{{ $cart['cart_product_information']['image_path'] }}">
                  </div>
                  <div class="name" style="width: 100px;">{{ $cart['cart_product_information']['product_name'] }}</div>
               </td>
               <td>
                  <div class="input-group">
                     <span key="{{ $cart['product_id'] }}" style="cursor: pointer;" class="input-group-addon qty-control-add" variation-id="{{ $cart['product_id'] }}">+</span>
                     <input type="text" class="form-control qty-control" variation-id="{{ $cart['product_id'] }}" value="{{ $cart['quantity'] }}">
                     <span key="{{ $cart['product_id'] }}" style="cursor: pointer;" class="input-group-addon qty-control-minus" variation-id="{{ $cart['product_id'] }}">-</span>
                  </div>
               </td>
               <td class="upc">&#8369; <span key="{{ $cart['product_id'] }}" raw-price="{{ $cart['cart_product_information']['product_current_price'] }}">{{ number_format($cart['cart_product_information']['product_current_price'], 2) }}</span></td>
               <td class="ttl">&#8369; <span key="{{ $cart['product_id'] }}">{{ number_format($cart['cart_product_information']['product_current_price'] * $cart['quantity'], 2) }}</span></td>
               <td class="rmv"><a class="remove-cart" variation-id="{{ $cart['product_id'] }}" href="javascript:">Remove</a></td>
            </tr>

               @if(isset($cart['cart_product_information']['membership_points']))
                  <tr class="membership-row" variation-id="{{ $cart['product_id'] }}">
                     <td colspan="40">
                        <table class="table table-bordered">
                           <tr>
                           @foreach($cart['cart_product_information']['membership_points'] as $key2 => $value2)
                           <td><small><small>{{$key2}} <br><span class="points_membership_{{$cart['product_id']}}" base_points="{{$value2/$cart['quantity']}}" current_points="{{$value2}}">{{number_format($value2, 2)}}</span></small></small></td>
                           @endforeach
                           </tr>
                        </table>
                     </td>
                  </tr>
               @endif
            @endforeach
         </tbody>
      </table>
   </div>
   <div class="modal-footer">
      <div class="text-right">
         <div class="subtotal-label">Subtotal:</div>
         <div class="subtotal-value">P <span>{{ number_format($get_cart['sale_information']['total_product_price'], 2) }}</span></div>
      </div>
      <div style="margin-top: 10px;">
         <span class="cart-loader hide"><img style="height: 37px; margin-right: 7.5px;" src="/assets/front/img/loader.gif"></span>
         <button type="button" class="btn btn-primary" data-dismiss="modal">CONTINUE SHOPPING</button>
         <button type="button" class="checkout-modal-button btn btn-primary" onClick="location.href='/checkout/login'">CHECK OUT</button>
      </div>
   </div>
   @else
   <div class="empty-cart" style="padding: 15px; text-align: center;">
      <div class="title" style="font-weight: 400; font-size: 18px;">There is no <span style="color: #2e3192; font-weight: 700;">items</span> in this cart</div>
      <div class="sub" style="font-weight: 700; font-size: 16px;">Try to search or find something from one of our categories</div>
      <a href="javascript:" data-dismiss="modal" style="padding: 7.5px; max-width: 150px; display: block; margin: auto; color: #fff; background-color: #2e3192; font-weight: 700; border-radius: 2.5px;">Continue Shopping</a>
   </div>
   @endif
</form>
<script type="text/javascript" src="/themes/{{ $shop_theme }}/js/cart.js"></script>