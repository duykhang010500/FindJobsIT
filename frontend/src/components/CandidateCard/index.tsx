import React from 'react';

import { Link } from 'react-router-dom';

import { Card, Stack, Avatar, Typography, Skeleton } from '@mui/material';

type Props = {
  candidate: any;
};

const CandidateCard = ({ candidate }: Props) => {
  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Stack direction='row' spacing={2}>
        <Avatar sx={{ width: 80, height: 80 }} />
        <Stack>
          <Typography
            variant='h4'
            gutterBottom
            sx={{
              color: '#ff4d4f',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            component={Link}
            to='/'
          >
            {candidate?.member?.fullname}
          </Typography>
          <Typography variant='h5' sx={{ color: '#096dd9' }}>
            {candidate?.resume_title}
          </Typography>
          <div>
            <Typography variant='caption'>Working at: </Typography>
            <Typography variant='caption' fontWeight={500}>
              {candidate?.locations?.map((item: any, inx: number) => {
                if (inx === 0) {
                  return <>{item.name}</>;
                } else {
                  return <>, {item.name}</>;
                }
              })}
            </Typography>
          </div>
          <div>
            <Typography variant='caption'>Salary: &nbsp;</Typography>
            <Typography variant='caption' fontWeight={500}>
              {candidate?.salary_unit != 'Negotiate' ? (
                <>
                  {candidate?.salary_from} - {candidate?.salary_to}{' '}
                  {candidate?.salary_unit}
                </>
              ) : (
                <>Negotiate</>
              )}
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CandidateCard;
