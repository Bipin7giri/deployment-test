import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";

const timeLineData = [
  {
    id: 1,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 2,
    title: "code",
    time: "10:30am",
    description: "Because you need stability.",
  },
  {
    id: 3,
    title: "sleep",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 4,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 5,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 6,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 7,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 8,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 9,
    title: "eat",
    time: "9:30am",
    description: "Because you need strength.",
  },
  {
    id: 10,
    title: "eat",
    description: "Because you need strength.",
  },
];

function Timeline() {
  // To keep track of screen sizes
  const [width, setWidth] = useState(
    typeof window !== undefined ? window.innerWidth : ""
  );
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
  // To keep track of whether user clicks show more or not in mobile screen
  const [showMore, setShowMore] = useState(false);

  function handleWindowSizeChange() {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  }

  function handleShowToggle() {
    setShowMore((currState) => !currState);
  }

  //  Change width state on first mount accordingly
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleWindowSizeChange);
      }
    };
  }, []);

  // checking if current size is mobile or not
  const isMobile = width <= 640;

  //   To show only 4 items if it is mobile
  const data = isMobile
    ? showMore
      ? timeLineData
      : timeLineData.slice(0, 4)
    : timeLineData;

  return (
    <div className="h-auto bg-secondary px-6 py-10 text-primary flex sm:justify-center items-center rounded-[20px] border-[1px]">
      {/* Timeline starts here */}
      <ol className="overflow-autojustify-center sm:h-auto sm:flex sm:flex-wrap xl:flex-nowrap sm:gap-2">
        {data.map((timeline) => (
          <Fragment key={timeline.id}>
            <li className="relative mb-6 sm:mb-0">
              <div className="flex items-center">
                <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full dark:bg-blue-900">
                  <svg
                    className="w-3 h-3 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
              </div>
              <div className="mt-3 sm:pr-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {timeline.title}
                </h3>
                {timeline.time && (
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {timeline.time}
                  </time>
                )}
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  {timeline.description}
                </p>
              </div>
            </li>
          </Fragment>
        ))}
        {isMobile && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleShowToggle()}
          >
            {showMore ? "View Less" : "View More"}
          </button>
        )}
      </ol>
    </div>
  );
}

export default Timeline;
