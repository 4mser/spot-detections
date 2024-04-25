// components/ApexLineChart.js
import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexLineChart = ({ data, title }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: ['-45°', '-30°', '-15°', '0°', '15°', '30°', '45°'],
      labels: {
        style: {
          colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'], // Especifica blanco para cada etiqueta del eje X
          fontSize: '12px'
        }
      }
    },
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#ffffff' // Título en blanco
      }
    },
    yaxis: {
      title: {
        text: 'Average IQA',
        style: {
          color: '#ffffff' // Título del eje Y en blanco
        }
      },
      labels: {
        style: {
          colors: ['#ffffff'], // Etiquetas del eje Y en blanco
          fontSize: '12px'
        }
      }
    },
    colors: ['rgb(0,200,255)']  // Color de la línea
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="line" height="300" />
  );
}

export default ApexLineChart;
