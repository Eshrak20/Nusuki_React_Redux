import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

type DashboardHeaderProps = {
  onOpenMobileSidebar: () => void;
};

const DashboardHeader = ({ onOpenMobileSidebar }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onOpenMobileSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div>
          <h1 className="text-lg font-bold text-foreground md:text-xl">
            Dashboard
          </h1>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Manage your Nusuki account from here
          </p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
