 @section('content')
 @extends('layout')
 <div class="career">
 	<div class="career-header">
 		<div class="title"><span>{{ get_content($shop_theme_info, "career", "career_title") }}</span></br>{{ get_content($shop_theme_info, "career", "career_subtitle") }}</div>
 		<button>{{ get_content($shop_theme_info, "career", "career_join_text") }}</button>
 		<div class="dots"></div>
 		<div class="text">
 			{{ get_content($shop_theme_info, "career", "career_description") }}
		</div>
 	</div>
 	<div class="career-job">
 		<div class="title">JOB LISTING</div>
 		<div class="container">
	 		<div class="containers">
				<div class="img"><img src="{{ get_content($shop_theme_info, "career", "career_intro_image") }}"></div>
				<div class="text">
					<div class="title">Sales Assistant Frontliner</div>
					<div class="description">{{ get_content($shop_theme_info, "career", "career_intro_description") }}</div>
				</div>
	 		</div>
 		</div>
 	</div>

 	<div class="joblist">
 		<div class="job-title">Job List</div>
 		<div class="job-content container">
 			@if(is_serialized(get_content($shop_theme_info, "career", "career_job_list")))
	 			@foreach(unserialize(get_content($shop_theme_info, "career", "career_job_list")) as $key => $job_list)
	 			<div class="holder col-md-4">
	 				<div class="border">
		 				<div class="title">{{ $job_list["title"] }}</div>
		 				<div class="line"></div>
		 				{!! $job_list["description"] !!}
	 				</div>
	 			</div>
	 			@endforeach
 			@endif
 			<div class="quote">{{ get_content($shop_theme_info, "career", "career_job_quote") }}</div>
 		</div>
 	</div>
	 <form id="career-form" method="POST" enctype="multipart/form-data">
	          <input type="hidden" name="_token" value="{{{ csrf_token() }}}" /> 
		 	<div class="career-apply">
		 		<div class="title">Apply Now</div>
		 		<div class="container">
		 			<div class="field">
		 				<div class="col-md-6">
		 					<input type="text" class="form-control" placeholder="Your Email" name='mail' value="{{Request::old('mail')}}"> 
		 				</div>
		 				<div class="col-md-6">
		 					<input type="text" class="form-control" placeholder="Contact Number" name='number' value="{{Request::old('number')}}"> 
		 				</div>
		 			</div>
		 			<div class="field">
		 				<div class="col-md-6">
		 					<input type="text" class="form-control" placeholder="Your Name" name="name" value="{{Request::old('name')}}"> 
		 				</div>
		 				<div class="col-md-6">
		 					<input type="text" class="form-control" placeholder="Desire Position" name='position' value="{{Request::old('position')}}"> 
		 				</div>
		 			</div>
		 			<div class="field">
		 				<div class="col-md-6">
		 					<textarea class="form-control" placeholder="Your Message" name='message'></textarea>
		 				</div>
		 				<div class="col-md-6">
		 					<div class="upload"><span>Attach Your File Here</span><input type="file" class="form-control" name='file' value=""></div> 
		 				</div>
		 				<div class="col-md-6">
		 					<button type="submit" name="submit">Submit</button>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
	  </form>
	 </div>




@if($errors->all())
	<div class="reservemessage remodal" data-remodal-id="reserve">
		<div class="reserve">
			<div class="logo"><img style="height: 50px;" src="/resources/assets/frontend/img/intogadgets-logo.png"></div>
			<div class="text">
				<ul>
					@foreach($errors->all() as $error)
						<li>{{$error}}</li>
					@endforeach
				</ul>
			</div>

		</div>
	</div>
@endif
 @endsection
 @section('script')
     <script type="text/javascript" src="resources/assets/frontend/js/career.js"></script>
 @endsection





@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/career.css">
@endsection