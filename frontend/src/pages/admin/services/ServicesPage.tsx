import { Link as RouterLink } from 'react-router-dom';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { adminGetServicesList } from '../../../store/services/actions';
import ServicesList from '../../../sections/admin-dasboard/services-management/ServicesList';

type Props = {};

const ServicesPage = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetServicesList());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h3' gutterBottom>
        Services List
      </Typography>
      <Breadcrumbs>
        <Link component={RouterLink} to='/'>
          Dashboard
        </Link>
        <Typography>Services List</Typography>
      </Breadcrumbs>
      <ServicesList />
    </>
  );
};

export default ServicesPage;
