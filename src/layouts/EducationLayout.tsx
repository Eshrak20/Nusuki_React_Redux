import { useState, useEffect } from "react";
import EduBanner from "@/components/education/EduBanner";
import EduNavbar from "@/components/education/EduNavbar";
import { Outlet } from "react-router-dom";

const EducationLayout = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 250);

      const footerTop = document.getElementById("main-footer")?.offsetTop;
      if (footerTop && scrollY + window.innerHeight > footerTop + 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="relative">
        <EduBanner />

        {/* Navbar Wrapper */}
        <div
          className={`
            left-1/2 -translate-x-1/2 z-50 transition-all duration-500
            ${isSticky 
              ? "fixed top-0 w-full px-0 ml-56 shadow-none" 
              : "absolute bottom-0 translate-y-1/2 w-full max-w-7xl rounded-xl shadow-2xl"}
            ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
          {/* Inner container to keep content aligned */}
          <div className={`${isSticky ? "max-w-7xl mx-auto px-4 lg:px-6" : ""} transition-all duration-500`}>
            <EduNavbar isSticky={isSticky} />
          </div>
        </div>
      </div>

      <div className={`container mx-auto px-4 transition-all ${isSticky ? "pt-32" : "pt-16"}`}>
        <Outlet />
      </div>

      <footer id="main-footer">
         {/* Footer Content */}
      </footer>
    </div>
  );
};

export default EducationLayout;