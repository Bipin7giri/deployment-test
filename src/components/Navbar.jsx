"use client";
import { BiMenu, BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect, useCallback, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import { GiMoneyStack } from "react-icons/gi";
import { SlLogout } from "react-icons/sl";
import { LiaBalanceScaleLeftSolid } from "react-icons/lia";
import { MdMoney, MdPattern, MdScreenRotationAlt } from "react-icons/md";
import { BsFullscreen } from "react-icons/bs";

import SearchBar from "./SearchBar";
import homeActions from "@/app/(home)/redux/actions";
// import { Link, Link } from "react-router-dom";
import BackToTop from "./BackToTop";
import authActions from "../app/(auth)/_redux/actions";
import portfolioActions from "../app/(portfolio)/portfolio/_redux/action";
import { Badge } from "antd";
import MarqueeDesign from "../components/marqueeDesign";
import { companyLogo } from "../assets/svg/Logo";
import allNews from "../assets/svg/allnews.svg";
import agm from "../assets/svg/agm.svg";
import announcement from "../assets/svg/announcement.svg";
import buyer from "../assets/svg/buyer.svg";
import calculator from "../assets/svg/calculator.svg";
import debenture from "../assets/svg/debenture.svg";
import auctionSvg from "../assets/svg/auction_hammer.svg";
import heatmap from "../assets/svg/heatmap.svg";
import information from "../assets/svg/information.svg";
import ipo from "../assets/svg/ipo.svg";
import livedata from "../assets/svg/livedata.svg";
import rightshare from "../assets/svg/rightshare.svg";
import screenerv2 from "../assets/svg/screenerv2.svg";
import sectoranalysis from "../assets/svg/sectoranalysis.svg";
import seller from "../assets/svg/seller.svg";
import stockcompare from "../assets/svg/stockcompare.svg";
import summary from "../assets/svg/summary.svg";
import topholding from "../assets/svg/topholding.svg";
import topstock from "../assets/svg/topstock.svg";
import watchlist from "../assets/svg/watchlist.svg";
import pivot from "../assets/icon/pivot.png";
import "../assets/style/style.css";
import { clearToken } from "../app/(auth)/_redux/authSlice";
import dividendChecker from "../assets/icon/dividendChecker.svg";
import Cookies from "js-cookie";
import api from "../api/axios";
import UserImg from "../assets/img/user_img.png";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProfileTab from "@/app/(profile)/profile/components/ProfileTab";
import SearchInput from "@/app/(home)/components/SearchInput";
import Image from "next/image";

export default function Navbar({
  isLoggedIn,
  userName,
  isOpen,
  setIsOpen,
  searchToggle,
  setToggleSearch,
  stickyRemove,
}) {
  const [isHomeRouteScroll, setIsHomeRouteScroll] = useState(false);
  const pathname = usePathname();
  let isHomeRoute = pathname === "/";
  const dispatch = useDispatch();
  const [navbarClass, setNavbarClass] = useState("relative");
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { currentUser, is_subscribed } = useSelector((state) => state.auth);
  const {
    marketLiveHomeData,
    isMarketLiveHomeDataLoading,
    notification,
    subscriptionDetails,
  } = useSelector((state) => state.home);
  const { shareHolderByUserId } = useSelector((state) => state.portfolio);

  const basicPackage = subscriptionDetails?.find(
    (item) => item.packageName === "basic"
  );
  const originalPrice = basicPackage?.price;
  const discount = basicPackage?.discountPercentage;
  const discountPrice =
    originalPrice - Math.ceil((discount / 100) * originalPrice);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavbarClass("nav-top-fixed");
        setIsHomeRouteScroll(true);
      } else {
        setNavbarClass("relative");
        setIsHomeRouteScroll(false);
      }
    };
    window.scrollTo(0, 45);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const signInCheck = async () => {
    try {
      const response = await api.get(`/auth/allowSignin`);
      if (response?.data?.status === 499) {
        message.error("You are already logged in.");
      }
      if (response?.data?.status === 498 || response?.data?.status === 499) {
        setTimeout(() => {
          dispatch(clearToken(false));
          localStorage.removeItem("persist:root");
          // Set the expiration date to a date in the past
          // document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; sameSite=Strict`;
          Cookies.remove("authorization");
          dispatch({ type: authActions.USER_LOGOUT_REQ });
          // router.push('/login')
        }, 3000); // 3000 milliseconds = 3 seconds
      }
    } catch (err) {
      console.error("sign out or login to another device.");
    }
  };

  const fetchSubscriptionDetails = () => {
    dispatch(homeActions.getSubscriptionDetails());
  };

  useEffect(() => {
    signInCheck();
    fetchSubscriptionDetails();
  }, []);

  // for notification
  // useEffect(() => {
  // 	dispatch(
  // 		homeActions.getNotification({ user_id: "Z3RojdKzztSthnPdnz2S7vSY1EA3" })
  // 	);
  // }, [currentUser]);

  let notificationSys;
  if (notification !== undefined && notification !== null) {
    notificationSys = notification?.noti;
  }

  const handleScroll = useCallback(() => {
    if (stickyRemove) {
      if (window.scrollY > 0) {
        setNavbarClass(
          "fixed top-0  left-0 w-full  transition-all duration-700 ease-in-out"
        );
        // setToggleSearch(false);
      } else {
        setNavbarClass("relative  transition-all duration-700 ease-in-out");
        setToggleSearch(false);
        localStorage.setItem("toggleSearch");
      }
    } else {
      if (window.scrollY > 200) {
        setIsHomeRouteScroll(true);
      }
      if (window.scrollY > 100) {
        setNavbarClass(
          "fixed top-0  left-0 w-full  transition-all duration-700 ease-in-out"
        );
      } else {
        setIsHomeRouteScroll(false);
        setNavbarClass("relative  transition-all duration-700 ease-in-out");
        setToggleSearch(false);
      }
    }
  }, []);

  const marketMenu = (
    <Menu className="absolute left-16 top-2">
      <Menu.Item key="1" className="col-span-1">
        <Link
          href="/nepseSummary"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex items-center "
        >
          <div className="menu-icon">
            <Image src={summary} alt="summary" className="w-[24px] h-[24px]" />
          </div>
          <div className="lg:text-sm text-xl py-1">Summary</div>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" className="col-span-1">
        <Link
          href="/live-data"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex  items-center "
        >
          <div className="menu-icon">
            <Image
              src={livedata}
              alt="live data"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="lg:text-sm text-xl py-1">Live Data</div>
        </Link>
      </Menu.Item>

      <Menu.Item key="3" className="col-span-1">
        <Link
          href="/sector"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex lg:mx-0 items-center "
        >
          <div className="menu-icon">
            <Image
              src={sectoranalysis}
              alt="Sector Analysis"
              className="w-[24px] h-[24px]"
            />
          </div>
          <div className="lg:text-sm text-xl py-1">Sector Analysis</div>
        </Link>
      </Menu.Item>

      <Menu.Item key="4" className="col-span-1">
        <Link
          href="/heat-map"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex items-center "
        >
          <div className="menu-icon">
            <Image src={heatmap} alt="Heat Map" className="w-[24px] h-[24px]" />
          </div>
          <div className="lg:text-sm text-xl py-1">Heat-Map</div>
        </Link>
      </Menu.Item>
      <Menu.Item key="5" className="col-span-1">
        <Link
          href="/economy"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex lg:mx-0  items-center "
        >
          <div className="menu-icon">
            <Image src={agm} alt="AGM/ASM" className="w-[24px] h-[24px]" />
          </div>
          <div className="lg:text-sm text-xl py-1">Economy</div>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="8" className="col-span-1">
        <Link
          href="/historicalScreenr"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex lg:mx-0  items-center "
        >
          <div className="menu-icon">
            <Image src={agm} alt="AGM/ASM" className="w-[24px] h-[24px]" />
          </div>
          <div className="lg:text-sm text-xl py-1">Sector Rotation</div>
        </Link>
      </Menu.Item> */}
      <Menu.Item key="6" className="col-span-1">
        <Link
          href="/dividend_checker"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex lg:mx-0  items-center "
        >
          <div className="menu-icon">
            <GiMoneyStack className="w-[24px] h-[24px] bg-transparent text-primary" />
          </div>
          <div className="lg:text-sm text-xl py-1">Dividend Checker</div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const newsMenu = (
    <Menu className="absolute top-2 left-0 ">
      <Menu.Item key="1" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/allnews"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={allNews}
                alt="all News"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-xl py-1"> All News</div>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item key="2" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/analysis"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={announcement}
                alt="Announcement"
                className="w-[24px] h-[24px]"
              />
            </div>

            <div className="lg:text-sm text-2xl py-1">Analysis</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const brokerMenu = (
    <Menu className="absolute top-2 left-0">
      <Menu.Item key="1" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/broker/1"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={information}
                alt="Information"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-xl py-1">Information</div>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item key="2" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/broker/breakdownBuyers/1"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={buyer}
                alt="Top Buyers"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-2xl py-1">Top Buyers</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/broker/breakdownSellers/1"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={seller}
                alt="Top Sellers"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-2xl py-1">Top Sellers</div>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item key="4" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/broker/breakdownTopFiveSymbol/adbl"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={topstock}
                alt="Top Stock Holding Broker"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-2xl py-1">
              Top Stock Holding Broker
            </div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const InvestmentMenu = (
    <Menu
      className=" absolute top-2 left-0 gap-10"
      style={{ background: "#F6F7F8" }}
    >
      <Menu.Item key="1" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/investment-opportunity"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image src={ipo} alt="IPO" className="w-[24px] h-[24px]" />
            </div>
            <div className="lg:text-sm text-xl py-1">IPO</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/investment-opportunity"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image src={ipo} alt="FPO" className="w-[24px] h-[24px]" />
            </div>
            <div className="lg:text-sm text-xl py-1">FPO</div>
          </div>
        </Link>
      </Menu.Item>

      <Menu.Item key="3" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/investment-opportunity"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={rightshare}
                alt="Right Share"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-2xl py-1">Right Share</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="4" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/investment-opportunity"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={debenture}
                alt="Debentures"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-2xl py-1">Debentures</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="5" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/investment-opportunity"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={auctionSvg}
                alt="Auction"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-2xl py-1">Auction</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const ScreenerMenu = (
    <Menu className="absolute top-2 left-0">
      <Menu.Item key="1" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/screenerv2"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <BsFullscreen />
            </div>
            <div className="lg:text-sm text-xl py-1">Screener</div>
          </div>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="2" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/priceVolume"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <BsFullscreen />
            </div>
            <div className="lg:text-sm text-xl py-1">Volume Screener</div>
          </div>
        </Link>
      </Menu.Item> */}
      <Menu.Item key="3" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/sector-rotation"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <MdScreenRotationAlt />
            </div>
            <div className="lg:text-sm text-2xl py-1">Sector rotation</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="4" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/candlestick-patterns"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <MdPattern />
            </div>
            <div className="lg:text-sm text-2xl py-1">Candlestick Patterns</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="5" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/trending-stocks"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <MdPattern />
            </div>
            <div className="lg:text-sm text-2xl py-1">Trending Stocks</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="6" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/fear-greed"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <MdMoney />
            </div>
            <div className="lg:text-sm text-2xl py-1">Fear/Greed</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="7" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/promoter_share"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <MdMoney />
            </div>
            <div className="lg:text-sm text-2xl py-1">Promoter Share</div>
          </div>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="8" className="col-span-1">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/saralPick"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <MdMoney />
            </div>
            <div className="lg:text-sm text-2xl py-1">Saral Pick</div>
          </div>
        </Link>
      </Menu.Item> */}
    </Menu>
  );

  // const screenerMenu = (
  //   <Menu className="absolute top-2 left-0 ">
  //     <Menu.Item key="1" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/stock-compare"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={stockcompare} alt="Stock Compare" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-xl py-1">Stock Compare</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>

  //     <Menu.Item key="2" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/screener"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={advscreener} alt="Advanced Screener" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Advanced Screener</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="2" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/screener"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={screenerv2} alt="Screener V2" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Screener V2</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>

  //     <Menu.Item key="2" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/dividend_checker"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={dividendchecker} alt="Dividend Checker" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Dividend Checker</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>

  //     <Menu.Item key="2" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/dividend_checker"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={historicalscreen} alt="Historical Screen" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Historical Screen</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // )

  // const mutualfundMenu = (
  //   <Menu className="absolute top-2 left-0 gap-10">
  //     <Menu.Item key="1" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/news"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={pricevsnav} alt="Price vs Nav" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-xl py-1">Price vs Nav</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>

  //     <Menu.Item key="2" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/analysis"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={sectorwiseholding} alt="Scetor wise Holding" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Scetor wise Holding</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>
  //     <Menu.Item key="3" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/analysis"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={dividendanalysis} alt="Dividend Analysis" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Dividend Analysis</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>

  //     <Menu.Item key="4" className="col-span-1">
  //       <Link
  //         onClick={() => {
  //           setIsOpen(false);
  //         }}
  //         href="/analysis"
  //       >
  //         <div className="text-center flex align-middle items-center ">
  //           <div className="menu-icon">
  //             <Image src={topholding} alt="Top Holdings" className="w-[24px] h-[24px]" />
  //           </div>
  //           <div className="lg:text-sm text-2xl py-1">Top Holdings</div>
  //         </div>
  //       </Link>
  //     </Menu.Item>
  //   </Menu>
  // )

  const othersMenu = (
    <Menu className={`absolute  top-2 left-10`}>
      <Menu.Item key="1">
        <div className="flex align-middle items-center ">
          <Menu
            mode="vertical"
            onClick={({ key }) => {
              router.push(key);
            }}
            items={[
              {
                label: "Calculator",
                key: "calculator",
                icon: (
                  <div className="menu-icon ">
                    <Image
                      src={calculator}
                      alt="Calculator"
                      className="w-[24px] h-[24px]"
                    />
                  </div>
                ),
                children: [
                  { label: "Secondary", key: "/stock-calculator" },
                  { label: "Price Adjustment", key: "/stock-calculator" },
                  { label: "SIP", key: "/stock-calculator" },
                  { label: "Fibonacii Calculator", key: "/fib-calculator" },
                ],
              },
            ]}
          />
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/watchlist"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={watchlist}
                alt="WatchList"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-xl py-1">WatchList</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/stock-compare"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <LiaBalanceScaleLeftSolid className="w-[24px] h-[24px] font-light text-primary bg-transparent" />
            </div>
            <div className="lg:text-sm text-xl py-1">Stock Compare</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link
          onClick={() => {
            setIsOpen(false);
          }}
          href="/pivot"
        >
          <div className="text-center flex align-middle items-center ">
            <div className="menu-icon">
              <Image
                src={pivot}
                alt="WatchList"
                className="w-[24px] h-[24px]"
              />
            </div>
            <div className="lg:text-sm text-xl py-1">Pivot</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );

  const logoutMenu = (
    <div className="user-detail">
      <div>
        <div className="user-avatar">
          <Image src={UserImg} alt={userName} />
        </div>
        <span style={{ background: "#7AE582" }}></span>
      </div>
      <div className="user-info">
        <p style={{ fontSize: "18px" }}>
          <strong>{userName}</strong>
        </p>
        {/* <p style={{ fontSize: "16px" }}>
					@billbahadur <span style={{ display: "inline-block" }} className="edit-btn"><LiaEdit /></span>
				</p> */}
      </div>

      <ProfileTab />
      <div
        className="logout cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
          router.push("/");
          dispatch({ type: authActions.USER_LOGOUT_REQ });
          // setIsOpen(false);
        }}
      >
        <button className="flex items-center gap-1" onClick={() => {}}>
          <SlLogout />
        </button>
      </div>
    </div>
  );

  // State for controlling the visibility of the Modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show the Modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle the cancellation of the Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const notificationMenu = (
    <Menu className="absolute z-10 w-[300px] left-5 max-h-[400px] overflow-y-auto">
      <div className="py-2 rounded-md px-4 flex justify-between items-center">
        <h3 className="text-lg text-primary   font-semibold">
          9 Notifications
        </h3>
        <Badge count={9} size="large" className="text-secondary" />
      </div>
      <Menu.Item key="1">
        <div className="p-1 border-b border-[#DDDDDD]">
          <div className="text-gray-800 font-semibold mb-1">Notification 1</div>
          <div className="text-gray-500 text-sm">
            This is the content of notification 1.
          </div>
          <div className="text-gray-400 text-xs mt-1">2 hours ago</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="p-1 border-b border-[#DDDDDD]">
          <div className="text-gray-800 font-semibold mb-1">Notification 2</div>
          <div className="text-gray-500 text-sm">
            This is the content of notification 2.
          </div>
          <div className="text-gray-400 text-xs mt-1">5 hours ago</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="p-1 border-b border-[#DDDDDD]">
          <div className="text-gray-800 font-semibold mb-1">Notification 3</div>
          <div className="text-gray-500 text-sm">
            This is the content of notification 3.
          </div>
          <div className="text-gray-400 text-xs mt-1">1 day ago</div>
        </div>
      </Menu.Item>
      {/* Add more Menu.Item for additional notifications */}
      <div className="flex justify-center mt-4">
        <button
          type="primary"
          size="small"
          className="bg-[#09AFB8] px-2 w-full text-center rounded-md py-1 cursor-pointer hover:bg-[#08A0A5] text-secondary"
          onClick={showModal}
        >
          View More
        </button>
      </div>
    </Menu>
  );

  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const dropdownRef = useRef(null);

  const [isPublicationOpen, setIsPublicationOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isBrokerOpen, setIsBrokerOpen] = useState(false);
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isScreenOpen, setIsScreenOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isauthOpen, setIsAuthOpen] = useState(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);

  const togglePublicationDropdown = () => {
    setIsPublicationOpen(!isPublicationOpen);
  };

  const toggleBrokerDropdown = () => {
    setIsBrokerOpen(!isBrokerOpen);
  };

  const toggleNewsDropdown = () => {
    setIsNewsOpen(!isNewsOpen);
  };

  const toggleInvestmentDropdown = () => {
    setIsInvestmentOpen(!isInvestmentOpen);
  };

  const toggleMarketDropdown = () => {
    setIsMarketOpen(!isMarketOpen);
  };

  const toggleScreenDropdown = () => {
    setIsScreenOpen(!isScreenOpen);
  };

  const toggleScreenerDropdown = () => {
    setIsScreenerOpen(!isScreenerOpen);
  };

  const toggleToolsDropdown = () => {
    setIsToolsOpen(!isToolsOpen);
  };
  const toggleauthDropdown = () => {
    setIsAuthOpen(!isauthOpen);
  };
  const handleSearchClick = useCallback(() => {
    setToggleSearch(!searchToggle);
  }, [searchToggle]);

  const [toggleSearchSmallScreen, setToggleSearchSmallScreen] = useState(false);

  useEffect(() => {
    const handleMouseEnter = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      // Check if the cursor is inside the dropdown menu
      if (dropdownRef.current.contains(event.target)) {
      } else {
        setToggleSearch(false);
      }
    };

    const handleMouseLeave = () => {
      setToggleSearch(false);
    };

    dropdownRef.current.addEventListener("mouseenter", handleMouseEnter);
    dropdownRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, handleScroll]);

  // dispatching the home page api
  // useEffect(() => {
  //   dispatch(homeActions.getMarketDataHomeLive());
  // }, []);

  useEffect(() => {
    dispatch(portfolioActions.getShareHolderByUserID({ user_id: currentUser }));
  }, [currentUser]);

  const cleanedSVG = companyLogo.trim(); // Remove leading/trailing white spaces

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header ref={dropdownRef}>
        {/* nav bar for large screen  */}
        <div className="absolute top-[90vh] xl:right-[60px] right-[100px]">
          <BackToTop />
        </div>
        <nav
          className={`${navbarClass} shadow-sm hidden lg:block z-50 dark:bg-gray-900 bg-secondary`}
        >
          <MarqueeDesign />
          <div className={`xl:px-10 lg:px-5 xl:mx-auto bg-white`}>
            <div className="hearder-content flex pb-2 pt-1 items-center gap-10 md:gap-20  lg:justify-between lg:w-full">
              <div className="logo">
                <div>
                  <Link href="/">
                    <svg
                      // width="140"
                      className="lg:w-24 xl:w-[140px] "
                      // height="73"
                      viewBox="0 0 252 73"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="84"
                        y="26"
                        width="120"
                        height="47"
                        fill="black"
                      />
                      <path
                        d="M8.959 60.248C7.45033 60.248 6.107 59.9897 4.929 59.473C3.751 58.9563 2.821 58.2537 2.139 57.365C1.457 56.4557 1.07467 55.443 0.992 54.327H6.231C6.293 54.9263 6.572 55.412 7.068 55.784C7.564 56.156 8.17367 56.342 8.897 56.342C9.55833 56.342 10.0647 56.218 10.416 55.97C10.788 55.7013 10.974 55.3603 10.974 54.947C10.974 54.451 10.7157 54.0893 10.199 53.862C9.68233 53.614 8.84533 53.3453 7.688 53.056C6.448 52.7667 5.41467 52.467 4.588 52.157C3.76133 51.8263 3.04833 51.32 2.449 50.638C1.84967 49.9353 1.55 48.995 1.55 47.817C1.55 46.825 1.81867 45.926 2.356 45.12C2.914 44.2933 3.72 43.6423 4.774 43.167C5.84867 42.6917 7.11967 42.454 8.587 42.454C10.757 42.454 12.462 42.9913 13.702 44.066C14.9627 45.1407 15.686 46.5667 15.872 48.344H10.974C10.8913 47.7447 10.6227 47.2693 10.168 46.918C9.734 46.5667 9.15533 46.391 8.432 46.391C7.812 46.391 7.33667 46.515 7.006 46.763C6.67533 46.9903 6.51 47.3107 6.51 47.724C6.51 48.22 6.76833 48.592 7.285 48.84C7.82233 49.088 8.649 49.336 9.765 49.584C11.0463 49.9147 12.09 50.2453 12.896 50.576C13.702 50.886 14.4047 51.4027 15.004 52.126C15.624 52.8287 15.9443 53.7793 15.965 54.978C15.965 55.9907 15.6757 56.9 15.097 57.706C14.539 58.4913 13.7227 59.1113 12.648 59.566C11.594 60.0207 10.3643 60.248 8.959 60.248ZM18.1541 51.32C18.1541 49.5427 18.4848 47.9823 19.1461 46.639C19.8281 45.2957 20.7478 44.2623 21.9051 43.539C23.0625 42.8157 24.3541 42.454 25.7801 42.454C26.9995 42.454 28.0638 42.702 28.9731 43.198C29.9031 43.694 30.6161 44.345 31.1121 45.151V42.702H36.4131V60H31.1121V57.551C30.5955 58.357 29.8721 59.008 28.9421 59.504C28.0328 60 26.9685 60.248 25.7491 60.248C24.3438 60.248 23.0625 59.8863 21.9051 59.163C20.7478 58.419 19.8281 57.3753 19.1461 56.032C18.4848 54.668 18.1541 53.0973 18.1541 51.32ZM31.1121 51.351C31.1121 50.0283 30.7401 48.9847 29.9961 48.22C29.2728 47.4553 28.3841 47.073 27.3301 47.073C26.2761 47.073 25.3771 47.4553 24.6331 48.22C23.9098 48.964 23.5481 49.9973 23.5481 51.32C23.5481 52.6427 23.9098 53.6967 24.6331 54.482C25.3771 55.2467 26.2761 55.629 27.3301 55.629C28.3841 55.629 29.2728 55.2467 29.9961 54.482C30.7401 53.7173 31.1121 52.6737 31.1121 51.351ZM45.5492 45.585C46.1692 44.6343 46.9442 43.8903 47.8742 43.353C48.8042 42.795 49.8375 42.516 50.9742 42.516V48.127H49.5172C48.1945 48.127 47.2025 48.4163 46.5412 48.995C45.8798 49.553 45.5492 50.545 45.5492 51.971V60H40.2482V42.702H45.5492V45.585ZM52.4539 51.32C52.4539 49.5427 52.7846 47.9823 53.4459 46.639C54.1279 45.2957 55.0476 44.2623 56.2049 43.539C57.3623 42.8157 58.6539 42.454 60.0799 42.454C61.2993 42.454 62.3636 42.702 63.2729 43.198C64.2029 43.694 64.9159 44.345 65.4119 45.151V42.702H70.7129V60H65.4119V57.551C64.8953 58.357 64.1719 59.008 63.2419 59.504C62.3326 60 61.2683 60.248 60.0489 60.248C58.6436 60.248 57.3623 59.8863 56.2049 59.163C55.0476 58.419 54.1279 57.3753 53.4459 56.032C52.7846 54.668 52.4539 53.0973 52.4539 51.32ZM65.4119 51.351C65.4119 50.0283 65.0399 48.9847 64.2959 48.22C63.5726 47.4553 62.6839 47.073 61.6299 47.073C60.5759 47.073 59.6769 47.4553 58.9329 48.22C58.2096 48.964 57.8479 49.9973 57.8479 51.32C57.8479 52.6427 58.2096 53.6967 58.9329 54.482C59.6769 55.2467 60.5759 55.629 61.6299 55.629C62.6839 55.629 63.5726 55.2467 64.2959 54.482C65.0399 53.7173 65.4119 52.6737 65.4119 51.351ZM79.849 37.06V60H74.548V37.06H79.849Z"
                        fill="black"
                      />
                      <path
                        d="M98.223 55.908H105.167V60H92.922V38.238H98.223V55.908ZM106.641 51.32C106.641 49.5427 106.972 47.9823 107.633 46.639C108.315 45.2957 109.235 44.2623 110.392 43.539C111.55 42.8157 112.841 42.454 114.267 42.454C115.487 42.454 116.551 42.702 117.46 43.198C118.39 43.694 119.103 44.345 119.599 45.151V42.702H124.9V60H119.599V57.551C119.083 58.357 118.359 59.008 117.429 59.504C116.52 60 115.456 60.248 114.236 60.248C112.831 60.248 111.55 59.8863 110.392 59.163C109.235 58.419 108.315 57.3753 107.633 56.032C106.972 54.668 106.641 53.0973 106.641 51.32ZM119.599 51.351C119.599 50.0283 119.227 48.9847 118.483 48.22C117.76 47.4553 116.871 47.073 115.817 47.073C114.763 47.073 113.864 47.4553 113.12 48.22C112.397 48.964 112.035 49.9973 112.035 51.32C112.035 52.6427 112.397 53.6967 113.12 54.482C113.864 55.2467 114.763 55.629 115.817 55.629C116.871 55.629 117.76 55.2467 118.483 54.482C119.227 53.7173 119.599 52.6737 119.599 51.351ZM135.307 42.454C136.527 42.454 137.591 42.702 138.5 43.198C139.43 43.694 140.143 44.345 140.639 45.151V42.702H145.94V59.969C145.94 61.5603 145.62 62.9967 144.979 64.278C144.359 65.58 143.398 66.6133 142.096 67.378C140.815 68.1427 139.213 68.525 137.291 68.525C134.729 68.525 132.652 67.9153 131.06 66.696C129.469 65.4973 128.56 63.8647 128.332 61.798H133.571C133.737 62.4593 134.129 62.976 134.749 63.348C135.369 63.7407 136.134 63.937 137.043 63.937C138.139 63.937 139.007 63.6167 139.647 62.976C140.309 62.356 140.639 61.3537 140.639 59.969V57.52C140.123 58.326 139.41 58.9873 138.5 59.504C137.591 60 136.527 60.248 135.307 60.248C133.881 60.248 132.59 59.8863 131.432 59.163C130.275 58.419 129.355 57.3753 128.673 56.032C128.012 54.668 127.681 53.0973 127.681 51.32C127.681 49.5427 128.012 47.9823 128.673 46.639C129.355 45.2957 130.275 44.2623 131.432 43.539C132.59 42.8157 133.881 42.454 135.307 42.454ZM140.639 51.351C140.639 50.0283 140.267 48.9847 139.523 48.22C138.8 47.4553 137.911 47.073 136.857 47.073C135.803 47.073 134.904 47.4553 134.16 48.22C133.437 48.964 133.075 49.9973 133.075 51.32C133.075 52.6427 133.437 53.6967 134.16 54.482C134.904 55.2467 135.803 55.629 136.857 55.629C137.911 55.629 138.8 55.2467 139.523 54.482C140.267 53.7173 140.639 52.6737 140.639 51.351ZM148.722 51.32C148.722 49.5427 149.052 47.9823 149.714 46.639C150.396 45.2957 151.315 44.2623 152.473 43.539C153.63 42.8157 154.922 42.454 156.348 42.454C157.567 42.454 158.631 42.702 159.541 43.198C160.471 43.694 161.184 44.345 161.68 45.151V42.702H166.981V60H161.68V57.551C161.163 58.357 160.44 59.008 159.51 59.504C158.6 60 157.536 60.248 156.317 60.248C154.911 60.248 153.63 59.8863 152.473 59.163C151.315 58.419 150.396 57.3753 149.714 56.032C149.052 54.668 148.722 53.0973 148.722 51.32ZM161.68 51.351C161.68 50.0283 161.308 48.9847 160.564 48.22C159.84 47.4553 158.952 47.073 157.898 47.073C156.844 47.073 155.945 47.4553 155.201 48.22C154.477 48.964 154.116 49.9973 154.116 51.32C154.116 52.6427 154.477 53.6967 155.201 54.482C155.945 55.2467 156.844 55.629 157.898 55.629C158.952 55.629 159.84 55.2467 160.564 54.482C161.308 53.7173 161.68 52.6737 161.68 51.351ZM181.356 42.516C183.381 42.516 184.993 43.1773 186.192 44.5C187.411 45.802 188.021 47.6 188.021 49.894V60H182.751V50.607C182.751 49.4497 182.451 48.5507 181.852 47.91C181.252 47.2693 180.446 46.949 179.434 46.949C178.421 46.949 177.615 47.2693 177.016 47.91C176.416 48.5507 176.117 49.4497 176.117 50.607V60H170.816V42.702H176.117V44.996C176.654 44.2313 177.377 43.632 178.287 43.198C179.196 42.7433 180.219 42.516 181.356 42.516ZM194.37 40.904C193.44 40.904 192.676 40.6353 192.076 40.098C191.498 39.54 191.208 38.858 191.208 38.052C191.208 37.2253 191.498 36.5433 192.076 36.006C192.676 35.448 193.44 35.169 194.37 35.169C195.28 35.169 196.024 35.448 196.602 36.006C197.202 36.5433 197.501 37.2253 197.501 38.052C197.501 38.858 197.202 39.54 196.602 40.098C196.024 40.6353 195.28 40.904 194.37 40.904ZM197.005 42.702V60H191.704V42.702H197.005Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              {/* desktop screen */}
              <div className="navigation">
                <ul className=" flex lg:gap-0  xl:gap-[6px] text-gray-800  items-center lg:text-[14px] font-medium py-2">
                  <li className={`mx-0.5   ${isHomeRouteScroll && "!mx-0.5 "}`}>
                    <Link
                      href="/"
                      className={({ isActive }) =>
                        isActive
                          ? "link-active  normal-link  transition-all"
                          : "  normal-link"
                      }
                    >
                      Home
                    </Link>
                  </li>

                  {/* <li>
                    <Dropdown
                      className={`mx-0.5   ${isHomeRouteScroll && "!mx-0.5 "}`}
                      placement="bottomRight"
                      overlay={newsMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        News
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li> */}
                  <li>
                    <Dropdown
                      className={`mx-0.5   ${isHomeRouteScroll && "!mx-0.5 "}`}
                      placement="bottomRight"
                      overlay={marketMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Market
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li>
                  <li>
                    <Dropdown
                      className={`mx-3 lg:mx-3 md:mx-1  ${
                        isHomeRouteScroll &&
                        "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                      }`}
                      placement="bottomRight"
                      overlay={brokerMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Broker
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li>

                  <li>
                    <Dropdown
                      className={`mx-3 lg:mx-3 md:mx-1  ${
                        isHomeRouteScroll &&
                        "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                      }`}
                      placement="bottomRight"
                      overlay={InvestmentMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Investment
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li>
                  <li>
                    <Dropdown
                      className={`mx-3 lg:mx-3 md:mx-1  ${
                        isHomeRouteScroll &&
                        "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                      }`}
                      placement="bottomRight"
                      overlay={othersMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Tools
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li>

                  {/* <li>
                    <Dropdown
                      className="mx-3 "
                      placement="bottomRight"
                      overlay={screenerMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Screener
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li> */}

                  {/* <li>
                    <Dropdown
                      className="mx-3 "
                      placement="bottomRight"
                      overlay={mutualfundMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Mutual Fund
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li> */}

                  <li
                    className={`mx-3 lg:mx-3 md:mx-1  ${
                      isHomeRouteScroll &&
                      "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                    }`}
                  >
                    <Link
                      target="_blank"
                      href="/technicalchart"
                      className={({ isActive }) =>
                        isActive
                          ? "link-active  normal-link  transition-all"
                          : "  normal-link"
                      }
                    >
                      Technical
                    </Link>
                  </li>
                  <li>
                    <Dropdown
                      className={`mx-3 lg:mx-3 md:mx-1  ${
                        isHomeRouteScroll &&
                        "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                      }`}
                      placement="bottomRight"
                      overlay={ScreenerMenu}
                    >
                      <a
                        className="cursor-pointer flex items-center  transition-all"
                        onClick={(e) => e.preventDefault()}
                      >
                        Screener
                        <DownOutlined
                          style={{ fontSize: "8px" }}
                          className="px-1"
                        />
                      </a>
                    </Dropdown>
                  </li>
                  {/* {shareHolderByUserId?.ShareHolderByUserId?.length > 0 ? (
                    <li
                      className={`mx-3 lg:mx-3 md:mx-1  ${
                        isHomeRouteScroll &&
                        "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                      }`}
                    >
                      <Link
                        href="/portfolio"
                        className={({ isActive }) =>
                          isActive
                            ? "link-active normal-link  transition-all"
                            : " transition-all normal-link"
                        }
                      >
                        Portfolio
                      </Link>
                    </li>
                  ) : (
                    <li
                      className={`mx-3  md:mx-1  ${
                        isHomeRouteScroll &&
                        "sm:mx-0.5 md:mx-0.5 lg:mx-0.5 xl:mx-0.5 "
                      }`}
                    >
                      <Link
                        href="/pre-portfolio"
                        className={({ isActive }) =>
                          isActive
                            ? "link-active normal-link  transition-all"
                            : " transition-all normal-link"
                        }
                      >
                        Portfolio
                      </Link>
                    </li>
                  )} */}

                  {isHomeRoute ? (
                    <>
                      {isHomeRouteScroll && (
                        <>
                          <li className="search-tab">
                            <SearchInput
                              companies={marketLiveHomeData?.liveData}
                              setToggleSearch={setToggleSearch}
                              searchToggle={searchToggle}
                              className="nav-search"
                            />
                          </li>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <li className="search-tab">
                        <SearchInput
                          companies={marketLiveHomeData?.liveData}
                          setToggleSearch={setToggleSearch}
                          searchToggle={searchToggle}
                          className="nav-search"
                        />
                      </li>
                    </>
                  )}
                  {!is_subscribed && (
                    <li>
                      <Link
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        href="/subscription-plan"
                      >
                        <span
                          style={{
                            padding: "6px 10px",
                            color: "#fff",
                            background: "#23B123",
                            borderRadius: "12px",
                            boxShadow: "0 6px 10px rgba(0, 128, 38, .5)",
                            marginLeft: "10px",
                          }}
                        >
                          Buy @ {discountPrice}/year
                        </span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <div className="">
                {!isLoggedIn && (
                  <>
                    <Link href="/login">
                      <span
                        className="border-2 border-black px-1.5 py-1 rounded-md text-black hover:bg-[#23B123] hover:border-[#23B123]
                      hover:text-white  hover:translate-x-4 transition duration-300 transform"
                      >
                        Sign In
                      </span>
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <Dropdown
                      className="mx-3"
                      placement="bottomRight"
                      overlay={logoutMenu}
                    >
                      {/* <a
                            className="cursor-pointer  transition-all"
                            onClick={(e) => e.preventDefault()}
                          > */}
                      <button
                        onClick={toggleauthDropdown}
                        className="flex  justify-between items-center focus:outline-none"
                      >
                        <div className="auth-btn">
                          <div className="user-avatar">
                            <Image src={UserImg} alt={userName} />
                          </div>
                          {/* <span className="name">{userName}</span> */}
                        </div>
                      </button>
                    </Dropdown>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/*  nav bar for small screen  */}
      <nav
        className={`fixed top-[-14px]  shadow-xl   left-0 w-full    transition-all duration-700 ease-in-out  lg:hidden block px-2 pt-2 z-30  bg-secondary`}
      >
        <MarqueeDesign />
        <div className="p-2 mt-1 px-5 flex  items-center justify-between">
          <div>
            <Link href="/">
              <svg
                width="300"
                className="lg:w-30 xl:w-[190px] "
                height="100"
                // viewBox="0 0 252 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="84" y="26" width="40%" height="47" fill="black" />
                <path
                  d="M8.959 60.248C7.45033 60.248 6.107 59.9897 4.929 59.473C3.751 58.9563 2.821 58.2537 2.139 57.365C1.457 56.4557 1.07467 55.443 0.992 54.327H6.231C6.293 54.9263 6.572 55.412 7.068 55.784C7.564 56.156 8.17367 56.342 8.897 56.342C9.55833 56.342 10.0647 56.218 10.416 55.97C10.788 55.7013 10.974 55.3603 10.974 54.947C10.974 54.451 10.7157 54.0893 10.199 53.862C9.68233 53.614 8.84533 53.3453 7.688 53.056C6.448 52.7667 5.41467 52.467 4.588 52.157C3.76133 51.8263 3.04833 51.32 2.449 50.638C1.84967 49.9353 1.55 48.995 1.55 47.817C1.55 46.825 1.81867 45.926 2.356 45.12C2.914 44.2933 3.72 43.6423 4.774 43.167C5.84867 42.6917 7.11967 42.454 8.587 42.454C10.757 42.454 12.462 42.9913 13.702 44.066C14.9627 45.1407 15.686 46.5667 15.872 48.344H10.974C10.8913 47.7447 10.6227 47.2693 10.168 46.918C9.734 46.5667 9.15533 46.391 8.432 46.391C7.812 46.391 7.33667 46.515 7.006 46.763C6.67533 46.9903 6.51 47.3107 6.51 47.724C6.51 48.22 6.76833 48.592 7.285 48.84C7.82233 49.088 8.649 49.336 9.765 49.584C11.0463 49.9147 12.09 50.2453 12.896 50.576C13.702 50.886 14.4047 51.4027 15.004 52.126C15.624 52.8287 15.9443 53.7793 15.965 54.978C15.965 55.9907 15.6757 56.9 15.097 57.706C14.539 58.4913 13.7227 59.1113 12.648 59.566C11.594 60.0207 10.3643 60.248 8.959 60.248ZM18.1541 51.32C18.1541 49.5427 18.4848 47.9823 19.1461 46.639C19.8281 45.2957 20.7478 44.2623 21.9051 43.539C23.0625 42.8157 24.3541 42.454 25.7801 42.454C26.9995 42.454 28.0638 42.702 28.9731 43.198C29.9031 43.694 30.6161 44.345 31.1121 45.151V42.702H36.4131V60H31.1121V57.551C30.5955 58.357 29.8721 59.008 28.9421 59.504C28.0328 60 26.9685 60.248 25.7491 60.248C24.3438 60.248 23.0625 59.8863 21.9051 59.163C20.7478 58.419 19.8281 57.3753 19.1461 56.032C18.4848 54.668 18.1541 53.0973 18.1541 51.32ZM31.1121 51.351C31.1121 50.0283 30.7401 48.9847 29.9961 48.22C29.2728 47.4553 28.3841 47.073 27.3301 47.073C26.2761 47.073 25.3771 47.4553 24.6331 48.22C23.9098 48.964 23.5481 49.9973 23.5481 51.32C23.5481 52.6427 23.9098 53.6967 24.6331 54.482C25.3771 55.2467 26.2761 55.629 27.3301 55.629C28.3841 55.629 29.2728 55.2467 29.9961 54.482C30.7401 53.7173 31.1121 52.6737 31.1121 51.351ZM45.5492 45.585C46.1692 44.6343 46.9442 43.8903 47.8742 43.353C48.8042 42.795 49.8375 42.516 50.9742 42.516V48.127H49.5172C48.1945 48.127 47.2025 48.4163 46.5412 48.995C45.8798 49.553 45.5492 50.545 45.5492 51.971V60H40.2482V42.702H45.5492V45.585ZM52.4539 51.32C52.4539 49.5427 52.7846 47.9823 53.4459 46.639C54.1279 45.2957 55.0476 44.2623 56.2049 43.539C57.3623 42.8157 58.6539 42.454 60.0799 42.454C61.2993 42.454 62.3636 42.702 63.2729 43.198C64.2029 43.694 64.9159 44.345 65.4119 45.151V42.702H70.7129V60H65.4119V57.551C64.8953 58.357 64.1719 59.008 63.2419 59.504C62.3326 60 61.2683 60.248 60.0489 60.248C58.6436 60.248 57.3623 59.8863 56.2049 59.163C55.0476 58.419 54.1279 57.3753 53.4459 56.032C52.7846 54.668 52.4539 53.0973 52.4539 51.32ZM65.4119 51.351C65.4119 50.0283 65.0399 48.9847 64.2959 48.22C63.5726 47.4553 62.6839 47.073 61.6299 47.073C60.5759 47.073 59.6769 47.4553 58.9329 48.22C58.2096 48.964 57.8479 49.9973 57.8479 51.32C57.8479 52.6427 58.2096 53.6967 58.9329 54.482C59.6769 55.2467 60.5759 55.629 61.6299 55.629C62.6839 55.629 63.5726 55.2467 64.2959 54.482C65.0399 53.7173 65.4119 52.6737 65.4119 51.351ZM79.849 37.06V60H74.548V37.06H79.849Z"
                  fill="black"
                />
                <path
                  d="M98.223 55.908H105.167V60H92.922V38.238H98.223V55.908ZM106.641 51.32C106.641 49.5427 106.972 47.9823 107.633 46.639C108.315 45.2957 109.235 44.2623 110.392 43.539C111.55 42.8157 112.841 42.454 114.267 42.454C115.487 42.454 116.551 42.702 117.46 43.198C118.39 43.694 119.103 44.345 119.599 45.151V42.702H124.9V60H119.599V57.551C119.083 58.357 118.359 59.008 117.429 59.504C116.52 60 115.456 60.248 114.236 60.248C112.831 60.248 111.55 59.8863 110.392 59.163C109.235 58.419 108.315 57.3753 107.633 56.032C106.972 54.668 106.641 53.0973 106.641 51.32ZM119.599 51.351C119.599 50.0283 119.227 48.9847 118.483 48.22C117.76 47.4553 116.871 47.073 115.817 47.073C114.763 47.073 113.864 47.4553 113.12 48.22C112.397 48.964 112.035 49.9973 112.035 51.32C112.035 52.6427 112.397 53.6967 113.12 54.482C113.864 55.2467 114.763 55.629 115.817 55.629C116.871 55.629 117.76 55.2467 118.483 54.482C119.227 53.7173 119.599 52.6737 119.599 51.351ZM135.307 42.454C136.527 42.454 137.591 42.702 138.5 43.198C139.43 43.694 140.143 44.345 140.639 45.151V42.702H145.94V59.969C145.94 61.5603 145.62 62.9967 144.979 64.278C144.359 65.58 143.398 66.6133 142.096 67.378C140.815 68.1427 139.213 68.525 137.291 68.525C134.729 68.525 132.652 67.9153 131.06 66.696C129.469 65.4973 128.56 63.8647 128.332 61.798H133.571C133.737 62.4593 134.129 62.976 134.749 63.348C135.369 63.7407 136.134 63.937 137.043 63.937C138.139 63.937 139.007 63.6167 139.647 62.976C140.309 62.356 140.639 61.3537 140.639 59.969V57.52C140.123 58.326 139.41 58.9873 138.5 59.504C137.591 60 136.527 60.248 135.307 60.248C133.881 60.248 132.59 59.8863 131.432 59.163C130.275 58.419 129.355 57.3753 128.673 56.032C128.012 54.668 127.681 53.0973 127.681 51.32C127.681 49.5427 128.012 47.9823 128.673 46.639C129.355 45.2957 130.275 44.2623 131.432 43.539C132.59 42.8157 133.881 42.454 135.307 42.454ZM140.639 51.351C140.639 50.0283 140.267 48.9847 139.523 48.22C138.8 47.4553 137.911 47.073 136.857 47.073C135.803 47.073 134.904 47.4553 134.16 48.22C133.437 48.964 133.075 49.9973 133.075 51.32C133.075 52.6427 133.437 53.6967 134.16 54.482C134.904 55.2467 135.803 55.629 136.857 55.629C137.911 55.629 138.8 55.2467 139.523 54.482C140.267 53.7173 140.639 52.6737 140.639 51.351ZM148.722 51.32C148.722 49.5427 149.052 47.9823 149.714 46.639C150.396 45.2957 151.315 44.2623 152.473 43.539C153.63 42.8157 154.922 42.454 156.348 42.454C157.567 42.454 158.631 42.702 159.541 43.198C160.471 43.694 161.184 44.345 161.68 45.151V42.702H166.981V60H161.68V57.551C161.163 58.357 160.44 59.008 159.51 59.504C158.6 60 157.536 60.248 156.317 60.248C154.911 60.248 153.63 59.8863 152.473 59.163C151.315 58.419 150.396 57.3753 149.714 56.032C149.052 54.668 148.722 53.0973 148.722 51.32ZM161.68 51.351C161.68 50.0283 161.308 48.9847 160.564 48.22C159.84 47.4553 158.952 47.073 157.898 47.073C156.844 47.073 155.945 47.4553 155.201 48.22C154.477 48.964 154.116 49.9973 154.116 51.32C154.116 52.6427 154.477 53.6967 155.201 54.482C155.945 55.2467 156.844 55.629 157.898 55.629C158.952 55.629 159.84 55.2467 160.564 54.482C161.308 53.7173 161.68 52.6737 161.68 51.351ZM181.356 42.516C183.381 42.516 184.993 43.1773 186.192 44.5C187.411 45.802 188.021 47.6 188.021 49.894V60H182.751V50.607C182.751 49.4497 182.451 48.5507 181.852 47.91C181.252 47.2693 180.446 46.949 179.434 46.949C178.421 46.949 177.615 47.2693 177.016 47.91C176.416 48.5507 176.117 49.4497 176.117 50.607V60H170.816V42.702H176.117V44.996C176.654 44.2313 177.377 43.632 178.287 43.198C179.196 42.7433 180.219 42.516 181.356 42.516ZM194.37 40.904C193.44 40.904 192.676 40.6353 192.076 40.098C191.498 39.54 191.208 38.858 191.208 38.052C191.208 37.2253 191.498 36.5433 192.076 36.006C192.676 35.448 193.44 35.169 194.37 35.169C195.28 35.169 196.024 35.448 196.602 36.006C197.202 36.5433 197.501 37.2253 197.501 38.052C197.501 38.858 197.202 39.54 196.602 40.098C196.024 40.6353 195.28 40.904 194.37 40.904ZM197.005 42.702V60H191.704V42.702H197.005Z"
                  fill="white"
                />
              </svg>
            </Link>
          </div>
          <div className="mx-3 flex items-center gap-6">
            {!is_subscribed && (
              <li style={{ listStyle: "none" }}>
                <Link
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  href="/subscription-plan"
                >
                  <span
                    style={{
                      padding: "8px 12px",
                      color: "#fff",
                      background: "#23B123",
                      borderRadius: "12px",
                      boxShadow: "0 6px 10px rgba(0, 128, 38, .5)",
                      marginLeft: "6px",
                      fontSize: "18px",
                    }}
                  >
                    Buy @ {discountPrice}/year
                  </span>
                </Link>
              </li>
            )}
            <div>
              {!isHomeRoute && (
                <>
                  {!isOpen && (
                    <>
                      <span className="serach-icon text-4xl">
                        <BiSearch
                          onClick={() => {
                            setToggleSearchSmallScreen(true);
                          }}
                          className="text-4xl"
                        />
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
            {isLoggedIn && (
              <Dropdown
                className="mx-3"
                placement="bottomRight"
                overlay={logoutMenu}
              >
                {/* <a
                            className="cursor-pointer  transition-all"
                            onClick={(e) => e.preventDefault()}
                          > */}
                <button
                  onClick={toggleauthDropdown}
                  className="flex justify-between items-center focus:outline-none"
                >
                  <div className="auth-btn">
                    <div className="h-[60px] w-[60px]">
                      <Image src={UserImg} alt={userName} />
                    </div>
                    {/* <span className="name">{userName}</span> */}
                  </div>
                </button>
              </Dropdown>
            )}
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setToggleSearchSmallScreen(false);
              }}
              className="text-5xl"
            >
              {isOpen ? (
                <>
                  <RxCross2 className="text-5xl" />
                </>
              ) : (
                <>
                  <BiMenu className="text-5xl" />
                </>
              )}
            </button>
          </div>
        </div>
        <div
          className={`bg-secondary shadow-xl left-0 top-0 ${
            toggleSearchSmallScreen ? "xl:h-auto h-auto " : "h-0 "
          } z-50 w-full absolute  transition-all ease-in-out duration-100`}
        >
          <div
            className={`${
              !toggleSearchSmallScreen && "hidden"
            }  transition-all ease-linear duration-500 container mx-auto `}
          >
            <SearchBar
              companies={marketLiveHomeData?.liveData}
              setToggleSearch={setToggleSearch}
              searchToggle={searchToggle}
              setToggleSearchSmallScreen={setToggleSearchSmallScreen}
            />
          </div>
        </div>

        <div className={`${!isOpen ? "hidden" : "block w-[100%]"}`}>
          <div className="flex h-full overflow-y-auto pb-auto justify-start ">
            <ul
              className="mobile-menu mx-8 flex flex-col gap-20 text-2xl mt-4 pb-1"
              style={{ borderTop: "1px solid #787A85" }}
            >
              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                  router.push("/");
                }}
                className="mobmenu-list transition ease-in-out delay-150 text-primary cursor-pointer  rounded-b-xl py-2 !text-3xl font-[500]"
              >
                Home
              </li>

              <li className="mobmenu-list">
                <button
                  onClick={toggleNewsDropdown}
                  className="flex  justify-between items-center focus:outline-none !text-3xl font-[500]"
                >
                  News
                  {isNewsOpen ? (
                    <>
                      <UpOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  ) : (
                    <>
                      <DownOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  )}
                </button>
                {isNewsOpen && (
                  <ul className="py-[10px] px-[10px] flex flex-col gap-10">
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleNewsDropdown();
                        router.push("/allnews");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={allNews}
                          alt="All News"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      All News
                      {/* </Link> */}
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleNewsDropdown();
                        router.push("/analysis");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={announcement}
                          alt="Announcement"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Analysis
                      {/* </Link> */}
                    </li>
                  </ul>
                )}
              </li>

              <li className="mobmenu-list">
                <button
                  onClick={toggleMarketDropdown}
                  className="flex justify-between items-center focus:outline-none !text-3xl font-[500]"
                >
                  Market
                  {isMarketOpen ? (
                    <>
                      <UpOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  ) : (
                    <>
                      <DownOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  )}
                </button>
                {isMarketOpen && (
                  <ul className="py-[10px] px-[10px] flex flex-col gap-10">
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleMarketDropdown();
                        router.push("/live-data");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={livedata}
                          alt="Live Data"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Live Data
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleMarketDropdown();
                        router.push("/heat-map");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={heatmap}
                          alt="Heat Map"
                          className="w-[36px] h-[36px]"
                        />
                      </div>
                      Heat-Map
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleMarketDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <Image
                          src={summary}
                          alt="Summary"
                          className="w-[36px] h-[36px]"
                        />
                      </div>

                      <Link
                        href="/nepseSummary"
                        className="!text-3xl font-[500]"
                      >
                        Summary
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleMarketDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <Image
                          src={sectoranalysis}
                          alt="Sector Analysis"
                          className="w-[36px] h-[36px]"
                        />
                      </div>

                      <Link href="/sector" className="!text-3xl font-[500]">
                        Sector Analysis
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleMarketDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <GiMoneyStack className="w-[36px] h-[36px]" />
                      </div>

                      <Link
                        href="/dividend_checker"
                        className="!text-3xl font-[500]"
                      >
                        Dividend Checker
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleMarketDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <Image
                          src={agm}
                          alt="AGM/ASM"
                          className="w-[24px] h-[24px]"
                        />
                      </div>

                      <Link href="/economy" className="!text-3xl font-[500]">
                        Economy
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className="mobmenu-list">
                <button
                  onClick={toggleBrokerDropdown}
                  className="flex  justify-between items-center focus:outline-none !text-3xl font-[500]"
                >
                  Broker
                  {isBrokerOpen ? (
                    <>
                      <UpOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  ) : (
                    <>
                      <DownOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  )}
                </button>
                {isBrokerOpen && (
                  <ul className="py-[10px] px-[10px] flex flex-col gap-10">
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleBrokerDropdown();
                        router.push("/broker/1");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={information}
                          alt="Information"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Information
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleBrokerDropdown();
                        router.push("/broker/breakdownBuyers/1");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={buyer}
                          alt="Top Buyer"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Top Buyers
                      {/* </Link> */}
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleBrokerDropdown();
                        router.push("/broker/breakdownSellers/1");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon ">
                        <Image
                          src={seller}
                          alt="Top Sellers"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Top Sellers
                      {/* </Link> */}
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleBrokerDropdown();
                        router.push("/broker/breakdownTopFiveSymbol/adbl");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={topstock}
                          alt="Top Stock Holding Brokers"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      By Symbol
                      {/* </Link> */}
                    </li>
                  </ul>
                )}
              </li>

              <li className="mobmenu-list">
                <button
                  onClick={toggleInvestmentDropdown}
                  className="flex  justify-between items-center focus:outline-none !text-3xl font-[500]"
                >
                  Investment
                  {isInvestmentOpen ? (
                    <>
                      <UpOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  ) : (
                    <>
                      <DownOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  )}
                </button>
                {isInvestmentOpen && (
                  <ul className="py-[10px] px-[10px] flex flex-col gap-10">
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleInvestmentDropdown();
                        router.push("/investment-opportunity");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={ipo}
                          alt="IPO"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      IPO
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleInvestmentDropdown();
                        router.push("/investment-opportunity");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={rightshare}
                          alt="Right Share"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Right Share
                      {/* </Link> */}
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleInvestmentDropdown();
                        router.push("/investment-opportunity");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={debenture}
                          alt="Debenture"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Debentures
                      {/* </Link> */}
                    </li>

                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleInvestmentDropdown();
                        router.push("/investment-opportunity");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <Image
                          src={auctionSvg}
                          alt="Auction"
                          className="w-[36px] h-[36px]"
                        />
                      </div>{" "}
                      Auction
                      {/* </Link> */}
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative mobmenu-list">
                <button
                  onClick={toggleScreenerDropdown}
                  className=" flex  justify-between items-center focus:outline-none !text-3xl font-[500]"
                >
                  Screener
                  {isScreenerOpen ? (
                    <>
                      <UpOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  ) : (
                    <>
                      <DownOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  )}
                </button>
                {isScreenerOpen && (
                  <ul className="py-[10px] px-[10px] flex flex-col gap-10">
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleScreenerDropdown();
                        router.push("/screenerv2");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <MdScreenRotationAlt />
                      </div>{" "}
                      Screener
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleScreenerDropdown();
                        router.push("/sector-rotation");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <BsFullscreen />
                      </div>{" "}
                      Sector rotation
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleScreenerDropdown();
                        router.push("/priceVolume");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <BsFullscreen />
                      </div>{" "}
                      Volume Screener
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleScreenerDropdown();
                        router.push("/candlestick-patterns");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <MdPattern />
                      </div>{" "}
                      Candlestick Patterns
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleScreenerDropdown();
                        router.push("/fear-greed");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <MdMoney />
                      </div>{" "}
                      Fear/Greed
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleScreenerDropdown();
                        router.push("/promoter_share");
                      }}
                      className="flex gap-2 items-center !text-3xl font-[500]"
                    >
                      <div className="menu-icon">
                        <MdMoney />
                      </div>{" "}
                      Promoter Share
                    </li>
                  </ul>
                )}
              </li>
              <li className="relative mobmenu-list">
                <button
                  onClick={toggleToolsDropdown}
                  className=" flex  justify-between items-center focus:outline-none !text-3xl font-[500]"
                >
                  Tools
                  {isToolsOpen ? (
                    <>
                      <UpOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  ) : (
                    <>
                      <DownOutlined className="inline-block ml-2 !text-2xl font-[500]" />
                    </>
                  )}
                </button>
                {isToolsOpen && (
                  <ul className="py-[10px] px-[10px] flex flex-col gap-10">
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleToolsDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <Image
                          src={calculator}
                          alt="Calculator"
                          className="w-[36px] h-[36px]"
                        />
                      </div>

                      <Link
                        href="/stock-calculator"
                        className="!text-3xl font-[500]"
                      >
                        Calculator
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        // setIsOpen(!isOpen);
                        // toggleToolsDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <Image
                          src={watchlist}
                          alt="Pivot"
                          className="w-[36px] h-[36px]"
                        />
                      </div>

                      <Link href="/pivot" className="!text-3xl font-[500]">
                        Pivot
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleToolsDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <Image
                          src={watchlist}
                          alt="Watchlist"
                          className="w-[36px] h-[36px]"
                        />
                      </div>

                      <Link href="/watchList" className="!text-3xl font-[500]">
                        WatchList
                      </Link>
                    </li>
                    <li
                      onClick={() => {
                        setIsOpen(!isOpen);
                        toggleToolsDropdown();
                      }}
                      className="flex gap-2 items-center"
                    >
                      <div className="menu-icon">
                        <LiaBalanceScaleLeftSolid className="w-[36px] h-[36px]" />
                      </div>

                      <Link
                        href="/stock-compare"
                        className="!text-3xl font-[500]"
                      >
                        Stock Compare
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              <li
                onClick={() => {
                  setIsOpen(!isOpen);
                  router.push("/technicalchart");
                }}
                className="mobmenu-list transition ease-in-out delay-150 text-primary cursor-pointer rounded-b-xl py-2 !text-3xl font-[500]"
              >
                Technical
              </li>

              {/* {shareHolderByUserId?.ShareHolderByUserId?.length > 0 ? (
                <>
                  <li
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className="mobmenu-list transition ease-in-out delay-150 duration-300 cursor-pointer rounded-b-xl   "
                  >
                    <Link href="/portfolio" className="!text-3xl font-[500]">
                      Portfolio
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    className="mobmenu-list transition ease-in-out delay-150 duration-300 cursor-pointer rounded-b-xl "
                  >
                    <Link
                      href="/pre-portfolio"
                      className="!text-3xl font-[500]"
                    >
                      Portfolio
                    </Link>
                  </li>
                </>
              )} */}
              {!isLoggedIn && (
                <>
                  <li
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/login");
                    }}
                    className="transition shadow-lg border-2 rounded-md text-center bg-black text-secondary  ease-in-out delay-150 duration-300  cursor-pointer  rounded-b-xl  py-[16px]"
                  >
                    Sign In
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
