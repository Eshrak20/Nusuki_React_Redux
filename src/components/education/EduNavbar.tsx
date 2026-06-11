import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, School, GraduationCap, FileText } from "lucide-react";

import FormSubmissionModal from "../FormSubmissionModal";
import EduNavbarUI, {
  type EduDestination,
  type EduNavItem,
} from "./EduNavbarUI";

const destinations: EduDestination[] = [
  { name: "USA", code: "us" },
  { name: "Australia", code: "au" },
  { name: "New Zealand", code: "nz" },
  { name: "Canada", code: "ca" },
  { name: "United Kingdom", code: "gb" },
];

const navItems: EduNavItem[] = [
  {
    name: "Home",
    icon: Home,
    hasSubmenu: false,
    path: "/education",
  },
  {
    name: "Destinations",
    icon: MapPin,
    hasSubmenu: true,
    path: "/education/destinations/us",
  },
  {
    name: "Find Institution",
    icon: School,
    hasSubmenu: false,
    path: "/education/institution",
  },
  {
    name: "Courses",
    icon: GraduationCap,
    hasSubmenu: false,
    path: "/education/courses",
  },
  {
    name: "Tests",
    icon: FileText,
    hasSubmenu: false,
    path: "/education/tests",
  },
];

const EduNavbar = ({ isSticky }: { isSticky?: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCounsellingOpen, setIsCounsellingOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
    null,
  );

  const activeTab =
    navItems.find((item) => {
      if (item.path === "/education") {
        return location.pathname === "/education";
      }

      if (item.name === "Destinations") {
        return location.pathname.startsWith("/education/destinations");
      }

      return location.pathname.startsWith(item.path);
    })?.name ?? "Home";

  const handleMobileClose = () => {
    setIsMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  const handleMobileSubmenuToggle = (name: string) => {
    setOpenMobileSubmenu((current) => (current === name ? null : name));
  };

  const handleSearchUniversities = () => {
    navigate("/education/institution");
  };

  return (
    <>
      <EduNavbarUI
        isSticky={isSticky}
        navItems={navItems}
        destinations={destinations}
        activeTab={activeTab}
        pathname={location.pathname}
        isMenuOpen={isMenuOpen}
        openMobileSubmenu={openMobileSubmenu}
        onMenuToggle={() => setIsMenuOpen((value) => !value)}
        onMobileClose={handleMobileClose}
        onMobileSubmenuToggle={handleMobileSubmenuToggle}
        onOpenCounselling={() => setIsCounsellingOpen(true)}
        onSearchUniversities={handleSearchUniversities}
      />

      <FormSubmissionModal
        open={isCounsellingOpen}
        onClose={() => setIsCounsellingOpen(false)}
        title="Book Free Study Abroad Counselling"
        type="education"
      />
    </>
  );
};

export default EduNavbar;
