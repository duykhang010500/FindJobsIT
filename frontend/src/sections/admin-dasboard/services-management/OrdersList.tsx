import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Stack,
  Button,
  Card,
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import {
  adminGetOrderedServices,
  adminUpdateOrderedServicesStatus,
} from '../../../store/services/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { getStatusOrder } from '../../../utils/convert';
import { Visibility } from '@mui/icons-material';
import { numberWithCommas } from '../../../utils/format';

type Props = {};

const OrdersList = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [selectedOrder, setSelectedOrder] = useState<null | any>(null);

  const { orderList, isLoading } = useSelector(
    (state: AppState) => state.services
  );

  useEffect(() => {
    dispatch(adminGetOrderedServices());
  }, [dispatch]);

  // if (isLoading) {
  //   return null;
  // }

  return (
    <>
      <Card sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>OrderID</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Company name</TableCell>
                <TableCell align='right'>Total price</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList?.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>
                      {dayjs(item.created_at).format('DD/MM/YYYY')}

                      {/* {item.created_at} */}
                    </TableCell>
                    <TableCell>{item.company.name}</TableCell>
                    <TableCell align='right'>
                      {numberWithCommas(item.total)}
                    </TableCell>
                    <TableCell align='center'>
                      {getStatusOrder(item.status)}
                    </TableCell>
                    <TableCell>
                      <Tooltip placement='top' title='View detail'>
                        <IconButton
                          onClick={() => {
                            setSelectedOrder(item);
                            setOpen(true);
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component='div'
          count={100}
          rowsPerPage={20}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Card>

      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>OrderID: </span>
            {selectedOrder?.code}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Created at: </span>

            {dayjs(selectedOrder?.created_at).format('DD/MM/YYYY')}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Company name: </span>
            {selectedOrder?.company?.name}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Payment method: </span>
            Bank transfer
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Note: </span>

            {selectedOrder?.note}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <span style={{ fontWeight: 500 }}>Status: </span>
            {getStatusOrder(selectedOrder?.status)}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Service name</TableCell>
                  <TableCell></TableCell>
                  {/* <TableCell align='center'>Quantity</TableCell> */}
                  <TableCell align='right'>Price (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder?.order_detail?.map((item: any) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell align='left'>{item.name}</TableCell>
                      <TableCell></TableCell>

                      {/* <TableCell align='center'>{item.qty}</TableCell> */}
                      <TableCell align='right'>
                        {numberWithCommas(Number(item.price))}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align='center'></TableCell>
                  <TableCell align='right'>Total:</TableCell>
                  <TableCell align='right'>
                    <Typography variant='h4' color='error'>
                      {numberWithCommas(Number(selectedOrder?.total))}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Stack direction='row' spacing={2} sx={{ mr: 'auto' }}>
            <Button
              variant={selectedOrder?.status === 0 ? 'contained' : 'outlined'}
              // disabled={selectedOrder?.status === 0}

              onClick={() => {
                setSelectedOrder({ ...selectedOrder, status: 0 });
                dispatch(
                  adminUpdateOrderedServicesStatus(selectedOrder?.id, 0)
                );
              }}
            >
              Pending
            </Button>
            <Button
              variant={selectedOrder?.status === 1 ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedOrder({ ...selectedOrder, status: 1 });
                console.log(selectedOrder.id);
                dispatch(
                  adminUpdateOrderedServicesStatus(selectedOrder?.id, 1)
                );
              }}
            >
              Processed
            </Button>
            <Button
              variant={selectedOrder?.status === 2 ? 'contained' : 'outlined'}
              onClick={() => {
                setSelectedOrder({ ...selectedOrder, status: 2 });
                dispatch(
                  adminUpdateOrderedServicesStatus(selectedOrder?.id, 2)
                );
              }}
            >
              Rejected
            </Button>
          </Stack>
          <Button
            variant='contained'
            color='info'
            onClick={() => {
              setOpen(false);
            }}
          >
            CLose
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrdersList;
