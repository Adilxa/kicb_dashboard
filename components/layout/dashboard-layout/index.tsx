import React from 'react';
import Aside from '@/components/layout/aside';

const DashboardLayoutComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'flex items-start'}>
      <Aside />
      <main className={'flex-1'}>{children}</main>
    </div>
  );
};

export default DashboardLayoutComponent;
