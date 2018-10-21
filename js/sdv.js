      
function init() {
      var mapDiv;
      var map;
      var json;
      var m = {};

        start_(L, 'L');
        start_(WE, 'WE');

        function start_(API, suffix) {
            mapDiv = 'map' + suffix;
            map = API.map(mapDiv, {
            center: [51.505, -0.09],
            zoom: 4,
            dragging: true,
            scrollWheelZoom: true,
            sky: true
            //proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
          });
          m[suffix] = map;

          //Add baselayer
          API.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg',{
            minZoom: 0,
            maxZoom: 5,
            attribution: 'NASA',
            opacity: 1
          }).addTo(map);

          API.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'OpenStreetMap contributors',
            opacity: 0.35
          }).addTo(map);

          //Add TileJSON overlay
          /*var json = {"profile": "mercator", "name": "Grand Canyon USGS", "format": "jpg", "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831], "minzoom": 10, "version": "1.0.0", "maxzoom": 16, "center": [-112.18688965, 36.057944835, 13], "type": "overlay", "description": "", "basename": "nasa", "tilejson": "2.0.0", "sheme": "xyz", "tiles": ["http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg"]};
          if (API.tileLayerJSON) {
            var overlay2 = API.tileLayerJSON(json, map);
          } else {
            //If not able to display the overlay, at least move to the same location
            map.setView([json.center[1], json.center[0]], json.center[2]);
          }*/

          //Add simple marker
          /*var marker = API.marker([37.8, -1.26379395]).addTo(map);
          marker.bindPopup(suffix, 50);
          marker.openPopup();*/

          //Print coordinates of the mouse
          map.on('mousemove', function(e) {
            document.getElementById('coords').innerHTML = 'Lat:' + e.latlng.lat + ', Long:' + e.latlng.lng;
          });
        }

        //Synchronize view
        m['L'].on('move', function(e) {
          var center = m['L'].getCenter();
          var zoom = m['L'].getZoom();
          m['WE'].setView([center['lat'], center['lng']], zoom);
        });

function update() {
        objects = json.length;
        var l_markers = [];
        var we_markers = [];
        for(i=600;i<650;i++) {
            var html_string = "<b>Name: </b>" + json[i]["name"] + 
              "<br><b>Id:</b> " + json[i]["id"] + 
              "<br><b>Nametype:</b> " + json[i]["nametype"] +
              "<br><b>Recclass:</b> " + json[i]["recclass"] +
              "<br><b>Mass (Kg):</b> " + (json[i]["mass"] / 1000) +
              "<br><b>Fall:</b> " + json[i]["fall"] +
              "<br><b>Year:</b> " + json[i]["year"] +
              "<br><b>Latitude:</b> " + json[i]["reclat"] +
              "<br><b>Longitude:</b> " + json[i]["reclong"];
            l_markers[i] = L.marker([json[i]["reclat"], json[i]["reclong"]]).addTo(m['L']);
            l_markers[i].bindPopup(html_string, {maxWidth: 150, closeButton: true});
            we_markers[i] = WE.marker([json[i]["reclat"], json[i]["reclong"]]).addTo(m['WE']);
            we_markers[i].bindPopup(html_string, {maxWidth: 150, closeButton: true});
        }
    //var markerCustom = API.marker([37.8, -1.2], '/img/logo-webglearth-white-100.png', 25, 6).addTo(map);

}

$(document).ready(function(){

    $("button").click(function(){
        $.get("https://data.nasa.gov/resource/y77d-th95.json", function(data, status){
            //alert(status);
            json = data;
            update();
        });
    });
});

      }

      