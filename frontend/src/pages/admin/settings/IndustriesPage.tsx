import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
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
      <Typography variant='h3' gutterBottom>
        Industries
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Breadcrumbs sx={{ mt: 3 }}>
          <Link>Dashboard</Link>
          <Typography>Settings</Typography>
          <Typography>Industries</Typography>
        </Breadcrumbs>
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
