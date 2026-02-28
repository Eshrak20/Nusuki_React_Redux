import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        // element: <Flight />,
        element: <Upcoming title="Flight Section Upcoming" />,

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
            path: "destinations",
            element: <Upcoming title="Destinations Section Upcoming" />,

          },
          {
            path: "destinations/:country",
            element: <Upcoming title="Destinations Section Upcoming" />,
          },
          {
            path: "courses",
            element: <Upcoming title="Courses Section Upcoming" />,
          },
          {
            path: "tests",
            element: <Upcoming title="Tests Section Upcoming" />,
          },
        ],
      },
      {
        path: "visa",
        Component: VisaLayout,
        children: [
          {
            index: true,
            // element: <Visa />,
            element: <Upcoming title="Visa Section Upcoming" />,
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
        // Component: HolidayLayout,
        children: [
          {
            index: true,
            // element: <Holiday />,
            element: <Upcoming title="Holiday Section Upcoming" />,

          },
        ],
      },
      {
        path: "shop",
        // Component: ShopLayout,
        children: [
          {
            index: true,
            // element: <Holiday />,
            element: <Upcoming title="Shop Section Upcoming" />,
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
          }
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
          }
        ],
      },
    ],
  },
]);
