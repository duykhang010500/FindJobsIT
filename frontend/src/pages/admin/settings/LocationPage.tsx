import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
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
      <Typography variant='h3' gutterBottom>
        Location
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
          <Typography>Location</Typography>
        </Breadcrumbs>
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
