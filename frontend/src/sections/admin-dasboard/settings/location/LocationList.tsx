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
  Skeleton,
} from '@mui/material';
import { IconButton } from '@mui/material';

import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

import { AppState } from '../../../../store/reducer';
import { ILocation } from '../../../../store/location/types';
import {
  deleteLocation,
  selectLocation,
} from '../../../../store/location/actions';
import { useState } from 'react';
import DeleteDialog from '../../../../components/DeleteDialog';

type Props = {};

const LocationList = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const { list, isLoading } = useSelector((state: AppState) => state.location);

  const handleEdit = (id: number | any) => {
    dispatch(selectLocation(id));
  };

  // const handleDelete = (id: number | any) => {
  //   dispatch(deleteLocation(id));
  // };

  const handleDelete = () => {
    dispatch(deleteLocation(selectedLocation));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ p: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={3}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              </>
            )}
            {!isLoading &&
              list
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((location: ILocation) => {
                  const { id, name, created_at, updated_at } = location;
                  return (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => handleEdit(id)}>
                          <BorderColorTwoToneIcon sx={{ color: '#40a9ff' }} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setSelectedLocation(id);
                            setOpen(true);
                          }}
                        >
                          <DeleteTwoToneIcon sx={{ color: '#ff4d4f' }} />
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
      <DeleteDialog
        title='Delete location'
        content='Are you sure delete this location'
        isOpen={open}
        onCancel={handleClose}
        onDoAction={handleDelete}
      />
    </Card>
  );
};

export default LocationList;
