"use client";
import React from "react";
import { Carousel } from "antd";
import { RiDoubleQuotesL } from "react-icons/ri";
import DummyImg from "../../../assets/img/dummy_img.png";
import {
  LiaLongArrowAltLeftSolid,
  LiaLongArrowAltRightSolid,
} from "react-icons/lia";
import Image from "next/image";

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
    },
  },
];
const Testimonial = () => {
  return (
    <>
      <div id="testimonial_section">
        <div className="lg:container  lg:px-10 lg:mx-auto px-4 mx-auto ">
          <div className="testimonial-content">
            <h3 style={{ color: "#000" }}>
              &quot;What Our Clients{" "}
              <span style={{ color: "#53D258" }}>Say</span>&quot;
            </h3>

            <div>
              <Carousel
                autoplay
                dots={false}
                arrows={true}
                slidesToShow={3}
                nextArrow={<LiaLongArrowAltRightSolid />}
                prevArrow={<LiaLongArrowAltLeftSolid />}
                responsive={responsiveSettings}
              >
                <div className="testimonial-list">
                  <div>
                    <div className="testimonial-icon">
                      <RiDoubleQuotesL />
                    </div>

                    <div className="client-words">
                      <p>
                        We have been using saral lagani for fundamental analysis
                        which the site seems to be good at. I can find all the
                        information related to financials, product information
                        and ratio analysis in one platform. Moreover, in the
                        analytics section, we can easily identify what is wrong
                        with the company making it effective and time saver.
                      </p>
                    </div>

                    <div className="client-detail">
                      <div className="client-img">
                        <Image src={DummyImg} alt="Client Name" width={1000} height={1000} />
                      </div>
                      <div className="client-info">
                        <h4>Beta Investment</h4>
                        <p style={{ color: "#5D5F67" }}>Fund Management Firm</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-list">
                  <div>
                    <div className="testimonial-icon">
                      <RiDoubleQuotesL />
                    </div>

                    <div className="client-words">
                      <p>
                        Saral Lagani’s rating has really helped me know
                        everything about the company. I can now simply check
                        what is wrong with the company without having to go
                        through the ratio tab. I really loved how easy it can
                        get to analyzed mutual funds too since it is in a
                        different tab, and I can analyze mutual funds in an
                        individual level. Our team can swiftly download the
                        financials for other research purposes as well. We
                        recommend the analysts to go for saral lagani’s premium
                        version to get access to all the datasets.
                      </p>
                    </div>

                    <div className="client-detail">
                      <div className="client-img">
                        <Image src={DummyImg} alt="Client Name" height={1000} width={1000} />
                      </div>
                      <div className="client-info">
                        <h4>Jenesh Lal Shrestha </h4>
                        <p style={{ color: "#5D5F67" }}>
                          Senior Investment Analyst - Global Equity Fund
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-list">
                  <div>
                    <div className="testimonial-icon">
                      <RiDoubleQuotesL />
                    </div>

                    <div className="client-words">
                      <p>
                        I have been involved in the capital market for about 4
                        years now and got introduced to Saral Lagani by one of
                        my friends. I have been using the site ever since. It is
                        very user friendly, navigating through the features is
                        very easy. I really loved how we can compare the
                        financials in chart view; really makes it easy to
                        analyze specific ratios and financial items. Moreover, I
                        can analyze companies technically and fundamentally in a
                        single screen now.
                      </p>
                    </div>

                    <div className="client-detail">
                      <div className="client-img">
                        <Image src={DummyImg} alt="Client Name" width={1000} height={1000} />
                      </div>
                      <div className="client-info">
                        <h4>Roshan Karki</h4>
                        <p style={{ color: "#5D5F67" }}>Technical Analyst</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-list">
                  <div>
                    <div className="testimonial-icon">
                      <RiDoubleQuotesL />
                    </div>

                    <div className="client-words">
                      <p>
                        Saral Lagani has helped me to navigate through the ins
                        and outs of the company analysis. With visually
                        appealing broker analysis, I can easily navigate through
                        the buys and sales of brokers and create my strategy
                        accordingly. I can easily track my portfolio with charts
                        indicating how my portfolio is doing everyday. I highly
                        recommend to use the free version and later buy the
                        premium to the new investors who want to navigate
                        through the stock market.
                      </p>
                    </div>

                    <div className="client-detail">
                      <div className="client-img">
                        <Image src={DummyImg} alt="Client Name" width={1000} height={1000} />
                      </div>
                      <div className="client-info">
                        <h4>Nirajan Kunwor</h4>
                        <p style={{ color: "#5D5F67" }}>
                          Independent Research Analyst
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
