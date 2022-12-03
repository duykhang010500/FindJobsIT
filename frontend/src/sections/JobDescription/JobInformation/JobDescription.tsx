import { Card, CardContent, Typography, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';

const JobDescription = () => {
  const { job } = useSelector((state: AppState) => state.jobs);

  return (
    <Card
      sx={{
        border: `1px solid #f0f0f0`,
        '&:hover': {
          borderColor: '#ffd6e7',
          backgroundColor: '#fff0f6',
        },
        boxShadow: 'none',
      }}
    >
      <CardContent>
        <Typography variant='h3' gutterBottom>
          Description
        </Typography>
        <Typography variant='body1' component={'div'} sx={{ lineHeight: 2 }}>
          <div
            dangerouslySetInnerHTML={{ __html: `${job?.job_description}` }}
          />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobDescription;
