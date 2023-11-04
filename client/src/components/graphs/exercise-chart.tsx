import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
} from "recharts";

type GraphBarChartProps = {
  data: any[];
  xAxis: {
    dataKey: string;
  };
  yAxis: {
    yKey: string;
    tickFormatter: (value: number) => string;
  };
};

export function ExerciseChart({ data, xAxis, yAxis }: GraphBarChartProps) {

  // Check if there's no data
  if (data.length === 0) {
    return <p>No exercise data available.</p>;
  }

  // Extract exercise types from the first data point
  const exerciseTypes = Object.keys(data[0]).filter((key) => key !== xAxis.dataKey);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart data={data}>
        <XAxis
          dataKey={xAxis.dataKey}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          label={{
            value: yAxis.yLabel,
            angle: -90,
            position: "insideLeft",
            fontSize: 12,
          }}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={yAxis.tickFormatter}
        />
        <Tooltip labelFormatter={(value) => `Date: ${value}`} />
        <Legend
          formatter={(value, entry, index) => {
            const finalValue =
              value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
            return finalValue;
          }}
        />
        {exerciseTypes.map((type, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={type}
            name={type}
            stroke={
              // Set a color for the exercise type (you can customize this)
              '#' + Math.floor(Math.random() * 16777215).toString(16)
            }
            dot={false}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}