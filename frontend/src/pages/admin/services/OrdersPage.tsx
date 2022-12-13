import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Breadcrumbs, Link, Card } from '@mui/material';
import OrdersList from '../../../sections/admin-dasboard/services-management/OrdersList';

type Props = {};

const OrdersPage = (props: Props) => {
  return (
    <>
      <Card
        sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block', mb: 2 }}
      >
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/admin/dashboard`}>
            Dashboard
          </Link>
          <Link component={RouterLink} to={`/admin/services/orders`}>
            Services
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Orders
          </Typography>
        </Breadcrumbs>
      </Card>
      <OrdersList />
    </>
  );
};

export default OrdersPage;
