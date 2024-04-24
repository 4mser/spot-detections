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
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    title: {
      text: title,
      align: 'left'
    },
    yaxis: {
      title: {
        text: 'Average IQA'
      }
    },
    colors: ['rgb(239,68,68)']  // Setting the line color
  };

  const series = [{
    name: 'IQA Value',
    data
  }];

  return (
    <ApexCharts options={chartOptions} series={series} type="line" height="350" />
  );
}

export default ApexLineChart2;

// import React from 'react';
// import ApexCharts from 'react-apexcharts';

// const ApexLineChart2 = ({ data, title }) => {
//   const chartOptions = {
//     chart: {
//       type: 'radar',  // Cambiado de 'line' a 'radar'
//       toolbar: {
//         show: true
//       },
//       dropShadow: {
//         enabled: true,
//         blur: 3,
//         left: 1,
//         top: 1
//       }
//     },
//     xaxis: {
//       categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
//     },
//     title: {
//       text: title,
//       align: 'left'
//     },
//     yaxis: {
//       tickAmount: 5,
//       labels: {
//         formatter: (val) => { return val.toFixed(2); } // Formatear los valores a dos decimales
//       }
//     },
//     plotOptions: {
//       radar: {
//         size: 140,
//         polygons: {
//           strokeColors: '#e9e9e9',
//           fill: {
//             colors: ['#f8f8f8', '#fff']
//           }
//         }
//       }
//     },
//     colors: ['rgb(239,68,68)'],  // Color de la línea
//     markers: {
//       size: 4,
//       colors: ['#fff'],
//       strokeColor: 'rgb(239,68,68)',
//       strokeWidth: 2
//     },
//     tooltip: {
//       y: {
//         formatter: function(val) {
//           return val.toFixed(2);
//         }
//       }
//     },
//     fill: {
//       opacity: 0.7
//     },
//     stroke: {
//       width: 2
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200
//         },
//         legend: {
//           position: 'bottom'
//         }
//       }
//     }]
//   };

//   const series = [{
//     name: 'IQA Value',
//     data
//   }];

//   return (
//     <ApexCharts options={chartOptions} series={series} type="radar" height="350" />
//   );
// }

// export default ApexLineChart2;
