import { Link } from "react-router-dom";
import logoWhite from "../assets/reactAssets/Logo/whiteLogo.png";
import logoDark from "../assets/reactAssets/Logo/darkLogo.png";
import footerLight from "@/assets/reactAssets/Footer/footer.webp";
import footerDark from "@/assets/reactAssets/Footer/footer-dark.jpeg";
import { footerPayImages } from "@/data/footerPayImages";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetAddressesQuery,
  useGetSocialLinksQuery,
} from "@/redux/api/settingsApi/settingApi";

const Footer = () => {
  const { data: socialLinksResponse } = useGetSocialLinksQuery();
  const { data: addressesResponse } = useGetAddressesQuery();

  const socialLinks =
    socialLinksResponse?.data
      ?.filter((item) => item.is_active)
      ?.sort((a, b) => a.position - b.position) ?? [];

  const addresses =
    addressesResponse?.data
      ?.filter((item) => item.is_active)
      ?.sort((a, b) => a.position - b.position) ?? [];

  return (
    <footer className="relative w-full overflow-hidden border-t border-primary/20 bg-primary text-primary-foreground dark:bg-background dark:text-foreground dark:border-border">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-5">
        {/* <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-white blur-3xl" /> */}
      </div>

      <div className="relative mx-auto max-w-360 px-4 pt-14 pb-8">
        {/* ==================================================
            TOP SECTION : BRAND + NAV LINKS
        ================================================== */}
        <div className="grid grid-cols-1 gap-8 rounded-md border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 lg:p-8 dark:border-border dark:bg-card/60">
          {/* Brand */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-sm bg-white/95 px-4 py-3 w-fit shadow-md dark:bg-transparent dark:shadow-none dark:px-0 dark:py-0">
              <img
                src={logoWhite}
                alt="Logo"
                className="dark:hidden h-16 w-fit"
              />
              <img
                src={logoDark}
                alt="Logo"
                className="hidden dark:block h-16 w-fit"
              />
            </div>

            <div className="space-y-1 text-xs uppercase leading-6 text-white/80 dark:text-muted-foreground">
              <p>MOCAT CERTIFICATE NO : 0013878</p>
              <p>ATAB CERTIFICATE NO : MN-00005396</p>
              <p>IATA CERTIFICATE NO : 42343350</p>
              <p>TRADE LICENSE NO : DSCC - 005406</p>
              <p>HAJJ LICENSE NO : 0001266</p>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xl font-bold text-white dark:text-foreground">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/75 dark:text-muted-foreground">
              <li>
                <Link to="/about" className="transition hover:text-white dark:hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="transition hover:text-white dark:hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="transition hover:text-white dark:hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="transition hover:text-white dark:hover:text-primary">
                  Hotel Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xl font-bold text-white dark:text-foreground">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-white/75 dark:text-muted-foreground">
              <li>
                <Link to="/" className="transition hover:text-white dark:hover:text-primary">
                  Flight
                </Link>
              </li>
              <li>
                <Link to="/hotel" className="transition hover:text-white dark:hover:text-primary">
                  Hotel
                </Link>
              </li>
              <li>
                <Link to="/visa" className="transition hover:text-white dark:hover:text-primary">
                  Visa
                </Link>
              </li>
              <li>
                <Link to="/hajj" className="transition hover:text-white dark:hover:text-primary">
                  Hajj
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-xl font-bold text-white dark:text-foreground">
              Useful Links
            </h4>
            <ul className="space-y-2 text-sm text-white/75 dark:text-muted-foreground">
              <li>
                <Link to="/guide" className="transition hover:text-white dark:hover:text-primary">
                  Travel Guide
                </Link>
              </li>
              <li>
                <Link to="/advisory" className="transition hover:text-white dark:hover:text-primary">
                  Travel Advisory
                </Link>
              </li>
              <li>
                <Link to="/stpay" className="transition hover:text-white dark:hover:text-primary">
                  ST Pay
                </Link>
              </li>
            </ul>
          </div>

          {/* Promotions */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-xl font-bold text-white dark:text-foreground">
              Promotions
            </h4>
            <ul className="space-y-2 text-sm text-white/75 dark:text-muted-foreground">
              <li>
                <Link to="/news" className="transition hover:text-white dark:hover:text-primary">
                  News
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="transition hover:text-white dark:hover:text-primary">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-left text-xl font-bold text-white dark:text-foreground">
              Pay Using
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {footerPayImages.map((image, i) => (
                <div
                  key={i}
                  className="flex h-9 w-12 items-center justify-center rounded-lg border border-white/20 bg-white p-1 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img
                    src={image.url}
                    alt="payment method"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================
            MIDDLE SECTION : CONTACT + OFFICES
        ================================================== */}
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Contact */}
          <div className="rounded-md border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-md dark:border-border dark:bg-card/60">
            <h4 className="mb-5 text-xl font-bold uppercase text-white dark:text-foreground">
              Contact Us
            </h4>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-sm text-white/80 dark:text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white dark:bg-primary/10 dark:text-primary">
                  <Mail size={18} />
                </span>
                <span>
                  Email:{" "}
                  <a
                    href="mailto:info@nusukibd.com"
                    className="font-medium text-white hover:underline dark:text-foreground"
                  >
                    info@nusukibd.com
                  </a>
                </span>
              </p>

              <p className="flex items-center gap-3 text-sm text-white/80 dark:text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white dark:bg-primary/10 dark:text-primary">
                  <Phone size={18} />
                </span>
                <span>
                  Hotline:{" "}
                  <a
                    href="tel:09611678658"
                    className="font-medium text-white hover:underline dark:text-foreground"
                  >
                    09611678658
                  </a>
                </span>
              </p>

              <p className="text-sm text-white/80 dark:text-muted-foreground">
                WhatsApp:{" "}
                <a
                  href="https://wa.me/8801714742454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:underline dark:text-primary"
                >
                  +8801714742454
                </a>
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.length > 0 ? (
                  socialLinks.map((item) => (
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
                        className="h-10 w-10 rounded-full bg-white/15 p-1 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-primary dark:bg-secondary/50 dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
                      >
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt={item.platform}
                            className="h-5 w-5 object-contain"
                          />
                        ) : (
                          <Globe size={16} />
                        )}
                      </Button>
                    </a>
                  ))
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/15 text-white dark:bg-secondary/50 dark:text-foreground"
                    disabled
                  >
                    <Globe size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Addresses */}
          {addresses.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-md dark:border-border dark:bg-card/60"
            >
              <h4 className="mb-4 text-xl font-bold uppercase text-white dark:text-foreground">
                {item.title || "Office Address"}
              </h4>

              <p className="text-sm leading-7 text-white/75 whitespace-pre-line dark:text-muted-foreground">
                {item.address}
              </p>

              {item.google_map_embed && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    item.address,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-primary dark:text-primary-foreground"
                >
                  <MapPin size={16} />
                  View Map
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer Image */}
        <div className="rounded-md border border-white/15 bg-white p-4 shadow-xl dark:border-border dark:bg-card/60">
          <img
            src={footerLight}
            alt="footer"
            className="block w-full rounded-sm dark:hidden"
          />

          <img
            src={footerDark}
            alt="footer dark"
            className="hidden w-full rounded-sm dark:block"
          />
        </div>

        {/* ==================================================
            FOOTER BOTTOM
        ================================================== */}
        <div className="mt-10 rounded-md border border-white/15 bg-white/10 px-5 py-6 shadow-xl backdrop-blur-md dark:border-border dark:bg-card/60">
          <div className="flex flex-col items-center justify-between gap-5 text-sm text-white/75 md:flex-row dark:text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <span>© {new Date().getFullYear()}</span>

              <Link to="/support-center" className="transition hover:text-white dark:hover:text-primary">
                Support Center
              </Link>
              <Link to="/payment" className="transition hover:text-white dark:hover:text-primary">
                Payment
              </Link>
              <Link to="/security" className="transition hover:text-white dark:hover:text-primary">
                Security
              </Link>
              <Link to="/privacy-policy" className="transition hover:text-white dark:hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/emi" className="transition hover:text-white dark:hover:text-primary">
                EMI
              </Link>
            </div>

            <p className="text-center md:text-right">
              Copyright © 2026 Nusuki. All rights reserved.
            </p>
          </div>

          {/* Developer Credit */}
          <div className="mt-5 border-t border-white/15 pt-5 text-center text-sm text-white/75 dark:border-border dark:text-muted-foreground">
            This website is developed by{" "}
            <a
              href="http://ilabs360.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-4 hover:underline dark:text-primary"
            >
              ilabs360
            </a>{" "}
            team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;