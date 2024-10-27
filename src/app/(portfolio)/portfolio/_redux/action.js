const entities = "[portfolio]";

const actions = {
  GET_BY_USER_ID: `${entities} GET_BY_USER_ID`,
  userDataById: (payload) => ({
    type: actions.GET_BY_USER_ID,
    payload,
  }),

  ADD_SHARE_HOLDER: `${entities} ADD_SHARE_HOLDER`,
  addShareHolder: (payload) => ({
    type: actions.ADD_SHARE_HOLDER,
    payload,
  }),

  POST_PORTFOLIO: `${entities} POST_PORTFOLIO`,
  postPortfolio: (payload) => ({
    type: actions.POST_PORTFOLIO,
    payload,
  }),

  GET_SHARE_HOLDER_BY_USER_ID: `${entities} GET_SHARE_HOLDER_BY_USER_ID`,
  getShareHolderByUserID: (payload) => ({
    type: actions.GET_SHARE_HOLDER_BY_USER_ID,
    payload,
  }),

  GET_BROKER_INFO: `${entities} GET_BROKER_INFO`,
  getBrokerInfo: (payload) => ({
    type: actions.GET_BROKER_INFO,
    payload,
  }),

  GET_ACTIVE_COMPANY_NAME: `${entities} GET_ACTIVE_COMPANY_NAME`,
  getActiveCompanyName: (payload) => ({
    type: actions.GET_ACTIVE_COMPANY_NAME,
    payload,
  }),

  GET_PORTFOLIO_BY_SHID: `${entities} GET_PORTFOLIO_BY_SHID`,
  getPortfolioByShid: (payload) => ({
    type: actions.GET_PORTFOLIO_BY_SHID,
    payload,
  }),

  DELETE_PORTFOLIO_BY_SHID: `${entities} DELETE_PORTFOLIO_BY_SHID`,
  deletePortfolioByShid: (payload) => ({
    type: actions.DELETE_PORTFOLIO_BY_SHID,
    payload,
  }),

  POST_PORTFOLIO_SELL: `${entities} PORTFOLIO_SELL`,
  postPortfolioSell: (payload) => ({
    type: actions.POST_PORTFOLIO_SELL,
    payload,
  }),

  DELETE_PORTFOLIO_HOLDER_INFO: `${entities} DELETE_PORTFOLIO_HOLDER_INFO`,
  deletePortfolioHolderInfo: (payload) => ({
    type: actions.DELETE_PORTFOLIO_HOLDER_INFO,
    payload,
  }),

  GET_SHARE_TYPE: `${entities} GET_SHARE_TYPE`,
  getShareType: (payload) => ({
    type: actions.GET_SHARE_TYPE,
    payload,
  }),

  POST_CSV_IMPORT: `${entities} POST_CSV_IMPORT`,
  postCsvImport: (payload) => ({
    type: actions.POST_CSV_IMPORT,
    payload,
  }),

  POST_EDIT_PORTFOLIO: `${entities} POST_EDIT_PORTFOLIO`,
  postEditPortfolio: (payload) => ({
    type: actions.POST_EDIT_PORTFOLIO,
    payload,
  }),

  PORTFOLIO_VS_INFLATION: `${entities} PORTFOLIO_VS_INFLATION`,
  portfolioVsInflation: (payload) => ({
    type: actions.PORTFOLIO_VS_INFLATION,
    payload,
  }),
};
export default actions;
