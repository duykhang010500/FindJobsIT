import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  Table,
  Button,
  Dialog,
  Tooltip,
  Divider,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { VisibilityRounded } from '@mui/icons-material';
import { getStatusOrder } from '../../../utils/convert';

import { AppState } from '../../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { employerGetOrderedServices } from '../../../store/services/actions';

import { numberWithCommas } from '../../../utils/format';
import TableRowSkeleton from '../../../components/Skeleton/TableRowSkeleton';
import Nodata from '../../../components/Nodata';
import BadgeStatus from '../../../components/Badge';

type Props = {};

const EmployerServices = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPage] = useState<number>(10);

  const [selectedOrder, setSelectedOrder] = useState<null | any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employerGetOrderedServices());
  }, [dispatch]);

  const { isLoading, orderList } = useSelector(
    (state: AppState) => state.services
  );

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Order ID</TableCell>
              <TableCell align='center'>Created at</TableCell>
              <TableCell align='center'>Price (VND)</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableRowSkeleton />}
            {!isLoading && orderList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              orderList.map((item: any) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell align='center'>{item.code}</TableCell>
                    <TableCell align='center'>
                      {dayjs(item.created_at).format('DD/MM/YYYY h:mm:ss A')}
                    </TableCell>
                    <TableCell align='center'>
                      {numberWithCommas(item.total)}
                    </TableCell>
                    <TableCell align='center'>
                      {getStatusOrder(item.status) === 'Pending' && (
                        <BadgeStatus status={0}>Pending</BadgeStatus>
                      )}
                      {getStatusOrder(item.status) === 'Precessed' && (
                        <BadgeStatus status={2}>Precessed</BadgeStatus>
                      )}
                      {getStatusOrder(item.status) === 'Rejected' && (
                        <BadgeStatus status={3}>Rejected</BadgeStatus>
                      )}
                    </TableCell>

                    <TableCell align='center'>
                      <Tooltip placement='top' title='View detail'>
                        <IconButton
                          onClick={() => {
                            console.log(item);
                            setSelectedOrder(item);
                            setOpen(true);
                          }}
                        >
                          <VisibilityRounded />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component='div'
          count={orderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPage(e.target.value)}
        />
      </TableContainer>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Typography variant='h4' component='div'>
            Order #{selectedOrder?.code}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Created at: </span>

            {dayjs(selectedOrder?.created_at).format('DD/MM/YYYY h:mm:ss A')}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Payment method: </span>
            {selectedOrder?.payment_type === '1'
              ? 'Bank transfer'
              : selectedOrder?.payment_type}
          </Typography>
          <Typography gutterBottom>
            <span style={{ fontWeight: 500 }}>Note: </span>
            {selectedOrder?.note}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <span style={{ fontWeight: 500 }}>Status: </span>
            {getStatusOrder(selectedOrder?.status)}
          </Typography>
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
          <Button
            variant='contained'
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployerServices;
