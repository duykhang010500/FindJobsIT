import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ServicesList from '../sections/services/ServicesList';
import { getListServicesEmployer } from '../store/services/actions';

type Props = {};

const Services = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListServicesEmployer());
  }, [dispatch]);
  return (
    <>
      <Breadcrumbs>
        <Link component={RouterLink} to='/employer'>
          {`Home`}
        </Link>
        <Typography>{`Services`}</Typography>
      </Breadcrumbs>
      <ServicesList />
    </>
  );
};

export default Services;
