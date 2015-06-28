// Version using Leaflet http://leafletjs.com/

// FIXME: Integrate above code into the code below to make a Leaflet version

var CLSMap = (function() {
  return {
    initialize: function() {
      var map = L.map('map-canvas').setView([43.130, -77.602], 3);

      // add an OpenStreetMap tile layer
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var jqxhr = $.getJSON('people.json', function() {
        })
        .done(function(data) {
          console.log('Success loading JSON file!');
          var markers = new L.MarkerClusterGroup({disableClusteringAtZoom: 12,
             maxClusterRadius: 20});
          var addJitter = function() {
              // Some points may overlap, so add a random amount in the +/- one
              //second range to jitter them
              var second = 1 / 3600;
              return Math.random() * (0 - second) + second;
            };
          $.each(data, function(idx, person) {
            if (person.lat !== null && person.long !== null) {
              var position = person.position.split(',').join('<br/>');

              var label_content = '<span class="name">' + person.firstname +
                                  ' ' + person.lastname + '</span><br/>' +
                                  '<span class="position">' + position +
                                  '</span>';

              markers.addLayer(new L.marker([person.lat + addJitter(),
                        person.long + addJitter()])
                    .addTo(map)
                    .bindPopup(label_content));
                    //.openPopup();
            } else {
              //console.log('No lat/long info for ' + person.name);
            }
          });
          map.addLayer(markers);
        })
        .fail(function() {
          console.log('Error loading JSON file!');
        })
        .always(function() {
          console.log('Completed loading of JSON file');
        });
    }
  };
})();
