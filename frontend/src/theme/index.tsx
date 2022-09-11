import { FC, ReactNode } from 'react';
import {
  ThemeProvider as MUIProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import { themeCreator } from './interface';

type Props = {
  children: ReactNode;
  [x: string]: any;
};

const ThemProvider: FC<Props> = ({ children }) => {
  let theme = themeCreator('LightTheme');
  theme = responsiveFontSizes(theme);

  return <MUIProvider theme={theme}>{children}</MUIProvider>;
};

export default ThemProvider;
