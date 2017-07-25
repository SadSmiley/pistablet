@extends("layout")
@section("content")

<!-- TOP CONTENT -->
	<div class="container top-content">

		<div class="col-md-6 top-content-image">
			<img src="/themes/{{ $shop_theme }}/img/about-content-image.jpg">
		</div>

		<div class="row">
			<div class="col-md-6">
				<div class="top-title">
					<div class="col-md-12">
						<div class="welcome">Welcome to</div><div class="shopshoshop">Shopshoshop.com</div>
					</div>
				</div>
				<div class="paragraph">		
					<div class="paragraph1">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
					</div>
					<div class="paragraph2">
						Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue.
					</div>	
				</div>
			</div>
		</div>

	</div>




<!-- BOTTOM CONTENT -->
	<div class="container bottom-content">
		
				<div class="row">
					<div class="bottom-image"><img src="/themes/{{ $shop_theme }}/img/about-bottom-image1.jpg"></div>

					<div class="title">
						<div class="our">Our</div>
						<div class="mission">Mission</div>
					</div>

					<div class="bottom-par">	
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
					</div>

					<div class="bottom-image"><img src="/themes/{{ $shop_theme }}/img/about-bottom-image2.jpg"></div>

					<div class="title">
						<div class="our">Our</div> 
						<div class="vision">Vision</div>
					</div>

					<div class="bottom-par bottom-par-two">	
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
					</div>
				</div>
			
		
	</div>
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/aboutus.css">
@endsection
