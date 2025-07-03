import * as React from 'react';
import LocaleSwitcher from '@/components/shared/locale-switcher';
import NotificationSwitcher from '@/components/shared/notification-switcher';
import { ModeToggle } from '@/components/shared/theme-switcher';
import UsersProfileWidget from '@/components/shared/users-profile-widget';
import Container from '@/components/ui/container';

export default function Header() {
  return (
    <header className='w-full bg-white text-white dark:bg-[var(--bgdark)]'>
      <Container className='mx-auto w-full px-4'>
        <div className='flex items-center justify-end py-4'>
          <div className={'flex items-center gap-3'}>
            <LocaleSwitcher />
            <ModeToggle />
            <NotificationSwitcher />
            <UsersProfileWidget />
          </div>
        </div>
      </Container>
    </header>
  );
}
