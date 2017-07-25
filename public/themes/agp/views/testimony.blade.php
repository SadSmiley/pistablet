@extends('layout')
@section('content')
<div class="top_wrapper no-transparent">
    <div class="testimony">
        <div class="intro">
            <img src="{{ get_content($shop_theme_info, "testimonial", "testimonial_intro_image") }}">
        </div>
        <div class="testimony-container">
            @if(is_serialized(get_content($shop_theme_info, "testimonial", "testimonial_testimonies")))
                @foreach(unserialize(get_content($shop_theme_info, "testimonial", "testimonial_testimonies")) as $key => $testimony)
                    @if($key % 2 != 1)
                        <div class="holder">
                            <div class="container">
                                <table class="clearfix">
                                    <tr>
                                        <td class="transformation-holder">
                                            <div class="transformation">
                                                <div class="trans-holder">  
                                                    <div class="main"><img style="width: 108px; height: 133px; object-fit: cover; object-position: center;" src="{{ $testimony["before_image"] }}"></div>
                                                    <img src="resources/assets/front/img/before-text.png">
                                                </div>
                                                <div class="divider"><span>{{ $testimony["name"] }}</span><img src="resources/assets/front/img/testimony-divider.png"></div>
                                                <div class="trans-holder">
                                                    <div class="main"><img style="width: 108px; height: 133px; object-fit: cover; object-position: center;" src="{{ $testimony["after_image"] }}"></div>
                                                    <img src="resources/assets/front/img/after-text.png">
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="text">
                                                <div class="title">{{ $testimony["title"] }}</div>
                                                <div class="description"><img class="left" src="resources/assets/front/img/left-quote.png"> <span>{{ $testimony["testimony"] }}</span> <img class="right" src="resources/assets/front/img/right-quote.png"></div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    @else
                        <div class="holder">
                            <div class="container">
                                <table class="clearfix">
                                    <tr>
                                        <td>
                                            <div class="text">
                                                <div class="title">{{ $testimony["title"] }}</div>
                                                <div class="description"><img class="left" src="resources/assets/front/img/left-quote.png"> <span>{{ $testimony["testimony"] }}</span> <img class="right" src="resources/assets/front/img/right-quote.png"></div>
                                            </div>
                                        </td>
                                        <td class="transformation-holder">
                                            <div class="transformation">
                                                <div class="trans-holder">  
                                                    <div class="main"><img style="width: 108px; height: 133px; object-fit: cover; object-position: center;" src="{{ $testimony["before_image"] }}"></div>
                                                    <img src="resources/assets/front/img/before-text.png">
                                                </div>
                                                <div class="divider"><span>{{ $testimony["name"] }}</span><img src="resources/assets/front/img/testimony-divider.png"></div>
                                                <div class="trans-holder">
                                                    <div class="main"><img style="width: 108px; height: 133px; object-fit: cover; object-position: center;" src="{{ $testimony["after_image"] }}"></div>
                                                    <img src="resources/assets/front/img/after-text.png">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    @endif
                @endforeach
            @else
                <div class="holder">
                    <div class="container">
                        <table class="clearfix">
                            <tr>
                                <td class="transformation-holder">
                                    <div class="transformation">
                                        <div class="trans-holder">
                                            <div class="main"><img src="resources/assets/front/img/sample-before.png"></div>
                                            <img src="resources/assets/front/img/before-text.png">
                                        </div>
                                        <div class="divider"><span>Eugene Genova</span><img src="resources/assets/front/img/testimony-divider.png"></div>
                                        <div class="trans-holder">
                                            <div class="main"><img src="resources/assets/front/img/sample-after.png"></div>
                                            <img src="resources/assets/front/img/after-text.png">
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="text">
                                        <div class="title">Mr. Genova gave up his insulin!</div>
                                        <div class="description"><img class="left" src="resources/assets/front/img/left-quote.png"> <span>Mr. Eugene Genova was deabetic for more than 10 years and had a dialysis last Dec. 2016. I had introduced to him our Java Green and religiously drinking it empty stomach in the morning and 30 minutes before lunch. For more than 3 months of drinking this coffee, he's geeling better and better everyday with regular urination, no more bloated feet and the good news i just recieved from him today, he gave up his insulin! Thanks to Java Green!</span> <img class="right" src="resources/assets/front/img/right-quote.png"></div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="holder">
                    <div class="container">
                        <table class="clearfix">
                            <tr>
                                <td>
                                    <div class="text">
                                        <div class="title">Mr. Genova gave up his insulin!</div>
                                        <div class="description"><img class="left" src="resources/assets/front/img/left-quote.png"> <span>Mr. Eugene Genova was deabetic for more than 10 years and had a dialysis last Dec. 2016. I had introduced to him our Java Green and religiously drinking it empty stomach in the morning and 30 minutes before lunch. For more than 3 months of drinking this coffee, he's geeling better and better everyday with regular urination, no more bloated feet and the good news i just recieved from him today, he gave up his insulin! Thanks to Java Green!</span> <img class="right" src="resources/assets/front/img/right-quote.png"></div>
                                    </div>
                                </td>
                                <td class="transformation-holder">
                                    <div class="transformation">
                                        <div class="trans-holder">
                                            <div class="main"><img src="resources/assets/front/img/sample-before.png"></div>
                                            <img src="resources/assets/front/img/before-text.png">
                                        </div>
                                        <div class="divider"><span>Eugene Genova</span><img src="resources/assets/front/img/testimony-divider.png"></div>
                                        <div class="trans-holder">
                                            <div class="main"><img src="resources/assets/front/img/sample-after.png"></div>
                                            <img src="resources/assets/front/img/after-text.png">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="resources/assets/front/css/testimony.css">
@endsection