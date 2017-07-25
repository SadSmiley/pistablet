@extends('account_layout')
@section('account_content')
<div class="profile-container col-md-12">            
	<div class="profile">
		<div class="detail col-md-12">
			<div class="info col-md-12">
				<div class="row clearfix">
					<div class="image col-md-4">
						<img src="{{ $customer->profile ? $customer->profile : '/assets/front/img/avatar.png' }}">
					</div>
					<div class="info-holder col-md-8">
						@if($customer->middle_name)
							<div class="name">{{ $customer->first_name }} {{ $customer->last_name }}</div>
						@else
							<div class="name">{{ $customer->first_name }} {{ $customer->middle_name }} {{ $customer->last_name }}</div>
						@endif
						<div class="email">{{ $customer->email }}</div>
					</div>
				</div>
			</div>
			<div class="clear edit col-md-4"><a href="/account/settings"><i class="fa fa-edit"></i> Edit Profile</a></div>
		</div>
		<div class="counts col-md-12 nopadding">
			<div class="box col-md-12 nopadding">
				<div class="num">
					<div class="num-holder">
						<div class="num-text">{{ $order_count }}</div>
					</div>
				</div>
				<div class="labels">
					<i class="fa fa-shopping-cart"></i>
					<div class="labels-text">Orders</div>
				</div>
			</div>
			{{-- <div class="box col-md-4 nopadding">
				<div class="num">
					<div class="num-holder">
						<div class="num-text">0</div>
					</div>
				</div>
				<div class="labels">
					<i class="fa fa-comment"></i>
					<div class="labels-text">Comments</div>
				</div>
			</div>
			<div class="box col-md-4 nopadding">
				<div class="num">
					<div class="num-holder">
						<div class="num-text">0</div>
					</div>
				</div>
				<div class="labels"><i class="fa fa-tag"></i>
					<div class="labels-text">Coupons</div>
				</div>
			</div> --}}
		</div>
	</div>

	<div class="profile-information">
	<div class="header"><span>Account</span> Information</div>
		@if($customer["b_day"] != "0000-00-00")
		<div class="info">
			<div class="labels">Birthday</div>
			<div class="value">{{ date( "F d, Y", strtotime($customer["b_day"]) ) }}</div>
		</div>
		@endif
		{{-- <div class="info">
			<div class="labels">Gender</div>
			<div class="value"></div>
		</div> --}}
		<div class="info">
			<div class="labels">Contact Number</div>
			<div class="value">{{ $customer->customer_mobile }}</div>
		</div>
		<div class="info">
			<div class="labels">Default Address</div>
			<div class="value">{{ $customer->customer_street }}</div>
		</div>
	</div>
	<div class="profile-information text-center">
	<div class="header text-left">
		<span>
			Recently Viewed
		</span> 
		Products
	</div>
	@if(count($recently_viewed) > 0)
		@foreach($recently_viewed as $viewed)
			<a href="/product/view/{{ $viewed->product['eprod_id'] }}">
				<div class="img-holder-holder">
					<div class="img-holder">
						<img src="{{ get_product_first_image($viewed->product) }}">
					</div>
					<div class="img-text">
						{{ get_product_first_name($viewed->product) }}
					</div>
				</div>
			</a>
		@endforeach
	@else
		<p>No recently viewed products</p>
	@endif
	</div>
</div>
@endsection

@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/profile.css">
@endsection