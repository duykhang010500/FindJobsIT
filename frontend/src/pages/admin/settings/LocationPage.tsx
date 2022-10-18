import { Breadcrumbs, Link, Typography } from '@mui/material';
import LocationList from '../../../sections/admin-dasboard/settings/LocationList';

type Props = {};

const LocationPage = (props: Props) => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Location
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Typography>Settings</Typography>
        <Typography>Location</Typography>
      </Breadcrumbs>
      <LocationList />
    </>
  );
};

export default LocationPage;
