import React from 'react';
import Container from '@/components/ui/container';
import DepositChart from '@/components/ui/deposit-chart';
import DistrubutionChart from '@/components/ui/distrubution-chart';
import RegionalClientsChart from '@/components/ui/regional-chart';

const DashboardScreen = () => {
  return (
    <Container>
      <div className='flex h-full w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6'>
        <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6'>
          <div className='col-span-1 w-full'>
            <DepositChart />
          </div>

          <div className='col-span-1 w-full'>
            <DistrubutionChart />
          </div>

          <div className='col-span-1 w-full sm:col-span-2 lg:col-span-1'>
            <RegionalClientsChart />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DashboardScreen;
