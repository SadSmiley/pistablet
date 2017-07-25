@extends('mlm_layout')
@section('content')
@if(isset($slotnow))
<div class="row">
    <div class="col-md-12 well">
    <div class="col-md-4 ">
        Current Wallet
        <input type="number" class="form-control" value="{{$slotnow->slot_wallet_from_paycheque}}" disabled>
    </div>
    </div>
    <div class="col-md-12 well">
    <div class="col-md-4 ">
        <form method="post" action="/distributor/transfer/post">
        {!! csrf_field() !!}
        Transfer Wallet
        <input type="number" class="form-control" value="0" max="{{$slotnow->slot_wallet_from_paycheque}}" name="transfer_log_amount" min="0">
        <br>
        <select data-placeholder="Select member"  name="account_id" id="account_id" class="form-control select_account" placeholder="Select Members">
                <option value="0">No Recipient</option>
                @if($_account)
                @foreach($_account as $account)
                <option value="{{$account->slot_id}}" {{Request::old('account_id') == $account->account_id ? 'selected' : ''}}>{{$account->account_name}} (Slot #:{{$account->slot_id}})</option>
                @endforeach
                @endif()
            </select>
        <br>
        <button class="btn btn-primary col-md-12">Transfer</button>
        </form>
    </div>
    </div>
    <div class="col-md-12 well">
    <div class="col-md-6 well table-responsive">
        <center>Wallet Recieve</center>
        <table class="table">
            <thead>
                <th>From</th>
                <th>Amount</th>
                <th>Date</th>
            </thead>
            <tbody>
                @if($wallet_recieve)
                    @foreach($wallet_recieve as $value)
                        <tr>
                            <td>{!! slotviewer($value->transfer_log_origin) !!}</td>
                            <td>{{currency($value->transfer_log_amount)}}</td>
                            <td>{{$value->transfer_log_date}}</td>
                        </tr>
                    @endforeach    
                @endif
            </tbody>
        </table>
    </div>
    <div class="col-md-6 well table-responsive">
        <center>Wallet Transfered</center>
        <table class="table">
            <thead>
                <th>To</th>
                <th>Amount</th>
                <th>Date</th>
            </thead>
            <tbody>
                @if($wallet_send)
                    @foreach($wallet_send as $value)
                        <tr>
                            <td>{!! slotviewer($value->transfer_log_transfer) !!}</td>
                            <td>{{currency($value->transfer_log_amount)}}</td>
                            <td>{{$value->transfer_log_date}}</td>
                        </tr>
                    @endforeach    
                @endif
            </tbody>
        </table>
    </div>
    </div>
</div>
@else
No Slot.
@endif
@endsection