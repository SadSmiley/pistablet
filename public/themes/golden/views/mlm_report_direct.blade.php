@extends('mlm_layout')
@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="panel panel-default panel-block panel-title-block" id="top">
            <div class="panel-heading">
                <div>
                    <i class="icon-shopping-cart"></i>
                    <h1>
                        <span class="page-title">Report</span>
                        <small>
                            Direct Referral Income Report
                        </small>
                    </h1>
                </div>
            </div>
        </div>
        <form method="POST">
        <div class="panel panel-default panel-block">
            <div class="list-group">
                @if(isset($_direct))
                <div class="list-group-item" id="responsive-bordered-table">
                    <div class="form-group">
                        <h4 class="section-title">
                        Direct Referral Income Report
                        </h4>
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-condensed">
                                <thead class="">
                                    <tr>
                                        <th class="center">DATE</th>
                                        <th class="center">NAME</th>
                                        <th class="center">SLOT ID</th>
                                        <th class="center">PAY CHEQUE PROCESSED</th>
                                        <th class="center">AMOUNT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if($_direct->isEmpty())
                                        <tr>
                                            <td colspan="3"></td>
                                        </tr>
                                    @else
                                        @foreach($_direct as $direct)
                                        <tr>
                                            <td class="center">{{ date("F d, Y", strtotime($direct->direct_date)) }}</td>
                                            <td class="center">{{ $direct->account_name }}</td>
                                            <td class="center">{{ $direct->slot_id }}</td>
                                            <td class="center"><input type="checkbox" disabled="disabled"  {{ $direct->direct_pay_cheque == 0 ? '' : 'checked=checked'  }}></td>
                                            <td class="center" style="color: green">{{ currency($direct->direct_amount) }}</td>
                                        </tr>
                                        @endforeach    
                                    @endif 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>  
                @endif                       
            </div>
        </div>  
        </form> 
        <div>

    </div>
    </div>
</div>
@endsection