import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Breadcrumbs, Link } from '@mui/material';
import CompaniesList from '../../../sections/admin-dasboard/employers-management/companies/CompaniesList';
import { adminGetCompaniesList } from '../../../store/companies/action';

type Props = {};

const CompanyList = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminGetCompaniesList());
  }, [dispatch]);
  return (
    <>
      <Typography variant='h3' gutterBottom>
        Companies
      </Typography>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link>Dashboard</Link>
        <Link>Employer Management</Link>
        <Typography>Companies</Typography>
      </Breadcrumbs>
      <CompaniesList />
    </>
  );
};

export default CompanyList;
