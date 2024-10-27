"use client";
import api from "@/api/axios";
import { onMessageListener, requestPermission } from "@/config/firebase-config";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaXmark } from "react-icons/fa6";

const AlertSchema = Yup.object().shape({
  lowValue: Yup.number().required("Required"),
  highValue: Yup.number().required("Required"),
});

const NotificationPopup = ({ symbol, setShowAlertBox }) => {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }

    onMessageListener()
      .then((payload) => {
        console.log("Message received. ", payload);
        alert(
          `Notification received: ${payload.notification.title} - ${payload.notification.body}`
        );
      })
      .catch((err) => console.error("Failed to receive message: ", err));
  }, []);

  useEffect(() => {
    const getFcmToken = async () => {
      const token = await requestPermission();
      if (token !== null) {
        setFcmToken(token);
      }
    };
    getFcmToken();
  }, []);

  const handleSendAlert = async (values) => {
    if (!fcmToken) {
      alert("FCM token is not available.");
      return;
    }
    try {
      alert("Alert resistering!");
      const response = await api.post("/notifications/send-notification", {
        fcmToken,
        symbol,
        lowRangeValue: values.lowValue,
        highRangeValue: values.highValue,
      });

      if (response.status === 200) {
        alert("Alert request sent!");
      } else {
        alert("Failed to send notification request.");
      }
    } catch (error) {
      console.error("Failed to send notification request:", error);
      alert("Failed to send notification request.");
    }
  };

  return (
    <div className="fixed z-[999] w-full h-full inset-0 flex justify-center items-center bg-white bg-opacity-20">
      <div className="w-[400px] bg-gray-50 rounded-xl border border-gray-200 px-4 py-6 shadow-xl flex flex-col items-end gap-5">
        <button onClick={() => setShowAlertBox(false)}>
          <FaXmark className="text-xl" />
        </button>
        <div className="w-full space-y-7">
          <h3 className="text-2xl font-semibold">
            Send alert request for {symbol}
          </h3>
          <Formik
            initialValues={{
              lowValue: "",
              highValue: "",
            }}
            validationSchema={AlertSchema}
            onSubmit={(values) => {
              // same shape as initial values
              handleSendAlert(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex flex-col w-full gap-5">
                  <div className="flex flex-col gap-1">
                    <Field
                      name="lowValue"
                      type="number"
                      placeholder="Enter low value"
                      className="focus:outline-none border border-gray-500 p-1 w-full"
                    />
                    {errors.lowValue && touched.lowValue ? (
                      <p className="text-sm text-red-500">{errors.lowValue}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Field
                      name="highValue"
                      type="number"
                      placeholder="Enter high value"
                      className="focus:outline-none border border-gray-500 p-1 w-full"
                    />
                    {errors.highValue && touched.highValue ? (
                      <p className="text-sm text-red-500">{errors.highValue}</p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-1 rounded-md font-medium"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
