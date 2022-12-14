import { FC, useEffect, useState } from 'react';

import {
  useNavigate,
  useSearchParams,
  useLocation,
  createSearchParams,
} from 'react-router-dom';

import {
  Grid,
  Button,
  useTheme,
  TextField,
  Autocomplete,
  InputAdornment,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';

import { Search } from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';

import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { getDefaultMultiple, getIdFromArr } from '../../utils/convert';
import { useDispatch } from 'react-redux';
import { searchJobs } from '../../store/jobs/actions';

type Props = {};

export const useSearchBar: any = () => {
  const theme = useTheme();

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const smOnly = useMediaQuery(theme.breakpoints.down('sm'));

  const { locations } = useSelector((state: AppState) => state.location);

  const { industries } = useSelector((state: AppState) => state.industries);

  const { jobsSearch } = useSelector((state: AppState) => state.jobs);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line
  const [industriesOptions, setIndustriesOptions] = useState<any>([]);

  const [keywords, setKeywords] = useState<string>('');

  const [locationIds, setLocationIds] = useState<string>('');

  const [industryIds, setIndustryIds] = useState<string>('');

  const [locationsDefault, setLocationsDefault] = useState<any>([]);

  const [industriesDefault, setIndustriesDefault] = useState<any>([]);

  const handleChangeKeyword = (e: any) => {
    setKeywords(e.target.value);
  };

  const handleChangeIndustries = (e: any, value: any) => {
    setIndustriesDefault(value);
    setIndustryIds(getIdFromArr(value));
  };

  const handleChangeLocation = (e: any, value: any) => {
    setLocationsDefault(value);
    setLocationIds(getIdFromArr(value));
  };

  const searchTemp = searchParams.get('keywords');
  const industriesTemp = searchParams.get('industryIds');
  const locationsTemp = searchParams.get('locationIds');

  useEffect(() => {
    if (industriesTemp) {
      setIndustryIds(industriesTemp);
    }
  }, [industriesTemp]);

  useEffect(() => {
    if (searchTemp || industriesTemp || locationsTemp) {
      dispatch(searchJobs(1, searchTemp, locationsTemp, industriesTemp));
      console.log('Search temp: ');
    } else {
      if (pathname !== '/') {
        dispatch(searchJobs(1));
      }
    }
  }, [dispatch, searchTemp, industriesTemp, locationsTemp]);

  useEffect(() => {
    if (searchTemp) {
      setKeywords(searchTemp);
    }
    if (industriesTemp) {
      setIndustriesDefault(getDefaultMultiple(industriesTemp, industries));
    }
    if (locationsTemp) {
      setLocationsDefault(getDefaultMultiple(locationsTemp, locations));
    }
  }, [searchTemp, industries, industriesTemp, locations, locationsTemp]);

  const handleSearch = () => {
    dispatch(searchJobs(1, keywords, locationIds, industryIds));
    navigate({
      pathname: '/search',
      search: createSearchParams({
        keywords,
        locationIds,
        industryIds,
      }).toString(),
    });
  };

  const handleLoadMore = () => {
    dispatch(
      searchJobs(
        jobsSearch?.currentPage + 1,
        keywords,
        locationIds,
        industryIds
      )
    );
  };

  const search = () => {
    return (
      <>
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label='Keyword'
              size={smOnly ? 'small' : 'medium'}
              onChange={handleChangeKeyword}
              value={keywords}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id='location'
              multiple
              disableListWrap
              popupIcon={false}
              options={locations}
              getOptionLabel={(option: any) => option.name}
              value={locationsDefault || []}
              onChange={handleChangeLocation}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='City'
                  size={smOnly ? 'small' : 'medium'}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              id='industry'
              multiple
              disableListWrap
              popupIcon={false}
              options={industries}
              getOptionLabel={(option: any) => option.name}
              value={industriesDefault || []}
              onChange={handleChangeIndustries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Industry'
                  size={smOnly ? 'small' : 'medium'}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              size='large'
              variant='contained'
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{ height: '53px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderButtonLoadMore = () => {
    return (
      jobsSearch.currentPage < jobsSearch.totalPages && (
        <Button variant='contained' onClick={handleLoadMore}>
          Load more
        </Button>
      )
    );
  };

  return {
    renderButtonLoadMore,
    search,
  };
};

// export default SearchBar;
