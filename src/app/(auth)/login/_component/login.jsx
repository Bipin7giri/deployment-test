"use client";
import React, { useEffect, useRef, useState } from "react";
import { BiKey } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { sendEmailVerification, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Space, Spin, Tag, message } from "antd";
import Link from "next/link";
import { setIsVerificationMailSend } from "../../_redux/authSlice";
import actions from "../../_redux/actions";
import { useRouter } from "next/navigation";
import { auth, provider } from "@/services/firebaseconfig/config";

const Login = ({ path }) => {
  const inputRef = useRef(null);
  const { isLoggedIn, loading, token, isVerificationMailSend } = useSelector(
    (state) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    gmail: "",
    password: "",
  });
  const handleGoogleLogin = () => {
    // for login with google
    signInWithPopup(auth, provider)
      .then((data) => {
        const isNewUser = data["_tokenResponse"]?.isNewUser;
        if (isNewUser) {
          dispatch(
            actions.registerGoogle({
              email: data.user.email,
              user_name: data?.user?.displayName,
              user_id: data.user.uid,
              login_type: 1,
            })
          );
        } else {
          dispatch(actions.loginGoogle({ email: data.user.email }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const normalLogin = () => {
  //   try {
  //     dispatch(
  //       actions.login({ email: details.gmail, password: details.password })
  //     );
  //   } catch (err) {
  //     console.log("errr");
  //   }
  // };
  useEffect(() => {
    // if user is loggedin then navigate to home page
    if (isLoggedIn === true) {
      router.push("/");
      if (isVerificationMailSend) {
        dispatch(setIsVerificationMailSend(false));
      }
    }
  }, [dispatch, isLoggedIn, isVerificationMailSend, router]);

  // form validation
  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Password is required";
      return error;
    } else if (value.length < 8) {
      error = "Password must be at least 8 characters long";
      return error;
    } else if (value.length > 20) {
      // Set a maximum limit, e.g., 20 characters
      error = "Password is too long (maximum 20 characters)";
      return error;
    } else {
      setDetails({ ...details, password: value });
    }
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
      return error;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
      return error;
    } else if (value.length > 50) {
      // Set a maximum limit, e.g., 50 characters
      error = "Email is too long (maximum 50 characters)";
      return error;
    } else {
      setDetails({ ...details, gmail: value });
    }
  }

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  return (
    <div>
      <div className="bg-cover bg-[#F4F6F9]  flex w-full flex-col justify-center bg-no-repeat h-screen">
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div className="lg:w-[40%] relative rounded-xl bg-secondary    px-10 py-5 shadow-md w-[90%] mx-5 lg:mx-0">
            <Link href="/">
              <span className="cursor-pointer absolute left-2 top-2 ">
                <ArrowLeftOutlined className="text-4xl lg:text-xl" />
              </span>
            </Link>
            <div className="flex w-full lg:h-24 h-72 justify-center mb-5">
              <svg
                // width="140"
                className="lg:w-24 xl:w-[140px] "
                // height="73"
                viewBox="0 0 252 73"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="84" y="26" width="120" height="47" fill="black" />
                <path
                  d="M8.959 60.248C7.45033 60.248 6.107 59.9897 4.929 59.473C3.751 58.9563 2.821 58.2537 2.139 57.365C1.457 56.4557 1.07467 55.443 0.992 54.327H6.231C6.293 54.9263 6.572 55.412 7.068 55.784C7.564 56.156 8.17367 56.342 8.897 56.342C9.55833 56.342 10.0647 56.218 10.416 55.97C10.788 55.7013 10.974 55.3603 10.974 54.947C10.974 54.451 10.7157 54.0893 10.199 53.862C9.68233 53.614 8.84533 53.3453 7.688 53.056C6.448 52.7667 5.41467 52.467 4.588 52.157C3.76133 51.8263 3.04833 51.32 2.449 50.638C1.84967 49.9353 1.55 48.995 1.55 47.817C1.55 46.825 1.81867 45.926 2.356 45.12C2.914 44.2933 3.72 43.6423 4.774 43.167C5.84867 42.6917 7.11967 42.454 8.587 42.454C10.757 42.454 12.462 42.9913 13.702 44.066C14.9627 45.1407 15.686 46.5667 15.872 48.344H10.974C10.8913 47.7447 10.6227 47.2693 10.168 46.918C9.734 46.5667 9.15533 46.391 8.432 46.391C7.812 46.391 7.33667 46.515 7.006 46.763C6.67533 46.9903 6.51 47.3107 6.51 47.724C6.51 48.22 6.76833 48.592 7.285 48.84C7.82233 49.088 8.649 49.336 9.765 49.584C11.0463 49.9147 12.09 50.2453 12.896 50.576C13.702 50.886 14.4047 51.4027 15.004 52.126C15.624 52.8287 15.9443 53.7793 15.965 54.978C15.965 55.9907 15.6757 56.9 15.097 57.706C14.539 58.4913 13.7227 59.1113 12.648 59.566C11.594 60.0207 10.3643 60.248 8.959 60.248ZM18.1541 51.32C18.1541 49.5427 18.4848 47.9823 19.1461 46.639C19.8281 45.2957 20.7478 44.2623 21.9051 43.539C23.0625 42.8157 24.3541 42.454 25.7801 42.454C26.9995 42.454 28.0638 42.702 28.9731 43.198C29.9031 43.694 30.6161 44.345 31.1121 45.151V42.702H36.4131V60H31.1121V57.551C30.5955 58.357 29.8721 59.008 28.9421 59.504C28.0328 60 26.9685 60.248 25.7491 60.248C24.3438 60.248 23.0625 59.8863 21.9051 59.163C20.7478 58.419 19.8281 57.3753 19.1461 56.032C18.4848 54.668 18.1541 53.0973 18.1541 51.32ZM31.1121 51.351C31.1121 50.0283 30.7401 48.9847 29.9961 48.22C29.2728 47.4553 28.3841 47.073 27.3301 47.073C26.2761 47.073 25.3771 47.4553 24.6331 48.22C23.9098 48.964 23.5481 49.9973 23.5481 51.32C23.5481 52.6427 23.9098 53.6967 24.6331 54.482C25.3771 55.2467 26.2761 55.629 27.3301 55.629C28.3841 55.629 29.2728 55.2467 29.9961 54.482C30.7401 53.7173 31.1121 52.6737 31.1121 51.351ZM45.5492 45.585C46.1692 44.6343 46.9442 43.8903 47.8742 43.353C48.8042 42.795 49.8375 42.516 50.9742 42.516V48.127H49.5172C48.1945 48.127 47.2025 48.4163 46.5412 48.995C45.8798 49.553 45.5492 50.545 45.5492 51.971V60H40.2482V42.702H45.5492V45.585ZM52.4539 51.32C52.4539 49.5427 52.7846 47.9823 53.4459 46.639C54.1279 45.2957 55.0476 44.2623 56.2049 43.539C57.3623 42.8157 58.6539 42.454 60.0799 42.454C61.2993 42.454 62.3636 42.702 63.2729 43.198C64.2029 43.694 64.9159 44.345 65.4119 45.151V42.702H70.7129V60H65.4119V57.551C64.8953 58.357 64.1719 59.008 63.2419 59.504C62.3326 60 61.2683 60.248 60.0489 60.248C58.6436 60.248 57.3623 59.8863 56.2049 59.163C55.0476 58.419 54.1279 57.3753 53.4459 56.032C52.7846 54.668 52.4539 53.0973 52.4539 51.32ZM65.4119 51.351C65.4119 50.0283 65.0399 48.9847 64.2959 48.22C63.5726 47.4553 62.6839 47.073 61.6299 47.073C60.5759 47.073 59.6769 47.4553 58.9329 48.22C58.2096 48.964 57.8479 49.9973 57.8479 51.32C57.8479 52.6427 58.2096 53.6967 58.9329 54.482C59.6769 55.2467 60.5759 55.629 61.6299 55.629C62.6839 55.629 63.5726 55.2467 64.2959 54.482C65.0399 53.7173 65.4119 52.6737 65.4119 51.351ZM79.849 37.06V60H74.548V37.06H79.849Z"
                  fill="black"
                />
                <path
                  d="M98.223 55.908H105.167V60H92.922V38.238H98.223V55.908ZM106.641 51.32C106.641 49.5427 106.972 47.9823 107.633 46.639C108.315 45.2957 109.235 44.2623 110.392 43.539C111.55 42.8157 112.841 42.454 114.267 42.454C115.487 42.454 116.551 42.702 117.46 43.198C118.39 43.694 119.103 44.345 119.599 45.151V42.702H124.9V60H119.599V57.551C119.083 58.357 118.359 59.008 117.429 59.504C116.52 60 115.456 60.248 114.236 60.248C112.831 60.248 111.55 59.8863 110.392 59.163C109.235 58.419 108.315 57.3753 107.633 56.032C106.972 54.668 106.641 53.0973 106.641 51.32ZM119.599 51.351C119.599 50.0283 119.227 48.9847 118.483 48.22C117.76 47.4553 116.871 47.073 115.817 47.073C114.763 47.073 113.864 47.4553 113.12 48.22C112.397 48.964 112.035 49.9973 112.035 51.32C112.035 52.6427 112.397 53.6967 113.12 54.482C113.864 55.2467 114.763 55.629 115.817 55.629C116.871 55.629 117.76 55.2467 118.483 54.482C119.227 53.7173 119.599 52.6737 119.599 51.351ZM135.307 42.454C136.527 42.454 137.591 42.702 138.5 43.198C139.43 43.694 140.143 44.345 140.639 45.151V42.702H145.94V59.969C145.94 61.5603 145.62 62.9967 144.979 64.278C144.359 65.58 143.398 66.6133 142.096 67.378C140.815 68.1427 139.213 68.525 137.291 68.525C134.729 68.525 132.652 67.9153 131.06 66.696C129.469 65.4973 128.56 63.8647 128.332 61.798H133.571C133.737 62.4593 134.129 62.976 134.749 63.348C135.369 63.7407 136.134 63.937 137.043 63.937C138.139 63.937 139.007 63.6167 139.647 62.976C140.309 62.356 140.639 61.3537 140.639 59.969V57.52C140.123 58.326 139.41 58.9873 138.5 59.504C137.591 60 136.527 60.248 135.307 60.248C133.881 60.248 132.59 59.8863 131.432 59.163C130.275 58.419 129.355 57.3753 128.673 56.032C128.012 54.668 127.681 53.0973 127.681 51.32C127.681 49.5427 128.012 47.9823 128.673 46.639C129.355 45.2957 130.275 44.2623 131.432 43.539C132.59 42.8157 133.881 42.454 135.307 42.454ZM140.639 51.351C140.639 50.0283 140.267 48.9847 139.523 48.22C138.8 47.4553 137.911 47.073 136.857 47.073C135.803 47.073 134.904 47.4553 134.16 48.22C133.437 48.964 133.075 49.9973 133.075 51.32C133.075 52.6427 133.437 53.6967 134.16 54.482C134.904 55.2467 135.803 55.629 136.857 55.629C137.911 55.629 138.8 55.2467 139.523 54.482C140.267 53.7173 140.639 52.6737 140.639 51.351ZM148.722 51.32C148.722 49.5427 149.052 47.9823 149.714 46.639C150.396 45.2957 151.315 44.2623 152.473 43.539C153.63 42.8157 154.922 42.454 156.348 42.454C157.567 42.454 158.631 42.702 159.541 43.198C160.471 43.694 161.184 44.345 161.68 45.151V42.702H166.981V60H161.68V57.551C161.163 58.357 160.44 59.008 159.51 59.504C158.6 60 157.536 60.248 156.317 60.248C154.911 60.248 153.63 59.8863 152.473 59.163C151.315 58.419 150.396 57.3753 149.714 56.032C149.052 54.668 148.722 53.0973 148.722 51.32ZM161.68 51.351C161.68 50.0283 161.308 48.9847 160.564 48.22C159.84 47.4553 158.952 47.073 157.898 47.073C156.844 47.073 155.945 47.4553 155.201 48.22C154.477 48.964 154.116 49.9973 154.116 51.32C154.116 52.6427 154.477 53.6967 155.201 54.482C155.945 55.2467 156.844 55.629 157.898 55.629C158.952 55.629 159.84 55.2467 160.564 54.482C161.308 53.7173 161.68 52.6737 161.68 51.351ZM181.356 42.516C183.381 42.516 184.993 43.1773 186.192 44.5C187.411 45.802 188.021 47.6 188.021 49.894V60H182.751V50.607C182.751 49.4497 182.451 48.5507 181.852 47.91C181.252 47.2693 180.446 46.949 179.434 46.949C178.421 46.949 177.615 47.2693 177.016 47.91C176.416 48.5507 176.117 49.4497 176.117 50.607V60H170.816V42.702H176.117V44.996C176.654 44.2313 177.377 43.632 178.287 43.198C179.196 42.7433 180.219 42.516 181.356 42.516ZM194.37 40.904C193.44 40.904 192.676 40.6353 192.076 40.098C191.498 39.54 191.208 38.858 191.208 38.052C191.208 37.2253 191.498 36.5433 192.076 36.006C192.676 35.448 193.44 35.169 194.37 35.169C195.28 35.169 196.024 35.448 196.602 36.006C197.202 36.5433 197.501 37.2253 197.501 38.052C197.501 38.858 197.202 39.54 196.602 40.098C196.024 40.6353 195.28 40.904 194.37 40.904ZM197.005 42.702V60H191.704V42.702H197.005Z"
                  fill="white"
                />
              </svg>
            </div>
            {isVerificationMailSend && (
              <div>
                <Tag
                  color="green"
                  className="py-2 px-2 w-full text-[14px] mb-6"
                >
                  Mail verification has been sent! Please verify it and proceed
                  to login.
                </Tag>
              </div>
            )}
            {loading === true && (
              <Space
                size="large"
                className="flex justify-center items-center content-center"
              >
                <Spin size="large" />
              </Space>
            )}
            <div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  // hit firebase
                  await signInWithEmailAndPassword(
                    auth,
                    values.email,
                    values.password
                  )
                    .then((userCredential) => {
                      try {
                        // Signed in
                        if (userCredential?.user?.emailVerified) {
                          const user = userCredential.user;
                          // again hit login api backend
                          dispatch(
                            actions.loginGoogle({
                              email: user.email,
                              password: values.password,
                            })
                          );
                          if (isLoggedIn) {
                            message.success("Login Success");
                          }
                        } else {
                          message.error(
                            "Your email is not verified, please check your mail box for verification link"
                          );
                          console.warn(isLoggedIn, "promocode");
                          sendEmailVerification(userCredential.user);
                        }
                      } catch (err) {
                        message.error("Credentials did not match");
                      }
                    })
                    .catch((error) => {
                      message.error("Credentials did not match");
                    });
                }}
              >
                {({ errors, touched, isValidating }) => (
                  <Form className="">
                    <label
                      id="email"
                      className=" text-3xl lg:text-sm font-poppins mx-[2px]"
                    >
                      Email
                    </label>
                    <div className="flex mb-10  lg:mt-0 mt-3 duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg  lg:mb-1">
                      <AiOutlineMail className="lg:text-xl text-3xl text-gray-400" />
                      <Field
                        // innerRef={inputRef}
                        className="pl-2 outline-none  w-full text-4xl lg:text-sm font-poppins bg-transparent"
                        type="text"
                        for="email"
                        name="email"
                        placeholder="Email"
                        validate={validateEmail}
                      />
                    </div>
                    {errors.email && touched.email && (
                      <div className="text-danger mb-10 lg:mb-0 text-2xl lg:text-sm">
                        {errors.email}
                      </div>
                    )}
                    <label
                      id="password"
                      className=" text-4xl lg:text-sm font-poppins mx-[2px]"
                    >
                      Password
                    </label>
                    <div
                      className={`flex mb-10 lg:mt-0 mt-3  items-center duration-300 transition ease-in-out delay-100  border-2 py-2 px-3 rounded-lg lg:mb-2`}
                    >
                      <BiKey className="lg:text-xl text-3xl text-gray-400" />
                      <Field
                        className="pl-2 w-full outline-none border-none  text-4xl lg:text-sm font-poppins bg-transparent"
                        type="password"
                        name="password"
                        id="password"
                        validate={validatePassword}
                        placeholder="Password"
                      />
                    </div>
                    {errors.password && touched.password && (
                      <div className="text-danger mb-10 lg:mb-0 text-2xl lg:text-sm">
                        {errors.password}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Link
                        href="/reset-password"
                        className="text-[#1877F2] mb-[20px] lg:text-sm text-4xl hover:underline cursor-pointer font-medium"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Link href="/signup">
                          <span className="text-[#1877F2] my-12 lg:text-sm text-4xl hover:underline cursor-pointer font-medium">
                            Do not have an account yet?
                          </span>
                        </Link>
                      </div>
                      <div className="lg:mt-4 mb-0  lg:text-sm text-4xl">
                        {errors.password && errors.email ? (
                          <button
                            className="bg-gray-500 lg:text-sm  duration-300 text-4xl transition ease-in-out delay-150  hover:bg-gray-500  text-secondary
                                p-2 rounded-lg
                                lg:w-24
                                w-72
                                font-poppins
                                ho
                    "
                            disabled
                          >
                            Sign In
                          </button>
                        ) : (
                          <button
                            // onClick={normalLogin}
                            className="bg-gray-900  lg:text-sm text-4xl duration-300 transition ease-in-out delay-150  hover:bg-gray-800  text-secondary
                              p-2 rounded-lg
                              lg:w-24
                              w-72
                              font-poppins
                              ho
                      "
                          >
                            Sign In
                          </button>
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="flex items-center py-1 mt-4">
              <div className="flex-grow h-px bg-gray-400" />
              <span className="flex-shrink text-lg text-gray-400 px-4  font-light">
                or
              </span>
              <div className="flex-grow h-px bg-gray-400" />
            </div>

            <div className=" lg:mt-5">
              <div className="flex justify-center mt-10 lg:mt-5">
                <button
                  onClick={handleGoogleLogin}
                  className="px-6 py-3 text-4xl lg:text-sm border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                >
                  <img
                    className="lg:w-4 w-12 lg:h-4"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Continue With Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
