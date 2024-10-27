import request, { METHOD_TYPE } from "../../../api/request";

export const myWatchList = async ({ user_id }) => {
  const res = await request({
    url: `/watchlist/get/${user_id}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  return res;
};

export const postWatchList = async ({ data }) => {
  const res = await request({
    url: `/watchlist/post-new`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const deleteMyWatchList = async ({ id }) => {
  const res = await request({
    url: `/watchlist/delById/${id}`,
    method: METHOD_TYPE.DELETE,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
