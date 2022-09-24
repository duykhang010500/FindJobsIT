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
        <Typography variant='h3'>Description</Typography>

        <p>Lorem ipsum dolor sit amet.</p>
      </CardContent>
    </Card>
  );
};

export default JobRequirement;
