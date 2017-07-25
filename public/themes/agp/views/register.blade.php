@extends("layout")
@section("content")
<!-- CONTENT -->
<div class="container">
    <div class="row clearfix">
        <div class="featured-container signup">
            
                <a href="/mlm/login"><button class="signup-login-button-login">Login</button></a>
                <a href="/mlm/register"><button class="signup-login-button-signup">Sign up</button></a>
            

            
            
            <div class="row clearfix">
                <div class="col-md-12 signup-form-content">
                        <div class="col-md-6">
                            <div class="input-name">Full Name</div>
                            <input type="text" class="form-control">

                            
                            <div class="input-name">Birthday</div>
                            <div class="row clearfix">
                                <div class="col-md-6 month">
                                    <select name="month">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="col-md-2 day">
                                    <select name="day">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="col-md-4 year">
                                    <select name="year">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            
                            
                            <div class="row clearfix">
                                <div class="col-md-6 gender-contact gender-input-margin">
                                    <div class="input-name gender-input">Gender</div>
                                    <select name="gender">
                                        <option></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>


                                <div class="col-md-6 gender-contact contact-input-margin">
                                    <div class="input-name contact-input">Contact Number</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>

                            <div class="input-name">Email Address</div>
                            <input type="text" class="form-control">

                            <div class="note">We will send messages to the email above. Please ensure the email address is accessible and up-to-date.</div>
                        </div>
                        <div class="col-md-6">
                            <div class="input-name">Province</div>
                            <select>
                                <option></option>
                            </select>
                            <div class="input-name">City/Municipality</div>
                            <select>
                                <option></option>
                            </select>
                            <div class="input-name">Barangay</div>
                            <select>
                                <option></option>
                            </select>
                            <div class="input-name">Password</div>
                            <input type="text" class="form-control">
                            <div class="input-name">Re-type Password</div>
                            <input type="text" class="form-control">

                            <button id="create-account-button">CREATE ACCOUNT</button>
                        </div>
                </div>
            </div>

            
            
        </div>
    </div>
</div>
    
@endsection

@section("css")
<link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/css/login.css">
@endsection

