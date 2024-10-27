import React from 'react';
import dynamic from 'next/dynamic';

const DynamicSecondPage = dynamic(() => import('../pre-portfolio/_component/secondPage'), {
    ssr: false
});

const Page = () => {
    return (
        <>
            <DynamicSecondPage />
        </>
    );
};

export default Page;
