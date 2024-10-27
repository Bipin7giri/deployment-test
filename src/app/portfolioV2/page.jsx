"use client"
import { Card } from 'antd';
import Link from 'next/link';

const PortfolioV2 = () => {
    return (
        <div className="container mx-auto ">
            <h1 className="text-3xl font-bold mb-5 text-center">Portfolio V2</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/portfolio_item_1">

                    <Card hoverable>
                        <h3>Portfolio Item 1</h3>
                        <p>Description of Portfolio Item 1</p>
                    </Card>

                </Link>

                <Link href="/portfolio_item_2">

                    <Card hoverable>
                        <h3>Portfolio Item 2</h3>
                        <p>Description of Portfolio Item 2</p>
                    </Card>

                </Link>
                <Link href="/portfolio_item_2">

                    <Card hoverable>
                        <h3>Portfolio Item 2</h3>
                        <p>Description of Portfolio Item 2</p>
                    </Card>

                </Link>
                <Link href="/portfolio_item_2">

                    <Card hoverable>
                        <h3>Portfolio Item 2</h3>
                        <p>Description of Portfolio Item 2</p>
                    </Card>

                </Link>

            </div>
        </div>
    );
};

export default PortfolioV2;
