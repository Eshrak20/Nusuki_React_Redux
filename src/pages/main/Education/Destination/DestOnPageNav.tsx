import type { OnPageNavItem } from "@/types/education/type.country";

interface Props {
  navItems: OnPageNavItem[];
}

const DestOnPageNav = ({ navItems }: Props) => {
  return (
    <nav>
      {navItems?.map((item, i) => (
        <a key={i} href={item.href}>
          {item.text}
        </a>
      ))}
    </nav>
  );
};

export default DestOnPageNav;