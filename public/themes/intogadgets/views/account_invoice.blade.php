<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>{{ ucfirst($shop_info->shop_key) }} |  {{ isset($page) ? $page : 'Home' }}</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <!-- GOOGLE FONT -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/assets/initializr/css/bootstrap.min.css">
        <link rel="stylesheet" href="/themes/{{ $shop_theme }}/assets/initializr/css/bootstrap-theme.min.css">
        <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
        {{-- INVOICE CSS --}}
        <link rel="stylesheet" type="text/css" href="/themes/{{ $shop_theme }}/resources/assets/frontend/css/invoice.css">
    </head>
    <body>        
    <!--[if lt IE 8]>
      <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <div class="invoice">
      <div class="header">
        <div class="title">INTOGADGETS INC.</div>
        <div class="sub-title">SM Supercenter Valenzuela, Mc. Arthur Highway, Karuhatan, Valenzuela City</div>
        <div class="sub-title">VAT Reg. TIN: 007-308-262-003</div>
      </div>
      <div class="clearfix sales-top">
        <div class="pull-left sales-title">SALES INVOICE</div>
        <div class="pull-right sales-number">NO. 18701</div>
      </div> 
      <div class="row clearfix per-row">
        <div class="col-md-5 col-md-offset-7 text-right">
          <table>
            <tbody>
              <tr>
                <td class="labels" style="width: 40px;">Date</td>
                <td class="value">{{ date("m/d/y", strtotime($order->created_date)) }}</td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
      <div class="row clearfix per-row">
        <div class="col-md-12">
          <table>
            <tbody>
              <tr>
                <td class="labels" style="width: 50px;">Sold to</td>
                <td class="value">{{ $order->first_name }} {{ $order->middle_name }} {{ $order->last_name }}</td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
      <div class="row clearfix per-row">
        <div class="col-md-7">
          <table>
            <tbody>
              <tr>
                <td class="labels" style="width: 100px;">Bus.Style/Name</td>
                <td class="value"></td>
              </tr>
            </tbody>
          </table>
        </div> 
        <div class="col-md-5">
          <table>
            <tbody>
              <tr>
                <td class="labels" style="width: 30px;">TIN</td>
                <td class="value"></td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
      <div class="row clearfix per-row">
        <div class="col-md-12">
          <table>
            <tbody>
              <tr>
                <td class="labels" style="width: 50px;">Address</td>
                <td class="value">{{ $order->billing_address }}</td>
              </tr>
            </tbody>
          </table>
        </div> 
      </div>
      <div class="main-table">
        <table>
          <thead>
            <tr>
              <th>Qty.</th>
              <th>Unit</th>
              <th>ARTICLES</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            @foreach($_item as $item)
              <tr>
                <td>{{ $item->quantity }}</td>
                <td>pc</td>
                <td>{{ $item->evariant_item_label }}</td>
                <td>{{ currency("PHP", $item->price) }}</td>
                <td>{{ currency("PHP", $item->subtotal) }}</td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
      <div class="footer">
        <div class="row clearfix">
          <div class="col-md-7">
            <div class="note">3 DAYS REPLACEMENT IN BRAND NEW CONDITION</div>
            <div class="total">
              <table>
                <tbody>
                  <tr>
                    <td>VATable</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>VAT-Exempt Sale</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Zero-Rated Sale</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>TOTAL SALE</td>
                    <td>P {{ number_format($order->subtotal, 2) }}</td>
                  </tr>
                  <tr>
                    <td>Value Added Tax</td>
                    <td>P {{ number_format($order->tax, 2) }}</td>
                  </tr>
                  <tr>
                    <td>TOTAL AMOUNT</td>
                    <td>P {{ number_format($order->total, 2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-5">
            <div class="terms-note">Receive the above in good order and condition.</div>
            <div class="terms-line"></div>
            <div class="terms-permit">1000 bks. 50x3 02501 - 52500</br> BIR Permit No. OCN1AU0000721638 03-21-2</br> AMSTAR COMPANY, INC.</br> 272 Roosevelt Ave., SFDM, Quezon City</div>
          </div>
        </div>
      </div>
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
    <script src="/themes/{{ $shop_theme }}/assets/initializr/js/vendor/bootstrap.min.js"></script>
    @yield("js")
    </body>
</html>
