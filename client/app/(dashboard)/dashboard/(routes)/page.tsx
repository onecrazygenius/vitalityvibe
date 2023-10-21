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

    return ( 
        <PageTransition>
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <CalendarDateRangePicker />
                        <Button>
                            <Icons.upload className="h-4 w-4 text-white" />
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Card with a purple gradient background */}
                    <Card className={cn(
                            "bg-gradient-to-br",
                            theme === "dark"
                                ? "from-purple-600 to-purple-900"
                                : "from-purple-500 to-purple-400"
                        )}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white">
                                Sleep
                            </CardTitle>
                            <Icons.sleep className="h-4 w-4 text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                7.5hrs
                            </div>
                            <p className="text-xs text-green-500">
                                +0.3hrs from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className={cn(
                            "bg-gradient-to-br",
                            theme === "dark"
                                ? "from-orange-700 to-orange-900"
                                : "from-orange-500 to-orange-400"
                        )}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white">
                                Exercise
                            </CardTitle>
                            <Icons.exercise className="h-4 w-4 text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                2.5hrs
                            </div>
                            <p className="text-xs text-green-500">
                                +0.7hrs from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className={cn(
                            "bg-gradient-to-br",
                            theme === "dark"
                                ? "from-green-700 to-green-900"
                                : "from-green-400 to-green-300"
                        )}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-white">
                                Meals
                            </CardTitle>
                            <Icons.meals className="h-4 w-4 text-white" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
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
            </div>
        </PageTransition>
    );
}
 
export default DashboardPage;