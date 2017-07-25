@extends('layout')
@section('content')
<div class="container-fluid">
	<table class="wrap">
		<tbody>
			<tr>
				<td class="main">
					<?php $posts = get_post($shop_id, "blog_post"); ?>
					@foreach($posts as $post)
					<div class="holder">
						<div class="row clearfix">
							<div class="col-md-4">
								<img class="left-img" src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog.jpg">
							</div>
							<div class="col-md-8">
								<div class="cat">UX DESIGN</div>
								<div class="title"><a href="/blog/content">12 UX rules every designer should know</a></div>
								<div class="desc">“User experience” is a broad term that gets bandied around at meetings and swapped with “user interface” as if the two are the same—they’re not. This confusion has probably affected your career as UX and web design roles have slowly started to overlap. Even your clients may be confused as to what exactly your job...</div>
							</div>	
						</div>
					</div>
					@endforeach
					<!-- <div class="holder">
						<div class="row clearfix">
							<div class="col-md-4">
								<img class="left-img" src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog.jpg">
							</div>
							<div class="col-md-8">
								<div class="cat">UX DESIGN</div>
								<div class="title"><a href="/blog/content">12 UX rules every designer should know</a></div>
								<div class="desc">“User experience” is a broad term that gets bandied around at meetings and swapped with “user interface” as if the two are the same—they’re not. This confusion has probably affected your career as UX and web design roles have slowly started to overlap. Even your clients may be confused as to what exactly your job...</div>
							</div>	
						</div>
					</div>
					<div class="holder">
						<div class="row clearfix">
							<div class="col-md-4">
								<img class="left-img" src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog.jpg">
							</div>
							<div class="col-md-8">
								<div class="cat">UX DESIGN</div>
								<div class="title"><a href="/blog/content">12 UX rules every designer should know</a></div>
								<div class="desc">“User experience” is a broad term that gets bandied around at meetings and swapped with “user interface” as if the two are the same—they’re not. This confusion has probably affected your career as UX and web design roles have slowly started to overlap. Even your clients may be confused as to what exactly your job...</div>
							</div>	
						</div>
					</div>
					<div class="holder">
						<div class="row clearfix">
							<div class="col-md-4">
								<img class="left-img" src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog.jpg">
							</div>
							<div class="col-md-8">
								<div class="cat">UX DESIGN</div>
								<div class="title"><a href="/blog/content">12 UX rules every designer should know</a></div>
								<div class="desc">“User experience” is a broad term that gets bandied around at meetings and swapped with “user interface” as if the two are the same—they’re not. This confusion has probably affected your career as UX and web design roles have slowly started to overlap. Even your clients may be confused as to what exactly your job...</div>
							</div>	
						</div>
					</div>
					<div class="holder">
						<div class="row clearfix">
							<div class="col-md-4">
								<img class="left-img" src="/themes/{{ $shop_theme }}/resources/assets/frontend/img/blog.jpg">
							</div>
							<div class="col-md-8">
								<div class="cat">UX DESIGN</div>
								<div class="title"><a href="/blog/content">12 UX rules every designer should know</a></div>
								<div class="desc">“User experience” is a broad term that gets bandied around at meetings and swapped with “user interface” as if the two are the same—they’re not. This confusion has probably affected your career as UX and web design roles have slowly started to overlap. Even your clients may be confused as to what exactly your job...</div>
							</div>	
						</div>
					</div> -->
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
@endsection
@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/blog.css">
@endsection
