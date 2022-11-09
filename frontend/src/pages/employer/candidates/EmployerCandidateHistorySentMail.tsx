import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../../store/reducer';
import { employerGetSentListMail } from '../../../store/candidates/action';

import {
  Stack,
  Table,
  Dialog,
  Button,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';

type Props = {};

const EmployerCandidateHistorySentMail = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [selectedMail, setSelectedMail] = useState<null | any>(null);

  const { isLoading, mails } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(employerGetSentListMail());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date sent</TableCell>
              <TableCell>Candidate</TableCell>
              <TableCell>Tittle</TableCell>
              <TableCell>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mails.map((item: any) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    {dayjs(item.created_at).format('DD/MM/YYYY h:mm:ss A')}
                  </TableCell>
                  <TableCell>{item.member.fullname}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Tooltip placement='top' title='View Detail'>
                      <IconButton
                        onClick={() => {
                          setSelectedMail(item);
                          setOpen(true);
                          console.log('Selected mail: ', item);
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedMail(null);
        }}
      >
        <DialogTitle>
          <Typography variant='h4' component='span'>
            Send mail
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ width: '500px', padding: '20px !important' }}>
          <Stack spacing={3}>
            <TextField
              disabled
              size='small'
              label='Receiver *'
              value={selectedMail?.member?.fullname}
            />
            <TextField
              size='small'
              disabled
              label='Email *'
              value={selectedMail?.member?.email}
            />
            <TextField label='Title *' value={selectedMail?.title} />
            <TextField
              label='Content *'
              multiline
              minRows={5}
              maxRows={10}
              value={selectedMail?.content}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            onClick={() => {
              setOpen(false);
              setSelectedMail(null);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployerCandidateHistorySentMail;
