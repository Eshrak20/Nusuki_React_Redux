import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { dashboardRouteCards } from "@/routes/dashboardRouteCards";

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
        {dashboardRouteCards.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href} className="group">
              <Card className="flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="flex items-center justify-between gap-3 text-base font-semibold">
                    <span className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>

                      {item.title}
                    </span>

                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;