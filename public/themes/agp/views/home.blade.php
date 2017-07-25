@extends('layout')
@section('content')
<div class="top_wrapper no-transparent">
   <!-- SLIDER -->
   <div class="slide-container">
      @if(is_serialized(get_content($shop_theme_info, "home", "home_slider")))
         @foreach(unserialize(get_content($shop_theme_info, "home", "home_slider")) as $slider)
         <div>
            <div style="position: relative; padding-bottom: 45%;">
               <img style="width: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; object-fit: cover; object-position: center;" src="{{ $slider }}">
            </div>
         </div>
         @endforeach
      @else
         <div>
            <img src="resources/assets/front/img/1.jpg">
         </div>
         <div>
            <img src="resources/assets/front/img/2.jpg">
         </div>
         <div>
            <img src="resources/assets/front/img/3.jpg">
         </div>
      @endif
   </div>
   <!-- INFO TABS -->
   <div class="container">
      <div class="info-tabs">
         <ul class="nav nav-tabs nav-justified">
            <li class="active"><a class="clearfix" data-toggle="tab" href="#home">Welcome <img src="resources/assets/front/img/arrow-hehe.png"></a></li>
            <li><a class="clearfix" data-toggle="tab" href="#nature">Nature <img src="resources/assets/front/img/arrow-hehe.png"></a></li>
            <li><a class="clearfix" data-toggle="tab" href="#wealth">Wealth <img src="resources/assets/front/img/arrow-hehe.png"></a></li>
            <li><a class="clearfix" data-toggle="tab" href="#technology">Technology <img src="resources/assets/front/img/arrow-hehe.png"></a></li>
         </ul>
         <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
               <div class="welcome">
                  <h3>{{ get_content($shop_theme_info, "home", "home_welcome_title") }}</h3>
                  <p>{{ get_content($shop_theme_info, "home", "home_welcome_description") }}</p>
               </div>
            </div>
            <div id="nature" class="tab-pane fade">
               <div class="general">
                  <div class="clearfix">
                     <div class="vc_col-sm-7 wpb_column column_container">
                        <h3><img src="resources/assets/front/img/nature-icon.png"> {{ get_content($shop_theme_info, "home", "home_nature_title") }}</h3>
                        <p>{{ get_content($shop_theme_info, "home", "home_nature_description") }}</p>
                        <div class="note">{{ get_content($shop_theme_info, "home", "home_nature_quote") }}</div>
                     </div>
                     <div class="vc_col-sm-5 wpb_column column_container">
                        <img class="img-responsive" src="{{ get_content($shop_theme_info, "home", "home_nature_image") }}">
                     </div>
                  </div>
               </div>
            </div>
            <div id="wealth" class="tab-pane fade">
               <div class="general">
                  <div class="clearfix">
                     <div class="vc_col-sm-7 wpb_column column_container">
                        <h3><img src="resources/assets/front/img/wealth-icon.png"> {{ get_content($shop_theme_info, "home", "home_wealth_title") }}</h3>
                        <p>{{ get_content($shop_theme_info, "home", "home_wealth_description") }}</p>
                        <div class="note">{{ get_content($shop_theme_info, "home", "home_wealth_quote") }}</div>
                     </div>
                     <div class="vc_col-sm-5 wpb_column column_container">
                        <img class="img-responsive" src="{{ get_content($shop_theme_info, "home", "home_wealth_image") }}">
                     </div>
                  </div>
               </div>
            </div>
            <div id="technology" class="tab-pane fade">
               <div class="general">
                  <div class="clearfix">
                     <div class="vc_col-sm-7 wpb_column column_container">
                        <h3><img src="resources/assets/front/img/technology-icon.png"> {{ get_content($shop_theme_info, "home", "home_technology_title") }}</h3>
                        <p>{{ get_content($shop_theme_info, "home", "home_technology_description") }}</p>
                        <div class="note">{{ get_content($shop_theme_info, "home", "home_technology_quote") }}</div>
                     </div>
                     <div class="vc_col-sm-5 wpb_column column_container">
                        <img class="img-responsive" src="{{ get_content($shop_theme_info, "home", "home_technology_image") }}">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- CATEGORY -->
   <div class="cat-holder">
      <div class="clearfix">
       	 <div class="vc_col-sm-3 wpb_column column_container">
            <div class="holder match-height" style="background-image: url('resources/assets/front/img/cat-beverages.jpg');">
               <img class="icon" src="resources/assets/front/img/beverages-icon.png">
               <div class="name">BEVERAGES</div>
               <div class="view">
                  <div class="not-hover"><img class="img-responsive" src="resources/assets/front/img/big-arrow.png"></div>
                  <div class="hover"><a href="/product">VIEW PRODUCTS <img src="resources/assets/front/img/small-arrow.png"></a></div>
               </div>
            </div>
         </div>
         <div class="vc_col-sm-3 wpb_column column_container">
            <div class="holder match-height" style="background-image: url('resources/assets/front/img/cat-beauty.jpg');">
               <img class="icon" src="resources/assets/front/img/beauty-icon.png">
               <div class="name">BEAUTY PRODUCTS</div>
               <div class="view">
                  <div class="not-hover"><img class="img-responsive" src="resources/assets/front/img/big-arrow.png"></div>
                  <div class="hover"><a href="/product">VIEW PRODUCTS <img src="resources/assets/front/img/small-arrow.png"></a></div>
               </div>
            </div>
         </div>
         <div class="vc_col-sm-3 wpb_column column_container">
            <div class="holder match-height" style="background-image: url('resources/assets/front/img/cat-hygiene.jpg');">
               <img class="icon" src="resources/assets/front/img/hygiene-icon.png">
               <div class="name">HYGIENE</div>
               <div class="view">
                  <div class="not-hover"><img class="img-responsive" src="resources/assets/front/img/big-arrow.png"></div>
                  <div class="hover"><a href="/product">VIEW PRODUCTS <img src="resources/assets/front/img/small-arrow.png"></a></div>
               </div>
            </div>
         </div>
         <div class="vc_col-sm-3 wpb_column column_container">
            <div class="holder match-height" style="background-image: url('resources/assets/front/img/cat-package.jpg');">
               <img class="icon" src="resources/assets/front/img/package-icon.png">
               <div class="name">PACKAGES</div>
               <div class="view">
                  <div class="not-hover"><img class="img-responsive" src="resources/assets/front/img/big-arrow.png"></div>
                  <div class="hover"><a href="/product">VIEW PRODUCTS <img src="resources/assets/front/img/small-arrow.png"></a></div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- QUOTE -->
   <div class="quote clearfix" style="border: 0;">
      <div class="container">
         <div class="clearfix">
            <div class="vc_col-sm-9 wpb_column column_container">
               {{ get_content($shop_theme_info, "home", "home_start_quote") }}
            </div>
            <div class="vc_col-sm-3 wpb_column column_container">
               <button class="btn btn-default" type="button" onClick="location.href='/mlm/register'">{{ get_content($shop_theme_info, "home", "home_start_button") }}</button>
            </div>
         </div>
      </div>
   </div>
   <div class="clearfix"></div>
   <!-- ANOTHER INFO TABS -->
   <div class="container">
      <div class="info-tabs">
         <ul class="nav nav-tabs nav-justified">
            <li class="active"><a class="clearfix" data-toggle="tab" href="#partners">Our Partners</a></li>
            <li><a class="clearfix" data-toggle="tab" href="#team">Team Members</a></li>
            <li><a class="clearfix" data-toggle="tab" href="#earners">Top Earners Of The Month</a></li>
            <li><a class="clearfix" data-toggle="tab" href="#news">News</a></li>
         </ul>
         <div class="tab-content">
            <div id="partners" class="tab-pane fade in active">
               <div class="list">
                  <div class="clearfix">
                     @if(is_serialized(get_content($shop_theme_info, "home", "home_partners")))
                        <div class="loli-list">
                        @foreach(unserialize(get_content($shop_theme_info, "home", "home_partners")) as $partners)
                           <div>
                              <img class="img-responsive" src="{{ $partners["image"] }}">
                              <h4>{{ $partners["name"] }}</h4>
                           </div>
                        @endforeach
                        </div>
                     @else
                        <h2>There are Currently No Partners</h2>
                     @endif
                  </div>
               </div>
            </div>
            <div id="team" class="tab-pane fade in">
               <div class="list">
                  <div class="clearfix">
                     @if(is_serialized(get_content($shop_theme_info, "home", "home_team_members")))
                        <div class="loli-list">
                        @foreach(unserialize(get_content($shop_theme_info, "home", "home_team_members")) as $team_members)
                           <div>
                              <img class="img-responsive" src="{{ $team_members["image"] }}">
                              <h4>{{ $team_members["name"] }}</h4>
                           </div>
                        @endforeach
                        </div>
                     @else
                        <h2>There are Currently No Team Members</h2>
                     @endif
                  </div>
               </div>
            </div>
            <div id="earners" class="tab-pane fade in">
               <div class="list">
                  <div class="clearfix">
                     @if(isset($_top_earners[0]))
                     @foreach($_top_earners as $top_earners)
                     <div class="vc_col-sm-3 wpb_column column_container">
                        <img class="img-responsive" src="{{ $top_earners->image }}">
                        <h4>{{ ucwords($top_earners->account_name) }}</h4>
                     </div>
                     @endforeach
                     @else
                     <h2>There are Currently No Top Earners Of The Month</h2>
                     @endif
                  </div>
               </div>
            </div>
            <div id="news" class="tab-pane fade in">
               <div class="news-list">
                  <div class="holder">
                     @if(isset($_news[0]))
                     @foreach($_news as $news)
                     <div class="clearfix row">
                        <div class="vc_col-sm-3 wpb_column column_container">
                           <img src="/uploads/{{ $news->image }}">
                        </div>
                        <div class="vc_col-sm-9 wpb_column column_container">
                           <h2>{{ $news->news_name }}</h2>
                           <p>{{ substr($news->news_description, 0, 400) }} ...</p>
                           <div class="text-right" style="text-align: right">
                              <a class="btn btn-default" href="/news_content?id={{ $news->id }}" style="background-color: #252525">Read More</a>
                           </div>
                        </div>
                     </div>
                     @endforeach
                     @else
                     <h2 style="text-align: center;">There are Currently No News</h2>
                     @endif
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- SOME PARAGRAPH -->
   <div class="quote clearfix" style="border: 0;">
      <div class="container">
         <div class="clearfix">
            <div class="vc_col-sm-12 wpb_column column_container" style="text-align: center;">
               {{ get_content($shop_theme_info, "home", "home_quote") }}
            </div>
         </div>
      </div>
   </div>
</div>
@endsection
@section("script")
<script type="text/javascript">
;(function($){
    $('.testimony-carousel .carousel-holder').slick({
      prevArrow:"<img style='height: 30px; top: 40%;' class='a-left control-c prev slick-prev' src='resources/assets/front/img/slick-arrow-left.png'>",
      nextArrow:"<img style='height: 30px; top: 40%;' class='a-right control-c next slick-next' src='resources/assets/front/img/slick-arrow-right.png'>",
      autoplay: true,
      autoplaySpeed: 3000,
    });
    $('.slide-container').slick({
      prevArrow:"<img style='height: 71px; width: 25px;' class='a-left control-c prev slick-prev' src='resources/assets/front/img/left-desu.png'>",
      nextArrow:"<img style='height: 71px; width: 25px;' class='a-right control-c next slick-next' src='resources/assets/front/img/right-desu.png'>",
      autoplay: true,
      autoplaySpeed: 3000,
    });
    $('.loli-list').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
    });
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) 
    {
      $('.loli-list').slick("unslick");
      $('.loli-list').hide();
    });
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e)
    {
      $('.loli-list').show();
      $('.loli-list').slick({
         autoplay: true,
         autoplaySpeed: 3000,
         slidesToShow: 4,
         slidesToScroll: 1,
         infinite: true,
       });
    });
})(jQuery);
</script>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="resources/assets/front/css/home.css">
@endsection