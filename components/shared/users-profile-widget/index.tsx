import { useTranslations } from 'next-intl';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UsersProfileWidget = () => {
  const t = useTranslations('User');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-[35px] w-[35px] cursor-pointer'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={'bg-black text-white dark:bg-white dark:text-black'}
        align='end'
      >
        <DropdownMenuItem>{t('profile')}</DropdownMenuItem>
        <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsersProfileWidget;
