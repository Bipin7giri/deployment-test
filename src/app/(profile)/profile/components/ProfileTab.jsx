"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Menu, Dropdown } from "antd";
import { TfiReload } from "react-icons/tfi";
import { LiaHandPointer } from "react-icons/lia";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import request from "@/api/request";
import { useRouter } from "next/navigation";
const ProfileTab = () => {
  const {
    isLoggedIn,
    name,
    is_subscribed,
    email,
    memberType,
    phoneNumber,
    token,
  } = useSelector((state) => state.auth);
  const [paymentLog, setpaymentLog] = useState({});
  const router = useRouter();
  const onChange = (key) => {};

  const getSubscriptionTimeLog = async () => {
    const response = await _request({
      url: "payment/getPaymentTimeLogDetails",
      method: "get",
      headers: {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    });
    setpaymentLog(response?.data?.data, "nice");
  };

  useEffect(() => {
    getSubscriptionTimeLog();
  }, []);
  const investmentStyleMenu = (
    <Menu>
      <Menu.Item key="Hybrid" disabled>
        Hybrid
      </Menu.Item>
      <Menu.Item key="Growth">Growth</Menu.Item>
      <Menu.Item key="Value">Value</Menu.Item>
    </Menu>
  );
  const dynamicData = [
    {
      id: "1",
      label: "My Profile",
      content: (
        <div className="tab-info">
          <p>
            Email: <strong>{email}</strong>
          </p>
          <p>
            Phone No.: <strong>{phoneNumber ? phoneNumber : "-"}</strong>
          </p>
          {/* <p>Investment Style : <strong>{memberType ? memberType : '-'}</strong></p> */}
          {/* <Dropdown overlay={investmentStyleMenu}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            {memberType} <DownOutlined />
                        </a>
                    </Dropdown> */}
          {/* </p> */}
        </div>
      ),
    },
    // {
    //     id: '2', label: 'Subscription', content: <div className='tab-info'>
    //         <p>Subscription Type: <strong>Saral Pro</strong></p>
    //         <p>Expiry Date: <strong>2023/12/04</strong></p>
    //         <p>Remaining Days: <strong>49</strong></p>
    //         <button>Renew Now <span><TfiReload /></span> </button>
    //         <button onClick={() => { navigate(`/subscription-plan`) }}>Subcribe Now <span><LiaHandPointer /></span> </button>
    //     </div>
    // },
    // {
    //     id: '3', label: 'Collaboration', content: <div className='tab-info'>
    //         <p>Step 1: <strong>Fill up the partner form</strong></p>
    //         <p>Step 2: <strong>Get connected with Saral team member</strong></p>
    //         <p>Step 3: <strong>Get referral code and invite</strong></p>
    //         <p>Step 4: <strong>Keep track of your earnings everyday</strong></p>
    //     </div>
    // },
  ];
  if (!is_subscribed) {
    dynamicData.push({
      key: "2",
      label: "Subscription",
      content: (
        <div className="tab-info">
          <button
            onClick={() => {
              router.push(`/subscription-plan`);
            }}
          >
            Subscribe Now{" "}
            <span>
              <LiaHandPointer />
            </span>{" "}
          </button>
        </div>
      ),
    });
  }
  if (is_subscribed) {
    dynamicData.push({
      key: "2",
      label: "Subscription",
      content: (
        <div className="tab-info">
          <h1 className="text-[#5D5F67] text-[15px] font-medium mb-4">
            {" "}
            Subscription Type :{" "}
            <span className="capitalize ms-1 text-black">
              {paymentLog?.subcription_type}
            </span>
          </h1>
          <h1 className="text-[#5D5F67] text-[15px] font-medium mb-4">
            {" "}
            Expiry Date :
            <span className="text-black ms-1">
              {" "}
              {paymentLog?.end_date?.slice(0, 10)}
            </span>
          </h1>
          <h1 className="text-[#5D5F67] text-[15px] font-medium mb-4 ">
            {" "}
            Remaining Days :
            <span className="text-black  ms-1">
              {" "}
              {paymentLog?.remainingDays}
            </span>
          </h1>
          <button
            onClick={() => {
              router.push(`/subscription-plan`);
            }}
            className="bg-[#453DE0]"
          >
            Renew Now{" "}
            <span>
              <FiRefreshCw />
            </span>{" "}
          </button>
        </div>
      ),
    });
  }

  const items = dynamicData.map((item) => ({
    key: item.id,
    label: item.label,
    children: <div>{item.content}</div>,
  }));

  return (
    <>
      <div className="profile-tab">
        <Tabs
          centered
          defaultActiveKey={items[0]?.key}
          items={items}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default ProfileTab;
