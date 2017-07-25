@extends('layout')
@section('content')
<div class="top_wrapper   no-transparent">
	<!-- .header -->
	<!-- Page Head -->
	<section id="content" class="composer_content">
		<div id="fws_556c47c7c0707" class="wpb_row animate_onoffset  vc_row-fluid  animate_onoffset row-dynamic-el standard_section" style="padding-top: 0px !important; padding-bottom: 0px !important;">
			<div class="container  dark">
				<div class="section_clear">
					<div class="vc_col-sm-12 wpb_column column_container" style="" data-animation="" data-delay="0">
						<div class="wpb_wrapper">
							<div class="wpb_content_element dynamic_page_header style_2">
								<h1 style="font-size:30px; color:#3a3a3a">{{ get_content($shop_theme_info, "policies", "policies_refund_title") }} :</h1>
							</div>
							<div class="wpb_text_column wpb_content_element ">
								<div class="wpb_wrapper">
									<p style="word-break: keep-all !important; white-space: pre-wrap; color: #191919;">{{ get_content($shop_theme_info, "policies", "policies_refund_description") }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="vc_col-sm-12 wpb_column column_container" style="" data-animation="" data-delay="0">
						<div class="wpb_wrapper">
							<div class="wpb_content_element dynamic_page_header style_2">
								<h1 style="font-size:30px; color:#3a3a3a">{{ get_content($shop_theme_info, "policies", "policies_terms_title") }} :</h1>
							</div>
							<div class="wpb_text_column wpb_content_element ">
								<div class="wpb_wrapper">
									<p style="word-break: keep-all !important; white-space: pre-wrap; color: #191919;">{{ get_content($shop_theme_info, "policies", "policies_terms_description") }}</p>
								</div>
							</div>
						</div>
					</div>
					<div class="vc_col-sm-12 wpb_column column_container" style="" data-animation="" data-delay="0">
						<div class="wpb_wrapper">
							<div class="wpb_content_element dynamic_page_header style_2">
								<h1 style="font-size:30px; color:#3a3a3a">{{ get_content($shop_theme_info, "policies", "policies_shipping_title") }} :</h1>
							</div>
							<div class="wpb_text_column wpb_content_element ">
								<div class="wpb_wrapper">
									<p style="word-break: keep-all !important; white-space: pre-wrap; color: #191919;">{{ get_content($shop_theme_info, "policies", "policies_shipping_description") }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!-- Social Profiles -->
<!-- Footer -->
</div>
@endsection