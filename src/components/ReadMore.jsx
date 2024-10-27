import React, { useState } from 'react';

const ReadMore = ({ text, maxCharCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowButton = text.length > maxCharCount;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className='text-3xl lg:text-sm font-poppins text-gray-800'>
        {isExpanded ? text : text.slice(0, maxCharCount)}
        {shouldShowButton && (
          <button onClick={toggleReadMore} className='text-success ml-3'>
            {isExpanded ? 'Read Less...' : 'Read More....'}
          </button>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
