@extends("layout")
@section("content")
<div class="intro" style="background-image: url('/themes/{{ $shop_theme }}/img/intro-bg.jpg')">
	<div class="container">
		<div class="text">
			<div class="title">{{ get_content($shop_theme_info, "home", "home_intro_first_title") }}</div>
			<div></div>
			<div class="desc">
				<div class="first-line">{{ get_content($shop_theme_info, "home", "home_intro_second_title") }}</div>
				<div class="second-line">{{ get_content($shop_theme_info, "home", "home_intro_third_title") }}</div>
				<div class="objective">{{ get_content($shop_theme_info, "home", "home_intro_description") }}</div>
				<button class="btn btn-learn">{{ get_content($shop_theme_info, "home", "home_intro_button") }}</button>
			</div>
		</div>
	</div>
</div>
<div class="company">
	<div class="container">
		<ul class="nav nav-tabs">
			<li class="active"><a data-toggle="tab" href="#company">Company</a></li>
			<li><a data-toggle="tab" href="#mission">Mission</a></li>
			<li><a data-toggle="tab" href="#vision">Vision</a></li>
		</ul>
		<div class="tab-content">
			<div id="company" class="tab-pane fade in active">
				<div class="row clearfix">
					<div class="col-md-8">
						<h1>{{ get_content($shop_theme_info, "home", "home_company_title") }}</h1>
						<p>{{ get_content($shop_theme_info, "home", "home_company_description") }}</p>
						<div class="read-more">
							<a href="/about">Read More</a>
						</div>
					</div>
					<div class="col-md-4">
						<img class="img-responsive" src="{{ get_content($shop_theme_info, "home", "home_company_image") }}">
					</div>
				</div>
			</div>
			<div id="mission" class="tab-pane fade">
				<div class="row clearfix">
					<div class="col-md-8">
						<h1>{{ get_content($shop_theme_info, "home", "home_mission_title") }}</h1>
						<p>{{ get_content($shop_theme_info, "home", "home_mission_description") }}</p>
						<div class="read-more">
							<a href="/about">Read More</a>
						</div>
					</div>
					<div class="col-md-4">
						<img class="img-responsive" src="{{ get_content($shop_theme_info, "home", "home_mission_image") }}">
					</div>
				</div>
			</div>
			<div id="vision" class="tab-pane fade">
				<div class="row clearfix">
					<div class="col-md-8">
						<h1>{{ get_content($shop_theme_info, "home", "home_vision_title") }}</h1>
						<p>{{ get_content($shop_theme_info, "home", "home_vision_description") }}</p>
						<div class="read-more">
							<a href="/about">Read More</a>
						</div>
					</div>
					<div class="col-md-4">
						<img class="img-responsive" src="{{ get_content($shop_theme_info, "home", "home_vision_image") }}">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="values" style="background-image: url('/themes/{{ $shop_theme }}/img/values-bg.jpg')">
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-4 left-holder match-height">
				<div class="holder">
					<div class="values-title">{{ get_content($shop_theme_info, "home", "home_core_title") }}</div>
					<div class="divider"></div>
					<div class="values-sub">{{ get_content($shop_theme_info, "home", "home_core_sub") }}</div>
				</div>
			</div>
			<div class="col-md-8 match-height">
				<div class="tower">
					<div class="tower-row">
						<div class="holder">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_excellence_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_excellence_description") }}</div>
						</div>
					</div>
					<div class="tower-row">
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_character_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_character_description") }}</div>
						</div>
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_integrity_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_integrity_description") }}</div>
						</div>
					</div>
					<div class="tower-row">
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_teamwork_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_teamwork_description") }}</div>
						</div>
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_communication_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_communication_description") }}</div>
						</div>
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_collaboration_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_collaboration_description") }}</div>
						</div>
					</div>
					<div class="tower-row">
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_attitude_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_attitude_description") }}</div>
						</div>
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_attitude_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_attitude_description") }}</div>
						</div>
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_initiative_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_initiative_description") }}</div>
						</div>
						<div class="holder match-height">
							<div class="name">{{ get_content($shop_theme_info, "home", "home_core_workethic_title") }}</div>
							<div class="desc">{{ get_content($shop_theme_info, "home", "home_core_workethic_description") }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>
<div class="product">
	<div class="container">
		<div class="row clearfix">
			<div class="col-md-6">
				<div class="image product-image-carousel">
					@if(count($_product) > 0)
						<div>
							<img src="/themes/sovereign/img/product-sample.jpg">
						</div>
					@else
						@foreach($_product as $product)
							<div>
								<img src="{{ get_product_first_image($product) }}">
							</div>
						@endforeach
					@endif
				</div>
			</div>
			<div class="col-md-6">
				<div class="name">{{ get_content($shop_theme_info, "home", "home_product_title") }}</div>
				<div class="desc">{{ get_content($shop_theme_info, "home", "home_product_description") }}</div>
			</div>
		</div>
	</div>
</div>
<div class="networking">
	<div class="container">
		<div class="title">{{ get_content($shop_theme_info, "home", "home_network_title") }}</div>
		<div class="row clearfix">
			<div class="col-md-4">
				<div class="holder">
					<div class="image">
						<img src="{{ get_content($shop_theme_info, "home", "home_network_image_1") }}">
					</div>
					<div class="desc">{{ get_content($shop_theme_info, "home", "home_network_description_1") }}</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="holder">
					<div class="image">
						<img src="{{ get_content($shop_theme_info, "home", "home_network_image_2") }}">
					</div>
					<div class="desc">{{ get_content($shop_theme_info, "home", "home_network_description_2") }}</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="holder">
					<div class="image">
						<img src="{{ get_content($shop_theme_info, "home", "home_network_image_3") }}">
					</div>
					<div class="desc">{{ get_content($shop_theme_info, "home", "home_network_description_3") }}</div>
				</div>
			</div>
		</div>
		<div class="quote">
			<div class="text">"{{ get_content($shop_theme_info, "home", "home_network_quote") }}"</div>
			<div class="name">- <span>{{ get_content($shop_theme_info, "home", "home_network_author_quote") }}</span></div>
			<div class="desc">{{ get_content($shop_theme_info, "home", "home_network_where_quote") }}</div>
		</div>
	</div>
</div>
<div class="saying">
	<div class="container">
		<div class="title">{{ get_content($shop_theme_info, "home", "home_saying_title") }}</div>
		<div class="row clearfix">
			<div class="col-md-4">
				<div class="holder">
					<div class="image">
						<img src="{{ get_content($shop_theme_info, "home", "home_saying_image_1") }}">
					</div>
					<div class="desc">"{{ get_content($shop_theme_info, "home", "home_saying_description_1") }}"</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="holder">
					<div class="image">
						<img src="{{ get_content($shop_theme_info, "home", "home_saying_image_2") }}">
					</div>
					<div class="desc">"{{ get_content($shop_theme_info, "home", "home_saying_description_2") }}"</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="holder">
					<div class="image">
						<img src="{{ get_content($shop_theme_info, "home", "home_saying_image_3") }}">
					</div>
					<div class="desc">"{{ get_content($shop_theme_info, "home", "home_saying_description_3") }}"</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="professional">
	<div class="container">
		<div class="title">What Professionals Say</div>
		<div class="says-container">
			@if(is_serialized(get_content($shop_theme_info, "home", "home_professional_maintenance")))
				@if(count(unserialized(get_content($shop_theme_info, "home", "home_professional_maintenance"))) > 0)
					<div>
						<div class="holder">
							<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
							<div class="text match-height">If you really want to learn how to be rich, you must begin to know and understand the power found in networks. The Richest People in the world Build Networks</div>
							<div class="author">
								<table>
									<tbody>
										<tr>
											<td class="author-img">
												<img src="/themes/{{ $shop_theme }}/img/author-1.jpg">
											</td>
											<td class="author-text">
												<div class="name">Robert Kiyosaki</div>
												<div class="did">Best Selling Author of Rich Poor Dad and many other internationally acclaimed titles.</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div>
						<div class="holder">
							<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
							<div class="text match-height">If I lost everything and had to start again, I would find myself a great network marketing company and get to work!</div>
							<div class="author">
								<table>
									<tbody>
										<tr>
											<td class="author-img">
												<img src="/themes/{{ $shop_theme }}/img/author-2.jpg">
											</td>
											<td class="author-text">
												<div class="name">Donald Trump</div>
												<div class="did">Globally renowned property mogul and a multi billionaire.</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div>
						<div class="holder">
							<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
							<div class="text match-height">The Best Investment I ever made… Owns 51 businesses today, 3 of which are Network Marketing Companies.</div>
							<div class="author">
								<table>
									<tbody>
										<tr>
											<td class="author-img">
												<img src="/themes/{{ $shop_theme }}/img/author-3.jpg">
											</td>
											<td class="author-text">
												<div class="name">Warren Buffet</div>
												<div class="did">Billionaire Investor and the richest person</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<div>
						<div class="holder">
							<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
							<div class="text match-height">Your industry promotes core values all around the globe and gives people the chance to make the most of their lives and, to me that is the heart of the American dream.</div>
							<div class="author">
								<table>
									<tbody>
										<tr>
											<td class="author-img">
												<img src="/themes/{{ $shop_theme }}/img/author-4.jpg">
											</td>
											<td class="author-text">
												<div class="name">Bill Clinton</div>
												<div class="did">Former US President</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				@else
					@foreach(unserialized(get_content($shop_theme_info, "home", "home_professional_maintenance")) as $professional)
						<div>
							<div class="holder">
								<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
								<div class="text match-height">{{ $professional["quote"] }}</div>
								<div class="author">
									<table>
										<tbody>
											<tr>
												<td class="author-img">
													<img src="{{ $professional["author_image"] }}">
												</td>
												<td class="author-text">
													<div class="name">{{ $professional["author_name"] }}</div>
													<div class="did">{{ $professional["author_description"] }}</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					@endforeach
				@endif
			@else
				<div>
					<div class="holder">
						<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
						<div class="text match-height">If you really want to learn how to be rich, you must begin to know and understand the power found in networks. The Richest People in the world Build Networks</div>
						<div class="author">
							<table>
								<tbody>
									<tr>
										<td class="author-img">
											<img src="/themes/{{ $shop_theme }}/img/author-1.jpg">
										</td>
										<td class="author-text">
											<div class="name">Robert Kiyosaki</div>
											<div class="did">Best Selling Author of Rich Poor Dad and many other internationally acclaimed titles.</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div>
					<div class="holder">
						<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
						<div class="text match-height">If I lost everything and had to start again, I would find myself a great network marketing company and get to work!</div>
						<div class="author">
							<table>
								<tbody>
									<tr>
										<td class="author-img">
											<img src="/themes/{{ $shop_theme }}/img/author-2.jpg">
										</td>
										<td class="author-text">
											<div class="name">Donald Trump</div>
											<div class="did">Globally renowned property mogul and a multi billionaire.</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div>
					<div class="holder">
						<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
						<div class="text match-height">The Best Investment I ever made… Owns 51 businesses today, 3 of which are Network Marketing Companies.</div>
						<div class="author">
							<table>
								<tbody>
									<tr>
										<td class="author-img">
											<img src="/themes/{{ $shop_theme }}/img/author-3.jpg">
										</td>
										<td class="author-text">
											<div class="name">Warren Buffet</div>
											<div class="did">Billionaire Investor and the richest person</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div>
					<div class="holder">
						<div class="icon"><img src="/themes/{{ $shop_theme }}/img/black-quote.png"></div>
						<div class="text match-height">Your industry promotes core values all around the globe and gives people the chance to make the most of their lives and, to me that is the heart of the American dream.</div>
						<div class="author">
							<table>
								<tbody>
									<tr>
										<td class="author-img">
											<img src="/themes/{{ $shop_theme }}/img/author-4.jpg">
										</td>
										<td class="author-text">
											<div class="name">Bill Clinton</div>
											<div class="did">Former US President</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			@endif
		</div>
	</div>
</div>
<div class="address" style="background-image: url('/themes/{{ $shop_theme }}/img/bottom-bg.jpg')">
	<div class="container">
		<div class="col-md-6 match-height holder">
			<div class="absolute">
				<div class="name">{{ get_content($shop_theme_info, "home", "home_ending_title") }}</div>
				<div class="line"></div>
			</div>
		</div>
		<div class="col-md-6 match-height">
			<div class="logo"><img src="/themes/{{ $shop_theme }}/img/white-logo.png"></div>
			<div class="from">Address: {{ get_content($shop_theme_info, "home", "home_ending_address") }}</div>
			<div class="contact">Tel No. {{ get_content($shop_theme_info, "home", "home_ending_telephone") }}</div>
		</div>
	</div>
</div>
<div class="join">
	<div class="container">
		<div class="holder">
			<div class="row clearfix">
				<div class="col-md-8">
					<div class="text">{{ get_content($shop_theme_info, "home", "home_join_text") }}</div>
				</div>
				<div class="col-md-4 text-center">
					<button class="btn">{{ get_content($shop_theme_info, "home", "home_join_button_text") }}</button>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/home.css">
@endsection

@section("js")
<script type="text/javascript" src="/themes/{{ $shop_theme }}/js/home.js"></script>
@endsection