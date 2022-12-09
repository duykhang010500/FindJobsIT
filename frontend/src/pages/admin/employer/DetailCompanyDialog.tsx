import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Stack,
  Avatar,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { adminUpdateCompanyStatus } from '../../../store/companies/action';

type Props = {
  company?: any;
  onOpen?: any;
  onClose?: any;
};

const DetailCompanyDialog = (props: Props) => {
  const location = useLocation();

  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const isActive = pathname.includes('active');
  const isRejected = pathname.includes('rejected');
  const isRequested = pathname.includes('requested');

  return (
    <Dialog open={props.onOpen}>
      {/* <DialogTitle>Detail</DialogTitle> */}
      <DialogContent>
        <Stack sx={{ mb: 2 }} direction='row' justifyContent='center'>
          <Avatar
            sx={{ width: 100, height: 100 }}
            variant='rounded'
            src={props?.company?.logo}
          />
        </Stack>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <TextField
              label='Name'
              fullWidth
              value={props?.company?.name}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label='Email'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={props?.company?.email}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label='Phone'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={props?.company?.phone}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label='Fax'
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              value={props?.company?.fax}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label='Tax'
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              value={props?.company?.tax}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label='Company size'
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              value={props?.company?.company_size}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              label='Location'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={props?.company?.location_name}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label='Industry'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={props?.company?.industry_name}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label='Website'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={props?.company?.website}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label='Address'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={props?.company?.address}
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              label='Description'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              multiline
              minRows={2}
              value={props?.company?.content}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {isActive && (
          <Button
            variant='contained'
            color='error'
            onClick={() =>
              dispatch(adminUpdateCompanyStatus(props?.company?.id, 3))
            }
          >
            Reject
          </Button>
        )}
        {isRejected && (
          <Button
            variant='contained'
            color='success'
            onClick={() =>
              dispatch(adminUpdateCompanyStatus(props?.company?.id, 1))
            }
          >
            Accept
          </Button>
        )}
        {isRequested && (
          <>
            <Button
              variant='contained'
              color='error'
              onClick={() =>
                dispatch(adminUpdateCompanyStatus(props?.company?.id, 3))
              }
            >
              Reject
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={() =>
                dispatch(adminUpdateCompanyStatus(props?.company?.id, 1))
              }
            >
              Accept
            </Button>
          </>
        )}
        <Button variant='outlined' onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailCompanyDialog;
