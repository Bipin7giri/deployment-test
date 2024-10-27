"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
// import usePageViewTracking from "../../services/usePageViewTracking";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("@/app/(auth)/login/_component/login"), {
  ssr: false,
});
const PaymentDetail = dynamic(() => import("./_component/PaymentDetail"), {
  ssr: false,
});

const SaralPayment = ({ params }) => {
  // usePageViewTracking();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  if (!isLoggedIn) {
    if (isModalOpen) {
      return (
        <>
          <div className="fixed backdrop-filter backdrop-blur-sm bg-opacity-75 top-0 left-0 w-screen h-screen flex items-center justify-center z-40">
            <div className="bg-secondary    rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Login Required...</h2>
              <p className="text-gray-600 mb-6">
                You need to login to access this page. Please login or create an
                account to continue.
              </p>
              <div className="flex justify-end gap-6">
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                  className="bg-black hover:bg-gray-800 text-secondary  py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="bg-black hover:bg-gray-800 text-secondary  py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div className="lg:bg-[#F4F6F9]">
            <PaymentDetail packageTitle={params.title} />
          </div>
        </>
      );
    } else {
      return <Login path="/collab-request" />;
    }
  }

  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <title>Payment | Saral Lagani</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta property="og:title" content="Payment With SaralLagani" />
        <meta property="og:description" content="Payment With SaralLagani" />
        <meta
          name="keywords"
          content="Portfolio Manager, NEPSE, portfolio, Portfolio Tracker, collaboration, Stock payment"
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>
      <div className="lg:bg-[#F4F6F9]">
        <PaymentDetail packageTitle={params.title} />
      </div>
    </div>
  );
};

export default SaralPayment;
