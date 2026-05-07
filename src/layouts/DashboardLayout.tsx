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

          <main className="flex-1 px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
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