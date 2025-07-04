'use client';

import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface RegionData {
  name: string;
  value: number;
  color: string;
  opacity?: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: { payload: RegionData }[];
}

const data: RegionData[] = [
  { name: 'Чуй', value: 450000, color: '#3B82F6' },
  { name: 'Ош', value: 280000, color: '#10B981' },
  { name: 'Жалал-Абад', value: 120000, color: '#F59E0B' },
  { name: 'Баткен', value: 45000, color: '#EF4444' },
  { name: 'Нарын', value: 35000, color: '#8B5CF6' },
  { name: 'Талас', value: 25000, color: '#06B6D4' },
  { name: 'Иссык-Куль', value: 15000, color: '#84CC16' },
];

const RegionalClientsChart = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showPercentages, setShowPercentages] = useState(true);

  const t = useTranslations('RegionalChart');

  const isMobile = useMediaQuery('(max-width: 1200px)');

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className='rounded-lg border bg-white p-2 text-xs shadow-lg dark:border-gray-300 dark:bg-gray-900 sm:p-3 sm:text-sm'>
          <p className='font-medium text-gray-900 dark:text-gray-100'>{data.name}</p>
          <p className='text-xs sm:text-sm' style={{ color: data.color }}>
            {t('clients')}: {data.value.toLocaleString()}
          </p>
          <p className='text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
            {t('part')}: {percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  const getVisibleData = (): RegionData[] => {
    if (selectedRegion) {
      return data.map(item => ({
        ...item,
        opacity: item.name === selectedRegion ? 1 : 0.3,
      }));
    }
    return data;
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const interval = setTimeout(() => setLoading(false), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isMobile]);

  if (loading)
    return (
      <div className={'flex h-full w-full animate-spin items-center justify-center'}>
        <LoaderCircle />
      </div>
    );
  return (
    <div className='h-full w-full rounded-lg bg-white p-3 shadow dark:bg-gray-900 sm:p-4 lg:p-6'>
      <div className='mb-3 sm:mb-6'>
        <div className='mb-2 flex flex-wrap gap-1 sm:mb-4 sm:gap-2'>
          <button
            onClick={() => setSelectedRegion(null)}
            className={`rounded-lg px-2 py-1 text-xs font-medium transition-all sm:px-3 sm:py-2 sm:text-sm lg:px-4 ${
              selectedRegion === null
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className='block sm:hidden'>{t('all')}</span>
            <span className='hidden sm:block'>{t('allRegions')}</span>
          </button>
          <button
            onClick={() => setShowPercentages(!showPercentages)}
            className='rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:px-3 sm:py-2 sm:text-sm lg:px-4'
          >
            <span className='block sm:hidden'>{showPercentages ? '%→№' : '№→%'}</span>
            <span className='hidden sm:block'>{showPercentages ? '%→№' : '№→%'}</span>
          </button>
        </div>
      </div>

      <div className='h-48 sm:h-64 lg:h-80 xl:h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={getVisibleData()}
              cx='50%'
              cy='50%'
              innerRadius={window.innerWidth < 640 ? 40 : window.innerWidth < 1024 ? 60 : 80}
              outerRadius={window.innerWidth < 640 ? 80 : window.innerWidth < 1024 ? 110 : 140}
              paddingAngle={2}
              dataKey='value'
              animationBegin={0}
              animationDuration={800}
            >
              {getVisibleData().map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  fillOpacity={entry.opacity ?? 1}
                  stroke={selectedRegion === entry.name ? '#ffffff' : 'none'}
                  strokeWidth={selectedRegion === entry.name ? 2 : 0}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />

            <text
              x='50%'
              y='45%'
              textAnchor='middle'
              dominantBaseline='middle'
              className='fill-gray-900 text-sm font-bold dark:fill-white sm:text-base lg:text-lg xl:text-xl'
            >
              {t('summary')}
            </text>
            <text
              x='50%'
              y='55%'
              textAnchor='middle'
              dominantBaseline='middle'
              className='fill-gray-600 text-xs font-semibold dark:fill-gray-300 sm:text-sm lg:text-base xl:text-lg'
            >
              {window.innerWidth < 640
                ? `${Math.round(total / 1000)}K+`
                : `${total.toLocaleString()}+`}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='mt-2 flex flex-wrap gap-1 sm:mt-4 sm:gap-2'>
        {data.map((entry, index) => {
          const percentage = ((entry.value / total) * 100).toFixed(1);
          const isSelected = selectedRegion === entry.name;

          return (
            <div
              key={index}
              className={`flex cursor-pointer items-center gap-1 rounded-lg p-1 transition-all sm:gap-2 sm:p-2 ${
                isSelected
                  ? 'bg-gray-300 shadow-md dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
              onClick={() => setSelectedRegion(isSelected ? null : entry.name)}
            >
              <div
                className='h-2 w-2 flex-shrink-0 rounded-full sm:h-3 sm:w-3'
                style={{ backgroundColor: entry.color }}
              />
              <div className='min-w-0 flex-1'>
                <div className='truncate text-xs font-medium text-gray-900 dark:text-gray-100 sm:text-sm'>
                  {entry.name}
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  {showPercentages
                    ? `${percentage}%`
                    : window.innerWidth < 640
                      ? `${Math.round(entry.value / 1000)}K`
                      : entry.value.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionalClientsChart;
