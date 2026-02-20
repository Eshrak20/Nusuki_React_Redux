import { 
  Heart, 
  Users, 
  GraduationCap, 
  UserCheck, 
  Sparkles, 
  Zap 
} from 'lucide-react';

export const features = [
    {
      icon: <Heart className="text-primary" size={24} />,
      title: "Loved by students",
      description: "Nusuki is rated 4.8 out of 5 on Google, and 9 out of 10 students would recommend us to their friends and families.",
    },
    {
      icon: <Users className="text-primary" size={24} />,
      title: "Counselling right by your side",
      description: "We have 2200+ expert education counsellors, many of whom are also comfortable speaking regional languages.",
      linkText: "" // No link visible in image for this card
    },
    {
      icon: <GraduationCap className="text-primary" size={24} />,
      title: "Trusted by 113K students",
      description: "In 2024, Nusuki helped 1,13,000 students achieve their study abroad dreams! We're here to help you do the same.",
    },
    {
      icon: <UserCheck className="text-primary" size={24} />,
      title: "Proud IELTS co-owner",
      description: "Nusuki co-owns IELTS test. We have 2,000+ test locations across 60+ nations and 260+ computer-delivered IELTS centres.",
    },
    {
      icon: <Sparkles className="text-primary" size={24} />,
      title: "Support through every step",
      description: "We support you at every step, from university & visa applications to pre-departure briefings and post-arrival help.",
    },
    {
      icon: <Zap className="text-primary" size={24} />,
      title: "Global reach, personalised care",
      description: "Nusuki has 210+ offices across 35+ nations. You can often meet expert counsellors face-to-face in your city, free of charge.",
    }
  ];