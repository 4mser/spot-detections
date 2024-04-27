import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexRadarChart = ({ data, title }) => {
  // Considerar el caso de un solo dato
  const singleData = data.length === 1;
  const categories = singleData ? [title] : ['-45°', '-30°', '-15°', '0°', '15°', '30°', '45°'];

  const chartOptions = {
    chart: {
      type: 'radar',  
      toolbar: {
        show: true
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1
      }
    },
    xaxis: {
      categories: categories
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        formatter: (val) => val.toFixed(2)
      }
    },
    plotOptions: {
      radar: {
        size: 100,
        polygons: {
          strokeColors: '#e9e9e9',
          fill: {
            colors: ['#f8f8f8', '#fff']
          }
        }
      }
    },
    colors: ['rgb(180,230,130)'],
    markers: {
      size: 4,
      colors: ['#fff'],
      strokeColor: 'rgb(200,200,130)',
      strokeWidth: 2
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val.toFixed(2);
        }
      }
    },
    fill: {
      opacity: 0.4
    },
    stroke: {
      width: 2
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 180
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="radar" height="350"  />
  );
}

export default ApexRadarChart;
