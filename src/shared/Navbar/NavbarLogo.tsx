import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import logoWhite from "../../assets/reactAssets/Logo/whiteLogo.png";
import logoDark from "../../assets/reactAssets/Logo/darkLogo.png";
import logoEduLight from "../../assets/reactAssets/Logo/eduLight.png";
import logoEduDark from "../../assets/reactAssets/Logo/eduDark1.png";

type NavbarLogoProps = {
  isEducationRoute: boolean;
};

const NavbarLogo = ({ isEducationRoute }: NavbarLogoProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Link to="/" className="flex h-20 w-56 shrink-0 items-center md:h-24 md:w-64">
        <img
          src={isEducationRoute ? logoEduLight : logoWhite}
          alt="Logo"
          className="h-full w-full object-contain dark:hidden"
        />
        <img
          src={isEducationRoute ? logoEduDark : logoDark}
          alt="Logo"
          className="hidden h-full w-full object-contain dark:block"
        />
      </Link>
    </motion.div>
  );
};

export default NavbarLogo;