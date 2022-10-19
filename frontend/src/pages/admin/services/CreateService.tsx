import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Breadcrumbs, Link } from '@mui/material';
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
  const service = list.find((item: any) => item.id == id);

  useEffect(() => {
    dispatch(adminGetServicesList());
  }, [dispatch]);

  return (
    <>
      <Typography variant='h3' gutterBottom>
        {isEditPage ? 'Edit service' : 'CreateService'}
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link component={RouterLink} to='/'>
          Dashboard
        </Link>
        <Link component={RouterLink} to='/admin/services/list'>
          Services
        </Link>
        <Typography>{isEditPage ? 'Edit' : 'Create'}</Typography>
      </Breadcrumbs>
      <ServiceNewForm isEdit={isEditPage} service={service} />
    </>
  );
};

export default CreateService;
