import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Table,
  Button,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from '@mui/material';
import { AppState } from '../../../store/reducer';
import {
  addToCart,
  clearCart,
  getListServicesEmployer,
} from '../../../store/services/actions';
import { useEffect } from 'react';

type Props = {};

const EmployerExpireServices = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activeServices, list } = useSelector(
    (state: AppState) => state.services
  );

  useEffect(() => {
    dispatch(getListServicesEmployer());
  }, [dispatch]);

  const handleRenewService = (id: number) => {
    dispatch(clearCart());
    console.log(id);
    const service = list.find((service: any) => service.id === id);
    console.log('Renew service!', service);
    dispatch(addToCart(service));
    navigate('/employer/services/checkout');
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service name</TableCell>
            <TableCell align='center'>Active date</TableCell>
            <TableCell align='center'>Expire date</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeServices.map((service: any, index: number) => {
            if (dayjs().isAfter(dayjs(service.expireDate))) {
              return (
                <TableRow key={index}>
                  <TableCell>{service.title}</TableCell>
                  <TableCell align='center'>
                    {dayjs(service.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>
                    {dayjs(service.expireDate).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      variant='contained'
                      // disabled={
                      //   dayjs(service.expireDate).diff(
                      //     dayjs(service.createdAt),
                      //     'day'
                      //   ) > 2
                      // }
                      onClick={() => handleRenewService(service.id)}
                    >
                      Renew
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployerExpireServices;
