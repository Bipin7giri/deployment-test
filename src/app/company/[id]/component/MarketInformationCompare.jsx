import React, { useEffect, useState } from "react";
import stockCompareAction from "../../../(tools)/stock-compare/_redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Radio, Select, Tooltip } from "antd";
import { RxCross2 } from "react-icons/rx";
import actions from "../redux/actions";
import MarketInformationChart from "./MarketInformationChart";
import Link from "next/link";
import { AiFillLock } from "react-icons/ai";

const MarketInformationCompare = ({ sector, symbol }) => {
  const dispatch = useDispatch();
  const {
    company,
    marketSharesLoan,
    marketSharesDepost,
    currentQuarter,
    financialBreakdownLoanCompare,
    financialBreakdownDepositCompare,
    marketInformationLoanCompare,
    marketInformationDepositCompare,
  } = useSelector((state) => state.company);
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);

  const { companyBySector } = useSelector((state) => state?.companyCompare);

  const [selectedValue, setSelectedValue] = useState([]);
  // const [checked1, setChecked1] = useState(true);
  // const [checked2, setChecked2] = useState(false);
  const [checkedSymbol, setCheckedSymbol] = useState([]);
  const [newSymbol, setNewSymbol] = useState([]);

  const [marketShareLoanData, setMarketShareLoanData] = useState();
  const [marketShareDepositData, setMarketShareDepositData] = useState();
  const [higestMarketShareLoanData, setHigestMarketShareLoanData] = useState();
  const [higestMarketShareDepositData, setHigestMarketShareDepositData] =
    useState();

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

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  // const handleCheckboxChange = (event, option) => {
  //     const checkboxValue = option.value;

  //     setSelectedCheckboxes((prevSelected) =>
  //         event.target.checked ? [...prevSelected, checkboxValue] : prevSelected.filter((item) => item !== checkboxValue)
  //     );
  // };

  useEffect(() => {
    // dispatch(stockCompareAction.getCompanyBySector({ sector: sector, }))
    setSelectedCheckboxes([]);
  }, [sector]);

  // const handleChange1 = () => {
  //     // setChecked1(!checked1);
  // };
  useEffect(() => {
    if (company) {
      setCheckedSymbol([company?.[0]?.symbol]);
    }
  }, [company]);

  useEffect(() => {
    setNewSymbol([...checkedSymbol, ...selectedValue]);
  }, [checkedSymbol, selectedValue]);

  // const handleChange2 = () => {
  //     setChecked2(!checked2);

  //     if (!checked2) {
  //         setCheckedSymbol([...checkedSymbol, options?.[0]?.label]);
  //     } else {
  //         setCheckedSymbol(checkedSymbol.filter(symbol => symbol !== options?.[0]?.label));
  //     }
  // };

  const handleSelectedValueChange = (selectedOptions) => {
    setSelectedValue(selectedOptions);
  };

  useEffect(() => {
    if (newSymbol?.length > 0) {
      // dispatch(actions.getFinancialBreakdownLoanCompare({
      //     symbol: newSymbol,
      //     sector: company?.[0]?.sectorName
      // }))
      dispatch(
        actions.getMarketInformationLoanCompare({
          symbol: newSymbol,
        })
      );
      // dispatch(actions.getFinancialBreakdownDepositCompare({
      //     symbol: newSymbol,
      //     sector: company?.[0]?.sectorName
      // }))
      dispatch(
        actions.getMarketInformationDepositCompare({
          symbol: newSymbol,
        })
      );
    }
  }, [newSymbol]);

  // Function to segregate data by year and symbol
  const segregateDataByYearAndSymbol = (data) => {
    const segregatedData = {};

    data?.data?.forEach((item) => {
      const { symbol, year, market_share } = item;

      if (!segregatedData[year]) {
        segregatedData[year] = {};
      }

      segregatedData[year][symbol] = market_share;
    });

    const years = Object?.keys(segregatedData);
    let allSymbols = [];

    // Extract all symbols from the data
    years.forEach((year) => {
      const symbols = Object?.keys(segregatedData[year]);
      allSymbols = allSymbols?.concat(symbols);
    });

    // Remove duplicates to get a list of unique symbols
    allSymbols = [...new Set(allSymbols)];

    // Fill missing symbols for each year with market_share value 0
    years.forEach((year) => {
      const symbols = Object?.keys(segregatedData[year]);

      allSymbols?.forEach((symbol) => {
        if (!symbols.includes(symbol)) {
          segregatedData[year][symbol] = 0;
        }
      });
    });

    return segregatedData;
  };

  const getMarketInfoDataWithHighestYear = (data) => {
    // Filter the data for entries with symbol
    let scbData = data?.data?.filter((entry) => entry?.symbol === symbol?.id);

    // Find the entry with the highest year among symbol data
    if (scbData?.length > 0) {
      let highestYearEntry = scbData?.reduce((prev, current) => {
        return parseInt(current.year) > parseInt(prev.year) ? current : prev;
      });

      return highestYearEntry;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (marketInformationLoanCompare?.data?.length > 0) {
      const loanData = segregateDataByYearAndSymbol(
        marketInformationLoanCompare
      );
      setMarketShareLoanData(loanData);
      const higestLoanData = getMarketInfoDataWithHighestYear(
        marketInformationLoanCompare
      );
      setHigestMarketShareLoanData(higestLoanData);
    }
    if (marketInformationDepositCompare?.data?.length > 0) {
      const depositData = segregateDataByYearAndSymbol(
        marketInformationDepositCompare
      );
      setMarketShareDepositData(depositData);
      const higestDepositData = getMarketInfoDataWithHighestYear(
        marketInformationDepositCompare
      );
      setHigestMarketShareDepositData(higestDepositData);
    }
  }, [marketInformationLoanCompare, marketInformationDepositCompare]);

  const { Option } = Select;

  return (
    <>
      {!marketInformationLoanCompare?.data?.length > 0 ? (
        ""
      ) : (
        <div className="bg-secondary shadow-md rounded-[20px] mb-[40px]">
          {sector === "Life Insurance" ||
          sector === "Non Life Insurance" ||
          sector === "Development Banks" ||
          sector === "Finance" ||
          sector === "Micro Finance" ||
          sector === "Commercial Banks" ? (
            <>
              <div className="px-9 py-4">
                <h2 className="text-2xl font-bold  lg:text-lg uppercase pb-[30px]">
                  Market Information
                </h2>

                <div className="flex justify-end right-0 relative">
                  {/* <div className="flex gap-2">
                                <div className={`custom-radio-container`}>
                                    <div className={`custom-radio${checked1 ? ' checked' : ''}`} onClick={handleChange1}>
                                        <Radio onChange={handleChange1} checked={checked1}>
                                            {company[0]?.symbol}
                                        </Radio>
                                    </div>
                                    <div className={`custom-radio${checked2 ? ' checked' : ''}`} onClick={handleChange2}>
                                        <Radio onChange={handleChange2} checked={checked2}>
                                            {options?.[0]?.label}
                                        </Radio>
                                        {checked2 && <span className="cross text-gray-700 font-bold"><RxCross2 /></span>}
                                    </div>
                                </div>
                            </div> */}
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Compare With"
                    onChange={handleSelectedValueChange}
                    value={selectedValue}
                    options={options?.filter(
                      (item, id) => item.label !== company?.[0]?.symbol
                    )}
                    maxTagCount={5}
                    className={`lg:w-[40%] w-[50%]`}
                    disabled={!is_subscribed}
                  >
                    {options
                      ?.filter(
                        (item, id) => item.label !== company?.[0]?.symbol
                      )
                      ?.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                  </Select>
                  <div>
                    {!is_subscribed && (
                      <Tooltip
                        className="cursor-pointer"
                        title="Subscribe SaralLagani for this feature"
                      >
                        <Link className="z-20" href="/subscription-plan">
                          <button
                            style={{
                              marginLeft: "10px",
                              marginRight: "20px",
                              width: "50px",
                              height: "36px",
                            }}
                            className="bg-primary hover:bg-primary-2 font-serif text-secondary rounded-2xl py-1 cursor-pointer flex items-center justify-center"
                          >
                            <span className="text-secondary text-3xl lg:text-xl">
                              <AiFillLock />
                            </span>
                          </button>
                        </Link>
                      </Tooltip>
                    )}
                  </div>
                </div>
                <div className="w-[100%] flex lg:flex-row flex-col gap-10 pt-2">
                  <div className="lg:w-[50%] w-[100%]">
                    <div>
                      <MarketInformationChart lineData={marketShareLoanData} />
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-semibold">
                        {higestMarketShareLoanData?.market_share?.toFixed(2)}%
                        <span className="lg:text-sm text-xl font-medium">
                          [as of {higestMarketShareLoanData?.year} (
                          {currentQuarter})]
                        </span>
                      </span>
                      <p>
                        <span className="text-gray-600 lg:text-sm text-xl font-medium">
                          {sector === "Life Insurance" ||
                          sector === "Non Life Insurance" ? (
                            <>Total Claims </>
                          ) : (
                            <>Loan</>
                          )}
                        </span>
                        <span className="text-gray-600 lg:text-sm text-xl font-medium">
                          Market Share
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="lg:w-[50%] w-[100%]">
                    <MarketInformationChart lineData={marketShareDepositData} />
                    <div className="text-center ">
                      <p>
                        <span className="text-xl font-semibold">
                          {higestMarketShareDepositData?.market_share?.toFixed(
                            2
                          )}
                          %
                        </span>
                        <span className="lg:text-sm text-xl font-medium">
                          [as of {higestMarketShareDepositData?.year} (
                          {currentQuarter})]
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-600 lg:text-sm text-xl font-medium">
                          {sector === "Life Insurance" ||
                          sector === "Non Life Insurance" ? (
                            <>Total Premium</>
                          ) : (
                            <>Deposit</>
                          )}
                        </span>
                        -
                        <span className="text-gray-600 lg:text-sm text-xl font-medium">
                          Market Share
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

MarketInformationCompare.getServerSideProps = async (context) => {
  const { symbol } = context.query;
  return {
    props: { symbol },
  };
};

export default MarketInformationCompare;
