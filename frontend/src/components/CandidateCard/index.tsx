import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Card, Stack, Avatar, Typography, Tooltip } from '@mui/material';
import { AppState } from '../../store/reducer';

type Props = {
  candidate: any;
};

const CandidateCard = ({ candidate }: Props) => {
  const { activeServices } = useSelector((state: AppState) => state.services);

  const canViewDetailOnSearch = activeServices.findIndex(
    (item: any) => item.id === 13
  );

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Stack direction='row' spacing={2}>
        <Avatar
          sx={{ width: 80, height: 80 }}
          src={candidate?.member?.avatar}
        />
        <Stack>
          {canViewDetailOnSearch >= 0 ? (
            <Typography
              variant='h4'
              gutterBottom
              sx={{
                color: '#ff4d4f',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              component={Link}
              to={`/employer/candidates/${candidate?.id}`}
            >
              {candidate?.member?.fullname}
            </Typography>
          ) : (
            <Tooltip
              placement='top'
              title='Please buy service to view detail resume!'
            >
              <Typography
                variant='h4'
                gutterBottom
                sx={{
                  color: '#ff4d4f',
                  textDecoration: 'none',
                }}
              >
                {candidate?.member?.fullname}
              </Typography>
            </Tooltip>
          )}

          <Typography variant='h5' sx={{ color: '#096dd9' }}>
            {candidate?.resume_title}
          </Typography>
          <div>
            <Typography variant='caption'>Working at: </Typography>
            <Typography variant='caption' fontWeight={500}>
              {candidate?.locations?.map((item: any, inx: number) => {
                if (inx === 0) {
                  return <>{item.name}</>;
                } else {
                  return <>, {item.name}</>;
                }
              })}
            </Typography>
          </div>
          <div>
            <Typography variant='caption'>Salary: &nbsp;</Typography>
            <Typography variant='caption' fontWeight={500}>
              {candidate?.salary_unit !== 'Negotiate' ? (
                <>
                  {candidate?.salary_from} - {candidate?.salary_to}{' '}
                  {candidate?.salary_unit}
                </>
              ) : (
                <>Negotiate</>
              )}
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CandidateCard;
