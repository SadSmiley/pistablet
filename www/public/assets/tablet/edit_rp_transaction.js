
var global_tablet_html = $(".tablet-div-script").html();
$(document).ready(function()
{
    check_if_edit_rp();
});
function check_if_edit_rp()
{
	get_shop_id(function(shop_id)
    {
        get_session('rp_id', function (rp_id)
        {
          if(rp_id != 0)
          {
            get_rp_data(rp_id, function(rp, _rpline)
            {
                  console.log(rp);
                  console.log(_rpline);

                  $('.customer-select-list').val(rp['rp_customer_id']).change(); 
                  $('.drop-down-payment').val(rp['rp_payment_method']).change();
                  $('.rp-coa').val(rp['rp_ar_account']).change();
                  $('.amount-received').val((rp['rp_total_amount']).toFixed(2));
                  $('.rp-id').val(rp_id);
                  $('.amount-to-apply').val(rp['rp_total_amount']);
                  $('.amount-apply').html(rp['rp_total_amount']);
                  if(count(_rpline) >= 1)
                  {
                    $('.tbody-item').html('');
                      $.each(_rpline, function(index, val) 
                      {
                          var append = ""
                          get_cm_amount(val.credit_memo_id, function(cm_amount)
                          {
                              var sign = val.rpline_id != null ? "checked" : "";

                              append = '<tr>'+
                                               '<input type="hidden" value="invoice" name="rpline_txn_type[]">'+
                                               '<input type="hidden" value="'+val.inv_id+'" name="rpline_txn_id[]">'+
                                                '<td class="text-center">'+
                                                  '<input type="hidden" class="line-is-checked" name="line_is_checked[]" value="'+(val.rpline_id != null ? "1" : "0")+'" >'+
                                                  '<input type="checkbox" '+ sign +' class="line-checked">'+
                                                '</td>'+
                                                '<td>Invoice #'+val.new_inv_id+' ( '+val.inv_date+' )</td>'+
                                                '<td class="text-right">'+val.inv_date+'</td>'+
                                                '<td><input type="text" class="text-right original-amount" value="'+(val.inv_overall_price).toFixed(2)+'" disabled /></td>'+
                                                '<td><input type="text" class="text-right balance-due" value="'+(((val.inv_overall_price) - (val.rpline_amount ? val.rpline_amount : 0 ) ) + ((val.rpline_amount ? val.rpline_amount : 0 ) - cm_amount)).toFixed(2)+'" disabled /></td>'+
                                                '<td><input type="text" class="text-right amount-payment" name="rpline_amount[]" value="'+(val.rpline_amount ? val.rpline_amount : 0).toFixed(2)+'"/></td>'+
                                            '</tr>';
                              $('.tbody-item').append(append);
                          });
                      });
                  }
                  $('.rp-save-btn').attr('onClick','rp_edit_submit();');
            });            
          }
        });
    });
}