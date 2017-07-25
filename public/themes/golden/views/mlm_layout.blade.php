<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 lt-ie10"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 lt-ie10"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9 lt-ie10"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lt-ie10"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js"> <!--<![endif]-->
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
    <head>
        <?php
            header("cache-Control: no-store, no-cache, must-revalidate");
            header("cache-Control: post-check=0, pre-check=0", false);
            header("Pragma: no-cache");
            header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
        ?>
        <base href="<?php echo "http://" . $_SERVER["SERVER_NAME"] ?>">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>Company Member</title>
        <meta name="description" content="Page Description">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/92bc1fe4.bootstrap.css">
        <link media="screen" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/vendor/jquery.pnotify.default.css" rel="stylesheet">

        <!-- Page-specific Plugin CSS: -->
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/vendor/select2/select2.css">
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/vendor/uniformjs/css/uniform.default.css">

        <!-- Remodal -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/remodal/src/remodal-default-theme.css">
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/remodal/src/jquery.remodal.css">

        <!-- Voucher -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/distributor/css/voucher.css">
        <!-- Proton CSS: -->
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/aaf5c053.proton.css">
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/vendor/animate.css">
        <!-- <link rel="icon" type="image/png" href="/resources/assets/frontend/img/logo.png"> -->
        <link href="/themes/{{ $shop_theme }}/assets/front/img/new_front/img/logo.png" rel="icon" sizes="192x192">
        <!-- adds CSS media query support to IE8   -->
        <!--[if lt IE 9]>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.2/html5shiv.js"></script>
        <script src="/resources/assets/distributor/scripts/vendor/respond.min.js"></script>
        <![endif]-->
        <link href="/themes/{{ $shop_theme }}/flag-icon-css-master/assets/docs.css?version=2" rel="stylesheet">
        <link href="/themes/{{ $shop_theme }}/flag-icon-css-master/css/flag-icon.css" rel="stylesheet">
        <!-- Fonts CSS: -->
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/6227bbe5.font-awesome.css" type="text/css" />
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/resources/assets/distributor/styles/40ff7bd7.font-titillium.css" type="text/css" />
        <!-- GLOBAL CSS -->
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/assets/new_front/css/distributor.css">
        
        <script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/external/jquery.min.js"></script>
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/modernizr.js"></script>
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/jquery.cookie.js"></script>

        @yield('css')
    </head>

    <body  >

        <script>
            var theme = $.cookie('protonTheme') || 'default';
            $('body').removeClass (function (index, css) {
                    return (css.match (/\btheme-\S+/g) || []).join(' ');
            });
            if (theme !== 'default') $('body').addClass(theme);
        </script>
        <!--[if lt IE 8]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

      <nav class="main-menu" data-step='2' data-intro='This is the extendable Main Navigation Menu.' data-position='right'>
            <ul>
                <li>
                    <a href="/mlm">
                        <i class="icon-home nav-icon"></i>
                        <span class="nav-text">Dashboard</span>
                    </a>
                </li>
                <li class="has-subnav">
                    <a href="javascript:">
                        <i class="icon-sitemap nav-icon"></i>
                        <span class="nav-text">Genealogy</span>
                        <i class="icon-angle-right"></i>
                    </a>
                    <ul>
                        <li>
                            <a  href="/mlm/genealogy" class="subnav-text">
                                By Placement
                            </a> 
                        </li>
                    </ul>
                </li>
                <!--<li>-->
                <!--    <a href="/mlm/product">-->
                <!--        <i class="icon-shopping-cart nav-icon"></i>-->
                <!--        <span class="nav-text">Products</span>-->
                <!--    </a>-->
                <!--</li> -->


                <li>
                    <a href="/mlm/vouchers">
                        <i class="icon-barcode nav-icon"></i>
                        <span class="nav-text">Vouchers</span>
                    </a>
                </li> 
                <li>
                    <a href="/mlm/cheque">
                        <i class="icon-usd nav-icon"></i>
                        <span class="nav-text">Pay Cheque</span>
                    </a>
                </li> 
                <li>
                    <a href="/mlm/transfer">
                        <i class="icon-link nav-icon"></i>
                        <span class="nav-text">Transfer Wallet</span>
                </li>
                <li class="has-subnav">
                    <a href="javascript:">
                        <i class="icon-list nav-icon"></i>
                        <span class="nav-text">Report</span>
                        <i class="icon-angle-right"></i>
                    </a>
                    <ul>
                        <li>
                            <a href="/mlm/report/direct" class="subnav-text">
                                Direct Referrals
                            </a> 
                        </li>
                        <li>
                            <a href="/mlm/report/indirect" class="subnav-text">
                                Indirect Referrals
                            </a> 
                        </li>
                    </ul>
                </li>                  
            </ul>
            <ul class="logout">
                <li>
                    <a href="/member/logout">
                        <i class="icon-off nav-icon"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
        <section class="wrapper user-profile extended scrollable">
            <nav class="user-menu">
                <a href="javascript:;" class="main-menu-access">
                    <i class="icon-proton-logo"></i>
                    <i class="icon-reorder"></i>
                </a>
                <!--
                <section class="user-menu-wrapper">     
                    <a href="javascript:;" data-expand=".notifications-view" class="notifications-access unread"><i class="icon-comment-alt"></i><div class="menu-counter">6</div></a>
                </section>
                -->

                <div class="panel panel-default nav-view notifications-view">
                    <div class="arrow user-menu-arrow"></div>
                    <div class="panel-heading">
                        <i class="icon-comment-alt"></i>
                        <span>Notifications</span>
                        <a href="javascript:;" class="close-user-menu"><i class="icon-remove"></i></a>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item">
                            <i><img src="/resources/assets/distributor/images/user-icons/user1.jpg" alt="User Icon"></i>
                            <div class="text-holder">
                                <span class="title-text">
                                    Nunc Cenenatis
                                </span>
                                <span class="description-text">
                                    likes your website.
                                </span>
                            </div>
                            <span class="time-ago">
                                32 mins ago
                            </span>
                        </li>
                        <li class="list-group-item">
                            <i><img src="/resources/assets/distributor/images/user-icons/user2.jpg" alt="User Icon"></i>
                            <div class="text-holder">
                                <span class="title-text">
                                    Flor Demoa
                                </span>
                                <span class="description-text">
                                    wrote a new post.
                                </span>
                            </div>
                            <span class="time-ago">
                                3 hrs ago
                            </span>
                        </li>
                        <li class="list-group-item">
                            <i><img src="/resources/assets/distributor/images/user-icons/user4.jpg" alt="User Icon"></i>
                            <div class="text-holder">
                                <span class="title-text">
                                    Nunc Neque
                                </span>
                                <span class="description-text">
                                    wrote a new post.
                                </span>
                            </div>
                            <span class="time-ago">
                                57 mins ago
                            </span>
                        </li>
                        <li class="list-group-item">
                            <i><img src="/resources/assets/distributor/images/user-icons/user2.jpg" alt="User Icon"></i>
                            <div class="text-holder">
                                <span class="title-text">
                                    Flor Demoa
                                </span>
                                <span class="description-text">
                                    submitted a new ticket.
                                </span>
                            </div>
                            <span class="time-ago">
                                1.5 hrs ago
                            </span>
                        </li>
                        <li class="list-group-item">
                            <i><img src="/resources/assets/distributor/images/user-icons/user1.jpg" alt="User Icon"></i>
                            <div class="text-holder">
                                <span class="title-text">
                                    Nunc Cenenatis
                                </span>
                                <span class="description-text">
                                    wrote a new post.
                                </span>
                            </div>
                            <span class="time-ago">
                                3 hrs ago
                            </span>
                        </li>
                    </ul>
                </div>
            </nav> 
            
            <ol class="breadcrumb breadcrumb-nav">
                <li><a href="javascript:"><i class="icon-pushpin"></i></a></li>
                <li class="active">
                    <a href="javascript:" data-toggle="dropdown" style="color: #000 !important">
                        {{$customer_info->title_name}} {{$customer_info->first_name}} {{$customer_info->middle_name}} {{$customer_info->last_name}} {{$customer_info->suffix_name}}</span></b> |
                        <b>
                            @if(isset($slotnow->slot_id))<span class="text-info">Slot No. {{ $slotnow->slot_id }}</span>
                            @else <span class="text-info">No Slot</span>
                            @endif
                        </b>
                    </a>
                    <ul role="menu" class="dropdown-menu dropdown-menu-arrow">
                    	@if(isset($slot))
	                        @if($slot)                                                    
	                            @foreach($slot as $slots)
	                                   <li><a class="forslotchanging" slotid='{{$slots->slot_id}}' href="/distributor/slot/changeslot?changeslot={{ Crypt::encrypt($slots->slot_id) }}">SLOT #{{$slots->slot_id}} <span></a></li> 
	                            @endforeach
	                        @endif   
                        @endif
                    </ul>       
                </li>
            </ol>
            <!-- /view/world/currency -->
            <?php $a = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("USDEUR", "USDJPY", "USDBGN", "USDCZK", "USDDKK", "USDGBP", "USDHUF", "USDLTL", "USDLVL", "USDPLN", "USDRON", "USDSEK", "USDCHF", "USDNOK", "USDHRK", "USDRUB", "USDTRY", "USDAUD", "USDBRL", "USDCAD", "USDCNY", "USDHKD", "USDIDR", "USDILS", "USDINR", "USDKRW", "USDMXN", "USDMYR", "USDNZD", "USDPHP", "USDSGD", "USDTHB", "USDZAR", "USDISK")&env=store://datatables.org/alltableswithkeys' ?>
            <div class="col-md-12 echange-rate"></div>
            <!-- <div class="col-md-12"> <button class="btn btn-primary" onClick="getajaxtomodal('/view/world/currency', 'World Currency Profiles')">World Currency Profiles</button><hr /></div> -->
             @yield('content')

             <div id="luke"></div>
            <div class="row">
                <!-- Word Counter -->
                <!-- http://bavotasan.com/2011/simple-textarea-word-counter-jquery-plugin/ -->
                <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/jquery.textareaCounter.js"></script>
            </div>
        </section>
        
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/e1d08589.bootstrap.min.js"></script>
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/9f7a46ed.proton.js"></script>
        

        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/jquery.jstree.js"></script>

        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/raphael-min.js"></script>
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/morris.min.js"></script>
        
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/jquery.textareaCounter.js"></script>
        
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/fileinput.js"></script>       

        <!-- View Voucher -->
        <script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/distributor/js/voucher.js"></script>
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/members/css/voucher.css">
        <script type="text/javascript" src="/themes/{{ $shop_theme }}/resources/assets/remodal/src/jquery.remodal.js"></script>
        <div id="luke"></div>
        <script type="text/javascript" src="/themes/{{ $shop_theme }}/luke/toaster/toastr.min.js"></script>
        <script type="text/javascript" src="/themes/{{ $shop_theme }}/luke/luke.js"></script>
        <!-- ADDITIONALS -->
        <?php echo (isset($script) ? $script : ""); ?>
        <?php if(Session::get("notification")): ?>
        <?php $notification = Session::get("notification"); ?>
        <script src="/themes/{{ $shop_theme }}/resources/assets/distributor/scripts/vendor/jquery.pnotify.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function()
            {
                    $.pnotify(
                    {
                            title: "<?php echo $notification["title"]; ?>",
                            text: "<?php echo $notification["message"]; ?>",
                            history: false,
                            delay: '10000'
                    });
                    
            })

        </script>
        <?php endif; ?>
        <script type="text/javascript">
                $.ajax({
                        url     :   '/view/world/currency',
                        type    :   'get',
                        // dataType: "text",
                        success :   function(result){
                            $('.echange-rate').html(result);
                            console.log(result);
                        },
                        error   :   function(err){
                            
                        }
                    });
        </script>
        <script type="text/javascript" src="/themes/{{ $shop_theme }}/assets/external_plugins/jquery/jquery.numeric.js"></script> 
        <script type="text/javascript">
        $(".number-only").numeric();
        </script>  
            @yield('js')                            
    </body>
</html>