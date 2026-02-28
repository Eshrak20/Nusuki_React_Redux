import { useState } from "react";
import {
  Home,
  MapPin,
  School,
  GraduationCap,
  FileText,
  Video,
  Menu,
  X,
  Search,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormSubmissionModal from "../FormSubmissionModal";

const EduNavbar = ({ isSticky }: { isSticky?: boolean }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const destinations = [
    { name: "USA", code: "us" },
    { name: "Ireland", code: "ie" },
    { name: "Europe", code: "eu" },
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "Asia", code: "as" },
    { name: "United Kingdom", code: "gb" },
    { name: "New Zealand", code: "nz" },
  ];

  const navItems = [
    {
      name: "Home",
      icon: <Home size={22} />,
      hasSubmenu: false,
      path: "/education",
    },
    {
      name: "Destinations",
      icon: <MapPin size={22} />,
      hasSubmenu: true,
      path: "/education/destinations",
    },
    {
      name: "Find Institution",
      icon: <School size={22} />,
      hasSubmenu: false,
      path: "/education/institution",
    },
    {
      name: "Courses",
      icon: <GraduationCap size={22} />,
      hasSubmenu: false,
      path: "/education/courses",
    },
    {
      name: "Tests",
      icon: <FileText size={22} />,
      hasSubmenu: false,
      path: "/education/tests",
    },
  ];

  // Logic to handle exact match for /education and startsWith for others
  const activeTab =
    navItems.find((item) => {
      if (item.path === "/education") return location.pathname === "/education";
      return location.pathname.startsWith(item.path);
    })?.name || "Home";

  return (
    <nav
      className={`
      bg-card px-4 lg:px-6 py-3 transition-all duration-500 relative
      ${isSticky ? "rounded-none h-20" : "rounded-xl border border-border h-20 lg:h-24"}
    `}
    >

      <div
        className={`max-w-6xl mx-auto flex items-center ${isSticky ? "lg:space-x-32" : "justify-between"}  h-full`}
      >
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden lg:flex items-center lg:space-x-10 h-full">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group lg:py-5 h-full flex items-center"
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-2 text-[16px] font-medium transition-colors cursor-pointer
                  ${activeTab === item.name ? "text-primary" : "text-foreground/70 hover:font-bold hover:text-primary"}
                `}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>

              {activeTab === item.name && (
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary rounded-t-md" />
              )}

              {/* MEGA SUBMENU (Hover Trigger) */}

              {item.hasSubmenu && (
                <div
                  className="absolute top-full -left-12.5 w-175 z-50 pt-4 
               opacity-0 invisible translate-y-2 
               group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
               transition-all duration-300 ease-in-out"
                >
                  <div className="bg-card shadow-2xl border border-border rounded-xl px-8 py-8">
                    <div className="grid grid-cols-3 gap-y-6 gap-x-12 items-center">
                      {destinations.map((dest) => {
                        const isActive = location.pathname.includes(
                          dest.name.toLowerCase().replace(" ", "-"),
                        );
                        return (
                          <Link
                            key={dest.name}
                            to={`/education/destinations/${dest.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className={`flex items-center py-1 space-x-3 text-[15px] font-medium transition-all hover:translate-x-1
                ${isActive ? "text-primary font-bold" : "text-foreground hover:text-primary hover:font-bold"}`}
                          >
                            <img
                              src={`https://flagcdn.com/w40/${dest.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w80/${dest.code.toLowerCase()}.png 2x`}
                              alt={dest.name}
                              className="w-7 h-auto aspect-3/2 rounded-sm object-contain bg-muted shadow-sm border border-border/50"
                            />
                            <span>{dest.name}</span>
                          </Link>
                        );
                      })}

                      {/* Smaller Search Button beside New Zealand */}
                      <button
                        onClick={() => navigate("/education/institution")}
                        className="flex cursor-pointer items-center justify-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-all shadow-md h-fit"
                      >
                        <Search size={14} />
                        <span>Search Universities</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={() => setIsOpen(true)} className="hidden lg:flex items-center space-x-2 bg-primary text-primary-foreground pl-1 lg:pl-2 pr-4 lg:pr-6 py-1.5 lg:py-2 rounded-full font-bold hover:brightness-110 transition-all cursor-pointer text-sm lg:text-base">
          <div className="bg-red-600 rounded-full p-1.5 lg:p-2 flex items-center justify-center">
            <Video
              className="w-4 h-4 lg:w-4.5 lg:h-4.5"
              fill="white"
              stroke="white"
            />
          </div>
          <span>Avail Free Counselling</span>

        </button>
        <FormSubmissionModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Book Free Study Abroad Counselling"
        // type="education"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-card border-t border-border shadow-2xl z-50 rounded-b-xl overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen
          ? "max-h-screen opacity-100 py-4 px-4"
          : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 text-[16px] font-medium ${activeTab === item.name
                  ? "text-primary font-bold"
                  : "text-foreground/70 hover:font-bold"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default EduNavbar;
