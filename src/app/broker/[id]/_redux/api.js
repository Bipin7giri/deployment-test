import api from '../../../../api/axios';
import request, { METHOD_TYPE } from '../../../../api/request';

export const getBrokerDetailsReq = async ({ brokerNo }) => {
    const brokerDetails = await request({
        url: `broker/get_detail/${brokerNo}`,
        method: METHOD_TYPE.GET,
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return brokerDetails;
};

export const getBrokerBreakDownTotalSellingReq = async ({ brokerNo }) => {
    const brokerBreakDown = await request({
        url: `floorsheet/broker_breakdown/total_selling/${brokerNo}`,
        method: METHOD_TYPE.GET,
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return brokerBreakDown;
};

export const getBrokerBreakDownTopFiveSymbolReq = async ({ companySymbol }) => {
    const brokerBreakDown = await request({
        url: `/floorsheet/broker_breakdown/top_five_by_symbol/${companySymbol}`,
        method: METHOD_TYPE.GET,
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return brokerBreakDown;
};

export const getBrokerBreakDownTopFiveIdReq = async ({ brokerNo }) => {
    const brokerBreakDown = api.get(`/floorsheet/broker_breakdown/top_five_by_broker_id/${brokerNo}`)
    return brokerBreakDown;
};


export const getBrokerHistoricBuyReq = async (data) => {
    const res = await request({
        url: `/broker/broker_hystoric_buy`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getBrokerHistoricSellReq = async (data) => {
    const res = await request({
        url: `/broker/broker_hystoric_sell`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getBrokerHistoricBuyBySymReq = async (data) => {
    const res = await request({
        url: `/broker/broker_hystoric_buy_by_sym`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getBrokerHistoricSellBySymReq = async (data) => {
    const res = await request({
        url: `/broker/broker_hystoric_sell_by_sym`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getHistoricalInformationByBrokerReq = async (data) => {
    const res = await request({
        url: `/broker/hystorical_information_by_broker`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getHistoricalInformationByTopBuysellBrokerReq = async (data) => {
    const res = await request({
        url: `/broker/hystorical_information_by_top_buysell_broker`,
        method: METHOD_TYPE.POST,
        data: JSON.stringify(data),
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getTopSellingBrokerNameReq = async () => {
    const res = await request({
        url: `/floorsheet/get_by_sellingBrokerName`,
        method: METHOD_TYPE.GET,
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};

export const getTopBuyingBrokerNameReq = async () => {
    const res = await request({
        url: `/floorsheet/get_by_buyingBrokerName`,
        method: METHOD_TYPE.GET,
        headers: {
            headers: {
                "content-Type": "application/json",
            },
        },
    });
    return res;
};