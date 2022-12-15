import dayjs from 'dayjs';

import { useSelector, useDispatch } from 'react-redux';

import {
  Card,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { IconButton } from '@mui/material';

import SaveAsIcon from '@mui/icons-material/SaveAs';
import DeleteIcon from '@mui/icons-material/Delete';

import { AppState } from '../../../../store/reducer';
import { ILocation } from '../../../../store/location/types';
import {
  deleteLocation,
  selectLocation,
} from '../../../../store/location/actions';
import { useState } from 'react';

type Props = {};

const LocationList = (props: Props) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { list } = useSelector((state: AppState) => state.location);

  const handleEdit = (id: number | any) => {
    dispatch(selectLocation(id));
  };

  const handleDelete = (id: number | any) => {
    dispatch(deleteLocation(id));
  };

  return (
    <Card sx={{ p: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((location: ILocation) => {
                const { id, name, created_at, updated_at } = location;
                return (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell align='center'>
                      <IconButton onClick={() => handleEdit(id)}>
                        <SaveAsIcon sx={{ color: '#096dd9' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(id)}>
                        <DeleteIcon sx={{ color: '#ff4d4f' }} />
                      </IconButton>
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
        page={page}
        rowsPerPage={rowsPerPage}
        count={list.length}
        onPageChange={(_, value) => setPage(value)}
        onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
      />
    </Card>
  );
};

export default LocationList;
