import React from 'react';
import { Card, styled, Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  icon: React.ReactNode;
  color: string;
  count: number;
};

const CardWrapper = styled(Card)({
  padding: '25px',
});

const IconWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '65px',
  height: '65px',
  borderRadius: '8px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    borderRadius: 'inherit',
    backgroundColor: 'currentColor',
  },
});

const StatisticCard = (props: Props) => {
  return (
    <CardWrapper>
      <Stack direction='row' spacing={2} alignItems='center'>
        <IconWrapper
          sx={{
            color: props.color,
          }}
        >
          {props.icon}
        </IconWrapper>
        <Stack>
          <Typography variant='subtitle1' sx={{ color: 'rgb(33, 43, 54)' }}>
            {props.title}
          </Typography>
          <Typography variant='h1' sx={{ color: 'rgb(33, 43, 54)' }}>
            {props.count}
          </Typography>
        </Stack>
      </Stack>
    </CardWrapper>
  );
};

export default StatisticCard;
