import AOS from 'aos';
import Router from './routes';
import { useEffect } from 'react';
import ThemProvider from './theme';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  getCurrentJobSeeker,
  getInfoAdmin,
  getInfoEmployer,
} from './store/auth/action';
import { getLocations } from './store/location/actions';
import { getIndustries } from './store/industries/actions';
export interface IAppProps {}

export default function App(props: IAppProps) {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getIndustries());
    if (localStorage.getItem('role') === '2') {
      dispatch(getInfoEmployer());
    }
    if (localStorage.getItem('role') === '1') {
      dispatch(getCurrentJobSeeker());
    }
    if (localStorage.getItem('role') === '0') {
      dispatch(getInfoAdmin());
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <ThemProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer autoClose={1000} position='top-center' />
        <CssBaseline />
        <Router />
      </LocalizationProvider>
    </ThemProvider>
  );
}
