import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Link,
  Stack,
  Table,
  Avatar,
  Dialog,
  Button,
  Tooltip,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  Breadcrumbs,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import { AppState } from '../../../store/reducer';
import {
  deleteSavedCandidate,
  getSavedCandidates,
  getSavedCandidatesByFolder,
} from '../../../store/candidates/action';
import { Folder } from '../../../store/folders/types';
import { getFolders } from '../../../store/folders/action';
import Nodata from '../../../components/Nodata';

type Props = {};

const EmployerCandidateSaved = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);

  const [rowPerPage, setRowPerPage] = useState<number>(10);

  const [selectedCandidate, setSelectedCandidate] = useState<null | any>(null);

  const [openDel, setOpenDel] = useState(false);

  const { folders } = useSelector((state: AppState) => state.folders);

  const [getCandidates, setGetCandidates] = useState<any>();

  const { savedCandidates } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(getFolders());
  }, [dispatch]);

  useEffect(() => {
    setGetCandidates(folders[0]?.id);
  }, [folders]);

  useEffect(() => {
    dispatch(getSavedCandidatesByFolder(Number(getCandidates)));
  }, [dispatch, getCandidates]);

  return (
    <Stack spacing={5}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <TextField
          select
          label='Folder'
          defaultValue={folders[0]?.id}
          sx={{ minWidth: '260px' }}
          onChange={(e) => setGetCandidates(e.target.value)}
        >
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
              <TableCell align='left'>Candidate</TableCell>
              <TableCell align='left'>Position</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedCandidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
            {savedCandidates.map((candidate: any) => (
              <TableRow>
                <TableCell align='left'>
                  <Stack direction='row' alignItems='center' spacing={2}>
                    <Avatar
                      variant='circular'
                      src={candidate?.member?.avatar}
                    />

                    <Typography
                      variant='body1'
                      fontWeight={600}
                      sx={{ color: '#000' }}
                    >
                      {candidate?.member?.fullname}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell align='left'>
                  <Typography
                    variant='body1'
                    fontWeight={600}
                    sx={{ color: '#000' }}
                  >
                    {candidate?.resume?.resume_title}
                  </Typography>
                </TableCell>
                <TableCell align='center'>
                  <Tooltip placement='bottom' title='View'>
                    <IconButton
                      onClick={() =>
                        navigate(`/employer/candidates/${candidate?.resume_id}`)
                      }
                    >
                      <VisibilityTwoToneIcon sx={{ color: '#4096ff' }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement='bottom' title='Delete'>
                    <IconButton
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setOpenDel(true);
                      }}
                    >
                      <DeleteTwoToneIcon sx={{ color: '#ff4d4f' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          count={savedCandidates.length}
          component='div'
          rowsPerPage={rowPerPage}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowPerPage(e.target.value)}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </TableContainer>
      <Dialog open={openDel}>
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>Are you sure?</DialogContent>
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
                dispatch(deleteSavedCandidate(selectedCandidate?.resume_id));
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
