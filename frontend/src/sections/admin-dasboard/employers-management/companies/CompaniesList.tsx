import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import {
  Card,
  Table,
  Tooltip,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { AppState } from '../../../../store/reducer';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

type Props = {};

const CompaniesList = (props: Props) => {
  const { list } = useSelector((state: AppState) => state.companies);
  return (
    <Card sx={{ mt: 5 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: '50px' }}>Create at</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Job open</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell sx={{ maxWidth: '50px' }}>
                  {dayjs(item.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <Typography variant='subtitle1'>{item.name}</Typography>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <Typography variant='body2'>Active:</Typography>
                  <Typography variant='body2'>Inactive:</Typography>
                </TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Tooltip title='Detail' placement='top'>
                    <IconButton>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={10}
        rowsPerPage={5}
        page={1}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Card>
  );
};

export default CompaniesList;
