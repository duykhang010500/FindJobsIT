import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  TablePagination,
  Stack,
  Link,
  IconButton,
  Tooltip,
  Button,
  MenuItem,
  TextField,
  Breadcrumbs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

import { AppState } from '../../../store/reducer';
import {
  deleteSavedCandidate,
  getSavedCandidates,
  getSavedCandidatesByFolder,
} from '../../../store/candidates/action';
import { Folder } from '../../../store/folders/types';
import { getFolders } from '../../../store/folders/action';

type Props = {};

const EmployerCandidateSaved = (props: Props) => {
  const dispatch = useDispatch();

  const [selectedCandidate, setSelectedCandidate] = useState<null | any>(null);

  const [getCandidates, setGetCandidates] = useState('all');

  const [openDel, setOpenDel] = useState(false);

  const { folders } = useSelector((state: AppState) => state.folders);

  const { savedCandidates } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);

  useEffect(() => {
    if (getCandidates === 'all') {
      dispatch(getSavedCandidates());
    } else {
      dispatch(getSavedCandidatesByFolder(Number(getCandidates)));
    }
  }, [dispatch, getCandidates]);

  return (
    <Stack spacing={5}>
      <Breadcrumbs>
        <Link>Dashboard</Link>
        <Link>Candidates</Link>
        <Typography>Saved</Typography>
      </Breadcrumbs>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <TextField
          select
          label='Folder'
          defaultValue='all'
          sx={{ minWidth: '260px' }}
          onChange={(e) => setGetCandidates(e.target.value)}
        >
          <MenuItem value='all'>All</MenuItem>
          {folders.map((folder: Folder) => (
            <MenuItem key={folder.id} value={folder.id}>
              {folder.name}
            </MenuItem>
          ))}
        </TextField>
        <RouterLink
          to='/employer/hr/folders'
          style={{ textDecoration: 'unset' }}
        >
          <Button variant='contained'>Manage folder</Button>
        </RouterLink>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedCandidates.map((candidate: any) => (
              <TableRow>
                <TableCell>{candidate.id}</TableCell>
                <TableCell>
                  <Tooltip placement='top' title='View'>
                    <IconButton>
                      <RemoveRedEyeRoundedIcon sx={{ color: '#4096ff' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement='top' title='delete'>
                    <IconButton
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setOpenDel(true);
                      }}
                    >
                      <DeleteRoundedIcon sx={{ color: '#ff4d4f' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={0}
          count={10}
          component='div'
          rowsPerPage={10}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
      <Dialog open={openDel}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>Are you sure???</DialogContent>
        <DialogActions>
          <Stack direction='row' spacing={2}>
            <Button
              onClick={() => {
                setOpenDel(false);
              }}
            >
              Close
            </Button>
            <Button
              variant='contained'
              onClick={() => {
                dispatch(deleteSavedCandidate(selectedCandidate?.id));
                setOpenDel(false);
              }}
            >
              Delete
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default EmployerCandidateSaved;
