import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const JobDescription = () => {
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
          voluptas quod perferendis perspiciatis asperiores distinctio similique
          rerum pariatur. Non rerum iste consequuntur explicabo, est incidunt
          voluptas aliquid autem animi, quaerat eveniet nulla laboriosam, qui
          veritatis. Officia velit vitae pariatur, incidunt laudantium ipsam
          ipsum, architecto animi explicabo, in fugit esse sed.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobDescription;
