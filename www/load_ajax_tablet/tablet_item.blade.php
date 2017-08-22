@if(isset($_invline))
	@foreach($_invline as $invline)
	<div class="inv item-table item-list-{{$invline->invline_item_id}}">
		<div style="border: 1px solid #999999; padding: 10px;margin: 5px" class="popup" size="md" link="/tablet/invoice/add_item/{{$invline->invline_item_id}}">
            <a class="btn-remove col-xs-12 text-right" style="margin-top: -10px;margin-bottom: -10px">
            	Remove
            </a>
			<div class="form-group row clearfix">
				<div class="col-xs-6">
					<input type="hidden" name="invline_item_id[]" class="input-item-id" value="{{$invline->invline_item_id}}">
					<h3 class="item-name">{{$invline->item_name}}</h3>
				</div>
				<div class="col-xs-6 text-right">
					<input type="hidden" name="invline_amount[]" class="input-item-amount" value="{{$invline->invline_amount}}">
					<h3 class="item-amount">{{number_format($invline->invline_amount,2)}}</h3>
				</div>
			</div>
			<div class="row clearfix">
				<div class="col-xs-6">
					<input type="hidden" name="invline_qty[]" class="input-item-qty" value="{{$invline->invline_qty}}">
					<input type="hidden" name="invline_rate[]" class="input-item-rate" value="{{$invline->invline_rate}}">
					<input type="hidden" name="invline_um[]" class="input-item-um" value="{{$invline->invline_um}}">
					<h4><span class="item-qty">{{$invline->invline_qty}}</span> x <span class="item-rate">{{number_format($invline->invline_rate,2)}}</span> <span class="item-um">{{$invline->multi_abbrev}}</span></h4>
				</div>
				<div class="col-xs-6 text-right">
					<input type="hidden" name="invline_discount[]" class="input-item-disc" value="{{$invline->invline_discount}}">
					<input type="hidden" name="invline_discount_remark[]" class="input-item-remarks" value="{{$invline->invline_discount_remark}}">
					<h4 class="disc-content {{$invline->invline_discount == 0 ? 'hidden' : ''}}">Disc. <span class="item-disc">{{$invline->invline_discount_type == 'fixed' ? number_format($invline->invline_discount) : $invline->invline_discount." %" }} </span></h4>
				</div>
				<div class="col-xs-12">
					<input type="hidden" name="invline_taxable[]" class="input-item-taxable" value="{{$invline->taxable}}">
					<span style="color:#999999" class="item-taxable">{{$invline->taxable == 0 ? 'Taxable' : 'Non-Taxable'}}</span>
				</div>
				<div class="col-xs-12">
					<input type="hidden" name="invline_description[]" class="input-item-desc" value="{{$invline->invline_description}}">
					<span style="color:#999999" class="item-desc">{{$invline->invline_description}}</span>
				</div>
			</div>
		</div>
	</div>
	@endforeach
@endif