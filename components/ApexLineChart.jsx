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
