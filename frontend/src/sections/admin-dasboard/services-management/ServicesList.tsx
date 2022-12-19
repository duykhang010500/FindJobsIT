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

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';

import { AppState } from '../../../store/reducer';
import { numberWithCommas } from '../../../utils/format';
import { deleteService } from '../../../store/services/actions';

type Props = {};

const ServicesList = (props: Props) => {
  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

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
      <Card sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='left'>Name</TableCell>
                <TableCell align='left'>Description</TableCell>
                <TableCell align='center'>Day(s)</TableCell>
                <TableCell align='right'>Unit price</TableCell>
                <TableCell align='center'>Created at</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell align='left'>
                      <Typography variant='subtitle1'>{item.name}</Typography>
                    </TableCell>
                    <TableCell align='left' sx={{ width: '30%' }}>
                      {item.note}
                    </TableCell>
                    <TableCell align='center'>{item.days}</TableCell>
                    <TableCell align='right'>
                      {numberWithCommas(item.price)}
                    </TableCell>

                    <TableCell align='center'>
                      {dayjs(item.created_at).format('DD/MM/YYYY')}
                    </TableCell>

                    <TableCell
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Tooltip title='Edit' placement='bottom'>
                        <IconButton
                          onClick={() =>
                            navigate(`/admin/services/${item.id}/edit`)
                          }
                        >
                          <BorderColorTwoToneIcon sx={{ color: '#1890ff' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Delete' placement='bottom'>
                        <IconButton onClick={() => handleDelete(item)}>
                          <DeleteTwoToneIcon sx={{ color: '#ff4d4f' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component='div'
          count={list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
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
