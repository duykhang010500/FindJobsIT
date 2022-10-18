import AOS from 'aos';
import Router from './routes';
import { useEffect } from 'react';
import ThemProvider from './theme';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getInfoEmployer } from './store/auth/action';
export interface IAppProps {}

export default function App(props: IAppProps) {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getInfoEmployer());
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
      <ToastContainer autoClose={1000} position='top-center' />
      <CssBaseline />
      <Router />
    </ThemProvider>
  );
}
