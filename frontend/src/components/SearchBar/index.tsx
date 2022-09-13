import { FC } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
} from '@mui/material';

import { Search, LocationOnOutlined } from '@mui/icons-material';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

type Props = {};

const SearchBar: FC<Props> = () => {
  const DataDemo = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        padding: 5,
        backgroundColor: 'white',
        borderRadius: '8px',
        position: 'absolute',
        marginTop: 30,
        width: '70vw',
      }}
      flexDirection='column'
    >
      {/* <Typography variant='body2' gutterBottom sx={{ marginBottom: 3 }}>
        Find your job suitable with you!
      </Typography> */}
      <Grid container spacing={2} justifyContent='space-between'>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label='Job Title'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            id='combo-box-city'
            disablePortal
            popupIcon={false}
            options={DataDemo}
            renderInput={(params) => (
              <TextField
                {...params}
                label='City'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LocationOnOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Autocomplete
            id='combo-box-job'
            disablePortal
            popupIcon={false}
            options={DataDemo}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Job'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <BusinessCenterOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button
            sx={{ height: '100%' }}
            fullWidth
            size='large'
            variant='contained'
            startIcon={<Search />}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
