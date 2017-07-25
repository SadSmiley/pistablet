@extends('layout')
@section('content')
<div class="top_wrapper no-transparent">
    <div class="header_page basic background_image" style="background-image:url(resources/assets/front/img/contact-bg.jpg);background-repeat: no-repeat; -webkit-background-size: cover;-moz-background-size: cover;-o-background-size: cover;background-size: cover; color:#2f383d; ">
        <div class="container">
            <h1 class="title"><strong>{{ get_content($shop_theme_info, "contact", "contact_title") }}</strong></h1>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="contact">
        <div class="container">
            <div class="lol-row clearfix">
                <div class="vc_col-sm-6 wpb_column column_container">
                    <div class="title">{{ get_content($shop_theme_info, "contact", "contact_sub_title") }}</div>
                    <div class="lol-row clearfix">
                        <form method="post">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <div class="vc_col-sm-6 wpb_column column_container">
                                <input name="first_name" type="text" class="form-control" placeholder="First Name*">
                            </div>
                            <div class="vc_col-sm-6 wpb_column column_container">
                                <input name="last_name" type="text" class="form-control" placeholder="Last Name*">
                            </div>
                            <div class="vc_col-sm-6 wpb_column column_container">
                                <input name="phone_number" type="text" class="form-control" placeholder="Phone Number*">
                            </div>
                            <div class="vc_col-sm-6 wpb_column column_container">
                                <input name="email_address" type="email" class="form-control" placeholder="Email Address*">
                            </div>
                            <div class="vc_col-sm-6 wpb_column column_container">
                                <input name="subject" type="text" class="form-control" placeholder="Subject">
                            </div>
                            <div class="vc_col-sm-12 wpb_column column_container">
                                <textarea name="message" class="form-control" placeholder="Message"></textarea>
                            </div>
                            <div class="vc_col-sm-12 wpb_column column_container">
                                <button class="btn" type="submit">SEND</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="vc_col-sm-6 wpb_column column_container">
                    <div>
                        <div class="title">{{ get_content($shop_theme_info, "contact", "contact_location_title") }}</div>
                        <div class="info">
                            <div class="holder"><img src="resources/assets/front/img/location-icon.png"> {{ get_content($shop_theme_info, "contact", "contact_location_address") }}</div>
                            <div class="holder"><img src="resources/assets/front/img/mobile-icon.png"> {{ get_content($shop_theme_info, "contact", "contact_location_phone") }}</div>
                            <div class="holder"><img src="resources/assets/front/img/mail-icon.png"> {{ get_content($shop_theme_info, "contact", "contact_location_email") }}</div>
                        </div>
                    </div>
                    <div style="margin-top: 50px;">
                        <div class="title">{{ get_content($shop_theme_info, "contact", "contact_business_title") }}</div>
                        <div class="info">
                            <div class="holder"><img src="resources/assets/front/img/time-icon.png"> {{ get_content($shop_theme_info, "contact", "contact_business_hours") }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@section('css')
<link rel="stylesheet" type="text/css" href="resources/assets/front/css/contact.css">
@endsection