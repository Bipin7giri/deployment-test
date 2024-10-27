import { Pagination, Select } from "antd";
import MutalFundPieChart from "./MutalFundPieChart";
import Link from "next/link";
import { formatMoney } from "../../../../../utils/formatMoney";
import { useEffect, useState } from "react";
import api from "../../../../../api/axios";

const MutualFundHoldings = ({ data }) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sectorList, setSectorList] = useState([]);
  const [selectedSector, setSelectedSector] = useState();
  const [selectedYear, setSelectedYear] = useState();

  const onSectorChange = (value) => {
    setSelectedSector(value);
  };
  const onSectorSearch = (value) => {
    // console.log('search:', value);
  };
  const onYearChange = (value) => {
    setSelectedYear(value);
  };
  const onSearch = (value) => {
    // console.log('search:', value);
  };

  // for sector
  const fetchSectors = async () => {
    try {
      const { data: sectors } = await api.post(`/report/getAllSectors`);
      setSectorList(sectors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  let sectors = [];
  if (sectorList !== undefined) {
    sectors = sectorList?.map((item) => ({
      value: item?.sector_name,
      label: item?.sector_name,
    }));
  }

  let initialData;
  if (data !== undefined) {
    initialData = data;
  }

  const getFinanceDataByPeriod = (data, sectorName, period) => {
    if (!data || !sectorName || !period) {
      return [];
    }
    const financeData = data.filter(
      (item) => item.sectorName === sectorName && item.period === period
    );
    return financeData;
  };

  const financeData = getFinanceDataByPeriod(
    initialData,
    selectedSector,
    selectedYear
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData =
    financeData?.length > 0
      ? financeData?.slice(startIndex, endIndex)
      : initialData?.slice(startIndex, endIndex);

  // to get the unique period from the data
  let uniquePeriods = new Set();
  initialData?.forEach((item) => {
    uniquePeriods?.add(item?.period);
  });

  let sortedDates = [];
  const periodsArray = Array.from(uniquePeriods);
  if (Array.isArray(periodsArray) && periodsArray.length > 0) {
    sortedDates = periodsArray
      ?.filter((date) => date !== null)
      ?.sort((a, b) => {
        const [aMonth, aYear] = a?.split("/");
        const [bMonth, bYear] = b?.split("/");

        const aDate = new Date(`${aYear}-${aMonth}-01`);
        const bDate = new Date(`${bYear}-${bMonth}-01`);

        return aDate - bDate;
      });
  } else {
    console.error("UniquePeriods is not an array or is empty.");
  }

  let years = sortedDates?.map((period) => ({
    label: period,
    value: period,
  }));

  useEffect(() => {
    setSelectedYear(years[0]?.value);
  }, []);

  return (
    <>
      <div className="mt-[20px]">
        <div className="mt-[30px] lg:grid lg:grid-cols-2 pt-2 gap-20 pb-[20px]">
          <div className="w-full">
            <div className="mutual-fund-holdings">
              <Select
                showSearch
                placeholder="Select a sector"
                optionFilterProp="children"
                onChange={onSectorChange}
                onSearch={onSectorSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={sectors}
                className="w-[80%] h-[36px]"
              />
            </div>
            <div className="mt-[30px] bg-secondary p-[8px]">
              <table className="table w-[100%] table-fixed">
                <thead className="sticky top-0 bg-[#000] text-[#fff] ">
                  <tr>
                    <th className="px-4 lg:text-sm text-[24px py-2 rounded-tl-xl">
                      SYMBOL
                    </th>
                    <th className="px-4 lg:text-sm text-[24px py-2">
                      No of Share
                    </th>
                    <th className="px-4 lg:text-sm text-[24px py-2">
                      Share Value
                    </th>
                    <th className="px-4 lg:text-sm text-[24px py-2 rounded-tr-xl">
                      Weightage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData?.map((item, id) => (
                    <tr
                      className={
                        (id + 1) % 2 === 0
                          ? "text-center text-[24px] lg:text-sm"
                          : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                      }
                      key={item?.id}
                    >
                      <td className="text-center py-2">
                        <Link
                          href={`/company/${item?.invested_symbol}`}
                          className="hover:text-BlueInfo"
                        >
                          {item?.invested_symbol}
                        </Link>
                      </td>
                      <td className=" px-4 py-2 ">
                        {formatMoney(item?.units)}
                      </td>
                      <td className=" px-4 py-2 text-GreenSuccess">
                        {formatMoney(item?.total)}
                      </td>
                      <td className=" px-4 py-2 text-GreenSuccess">
                        {formatMoney(item?.nav_change)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                current={currentPage}
                total={
                  financeData?.length > 0
                    ? financeData?.length
                    : initialData?.length
                }
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false} // Hide "Show X items per page" dropdown
                style={{ marginTop: "16px", textAlign: "right" }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="mutual-fund-holdings">
              <Select
                showSearch
                placeholder="Select a year"
                optionFilterProp="children"
                onChange={onYearChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={years}
                defaultValue={years[0]?.value}
                className="w-[80%] h-[36px]"
              />
            </div>
            <div className="mt-[60px] bg-secondary p-[20px]">
              {selectedSector && selectedYear ? (
                <MutalFundPieChart title="Top Holdings" data={financeData} />
              ) : (
                <div className="flex justify-center align-middle">
                  Please Select The Sector And Year
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MutualFundHoldings;
