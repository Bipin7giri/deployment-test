import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  getAltmanRatingIndividualReq,
  getAnnualRatio,
  getBalanceNfrsQuaterly,
  getBalanceSheetAnnualInfoOne,
  getBalanceSheetAnnualInfoTwo,
  getBalanceSheetQuaterInfoOne,
  getBalanceSheetQuaterInfoTwo,
  getCamelRatingIndividualReq,
  getCompanyDescriptionsReq,
  getCompanyDetail,
  getCompanyIndustryAvg,
  getCompanyInfo,
  getQuickSypnosisList,
  getCompanyLineChart,
  getCompanyLiveData,
  getCompanyProductwiseLoanReq,
  getCompareBalanceParticularAnnualyReq,
  getCompareBalanceParticularQuarterlyReq,
  getCompareIncomeParticularAnnualyReq,
  getCompareIncomeParticularQuarterlyReq,
  getCompareRatioParticularAnnuallyReq,
  getCompareRatioParticularQuarterlyReq,
  getDeventuresDataReq,
  getDeventuresPeerComparisionReq,
  getDividendBySymbl,
  getDividendYieldBySymbolReq,
  getEquityMutualFundsUnitsChangeReq,
  getFinancialBreakdownDepositCompareReq,
  getFinancialBreakdownLoanCompareReq,
  getHystoricMutualFundsHoldings,
  getIncomeNfrsAnnualyReq,
  getIncomeNfrsQuaterlyReq,
  getIncomeQuaterInfoOne,
  getIncomeQuaterInfoTwo,
  getLifeInsurancePremiumReq,
  getMarketInformationDepositCompareReq,
  getMarketInformationLoanCompareReq,
  getMutualFundPeerComparisionReq,
  getMutualFundsHoldingsByStockReq,
  getMutualFundsInvestmenAreasReq,
  getMutualFundsNavDataReq,
  getMutualFundsTopInvestmenSectortReq,
  getMutualFundsUnitsChangeReq,
  getNepseVsSectorVsCompanyReq,
  getPeerComparison,
  getPivotAnalysisReq,
  getQuarterRatio,
  getReportImageBySymbolReq,
  getSaralRatingReq,
  getSectorInfo,
  getSectorwiseMutualFundsReq,
  liveDataBySymbolReq,
  mutualFundsBalanceReq,
  mutualFundsInvestmentReq,
  mutualFundsPLReq,
  getPERatioReq,
  getPBRatioReq,
  quaterInfo,
  getCompanytradingMeter,
  getFloorsheetData,
  getFilteredFloorsheetData,
} from "./api";
import actions from "./actions";
import {
  setAnnualRatio,
  setCurrentQuarter,
  setCompany,
  setAltMan,
  setFloorsheetData,
  setCompanyError,
  setCompanyLineChart,
  setCompanyLiveData,
  setCompanyLoading,
  setChartLoading,
  setFloorsheetLoading,
  setDividend,
  setDividendError,
  setDividendLoading,
  setFinancialLoading,
  setIndustryAvg,
  setPeerComparison,
  setPeerComparisonError,
  setPeerComparisonLoading,
  setQuarterBalanceSheetOne,
  setQuarterBalanceSheetTwo,
  setQuarterIncomeOne,
  setQuarterIncomeTwo,
  setSectorInfo,
  setFinancailBreakDown,
  setFinancailBreakDownLoading,
  setFinancailBreakDownError,
  setLiveDataBySymbol,
  setLoading,
  setquickSypnosisList,
  setMarketShareLoan,
  setMarketShareDeposit,
  setProductWiseData,
  setAllRatios,
  setMutualFundsPL,
  setMutualFundsBalance,
  setMutualFundsInvestment,
  setDeventureData,
  setMutualFundsNavData,
  setMutualFundsTopInvestmentSector,
  setMutualFundsInvestmentAreas,
  setMutualFundsUnitsChange,
  setSectorWiseMutualFunds,
  setHystoricMutualFundsHoldings,
  setMutualFundsHoldingsByStock,
  setMutualFundsInvestmentByCompanies,
  setFinancialBreakdownLoanCompare,
  setFinancialBreakdownDepositCompare,
  setCompanyDescriptions,
  setReportImageBySymbol,
  setDividendYieldBySymbol,
  setLifeInsurancePremium,
  setCamelRatingIndividual,
  setPCSectorInfo,
  setEquityMutualFundsUnits,
  setSaralRating,
  setMutualFundPeerComparision,
  setMutualFundPeerComparisionLoading,
  setCompareParticularLoading,
  setCompareIncomeParticularQuarterly,
  setCompanyProductwiseLoan,
  setPivotAnalysis,
  setDeventuresPeerComparisionData,
  setAltmanCamelLoading,
  setNepseVsSectorVsCompany,
  setMarketInformationLoanCompare,
  setMarketInformationDepositCompare,
  setPE,
  setPELoading,
  setPBLoading,
  setPB,
  setTradingPercentage,
} from "./companySlice";
import { getIncomeAnnualInfoOne } from "./api";
import { getIncomeAnnualInfoTwo } from "./api";

function* getCompanyDetailReqForPolling(action) {
  try {
    const company = yield call(getCompanyInfo, {
      symbol: action.payload,
    });
    yield put(setCompany({ company: company?.data?.data }));
    yield put(setCompanyLoading(false));
  } catch (err) {
    setCompanyError();
    yield put(setCompanyLoading(false));
  }
}

function* getCompanyDetailReq(action) {
  try {
    yield put(setChartLoading(true));
    const company = yield call(getCompanyInfo, {
      symbol: action.payload,
    });
    yield put(setCompany({ company: company?.data?.data }));

    const quarter = yield call(quaterInfo, {
      company: company,
    });
    yield put(setCurrentQuarter({ currentQuarter: quarter?.data?.data }));

    const quickSypnosisList = yield call(getQuickSypnosisList, {
      symbol: action.payload,
    });
    yield put(
      setquickSypnosisList({
        quickSypnosisList: quickSypnosisList?.data?.data,
        message: quickSypnosisList?.data?.data,
      })
    );

    const [
      industryAvg,
      marketShareLoan,
      marketSharesDepost,
      pieChartData,
      allRatios,
    ] = yield call(getCompanyDetail, {
      symbol: action.payload,
      company: company,
    });
    yield put(
      setAllRatios({
        allRatios:
          allRatios?.value?.data?.status === 200
            ? allRatios?.value?.data?.data
            : [],
        sector:
          allRatios?.value?.data?.status === 200
            ? company?.data?.data[0]?.sectorName
            : [],
      })
    );

    // yield put(setAltMan({ altMan: altMan?.value?.data?.data }));

    yield put(
      setIndustryAvg({
        industryAvg:
          industryAvg?.value?.data?.status == 200
            ? industryAvg?.value?.data?.data
            : [],
      })
    );
    yield put(
      setMarketShareLoan({
        marketShareLoan: marketShareLoan?.value?.data?.data,
      })
    );
    yield put(
      setMarketShareDeposit({
        marketSharesDepost: marketSharesDepost?.value?.data?.data,
      })
    );
    yield put(
      setProductWiseData({ productWiseData: pieChartData?.value?.data?.data })
    );

    // yield put(setNetMarging({ netMargin: netMargin?.data?.data, sector: company.data.data[0]?.sectorName, message: netMargin?.data?.message }));
    yield put(setChartLoading(false));
    yield put(setCompanyLoading(false));
  } catch (err) {
    setCompanyError();
    yield put(setChartLoading(false));
    yield put(setCompanyLoading(false));
  }
}
function* getComTradingMeter(action) {
  try {
    const tradingMeterPercentage = yield call(getCompanytradingMeter, {
      symbol: action.payload,
    });
    yield put(setTradingPercentage(tradingMeterPercentage.data.data.percent));
  } catch (err) {
    setCompanyError();
    yield put(setCompanyLoading(false));
  }
}

function* getCompanyLiveDataReq(action) {
  try {
    setCompanyLoading(true);
    const companyLiveData = yield call(getCompanyLiveData);
    yield put(
      setCompanyLiveData({ companyLiveData: companyLiveData?.data?.data })
    );
    // yield put(setIndustryAvg({ industryAvg: industryAvg?.data?.data }));
    setCompanyLoading(false);
  } catch (err) {
    setCompanyError();
    setCompanyLoading(false);
  }
}

function* getCompanyLineChartDataReq(action) {
  try {
    setCompanyLoading(true);
    const companyLiveData = yield call(getCompanyLineChart, {
      start: action.payload.start,
      end: action.payload.end,
      symbol: action.payload.symbol,
    });
    yield put(
      setCompanyLineChart({ companyLineChart: companyLiveData?.data?.data })
    );
    setCompanyLoading(false);
  } catch (err) {
    setCompanyError(true);
    setCompanyLoading(false);
  }
}

function* getCompanyIndustryAvgReq(action) {
  try {
    // setCompanyLoading(true);
    const industryAvg = yield call(getCompanyIndustryAvg, {
      symbol: action.payload.symbol,
      sector: action.payload.sector,
    });
    // yield put(setCompany({ company: company?.data?.data }));
    // setCompanyLoading(false);
  } catch (err) {
    // setCompanyError();
    // setCompanyLoading(false);
  }
}

//floorsheet

function* getFloorsheetDataReq(action) {
  try {
    yield put(setFloorsheetLoading(true));
    const floorsheetData = yield call(getFloorsheetData, {
      symbol: action.payload,
    });
    let Data = floorsheetData?.map((item, id) => {
      return {
        SN: id + 1,
        contractId: item.contractId,
        buyBroker: item.buyerMemberId,
        sellBroker: item.sellerMemberId,
        rate: item.contractRate,
        quantity: item.contractQuantity,
        amount: item.contractAmount,
        date: item.businessDate,
      };
    });
    yield put(setFloorsheetData({ data: Data }));
    yield put(setFloorsheetLoading(false));
  } catch (err) {
    console.error("Error fetching floorsheet data:", err);
    yield put(setFloorsheetLoading(false));
  }
}

function* getFilteredFloorsheetDataReq(action) {
  try {
    yield put(setFloorsheetLoading(true));
    const floorsheetData = yield call(getFilteredFloorsheetData, {
      symbol: action.payload?.symbol,
      minimumVal: action.payload?.minimumVal,
      maximumVal: action.payload?.maximumVal,
      comparison: action.payload?.comparison,
      greaterThan: action.payload?.greaterThan,
      below: action.payload?.below,
    });
    let Data = floorsheetData?.map((item, id) => {
      return {
        SN: id + 1,
        contractId: item.contractId,
        buyBroker: item.buyerMemberId,
        sellBroker: item.sellerMemberId,
        rate: item.contractRate,
        quantity: item.contractQuantity,
        amount: item.contractAmount,
        date: item.businessDate,
      };
    });
    yield put(setFloorsheetData({ data: Data }));
    yield put(setFloorsheetLoading(false));
  } catch (err) {
    console.error("Error fetching floorsheet data:", err);
    yield put(setFloorsheetLoading(false));
  }
}

// sector info
function* getSectorInfoReq(action) {
  try {
    yield put(setFinancialLoading(true));
    const res = yield call(getSectorInfo, {
      sector: action.payload,
    });
    yield put(
      setSectorInfo({
        sectorInfo: res.data?.data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(true));
  }
}

function* getQuaterIncomeOneReq(action) {
  try {
    yield put(setFinancialLoading(true));
    const data = yield call(getIncomeQuaterInfoOne, {
      symbol: action.payload.symbol,
      tableIds: action.payload.tableIds,
      quarter: action.payload.quarter,
    });
    yield put(
      setQuarterIncomeOne({
        data: data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    return;
    setFinancialLoading(false);
  }
}
function* getQuarterIncomeTwoReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const tableTwo = yield call(getIncomeQuaterInfoTwo, {
      symbol: action.payload.symbol,
      tableIdTwo: action.payload.tableIdTwo,
      quarter: action.payload.quarter,
    });

    yield put(
      setQuarterIncomeTwo({
        tableTwo: tableTwo?.data?.data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    return;
    yield put(setFinancialLoading(false));
  }
}

function* getAnnualIncomeOneReq(action) {
  try {
    yield put(setFinancialLoading(true));
    const data = yield call(getIncomeAnnualInfoOne, {
      symbol: action.payload.symbol,
      tableIds: action.payload.tableIds,
    });
    yield put(
      setQuarterIncomeOne({
        data: data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}
function* getAnnualIncomeTwoReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const tableTwo = yield call(getIncomeAnnualInfoTwo, {
      symbol: action.payload.symbol,
      tableIdTwo: action.payload.tableIdTwo,
    });

    yield put(
      setQuarterIncomeTwo({
        tableTwo: tableTwo?.data?.data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}

function* getQuaterBalanaceSheetOneReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const data = yield call(getBalanceSheetQuaterInfoOne, {
      symbol: action.payload.symbol,
      tableIds: action.payload.tableIds,
      quarter: action.payload.quarter,
    });
    yield put(
      setQuarterBalanceSheetOne({
        data: data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(true));
  }
}
function* getQuarterBalanceSheetTwoReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const tableTwo = yield call(getBalanceSheetQuaterInfoTwo, {
      symbol: action.payload.symbol,
      tableIdTwo: action.payload.tableIdTwo,
      quarter: action.payload.quarter,
    });

    yield put(
      setQuarterBalanceSheetTwo({
        tableTwo: tableTwo?.data?.data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}

function* getAnnualBalanceSheetOneReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const data = yield call(getBalanceSheetAnnualInfoOne, {
      symbol: action.payload.symbol,
      tableIds: action.payload.tableIds,
    });
    yield put(
      setQuarterBalanceSheetOne({
        data: data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}
function* getAnnualBalanceSheetTwoReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const tableTwo = yield call(getBalanceSheetAnnualInfoTwo, {
      symbol: action.payload.symbol,
      tableIdTwo: action.payload.tableIdTwo,
    });
    yield put(
      setQuarterBalanceSheetTwo({
        tableTwo: tableTwo?.data?.data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}

// annual ratio

function* getAnnualRatioReq(action) {
  try {
    yield put(setFinancialLoading(true));

    const data = yield call(getAnnualRatio, {
      symbol: action.payload.symbol,
      tableIds: action.payload.tableIds,
    });
    yield put(
      setAnnualRatio({
        data: data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}

// quarter ratio
function* getQuarterRatioReq(action) {
  try {
    yield put(setFinancialLoading(true));
    const data = yield call(getQuarterRatio, {
      symbol: action.payload.symbol,
      tableIds: action.payload.tableIds,
      quarter: action.payload.quarter,
    });
    yield put(
      setAnnualRatio({
        data: data,
      })
    );
    yield put(setFinancialLoading(false));
  } catch (err) {
    yield put(setFinancialLoading(false));
  }
}

function* getDividendReq(action) {
  try {
    yield put(setDividendLoading(true));

    const data = yield call(getDividendBySymbl, {
      symbol: action.payload.symbol,
    });
    yield put(
      setDividend({
        dividend: data?.data?.data,
      })
    );

    yield put(setDividendLoading(false));
  } catch (err) {
    yield put(setDividendError(false));
  }
}

// getPeerComparison

function* getPeerComparisonReq(action) {
  try {
    yield put(setPeerComparisonLoading(true));
    const data = yield call(getPeerComparison, {
      sector: action.payload.sector,
    });
    yield put(
      setPeerComparison({
        peerComparison: data?.data?.data,
      })
    );
    yield put(
      setPCSectorInfo({
        sector: data?.data?.sector,
      })
    );

    yield put(setPeerComparisonLoading(false));
  } catch (err) {
    yield put(setPeerComparisonLoading(false));

    yield put(setPeerComparisonError(true));
  }
}

// getFinancailBreakDown

function* getFinancailBreakDownReq(action) {
  try {
    yield put(setFinancailBreakDown(true));
    const data = yield call(getPeerComparison, {
      sector: action.payload.sector,
    });
    yield put(
      setPeerComparison({
        peerComparison: data?.data?.data,
      })
    );

    yield put(setFinancailBreakDown(false));
  } catch (err) {
    yield put(setFinancailBreakDownLoading(false));
    yield put(setFinancailBreakDownError(true));
  }
}

function* getLiveDataBySymbolReq(action) {
  try {
    yield put(setCompanyBasicInfoLoading(true));
    const data = yield call(liveDataBySymbolReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setLiveDataBySymbol({
        data: data?.data?.data,
      })
    );
    yield put(setCompanyBasicInfoLoading(false));
  } catch (err) {
    yield put(setCompanyBasicInfoLoading(false));
  }
}

function* callGetMutualFundsPLReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(mutualFundsPLReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsPL({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetMutualFundsBalanceReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(mutualFundsBalanceReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsBalance({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetMutualFundsInvestmentReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(mutualFundsInvestmentReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsInvestment({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetDeventuresDataReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getDeventuresDataReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setDeventureData({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callMutualFundsNavDataReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMutualFundsNavDataReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsNavData({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callMutualFundsTopInvestmentSectorReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMutualFundsTopInvestmenSectortReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsTopInvestmentSector({
        data: data?.data?.mutualFundTopInvestment,
      })
    );
    yield put(
      setMutualFundsInvestmentByCompanies({
        data: data?.data?.mutualFundsInvestment,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callMutualFundsInvestmentAreasReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMutualFundsInvestmenAreasReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsInvestmentAreas({
        data: data?.data?.mutualFundTopInvestment,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callMutualFundsUnitsChangeReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMutualFundsUnitsChangeReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMutualFundsUnitsChange({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callSectorwiseMutualFundsReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getSectorwiseMutualFundsReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setSectorWiseMutualFunds({
        data: data?.data?.totalUnitsBySector,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callHystoricMutualFundsHoldingsReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getHystoricMutualFundsHoldings, {
      symbol: action.payload.symbol,
    });
    yield put(
      setHystoricMutualFundsHoldings({
        data: data?.data?.hystoricMutualFundsHoldings,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callMutualFundsHoldingsByStockReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMutualFundsHoldingsByStockReq, {
      symbol: action.payload.symbol,
      sector: action.payload.sector,
    });
    yield put(
      setMutualFundsHoldingsByStock({
        data: data?.data?.equity_value,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callFinancialBreakDownLoanCompareReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getFinancialBreakdownLoanCompareReq, {
      symbols: action.payload.symbol,
      sector: action.payload.sector,
    });
    yield put(
      setFinancialBreakdownLoanCompare({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callFinancialBreakDownDepositCompareReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getFinancialBreakdownDepositCompareReq, {
      symbols: action.payload.symbol,
      sector: action.payload.sector,
    });
    yield put(
      setFinancialBreakdownDepositCompare({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetCompanyDescriptionsReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getCompanyDescriptionsReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setCompanyDescriptions({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetReportImageBySymbolReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getReportImageBySymbolReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setReportImageBySymbol({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetDividendYieldBySymbolReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getDividendYieldBySymbolReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setDividendYieldBySymbol({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetLifeInsurancePremiumReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getLifeInsurancePremiumReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setLifeInsurancePremium({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetCamelRatingIndividualReq(action) {
  try {
    yield put(setAltmanCamelLoading(true));
    const data = yield call(getCamelRatingIndividualReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setCamelRatingIndividual({
        data: data?.data?.data,
      })
    );
    yield put(setAltmanCamelLoading(false));
  } catch (err) {
    yield put(setAltmanCamelLoading(false));
  }
}

function* callGetAltmanRatingIndividualReq(action) {
  try {
    yield put(setAltmanCamelLoading(true));
    const data = yield call(getAltmanRatingIndividualReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setAltMan({
        data: data?.data?.data,
      })
    );
    yield put(setAltmanCamelLoading(false));
  } catch (err) {
    yield put(setAltmanCamelLoading(false));
  }
}

function* callGetEquityMutualFundsUnitsChangeReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getEquityMutualFundsUnitsChangeReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setEquityMutualFundsUnits({
        data: data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetSaralRatingReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getSaralRatingReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setSaralRating({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetMutualFundPeerComparisionReq(action) {
  try {
    yield put(setMutualFundPeerComparisionLoading(true));
    const data = yield call(getMutualFundPeerComparisionReq, {});
    yield put(
      setMutualFundPeerComparision({
        data: data?.data,
      })
    );
    yield put(setMutualFundPeerComparisionLoading(false));
  } catch (err) {
    yield put(setMutualFundPeerComparisionLoading(false));
  }
}

function* callCompareIncomeParticularQuarterlyReq(action) {
  try {
    yield put(setCompareParticularLoading(true));
    const data = yield call(getCompareIncomeParticularQuarterlyReq, {
      symbol: action.payload.symbol,
      quarter: action.payload.quater,
      particular: action.payload.particular,
    });
    yield put(
      setCompareIncomeParticularQuarterly({
        data: data?.data?.data,
      })
    );
    yield put(setCompareParticularLoading(false));
  } catch (err) {
    yield put(setCompareParticularLoading(false));
  }
}

function* callCompareBalanceParticularQuarterlyReq(action) {
  try {
    yield put(setCompareParticularLoading(true));
    const data = yield call(getCompareBalanceParticularQuarterlyReq, {
      symbol: action.payload.symbol,
      quarter: action.payload.quater,
      particular: action.payload.particular,
    });
    yield put(
      setCompareIncomeParticularQuarterly({
        data: data?.data?.data,
      })
    );
    yield put(setCompareParticularLoading(false));
  } catch (err) {
    yield put(setCompareParticularLoading(false));
  }
}

function* callGetCompareIncomeParticularAnnualyReq(action) {
  try {
    yield put(setCompareParticularLoading(true));
    const data = yield call(getCompareIncomeParticularAnnualyReq, {
      symbol: action.payload.symbol,
      particular: action.payload.particular,
    });
    yield put(
      setCompareIncomeParticularQuarterly({
        data: data?.data?.data,
      })
    );
    yield put(setCompareParticularLoading(false));
  } catch (err) {
    yield put(setCompareParticularLoading(false));
  }
}

function* callGetCompareBalanceParticularAnnualyReq(action) {
  try {
    yield put(setCompareParticularLoading(true));
    const data = yield call(getCompareBalanceParticularAnnualyReq, {
      symbol: action.payload.symbol,
      particular: action.payload.particular,
    });
    yield put(
      setCompareIncomeParticularQuarterly({
        data: data?.data?.data,
      })
    );
    yield put(setCompareParticularLoading(false));
  } catch (err) {
    yield put(setCompareParticularLoading(false));
  }
}

function* callCompareRatiosParticularQuarterlyReq(action) {
  try {
    yield put(setCompareParticularLoading(true));
    const data = yield call(getCompareRatioParticularQuarterlyReq, {
      symbol: action.payload.symbol,
      quarter: action.payload.quater,
      particular: action.payload.particular,
    });
    yield put(
      setCompareIncomeParticularQuarterly({
        data: data?.data?.data,
      })
    );
    yield put(setCompareParticularLoading(false));
  } catch (err) {
    yield put(setCompareParticularLoading(false));
  }
}

function* callGetCompareRatioParticularAnnuallyReq(action) {
  try {
    yield put(setCompareParticularLoading(true));
    const data = yield call(getCompareRatioParticularAnnuallyReq, {
      symbol: action.payload.symbol,
      particular: action.payload.particular,
    });
    yield put(
      setCompareIncomeParticularQuarterly({
        data: data?.data?.data,
      })
    );
    yield put(setCompareParticularLoading(false));
  } catch (err) {
    yield put(setCompareParticularLoading(false));
  }
}

function* callGetCompanyProductwiseLoanReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getCompanyProductwiseLoanReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setCompanyProductwiseLoan({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetPivotAnalysisReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getPivotAnalysisReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setPivotAnalysis({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetNepseVsSectorVsCompanyReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getNepseVsSectorVsCompanyReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setNepseVsSectorVsCompany({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetDeventuresPeerComparisionReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getDeventuresPeerComparisionReq, {});
    yield put(
      setDeventuresPeerComparisionData({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetMarketInformationLoanCompareReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMarketInformationLoanCompareReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMarketInformationLoanCompare({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetMarketInformationDepositCompareReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getMarketInformationDepositCompareReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setMarketInformationDepositCompare({
        data: data?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetIncomeNfrsQuaterlyReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getIncomeNfrsQuaterlyReq, {
      symbol: action.payload.symbol,
      id: action.payload.tableIds,
      quarter: action.payload.quarter,
    });
    yield put(
      setQuarterIncomeOne({
        data: data ? data : [],
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetIncomeNfrsAnnualyReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getIncomeNfrsAnnualyReq, {
      symbol: action.payload.symbol,
      id: action.payload.tableIds,
    });
    yield put(
      setQuarterIncomeOne({
        data: data ? data : [],
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetBalanceNfrsQuaterlyReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getBalanceNfrsQuaterly, {
      symbol: action.payload.symbol,
      id: action.payload.tableIds,
      quarter: action.payload.quarter,
    });
    yield put(
      setQuarterBalanceSheetOne({
        data: data ? data : [],
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetBalanceNfrsAnnualyReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getIncomeNfrsAnnualyReq, {
      symbol: action.payload.symbol,
      id: action.payload.tableIds,
    });
    yield put(
      setQuarterBalanceSheetOne({
        data: data ? data : [],
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetPERatioReq(action) {
  try {
    yield put(setPELoading(true));
    const data = yield call(getPERatioReq, {
      symbol: action.payload.symbol,
      start: action.payload.start,
      end: action.payload.end,
    });
    yield put(setPE(data?.data?.data));
    yield put(setPELoading(false));
  } catch (err) {
    yield put(setPELoading(false));
  }
}

function* callGetPBRatioReq(action) {
  try {
    yield put(setPBLoading(true));
    const data = yield call(getPBRatioReq, {
      symbol: action.payload.symbol,
      start: action.payload.start,
      end: action.payload.end,
    });
    yield put(setPB(data?.data?.data));
    yield put(setPBLoading(false));
  } catch (err) {
    yield put(setPBLoading(false));
  }
}

// **************************--------------*********************

export function* companyDetailForPolling() {
  yield takeLatest(
    actions.GET_COMPANY_DETAIL_REQ_FOR_POLLING,
    getCompanyDetailReqForPolling
  );
}
export function* companyDetail() {
  yield takeLatest(actions.GET_COMPANY_DETAIL_REQ, getCompanyDetailReq);
}
export function* getIndCompanyTradingMeter() {
  yield takeLatest(actions.GET_COMPANY_TRADING_METER, getComTradingMeter);
}
export function* industryAvg() {
  yield takeLatest(actions.GET_COMPANY_INDUSTRY_AVG, getCompanyIndustryAvgReq);
}

export function* companyLiveData() {
  yield takeLatest(actions.GET_LIVE_COMPANY_DATA, getCompanyLiveDataReq);
}

export function* companyLineChart() {
  yield takeLatest(
    actions.GET_COMPANY_LINE_CHART_DATA_REQ,
    getCompanyLineChartDataReq
  );
}

//sectorinfo

export function* sectorInfo() {
  yield takeLatest(actions.GET_SECTOR_INFO_REQ, getSectorInfoReq);
}

// quaterincome
export function* quaterIncomeOne() {
  yield takeLatest(actions.GET_QUARTER_INCOME_ONE_REQ, getQuaterIncomeOneReq);
}

export function* quaterIncomeTwo() {
  yield takeLatest(actions.GET_QUARTER_INCOME_TWO_REQ, getQuarterIncomeTwoReq);
}

// quaterincome
export function* annualIncomeOne() {
  yield takeLatest(actions.GET_ANNUAL_INCOME_ONE_REQ, getAnnualIncomeOneReq);
}

// floorsheet
export function* floorsheet() {
  yield takeLatest(actions.GET_FLOORSHEET_DATA, getFloorsheetDataReq);
}

export function* filteredFloorsheet() {
  yield takeLatest(
    actions.GET_FILTERED_FLOORSHEET_DATA,
    getFilteredFloorsheetDataReq
  );
}

export function* annualIncomeTwo() {
  yield takeLatest(actions.GET_ANNUAL_INCOME_TWO_REQ, getAnnualIncomeTwoReq);
}

// quarterBalanceSheet

export function* quaterBalanceSheetOne() {
  yield takeLatest(
    actions.GET_QUARTER_BALANCESHEET_ONE_REQ,
    getQuaterBalanaceSheetOneReq
  );
}

export function* quaterBalanceSheetTwo() {
  yield takeLatest(
    actions.GET_QUARTER_BALANCESHEET_TWO_REQ,
    getQuarterBalanceSheetTwoReq
  );
}

// annual balance sheet

export function* annualBalanceSheetOne() {
  yield takeLatest(
    actions.GET_ANNUAL_BALANCESHEET_ONE_REQ,
    getAnnualBalanceSheetOneReq
  );
}

export function* annualBalanceSheetTwo() {
  yield takeLatest(
    actions.GET_ANNUAL_BALANCE_TWO_REQ,
    getAnnualBalanceSheetTwoReq
  );
}

// annual ratio
export function* annualRatio() {
  yield takeLatest(actions.GET_ANNUAL_RATIO_REQ, getAnnualRatioReq);
}

// quarter ratio
export function* quarterRatio() {
  yield takeLatest(actions.GET_QUARTER_RATIO_REQ, getQuarterRatioReq);
}

// get dividend by symbol
export function* dividend() {
  yield takeLatest(actions.GET_DIVIDEND_BY_REQ, getDividendReq);
}

// get peerComparison

export function* peerComparison() {
  yield takeLatest(actions.GET_PEER_COMPARISON, getPeerComparisonReq);
}

export function* financialRatios() {
  yield takeLatest(actions.GET_FINANCAIL_BREAKDOWN, getFinancailBreakDownReq);
}

export function* getLiveDataBySymbol() {
  yield takeLatest(actions.GET_LIVE_DATA_BY_SYMBOL, getLiveDataBySymbolReq);
}

export function* callGetMutualFundsPL() {
  yield takeLatest(actions.GET_MUTUAL_FUNDS_PL, callGetMutualFundsPLReq);
}

export function* callGetMutualFundsBalance() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_BALANCE,
    callGetMutualFundsBalanceReq
  );
}

export function* callGetMutualFundsInvestment() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_INVESTMENT,
    callGetMutualFundsInvestmentReq
  );
}

export function* callDeventuresData() {
  yield takeLatest(actions.GET_DEVENTURES_DATA, callGetDeventuresDataReq);
}

export function* callMutualFundNavData() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_NAV_DATA,
    callMutualFundsNavDataReq
  );
}

export function* callMutualFundTopInvestment() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_TOP_INVESTMENT_SECTOR,
    callMutualFundsTopInvestmentSectorReq
  );
}

export function* callMutualFundsInvestmentAreas() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_INVESTMENT_AREAS,
    callMutualFundsInvestmentAreasReq
  );
}

export function* callMutualFundsUnitsChange() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_UNITS_CHANGE,
    callMutualFundsUnitsChangeReq
  );
}

export function* callSectorwiseMutualFunds() {
  yield takeLatest(
    actions.GET_SECTORWISE_MUTUAL_FUNDS,
    callSectorwiseMutualFundsReq
  );
}

export function* callHystoricMutualFundsHoldings() {
  yield takeLatest(
    actions.GET_HYSTORIC_MUTUAL_FUNDS_HOLDINGS,
    callHystoricMutualFundsHoldingsReq
  );
}

export function* callMutualFundsHoldingsByStock() {
  yield takeLatest(
    actions.GET_MUTUAL_FUNDS_HOLDINGS_BY_STOCK,
    callMutualFundsHoldingsByStockReq
  );
}
export function* callFinancialBreakDownLoanCompare() {
  yield takeLatest(
    actions.GET_FINANCAIL_BREAKDOWN_LOAN_COMPARE,
    callFinancialBreakDownLoanCompareReq
  );
}
export function* callFinancialBreakDownDepositCompare() {
  yield takeLatest(
    actions.GET_FINANCAIL_BREAKDOWN_DEPOSIT_COMPARE,
    callFinancialBreakDownDepositCompareReq
  );
}
export function* callGetCompanyDescriptions() {
  yield takeLatest(
    actions.GET_COMPANY_DESCRIPTIONS,
    callGetCompanyDescriptionsReq
  );
}
export function* callGetReportImageBySymbol() {
  yield takeLatest(
    actions.GET_REPORT_IMAGE_BY_SYMBOL,
    callGetReportImageBySymbolReq
  );
}
export function* callGetDividendYieldBySymbol() {
  yield takeLatest(
    actions.GET_DIVIDEND_YIELD_BY_SYMBOL,
    callGetDividendYieldBySymbolReq
  );
}
export function* getLifeInsurancePremium() {
  yield takeLatest(
    actions.GET_LIFE_INSURANCE_PREMIUM,
    callGetLifeInsurancePremiumReq
  );
}
export function* callGetCamelRatingIndividual() {
  yield takeLatest(
    actions.GET_CAMEL_RATING_INDIVIDUAL,
    callGetCamelRatingIndividualReq
  );
}
export function* callGetAltmanRatingIndividual() {
  yield takeLatest(
    actions.GET_ALTMAN_RATING_INDIVIDUAL,
    callGetAltmanRatingIndividualReq
  );
}
export function* callGetEquityMutualFundsUnitsChange() {
  yield takeLatest(
    actions.GET_EQUITY_MUTUAL_FUNDS_UNITS_CHANGE,
    callGetEquityMutualFundsUnitsChangeReq
  );
}
export function* callGetSaralRating() {
  yield takeLatest(actions.GET_SARAL_RATING, callGetSaralRatingReq);
}
export function* callGetMutualFundPeerComparision() {
  yield takeLatest(
    actions.GET_MUTUAL_FUND_PEER_COMPARISION,
    callGetMutualFundPeerComparisionReq
  );
}
export function* callCompareIncomeParticularQuarterly() {
  yield takeLatest(
    actions.GET_COMPARE_INCOME_PARTICULAR_QUARTERLY,
    callCompareIncomeParticularQuarterlyReq
  );
}
export function* callCompareBalanceParticularQuarterly() {
  yield takeLatest(
    actions.GET_COMPARE_BALANCE_PARTICULAR_QUARTERLY,
    callCompareBalanceParticularQuarterlyReq
  );
}
export function* callCompareRatiosParticularQuarterly() {
  yield takeLatest(
    actions.GET_COMPARE_RATIO_PARTICULAR_QUARTERLY,
    callCompareRatiosParticularQuarterlyReq
  );
}
export function* callGetCompareBalanceParticularAnnualy() {
  yield takeLatest(
    actions.GET_COMPARE_BALANCE_PARTICULAR_ANNUALY,
    callGetCompareBalanceParticularAnnualyReq
  );
}
export function* callGetCompareIncomeParticularAnnualy() {
  yield takeLatest(
    actions.GET_COMPARE_INCOME_PARTICULAR_ANNUALY,
    callGetCompareIncomeParticularAnnualyReq
  );
}
export function* callGetCompareRatioParticularAnnually() {
  yield takeLatest(
    actions.GET_COMPARE_RATIO_PARTICULAR_ANNUALLY,
    callGetCompareRatioParticularAnnuallyReq
  );
}
export function* callGetCompanyProductwiseLoan() {
  yield takeLatest(
    actions.GET_COMPANY_PRODUCTWISE_LOAN,
    callGetCompanyProductwiseLoanReq
  );
}
export function* callGetPivotAnalysis() {
  yield takeLatest(actions.GET_PIVOT_ANALYSIS, callGetPivotAnalysisReq);
}
export function* callGetNepseVsSectorVsCompany() {
  yield takeLatest(
    actions.GET_NEPSE_VS_SECTOR_COMPANY,
    callGetNepseVsSectorVsCompanyReq
  );
}
export function* callGetDeventuresPeerComparision() {
  yield takeLatest(
    actions.GET_DEBENTURES_PEER_COMPARISION,
    callGetDeventuresPeerComparisionReq
  );
}
export function* callGetMarketInformationLoanCompare() {
  yield takeLatest(
    actions.GET_MARKET_INFORMATION_LOAN_COMPARE,
    callGetMarketInformationLoanCompareReq
  );
}
export function* callGetMarketInformationDepositCompare() {
  yield takeLatest(
    actions.GET_MARKET_INFORMATION_DEPOSIT_COMPARE,
    callGetMarketInformationDepositCompareReq
  );
}
export function* callGetIncomeNfrsQuaterly() {
  yield takeLatest(
    actions.GET_INCOME_NFRS_QUATERLY,
    callGetIncomeNfrsQuaterlyReq
  );
}
export function* callGetIncomeNfrsAnnualy() {
  yield takeLatest(
    actions.GET_INCOME_NFRS_ANNUALY,
    callGetIncomeNfrsAnnualyReq
  );
}
export function* callGetBalanceNfrsQuaterly() {
  yield takeLatest(
    actions.GET_BALANCE_NFRS_QUATERLY,
    callGetBalanceNfrsQuaterlyReq
  );
}
export function* callGetBalanceNfrsAnnualy() {
  yield takeLatest(
    actions.GET_BALANCE_NFRS_ANNUALY,
    callGetBalanceNfrsAnnualyReq
  );
}
export function* callGetPERatio() {
  yield takeLatest(actions.GET_PE_RATIO, callGetPERatioReq);
}
export function* callGetPBRatio() {
  yield takeLatest(actions.GET_PB_RATIO, callGetPBRatioReq);
}

export default function* companySaga() {
  yield all([
    fork(companyDetailForPolling),
    fork(companyDetail),
    fork(industryAvg),
    fork(companyLiveData),
    fork(companyLineChart),
    fork(sectorInfo),
    fork(quaterIncomeOne),
    fork(quaterIncomeTwo),
    fork(annualIncomeOne),
    fork(annualIncomeTwo),
    fork(quaterBalanceSheetOne),
    fork(quaterBalanceSheetTwo),
    fork(annualBalanceSheetOne),
    fork(annualBalanceSheetTwo),
    fork(annualRatio),
    fork(quarterRatio),
    fork(dividend),
    fork(peerComparison),
    fork(financialRatios),
    fork(getLiveDataBySymbol),
    fork(callGetMutualFundsPL),
    fork(callGetMutualFundsBalance),
    fork(callGetMutualFundsInvestment),
    fork(callDeventuresData),
    fork(callMutualFundNavData),
    fork(callMutualFundTopInvestment),
    fork(callMutualFundsInvestmentAreas),
    fork(callMutualFundsUnitsChange),
    fork(callSectorwiseMutualFunds),
    fork(callHystoricMutualFundsHoldings),
    fork(callMutualFundsHoldingsByStock),
    fork(callFinancialBreakDownLoanCompare),
    fork(callFinancialBreakDownDepositCompare),
    fork(callGetCompanyDescriptions),
    fork(callGetReportImageBySymbol),
    fork(callGetDividendYieldBySymbol),
    fork(getLifeInsurancePremium),
    fork(callGetCamelRatingIndividual),
    fork(callGetAltmanRatingIndividual),
    fork(callGetEquityMutualFundsUnitsChange),
    fork(callGetSaralRating),
    fork(callGetMutualFundPeerComparision),
    fork(callCompareIncomeParticularQuarterly),
    fork(callCompareBalanceParticularQuarterly),
    fork(callCompareRatiosParticularQuarterly),
    fork(callGetCompareBalanceParticularAnnualy),
    fork(callGetCompareIncomeParticularAnnualy),
    fork(callGetCompareRatioParticularAnnually),
    fork(callGetCompanyProductwiseLoan),
    fork(callGetPivotAnalysis),
    fork(callGetNepseVsSectorVsCompany),
    fork(callGetDeventuresPeerComparision),
    fork(callGetMarketInformationLoanCompare),
    fork(callGetMarketInformationDepositCompare),
    fork(callGetIncomeNfrsQuaterly),
    fork(callGetIncomeNfrsAnnualy),
    fork(callGetBalanceNfrsQuaterly),
    fork(callGetBalanceNfrsAnnualy),
    fork(callGetPERatio),
    fork(callGetPBRatio),
    fork(getIndCompanyTradingMeter),
    fork(floorsheet),
    fork(filteredFloorsheet),
  ]);
}
