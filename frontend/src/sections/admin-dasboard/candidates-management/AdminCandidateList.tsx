import dayjs from 'dayjs';

import { useSelector } from 'react-redux';

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
} from '@mui/material';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import EditRoundedIcon from '@mui/icons-material/EditRounded';

import { AppState } from '../../../store/reducer';
import BadgeStatus from '../../../components/Badge';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminUpdateStatusCandidate } from '../../../store/candidates/action';

type Props = {};

const AdminCandidateList = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [status, setStatus] = useState<any>(null);

  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  const { list } = useSelector((state: AppState) => state.candidates);

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

  return (
    <Card sx={{ p: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell align='center'>Attempt date</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((member: any) => {
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
                            {`${member.fullname} / ${member?.resume?.resume_title}`}
                          </Typography>
                          {member.expected_position &&
                            `/${member.expected_position} `}
                        </Typography>
                        <Typography variant='body2'>{member.email}</Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='body2' fontWeight={600}>
                      {dayjs(member.created_at).format('DD/MM/YYYY')}
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
                      <IconButton>
                        <RemoveRedEyeIcon sx={{ color: '#1890ff' }} />
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

export default AdminCandidateList;
