// initialize the map
var map = L.map('map').setView([42.35, -71.08], 13);

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