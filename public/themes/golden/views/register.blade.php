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
                    <a class="hiddenanchor" id="toregister"></a>
                    <a class="hiddenanchor" id="tologin"></a>

                    <div id="wrapper">
                        <div id="login" class="animate form">
                            <form method="post" autocomplete="on"> 
                            <input type="hidden" class="token" name="_token" value="{{ csrf_token() }}">
                                <div class="lol-title"><span>Members</span> Register</div>
                                <p> 
                                    <input id="username" name="user" required="required" type="text" placeholder="Your Username"/>
                                </p>
                                <p> 
                                    <input id="username" name="user" required="required" type="email" placeholder="Your Email"/>
                                </p>
                                <p> 
                                    <input id="password" name="pass" required="required" type="password" placeholder="Password" /> 
                                </p>
                                <p> 
                                    <input id="password" name="pass" required="required" type="password" placeholder="Confirm Password" /> 
                                </p>
                                <p class="login button"> 
                                    <input type="submit" value="Sign Up" /> 
                                </p>
                                <div class="divider-holder" style="margin-bottom: 15px;">
                                    <div class="divider"></div>
                                    <span>Already have an account?</span>
                                </div>
                                <p class="register button"> 
                                    <input type="button" value="Login an Account" onClick="location.href='/mlm/login'" /> 
                                </p>
                            </form>
                        </div>
                    </div>
                </div>  
            </section>
        </div>
    </body>
</html>