import React, { useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import StatusBadge from '../../../components/StatusBadge';
import { AppState } from '../../../store/reducer';
import { getListServicesEmployer } from '../../../store/services/actions';
import dayjs from 'dayjs';
import { numberWithCommas } from '../../../utils/format';

type Props = {};

const EmployerServices = (props: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListServicesEmployer());
  }, [dispatch]);
  const { isLoading, list } = useSelector((state: AppState) => state.services);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Price (VND)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item: any) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {dayjs(item.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell align='center'>
                  <IconButton>
                    <StatusBadge />
                  </IconButton>
                </TableCell>
                <TableCell>{numberWithCommas(item.price)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployerServices;
