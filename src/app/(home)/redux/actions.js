const entities = "[home]";

const actions = {
  GET_NEPESE_INDEX_REQ: `${entities} GET_NEPESE_INDEX_REQ`,
  GET_SUB_INDEX_REQ: `${entities} GET_SUB_INDEX_REQ`,
  GET_NEWS_REQ: `${entities} GET_NEWS_REQ`,
  GET_ANALYSIS_REQ: `${entities} GET_ANALYSIS_REQ`,

  GET_GAINER_REQ: `${entities}  GET_GAINER_REQ`,
  GET_MARKET_SUMMARY_REQ: `${entities} GET_MARKET_SUMMARY_REQ`,
  GET_TURNOVER_REQ: `${entities} GET_TURNOVER_REQ`,
  GET_VOLUME_REQ: `${entities} GET_VOLUME_REQ`,
  GET_LOOSER_REQ: `${entities} GET_LOOSER_REQ`,
  GET_TRANSCATION_REQ: `${entities} GET_TRANSCATION_REQ`,
  GET_COMPANY_REQ: `${entities} GET_COMPANY_REQ`,

  // inflation and interest
  GET_INFLATION_REQ: `${entities} GET_INFLATION_REQ`,
  GET_INTEREST_REQ: `${entities} GET_INTEREST_REQ`,

  // chartsdata
  GET_NEPSE_LINE_CHART_DATA_REQ: `${entities} GET_NEPSE_LINE_CHART_DATA_REQ`,
  GET_NEPSE_LINE_CHART_DATA_TODAY_REQ: `${entities} GET_NEPSE_LINE_CHART_DATA_TODAY_REQ`,

  GET_MARKET_DATA_HOME_LIVE: `${entities}  GET_MARKET_DATA_HOME_LIVE`,
  GET_SUBSCRIPTION_DETAILS: `${entities}  GET_SUBSCRIPTION_DETAILS`,

  getSubscriptionDetails: () => ({
    type: actions.GET_SUBSCRIPTION_DETAILS,
  }),

  getMarketDataHomeLive: () => ({
    type: actions.GET_MARKET_DATA_HOME_LIVE,
  }),

  GET_NRB_INDICATOR: `${entities} GET_NRB_INDICATOR`,
  getNrbIndicator: (payload) => ({
    type: actions.GET_NRB_INDICATOR,
    payload,
  }),

  nepseLineChartData: (payload) => ({
    type: actions.GET_NEPSE_LINE_CHART_DATA_REQ,
    payload,
  }),
  // GET_NEPSE_LINE_CHART_DATA_TODAY_REQ: `${entities} GET_NEPSE_LINE_CHART_DATA_TODAY_REQ`,

  nepseLineChartDataToday: (payload) => ({
    type: actions.GET_NEPSE_LINE_CHART_DATA_TODAY_REQ,
    payload,
  }),

  GET_NOTIFICATION: `${entities} GET_NOTIFICATION`,
  getNotification: (payload) => ({
    type: actions.GET_NOTIFICATION,
    payload,
  }),

  SECTORWISE_RECENT_YEAR_QUATER: `${entities} SECTORWISE_RECENT_YEAR_QUATER`,
  sectorwiseRecentYearQuater: (payload) => ({
    type: actions.SECTORWISE_RECENT_YEAR_QUATER,
    payload,
  }),
  GET_COMPANY_CHARTDATA: `${entities}  GET_COMPANY_CHARTDATA`,
  getCompanyChartData: (payload) => ({
    type: actions.GET_COMPANY_CHARTDATA,
    payload,
  }),
  GET_LIMITED_LIVE_DATA: `${entities}  GET_LIMITED_LIVE_DATA`,
  getLimitedLiveData: (payload) => ({
    type: actions.GET_LIMITED_LIVE_DATA,
    payload,
  }),
  GET_SEARCHED_LIVE_DATA: `${entities}  GET_SEARCHED_LIVE_DATA`,
  getSearchedLiveData: (payload) => ({
    type: actions.GET_SEARCHED_LIVE_DATA,
    payload,
  }),
  GET_LIMITED_LIVE_DATA_BY_SECTOR: `${entities}  GET_LIMITED_LIVE_DATA_BY_SECTOR`,
  getLimitedLiveDataBySector: (payload) => ({
    type: actions.GET_LIMITED_LIVE_DATA_BY_SECTOR,
    payload,
  }),
  GET_FEAR_GREED_DATA: `${entities}  GET_FEAR_GREED_DATA`,
  getFearGreedData: () => ({
    type: actions.GET_FEAR_GREED_DATA,
  }),
  GET_OPINION_QUESTION: `${entities} GET_OPINION_QUESTION`,
  getOpinionQuestion: () => ({
    type: actions.GET_OPINION_QUESTION,
  }),
  VOTE_OPINION_POLL: `${entities} VOTE_OPINION_POLL`,
  voteOpinionPoll: (payload) => ({
    type: actions.VOTE_OPINION_POLL,
    payload,
  }),
  GET_WATCHLIST_DATA: `${entities} GET_WATCHLIST_DATA`,
  getWatchlistData: (payload) => ({
    type: actions.GET_WATCHLIST_DATA,
    payload,
  }),
  GET_SARAL_PICK_DATA: `${entities} GET_SARAL_PICK_DATA`,
  getSaralPickData: () => ({
    type: actions.GET_SARAL_PICK_DATA,
  }),
};

export default actions;
