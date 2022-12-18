import React from 'react';

import { TableRow, Skeleton, TableCell } from '@mui/material';

type Props = {};

const TableRowSkeleton = (props: Props) => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={5}>
          <Skeleton height={'100%'} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Skeleton height={'100%'} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Skeleton height={'100%'} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Skeleton height={'100%'} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowSkeleton;
