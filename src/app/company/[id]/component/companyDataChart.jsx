import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { MdOutlineShowChart } from "react-icons/md";
import { Modal, Select, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import FinancialCompareChart from "./FinancialCompareChart";
import { setCompareIncomeParticularQuarterly } from "../redux/companySlice";

const CompanyDataChart = ({
  id,
  selectedRowData,
  setSelectedRowData,
  quater,
  isIncome,
  isAnnualy,
  ratioQuater,
  isfinancial,
  isRatio,
  isRatioQuater,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const {
    company,
    compareIncomeParticularQuarterly,
    compareParticularLoading,
  } = useSelector((state) => state.company);
  const { companyBySector } = useSelector((state) => state?.companyCompare);

  const [selectedValue, setSelectedValue] = useState([company?.[0]?.symbol]);
  const [loginOrNotData, setLoginOrNotData] = useState([]);

  const { Option } = Select;

  useEffect(() => {
    if (selectedRowData) {
      setIsModalOpen(true);
    }
  }, [selectedRowData]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedRowData("");
    setIsModalOpen(false);
    setSelectedValue([id?.id]);
    dispatch(setCompareIncomeParticularQuarterly([]));
  };

  useEffect(() => {
    // Set isChartVisible to true when the modal is opened
    if (isModalOpen) {
      setIsChartVisible(true);
    }
  }, [isModalOpen]);

  const handleSelectedValueChange = (selectedOptions) => {
    setSelectedValue(selectedOptions);
  };

  let options = [];
  if (companyBySector?.data !== undefined) {
    companyBySector?.data?.forEach((item) => {
      if (item?.symbol != "NIFRA")
        options.push({
          value: item?.symbol,
          label: item?.symbol,
        });
    });
  }

  // Store the previous selectedRowData using useRef
  const prevSelectedRowData = useRef(selectedRowData);
  useEffect(() => {
    prevSelectedRowData.current = selectedRowData;
  }, [selectedRowData]);

  useEffect(() => {
    if (selectedRowData !== prevSelectedRowData && selectedRowData) {
      if (isfinancial) {
        if (quater && !isAnnualy) {
          if (isIncome) {
            dispatch(
              actions.getCompareIncomeParticularQuarterly({
                symbol: selectedValue?.length > 0 && selectedValue,
                particular: selectedRowData,
                quater: quater,
              })
            );
          } else {
            dispatch(
              actions.getCompareBalanceParticularQuarterly({
                symbol: selectedValue?.length > 0 && selectedValue,
                particular: selectedRowData,
                quater: quater,
              })
            );
          }
        }

        if (isAnnualy) {
          if (isIncome) {
            dispatch(
              actions.getCompareIncomeParticularAnnualy({
                symbol: selectedValue?.length > 0 && selectedValue,
                particular: selectedRowData,
              })
            );
          } else {
            dispatch(
              actions.getCompareBalanceParticularAnnualy({
                symbol: selectedValue?.length > 0 && selectedValue,
                particular: selectedRowData,
              })
            );
          }
        }
      } else if (isRatio) {
        if (isRatioQuater) {
          dispatch(
            actions.getCompareRatioParticularQuarterly({
              symbol: selectedValue?.length > 0 && selectedValue,
              particular: selectedRowData,
              quater: ratioQuater,
            })
          );
        } else {
          dispatch(
            actions.getCompareRatioParticularAnnually({
              symbol: selectedValue?.length > 0 && selectedValue,
              particular: selectedRowData,
            })
          );
        }
      } else {
        // do nothing
      }
    }
  }, [prevSelectedRowData, selectedValue, selectedRowData]);

  useEffect(() => {
    if (Array?.isArray?.(compareIncomeParticularQuarterly?.data)) {
      if (!isLoggedIn) {
        setLoginOrNotData(compareIncomeParticularQuarterly?.data?.slice(-3));
      } else {
        setLoginOrNotData(compareIncomeParticularQuarterly?.data);
      }
    }
  }, [compareIncomeParticularQuarterly]);

  const segregatedData = {};
  loginOrNotData?.forEach((item) => {
    if (!segregatedData[item?.symbol]) {
      segregatedData[item.symbol] = [];
    }
    segregatedData[item?.symbol].push(item);
  });

  let maxSymbol = null;
  let maxLength = 0;

  for (const symbol in segregatedData) {
    const symbolLength = segregatedData[symbol]?.length;
    if (symbolLength > maxLength) {
      maxLength = symbolLength;
      maxSymbol = symbol;
    }
  }

  const years = Array?.from(
    new Set(loginOrNotData?.map((item) => item?.year))
  )?.sort();

  const seriesData = Array?.isArray?.(loginOrNotData)
    ? Object?.keys(segregatedData)?.map((itemKey) => {
        const dataForSymbol = segregatedData[itemKey];
        const dataMap = new Map(
          dataForSymbol?.map((item) => [item?.year, item?.value])
        );

        const data = years?.map((year) => dataMap?.get(year) || 0);
        for (let i = 0; i < data.length; i++) {
          let item = parseFloat(data[i]); // Convert string to a float number

          if (item > 0 && item < 1) {
            item *= 100; // Multiply value by 100
            data[i] = item?.toFixed(2); // Convert back to string with 2 decimal places
          } else {
            data[i] = item.toFixed(2);
          }
        }

        return {
          name: itemKey,
          type: "line",
          data: data,
        };
      })
    : [];

  let xAxisData =
    Array.isArray(loginOrNotData) &&
    loginOrNotData
      ?.filter((item) => item.symbol === maxSymbol)
      .map((item) => item.year);

  return (
    <>
      <Modal
        // title={data?.Particulars}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70%"
        footer={false}
      >
        <div>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold lg:text-lg uppercase">
              {selectedRowData}
            </h1>
            <div className="mr-[30px] w-[40%] float-right">
              <Select
                mode="multiple"
                placeholder="Compare With"
                onChange={handleSelectedValueChange}
                value={selectedValue}
                options={options?.filter(
                  (item, id) => item.label !== company?.[0]?.symbol
                )}
                maxTagCount={5}
                className={`w-[100%] `}
                disabled={!isLoggedIn}
              >
                {options
                  ?.filter((item, id) => item.label !== company?.[0]?.symbol)
                  ?.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
          {isChartVisible ? (
            <div style={{ width: "100%" }} className="lg:h-[400px] h-[50vh]">
              {!compareParticularLoading ? (
                <>
                  {seriesData?.length > 0 ? (
                    <FinancialCompareChart
                      xAxisData={xAxisData}
                      seriesData={seriesData}
                      isModalOpen={isModalOpen}
                    />
                  ) : (
                    <>
                      <div className="mt-[20px]">
                        <Skeleton />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="mt-[20px]">
                    <Skeleton />
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

CompanyDataChart.getServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: { id },
  };
};

export default CompanyDataChart;
