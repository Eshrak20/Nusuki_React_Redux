import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import HotelPNRForm from "./HotelPNRForm";


const HotelPNR = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const bookingKey = searchParams.get("booking_key");
  const searchId = searchParams.get("search_id");
  const guests = searchParams.get("guests");
  
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });


  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      localStorage.getItem("authToken") ||
      sessionStorage.getItem("authToken") ||
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");

    if (!token) {
      const redirectUrl = `${location.pathname}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`, {
        replace: true,
      });
    }
  }, [location.pathname, location.search, navigate]);

  if (!bookingKey || !searchId) {
    return (
      <section className="min-h-screen bg-background mt-20 px-4 py-10 text-foreground">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <h1 className="text-xl font-semibold">Invalid booking URL</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Booking key or search ID is missing from the URL.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background mt-20 px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">Hotel Booking</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Complete Your PNR Information
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Fill guest, contact, and payment details to create your hotel booking.
          </p>
        </div>

        <HotelPNRForm searchId={searchId} guestCount={guests} bookingKey={bookingKey} />
      </div>
    </section>
  );
};

export default HotelPNR;