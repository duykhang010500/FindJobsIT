import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import OrdersList from '../../../sections/admin-dasboard/services-management/OrdersList';

type Props = {};

const OrdersPage = (props: Props) => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Orders
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link component={RouterLink} to={`/admin/dashboard`}>
          Dashboard
        </Link>
        <Typography>Services Management</Typography>
        <Typography>Orders</Typography>
      </Breadcrumbs>
      <OrdersList />
    </>
  );
};

export default OrdersPage;
