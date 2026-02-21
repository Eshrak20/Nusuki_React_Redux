import { useState } from "react";
import {
  Home,
  MapPin,
  School,
  GraduationCap,
  FileText,
  Video,
} from "lucide-react";

const EduNavbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const countries = ["USA", "UK", "Canada", "Australia", "Germany"];

  const navItems = [
    { name: "Home", icon: <Home size={22} />, hasSubmenu: false },
    { name: "Destinations", icon: <MapPin size={22} />, hasSubmenu: true },
    { name: "Find Institution", icon: <School size={22} />, hasSubmenu: false },
    { name: "Courses", icon: <GraduationCap size={22} />, hasSubmenu: false },
    { name: "Tests", icon: <FileText size={22} />, hasSubmenu: false },
  ];

  return (
    // Uses bg-card and border-border to automatically flip colors in dark mode
    <nav className="bg-card rounded-xl shadow-2xl h-24 px-6 py-3 border border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full">
        <div className="flex items-center space-x-10">
          {navItems.map((item) => (
            <div key={item.name} className="relative group py-5 h-full flex items-center">
              <button
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center space-x-2 text-[16px] font-medium transition-colors cursor-pointer
                  ${activeTab === item.name 
                    ? "text-primary" 
                    : "text-foreground/70 hover:font-bold hover:text-primary"}
                `}
              >
                {/* Icons now inherit text-foreground color to stay visible in dark mode */}
                <span className="text-foreground">{item.icon}</span>
                <span>{item.name}</span>
              </button>

              {/* Active Indicator using Primary color */}
              {activeTab === item.name && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-md" />
              )}

              {/* Submenu with adaptive colors */}
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

        {/* CTA Button using Primary color */}
        <button className="flex items-center space-x-2 bg-primary text-primary-foreground pl-2 pr-6 py-2 rounded-full font-bold hover:brightness-110 transition-all cursor-pointer">
          <div className="bg-red-600 rounded-full p-2">
            <Video size={18} fill="white" stroke="white" />
          </div>
          <span>Avail Free Counselling</span>
        </button>
      </div>
    </nav>
  );
};

export default EduNavbar;