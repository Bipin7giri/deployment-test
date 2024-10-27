const entities = "[company]";

const actions = {
  GET_COMPANY_DETAIL_REQ_FOR_POLLING: `${entities}  GET_COMPANY_DETAIL_REQ_FOR_POLLING`,
  companyDetailForPolling: (payload) => ({
    type: actions.GET_COMPANY_DETAIL_REQ_FOR_POLLING,
    payload,
  }),
  GET_COMPANY_DETAIL_REQ: `${entities}  GET_COMPANY_DETAIL_REQ`,
  companyDetail: (payload) => ({
    type: actions.GET_COMPANY_DETAIL_REQ,
    payload,
  }),
  GET_COMPANY_TRADING_METER: `${entities}  GET_COMPANY_TRADING_METER`,
  companyTradingMeter: (payload) => ({
    type: actions.GET_COMPANY_TRADING_METER,
    payload,
  }),

  GET_COMPANY_INDUSTRY_AVG: `${entities} GET_COMPANY_INDUSTRY_AVG`,
  companyIndustryAvg: (payload) => ({
    type: actions.GET_COMPANY_INDUSTRY_AVG,
    payload,
  }),

  GET_LIVE_COMPANY_DATA: `${entities} GET_LIVE_COMPANY_DATA`,

  // chartsdata
  GET_COMPANY_LINE_CHART_DATA_REQ: `${entities} GET_COMPANY_LINE_CHART_DATA_REQ`,
  companyLineChart: (payload) => ({
    type: actions.GET_COMPANY_LINE_CHART_DATA_REQ,
    payload,
  }),

  // sectorinfo

  GET_SECTOR_INFO_REQ: `${entities} GET_SECTOR_INFO_REQ`,
  sectorInfo: (payload) => ({
    type: actions.GET_SECTOR_INFO_REQ,
    payload,
  }),

  // Floorsheet
  GET_FLOORSHEET_DATA: `${entities} GET_FLOORSHEET_DATA`,
  floorsheetData: (payload) => ({
    type: actions.GET_FLOORSHEET_DATA,
    payload,
  }),
  GET_FILTERED_FLOORSHEET_DATA: `${entities} GET_FILTERED_FLOORSHEET_DATA`,
  filteredFloorsheetData: (payload) => ({
    type: actions.GET_FILTERED_FLOORSHEET_DATA,
    payload,
  }),


  // quaterIncomeReport
  GET_QUARTER_INCOME_ONE_REQ: `${entities} GET_QUARTER_INCOME_ONE_REQ`,
  quaterIncomeOne: (payload) => ({
    type: actions.GET_QUARTER_INCOME_ONE_REQ,
    payload,
  }),
  GET_QUARTER_INCOME_TWO_REQ: `${entities} GET_QUARTER_INCOME_TWO_REQ`,
  quaterIncomeTwo: (payload) => ({
    type: actions.GET_QUARTER_INCOME_TWO_REQ,
    payload,
  }),

  GET_ANNUAL_INCOME_ONE_REQ: `${entities} GET_ANNUAL_INCOME_ONE_REQ`,
  annualIncomeOne: (payload) => ({
    type: actions.GET_ANNUAL_INCOME_ONE_REQ,
    payload,
  }),
  GET_ANNUAL_INCOME_TWO_REQ: `${entities} GET_ANNUAL_INCOME_TWO_REQ`,
  annualIncomeTwo: (payload) => ({
    type: actions.GET_ANNUAL_INCOME_TWO_REQ,
    payload,
  }),

  //quarter balanceSheet

  GET_QUARTER_BALANCESHEET_ONE_REQ: `${entities} GET_QUARTER_BALANCESHEET_ONE_REQ`,
  quaterBalanceSheetOne: (payload) => ({
    type: actions.GET_QUARTER_BALANCESHEET_ONE_REQ,
    payload,
  }),
  GET_QUARTER_BALANCESHEET_TWO_REQ: `${entities} GET_QUARTER_BALANCESHEET_TWO_REQ`,
  quaterBalanceSheetTwo: (payload) => ({
    type: actions.GET_QUARTER_BALANCESHEET_TWO_REQ,
    payload,
  }),

  // annual balancesheet

  GET_ANNUAL_BALANCESHEET_ONE_REQ: `${entities} GET_ANNUAL_BALANCESHEET_ONE_REQ`,
  annualBalanceSheetOne: (payload) => ({
    type: actions.GET_ANNUAL_BALANCESHEET_ONE_REQ,
    payload,
  }),
  GET_ANNUAL_BALANCE_TWO_REQ: `${entities} GET_ANNUAL_BALANCE_TWO_REQ`,
  annualBalanceSheetTwo: (payload) => ({
    type: actions.GET_ANNUAL_BALANCE_TWO_REQ,
    payload,
  }),

  GET_ANNUAL_RATIO_REQ: `${entities} GET_ANNUAL_RATIO_REQ`,
  annualRatio: (payload) => ({
    type: actions.GET_ANNUAL_RATIO_REQ,
    payload,
  }),

  GET_QUARTER_RATIO_REQ: `${entities} GET_QUARTER_RATIO_REQ`,
  quarterRatio: (payload) => ({
    type: actions.GET_QUARTER_RATIO_REQ,
    payload,
  }),

  // getdividend by symb
  GET_DIVIDEND_BY_REQ: `${entities} GET_DIVIDEND_BY_REQ`,
  dividend: (payload) => ({
    type: actions.GET_DIVIDEND_BY_REQ,
    payload,
  }),

  GET_PEER_COMPARISON: `${entities} GET_PEER_COMPARISON`,
  peercomprasion: (payload) => ({
    type: actions.GET_PEER_COMPARISON,
    payload,
  }),

  GET_FINANCAIL_BREAKDOWN: `${entities} GET_FINANCAIL_BREAKDOWN`,
  financailBreakdown: (payload) => ({
    type: actions.GET_FINANCAIL_BREAKDOWN,
    payload,
  }),

  GET_LIVE_DATA_BY_SYMBOL: `${entities} GET_LIVE_DATA_BY_SYMBOL`,
  getLiveDataBySymbol: (payload) => ({
    type: actions.GET_LIVE_DATA_BY_SYMBOL,
    payload,
  }),

  GET_MUTUAL_FUNDS_PL: `${entities} GET_MUTUAL_FUNDS_PL`,
  getMutualFundsPL: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_PL,
    payload,
  }),

  GET_MUTUAL_FUNDS_BALANCE: `${entities} GET_MUTUAL_FUNDS_BALANCE`,
  getMutualFundsBalance: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_BALANCE,
    payload,
  }),

  GET_MUTUAL_FUNDS_INVESTMENT: `${entities} GET_MUTUAL_FUNDS_INVESTMENT`,
  getMutualFundsInvestment: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_INVESTMENT,
    payload,
  }),

  GET_DEVENTURES_DATA: `${entities} GET_DEVENTURES_DATA`,
  getDeventuresData: (payload) => ({
    type: actions.GET_DEVENTURES_DATA,
    payload,
  }),

  GET_MUTUAL_FUNDS_NAV_DATA: `${entities} GET_MUTUAL_FUNDS_NAV_DATA`,
  getMutualFundsNavData: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_NAV_DATA,
    payload,
  }),

  GET_MUTUAL_FUNDS_TOP_INVESTMENT_SECTOR: `${entities} GET_MUTUAL_FUNDS_TOP_INVESTMENT_SECTOR`,
  getMutualFundsTopInvestmentSector: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_TOP_INVESTMENT_SECTOR,
    payload,
  }),

  GET_MUTUAL_FUNDS_INVESTMENT_AREAS: `${entities} GET_MUTUAL_FUNDS_INVESTMENT_AREAS`,
  getMutualFundsInvestmentAreas: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_INVESTMENT_AREAS,
    payload,
  }),

  GET_MUTUAL_FUNDS_UNITS_CHANGE: `${entities} GET_MUTUAL_FUNDS_UNITS_CHANGE`,
  getMutualFundsUnitsChange: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_UNITS_CHANGE,
    payload,
  }),

  GET_SECTORWISE_MUTUAL_FUNDS: `${entities} GET_SECTORWISE_MUTUAL_FUNDS`,
  getSectorwiseMutualFunds: (payload) => ({
    type: actions.GET_SECTORWISE_MUTUAL_FUNDS,
    payload,
  }),

  GET_HYSTORIC_MUTUAL_FUNDS_HOLDINGS: `${entities} GET_HYSTORIC_MUTUAL_FUNDS_HOLDINGS`,
  getHystoricMutualFundsHoldings: (payload) => ({
    type: actions.GET_HYSTORIC_MUTUAL_FUNDS_HOLDINGS,
    payload,
  }),

  GET_MUTUAL_FUNDS_HOLDINGS_BY_STOCK: `${entities} GET_MUTUAL_FUNDS_HOLDINGS_BY_STOCK`,
  getMutualFundsHoldingsByStock: (payload) => ({
    type: actions.GET_MUTUAL_FUNDS_HOLDINGS_BY_STOCK,
    payload,
  }),

  GET_FINANCAIL_BREAKDOWN_LOAN_COMPARE: `${entities} GET_FINANCAIL_BREAKDOWN_LOAN_COMPARE`,
  getFinancialBreakdownLoanCompare: (payload) => ({
    type: actions.GET_FINANCAIL_BREAKDOWN_LOAN_COMPARE,
    payload,
  }),

  GET_FINANCAIL_BREAKDOWN_DEPOSIT_COMPARE: `${entities} GET_FINANCAIL_BREAKDOWN_DEPOSIT_COMPARE`,
  getFinancialBreakdownDepositCompare: (payload) => ({
    type: actions.GET_FINANCAIL_BREAKDOWN_DEPOSIT_COMPARE,
    payload,
  }),

  GET_COMPANY_DESCRIPTIONS: `${entities} GET_COMPANY_DESCRIPTIONS`,
  getCompanyDescriptions: (payload) => ({
    type: actions.GET_COMPANY_DESCRIPTIONS,
    payload,
  }),

  GET_REPORT_IMAGE_BY_SYMBOL: `${entities} GET_REPORT_IMAGE_BY_SYMBOL`,
  getReporImageBySymbol: (payload) => ({
    type: actions.GET_REPORT_IMAGE_BY_SYMBOL,
    payload,
  }),

  GET_DIVIDEND_YIELD_BY_SYMBOL: `${entities} GET_DIVIDEND_YIELD_BY_SYMBOL`,
  getDividendYieldBySymbol: (payload) => ({
    type: actions.GET_DIVIDEND_YIELD_BY_SYMBOL,
    payload,
  }),

  GET_LIFE_INSURANCE_PREMIUM: `${entities} GET_LIFE_INSURANCE_PREMIUM`,
  getLifeInsurancePremium: (payload) => ({
    type: actions.GET_LIFE_INSURANCE_PREMIUM,
    payload,
  }),

  GET_CAMEL_RATING_INDIVIDUAL: `${entities} GET_CAMEL_RATING_INDIVIDUAL`,
  getCamelRatingIndividual: (payload) => ({
    type: actions.GET_CAMEL_RATING_INDIVIDUAL,
    payload,
  }),

  GET_ALTMAN_RATING_INDIVIDUAL: `${entities} GET_ALTMAN_RATING_INDIVIDUAL`,
  getAltmanRatingIndividual: (payload) => ({
    type: actions.GET_ALTMAN_RATING_INDIVIDUAL,
    payload,
  }),

  GET_EQUITY_MUTUAL_FUNDS_UNITS_CHANGE: `${entities} GET_EQUITY_MUTUAL_FUNDS_UNITS_CHANGE`,
  getEquityMutualFundsUnitsChange: (payload) => ({
    type: actions.GET_EQUITY_MUTUAL_FUNDS_UNITS_CHANGE,
    payload,
  }),



  GET_SARAL_RATING: `${entities} GET_SARAL_RATING`,
  getSaralRating: (payload) => ({
    type: actions.GET_SARAL_RATING,
    payload,
  }),

  GET_MUTUAL_FUND_PEER_COMPARISION: `${entities} GET_MUTUAL_FUND_PEER_COMPARISION`,
  getMutualFundPeerComparision: (payload) => ({
    type: actions.GET_MUTUAL_FUND_PEER_COMPARISION,
    payload,
  }),


  GET_COMPARE_INCOME_PARTICULAR_QUARTERLY: `${entities} GET_COMPARE_INCOME_PARTICULAR_QUARTERLY`,
  getCompareIncomeParticularQuarterly: (payload) => ({
    type: actions.GET_COMPARE_INCOME_PARTICULAR_QUARTERLY,
    payload,
  }),

  GET_COMPARE_BALANCE_PARTICULAR_QUARTERLY: `${entities} GET_COMPARE_BALANCE_PARTICULAR_QUARTERLY`,
  getCompareBalanceParticularQuarterly: (payload) => ({
    type: actions.GET_COMPARE_BALANCE_PARTICULAR_QUARTERLY,
    payload,
  }),

  GET_COMPARE_INCOME_PARTICULAR_ANNUALY: `${entities} GET_COMPARE_INCOME_PARTICULAR_ANNUALY`,
  getCompareIncomeParticularAnnualy: (payload) => ({
    type: actions.GET_COMPARE_INCOME_PARTICULAR_ANNUALY,
    payload,
  }),

  GET_COMPARE_BALANCE_PARTICULAR_ANNUALY: `${entities} GET_COMPARE_BALANCE_PARTICULAR_ANNUALY`,
  getCompareBalanceParticularAnnualy: (payload) => ({
    type: actions.GET_COMPARE_BALANCE_PARTICULAR_ANNUALY,
    payload,
  }),


  GET_COMPARE_RATIO_PARTICULAR_QUARTERLY: `${entities} GET_COMPARE_RATIO_PARTICULAR_QUARTERLY`,
  getCompareRatioParticularQuarterly: (payload) => ({
    type: actions.GET_COMPARE_RATIO_PARTICULAR_QUARTERLY,
    payload,
  }),

  GET_COMPARE_RATIO_PARTICULAR_ANNUALLY: `${entities} GET_COMPARE_RATIO_PARTICULAR_ANNUALLY`,
  getCompareRatioParticularAnnually: (payload) => ({
    type: actions.GET_COMPARE_RATIO_PARTICULAR_ANNUALLY,
    payload,
  }),

  GET_COMPANY_PRODUCTWISE_LOAN: `${entities} GET_COMPANY_PRODUCTWISE_LOAN`,
  getCompanyProductwiseLoan: (payload) => ({
    type: actions.GET_COMPANY_PRODUCTWISE_LOAN,
    payload,
  }),

  GET_PIVOT_ANALYSIS: `${entities} GET_PIVOT_ANALYSIS`,
  getPivotAnalysis: (payload) => ({
    type: actions.GET_PIVOT_ANALYSIS,
    payload,
  }),

  GET_DEBENTURES_PEER_COMPARISION: `${entities} GET_DEBENTURES_PEER_COMPARISION`,
  getDeventuresPeerComparision: (payload) => ({
    type: actions.GET_DEBENTURES_PEER_COMPARISION,
    payload,
  }),

  GET_NEPSE_VS_SECTOR_COMPANY: `${entities} GET_NEPSE_VS_SECTOR_COMPANY`,
  getNepseVsSectorVsCompany: (payload) => ({
    type: actions.GET_NEPSE_VS_SECTOR_COMPANY,
    payload,
  }),

  GET_MARKET_INFORMATION_LOAN_COMPARE: `${entities} GET_MARKET_INFORMATION_LOAN_COMPARE`,
  getMarketInformationLoanCompare: (payload) => ({
    type: actions.GET_MARKET_INFORMATION_LOAN_COMPARE,
    payload,
  }),

  GET_MARKET_INFORMATION_DEPOSIT_COMPARE: `${entities} GET_MARKET_INFORMATION_DEPOSIT_COMPARE`,
  getMarketInformationDepositCompare: (payload) => ({
    type: actions.GET_MARKET_INFORMATION_DEPOSIT_COMPARE,
    payload,
  }),

  GET_INCOME_NFRS_QUATERLY: `${entities} GET_INCOME_NFRS_QUATERLY`,
  getIncomeNfrsQuaterly: (payload) => ({
    type: actions.GET_INCOME_NFRS_QUATERLY,
    payload,
  }),

  GET_INCOME_NFRS_ANNUALY: `${entities} GET_INCOME_NFRS_ANNUALY`,
  getIncomeNfrsAnnualy: (payload) => ({
    type: actions.GET_INCOME_NFRS_ANNUALY,
    payload,
  }),

  GET_BALANCE_NFRS_QUATERLY: `${entities} GET_BALANCE_NFRS_QUATERLY`,
  getBalanceNfrsQuaterly: (payload) => ({
    type: actions.GET_BALANCE_NFRS_QUATERLY,
    payload,
  }),

  GET_BALANCE_NFRS_ANNUALY: `${entities} GET_BALANCE_NFRS_ANNUALY`,
  getBalanceNfrsAnnualy: (payload) => ({
    type: actions.GET_BALANCE_NFRS_ANNUALY,
    payload,
  }),

  GET_PE_RATIO: `${entities} GET_PE_RATIO`,
  getPERatio: (payload) => ({
    type: actions.GET_PE_RATIO,
    payload,
  }),

  GET_PB_RATIO: `${entities} GET_PE_RATIO`,
  getPBRatio: (payload) => ({
    type: actions.GET_PB_RATIO,
    payload,
  }),


};

export default actions;
