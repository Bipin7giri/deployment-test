import InflationChart from "../../../components/Charts/InflationChart";
import InterestChart from "../../../components/Charts/InterestChart";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";

const Inflation = () => {
  const dispatch = useDispatch();
  const { inflation, interest } = useSelector((state) => state.home);
  const [toggle, setToggle] = useState("inflationRate");
  const handleToggle = (value) => {
    if (value === "inflationRate") {
      dispatch({ type: actions.GET_INFLATION_REQ });
    }
    if (value === "interestRate") {
      dispatch({ type: actions.GET_INTEREST_REQ });
    }
  };
  useEffect(() => {
    dispatch({ type: actions.GET_INFLATION_REQ });
  }, []);
  return (
    <>
      <div>
        <select
          onChange={(e) => {
            setToggle(e.target.value);
            handleToggle(e.target.value);
          }}
          className="select px-3 py-1 lg:text-xs text-2xl text-primary   font-semibold bg-[#F4F6F9]  rounded"
        >
          <option
            className="text-[10px] lg:text-sm"
            defaultValue={"inflationRate"}
            value="inflationRate"
          >
            Inflation
          </option>
          <option className="text-[10px] lg:text-sm" value="interestRate">
            Interest Rate
          </option>
        </select>
      </div>
      <div className="lg:block hidden">
        {toggle === "inflationRate" && (
          <>
            {inflation.inflation !== undefined && (
              <>
                <InflationChart
                  height={230}
                  fontSize={12}
                  inflationData={inflation.inflation}
                />
              </>
            )}
          </>
        )}
        {toggle === "interestRate" && (
          <>
            {interest.interest !== undefined && (
              <>
                <InterestChart
                  height={230}
                  fontSize={12}
                  interestData={interest.interest}
                />
              </>
            )}
          </>
        )}
      </div>
      <div className="lg:hidden block">
        {toggle === "inflationRate" && (
          <>
            {inflation.inflation !== undefined && (
              <>
                <InflationChart
                  height={500}
                  fontSize={25}
                  inflationData={inflation.inflation}
                />
              </>
            )}
          </>
        )}
        {toggle === "interestRate" && (
          <>
            {interest.interest !== undefined && (
              <>
                <InterestChart
                  height={450}
                  fontSize={25}
                  interestData={interest.interest}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Inflation;
