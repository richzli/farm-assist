// initialize the map
var map = L.map('map').setView([42.408276, -85.372824], 6);

// load a tile layer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoicHJhbmFuZGFyYW8iLCJhIjoiY2tnbnR2YWR5MDVoYTJ5cXk4azhyZnlsNSJ9.5f4PYrU5R87SUGmkb3VDkQ', 
    center: [42.408276, -85.372824]
}).addTo(map);

 function processFile() {
    var file = document.querySelector('#input').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        var data = event.target.result;

        document.getElementById("data").innerText = data;

        var rows = data.split('\n');

        var dat = [];

        //move line by line
        for (var i = rows.length - 1; i > 0; i--) {
            //split by separator (,) and get the columns
            cols = rows[i].split(',');

            var lat = parseFloat(cols[1]);
            var long = parseFloat(cols[0]);

            
            //alert(lat, long);

            if (!isNaN(lat) && !isNaN(long)) {
                dat.push([lat, long]);
                //var marker = L.marker([lat, long]).addTo(map);
            }
            
            //move column by column
            for (var j = 0; j < cols.length; j++) {
                var value = cols[j];
            }
        }

        alert(dat.length);

        var latAvg = 0;
        var longAvg = 0;

        for (x of dat) {
            latAvg += x[0];
            longAvg += x[1];
        }
        
        latAvg /= dat.length;
        longAvg /= dat.length;

        //markers.clearLayers();

        var polyLine = L.polyline(dat, {color: 'red', weight: 1}).addTo(map);

        var group = new L.featureGroup([polyLine]);
        map.fitBounds(group.getBounds());

        var animatedMarker = L.animatedMarker(dat, data);
	    map.addLayer(animatedMarker);
    }
 }