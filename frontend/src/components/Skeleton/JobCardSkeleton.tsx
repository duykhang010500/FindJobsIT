import { Skeleton } from '@mui/material';

import React from 'react';

type Props = {};

const JobCardSkeleton = (props: Props) => {
  return (
    <div>
      <Skeleton variant='circular' width={40} height={40} />
      <Skeleton variant='text' sx={{ fontSize: '1rem', mb: 1 }} />
      <Skeleton variant='rectangular' width='100%' height={60} sx={{ mb: 1 }} />
      <Skeleton variant='rounded' width='100%' height={60} />
    </div>
  );
};

export default JobCardSkeleton;
