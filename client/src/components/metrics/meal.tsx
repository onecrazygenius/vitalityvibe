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
import { MealChart } from '@/components/graphs/meal-chart'
import { MealForm } from '@/components/forms/meal-form'
import { Popup } from '@/components/popup'

export function Meal() {
  const [meal, setMeal] = useState([])
  const [openMeal, setOpenMeal] = useState(false)

  useEffect(() => {
    const fetchMeal = async () => {

      const session = await getSession()
      const token = session?.user.jwt
      const meals = await fetchData('metrics/meal', token)

      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Filter meals for the current date
      const mealsForCurrentDate = meals.filter((meal) => {
        const mealDate = new Date(meal.datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return mealDate === currentDate;
      });

      // Group meals by type and calculate total calories and descriptions
      const mealTypeData: any = {};
      mealsForCurrentDate.forEach((meal: any) => {
        const mealType = meal.type;
        const calories = meal.calories;
        const description = meal.description;
        
        if (!mealTypeData[mealType]) {
          mealTypeData[mealType] = {
            calories: 0,
            description: "",
          };
        }

        mealTypeData[mealType].calories += calories;
        mealTypeData[mealType].description += description + "\n";
      });

      // Convert the grouped data into an array for the pie chart
      const pieData = Object.keys(mealTypeData).map((mealType) => ({
        name: mealType,
        value: mealTypeData[mealType].calories,
        description: mealTypeData[mealType].description,
      }));

      setMeal(pieData)
    }
    fetchMeal()
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
        <CardTitle className="text-2xl">Meal</CardTitle>
        <CardDescription>
          Record your meals to track your nutrition and meet your goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2 justify-center">
        <MealChart
          data={meal}
        />
        <Separator />
        <div className="grid gap-2">
        </div>
      </CardContent>
      <CardFooter>
        <Popup 
          title="Meal"
          description="Record your meals to track your diet."
          button="Add Meal"
          open={openMeal}
          setOpen={setOpenMeal}
        >
          <div className="grid gap-2">
            <MealForm open={openMeal} setOpen={setOpenMeal} />
          </div>
        </Popup>
      </CardFooter>
    </Card>
  )
}