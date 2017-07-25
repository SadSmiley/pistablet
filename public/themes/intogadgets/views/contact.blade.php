@extends('layout')
@section("social-script")
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=1920870814798104";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
@endsection
@section('content')
<div class="contact">
	<div class="contact-header" style="background-image: url('{{ get_content($shop_theme_info, 'contact', 'contact_header_cover') }}')">
		<div class="title">{{ get_content($shop_theme_info, 'contact', 'contact_title') }}</div>
		<div class="sub">{{ get_content($shop_theme_info, 'contact', 'contact_subtitle') }}</div>
		<div class="text" style="color: #fff;">{{ get_content($shop_theme_info, 'contact', 'contact_quote') }}</div>
		<div class="icon">
			<!-- <div class="holder">
				<i class="fa fa-phone"></i>
				<div class="text">+63932-187-9511</br>+63916-336-2012</div>
			</div> -->
			<div class="holder">
				<a style="color: #fff;" href="{{ get_content($shop_theme_info, 'contact', 'contact_location_link') }}">
					<i class="fa fa-map-marker"></i>
					<div class="text">Store Locations</div>
				</a>
			</div>
			<div class="holder">
				<a style="color: #fff;" href="{{ get_content($shop_theme_info, 'contact', 'contact_facebook_link') }}">
					<i class="fa fa-facebook"></i>
					<div class="text">{{ get_content($shop_theme_info, 'contact', 'contact_facebook_link') }}</div>
				</a>
			</div>
			<div class="holder">
				<a style="color: #fff;" href="{{ get_content($shop_theme_info, 'contact', 'contact_twitter_link') }}">
					<i class="fa fa-twitter"></i>
					<div class="text">{{ get_content($shop_theme_info, 'contact', 'contact_twitter_link') }}</div>
				</a>
			</div>
			<div class="holder">
				<a style="color: #fff;" href="{{ get_content($shop_theme_info, 'contact', 'contact_instagram_link') }}">
					<i class="fa fa-instagram"></i>
					<div class="text">{{ get_content($shop_theme_info, 'contact', 'contact_instagram_link') }}</div>
				</a>
			</div>
		</div>
	</div>
	<div class="container" style="margin-top: 25px;">
		<div onload="initMap()">
			<div>
				<div style="display: inline-block; vertical-align: top;">
					<label for="raddressInput">Search location:</label>
					<input class="form-control" type="text" id="addressInput" size="15"/>
				</div>
				<div style="display: inline-block; vertical-align: top;">
					<label for="radiusSelect">Radius:</label>
					<select class="form-control" id="radiusSelect" label="Radius">
						{{-- <option value="1000">1000 kms</option>
						<option value="800">800 kms</option>
						<option value="400">400 kms</option>
						<option value="200">200 kms</option> --}}
						<option value="100">100 kms</option>
						<option value="50">50 kms</option>
						<option value="30">30 kms</option>
						<option value="20">20 kms</option>
						<option value="10">10 kms</option>
					</select>
				</div>
				<div style="display: inline-block; vertical-align: middle;">
					<input style="margin-top: 25px; margin-left: 15px; margin-bottom: 15px;" class="btn btn-primary" type="button" id="searchButton" value="Search"/>
				</div>
			</div>
			<div><select class="form-control" id="locationSelect" style="width: 200px; display: none; margin-bottom: 15px;"></select></div>
			<div id="map" style="width: 100%; height: 90%"></div>
		</div>
	</div>
	<div class="store-content container">
		@if(is_serialized(get_content($shop_theme_info, "contact", "contact_store_maintenance")))
		<div>
			<table id="branches">
				<thead>
					<tr>
						<th data-hide="phone">Store Image</th>
						<th data-hide="phone,tablet">Store Name</th>
						<th data-hide="phone">Store Branch</th>
						<th data-hide="phone,tablet">Contact Number</th>
						<th>Location</th>
					</tr>
				</thead>
				<tbody>
					@foreach(unserialize(get_content($shop_theme_info, "contact", "contact_store_maintenance")) as $store)
					<tr>
						<td><a data-fancybox-group='gallery' class='fancybox' id='fancyboxes' href='{{ $store["image"] }}'><img src='{{ $store["image"] }}'></img></a></td>
						<td>{{$store["name"]}}</td>
						<td>{{$store["branch"]}}</td>
						<td>{{$store["contact"]}}</td>
						<td class="storename">{{ $store["address"] }}</td>
					</tr>
					@endforeach
				</tbody>
			</table>
		</div>
		@endif
	</div>
	<div class="contact-content container">
		<div class="row clearfix">
			<div class="col-md-8">
				<form id="email-form" action="" method="">
					{!!Honeypot::generate('my_name','my_time')!!}
					<div id="email-form-result">

					</div>
					<input type="hidden" name="_token" value="{{{ csrf_token() }}}" />

					<div class="col-md-6 left right nopadding" style="width: 100%;">

						<div class="field">
							<input type="text" name="sender_name" placeholder="FULL NAME">
						</div>
						<div class="field">
							<input type="text" name="sender_contact_num" placeholder="PHONE NUMBER">
						</div>
						<div class="field">
							<input type="text" name="sender_email" placeholder="YOUR EMAIL">
						</div>
						<div class="field">
							<textarea name="sender_message" placeholder="Your Message Here...."></textarea>
							<button id="send-email">Send <i class="fa fa-paper-plane-o"></i></button>
							<img id="sending-message-loading" style="display: none;" src="../../resources/assets/img/small-loading.GIF" alt="">
						</div>
					</div>
				</form>
			</div>
			<div class="col-md-4" style="margin-top: 20px;">
				<div class="fb-page" data-href="https://www.facebook.com/Intogadgetstore/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote style="display: none;" cite="https://www.facebook.com/Intogadgetstore/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/Intogadgetstore/">Intogadgets</a></blockquote></div>
			</div>
		</div>
	</div>
</div>
@endsection
<style type="text/css">
.footable-row-detail-name
{
	width: 140px;
}
</style>
@section('script')
	<script type="text/javascript" src="resources/assets/rutsen/js/contact.js"></script>
	<script type="text/javascript" src="resources/assets/fbox/jquery.fancybox.js?v=2.1.5"></script>
	<link rel="stylesheet" type="text/css" href="resources/assets/fbox/jquery.fancybox.css?v=2.1.5" media="screen" />
	<script type="text/javascript" src="resources/assets/frontend/js/store.js"></script>
	<script type="text/javascript">
		$(document).ready(function()
		{
			// $('body').on('click', '.footable .footable-row-detail', function(event) 
			// {
			// 	event.preventDefault();
			// 	$(event.currentTarget).prev("tr").toggleClass("hid");
			// });

			// $('.footable-toggle').trigger('click');
			// $('.footable-toggle').trigger('click');

			// $('.footable .footable-row-detail').prev("tr").addClass("hid");
			
			var $message_result = $('#email-form-result');
			$('button#send-email').on('click', function(e)
			{
				e.preventDefault();
				var loading = $('#sending-message-loading');
				loading.fadeIn();
				var $form = $('#email-form').serialize();
				console.log($form);


				$.ajax({
					url: 'contact/send_email',
					type: 'post',
					dataType: 'json',
					data: $form,
				})
				.done(function(data) {
					loading.fadeOut();
					$message_result.html("");
					$message_result.removeAttr("class");
					var append = '<p>'+data['message']+'</p>';
					var error = "";
					if(data['error'] != null)
					{
						$.each(data['error'], function(index, val)
						{
							error += "<li>"+val+"</li>";
						});
					}

					error = '<ul>'+error+'</ul>';
					$message_result.append(append+error);

					if(data['success'])
					{
						$message_result.addClass('alert alert-success');
						$( '#email-form input[name="sender_name"]').val("");
						$( '#email-form input[name="sender_contact_num"]').val("");
						$( '#email-form input[name="sender_email"]').val("");
						$( '#email-form textarea[name="sender_message"]').val("");

						setTimeout(function(){
							$message_result.fadeOut();
						}, 5000)

						
					}
					else
					{
						$message_result.addClass('alert alert-danger');
					}



					

				})
				.fail(function() {
					console.log("error");
					loading.fadeOut();
				})
				.always(function() {
					console.log("complete");
				});
				
				
			});	
		});
	</script>
	<script>
      var map;
      var markers = [];
      var infoWindow;
      var locationSelect;

        function initMap() {
          var sydney = {lat: 14.5995, lng: 120.9842};
          map = new google.maps.Map(document.getElementById('map'), {
            center: sydney,
            zoom: 11,
            mapTypeId: 'roadmap',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
          });
          infoWindow = new google.maps.InfoWindow();

          searchButton = document.getElementById("searchButton").onclick = searchLocations;

          locationSelect = document.getElementById("locationSelect");
          locationSelect.onchange = function() {
            var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
            if (markerNum != "none"){
              google.maps.event.trigger(markers[markerNum], 'click');
            }
          };
        }

       function searchLocations() {
         var address = document.getElementById("addressInput").value;
         var geocoder = new google.maps.Geocoder();
         geocoder.geocode({address: address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
            searchLocationsNear(results[0].geometry.location);
           } else {
             alert(address + ' not found');
           }
         });
       }

       function clearLocations() {
         infoWindow.close();
         for (var i = 0; i < markers.length; i++) {
           markers[i].setMap(null);
         }
         markers.length = 0;

         locationSelect.innerHTML = "";
         var option = document.createElement("option");
         option.value = "none";
         option.innerHTML = "See all results:";
         locationSelect.appendChild(option);
       }

       function searchLocationsNear(center) {
         clearLocations();

         var radius = document.getElementById('radiusSelect').value;
         var searchUrl = '/contact/find_store/?lat=' + center.lat() + '&lng=' + center.lng() + '&radius=' + radius;
         downloadUrl(searchUrl, function(data) {
           var xml = parseXml(data);
           var markerNodes = xml.documentElement.getElementsByTagName("marker");
    
           if (JSON.stringify(markerNodes) != "{}") 
           {
           	   var bounds = new google.maps.LatLngBounds();
	           for (var i = 0; i < markerNodes.length; i++) {
	             var id = markerNodes[i].getAttribute("id");
	             var name = markerNodes[i].getAttribute("name");
	             var address = markerNodes[i].getAttribute("address");
	             var distance = parseFloat(markerNodes[i].getAttribute("distance"));
	             var latlng = new google.maps.LatLng(
	                  parseFloat(markerNodes[i].getAttribute("lat")),
	                  parseFloat(markerNodes[i].getAttribute("lng")));

	             createOption(name, distance, i);
	             createMarker(latlng, name, address);
	             bounds.extend(latlng);
	           }
	           map.fitBounds(bounds);
	           locationSelect.style.display = "block";
	           locationSelect.onchange = function() {
	             var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
	             google.maps.event.trigger(markers[markerNum], 'click');
	           };
           }
           else
           {
           		alert("There are no stores in this area. Please try other area.");
           }
         });
       }

       function createMarker(latlng, name, address) {
          var html = "<b>" + name + "</b> <br/>" + address;
          var marker = new google.maps.Marker({
            map: map,
            position: latlng
          });
          google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
          });
          markers.push(marker);
        }

       function createOption(name, distance, num) {
          var option = document.createElement("option");
          option.value = num;
          option.innerHTML = name;
          locationSelect.appendChild(option);
       }

       function downloadUrl(url, callback) {
          var request = window.ActiveXObject ?
              new ActiveXObject('Microsoft.XMLHTTP') :
              new XMLHttpRequest;

          request.onreadystatechange = function() {
            if (request.readyState == 4) {
              request.onreadystatechange = doNothing;
              callback(request.responseText, request.status);
            }
          };

          request.open('GET', url, true);
          request.send(null);
       }

       function parseXml(str) {
          if (window.ActiveXObject) {
            var doc = new ActiveXObject('Microsoft.XMLDOM');
            doc.loadXML(str);
            return doc;
          } else if (window.DOMParser) {
            return (new DOMParser).parseFromString(str, 'text/xml');
          }
       }

       function doNothing() {}
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDntbTzqtnwMA7hdMBAeX37YwTjRJi6cDY&callback=initMap">
    </script>
@endsection

@section('css')
<link rel="stylesheet" href="resources/assets/frontend/css/contact.css">
<style>
    /* Always set the map height explicitly to define the size of the div
     * element that contains the map. */
    #map 
    {
      height: 100%;
    }
 </style>
@endsection
