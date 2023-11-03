import '@/styles/globals.css'

import { useState, useEffect } from 'react'
import { getSession, fetchData } from '@/lib/api'
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
import { SleepForm } from '@/components/forms/sleep-form'
import { Popup } from '@/components/popup'

export function Sleep() {
  const [sleep, setSleep] = useState([])
  const [openSleep, setOpenSleep] = useState(false)

  useEffect(() => {
    const fetchSleep = async () => {

      const session = await getSession()
      const token = session?.user.jwt
      const sleep = await fetchData('metrics/sleep', token)

        /*
    turn: 
     
      createBy: "2"
      createDate: "2023-11-03T19:34:12.043904"
      duration: 540
      endTime: "2023-11-01T08:00:00"
      id: 1
      quality: 90
      startTime: "2023-10-31T22:00:00"

      into:
      
      {
        date: "Nov 02",
        quality: 5.5 (duration in hours * quality / 100)
        bad: 2 (duration in hours - quality)
      },
  */
      const sleepData = sleep.map((item: any) => {
        const date = new Date(item.startTime)
        const duration = item.duration / 60
        const quality = item.quality / 100
        const good = duration * quality
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          quality: Math.round(duration * quality * 100) / 100,
          bad: Math.round((duration - good) * 100) / 100,
        }
      })
      setSleep(sleepData)
    }
    fetchSleep()
  }, [])

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
          data={sleep}
          xAxis={xAxis}
          yAxis={yAxis}
        />
        <Separator />
        <div className="grid gap-2">
        </div>
      </CardContent>
      <CardFooter>
        <Popup 
          title="Sleep"
          description="Record your sleep and wake times to track your sleep schedule."
          button="Add Sleep"
          open={openSleep}
          setOpen={setOpenSleep}
        >
          <div className="grid gap-2">
            <SleepForm open={openSleep} setOpen={setOpenSleep} />
          </div>
        </Popup>
      </CardFooter>
    </Card>
  )
}