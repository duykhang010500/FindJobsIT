import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  Box,
  Typography,
  styled,
  Stack,
  IconButton,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import { getListCandidatesForEmployer } from '../../../store/candidates/action';
import { AppState } from '../../../store/reducer';

type Props = {};

const StatusStyled = styled('div')({
  width: '15px',
  height: '15px',
  borderRadius: '50%',
  backgroundColor: '#52c41a',
});

const EmployerCandidatesList = (props: Props) => {
  const dispatch = useDispatch();
  const { isLoading, list } = useSelector(
    (state: AppState) => state.candidates
  );
  useEffect(() => {
    dispatch(getListCandidatesForEmployer());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Member</TableCell>
            <TableCell align='center'>Created at</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar />
                <Box sx={{ ml: 2 }}>
                  <Typography variant='body2'>Full name/Job title</Typography>
                  <Typography variant='caption'>Candidate@gmail.com</Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell align='center'>13/10/2022</TableCell>
            <TableCell>
              <IconButton>
                <StatusStyled
                  sx={{
                    ...(Boolean(false) && {
                      backgroundColor: '#ff4d4f',
                    }),
                  }}
                />
              </IconButton>
            </TableCell>
            <TableCell>
              <Stack direction='row' spacing={0}>
                <IconButton>
                  <SaveAsRoundedIcon />
                </IconButton>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployerCandidatesList;
