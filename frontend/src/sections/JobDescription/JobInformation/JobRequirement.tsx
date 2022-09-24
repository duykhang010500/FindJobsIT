import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
type Props = {};

const JobRequirement = (props: Props) => {
  return (
    <Card
      sx={{
        boxShadow:
          'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      }}
    >
      <CardContent>
        <Typography variant='h3' gutterBottom>
          Description
        </Typography>

        <Typography variant='body2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          voluptatem non, nisi debitis veniam accusamus maxime earum! Minima
          tempora accusamus velit voluptatibus iure, quidem fuga architecto
          molestiae, minus deleniti reiciendis dolor nulla expedita repudiandae
          officiis et? Exercitationem obcaecati, amet optio dolore non
          asperiores provident autem architecto tempora quo, corrupti atque!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobRequirement;
