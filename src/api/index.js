import request, { METHOD_TYPE } from "./request";
export const authSignUpWithGoogle = (data) =>
   request({
      url: `/auth/signup`,
      method: METHOD_TYPE.SIGNUP,
      data: JSON.stringify(data),
      headers: {
         headers: {
            "Content-Type": "application/json",
         },
      },
   });
export const authSignInWithGoogle = async (data) => {
   const res = await request({
      url: `/auth/signin`,
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
