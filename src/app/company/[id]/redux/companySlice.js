import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    // for company detalis
    currentQuarter: null,
    loading: false,
    companyBasicInfoLoading: false,
    isCompanyloading: false,
    isChartLoading: false,
    isFloorsheetloading: false,
    isTableLoading: false,
    liveDataBySymbol: [],
    PCSectorInfo: "",
    company: [],
    tradingMeterPercentage: 0,
    altMan: [],
    isCompanyError: false,
    industryAvg: [],
    companyLiveData: [],
    floorsheetData: [],
    companyLineChart: [],
    sectorInfo: [],
    isFinancialLoading: false,
    quarterIncomeTableOne: [],
    quarterIncomeTableTwo: [],
    quarterBalanceSheetTableOne: [],
    quarterBalanceSheetTableTwo: [],
    annualRatio: [],
    dividend: [],
    isDividendLoading: false,
    peerComparison: [],
    isPeerComparisonLoading: false,
    isPeerComparisonError: false,
    financailBreakDown: [],
    isFinancailBreakDownLoading: false,
    isFinancailBreakDownError: false,
    quickSypnosisList: [],
    // marketShare Loan Data
    marketSharesLoan: {},
    marketSharesDepost: {},
    productWiseData: [],
    allRatios: {},
    netMargin: {},
    mutualFundsPL: [],
    mutualFundsBalance: [],
    mutualFundsInvestment: [],
    deventuresData: [],
    mutualFundsNavData: [],
    mutualFundsTopInvestmentSector: [],
    mutualFundsInvestmentByCompanies: [],
    mutualFundsInvestmentAreas: [],
    mutualFundsUnitsChange: [],
    sectorwiseMutualFund: [],
    hystoricMutualFundsHoldings: [],
    mutualFundsHoldingsByStock: [],
    financialBreakdownLoanCompare: [],
    financialBreakdownDepositCompare: [],
    companyDescriptions: [],
    reportImageBySymbol: [],
    dividendYieldBySymbol: [],
    lifeInsurancePremium: [],
    camelRatingIndividual: [],
    equityMutualFundsUnits: [],
    saralRating: [],
    mutualFundPeerComparision: [],
    mutualFundPeerComparisionLoading: false,

    compareIncomeParticularQuarterly: [],
    compareParticularLoading: false,

    companyProductwiseLoan: [],
    pivotAnalysis: [],
    deventuresPeerComparisionData: [],
    altmanCamelLoading: false,
    nepseVsSectorVsCompany: [],
    marketInformationLoanCompare: [],
    marketInformationDepositCompare: [],
    peLoading: false,
    PE: [],
    pbLoading: false,
    PB: [],
  },
  reducers: {
    setCurrentQuarter(state, action) {
      state.currentQuarter = action.payload.currentQuarter;
    },
    setPCSectorInfo(state, action) {
      state.PCSectorInfo = action.payload;
    },
    setMutualFundsPL(state, action) {
      state.mutualFundsPL = action.payload;
    },

    setMutualFundsBalance(state, action) {
      state.mutualFundsBalance = action.payload;
    },

    setMutualFundsInvestment(state, action) {
      state.mutualFundsInvestment = action.payload;
    },
    // quick synopsis
    setquickSypnosisList(state, action) {
      state.quickSypnosisList = action.payload.quickSypnosisList;
    },
    //  MarketShare Loan
    setMarketShareLoan(state, action) {
      const tempData = action.payload.marketShareLoan;
      const loanData = tempData.loan;
      const marketSharesLoanData = tempData.marketShare;
      const years = marketSharesLoanData?.map((obj) => Object.keys(obj)[0]);
      const datas = marketSharesLoanData?.map((obj) => Object.values(obj)[0]);
      const marketShare = { years, datas };
      state.marketSharesLoan = {
        loanData: loanData,
        marketShareLoan: marketShare,
      };
    },

    //  MarketShare Deposit
    setMarketShareDeposit(state, action) {
      const tempData = action.payload.marketSharesDepost;
      const depositData = tempData.deposite;
      const years = tempData.marketShare.map((obj) => Object.keys(obj)[0]);
      const datas = tempData.marketShare.map((obj) => Object.values(obj)[0]);
      const marketShareDeposit = { years, datas };
      state.marketSharesDepost = {
        depositData: depositData,
        marketShareDeposit: marketShareDeposit,
      };
    },

    setProductWiseData(state, action) {
      if (action.payload.productWiseData !== undefined) {
        state.productWiseData = action.payload?.productWiseData?.map(
          (chartData) => {
            return {
              value: chartData?.value,
              name: chartData?.key,
              time: chartData?.month
                ? `${chartData?.month}/${chartData.year}`
                : `${chartData.year}`,
            };
          }
        );
      } else {
        state.productWiseData = [];
      }
    },

    // all-Ratios for linechart data
    setAllRatios(state, action) {
      const allRatios = action.payload.allRatios;
      const isEmpty = Object.keys(allRatios).every(
        (key) => Object.keys(allRatios[key]).length === 0
      );
      if (isEmpty) {
        state.allRatios = ["no data"];
        return;
      }
      const sector = action?.payload?.sector;
      let returnOnEquity = [];
      returnOnEquity = allRatios?.returnOnEquity?.returnOnEquityRatio?.map(
        (obj) => Object.values(obj)[0]
      );
      if (returnOnEquity === undefined) {
        state.allRatios = ["no data"];
        return;
      }
      let latestRoe = null;
      latestRoe = returnOnEquity[returnOnEquity.length - 1]; // !!  latest roe
      let threeYear = 0;
      for (
        let i = returnOnEquity.length - 1;
        i >= returnOnEquity.length - 3;
        i--
      ) {
        threeYear += returnOnEquity[i];
      }
      let threeYearAvgRoe = null;
      threeYearAvgRoe = threeYear / 3; // !! three year average roe

      let fiveYear = 0;
      for (
        let i = returnOnEquity.length - 1;
        i >= returnOnEquity.length - 5;
        i--
      ) {
        fiveYear += returnOnEquity[i];
      }
      let fiveYearAvgRoe = null;
      fiveYearAvgRoe = fiveYear / 5; // !! five year average roe

      let companyBarChart = {}; // !! company income brekdwon bar chart
      if (sector === "Life Insurance" || sector === "Non Life Insurance") {
        const { netProfit, totalPremium, netClaims } =
          allRatios.incomeBreakDown;
        companyBarChart = { netProfit, totalPremium, netClaims };
      } else {
        const { netProfit, operatingProfit, revenue } =
          allRatios.incomeBreakDown;
        companyBarChart = { netProfit, operatingProfit, revenue };
      }
      let years;
      let datas;
      let peRatio = {};
      const peData = allRatios["pricePerEarning"]?.pricePerEarningRatio;
      years = peData?.map((obj) => Object?.keys(obj)[0]);
      datas = peData?.map((obj) => Object?.values(obj)[0]);
      peRatio = { years, datas }; // !! PE Ratios data

      let marketCap = {};
      if (Array.isArray(allRatios?.marketCap)) {
        const marketCapData = allRatios?.marketCap;
        years = marketCapData?.map((obj) => Object.keys(obj)[0]);
        datas = marketCapData?.map((obj) => Object.values(obj)[0]);
        marketCap = { years, datas }; // !! Market cap of a individual company
      }

      let returnonAssets = {};
      const returnOnAssetsData =
        allRatios["returnOnAssets"]?.returnOnAssetsRatio;
      years = returnOnAssetsData?.map((obj) => Object?.keys(obj)[0]);
      datas = returnOnAssetsData?.map(
        (obj) => (Object.values(obj)[0] * 100).toFixed(2) || 0
      );
      returnonAssets = { years, datas }; // !! Return on Assets

      let returnonEquity = {};
      const returnOnEquityData =
        allRatios["returnOnEquity"]?.returnOnEquityRatio;
      years = returnOnEquityData?.map((obj) => Object.keys(obj)[0]);
      datas = returnOnEquityData?.map(
        (obj) => (Object.values(obj)[0] * 100).toFixed(2) || 0
      );
      returnonEquity = { years, datas }; // !! Return on equity

      let assetsTurnOversLineData = {};
      const assetsTurnOverData =
        allRatios["assetsTurnOverRatio"]?.assetTurnOverRatio;
      years = assetsTurnOverData?.map((obj) => Object.keys(obj)[0]);
      datas = assetsTurnOverData?.map((obj) => Object.values(obj)[0]);
      assetsTurnOversLineData = { years, datas }; // !!  Assets turon over

      let costOfFunds = {};
      let interestSpread = {};
      let pricetoLoan = {};
      let npl = {};
      if (
        sector === "Commercial Banks" ||
        sector === "Development Banks" ||
        sector === "Finance" ||
        sector === "Micro Finance"
      ) {
        const costofFundData = allRatios?.profitBreakDown?.costOfFunds;
        years = costofFundData?.map((obj) => Object.keys(obj)[0]);
        datas = costofFundData?.map((obj) => Object.values(obj)[0]);
        costOfFunds = { years, datas }; // !! Cost of funds

        const interest = allRatios?.profitBreakDown?.netInterestSpread;
        years = interest?.map((obj) => Object?.keys(obj)[0]);
        datas = interest?.map((obj) => Object?.values(obj)[0]);
        interestSpread = { years, datas }; // !! Interest of Spread of company

        const priceLoanData = allRatios?.profitBreakDown.priceToLoan;
        years = priceLoanData?.map((obj) => Object?.keys(obj)[0]);
        datas = priceLoanData?.map((obj) => Object?.values(obj)[0]);
        pricetoLoan = { years, datas }; // !! price to loan data

        const nplData = allRatios?.profitBreakDown?.npl;
        years = nplData?.map((obj) => Object?.keys(obj)[0]);
        datas = nplData?.map((obj) => Object?.values(obj)[0]);
        npl = { years, datas }; // !!  non performing loan
      }

      let pricetoBook = {};
      const priceBook = allRatios?.profitBreakDown?.priceToBook;
      years = priceBook?.map((obj) => Object?.keys(obj)[0]);
      datas = priceBook?.map((obj) => Object?.values(obj)[0]);
      pricetoBook = { years, datas }; // !! price to book

      let grossProfit = {};
      let operationProfitMargin = {};
      let netProfitMargin = {};
      if (sector === "Hydro Power") {
        const grossProfitData = allRatios?.profitBreakDown?.grossProfit;
        years = grossProfitData?.map((obj) => Object?.keys(obj)[0]);
        datas = grossProfitData?.map((obj) => Object?.values(obj)[0]);
        grossProfit = { years, datas }; // !! gross profit of company

        const operationProfitMarginData =
          allRatios?.profitBreakDown?.operationProfitMargin;
        years = operationProfitMarginData?.map((obj) => Object?.keys(obj)[0]);
        datas = operationProfitMarginData?.map((obj) => Object?.values(obj)[0]);
        operationProfitMargin = { years, datas }; // !! Operating profit

        const netProfitMarginData = allRatios?.profitBreakDown?.netProfitMargin;
        years = netProfitMarginData?.map((obj) => Object?.keys(obj)[0]);
        datas = netProfitMarginData?.map((obj) => Object?.values(obj)[0]);
        netProfitMargin = { years, datas }; // !! netProfitMargin
      }

      let returnOnCapitalEmployed = {};
      let combinedRatio = {};
      let returnOnInvestment = {};
      let priceToPremium = {};
      const capitalEmployed =
        allRatios?.profitBreakDown?.returnOnCapitalEmployed;
      years = capitalEmployed?.map((obj) => Object?.keys(obj)[0]);
      datas = capitalEmployed?.map((obj) => Object?.values(obj)[0]);
      returnOnCapitalEmployed = { years, datas }; // !! Return on CapitalEmployed

      const pricePremiumData = allRatios?.profitBreakDown?.priceToPremium;
      years = pricePremiumData?.map((obj) => Object.keys(obj)[0]);
      datas = pricePremiumData?.map((obj) => Object.values(obj)[0]);
      priceToPremium = { years, datas }; // !! priceToPremium

      const combineratio = allRatios?.profitBreakDown?.combinedRatio;
      years = combineratio?.map((obj) => Object?.keys(obj)[0]);
      datas = combineratio?.map((obj) => Object?.values(obj)[0]);
      combinedRatio = { years, datas }; // !! combined Ratio

      const returnInvestment = allRatios?.profitBreakDown?.returnOnInvestment;
      years = returnInvestment?.map((obj) => Object?.keys(obj)[0]);
      datas = returnInvestment?.map((obj) => Object?.values(obj)[0]);
      returnOnInvestment = { years, datas }; // !! Return on Investment

      state.allRatios = {
        latestRoe,
        threeYearAvgRoe,
        fiveYearAvgRoe,
        companyBarChart,
        peRatio,
        marketCap,
        returnonAssets,
        returnonEquity,
        assetsTurnOversLineData,
        costOfFunds,
        interestSpread,
        pricetoLoan,
        npl,
        pricetoBook,
        grossProfit,
        operationProfitMargin,
        netProfitMargin,
        returnOnCapitalEmployed,
        priceToPremium,
        combinedRatio,
        returnOnInvestment,
      };
    },

    // net Margin
    setNetMarging(state, action) {
      const netMarginData = action.payload.netMargin;

      const years = netMarginData?.netMargin.map((obj) => Object.keys(obj)[0]);
      const datas = netMarginData?.netMargin?.map(
        (obj) => Object.values(obj)[0]
      );

      let netMarginLineData = [];

      netMarginLineData = { years, datas }; // !! net margin for line chart
      const netMargin = netMarginData?.netMargin.map(
        (obj) => Object.values(obj)[0]
      );

      let latestNetMargin = 0;
      latestNetMargin = netMargin[netMargin.length - 1]; // !! latest margin

      // ?? for three years average
      let threeYear = 0;
      for (let i = netMargin.length - 1; i >= netMargin.length - 3; i--) {
        threeYear += netMargin[i];
      }
      let threeYearAvgNetMargin = 0;
      threeYearAvgNetMargin = threeYear / 3; // !! three year average

      // ?? for five years average
      let fiveYear = 0;
      for (let i = netMargin.length - 1; i >= netMargin.length - 5; i--) {
        fiveYear += netMargin[i];
      }
      let fiveYearNetMargin = 0;
      fiveYearNetMargin = fiveYear / 5; // !! five year average

      state.netMargin = {
        netMarginLineData,
        latestNetMargin,
        threeYearAvgNetMargin,
        fiveYearNetMargin,
      };
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCompanyBasicInfoLoading(state, action) {
      state.companyBasicInfoLoading = action.payload;
    },
    setLiveDataBySymbol(state, action) {
      state.liveDataBySymbol = action.payload;
    },
    setCompanyLoading(state, action) {
      state.isCompanyloading = action.payload;
    },
    setChartLoading(state, action) {
      state.isChartLoading = action.payload;
    },
    setTableLoading(state, action) {
      state.isTableLoading = action.payload;
    },
    setCompany(state, action) {
      state.company = action.payload.company;
    },
    setTradingPercentage(state, action) {
      state.tradingMeterPercentage = action.payload;
    },
    setAltMan(state, action) {
      state.altMan = action.payload;
    },
    setIndustryAvg(state, action) {
      state.industryAvg = action.payload.industryAvg;
    },
    setCompanyLiveData(state, action) {
      state.companyLiveData = action.payload.companyLiveData;
    },
    setCompanyLineChart(state, action) {
      state.companyLineChart = action.payload.companyLineChart;
    },
    setSectorInfo(state, action) {
      state.sectorInfo = action.payload.sectorInfo;
    },
    setQuarterIncomeOne(state, action) {
      state.quarterIncomeTableOne = action.payload.data;
    },
    setQuarterIncomeTwo(state, action) {
      state.quarterIncomeTableTwo = action.payload.tableTwo;
    },
    setQuarterBalanceSheetOne(state, action) {
      state.quarterBalanceSheetTableOne = action.payload.data;
    },
    setQuarterBalanceSheetTwo(state, action) {
      state.quarterBalanceSheetTableTwo = action.payload.tableTwo;
    },
    setAnnualRatio(state, action) {
      state.annualRatio = action.payload.data;
    },

    //floorsheet Data
    setFloorsheetData(state, action) {
      state.floorsheetData = action.payload.data;
    },

    setFloorsheetLoading(state, action) {
      state.isFloorsheetloading = action.payload;
    },


    // dividend
    setDividend(state, action) {
      state.dividend = action.payload.dividend;
    },
    setDividendLoading(state, action) {
      state.isDividendLoading = action.payload;
    },

    setDividendError(state, action) {
      state.isDividendError = true;
    },

    // peerComparison

    setPeerComparison(state, action) {
      state.peerComparison = action.payload.peerComparison;
    },
    setPeerComparisonLoading(state, action) {
      state.isPeerComparisonLoading = action.payload;
    },
    setPeerComparisonError(state, action) {
      state.isPeerComparisonError = true;
    },

    // financailBreakDown
    setFinancailBreakDown(state, action) {
      state.financailBreakDown = action.payload.financailBreakDown;
    },
    setFinancailBreakDownLoading(state, action) {
      state.isFinancailBreakDownLoading = action.payload;
    },
    setFinancailBreakDownError(state, action) {
      state.isFinancailBreakDownError = true;
    },

    setFinancialLoading(state, action) {
      state.isFinancialLoading = action.payload;
    },
    setCompanyError(state, action) {
      state.isCompanyError = true;
    },
    setDeventureData(state, action) {
      state.deventuresData = action.payload;
    },
    setMutualFundsNavData(state, action) {
      state.mutualFundsNavData = action.payload;
    },
    setMutualFundsTopInvestmentSector(state, action) {
      state.mutualFundsTopInvestmentSector = action.payload;
    },
    setMutualFundsInvestmentByCompanies(state, action) {
      state.mutualFundsInvestmentByCompanies = action.payload;
    },
    setMutualFundsInvestmentAreas(state, action) {
      state.mutualFundsInvestmentAreas = action.payload;
    },
    setMutualFundsUnitsChange(state, action) {
      state.mutualFundsUnitsChange = action.payload;
    },
    setSectorWiseMutualFunds(state, action) {
      state.sectorwiseMutualFund = action.payload;
    },
    setHystoricMutualFundsHoldings(state, action) {
      state.hystoricMutualFundsHoldings = action.payload;
    },
    setMutualFundsHoldingsByStock(state, action) {
      state.mutualFundsHoldingsByStock = action.payload;
    },
    setFinancialBreakdownLoanCompare(state, action) {
      state.financialBreakdownLoanCompare = action.payload;
    },
    setFinancialBreakdownDepositCompare(state, action) {
      state.financialBreakdownDepositCompare = action.payload;
    },
    setCompanyDescriptions(state, action) {
      state.companyDescriptions = action.payload;
    },
    setReportImageBySymbol(state, action) {
      state.reportImageBySymbol = action.payload;
    },
    setDividendYieldBySymbol(state, action) {
      state.dividendYieldBySymbol = action.payload;
    },
    setLifeInsurancePremium(state, action) {
      state.lifeInsurancePremium = action.payload;
    },
    setCamelRatingIndividual(state, action) {
      state.camelRatingIndividual = action.payload;
    },
    setEquityMutualFundsUnits(state, action) {
      state.equityMutualFundsUnits = action.payload;
    },
    setSaralRating(state, action) {
      state.saralRating = action.payload;
    },
    setMutualFundPeerComparision(state, action) {
      state.mutualFundPeerComparision = action.payload;
    },
    setMutualFundPeerComparisionLoading(state, action) {
      state.mutualFundPeerComparisionLoading = action.payload;
    },
    setCompareIncomeParticularQuarterly(state, action) {
      state.compareIncomeParticularQuarterly = action.payload;
    },
    setCompareParticularLoading(state, action) {
      state.compareParticularLoading = action.payload;
    },
    setCompanyProductwiseLoan(state, action) {
      state.companyProductwiseLoan = action.payload;
    },
    setPivotAnalysis(state, action) {
      state.pivotAnalysis = action.payload;
    },
    setDeventuresPeerComparisionData(state, action) {
      state.deventuresPeerComparisionData = action.payload;
    },
    setAltmanCamelLoading(state, action) {
      state.altmanCamelLoading = action.payload;
    },
    setNepseVsSectorVsCompany(state, action) {
      state.nepseVsSectorVsCompany = action.payload;
    },
    setMarketInformationLoanCompare(state, action) {
      state.marketInformationLoanCompare = action.payload;
    },
    setMarketInformationDepositCompare(state, action) {
      state.marketInformationDepositCompare = action.payload;
    },
    setPELoading(state, action) {
      state.peLoading = action.payload;
    },
    setPE(state, action) {
      state.PE = action.payload;
    },
    setPBLoading(state, action) {
      state.pbLoading = action.payload;
    },
    setPB(state, action) {
      state.PB = action.payload;
    },
  },
});

export const {
  setCurrentQuarter,
  setquickSypnosisList,
  setPCSectorInfo,
  setMarketShareLoan,
  setMarketShareDeposit,
  setProductWiseData,
  setAllRatios,
  setNetMarging,
  setLoading,
  setCompany,
  setAltMan,
  setCompanyError,
  setCompanyLoading,
  setChartLoading,
  setFloorsheetLoading,
  setIndustryAvg,
  setLiveDataBySymbol,
  setCompanyLiveData,
  setFloorsheetData,
  setCompanyLineChart,
  setSectorInfo,
  setFinancialLoading,
  setQuarterIncomeOne,
  setQuarterIncomeTwo,
  setQuarterBalanceSheetOne,
  setQuarterBalanceSheetTwo,
  setTableLoading,
  setAnnualRatio,
  setDividend,
  setDividendError,
  setDividendLoading,
  setPeerComparison,
  setPeerComparisonError,
  setPeerComparisonLoading,
  setFinancailBreakDown,
  setFinancailBreakDownLoading,
  setFinancailBreakDownError,
  setMutualFundsPL,
  setMutualFundsBalance,
  setMutualFundsInvestment,
  setDeventureData,
  setMutualFundsNavData,
  setMutualFundsTopInvestmentSector,
  setMutualFundsInvestmentByCompanies,
  setMutualFundsInvestmentAreas,
  setMutualFundsUnitsChange,
  setSectorWiseMutualFunds,
  setHystoricMutualFundsHoldings,
  setMutualFundsHoldingsByStock,
  setFinancialBreakdownLoanCompare,
  setFinancialBreakdownDepositCompare,
  setCompanyDescriptions,
  setReportImageBySymbol,
  setDividendYieldBySymbol,
  setLifeInsurancePremium,
  setCamelRatingIndividual,
  setEquityMutualFundsUnits,
  setSaralRating,
  setMutualFundPeerComparision,
  setMutualFundPeerComparisionLoading,
  setCompareIncomeParticularQuarterly,
  setCompareParticularLoading,
  setCompanyProductwiseLoan,
  setPivotAnalysis,
  setDeventuresPeerComparisionData,
  setAltmanCamelLoading,
  setNepseVsSectorVsCompany,
  setMarketInformationLoanCompare,
  setMarketInformationDepositCompare,
  setPELoading,
  setPE,
  setPBLoading,
  setPB,
  setTradingPercentage

} = companySlice.actions;
export default companySlice.reducer;
