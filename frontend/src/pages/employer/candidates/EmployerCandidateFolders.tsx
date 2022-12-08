import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';

import { Link as RouterLink } from 'react-router-dom';

import {
  Link,
  Stack,
  Button,
  Table,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  Breadcrumbs,
  TableContainer,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';

import FolderNewForm from '../../../sections/employer-dashboard/candidates/folders/FolderNewForm';
import { useDispatch } from 'react-redux';
import {
  deleteFolder,
  getFolder,
  getFolders,
  openForm,
} from '../../../store/folders/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { Folder } from '../../../store/folders/types';
type Props = {};

const EmployerCandidateFolders = (props: Props) => {
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { folders, selectedFolder } = useSelector(
    (state: AppState) => state.folders
  );

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);

  const handleEditFolder = (folder: Folder) => {
    dispatch(getFolder(folder));
    dispatch(openForm());
  };

  const handleDeleteFolder = (folder: Folder) => {
    setOpenDialogDelete(true);
    dispatch(getFolder(folder));
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  return (
    <Stack spacing={5}>
      <Breadcrumbs>
        <Link component={RouterLink} to='/employer/hr/candidates/saved'>
          Saved candidates
        </Link>
        <Typography>Manage folders</Typography>
      </Breadcrumbs>
      <Stack alignItems='flex-end'>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => dispatch(openForm())}
        >
          New folder
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {folders.map((folder: Folder) => (
              <TableRow key={folder.id}>
                <TableCell>{folder.id}</TableCell>
                <TableCell>
                  {dayjs(folder.created_at).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>{folder.name}</TableCell>
                <TableCell>
                  <Stack direction='row' alignItems='center'>
                    <Tooltip title='Edit' placement='top'>
                      <IconButton onClick={() => handleEditFolder(folder)}>
                        <ModeEditIcon sx={{ color: '#595959' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete' placement='top'>
                      <IconButton onClick={() => handleDeleteFolder(folder)}>
                        <DeleteRoundedIcon sx={{ color: '#ff4d4f' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FolderNewForm />
      <Dialog
        fullWidth
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
      >
        <DialogTitle>
          <Typography variant='h3' component='span'>
            Delete record
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>{`Are you sure delete folder ${selectedFolder?.name} ?`}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleCloseDialogDelete}>
            Close
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              dispatch(deleteFolder(Number(selectedFolder?.id)));
              setOpenDialogDelete(false);
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default EmployerCandidateFolders;
