import { FC } from 'react';
import { Container, styled } from '@mui/material';
import JobDescriptionHeader from '../sections/JobDescription/JobDescriptionHeader';

type Props = {};

const JobDescriptionWrapper = styled(Container)({
  marginTop: '80px',
});

const JobDescription: FC<Props> = () => {
  return (
    <JobDescriptionWrapper>
      <JobDescriptionHeader />
    </JobDescriptionWrapper>
  );
};

export default JobDescription;
