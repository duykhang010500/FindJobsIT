import React from 'react';

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

type Props = {
  company?: any;
  onOpen?: any;
  onClose?: any;
};

const DetailCompanyDialog = (props: Props) => {
  return (
    <Dialog open={props.onOpen}>
      {/* <DialogTitle>Detail</DialogTitle> */}
      <DialogContent>
        <Stack sx={{ mb: 2 }} direction='row' justifyContent='center'>
          <Avatar sx={{ width: 100, height: 100 }} variant='rounded' />
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
        <Button variant='outlined' onClick={props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailCompanyDialog;
