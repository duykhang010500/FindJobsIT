import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';
import { ApexOptions } from 'apexcharts';
type Props = {
  data: any;
};

const LineChart = ({ data }: Props) => {
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
        text: 'Candidates (person)',
      },
    },
    title: {
      text: `Monthly application in website, ${new Date().getFullYear()}`,
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
      name: 'Candidates: ',
      data: data?.candidate_apply_by_month,
    },
  ];
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <ReactApexChart type='line' options={options} series={series} />
    </Box>
  );
};

export default LineChart;
