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

type Props = {};

const LocationList = (props: Props) => {
  const dispatch = useDispatch();

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
            {list.map((location: ILocation) => {
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
        rowsPerPageOptions={[5, 10]}
        component='div'
        rowsPerPage={5}
        page={1}
        count={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Card>
  );
};

export default LocationList;
