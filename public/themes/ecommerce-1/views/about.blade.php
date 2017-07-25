@extends("layout")
@section("content")
<!-- OUR VALUES -->
<div class="container values" style="margin-top: 0; margin-bottom: 40px;">
	<div class="holder message">
		<div class="row clearfix">
			<div class="col-md-8">
				<div class="greet">GREETINGS!</div>
				<div class="welcome">WELCOME to the FINANCIAL SUCCESS OPPORTUNITY!</div>
				<div class="text">This is a very unique business model that would make all of us realize and achieve our DREAMS. My greatest vision and passion has been to help more people to be truly successful in their lives holistically, thus the PhilTECH company was founded.

For me, SUCCESS is not just about FINANCIAL FREEDOM, but also about the TOTAL LIFE TRANSFORMATION: FINANCIALLY, EMOTIONALLY AND SPIRITUALLY. TO MENTOR, MOTIVATE and INSPIRE OTHER PEOPLE regardless of age, gender, socio-economic status and educational background.

PhilTECH INC. was established to provide the right avenue to empowering all of us CONSUMERS by breaking the cycle of our lives, have equal opportunity for both business owners and consumers, earn while spending our hard earn money and most of all to transform all ordinary consumers to become successful entrepreneurs. PhilTECH is soaring at its highest potential to leverage to all FILIPINOS anywhere in the world in achieving their ultimate goals and dreams to be financially independent earned through perseverance, honesty and strong belief in one’s self and reason to live a happy and successful life.

Again, I would like to WELCOME YOU ALL and BE SUCCESSFUL for the rest of your life.

ARNOLD A. ARBILLERA
President &amp; CEO</div>
			</div>
			<div class="col-md-4">
				<img style="width: 100%;" src="/themes/{{ $shop_theme }}/img/greeting.png">
			</div>
		</div>
	</div>
</div>

<!-- TOP CONTENT -->
	<div class="container top-content">

		<div class="col-md-6 top-content-image">
			<img src="{{ get_content($shop_theme_info, 'about', 'about_image', '/themes/'. $shop_theme .'/img/about-content-image.jpg') }}">
		</div>

		<div class="row clearfix">
			<div class="col-md-6">
				<div class="top-title">
					<div>
						<div class="welcome">{{ get_content($shop_theme_info, "about", "about_title", "Welcome to Shopshoshop.com") }}</div>
					</div>
				</div>
				<div style="margin-left: 0;" class="paragraph">		
					<div style="white-space: pre-wrap;">{{ get_content($shop_theme_info, "about", "about_content", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.") }}</div>
				</div>
			</div>
		</div>

	</div>




<!-- BOTTOM CONTENT -->
	<div class="container bottom-content">
		
		<div class="row">
			<div class="bottom-image"><img src="{{ get_content($shop_theme_info, 'about', 'about_mission_image', '/themes/'. $shop_theme .'/img/mission.png') }}"></div>

			<div class="title">
				<div>{{ get_content($shop_theme_info, "about", "about_mission_title", "Our Mission") }}</div>
			</div>

			<div class="bottom-par" style="white-space: pre-wrap;">{{ get_content($shop_theme_info, "about", "about_mission_content", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.") }}</div>

			<div class="bottom-image"><img src="{{ get_content($shop_theme_info, 'about', 'about_vision_image', '/themes/'. $shop_theme .'/img/vision.png') }}"></div>

			<div class="title">
				<div>{{ get_content($shop_theme_info, "about", "about_vision_title", "Our Vision") }}</div>
			</div>

			<div class="bottom-par bottom-par-two" style="white-space: pre-wrap;">{{ get_content($shop_theme_info, "about", "about_vision_content", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.") }}</div>
		</div>
			
	</div>

<div class="container bottom-content values">
	<div class="holder">
		<img class="img-responsive" style="margin: auto;" src="/themes/{{ $shop_theme }}/img/corevalues.png">
		<div class="title" style="margin-top: 50px; margin-bottom: 50px;">
			<div>CORE VALUES</div>
		</div>
		<img class="img-responsive" style="margin: auto;" src="/themes/{{ $shop_theme }}/img/core-values.jpg">
	</div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/aboutus.css">
@endsection
