import * as React from 'react';
import Router from './routes';
import ThemProvider from './theme';
import { CssBaseline } from '@mui/material';
import { useLocation } from 'react-router-dom';
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
      <CssBaseline />
      <Router />
    </ThemProvider>
  );
}
