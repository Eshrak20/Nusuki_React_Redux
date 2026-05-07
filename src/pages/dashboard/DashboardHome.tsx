import { CalendarDays, Plane, ShieldCheck, UserRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Your account summary and quick actions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserRound className="h-4 w-4 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Manage your personal information.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Change password and secure your account.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Plane className="h-4 w-4 text-primary" />
              Flight Bookings
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            See your flight booking history.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarDays className="h-4 w-4 text-primary" />
              Trips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Track your upcoming journeys.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;