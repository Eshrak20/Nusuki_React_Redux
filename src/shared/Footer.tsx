import { Link } from "react-router-dom";
import logoWhite from "../assets/reactAssets/Logo/whiteLogo.png";
import logoDark from "../assets/reactAssets/Logo/darkLogo.png";
import { footerPayImages } from "@/data/footerPayImages";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";



const Footer = () => {
  const socialLinks = [
    { icon: Facebook, link: "https://facebook.com/yourpage" },
    { icon: Twitter, link: "https://twitter.com/yourprofile" },
    { icon: Instagram, link: "https://instagram.com/yourprofile" },
    { icon: Youtube, link: "https://youtube.com/@yourchannel" },
    { icon: Linkedin, link: "https://linkedin.com/company/yourcompany" },
  ];

  return (
    <footer className="w-full bg-background border-t border-border pt-12 pb-8">


      <div className="max-w-360 mx-auto px-4">
        {/* ==================================================
            TOP SECTION : BRAND + NAV LINKS
        ================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-6 mb-12">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-3">
            <img src={logoWhite} alt="Logo" className="dark:hidden h-14 w-fit" />
            <img src={logoDark} alt="Logo" className="hidden dark:block h-14 w-fit" />
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

            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-secondary/50 hover:bg-primary hover:text-white h-9 w-9"
                  >
                    <Icon size={16} />
                  </Button>
                </a>
              ))}
            </div>
          </div>

          {/* Front Office */}
          <div className="space-y-3">
            <h4 className="font-bold text-xl uppercase">Front Office</h4>
            <p className="text-sm text-muted-foreground">
              Tropicana Tower, 2nd Floor, Flat-F2 <br />
              218 Shahid Syed Nazrul Islam Sharani <br />
              Dhaka-1000, Bangladesh
            </p>
            <Link
              to="#"
              className="flex items-center gap-2 text-primary text-sm"
            >
              <MapPin size={16} /> View Map
            </Link>
          </div>

          {/* Mohammedpur Office */}
          <div className="space-y-3">
            <h4 className="font-bold text-xl uppercase">Mohammedpur Office</h4>
            <p className="text-sm text-muted-foreground">
              15/1/C Block-F <br />
              Hazi Chinu Mia Road <br />
              Mohammadpur, Dhaka-1207
            </p>
            <Link
              to="#"
              className="flex items-center gap-2 text-primary text-sm"
            >
              <MapPin size={16} /> View Map
            </Link>
          </div>
        </div>

        <hr className="border-border my-10" />

        {/* ==================================================
          //! Todo  SISTER CONCERN + MEMBERSHIP
        ================================================== */}
        {/* <div className="flex flex-col md:flex-row items-center justify-between py-10">
          <div className="flex-1 flex flex-col items-center gap-6">
            <h5 className="font-bold text-xl uppercase">Our Sister Concern</h5>
            <div className="flex gap-10">
              <img
                src="/path-to/padma.png"
                alt="Padma Air"
                className={logoStyle}
              />
              <img
                src="/path-to/universal.png"
                alt="Universal Travel"
                className={logoStyle}
              />
              <img
                src="/path-to/nusuki-edu.png"
                alt="Nusuki Education"
                className={logoStyle}
              />
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center px-16 space-y-3">
            <div className="w-0.5 h-12" style={{ backgroundColor: grayGold }} />
            <div
              className="w-3.5 h-3.5 rotate-45 border-2"
              style={{ borderColor: grayGold }}
            />
            <div className="w-0.5 h-12" style={{ backgroundColor: grayGold }} />
          </div>

          <div className="flex-1 flex flex-col items-center gap-6">
            <h5 className="font-bold text-xl uppercase">We Are Members Of</h5>
            <div className="flex gap-10">
              <img src="/path-to/iata.png" alt="IATA" className={logoStyle} />
              <img src="/path-to/haab.png" alt="HAAB" className={logoStyle} />
              <img src="/path-to/facd.png" alt="FACD" className={logoStyle} />
              <img src="/path-to/atab.png" alt="ATAB" className={logoStyle} />
            </div>
          </div>
        </div> */}
        <img src="/src/assets/reactAssets/Footer/footer.webp" alt="" />

        <hr className="border-border my-10" />

        {/* ==================================================
            FOOTER BOTTOM
        ================================================== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
          <div className="flex flex-wrap gap-4">
            <span>© {new Date().getFullYear()}</span>
            <Link to="/support">Support Center</Link>
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
