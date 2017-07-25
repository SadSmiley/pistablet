@extends('layout')
@section('content')
<div class="blog-content">
	<div class="container-fluid">
		<div class="intro">
			<img src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog.jpg">
			<div class="text-wrap">
				<div class="text">
					<div class="category">
						<a class="text" href="javascript:">RESOURCES</a>
					</div>
					<div class="title">Samsung expands entry-level VR browsing</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<table class="wrap">
			<tbody>
				<tr>
					<td class="main">
						<div class="content-message">Those not completely familiar with Samsung’s Galaxy S7 smartphones may not have heard about Gear VR, the company’s mobile virtual reality headset. Users wearing the Gear VR get to utilize their phone as their display and processor, but the Gear VR unit is the controller.
Different iterations of the headset have been released to good reviews, so users will be excited to know that the latest release of the Oculus-powered app that controls the experience comes with an improved browsing experience.
According to a news release on Samsung’s Newsroom, version 4.2 helps users get greater control and a more immersive experience.

All this is centered on one of the biggest improvements in the browser, which is support for WebVR 1.0. This is the premier iteration of the VR web browser standard that’s been developed by Mozilla and Google. As far as users are concerned, they’ll experience this improvement by now being able to look at 3D images and streaming VR content more easily on the device.
Another big change is the ability to alter the background of their VR environment, courtesy of the aptly named Change Background feature. High-quality images are provided in-app, so users just have to make the selection for the background they desire. Thanks to VR tech, these vivid scenes infuse more depth than ever to a user’s browsing experience, which has the effect of bringing them to an environment that’s realistic enough to stimulate the interest for exploration.
The end result of this update is a far richer browsing experience. When you include the Skybox feature, which was added to Gear VR in an earlier update, users get to enjoy a truly immersive way of browsing.
One last feature should also have a positive impact on users’ browsing habits.

The File Explorer feature gives users the chance to both seamlessly browse and view videos and pictures on their mobile devices or USB storage, thanks to the USB OTG (on the go) support tool.
All of these updates should be considered in conjunction with other, powerful Gear VR features like:

• Voice-recognition support
• An on-screen keyboard that includes 11 languages (among them English, Korean and French)
• Bluetooth-device integration (mouse, keyboard, gamepad)

Together, version 4.2 now offers users a very comprehensive, immersive experience to explore and browse the most interesting content on the Internet.

What has always made Gear VR stand out is how it allows users to experience the web as if they were watching a movie in a theater. The big, virtual screen—now made richer with these improvements—is a key component of this experience.
</div>
					</td>
					<td class="side">
						<div class="side-header">POPULAR POSTS</div>
						<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog-small.jpg');">
							<div class="info">12 UX rules every designer should know</div>
						</div>
						<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog-small.jpg');">
							<div class="info">7 key attributes of a quality UI</div>
						</div>
						<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog-small.jpg');">
							<div class="info">12 UX rules every designer should know</div>
						</div>
						<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog-small.jpg');">
							<div class="info">7 key attributes of a quality UI</div>
						</div>
						<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog-small.jpg');">
							<div class="info">12 UX rules every designer should know</div>
						</div>
						<div class="holder" style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog-small.jpg');">
							<div class="info">7 key attributes of a quality UI</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/blog.css">
@endsection
