import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Breadcrumbs, Link, Card } from '@mui/material';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';

import { AppState } from '../../../store/reducer';

import { adminGetServicesList } from '../../../store/services/actions';
import ServiceNewForm from '../../../sections/admin-dasboard/services-management/ServiceNewForm';

type Props = {};

const CreateService = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isEditPage = pathname.includes('/edit');
  const { list } = useSelector((state: AppState) => state.services);

  // eslint-disable-next-line
  const service = list.find((item: any) => item.id == id);

  useEffect(() => {
    dispatch(adminGetServicesList());
  }, [dispatch]);

  return (
    <>
      <Card sx={{ p: 2, backgroundColor: '#fff', display: 'inline-block' }}>
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
            {isEditPage ? 'Edit' : 'Create'}
          </Typography>
        </Breadcrumbs>
      </Card>

      <ServiceNewForm isEdit={isEditPage} service={service} />
    </>
  );
};

export default CreateService;
