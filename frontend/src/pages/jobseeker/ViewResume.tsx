import React, { useRef } from 'react';

import { Container, Button, Box } from '@mui/material';
import ViewProfile from '../../components/ViewProfile';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';

import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import DownloadIcon from '@mui/icons-material/Download';

type Props = {};

const ViewResume = (props: Props) => {
  const { cv } = useSelector((state: AppState) => state.cv);

  const pdfExportComponent = useRef(null);

  const contentArea = useRef<any>(null);

  const handleExportWithFunction = () => {
    savePDF(contentArea.current, {
      paperSize: 'a4',
      margin: 10,
      scale: 0.8,
    });
  };

  return (
    <Container sx={{ mt: 15 }}>
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
      <PDFExport
        ref={pdfExportComponent}
        paperSize='a3'
        margin={10}
        // scale={0.7}
      >
        <div ref={contentArea}>
          <ViewProfile resume={cv} />
        </div>
      </PDFExport>
    </Container>
  );
};

export default ViewResume;
