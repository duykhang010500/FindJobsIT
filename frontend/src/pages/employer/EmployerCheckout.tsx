import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import queryString from 'qs';
import * as crypto from 'crypto';
import dateformat from 'dateformat';

import { publicIpv4 } from 'public-ip';

import {
  Link,
  Box,
  Card,
  Grid,
  Radio,
  Table,
  Stack,
  Collapse,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  FormLabel,
  Typography,
  RadioGroup,
  FormControl,
  Breadcrumbs,
  TableContainer,
  FormControlLabel,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import { AppState } from '../../store/reducer';
import { employerOrderServices } from '../../store/services/actions';

import { numberWithCommas } from '../../utils/format';
import { createPaymentURL } from '../../utils/vnpay';

type Props = {};

const EmployerCheckout = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<null | string>(null);

  const { cart, isLoading } = useSelector((state: AppState) => state.services);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [note, setNote] = useState<null | string>('');

  const handleChangePaymentMethod = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    const totalPrice = cart.reduce((curr: any, val: any) => {
      return curr + val.qty * val.price;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cart]);

  const handleOrder = () => {
    let newCart: any = [];

    cart.forEach((item: any) => {
      let service_id = item.id;
      let price = +item.price;
      let qty = item.qty;
      newCart.push({ service_id, price, qty });
    });

    if (paymentMethod === 'bankTransfer') {
      const formValues = { note, payment_type: 1, cart: newCart };
      dispatch(employerOrderServices(formValues, navigate));
    } else {
      const formValues = { note, payment_type: 2, cart: newCart };
      localStorage.setItem('checkout', JSON.stringify(formValues));

      const url = createPaymentURL(totalPrice);
      console.log(url);
      window.location.href = url;
    }
  };

  return (
    <>
      <Card sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block' }}>
        <Breadcrumbs
          sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
          separator='›'
          aria-label='breadcrumb'
        >
          <Link component={RouterLink} to={`/employer`}>
            Home
          </Link>
          <Link component={RouterLink} to={`/employer/services`}>
            Cart
          </Link>
          <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
            Checkout
          </Typography>
        </Breadcrumbs>
      </Card>
      {/* list */}
      <Card sx={{ p: 3, mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service name</TableCell>
                <TableCell align='right'>Unit price (VND)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align='right'>
                      {numberWithCommas(item.price)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '10px 10px',
            backgroundColor: '#e6f7ff',
            borderRadius: 1,
          }}
        >
          <Typography variant='h4' sx={{ color: '#555' }}>
            Total:
          </Typography>
          <Typography variant='h4' sx={{ color: '#ff4d4f', ml: 10 }}>
            {numberWithCommas(totalPrice)}
          </Typography>
        </Box>
      </Card>
      <Grid container spacing={3} sx={{ mt: 1.5 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4 }}>
            <TextField
              label='Note'
              multiline
              minRows={3}
              fullWidth
              onChange={(e) => setNote(e.target.value)}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <FormControl>
              <FormLabel>Payment method</FormLabel>
              <RadioGroup onChange={handleChangePaymentMethod}>
                <FormControlLabel
                  value='vnPay'
                  control={<Radio />}
                  label='VNPAY'
                />
                <FormControlLabel
                  value='bankTransfer'
                  control={<Radio />}
                  label='Bank transfer'
                />
                <Collapse in={paymentMethod === 'bankTransfer'}>
                  <Box sx={{ p: 1 }}>
                    <Typography gutterBottom component='div'>
                      <Typography fontWeight={500} component='span'>
                        Bank name:
                      </Typography>{' '}
                      Vietcombank
                    </Typography>
                    <Typography gutterBottom component='div'>
                      <Typography fontWeight={500} component='span'>
                        Bank number:
                      </Typography>{' '}
                      02381263786
                    </Typography>
                    <Typography gutterBottom component='div'>
                      <Typography fontWeight={500} component='span'>
                        Account name:
                      </Typography>{' '}
                      Find Job IT Company
                    </Typography>
                    <Typography gutterBottom component='div'>
                      <Typography fontWeight={500} component='span'>
                        Syntax:
                      </Typography>{' '}
                      CHECKOUT OrderID SERVICES
                    </Typography>
                  </Box>
                </Collapse>
              </RadioGroup>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Stack sx={{ mt: 3 }} direction='row' justifyContent={'center'}>
        <LoadingButton
          size='large'
          variant='contained'
          startIcon={<ShoppingCartCheckoutIcon />}
          loading={isLoading}
          disabled={!paymentMethod}
          onClick={handleOrder}
        >
          Order
        </LoadingButton>
      </Stack>
    </>
  );
};

export default EmployerCheckout;
