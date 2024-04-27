import React from 'react';
import ApexCharts from 'react-apexcharts';

const ApexLineChart2 = ({ data, title }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.1 // Añade una sombra suave para mejorar el contraste
      }
    },
    stroke: {
      curve: 'smooth', // Suaviza la línea
      width: 3, // Hace la línea más delgada
      colors: ['rgb(239,68,68)']
    },
    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      labels: {
        style: {
          colors: ['#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'],
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
      borderColor: '#40475D', // Cambia el color para mejorar la visibilidad
      strokeDashArray: 3 // Líneas punteadas para una apariencia menos rígida
    },
    colors: ['rgb(239,68,68)'] // Mantén el color rojo personalizado
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="line" height="270" />
  );
}

export default ApexLineChart2;
