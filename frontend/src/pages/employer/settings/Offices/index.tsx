import React, { useState } from 'react';

import { Breadcrumbs, Stack, Link, Typography, Button } from '@mui/material';
import EmployerOfficesList from '../../../../sections/employer-dashboard/settings/offices/EmployerOfficesList';
import EmployerOfficesNewForm from '../../../../sections/employer-dashboard/settings/offices/EmployerOfficesNewForm';
import AddIcon from '@mui/icons-material/Add';
import { openModal } from '../../../../store/offices/actions';
import { useDispatch } from 'react-redux';

type Props = {};

const Offices = (props: Props) => {
  const dispatch = useDispatch();

  return (
    <Stack spacing={5}>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Link>Settings</Link>
        <Typography>Offices</Typography>
      </Breadcrumbs>
      <Stack direction='row'>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => dispatch(openModal())}
        >
          New office
        </Button>
      </Stack>
      <EmployerOfficesList />
      <EmployerOfficesNewForm />
    </Stack>
  );
};

export default Offices;
