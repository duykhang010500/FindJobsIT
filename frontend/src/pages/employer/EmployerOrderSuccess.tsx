import React from 'react';

import { Alert, Typography, Divider, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

const EmployerOrderSuccess = (props: Props) => {
  const { id } = useParams();

  const navigate = useNavigate();

  return (
    <Alert severity='success' sx={{ maxWidth: '500px', margin: '100px auto' }}>
      <Typography variant='h4' gutterBottom>
        Order successfully!
      </Typography>
      <Typography variant='body1' gutterBottom>
        Order id: <span style={{ fontWeight: 600 }}>{id}</span>
      </Typography>
      <Typography>
        Thank you for purchasing FindJobIT services. Your order has been
        received and will be processed within 24 hours.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Button
        variant='contained'
        onClick={() => {
          navigate('/employer/hr/services/order');
        }}
      >
        View your order
      </Button>
    </Alert>
  );
};

export default EmployerOrderSuccess;
