import React from "react";

import Nepse from "../../../components/Charts/Nepse";

const NepseMainChart = ({ lineChartData, extraInfo }) => {
  return (
    <>
      <div className="">
        <Nepse
          data={lineChartData}
          extraInfo={extraInfo}
          height={318}
          fontSize={12}
        />
      </div>
    </>
  );
};

export default NepseMainChart;
