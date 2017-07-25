@extends('layout')
@section('content')

<div class="content">
    <div class="container">
        <div class="row clearfix">

            <!-- SIDE CONTAINER -->
            <div class="col-md-3">
                <div><img style="width: 100%; margin-top: 30px;" class="item-image-large" src="/themes/{{ $shop_theme }}/img/shop-now-image.jpg"></div>

                <div class="hot-deals-container">
                    <div class="left-container-title">
                        <span>DAILY HOT DEALS</span>
                    <span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span>
                    </div>
                    <div class="hot-deals-item-container">
                        <img id="black-bag" src="/themes/{{ $shop_theme }}/img/black-bag.png">
                        <div class="item-details">
                            <div class="hot-deals-item-name">Hot Deal Item Name</div>
                                <div class="rating">
                                    <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                    <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                    <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                    <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                    <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                </div>
                            <div class="price-hot-deals">PHP 5,000.00</div>
                        </div>
                        <div class="add-to-cart-button-container row clearfix">
                            <div class="add-to-cart-button">
                                <div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                <button class="col-xs-8 button-icon">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="newsletter-container">
                    <div class="left-container-title">
                        <span>NEWSLETTERS</span>            
                    </div>
                    <div class="item-container">Sign Up For Our Newsletter!
                    </div>
                    <div class="item-container">
                        <input class="text-area" type="email" name="" class="form-control">
                    </div>
                    <div class="item-container">
                        <button class="button-a">Subscribe</button>
                    </div>
                </div>
            </div>
      
    


            <!-- ITEM CONTENT -->
            <div class="col-md-9 prod-content">

                <span class="prod-big-image"><img src="/themes/{{ $shop_theme }}/img/2017-banner.jpg"></span>

                <div class="featured-container row clearfix item-content">
                    <div class="col-md-5 product">

                        <div><img id="yellow-bag-image" class="item-image-large" src="/themes/{{ $shop_theme }}/img/yellow-bag.jpg"></div>

                        <table>
                            <tr>
                                <td><img class="item-image-small small-yellow-bag" src="/themes/{{ $shop_theme }}/img/yellow-bag-small.jpg"></td>
                                <td><img class="item-image-small small-yellow-bag" src="/themes/{{ $shop_theme }}/img/yellow-bag-small.jpg"></td>
                                <td><img class="item-image-small small-yellow-bag" src="/themes/{{ $shop_theme }}/img/yellow-bag-small.jpg"></td>
                                <td><img class="item-image-small small-yellow-bag" src="/themes/{{ $shop_theme }}/img/yellow-bag-small.jpg"></td>
                            </tr>
                        </table>
                        
                    </div>

                    <div class="col-md-7 item-selected-content">
                        <div class="item-and-description">
                            <div class="item-title">Lorem Ipsum Dolor</div>
                            <div class="rating">
                               <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                               <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                               <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                               <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                               <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                            </div>
                            <div class="availability">Availability : <span id="stock">In-stock</span></div>
                            <div class="item-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                        </div>
                            
                        <div class="container-quantity-price">
                            <div class="row clearfix">
                                <div class="col-md-5 price-old-new">
                                   <div class="present-item-price">PHP 5,000.00</div>
                                   <div class="item-old-price">PHP 8,200.00</div>
                                </div>
                                
                                <div class="col-md-7 item-quantity">
                                    <div class="quantity-input">
                                       <form>QTY: <input type="number" name="quantity" min="0" max="100"></form>
                                    </div>
                                   
                                     <div>
                                        <button data-toggle="modal" data-target="#shopping_cart" type="button"><i class="fa fa-shopping-cart" aria-hidden="true"></i> ADD TO CART</button>
                                     </div>
                                </div>
                            </div>
                        </div>

                        <div class="facebook-share">
                            <img class="item-image-small" src="/themes/{{ $shop_theme }}/img/facebook-logo.jpg">
                            <a class="tooltips" href="#">Share<span>20</span></a>
                        </div>

                    </div>
                </div>

                    <div class="featured-container row clearfix description-reviews">
                       
                            <div class="buttons">
                                <button id="desc-button">DESCRIPTION</button>
                                <button id="reviews">REVIEWS</button>
                            </div>

                           <div class="description-content">
                               <div class="description-par">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>

                               <div class="description-par">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                           </div>

                            <div class="container-review">
                                <div class="review-title">Customer Reviews</div>

                                <div class="row clearfix">
                                    <div class="review-content">
                                        
                                            <div class="col-md-2 col-xs-12">
                                                <div class="summary-details">
                                                    <div class="item-name">Alpha 12345</div>
                                                        <div class="rating">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                                        </div>
                                                    <div class="item-date">Dec 5, 2016</div>
                                                </div>
                                                <div class="summary-details">
                                                    <div class="item-name">Alpha 12345</div>
                                                        <div class="rating">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                                        </div>
                                                    <div class="item-date">Dec 5, 2016</div>
                                                </div>
                                                <div class="summary-details">
                                                    <div class="item-name">Alpha 12345</div>
                                                        <div class="rating">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                            <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                                        </div>
                                                    <div class="item-date">Dec 5, 2016</div>
                                                </div>
                                            </div>


                                            <div class="col-md-10 col-xs-12">
                                                <div class="summary-tab">
                                                    <div class="summary-title">Summary Lorem ipsum</div>
                                                    <div class="summary-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                                                </div>
                                                <div class="summary-tab">
                                                    <div class="summary-title">Summary Lorem ipsum</div>
                                                    <div class="summary-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                                                </div>
                                                <div class="summary-tab">
                                                    <div class="summary-title">Summary Lorem ipsum</div>
                                                    <div class="summary-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>

                            <div class="bottom-container">
                                <div class="input-name-summary-review">
                                    <div class="row clearfix">
                                        
                                            <div class="write-your-own-title">Write your own review</div>
                                        <div class="col-md-2"></div>

                                        <div class="col-md-10 input-summary-review">
                                            <div class="col-md-6 form-name-summary">
                                                <div class="input-name">Your Name <span class="star">*</span></div>
                                                <input type="text" class="form-control">
                                                <div class="input-name">Summary <span class="star">*</span></div>
                                                <input type="text" class="form-control">
                                            </div>
                                            <div class="col-md-6 form-review">
                                                <div class="input-name">Review <span class="star">*</span></div>
                                                <textarea class="form-control" style="height: 110px; border-radius: 0;"></textarea>
                                            </div>

                                            <div class="row clearfix">
                                                <div class="col-md-12 col-xs-6 stars-count">
                                                    <div class="stars-number">
                                                        <li>1 Star</li>
                                                        <li>2 Stars</li>
                                                        <li>3 Stars</li>
                                                        <li>4 Stars</li>
                                                        <li>5 Stars</li>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row clearfix">
                                                <div class="col-md-12 col-xs-6 product-rate">
                                                    <div class="rate-title">Rate this product</div>
                                                    <div class="rays">
                                                        <li><input type="radio"></li>
                                                        <li><input type="radio"></li>
                                                        <li><input type="radio"></li>
                                                        <li><input type="radio"></li>
                                                        <li><input type="radio"></li>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button>SUBMIT REVIEW</button>

                                    </div>
                                </div>
                            </div>
                    </div>

                    <div class="featured-container row clearfix">
                        
                        <div class="left-container-title"><i class="fa fa-star" aria-hidden="true"></i><span class="title">RELATED PRODUCTS</span><span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span></div>
                           
                            <div class="other-related-items">
                                <div class="col-md-3">
                                    <div class="per-item-container">
                                        <div class="image-content-1">
                                            <img class="item-image-large other-related-images" src="/themes/{{ $shop_theme }}/img/item-1.png">
                                        </div>
                                        <div class="item-details">
                                            <div class="item-name">Item Name 1 Lorem Ipsum</div>
                                            <div class="rating">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                            </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </div>
                                        <div class="add-to-cart-button-container row clearfix">
                                            <div class="add-to-cart-button">
                                                <div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                                <button class="col-xs-8 button-icon">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="per-item-container">
                                        <div class="image-content-1">
                                            <img class="item-image-large other-related-images" src="/themes/{{ $shop_theme }}/img/item-2.png">
                                        </div>
                                        <div class="item-details">
                                            <div class="item-name">Item Name 2 Lorem Ipsum</div>
                                            <div class="rating">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                            </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </div>
                                        <div class="add-to-cart-button-container row clearfix">
                                            <div class="add-to-cart-button">
                                                <div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                                <button class="col-xs-8 button-icon">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="per-item-container">
                                        <div class="image-content-1">
                                            <img class="item-image-large other-related-images" src="/themes/{{ $shop_theme }}/img/item-3.png">
                                        </div>
                                        <div class="item-details">
                                            <div class="item-name">Item Name 3 Lorem Ipsum</div>
                                            <div class="rating">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                            </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </div>
                                        <div class="add-to-cart-button-container row clearfix">
                                            <div class="add-to-cart-button">
                                                <div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                                <button class="col-xs-8 button-icon">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="per-item-container">
                                        <div class="image-content-1">
                                            <img class="item-image-large other-related-images" src="/themes/{{ $shop_theme }}/img/item-4.png">
                                        </div>
                                        <div class="item-details">
                                            <div class="item-name">Item Name 4 Lorem Ipsum</div>
                                            <div class="rating">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-active.png">
                                                <img src="/themes/{{ $shop_theme }}/img/star-disable.png">
                                            </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </div>
                                        <div class="add-to-cart-button-container row clearfix">
                                            <div class="add-to-cart-button">
                                                <div class="col-xs-4 cart-icon1"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                                                <button class="col-xs-8 button-icon">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                    </div> 
            </div>


        </div>
    </div>
</div>
<!-- Modal -->
<div id="shopping_cart" class="modal fade global-modal shopping-cart-modal" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <div class="success">
            <img src="/themes/{{ $shop_theme }}/img/mini-check.png">
            <span>Item was successfully added to your cart.</span>
        </div>
        <h4 class="modal-title">
            <img src="/themes/{{ $shop_theme }}/img/shopping-cart-icon.png">
            <span>SHOPPING <span>CART</span></span>
        </h4>
      </div>
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
                <tr>
                    <td class="text-left">
                        <div class="img">
                            <img src="/themes/{{ $shop_theme }}/img/yellow-bag.jpg">
                        </div>
                        <div class="name">Lorem Ipsum Loret</div>
                    </td>
                    <td>
                        <div class="input-group">
                            <span class="input-group-addon">+</span>
                            <input type="text" class="form-control">
                            <span class="input-group-addon">-</span>
                        </div>
                    </td>
                    <td class="upc">P 300.00</td>
                    <td class="ttl">P 300.00</td>
                    <td class="rmv"><a href="javascript:">Remove</a></td>
                </tr>
                <tr>
                    <td class="text-left">
                        <div class="img">
                            <img src="/themes/{{ $shop_theme }}/img/yellow-bag.jpg">
                        </div>
                        <div class="name">Lorem Ipsum Loret</div>
                    </td>
                    <td>
                        <div class="input-group">
                            <span class="input-group-addon">+</span>
                            <input type="text" class="form-control">
                            <span class="input-group-addon">-</span>
                        </div>
                    </td>
                    <td class="upc">P 300.00</td>
                    <td class="ttl">P 300.00</td>
                    <td class="rmv"><a href="javascript:">Remove</a></td>
                </tr>
                <tr>
                    <td class="text-left">
                        <div class="img">
                            <img src="/themes/{{ $shop_theme }}/img/yellow-bag.jpg">
                        </div>
                        <div class="name">Lorem Ipsum Loret</div>
                    </td>
                    <td>
                        <div class="input-group">
                            <span class="input-group-addon">+</span>
                            <input type="text" class="form-control">
                            <span class="input-group-addon">-</span>
                        </div>
                    </td>
                    <td class="upc">P 300.00</td>
                    <td class="ttl">P 300.00</td>
                    <td class="rmv"><a href="javascript:">Remove</a></td>
                </tr>
                <tr>
                    <td class="text-left">
                        <div class="img">
                            <img src="/themes/{{ $shop_theme }}/img/yellow-bag.jpg">
                        </div>
                        <div class="name">Lorem Ipsum Loret</div>
                    </td>
                    <td>
                        <div class="input-group">
                            <span class="input-group-addon">+</span>
                            <input type="text" class="form-control">
                            <span class="input-group-addon">-</span>
                        </div>
                    </td>
                    <td class="upc">P 300.00</td>
                    <td class="ttl">P 300.00</td>
                    <td class="rmv"><a href="javascript:">Remove</a></td>
                </tr>
                <tr>
                    <td class="text-left">
                        <div class="img">
                            <img src="/themes/{{ $shop_theme }}/img/yellow-bag.jpg">
                        </div>
                        <div class="name">Lorem Ipsum Loret</div>
                    </td>
                    <td>
                        <div class="input-group">
                            <span class="input-group-addon">+</span>
                            <input type="text" class="form-control">
                            <span class="input-group-addon">-</span>
                        </div>
                    </td>
                    <td class="upc">P 300.00</td>
                    <td class="ttl">P 300.00</td>
                    <td class="rmv"><a href="javascript:">Remove</a></td>
                </tr>
            </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <div class="text-right">
            <div class="subtotal-label">Subtotal:</div>
            <div class="subtotal-value">P 3,350.00</div>
        </div>
        <div style="margin-top: 10px;">
            <button type="button" class="btn btn-primary" data-dismiss="modal">CHECK OUT</button>
        </div>
      </div>
    </div>

  </div>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/product_content.css">
@endsection
