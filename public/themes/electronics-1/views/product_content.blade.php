@extends('layout')
@section('content')


    <div class="container">
        
        <div class="content">
            <div class="row clearfix">

            <!-- SIDE CONTAINER -->
                <div class="col-md-4 left-content">
                    <div class="categories">
                        <div class="categories-title"><i class="fa fa-bars" aria-hidden="true"></i><span class="title">CATEGORIES</span></div>
                        <div class="categories-content">
                            <div class="list"><a href="">DESKTOP & PC PARTS</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
                            <div class="list"><a href="">LAPTOP & TABLET</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
                            <div class="list"><a href="">SMART PHONE</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
                            <div class="list"><a href="">CAMERA</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
                            <div class="list"><a href="">HEADPHONE & SPEAKER</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
                            <div class="list"><a href="">TV & COMPONENTS</a><span><a href=""><img src="/themes/{{ $shop_theme }}/img/categories-cross.png"></a></span></div>
                        </div>
                    </div>


                    <div class="most-viewed">
                        <div class="featured-content-container">
                            <div class="container-title"><i class="fa fa-star-o" aria-hidden="true"></i><span class="title">MOST VIEWED</span></div>
                        </div>
                        <div class="most-viewed-content">
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="most-viewed-image"><img src="/themes/{{ $shop_theme }}/img/most-viewed-img1.png"></td>
                                        <td>
                                            <div class="item-name">Lorem ipsum dolor sit</div>
                                                <div class="item-rating">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="most-viewed-image"><img src="/themes/{{ $shop_theme }}/img/most-viewed-img2.png"></td>
                                        <td>
                                            <div class="item-name">Lorem ipsum dolor sit</div>
                                                <div class="item-rating">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="most-viewed-image"><img src="/themes/{{ $shop_theme }}/img/most-viewed-img3.png"></td>
                                        <td>
                                            <div class="item-name">Lorem ipsum dolor sit</div>
                                                <div class="item-rating">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="most-viewed-image"><img src="/themes/{{ $shop_theme }}/img/most-viewed-img4.png"></td>
                                        <td>
                                            <div class="item-name">Lorem ipsum dolor sit</div>
                                                <div class="item-rating">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                    <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                </div>
                                            <div class="item-price">PHP 5,000.00</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="product-tags">
                        <div class="product-tags-title"><i class="fa fa-tag" aria-hidden="true"></i><span class="title">PRODUCT TAGS</span></div>

                        <div class="product-tags-content">
                            <div class="column">
                                <a class="tags" href="">Electronics</a>
                                <a class="tags" href="">Drone</a>
                                <a class="tags" href="">Camera Drone</a>
                                <a class="tags" href="">Flying Camera</a>
                            </div>
                            <div class="column">
                                <a class="tags" href="">Black Drone</a>
                                <a class="tags" href="">Elisi</a>
                                <a class="tags" href="">Camera Elisi</a>
                                <a class="tags" href="">HD Camera</a>
                            </div>
                            <div class="column">
                                <a class="tags" href="">Hightech</a>
                                <a class="tags" href="">Tough Drone</a>
                                <a class="tags" href="">Drone with Camera</a>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <!-- ITEM CONTENT -->
                <div class="col-md-8 right-content">

                    <div class="featured-container product">
                        <div class="row clearfix">
                        
                            <div class="col-md-5 top-left-content">
                                <div class="image-holder"><img src="/themes/{{ $shop_theme }}/img/product-image.png"></div>
                                <div class="images-holder">
                                    <span><img src="/themes/{{ $shop_theme }}/img/left-scroll.png"></span>
                                    <span><img src="/themes/{{ $shop_theme }}/img/elisi-camera1.png"></span>
                                    <span><img src="/themes/{{ $shop_theme }}/img/elisi-camera2.png"></span>
                                    <span><img src="/themes/{{ $shop_theme }}/img/elisi-camera3.png"></span>
                                    <span><img src="/themes/{{ $shop_theme }}/img/right-scroll.png"></span>
                                </div>
                            </div>
                            <div class="col-md-7 top-right-content">
                                <div class="description-content">
                                    <div class="item-title">Lorem Ipsum Dolor</div>
                                    <div class="rating">
                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                    </div>
                                    <div class="item-price">P 5,000.00</div>
                                    <div class="item-availability">Availability: <span>In-stock</span></div>
                                    <div class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</div>
                                    <div class="item-quantity">
                                        <form action="/action_page.php">
                                          QTY:
                                          <input type="number" name="quantity" min="1" max="5">
                                          <button><i class="fa fa-shopping-cart" aria-hidden="true"></i><span>ADD TO CART</span></button>
                                        </form>
                                    </div>
                                    <div class="item-category">Category: <span>Cameras</span></div>
                                    <div class="item-tags">Tags: <span>Drone, Camera Drone</span></div>
                                </div>
                                <div class="share-product">Share this product 
                                <span class="icons">
                                <a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href=""><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href=""><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="featured-container description-reviews">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#description">DESCRIPTION</a></li>
                            <li><a data-toggle="tab" href="#reviews">REVIEWS (3)</a></li>
                        </ul>
                        <div class="tab-content">
                            <div id="description" class="tab-pane fade in active">
                                <div class="description-content">
                                    <div class="description-title">Product Description</div>
                                    <div class="description-par">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..</div>
                                </div>

                                <div class="related-items">
                                    <div class="featured-content-container">
                                        <div class="container-title"><img id="tag" src="/themes/{{ $shop_theme }}/img/tag.png"><span class="title">RELATED ITEMS</span>
                                        <span>
                                            <select>
                                                <option>All</option>
                                            </select>
                                        </span>
                                        <span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span></div>
                                    </div>
                                    
                                        <div class="related-items-content">
                                            <div class="col-md-3 per-item-container">
                                                <div class="image-holder"><img src="/themes/{{ $shop_theme }}/img/new-release-image1.png"></div>
                                                <div class="content-holder">
                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                    <div class="item-rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                    </div>
                                                    <div class="item-price">PHP 5,000.00</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3 per-item-container">
                                                <div class="image-holder"><img src="/themes/{{ $shop_theme }}/img/new-release-image2.png"></div>
                                                <div class="content-holder">
                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                    <div class="item-rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                    </div>
                                                    <div class="item-price">PHP 5,000.00</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3 per-item-container">
                                                <div class="image-holder"><img src="/themes/{{ $shop_theme }}/img/new-release-image3.png"></div>
                                                <div class="content-holder">
                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                    <div class="item-rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                    </div>
                                                    <div class="item-price">PHP 5,000.00</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3 per-item-container">
                                                <div class="image-holder"><img src="/themes/{{ $shop_theme }}/img/new-release-image4.png"></div>
                                                <div class="content-holder">
                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                    <div class="item-rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                    </div>
                                                    <div class="item-price">PHP 5,000.00</div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                </div>

                                <div class="last-viewed-items">
                                    <div class="last-viewed-items-title">
                                        <div class="top-title">
                                            <img id="tag" src="/themes/{{ $shop_theme }}/img/tag.png">
                                            <span class="title">LAST VIEWED ITEMS</span>
                                            <span>
                                                <select>
                                                    <option>All</option>
                                                </select>
                                            </span>
                                            <span class="scroll-button"><a href="#"><img src="/themes/{{ $shop_theme }}/img/left-button-scroll.png"></a><a href="#"><img src="/themes/{{ $shop_theme }}/img/right-button-scroll.png"></a></span>
                                        </div>
                                    </div>

                                    <div class="last-viewed-items-content">
                                        <div class="row clearfix">
                                            <div class="col-md-4">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img src="/themes/{{ $shop_theme }}/img/last-viewed-items-image1.png">
                                                            </td>
                                                            <td>
                                                                <div class="content-holder">
                                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                                    <div class="item-rating">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                                    </div>
                                                                    <div class="item-price">PHP 5,000.00</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-md-4">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img src="/themes/{{ $shop_theme }}/img/last-viewed-items-image2.png">
                                                            </td>
                                                            <td>
                                                                <div class="content-holder">
                                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                                    <div class="item-rating">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                                    </div>
                                                                    <div class="item-price">PHP 5,000.00</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-md-4">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img src="/themes/{{ $shop_theme }}/img/last-viewed-items-image3.png">
                                                            </td>
                                                            <td>
                                                                <div class="content-holder">
                                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                                    <div class="item-rating">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                                    </div>
                                                                    <div class="item-price">PHP 5,000.00</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="col-md-4">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <img src="/themes/{{ $shop_theme }}/img/last-viewed-items-image4.png">
                                                            </td>
                                                            <td>
                                                                <div class="content-holder">
                                                                    <div class="item-name">Lorem ipsum dolor sit</div>
                                                                    <div class="item-rating">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                                    </div>
                                                                    <div class="item-price">PHP 5,000.00</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div id="reviews" class="tab-pane fade">
                                <div class="container-review">
                                    <div class="review-title">Customer Reviews</div>
                                    <div class="row clearfix">
                                        <div class="review-content">        
                                            <div class="col-md-2 col-xs-12">
                                                <div class="summary-details">
                                                    <div class="item-name">Alpha 12345</div>
                                                    <div class="rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                    </div>
                                                    <div class="item-date">Dec 5, 2016</div>
                                                </div>
                                                <div class="summary-details">
                                                    <div class="item-name">Alpha 12345</div>
                                                    <div class="rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
                                                    </div>
                                                    <div class="item-date">Dec 5, 2016</div>
                                                </div>
                                                <div class="summary-details">
                                                    <div class="item-name">Alpha 12345</div>
                                                    <div class="rating">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-colored.png">
                                                        <img src="/themes/{{ $shop_theme }}/img/star-not-colored.png">
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
