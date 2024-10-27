import { Tooltip } from 'antd';
import React from 'react'
import { AiFillLock, AiOutlineCheck, AiOutlineInfoCircle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import Link from 'next/link';

/**
* @author
* @function SaralRatingText
**/

export const SaralRatingText = ({ isLoggedIn, quickSypnosisList }) => {
    const boldPercentage = (text) => {
        const depositText = text;
        const boldPercentage = (text) => {
            const regex = /(\d+(\.\d+)?%)/g;
            return text?.replace(regex, "<strong>$&</strong>");
        };
        const formattedText = boldPercentage(depositText);
        return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
    };

    return (
        <>
            <div className="grid lg:w-[100%] max-h-[245px] overflow-y-scroll">
                {isLoggedIn ? <>
                    {quickSypnosisList?.dataList?.map((syp, id) => {
                        if (syp) {
                            return (
                                <>
                                    <div key={id} className="flex gap-5 mb-[12px]">
                                        <div>
                                            {syp && syp.is_good ? (
                                                <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                            ) : (
                                                <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-start gap-2">
                                                <h1 className="lg:text-sm text-2xl font-semibold">
                                                    {syp?.title}
                                                </h1>
                                                <Tooltip
                                                    className="cursor-pointer"
                                                    title={
                                                        syp?.qs_description + ` (${syp?.performance})`
                                                    }
                                                >
                                                    <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <span className="lg:text-sm text-2xl font-extralight">
                                                    {boldPercentage(syp?.description)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                </> : <>
                    {quickSypnosisList?.dataList?.slice(0, 3)?.map((syp, id) => {
                        if (syp) {
                            return (
                                <>
                                    <div key={id} className="flex gap-5">
                                        <div>
                                            {syp && syp.is_good ? (
                                                <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                            ) : (
                                                <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-start gap-2">
                                                <h1 className="lg:text-sm text-2xl font-semibold">
                                                    {syp?.title}
                                                </h1>
                                                <Tooltip
                                                    className="cursor-pointer"
                                                    title={
                                                        syp?.qs_description + ` (${syp?.performance})`
                                                    }
                                                >
                                                    <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <span className="lg:text-sm text-2xl font-extralight">
                                                    {boldPercentage(syp?.description)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })}
                    <div className="relative mb-24 flex  flex-col">
                        <div className="flex justify-center">
                            <Link className="z-20" href="/login">
                                <button className="bg-primary hover:bg-primary-2 font-serif mt-24 lg:mt-8 w-28 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center">
                                    Log in
                                    <span className="text-red-600 text-3xl lg:text-xl ml-2">
                                        <AiFillLock />
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className="absolute w-auto py-5 gap-6 inset-0 border-[2px] bg-[#ffffff] opacity-40" style={{ filter: "blur(3px)" }}>
                            {quickSypnosisList?.dataList?.slice(0, 3)?.map((syp, id) => {
                                if (syp) {
                                    return (
                                        <>
                                            <div key={id} className="flex gap-5">
                                                <div>
                                                    {syp && syp.is_good ? (
                                                        <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                                    ) : (
                                                        <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-start gap-2">
                                                        <h1 className="lg:text-sm text-2xl font-semibold">
                                                            {syp?.title}
                                                        </h1>
                                                        <Tooltip
                                                            className="cursor-pointer"
                                                            title={
                                                                syp?.qs_description + ` (${syp?.performance})`
                                                            }
                                                        >
                                                            <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <span className="lg:text-sm text-2xl font-extralight">
                                                            {boldPercentage(syp?.description)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </>}
            </div>
        </>
    )
}
