import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexLineChart2 = ({ data, title }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true
      }
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      labels: {
        style: {
          colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
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
          colors: ['#ffffff'], // Todas las etiquetas del eje Y en blanco
          fontSize: '12px'
        }
      }
    },
    colors: ['rgb(239,68,68)']  // Color de la línea
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="line" height="300" />
  );
}

export default ApexLineChart2;
