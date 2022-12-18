import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Card, Stack, Avatar, Typography, Tooltip } from '@mui/material';

import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import { HiOutlineLocationMarker } from 'react-icons/hi';

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
    <Card
      sx={{
        p: 2,
        mt: 2,
        '&:hover': {
          boxShadow: '4px 4px 16px 0px rgba(245, 34, 45,0.2)',
        },
      }}
    >
      <Stack direction='row' spacing={2} alignItems='center'>
        <Avatar
          sx={{ width: 80, height: 80 }}
          src={candidate?.member?.avatar}
        />
        <Stack spacing={0.5}>
          {canViewDetailOnSearch >= 0 ? (
            <Typography
              variant='h4'
              sx={{
                color: '#000',
                textDecoration: 'none',
                '&:hover': {
                  color: '#faad14',
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
                sx={{
                  color: '#ff4d4f',
                  textDecoration: 'none',
                }}
              >
                {candidate?.member?.fullname}
              </Typography>
            </Tooltip>
          )}

          <Typography variant='h4' sx={{ color: '#096dd9' }}>
            {candidate?.resume_title}
          </Typography>
          <Stack direction={'row'} alignItems='center' spacing={1}>
            <HiOutlineLocationMarker
              style={{
                marginRight: '7px',
                fontSize: '1.2rem',
                color: '#ff4d4f',
              }}
            />
            <Typography variant='body2'>
              {candidate?.locations?.map((item: any, inx: number) => {
                if (inx === 0) {
                  return <>{item.name}</>;
                } else {
                  return <>, {item.name}</>;
                }
              })}
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems='center' spacing={1}>
            <LocalAtmOutlinedIcon
              style={{
                marginRight: '7px',
                fontSize: '1.2rem',
                color: '#52c41a',
                verticalAlign: 'bottom',
              }}
            />
            <Typography variant='body2'>
              {candidate?.salary_unit !== 'Negotiate' ? (
                <>
                  {candidate?.salary_from} - {candidate?.salary_to}{' '}
                  {candidate?.salary_unit}
                </>
              ) : (
                <>Negotiate</>
              )}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CandidateCard;
