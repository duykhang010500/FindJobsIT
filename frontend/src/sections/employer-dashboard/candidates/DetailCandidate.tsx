import { useEffect, useRef } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  styled,
  Button,
} from '@mui/material';

import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import { getDetailCandidate } from '../../../store/candidates/action';
import { AppState } from '../../../store/reducer';
import ViewProfile from '../../../components/ViewProfile';

import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import DownloadIcon from '@mui/icons-material/Download';

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

  const pdfExportComponent = useRef(null);
  const contentArea = useRef<any>(null);

  useEffect(() => {
    dispatch(getDetailCandidate(Number(id)));
  }, [id, dispatch]);

  const { isLoading, candidate } = useSelector(
    (state: AppState) => state.candidates
  );

  if (isLoading) {
    return null;
  }

  // console.log(candidate);

  const resume = {
    ...candidate?.resume,
    member: { ...candidate?.member },
  };

  // const handleExportWithComponent = (event: any) => {
  //   pdfExportComponent.current.save();
  // };

  const handleExportWithFunction = () => {
    savePDF(contentArea.current, {
      paperSize: 'auto',
      margin: 20,
    });
  };

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
        <Box sx={{ width: '100%', textAlign: 'right' }}>
          <Button
            variant='contained'
            sx={{ mb: 3 }}
            onClick={handleExportWithFunction}
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </Box>
        <PDFExport ref={pdfExportComponent} paperSize='auto' margin={20}>
          <div ref={contentArea}>
            <ViewProfile resume={resume} />
          </div>
        </PDFExport>
      </>
    );
  }
};

export default DetailCandidate;
