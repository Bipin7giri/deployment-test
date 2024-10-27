import api from "../../../api/axios";
import request, { METHOD_TYPE } from "../../../api/request";

export const getMarketDataHomeLive = async () => {
  const res = await request({
    url: `/market_data/home_live`,
    method: METHOD_TYPE.GET,
  });
  return res;
};

export const getNepseIndex = async (data) => {
  const res = await request({
    url: `/nepse_index/live`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
export const getSubIndex = async () => {
  const res = await request({
    url: `/sub_indices/live`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getNews = async () => {
  const res = await request({
    url: `/news/by_type/1`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getAnalysis = async () => {
  const res = await request({
    url: `/analyses/`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
export const getGainer = async () => {
  const gainer = await request({
    url: `/gainer/live`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return gainer;
};

export const getLoser = async () => {
  const loser = await request({
    url: "/loser/live",
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return loser;
};

export const getMarketSummary = async () => {
  const summary = await request({
    url: "/market_summary/live",
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return summary;
};

export const getVolume = async () => {
  const volume = await request({
    url: "/volume/live",
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return volume;
};

export const getTurnOver = async () => {
  const turnOver = await request({
    url: "/turnover/live",
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return turnOver;
};

export const getTranscation = async () => {
  const transcation = await request({
    url: "/transaction/live",
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return transcation;
};

export const getCompany = async (data) => {
  const res = await request({
    url: `/live_data/live`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getInflation = async () => {
  const res = await request({
    url: `/inflation_rate/all`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getInterest = async () => {
  const res = await request({
    url: `/interest_rate/all`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getChartData = async ({ timeStamp, type }) => {
  const res = await request({
    url: `/nepse_index/area_index_chart_data/${type}/${timeStamp}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getChartDataToday = async ({ type }) => {
  const res = await request({
    url: `nepse_index/area_index_chart_data_today/${type}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getNRBIndicator = async () => {
  const res = await api.get("/economy/getNrbForex/today");
  return res;
};

export const getNotificationReq = async ({ user_id }) => {
  const res = await request({
    url: `notifications/alert/${user_id}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getSectorwiseRecentYearQuaterReq = async ({ sector }) => {
  const res = await request({
    url: `/company/sectorwise-recent-year/${sector}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
export const getSubscriptionDetailsReq = async () => {
  const res = await request({
    url: `saralLagani/subscriptionDetails`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
export const getCompanyChartDataReq = async ({ id, timeStamp }) => {
  const res = await request({
    url: `/company/chart_data/${id}/${timeStamp}`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getLimitedLiveDataReq = async ({ page, sortOrder }) => {
  const res = await request({
    url: `/live_data/pagination?page=${page}&sort=${sortOrder}`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getSearchedLiveDataReq = async ({ searchedText }) => {
  const res = await request({
    url: `/live_data/search`,
    method: METHOD_TYPE.POST,
    data: { searchedText },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getLimitedLiveDataBySectorReq = async ({
  page,
  sectors,
  sortOrder,
}) => {
  const res = await request({
    url: `/live_data/sector/pagination?page=${page}&sort=${sortOrder}`,
    method: METHOD_TYPE.POST,
    data: { sectors },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getFearGreedDataReq = async () => {
  const res = await request({
    url: `/technical_stocks_indicator/total`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getOpinionQuestionReq = async () => {
  const res = await request({
    url: `/opinion-poll/question`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const voteOpinionPollReq = async (data) => {
  const res = await request({
    url: `/opinion-poll/vote`,
    method: METHOD_TYPE.PATCH,
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getWatchlistDataReq = async ({ currentUser }) => {
  const res = await request({
    url: `/watchlist/get/${currentUser}`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
export const getSaralPickDataReq = async () => {
  const res = await request({
    url: `/company/saral-pick`,
    method: METHOD_TYPE.GET,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data;
};
