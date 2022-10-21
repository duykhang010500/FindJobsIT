import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
type Props = {};

const JobRequirement = (props: Props) => {
  const { job } = useSelector((state: AppState) => state.jobs);
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

        <Typography variant='body2' component={'div'}>
          <div
            dangerouslySetInnerHTML={{ __html: `${job?.job_requirement}` }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobRequirement;
