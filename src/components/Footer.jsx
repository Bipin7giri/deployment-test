import React from "react";
import logo from "../assets/icon/logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
// import { TbBrandTelegram } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";
import { FaFacebookF, FaInstagramSquare, FaTiktok } from "react-icons/fa";

import { useSelector } from "react-redux";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div id="footer" className="z-50  lg:w-full">
      <div className="bg-[#37383C] ">
        <div className=" lg:container  lg:px-10 lg:mx-auto px-4 mx-auto ">
          <div className="flex lg:flex-row flex-col gap-7 items-center md:justify-between w-[100%]">
            <div className="flex flex-col gap-3 lg:pt-10 mt-16 lg:mt-0 footer-logo">
              <div className="footer-logo mx-auto bg-[#d0d2d4] lg:p-2 p-8">
                <Image
                  className="lg:w-10 w-36"
                  src={logo}
                  alt="logo"
                  width={360}
                  height={360}
                />
              </div>
              <div className="lg:mt-0 text-left">
                <p className="lg:text-[14px] text-left uppercase text-[#d0d2d4] mt-[20px]">
                  simplifying your investing process
                </p>
                {/* <p className="text-[#d0d2d4] lg:text-[12px] text-[22px] mt-[20px]">Prices might be delayed by a few minutes</p> */}
              </div>
            </div>
            <div className="lg:pt-10 lg:text-sm text-[34px] footer-cnt">
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-6 md:flex-col md:gap-0 md:items-baseline">
                  <h2 className="text-[#d0d2d4] text-5xl lg:text-2xl font-medium">
                    Contact us
                  </h2>
                  <div className="flex  gap-2 items-center text-[#d0d2d4] pt-4 pb-2">
                    <div>
                      <BiMap className="text-5xl lg:text-xl" />
                    </div>
                    <div>
                      <p>Baluwatar, Kathmandu</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-[#d0d2d4] pt-2 pb-2">
                    <div>
                      <AiOutlineMail className="text-5xl lg:text-xl" />
                    </div>
                    <a href="mailto: info@sarallagani.com">
                      info@sarallagani.com
                    </a>
                  </div>
                  <div className="flex gap-2 items-center text-[#d0d2d4] pt-2">
                    <div>
                      <FiPhone className="text-5xl lg:text-xl" />
                    </div>
                    <a href="tel: +977-9801462660">9801462660</a>{" "}
                    <a href="tel: +977-9801462662">9801462662</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:pt-10 lg:text-sm text-[34px] footer-nav">
              <ul className="flex md:flex-col gap-3 text-[#d0d2d4]   lg:text-left text-center">
                <li className="cursor-pointer hover:underline">
                  <Link href="/"> Home</Link>
                </li>
                {/* <li className="cursor-pointer hover:underline">
                  <Link href="/about">About Us</Link>
                </li> */}
                <li className="cursor-pointer hover:underline">
                  <Link href="/partners">Partners</Link>
                </li>
                <li className="cursor-pointer hover:underline">
                  <Link href="/privacy-policy"> Privacy Policy </Link>
                </li>
                {isLoggedIn ? (
                  <li className="cursor-pointer hover:underline">
                    <Link href="/collab-request"> Collaboration Request </Link>
                  </li>
                ) : (
                  <li className="cursor-pointer hover:underline">
                    <Link href="/login"> Collaboration Request </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="follow lg:pt-10">
              <div className="mt-4 text-left">
                <div>
                  <h2 className="text-[#d0d2d4] text-[48px] lg:text-sm font-semibold">
                    Follow us
                  </h2>
                </div>
                <div>
                  <ul className="social-media flex flex-row gap-5 mt-3">
                    <li>
                      <a
                        href="https://www.facebook.com/sarallaganiofficial"
                        target="_blank"
                      >
                        <FaFacebookF className="text-[28px] lg:text-sm" />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.instagram.com/sarallagani/"
                        target="_blank"
                      >
                        <FaInstagramSquare className="text-[44px] lg:text-sm" />
                      </a>
                    </li>

                    <li>
                      <a
                        href="https://www.tiktok.com/@saral_lagani"
                        target="_blank"
                      >
                        <FaTiktok className="text-[44px] lg:text-sm" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row justify-center pb-5 pt-10">
            <div>
              <p className="text-[#d0d2d4]   lg:pb-0 text-[34px] lg:text-[14px]">
                &copy; {currentYear} All Rights Reserved. Powered by{" "}
                <a href="https://peridot.com.np/" target="_blank" className="underline text-white">
                  Peridot Pvt. Ltd.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
