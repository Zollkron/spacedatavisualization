var options = {atmosphere: true, center: [0, 0], zoom: 2.5, sky: true, tilting: true};
var earth;
var json;

function initialize() {  
        earth = new WE.map('earth_div', options);      
        WE.tileLayer('http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg', {
          minZoom: 0,
          maxZoom: 5,
          attribution: 'NASA',
          opacity: 1
        }).addTo(earth);
        WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
            attribution: 'OpenStreetMap contributors',
            opacity: 0.35
        }).addTo(earth);
}

function update() {
        objects = json.length;
        var markers = [];
        for(i=0;i<objects;i++) {
            markers[i] = WE.marker([json[i]["reclat"], json[i]["reclong"]]).addTo(earth);
            markers[i].bindPopup("<b>Name: </b>" + json[i]["name"] + 
            	"<br><b>Id:</b> " + json[i]["id"] + 
            	"<br><b>Nametype:</b> " + json[i]["nametype"] +
            	"<br><b>Recclass:</b> " + json[i]["recclass"] +
            	"<br><b>Mass (Kg):</b> " + (json[i]["mass"] / 1000) +
            	"<br><b>Fall:</b> " + json[i]["fall"] +
            	"<br><b>Year:</b> " + json[i]["year"] +
            	"<br><b>Latitude:</b> " + json[i]["reclat"] +
            	"<br><b>Longitude:</b> " + json[i]["reclong"]
            	, {maxWidth: 150, closeButton: true});
        }
    var markerCustom = WE.marker([37.8, -1.2], '/img/logo-webglearth-white-100.png', 25, 6).addTo(earth);

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
