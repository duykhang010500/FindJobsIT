import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Typography, Breadcrumbs, Link, Button, Box } from '@mui/material';

import { adminGetServicesList } from '../../../store/services/actions';
import ServicesList from '../../../sections/admin-dasboard/services-management/ServicesList';

import AddIcon from '@mui/icons-material/Add';

type Props = {};

const ServicesPage = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(adminGetServicesList());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h3' gutterBottom>
        Services List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Breadcrumbs sx={{ mt: 3 }}>
          <Link component={RouterLink} to='/'>
            Dashboard
          </Link>
          <Typography>Services List</Typography>
        </Breadcrumbs>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => navigate('/admin/services/new')}
        >
          New service
        </Button>
      </Box>
      <ServicesList />
    </>
  );
};

export default ServicesPage;
