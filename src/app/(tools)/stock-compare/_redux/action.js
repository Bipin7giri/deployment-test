const entities = "[compare]";

const actions = {
    GET_COMPANY_COMPARE: `${entities} GET_COMPANY_COMPARE`,
    getCompanyCompare: (payload) => ({
        type: actions.GET_COMPANY_COMPARE,
        payload,
    }),

    GET_COMPANY_BY_SECTOR: `${entities} GET_COMPANY_BY_SECTOR`,
    getCompanyBySector: (payload) => ({
        type: actions.GET_COMPANY_BY_SECTOR,
        payload,
    }),

    GET_COMPANY_RECENT_QUATER: `${entities} GET_COMPANY_RECENT_QUATER`,
    getCompanyRecentQuater: (payload) => ({
        type: actions.GET_COMPANY_RECENT_QUATER,
        payload,
    }),
    GET_COMPANY_RECENT_QUATER: `${entities} GET_COMPANY_RECENT_QUATER`,
    getCompanyRecentQuater: (payload) => ({
        type: actions.GET_COMPANY_RECENT_QUATER,
        payload,
    }),
    GET_COMPANY_LINE_CHART_DATA: `${entities} GET_COMPANY_LINE_CHART_DATA`,
    getCompanyLineChartData: (payload) => ({
        type: actions.GET_COMPANY_LINE_CHART_DATA,
        payload,
    }),
}
export default actions;