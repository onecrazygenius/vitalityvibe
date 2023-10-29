"use client"

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { Icons } from '@/components/icons';
import PageTransition from '@/components/page-transition';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from '@/components/ui/date-range-picker';

const DashboardPage = () => {
    const { theme } = useTheme();

    const goals = [
        {
            title: "Sleep",
            value: "7.5hrs",
            target: "8hrs",
        },
        {
            title: "Exercise",
            value: "2.5hrs",
            target: "3hrs",
        },
        {
            title: "Meals",
            value: "2100kcal",
            target: "2000kcal",
        },
    ];

    return ( 
        <PageTransition>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker />
                        <Button>
                            <Icons.upload className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sleep
                            </CardTitle>
                            <Icons.sleep className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                7.5hrs
                            </div>
                            <p className="text-xs text-green-500">
                                +0.3hrs from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Exercise
                            </CardTitle>
                            <Icons.exercise className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                2.5hrs
                            </div>
                            <p className="text-xs text-green-500">
                                +0.7hrs from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Meals
                            </CardTitle>
                            <Icons.meals className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                2100kcal
                            </div>
                            <p className={cn(
                                    "text-xs",
                                    theme === "dark"
                                        ? "text-red-500"
                                        : "text-red-700"
                            )}>
                                +100kcal from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                    <div className="col-span-12 md:col-span-1 lg:col-span-5">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Goals
                                </CardTitle>
                                <Icons.goals className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-boldmb-4">
                                    Achieved 2/3 goals
                                </div>
                                {goals.map((goal, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "flex flex-row items-center justify-between",
                                            index !== goals.length - 1
                                                ? "pb-2 mb-2 border-b border-gray-200"
                                                : ""
                                        )}
                                    >
                                        <div className="flex flex-row items-center space-x-2">
                                            <Icons.apple className="h-4 w-4 text-gray-500" />
                                            <div className="text-sm font-medium text-gray-700">
                                                {goal.title}
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">
                                            {goal.value} / {goal.target}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-12 md:col-span-1 lg:col-span-7">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Circles
                                </CardTitle>
                                <Icons.circles className="h-4 w-4 text-gray-500" />
                            </CardHeader>
                            <CardContent>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
 
export default DashboardPage;