import { async } from "@firebase/util";
import request, { METHOD_TYPE } from "../../../api/request";

export const authSignUpWithGoogle = async (data) => {
  const res = await request({
    url: `/auth/signup`,
    method: METHOD_TYPE.SIGNUP,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  return res;
};

export const authSignInWithGoogle = async (data) => {
  const res = await request({
    url: `/auth/signin`,
    method: METHOD_TYPE.SIGNUP,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
      withCredntials: true,
      credentials: "include",
    },
  });

  return res;
};

export const authSignInEmail = async (data) => {
  const res = await request({
    url: `/auth/signin`,
    method: METHOD_TYPE.SIGNUP,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
      withCredntials: true,
      credentials: "include",
    },
  });
  return res;
};
export const updatePhoneNumberReq = async (data) => {
  try {
    const res = await request({
      url: `/auth/updatePhoneNumber/${data.user_id}`,
      method: METHOD_TYPE.PATCH,
      data: JSON.stringify({ phone_number: data?.phone_number }),
      headers: {
        headers: {
          "content-Type": "application/json",
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const checkAllowSigninReq = async (data) => {
  try {
    const res = await request({
      url: `/auth/allowSignin`,
      method: METHOD_TYPE.GET,
      headers: {
        headers: {
          "content-Type": "application/json",
        },
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const loadPromoCode = async (data) => {
  try {
    const response = await request({
      url: "/user/promocode-link",
      method: "patch",
      data: {
        promoCode: data.code,
        email: data.email,
      },
    });
    if (response?.data?.success) {
      localStorage.removeItem("sarallagani_promocode");
    }
  } catch (error) {
    console.log(error, "PROMO_CODE");
  }
};
