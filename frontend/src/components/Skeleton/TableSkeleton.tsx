import React from 'react';

import { Skeleton, Stack, Box } from '@mui/material';

type Props = {};

const TableSkeleton = (props: Props) => {
  return (
    <Stack spacing={2}>
      {[...Array(3)].map((_, idx: number) => (
        <Skeleton
          key={idx}
          variant='rounded'
          width='100%'
          height={100}
          component='div'
        />
      ))}
    </Stack>
  );
};

export default TableSkeleton;
