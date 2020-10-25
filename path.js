// initialize the map
var map = L.map('map').setView([42.408276, -85.372824], 17);

var rate = 0.0;

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

var clicks = [];
var polyLine = L.polyline(clicks, {color: 'red', weight: 3}).addTo(map);
var popup = L.popup();

var yieldData = [];
var yieldLabels = [];
var counter = 1;

function onMapClick(e) {
    clicks.push(e.latlng);
    polyLine.setLatLngs(clicks);
    polyLine.redraw();

    if (clicks.length > 1) {
        var temp = clicks[0];
        var dist = 0.000;
        for (var i = 1; i < clicks.length; i++) {
            dist += temp.distanceTo(clicks[i]);
        }
        yieldData.push(dist * rate);
        yieldLabels.push(counter);
        counter += 1;
        document.getElementById("yield").textContent = dist * rate;
        document.getElementById("dist").textContent = dist;
        yieldChart.update();
        console.log(yieldLabels);
    }
}

var ctx = document.getElementById('yieldChart').getContext('2d');
var yieldChart = new Chart(ctx, {
    type: 'line',
    labels: yieldLabels,
    data: {
        datasets: [{
            label: '# of Votes',
            data: yieldData,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

map.on('click', onMapClick);

var time = 0;

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

        var rateDat = [];

        //move line by line
        for (var i = rows.length - 1; i > 0; i--) {
            //split by separator (,) and get the columns
            cols = rows[i].split(',');

            //alert(cols[2] + " " + cols[5]);

            var pound = parseFloat(cols[2]);
            var moved = parseFloat(cols[5]);
            
            //alert(lat, long);

            if (!isNaN(pound) && !isNaN(moved)) {
                rateDat.push([pound, moved]);
                //var marker = L.marker([lat, long]).addTo(map);
            }
        }

        var rateAvg = 0.0;

        for (x of rateDat) {
            rateAvg += x[0] / ((x[1] + 1) * 0.0254);
        }

        rateAvg /= rateDat.length;

        rate = rateAvg;

        alert(rate);
    }
}