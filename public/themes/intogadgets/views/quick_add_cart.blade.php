<link rel="stylesheet" href="resources/assets/frontend/css/single-product.css">

<div class="modal-body">
	<?php $ctr = 0; ?>
	@foreach($product["variant"] as $product_variant)
	<div style="padding: 0px;" class="single-product-content {{ $ctr != 0 ? 'hide' : '' }}" variant-id="{{ $product_variant['evariant_id'] }}">
	   <div class="single-product-container">
	      <input class="variation" type="hidden" name="variation" value=''>
	      <input type="hidden" class="variation_id" name="variation_id" value=''>
	      <div class="row clearfix">
	      <div class="col-md-6">
		      <div class="single-product-holder" style="padding: 0; width: 100%; margin: 0;">
		         @foreach($product_variant['image'] as $key => $image)
		         <img class="single-product-img 4-3-ratio {{ $key == 0 ? '' : 'hide' }}" key="{{ $key }}" style="width: 100%;" src="{{ $image['image_path'] }}" data-zoom-image="{{ $image['image_path'] }}" alt = "" id="picturecontainer"/>
		         @endforeach
		         <div class="thumb">
		             @foreach($product_variant['image'] as $key => $image)
		             <div class="holder" variant-id="{{ $product_variant['evariant_id'] }}" key="{{ $key }}" style="cursor: pointer;"><img style="object-fit: cover;" class="4-3-ratio" src="{{ $image['image_path'] }}"></div>
		             @endforeach
		         </div>
		      </div>
	      </div>
	      <div class="col-md-6">
		      <div class="single-product-holder border" style="width: 100%; margin: 0;">
		         <div class="single-order-header">{{ $product["eprod_name"] }}</div>
		         <div class="single-order-sub">
		            Categories: <a href="/product?type={{ $product['eprod_category_id'] }}">{{ $category['type_name'] }}</a>
		         </div>
		         <div class="divider"></div>
		         <div class="single-order-content">
		            <div class="single-order-description">
		               <div class="title">DESCRIPTION</div>
		               <div>{!! $product_variant['evariant_description'] !!}</div>
		            </div>
		            <div class="price-container">
		               <div id="single-order-price" class="single-order-price">&#8369;&nbsp;{{ number_format($product_variant['evariant_price'], 2) }}</div>
		               @if($product_variant['item_type_id'] != 2)
		                <div class="single-order-availability" style="text-transform: capitalize;">{{ $product_variant['inventory_status'] }}</div>
		               @endif
		            </div>
		            <div class="product-selection">
		               <form id="prod-attr-form" method="GET">
		                  <input type="text" class="hidden" name="prod_id" value="">
		                  <div id="select-variation">
		                     @foreach($_variant as $variant)
		                     <div class="s-container">
		                        <div class="s-label">{{ $variant['option_name'] }}</div>
		                        <div class="select">
		                           <select class="attribute-variation" variant-label="{{ $variant['option_name'] }}" product-id="{{ $product['eprod_id'] }}" variant-id="{{ $product_variant['evariant_id'] }}" name="attr[{{ $variant['option_name_id'] }}]">
		                              <option value="0">Select {{ $variant['option_name'] }}</option>
		                              @foreach(explode(",", $variant['variant_value']) as $option)
		                              <option value="{{ $option }}">{{ $option }}</option>
		                              @endforeach
		                           </select>
		                        </div>
		                     </div>
		                     @endforeach
		                  </div>
		               </form>
		            </div>
		            <div class="product-selection">
		               <input type="text" class="hidden" name="prod_id" value="">
		               <div id="select-variation">
		                  <div class="s-container">
		                     <div class="s-label">
		                        Quantity
		                     </div>
		                     <div class="select">
		                        <select class="variation-qty" variant-id="{{ $product_variant['evariant_id'] }}" name="qty">
		                           <option>1</option>
		                           <option>2</option>
		                           <option>3</option>
		                           <option>4</option>
		                           <option>5</option>
		                        </select>
		                     </div>
		                  </div>
		               </div>
		            </div>
		            <button type="button" class="single-order-button add-to-cart {{ isset($product['variant'][1]) ? 'disabled' : ($product_variant['item_type_id'] != 2 ? ($product_variant['inventory_status'] == 'out of stock' ? 'disabled' : '') : '') }}" variant-id="{{ $product_variant['evariant_id'] }}" {{ isset($product['variant'][1]) ? 'disabled' : ($product_variant['item_type_id'] != 2 ? ($product_variant['inventory_status'] == 'out of stock' ? 'disabled' : '') : '') }}>ADD TO CART</button>
		            @if($wishlist)
		              <button type="button" class="single-order-button" onClick="location.href='/wishlist/add/{{ $product["eprod_id"] }}'">ADD TO WISHLIST</button>
		            @endif
		            <div class="divider" style="margin: 35px 0; opacity: 0;"></div>
		         </div>
		      </div>
	      </div>
	      </div>
	   </div>
	</div>
	<?php $ctr++; ?>
	@endforeach
</div>
<div class="modal-footer">
	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>

<script type="text/javascript">
$('#quick-add-cart').on('shown.bs.modal', function() 
{
    image_crop(".4-3-ratio", 4, 3);
})
</script>
<script type="text/javascript" src="resources/assets/frontend/js/zoom.js"></script>
<script type="text/javascript" src="resources/assets/frontend/js/single_product.js"></script>