import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardComponents/DashboardSidebar";
import DashboardHeader from "./DashboardComponents/DashboardHeader";
import DashboardMobileNav from "./DashboardComponents/DashboardMobileNav";


const DashboardLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          <main className="flex-1 py-6 px-4 bg-gray-200 dark:bg-background lg:px-14">
            <div className="max-w-2xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <DashboardMobileNav
        open={mobileSidebarOpen}
        onOpenChange={setMobileSidebarOpen}
      />
    </div>
  );
};

export default DashboardLayout;