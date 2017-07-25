<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6 lt8"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7 lt8"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8 lt8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="UTF-8" />
        <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">  -->
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta name="description" content="Login and Registration Form with HTML5 and CSS3" />
        <meta name="keywords" content="html5, css3, form, switch, animation, :target, pseudo-class" />
        <meta name="author" content="Codrops" />
        <link rel="shortcut icon" href="../favicon.ico"> 
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/login/css/demo.css" />
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/login/css/style2.css" />
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/login/css/animate-custom.css" />
        <!-- CUSTOM CSS -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/new_front/css/login.css">
        <!-- THEME COLOR -->
        <link href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/{{ $shop_theme_color }}.css" rel="stylesheet" type="text/css">
    </head>
    <body style="background-image: url('/themes/{{ $shop_theme }}/resources/assets/new_front/img/login-bg.jpg')">
        <div class="container">
            <header>
                <nav class="codrops-demos" style="text-align: center;">
                    <!-- <img src="/themes/{{ $shop_theme }}/resources/assets/new_front/img/big-logo.png" style="max-width: 180px;"> -->
                </nav>
            </header>
            <section>               
                <div id="container_demo" >
                    <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>

                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form method="post" autocomplete="on"> 
                            <input type="hidden" class="token" name="_token" value="{{ csrf_token() }}">
                                <!-- <h1><span>Members</span> Login</h1>  -->
                                <div class="lol-title"><span>Members</span> Login</div>
                                <p> 
                                    <!-- <label for="username" class="uname" data-icon="u" > Your email or username </label> -->
                                    <input id="username" name="user" required="required" type="text" placeholder="Username"/>
                                </p>
                                <p> 
                                    <!-- <label for="password" class="youpasswd" data-icon="p"> Your password </label> -->
                                    <input id="password" name="pass" required="required" type="password" placeholder="Password" /> 
                                </p>
                                <!-- <p class="keeplogin"> 
                                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
                                    <label for="loginkeeping">Keep me logged in</label>
                                </p> -->
                                <p class="login button"> 
                                    <input type="button" value="Login" onClick="location.href='/mlm'"> 
                                </p>
                                <div class="divider-holder" style="margin-bottom: 15px;">
                                    <div class="divider"></div>
                                    <span>Don't have an account yet?</span>
                                </div>
                                <!--<p class="change_link">-->
                                <!--    Not a member yet ?-->
                                <!--    <a href="#toregister" class="to_register">Join us</a>-->
                                <!--</p>-->
                                <p class="register button"> 
                                    <input type="button" value="Create an Account" onClick="location.href='/mlm/register'" /> 
                                </p>
                            </form>
                        </div>

                        <!-- <div id="register" class="animate form">
                            <form  action="" autocomplete="on"> 
                                <h1> Sign up </h1> 
                                <p> 
                                    <label for="usernamesignup" class="uname" data-icon="u">Your username</label>
                                    <input id="usernamesignup" name="usernamesignup" required="required" type="text" placeholder="mysuperusername690" />
                                </p>
                                <p> 
                                    <label for="emailsignup" class="youmail" data-icon="e" > Your email</label>
                                    <input id="emailsignup" name="emailsignup" required="required" type="email" placeholder="mysupermail@mail.com"/> 
                                </p>
                                <p> 
                                    <label for="passwordsignup" class="youpasswd" data-icon="p">Your password </label>
                                    <input id="passwordsignup" name="passwordsignup" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p> 
                                    <label for="passwordsignup_confirm" class="youpasswd" data-icon="p">Please confirm your password </label>
                                    <input id="passwordsignup_confirm" name="passwordsignup_confirm" required="required" type="password" placeholder="eg. X8df!90EO"/>
                                </p>
                                <p class="signin button"> 
                                    <input type="submit" value="Sign up"/> 
                                </p>
                                <p class="change_link">  
                                    Already a member ?
                                    <a href="#tologin" class="to_register"> Go and log in </a>
                                </p>
                            </form>
                        </div> -->
                        
                    </div>
                </div>  
            </section>
        </div>
    </body>
</html>


<!-- <form method="POST">
    <input type="hidden" class="token" name="_token" value="{{ csrf_token() }}">
    <div class="bg">
        <div class="wrapper">
            <div class="content para">
                <div class="logo">
                    <img src="/resources/assets/frontend/img/logo.png">
                </div>
                @if(Session::has('errored'))
                    <div class="alert alert-danger">
                        <ul>
                            {{ $error }}
                        </ul>
                    </div>
                 @endif
                 @if(Session::has('greened'))
                    <div class="alert alert-success">
                        <ul>
                            {{ $success }}
                        </ul>
                    </div>
                 @endif
                <div style="font-size: 14px; text-align: left;">Username</div>
                <div class="input">
                    <input type="text" name="user">
                </div>
                <div style="font-size: 14px; text-align: left;">Password</div>
                <div class="input">
                    <input type="password" name="pass">
                </div>
                <div class="forgot"><a href="javascript:">Forgot Password?</a></div>
                <a href="javascript:">
                    <button style="background-color: #F1CB40;" type="submit" name="login" style="margin-top: 20px;">LOGIN</button>
                </a>
                <a href="/">
                    <button type="button" style="margin-top: 5px; background-color: #F1CB40;">GO BACK</button>
                </a>
                <div class="create">
                    <a href="register" style="color: #056EFC;">New here? Create an account.</a>
                </div>
            </div>
        </div>
    </div>
</form> -->