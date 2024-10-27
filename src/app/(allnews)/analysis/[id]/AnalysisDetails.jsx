"use client";
import React, { useState, useEffect } from "react";
import { Input, message, Form, Button, Skeleton } from "antd";
import { useSelector } from "react-redux";
const { TextArea } = Input;
import { RxAvatar } from "react-icons/rx";
import { Helmet } from "react-helmet";
import { useParams } from "next/navigation";
import Link from "next/link";
import { newsApi, strapiBaseURl } from "@/api/axios";

const AnalysisDetails = ({ id }) => {

  const { isLoggedIn, name } = useSelector((state) => state.auth);
  const [analysisDetails, setAnalysisDetails] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [getComment, setGetComment] = useState([]);
  const [postCommentResponse, setPostCommentResponse] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    newsApi
      .get(
        `/analyses/${parseInt(id)}?populate=thumbnail&sort[0][createdAt]=desc`
      )
      .then((res) => {
        setAnalysisDetails(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });

    newsApi
      .get(`/analyses?sort[0][createdAt]=desc`)
      .then((res) => {
        setCurrentAnalysis(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAnalysisClick = (analysisId) => {
    const clickedAnalysis = analysisDetails?.data?.find(
      (item) => item?.id === analysisId
    );
    setAnalysisDetails(clickedAnalysis);
  };

  const parseData = (string) => {
    var regex = /src="([^"]*)"/;
    var matches = `${string}`?.match(regex);
    if (string) {
      let data = `${string}`.replaceAll('src="', `src=\"${strapiBaseURl}`);
      return data;
    }
  };

  // for comment
  const onChange = (e) => {
    setCommentMessage(e.target.value);
  };

  const newsId = analysisDetails?.data?.id;
  // setNewsID(newsId)

  const onFinish = async (values) => {
    setCommentMessage(values.comment);
    try {
      if (isLoggedIn) {
        const response = await newsApi.post("/comments", {
          data: {
            Commentor: name,
            comment: commentMessage,
            // createdAt: formatTimeAndDate(),
            analysis: analysisDetails?.data?.id,
          },
        });
        if (response) {
          form.resetFields();
          message.success(
            <span className="xl:text-[14px] text-[30px] text-green-500">
              Comment posted!
            </span>
          );
        }
        if (Object?.keys(response).length > 0) {
          setPostCommentResponse(true);
        }
      } else {
        message.error(
          <span className="xl:text-[14px] text-[30px] text-red-500">
            Login first to comment
          </span>
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  //get comment
  useEffect(() => {
    newsApi
      .get(`/comments?filters[analysis][id][$eq]=${analysisDetails?.data?.id}`)
      .then((res) => {
        setGetComment(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [commentMessage, analysisDetails?.data?.id, postCommentResponse]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="">
        {currentAnalysis?.data?.length > 0 ? (
          <>
            <div className="bg-[#1c1c1c] flex justify-center mt-40 lg:mt-0">
              <h3 className="text-center leading-[1.7] text-secondary  container py-32 lg:text-3xl text-5xl px-2 lg:px-20 font-serif">
                {analysisDetails?.data?.attributes?.title}
              </h3>
            </div>
            <div>
              <div className="w-[100%] container flex lg:flex-row flex-col text-[17px] px-32 lg:mx-auto">
                <div className="py-10 lg:w-[70%] w-[100%] text-4xl lg:text-lg font-sans lg:flex">
                  <div className="lg:w-[90%] mt-3 w-[150%]">
                    <div
                      className="basis-[70%] css-specific leading-[1.4]"
                      dangerouslySetInnerHTML={{
                        __html: parseData(
                          analysisDetails?.data?.attributes.description
                        ),
                      }}
                    />
                    <hr />
                  </div>
                </div>
                <div className="my-5 py-2 lg:w-[30%] w-[150%] px-2 lg:block hidden">
                  <div className="flex items-end justify-center w-[100%]">
                    <ul className="font-medium text-3xl py-10 lg:py-0 lg:text-[14px] leading-7">
                      {analysisDetails?.data?.attributes?.companies?.data?.map(
                        (companyName) => {
                          return (
                            <>
                              <li className="cursor-pointer mt-5">
                                <Link
                                  href={`/company/${companyName?.attributes?.Symbol}`}
                                  className="underline text-gray-500 hover:text-blue-700"
                                >
                                  {companyName?.attributes?.name}
                                </Link>
                              </li>
                            </>
                          );
                        }
                      )}
                    </ul>
                  </div>

                  <div className="mt-[20px] bg-secondary rounded-md w-[100%]">
                    <h4 className="lg:text-[18px] text-[36px] capitalize font-[600] mx-[10px] py-[10px] border-b-[3px] border-black">
                      recent analysis
                    </h4>
                    {currentAnalysis?.data?.length > 0 ? (
                      currentAnalysis?.data?.slice(0, 6)?.map((item, id) => {
                        return (
                          <div className="mt-[8px]" key={id}>
                            <div className="text-left px-[10px] py-[10px]">
                              <p className="lg:text-[12px] text-[26px] font-[500] italic">
                                {item?.attributes?.publishedAt?.split("T")?.[0]}
                              </p>
                              <p className="lg:text-[14px] text-[30px] font-[500] mb-[12px]">
                                <Link
                                  href={`/analysis/${item?.id}`}
                                  className="hover:underline"
                                  onClick={() => handleAnalysisClick(item?.id)}
                                >
                                  {item?.attributes?.title}
                                </Link>
                              </p>
                              <hr />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="py-5 px-[10px]">
                          <Skeleton active />
                          <Skeleton active />
                          <Skeleton active />
                          <Skeleton active />
                          <Skeleton active />
                          <Skeleton active />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="container text-[17px] px-32 lg:mx-auto">
                <div className="my-[20px] mt-[30px]">
                  <div className="lg:w-[60%] w-[100%]">
                    <Form form={form} onFinish={onFinish}>
                      <Form.Item
                        name="comment"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Your Comment",
                          },
                          {
                            max: 1000,
                            message:
                              "Comment should not exceed 1000 characters",
                          },
                        ]}
                      >
                        <TextArea
                          className="lg:text-xl text-[30px]"
                          // showCount
                          maxLength={1000}
                          style={{ height: 170, marginBottom: 24 }}
                          value={commentMessage}
                          onChange={onChange}
                          placeholder="Comment Here"
                        />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="px-[22px] py-[2px] bg-black hover:bg-black hover:text-secondary text-secondary lg:text-[16px] text-[30px] rounded-md mt-[-20px]"
                        >
                          Post Comment
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <hr />
                <div className="show-comment py-[18px]">
                  {getComment?.length > 0 ? (
                    getComment.map((item, id) => {
                      return (
                        <div className="flex gap-3 mb-[24px]" key={id}>
                          <div className="comment-avatar">
                            <RxAvatar
                              size={36}
                              className="lg:text-[36px] text:[60px] text-secondary bg-success-2 rounded-full lg:mt-0 mt-[4px]"
                            />
                          </div>
                          <div className="comment-content">
                            <p className="comment-author">
                              <span className="font-semibold lg:text-[14px] text-[24px] mr-[12px]">
                                {item?.attributes?.Commentor}
                              </span>
                              <span className="font-none lg:text-[12px] text-[20px]">
                                {
                                  item?.attributes?.createdAt
                                    ?.split("T")[1]
                                    ?.split(".")[0]
                                }
                              </span>
                            </p>
                            <p className="comment-text lg:text-[14px] text-[24px]">
                              {item?.attributes?.comment}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="apitalize lg:text-[18px] text-[24px]">
                      no comments yet
                    </div>
                  )}
                </div>
              </div>
              <div className="my-5 py-2 w-[80%] px-2 lg:hidden block ml-[10vw]">
                <div className="flex items-end justify-center w-[100%]">
                  <ul className="font-medium text-3xl py-10 xl:py-0 xl:text-[14px] leading-7 ">
                    {analysisDetails?.data?.attributes?.companies?.data?.map(
                      (companyName) => {
                        return (
                          <>
                            <li className="cursor-pointer mt-5">
                              <Link
                                href={`/company/${companyName?.attributes?.Symbol}`}
                                className=" underline text-gray-500 hover:text-info"
                              >
                                {companyName?.attributes?.name}
                              </Link>
                            </li>
                          </>
                        );
                      }
                    )}
                  </ul>
                </div>

                <div className="mt-[20px] bg-secondary rounded-md w-[100%]">
                  <h4 className="lg:text-[18px] text-[36px] capitalize font-[600] mx-[10px] py-[10px] border-b-[3px] border-black">
                    recent analysis
                  </h4>
                  {currentAnalysis?.data?.length > 0 ? (
                    currentAnalysis?.data?.slice(0, 6)?.map((item, id) => {
                      return (
                        <div className="mt-[8px]" key={id}>
                          <div className="text-left px-[10px] py-[10px]">
                            <p className="lg:text-[12px] text-[26px] font-[500] italic">
                              {item?.attributes?.publishedAt?.split("T")?.[0]}
                            </p>
                            <p className="lg:text-[14px] text-[30px] font-[500] mb-[12px]">
                              <Link
                                href={`/analysis/${item?.id}`}
                                className="hover:underline"
                                onClick={() => handleAnalysisClick(item?.id)}
                              >
                                {item?.attributes?.title}
                              </Link>
                            </p>
                            <hr />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <>
                      <div className="py-10 px-[10px]">
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="my-10 px-[300px]">
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalysisDetails;
