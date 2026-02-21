import EduBanner from "@/components/education/EduBanner";
import EduNavbar from "@/components/education/EduNavbar";
import { Outlet } from "react-router-dom";

const EducationLayout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Container for Banner + Overlapping Navbar */}
      <div className="relative">
        <EduBanner />

        {/* Positioning Wrapper: 
            bottom-0 puts it at the bottom, 
            translate-y-1/2 puts it exactly halfway across the edge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4 z-40">
          <EduNavbar />
        </div>
      </div>

      {/* Content area below - Added padding-top to account for the overlapping navbar */}
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default EducationLayout;
