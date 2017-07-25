@section('content')
@extends('layout')
<div class="youwin">
   <div class="youwin-job" style="background-image: url({{ get_content($shop_theme_info, 'youwin', 'you_win_cover') }});">
      <div class="container">
         <div class="containers">
            <div class="text">
               <div class="description">{{ get_content($shop_theme_info, 'youwin', 'you_win_description_1') }}</div>
               <div class="description1">{{ get_content($shop_theme_info, 'youwin', 'you_win_description_2') }}</div>
            </div>
         </div>
      </div>
   </div>
   <div class="service">
      <div class="holder">
         <a href="{{ get_content($shop_theme_info, 'youwin', 'you_win_locate_link') }}" target="_blank">
         <img src="{{ get_content($shop_theme_info, 'youwin', 'you_win_locate_image') }}">
         </a>
      </div>
      <div class="holder">
         <a href="{{ get_content($shop_theme_info, 'youwin', 'you_win_send_link') }}" target="_blank">
         <img src="{{ get_content($shop_theme_info, 'youwin', 'you_win_send_image') }}">
         </a>
      </div>
      <div class="holder">
         <img src="{{ get_content($shop_theme_info, 'youwin', 'you_win_contact_image') }}">
      </div>
   </div>
   <div class="manual">
      <div class="header-manual">
         <div class="line"></div>
         <div class="text">{{ get_content($shop_theme_info, 'youwin', 'you_win_manual_title') }}</div>
      </div>
      <!-- Place somewhere in the <body> of your page -->
      <div class="manualdownload">
         <div class="text1">{{ get_content($shop_theme_info, 'youwin', 'you_win_manual_subtitle') }}</div>
         @if(is_serialized(get_content($shop_theme_info, 'youwin', 'you_win_manual_maintenance')))
            @foreach(unserialize(get_content($shop_theme_info, 'youwin', 'you_win_manual_maintenance')) as $key => $value)
            <div class="manual-box">
               <input class="download-box" type="button" value="{{ $value['label'] }}" onclick="window.location.href='{{ $value['link'] }}'" />
            </div>
            @endforeach
         @else
         <div class="manual-box">
            <input class="download-box" type="button" value="DOWNLOAD M022 MODEL" onclick="window.location.href='https://drive.google.com/open?id=0B1CyP3NtcWQKRTlkcElvTFg0VDQ'" />
         </div>
         <div class="manual-box">
            <input class="download-box" type="button" value="DOWNLOAD M022T MODEL" onclick="window.location.href='https://drive.google.com/file/d/0B1CyP3NtcWQKd2NzN0d5d2lLb2M/view?usp=sharing'" />
         </div>
         <div class="manual-box">
            <input class="download-box" type="button" value="DOWNLOAD R01 MODEL" onclick="window.location.href='https://drive.google.com/open?id=0B1CyP3NtcWQKU0lIdk9NdldmQzg'" />
         </div>
         @endif
      </div>
   </div>
</div>
@endsection
@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/youwin.css">
@endsection