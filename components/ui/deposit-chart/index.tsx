'use client';

import React, { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { year: 2020, credits: 90000, deposits: 30000 },
  { year: 2021, credits: 95000, deposits: 32000 },
  { year: 2022, credits: 105000, deposits: 31000 },
  { year: 2023, credits: 102000, deposits: 35000 },
  { year: 2024, credits: 120000, deposits: 40000 },
];

const DepositChart = () => {
  const [selectedMetric, setSelectedMetric] = useState<'both' | 'credits' | 'deposits'>('both');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='rounded-lg border bg-white p-3 shadow-lg dark:border-gray-300 dark:bg-gray-900'>
          <p className='font-medium text-gray-900 dark:text-gray-100'>{`Год: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className='text-sm' style={{ color: entry.color }}>
              {entry.dataKey === 'credits' ? 'Кредиты' : 'Депозиты'}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className='mt-4 flex justify-center gap-6'>
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className='flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80'
            onClick={() => setSelectedMetric(entry.dataKey)}
          >
            <div className='h-4 w-4 rounded-full' style={{ backgroundColor: entry.color }} />
            <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {entry.dataKey === 'credits' ? 'Кредиты' : 'Депозиты'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='h-full w-full rounded-lg bg-white p-6 shadow dark:bg-gray-900'>
      <div className='mb-4 flex gap-2'>
        {[
          { key: 'both', label: '||' },
          { key: 'credits', label: 'Только кредиты' },
          { key: 'deposits', label: 'Только депозиты' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key as any)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              selectedMetric === key
                ? key === 'deposits'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className='h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id='colorCredits' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#3B82F6' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#3B82F6' stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id='colorDeposits' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#10B981' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#10B981' stopOpacity={0.1} />
              </linearGradient>
            </defs>

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
              tickFormatter={value => `${value / 1000}k`}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />

            {(selectedMetric === 'both' || selectedMetric === 'credits') && (
              <Area
                type='monotone'
                dataKey='credits'
                stackId='1'
                stroke='#3B82F6'
                strokeWidth={2}
                fill='url(#colorCredits)'
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            )}
            {(selectedMetric === 'both' || selectedMetric === 'deposits') && (
              <Area
                type='monotone'
                dataKey='deposits'
                stackId='1'
                stroke='#10B981'
                strokeWidth={2}
                fill='url(#colorDeposits)'
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepositChart;
