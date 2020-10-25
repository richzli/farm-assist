const speedData = []
const speedChartElement = document.getElementById('speedChart');
const speedChart = new Chart(speedChartElement, {
    type: 'line',
    data: {
        labels: ['Time'],
        datasets: [
        {
					label: 'Combine Speed',
					data: speedData,
					borderColor: '#ffec4a',
					backgroundColor: 'rgba(0, 0, 0, 0)',
					fill: false,
					// cubicInterpolationMode: 'monotone'
				},]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
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
          // suggestedMin: -10,
					suggestedMax: 10
        }
      }
    }
});

