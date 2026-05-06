import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HajjLayout from "../layouts/HajjLayout";
import VisaRequirements from "../pages/main/Hajj_Umrah/VisaRequirements/VisaRequirements";
import UmrahLayout from "../layouts/UmrahLayout";
import Significance from "@/pages/main/Hajj_Umrah/Significance/Significance";
import HajjUmPackages from "@/pages/main/Hajj_Umrah/HajjUmPackages/HajjUmPackages";
import VisaLayout from "@/layouts/VisaLayout";
import EducationLayout from "@/layouts/EducationLayout";
import HomeEducation from "@/pages/main/Education/HomeEducation/HomeEducation";
import ErrorPage from "@/components/ErrorPage";
import HomeInstitution from "@/pages/main/Education/Institution/HomeInstitution/HomeInstitution";
import HajjUmMainDetPack from "@/pages/main/Hajj_Umrah/HajjUmPackages/HajjUmDetPack/HajjUmMainDetPack";
import DetInstitutionMain from "@/pages/main/Education/Institution/DetInstitution/DetInstitutionMain";
import Upcoming from "@/components/Upcoming";
import UmrahMainDetPack from "@/pages/main/Hajj_Umrah/HajjUmPackages/UmrahDetPack/UmrahMainDetPack";
import HomeCourse from "@/pages/main/Education/Course/HomeCourse/HomeCourse";
import DetCourseMain from "@/pages/main/Education/Course/DetCourse/CourseMain";
import HomeVisa from "@/pages/main/Visa/HomeVisa/HomeVisa";
import DetVisaMain from "@/pages/main/Visa/DetailsVisa/DetVisaMain";
import DestinationMain from "@/pages/main/Education/Destination/DestinationMain";
import HomeTest from "@/pages/main/Education/Test/HomeTest/HomeTest";
import DetailTestMain from "@/pages/main/Education/Test/DetailTest/DetailTestMain";
import FlightHome from "@/pages/main/Flight/FlightHome/FlightHome";
import ShopHome from "@/pages/main/Shop/ShopHome/ShopHome";
import ShopProductDetailsMain from "@/pages/main/Shop/ShopProductDetails/ProductDetailsMain";
import ShopCartMain from "@/pages/main/Shop/ShopCart/ShopCartMain";
import FlightDetailsMain from "@/pages/main/Flight/FlightDetail/FlightDetailsMain";
import HolidayLayout from "@/layouts/HolidayLayout";
import HolidayHome from "@/pages/main/Holiday/HolidayHome/HolidayHome";
import HolidayPackageLists from "@/pages/main/Holiday/HolidayPackageLists/HolidayPackageLists";
import HolidayDetails from "@/pages/main/Holiday/HolidayDetails/HolidayDetails";
import ShopCheckOutMain from "@/pages/main/Shop/ShopCheckOut/ShopCheckOutMain";
import BookingFlightPNR from "@/pages/main/Flight/FlightBooking/BookingFlightPNR";
// import ShopCheckOutMain from "@/pages/main/Shop/ShopCheckOut/ShopCheckOutMain";

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
          {
            path: "booking",
            element: <BookingFlightPNR />
          }
        ],
      },
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
      {
        path: "hotel",
        // Component: HotelLayout,
        children: [
          {
            index: true,
            // element: <Hotel />,
            element: <Upcoming title="Hotel Section Upcoming" />,
          },
        ],
      },
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
      {
        path: "shop",
        // Component: ShopLayout,
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

      {
        path: "hajj",
        Component: HajjLayout,
        children: [
          {
            // index: true,
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
      {
        path: "umrah",
        Component: UmrahLayout,
        children: [
          {
            // index: true,
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
    ],
  },
]);
