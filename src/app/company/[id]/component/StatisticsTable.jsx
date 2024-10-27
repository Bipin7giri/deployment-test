import { useSelector } from "react-redux";

const StatisticsTable = () => {
    const { dividend, isDividendLoading, dividendYieldBySymbol } = useSelector(
        (state) => state.company
    );

    let mergedData = [];
    for (let i = 0; i < dividend?.length; i++) {
        for (let j = 0; j < dividend?.length; j++) {
            if (dividend[i]?.year === dividend?.[j]?.year) {
                mergedData.push({
                    year: dividend[i]?.year,
                    sym: dividend[i]?.symbol,
                    bonusDividend: dividend[i]?.bonus_dividend,
                    cashDividend: dividend[i]?.cash_dividend,
                    totalDividend: dividend[i]?.total_dividend,
                    dividendYield: dividendYieldBySymbol?.data[j]?.dividend_yield * 100,
                    bookClose: dividend[i]?.book_close
                });
                break;
            }
        }
    }


    return (
        <>

            <table className="py-36  bg-secondarySecondary text-[#464F60] mt-10 lg:mt-5 lg:px-5 lg:bg-secondary    rounded-md  w-full">
                <thead className="bg-black text-secondary">
                    <tr className="border-b xl:text-sm text-2xl">
                        <th className="lg:my-0 lg:py-2 my-2 py-1 rounded-tl-xl">S.N</th>
                        <th className="">Year</th>
                        <th className="">Bonus</th>
                        <th className="">Cash</th>
                        <th className="">Total</th>
                        <th className="">Yield</th>
                        <th className="rounded-tr-xl">Book Close</th>
                    </tr>
                </thead>
                <tbody className="lg:text-sm  relative text-3xl text-center lg:mt-0 text-primary  ">
                    {!isDividendLoading && mergedData?.length > 0 ? (
                        mergedData?.map((item, id) => (
                            <tr
                                className={`${id % 2 === 0 ? "bg-[#dad3d346]" : ""
                                    } lg:pt-0 pt-8`}
                                key={id}
                            >
                                <td className="text-center font-semibold py-4">{id + 1}</td>
                                <td className="text-center font-semibold">{item?.year}</td>
                                <td className="text-center font-medium">
                                    {item?.bonusDividend} %
                                </td>
                                <td className="text-center font-medium">
                                    {(item?.cashDividend)?.toFixed(2)} %
                                </td>
                                <td className="text-center font-medium">
                                    {(item?.totalDividend)?.toFixed(2)} %
                                </td>
                                <td className="text-center font-medium">
                                    {(item?.dividendYield)?.toFixed(2)} %
                                </td>
                                <td className="text-center font-medium">
                                    {(item?.bookClose)?.split("T")[0]}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-12 text-center">
                                <div className="w-16 h-20 mx-auto">
                                    <svg
                                        className="w-full h-full"
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 108.67 122.88"
                                    >
                                        <defs>
                                            <style
                                                dangerouslySetInnerHTML={{
                                                    __html: ".cls-1{fill-rule:evenodd;}",
                                                }}
                                            />
                                        </defs>
                                        <title>no-data</title>
                                        <path
                                            className="cls-1"
                                            d="M25.14,53.37a2.77,2.77,0,0,0,0,5.54H45.25a2.77,2.77,0,0,0,0-5.54Zm60.48-36.9,6.66,6.69-8,8.14,8,8.14L85.61,46.1l-8-8.09-8,8.1L63,39.43l8-8.14-8-8.15,6.67-6.65,8,8.08,8-8.1ZM77.77,0A30.91,30.91,0,0,1,91,58.82v57.69a6.38,6.38,0,0,1-6.37,6.37H6.37A6.38,6.38,0,0,1,0,116.51V22.4A6.38,6.38,0,0,1,6.37,16h44.3A30.89,30.89,0,0,1,77.77,0Zm7.78,60.81A30.92,30.92,0,0,1,48.32,21.52H6.37a.9.9,0,0,0-.63.26.92.92,0,0,0-.26.63V116.5a.89.89,0,0,0,.89.89H84.65a.9.9,0,0,0,.63-.26.92.92,0,0,0,.26-.63V60.81ZM25.14,92.22a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,1,0,0-5.48Zm0-19.41a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,0,0,0-5.48Z"
                                        />
                                    </svg>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </>
    )

}
export default StatisticsTable;