// MarkerWithLabel and MarkerClusterer from:
// https://code.google.com/p/google-maps-utility-library-v3/

var CLSMap = (function() {
  return {
    initialize: function() {
      var mapOptions = {
        center: { lat: 43.130, lng: -77.602},
        zoom: 3
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

      // google.maps.event.addListener(map, 'zoom_changed', function() {
      //   console.log('Zoom: ' + map.getZoom());
      // });
      
      var jqxhr = $.getJSON('people.json', function() {
        })
        .done(function(data) {
          console.log('Success loading JSON file!');
          var markers = [];
          var addJitter = function() {
              // Some points may overlap, so add a random amount in the +/- one
              //second range to jitter them
              var second = 1 / 3600;
              return Math.random() * (0 - second) + second;
            };
          $.each(data, function(idx, person) {
            if (person.lat !== null && person.long !== null) {
              var myLatlng = new google.maps.LatLng(person.lat + addJitter(),
                                                    person.long + addJitter());
              //console.log('Creating a marker for ' + person.name +
              //              ' at ' + myLatlng.toString());

              var position = person.position.split(',').join('<br/>');

              var marker = new MarkerWithLabel({
                position: myLatlng,
                draggable: true,
                map: map,
                labelContent: '<span class="name">' + person.firstname + ' ' +
                              person.lastname + '</span><br/>' +
                              '<span class="position">' + position + '</span>',
                // 75 is half the width of the label
                labelAnchor: new google.maps.Point(75, 0),
                labelClass: 'labels', // the CSS class for the label
                labelStyle: {opacity: 0.75}
              });

              markers.push(marker);
            } else {
              //console.log('No lat/long info for ' + person.name);
            }
          });
          var markerCluster = new MarkerClusterer(map, markers, {maxZoom: 12});
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
