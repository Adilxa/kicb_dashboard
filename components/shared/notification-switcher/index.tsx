'use client';

import { Bell, BellRing } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';

const NotificationSwitcher = () => {
  const [isActive, setActive] = React.useState(false);

  return (
    <Button
      className='rounded-full bg-black text-white hover:text-white dark:bg-white dark:text-black'
      variant='outline'
      size='icon'
      onClick={() => setActive(prev => !prev)}
    >
      {isActive ? (
        <BellRing className='h-[1.2rem] w-[1.2rem] transition-all' />
      ) : (
        <Bell className='h-[1.2rem] w-[1.2rem] transition-all' />
      )}
    </Button>
  );
};

export default NotificationSwitcher;
