const entities = "[broker]";

const actions = {
    GET_BROKER_DETAILS: `${entities} GET_BROKER_DETAILS`,
    GET_BROKER_BREAKDOWN_TOTAL_SELLING: `${entities} GET_BROKER_BREAKDOWN_TOTAL_SELLING`,
    GET_BROKER_BREAKDOWN_TOP_FIVE_SYMBOL: `${entities} GET_BROKER_BREAKDOWN_TOP_FIVE_SYMBOL`,
    GET_BROKER_BREAKDOWN_TOP_FIVE_BROKER_ID: `${entities} GET_BROKER_BREAKDOWN_TOP_FIVE_BROKER_ID`,


    getBrokerDetails: (payload) => ({
        type: actions.GET_BROKER_DETAILS,
        payload,
    }),

    getBrokerBreakDownTotalSelling: (payload) => ({
        type: actions.GET_BROKER_BREAKDOWN_TOTAL_SELLING,
        payload,
    }),

    getBrokerBreakDownTopFiveSymbol: (payload) => ({
        type: actions.GET_BROKER_BREAKDOWN_TOP_FIVE_SYMBOL,
        payload,
    }),

    getBrokerBreakDownTopFiveBrokerId: (payload) => ({
        type: actions.GET_BROKER_BREAKDOWN_TOP_FIVE_BROKER_ID,
        payload,
    }),

    GET_BROKER_HISTORIC_BUY: `${entities} GET_BROKER_HISTORIC_BUY`,
    getBrokerHistoricBuy: (payload) => ({
        type: actions.GET_BROKER_HISTORIC_BUY,
        payload,
    }),

    GET_BROKER_HISTORIC_SELL: `${entities} GET_BROKER_HISTORIC_SELL`,
    getBrokerHistoricSell: (payload) => ({
        type: actions.GET_BROKER_HISTORIC_SELL,
        payload,
    }),

    GET_BROKER_HISTORIC_BUY_BY_SYM: `${entities} GET_BROKER_HISTORIC_BUY_BY_SYM`,
    getBrokerHistoricBuyBySym: (payload) => ({
        type: actions.GET_BROKER_HISTORIC_BUY_BY_SYM,
        payload,
    }),


    GET_BROKER_HISTORIC_SELL_BY_SYM: `${entities} GET_BROKER_HISTORIC_SELL_BY_SYM`,
    getBrokerHistoricSellBySym: (payload) => ({
        type: actions.GET_BROKER_HISTORIC_SELL_BY_SYM,
        payload,
    }),

    GET_HISTORICAL_INFORMATION_BY_BROKER: `${entities} GET_HISTORICAL_INFORMATION_BY_BROKER`,
    getHistoricalInformationByBroker: (payload) => ({
        type: actions.GET_HISTORICAL_INFORMATION_BY_BROKER,
        payload,
    }),

    GET_HISTORICAL_INFORMATION_BY_TOP_BUYSELL_BROKER: `${entities} GET_HISTORICAL_INFORMATION_BY_TOP_BUYSELL_BROKER`,
    getHistoricalInformationByTopBuysellBroker: (payload) => ({
        type: actions.GET_HISTORICAL_INFORMATION_BY_TOP_BUYSELL_BROKER,
        payload,
    }),

    GET_TOP_SELLING_BROKER_NAME: `${entities} GET_TOP_SELLING_BROKER_NAME`,
    getTopSellingBrokerName: (payload) => ({
        type: actions.GET_TOP_SELLING_BROKER_NAME,
        payload,
    }),

    GET_TOP_BUYING_BROKER_NAME: `${entities} GET_TOP_BUYING_BROKER_NAME`,
    getTopBuyingBrokerName: (payload) => ({
        type: actions.GET_TOP_BUYING_BROKER_NAME,
        payload,
    }),
}
export default actions;