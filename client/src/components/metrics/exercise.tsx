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
import { ExerciseChart } from '@/components/graphs/exercise-chart'
import { ExerciseForm } from '@/components/forms/exercise-form'
import { Popup } from '@/components/popup'

export function Exercise() {
  const [exercise, setExercise] = useState([])
  const [openExercise, setOpenExercise] = useState(false)

  useEffect(() => {
    const fetchExercise = async () => {
      const session = await getSession();
      const token = session?.user.jwt;
      const exercise = await fetchData('metrics/exercise', token);
  
      // Create a map to store exercise data by date
      const exerciseDataMap = new Map();
  
      // Extract all unique types of exercises
      const exerciseTypes = Array.from(new Set(exercise.map((item) => item.type)));
  
      // Loop through the exercise data to organize it by date
      exercise.forEach((item) => {
        const date = new Date(item.datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const type = item.type
        const duration = Math.round(item.duration * 100) / 100;
  
        // Initialize the date if not present in the map
        if (!exerciseDataMap.has(date)) {
          const exerciseData = {};
          exerciseTypes.forEach((exerciseType) => {
            exerciseData[exerciseType] = 0;
          });
          exerciseDataMap.set(date, exerciseData);
        }
  
        // Set the exercise data for the specific type
        exerciseDataMap.get(date)[type] = duration;
      });
  
      // Convert the map values back to an array of objects
      const uniqueExerciseData = Array.from(exerciseDataMap).map(([date, exerciseData]) => ({
        date: date,
        ...exerciseData,
      }));
  
      // Sort the data by date
      uniqueExerciseData.sort((a, b) => new Date(a.date) - new Date(b.date));

      setExercise(uniqueExerciseData);
    }
  
    fetchExercise();
  }, []);  

  const xAxis = {
    dataKey: "date",
  }

  const yAxis = {
    yKey: "duration",
    tickFormatter: (value: number) => `${value} min`,
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Exercise</CardTitle>
        <CardDescription>
          Record your exercise and activity to track your fitness and meet your goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 justify-center">
        <ExerciseChart
          data={exercise}
          xAxis={xAxis}
          yAxis={yAxis}
        />
        <Separator />
        <div className="grid gap-2">
        </div>
      </CardContent>
      <CardFooter>
        <Popup 
          title="Exercise"
          description="Record your exercise and activity to track your fitness."
          button="Add Exercise"
          open={openExercise}
          setOpen={setOpenExercise}
        >
          <div className="grid gap-2">
            <ExerciseForm open={openExercise} setOpen={setOpenExercise} />
          </div>
        </Popup>
      </CardFooter>
    </Card>
  )
}