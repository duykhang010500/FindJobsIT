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
  Skeleton,
  TextField,
} from '@mui/material';

import { CSVLink } from 'react-csv';

import {
  adminGetOrderedServices,
  adminUpdateOrderedServicesStatus,
} from '../../../store/services/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { getStatusOrder } from '../../../utils/convert';
import { Visibility } from '@mui/icons-material';
import { numberWithCommas } from '../../../utils/format';
import BadgeStatus from '../../../components/Badge';

import UploadRoundedIcon from '@mui/icons-material/UploadRounded';

type Props = {};

const OrdersList = (props: Props) => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<any>('');

  const [filteredOrder, setFilteredOrder] = useState<any>([]);

  const [page, setPage] = useState<number>(0);

  const [exportData, setExportData] = useState<any>([]);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [open, setOpen] = useState<boolean>(false);

  const [selectedOrder, setSelectedOrder] = useState<null | any>(null);

  const { orderList, isLoading } = useSelector(
    (state: AppState) => state.services
  );

  useEffect(() => {
    dispatch(adminGetOrderedServices());
  }, [dispatch]);

  const filterOrders = (ordersList: any, keyword: string) => {
    const filteredOrders = ordersList.filter(
      (item: any) =>
        item.code.toLowerCase().includes(keyword.toLowerCase()) ||
        item.company.name.toLowerCase().includes(keyword.toLowerCase())
    );

    return filteredOrders;
  };

  // const filteredOrder = filterOrders(orderList, keyword);
  useEffect(() => {
    setFilteredOrder(filterOrders(orderList, keyword));
  }, [keyword, orderList]);

  console.log('filteredOrder: ', filteredOrder);

  // console.log(exportData);

  useEffect(() => {
    setExportData(formatData(filteredOrder));
  }, [filteredOrder]);

  const formatData = (arr: any) => {
    let newArr: any = [];
    arr?.forEach((item: any, index: number) => {
      newArr.push({
        STT: `${index + 1}`,
        Created_at: `${dayjs(item.created_at).format('DD/MM/YYYY')}`,
        Order_ID: `${item.code}`,
        Company_name: `${item?.company?.name}`,
        Phone: `${item?.company?.phone}` || 'none',
        Email: `${item?.company?.email}` || 'none',
        Total_price: `${item?.total}`,
      });
    });

    return newArr;
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack
          justifyContent='space-between'
          direction={'row'}
          alignItems='center'
        >
          <TextField
            placeholder='Search...'
            sx={{ mb: 3 }}
            value={keyword}
            onChange={(e: any) => setKeyword(e.target.value)}
          />
          <Button
            variant='contained'
            startIcon={<UploadRoundedIcon />}
            disabled={filteredOrder.length === 0}
          >
            <CSVLink
              data={exportData}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Export
            </CSVLink>
          </Button>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Company name</TableCell>
                <TableCell align='right'>Total price</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                </>
              )}
              {!isLoading &&
                filteredOrder
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item: any) => {
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
                          <BadgeStatus status={item.status}>
                            {getStatusOrder(item.status)}
                          </BadgeStatus>
                        </TableCell>
                        <TableCell>
                          <Tooltip placement='top' title='View detail'>
                            <IconButton
                              onClick={() => {
                                setSelectedOrder(item);
                                setOpen(true);
                              }}
                            >
                              <Visibility sx={{ color: '#1890ff' }} />
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
          rowsPerPageOptions={[10, 20, 40]}
          component='div'
          count={filteredOrder.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
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
            {selectedOrder?.payment_type === '1'
              ? 'Banking'
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
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Service name</TableCell>
                  <TableCell></TableCell>

                  <TableCell align='right'>Price (VND)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder?.order_detail?.map((item: any) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell align='left'>{item.name}</TableCell>
                      <TableCell></TableCell>

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
              disabled={
                selectedOrder?.status === 2 || selectedOrder?.status === 3
              }
              onClick={() => {
                setSelectedOrder({ ...selectedOrder, status: 1 });
                dispatch(
                  adminUpdateOrderedServicesStatus(selectedOrder?.id, 1)
                );
              }}
            >
              Pending
            </Button>
            <Button
              variant={selectedOrder?.status === 2 ? 'contained' : 'outlined'}
              disabled={selectedOrder?.status === 3}
              onClick={() => {
                setSelectedOrder({ ...selectedOrder, status: 2 });
                console.log(selectedOrder.id);
                dispatch(
                  adminUpdateOrderedServicesStatus(selectedOrder?.id, 2)
                );
                setOpen(false);
              }}
            >
              Processed
            </Button>
            <Button
              variant={selectedOrder?.status === 3 ? 'contained' : 'outlined'}
              disabled={selectedOrder?.status === 2}
              onClick={() => {
                setSelectedOrder({ ...selectedOrder, status: 3 });
                dispatch(
                  adminUpdateOrderedServicesStatus(selectedOrder?.id, 3)
                );
                setOpen(false);
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
