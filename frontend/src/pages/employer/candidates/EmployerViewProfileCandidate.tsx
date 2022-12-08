import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Typography,
  Box,
  Skeleton,
  Stack,
  Container,
  Button,
  Link,
  Breadcrumbs,
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';

import ViewProfile from '../../../components/ViewProfile';
import {
  getDetailResumeCandidate,
  openSaveCandidateModal,
} from '../../../store/candidates/action';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import FolderSaveCandidates from '../../../sections/employer-dashboard/candidates/folders/FolderSaveCandidates';
import { getFolders } from '../../../store/folders/action';

type Props = {};

const EmployerViewProfileCandidate = (props: Props) => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, resume } = useSelector(
    (state: AppState) => state.candidates
  );

  useEffect(() => {
    dispatch(getDetailResumeCandidate(Number(id)));
    dispatch(getFolders());
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Container>
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
      </Container>
    );
  }

  return (
    <Container>
      <Stack mb={5}>
        <Breadcrumbs
          sx={{
            minWidth: '210mm',
            margin: 'auto',
          }}
        >
          <Link href='/employer/candidates/search'>Find candidates</Link>
          <Typography>2312</Typography>
        </Breadcrumbs>
        <Stack
          spacing={2}
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          sx={{ minWidth: '210mm', margin: 'auto' }}
        >
          <Button variant='outlined' startIcon={<DownloadIcon />}>
            Download
          </Button>
          <Button
            variant='contained'
            startIcon={<SaveIcon />}
            onClick={() => dispatch(openSaveCandidateModal())}
          >
            Save resume
          </Button>
        </Stack>
      </Stack>
      <ViewProfile type={resume?.cv_type} resume={resume} />
      <FolderSaveCandidates />
    </Container>
  );
};

export default EmployerViewProfileCandidate;
