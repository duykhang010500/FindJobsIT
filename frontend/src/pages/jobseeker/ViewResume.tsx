import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  PDFDownloadLink,
  PDFViewer,
  Page,
  Document,
  View,
  Text,
} from '@react-pdf/renderer';

import { Container, Button, Box, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import ViewProfile from '../../components/ViewProfile';

import { AppState } from '../../store/reducer';

import { PDFExport } from '@progress/kendo-react-pdf';

type Props = {};

const ViewResume = (props: Props) => {
  const { cv } = useSelector((state: AppState) => state.cv);

  const [selectedCV, setSelectedCV] = useState<null | number>(null);

  useEffect(() => {
    setSelectedCV(cv?.cv_type || null);
  }, [cv]);

  const pdfExportComponent = useRef<any>(null);

  const handleExportWithFunction = () => {
    pdfExportComponent.current.save();
  };

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
      <Box sx={{ width: '210mm', textAlign: 'right', margin: 'auto' }}>
        <Button
          variant='contained'
          sx={{ mb: 3 }}
          onClick={exportPDF}
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
      </Box>
      <PDFExport ref={pdfExportComponent} paperSize='A4' scale={0.75}>
        <ViewProfile resume={cv} type={selectedCV || 2} />
      </PDFExport>
    </Container>
  );
};

export default ViewResume;
