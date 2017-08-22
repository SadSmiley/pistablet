@if(isset($_cmline))
	@foreach($_cmline as $cmline)
	<div class="item-table cm item-list-{{$cmline->cmline_item_id}}"">
		<div style="border: 1px solid #999999; padding: 10px;margin: 5px" class="popup" size="md" link="/tablet/credit_memo/add_item/{{$cmline->cmline_item_id}}/{{isset($inv) ? 'true' : 'false'}}">
            <a class="btn-remove col-xs-12 text-right" style="margin-top: -10px;margin-bottom: -10px">
            	Remove
            </a>
			<div class="form-group row clearfix">
				<div class="col-xs-6">
					<input type="hidden" name="cmline_item_id[]" class="cm input-item-id" value="{{$cmline->cmline_item_id}}">
					<h3 class="item-name">{{$cmline->item_name}}</h3>
				</div>
				<div class="col-xs-6 text-right">
					<input type="hidden" name="cmline_amount[]" class="cm input-item-amount" value="{{$cmline->cmline_amount}}">
					<h3 class="item-amount">{{number_format($cmline->cmline_amount,2)}}</h3>
				</div>
			</div>
			<div class="row clearfix">
				<div class="col-xs-6">
					<input type="hidden" name="cmline_qty[]" class="cm input-item-qty" value="{{$cmline->cmline_qty}}">
					<input type="hidden" name="cmline_rate[]" class="cm input-item-rate" value="{{$cmline->cmline_rate}}">
					<input type="hidden" name="cmline_um[]" class="cm input-item-um" value="{{$cmline->cmline_um}}">
					<h4><span class="item-qty">{{$cmline->cmline_qty}}</span> x <span class="item-rate">{{number_format($cmline->cmline_rate,2)}}</span> <span class="item-um">{{$cmline->multi_abbrev}}</span></h4>
				</div>
				<div class="col-xs-12">
					<input type="hidden" name="cmline_description[]" class="cm input-item-desc" value="{{$cmline->cmline_description}}">
					<span style="color:#999999" class="item-desc">{{$cmline->cmline_description}}</span>
				</div>
			</div>
		</div>
	</div>
	@endforeach
@endif