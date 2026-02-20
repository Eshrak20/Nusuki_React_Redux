import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "@/assets/Lottie/error.json";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  let statusCode: number | undefined;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    title = `${error.status} ${error.statusText}`;
    message = typeof error.data === "string" ? error.data : "Page not found.";
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      {/* Lottie Animation */}
      <div className="w-72 mb-6">
        <Lottie animationData={errorAnimation} loop />
      </div>

      {/* Error Code */}
      <h1 className="text-5xl font-bold text-red-500 mb-2">
        {statusCode ?? "Error"}
      </h1>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>

      {/* Message */}
      <p className="text-gray-600 max-w-md mb-6">{message}</p>

      {/* Button */}
      <a
        href="/"
        className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-md"
      >
        Go Back Home
      </a>
    </div>
  );
}
