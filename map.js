// initialize the map
var map = L.map('map').setView([42.408276, -85.372824], 16);

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

        //move line by line
        for (var i = rows.length - 1; i > 0; i--) {
            //split by separator (,) and get the columns
            cols = rows[i].split(',');

            //move column by column
            for (var j = 0; j < cols.length; j++) {
                var value = cols[j];
            }
        }
    }
 }