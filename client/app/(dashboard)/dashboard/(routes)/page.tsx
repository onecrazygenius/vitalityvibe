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
                    <Card className="background-gradient">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sleep
                            </CardTitle>
                            <Icons.sleep className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                7.5hrs
                            </div>
                            <p className="text-xs text-muted-foreground text-green-500">
                                +0.3hrs from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Exercise
                            </CardTitle>
                            <Icons.exercise className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                2.5hrs
                            </div>
                            <p className="text-xs text-muted-foreground text-green-500">
                                +0.7hrs from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Meals
                            </CardTitle>
                            <Icons.meals className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                2100kcal
                            </div>
                            <p className="text-xs text-muted-foreground text-red-500">
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