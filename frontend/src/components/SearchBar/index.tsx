import { FC } from 'react';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Autocomplete,
  useTheme,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

import { Search, LocationOnOutlined } from '@mui/icons-material';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';

type Props = {};

const SearchBar: FC<Props> = () => {
  const theme = useTheme();
  const smOnly = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Grid container spacing={2} justifyContent='space-between'>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label='Job title'
          size={smOnly ? 'small' : 'medium'}
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
              size={smOnly ? 'small' : 'medium'}
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
              size={smOnly ? 'small' : 'medium'}
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
  );
};

export default SearchBar;
