import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Typography, Box, Skeleton, Stack, Button } from '@mui/material';
import ViewProfile from '../../../components/ViewProfile';
import { getDetailResumeCandidate } from '../../../store/candidates/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

import DownloadIcon from '@mui/icons-material/Download';

import SaveIcon from '@mui/icons-material/Save';

type Props = {};

const EmployerViewProfileCandidate = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, resume } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(getDetailResumeCandidate(Number(id)));
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Stack spacing={5}>
          <Skeleton variant='rounded' width={'50px'} height={10} />

          <div>
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={100} />
          </div>
          <div>
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={100} />
          </div>
          <div>
            <Skeleton variant='rounded' width={'100%'} height={60} />
            <Skeleton variant='rounded' width={'100%'} height={100} />
          </div>
        </Stack>
      </>
    );
  }

  return (
    <Box>
      <Stack direction='row' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' sx={{ mb: 2 }}>
          {/* Resume */}
        </Typography>
        <Stack spacing={2} direction='row'>
          <Button variant='contained' startIcon={<DownloadIcon />}>
            Download
          </Button>
          <Button variant='outlined' startIcon={<SaveIcon />}>
            Save resume
          </Button>
        </Stack>
      </Stack>
      <ViewProfile resume={resume} />
    </Box>
  );
};

export default EmployerViewProfileCandidate;
