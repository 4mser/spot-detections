import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexLineChart = ({ data, title }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      height: 350,  // Aumenta la altura total del gráfico para ajustar
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
        autoSelected: 'zoom'
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 1,
        blur: 3,
        opacity: 0.1
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['rgb(0,200,255)']
    },
    xaxis: {
      categories: ['-45°', '-30°', '-15°', '0°', '15°', '30°', '45°'],
      labels: {
        style: {
          colors: ['#000000', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
          fontSize: '10px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Average IQA',
        style: {
          color: '#000000'
        }
      },
      labels: {
        style: {
          colors: ['#000000'],
          fontSize: '10px'
        }
      }
    },
    grid: {
      borderColor: '#898fa3',
      strokeDashArray: 3
    },
    colors: ['rgb(0,200,255)']
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="line" height="240" />
  );
}

export default ApexLineChart;
