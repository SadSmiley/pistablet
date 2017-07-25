@extends("layout")
@section("content")
<!-- CONTENT -->
<div class="container">
    <div class="row clearfix">
        
        <div class="featured-container login">
            <div class="buttons">
                <a href="/mlm/login"><button class="signup-login-button-login">Login</button></a>
                <a href="/mlm/register"><button class="signup-login-button-signup">Sign up</button></a>
            </div>

            <div class="row clearfix">
                <div class="login-form-content">
                    
                        <input type="text" class="form-control username-input" placeholder="Username" style="font-size: 13px; font-weight: 600;">
                        <input type="text" class="form-control password-input" placeholder="Password" style="font-size: 13px; font-weight: 600;">

                        <button id="login-button">LOGIN</button>
                    
                </div>
            </div>
            
        </div>
    </div>
</div>
    
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/login.css">
@endsection

