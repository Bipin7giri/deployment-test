import React from "react";

const Remotion = () => {
  return (
    <div className="lg:container lg:px-0 lg:mx-auto my-16 px-4 w-full">
      <div className="bg-white px-4 py-6 w-full rounded-2xl">
        <h2 className="mb-6 lg:text-xl text-center text-[32px] font-semibold">
          NEPSE Overview
        </h2>
        <video
          src="https://saralchatsystem.s3.ap-south-1.amazonaws.com/remotion/video.mp4"
          controls={true}
          type="video/mp4"
          className="h-[600px] w-full"
          muted={true}
        ></video>
      </div>
    </div>
  );
};

export default Remotion;
