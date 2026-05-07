import { CalendarDays, Plane, ShieldCheck, UserRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardHome = () => {
  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Your account summary and quick actions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Profile Card */}
        <Card className="flex flex-col transition-all hover:border-primary/50">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <UserRound className="h-4 w-4 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
            Manage your personal information.
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card className="flex flex-col transition-all hover:border-primary/50">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
            Change password and secure your account.
          </CardContent>
        </Card>

        {/* Flight Bookings Card */}
        <Card className="flex flex-col transition-all hover:border-primary/50">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <Plane className="h-4 w-4 text-primary" />
              Flight Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
            See your flight booking history.
          </CardContent>
        </Card>

        {/* Trips Card */}
        <Card className="flex flex-col transition-all hover:border-primary/50">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <CalendarDays className="h-4 w-4 text-primary" />
              Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
            Track your upcoming journeys.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;