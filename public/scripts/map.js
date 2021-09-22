//guide taken from ruvictor's github:
//https://github.com/ruvictor/map-app-directions/blob/master/app.js

// default map layer
let map = L.map("map", {
  layers: MQ.mapLayer(),
  center: [43.6718599, -79.4587463], // the restaurant's latitude
  zoom: 16,
});

function runDirection(start, end) {
  let direction = MQ.routing.directions();

  direction.route({
    locations: [start, end],
  });

  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
      let custom_icon;
      let marker;

      custom_icon = L.icon({
        iconUrl: "images/restaurant.png",
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29],
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    },

    createEndMarker: (location) => {
      let custom_icon;
      let marker;

      custom_icon = L.icon({
        iconUrl: "images/user.png",
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29],
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    },
  });

  map.addLayer(
    new CustomRouteLayer({
      directions: direction,
      fitBounds: true,
    })
  );
}

runDirection(
  { street: "22 Yorkville Ave", city: "toronto", province: "on" },
  { street: "24 Bellair St", city: "toronto", province: "on" }
);

setTimeout(() => map.setZoom(16), 1000);
