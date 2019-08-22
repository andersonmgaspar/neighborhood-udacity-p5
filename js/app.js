// Object with the initial places names
let initialPlaces = [
  {name: "No Class"},
  {name: "Janelinha Bar"},
  {name: "Sirene Bar"},
  {name: "Bro Cave"},
  {name: "Tralharia Bar"},
  {name: "Talyesin Rock Bar"},
  {name: "Blues Velvet Bar"},
  {name: "Don't Tell Mama"},
  {name: "1007 Floripa"},
  {name: "Haôma Baixo Centro Bar"},
]

// Style from https://snazzymaps.com/
const snazzyStyle = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#c4c4c4"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#707070"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#be2026"
            },
            {
                "lightness": "0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "hue": "#ff000a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#575757"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#999999"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "saturation": "-52"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
];

// ### Start of Maps API Manipulation ###
// Create the variable for the map
let map;
// Create the array of markers
let markers = [];

// Initial coordinates and placa name
const initialPlaceName = "Florianopolis";
const initialLL = {lat: -27.597349, lng: -48.552619};


// Callback function of Google Maps API
function initMap() {
  // Create a new Map and its configuration
  map = new google.maps.Map(document.getElementById('map'), {
    center: initialLL,
    zoom: 16,
    mapTypeId: 'terrain',
    mapTypeControl: true,
    styles: snazzyStyle,
  });
  findCoordinatesByName();
}

// Create the icon displayed as a marker, the argument is the color of the marker in hexadecimal.
function makeMarkerIcon(markerColor){
  const markerImage = new google.maps.MarkerImage(
  'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1|0|' + markerColor + '|40|_|%E2%80%A2',
    new google.maps.Size(21,34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34)
  );
  return markerImage;
}

// Create the infowindow with information about the place that the marker represents.
function createInfoWindow(marker, infowindow) {
  // Verify if the info window is already open
  if (infowindow.marker != marker) {
    // Set the current infowindow to the marker
    infowindow.marker = marker;
    // Create a basic content with the title of the marker
    infowindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div>');
    // Get a photo of the marker from Foursquare API and
    // set info window content
    getFoursquareContent(marker, infowindow);
    // Add a function to the close button on the info window
    infowindow.addListener('closeclick', function(){
      infowindow.marker = null;
    })
    // Open the info windows
    infowindow.open(map, marker);
  }
}

// API Documentation: https://developer.foursquare.com/docs/api/venues/photos
function getFoursquareContent(marker, infoWindow) {
  // Foursquare Cliente keys
  const foursquareClientId = '3SD1TATBG4FL13WUOMCZZKXPIISKX3TRBT0CSUNT34JSH2AI';
  const foursquareClientSecret = 'FSVM1ROG5YO2APLBK3SAXOY0XCDHBP4CEZZZ13IQU3J3DO41';
  let photoPath;
  let contentInfoWindow;
  // Search for the Venue ID
  getIDFoursquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=' +
                        marker.position.lat() + ',' + marker.position.lng() +
                        '&client_id='+foursquareClientId+'&client_secret='+foursquareClientSecret +
                        '&v=20190510';
  $.getJSON(getIDFoursquareUrl).done(function(data){
    // Get the Venue ID
    let id = data.response.venues[0].id;
    // Search for one photo of the Venue
    getPhotoFoursquareUrl = 'https://api.foursquare.com/v2/venues/'+
                             id+'/photos?/&client_id=' + foursquareClientId +
                             '&client_secret=' + foursquareClientSecret + '&v=20190510';
    $.getJSON(getPhotoFoursquareUrl).done(function(data){
      // Get the Photo
      const photo = data.response.photos.items[0];
      smallphotoPath = photo.prefix+'200x200'+photo.suffix;
      // Photor from Foursquare with original size
      originalphotoPath = photo.prefix+'original'+photo.suffix;
      infoWindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +
                            '</div><br><div><img src="' + smallphotoPath + '"></div>'+
                            '<div class="text-dark"><a target="_blank" href="' + originalphotoPath + '">Powered by Foursquare</a></div>');

                            
    }).fail(function(error){
      // Display error message, unable to get the photo
      infoWindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div><br>'+
                            '<div class="text-dark">Fail to get Foursquare Photo!</div>');
    });
  }).fail(function(error){
    // Display error message, unable to connect to Foursquare
    infoWindow.setContent('<div class="text-dark font-weight-bold">'+ marker.title +'</div><br><div class="text-dark">Error connecting to Foursquare.</div>');
  });
}

// Function to bounce once the selected marker
function bounceMarker(marker) {
  // Set animation to Bounce
  marker.setAnimation(google.maps.Animation.BOUNCE);
  // Set the animation to 500 ms
  setTimeout(function(){
    marker.setAnimation(null);
  }, 500);
}

// This function get the list of the initial places updated and create the markers
function createMarkers() {
  // Create an normal icon
  const normalIcon = makeMarkerIcon('ff0000');
  // Create an selected icon, when clicked or hover over it
  const selectedIcon = makeMarkerIcon('00ff00');
  // Create an Info Window
  const markerInfoWindow = new google.maps.InfoWindow();
  // Create all markers from initialPlaces array
  initialPlaces.forEach(function(place, index){
    const marker = new google.maps.Marker({
      position: place.coordinates,
      title: place.name,
      animation: google.maps.Animation.DROP,
      icon: normalIcon,
      id: index
    });
    // Push this marker to the array of markers.
    markers.push(marker);
    // Bounce the marker once and open an info window when click on a specific marker.
    marker.addListener('click', function(){
      bounceMarker(this);
      createInfoWindow(this, markerInfoWindow);
    });
    // Bounce the marker once and open an info window when click the item in the list that corresponds to a marker.
    document.getElementsByTagName("li")[index].addEventListener('click', function(){
      // When select the marker from the list center map Window
      //on the marker.
      map.setCenter(marker.getPosition());
      bounceMarker(marker);
      createInfoWindow(marker, markerInfoWindow);
    });
    // When hover over an marker change it to selectedIcon.
    marker.addListener('mouseover', function(){
      this.setIcon(selectedIcon);
    });
    // When leave out the mouse over an marker change it to normalIcon.
    marker.addListener('mouseout', function(){
      this.setIcon(normalIcon);
    });
  });
}

//Associate the markers list to the map
function showMarkers(){
  // Show all markers when the app is open
  markers.forEach(function(marker, index){
    marker.setMap(map);
  });
}

// Update the list of locations with the lat long atributes
function findCoordinatesByName() {
  const placesAPI = new google.maps.places.PlacesService(map);
  initialPlaces.forEach(function(value,index, array) {
    // Create the request criteria
    var request = {
      query: value.name,
      fields: ['name', 'geometry'],
      locationBias: initialLL
    };
    // Call the Places API to find the location info based on the request criteria
    placesAPI.findPlaceFromQuery(request, function(results, status) {
      // Test the result, if there is a successfull response
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Set the lat Lng atributes to the place in initialPlaces array
        value['coordinates'] = results[0].geometry.location;
      } else {
          // For any errors in the google places call, remove item from lists
          array.splice( index, 1 );
          mapsVM.removePlace(value['name']);
          console.log(status+": "+value['name']);
      }
    });
  });
}
// ### End of Maps API calls ###


// ### VIEW MODEL ###
// Create the "Place" that has the name and other informations about the place
const Place = function(data) {
  this.name = data.name;
  this.coordinates = data.coordinate;
}

// The view model
let mapsViewModel = function() {
  let self = this;

  // Text typed by the user in the search bar
  this.filteredText = ko.observable("")
  // Create the list of places
  this.placesList = ko.observableArray([]);

  initialPlaces.forEach(function(placeItem){
    // Push a new place to the placeList
    self.placesList.push(new Place(placeItem));
  });

  self.removePlace = function (Name) {
        self.placesList.remove(function(place) {
            return place.name == Name;
        });
    }

  // When change the filteredText trigger this function
  this.filteredText.subscribe(function(){
    // Convert filteredText to lower case
    const lowerText = self.filteredText().toLowerCase();
    // Get all item of the list
    const listLis = document.getElementsByTagName("li");
    // Convert the HTMLCollection to array
    const arrayLis = Array.prototype.slice.call(listLis);

    arrayLis.forEach(function(li, index){
      // Convert li content to lower case
      const lowerLi = li.innerText.toLowerCase();

      // Verify if the input text is part of the text of
      // the list
      if (lowerLi.indexOf(lowerText) > -1) {
          // Display in the list
          li.style.display = "";
          // Display on the map
          markers[index].setVisible(true);
      } else {
          // Remove from the list
          li.style.display = "none";
          // Remove from the map
          markers[index].setVisible(false);
      }
    });
  });
};
mapsVM = new mapsViewModel();
ko.applyBindings(mapsVM);
