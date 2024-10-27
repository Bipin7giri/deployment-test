import request, { METHOD_TYPE } from "@/api/request";

export const getPriceUpVolumeUpData = async () => {
  const res = await request({
    url: `/company/price-up-volume-up`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res.data.data;
};

export const getPriceDownVolumeUpData = async () => {
  const res = await request({
    url: `/company/price-down-volume-up`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res.data.data;
};
export const getPromoterShareData = async () => {
  const res = await request({
    url: `/lockin_period/get_all`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res.data.data;
};
