import { Skeleton, Tag } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/actions';
import PePbChart from './PePbChart';

const PERatio = () => {
    const dispatch = useDispatch();
    const { company, peLoading, PE, pbLoading, PB } = useSelector(state => state.company);
    // Get today's timestamp
    const todayTimestamp = Math.floor(new Date().getTime() / 1000);

    // Calculate 3 months ago
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const threeMonthsAgoTimestamp = Math.floor(threeMonthsAgo.getTime() / 1000);

    useEffect(() => {
        dispatch(actions.getPERatio({
            symbol: company?.[0]?.symbol,
            // start: todayTimestamp,
            end: todayTimestamp,
        }))
        dispatch(actions.getPBRatio({
            symbol: company?.[0]?.symbol,
            // start: todayTimestamp,
            end: todayTimestamp,
        }))
    }, [JSON.stringify(company)])

    return (
        <>
            <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
                <div className="relative w-[100%] flex lg:flex-row flex-col gap-10 justify-between">
                    {
                        (pbLoading && peLoading) ?
                            <>
                                <Skeleton paragraph={{ rows: 6 }} />
                            </>
                            :
                            <>
                                <div className="lg:w-[50%] w-[100%]">
                                    <div>
                                        <div className="flex justify-between">
                                            <p className="text-2xl font-bold lg:text-lg uppercase">
                                                PE Ratio
                                            </p>
                                        </div>
                                        <div className="md:flex justify-center">
                                            <PePbChart data={PE}
                                                extraInfo={company[0]}
                                                height={318}
                                                fontSize={12}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-[50%] w-[100%]">
                                    <div className="">
                                        <div className="flex justify-between items-center">
                                            <div className="w-full flex justify-between">
                                                <p className="text-2xl font-bold lg:text-lg uppercase">
                                                    PBV Ratio
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <PePbChart data={PB}
                                                extraInfo={company[0]}
                                                height={318}
                                                fontSize={12}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default PERatio