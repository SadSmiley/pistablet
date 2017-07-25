$( document ).ready(function() {
   $("#invi0").css("display","none");
   $("#invi1").css("display","none");
   $("#invi2").css("display","none");
   $("#invi3").css("display","none");
   $("#navi").css("display","block");
   // $('#invi').hide();
   // alert('rea');
});
function addpermission(id){
			var token = document.getElementById('_token').value;
			var page_name =document.getElementById('page_name'+id).value;
			var	action = document.getElementById('action'+id).value;
			var	page_link = document.getElementById('page_link'+id).value;
			var	value = document.getElementById('value'+id).value;
			var	rank_level = document.getElementById('rank_level').value;
			var checkposition = document.getElementById('permission'+id).checked;
			// alert(checkposition);
			if (checkposition == true) {
            // alert(id + token);
            // alert(page_name + action + page_link + value);
            	$.ajax({
	    		type:'POST',
	   			 url:'/admin/utilities/position/addadminpermission',
	    		data: {'page_name': page_name, '_token': token, 'action': action, 'page_link': page_link, 'value': value, 'rank_level':rank_level },
	    		success: function(data){
	    		// toastr.success("Employee  Permission Added");
	   			 }
				});
            	
        	} 
        	else{
       		$.ajax({
	    		type:'POST',
	   			 url:'/admin/utilities/position/updatepermission',
	    		data: {'page_name': page_name, '_token': token, 'action': action, 'page_link': page_link, 'value': value, 'rank_level':rank_level },
	    		success: function(data){
	    		// toastr.success("Employee  Permission Removed");
	   			 }
				});

       		}
}
function pageviewadd(id){
			var token = document.getElementById('_token').value;
			var page_name =document.getElementById('page_name'+id).value;
			var	action = document.getElementById('action'+id).value;
			var	page_link = document.getElementById('linkname'+id).value;
			var	value = document.getElementById('value'+id).value;
			var	rank_level = document.getElementById('rank_level').value;
			if (document.getElementById('linkname'+id).checked) {
            // alert(id + token);
            // alert(page_name + action + page_link + value);
            	$.ajax({
	    		type:'POST',
	   			 url:'/admin/utilities/position/addadminpermission',
	    		data: {'page_name': page_name, '_token': token, 'action': action, 'page_link': page_link, 'value': value, 'rank_level':rank_level },
	    		success: function(data){
	    		// toastr.success("Employee  Permission Added");
	   			 }
				});
            	
        	} 
        	else{
       		$.ajax({
	    		type:'POST',
	   			 url:'/admin/utilities/position/updatepermission',
	    		data: {'page_name': page_name, '_token': token, 'action': action, 'page_link': page_link, 'value': value, 'rank_level':rank_level },
	    		success: function(data){
	    		// toastr.success("Employee  Permission Removed");
	   			 }
				});

       		}
       		
}
