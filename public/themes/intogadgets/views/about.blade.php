 @section('content')
 @extends('layout')
 <div class="about-container">
 	<div class="about-header container">
 		<div class="title">{{ get_content($shop_theme_info, "about", "about_title") }}</div>
 		<div class="img"><img src="{{ get_content($shop_theme_info, "about", "about_first_row_image") }}"></div>
 		<div class="text">{{ get_content($shop_theme_info, "about", "about_first_row_text") }}</div>
 	</div>
 	<div class="about-quote">
 		<div class="container">
	 		<div class="text">T{{ get_content($shop_theme_info, "about", "about_second_row_text") }}</div>
	 		<div class="img"><img src="{{ get_content($shop_theme_info, "about", "about_second_row_image") }}"></div>
 		</div>
 	</div>
 	<div class="about-award container">
 		<div class="img"><img src="{{ get_content($shop_theme_info, "about", "about_third_row_image") }}"></div>
 		<div class="text">{{ get_content($shop_theme_info, "about", "about_third_row_text") }}</div>
		<div class="award">
			<img src="{{ get_content($shop_theme_info, "about", "about_third_row_image_award") }}">
		</div>
 	</div>
 	<div class="about-info">
 		<div class="holder objective">
 			<div class="title">
 				<div class="title-text">{{ get_content($shop_theme_info, "about", "about_objective_title") }}</div>
 			</div>
 			<div class="text container">{{ get_content($shop_theme_info, "about", "about_objective_description") }}</div>
 		</div>
 		<div class="holder mission">
 			<div class="title">
 				<div class="title-text">{{ get_content($shop_theme_info, "about", "about_mission_title") }}</div>
 			</div>
 			<div class="text container">{{ get_content($shop_theme_info, "about", "about_mission_description") }}</div>
 		</div>
 		<div class="holder vision">
 			<div class="title">
 				<div class="title-text">{{ get_content($shop_theme_info, "about", "about_vision_title") }}</div>
 			</div>
 			<div class="text container">{{ get_content($shop_theme_info, "about", "about_vision_description") }}</div>
 		</div>
 	</div>
 </div>
 @endsection
@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/about.css">
@endsection
