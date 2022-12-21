import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useParams, Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Box,
  Skeleton,
  Stack,
  Container,
  Button,
  Link,
  Card,
  Breadcrumbs,
} from '@mui/material';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  const { folders } = useSelector((state: AppState) => state.folders);

  useEffect(() => {
    dispatch(getDetailResumeCandidate(Number(id)));
    dispatch(getFolders());
  }, [dispatch, id]);

  function exportPDF() {
    const elm: any = document.getElementById('content');
    html2canvas(elm, { logging: true, useCORS: true }).then((canvas) => {
      const data: any = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(data, 'JPEG', 0, 0, 210, 297);
      pdf.save(`CV_${resume?.member?.fullname}.pdf`);
    });
  }

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
    <Container sx={{ width: '210mm' }}>
      <Stack mb={5} direction='column' alignItems='flex-start'>
        <Card sx={{ p: 2, backgroundColor: '#fff' }}>
          <Breadcrumbs
            sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
            separator='›'
            aria-label='breadcrumb'
          >
            <Link component={RouterLink} to={`/employer/candidates/search`}>
              Candidates
            </Link>
            <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
              {resume?.member?.fullname}
            </Typography>
          </Breadcrumbs>
        </Card>
        <Stack
          spacing={2}
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          sx={{ minWidth: '210mm', margin: 'auto' }}
        >
          <Button
            variant='outlined'
            startIcon={<DownloadIcon />}
            onClick={exportPDF}
          >
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
