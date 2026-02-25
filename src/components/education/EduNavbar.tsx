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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const EduNavbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const countries = ["USA", "UK", "Canada", "Australia", "Germany"];
  const navItems = [
    { name: "Home", icon: <Home size={22} />, hasSubmenu: false },
    {
      name: "Destinations",
      icon: <MapPin size={22} />,
      hasSubmenu: true,
      path: "#",
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
  const activeTab =
    navItems.find(item =>
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
    )?.name || "Home";


  return (
      <nav className="bg-card rounded-xl shadow-2xl h-20 lg:h-24 px-4 lg:px-6 py-3 border border-border relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center lg:space-x-10 h-full">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group lg:py-5 h-full flex items-center"
            >
              <Link
                to={item.path as string}
                className={`flex items-center space-x-2 text-[16px] font-medium transition-colors cursor-pointer
    ${activeTab === item.name
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:font-bold hover:text-primary"
                  }`}
              >
                <span className={activeTab === item.name ? "text-primary" : "text-foreground/70 hover:text-primary"}>
                  {item.icon}
                </span>
                <span className={activeTab === item.name ? "text-primary font-bold" : "text-foreground"}>
                  {item.name}
                </span>
              </Link>

              {activeTab === item.name && (
                <div className="absolute bottom-2 left-0 w-full h-1 bg-primary rounded-t-md" />
              )}

              {item.hasSubmenu && (
                <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-card shadow-xl border border-border rounded-b-lg z-50 overflow-hidden">
                  {countries.map((c) => (
                    <a
                      key={c}
                      href="#"
                      className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {c}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button className="flex items-center space-x-2 bg-primary text-primary-foreground pl-1 lg:pl-2 pr-4 lg:pr-6 py-1.5 lg:py-2 rounded-full font-bold hover:brightness-110 transition-all cursor-pointer text-sm lg:text-base">
          <div className="bg-red-600 rounded-full p-1.5 lg:p-2 flex items-center justify-center">
            <Video
              className="w-4 h-4 lg:w-4.5 lg:h-4.5"
              fill="white"
              stroke="white"
            />
          </div>
          <span>Avail Free Counselling</span>
        </button>
      </div>

      {/* Smooth Mobile Sidebar Overlay */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-card border-t border-border shadow-2xl z-50 rounded-b-xl overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen
          ? "max-h-125 opacity-100 py-4 px-4"
          : "max-h-0 opacity-0 py-0 px-4"
          }`}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              <Link
                to={item.path as string}
                className={`flex items-center space-x-2 text-[16px] font-medium transition-colors cursor-pointer
                           ${activeTab === item.name
                    ? "text-primary font-bold"
                    : "text-foreground/70 hover:font-bold hover:text-primary"
                  }`}
              >
                <span className={activeTab === item.name ? "text-primary" : "text-foreground/70 hover:text-primary"}>
                  {item.icon}
                </span>
                <span className={activeTab === item.name ? "text-primary font-bold" : "text-foreground"}>
                  {item.name}
                </span>
              </Link>

              {/* Mobile Submenu - Active items now colored */}
              {item.hasSubmenu && (
                <div
                  className={`pl-10 flex flex-col space-y-2 transition-all duration-200 overflow-hidden ${activeTab === item.name
                    ? "max-h-40 mt-2 border-l-2 border-primary/20"
                    : "max-h-0"
                    }`}
                >
                  {countries.map((c) => (
                    <a
                      key={c}
                      href="#"
                      className="py-1 text-foreground/70 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {c}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default EduNavbar;
