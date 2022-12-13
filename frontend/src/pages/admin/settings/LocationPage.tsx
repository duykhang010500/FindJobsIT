import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Card,
  Link,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  Breadcrumbs,
  DialogContent,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import {
  openModal,
  closeModal,
  adminGetLocation,
} from '../../../store/location/actions';

import { AppState } from '../../../store/reducer';
import LocationList from '../../../sections/admin-dasboard/settings/location/LocationList';
import LocationNewForm from '../../../sections/admin-dasboard/settings/location/LocationNewForm';
import { ILocation } from '../../../store/location/types';

type Props = {};

const LocationPage = (props: Props) => {
  const dispatch = useDispatch();

  const { isOpenModal, selectedLocationId, list } = useSelector(
    (state: AppState) => state.location
  );

  const selectedLocation = list.find(
    (location: ILocation) => location.id === selectedLocationId
  );

  useEffect(() => {
    dispatch(adminGetLocation());
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
          New Location
        </Button>
      </Box>
      <LocationList />
      <Dialog open={isOpenModal} onClose={handleClose}>
        <DialogTitle>
          <Typography variant='body1' sx={{ fontWeight: 500 }}>
            {selectedLocationId ? 'Edit location' : 'New location'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <LocationNewForm location={selectedLocation || {}} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationPage;
