"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineMail,
  AiFillEdit,
  AiFillDelete,
  AiOutlinePhone,
} from "react-icons/ai";
import { TbMoneybag } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import actions from "../../(auth)/_redux/actions";
// import { getMemberType } from "../../utils/memberTypes";
import { promoCodeColumns, promoCodeColumnsForUnpaidUser } from "./helper";
import { Table } from "antd";
import api from "@/api/axios";

function validatePhoneNumber(value) {
  let error;
  if (!value) {
    error = "Required";
    return error;
  } else if (!/^\d{10}$/i.test(value)) {
    error = "Invalid phone number!";
    return error;
  } else {
    // Phone number is valid
  }
}

const Profile = () => {
  const dispatch = useDispatch();
  const [influncerpromocodeUserStatus, setinfluncerpromocodeUserStatus] =
    useState(1);
  const { currentUser, phoneNumber, memberType, email } = useSelector(
    (state) => state.auth
  );

  const [userProfile, setUserProfile] = useState(null);
  const [unpaidInfluncerUser, setunpaidInfluncerUser] = useState([]);
  const [collabInfo, setCollabInfo] = useState(null);
  const [phone_number, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [promocodeHolderInfo, setpromocodeHolderInfo] = useState(null);
  const [influncerUsers, setinfluncerUsers] = useState(null);
  const [totalAmountOfInfluncer, settotalAmountOfInfluncer] = useState(null);
  const [notFoundInfluncerUser, setnotFoundInfluncerUser] = useState(false);

  const promoCodeColumn = promoCodeColumns;
  const profilePage = async () => {
    const res = await api.get(`/user/getByUid/${currentUser}`);
    setUserProfile(res?.data?.data[0]);
    const collabResponse = await api.get(
      `/promo-codes/get_details_by_userID/${currentUser}`
    );
    setCollabInfo(collabResponse?.data?.data?.[0]);
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actions.updatePhoneNumber({
        user_id: currentUser,
        phone_number: phone_number,
      })
    );
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // setIsPhoneNumberValid(isValidPhoneNumber(value));
    // if(phone_number){
    //   validatePhoneNumber(phone_number)
    //   // console.log(validatePhoneNumber(phone_number))
    // }
  };
  //

  // For the promocode

  const getAllUsersOfPromocodeInfo = async () => {
    setnotFoundInfluncerUser(false);
    const response = await api.get("/promo-codes/get-usersofpromocodeHolder");
    if (response?.data?.success) {
      setinfluncerUsers(response?.data?.data);
      settotalAmountOfInfluncer(response?.data?.totalAmount);
    } else {
      setnotFoundInfluncerUser(true);
    }
  };

  const getAllUnpaidUsersOfPromocodeInfo = async () => {
    setnotFoundInfluncerUser(false);

    const response = await api.get(
      "/promo-codes/get-unpaidusersofpromocodeHolder"
    );
    if (response?.data?.success) {
      setunpaidInfluncerUser(response?.data?.data);
    } else {
      setnotFoundInfluncerUser(true);
    }
  };

  const getPromoCodeHolderUserInfo = async () => {
    const response = await api.get("/promo-codes/get-promocodeHolder-info");
    if (response?.data?.success) {
      setpromocodeHolderInfo(response?.data?.data);
    }
  };

  // unpaid and paid user
  useEffect(() => {
    if (Number(memberType) === 3) {
      if (influncerpromocodeUserStatus === 1) {
        getAllUsersOfPromocodeInfo();
      } else {
        getAllUnpaidUsersOfPromocodeInfo();
      }
    }
  }, [memberType, influncerpromocodeUserStatus]);

  useEffect(() => {
    getPromoCodeHolderUserInfo();
  }, []);
  return (
    <div
      className={` lg:container mt-44 lg:mt-0 lg:px-10 py-10 lg:mx-auto lg:min-h-[100vh]  px-4 mx-auto`}
    >
      <div className=" bg-secondary    shadow-lg  p-10 pb-20 rounded-lg">
        <div className="flex gap-48 items-center">
          <div>
            <div className="flex gap-10 ">
              <h1 className="lg:text-3xl text-4xl font-[400]">
                {userProfile != null && (
                  <>
                    {userProfile?.first_name} {userProfile?.last_name}
                  </>
                )}
              </h1>
              {/* <div className="flex gap-2 items-center">
                <AiFillEdit className="font-bold cursor-pointer lg:text-lg text-2xl" />
                <AiFillDelete className="text-orange-500 cursor-pointer lg:text-lg text-2xl" />
              </div> */}
            </div>
            <div className="py-5 flex-col flex gap-5 px-10">
              <div className="flex items-center gap-20">
                {/* <div>
                  <AiOutlineMail className="lg:text-xl text-2xl" />
                </div> */}
                <div className="lg:text-[14px] text-xl">
                  <div className="text-gray-500 lg:text-xl text-2xl ">
                    Email :
                  </div>
                  {email && <>{email}</>}
                </div>
              </div>

              {/* <div className="flex items-center gap-20">
                                <div className="lg:text-[14px] text-xl">
                                    <div className="text-gray-500 lg:text-xl  text-2xl">
                                        Investor Type:
                                    </div>
                                    {userProfile != null && <>{userProfile?.investor_type}</>}
                                </div>
                            </div> */}
              {phoneNumber === null ? (
                <>
                  <div>
                    <h2 className="text-gray-500 lg:text-xl pb-2 text-2xl">
                      Add Phone Number
                    </h2>
                    <div>
                      <form
                        onSubmit={handlePhoneNumberSubmit}
                        className="flex items-center relative"
                      >
                        <div className="flex mb-10  my-2 lg:my-0  duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg lg:mb-2">
                          <PhoneInput
                            className="pl-2 outline-none w-full lg:text-sm text-4xl font-poppins"
                            placeholder="Enter phone number"
                            name="phone_number"
                            for="phone_number"
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry="NP"
                            value={phone_number}
                            onChange={handlePhoneNumberChange}
                          />
                        </div>
                        &nbsp; &nbsp;
                        <button
                          type="submit"
                          className="bg-primary lg:text-sm  duration-300 text-4xl transition ease-in-out delay-150 hover:bg-gray-500 text-secondary
                      px-2 h-[36px] -mt-[2px] rounded-lg lg:w-24 w-72"
                        >
                          Add
                        </button>
                      </form>
                      {phoneNumberError && (
                        <p className="text-red-500">{phoneNumberError}</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-gray-500 lg:text-xl pb-2 text-2xl">
                      Phone Number
                    </h2>
                    {phoneNumber && phoneNumber}
                  </div>
                </>
              )}
              {/* <div>
                <button className="px-5 text-2xl lg:text-sm border-2 hover:text-secondary  hover:bg-slate-900 transition ease-in-out delay-150  border-black rounded-full py-1 text-primary   bg-secondary">
                  Change Password
                </button>
              </div> */}
            </div>
          </div>
          <div>
            <img
              // src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
              src={
                "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
              }
              className="w-64 rounded-full"
              alt="Avatar"
            />
          </div>
        </div>
        <div className="flex lg:pt-24  2lg:my-10 justify-between px-10 py-8">
          {/* <div>
            <h1 className="lg:text-sm text-xl">Total Number of Company hold</h1>
            <span className="lg:text-3xl text-5xl py-1 flex justify-center">
              {userProfile != null && <>{userProfile?.no_company_hold}</>}
            </span>
          </div>
          <div>
            <h1 className="lg:text-sm text-xl">Total Number of Share Holder</h1>
            <span className="lg:text-3xl text-5xl py-1 flex justify-center">
              {userProfile != null && <>{userProfile?.no_share_holder}</>}
            </span>
          </div> */}
          {/* <div>
            <h1 className="lg:text-sm text-xl">Total Share Hold</h1>
            <span className="lg:text-3xl text-5xl py-1 flex justify-center">
              2
            </span>
          </div> */}
        </div>
        {memberType === "3" && promocodeHolderInfo && (
          <div className="flex justify-between text-center px-10 py-8">
            <div>
              <h1 className="lg:text-xl text-2xl font-medium">
                Promo Code Used
              </h1>
              <span className="lg:text-[16px]  text-xl py-1 flex  font-medium justify-center">
                {promocodeHolderInfo && promocodeHolderInfo.usage_count ? (
                  <>{promocodeHolderInfo?.usage_count}</>
                ) : (
                  0
                )}
              </span>
            </div>
            <div>
              <h1 className="lg:text-xl text-xl font-medium">Promo Code</h1>
              <span className="lg:text-[16px]  text-xl py-1 flex  font-medium justify-center">
                {promocodeHolderInfo && promocodeHolderInfo?.code != null ? (
                  <>{promocodeHolderInfo?.code}</>
                ) : (
                  "-"
                )}
              </span>
            </div>
            <div>
              <h1 className="lg:text-xl text-xl font-medium">Commission</h1>
              <span className="lg:text-[16px]  text-xl py-1 flex  font-medium justify-center">
                {promocodeHolderInfo && promocodeHolderInfo?.commission ? (
                  <>{promocodeHolderInfo?.commission}%</>
                ) : (
                  0
                )}
              </span>
            </div>
            {/* <div>
                                <h1 className="lg:text-sm text-xl">Total Paid</h1>
                                <span className="lg:text-3xl text-5xl py-1 flex justify-center">
                                    {collabInfo != null ? <>{collabInfo?.total_paid}</> : 0}
                                </span>
                            </div> */}
            <div>
              <h1 className="lg:text-xl text-xl font-medium">Earned</h1>
              <span className="lg:text-[16px]  text-xl py-1 flex  font-medium justify-center ">
                <>
                  {totalAmountOfInfluncer && totalAmountOfInfluncer?.toFixed(2)}
                </>
              </span>
            </div>
          </div>
        )}
        {memberType == 3 ? (
          <>
            <div className="mb-3 flex gap-3">
              <button
                onClick={() => setinfluncerpromocodeUserStatus(1)}
                className={`px-3 py-1 border border-b-slate-100 rounded-md ${
                  influncerpromocodeUserStatus === 1
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Paid User
              </button>
              <button
                onClick={() => setinfluncerpromocodeUserStatus(2)}
                className={`px-3 py-1 border border-b-slate-100 rounded-md ${
                  influncerpromocodeUserStatus === 2
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Unpaid User
              </button>
            </div>
            <div>
              {influncerpromocodeUserStatus === 1 && (
                <>
                  {!notFoundInfluncerUser ? (
                    <Table
                      dataSource={influncerUsers}
                      columns={promoCodeColumn}
                    />
                  ) : (
                    <Table dataSource={[]} columns={promoCodeColumn} />
                  )}
                </>
              )}

              {influncerpromocodeUserStatus === 2 && (
                <>
                  {!notFoundInfluncerUser ? (
                    <>
                      <Table
                        dataSource={unpaidInfluncerUser}
                        columns={promoCodeColumnsForUnpaidUser}
                      />
                    </>
                  ) : (
                    <Table dataSource={[]} columns={promoCodeColumn} />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
