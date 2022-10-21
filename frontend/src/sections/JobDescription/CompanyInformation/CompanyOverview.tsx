import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {
  Link,
  Grid,
  List,
  Stack,
  styled,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { AppState } from '../../../store/reducer';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

type Props = {};

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '150px',
  height: '150px',
  maxWidth: '100%',
  maxHeight: '100%',
  borderRadius: '50%',
  boxShadow:
    'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
});

const CompanyOverview = (props: Props) => {
  const { job } = useSelector((state: AppState) => state.jobs);
  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={12} sm={4}>
        <RouterLink to={`/`}>
          <Img src={`${job?.company?.logo}`} alt='logo' />
        </RouterLink>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Stack spacing={2}>
          <Link to={`/`} component={RouterLink}>
            <Typography variant='h3'>{job?.company?.name}</Typography>
          </Link>
          <List disablePadding sx={{ maxWidth: '300px' }}>
            <ListItem
              disableGutters
              secondaryAction={
                <Typography sx={{ verticalAlign: 'middle' }} variant='body2'>
                  {job?.company?.company_size}
                </Typography>
              }
            >
              <ListItemIcon>
                <BusinessOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Company Size:</ListItemText>
            </ListItem>
            <ListItem
              disableGutters
              secondaryAction={
                <Typography sx={{ verticalAlign: 'middle' }} variant='body2'>
                  {job?.company?.website}
                </Typography>
              }
            >
              <ListItemIcon>
                <PublicOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Website:</ListItemText>
            </ListItem>
            <ListItem
              disableGutters
              secondaryAction={
                <Typography sx={{ verticalAlign: 'middle' }} variant='body2'>
                  {job?.company?.location}
                </Typography>
              }
            >
              <ListItemIcon>
                <PlaceOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Location:</ListItemText>
            </ListItem>
          </List>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CompanyOverview;
