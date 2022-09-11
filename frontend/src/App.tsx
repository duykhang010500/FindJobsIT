import * as React from 'react';
import Router from './routes';
import ThemProvider from './theme';
import { CssBaseline } from '@mui/material';
export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <ThemProvider>
      <CssBaseline />
      <Router />
    </ThemProvider>
  );
}
