@extends('layout')
@section('content')
<div class="wrapper-bg">
	<div class="account">
		<div class="col-md-4">
			<div class="sidebar">
				<div class="title">My Account</div>
				<div class="nav">
					<a href="/account" class="navigation {{ Request::segment(2) == '' ? 'active' : '' }}"> <div class="side-left"><i class="fa fa-user"></i> My Profile</div><div class="side-right">&raquo;</div></a>
					<a href="/account/order" class="navigation {{ Request::segment(2) == 'order' ? 'active' : '' }}"> <div class="side-left"><i class="fa fa-shopping-cart"></i> My Orders</div><div class="side-right">&raquo;</div></a>
					<a href="/account/wishlist" class="navigation {{ Request::segment(2) == 'wishlist' ? 'active' : '' }}"> <div class="side-left"><i class="fa fa-star"></i> My Wishlist</div><div class="side-right">&raquo;</div></a>
					<a href="/account/settings" class="navigation {{ Request::segment(2) == 'settings' ? 'active' : '' }}"> <div class="side-left"><i class="fa fa-cog"></i> Account Settings</div><div class="side-right">&raquo;</div></a>
					<a href="/account/security" class="navigation {{ Request::segment(2) == 'security' ? 'active' : '' }}"> <div class="side-left"><i class="fa fa-lock"></i> Change Password</div><div class="side-right">&raquo;</div></a>
				</div>
				<div class="ads"></div>
			</div>
		</div>
		<div class="col-md-8">
			<div class="main-content">
				@yield('account_content')
			</div>
		</div>
	</div>
</div>
@endsection