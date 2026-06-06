import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { dashboardRouteCards } from "@/routes/dashboardRouteCards";

const DashboardHome = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full space-y-8 rounded-sm bg-gradient-to-br from-slate-50 via-white to-primary/10 p-4 md:p-6 dark:from-slate-950 dark:via-slate-950 dark:to-primary/20">
      {/* Top Hero */}
      <section className="relative overflow-hidden rounded-sm border border-primary/10 bg-primary px-6 py-8 text-primary-foreground shadow-xl shadow-primary/10 md:px-10 md:py-10 dark:border-primary/20 dark:bg-gradient-to-br dark:from-primary dark:via-primary/80 dark:to-slate-900 dark:shadow-primary/20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl dark:bg-white/10" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-primary/30" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md dark:bg-white/10">
              <Sparkles className="h-4 w-4" />
              Dashboard Overview
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Welcome back 👋
              </h1>

              <p className="max-w-2xl text-base leading-7 text-primary-foreground/80 md:text-lg dark:text-primary-foreground/75">
                Manage your profile, security, bookings, and account actions
                from one clean and powerful dashboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
            <div className="rounded-sm bg-white/15 p-4 backdrop-blur-md dark:bg-white/10">
              <p className="text-sm text-primary-foreground/70">
                Quick Actions
              </p>
              <h3 className="mt-1 text-3xl font-black">
                {dashboardRouteCards.length}
              </h3>
            </div>

            <div className="rounded-sm bg-white/15 p-4 backdrop-blur-md dark:bg-white/10">
              <p className="text-sm text-primary-foreground/70">Account</p>
              <h3 className="mt-1 text-3xl font-black">Active</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardRouteCards.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href} className="group block">
              <Card className="relative h-full min-h-[280px] overflow-hidden rounded-sm border border-slate-200/70 bg-white shadow-lg shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-primary/40 dark:hover:shadow-primary/10">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />

                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-125 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30" />

                <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 dark:bg-primary/10 dark:group-hover:bg-primary/20" />

                <CardContent className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div className="space-y-8">
                    <div className="flex items-start justify-between">
                      <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 group-hover:scale-110 dark:shadow-primary/20">
                        <Icon className="h-8 w-8" />
                      </div>

                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-2xl font-black tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-primary dark:text-slate-50 dark:group-hover:text-primary">
                        {item.title}
                      </h2>

                      <p className="max-w-sm text-sm leading-7 text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                    <span className="text-sm font-bold text-primary">
                      Explore Now
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-primary/20">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default DashboardHome;