import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

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
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { AppState } from '../../store/reducer';
import ApplyForm from './ApplyForm';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteJobSaved, saveJob } from '../../store/jobsSaved/action';

import ApartmentIcon from '@mui/icons-material/Apartment';
import { openApplyForm } from '../../store/jobs/actions';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);

type Props = {};

const RootStyle = styled(Card)({
  marginTop: '10px',
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

  const { id } = useParams();

  const [saved, setSaved] = useState<boolean>(true);

  const [applied, setApplied] = useState<boolean>(false);

  const { job, appliedJobs } = useSelector((state: AppState) => state.jobs);

  const { list } = useSelector((state: AppState) => state.jobsSaved);

  const { currentUser } = useSelector((state: AppState) => state.auth);

  const [open, setOpen] = useState<boolean>(false);

  // console.log(dayjs(new Date()).format('DD/MM/YYYY'));

  const canApply = dayjs().isSameOrBefore(job?.end_date, 'day');

  useEffect(() => {
    if (list.find((item: any) => item.job_id === Number(id))) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  }, [list, id]);

  useEffect(() => {
    if (appliedJobs.find((item: any) => item.job_id === Number(id))) {
      setApplied(true);
    } else {
      setApplied(false);
    }
  }, [appliedJobs]);

  const handleOpen = () => {
    if (!currentUser) {
      toast.error('Please login to apply this job!');
      return;
    }
    dispatch(openApplyForm());
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveJob = () => {
    if (!currentUser) {
      toast.error('Please login to save this job!');
      return;
    }
    setSaved(false);
    dispatch(saveJob(job?.id));
  };

  const handleUnSavedJob = () => {
    if (!currentUser) {
      toast.error('Please login to save this job!');
      return;
    }
    setSaved(true);
    dispatch(deleteJobSaved(Number(id)));
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
            <Typography variant='h2' fontWeight={600} noWrap>
              {job?.title}
            </Typography>
            <Link
              component={RouterLink}
              to={`/company/${job?.company?.id}`}
              sx={{ color: '#4096ff' }}
            >
              <Typography variant='h4' color='inherit'>
                {job?.company.name}
              </Typography>
            </Link>
            <Typography variant='body2'>
              <UpdateIcon
                sx={{ verticalAlign: 'middle', mr: 1, color: '#ff4d4f' }}
              />
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
            {applied ? (
              <Button
                size='large'
                color='info'
                variant='contained'
                startIcon={<IntegrationInstructionsIcon />}
                sx={{ cursor: 'unset' }}
              >
                Applied
              </Button>
            ) : (
              <Button
                size='large'
                variant='contained'
                onClick={handleOpen}
                startIcon={<IntegrationInstructionsIcon />}
                disabled={!canApply}
              >
                Apply now
              </Button>
            )}
            {saved ? (
              <Button
                size='large'
                variant='outlined'
                startIcon={<FavoriteBorderIcon />}
                onClick={handleSaveJob}
              >
                Save Job
              </Button>
            ) : (
              <Button
                size='large'
                variant='contained'
                startIcon={<FavoriteRoundedIcon />}
                onClick={handleUnSavedJob}
              >
                Saved
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
      <ApplyForm job={job} open={open} close={handleClose} />
    </RootStyle>
  );
};

export default JobDescriptionHeader;
