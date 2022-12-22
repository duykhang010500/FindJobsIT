import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';

import { styled, Alert, Box, Typography, Stack } from '@mui/material';

import { numberWithCommas } from '../../utils/format';

import { employerOrderServices } from '../../store/services/actions';

type Props = {};

const Wrapper = styled(Box)({
  maxWidth: '500px',
  margin: '100px auto',
});

const PaymentSuccess = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const transactionID = urlParams.get('vnp_BankTranNo');

  const price = urlParams.get('vnp_Amount');

  useEffect(() => {
    const checkout: any = localStorage.getItem('checkout');

    let formValues = JSON.parse(checkout);

    formValues = { ...formValues, payment_type: `VNPAY - ${transactionID}` };

    dispatch(employerOrderServices(formValues, navigate));
  }, [dispatch, navigate, transactionID]);

  return (
    <Wrapper>
      <Alert severity='success'>
        <Stack spacing={2}>
          <Typography variant='h5'>Payment with VNPAY successfully!</Typography>
          <Typography variant='body1'>
            Transaction id: {transactionID}
          </Typography>
          <Typography variant='body1'>
            Amount: {numberWithCommas(Number(price) / 100)}
          </Typography>
          <LoadingButton
            variant='contained'
            startIcon={<></>}
            loading
            loadingPosition='start'
          >
            Your order is processing!
          </LoadingButton>
        </Stack>
      </Alert>
    </Wrapper>
  );
};

export default PaymentSuccess;
