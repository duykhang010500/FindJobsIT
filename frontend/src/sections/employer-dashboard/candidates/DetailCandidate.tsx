import { useEffect, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  Box,
  Link,
  Stack,
  styled,
  Button,
  Tooltip,
  Skeleton,
  Typography,
  IconButton,
  Breadcrumbs,
} from '@mui/material';

import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import {
  getDetailCandidate,
  openMail,
  openStatusDialog,
  selectCandidate,
} from '../../../store/candidates/action';
import { AppState } from '../../../store/reducer';
import ViewProfile from '../../../components/ViewProfile';

import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import MailDialog from './MailDialog';
import StatusDialog from './StatusDialog';

type Props = {};

const BoxStyled = styled(Box)({
  display: 'block',
  padding: '16px',
  border: '2px dashed #bfbfbf',
  borderRadius: '8px',
});

const DetailCandidate = (props: Props) => {
  let { id } = useParams();

  const dispatch = useDispatch();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const { activeServices } = useSelector((state: AppState) => state.services);

  useEffect(() => {
    dispatch(getDetailCandidate(Number(id)));
  }, [id, dispatch]);

  const { isLoading, candidate } = useSelector(
    (state: AppState) => state.candidates
  );

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant='text' height={50} />
        <Skeleton variant='text' height={50} />
        <Skeleton variant='rounded' width={'100%'} height={'80vh'} />
      </Stack>
    );
  }

  const resume = {
    ...candidate?.resume,
    member: { ...candidate?.member },
  };

  function exportPDF() {
    const elm: any = document.getElementById('content');
    html2canvas(elm, { logging: true, useCORS: true }).then((canvas) => {
      const data: any = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(data, 'JPEG', 0, 0, 210, 297);
      pdf.save(`CV_${resume?.member?.fullname}.pdf`);
    });
  }

  const canSendMail = activeServices.findIndex((item: any) => item.id === 14);

  if (candidate?.resume_online === 0) {
    return (
      <Box>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to='/employer/hr/candidates'>
            Candidates
          </Link>
          <Typography>{candidate?.member?.fullname}</Typography>
        </Breadcrumbs>

        <BoxStyled sx={{ mb: 6 }}>
          <Stack spacing={2}>
            <Typography variant='h3' sx={{ color: '#1890ff' }}>
              {candidate?.member?.fullname}
            </Typography>
            <Typography variant='h4' sx={{ color: '#ff4d4f' }}>
              {candidate?.job?.title}
            </Typography>
            <Typography variant='h5' sx={{ color: '#595959' }}>
              {candidate?.member?.email}
            </Typography>
          </Stack>
        </BoxStyled>
        <Viewer
          fileUrl={candidate?.resume_file}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Box>
    );
  } else {
    return (
      <>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to='/employer/hr/candidates'>
            Candidates
          </Link>
          <Typography>{candidate?.member?.fullname}</Typography>
        </Breadcrumbs>
        <BoxStyled sx={{ mb: 3 }}>
          <Typography variant='h4' sx={{ color: '#595959' }}>
            {candidate?.job?.title}
          </Typography>
        </BoxStyled>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          spacing={0.5}
          sx={{ mb: 3 }}
        >
          <Tooltip placement='bottom' title='Edit status'>
            <IconButton
              onClick={() => {
                dispatch(selectCandidate(candidate));
                dispatch(openStatusDialog());
              }}
            >
              <BorderColorTwoToneIcon sx={{ color: '#40a9ff', fontSize: 19 }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            placement='bottom'
            title={canSendMail < 0 ? 'Please buy this service!' : 'Send mail'}
          >
            <div>
              <IconButton
                disabled={canSendMail < 0}
                onClick={() => {
                  dispatch(selectCandidate(candidate));
                  dispatch(openMail());
                }}
              >
                <EmailTwoToneIcon sx={{ color: '#b37feb', fontSize: 19 }} />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip placement='bottom' title='Download CV'>
            <IconButton sx={{ mb: 3 }} onClick={exportPDF}>
              <FileDownloadTwoToneIcon sx={{ color: '#fa8c16' }} />
            </IconButton>
          </Tooltip>
        </Stack>
        <ViewProfile type={resume?.cv_type} resume={resume} />
        <MailDialog />
        <StatusDialog />
      </>
    );
  }
};

export default DetailCandidate;
