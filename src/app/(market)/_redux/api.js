import request, { METHOD_TYPE } from "../../../api/request";

export const getLiveMarketData = async (data) => {
  const res = await request({
    url: `/market_data/live`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
export const getCapitalizationLogic = async (data) => {
  const res = await request({
    url: `company/get_capitalization_logic`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getFilterMarketLiveDataReq = async (data) => {
  const res = await request({
    url: `/live_data/filter_by`,
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

export const getFloorsheetDataReq = async ({ page, pageSize }) => {
  const res = await request({
    url: `/floorsheet/today?null=null&page=${page || 1}&pageSize=${
      pageSize || 200
    }`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify({ page, pageSize }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getBrokerStockBuyingReq = async (data) => {
  const res = await request({
    url: `/floorsheet/get_by_buyingBrokerName`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getBrokerStockSellingReq = async (data) => {
  const res = await request({
    url: `/floorsheet/get_by_sellingBrokerName`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getAllBrokerDataBySymbolReq = async (data) => {
  const res = await request({
    url: `floorsheet/today_filter?&page=1&pageSize=200`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getStockBuyingBrokerBySymbolReq = async (data) => {
  const res = await request({
    url: `/floorsheet/get_by_buyingBrokerName_sym/${data.symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getStockSellingBrokerBySymbolReq = async (data) => {
  const res = await request({
    url: `floorsheet/get_by_sellingBrokerName_sym/${data.symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getStockDetailsBySectorReq = async (data) => {
  const res = await request({
    url: `sector/stock_details_by_sector`,
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

export const getHeatMapDataReq = async (data) => {
  const res = await request({
    url: `heat-map/get-data`,
    method: METHOD_TYPE.GET,
    // data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
export const getHeatMapDataBySectorReq = async (data) => {
  const res = await request({
    url: `heat-map/get-data-sector`,
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

export const getSectorChartDataReq = async (data) => {
  const res = await request({
    url: `sector/chart_data/${data?.sectorId}/-19800`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getNepseChartDataReq = async (data) => {
  const res = await request({
    url: `/company/chart_data/1/1371100000`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getNrbTransactionDataReq = async (data) => {
  const res = await request({
    url: `/nrb_transcation_sector`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getProductWiseLoanReq = async ({ sector }) => {
  const res = await request({
    url: `/sector/product_wise_loan/${sector}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getDividendCheckerReq = async (data) => {
  const res = await request({
    url: `/company/dividendChecker`,
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

export const getAgmSgmReq = async (data) => {
  const res = await request({
    url: `/company/agm-sgm-data`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
