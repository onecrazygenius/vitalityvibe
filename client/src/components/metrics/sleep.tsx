import '@/styles/globals.css'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { SleepChart } from '@/components/graphs/sleep-chart'
import { getSession, fetchData } from '@/lib/api'

export function SleepForm() {
  const [sleep, setSleep] = useState([])

  useEffect(() => {
    const fetchSleep = async () => {
      // get next-auth.session-token cookie
      const session = await getSession()
      const token = session?.user.jwt
      const sleep = await fetchData('GET', 'metrics/sleep', token)
      setSleep(sleep)
    }
    fetchSleep()
  }, [])

  const data = [
    {
      date: "Nov 02",
      quality: 5.5,
      bad: 2,
    },
    {
      date: "Nov 03",
      quality: 8,
      bad: 0.5,
    },
    {
      date: "Nov 04",
      quality: 7,
      bad: 1.2,
    },
    {
      date: "Nov 05",
      quality: 5,
      bad: 4.5,
    },
    {
      date: "Nov 06",
      quality: 6,
      bad: 1,
    },
    {
      date: "Nov 07",
      quality: 8,
      bad: 0,
    },
    {
      date: "Nov 08",
      quality: 7,
      bad: 2,
    }
  ]

  const xAxis = {
    dataKey: "date",
  }

  const yAxis = {
    yQualityKey: "quality",
    yBadKey: "bad",
    tickFormatter: (value: number) => `${value} hrs`,
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sleep</CardTitle>
        <CardDescription>
          Record your sleep and wake times to track your sleep schedule.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 justify-center">
        <SleepChart
          data={data}
          xAxis={xAxis}
          yAxis={yAxis}
        />
        <Separator />
        <div className="grid gap-2">
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add Record</Button>
      </CardFooter>
    </Card>
  )
}