'use client';

import { useTranslations } from 'next-intl';
import React, { FC, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  LegendProps,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ChartDataItem {
  year: number;
  juridical: number;
  physical: number;
}

const data: ChartDataItem[] = [
  { year: 2018, juridical: 15000, physical: 280000 },
  { year: 2019, juridical: 18000, physical: 350000 },
  { year: 2020, juridical: 22000, physical: 420000 },
  { year: 2021, juridical: 25000, physical: 480000 },
  { year: 2022, juridical: 28000, physical: 520000 },
  { year: 2023, juridical: 30000, physical: 500000 },
  { year: 2024, juridical: 32000, physical: 390000 },
];

type DataKey = 'juridical' | 'physical';
type SelectedType = 'both' | DataKey;

interface TooltipPayload {
  dataKey: DataKey;
  value: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: number;
}

const ClientDistributionChart: FC = () => {
  const [selectedType, setSelectedType] = useState<SelectedType>('both');
  const [showDataPoints, setShowDataPoints] = useState<boolean>(true);

  const t = useTranslations('clientDistributionChart');

  const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length && label !== undefined) {
      return (
        <div className='rounded-lg border bg-white p-2 text-xs shadow-lg dark:border-gray-300 dark:bg-gray-900 sm:p-3 sm:text-sm'>
          <p className='font-medium text-gray-900 dark:text-gray-100'>{`${t('tooltip.year')}: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className='text-xs sm:text-sm' style={{ color: entry.color || '#fff' }}>
              {entry.dataKey === 'juridical' ? t('juridical') : t('physical')}:{' '}
              {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend: FC<
    LegendProps & { onSelect: (key: DataKey) => void } & { payload?: any }
  > = ({ payload, onSelect }) => {
    return (
      <div className='mt-2 flex justify-center gap-3 sm:mt-4 sm:gap-6'>
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className='flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-80 sm:gap-2'
            onClick={() => onSelect(entry.dataKey as DataKey)}
          >
            <div
              className='h-3 w-3 rounded-full sm:h-4 sm:w-4'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-xs font-medium text-gray-900 dark:text-gray-100 sm:text-sm'>
              {entry.dataKey === 'juridical' ? t('juridical') : t('physical')}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='h-full w-full rounded-lg bg-white p-3 shadow dark:bg-gray-900 sm:p-4 lg:p-6'>
      <div className='mb-4 sm:mb-6'>
        <div className='mb-3 flex flex-wrap gap-1 sm:mb-4 sm:gap-2'>
          {[
            { key: 'both', label: t('buttons.allTypes'), color: 'purple' },
            { key: 'juridical', label: t('buttons.juridicalOnly'), color: 'blue' },
            { key: 'physical', label: t('buttons.physicalOnly'), color: 'green' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setSelectedType(key as SelectedType)}
              className={`rounded-lg px-2 py-1 text-xs font-medium transition-all sm:px-3 sm:py-2 sm:text-sm lg:px-4 ${
                selectedType === key
                  ? color === 'purple'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : color === 'blue'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <span className='block sm:hidden'>
                {key === 'both'
                  ? t('buttons.allTypes').slice(0, 3)
                  : key === 'juridical'
                    ? t('juridical').slice(0, 3) + '.'
                    : t('physical').slice(0, 3) + '.'}
              </span>
              <span className='hidden sm:block'>{label}</span>
            </button>
          ))}

          <button
            onClick={() => setShowDataPoints(!showDataPoints)}
            className='rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:px-3 sm:py-2 sm:text-sm lg:px-4'
          >
            <span className='block sm:hidden'>
              {showDataPoints ? t('buttons.hide') : t('buttons.show')}
            </span>
            <span className='hidden sm:block'>
              {showDataPoints ? t('buttons.hidePoints') : t('buttons.showPoints')}
            </span>
          </button>
        </div>
      </div>

      <div className='h-64 sm:h-80 lg:h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#D1D5DB'
              className='dark:stroke-gray-700'
            />
            <XAxis
              dataKey='year'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              className='dark:text-gray-400 sm:text-xs'
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              className='dark:text-gray-400 sm:text-xs'
              tickFormatter={(value: number) => `${value / 1000}k`}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend onSelect={setSelectedType} />} />

            {(selectedType === 'both' || selectedType === 'juridical') && (
              <Line
                type='monotone'
                dataKey='juridical'
                stroke='#3B82F6'
                strokeWidth={2}
                dot={showDataPoints ? { fill: '#3B82F6', strokeWidth: 2, r: 3 } : false}
                activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2, fill: '#3B82F6' }}
              />
            )}

            {(selectedType === 'both' || selectedType === 'physical') && (
              <Line
                type='monotone'
                dataKey='physical'
                stroke='#10B981'
                strokeWidth={2}
                dot={showDataPoints ? { fill: '#10B981', strokeWidth: 2, r: 3 } : false}
                activeDot={{ r: 5, stroke: '#10B981', strokeWidth: 2, fill: '#10B981' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientDistributionChart;
