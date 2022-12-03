import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Grid } from '@mui/material';
import CategoryCard from './CategoryCard';

import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';

type Props = {};

const popularIndustry = [
  {
    name: 'Cloud',
    icon: (
      <CloudQueueOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#91caff' }} />
    ),
    url: '',
  },
  {
    name: 'AI',
    icon: (
      <PsychologyOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#ffa940' }} />
    ),
    url: '',
  },
  {
    name: 'Software',
    icon: (
      <TerminalOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#b37feb' }} />
    ),
    url: '',
  },
  {
    name: 'Hardware',
    icon: <DeveloperBoardIcon sx={{ mr: 3, fontSize: 50, color: '#bae637' }} />,
    url: '',
  },
  {
    name: 'UI/UX Designer',
    icon: (
      <ColorLensOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#fadb14' }} />
    ),
    url: '',
  },
  {
    name: 'Game',
    icon: (
      <SportsEsportsOutlinedIcon
        sx={{ mr: 3, fontSize: 50, color: '#ff4d4f' }}
      />
    ),
    url: '/search',
  },
  {
    name: 'Testing',
    icon: (
      <FactCheckOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#36cfc9' }} />
    ),
    url: '/search',
  },
  {
    name: 'Security',
    icon: (
      <SecurityOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#597ef7' }} />
    ),
    url: '/search',
  },
];

const CategoriesList = (props: Props) => {
  return (
    <Box sx={{ marginTop: '50px' }}>
      <Grid container spacing={3}>
        {popularIndustry.map((item: any) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={item.name}>
              <CategoryCard icon={item.icon} name={item.name} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoriesList;
