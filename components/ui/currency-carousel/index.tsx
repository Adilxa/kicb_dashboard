'use client';

import { banks } from '@/constants/mock.cards';
import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Container from '@/components/ui/container';

const CurrencyCarousel = () => {
  const t = useTranslations();
  return (
    <Container>
      <div className='mx-auto w-full p-0 sm:p-4'>
        <Carousel className='w-full'>
          <CarouselContent className='-ml-2 md:-ml-4'>
            {banks.map((bank, index) => (
              <CarouselItem
                key={index}
                className='basis-full pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4'
              >
                <Card className='h-full border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-900'>
                  <CardHeader className='pb-3'>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='text-sm font-semibold text-gray-900 dark:text-white'>
                        {bank.name}
                      </CardTitle>
                      <div className='flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400'>
                        <Clock className='h-3 w-3' />
                        {bank.time}
                      </div>
                    </div>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {t(bank.status.split('|')[0].trim())} | {t(bank.status.split('|')[1].trim())}
                    </p>
                  </CardHeader>
                  <CardContent className='pt-0'>
                    <div className='space-y-3'>
                      {bank.rates.map((rate, rateIndex) => (
                        <div
                          key={rateIndex}
                          className='flex items-center justify-between border-b border-gray-100 py-2 last:border-b-0 dark:border-gray-800'
                        >
                          <div className='flex items-center gap-2'>
                            <span className='text-lg'>{rate.flag}</span>
                            <span className='text-sm font-medium text-gray-900 dark:text-white'>
                              {rate.currency}
                            </span>
                          </div>
                          <div className='flex items-center gap-3 text-sm'>
                            <span className='font-medium text-gray-900 dark:text-white'>
                              {rate.buy}
                            </span>
                            <span className='text-gray-600 dark:text-gray-300'>{rate.sell}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='-left-12 hidden border-gray-200 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:flex' />
          <CarouselNext className='-right-12 hidden border-gray-200 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:flex' />
        </Carousel>
      </div>
    </Container>
  );
};

export default CurrencyCarousel;
