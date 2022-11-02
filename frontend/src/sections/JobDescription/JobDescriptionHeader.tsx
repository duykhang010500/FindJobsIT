import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Grid,
  Card,
  Link,
  Stack,
  Button,
  styled,
  Typography,
} from '@mui/material';

import UpdateIcon from '@mui/icons-material/Update';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { AppState } from '../../store/reducer';
import ApplyForm from './ApplyForm';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { saveJob } from '../../store/jobsSaved/action';

import ApartmentIcon from '@mui/icons-material/Apartment';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

type Props = {};

const RootStyle = styled(Card)({
  padding: '30px 10px',
  borderRadius: '8px',
  boxShadow:
    'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
});

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const JobDescriptionHeader = (props: Props) => {
  const dispatch = useDispatch();

  const { job } = useSelector((state: AppState) => state.jobs);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const [open, setOpen] = useState<boolean>(false);

  // console.log(dayjs(new Date()).format('DD/MM/YYYY'));

  const canApply = dayjs().isSameOrBefore(job?.end_date, 'day');
  // console.log();

  const handleOpen = () => {
    if (!currentUser) {
      toast.error('Please login to apply this job!');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveJob = () => {
    if (!currentUser) {
      toast.error('Please login to save this job!');
      return;
    }
    dispatch(saveJob(job?.id));
  };

  return (
    <RootStyle>
      <Grid
        container
        alignItems='center'
        spacing={3}
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      >
        <Grid item xs={12} sm={3} md={3}>
          {!job?.company?.logo ? (
            <ApartmentIcon sx={{ fontSize: 100, margin: '50px' }} />
          ) : (
            <Img
              src={`${job?.company?.logo}`}
              alt='logo'
              sx={{
                width: '120px',
                height: '120px',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #d9d9d9',
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={9} md={6}>
          <Stack spacing={1}>
            <Typography variant='h2' fontWeight={600} color='primary' noWrap>
              {job?.title}
            </Typography>
            <Link component={RouterLink} to={`/`}>
              <Typography variant='h4'>{job?.company.name}</Typography>
            </Link>
            <Typography variant='body2' color='rgb(99, 115, 129)'>
              <UpdateIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              {!canApply ? (
                <>Expires</>
              ) : (
                <>Expires in {dayjs(new Date()).from(job?.end_date, true)}</>
              )}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Stack
            spacing={2.5}
            direction='column'
            sx={{
              padding: {
                xs: '0px 30px',
                md: '0px',
                lg: '0px 50px',
              },
            }}
          >
            <Button
              size='large'
              variant='contained'
              onClick={handleOpen}
              startIcon={<IntegrationInstructionsIcon />}
              disabled={!canApply}
            >
              Apply now
            </Button>
            <Button
              size='large'
              variant='outlined'
              startIcon={<FavoriteBorderIcon />}
              onClick={handleSaveJob}
            >
              Save Job
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <ApplyForm job={job} open={open} close={handleClose} />
    </RootStyle>
  );
};

export default JobDescriptionHeader;
