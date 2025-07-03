import { Clock } from 'lucide-react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const CurrencyCarousel = () => {
  const banks = [
    {
      name: 'MICB',
      time: '18:00',
      status: 'Покупка | Продажа',
      rates: [
        { currency: 'USD', flag: '🇺🇸', buy: 89.4, sell: 90.1 },
        { currency: 'EUR', flag: '🇪🇺', buy: 97.7, sell: 98.4 },
        { currency: 'RUB', flag: '🇷🇺', buy: 1.14, sell: 1.19 },
        { currency: 'KZT', flag: '🇰🇿', buy: 0.18, sell: 0.2 },
      ],
    },
    {
      name: 'Optima Bank',
      time: '18:00',
      status: 'Покупка | Продажа',
      rates: [
        { currency: 'USD', flag: '🇺🇸', buy: 89.5, sell: 90.2 },
        { currency: 'EUR', flag: '🇪🇺', buy: 97.8, sell: 98.5 },
        { currency: 'RUB', flag: '🇷🇺', buy: 1.15, sell: 1.2 },
        { currency: 'KZT', flag: '🇰🇿', buy: 0.19, sell: 0.21 },
      ],
    },
    {
      name: 'Demir Bank',
      time: '18:00',
      status: 'Покупка | Продажа',
      rates: [
        { currency: 'USD', flag: '🇺🇸', buy: 89.6, sell: 90.3 },
        { currency: 'EUR', flag: '🇪🇺', buy: 97.9, sell: 98.6 },
        { currency: 'RUB', flag: '🇷🇺', buy: 1.16, sell: 1.21 },
        { currency: 'KZT', flag: '🇰🇿', buy: 0.2, sell: 0.22 },
      ],
    },
    {
      name: 'Bakai Bank',
      time: '18:00',
      status: 'Покупка | Продажа',
      rates: [
        { currency: 'USD', flag: '🇺🇸', buy: 89.3, sell: 90.0 },
        { currency: 'EUR', flag: '🇪🇺', buy: 97.6, sell: 98.3 },
        { currency: 'RUB', flag: '🇷🇺', buy: 1.13, sell: 1.18 },
        { currency: 'KZT', flag: '🇰🇿', buy: 0.17, sell: 0.19 },
      ],
    },
    {
      name: 'DoscredoBank',
      time: '18:00',
      status: 'Покупка | Продажа',
      rates: [
        { currency: 'USD', flag: '🇺🇸', buy: 89.2, sell: 89.9 },
        { currency: 'EUR', flag: '🇪🇺', buy: 97.5, sell: 98.2 },
        { currency: 'RUB', flag: '🇷🇺', buy: 1.12, sell: 1.17 },
        { currency: 'KZT', flag: '🇰🇿', buy: 0.16, sell: 0.18 },
      ],
    },
    {
      name: 'Bank of Asia',
      time: '18:00',
      status: 'Покупка | Продажа',
      rates: [
        { currency: 'USD', flag: '🇺🇸', buy: 89.8, sell: 90.5 },
        { currency: 'EUR', flag: '🇪🇺', buy: 98.1, sell: 98.8 },
        { currency: 'RUB', flag: '🇷🇺', buy: 1.18, sell: 1.23 },
        { currency: 'KZT', flag: '🇰🇿', buy: 0.22, sell: 0.24 },
      ],
    },
  ];

  return (
    <div className='mx-auto w-full p-4'>
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
                  <p className='text-xs text-gray-500 dark:text-gray-400'>{bank.status}</p>
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

      {/* Mobile navigation dots */}
      <div className='mt-4 flex justify-center gap-2 sm:hidden'>
        {banks.map((_, index) => (
          <div key={index} className='h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600' />
        ))}
      </div>
    </div>
  );
};

export default CurrencyCarousel;
