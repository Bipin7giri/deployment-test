import { Image, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillFilePdf } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";

const FinancialImage = ({ symbol }) => {
  const dispatch = useDispatch();
  const { isFinancialLoading, reportImageBySymbol, quarterIncomeTableOne } =
    useSelector((state) => state.company);
  const [visible, setVisible] = useState(false);
  const [reportImageQuater, setReportImageQuater] = useState({});

  useEffect(() => {
    if (symbol !== quarterIncomeTableOne?.[0]?.data?.symbol) {
      dispatch(actions.getReporImageBySymbol({ symbol: symbol }));
    }
  }, [symbol]);

  const handleReportClicked = (quarters, quarter) => {
    setReportImageQuater(quarters[quarter]);
  };

  const renderQuarterlyReports = (year, quarters) => {
    return Object?.keys(quarters)?.map((quarter) => (
      <div
        className="flex cursor-pointer mb-[10px]"
        onClick={() => {
          setVisible(true);
          handleReportClicked(quarters, quarter);
        }}
        key={quarter}
      >
        <div className="mr-[20px] text-[12px]">
          {quarters[quarter].file_name}
        </div>
        <div className="rounded-sm px-[4px] py-0 text-[10px] font-[600] border text-[#70c3ff] border-[#70c3ff] shadow-sm p-[4px] hover:bg-[#0088ea] hover:text-[#fff]">
          {" "}
          PDF{" "}
        </div>
      </div>
    ));
  };

  return (
    <>
      {isFinancialLoading ? (
        <div className="my-10">
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        reportImageBySymbol?.data &&
        Object.keys(reportImageBySymbol.data)?.length > 0 && (
          <div className="financial-report pb-[40px]">
            <p className="mb-[20px] text-2xl font-bold lg:text-lg uppercase">
              Company Financial Report
            </p>
            <div className="flex w-[100%] gap-[3%] overflow-x-scroll pb-[10px]">
              {Object?.keys?.(reportImageBySymbol?.data)?.map((year) => (
                <div className="xl:w-[20%]" key={year}>
                  <h6 className="uppercase text-[18px] font-[500] pb-[10px]">
                    {year}
                  </h6>
                  <div>
                    {reportImageBySymbol?.data?.[year]?.annual?.length > 0 && (
                      <div className="yearly">
                        <a
                          href={
                            reportImageBySymbol?.data?.[year]?.annual?.[0]?.link
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md px-[16px] py-[8px] w-[240px] border border-gray-300 shadow-sm p-[4px] capitalize font-[600] flex items-center"
                        >
                          <div className="mt-[2px] bg-[#27bc94] text-secondary text-[12px] rounded-2xl p-[4px] mr-[20px]">
                            <AiFillFilePdf />
                          </div>
                          <div className="mr-[20px]">Annual Report</div>
                          <div className="rounded-sm px-[4px] py-0 text-[10px] font-[600] border text-[#70c3ff] border-[#70c3ff] shadow-sm p-[4px] hover:bg-[#0088ea] hover:text-[#fff]">
                            PDF
                          </div>
                        </a>
                      </div>
                    )}
                    {reportImageBySymbol?.data?.[year]?.quarter?.length > 0 && (
                      <div className="mt-[10px] quarterly rounded-md px-[16px] py-[8px] w-[240px] border border-gray-300 shadow-sm p-[4px] capitalize font-[600] ">
                        <div className="p-[4px] capitalize font-[600] flex items-center">
                          Quarterly Report
                        </div>
                        <div className="w-full gap-[4%] py-[10px]">
                          {renderQuarterlyReports(
                            year,
                            reportImageBySymbol?.data?.[year]?.quarter
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}

      {visible && Object.keys(reportImageQuater)?.length > 0 && (
        <Image
          style={{
            display: "none",
            padding: "50px 0",
          }}
          preview={{
            visible,
            src: `https://peridotnepal.xyz/report_image/${reportImageQuater.file_name}.webp`,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      )}
    </>
  );
};

export default FinancialImage;
