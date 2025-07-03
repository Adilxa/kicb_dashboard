'use client';

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

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length && label !== undefined) {
    return (
      <div className='rounded-lg border bg-white p-3 shadow-lg dark:border-gray-300 dark:bg-gray-900'>
        <p className='font-medium text-gray-900 dark:text-gray-100'>{`Год: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className='text-sm' style={{ color: entry.color || '#fff' }}>
            {entry.dataKey === 'juridical' ? 'Юридические лица' : 'Физические лица'}:{' '}
            {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// @ts-expect-error TS error due to Legend typing
const CustomLegend: FC<LegendProps & { onSelect: (key: DataKey) => void }> = ({
  payload,
  onSelect,
}) => {
  return (
    <div className='mt-4 flex justify-center gap-6'>
      {payload.map((entry: any, index: number) => (
        <div
          key={index}
          className='flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80'
          onClick={() => onSelect(entry.dataKey as DataKey)}
        >
          <div className='h-4 w-4 rounded-full' style={{ backgroundColor: entry.color }} />
          <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
            {entry.dataKey === 'juridical' ? 'Юридические лица' : 'Физические лица'}
          </span>
        </div>
      ))}
    </div>
  );
};

const ClientDistributionChart: FC = () => {
  const [selectedType, setSelectedType] = useState<SelectedType>('both');
  const [showDataPoints, setShowDataPoints] = useState<boolean>(true);

  return (
    <div className='h-full w-full rounded-lg bg-white p-6 shadow dark:bg-gray-900'>
      <div className='mb-6'>
        <div className='mb-4 flex flex-wrap gap-2'>
          {[
            { key: 'both', label: 'Все типы', color: 'purple' },
            { key: 'juridical', label: 'Юридические лица', color: 'blue' },
            { key: 'physical', label: 'Физические лица', color: 'green' },
          ].map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setSelectedType(key as SelectedType)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedType === key
                  ? `bg-${color}-600 text-white shadow-lg`
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}

          <button
            onClick={() => setShowDataPoints(!showDataPoints)}
            className='rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            {showDataPoints ? 'Скрыть точки' : 'Показать точки'}
          </button>
        </div>
      </div>

      <div className='h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#D1D5DB'
              className='dark:stroke-gray-700'
            />
            <XAxis
              dataKey='year'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              className='dark:text-gray-400'
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              className='dark:text-gray-400'
              tickFormatter={(value: number) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend onSelect={setSelectedType} />} />

            {(selectedType === 'both' || selectedType === 'juridical') && (
              <Line
                type='monotone'
                dataKey='juridical'
                stroke='#3B82F6'
                strokeWidth={3}
                dot={showDataPoints ? { fill: '#3B82F6', strokeWidth: 2, r: 4 } : false}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2, fill: '#3B82F6' }}
              />
            )}

            {(selectedType === 'both' || selectedType === 'physical') && (
              <Line
                type='monotone'
                dataKey='physical'
                stroke='#10B981'
                strokeWidth={3}
                dot={showDataPoints ? { fill: '#10B981', strokeWidth: 2, r: 4 } : false}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#10B981' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientDistributionChart;
