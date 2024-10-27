import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Notfound = () => {
    return <>
        <head>
            <title>404:This page could not be found</title>
        </head>
        <div className="">
            <main className="h-screen w-full flex flex-col justify-center items-center bg-[#F4F6F9]">
                <h1 className="text-9xl font-extrabold text-primary   tracking-widest">
                    404
                </h1>
                <div className="bg-[#000106] px-2 text-sm  text-secondary  rounded rotate-12 absolute">
                    Page not found
                </div>
                <button className="mt-5">
                    <span className="relative inline-block text-sm font-medium text-[#0d0603] group  focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5  group-hover:translate-y-0 group-hover:translate-x-0" />
                        <span className="relative block px-8 py-3 bg-secondary    border border-current">
                            <Link href="/">Go Home</Link>
                        </span>
                    </span>
                </button>
            </main>
        </div>
    </>
}

export default Notfound