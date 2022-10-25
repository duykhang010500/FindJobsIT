import { styled, Card, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

type Props = {};

const CardStyle = styled(Card)({
  p: 3,
  border: `1px solid #f0f0f0`,
  '&:hover': {
    borderColor: '#ffd6e7',
    backgroundColor: '#fff0f6',
  },
  boxShadow: 'none',
});

const JobBenefit = (props: Props) => {
  const { job } = useSelector((state: AppState) => state.jobs);

  return (
    <CardStyle>
      <Typography variant='body1' component='div' sx={{ lineHeight: 2 }}>
        <Typography variant='h3'>Benefits</Typography>
        <div dangerouslySetInnerHTML={{ __html: job?.job_benefits }}></div>
      </Typography>
    </CardStyle>
  );
};

export default JobBenefit;
