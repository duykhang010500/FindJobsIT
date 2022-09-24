import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const JobDescription = () => {
  return (
    <Card
      sx={{
        border: `1px solid #f0f0f0`,
        '&:hover': {
          borderColor: '#ffd6e7',
          backgroundColor: '#fff0f6',
        },
        boxShadow: 'none',
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
