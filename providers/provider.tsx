'use client';

import { FC, Fragment, PropsWithChildren } from 'react';
import { ThemeProvider } from '@/providers/theme-provider';

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme={'system'}
      enableSystem
      disableTransitionOnChange
    >
      <Fragment>{children}</Fragment>
    </ThemeProvider>
  );
};

export default Provider;
