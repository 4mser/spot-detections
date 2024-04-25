import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexLineChart = ({ data, title }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 1,
        blur: 3,
        opacity: 0.1 // Ajusta para más o menos sombra
      }
    },
    stroke: {
      curve: 'smooth', // Cambia de 'straight' a 'smooth' para suavizar la línea
      width: 2, // Grosor más delgado de la línea (ajusta según necesidades)
      colors: ['rgb(0,200,255)']
    },
    xaxis: {
      categories: ['-45°', '-30°', '-15°', '0°', '15°', '30°', '45°'],
      labels: {
        style: {
          colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
          fontSize: '12px'
        }
      }
    },
    title: {
      text: title,
      align: 'left',
      style: {
        color: '#ffffff'
      }
    },
    yaxis: {
      title: {
        text: 'Average IQA',
        style: {
          color: '#ffffff'
        }
      },
      labels: {
        style: {
          colors: ['#ffffff'],
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#898fa3', // Ajusta el color a uno que complemente tu diseño
      strokeDashArray: 3 // Líneas punteadas en la cuadrícula para un look más suave
    },
    colors: ['rgb(0,200,255)']
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
