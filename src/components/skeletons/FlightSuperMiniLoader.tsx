import { LoaderCircle, Cog } from "lucide-react";

const FlightSuperMiniLoader = () => {
  return (
    <div className="flex flex-col items-start justify-center py-3 space-y-2 font-sans">
      {/* Top Row: Spinner and Text */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center h-6 w-6">
          {/* Outer smooth loading ring */}
          <LoaderCircle className="absolute h-6 w-6 text-primary/30 animate-spin" />
          {/* Inner gear spinning slightly slower/different direction for a mechanical feel */}
          <Cog className="absolute h-3.5 w-3.5 text-primary animate-[spin_3s_linear_infinite]" />
        </div>
        
        {/* Loading Text */}
        <span className="text-sm font-medium text-muted-foreground animate-pulse">
          Flights are loading, please wait...
        </span>
      </div>

      {/* Bottom Row: Subtle Progress Bar */}
      <div className="w-full max-w-[240px] h-1 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-[shimmer_1.5s_infinite] origin-left bg-gradient-to-r from-primary/40 via-primary to-primary/40 w-1/2 translate-x-[-100%] animate-[loading-bar_1.5s_infinite_linear]" />
      </div>
    </div>
  );
};

export default FlightSuperMiniLoader;