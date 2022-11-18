import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Container, Button, Box, Drawer, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import ViewProfile from '../../components/ViewProfile';

import { AppState } from '../../store/reducer';

type Props = {};

const ViewResume = ({}: Props) => {
  const { cv } = useSelector((state: AppState) => state.cv);

  const [open, setOpen] = useState<boolean>(false);

  const [selectedCV, setSelectedCV] = useState<null | number>(null);

  useEffect(() => {
    setSelectedCV(cv?.cv_type || null);
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
    <Container sx={{ mt: 15 }}>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' onClick={() => setOpen(true)}>
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
      </Stack>

      <ViewProfile resume={cv} type={selectedCV || 3} />
      <Drawer anchor='right' open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: '300px' }}></Box>
      </Drawer>
    </Container>
  );
};

export default ViewResume;
