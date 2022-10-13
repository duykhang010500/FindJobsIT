import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Table,
  Button,
  Collapse,
  Checkbox,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
} from '@mui/material';

import JobMoreMenu from '../../../sections/employer-dashboard/jobs/JobMoreMenu';

import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import JobFilter from '../../../sections/employer-dashboard/jobs/JobFilter';

type Props = {};

const JobToolbarTable = () => {
  return <></>;
};

const JobTableHead = () => {
  return <></>;
};

const EmployerJobsOpen = (props: Props) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleEdit = (id?: string) => {
    navigate(`/employer/hr/jobs/${id}`);
  };
  const handleDelete = () => {};
  const handleViewApplications = () => {};
  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Button
          component={Link}
          to={`/employer/hr/job/create`}
          variant='contained'
          startIcon={<AddIcon />}
        >
          Post a job
        </Button>
        <Button
          variant='contained'
          color='info'
          startIcon={<FilterAltIcon />}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </Button>
      </Stack>
      <Collapse in={showFilter}>
        <JobFilter />
      </Collapse>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell padding='checkbox'>
                <Checkbox />
              </TableCell>
              <TableCell>Front-End Web Developer</TableCell>
              <TableCell>22/12/2022</TableCell>
              <TableCell align='center'>0</TableCell>
              <TableCell align='center'>0</TableCell>
              <TableCell>
                <JobMoreMenu
                  onEdit={() => handleEdit()}
                  onDelete={() => handleDelete()}
                  onViewApplications={() => handleViewApplications()}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EmployerJobsOpen;
