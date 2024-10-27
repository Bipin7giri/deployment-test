import request, { METHOD_TYPE } from "@/api/request";

export const postSubscription = async (data) => {
  const res = await request({
    url: `/payment/suscribe`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return res;
};
