"use client";
import { Fragment, useRef, useState } from "react";

function AccordionItem({
  plan: { plan, planDescription },
  onToggle,
  open,
  index,
}) {
  const [selectedPlan, setSelectedPlan] = useState(false);
  const contentSpace = useRef(null);

  function toggleAccordion() {
    onToggle(index);
  }

  return (
    <Fragment>
      <div className="w-full flex justify-between items-center">
        <p className="text-md flex items-center">
          <span
            className={`w-4 h-4 mr-2 inline-flex items-center justify-center ${
              // selectedPlan ? "bg-[#4CD263]" : "bg-gray-300"
              "bg-[#4CD263]"
            }  text-white rounded-full cursor-pointer`}
            onClick={() => setSelectedPlan((currPlan) => !currPlan)}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </span>
          {plan}
        </p>
        <svg
          className={`w-4 h-4 dark:text-black font-bold inline-block text-3xl hover:cursor-pointer transform duration-700 ease ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 8"
          onClick={toggleAccordion}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
          />
        </svg>
      </div>

      <div
        ref={contentSpace}
        style={{
          maxHeight: `${
            open ? `${contentSpace.current.scrollHeight}px` : "0px"
          }`,
        }}
        className="overflow-hidden rounded-lg transition-max-height duration-700 ease-in-out"
      >
        <p className="leading-tighter tracking-tight text-sm p-2 text-start">
          {planDescription}
        </p>
      </div>
    </Fragment>
  );
}

export default AccordionItem;
