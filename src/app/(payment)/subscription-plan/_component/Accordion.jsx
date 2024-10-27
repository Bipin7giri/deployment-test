"use client";
import { useRef, useState } from "react";
import AccordionItem from "./AccordionItem";

// eslint-disable-next-line react/prop-types
function Accordion({ plans }) {
  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      return setActive(null);
    }
    setActive(index);
  };

  return (
    <div className="flex flex-col w-full items-center text-black-100 mb-2  font-[400] gap-2">
      {plans?.map((plan, index) => (
        <AccordionItem
          key={index}
          index={index}
          open={active === index}
          onToggle={handleToggle}
          plan={plan}
        />
      ))}
    </div>
  );
}

export default Accordion;
