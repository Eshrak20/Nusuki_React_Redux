import { useState, useEffect } from "react";
import type { OnPageNavItem } from "@/types/education/type.country";

interface Props {
  navItems: OnPageNavItem[];
}

const generateHref = (text: string) => {
  if (!text) return "";
  return "#" + text.toLowerCase().trim().replace(/[\s\W-]+/g, "-");
};

const DestOnPageNav = ({ navItems }: Props) => {
  const [activeSection, setActiveSection] = useState(
    generateHref(navItems?.[0]?.text || "")
  );

  useEffect(() => {
    const handleScroll = () => {
      const activationLine = 250;
      const currentItem = [...navItems].reverse().find((item) => {
        const targetId = generateHref(item.text);
        const element = document.querySelector(targetId);

        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= activationLine;
        }
        return false;
      });

      if (currentItem) {
        setActiveSection(generateHref(currentItem.text));
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setActiveSection(targetId);

    const element = document.querySelector(targetId);
    if (element) {
      const offset = 180; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (!navItems || navItems.length === 0) return null;

  return (
    <div className="w-full sticky top-20 lg:top-24 z-40 bg-background/80 backdrop-blur-md mb-11 pt-4 transition-all">
      <nav className="flex items-center p-1.5 md:p-2 bg-card border border-border rounded-full shadow-sm overflow-x-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ul className="flex items-center gap-2 w-max px-1">
          {navItems.map((item, i) => {
            const targetId = generateHref(item.text);
            const isActive = activeSection === targetId;

            return (
              <li key={i}>
                <a
                  href={targetId}
                  onClick={(e) => scrollToSection(e, targetId)}
                  className={`
                    inline-flex items-center justify-center px-5 md:px-7 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all whitespace-nowrap cursor-pointer select-none
                    ${isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/40 text-muted-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    }
                  `}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default DestOnPageNav;