import * as React from 'react';
import Router from './routes';
import ThemProvider from './theme';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface IAppProps {}

export default function App(props: IAppProps) {
  const location = useLocation();
  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
  return (
    <ThemProvider>
      <ToastContainer autoClose={2000} position='top-center' />
      <CssBaseline />
      <Router />
    </ThemProvider>
  );
}
