function calculateAndDisplayRoute() {}

var homes = [
  ["Home1", 17.953643, 79.569233],
  ["Home2", 17.916386, 79.572154],
  ["Home3", 17.942388, 79.543628],
  ["Home4", 17.926996, 79.547971],
  ["Home5", 17.943149, 79.574752],
  ["Home6", 17.963149, 79.594752],
  ["Home7", 17.913149, 79.594752],
  ["Home8", 17.919996, 79.537971],
  ["Home9", 17.929996, 79.537971],
  ["Home10", 17.959996, 79.537971]
];

var trucks = [
  ["Truck1", 17.950741, 79.549676],
  ["Truck2", 17.929023, 79.555086],
  ["Truck3", 17.942342, 79.56504]
];

var centerS = [
  ["Sanitation Resource Park 1", 17.936746, 79.558506],
  ["Sanitation Resource Park 2", 17.937611, 79.528855]
];

var map = new google.maps.Map(document.getElementById("map"), {
  zoom: 14,
  center: new google.maps.LatLng(17.937611, 79.558855),
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

var marker, i;
var markers = new Array();
var center_marker = new Array();
var truck_marker = new Array();

var icon = {
  url: "build.png",
  scaledSize: new google.maps.Size(30, 30), // scaled size
  origin: new google.maps.Point(0, 0), // origin
  anchor: new google.maps.Point(15, 30) // anchor
};

var sanitation_icon = {
  url: "parks2.png",
  scaledSize: new google.maps.Size(50, 50), // scaled size
  origin: new google.maps.Point(0, 0), // origin
  anchor: new google.maps.Point(25, 50) // anchor
};

var truck_icon = {
  url: "firetruck_logo1.jpg",
  scaledSize: new google.maps.Size(50, 50), // scaled size
  origin: new google.maps.Point(0, 0), // origin
  anchor: new google.maps.Point(25, 50) // anchor
};

var icon_route = {
  url: "br.png",
  scaledSize: new google.maps.Size(30, 30), // scaled size
  origin: new google.maps.Point(0, 0), // origin
  anchor: new google.maps.Point(15, 30) // anchor
};

var infowindow = new google.maps.InfoWindow();

for (i = 0; i < homes.length; i++) {
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(homes[i][1], homes[i][2]),
    map: map,
    icon: icon_route
  });

  markers.push(marker);

  google.maps.event.addListener(
    marker,
    "click",
    (function(marker, i) {
      return function() {
        infowindow.setContent(homes[i][0]);
        infowindow.open(map, marker);
      };
    })(marker, i)
  );
}

for (i = 0; i < centerS.length; i++) {
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(centerS[i][1], centerS[i][2]),
    map: map,
    icon: sanitation_icon
  });

  center_marker.push(marker);

  google.maps.event.addListener(
    marker,
    "click",
    (function(marker, i) {
      return function() {
        infowindow.setContent(centerS[i][0]);
        infowindow.open(map, marker);
      };
    })(marker, i)
  );
}

for (i = 0; i < trucks.length; i++) {
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(trucks[i][1], trucks[i][2]),
    map: map,
    icon: truck_icon
  });

  truck_marker.push(marker);

  google.maps.event.addListener(
    marker,
    "click",
    (function(marker, i) {
      return function() {
        infowindow.setContent(trucks[i][0]);
        infowindow.open(map, marker);
      };
    })(marker, i)
  );
}

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function setAllMapTruck(map) {
  for (var i = 0; i < truck_marker.length; i++) {
    truck_marker[i].setMap(map);
  }
}

function setAllMapCenter(map) {
  for (var i = 0; i < center_marker.length; i++) {
    center_marker[i].setMap(map);
  }
}

$(document).ready(function() {
  $("#homes").attr("checked", true);
});

$(document).ready(function() {
  $("#trucks").attr("checked", true);
});

$(document).ready(function() {
  $("#sanitation_plants").attr("checked", true);
});

$("#homes").click(function() {
  if ($("#homes").is(":checked")) {
    setAllMap(map);
  } else {
    setAllMap(null);
  }
});

$("#trucks").click(function() {
  if ($("#trucks").is(":checked")) {
    setAllMapTruck(map);
  } else {
    setAllMapTruck(null);
  }
});

$("#sanitation_plants").click(function() {
  if ($("#sanitation_plants").is(":checked")) {
    setAllMapCenter(map);
  } else {
    setAllMapCenter(null);
  }
});

$('input[name="map-check"]').click(function() {
  if ($("#route").is(":checked")) {
    for (i = 0; i < 3; i++) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        preserveViewport: true,
        strokeColor: "#e7e7e7",
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#3CB371",
          strokeWeight: 4,
          strokeOpacity: 0.7
        }
      });
      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: { query: "17.937611, 79.558855" },
          destination: { query: homes[i][1] + ", " + homes[i][2] },
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            console.log("Directions request failed due to " + status);
            location.reload();
          }
        }
      );
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    }

    for (i = 0; i < 3; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(homes[i][1], homes[i][2]),
        map: map,
        icon: icon,
        zIndex: 10000000
      });

      markers.push(marker);

      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            infowindow.setContent(homes[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  } else {
    location.reload();
  }
});
