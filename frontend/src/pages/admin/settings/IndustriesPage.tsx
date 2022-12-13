import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
} from '@mui/material';

import {
  adminGetIndustriesList,
  closeModal,
  openModal,
} from '../../../store/industries/actions';
import IndustriesList from '../../../sections/admin-dasboard/settings/industries/IndustriesList';

import AddIcon from '@mui/icons-material/Add';
import { AppState } from '../../../store/reducer';
import IndustryNewForm from '../../../sections/admin-dasboard/settings/industries/IndustryNewForm';
import { IIndustry } from '../../../store/industries/types';

type Props = {};

const IndustriesPage = (props: Props) => {
  const dispatch = useDispatch();

  const { industries, isOpenModal, selectedIndustryId } = useSelector(
    (state: AppState) => state.industries
  );

  const industry = industries.find(
    (industry: IIndustry) => industry.id === selectedIndustryId
  );

  useEffect(() => {
    dispatch(adminGetIndustriesList());
  }, [dispatch]);

  const handleOpen = () => {
    dispatch(openModal());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

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
            <Link component={RouterLink} to={`/admin/settings/location`}>
              Location
            </Link>
            <Typography variant='h5' fontWeight={700} sx={{ color: '#9254de' }}>
              List
            </Typography>
          </Breadcrumbs>
        </Card>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          New Industry
        </Button>
      </Box>
      <IndustriesList />
      <Dialog open={isOpenModal} onClose={handleClose}>
        <DialogTitle>
          <Typography variant='body1' sx={{ fontWeight: 500 }}>
            {selectedIndustryId ? 'Edit Industry' : 'New Industry'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <IndustryNewForm industry={industry || {}} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IndustriesPage;
