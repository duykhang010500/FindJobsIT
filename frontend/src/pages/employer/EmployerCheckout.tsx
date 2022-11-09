import React, { useEffect, useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Breadcrumbs,
  Link,
  Typography,
  TableRow,
  TableCell,
  Box,
  Button,
  TextField,
  Card,
  Grid,
  Stack,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { numberWithCommas } from '../../utils/format';

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useDispatch } from 'react-redux';
import { employerOrderServices } from '../../store/services/actions';

type Props = {};

const EmployerCheckout = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { cart, isLoading } = useSelector((state: AppState) => state.services);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [note, setNote] = useState<null | string>('');

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

    const formValues = { note, payment_type: 1, cart: newCart };

    dispatch(employerOrderServices(formValues, navigate));
  };

  return (
    <>
      <Breadcrumbs>
        <Link component={RouterLink} to='/employer'>
          Home
        </Link>
        <Link component={RouterLink} to='/employer/services'>
          Cart
        </Link>
        <Typography>Checkout</Typography>
      </Breadcrumbs>
      {/* list */}
      <Card sx={{ p: 3, mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service name</TableCell>
                {/* <TableCell align='center'>Quantity</TableCell> */}
                <TableCell align='right'>Unit price (VND)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    {/* <TableCell align='center'>{item.qty}</TableCell> */}
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
            // pr: 20,
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
          <Card sx={{ p: 3 }}>
            <TextField
              label='Note'
              multiline
              minRows={7}
              fullWidth
              onChange={(e) => setNote(e.target.value)}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <FormControl>
              <FormLabel>Payment method</FormLabel>
              <RadioGroup defaultValue='1'>
                <FormControlLabel
                  value='1'
                  control={<Radio />}
                  label='Payment vie bank transfer'
                />
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
              </RadioGroup>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Stack sx={{ mt: 3 }} direction='row' justifyContent={'center'}>
        <LoadingButton
          variant='contained'
          size='large'
          startIcon={<ShoppingCartCheckoutIcon />}
          onClick={() => handleOrder()}
          loading={isLoading}
        >
          Order
        </LoadingButton>
      </Stack>
    </>
  );
};

export default EmployerCheckout;
