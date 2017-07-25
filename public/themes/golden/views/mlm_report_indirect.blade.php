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
                            Slot that are newly encoded today will not reflect on this computation.
                        </small>
                    </h1>
                </div>
            </div>
        </div>
        <div class="panel panel-default panel-block">
            <div class="list-group">
                @if(isset($_indirect))
                <div class="list-group-item" id="responsive-bordered-table">
                    <div class="form-group">
                        <h4 class="section-title">
                        Indirect Referral Income Report
                        </h4>
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-condensed">
                                <thead>
                                    <th>Sposnsor</th>
                                    <th>Amount</th>
                                    <th>Level</th>
                                    <th>Date</th>
                                    <th>Paycheque</th>
                                </thead>
                                <tbody>
                                    @foreach($report as $value)
                                        <tr>
                                            <td>{{$value->indirect_registree}}</td>
                                            <td>{{$value->indirect_amount}}</td>
                                            <td>{{$value->indirect_level}}</td>
                                            <td>{{$value->indirect_date}}</td>
                                            <td>
                                                @if($value->indirect_pay_cheque == 0)
                                                <input type="checkbox" class="form-control" disabled>
                                                @else
                                                <input type="checkbox" class="form-control" disabled checked>
                                                @endif
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>  
                @endif                       
            </div>
        </div>  
    </div>
</div>
@endsection