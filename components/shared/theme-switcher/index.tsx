'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const t = useTranslations('ThemeSwitcher');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={
            'rounded-full bg-black text-black hover:text-black dark:bg-white dark:text-white dark:hover:text-black'
          }
          variant='outline'
          size='icon'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-white transition-all dark:-rotate-90 dark:scale-0 dark:text-white' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-black transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={'bg-black text-white dark:bg-white dark:text-black'}
        align='end'
      >
        <DropdownMenuItem onClick={() => setTheme('light')}>{t('light')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>{t('dark')}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>{t('system')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
