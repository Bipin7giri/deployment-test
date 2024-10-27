import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex  flex-col items-center ">
      <svg
        className="h-16 w-16 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM10 20v-2m0 0V6m0 2h4m-4 10h4m-4-8h4"
        ></path>
      </svg>
      <h2 className="mt-2 text-sm font-regular text-gray-900">No Data Found</h2>
      {/* <p className="mt-1 text-gray-500">Please Navgate to Other Tab To View More On This Stock.</p> */}
    </div>
  );
};
export default NoDataFound;
