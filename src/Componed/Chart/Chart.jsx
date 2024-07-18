import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);



useEffect(() => {
  if (chartRef.current) {
    const chartInstance = new ChartJS(chartRef.current, {
      type: 'bar',
      data: {
        labels: data.length > 0 ? data[0].data.map((customer) => customer.label) : [],
        datasets: [
          {
            label: 'Total Transaction Amount',
            data: data.length > 0 ? data[0].data.map((customer) => customer.value) : [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Transaction Amounts by Customer',
          },
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Customer',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}, [data]);

function Chart({ data }) {
  const chartRef = useRef(null);


  return <canvas ref={chartRef} className="chart" />;
}

export default Chart;
