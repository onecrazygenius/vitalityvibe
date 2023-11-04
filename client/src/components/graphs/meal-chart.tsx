import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

type MealChartProps = {
  data: any[];
};

export function MealChart({ data }: MealChartProps) {

  return (
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell 
            key={`cell-${index}`} 
            fill={
              // generate a random color for each entry
              '#' + Math.floor(Math.random()*16777215).toString(16)
            }
          />
        ))}
      </Pie>
      <Tooltip
        formatter={
          (value: number) => `${value} calories`
        }
      />
      <Legend 
        formatter={(value, entry, index) => {
          const finalValue =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          return finalValue;
        }}
      />
    </PieChart>
  );
}