import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Stack,
  Table,
  Card,
  Button,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
  Tooltip,
  Skeleton,
} from '@mui/material';
import { AppState } from '../../store/reducer';

import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { addToCart, removeItem } from '../../store/services/actions';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '../../utils/format';
import { toast } from 'react-toastify';

type ServicesListProps = {};

const ServicesList = (props: ServicesListProps) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, list, cart } = useSelector(
    (state: AppState) => state.services
  );

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const totalPrice = cart.reduce((acc: any, value: any) => {
      return acc + value.qty * value.price;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cart]);

  if (isLoading) {
    return (
      <Stack spacing={3} sx={{ mt: 3 }}>
        <Skeleton variant='rounded' width={'100%'} height={60} />
        <Skeleton variant='rounded' width={'100%'} height={60} />
        <Skeleton variant='rounded' width={'100%'} height={60} />
      </Stack>
    );
  }

  // const handleDecrease = (item: any) => {
  //   dispatch(decreaseItem(item));
  // };

  // const handleIncrease = (item: any) => {
  //   console.log(item);
  //   dispatch(increaseItem(item));
  // };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleRemove = (item: any) => {
    dispatch(removeItem(item));
  };

  // const getQuantity = (id: number) => {
  //   if (cart.length > 0) {
  //     const item = cart.find((item: any) => item.id === id);
  //     return item?.qty;
  //   }
  //   return 0;
  // };

  const serviceInCart = (id: any) => {
    const isExist = cart.findIndex((item: any) => item.id === id);
    if (isExist > -1) {
      return true;
    }
    return false;
  };

  return (
    <Card sx={{ p: 3, mt: 3 }}>
      <TableContainer>
        <Table>
          <TableHead
            sx={{
              backgroundColor: 'rgb(244, 246, 248)',
              color: 'rgb(99,115,129)',
              borderRadius: 8,
              '& .MuiTableHead-root': {
                borderRadius: '10px !important',
              },
            }}
          >
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='center'>Day(s)</TableCell>
              <TableCell align='right'>Unit price (VND)</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant='h4' gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#555' }}>
                    {item.note}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>{item?.days}</Typography>
                </TableCell>

                <TableCell align='right'>
                  {numberWithCommas(item.price)}
                </TableCell>
                <TableCell align='center'>
                  {serviceInCart(item.id) ? (
                    <Tooltip title='Delete' placement='top'>
                      <IconButton onClick={() => handleRemove(item)}>
                        <DeleteIcon sx={{ color: '#f5222d' }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Button
                      variant='contained'
                      color='info'
                      onClick={() => handleAddToCart(item)}
                    >
                      Add
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '10px 50px',
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
        <Button
          variant='contained'
          startIcon={<ShoppingBasketIcon />}
          sx={{ ml: 17 }}
          disabled={cart.length === 0}
          onClick={() => {
            if (localStorage.getItem('role') !== '2') {
              toast.error('Please login!');
            } else {
              navigate('/employer/services/checkout');
            }
          }}
        >
          Checkout
        </Button>
      </Box>
    </Card>
  );
};

export default ServicesList;
