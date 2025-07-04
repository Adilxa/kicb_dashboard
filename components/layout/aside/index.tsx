'use client';

import { AsideConsts } from '@/constants/aside.consts';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import style from './aside.module.scss';

function Aside() {
  const pathname = usePathname();
  const router = useRouter();

  const onClickRouter = (navigateTo: string) => {
    router.push(navigateTo, { scroll: false });
  };

  const innerTabPathname = (path: string, item: string) => {
    return item?.split('/')[1] == path?.split('/')[1];
  };

  const t = useTranslations('Aside');

  return (
    <aside id={'aside'} className={`${style.wrapper} dark:bg-[var(--bgdark)]`}>
      <h1></h1>
      <section>
        {AsideConsts.map((item, index) => (
          <div
            onClick={() => {
              item.clickable == true && onClickRouter(item.to);
            }}
            className={`${innerTabPathname(pathname, item.to) ? `${style.active} group bg-[#18181B]` : `${style.btn} group`}`}
            key={index}
          >
            <div className={'flex items-center'}>
              <Image src={item.logo} alt={item.title} width={24} height={24} />
              <h5
                className={` ${pathname === item.to ? 'text-white' : 'text-[var(--bgdark)] group-hover:text-white'} text-black transition-colors duration-200 dark:text-white`}
              >
                {t(item.title)}
              </h5>
            </div>
          </div>
        ))}
      </section>
    </aside>
  );
}

export default Aside;
