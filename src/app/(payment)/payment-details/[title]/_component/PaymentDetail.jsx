"use client";
import React, { useEffect, useState } from "react";
import { message, Upload, Modal, Tag } from "antd";
import { TiTick } from "react-icons/ti";
import qrImage from "../../../../../../public/assets/payment/qr.png";
import { useDispatch, useSelector } from "react-redux";
// import { SocialIcon } from "react-social-icons";
import { RxCross2 } from "react-icons/rx";
import { FaWhatsappSquare } from "react-icons/fa";
import { Card, Col, Row } from "antd";
import { setPaymentDetails } from "../_redux/paymentSlice";
import api from "@/api/axios";
import InfluencerPaymentMessage from "../../../subscription-plan/_component/InfluencerPaymentMessage";
import _request from "@/api/request";
import Image from "next/image";
// import Confetti from 'react-confetti';
// import imageCompression from 'browser-image-compression';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const PaymentDetail = ({ packageTitle }) => {
  const dispatch = useDispatch();
  const { paymentDetail } = useSelector((state) => state.payment);
  const { subscriptionDetails } = useSelector((state) => state.home);
  const [linkPromoCode, setlinkPromoCode] = useState();
  const { memberType } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.auth);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [promoCodeError, setPromoCodeError] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [file, setFile] = useState();
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [promoMessage, setPromoMessaage] = useState("");
  const [paymentMessage, setPaymentMessage] = useState("");
  const [promoCodeId, setPromoCodeId] = useState(0);
  // const [compressedImage, setCompressedImage] = useState();
  const [packagePrice, setPackagePrice] = useState(0);
  const [discountedPackagePrice, setDiscountedPackagePrice] = useState(0);

  const handleVerifyPromoCode = async (e) => {
    e.preventDefault();
    const res = await api.post("/promo-codes/validate", {
      code: promoCode,
      used_user_id: currentUser,
    });
    if (res) {
      if (
        res?.data?.message === "Promo code not found" ||
        res?.data?.message === "Promo code has expired" ||
        res?.data?.message === "You cannot use your own promo code."
      ) {
        setPromoCodeError(res?.data?.message);
      } else {
        setDiscountedPrice(parseInt(res?.data?.data?.discount));
        setPromoMessaage(res?.data?.data?.message);
        setPromoCodeError(res?.data?.data?.message);
        setPromoCodeId(res?.data?.data?.promoCodeID);
      }
    }
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ file }) => {
    setFile(file);
  };

  const qrCodeImage = qrImage;

  const basicPackage = subscriptionDetails?.find(
    (item) => item.packageName === "basic"
  );

  const courseDetail = subscriptionDetails?.find(
    (item) => item.packageName === "course"
  );

  const packageCourseDetail = subscriptionDetails?.find(
    (item) => item.packageName === "basic&course"
  );

  // const priceAfterDiscount = Math?.floor(
  //   orginalPrice - (discoundedPrice / 100) * orginalPrice
  // );

  const beforeUpload = (uploadedFile) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    const isAllowedType = allowedTypes.includes(uploadedFile.type);
    if (!isAllowedType) {
      message.error("You can only upload PNG and JPG files!");
    }
    return isAllowedType;
  };

  const user_id = currentUser;
  const uploadImage = file?.originFileObj;
  const subscription_type = "basic";

  const handleRequestAccess = async () => {
    if (uploadImage && user_id) {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("image", uploadImage);
      // formData.append("subscription_type", subscription_type);
      if (promoCodeId > 0) {
        formData.append("promo_code_id", promoCodeId);
      } else {
        formData.append("promo_code_id", 0);
      }
      formData.append(
        "amount",
        Number(discountedPrice) === 0 ? packagePrice : discountedPackagePrice
      );
      formData.append("subscription_id", 1);
      // dispatch(actions.addSubscription(formData));
      try {
        const response = await api.post(`payment/suscribe`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response?.data?.status === 401) {
          message.success(response?.data?.message);
        } else if (response?.data?.status !== 503) {
          setPaymentMessage(response?.data?.data?.message);
          message.success(response?.data?.data?.message);
          dispatch(setPaymentDetails(response?.data?.message));
        } else {
          message.error("Something Went Wrong");
        }
      } catch (err) {
        console.log(err);
      }
      setFile();
    } else {
      message.error("Image is not selected");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPromoCodeOfUser = async () => {
    const response = await api.get("/user/get-promocodeOfUser");
    if (response?.data?.success) {
      setlinkPromoCode(response?.data?.code);
      setPromoCode(response?.data?.code);
    }
  };

  useEffect(() => {
    getPromoCodeOfUser();
  }, []);

  // for generating package price
  useEffect(() => {
    if (packageTitle === "saral_package") {
      const originalPrice = basicPackage?.price;
      const discount = basicPackage?.discountPercentage;
      const discountPrice =
        originalPrice - Math.ceil((discount / 100) * originalPrice);
      setPackagePrice(discountPrice);
    } else if (packageTitle === "saral_package_course") {
      setPackagePrice(packageCourseDetail?.price);
    } else if (packageTitle === "saral_course") {
      setPackagePrice(courseDetail?.price);
    }
  }, [packageTitle, basicPackage, courseDetail, packageCourseDetail]);

  // generate price after promocode is applied
  const generatePriceAfterPromo = (price) => {
    return Math?.floor(price - (discountedPrice / 100) * price);
  };

  useEffect(() => {
    if (Number(discountedPrice) > 0) {
      setDiscountedPackagePrice(generatePriceAfterPromo(packagePrice));
    }
  }, [discountedPrice]);

  return memberType == 3 ? (
    <div className="flex flex-col min-h-screen">
      <InfluencerPaymentMessage />
    </div>
  ) : (
    <>
      <div className="flex justify-center mx-auto bg-[#F4F6F9] text-center rounded py-[80px] lg:pt-[80px] pt-[230px]">
        <div className="shadow-lg lg:shadow flex lg:flex-row flex-col justify-center w-[55vw]">
          <div className="bg-secondary w-full lg:w-[50%] px-[20px] lg:px-4 shadow-xl rounded-l-lg min-h-[400px]">
            {paymentMessage && (
              <div className="py-[20px] text-danger mb-[20px]">
                {/* <Confetti className='w-[100%]' /> */}
                <Tag
                  color="green"
                  className="w-full py-2 px-2 capitalize xl:text-[14px] lg:text-[12px] text-[12px] mb-6"
                >
                  {paymentMessage}
                </Tag>
              </div>
            )}
            <div className="p-[50px]">
              <div className="flex justify-center">
                <Image
                  src={qrCodeImage}
                  alt="saral-lagani"
                  className={`transition-all ${
                    paymentMessage ? "blur-md" : ""
                  }`}
                />
              </div>
              <div className={`${paymentMessage ? "blur-md" : ""} mt-[30px]`}>
                <Upload
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={file ? [file] : []}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  // beforeUpload={beforeUpload}
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: 'Please upload a PNG',
                  //   },
                  // ]}
                >
                  {file ? "Click to Re-Upload" : " Click to Upload"}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </div>
              <div className={`${paymentMessage ? "blur-md" : ""} mt-[30px]`}>
                <p className="mt-[12px] capitalize">
                  Upload screenshot of transaction
                </p>
                <br></br>
                <div className="justify-start items-start">
                  <p>Or send us by</p>
                  <div className="flex justify-center items-center">
                    <FaWhatsappSquare className="text-2xl text-green-500 bg-white rounded-lg" />
                    &nbsp;&nbsp;
                    {/* <p>+977 9801462660</p> */}
                    <a href="https://wa.me/9801462660" target="_blank">
                      +977 9801462660
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] px-[20px] bg-[#F7F7FC] rounded-r-lg shadow-xl lg:px-4 min-h-[400px]">
            <div className="pt-[40px] pl-[40px]">
              <div className="text-left mt-[12px] flex">
                {packageTitle === "saral_package" && (
                  <div>
                    <div className="flex items-center mt-[14px]">
                      <p className="line-through mr-[12px] text-[#727586] text-[22px] font-[600]">
                        NRs. {basicPackage?.price}
                      </p>
                      <Tag
                        color="purple"
                        className="rounded-[12px] capitalize border-none font-semibold py-[1px] px-[10px] lg:text-[16px] text-2xl"
                      >
                        saved {basicPackage?.discountPercentage}%
                      </Tag>
                    </div>
                    <div className="py-[10px] mt-[10px] flex">
                      <p className="text-[32px] font-[700]">
                        NRs{" "}
                        {Number(discountedPrice) === 0
                          ? packagePrice
                          : discountedPackagePrice}
                      </p>
                      <p className="ml-[7px] mt-[14px]">/year</p>
                    </div>
                  </div>
                )}

                {packageTitle === "saral_package_course" && (
                  <>
                    <p className="text-[32px] font-[700]">
                      NRs
                      {Number(discountedPrice) === 0
                        ? packagePrice
                        : discountedPackagePrice}
                    </p>
                    <p className="ml-[7px] mt-[14px]">/year</p>
                  </>
                )}
                {packageTitle === "saral_course" && (
                  <>
                    <p className="text-[32px] font-[700]">
                      NRs
                      {Number(discountedPrice) === 0
                        ? packagePrice
                        : discountedPackagePrice}
                    </p>
                    <p className="ml-[7px] mt-[14px]">
                      2 days session(2 hours each)
                    </p>
                  </>
                )}
              </div>
              <div className="pt-[18px]">
                <p className="pt-[15px] flex">
                  <span>
                    <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                  </span>
                  Peri Dot Private Limited.
                </p>
                <p className="pt-[15px] flex">
                  <span>
                    <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                  </span>
                  A/C: 55504672235
                </p>
                <p className="pt-[10px] flex">
                  <span>
                    <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                  </span>
                  Siddhartha Bank Limtied
                </p>
                <p className="pt-[10px] flex">
                  <span>
                    <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                  </span>
                  Maharajung, Kathmandu Nepal
                </p>
                <p className="pt-[10px] flex">
                  <span>
                    <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                  </span>
                  +977 9801462660
                </p>
              </div>
              {!paymentMessage ? (
                <div className="py-[40px] text-left">
                  <div className="flex">
                    <h2 className="text-primary lg:text-lg font-[600] pb-2 text-2xl">
                      Add Promo Code
                    </h2>
                    <p>&nbsp;(If you have any)</p>
                  </div>
                  <div>
                    <form
                      onSubmit={handleVerifyPromoCode}
                      className="flex items-center relative"
                    >
                      {!linkPromoCode ? (
                        <input
                          className={`flex lg:mt-0 mt-3 duration-300 transition ease-in-out delay-100 border-yellow-400   hover:border-black 
                        items-center border-2 h-[36px] px-3 rounded-lg lg:mb-1 ${
                          promoCodeError ? "border-red-500" : ""
                        }`}
                          type="text"
                          value={promoCode}
                          placeholder="Enter Promo Code"
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                      ) : (
                        <input
                          className={`flex lg:mt-0 mt-3 duration-300 transition ease-in-out delay-100 border-yellow-400 hover:border-black 
                          items-center border-2 h-[36px] px-3 rounded-lg lg:mb-1 ${
                            promoCodeError ? "border-red-500" : ""
                          }`}
                          type="text"
                          disabled={true}
                          value={promoCode}
                          // disabled={true}
                          placeholder="Enter Promo Code"
                        />
                      )}
                      &nbsp; &nbsp;
                      {promoCode &&
                        promoCodeError !==
                          "Promo code applied successfully" && (
                          <button
                            type="submit"
                            className="bg-primary lg:text-sm  duration-300 text-4xl transition ease-in-out delay-150 hover:bg-gray-500 text-secondary
                      px-2 h-[36px] -mt-[2px] rounded-lg lg:w-24 w-72 font-[600]"
                          >
                            Verify
                          </button>
                        )}
                      {promoCode &&
                        promoCodeError ===
                          "Promo code applied successfully" && (
                          <div className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-success rounded-3xl mr-[10px]">
                            {" "}
                            <TiTick />{" "}
                          </div>
                        )}
                      {promoCode &&
                        (promoCodeError === "Promo code not found" ||
                          promoCodeError === "Promo code has expired") && (
                          <div className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-danger rounded-3xl mr-[10px]">
                            {" "}
                            <RxCross2 />{" "}
                          </div>
                        )}
                    </form>
                    {promoCodeError === "Promo code applied successfully" ? (
                      <p className="text-success">{promoCodeError}</p>
                    ) : (
                      <p className="text-danger">{promoCodeError}</p>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            {file && currentUser ? (
              <div className="mb-[20px] text-right mr-[10px]">
                <button
                  onClick={handleRequestAccess}
                  className="text-[18px] text-center text-[#fff] bg-primary py-[6px] px-[30px] rounded-xl"
                >
                  Request Access
                </button>
              </div>
            ) : (
              ""
            )}

            {/* {paymentMessage ? (
              ""
            ) : (
              <div className="mb-[20px] text-right mr-[10px]">
                <button
                  onClick={handleRequestAccess}
                  className="text-[18px] text-center text-[#fff] bg-[#A9A3A3] py-[6px] px-[30px] rounded-xl"
                >
                  Request Access
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentDetail;
