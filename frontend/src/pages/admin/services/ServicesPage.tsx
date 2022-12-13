import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Box,
  Card,
} from '@mui/material';

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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Card
          sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block', mb: 2 }}
        >
          <Breadcrumbs
            sx={{ '&.MuiTypography-root': { fontWeight: 600 } }}
            separator='›'
            aria-label='breadcrumb'
          >
            <Link component={RouterLink} to={`/admin/dashboard`}>
              Dashboard
            </Link>
            <Link component={RouterLink} to={`/admin/services/list`}>
              Services
            </Link>
            <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
              List
            </Typography>
          </Breadcrumbs>
        </Card>
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
