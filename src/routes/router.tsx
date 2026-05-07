import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import HajjLayout from "@/layouts/HajjLayout";
import UmrahLayout from "@/layouts/UmrahLayout";
import VisaLayout from "@/layouts/VisaLayout";
import EducationLayout from "@/layouts/EducationLayout";
import HolidayLayout from "@/layouts/HolidayLayout";

// Route Guards
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";

// Route Groups
import { authRoutes } from "@/routes/authRoutes";
import { dashboardRoutes } from "@/routes/dashboardRoutes";

// Common Pages
import ErrorPage from "@/components/ErrorPage";
import Upcoming from "@/components/Upcoming";

// Flight Pages
import FlightHome from "@/pages/main/Flight/FlightHome/FlightHome";
import FlightDetailsMain from "@/pages/main/Flight/FlightDetail/FlightDetailsMain";
import BookingFlightPNR from "@/pages/main/Flight/FlightBooking/BookingFlightPNR/BookingFlightPNR";

// Education Pages
import HomeEducation from "@/pages/main/Education/HomeEducation/HomeEducation";
import HomeInstitution from "@/pages/main/Education/Institution/HomeInstitution/HomeInstitution";
import DetInstitutionMain from "@/pages/main/Education/Institution/DetInstitution/DetInstitutionMain";
import DestinationMain from "@/pages/main/Education/Destination/DestinationMain";
import HomeCourse from "@/pages/main/Education/Course/HomeCourse/HomeCourse";
import DetCourseMain from "@/pages/main/Education/Course/DetCourse/CourseMain";
import HomeTest from "@/pages/main/Education/Test/HomeTest/HomeTest";
import DetailTestMain from "@/pages/main/Education/Test/DetailTest/DetailTestMain";

// Visa Pages
import HomeVisa from "@/pages/main/Visa/HomeVisa/HomeVisa";
import DetVisaMain from "@/pages/main/Visa/DetailsVisa/DetVisaMain";

// Holiday Pages
import HolidayHome from "@/pages/main/Holiday/HolidayHome/HolidayHome";
import HolidayPackageLists from "@/pages/main/Holiday/HolidayPackageLists/HolidayPackageLists";
import HolidayDetails from "@/pages/main/Holiday/HolidayDetails/HolidayDetails";

// Shop Pages
import ShopHome from "@/pages/main/Shop/ShopHome/ShopHome";
import ShopProductDetailsMain from "@/pages/main/Shop/ShopProductDetails/ProductDetailsMain";
import ShopCartMain from "@/pages/main/Shop/ShopCart/ShopCartMain";
import ShopCheckOutMain from "@/pages/main/Shop/ShopCheckOut/ShopCheckOutMain";

// Hajj / Umrah Pages
import VisaRequirements from "@/pages/main/Hajj_Umrah/VisaRequirements/VisaRequirements";
import Significance from "@/pages/main/Hajj_Umrah/Significance/Significance";
import HajjUmPackages from "@/pages/main/Hajj_Umrah/HajjUmPackages/HajjUmPackages";
import HajjUmMainDetPack from "@/pages/main/Hajj_Umrah/HajjUmPackages/HajjUmDetPack/HajjUmMainDetPack";
import UmrahMainDetPack from "@/pages/main/Hajj_Umrah/HajjUmPackages/UmrahDetPack/UmrahMainDetPack";
import Payment from "@/shared/Footer/Payment";
import Security from "@/shared/Footer/Security";
import PrivacyPolicy from "@/shared/Footer/PrivacyPolicy";
import Emi from "@/shared/Footer/Emi";
import SupportCenter from "@/shared/Footer/SupportCenter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/flight" replace />,
      },

      // Public only auth routes
      // /login
      // /signup
      // /forgot-password
      // /check-otp
      // /reset-password
      {
        element: <PublicOnlyRoute />,
        children: authRoutes,
      },

      // Protected dashboard routes
      // /dashboard
      // /dashboard/profile
      // /dashboard/change-password
      // /dashboard/flight-bookings
      // /dashboard/flight-bookings/:bookingId
      {
        element: <ProtectedRoute />,
        children: [
          ...dashboardRoutes,

          {
            path: "flight/booking",
            element: <BookingFlightPNR />,
          },
        ],
      },

      // Flight Routes
      {
        path: "flight",
        children: [
          {
            index: true,
            element: <FlightHome />,
          },
          {
            path: "details",
            element: <FlightDetailsMain />,
          },
        ],
      },

      // Education Routes
      {
        path: "education",
        Component: EducationLayout,
        children: [
          {
            index: true,
            element: <HomeEducation />,
          },
          {
            path: "institution",
            element: <HomeInstitution />,
          },
          {
            path: "institution/:id",
            element: <DetInstitutionMain />,
          },
          {
            path: "destinations/:country",
            element: <DestinationMain />,
          },
          {
            path: "courses",
            element: <HomeCourse />,
          },
          {
            path: "courses/:id",
            element: <DetCourseMain />,
          },
          {
            path: "tests",
            element: <HomeTest />,
          },
          {
            path: "tests/:id",
            element: <DetailTestMain />,
          },
        ],
      },

      // Visa Routes
      {
        path: "visa",
        Component: VisaLayout,
        children: [
          {
            index: true,
            element: <HomeVisa />,
          },
          {
            path: ":id",
            element: <DetVisaMain />,
          },
        ],
      },

      // Hotel Routes
      {
        path: "hotel",
        children: [
          {
            index: true,
            element: <Upcoming title="Hotel Section Upcoming" />,
          },
        ],
      },

      // Holiday Routes
      {
        path: "holiday",
        Component: HolidayLayout,
        children: [
          {
            index: true,
            element: <HolidayHome />,
          },
          {
            path: ":tourId",
            element: <HolidayPackageLists />,
          },
          {
            path: "package/:tourPacId",
            element: <HolidayDetails />,
          },
        ],
      },

      // Shop Routes
      {
        path: "shop",
        children: [
          {
            index: true,
            element: <ShopHome />,
          },
          {
            path: "products/:id",
            element: <ShopProductDetailsMain />,
          },
          {
            path: "cart",
            element: <ShopCartMain />,
          },
          {
            path: "checkout/:cartId",
            element: <ShopCheckOutMain />,
          },
        ],
      },

      // Hajj Routes
      {
        path: "hajj",
        Component: HajjLayout,
        children: [
          {
            path: "visa-requirements",
            element: <VisaRequirements />,
          },
          {
            path: "pre-register",
            element: <VisaRequirements />,
          },
          {
            path: "significance",
            element: <Significance />,
          },
          {
            path: "packages",
            element: <HajjUmPackages />,
          },
          {
            path: "packages/:id",
            element: <HajjUmMainDetPack />,
          },
        ],
      },

      // Umrah Routes
      {
        path: "umrah",
        Component: UmrahLayout,
        children: [
          {
            path: "visa-requirements",
            element: <VisaRequirements />,
          },
          {
            path: "significance",
            element: <Significance />,
          },
          {
            path: "packages",
            element: <HajjUmPackages />,
          },
          {
            path: "packages/:id",
            element: <UmrahMainDetPack />,
          },
        ],
      },
      //Footer Pages
      {
        path: "support-center",
        element: <SupportCenter />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "security",
        element: <Security />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "emi",
        element: <Emi />,
      },
    ],
  },
]);
