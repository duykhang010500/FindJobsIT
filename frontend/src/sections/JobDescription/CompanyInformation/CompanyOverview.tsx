import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  styled,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
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
  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item xs={12} sm={4}>
        <Link to={`/`}>
          <Img
            src='https://hr1tech.com/htdocs/images/owners/hr1tech/logo/202208/297980425-582564363521951-8038544366924303576-n.jpg'
            alt='logo'
          />
        </Link>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Stack spacing={2}>
          <Typography variant='h3' color='primary'>
            FPT Software
          </Typography>
          <List disablePadding sx={{ maxWidth: '300px' }}>
            <ListItem
              disableGutters
              secondaryAction={
                <Typography sx={{ verticalAlign: 'middle' }} variant='body2'>
                  500
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
                  www.ute.edu.vn
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
                  District 9, Thu Duc City
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
