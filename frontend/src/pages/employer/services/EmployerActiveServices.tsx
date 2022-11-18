import dayjs from 'dayjs';

import { useSelector } from 'react-redux';

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from '@mui/material';
import { AppState } from '../../../store/reducer';

type Props = {};

const EmployerActiveServices = (props: Props) => {
  const { activeServices } = useSelector((state: AppState) => state.services);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Service name</TableCell>
            <TableCell align='center'>Expire date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activeServices.map((service: any) => {
            return (
              <TableRow>
                <TableCell>{service.title}</TableCell>
                <TableCell align='center'>
                  {dayjs(service.expire).format('DD/MM/YYYY')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployerActiveServices;
