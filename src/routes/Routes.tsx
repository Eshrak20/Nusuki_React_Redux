import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Flight from "../pages/main/Flight/Flight";
import HajjLayout from "../layouts/HajjLayout";
import VisaRequirements from "../pages/main/Hajj_Umrah/VisaRequirements/VisaRequirements";
import UmrahLayout from "../layouts/UmrahLayout";
import Significance from "@/pages/main/Hajj_Umrah/Significance/Significance";
import HajjUmPackages from "@/pages/main/Hajj_Umrah/HajjUmPackages/HajjUmPackages";
import VisaLayout from "@/layouts/VisaLayout";
import Visa from "@/pages/main/Visa/Visa";
import EducationLayout from "@/layouts/EducationLayout";
import HomeEducation from "@/pages/main/Education/HomeEducation/HomeEducation";
import ErrorPage from "@/components/ErrorPage";
import HomeInstitution from "@/pages/main/Education/Institution/HomeInstitution/HomeInstitution";
import HajjUmMainDetPack from "@/pages/main/Hajj_Umrah/HajjUmPackages/HajjUmDetPack/HajjUmMainDetPack";
import DetInstitutionMain from "@/pages/main/Education/Institution/DetInstitution/DetInstitutionMain";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Flight />,
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
        ],
      },
      {
        path: "visa",
        Component: VisaLayout,
        children: [
          {
            index: true,
            element: <Visa />,
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
        ],
      },
    ],
  },
]);
