'use client';

import React, { useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

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

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className='rounded-lg border bg-white p-3 shadow-lg dark:border-gray-300 dark:bg-gray-900'>
          <p className='font-medium text-gray-900 dark:text-gray-100'>{data.name}</p>
          <p className='text-sm' style={{ color: data.color }}>
            Клиентов: {data.value.toLocaleString()}
          </p>
          <p className='text-sm text-gray-600 dark:text-gray-400'>Доля: {percentage}%</p>
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

  return (
    <div className='h-full w-full rounded-lg bg-white p-6 shadow dark:bg-gray-900'>
      <div className='mb-6'>
        <div className='mb-4 flex flex-wrap gap-2'>
          <button
            onClick={() => setSelectedRegion(null)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              selectedRegion === null
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Все регионы
          </button>
          <button
            onClick={() => setShowPercentages(!showPercentages)}
            className='rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            {showPercentages ? 'Показать количество' : 'Показать проценты'}
          </button>
        </div>
      </div>

      <div className='h-96'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={getVisibleData()}
              cx='50%'
              cy='50%'
              innerRadius={80}
              outerRadius={140}
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

            {/* Центральный текст */}
            <text
              x='50%'
              y='45%'
              textAnchor='middle'
              dominantBaseline='middle'
              className='fill-gray-900 text-xl font-bold dark:fill-white'
            >
              Итого
            </text>
            <text
              x='50%'
              y='55%'
              textAnchor='middle'
              dominantBaseline='middle'
              className='fill-gray-600 text-lg font-semibold dark:fill-gray-300'
            >
              {total.toLocaleString()} +
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className='mt-4 grid grid-cols-2 gap-2 md:grid-cols-4'>
        {data.map((entry, index) => {
          const percentage = ((entry.value / total) * 100).toFixed(1);
          const isSelected = selectedRegion === entry.name;

          return (
            <div
              key={index}
              className={`flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-all ${
                isSelected
                  ? 'bg-gray-300 shadow-md dark:bg-gray-700'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-800'
              }`}
              onClick={() => setSelectedRegion(isSelected ? null : entry.name)}
            >
              <div
                className='h-3 w-3 flex-shrink-0 rounded-full'
                style={{ backgroundColor: entry.color }}
              />
              <div className='min-w-0 flex-1'>
                <div className='truncate text-sm font-medium text-gray-900 dark:text-gray-100'>
                  {entry.name}
                </div>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  {showPercentages ? `${percentage}%` : entry.value.toLocaleString()}
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
