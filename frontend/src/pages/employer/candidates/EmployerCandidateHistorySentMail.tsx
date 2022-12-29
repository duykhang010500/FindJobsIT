import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppState } from '../../../store/reducer';
import { employerGetSentListMail } from '../../../store/candidates/action';

import {
  Stack,
  Table,
  Avatar,
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
  TablePagination,
} from '@mui/material';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import Editor from '../../../components/Editor';
import TableRowSkeleton from '../../../components/Skeleton/TableRowSkeleton';
import Nodata from '../../../components/Nodata';

type Props = {};

const EmployerCandidateHistorySentMail = (props: Props) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [open, setOpen] = useState<boolean>(false);

  const [selectedMail, setSelectedMail] = useState<null | any>(null);

  const { isLoading, mails } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(employerGetSentListMail());
  }, [dispatch]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Date sent</TableCell>
              <TableCell align='left'>Candidate</TableCell>
              <TableCell align='left'>Tittle</TableCell>
              <TableCell align='center'>action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableRowSkeleton />}
            {!isLoading && mails.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Nodata />
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              mails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item: any) => {
                  return (
                    <TableRow key={item?.id}>
                      <TableCell align='left'>
                        <Typography variant='subtitle1'>
                          {dayjs(item?.created_at).format('DD/MM/YYYY')}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Stack direction='row' alignItems='center' spacing={1}>
                          <Avatar src={item?.member?.avatar} />
                          <Stack>
                            <Typography variant='h4' sx={{ color: '#030852' }}>
                              {item?.member?.fullname}
                            </Typography>
                            <Typography variant='body1'>
                              {item?.job?.title}
                            </Typography>
                          </Stack>
                        </Stack>
                      </TableCell>

                      <TableCell align='left'>{item?.title}</TableCell>
                      <TableCell align='center'>
                        <Tooltip placement='bottom' title='View Detail'>
                          <IconButton
                            onClick={() => {
                              setSelectedMail(item);
                              setOpen(true);
                              console.log('Selected mail: ', item);
                            }}
                          >
                            <VisibilityTwoToneIcon sx={{ color: '#1890ff' }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={mails.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, value) => setPage(value)}
          onRowsPerPageChange={(e: any) => setRowsPerPage(e.target.value)}
        />
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

            <Editor value={selectedMail?.content} isReadOnly />
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
