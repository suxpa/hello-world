var map;
var infowindow;
var markers = [];
function initAutocomplete() {
	map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: -34.9284989, lng: 138.60074559999998},
	zoom: 15,
	mapTypeId: 'roadmap'
	});
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: map.getCenter(),
      radius: 500,
      query: 'hotel'
    }, callback);

	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
	searchBox.setBounds(map.getBounds());
	    service.textSearch({
      location: map.getCenter(),
      radius: 500,
      query: 'hotel'
    }, callback);
	});

	
	searchBox.addListener('places_changed', function() {
	var places = searchBox.getPlaces();

	if (places.length == 0) {
	return;
	}
/*
	// Clear out the old markers.
	markers.forEach(function(marker) {
	marker.setMap(null);
	});
	markers = [];
*/
	// For each place, get the icon, name and location.
	var bounds = new google.maps.LatLngBounds();
	places.forEach(function(place) {
	if (!place.geometry) {
	  console.log("Returned place contains no geometry");
	  return;
	}
	var icon = {
	  url: place.icon,
	  size: new google.maps.Size(71, 71),
	  origin: new google.maps.Point(0, 0),
	  anchor: new google.maps.Point(17, 34),
	  scaledSize: new google.maps.Size(25, 25)
	};

	// Create a marker for each place.
	markers.push(new google.maps.Marker({
	  map: map,
	  icon: icon,
	  title: place.name,
	  position: place.geometry.location
	}));

	if (place.geometry.viewport) {
	  // Only geocodes have viewport.
	  bounds.union(place.geometry.viewport);
	} else {
	  bounds.extend(place.geometry.location);
	}
	});
	map.fitBounds(bounds);
	});
}
function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
}
function createMarker(place) {
		//var photos = place.photos;
		//if (!photos) {
		//	return;
		//}
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
          //icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
        });
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
          var info = document.getElementById('info');
          var rating=place.rating;
          if(place.rating==null){
          	rating="No Rating Yet";
          }
          info.innerHTML='<span style="font-size:2em;">'+place.name+'</span> '+'<br/> Ratings:'+rating+'<br/>Address:'+place.formatted_address;
          
        });
      }
