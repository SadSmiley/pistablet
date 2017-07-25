@extends("layout")
@section("content")

<!-- TOP CONTENT -->
<div class="top-content">
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-6 image-holder">
				<img src="{{ get_content($shop_theme_info, "about", "about_company_image", "/themes/". $shop_theme ."/img/about-us-image.png") }}">
			</div>
			<div class="col-md-6 content-holder">
				<div class="content-title">{{ get_content($shop_theme_info, "about", "about_welcome_title", "WELCOME TO") }}<span id="tech"> {{ get_content($shop_theme_info, "about", "about_company_name_1", "TECH") }}</span>{{ get_content($shop_theme_info, "about", "about_company_name_2", "SIDE") }}<span id="electronics"> {{ get_content($shop_theme_info, "about", "about_company_name_3", "ELECTRONICS") }}</span></div>
				<div class="content-sub">{{ get_content($shop_theme_info, "about", "about_company_description_1", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.") }}</div>
				<div class="content-sub">{{ get_content($shop_theme_info, "about", "about_company_description_2", "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.") }}</div>
			</div>
		</div>
	</div>
</div>

<div class="strategy">
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-4">
				<div class="title"><img src="/themes/{{ $shop_theme }}/img/check.png"> {{ get_content($shop_theme_info, "about", "about_mission_title", "MISSION") }}</div>
				<div class="sub-title">{{ get_content($shop_theme_info, "about", "about_mission_description", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.") }}</div>
			</div>
			<div class="col-md-4">
				<div class="title"><img src="/themes/{{ $shop_theme }}/img/check.png"> {{ get_content($shop_theme_info, "about", "about_vision_title", "VISION") }}</div>
				<div class="sub-title">{{ get_content($shop_theme_info, "about", "about_vision_description", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.") }}</div>
			</div>
			<div class="col-md-4">
				<div class="title"><img src="/themes/{{ $shop_theme }}/img/check.png"> {{ get_content($shop_theme_info, "about", "about_core_values_title", "CORE VALUES") }}</div>
				<div class="sub-title">{{ get_content($shop_theme_info, "about", "about_core_values_description", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.") }}</div>
			</div>
		</div>
	</div>
</div>

<div class="our-team">
	<div class="container">

		<div class="title">{{ get_content($shop_theme_info, "about", "about_meet_our_team_title_1", "MEET OUR") }} <span>{{ get_content($shop_theme_info, "about", "about_meet_our_team_title_2", "TEAM") }}</span></div>

		<div class="row clearfix team-details">
			<div class="col-md-3 person-details">
				<div class="person-image"><img src="{{ get_content($shop_theme_info, "about", "about_employee_1_image", "/themes/". $shop_theme ."/img/person.png") }}"></div>
				<div class="person-name">{{ get_content($shop_theme_info, "about", "about_employee_1_name", "Lorem Ipsum Dolor") }}</div>
				<div class="person-position">{{ get_content($shop_theme_info, "about", "about_employee_1_position", "Lorem Ipsum") }}</div>
			</div>
			<div class="col-md-3 person-details">
				<div class="person-image"><img src="/themes/{{ $shop_theme }}/img/person.png"></div>
				<div class="person-name">Lorem Ipsum Dolor</div>
				<div class="person-position">Lorem Ipsum</div>
			</div>
			<div class="col-md-3 person-details">
				<div class="person-image"><img src="/themes/{{ $shop_theme }}/img/person.png"></div>
				<div class="person-name">Lorem Ipsum Dolor</div>
				<div class="person-position">Lorem Ipsum</div>
			</div>
			<div class="col-md-3 person-details">
				<div class="person-image"><img src="/themes/{{ $shop_theme }}/img/person.png"></div>
				<div class="person-name">Lorem Ipsum Dolor</div>
				<div class="person-position">Lorem Ipsum</div>
			</div>
		</div>
	</div>
</div>




<!-- BOTTOM CONTENT -->
	
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/aboutus.css">
@endsection
