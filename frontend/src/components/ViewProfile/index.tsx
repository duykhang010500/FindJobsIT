import { Box, styled } from '@mui/material';

import CV1 from './CV1';
import CV2 from './CV2';
import CV3 from './CV3';
import CVDefault from './CVDefault';

type Props = {
  resume: any;
  type?: number | null;
};

const CVWrapper = styled(Box)({
  width: '210mm',
  minHeight: '297mm',
  margin: 'auto',
  border: '1px solid #f0f0f0',
});

const ViewProfile = ({ resume, type }: Props) => {
  if (type === 1) {
    return (
      <CVWrapper id='content'>
        <CV1 resume={resume} />
      </CVWrapper>
    );
  }

  if (type === 2) {
    return (
      <CVWrapper id='content'>
        <CV2 resume={resume} />
      </CVWrapper>
    );
  }

  if (type === 3) {
    return (
      <CVWrapper id='content'>
        <CV3 resume={resume} />
      </CVWrapper>
    );
  }

  return (
    <CVWrapper id='content'>
      <CVDefault resume={resume} />
    </CVWrapper>
  );
};

export default ViewProfile;
