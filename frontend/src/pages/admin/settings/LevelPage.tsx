import { Typography, Breadcrumbs, Link } from '@mui/material';
import LevelList from '../../../sections/admin-dasboard/settings/LevelList';

type Props = {};

const LevelPage = (props: Props) => {
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Level
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Typography>Settings</Typography>
        <Typography>Levels</Typography>
      </Breadcrumbs>
      <LevelList />
    </>
  );
};

export default LevelPage;
