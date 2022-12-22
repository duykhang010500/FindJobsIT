import React from 'react';

import { Box } from '@mui/material';

import ApexCharts from 'apexcharts';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

type Props = {};

const PieChart = (props: Props) => {
  const options: ApexOptions = {
    chart: {
      type: 'donut',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  const series = [44, 55, 41, 17, 15];
  return (
    <Box sx={{ p: 1 }}>
      <ReactApexChart type='pie' options={options} series={series} />
    </Box>
  );
};

export default PieChart;
