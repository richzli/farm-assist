// initialize the map
// I think zoom controls are nice to have
// {zoomControl:false, scrollWheelZoom: false}
var map = L.map('map', {scrollWheelZoom:false}).setView([42.408276, -85.372824], 6);
var time = 0;
var markers = [];

var intervals = [1000, 100, 50, 20, 10, 5];
var intervalsText = ['Realtime', '10x', '20x', '50x', '100x', '200x'];
var runInterval = intervals[1];

const combineSrc = ["combine.png", "combineb.png", "combiney.png"]
const colors = ["Red, Blue, Yellow"]
let color = colors[0]
let colorIndex = 0;

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

function changeColor (index) {
    color = colors[index]
    document.getElementById("combineImage").src = combineSrc[index];
    colorIndex = index;
}
function changeSpeed(index) {
    runInterval = intervals[index];
    document.getElementById("selectedSpeed").innerHTML = intervalsText[index];
}

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


const UPPER_OUTLIER_LIMIT = 16;
let chartUpdate = 0;

async function processFile() {
    time += 1;
    var spddd = runInterval;
    let delayBetweenChartUpdate = 4 * spddd;

    var file = document.querySelector('#input').files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async function(event) {
        var curr = time;
        var data = event.target.result;

        var rows = data.split('\n');

        var dat = [];

        //move line by line
        for (var i = rows.length - 1; i > 0; i--) {
            //split by separator (,) and get the columns
            cols = rows[i].split(',');

            var lat = parseFloat(cols[1]);
            var long = parseFloat(cols[0]);
            var flow = parseFloat(cols[2]);
            var distance = parseFloat(cols[5]);
            var elevation = parseFloat(cols[14]);

            radarData = [lat, long, flow, distance, elevation];
            radarLabels = ['latitude', 'longitude', 'flow', 'distance', 'elevation'];
            //alert(lat, long);

            if (!isNaN(lat) && !isNaN(long)) {
                dat.push([lat, long]);
            }
        }

        markers.forEach(function(marker) {
            map.removeLayer(marker);
        });
        markers = [];

        var polyLine = L.polyline(dat, {color: 'red', weight: 1});
        map.addLayer(polyLine);
        markers.push(polyLine);

        var group = new L.featureGroup([polyLine]);
        map.fitBounds(group.getBounds());

        const combineIcon = L.icon({
            iconUrl:combineSrc[colorIndex],
            iconSize:[25,25],
            // iconAnchor:[50,50],
        });
        var animatedMarker = L.animatedMarker(dat, {icon:combineIcon, interval: runInterval});
        map.addLayer(animatedMarker);
        markers.push(animatedMarker);

        var sum = 0;
        var prevlat = 0;
        var prevlong = 0;
        var tt = 0;
        for (var i = rows.length - 1; i > 0 && time == curr; i--) {
            cols = rows[i].split(',');

            var lat = parseFloat(cols[1]);
            var long = parseFloat(cols[0]);
            var flow = parseFloat(cols[2]);
            var distance = parseFloat(cols[5]);
            var elevation = parseFloat(cols[14]);

            radarData = [lat, long, flow, distance, elevation];
            radarLabels = ['latitude', 'longitude', 'flow', 'distance', 'elevation'];
            radarChart.update();
            
            chartUpdate -= spddd;

            // yield
            if (!isNaN(parseFloat(cols[2]))) {
                sum += parseFloat(cols[2]);
                document.getElementById("yield").textContent = Math.round(sum * 100)/100;
                document.getElementById("avg-yield").textContent = Math.round(sum * 100 / (rows.length - i)) / 100;

                if (chartUpdate <= 0) {
                    yieldData.push(speed);
                    // TODO 20 hardcoded recent value
                    if (yieldData.length > 20) {
                        yieldData.shift();
                    }
                }
            }

            // speed and position
            var lat = parseFloat(cols[1]);
            var long = parseFloat(cols[0]);
            tt += 1;

            if (!isNaN(lat) && !isNaN(long)) {
                document.getElementById("lat").textContent = Math.abs(lat).toString() + (lat >= 0 ? "°N": "°S");
                document.getElementById("long").textContent = Math.abs(long).toString() + (long >= 0 ? "°E": "°W");
                if (prevlat != 0 && prevlong != 0) {
                    var speed = Math.round(getDistanceFromLatLonInKm(lat, long, prevlat, prevlong, "miles") / tt * 360000) / 100;
                    
                    if (chartUpdate <= 0 && speed < UPPER_OUTLIER_LIMIT) {
                        speedData.push(speed);
                        recentSpeedData.push(speed);

                        // TODO 20 hardcoded recent value
                        if (recentSpeedData.length > 20) {
                            recentSpeedData.shift();
                            recentSpeedLabels.shift();
                        }
    
                        if (speedLabels.length == 0) {
                            speedLabels.push(0)
                            recentSpeedLabels.push(0)
                        } else{
                            let newTime = (parseFloat(speedLabels[speedLabels.length-1]) + spddd/1000)
                            speedLabels.push(newTime.toFixed(2))
                            recentSpeedLabels.push(newTime.toFixed(2))
                        }
                        chartUpdate = delayBetweenChartUpdate;
                        speedChart.update();
                        recentSpeedChart.update();
                    }
                    // console.log(speedChart.data)


                    

                    document.getElementById("speed").textContent = speed;
                    tt = 0;
                }
                prevlat = lat;
                prevlong = long;
            }

            await sleep(spddd);
        }

    }
}
