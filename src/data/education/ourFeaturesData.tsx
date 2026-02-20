import {
  Zap,
  GraduationCap,
  Calculator,
  Smartphone,
  Home,
  ShieldCheck,
} from "lucide-react"; // Using lucide-react for the icons

export const features = [
  {
    icon: <Zap className="text-primary" size={24} />,
    title: "Fast-track your study dreams",
    description:
      "Easily check your eligibility with IDP FastLane before applying for your course.",
  },
  {
    icon: <GraduationCap className="text-primary" size={24} />,
    title: "Scholarships – over 5,100 opportunities await",
    description:
      "Explore scholarships from 370+ top institutions around the world and take the first step toward making your dreams come true.",
  },
  {
    icon: <Calculator className="text-primary" size={24} />,
    title: "Cost Calculator",
    description:
      "Manage your budget with ease as an international student, using our easy-to-use cost calculator.",
  },
  {
    icon: <Smartphone className="text-primary" size={24} />,
    title: "IDP in Your Pocket",
    description:
      "Simplify your journey with the IDP Live App — browse courses, apply to universities, and track your progress—all at your fingertips.",
  },
  {
    icon: <Home className="text-primary" size={24} />,
    title: "Student Essentials",
    description:
      "From visas to accommodation and health cover, we've got everything you need to thrive and make your journey stress-free.",
  },
  {
    icon: <ShieldCheck className="text-primary" size={24} />,
    title: "Expert Advice",
    description:
      "Your dedicated counsellor will guide you every step of the way, guiding you smoothly toward your dream institutions.",
  },
];
