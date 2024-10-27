"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  AiOutlineBarChart,
  AiOutlineLineChart,
  AiOutlineTable,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import api from "../../../../api/axios";
import ChatMode from "./ChatMode";
import ComparisionTable from "./ComparisionTable";
import { Helmet } from "react-helmet";
import LineChartMode from "./LineChartMode";
import { Select } from "antd";
const { Option } = Select;

const StockCompare = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);
  const [sectorList, setSectorList] = useState([]);
  const [routeActive, setRouteActive] = useState(0);
  const [companyName, setCompanyName] = useState(0);
  const [sectorName, setSectorName] = useState(0);
  const { companyBySector, comapanyRecentQuater } = useSelector(
    (state) => state?.companyCompare
  );

  let query = searchParams;

  useEffect(() => {
    setCompanyName(query.get("companyName"));
    setSectorName(query.get("sectorName"));
    if (sectorName && companyName) {
      setSelectedValue([companyName]);
      setSelectedSector([sectorName]);
      dispatch(actions.getCompanyRecentQuater({ sector: [sectorName] }));
      dispatch(
        actions.getCompanyCompare({
          symbol: companyName,
          quarter: recentQuater,
        })
      );
      dispatch(actions.getCompanyLineChartData({ symbol: [companyName] }));
    }
  }, [sectorName, companyName]);

  // for sector
  const fetchSectors = async () => {
    try {
      const { data: sectors } = await api.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/report/getAllSectors`
      );
      setSectorList(sectors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSectors();

    // setSelectedValue([])
    // setSelectedSector([])
    // setSectorList([])
  }, []);

  let sectors = [];
  if (sectorList !== undefined) {
    sectors = sectorList
      ?.filter((item) => item?.sector_name !== "Mutual Fund")
      ?.map((item) => ({
        value: item?.sector_name,
        label: item?.sector_name,
      }));
  }

  const handleSectorChange = (selectedOptions) => {
    setSelectedSector(selectedOptions);
    setSelectedValue([]);
  };

  let recentQuater;
  if (comapanyRecentQuater !== undefined) {
    recentQuater = comapanyRecentQuater?.data;
  }

  // for company according to sector
  useEffect(() => {
    if (selectedSector.length > 0) {
      dispatch(actions.getCompanyBySector({ sector: selectedSector }));
      if (selectedSector?.length > 0) {
        dispatch(actions.getCompanyRecentQuater({ sector: selectedSector }));
      }
    }
  }, [selectedSector]);

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

  // // for active company listed in StockMarket
  // useEffect(() => {
  //     dispatch(marketActions.getActiveCompanyName());
  // }, []);

  // const { activeStockCompany } = useSelector((state) => state.portfolio);

  // let options = [];
  // if (activeStockCompany?.activeStock !== undefined) {
  //     options = activeStockCompany?.activeStock?.map((item, index) => ({
  //         value: item?.symbol,
  //         label: item.companyName + " " + `(${item.symbol})`,
  //     }));
  // }

  // const filteredOptions = options.filter((o) => !selectedValue?.value?.includes(o));

  const handleSelectedValueChange = (selectedOptions) => {
    setSelectedValue(selectedOptions);
  };

  const handleSelectedValueCancel = (valueToRemove) => {
    let toRemoveValue = options?.find((item) => item?.value === valueToRemove);
    setSelectedValue((prevSelectedValue) =>
      prevSelectedValue?.filter((value) => value !== toRemoveValue?.value)
    );
  };

  useEffect(() => {
    if (selectedValue.length > 0) {
      dispatch(
        actions.getCompanyCompare({
          symbol: selectedValue,
          quarter: recentQuater,
        })
      );

      dispatch(actions.getCompanyLineChartData({ symbol: selectedValue }));
    }
  }, [selectedValue]);

  const { companyCompare, loading, companyLineChartData } = useSelector(
    (state) => state.companyCompare
  );

  let data = [];
  if (companyCompare?.data !== undefined) {
    data = companyCompare?.data;
  }

  let lineChartData = [];
  if (companyLineChartData !== undefined) {
    lineChartData = companyLineChartData?.data;
  }

  let columns = [];
  let finalList = [];

  const tableData = () => {
    try {
      if (Object?.keys(companyCompare?.data)?.length > 0) {
        let dataObj = companyCompare?.data;
        let companyName = Object?.keys(dataObj);
        let particularList = dataObj[companyName[0]];
        for (let i = 0; i < particularList?.length; i++) {
          let obj = {};
          obj = {
            Particulars: particularList[i][`skey`],
            key: i,
            description: [],
          };

          for (let j = 0; j < companyName?.length; j++) {
            let thisCompany = dataObj[companyName[j]];
            obj[companyName[j]] = thisCompany
              ?.filter(
                (element) => element[`skey`] == particularList[i][`skey`]
              )
              ?.map((ele) => {
                return ele[`value`];
              })[0];
          }
          finalList.push(obj);
        }

        for (let i = companyName?.length - 1; i >= 0; i--) {
          columns.push({
            title: companyName[i],
            dataIndex: companyName[i],
            align: "center",
            width: 100,
          });
        }

        columns.unshift({
          title: "Particulars",
          dataIndex: "Particulars",
          fixed: "left",
          width: 250,
          render: (text) => (
            <>
              <div>{text}</div>
            </>
          ),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  tableData();

  let company;
  let structuredData = {};
  if (lineChartData !== undefined && Object?.keys(lineChartData)?.length > 0) {
    company = Object?.keys(lineChartData);

    structuredData = {};

    company?.forEach((companyName) => {
      let companyData = lineChartData[companyName];

      companyData.forEach((item) => {
        let vrName = item.skey;
        let year = item.year;
        let vrValue = item.value;

        if (!structuredData[vrName]) {
          structuredData[vrName] = {};
        }

        if (!structuredData[vrName][year]) {
          structuredData[vrName][year] = {};
        }

        structuredData[vrName][year][companyName] = vrValue;
      });
    });
  }

  // for navigation
  const comparisionStyleRoute = [
    <AiOutlineLineChart
      className="text-5xl lg:text-xl"
      key={"AiOutlineLineChart"}
    />,
    <AiOutlineBarChart
      className="text-5xl lg:text-xl"
      key={"AiOutlineBarChart"}
    />,
    <AiOutlineTable className="text-5xl lg:text-xl" key={"AiOutlineTable"} />,
  ];

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.scrollTo(0, 0);
  //   }
  // }, []);

  const renderSelectedItems = () => {
    const selectedItems = selectedValue?.map((value) => {
      const option = options?.find((option) => option?.value === value);
      if (option) {
        return option?.label;
      }
      return null;
    });
    const count = selectedItems?.length;
    if (count > 5) {
      return (
        <>
          <span className="additional-count">{count - 5}+ </span>
        </>
      );
    }
    return selectedItems?.join(", ");
  };

  return (
    <Suspense>
      <Helmet>
        <meta charset="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          content="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta
          name="description"
          content="Compare The Stock From Various Sectors of NEPSE. Get the Insights and data and comapare which company is better"
        />
        <meta
          name="keywords"
          content="Stock compare, compare NEPSE company, NEPSE compare"
        />
        <meta property="og:title" content="Saral Lagani" />
        <title>Stock Compare | Saral Lagani</title>
        <meta property="og:title" content={"Stock Compare | Saral Lagani"} />
        <meta
          property="og:description"
          content={
            "Compare The Stock From Various Sectors of NEPSE. Get the Insights and data and comapare which company is better"
          }
        />
      </Helmet>
      <div>
        {/* {JSON.stringify(sectorName,companyName)} */}
        <div className="bg-[#F4F6F9] lg:px-0 px-[40px] min-h-[90vh]">
          <div className="lg:container w-full lg:px-[40px] lg:mx-auto py-5 lg:pt-0 pt-44 lg:mt-0 gap-10 px-4 mx-auto">
            <div className="pt-[50px] w-[100%]">
              <div className="text-4xl lg:text-[28px] font-[600] ">
                Stocks Comparison Tools
              </div>
              <div className="flex gap-10">
                <div className="relative w-[40%] mt-[20px]">
                  <Select
                    mode="single"
                    size="large"
                    placeholder="Please select the sector"
                    onChange={handleSectorChange}
                    style={{
                      width: "100%",
                    }}
                    // defaultValue={sectorName ? sectorName : selectedSector}
                    value={selectedSector}
                    options={sectors}
                  />
                </div>
                <div className="relative w-[40%] mt-[20px]">
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Please select the stock"
                    onChange={handleSelectedValueChange}
                    style={{
                      width: "100%",
                    }}
                    // defaultValue={companyName ? companyName : selectedValue}
                    value={selectedValue}
                    options={options}
                    maxTagCount={5} // Display up to 3 selected items
                    maxTagPlaceholder={renderSelectedItems} // Render selected items
                  >
                    {options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>

                  <style jsx>{`
                    .additional-count {
                      margin-left: 4px;
                      font-weight: 700;
                    }
                  `}</style>
                </div>
              </div>

              {/* <div className='w-[100%] '>
                                {
                                  selectedValue?.length > 0 && (
                                    <div className='overflow-x-auto'>
                                    <div className='mt-[16px] mr-[12px] pr-[40px] flex max-w-[70%]'>
                                    {
                                      selectedValue?.map((item, id) => {
                                        return (
                                          <>
                                          <div className='flex mr-[14px] items-center	bg-[#eee] px-[10px] py-[2px] rounded-r-[13px] border-transparent '>
                                          <p className='mr-[6px]'> {item} </p>
                                          <RxCross1 size={12} onClick={() => { handleSelectedValueCancel(item) }} className=' cursor-pointer ' />
                                          </div>
                                          </>
                                          )
                                        })
                                      }
                                      </div>
                                        </div>
                                        )
                                      }
                                    </div> */}

              {selectedValue?.length > 0 ? (
                <>
                  <div className="flex justify-end mt-[35px] mb-[3xz0px] ">
                    <div>
                      <ul className="flex justify-end mb-2 items-center gap-5  ">
                        {comparisionStyleRoute?.map((route, id) => {
                          return (
                            <>
                              <li
                                style={{ fontFamily: "poppins" }}
                                className="text-primary    lg:text-[15px]  hover:bg-blue-100 px-[5px] pt-3 mt-[-12px]  cursor-pointer"
                              >
                                <button
                                  onClick={() => {
                                    setRouteActive(id);
                                  }}
                                  style={{ paddingBottom: "7px" }}
                                  className={`${
                                    routeActive === route
                                      ? "text-primary  "
                                      : "text-[#3A6FF8]"
                                  }  text-[24px] xl:text-[18px]`}
                                >
                                  {route}
                                </button>
                                {routeActive === id && (
                                  <div className="border-[#3A6FF8] ml-[-5px]  w-[145%]  border-b-[3px]"></div>
                                )}
                              </li>
                            </>
                          );
                        })}
                      </ul>
                      <div className="border-b-[3px] mt-[-11px]  border-[#dadaee]"></div>
                    </div>
                  </div>
                  {routeActive === 0 && (
                    <LineChartMode data={structuredData} columns={columns} />
                  )}
                  {routeActive === 1 && (
                    <ChatMode data={finalList} columns={columns} />
                  )}
                  {routeActive === 2 && (
                    <ComparisionTable
                      columns={columns}
                      dataSource={finalList}
                    />
                  )}
                </>
              ) : (
                <>
                  <div className="relative top-[40px] text-center font-[500] ">
                    <h4>Make sure you select the stocks you want to compare</h4>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default StockCompare;
