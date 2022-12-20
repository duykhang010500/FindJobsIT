import dayjs from 'dayjs';

import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import {
  Card,
  Table,
  Stack,
  Avatar,
  Dialog,
  Button,
  Tooltip,
  TableRow,
  MenuItem,
  TableCell,
  TableHead,
  TextField,
  TableBody,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  TablePagination,
  InputAdornment,
  Skeleton,
} from '@mui/material';

import { CSVLink, CSVDownload } from 'react-csv';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { AppState } from '../../../store/reducer';
import BadgeStatus from '../../../components/Badge';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminUpdateStatusCandidate } from '../../../store/candidates/action';
import Nodata from '../../../components/Nodata';

type Props = {};

const AdminCandidateList = (props: Props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [exportData, setExportDate] = useState<any>([]);

  const [keyword, setKeyword] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<any>(null);

  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const { isLoading, list } = useSelector(
    (state: AppState) => state.candidates
  );

  const handleClose = () => {
    setOpen(false);
    setSelectedCandidate(null);
  };

  const handleUpdateCandidateStatus = () => {
    if (status !== selectedCandidate?.status) {
      dispatch(adminUpdateStatusCandidate(selectedCandidate.id, status));
      handleClose();
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    setStatus(selectedCandidate?.status);
  }, [selectedCandidate]);

  useEffect(() => {
    setExportDate(formatData(list));
  }, [list]);

  const formatData = (arr: any) => {
    let newArr: any = [];
    arr.forEach((item: any, index: number) => {
      newArr.push({
        STT: `${index + 1}`,
        Fullname: `${item.fullname}`,
        Email: `${item.email}`,
        Phone: `${item.phone}`,
        Jobs_applied: `${item?.candidate.length}`,
      });
    });
    return newArr;
  };

  const filteredCandidates = filterCandidate(list, keyword);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={3}
      >
        <TextField
          value={keyword}
          placeholder='Search candidate...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e: any) => setKeyword(e.target.value)}
        />
        <Button variant='contained'>
          <CSVLink
            data={exportData}
            style={{ textDecoration: 'unset', color: 'inherit' }}
          >
            Export
          </CSVLink>
        </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell align='center'>Jobs applied</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              </>
            )}
            {!isLoading && filteredCandidates.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              filteredCandidates.map((member: any) => {
                return (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Stack direction='row' alignItems='center' spacing={2}>
                        <Avatar
                          variant='rounded'
                          src={member?.avatar}
                          sx={{ width: 50, height: 50 }}
                        />
                        <Stack>
                          <Typography variant='body2'>
                            <Typography variant='h4'>
                              {`${member.fullname} / ${
                                member?.resume?.resume_title || ''
                              }`}
                            </Typography>
                            {member.expected_position &&
                              `/${member.expected_position} `}
                          </Typography>
                          <Typography variant='body2'>
                            {member.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography variant='body2' fontWeight={600}>
                        {member?.candidate?.length}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      {member?.status === 1 && (
                        <BadgeStatus status={1}>Active</BadgeStatus>
                      )}
                      {member?.status === 0 && (
                        <BadgeStatus status={3}>Inactive</BadgeStatus>
                      )}
                    </TableCell>
                    <TableCell align='center'>
                      <Tooltip placement='top' title='View detail'>
                        <IconButton
                          onClick={() =>
                            navigate(`/admin/candidates/${member.id}`)
                          }
                        >
                          <VisibilityTwoToneIcon sx={{ color: '#1890ff' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip placement='top' title='Edit status'>
                        <IconButton
                          onClick={() => {
                            setSelectedCandidate(member);
                            setOpen(true);
                          }}
                        >
                          <EditRoundedIcon sx={{ color: '#b37feb' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={filteredCandidates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        />
      </TableContainer>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>Update status</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label='Status'
            sx={{ mt: 1 }}
            defaultValue={selectedCandidate && selectedCandidate?.status}
            onChange={(e: any) => setStatus(e.target.value)}
          >
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={0}>Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
          <Button variant='contained' onClick={handleUpdateCandidateStatus}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export const filterCandidate = (arr: any, keyword: string) => {
  const newArr = arr.filter(
    (item: any) =>
      item.fullname.toLowerCase().includes(keyword.toLowerCase()) ||
      item.phone.toLowerCase().includes(keyword.toLowerCase()) ||
      item.email.toLowerCase().includes(keyword.toLowerCase())
  );
  return newArr;
};

export default AdminCandidateList;
