const speedData = []
const speedLabels = []
const speedChartElement = document.getElementById('speedChart');

const recentSpeedData = []
const recentSpeedLabels = []
const recentSpeedChartElement = document.getElementById('recentSpeedChart');

var radarData = []
var radarLabels = []
//const radarChartElement = document.getElementById('radarChart');

const kylecolors = {
  red:'#FF6384',
  blue:'#36A2EB',
  yellow:'#ffcd56'
}
const speedChart = new Chart(speedChartElement, {
    type: 'line',
    data: {
        labels: speedLabels,
        datasets: [
        {
					label: 'Combine Speed',
					data: speedData,
					borderColor: kylecolors.red,
					backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
					// cubicInterpolationMode: 'monotone'
				},]
    },
    options: {
      legend:{
        display:false,
      },
      responsive: true,
      title: {
        display: true,
        text: 'Total Speed'
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
        },
        yAxes: [{
          ticks: {
              beginAtZero:true,
          }
      }]
      }
    }
});
const recentSpeedChart = new Chart(recentSpeedChartElement, {
    type: 'line',
    data: {
        labels: recentSpeedLabels,
        datasets: [
        {
					label: 'Combine Speed',
					data: recentSpeedData,
					borderColor: kylecolors.blue,
					backgroundColor: 'rgba(0, 0, 0, 0)',
          fill: false,
          
					// cubicInterpolationMode: 'monotone'
				},]
    },
    options: {
      legend:{
        display:false,
      },
      responsive: true,
      title: {
        display: true,
        text: 'Recent Speed'
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        },
        y: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          },
        },
        yAxes: [{
          ticks: {
              beginAtZero:true,
          }
      }]
      }
    }
});

const radarChart = new Chart(radarChartElement, {
  type: 'radar',
  data: radarData,
  labels: radarLabels
});