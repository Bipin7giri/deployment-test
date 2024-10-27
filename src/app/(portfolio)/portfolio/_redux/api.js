import request, { METHOD_TYPE } from "@/app/../api/request";

export const getUserById = async ({ userId }) => {
  const res = await request({
    url: `/portfolio/user/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({ user_id: userId }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return res;
};

export const addShareHolder = async (data) => {
  const res = await request({
    url: `/portfolio/add_share_holder`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};

export const postPortfolio = async (data) => {
  const res = await request({
    url: `portfolio/post-new`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};

export const shareHolderByUserID = async ({ user_id }) => {
  const res = await request({
    url: `/portfolio/get_share_holder_by_user_id/${user_id}`,
    method: METHOD_TYPE.GET,
    // data: JSON.stringify(data),
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};

export const getBrokerInformation = async (data) => {
  const brokerInfo = await request({
    url: `/broker/get_all`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return brokerInfo;
};

export const getStockActiveCompanyName = async () => {
  const activeCompany = await request({
    url: `/company/get_active_company_name/`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return activeCompany;
};

export const getPortfolioHolderByShid = async ({ id }) => {
  const portfolioHolder = await request({
    url: `portfolio/get_by_shid/${id}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return portfolioHolder;
};

export const deletePortfolioByShareHolderId = async ({ id }) => {
  try {
    const deletePortfolio = await request({
      url: `portfolio/delete/${id}`,
      method: METHOD_TYPE.DELETE,
      headers: {
        headers: {
          "Content-type": "application/json",
        },
      },
    });
    return deletePortfolio;
  } catch (err) {
    console.log(err);
  }
};

export const portfolioSellReq = async (data) => {
  try {
    const portfolioSell = await request({
      url: `portfolio/sell`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify(data),
      headers: {
        headers: {
          "Content-type": "application/json",
        },
      },
    });
    return portfolioSell;
  } catch (err) {
    console.log(err);
  }
};

export const deletePortfolioHolderInfoReq = async ({ id }) => {
  const deletePortfolioHolder = await request({
    url: `portfolio/delete_share_holder/${id}`,
    method: METHOD_TYPE.DELETE,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return deletePortfolioHolder;
};

export const getShareTypeReq = async (data) => {
  const res = await request({
    url: `portfolio/get_share_type`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};

export const postCsvImportReq = async (data) => {
  const res = await request({
    url: `portfolio/import`,
    data: data,
    method: METHOD_TYPE.POST,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};

export const postEditPortfolioReq = async (data) => {
  const res = await request({
    url: `portfolio/edit/${data.id}`,
    data: JSON.stringify(data),
    method: METHOD_TYPE.POST,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};

export const portfolioVsInflationReq = async ({ id }) => {
  const res = await request({
    url: `portfolio/portfolio_vs_inflation/${id}`,
    data: JSON.stringify({ id }),
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-type": "application/json",
      },
    },
  });
  return res;
};
