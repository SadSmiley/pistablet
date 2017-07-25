@extends('tablet.layout')
@section('content')
<form class="global-submit" action="{{$action}}" method="post">
    <input type="hidden" name="_token" value="{{csrf_token()}}"> 
    <span class="hidden for-tablet-only">for_tablet</span>
    <input type="hidden" class="button-action" name="button_action" value="">
      <div class="form-group">
        <div class="col-md-12">
            <div class="panel panel-default panel-block panel-title-block" id="top">
                <div class="panel-heading">
                    <div>
                        <i class="fa fa-tags"></i>
                        <h1>
                            <span class="page-title">Customer &raquo; Collection</span>
                            <small>
                            <!--Add a product on your website-->
                            </small>
                        </h1>
                        <button type="submit" class="panel-buttons btn btn-custom-primary pull-right" data-action="save-and-edit">Save</button>
                        <a href="/tablet" class="btn btn-custom-white">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    <div class="form-group">
        <div class="col-md-12">
            <div class="panel panel-default panel-block panel-title-block panel-gray">        
                <div class="tab-content rcvpymnt-container">
                    <div class="row rcvpymnt-load-data">
                        @include("member.receive_payment.load_content_receive_payment");
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
@endsection


@section('script')
<script type="text/javascript">
    $(".chosen-select").chosen({no_results_text: "The customer doesn't exist."});
    $('[data-toggle="popover"]').popover(); 
</script>
<script type="text/javascript" src="/assets/member/js/textExpand.js"></script>
<script type="text/javascript" src="/assets/member/js/receive_payment.js"></script>
@endsection