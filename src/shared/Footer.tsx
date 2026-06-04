import { Link } from "react-router-dom";
import logoWhite from "../assets/reactAssets/Logo/whiteLogo.png";
import logoDark from "../assets/reactAssets/Logo/darkLogo.png";
import footerLight from "@/assets/reactAssets/Footer/footer.webp";
import footerDark from "@/assets/reactAssets/Footer/footer-dark.jpeg";
import { footerPayImages } from "@/data/footerPayImages";
import {
  // Facebook,
  // Twitter,
  // Instagram,
  // Youtube,
  // Linkedin,
  MapPin,
  Phone,
  Mail,
  Globe,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetAddressesQuery,
  useGetSocialLinksQuery,
} from "@/redux/api/settingsApi/settingApi";

const socialIconMap: Record<string, LucideIcon> = {
  facebook: Phone,
  fafacebook: Phone,
  twitter: Phone,
  fatwitter: Phone,
  instagram: Phone,
  fainstagram: Phone,
  youtube: Phone,
  fayoutube: Phone,
  linkedin: Phone,
  falinkedin: Phone,
};

const getSocialIcon = (icon?: string | null, platform?: string | null) => {
  const iconKey = icon?.toLowerCase();
  const platformKey = platform?.toLowerCase();

  return (
    socialIconMap[iconKey || ""] || socialIconMap[platformKey || ""] || Share2
  );
};

const cleanGoogleMapUrl = (embed?: string | null) => {
  if (!embed) return "#";

  const srcMatch = embed.match(/src=["']([^"']+)["']/);
  if (srcMatch?.[1]) return srcMatch[1];

  return embed
    .replace(/^"+|"+$/g, "")
    .split('"')[0]
    .trim();
};

const Footer = () => {
  const { data: socialLinksResponse } = useGetSocialLinksQuery();
  const { data: addressesResponse } = useGetAddressesQuery();

  const socialLinks = socialLinksResponse?.data ?? [];
  const addresses = addressesResponse?.data ?? [];

  return (
    <footer className="w-full bg-background border-t border-border pt-12 pb-8">
      <div className="max-w-360 mx-auto px-4">
        {/* ==================================================
            TOP SECTION : BRAND + NAV LINKS
        ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-6 mb-12">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-3">
            <img
              src={logoWhite}
              alt="Logo"
              className="dark:hidden h-20 w-fit -ml-7"
            />
            <img
              src={logoDark}
              alt="Logo"
              className="hidden dark:block h-20 w-fit -ml-7"
            />
            <div className="text-sm text-muted-foreground uppercase space-y-1">
              <p>MOCAT CERTIFICATE NO : 0013878</p>
              <p>ATAB CERTIFICATE NO : MN-00005396</p>
              <p>IATA CERTIFICATE NO : 42343350</p>
              <p>TRADE LICENSE NO : DSCC - 005406</p>
              <p>HAJJ LICENSE NO : 0001266</p>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-primary">
                  Hotel Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/">Flight</Link>
              </li>
              <li>
                <Link to="/hotel">Hotel</Link>
              </li>
              <li>
                <Link to="/visa">Visa</Link>
              </li>
              <li>
                <Link to="/hajj">Hajj</Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl mb-4">Useful Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/guide">Travel Guide</Link>
              </li>
              <li>
                <Link to="/advisory">Travel Advisory</Link>
              </li>
              <li>
                <Link to="/stpay">ST Pay</Link>
              </li>
            </ul>
          </div>

          {/* Promotions */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-xl mb-4">Promotions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/promotions">Offers</Link>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="lg:col-span-2 lg:space-x-5 lg:text-right">
            <h4 className="font-bold text-left text-xl mb-4">Pay Using</h4>
            <div className="grid grid-cols-4 gap-2 justify-end">
              {footerPayImages.map((image, i) => (
                <div
                  key={i}
                  className="h-8 w-10 border rounded bg-white flex items-center justify-center"
                >
                  <span className="text-[8px] font-bold">
                    <img src={image.url} alt="" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-border my-10" />

        {/* ==================================================
            MIDDLE SECTION : CONTACT + OFFICES
        ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-xl uppercase">Contact Us</h4>

            <p className="flex items-center gap-2 text-sm">
              <Mail size={18} className="text-primary" />
              <span>Email:</span>
              <a href="mailto:info@nusukibd.com" className="hover:underline">
                info@nusukibd.com
              </a>
            </p>

            <p className="flex items-center gap-2 text-sm">
              <Phone size={18} className="text-primary" />
              <span>Hotline:</span>
              <a href="tel:09611678658" className="hover:underline">
                09611678658
              </a>
            </p>

            <p className="text-sm font-bold">
              WhatsApp:{" "}
              <a
                href="https://wa.me/8801714742454"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                +8801714742454
              </a>
            </p>

            <div className="flex flex-wrap gap-2">
              {socialLinks.length > 0 ? (
                socialLinks.map((item) => {
                  const Icon = getSocialIcon(item.icon, item.platform);

                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.platform}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-secondary/50 hover:bg-primary hover:text-white h-9 w-9"
                      >
                        <Icon size={16} />
                      </Button>
                    </a>
                  );
                })
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-secondary/50 h-9 w-9"
                  disabled
                >
                  <Globe size={16} />
                </Button>
              )}
            </div>
          </div>

          {/* Dynamic Addresses */}
          {addresses.map((item) => (
            <div key={item.id} className="space-y-3">
              <h4 className="font-bold text-xl uppercase">
                {item.title || "Office Address"}
              </h4>

              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {item.address}
              </p>

              {item.google_map_embed && (
                <a
                  href={cleanGoogleMapUrl(item.google_map_embed)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary text-sm"
                >
                  <MapPin size={16} /> View Map
                </a>
              )}
            </div>
          ))}
        </div>

        <hr className="border-border my-10" />

        <img src={footerLight} alt="footer" className="block dark:hidden" />

        <img src={footerDark} alt="footer dark" className="dark:block hidden" />

        <hr className="border-border my-10" />

        {/* ==================================================
            FOOTER BOTTOM
        ================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-4">
            <span>© {new Date().getFullYear()}</span>

            <Link to="/support-center">Support Center</Link>
            <Link to="/payment">Payment</Link>
            <Link to="/security">Security</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/emi">EMI</Link>
          </div>

          <p>Copyright © 2026 Nusuki. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
