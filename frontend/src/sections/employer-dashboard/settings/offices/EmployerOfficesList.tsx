import dayjs from 'dayjs';

import React, { useEffect, useState } from 'react';

import {
  Stack,
  Table,
  Tooltip,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  DialogTitle,
  Typography,
  TablePagination,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { useDispatch } from 'react-redux';
import {
  deleteOffice,
  getOffice,
  getOffices,
  openModal,
} from '../../../../store/offices/actions';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store/reducer';
import { Office } from '../../../../store/offices/types';
import TableSkeleton from '../../../../components/Skeleton/TableSkeleton';
import Nodata from '../../../../components/Nodata';

type Props = {};

const EmployerOfficesList = (props: Props) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [open, setOpen] = useState<boolean>(false);

  const [selectedID, setSelectedID] = useState<number | null>(null);

  const { isLoading, offices } = useSelector(
    (state: AppState) => state.offices
  );

  useEffect(() => {
    dispatch(getOffices());
  }, [dispatch]);

  const handleEdit = (id: number) => {
    dispatch(getOffice(id));
  };

  const handleDelete = () => {
    dispatch(deleteOffice(Number(selectedID)));
    setOpen((open) => !open);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {offices.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
            {offices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((office: Office) => (
                <TableRow>
                  <TableCell>{office.name}</TableCell>
                  <TableCell>{office.address}</TableCell>
                  <TableCell>{office.phone}</TableCell>
                  <TableCell>
                    <Stack direction='row' justifyContent='center'>
                      <Tooltip placement='top' title='Edit'>
                        <IconButton onClick={() => handleEdit(office.id)}>
                          <BorderColorRoundedIcon sx={{ color: '#4096ff' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='top' title='Delete'>
                        <IconButton
                          onClick={() => {
                            setSelectedID(office.id);
                            setOpen((open) => !open);
                          }}
                        >
                          <DeleteRoundedIcon sx={{ color: '#ff4d4f' }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component={'div'}
          rowsPerPageOptions={[10, 20, 40]}
          page={page}
          count={offices.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        />
      </TableContainer>
      <Dialog
        open={open}
        onClose={() => {
          setOpen((open) => !open);
          setSelectedID(null);
        }}
      >
        <DialogTitle>
          <Typography variant='h4' component='span'>
            Delete
          </Typography>
        </DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => {
              setOpen((open) => !open);
              setSelectedID(null);
            }}
          >
            Close
          </Button>
          <Button
            variant='contained'
            startIcon={<DeleteRoundedIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployerOfficesList;
