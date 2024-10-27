"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../(auth)/login/_component/login"), {
  ssr: false,
});
const Watchlist = dynamic(() => import("./_components/Watchlist"), {
  ssr: false,
});
const WatchlistPage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  if (!isLoggedIn) {
    if (isModalOpen) {
      return (
        <>
          <div className="fixed backdrop-filter backdrop-blur-sm bg-opacity-75 top-0 left-0 w-screen h-screen flex items-center justify-center z-40">
            <div className="bg-secondary    rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Login Required</h2>
              <div>
                <div>
                  <span style={{ display: "inline" }}># Sign In for </span>
                  <span
                    className="font-semibold text-success"
                    style={{ display: "inline" }}
                  >
                    free
                  </span>
                  <span style={{ display: "inline" }}>
                    {" "}
                    to access tons of features Saral Lagani has to provide you:
                  </span>
                </div>
                <ul className="list-disc list-inside">
                  <li className="">Track Economic Activities</li>
                  <li className="">Track Your Portfolio</li>
                  <li className="">Create Your Watchlist</li>
                  <li className="">Screen Companies From Stock Universe</li>
                  {/* <li className="">Get insights before anyone</li> */}
                </ul>
              </div>
              <br></br>{" "}
              <div className="flex justify-between space-x-4">
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                  className="bg-secondary    text-primary  "
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="bg-black hover:bg-gray-800 text-secondary  py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
          <Watchlist />
        </>
      );
    } else {
      return <Login path="/watchList" />;
    }
  }

  return (
    <>
      <Watchlist />
    </>
  );
};

export default WatchlistPage;
