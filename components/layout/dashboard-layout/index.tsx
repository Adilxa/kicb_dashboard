import React from 'react';
import Aside from '@/components/layout/aside';
import Header from '@/components/layout/header';
import CurrencyCarousel from '@/components/ui/currency-carousel';

const DashboardLayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'flex items-start'}>
      <Aside />
      <div
        className={
          'scrollable flex flex-1 flex-col items-center gap-4 overflow-y-auto overflow-x-hidden'
        }
      >
        <Header />
        <main>{children}</main>
        <CurrencyCarousel />
      </div>
    </div>
  );
};

export default DashboardLayoutComponent;
