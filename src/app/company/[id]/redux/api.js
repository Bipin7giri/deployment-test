import { newsApi } from "../../../../api/axios";
import request, { METHOD_TYPE } from "../../../../api/request";

export const getCompanyInfo = async ({ symbol }) => {
  const companyPromise = request({
    url: `live_data/live/${symbol}`,
    method: METHOD_TYPE.GET,
  });
  const company = await companyPromise;
  return company;
};
export const getCompanytradingMeter = async ({ symbol }) => {
  const companyPromise = request({
    url: `company/get_trading_meter/${symbol}`,
    method: METHOD_TYPE.GET,
  });
  const company = await companyPromise;
  return company;
};
export const getFloorsheetData = async ({ symbol }) => {
  const floorsheetPromise = request({
    url: `floorsheet/today_by_sym/${symbol}?quantity=greater&value1=0`,
    method: METHOD_TYPE.GET,
  });
  const data = await floorsheetPromise;
  return data?.data?.data;
};

export const getFilteredFloorsheetData = async ({
  symbol,
  minimumVal,
  maximumVal,
  comparison,
  greaterThan,
  below,
}) => {
  let api = undefined;
  if (comparison === "between") {
    api = `floorsheet/today_by_sym/${symbol}?quantity=between&value1=${minimumVal}&value2=${maximumVal}`;
  }
  if (comparison === "greater") {
    api = `floorsheet/today_by_sym/${symbol}?quantity=greater&value1=${greaterThan}`;
  }
  if (comparison === "below") {
    api = `floorsheet/today_by_sym/${symbol}?quantity=smaller&value1=${below}`;
  }
  const floorsheetPromise = request({
    url: api,
    method: METHOD_TYPE.GET,
  });
  const data = await floorsheetPromise;
  return data?.data?.data;
};

export const getQuickSypnosisList = async ({ symbol }) => {
  const quickSypnosisList = await request({
    url: `financial_breakdown/short_synopsis/${symbol}`,
    method: METHOD_TYPE.GET,
  });

  return quickSypnosisList;
};

export const quaterInfo = async ({ company }) => {
  if (
    company.data.data[0]?.instrumentType !== "Mutual Funds" &&
    company.data.data[0]?.instrumentType !== "Non-Convertible Debentures"
  ) {
    const quarter = request({
      url: `/utils/get_recent_quater`,
      method: METHOD_TYPE.POST,
      data: {
        sector: company?.data?.data[0]?.sectorName,
      },
    });
    return quarter;
  } else {
    console.log("quater err");
  }
};

export const getCompanyDetail = async ({ symbol, company }) => {
  const marketShareDepositPromise = request({
    url: `/financial_breakdown/market_share/deposit/quarterly`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: company.data.data[0]?.sectorName,
      symbol: company.data.data[0]?.symbol,
    }),
  });

  const pieChartDataPromise = request({
    url: `/company/get_product_wise_recent`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: company.data.data[0]?.sectorName,
      symbol: company.data.data[0]?.symbol,
    }),
  });

  const allRatiosPromise = request({
    url: `/financial_breakdown/all/ratios/quaterly`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: company.data.data[0]?.sectorName,
      symbol: company.data.data[0]?.symbol,
    }),
  });

  // const netMarginPromise = request({
  //   url: `/financial_breakdown/net_margin/quaterly`,
  //   method: METHOD_TYPE.POST,
  //   data: JSON.stringify({
  //     sector: company.data.data[0]?.sectorName,
  //     symbol: company.data.data[0]?.symbol,
  //   }),
  // });

  const industryAvgPromise = request({
    url: `/company/industry_average`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: company.data.data[0]?.sectorName,
      symbol: company.data.data[0]?.symbol,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // const marketShareLoan = await request({
  //   url: `/financial_breakdown/market_share/loan/quarterly`,
  //   method: METHOD_TYPE.POST,
  //   data: JSON.stringify({
  //     sector: company.data.data[0]?.sectorName,
  //     symbol: company.data.data[0]?.symbol,
  //   }),
  // });

  const marketShareLoanPromise = request({
    url: `/financial_breakdown/market_share/loan/quarterly`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: company.data.data[0]?.sectorName,
      symbol: company.data.data[0]?.symbol,
    }),
  });

  const [
    // quarter,
    // altMan,
    marketShareDeposit,
    pieChartData,
    allRatios,
    industryAvg,
    marketShareLoan,
  ] = await Promise.allSettled([
    // quarterPromise,
    // altMantPromise,
    marketShareDepositPromise,
    pieChartDataPromise,
    allRatiosPromise,
    // netMarginPromise,
    industryAvgPromise,
    marketShareLoanPromise,
  ]);

  return [
    // quarter,
    // altMan,
    industryAvg,
    marketShareLoan,
    marketShareDeposit,
    pieChartData,
    allRatios,
  ];
};

export const getCompanyIndustryAvg = async ({ sector, symbol }) => {
  const res = await request({
    url: `/company/industry_average`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: sector,
      symbol: symbol,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getCompanyLiveData = async () => {
  const companyLiveData = await request({
    url: `/live_data/live`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return companyLiveData;
};

export const getCompanyLineChart = async ({ start, end, symbol }) => {
  const companyLineChart = await request({
    url: `/company/get_company_graph_today/${symbol}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return companyLineChart;
};
export const getSectorInfo = async ({ sector }) => {
  const res = await request({
    url: `/report/getSectorsInfo/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: sector,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getIncomeQuaterInfoOne = async ({ symbol, tableIds, quarter }) => {
  let tableData = [];
  for (let i = 0; i < tableIds.length; i++) {
    tableData.push(
      await request({
        url: `/report/quarterById/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify({
          symbol: symbol,
          id: parseInt(tableIds[i]),
          quarter: quarter,
        }),
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  }
  // added symbol here to check if there is the data of particular symbol
  if (tableData[0]?.data) {
    tableData[0].data["symbol"] = symbol;
  }
  return tableData;
};

export const getIncomeQuaterInfoTwo = async ({
  symbol,
  tableIdTwo,
  quarter,
}) => {
  const tableTwo = await request({
    url: `/report/quarterById/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
      id: tableIdTwo,
      quarter: quarter,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return tableTwo;
};
export const getIncomeAnnualInfoOne = async ({ symbol, tableIds }) => {
  let tableData = [];
  for (let i = 0; i < tableIds.length; i++) {
    tableData.push(
      await request({
        url: `/report/annualById/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify({
          symbol: symbol,
          id: parseInt(tableIds[i]),
        }),
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getIncomeAnnualInfoTwo = async ({ symbol, tableIdTwo }) => {
  const tableTwo = await request({
    url: `/report/annualById/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
      id: tableIdTwo,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return tableTwo;
};
// /report/annualById/

export const getBalanceSheetQuaterInfoOne = async ({
  symbol,
  tableIds,
  quarter,
}) => {
  let tableData = [];
  for (let i = 0; i < tableIds.length; i++) {
    tableData.push(
      await request({
        url: `/report/quarterById/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify({
          symbol: symbol,
          id: parseInt(tableIds[i]),
          quarter: quarter,
        }),
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  }

  return tableData;
};

export const getBalanceSheetQuaterInfoTwo = async ({
  symbol,
  tableIdTwo,
  quarter,
}) => {
  const tableTwo = await request({
    url: `/report/quarterById/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
      id: tableIdTwo,
      quarter: quarter,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return tableTwo;
};

export const getBalanceSheetAnnualInfoOne = async ({
  symbol,
  tableIds,
  quarter,
}) => {
  let tableData = [];
  for (let i = 0; i < tableIds.length; i++) {
    tableData.push(
      await request({
        url: `/report/annualById/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify({
          symbol: symbol,
          id: parseInt(tableIds[i]),
          quarter: quarter,
        }),
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getBalanceSheetAnnualInfoTwo = async ({
  symbol,
  tableIdTwo,
  quarter,
}) => {
  const tableTwo = await request({
    url: `/report/annualById/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
      id: tableIdTwo,
      quarter: quarter,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return tableTwo;
};

export const getAnnualRatio = async ({ symbol, tableIds, quarter }) => {
  let tableData = [];
  for (let i = 0; i < tableIds.length; i++) {
    tableData.push(
      await request({
        url: `/report/annualById/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify({
          symbol: symbol,
          id: tableIds[i],
        }),
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getQuarterRatio = async ({ symbol, tableIds, quarter }) => {
  let tableData = [];
  for (let i = 0; i < tableIds.length; i++) {
    tableData.push(
      await request({
        url: `/report/quarterById/`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify({
          symbol: symbol,
          id: tableIds[i],
          quarter: quarter,
        }),
        headers: {
          headers: {
            "Content-Type": "application/json",
          },
        },
      })
    );
  }
  // added symbol here to check if there is the data of particular symbol
  if (tableData[0]?.data) {
    tableData[0].data["symbol"] = symbol;
  }
  return tableData;
};

// get dividend by symbl

export const getDividendBySymbl = async ({ symbol }) => {
  const res = await request({
    url: `/company/get_dividend_by_sym/${symbol}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};

export const getPeerComparison = async ({ sector }) => {
  const res = await request({
    url: `/company/get_peer_comparison/`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      sector: sector,
    }),
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  // added sector to compare whether same sector has been already hit or not
  if (res?.data) {
    res.data.sector = sector;
  }
  return res;
};

export const getCompanyNews = async ({ symbol }) => {
  try {
    const res = await newsApi.get(
      `/newsses?filters[company][Symbol][$contains]=${symbol}&populate=*`
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const liveDataBySymbolReq = async ({ symbol }) => {
  const response = await request({
    url: `live_data/live/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const mutualFundsPLReq = async ({ symbol }) => {
  const response = await request({
    url: `report/mutual_fund_pl/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const mutualFundsBalanceReq = async ({ symbol }) => {
  const response = await request({
    url: `report/mutual_fund_balance/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const mutualFundsInvestmentReq = async ({ symbol }) => {
  const response = await request({
    url: `report/mutual_fund_investments/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getDeventuresDataReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get-debentures`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMutualFundsNavDataReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get-mutual-funds-nav`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMutualFundsTopInvestmenSectortReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get-mutual-funds-top-investment-sector`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMutualFundsInvestmenAreasReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get-mutual-funds-top-investment`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMutualFundsUnitsChangeReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get-mutual-funds-units-change`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getSectorwiseMutualFundsReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get-sectorwise-mutual-fund`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getHystoricMutualFundsHoldings = async ({ symbol }) => {
  const response = await request({
    url: `company/get-hystoric-mutual-funds-holdings`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMutualFundsHoldingsByStockReq = async ({ symbol, sector }) => {
  const response = await request({
    url: `company/mutual-funds-holdings`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({
      symbol: symbol,
      sector: sector,
    }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getFinancialBreakdownLoanCompareReq = async (data) => {
  const response = await request({
    url: `/financial_breakdown/loan/compare`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getFinancialBreakdownDepositCompareReq = async (data) => {
  const response = await request({
    url: `/financial_breakdown/deposit/compare`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompanyDescriptionsReq = async ({ symbol }) => {
  const response = await request({
    url: `/company/get_company_details`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify({ symbol }),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getReportImageBySymbolReq = async ({ symbol }) => {
  const response = await request({
    url: `/report/get_report_image_log/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getDividendYieldBySymbolReq = async ({ symbol }) => {
  const response = await request({
    url: `/company/get_dividend_yield_bySym/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getLifeInsurancePremiumReq = async ({ symbol }) => {
  const response = await request({
    url: `premium/life_premium/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCamelRatingIndividualReq = async ({ symbol }) => {
  const response = await request({
    url: `/company_analysis/camel/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getAltmanRatingIndividualReq = async ({ symbol }) => {
  const response = await request({
    url: `company_analysis/getAltman/${symbol}`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(symbol),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getEquityMutualFundsUnitsChangeReq = async (data) => {
  const response = await request({
    url: `/company/companies-mutual-funds-unit-change`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getSaralRatingReq = async ({ symbol }) => {
  const response = await request({
    url: `/company_analysis/get_saral_rating/${symbol}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMutualFundPeerComparisionReq = async (data) => {
  const response = await request({
    url: `company/mutual-funds-peer-comparision`,
    method: METHOD_TYPE.GET,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompareIncomeParticularQuarterlyReq = async (data) => {
  const response = await request({
    url: `report/compare_income_particular_quarterly`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompareBalanceParticularQuarterlyReq = async (data) => {
  const response = await request({
    url: `report/compare_balance_particular_quarterly`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompareIncomeParticularAnnualyReq = async (data) => {
  const response = await request({
    url: `report/compare_income_particular_annually`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompareBalanceParticularAnnualyReq = async (data) => {
  const response = await request({
    url: `report/compare_balance_particular_annually`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompareRatioParticularQuarterlyReq = async (data) => {
  const response = await request({
    url: `report/compare_ratios_particular_quarterly`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompareRatioParticularAnnuallyReq = async (data) => {
  const response = await request({
    url: `report/compare_ratios_particular_annually`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getCompanyProductwiseLoanReq = async (data) => {
  const response = await request({
    url: `/company/companyProductwiseLoan`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getPivotAnalysisReq = async (data) => {
  const response = await request({
    url: `/company/pivot_analysis`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getDeventuresPeerComparisionReq = async (data) => {
  const response = await request({
    url: `/company/debentures_peer_comparision`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getNepseVsSectorVsCompanyReq = async ({ symbol }) => {
  const response = await request({
    url: `company/get_company_vs_sector_vs_nepse/${symbol}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMarketInformationLoanCompareReq = async (data) => {
  const response = await request({
    url: `company/market-information-loan-compare`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getMarketInformationDepositCompareReq = async (data) => {
  const response = await request({
    url: `company/market-information-deposite-compare`,
    method: METHOD_TYPE.POST,
    data: JSON.stringify(data),
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getIncomeNfrsQuaterlyReq = async (data) => {
  let tableData = [];
  for (let i = 0; i < data?.id?.length; i++) {
    tableData.push(
      await request({
        url: `/report/quarterById_nfrs`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
          headers: {
            "content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getIncomeNfrsAnnualyReq = async (data) => {
  let tableData = [];
  for (let i = 0; i < data?.id?.length; i++) {
    tableData.push(
      await request({
        url: `/report/annualById_nfrs`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
          headers: {
            "content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getBalanceNfrsQuaterly = async (data) => {
  let tableData = [];
  for (let i = 0; i < data?.id?.length; i++) {
    tableData.push(
      await request({
        url: `/report/quarterById_nfrs`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
          headers: {
            "content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getBalanceNfrsAnnualy = async (data) => {
  let tableData = [];
  for (let i = 0; i < data?.id?.length; i++) {
    tableData.push(
      await request({
        url: `/report/annualById_nfrs`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
          headers: {
            "content-Type": "application/json",
          },
        },
      })
    );
  }
  return tableData;
};

export const getPERatioReq = async (data) => {
  const response = await request({
    // url: `/company/chart_data_pb_ratio?symbol=${data?.symbol}&start=${data?.start}&end=${data?.end}`,
    url: `/company/chart_data_pe_ratio?symbol=${data?.symbol}&start=1674022934&end=${data?.end}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};

export const getPBRatioReq = async (data) => {
  const response = await request({
    // url: `/company/chart_data_pb_ratio?symbol=${data?.symbol}&start=${data?.start}&end=${data?.end}`,
    url: `/company/chart_data_pb_ratio?symbol=${data?.symbol}&start=1674022934&end=${data?.end}`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "content-Type": "application/json",
      },
    },
  });
  return response;
};
