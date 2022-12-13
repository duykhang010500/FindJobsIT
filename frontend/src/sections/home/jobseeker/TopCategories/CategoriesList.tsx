import React from 'react';
import { Link } from 'react-router-dom';
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
    url: '/search?industryIds=5',
  },
  {
    name: 'AI',
    icon: (
      <PsychologyOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#ffa940' }} />
    ),
    url: '/search?industryIds=6',
  },
  {
    name: 'Software',
    icon: (
      <TerminalOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#b37feb' }} />
    ),
    url: '/search?industryIds=7',
  },
  {
    name: 'Hardware',
    icon: <DeveloperBoardIcon sx={{ mr: 3, fontSize: 50, color: '#bae637' }} />,
    url: '/search?industryIds=8',
  },
  {
    name: 'UI/UX Designer',
    icon: (
      <ColorLensOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#fadb14' }} />
    ),
    url: '/search?industryIds=9',
  },
  {
    name: 'Game',
    icon: (
      <SportsEsportsOutlinedIcon
        sx={{ mr: 3, fontSize: 50, color: '#ff4d4f' }}
      />
    ),
    url: '/search?industryIds=10',
  },
  {
    name: 'Testing',
    icon: (
      <FactCheckOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#36cfc9' }} />
    ),
    url: '/search?industryIds=11',
  },
  {
    name: 'Security',
    icon: (
      <SecurityOutlinedIcon sx={{ mr: 3, fontSize: 50, color: '#597ef7' }} />
    ),
    url: '/search?industryIds=12',
  },
];

const CategoriesList = (props: Props) => {
  return (
    <Box sx={{ marginTop: '50px' }}>
      <Grid container spacing={3}>
        {popularIndustry.map((item: any) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={item.name}>
              <Link to={`${item.url}`} style={{ textDecoration: 'none' }}>
                <CategoryCard icon={item.icon} name={item.name} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CategoriesList;
