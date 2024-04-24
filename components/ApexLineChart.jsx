// components/ApexLineChart.js
import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexLineChart = ({ data, title, lineColor = '#ff4560' }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true
      }
    },
    colors: [lineColor], // Configura el color de la línea aquí
    stroke: {
      curve: 'smooth',
      width: 3, // Puedes ajustar el grosor de la línea aquí
      colors: [lineColor] // Esto asegura que el color de la línea sea el que definas
    },
    xaxis: {
      categories: ['-45°', '-30°', '-15°', '0°', '15°', '30°', '45°']
    },
    title: {
      text: title,
      align: 'left'
    },
    yaxis: {
      title: {
        text: 'Average IQA'
      }
    }
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="line" height="350" />
  );
}

export default ApexLineChart;
