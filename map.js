// initialize the map
var map = L.map('map').setView([42.408276, -85.372824], 6);
var time = 0;
var markers = [];

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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


function getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2,units) {
    var earthRadius = 6371; // Radius of the earth in km
    var p = 0.017453292519943295;
    var dLat = p * (latitude2-latitude1); 
    var dLon = p * (longitude2-longitude1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(p * (latitude1)) * Math.cos(p * (latitude2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = earthRadius * c; 
    var miles = d / 1.609344; 
  
    if ( units == 'km' ) {  
        return d; 
    } else {
        return miles; 
    }
}

async function processFile() {
    time += 1;
    var file = document.querySelector('#input').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async function(event) {
        var curr = time;
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

        var latAvg = 0;
        var longAvg = 0;

        for (x of dat) {
            latAvg += x[0];
            longAvg += x[1];
        }
        
        latAvg /= dat.length;
        longAvg /= dat.length;

        markers.forEach(function(marker) {
            map.removeLayer(marker);
        });
        markers = [];

        var polyLine = L.polyline(dat, {color: 'red', weight: 1});
        map.addLayer(polyLine);
        markers.push(polyLine);

        var group = new L.featureGroup([polyLine]);
        map.fitBounds(group.getBounds());

<<<<<<< HEAD
        var animatedMarker = L.animatedMarker(dat, {icon:combineIcon});
        map.addLayer(animatedMarker);
        markers.push(animatedMarker);

        var sum = 0;
        var prevlat = 0;
        var prevlong = 0;
        var tt = 0;
        for (var i = rows.length - 1; i > 0 && time == curr; i--) {
            cols = rows[i].split(',');
            
            if (!isNaN(parseFloat(cols[2]))) {
                sum += parseFloat(cols[2]);
                document.getElementById("yield").textContent = Math.round(sum * 100)/100;
            }

            var lat = parseFloat(cols[1]);
            var long = parseFloat(cols[0]);
            tt += 1;

            if (!isNaN(lat) && !isNaN(long)) {
                if (prevlat != 0 && prevlong != 0) {
                    var speed = Math.round(getDistanceFromLatLonInKm(lat, long, prevlat, prevlong, "miles") / tt * 360000) / 100;
                    console.log(speed);
                    document.getElementById("speed").textContent = speed;
                    tt = 0;
                }
                prevlat = lat;
                prevlong = long;
            }

            await sleep(100);
        }

=======
        const combineIcon = L.icon({
            iconUrl:'combine.png',
            iconSize:[25,25],
            // iconAnchor:[50,50],
        });

        var animatedMarker = L.animatedMarker(dat, {icon: combineIcon});
	    map.addLayer(animatedMarker);
>>>>>>> 1caf83a76e7321eb787e0940bfabf62b3a474b42
    }
}
