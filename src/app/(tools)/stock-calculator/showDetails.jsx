"use client";
import { formatMoney } from "../../../utils/formatMoney";

const TableRow = ({
  title,
  value,
  bgColor = "",
  textColor = "text-primary  ",
}) => (
  <tr>
    <td
      className={` py-5 lg:py-2 text-left ${bgColor} ${textColor} text-3xl lg:text-base px-2 font-medium`}
    >
      {title}
    </td>
    <td className=" py-5 lg:py-2 text-right text-primary   text-3xl lg:text-base pr-5">
      {value}
    </td>
  </tr>
);

const ShowDetails = ({ data, transactionTyp, isAdjusted }) => {
  return (
    <>
      <div className="stock-calculator my-[20px]">
        <div className="my-[20px]">
          <p className="text-left pt-3 pl-[8px] pb-7 text-4xl lg:text-[20px] font-[600]">
            Break Down
          </p>
          <table className=" w-[800px] lg:w-[455px]">
            <thead>
              <tr>
                <th className="pl-2 text-left text-gray-500 text-3xl lg:text-xs font-normal">
                  Particular
                </th>
                <th className="text-gray-500 text-3xl lg:text-xs font-normal text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {isAdjusted ? (
                <>
                  <TableRow
                    title="Market Price"
                    value={`Rs ${formatMoney(data?.marketPrice)}`}
                  />
                  {data?.bonusPrice ? (
                    <TableRow
                      title="Bonus Percentage"
                      value={`${data?.adjustedPercentage * 100}%`}
                    />
                  ) : (
                    <TableRow
                      title="Right Percentage"
                      value={`${data?.adjustedPercentage * 100}%`}
                    />
                  )}
                  <TableRow
                    title="Adjusted Price"
                    value={`Rs ${formatMoney(data?.price?.toFixed(2))}`}
                    bgColor="bg-[#454545]"
                    textColor="text-white"
                  />
                </>
              ) : (
                <>
                  <TableRow
                    title="Number of Units"
                    value={formatMoney(data?.numberOfUnit)}
                  />
                  <TableRow
                    title="Buy Price"
                    value={`Rs ${formatMoney(data?.buyingPrice)}`}
                  />
                  {transactionTyp === "buy" && (
                    <TableRow
                      title="Price Before Commision"
                      value={`Rs ${formatMoney(
                        data?.buyingPrice * data?.numberOfUnit
                      )}`}
                    />
                  )}
                  {transactionTyp === "sell" && (
                    <TableRow
                      title="Sell Price"
                      value={`Rs ${formatMoney(data?.sellingPrice)}`}
                    />
                  )}
                  <TableRow
                    title="SEBON Charge"
                    value={`Rs ${formatMoney(data?.sebonCharge)}`}
                  />
                  <TableRow
                    title="Broker Commision"
                    value={`Rs ${formatMoney(data?.brokerCommission)}`}
                  />
                  <TableRow
                    title="DMAT Charge"
                    value={`Rs ${formatMoney(data?.dbCharge)}`}
                  />
                  {transactionTyp === "buy" && (
                    <>
                      <TableRow
                        title="You Need To Pay"
                        value={`Rs ${formatMoney(data?.totalAmountPayable)}`}
                        bgColor="bg-success-2"
                      />
                      <TableRow
                        title="WACC"
                        value={`Rs ${formatMoney(data?.wacc)}`}
                      />
                    </>
                  )}
                  {transactionTyp === "sell" && (
                    <>
                      <TableRow
                        title={`Tax Paid ${data.capitalGain}%`}
                        value={`Rs ${formatMoney(data.tax)}`}
                      />
                      <TableRow
                        title="Amount Receivable"
                        value={`Rs ${formatMoney(data?.amountReceivable)}`}
                      />
                      <TableRow
                        title="Total Profit/Loss"
                        value={`Rs ${formatMoney(data?.profit)}`}
                        textColor={
                          data?.profit >= 0 ? "text-success" : "text-danger"
                        }
                      />
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ShowDetails;
