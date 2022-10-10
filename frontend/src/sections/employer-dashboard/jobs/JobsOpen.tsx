import React from 'react';

import {
  Button,
  Checkbox,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

type Props = {};

const JobToolbarTable = () => {
  return <></>;
};

const JobTableHead = () => {
  return <></>;
};

const JobsOpen = (props: Props) => {
  return (
    <>
      <Button variant='contained' startIcon={<AddIcon />} sx={{ mb: 2 }}>
        Post a job
      </Button>
      <TableContainer>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell>
              <TableCell>Job title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Application(s)</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell>
              <TableCell>Siuu</TableCell>
              <TableCell>Siuu</TableCell>
              <TableCell>Siuu</TableCell>
              <TableCell>Siuu</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default JobsOpen;
