import request, { METHOD_TYPE } from "../../../api/request";

export const getMOFAnnual = async () => {
  const res = await request({
    url: `/economy/mof_annual/recent`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res;
};
export const getEconomyChartData = async ({ chartData }) => {
  // return;
  let revenueandexpenditure = [];
  let importAndExport = [];
  let remittancesAndDebt = [];
  let importBreakDown = [];
  let exportBreakDown = [];
  // for(let i = 0 ;i<chartData.length;i++){
  revenueandexpenditure.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[0]?.chartDataNameOne,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  revenueandexpenditure.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[0]?.chartDataNameTwo,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );

  importAndExport.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[1]?.chartDataNameOne,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  importAndExport.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[1]?.chartDataNameTwo,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  remittancesAndDebt.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[2]?.chartDataNameOne,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  remittancesAndDebt.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[2]?.chartDataNameTwo,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  importBreakDown.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[3]?.chartDataNameOne,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  importBreakDown.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[3]?.chartDataNameTwo,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  importBreakDown.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[3]?.chartDataNameThree,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );

  exportBreakDown.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[4]?.chartDataNameOne,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  exportBreakDown.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[4]?.chartDataNameTwo,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );
  exportBreakDown.push(
    await request({
      url: `/economy/mof_annual_by_name`,
      method: METHOD_TYPE.POST,
      data: JSON.stringify({
        name: chartData[4]?.chartDataNameThree,
      }),
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
  );

  return [
    revenueandexpenditure,
    importAndExport,
    remittancesAndDebt,
    importBreakDown,
    exportBreakDown,
  ];
};

export const getHighlightImportExoprt = async()=>{
  const res = await request({
    url: `/economy/highlights_import_export`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res.data;
}

export const getCalculatedHighlight = async()=>{
  const res = await request({
    url: `economy/get_calcualted_highlights`,
    method: METHOD_TYPE.GET,
    headers: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
  return res.data;
}