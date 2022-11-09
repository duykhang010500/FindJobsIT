import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Card,
  Table,
  Button,
  Dialog,
  Tooltip,
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
  DialogContentText,
} from '@mui/material';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppState } from '../../../store/reducer';
import { numberWithCommas } from '../../../utils/format';
import StatusBadge from '../../../components/StatusBadge';
import { deleteService } from '../../../store/services/actions';

type Props = {};

const ServicesList = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedService, setSelectedService] = useState<any | null>(null);

  const { list } = useSelector((state: AppState) => state.services);

  const handleDelete = (service: any) => {
    setSelectedService(service);
    setOpenDelete((openDelete) => !openDelete);
  };

  const onDelete = () => {
    dispatch(deleteService(selectedService.id));
    setOpenDelete((openDelete) => !openDelete);
  };

  return (
    <>
      <Card sx={{ mt: 5 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Description</TableCell>
                {/* <TableCell align='center'>Day(s)</TableCell> */}
                <TableCell align='right'>Unit price</TableCell>
                {/* <TableCell>Discount</TableCell> */}
                <TableCell align='center'>Created at</TableCell>
                {/* <TableCell>Status</TableCell> */}
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell align='left'>
                    <Typography variant='subtitle1'>{item.name}</Typography>
                  </TableCell>
                  <TableCell align='left' sx={{ width: '30%' }}>
                    {item.note}
                  </TableCell>
                  {/* <TableCell align='center'>{item.days}</TableCell> */}
                  <TableCell align='right'>
                    {numberWithCommas(item.price)}
                  </TableCell>
                  {/* <TableCell align='center'>{item.discount}%</TableCell> */}
                  <TableCell align='center'>
                    {dayjs(item.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                  {/* <TableCell>
                    <StatusBadge />
                  </TableCell> */}
                  <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title='Edit' placement='top'>
                      <IconButton
                        onClick={() =>
                          navigate(`/admin/services/${item.id}/edit`)
                        }
                      >
                        <SaveAsIcon sx={{ color: '#1890ff' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete' placement='top'>
                      <IconButton onClick={() => handleDelete(item)}>
                        <DeleteIcon sx={{ color: '#ff4d4f' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[20, 40, 60]}
          component='div'
          count={60}
          rowsPerPage={20}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Card>
      <Dialog open={openDelete}>
        <DialogTitle>
          <Typography variant='body1' sx={{ fontWeight: 500 }}>
            Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure want to delete&nbsp;{selectedService?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDelete((openDelete) => !openDelete);
              setSelectedService(null);
            }}
          >
            Close
          </Button>
          <Button variant='contained' onClick={() => onDelete()}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServicesList;
