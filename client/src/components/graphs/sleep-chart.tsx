import { 
  Bar,
  ReferenceLine,
  ComposedChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis 
} from "recharts"

type GraphBarChartProps = {
    data: any[],
    xAxis: {
      dataKey: string,
    }
    yAxis: {
      yQualityKey: string,
      yBadKey: string,
      tickFormatter: (value: number) => string,
    }
}

export function SleepChart({ data, xAxis, yAxis }: GraphBarChartProps) {
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
            position: 'insideLeft',
            fontSize: 12,
          }}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={yAxis.tickFormatter}
        />
        <Bar 
            dataKey={yAxis.yQualityKey}
            fill="#adfa1d" 
            stackId="a"
        />
        <Bar 
            dataKey={yAxis.yBadKey}
            fill="#faad1d"
            stackId="a"
            radius={[4, 4, 0, 0]} 
        />
        <ReferenceLine 
          y="8" 
          stroke="#ff0000"
          strokeDasharray="3 3"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}