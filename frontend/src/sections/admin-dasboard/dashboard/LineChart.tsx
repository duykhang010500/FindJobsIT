import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';
import { ApexOptions } from 'apexcharts';
type Props = {};

const LineChart = (props: Props) => {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yaxis: {
      title: {
        text: 'Candidate (person)',
      },
    },
    title: {
      text: `Monthly application in system, ${new Date().getFullYear()}`,
      floating: true,
      offsetY: 0,
      align: 'center',
      style: {
        color: '#262626',
      },
    },
  };

  const series = [
    {
      name: 'Number of person: ',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 12, 11, 1],
    },
  ];
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <ReactApexChart type='line' options={options} series={series} />
    </Box>
  );
};

export default LineChart;
