import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  Stack,
  Button,
  Drawer,
  Skeleton,
  Container,
  Typography,
} from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';

import ViewProfile from '../../components/ViewProfile';

import { AppState } from '../../store/reducer';

import CV0 from '../../assets/images/CV0.png';
import CV1 from '../../assets/images/CV1.png';
import CV2 from '../../assets/images/CV2.png';
import CV3 from '../../assets/images/CV3.png';

import Image from '../../components/Image';

import { updateCVType } from '../../store/cv/actions';

const CV = [
  { value: 0, url: CV0 },
  { value: 1, url: CV1 },
  { value: 2, url: CV2 },
  { value: 3, url: CV3 },
];

type Props = {};

const ViewResume = (props: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  const [selectedCV, setSelectedCV] = useState<null | number>(null);

  const { isLoading, cv } = useSelector((state: AppState) => state.cv);

  useEffect(() => {
    setSelectedCV(cv?.cv_type || 0);
  }, [cv]);

  function exportPDF() {
    const elm: any = document.getElementById('content');
    html2canvas(elm, { logging: true, useCORS: true }).then((canvas) => {
      const data: any = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(data, 'JPEG', 0, 0, 210, 297);
      pdf.save(`CV_${cv?.member?.fullname}.pdf`);
    });
  }

  return (
    <Container sx={{ py: 15 }}>
      {isLoading ? (
        <Box sx={{ width: '210mm', height: '290mm', margin: '0 auto' }}>
          <Skeleton variant='rounded' width={'100%'} height={'100%'} />
        </Box>
      ) : (
        <>
          <Box sx={{ width: '210mm', margin: 'auto', mb: 2 }}>
            <Stack spacing={2} direction='row'>
              <Button
                variant='contained'
                color='info'
                onClick={() => setOpen(true)}
                startIcon={<TouchAppRoundedIcon />}
              >
                Choose CV
              </Button>
              <Button
                variant='contained'
                sx={{ mb: 3 }}
                onClick={exportPDF}
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
              <Button
                variant='contained'
                sx={
                  {
                    // visibility: 'hidden',
                  }
                }
                startIcon={<SaveRoundedIcon />}
                color='success'
                onClick={() => dispatch(updateCVType(Number(selectedCV)))}
              >
                Save
              </Button>
            </Stack>
          </Box>

          <ViewProfile resume={cv} type={selectedCV} />
        </>
      )}

      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: '300px', padding: '20px 30px' }}>
          <Typography align='center' variant='h3' sx={{ mb: 3 }}>
            CV model
          </Typography>
          {CV.map((item: any) => {
            return (
              <Box
                sx={{
                  padding: '15px',
                  border: '1px solid #d9d9d9',
                  marginBottom: '20px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  ...(item.value === selectedCV && {
                    borderColor: '#ff4d4f',
                    borderWidth: '2px',
                  }),
                }}
                onClick={() => setSelectedCV(item.value)}
              >
                <Image alt={`CV-${item.value}`} src={item.url} />
              </Box>
            );
          })}
        </Box>
      </Drawer>
    </Container>
  );
};

export default ViewResume;
