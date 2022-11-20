import React from 'react';
import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type Props = {
  data?: any;
};

const StatisticsMap = ({ data }: Props) => {
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
        text: 'Candidates',
      },
    },
    title: {
      text: `Monthly applications in system, ${new Date().getFullYear()}`,
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
      name: 'Number of applications: ',
      data,
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

export default React.memo(StatisticsMap);
