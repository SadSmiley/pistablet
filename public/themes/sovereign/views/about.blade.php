@extends("layout")
@section("content")
<div class="about">
	<div class="intro" style="background-image: url('/themes/{{ $shop_theme }}/img/company-bg.jpg');">
		<div class="holder container">
			<div class="text">
				<div class="blue text-holder">{{ get_content($shop_theme_info, "company", "company_intro_text_1") }}</div>
				<div></div>
				<div class="orange text-holder">{{ get_content($shop_theme_info, "company", "company_intro_text_2") }}</div>
				<div></div>
				<div class="green text-holder">{{ get_content($shop_theme_info, "company", "company_intro_text_3") }}</div>
			</div>
		</div>
	</div>
	<div class="main">
		<div class="container">
			<div class="row clearfix">
				<div class="col-md-4">
					<div class="holder">
						<h2>{{ get_content($shop_theme_info, "company", "company_about_title") }}</h2>
						<p>{{ get_content($shop_theme_info, "company", "company_about_description") }}</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="holder">
						<h2>{{ get_content($shop_theme_info, "company", "company_question_title") }}</h2>
						<p>{{ get_content($shop_theme_info, "company", "company_question_description") }}</p>
					</div>
					<div class="holder">
						<h2>{{ get_content($shop_theme_info, "company", "company_initiative_title") }}</h2>
						<div class="image">
							<img src="{{ get_content($shop_theme_info, "company", "company_initiative_image") }}">
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="holder contact">
						<h2>{{ get_content($shop_theme_info, "company", "company_contact_title") }}</h2>
						<table>
							<tbody>
								<tr>
									<td><i class="fa fa-map-marker" aria-hidden="true"></i></td>
									<td><span>{{ get_content($shop_theme_info, "company", "company_contact_address") }}</span></td>
								</tr>
								<tr>
									<td><i class="fa fa-envelope-o" aria-hidden="true"></i></td>
									<td><span>{{ get_content($shop_theme_info, "company", "company_contact_email") }}</span></td>
								</tr>
								<tr>
									<td><i class="fa fa-phone" aria-hidden="true"></i></td>
									<td><span>{{ get_content($shop_theme_info, "company", "company_contact_phone") }}</span></td>
								</tr>
								<tr>
									<td><i class="fa fa-mobile" aria-hidden="true"></i></td>
									<td><span>{{ get_content($shop_theme_info, "company", "company_contact_mobile") }}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/aboutus.css">
@endsection
